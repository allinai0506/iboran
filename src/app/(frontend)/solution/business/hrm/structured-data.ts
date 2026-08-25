import { faqItems } from './data'

const BASE = 'https://www.iboran.com'
const URL = 'https://www.iboran.com/solution/business/hrm'

export const hrJsonLd = {
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
      description: '泊冉软件是用友合作伙伴，提供业财一体化、供应链、营销、人力资源数智化与数据智能实施服务。',
    },
    {
      '@type': 'WebPage',
      '@id': `${URL}#webpage`,
      url: URL,
      name: '成长型企业人力资源数智化管理方案 | 泊冉软件',
      description:
        '面向成长型企业的人力资源数智化管理方案，从员工自助、移动审批、入转调离、考勤假勤、薪酬核对、绩效反馈和人效分析等高频场景切入，帮助企业减少HR重复事务，提升主管参与度，让人力管理更易用、更智能、更可视化。',
      inLanguage: 'zh-CN',
      provider: { '@id': `${BASE}/#organization` },
      about: { '@id': `${URL}#service` },
      breadcrumb: { '@id': `${URL}#breadcrumb` },
      mainEntity: { '@id': `${URL}#faq` },
    },
    {
      '@type': 'Service',
      '@id': `${URL}#service`,
      name: '成长型企业人力资源数智化管理方案',
      serviceType: 'HR Digital Management Consulting and Implementation',
      provider: { '@id': `${BASE}/#organization` },
      areaServed: { '@type': 'Country', name: '中国' },
      audience: {
        '@type': 'BusinessAudience',
        audienceType:
          '老板、CEO、HR负责人、财务负责人、业务主管、门店负责人、工厂负责人与信息化负责人等成长型企业管理者',
      },
      description:
        '围绕员工自助、移动审批、入转调离、考勤假勤、薪酬核对、绩效反馈和人效分析，帮助成长型企业建设可试点、可验证、可扩展的人力管理闭环。',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首页', item: `${BASE}/` },
        { '@type': 'ListItem', position: 2, name: '解决方案', item: `${BASE}/solution` },
        { '@type': 'ListItem', position: 3, name: '成长型企业人力资源数智化管理方案', item: URL },
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
