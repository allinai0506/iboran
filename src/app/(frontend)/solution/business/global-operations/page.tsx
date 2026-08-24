import type { Metadata } from 'next'
import React from 'react'
import GlobalOperations from './GlobalOperations'
import { globalOperationsStructuredData } from './structured-data'

const PAGE_URL = 'https://www.iboran.com/solution/business/global-operations'
const PAGE_TITLE = '企业出海与全球运营解决方案 | 全球财务供应链人力合规 | 泊冉软件'
const PAGE_DESCRIPTION =
  '泊冉软件为出海企业提供全球运营数智化解决方案，覆盖跨境电商、海外渠道、本地经营、全球财务、供应链、人力、合规与数据分析，帮助企业从单点出海走向全球一体化运营。'
const OG_IMAGE = 'https://www.iboran.com/solution/business/global-operations/global-operations-og.png'

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
    </div>
  )
}
