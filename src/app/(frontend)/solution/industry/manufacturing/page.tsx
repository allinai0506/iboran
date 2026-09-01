import type { Metadata } from 'next'
import { ManufacturingContent } from './page.content'
import { manufacturingJsonLd, faqItems } from './structured-data'
import { GeoSection } from '@/components/GeoSection'
import type { GEOFAQ } from '@/components/GEORenderer'

const URL = 'https://www.iboran.com/solution/industry/manufacturing'

// TL;DR（AI 直接答案，LLM 爬虫可见）
const TLDR =
  '制造业数智化解决方案：面向机械装备、电子电气、芯片研发、高科技、汽配、化工新材料、食品、消费电子、个性化和多工厂协同等10类制造企业，把研发BOM、MPS/MRP/LRP计划、采购协同、生产报工、质量追溯、WMS库存、订单成本和AI经营分析串成研产供销财一体化闭环；车间执行、设备采集与MES集成可作为生产执行子场景。'

const geoFaqs: GEOFAQ[] = faqItems.map((f) => ({ question: f.q, answer: f.a }))

export const metadata: Metadata = {
  title: '制造业数智化解决方案_研产供销一体化与智能制造ERP｜泊冉软件',
  description:
    '泊冉软件提供制造业数智化解决方案，覆盖研发BOM、MPS/MRP计划、采购协同、生产报工、WMS库存、质量追溯、成本核算、业财一体化与AI经营分析，帮助制造企业打通研产供销财闭环。',
  keywords: [
    '制造业ERP',
    '制造业数智化解决方案',
    '制造业业财一体化',
    '智能制造ERP',
    '生产管理系统',
    'MRP物料需求计划',
    'MPS主生产计划',
    '质量追溯系统',
    '生产成本核算',
    '车间报工',
    'WMS库存管理',
    'MES集成',
    '研产供销一体化',
  ],
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: URL,
    siteName: '泊冉软件',
    title: '制造业数智化解决方案_研产供销一体化与智能制造ERP｜泊冉软件',
    description: '覆盖研发BOM、MPS/MRP计划、采购协同、生产报工、WMS库存、质量追溯、成本核算、业财一体化与AI经营分析。',
    images: [
      {
        url: 'https://www.iboran.com/assets/manufacturing/manufacturing-digital-og.png',
        width: 1200,
        height: 630,
        alt: '制造业数智化解决方案',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '制造业数智化解决方案_研产供销一体化与智能制造ERP｜泊冉软件',
    description: '覆盖研发BOM、MPS/MRP计划、采购协同、生产报工、WMS库存、质量追溯、成本核算、业财一体化与AI经营分析。',
  },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(manufacturingJsonLd) }}
      />
      <ManufacturingContent />
      <GeoSection
        title={metadata.title as string}
        description={metadata.description as string}
        keywords={metadata.keywords}
        url={URL}
        tldr={TLDR}
        faqs={geoFaqs}
        variant="solution"
        visible={false}
      />
    </>
  )
}