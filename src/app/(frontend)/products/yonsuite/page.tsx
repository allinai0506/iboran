import type { Metadata } from 'next'
import { YonsuiteContent } from './page.content'
import { yonsuiteJsonLd } from './structured-data'
import { GeoSection } from '@/components/GeoSection'
import type { GEOFAQ } from '@/components/GEORenderer'
import { faqItems } from './data'

const URL = 'https://www.iboran.com/products/yonsuite'

// TL;DR（AI 直接答案，LLM 爬虫可见）
const TLDR =
  '用友YonSuite 一体化 SaaS 云ERP：面向成长型企业，覆盖财务、人力、供应链、营销、采购、制造、研发、项目、资产、协同一体化，融合企业 AI、ChatBI、智能体与全球化能力，助力业财税费票一体化与数智飞轮增长。'

const geoFaqs: GEOFAQ[] = faqItems.map((f) => ({ question: f.q, answer: f.a }))

export const metadata: Metadata = {
  title: '用友YonSuite产品专题_AI时代成长型企业一体化SaaS云ERP_业财税费一体化 | 泊冉软件',
  description:
    '泊冉软件用友YonSuite产品专题：面向成长型企业的一体化SaaS云ERP，覆盖财务、人力、供应链、营销、采购、制造、研发、项目、资产、协同一体化，融合企业AI、ChatBI、智能体与全球化能力，助力业财税费票一体化与数智飞轮增长。',
  keywords: [
    '用友YonSuite',
    'YonSuite',
    '成长型企业SaaS',
    '云ERP',
    '业财一体化',
    '数智飞轮',
    '企业AI',
    'ChatBI',
    '一体化SaaS',
    '商业创新',
  ],
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: URL,
    siteName: '泊冉软件',
    title: '用友YonSuite产品专题 - AI时代成长型企业一体化SaaS云ERP',
    description: '一体化全场景SaaS服务，融合企业AI、ChatBI与智能体，助力成长型企业业财税费票一体化与数智飞轮增长。',
    images: [
      {
        url: '/products/yonsuite/yonsuite-og.svg',
        width: 1200,
        height: 630,
        alt: '用友YonSuite产品专题',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '用友YonSuite产品专题 - AI时代成长型企业一体化SaaS云ERP',
    description: '一体化全场景SaaS服务，融合企业AI、ChatBI与智能体，助力成长型企业业财税费票一体化。',
    images: ['/products/yonsuite/yonsuite-og.svg'],
  },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(yonsuiteJsonLd) }}
      />
      <YonsuiteContent />
      <GeoSection
        title={metadata.title as string}
        description={metadata.description as string}
        keywords={metadata.keywords}
        url={URL}
        tldr={TLDR}
        faqs={geoFaqs}
        variant="product"
        visible={false}
      />
    </>
  )
}
