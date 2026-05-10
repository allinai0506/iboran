import type { Metadata } from 'next'
import { ServicesContent } from './page.content'
import { GEOJsonLd } from '@/components/GEOJsonLd'

export const metadata: Metadata = {
  title: '企业数智化全生命周期服务体系｜系统实施、集成开发、运维、迁移工具 | 泊冉软件',
  description: '提供系统实施、集成与开发、系统运维、迁移与工具四大服务能力，覆盖企业应用从上线、连接、扩展到持续运营的全生命周期。',
  keywords: ['企业数智化服务', '系统实施', '集成开发', '系统运维', '数据迁移', '客户成功'],
  openGraph: {
    title: '企业数智化全生命周期服务体系 - 泊冉软件',
    description: '提供系统实施、集成与开发、系统运维、迁移与工具四大服务能力。',
  },
}

export default function Page() {
  return (
    <>
      <GEOJsonLd 
        title="企业数智化全生命周期服务体系"
        description="覆盖系统实施、集成开发、系统运维、迁移与工具四大服务线。"
        url="https://www.iboran.com/services"
      />
      <ServicesContent />
    </>
  )
}
