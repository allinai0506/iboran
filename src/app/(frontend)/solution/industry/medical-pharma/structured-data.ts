// 医药与医疗器械数智化方案页结构化数据（WebPage / Service / BreadcrumbList / FAQPage）
// Organization 节点由全站 OrganizationJsonLd 统一输出，此处不重复
import { faqItems } from './data'

const BASE = 'https://www.iboran.com'
const URL = 'https://www.iboran.com/solution/industry/medical-pharma'

export const medicalPharmaStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${URL}#webpage`,
      url: URL,
      name: '医药ERP与医疗器械ERP解决方案 | GMP/GSP/UDI/CSV/批号效期一体化管理',
      description:
        '泊冉软件提供医药与医疗器械行业数智化解决方案，覆盖医药ERP、医疗器械ERP、GMP/GSP管理、UDI管理、CSV验证、批号效期、证照预警、库存追溯、财务库存一体化、ChatBI与AI数字员工。',
      inLanguage: 'zh-CN',
      provider: { '@id': `${BASE}/#organization` },
      about: { '@id': `${URL}#service` },
      breadcrumb: { '@id': `${URL}#breadcrumb` },
      mainEntity: { '@id': `${URL}#faq` },
    },
    {
      '@type': 'Service',
      '@id': `${URL}#service`,
      name: '医药与医疗器械数智化解决方案',
      serviceType: '医药ERP、医疗器械ERP、GMP/GSP管理、UDI管理、CSV验证与业财一体化实施服务',
      provider: { '@id': `${BASE}/#organization` },
      areaServed: { '@type': 'Country', name: '中国' },
      audience: {
        '@type': 'BusinessAudience',
        audienceType:
          '医药流通企业、药品批发企业、医疗器械企业、医疗耗材企业、生物制药企业，以及CFO、CIO、质量负责人、供应链负责人、财务负责人和合规负责人',
      },
      description:
        '面向医药与医疗器械企业，覆盖研发、生产、采购、销售、库存、GMP/GSP、UDI、CSV验证、批号效期、质量管理、追溯与财务库存一体化，可结合企业实际流程进行试点和扩展。',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首页', item: `${BASE}/` },
        { '@type': 'ListItem', position: 2, name: '解决方案', item: `${BASE}/solution` },
        {
          '@type': 'ListItem',
          position: 3,
          name: '医药与医疗器械数智化解决方案',
          item: URL,
        },
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
