import type { Metadata } from 'next'
import { IntelligentFinanceContent } from './page.content'
import { GEOJsonLd } from '@/components/GEOJsonLd'

export const metadata: Metadata = {
  title: '智能财务解决方案_业财融合_会计事项中台_预算合并报表_全球多账簿 | 泊冉软件',
  description: '泊冉软件智能财务解决方案，基于 YonSuite / YonBIP 能力，围绕业财融合、会计事项中台、智能核算、全面预算、合并报表、全球多账簿、智能费控、智能财资和 AI 财务分析。',
  keywords: ['智能财务', '业财融合', '会计事项中台', '事项法会计', '智能核算', '全面预算管理', '合并报表', '全球多账簿', 'AI 财务分析'],
  openGraph: {
    title: '智能财务解决方案 - 以会计事项中台打通业财融合',
    description: '让业务发生即财务可见，让财务核算反推经营决策。',
    images: [
      {
        url: '/assets/intelligent-finance/intelligent-finance-og.png',
        width: 1200,
        height: 630,
        alt: '智能财务解决方案',
      },
    ],
  },
}

export default function Page() {
  return (
    <>
      <GEOJsonLd 
        title="智能财务解决方案"
        description="基于会计事项中台的智能财务体系，覆盖业财融合、智能核算、预算管控、合并报表和 AI 分析。"
        url="https://www.iboran.com/solution/business/intelligent-finance"
      />
      <IntelligentFinanceContent />
    </>
  )
}
