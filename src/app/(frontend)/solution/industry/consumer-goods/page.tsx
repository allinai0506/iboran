import type { Metadata } from 'next'
import React from 'react'
import ConsumerGoods from './ConsumerGoods'
import { consumerGoodsStructuredData } from './structured-data'

const PAGE_URL = 'https://www.iboran.com/solution/industry/consumer-goods'
const PAGE_TITLE = '消费品行业数智化解决方案_渠道业财一体化｜泊冉软件'
const PAGE_DESCRIPTION =
  '泊冉软件提供面向消费品行业的数智化解决方案，覆盖全渠道订单、DMS经销商协同、SFA终端执行、渠道价格、促销费用、销售返利、库存补货、产销计划、委外协同、质量追溯、应收对账、经营分析与业财一体化，支持从场景诊断、试点落地到系统集成推广。'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    '消费品行业数智化',
    'DMS经销商管理',
    'SFA终端执行',
    '消费品业财一体化',
    '全渠道营销',
    '经销商管理',
    '终端拜访',
    '营销费用管理',
    '多电商平台对账',
    '新零售',
    '供应链协同',
    '产销一体化',
    '生产计划',
    '质量追溯',
    '渠道价格管理',
    '库存补货',
    '泊冉软件',
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: '泊冉软件',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
}

export default function ConsumerGoodsPage() {
  return (
    <div className="cg-scope">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(consumerGoodsStructuredData) }}
      />
      <ConsumerGoods />
    </div>
  )
}
