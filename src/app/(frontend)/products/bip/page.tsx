import type { Metadata } from 'next'
import { BipContent } from './page.content'
import { bipJsonLd } from './structured-data'

const URL = 'https://www.iboran.com/products/bip'

export const metadata: Metadata = {
  title: '用友BIP商业创新平台_集团ERP升级与企业AI方案｜泊冉软件',
  description:
    '泊冉软件提供用友BIP咨询、销售支持、实施、交付、迁移、集成、信创适配与企业AI落地服务，支持新建BIP，以及NC、NCC、U8、U9、金蝶、SAP、Oracle等系统升级、迁移、并行与集成，覆盖财务、供应链、采购、制造、人力、资产、项目、协同、YonGPT、智友、DataAgent和企业智能体场景。',
  keywords: [
    '用友BIP',
    'YonBIP',
    '用友BIP实施',
    '用友BIP服务商',
    '用友BIP迁移',
    '用友BIP集成',
    '用友BIP信创替代',
    '用友BIP企业AI',
    'YonGPT',
    '智友',
    'DataAgent',
    'NC升级BIP',
    'NCC升级BIP',
    'U8升级BIP',
    'U9升级BIP',
    '金蝶迁移用友BIP',
    'SAP迁移用友BIP',
    'Oracle迁移用友BIP',
    'ERP国产替代',
    '集团ERP升级',
  ],
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: URL,
    siteName: '泊冉软件',
    title: '用友BIP商业创新平台｜泊冉软件',
    description: '面向大中型企业和集团型企业，围绕用友BIP建设业务创新、数据治理、智能运营和产业协同能力。',
    images: [
      {
        url: '/products/bip/yonyou-bip-og.svg',
        width: 1200,
        height: 630,
        alt: '用友BIP商业创新平台',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '用友BIP商业创新平台｜泊冉软件',
    description: '面向大中型企业和集团型企业，建设业务创新、数据治理、智能运营和产业协同能力。',
    images: ['/products/bip/yonyou-bip-og.svg'],
  },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bipJsonLd) }}
      />
      <BipContent />
    </>
  )
}
