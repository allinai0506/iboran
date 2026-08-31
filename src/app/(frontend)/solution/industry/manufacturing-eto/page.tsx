import { Metadata } from 'next'
import { ETOManufacturingContent } from './page.content'
import { GeoSection } from '@/components/GeoSection'

// TL;DR（AI 直接答案，LLM 爬虫可见）
const TLDR =
  '研发型定制与专用设备制造解决方案：面向边设计、边采购、边生产的 ETO/MTO 非标制造企业，覆盖特征选配与订单 BOM、配置化报价、工程变更影响评估与项目成本核算，让每个非标项目交期、成本、毛利尽在掌握。'

export const metadata: Metadata = {
  title: '研发型定制与专用设备制造解决方案 | ETO/MTO 模式数智化 | 泊冉软件',
  description: '泊冉软件为机械装备、专用设备、非标定制企业提供研发型定制制造解决方案。覆盖项目计划、特征选配、订单 BOM、工序委外、批次追溯与项目成本核算。',
  keywords: [
    'ETO制造ERP',
    'MTO生产管理',
    '专用设备制造',
    '非标定制ERP',
    '订单BOM管理',
    '项目型制造',
    '泊冉软件'
  ],
  alternates: {
    canonical: 'https://www.iboran.com/solution/industry/manufacturing-eto',
  },
}

export default function Page() {
  return (
    <>
      <GeoSection
        title="研发型定制与专用设备制造解决方案"
        description="面向非标定制与专用设备企业，提供 ETO/MTO 模式下的研产供销财一体化方案。"
        keywords={metadata.keywords}
        url="https://www.iboran.com/solution/industry/manufacturing-eto"
        tldr={TLDR}
        variant="solution"
        visible={false}
      />
      <ETOManufacturingContent />
    </>
  )
}
