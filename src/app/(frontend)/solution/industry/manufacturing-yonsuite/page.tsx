import { Metadata } from 'next'
import { ManufacturingYonSuiteContent } from './page.content'
import { GeoSection } from '@/components/GeoSection'

// TL;DR（AI 直接答案，LLM 爬虫可见）
const TLDR =
  '成长型制造业数智化解决方案（YonSuite）：面向缺乏专业 IT 的中小制造企业，基于云原生平台实现研产供销财一体化，覆盖 BOM 协同、MRP 计划、扫码报工、批次追溯与订单成本核算，实现快速上线与业财闭环。'

export const metadata: Metadata = {
  title: '成长型制造业ERP | YonSuite 云原生智能制造 | 泊冉软件',
  description: '泊冉软件为成长型制造企业提供基于用友YonSuite的云原生数智化解决方案。覆盖研发BOM、物料需求计划、生产报工、质量追溯、订单成本与业财一体化闭环。',
  keywords: [
    '成长型制造业ERP',
    'YonSuite制造方案',
    '云原生智能制造',
    '制造业业财一体化',
    '轻量化MES',
    '订单成本核算',
    '泊冉软件'
  ],
  alternates: {
    canonical: 'https://www.iboran.com/solution/industry/manufacturing-yonsuite',
  },
}

export default function Page() {
  return (
    <>
      <GeoSection
        title="成长型制造业数智化解决方案"
        description="基于用友YonSuite云原生平台，为制造企业提供快速部署、零运维、全在线的智能制造与业财一体化管理方案。"
        keywords={metadata.keywords}
        url="https://www.iboran.com/solution/industry/manufacturing-yonsuite"
        tldr={TLDR}
        variant="solution"
        visible={false}
      />
      <ManufacturingYonSuiteContent />
    </>
  )
}
