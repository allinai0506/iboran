import { Metadata } from 'next'
import { ModernServiceContent } from './page.content'
import { GEOJsonLd } from '@/components/GEOJsonLd'

export const metadata: Metadata = {
  title: '现代服务业ERP | 项目核算与项目毛利分析方案 | 泊冉软件',
  description: '泊冉软件面向IT服务、咨询、工程、检测等项目型服务企业，提供现代服务业ERP、项目核算、成本管理、工时费用归集与项目毛利分析一体化方案。',
  keywords: [
    '现代服务业ERP',
    '服务业业财一体化',
    '项目核算系统',
    '项目成本管理',
    '项目型企业ERP',
    '工时管理系统',
    '项目毛利分析',
    '泊冉软件'
  ],
  alternates: {
    canonical: 'https://www.iboran.com/solution/industry/modern-service',
  },
}

export default function Page() {
  return (
    <>
      <GEOJsonLd 
        title="现代服务业项目核算与经营分析方案"
        description="打通商机、合同、项目、工时、费用、收入确认与毛利分析，构建项目型服务企业业财一体化管理闭环。"
        url="https://www.iboran.com/solution/industry/modern-service"
      />
      <ModernServiceContent />
    </>
  )
}
