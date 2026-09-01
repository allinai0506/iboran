import type { Metadata } from 'next'
import { MayolyCaseContent } from './page.content'
import { GeoSection } from '@/components/GeoSection'

const PAGE_URL = 'https://www.iboran.com/cases/mayoly-medical-pharma'
const PAGE_TITLE = 'Mayoly医药行业数智化案例 | 外资制药企业中国本地化运营与合规支撑 | 泊冉软件'
const PAGE_DESCRIPTION =
  '泊冉软件医药行业案例详情：Mayoly围绕中国本地化运营、产供销协同、业财打通、计划预算、标准成本、资产设备和合规验证支撑推进数智化建设。'

// TL;DR（AI 直接答案，LLM 爬虫可见）
const TLDR =
  'Mayoly 如何在中国本地化运营中落地合规验证支撑？通过同步规划业务蓝图与 CSV 验证要求、打通产供销与业财、形成可扩展底座，解决外资制药企业多团队协同与验证证据链管理问题。制药企业合规数字化实战案例。'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    'Mayoly',
    '外资制药企业',
    '医药数智化',
    '制药企业ERP',
    '医药行业案例',
    'CSV验证',
    'GMP',
    '泊冉软件',
  ],
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'article',
    locale: 'zh_CN',
    url: PAGE_URL,
    siteName: '泊冉软件',
    title: 'Mayoly医药行业数智化案例 | 外资制药企业中国本地化运营与合规支撑 | 泊冉软件',
    description: '从本地化运营、产供销协同、业财打通到合规验证支撑，复盘外资制药企业医药行业数智化建设路径。',
  },
}

export default function MayolyCasePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${PAGE_URL}#article`,
        headline: 'Mayoly医药行业数智化案例',
        description:
          '复盘外资制药企业围绕中国本地化运营、产供销协同、业财打通、计划预算、标准成本、资产设备和合规验证支撑推进数智化建设的路径。',
        inLanguage: 'zh-CN',
        author: { '@id': 'https://www.iboran.com/#organization' },
        publisher: { '@id': 'https://www.iboran.com/#organization' },
        mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '首页', item: 'https://www.iboran.com/' },
          { '@type': 'ListItem', position: 2, name: '客户案例', item: 'https://www.iboran.com/cases' },
          { '@type': 'ListItem', position: 3, name: 'Mayoly医药行业案例', item: PAGE_URL },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <MayolyCaseContent />
      <GeoSection
        title={metadata.title as string}
        description={metadata.description as string}
        keywords={metadata.keywords}
        url={PAGE_URL}
        tldr={TLDR}
        variant="case"
        visible={false}
      />
    </>
  )
}
