import { Metadata } from 'next'
import { StateOwnedContent } from './page.content'
import { GEOJsonLd } from '@/components/GEOJsonLd'

export const metadata: Metadata = {
  title: '国资国企数智化转型解决方案 - 激活数智新动能 | 泊冉软件',
  description: '泊冉软件为国资国企提供一站式数字化转型解决方案，涵盖智慧国资监管、国有资本投资运营、企业数字化转型等领域，助力国资国企构建"智慧监管+智能运营"体系，推动国有资本布局优化和结构调整。',
  keywords: [
    '国资国企',
    '数字化转型',
    '智慧国资',
    '国资监管',
    '新质生产力',
    '泊冉软件',
    '用友',
    '三重一大',
    '财务共享',
    '司库管理'
  ],
  alternates: {
    canonical: 'https://www.iboran.com/solution/industry/state-owned',
  },
}

export default function Page() {
  return (
    <>
      <GEOJsonLd 
        title="国资国企数智化转型解决方案"
        description="面向国资国企的智慧监管与智能运营一体化解决方案，涵盖大数据中心、智慧监管应用及企业数字化服务。"
        url="https://www.iboran.com/solution/industry/state-owned"
      />
      <StateOwnedContent />
    </>
  )
}
