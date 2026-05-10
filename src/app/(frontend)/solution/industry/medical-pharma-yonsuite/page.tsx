import { Metadata } from 'next'
import { MedicalPharmaYonSuiteContent } from './page.content'
import { GEOJsonLd } from '@/components/GEOJsonLd'

export const metadata: Metadata = {
  title: '医药与医疗器械 YonSuite 解决方案 | GMP/GSP/UDI/CSV 数字化闭环 | 泊冉软件',
  description: '基于用友 YonSuite 提供医药与医疗器械行业数智化解决方案，覆盖医药ERP、医疗器械ERP、GMP/GSP管理、UDI管理、CSV验证、批号效期与财务库存一体化。',
  keywords: [
    '医药ERP',
    '医疗器械ERP',
    'GMP管理系统',
    'GSP管理系统',
    'UDI管理系统',
    'CSV验证',
    '批号效期管理',
    '泊冉软件'
  ],
  alternates: {
    canonical: 'https://www.iboran.com/solution/industry/medical-pharma-yonsuite',
  },
}

export default function Page() {
  return (
    <>
      <GEOJsonLd 
        title="医药与医疗器械 YonSuite 解决方案"
        description="面向制药生产、医疗器械和耗材企业，提供 GMP/GSP 合规体系、UDI 全链路追溯、CSV 验证支撑与业财一体化方案。"
        url="https://www.iboran.com/solution/industry/medical-pharma-yonsuite"
      />
      <MedicalPharmaYonSuiteContent />
    </>
  )
}
