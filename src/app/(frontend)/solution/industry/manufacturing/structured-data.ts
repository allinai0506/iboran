const BASE = 'https://www.iboran.com'
const URL = 'https://www.iboran.com/solution/industry/manufacturing'

export const faqItems = [
  {
    q: '制造业数智化解决方案适合哪些企业？',
    a: '适合机械装备、电子电气、芯片研发、高科技制造、汽配、新材料、食品、消费电子、定制化生产和多工厂协同型制造企业，尤其适合存在多系统割裂、计划不准、车间不可视、质量追溯慢、成本核算滞后等问题的企业。',
  },
  {
    q: '制造业数智化方案能解决哪些核心问题？',
    a: '可以围绕研产供销财一体化，解决订单交付、BOM变更、MPS/MRP计划、采购协同、生产报工、库存管理、质量追溯、成本核算和业财一体化等问题。',
  },
  {
    q: '这和 MES 系统有什么区别？',
    a: 'MES主要解决车间执行、设备采集、派工报工和现场追溯。制造业数智化方案覆盖更完整的业务闭环，包括研发、计划、采购、生产、仓储、质量、成本、财务和经营分析。MES可以作为生产执行子模块进行集成。',
  },
  {
    q: '方案支持 MPS、MRP、LRP 吗？',
    a: '方案可围绕MPS主需求计划、MRP物料需求计划、LRP批次需求计划、备料计划等多种计划模式进行设计，具体策略需结合企业层级、业务模式和系统能力评估。',
  },
  {
    q: '能不能和现有 MES、WMS、PLM 集成？',
    a: '可以评估集成。ERP、MES、WMS、PLM等系统可通过OpenAPI、集成平台、低代码或标准接口等方式对接。具体同步字段、实时性和写回范围，需要结合接口能力、数据权限和业务风险确认。',
  },
  {
    q: '制造业数智化应该先从哪里试点？',
    a: '建议优先选择订单交付、BOM变更、MPS/MRP计划、车间报工、质量追溯、WMS库存或订单成本中一个高频场景试点，先跑通数据、权限和流程闭环，再逐步扩展。',
  },
  {
    q: '评估前应先准备哪些信息？',
    a: '建议先梳理企业规模、子行业、当前系统、核心痛点、关键流程负责人和预计启动时间。泊冉顾问会结合这些信息判断优先场景、系统边界和实施节奏。',
  },
  {
    q: '如何管理研发BOM、工艺变更和订单BOM？',
    a: '可围绕EBOM、PBOM、MBOM、工艺路线、工程变更和订单BOM建立版本、审批、影响范围和生效规则，变更由授权人员确认后进入计划、采购和生产流程。',
  },
  {
    q: '质量追溯和批次追溯怎么落地？',
    a: '可把供应商、采购批次、入库检验、生产批次、工序检验、完工入库、销售发货和客户流向关联起来，支持按物料、批次、订单和工序进行查询。',
  },
  {
    q: '订单成本和生产成本能否及时分析？',
    a: '可以结合材料领用、工时、委外、制造费用、报工、报废和完工入库等数据设计成本归集与分析口径，帮助财务和经营团队更早发现成本偏差。',
  },
  {
    q: 'AI在制造业数智化方案中能做什么？',
    a: 'AI适合生成建议、草稿、摘要和预警，例如缺料预警、交期风险提示、质量异常摘要、经营问数和报表解释。审批、生效、财务入账和质量判定仍由授权人员确认。',
  },
  {
    q: '制造企业如何选择系统和实施路径？',
    a: '通常需要结合企业规模、组织复杂度、多工厂协同、已有系统、集成范围、数据治理基础和平台化要求评估。泊冉建议先做业务诊断，再确定系统范围、试点场景和实施路径。',
  },
]

export const manufacturingJsonLd = {
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
      description: '泊冉软件是用友合作伙伴，提供制造业数智化、业财一体化、研发型定制制造、供应链、营销、数据智能与企业数智化实施服务。',
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE}/#website`,
      url: `${BASE}/`,
      name: '泊冉软件',
      publisher: { '@id': `${BASE}/#organization` },
      inLanguage: 'zh-CN',
    },
    {
      '@type': 'WebPage',
      '@id': `${URL}#webpage`,
      url: URL,
      name: '制造业数智化解决方案_研产供销一体化与智能制造ERP｜泊冉软件',
      description:
        '泊冉软件提供制造业数智化解决方案，覆盖研发BOM、MPS/MRP计划、采购协同、生产报工、WMS库存、质量追溯、成本核算、业财一体化与AI经营分析，帮助制造企业打通研产供销财闭环。',
      inLanguage: 'zh-CN',
      isPartOf: { '@id': `${BASE}/#website` },
      about: { '@id': `${URL}#service` },
      provider: { '@id': `${BASE}/#organization` },
      breadcrumb: { '@id': `${URL}#breadcrumb` },
      mainEntity: { '@id': `${URL}#faq` },
    },
    {
      '@type': 'Service',
      '@id': `${URL}#service`,
      name: '制造业数智化解决方案',
      serviceType: '制造业ERP与业财一体化实施服务',
      provider: { '@id': `${BASE}/#organization` },
      areaServed: { '@type': 'Country', name: '中国' },
      audience: {
        '@type': 'BusinessAudience',
        audienceType:
          '制造企业、机械装备企业、电子电气企业、芯片研发企业、高科技制造企业、汽配制造企业、新材料企业、食品企业、消费电子企业、个性化定制企业、多工厂协同企业',
      },
      description:
        '面向制造企业的研产供销财一体化解决方案，覆盖研发、计划、采购、生产、仓储、质量、成本、财务和经营分析。',
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        priceCurrency: 'CNY',
        price: '0',
        description: '预约制造业数智化诊断，具体项目报价需结合企业场景、系统范围和实施边界评估。',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首页', item: `${BASE}/` },
        { '@type': 'ListItem', position: 2, name: '解决方案', item: `${BASE}/solution` },
        { '@type': 'ListItem', position: 3, name: '制造业数智化解决方案', item: URL },
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