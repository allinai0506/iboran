import { Metadata } from 'next'
import { ModernServiceYonSuiteContent } from './page.content'
import { GEOJsonLd } from '@/components/GEOJsonLd'

export const metadata: Metadata = {
  title: '成长型现代服务业ERP | YonSuite 云原生项目核算 | 泊冉软件',
  description: '泊冉软件为成长型项目型服务企业提供基于用友YonSuite的云原生数智化解决方案。覆盖项目全生命周期管理、移动工时填报、实时项目损益分析与全在线业财闭环。',
  keywords: [
    '成长型服务业ERP',
    'YonSuite项目管理',
    '云原生项目核算',
    '服务业业财一体化',
    '移动工时填报',
    '项目损益分析',
    '泊冉软件'
  ],
  alternates: {
    canonical: 'https://www.iboran.com/solution/industry/modern-service-yonsuite',
  },
}

export default function Page() {
  return (
    <>
      <GEOJsonLd 
        title="成长型现代服务业项目核算与经营分析方案"
        description="基于用友YonSuite云原生平台，为项目型服务企业提供极简立项、移动工时、实时毛利分析与高效业财一体化方案。"
        url="https://www.iboran.com/solution/industry/modern-service-yonsuite"
      />
      <ModernServiceYonSuiteContent />
    </>
  )
}
