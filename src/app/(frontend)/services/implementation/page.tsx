import type { Metadata } from 'next'
import { ImplementationContent } from './page.content'
import { GEOJsonLd } from '@/components/GEOJsonLd'

export const metadata: Metadata = {
  title: '系统实施服务｜SaaS快速上线与BIP敏捷交付 | 泊冉软件',
  description: '面向中小型成长企业和大中型集团客户，提供从成功规划、蓝图设计、系统建设到上线切换和客户成功移交的系统实施服务。',
  keywords: ['系统实施服务', 'YonSuite实施', 'YonBIP敏捷交付', '蓝图设计', '上线切换'],
  openGraph: {
    title: '系统实施服务 - 泊冉软件',
    description: '专业的 SaaS 快速上线与 BIP 敏捷交付服务。',
  },
}

export default function Page() {
  return (
    <>
      <GEOJsonLd 
        title="系统实施服务"
        description="提供 SaaS 快速上线与 BIP 敏捷交付路径，确保项目高质量上线。"
        url="https://www.iboran.com/services/implementation"
      />
      <ImplementationContent />
    </>
  )
}
