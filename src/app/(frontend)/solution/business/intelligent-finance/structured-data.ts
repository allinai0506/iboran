import { faqItems } from './data'

const BASE = 'https://www.iboran.com'
const URL = 'https://www.iboran.com/solution/business/intelligent-finance'

export const intelligentFinanceJsonLd = {
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
      description: '泊冉软件是用友合作伙伴，提供业财一体化、供应链、营销、数据智能与企业数智化实施服务。',
    },
    {
      '@type': 'WebPage',
      '@id': `${URL}#webpage`,
      url: URL,
      name: '智能财务解决方案_业财融合_会计事项中台_预算合并报表_全球多账簿 | 泊冉软件',
      description:
        '泊冉软件智能财务解决方案，基于 YonSuite / YonBIP 能力，围绕业财融合、会计事项中台、智能核算、全面预算、合并报表、全球多账簿、智能费控、智能财资和 AI 财务分析，帮助企业从事后记账走向实时核算、预算管控、集团合并与经营决策。',
      inLanguage: 'zh-CN',
      provider: { '@id': `${BASE}/#organization` },
      about: { '@id': `${URL}#service` },
      breadcrumb: { '@id': `${URL}#breadcrumb` },
      mainEntity: { '@id': `${URL}#faq` },
    },
    {
      '@type': 'Service',
      '@id': `${URL}#service`,
      name: '智能财务解决方案',
      serviceType: '业财融合、会计事项中台、智能核算、全面预算、合并报表、全球多账簿与 AI 财务分析实施服务',
      provider: { '@id': `${BASE}/#organization` },
      areaServed: { '@type': 'Country', name: '中国' },
      audience: {
        '@type': 'BusinessAudience',
        audienceType:
          '老板、CFO、财务负责人、财务共享负责人、集团财务负责人、预算负责人、合并报表负责人、海外财务负责人、CIO、信息化负责人以及多组织、多门店、多项目、多国家经营企业',
      },
      description:
        '基于 YonSuite / YonBIP 的智能财务解决方案，覆盖业财融合、会计事项中台、智能核算、全面预算、合并报表、全球多账簿、智能费控、智能财资和 AI 财务分析。',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首页', item: `${BASE}/` },
        { '@type': 'ListItem', position: 2, name: '解决方案', item: `${BASE}/solution` },
        { '@type': 'ListItem', position: 3, name: '智能财务解决方案', item: URL },
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
