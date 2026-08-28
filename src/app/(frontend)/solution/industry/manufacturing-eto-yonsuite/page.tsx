import type { Metadata } from 'next'
import { ETOManufacturingYonSuiteContent } from './page.content'
import { etoYonsuiteJsonLd } from './structured-data'

const URL = 'https://www.iboran.com/solution/industry/manufacturing-eto-yonsuite'

export const metadata: Metadata = {
  title: '研发型定制制造与专用设备数智化解决方案 | AI项目协同 | 泊冉软件',
  description:
    '泊冉软件面向科研仪器、检测设备、专用设备、机器人与自动化、医疗设备、非标设备和系统集成类企业，提供AI增强的研发型定制制造数智化协同方案，围绕LTC线索到回款，打通商机、技术方案、报价、合同、项目计划、研发BOM、外协采购、供应商协同、安装验收、售后服务、开票回款和项目毛利分析。',
  keywords: [
    '研发型定制制造',
    '专用设备ERP',
    '科研仪器ERP',
    '检测设备ERP',
    'AI项目协同',
    'LTC线索到回款',
    '外协采购协同',
    '研发BOM管理',
    '项目毛利分析',
    '非标设备ERP',
    '泊冉软件',
  ],
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: URL,
    siteName: '泊冉软件',
    title: '研发型定制制造与专用设备数智化解决方案 | AI项目协同 | 泊冉软件',
    description: '面向科研仪器、检测设备、专用设备、机器人与自动化、医疗设备、非标设备和系统集成类企业，围绕LTC线索到回款，打通方案报价、研发BOM、外协采购、供应商协同、安装验收、售后和项目毛利分析。',
  },
  twitter: {
    card: 'summary_large_image',
    title: '研发型定制制造与专用设备数智化解决方案 | AI项目协同 | 泊冉软件',
    description: '围绕LTC线索到回款，打通商机、方案、报价、项目、研发BOM、外协采购、供应商协同、安装验收、售后和项目毛利分析。',
  },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(etoYonsuiteJsonLd) }}
      />
      <ETOManufacturingYonSuiteContent />
    </>
  )
}
