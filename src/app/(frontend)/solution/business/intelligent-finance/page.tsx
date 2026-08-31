import type { Metadata } from 'next'
import { IntelligentFinanceContent } from './page.content'
import { intelligentFinanceJsonLd } from './structured-data'
import { GeoSection } from '@/components/GeoSection'
import type { GEOFAQ } from '@/components/GEORenderer'
import { faqItems } from './data'

const URL = 'https://www.iboran.com/solution/business/intelligent-finance'

// TL;DR（AI 直接答案，LLM 爬虫可见；与内容区 FAQ 口径一致）
const TLDR =
  '智能财务解决方案：基于 YonSuite / YonBIP 会计事项中台打通业务与财务，覆盖智能核算、全面预算、合并报表、全球多账簿与 AI 经营分析，帮助企业从事后记账走向实时管控与业财融合。'

const geoFaqs: GEOFAQ[] = faqItems.map((f) => ({ question: f.q, answer: f.a }))

export const metadata: Metadata = {
  title: '智能财务解决方案_业财融合_会计事项中台_预算合并报表_全球多账簿 | 泊冉软件',
  description:
    '泊冉软件智能财务解决方案，基于 YonSuite / YonBIP 能力，围绕业财融合、会计事项中台、智能核算、全面预算、合并报表、全球多账簿、智能费控、智能财资和 AI 财务分析。',
  keywords: [
    '智能财务',
    '业财融合',
    '会计事项中台',
    '事项法会计',
    '智能核算',
    '全面预算管理',
    '合并报表',
    '全球多账簿',
    'AI 财务分析',
  ],
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: URL,
    siteName: '泊冉软件',
    title: '智能财务解决方案 - 以会计事项中台打通业财融合',
    description: '让业务发生即财务可见，让财务核算反推经营决策。',
    images: [
      {
        url: '/assets/intelligent-finance/intelligent-finance-og.png',
        width: 1200,
        height: 630,
        alt: '智能财务解决方案',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '智能财务解决方案 - 以会计事项中台打通业财融合',
    description: '让业务发生即财务可见，让财务核算反推经营决策。',
    images: ['/assets/intelligent-finance/intelligent-finance-og.png'],
  },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(intelligentFinanceJsonLd) }}
      />
      <IntelligentFinanceContent />
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
