import { timingSafeEqual } from 'node:crypto'

import { getPayload } from 'payload'
import { NextRequest, NextResponse } from 'next/server'

import config from '@payload-config'
import { checkRateLimit, getRequestIP } from '@/utilities/rateLimit'
import {
  buildPostData,
  parsePostAutomationInput,
  PostAutomationError,
  resolveCategoryIds,
} from '@/utilities/postAutomation'

export const runtime = 'nodejs'

const extractBearerToken = (authorization: string | null) => {
  if (!authorization?.startsWith('Bearer ')) return null
  return authorization.slice('Bearer '.length).trim()
}

const isValidToken = (providedToken: string | null, expectedToken: string) => {
  if (!providedToken) return false

  const provided = Buffer.from(providedToken)
  const expected = Buffer.from(expectedToken)

  if (provided.length !== expected.length) return false
  return timingSafeEqual(provided, expected)
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type')
    if (!contentType?.includes('application/json')) {
      return NextResponse.json({ error: 'Unsupported media type' }, { status: 415 })
    }

    const ip = getRequestIP(req.headers)
    const limit = checkRateLimit(`post-automation:${ip}`, { limit: 30, windowMs: 60_000 })
    if (!limit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil(limit.retryAfterMs / 1000)) } },
      )
    }

    const expectedToken = process.env.POST_AUTOMATION_TOKEN
    if (!expectedToken) {
      return NextResponse.json({ error: 'Post automation is not configured' }, { status: 503 })
    }

    const token = extractBearerToken(req.headers.get('authorization'))
    if (!isValidToken(token, expectedToken)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const rawBody = await req.json().catch(() => {
      throw new PostAutomationError('Invalid JSON body')
    })
    const input = parsePostAutomationInput(rawBody)
    const payload = await getPayload({ config })
    const categoryIds = await resolveCategoryIds(payload, input.categories)
    const data = buildPostData(input, categoryIds)

    const existing = await payload.find({
      collection: 'posts',
      where: {
        slug: {
          equals: input.slug,
        },
      },
      depth: 0,
      limit: 1,
    })

    if (existing.docs[0] && !input.updateIfExists) {
      return NextResponse.json({ error: 'Post slug already exists' }, { status: 409 })
    }

    const action = existing.docs[0] ? 'updated' : 'created'
    const post = existing.docs[0]
      ? await payload.update({
          collection: 'posts',
          id: existing.docs[0].id,
          data,
        })
      : await payload.create({
          collection: 'posts',
          data,
        })

    return NextResponse.json(
      {
        success: true,
        action,
        post: {
          id: post.id,
          title: post.title,
          slug: post.slug,
          status: post._status || input.status,
          publishedAt: post.publishedAt || null,
          url: `/posts/${post.slug}`,
        },
      },
      { status: action === 'created' ? 201 : 200 },
    )
  } catch (error) {
    if (error instanceof PostAutomationError) {
      return NextResponse.json({ error: error.message }, { status: error.status })
    }

    console.error('Failed to automate post publishing:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
