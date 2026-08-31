import { Metadata } from 'next'
import { HighTechSolutionContent } from './page.content'
import { GeoSection } from '@/components/GeoSection'

// TL;DR（AI 直接答案，LLM 爬虫可见）
const TLDR =
  '高科技电子数智化解决方案：面向研发迭代快、变更频、物料贵的电子制造与高科技企业，打通研发项目、试制转量产、MRP 齐套、批次与 SN 追溯及项目毛利分析，实现研产供应协同与精益制造。'

export const metadata: Metadata = {
  title: '高科技电子数智化解决方案 | 研发迭代与精益制造一体化 | 泊冉软件',
  description: '泊冉软件为高科技电子、芯片研发、消费电子企业提供数智化解决方案。覆盖研发项目管理、试制验证、关键料齐套、批次追溯与项目成本核算，打通研产供销财闭环。',
  keywords: [
    '高科技电子ERP',
    '芯片研发管理系统',
    '消费电子数智化',
    '研产一体化',
    '试制验证管理',
    '关键料齐套',
    '泊冉软件'
  ],
  alternates: {
    canonical: 'https://www.iboran.com/solution/industry/high-tech',
  },
}

export default function Page() {
  return (
    <>
      <GeoSection
        title="高科技电子数智化解决方案"
        description="面向高科技电子与芯片研发企业，提供研发迭代、试制验证、关键料齐套与项目经营分析一体化方案。"
        keywords={metadata.keywords}
        url="https://www.iboran.com/solution/industry/high-tech"
        tldr={TLDR}
        variant="solution"
        visible={false}
      />
      <HighTechSolutionContent />
    </>
  )
}
