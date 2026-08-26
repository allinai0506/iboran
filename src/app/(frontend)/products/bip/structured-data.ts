import { faqItems } from './data'

const BASE = 'https://www.iboran.com'
const URL = 'https://www.iboran.com/products/bip'

export const bipJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${BASE}/#organization`,
      name: '泊冉软件',
      url: `${BASE}/`,
      logo: `${BASE}/assets/images/boran-logo.png`,
      telephone: '400-9955-161',
      address: {
        '@type': 'PostalAddress',
        addressLocality: '上海市',
        addressRegion: '上海',
        streetAddress: '普陀区曹杨路1888号星光耀广场1号楼1005室',
        addressCountry: 'CN',
      },
      description: '泊冉软件是用友合作伙伴，提供用友BIP咨询、实施、迁移、集成、信创适配与企业AI落地服务。',
    },
    {
      '@type': 'WebPage',
      '@id': `${URL}#webpage`,
      url: URL,
      name: '用友BIP商业创新平台_集团ERP升级与企业AI方案｜泊冉软件',
      description:
        '泊冉软件面向大中型企业和集团型企业，围绕用友BIP建设统一的应用服务、数据服务、业务服务和智能化能力，支持NC、NCC、U8、U9、金蝶、SAP、Oracle等系统升级、迁移、并行与集成，覆盖财务、供应链、采购、制造、人力、资产、项目、协同与YonGPT、智友、DataAgent企业智能体场景。',
      inLanguage: 'zh-CN',
      provider: { '@id': `${BASE}/#organization` },
      about: { '@id': `${URL}#service` },
      breadcrumb: { '@id': `${URL}#breadcrumb` },
      mainEntity: { '@id': `${URL}#faq` },
    },
    {
      '@type': 'Service',
      '@id': `${URL}#service`,
      name: '用友BIP商业创新平台建设服务',
      serviceType: '用友BIP咨询、实施、迁移、集成、信创国产替代与企业AI落地',
      provider: { '@id': `${BASE}/#organization` },
      areaServed: { '@type': 'Country', name: '中国' },
      audience: {
        '@type': 'BusinessAudience',
        audienceType: '大中型企业、集团型企业、制造企业、消费品企业、医药企业、服务型企业、央国企',
      },
      description:
        '面向大中型企业和集团型企业，提供用友BIP咨询、销售支持、实施、交付、迁移、集成、信创适配、数据治理和企业AI落地服务。',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首页', item: `${BASE}/` },
        { '@type': 'ListItem', position: 2, name: '核心产品', item: `${BASE}/products` },
        { '@type': 'ListItem', position: 3, name: '用友BIP商业创新平台', item: URL },
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
}
