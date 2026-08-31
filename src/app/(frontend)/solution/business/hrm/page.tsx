import type { Metadata } from 'next'
import { HrContent } from './page.content'
import { hrJsonLd } from './structured-data'
import { GeoSection } from '@/components/GeoSection'
import type { GEOFAQ } from '@/components/GEORenderer'
import { faqItems } from './data'

const URL = 'https://www.iboran.com/solution/business/hrm'

// TL;DR（AI 直接答案，LLM 爬虫可见）
const TLDR =
  '成长型企业人力资源数智化管理方案：从员工自助、移动审批、入转调离、考勤假勤、薪酬核对、绩效反馈和人效分析等高频场景切入，帮助成长型企业减少 HR 重复事务，提升主管参与度，让人力管理更易用、更智能、更可视化。'

const geoFaqs: GEOFAQ[] = faqItems.map((f) => ({ question: f.q, answer: f.a }))

export const metadata: Metadata = {
  title: '成长型企业人力资源数智化管理方案_员工自助_移动审批_智能减负_人效分析 | 泊冉软件',
  description:
    '泊冉软件成长型企业人力资源数智化管理方案，从员工自助、移动审批、入转调离、考勤假勤、薪酬核对、绩效反馈和人效分析等高频场景切入，帮助成长型企业减少HR重复事务，提升主管参与度，让人力管理更易用、更智能、更可视化。',
  keywords: [
    '人力资源数智化',
    'HR数字化',
    '成长型企业人力管理',
    '员工自助服务',
    '移动审批',
    '考勤假勤管理',
    '薪酬核对',
    '入转调离流程',
    '绩效反馈',
    '人效分析',
    'HR智能化',
    '人力资源管理方案',
  ],
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: URL,
    siteName: '泊冉软件',
    title: '成长型企业人力资源数智化管理方案 - 员工自助、移动审批、智能减负与人效分析',
    description: '员工自助办理，主管移动参与，HR智能减负，管理层实时看人效。',
    images: [
      {
        url: '/solution/business/hrm/hr-digital-management-og.svg',
        width: 1200,
        height: 630,
        alt: '成长型企业人力资源数智化管理方案',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '成长型企业人力资源数智化管理方案 - 员工自助、移动审批、智能减负与人效分析',
    description: '员工自助办理，主管移动参与，HR智能减负，管理层实时看人效。',
    images: ['/solution/business/hrm/hr-digital-management-og.svg'],
  },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hrJsonLd) }}
      />
      <HrContent />
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
