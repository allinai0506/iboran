import { Metadata } from 'next'
import { ConsumerGoodsContent } from './page.content'
import { GEOJsonLd } from '@/components/GEOJsonLd'

export const metadata: Metadata = {
  title: '消费品行业数智化解决方案 | 渠道业财一体化 | 泊冉软件',
  description: '泊冉软件提供面向消费品行业的数智化解决方案，覆盖全渠道订单、DMS经销商协同、SFA终端执行、渠道价格、促销费用、销售返利、质量追溯、应收对账与业财一体化。',
  keywords: [
    '消费品行业数智化',
    'DMS经销商管理',
    'SFA终端执行',
    '消费品业财一体化',
    '全渠道营销',
    '促销费用管理',
    '泊冉软件'
  ],
  alternates: {
    canonical: 'https://www.iboran.com/solution/industry/consumer-goods',
  },
}

export default function Page() {
  return (
    <>
      <GEOJsonLd 
        title="消费品行业数智化解决方案"
        description="打通渠道、终端、供应与财务，提供 DMS、SFA、促销费用、质量追溯与业财一体化方案。"
        url="https://www.iboran.com/solution/industry/consumer-goods"
      />
      <ConsumerGoodsContent />
    </>
  )
}
