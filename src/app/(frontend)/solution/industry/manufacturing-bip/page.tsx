import { Metadata } from 'next'
import { ManufacturingBIPContent } from './page.content'
import { GEOJsonLd } from '@/components/GEOJsonLd'

export const metadata: Metadata = {
  title: '制造业数智化转型解决方案 | YonBIP 工业一体化 | 泊冉软件',
  description: '基于用友 YonBIP 为大中型制造企业提供数智化转型方案。涵盖智能工厂、产销协同、物料齐套、质量追溯、项目成本与精益制造，打通研产供销财全链路。',
  keywords: [
    '制造业数智化',
    '智能工厂解决方案',
    'YonBIP制造',
    '产销协同ERP',
    '工业4.0',
    '泊冉软件'
  ],
  alternates: {
    canonical: 'https://www.iboran.com/solution/industry/manufacturing-bip',
  },
}

export default function Page() {
  return (
    <>
      <GEOJsonLd 
        title="制造业数智化转型解决方案"
        description="面向大中型制造企业，提供智能工厂、精益制造与产销一体化方案，驱动制造业高质量发展。"
        url="https://www.iboran.com/solution/industry/manufacturing-bip"
      />
      <ManufacturingBIPContent />
    </>
  )
}
