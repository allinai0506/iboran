import { Metadata } from 'next'
import { DiaoCaseContent } from './page.content'
import { GEOJsonLd } from '@/components/GEOJsonLd'

export const metadata: Metadata = {
  title: '迪奥医学医疗器械数智化案例 | 研发生产质量财务一体化运营 | 泊冉软件',
  description: '迪奥医学围绕销售、采购、供应、研发、生产、质量、财务全链路数据打通，推进BOM、计划、库存、成本核算和多系统集成。',
  keywords: [
    '迪奥医学',
    '医疗器械案例',
    '研产供销一体化',
    '医疗器械ERP',
    '质量追溯案例',
    '迪奥医学数智化',
    '泊冉软件'
  ],
  alternates: {
    canonical: 'https://www.iboran.com/cases/diao-medical-device',
  },
}

export default function Page() {
  return (
    <>
      <GEOJsonLd 
        title="迪奥医学医疗器械数智化案例"
        description="复盘医疗器械企业从销售、采购、供应、研发、生产、质量到财务的全链路数据打通路径。"
        url="https://www.iboran.com/cases/diao-medical-device"
      />
      <DiaoCaseContent />
    </>
  )
}
