import type { Metadata } from 'next'
import { IntegrationContent } from './page.content'
import { GEOJsonLd } from '@/components/GEOJsonLd'

export const metadata: Metadata = {
  title: '集成与开发服务｜API对接、数据集成、低代码扩展 | 泊冉软件',
  description: '提供系统集成、API治理、数据集成、移动审批、低代码扩展和客户化开发服务，帮助企业打通业务流、数据流和管理流。',
  keywords: ['系统集成', 'API对接', '数据集成', '低代码开发', '客户化开发'],
  openGraph: {
    title: '集成与开发服务 - 泊冉软件',
    description: '专业的系统集成与个性化扩展开发服务。',
  },
}

export default function Page() {
  return (
    <>
      <GEOJsonLd 
        title="集成与开发服务"
        description="打通多系统孤岛，提供低代码与受控客开服务。"
        url="https://www.iboran.com/services/integration-development"
      />
      <IntegrationContent />
    </>
  )
}
