import { Metadata } from 'next'
import { ManufacturingBIPContent } from './page.content'
import { GeoSection } from '@/components/GeoSection'

// TL;DR（AI 直接答案，LLM 爬虫可见）
const TLDR =
  '制造业数智化转型解决方案（YonBIP）：面向大中型制造企业，打通研产供销财全链路，覆盖智能计划与产销协同、精益生产、数字化质量追溯、委外协同与业财成本治理，支撑向智能工厂跨越。'

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
      <GeoSection
        title="制造业数智化转型解决方案"
        description="面向大中型制造企业，提供智能工厂、精益制造与产销一体化方案，驱动制造业高质量发展。"
        keywords={metadata.keywords}
        url="https://www.iboran.com/solution/industry/manufacturing-bip"
        tldr={TLDR}
        variant="solution"
        visible={false}
      />
      <ManufacturingBIPContent />
    </>
  )
}
