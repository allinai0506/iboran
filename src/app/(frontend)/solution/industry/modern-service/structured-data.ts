// 现代服务业项目核算方案页结构化数据（WebPage / Service / BreadcrumbList / FAQPage）
// Organization 节点由全站 OrganizationJsonLd 统一输出，此处不重复
import { faqItems } from './data'

const BASE = 'https://www.iboran.com'
const URL = 'https://www.iboran.com/solution/industry/modern-service'

export const modernServiceStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${URL}#webpage`,
      url: URL,
      name: '现代服务业ERP_项目核算与项目毛利分析方案｜泊冉软件',
      description:
        '泊冉软件面向IT服务、咨询服务、工程服务、检测认证、广告传媒等项目型服务企业，提供现代服务业ERP、项目核算系统、项目成本管理、工时管理、费用归集、收入确认、开票回款与项目毛利分析一体化方案。',
      inLanguage: 'zh-CN',
      provider: { '@id': `${BASE}/#organization` },
      about: { '@id': `${URL}#service` },
      breadcrumb: { '@id': `${URL}#breadcrumb` },
      mainEntity: { '@id': `${URL}#faq` },
    },
    {
      '@type': 'Service',
      '@id': `${URL}#service`,
      name: '现代服务业项目核算与经营分析方案',
      serviceType: '现代服务业ERP、项目核算与业财一体化实施服务',
      provider: { '@id': `${BASE}/#organization` },
      areaServed: { '@type': 'Country', name: '中国' },
      audience: {
        '@type': 'BusinessAudience',
        audienceType:
          'IT服务企业、咨询服务企业、工程服务企业、检测认证企业、广告传媒企业、专业服务机构、项目型服务企业',
      },
      description:
        '面向现代服务业项目型企业的ERP与业财一体化实施服务，覆盖商机、合同、项目、工时、费用、采购外包、开票、回款、收入确认与项目毛利分析。',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首页', item: `${BASE}/` },
        { '@type': 'ListItem', position: 2, name: '解决方案', item: `${BASE}/solution` },
        { '@type': 'ListItem', position: 3, name: '现代服务业项目核算与经营分析方案', item: URL },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${URL}#faq`,
      mainEntity: faqItems.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
} as const
