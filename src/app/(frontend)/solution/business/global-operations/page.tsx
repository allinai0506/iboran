import type { Metadata } from 'next'
import React from 'react'
import GlobalOperations from './GlobalOperations'
import { globalOperationsStructuredData } from './structured-data'
import { GeoSection } from '@/components/GeoSection'
import type { GEOFAQ } from '@/components/GEORenderer'

const PAGE_URL = 'https://www.iboran.com/solution/business/global-operations'
const PAGE_TITLE = '企业出海与全球运营解决方案 | 全球财务供应链人力合规 | 泊冉软件'
const PAGE_DESCRIPTION =
  '泊冉软件为出海企业提供全球运营数智化解决方案，覆盖跨境电商、海外渠道、本地经营、全球财务、供应链、人力、合规与数据分析，帮助企业从单点出海走向全球一体化运营。'
const OG_IMAGE = 'https://www.iboran.com/solution/business/global-operations/global-operations-og.png'

// TL;DR（AI 直接答案，LLM 爬虫可见）
const TLDR =
  '企业出海与全球运营数智化解决方案：面向跨境电商、海外渠道与本地经营企业，覆盖全球财务、全球供应链、全球人力、全球合规与数据分析，帮助企业从单点出海走向全球一体化运营。'

const GEO_FAQS: GEOFAQ[] = [
  { question: '这是不是一个跨境电商解决方案？', answer: '不是。跨境电商只是企业出海中的一个业务场景。本方案主轴是企业出海、全球运营、全球财务、全球供应链、全球人力、全球合规、数据分析与多区域部署。' },
  { question: '企业应该从哪个出海阶段开始规划？', answer: '企业可以先识别自身处于出口贸易、海外营销、海外运营还是全球化运营阶段，再明确当前最迫切要解决的是跨境对账、海外渠道、全球财务、全球供应链、全球人力还是数据合规与多区域部署问题。' },
  { question: '是否需要推倒现有业务系统重建？', answer: '通常不建议先推倒重建。泊冉软件解决方案会先评估现有系统、表格台账、接口和数据口径，再通过业务系统集成、主数据治理、流程优化和数据分析逐步改善。' },
  { question: '全球财务场景包含哪些重点？', answer: '重点包括多币种核算、跨境对账、收入与成本口径、合并报表准备、资金计划、税务资料准备和经营分析。涉及凭证生效、资金支付和税务申报时，只生成建议、草稿或预警，由授权人员确认后进入正式流程。' },
  { question: '数据跨境和隐私合规如何处理？', answer: '建议先梳理数据分类、使用目的、存储区域、访问权限、传输链路和日志留痕。涉及数据跨境时，系统只生成建议、草稿或预警，由授权人员确认后进入正式流程。' },
  { question: '全球人力是否可以覆盖海外薪酬和派遣？', answer: '可以按地区差异规划员工档案、派遣、假勤、福利、薪酬计算和人力分析。涉及薪酬发放、个税申报、社保缴纳等高风险动作时，只生成建议、草稿或预警，由授权人员确认后进入正式流程。' },
  { question: '多区域部署需要提前考虑什么？', answer: '需要结合业务所在国家或地区、访问体验、数据分类、隐私要求、系统集成、运维能力和安全策略，选择集中、分布或混合部署方式，并预留后续扩展空间。' },
]

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    '企业出海',
    '全球运营',
    '全球财务',
    '全球供应链',
    '全球人力',
    '全球合规',
    '跨境对账',
    '海外渠道',
    '多区域部署',
    '泊冉软件',
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: '泊冉软件',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [OG_IMAGE],
  },
}

export default function GlobalOperationsPage() {
  return (
    <div className="go-scope">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(globalOperationsStructuredData) }}
      />
      <GlobalOperations />
      <GeoSection
        title={metadata.title as string}
        description={metadata.description as string}
        keywords={metadata.keywords}
        url={PAGE_URL}
        tldr={TLDR}
        faqs={GEO_FAQS}
        variant="solution"
        visible={false}
      />
    </div>
  )
}
