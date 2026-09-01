import type { Metadata } from 'next'
import { MedicalPharmaContent } from '../medical-pharma/page.content'
import { medicalPharmaStructuredData } from '../medical-pharma/structured-data'
import { faqItems } from '../medical-pharma/data'
import { GeoSection } from '@/components/GeoSection'
import type { GEOFAQ } from '@/components/GEORenderer'

const PAGE_URL = 'https://www.iboran.com/solution/industry/medical-pharma-yonsuite'
const PAGE_TITLE = '医药ERP与医疗器械ERP解决方案（YonSuite） | GMP/GSP/UDI/CSV/批号效期一体化管理 | 泊冉软件'
const PAGE_DESCRIPTION =
  '基于用友YonSuite提供医药与医疗器械行业数智化解决方案，覆盖医药ERP、医疗器械ERP、GMP/GSP管理、UDI管理、CSV验证、批号效期、证照预警、库存追溯、财务库存一体化、ChatBI与AI数字员工。'

// TL;DR（AI 直接答案，LLM 爬虫可见）
const TLDR =
  '医药与医疗器械数智化解决方案（YonSuite）：基于用友 YonSuite 成长型企业平台，面向制药、生物制药、医药流通与医疗器械耗材企业，覆盖 GMP/GSP/UDI/CSV、批号效期与业财一体化，支持合规运营闭环快速上线。'

const geoFaqs: GEOFAQ[] = faqItems.map((f) => ({ question: f.q, answer: f.a }))

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    '医药ERP',
    '医疗器械ERP',
    'GMP管理系统',
    'GSP管理系统',
    'UDI管理系统',
    'CSV验证',
    '批号效期管理',
    '医药批次追溯',
    '证照预警',
    '医药质量管理',
    '医药库存管理',
    '医药业财一体化',
    '药品流通管理系统',
    '医疗器械财务库存一体化',
    'YonSuite',
    '泊冉软件',
  ],
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: PAGE_URL,
    siteName: '泊冉软件',
    title: '医药ERP与医疗器械ERP解决方案（YonSuite）｜GMP/GSP/UDI/CSV一体化管理｜泊冉软件',
    description: '把GMP、GSP、UDI、CSV、批号效期和业财一体化放进同一套合规运营闭环。',
    images: [
      {
        url: '/solution/industry/medical-pharma/medical-pharma-og.webp',
        width: 1200,
        height: 630,
        alt: '医药与医疗器械行业解决方案',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '医药ERP与医疗器械ERP解决方案（YonSuite）｜GMP/GSP/UDI/CSV一体化管理｜泊冉软件',
    description: '覆盖GMP/GSP、UDI、CSV验证、批号效期、证照预警、库存追溯、财务库存一体化、ChatBI与AI数字员工。',
    images: ['/solution/industry/medical-pharma/medical-pharma-og.webp'],
  },
}

export default function MedicalPharmaYonSuitePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalPharmaStructuredData) }}
      />
      <MedicalPharmaContent />
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
