import { Metadata } from 'next'
import { ETOManufacturingContent } from '../manufacturing-eto/page.content'
import { GEOJsonLd } from '@/components/GEOJsonLd'

export const metadata: Metadata = {
  title: '研发型定制 YonSuite 解决方案 | ETO/MTO 模式数智化 | 泊冉软件',
  description: '基于用友 YonSuite 提供研发型定制制造解决方案。支持 SaaS 模式下的项目计划、特征选配、订单 BOM、项目成本核算与外协协同。',
  keywords: [
    'ETO制造SaaS',
    'MTO生产管理',
    'YonSuite制造',
    '非标定制ERP',
    '订单BOM管理',
    '泊冉软件'
  ],
  alternates: {
    canonical: 'https://www.iboran.com/solution/industry/manufacturing-eto-yonsuite',
  },
}

export default function Page() {
  return (
    <>
      <GEOJsonLd 
        title="研发型定制 YonSuite 解决方案"
        description="面向中小型非标定制企业，提供基于 YonSuite 的 ETO/MTO 研产供销财一体化方案。"
        url="https://www.iboran.com/solution/industry/manufacturing-eto-yonsuite"
      />
      <ETOManufacturingContent />
    </>
  )
}
