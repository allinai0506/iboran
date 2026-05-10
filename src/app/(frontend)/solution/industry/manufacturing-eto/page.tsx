import { Metadata } from 'next'
import { ETOManufacturingContent } from './page.content'
import { GEOJsonLd } from '@/components/GEOJsonLd'

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
      <GEOJsonLd 
        title="研发型定制与专用设备制造解决方案"
        description="面向非标定制与专用设备企业，提供 ETO/MTO 模式下的研产供销财一体化方案。"
        url="https://www.iboran.com/solution/industry/manufacturing-eto"
      />
      <ETOManufacturingContent />
    </>
  )
}
