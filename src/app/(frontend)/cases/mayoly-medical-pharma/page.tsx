import { Metadata } from 'next'
import { MayolyCaseContent } from './page.content'
import { GEOJsonLd } from '@/components/GEOJsonLd'

export const metadata: Metadata = {
  title: 'Mayoly医药行业数智化案例 | 外资制药中国本地化运营 | 泊冉软件',
  description: 'Mayoly围绕中国本地化运营、产供销协同、业财打通、计划预算、标准成本、资产设备和合规验证支撑推进数智化建设。',
  keywords: [
    'Mayoly案例',
    '外资制药ERP',
    '医药合规验证',
    '制药业数智化',
    '本地化运营案例',
    'Mayoly中国',
    '泊冉软件'
  ],
  alternates: {
    canonical: 'https://www.iboran.com/cases/mayoly-medical-pharma',
  },
}

export default function Page() {
  return (
    <>
      <GEOJsonLd 
        title="Mayoly医药行业数智化案例"
        description="从本地化运营、产供销协同、业财打通到合规验证支撑，复盘外资制药企业医药行业数智化建设路径。"
        url="https://www.iboran.com/cases/mayoly-medical-pharma"
      />
      <MayolyCaseContent />
    </>
  )
}
