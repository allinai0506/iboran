import { Metadata } from 'next'
import { GlobalOperationsContent } from './page.content'
import { GEOJsonLd } from '@/components/GEOJsonLd'

export const metadata: Metadata = {
  title: '企业出海与全球运营解决方案 | 全球财务供应链人力合规 | 泊冉软件',
  description: '泊冉软件为出海企业提供全球运营数智化解决方案，覆盖跨境电商、海外渠道、本地经营、全球财务、供应链、人力、合规与数据分析，帮助企业从单点出海走向全球一体化运营。',
  keywords: [
    '企业出海',
    '全球运营',
    '全球财务',
    '全球供应链',
    '全球人力',
    '全球合规',
    '跨境对账',
    '泊冉软件'
  ],
  alternates: {
    canonical: 'https://www.iboran.com/solution/business/global-operations',
  },
}

export default function Page() {
  return (
    <>
      <GEOJsonLd 
        title="企业出海与全球运营解决方案"
        description="面向出海企业，提供全球财务、供应链、人力、合规、跨境对账和多区域部署一体化方案。"
        url="https://www.iboran.com/solution/business/global-operations"
      />
      <GlobalOperationsContent />
    </>
  )
}
