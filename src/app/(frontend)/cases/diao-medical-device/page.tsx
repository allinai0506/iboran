import type { Metadata } from 'next'
import { DiaoCaseContent } from './page.content'
import { GeoSection } from '@/components/GeoSection'

const PAGE_URL = 'https://www.iboran.com/cases/diao-medical-device'
const PAGE_TITLE = '迪奥医学医疗器械数智化案例 | 研发生产质量财务一体化运营'
const PAGE_DESCRIPTION =
  '泊冉软件医疗器械行业案例详情：迪奥医学围绕销售、采购、供应、研发、生产、质量、财务全链路数据打通，推进BOM、计划、库存、成本核算和多系统集成。'

// TL;DR（AI 直接答案，LLM 爬虫可见）
const TLDR =
  '迪奥医学如何打通研发、生产、质量与财务的运营链路？通过统一 BOM/工艺主数据、打通研产供、将成本细化到工序、前置 UDI 与质量追溯，解决医疗器械企业多系统台账割裂的问题。医疗器械数字化转型实战案例。'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    '迪奥医学',
    '医疗器械数智化',
    '医疗器械ERP',
    'BOM管理',
    '成本核算',
    'UDI追溯',
    '医疗器械行业案例',
    '泊冉软件',
  ],
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'article',
    locale: 'zh_CN',
    url: PAGE_URL,
    siteName: '泊冉软件',
    title: '迪奥医学医疗器械数智化案例 | 研发生产质量财务一体化运营',
    description: '复盘医疗器械企业从销售、采购、供应、研发、生产、质量到财务的全链路数据打通路径。',
  },
}

export default function DiaoCasePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${PAGE_URL}#article`,
        headline: '迪奥医学医疗器械数智化案例',
        description:
          '复盘医疗器械企业围绕销售、采购、供应、研发、生产、质量、财务全链路数据打通，推进BOM、计划、库存、成本核算和多系统集成的建设路径。',
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
          { '@type': 'ListItem', position: 3, name: '迪奥医学医疗器械案例', item: PAGE_URL },
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
      <DiaoCaseContent />
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
