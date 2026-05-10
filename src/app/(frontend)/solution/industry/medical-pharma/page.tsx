import { Metadata } from 'next'
import { MedicalPharmaYonSuiteContent } from '../medical-pharma-yonsuite/page.content'
import { GEOJsonLd } from '@/components/GEOJsonLd'

export const metadata: Metadata = {
  title: '医药与医疗器械行业解决方案 | GMP/GSP/UDI 合规运营 | 泊冉软件',
  description: '泊冉软件提供医药与医疗器械行业数智化解决方案，覆盖医药ERP、医疗器械ERP、GMP/GSP管理、UDI管理、CSV验证、批号效期与业财一体化实施服务。',
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
    canonical: 'https://www.iboran.com/solution/industry/medical-pharma',
  },
}

export default function Page() {
  return (
    <>
      <GEOJsonLd 
        title="医药与医疗器械行业解决方案"
        description="面向医药与医疗器械企业，提供 GMP/GSP 合规体系、UDI 全链路追溯、CSV 验证支撑与业财一体化方案。"
        url="https://www.iboran.com/solution/industry/medical-pharma"
      />
      <MedicalPharmaYonSuiteContent />
    </>
  )
}
