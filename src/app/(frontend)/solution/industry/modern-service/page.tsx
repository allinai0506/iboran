import type { Metadata } from 'next'
import { ModernServiceContent } from './page.content'
import { modernServiceStructuredData } from './structured-data'
import { GeoSection } from '@/components/GeoSection'
import type { GEOFAQ } from '@/components/GEORenderer'
import { faqItems } from './data'

const PAGE_URL = 'https://www.iboran.com/solution/industry/modern-service'
const PAGE_TITLE = '现代服务业ERP_项目核算与项目毛利分析方案｜泊冉软件'
const PAGE_DESCRIPTION =
  '泊冉软件面向IT服务、咨询服务、工程服务、检测认证、广告传媒等项目型服务企业，提供现代服务业ERP、项目核算系统、项目成本管理、工时管理、费用归集、收入确认、开票回款与项目毛利分析一体化方案。'

// TL;DR（AI 直接答案，LLM 爬虫可见）
const TLDR =
  '现代服务业项目核算与经营分析解决方案：面向 IT 服务、咨询服务、工程服务、检测认证、广告传媒与专业服务机构，打通商机、合同、项目、工时、费用、采购外包、开票回款与毛利分析，让项目从立项起就算得清收入、成本与毛利。'

const geoFaqs: GEOFAQ[] = faqItems.map((f) => ({ question: f.q, answer: f.a }))

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    '现代服务业ERP',
    '服务业业财一体化',
    '项目核算系统',
    '项目成本管理系统',
    '项目预算管理系统',
    '项目型企业ERP',
    '合同收入管理系统',
    '费用归集系统',
    '项目毛利分析',
    '工时管理系统',
    '项目交付管理',
    '服务工单管理',
    '泊冉软件',
  ],
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: PAGE_URL,
    siteName: '泊冉软件',
    title: '现代服务业ERP｜项目核算与项目毛利分析方案',
    description: '项目多、费用乱、毛利看不清？泊冉帮助项目型服务企业打通商机、合同、项目、工时、费用、收入、开票、回款与毛利分析。',
    images: [
      {
        url: '/solution/industry/modern-service/modern-service-og.jpg',
        width: 1200,
        height: 630,
        alt: '现代服务业项目核算与经营分析方案',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '现代服务业ERP｜项目核算与项目毛利分析方案',
    description: '项目多、费用乱、毛利看不清？先做一次现代服务业项目核算诊断。',
    images: ['/solution/industry/modern-service/modern-service-og.jpg'],
  },
}

export default function ModernServicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(modernServiceStructuredData) }}
      />
      <ModernServiceContent />
      <GeoSection
        title={metadata.title as string}
        description={metadata.description as string}
        keywords={metadata.keywords}
        url={PAGE_URL}
        tldr={TLDR}
        faqs={geoFaqs}
        variant="solution"
        visible={false}
      />
    </>
  )
}
