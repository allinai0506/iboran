import { faqItems } from './data'

const BASE = 'https://www.iboran.com'
const URL = 'https://www.iboran.com/products/yonsuite'

export const yonsuiteJsonLd = {
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
      description: '泊冉软件是用友合作伙伴，提供YonSuite咨询、实施、系统集成、AI场景共创与持续运营服务。',
    },
    {
      '@type': 'WebPage',
      '@id': `${URL}#webpage`,
      url: URL,
      name: '用友YonSuite产品专题 | 泊冉软件',
      description:
        '泊冉软件用友YonSuite产品专题：面向成长型企业的一体化SaaS云ERP，覆盖财务、人力、供应链、营销、采购、制造、研发、项目、资产、协同一体化，融合企业AI、ChatBI、智能体与全球化能力。',
      inLanguage: 'zh-CN',
      provider: { '@id': `${BASE}/#organization` },
      about: { '@id': `${URL}#service` },
      breadcrumb: { '@id': `${URL}#breadcrumb` },
      mainEntity: { '@id': `${URL}#faq` },
    },
    {
      '@type': 'Service',
      '@id': `${URL}#service`,
      name: '用友YonSuite一体化SaaS云ERP实施与运营',
      serviceType: 'YonSuite Consulting Implementation and AI Scenario Co-creation',
      provider: { '@id': `${BASE}/#organization` },
      areaServed: { '@type': 'Country', name: '中国' },
      audience: {
        '@type': 'BusinessAudience',
        audienceType:
          '成长型企业老板、CEO、信息化负责人、财务负责人、业务负责人与数字化转型负责人',
      },
      description:
        '围绕用友YonSuite一体化SaaS云ERP，提供咨询、实施、系统集成、企业AI场景共创与持续运营，帮助成长型企业实现业财税费票一体化与数智飞轮增长。',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首页', item: `${BASE}/` },
        { '@type': 'ListItem', position: 2, name: '产品中心', item: `${BASE}/products` },
        { '@type': 'ListItem', position: 3, name: '用友YonSuite', item: URL },
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
