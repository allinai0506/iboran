import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

export interface LeadRequestData {
  name: string
  company: string
  phone: string
  source?: string
  sourcePath?: string
  sourcePageUrl?: string
  resourceTitle?: string
  pageSlug?: string
  email?: string
  role?: string
  currentSystem?: string
  message?: string
  customer_type?: string
  current_system?: string
  remark?: string
  interest?: string | string[]
  // UTM 归因数据
  utmData?: {
    utm_source?: string
    utm_medium?: string
    utm_campaign?: string
    utm_content?: string
    utm_term?: string
    referrer?: string
    landingPage?: string
    pageHistory?: string[]
  }
}

export async function POST(req: Request) {
  try {
    const body: LeadRequestData = await req.json()

    // Normalize phone: strip spaces, dashes, and country code prefix (+86 / 86)
    if (typeof body.phone === 'string') {
      body.phone = body.phone.replace(/[\s-]/g, '').replace(/^\+?86/, '')
    }

    // Validate required fields
    if (!body.name || !body.company || !body.phone) {
      return NextResponse.json(
        { error: '姓名、公司名称和联系电话为必填项' },
        { status: 400 }
      )
    }

    // Validate phone format (Chinese mobile number, 11 digits starting with 1)
    const phoneRegex = /^1[3-9]\d{9}$/
    if (!phoneRegex.test(body.phone)) {
      return NextResponse.json(
        { error: '请输入有效的手机号码' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config: configPromise })

    // Check for duplicate submission within 10 minutes (prevent spam)
    const tenMinutesAgo = new Date()
    tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10)

    const recentLead = await payload.find({
      collection: 'leads',
      where: {
        phone: {
          equals: body.phone,
        },
      },
      sort: '-createdAt',
      limit: 5,
    })

    const hasRecentDuplicate = recentLead.docs.some((lead) => {
      const createdAt = typeof lead.createdAt === 'string'
        ? new Date(lead.createdAt)
        : null

      return createdAt instanceof Date
        && !Number.isNaN(createdAt.getTime())
        && createdAt > tenMinutesAgo
    })

    // Reject if same phone submitted within 10 minutes
    if (hasRecentDuplicate) {
      return NextResponse.json({
        success: false,
        message: '请稍后再试，您刚刚提交过',
        retryAfter: 600, // seconds
      }, { status: 429 })
    }

    const sourcePageUrl = (body.sourcePageUrl || body.utmData?.landingPage || '').trim()
    let sourcePath = (body.sourcePath || '').trim()

    if (!sourcePath && sourcePageUrl) {
      try {
        sourcePath = new URL(sourcePageUrl).pathname || ''
      } catch {
        if (sourcePageUrl.startsWith('/')) {
          sourcePath = sourcePageUrl.split('?')[0].split('#')[0] || ''
        }
      }
    }

    // Build notes text from ad-hoc form fields that don't map to Leads schema columns
    const notesParts: string[] = []
    if (body.customer_type) notesParts.push(`客户类型: ${body.customer_type}`)
    const system = body.currentSystem || body.current_system
    if (system) notesParts.push(`当前系统: ${system}`)

    const interests = Array.isArray(body.interest)
      ? body.interest
      : body.interest
        ? [body.interest]
        : []
    if (interests.length) notesParts.push(`关注服务: ${interests.join(', ')}`)

    const remark = body.remark || body.message || ''
    if (remark) notesParts.push(`补充说明: ${remark}`)

    const notes = notesParts.length ? notesParts.join('\n') : undefined

    // Create the lead with UTM data
    const createData: Record<string, unknown> = {
      name: body.name,
      company: body.company,
      phone: body.phone,
      source: body.source || 'unknown',
      sourcePath,
      sourcePageUrl,
      resourceTitle: body.resourceTitle || '',
      pageSlug: body.pageSlug || '',
      utmData: body.utmData ? {
        ...body.utmData,
        pageHistory: Array.isArray(body.utmData.pageHistory)
          ? JSON.stringify(body.utmData.pageHistory)
          : body.utmData.pageHistory || '',
      } : {
        utm_source: '',
        utm_medium: '',
        utm_campaign: '',
        utm_content: '',
        utm_term: '',
        referrer: '',
        landingPage: '',
        pageHistory: '',
      },
    }

    if (notes) createData.notes = notes

    await payload.create({
      collection: 'leads',
      data: createData as any,
    })

    return NextResponse.json({
      success: true,
      message: '提交成功',
    })
  } catch (error) {
    console.error('Error creating lead:', error)
    return NextResponse.json(
      { error: '提交失败，请稍后重试' },
      { status: 500 }
    )
  }
}
