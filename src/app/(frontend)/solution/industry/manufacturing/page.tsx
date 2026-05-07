import type { Metadata } from 'next'
import { ManufacturingContent } from './page.content'
import { GEOJsonLd } from '@/components/GEOJsonLd'

export const metadata: Metadata = {
  title: '制造业数智化解决方案_研产供销一体化与智能制造ERP｜泊冉软件',
  description: '泊冉软件提供制造业数智化解决方案，覆盖研发BOM、MPS/MRP计划、采购协同、生产报工、WMS库存、质量追溯、成本核算、业财一体化与AI经营分析，帮助制造企业打通研产供销财闭环。',
  keywords: '制造业ERP,制造业数智化解决方案,制造业业财一体化,智能制造ERP,生产管理系统,MRP物料需求计划,MPS主生产计划,质量追溯系统,生产成本核算,车间报工,WMS库存管理,MES集成,研产供销一体化',
  alternates: {
    canonical: 'https://www.iboran.com/solution/industry/manufacturing',
  },
}

export default function Page() {
  return (
    <>
      <GEOJsonLd 
        title="制造业数智化解决方案"
        description="面向制造企业的研产供销财一体化解决方案，覆盖研发、计划、采购、生产、仓储、质量、成本、财务和经营分析。"
        url="https://www.iboran.com/solution/industry/manufacturing"
      />
      <ManufacturingContent />
    </>
  )
}
