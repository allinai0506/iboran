import { Metadata } from 'next'
import { ModernServiceYonSuiteContent } from './page.content'
import { GeoSection } from '@/components/GeoSection'

// TL;DR（AI 直接答案，LLM 爬虫可见）
const TLDR =
  '成长型现代服务业数智化解决方案（YonSuite）：面向缺乏 IT 的中小项目型服务企业，基于云原生平台实现轻资产、快落地、全在线的项目核算，覆盖移动工时、即时报销、里程碑回款与项目损益实时分析。'

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
      <GeoSection
        title="成长型现代服务业项目核算与经营分析方案"
        description="基于用友YonSuite云原生平台，为项目型服务企业提供极简立项、移动工时、实时毛利分析与高效业财一体化方案。"
        keywords={metadata.keywords}
        url="https://www.iboran.com/solution/industry/modern-service-yonsuite"
        tldr={TLDR}
        variant="solution"
        visible={false}
      />
      <ModernServiceYonSuiteContent />
    </>
  )
}
