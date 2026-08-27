import type { Metadata } from 'next'
import { OperationsContent } from './page.content'
import { GEOJsonLd } from '@/components/GEOJsonLd'

export const metadata: Metadata = {
  title: '系统运维与客户成功服务｜巡检、月结保障、升级护航、工单支持 | 泊冉软件',
  description: '围绕系统上线后的长期稳定运行，提供工单支持、问题诊断、系统巡检、月结保障、补丁升级和客户成功运营服务。',
  keywords: ['系统运维', '客户成功', '工单支持', '系统巡检', '月结保障', '升级护航'],
  openGraph: {
    title: '系统运维与客户成功服务 - 泊冉软件',
    description: '专业的系统稳定运行与持续价值保障服务。',
  },
}

export default function Page() {
  return (
    <>
      <GEOJsonLd 
        title="系统运维与客户成功服务"
        description="覆盖工单支持、巡检保障、月结护航等全方位运维服务。"
        url="https://www.iboran.com/services/operations"
      />
      <OperationsContent />
    </>
  )
}
