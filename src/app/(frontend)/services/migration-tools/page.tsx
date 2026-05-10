import type { Metadata } from 'next'
import { MigrationContent } from './page.content'
import { GEOJsonLd } from '@/components/GEOJsonLd'

export const metadata: Metadata = {
  title: '迁移与工具服务｜数据抽取、同步、BIP升迁、脱敏 | 泊冉软件',
  description: '提供数据抽取、数据同步、BIP升迁、历史数据迁移、数据脱敏和云巡检等工具化服务，保障数据完整和系统平滑切换。',
  keywords: ['数据迁移', '数据同步', 'BIP升迁', '数据脱敏', '云巡检'],
  openGraph: {
    title: '迁移与工具服务 - 泊冉软件',
    description: '专业、安全、可控的数据迁移与升迁工具服务。',
  },
}

export default function Page() {
  return (
    <>
      <GEOJsonLd 
        title="迁移与工具服务"
        description="保障企业数据在升迁、拆分、同步过程中的准确性与安全性。"
        url="https://www.iboran.com/services/migration-tools"
      />
      <MigrationContent />
    </>
  )
}
