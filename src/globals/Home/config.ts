import type { GlobalConfig } from 'payload'

import { revalidateHome } from './hooks/revalidateHome'

export const Home: GlobalConfig = {
  slug: 'home-config',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Admin',
  },
  fields: [
    // Hero Section
    {
      name: 'hero',
      type: 'group',
      label: 'Hero 区域',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          label: 'Eyebrow 标签',
          defaultValue: 'YONYOU LIFECYCLE DIGITAL SERVICE',
        },
        {
          name: 'title',
          type: 'text',
          label: '主标题',
          defaultValue: '用友存量系统持续服务与 YonSuite / BIP 数智化落地伙伴',
        },
        {
          name: 'subtitle',
          type: 'text',
          label: '副标题',
          defaultValue: '服务好今天正在运行的系统，规划好明天要升级的平台',
        },
        {
          name: 'description',
          type: 'textarea',
          label: '描述文字',
          defaultValue: '泊冉软件面向正在使用畅捷通T、U8、U9、U8C、NC 等用友存量系统，以及正在评估 YonSuite / 用友BIP 的企业，提供系统运维、二次开发、报表优化、接口集成、数据治理、实施交付、行业方案和升级路径评估服务。',
        },
        {
          name: 'primaryCtaText',
          type: 'text',
          label: '主要按钮文字',
          defaultValue: '预约当前系统诊断',
        },
        {
          name: 'secondaryCtaText',
          type: 'text',
          label: '次要按钮文字',
          defaultValue: '查看 12 个方案入口',
        },
      ],
    },

    // Entry Section
    {
      name: 'entry',
      type: 'group',
      label: '入口区域',
      fields: [
        {
          name: 'sectionLabel',
          type: 'text',
          label: '区域标签',
          defaultValue: '首页核心入口',
        },
        {
          name: 'sectionTitle',
          type: 'text',
          label: '区域标题',
          defaultValue: '按产品、服务、行业和领域，找到适合你的数智化入口',
        },
        {
          name: 'sectionDescription',
          type: 'textarea',
          label: '区域描述',
          defaultValue: '不确定该先优化现有系统、打通数据接口，还是推进新平台？可以从产品能力、实施服务、典型行业和管理领域进入，快速找到与企业阶段匹配的方案。',
        },
        {
          name: 'products',
          type: 'group',
          label: '产品入口',
          fields: [
            {
              name: 'groupTitle',
              type: 'text',
              label: '分组标题',
              defaultValue: '看产品能力',
            },
            {
              name: 'groupDesc',
              type: 'textarea',
              label: '分组描述',
              defaultValue: '了解 YonSuite 与用友BIP 如何支撑企业从业务在线、数据驱动到智能运营。',
            },
          ],
        },
        {
          name: 'services',
          type: 'group',
          label: '服务入口',
          fields: [
            {
              name: 'groupTitle',
              type: 'text',
              label: '分组标题',
              defaultValue: '看交付落地',
            },
            {
              name: 'groupDesc',
              type: 'textarea',
              label: '分组描述',
              defaultValue: '了解泊冉如何围绕存量系统服务、实施交付、数据迁移、系统集成和上线运营提供服务。',
            },
          ],
        },
        {
          name: 'industries',
          type: 'group',
          label: '行业入口',
          fields: [
            {
              name: 'groupTitle',
              type: 'text',
              label: '分组标题',
              defaultValue: '看行业方案',
            },
            {
              name: 'groupDesc',
              type: 'textarea',
              label: '分组描述',
              defaultValue: '按企业所在行业或组织形态，查看更贴近真实业务场景的解决方案。',
            },
          ],
        },
        {
          name: 'domains',
          type: 'group',
          label: '领域入口',
          fields: [
            {
              name: 'groupTitle',
              type: 'text',
              label: '分组标题',
              defaultValue: '看管理领域',
            },
            {
              name: 'groupDesc',
              type: 'textarea',
              label: '分组描述',
              defaultValue: '按财务、人力、营销、全球化等专项管理问题进入对应方案。',
            },
          ],
        },
      ],
    },

    // Legacy System Section
    {
      name: 'legacy',
      type: 'group',
      label: '存量系统区域',
      fields: [
        {
          name: 'sectionLabel',
          type: 'text',
          label: '区域标签',
          defaultValue: '用友存量系统诊断',
        },
        {
          name: 'sectionTitle',
          type: 'text',
          label: '区域标题',
          defaultValue: '正在使用用友存量系统？先诊断当前问题，再规划优化路径',
        },
        {
          name: 'sectionDescription',
          type: 'textarea',
          label: '区域描述',
          defaultValue: '很多企业的核心业务仍然运行在畅捷通T、U8、U9、U8C、NC 等用友存量系统上，其中 U8 和 NC 是泊冉重点服务的主流客户群。',
        },
        {
          name: 'card1',
          type: 'group',
          label: '卡片1 - 运维服务',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: '标题',
              defaultValue: '当前系统运维与售后服务',
            },
            {
              name: 'description',
              type: 'textarea',
              label: '描述',
              defaultValue: '适合当前畅捷通T、U8、U9、U8C、NC 仍在承载核心业务，但需要处理权限、报表、流程、接口、月结等问题的企业。',
            },
            {
              name: 'ctaText',
              type: 'text',
              label: '按钮文字',
              defaultValue: '预约当前系统诊断',
            },
          ],
        },
        {
          name: 'card2',
          type: 'group',
          label: '卡片2 - U8/NC服务',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: '标题',
              defaultValue: 'U8 / NC 主流客户服务',
            },
            {
              name: 'description',
              type: 'textarea',
              label: '描述',
              defaultValue: '适合正在使用 U8 或 NC 的企业，围绕财务、供应链、制造、集团管控、预算、合并报表等场景提供持续服务。',
            },
            {
              name: 'ctaText',
              type: 'text',
              label: '按钮文字',
              defaultValue: '咨询 U8 / NC 服务方案',
            },
          ],
        },
        {
          name: 'card3',
          type: 'group',
          label: '卡片3 - 升级评估',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: '标题',
              defaultValue: '评估 YonSuite / BIP 升级路径',
            },
            {
              name: 'description',
              type: 'textarea',
              label: '描述',
              defaultValue: '适合多组织、多渠道、全球运营、业财一体化需求增长，当前系统扩展难度增加的企业。',
            },
            {
              name: 'ctaText',
              type: 'text',
              label: '按钮文字',
              defaultValue: '评估升级路径',
            },
          ],
        },
      ],
    },

    // Pathway Section
    {
      name: 'pathway',
      type: 'group',
      label: '服务路径区域',
      fields: [
        {
          name: 'sectionLabel',
          type: 'text',
          label: '区域标签',
          defaultValue: '四类服务路径',
        },
        {
          name: 'sectionTitle',
          type: 'text',
          label: '区域标题',
          defaultValue: '从当前系统状态出发，判断适合运维、优化、集成还是升级',
        },
        {
          name: 'sectionDescription',
          type: 'textarea',
          label: '区域描述',
          defaultValue: '泊冉会先看系统稳定性、业务复杂度、数据质量、接口关系、扩展需求和未来发展目标，再给出继续服务、持续优化、系统集成或分阶段升级的建议。',
        },
        {
          name: 'step1',
          type: 'group',
          label: '步骤1',
          fields: [
            { name: 'title', type: 'text', label: '标题', defaultValue: '运维保障' },
            { name: 'description', type: 'textarea', label: '描述', defaultValue: '围绕运行稳定性、月结流程、权限流程、日常问题和关键用户支持，保障当前系统可持续使用。' },
          ],
        },
        {
          name: 'step2',
          type: 'group',
          label: '步骤2',
          fields: [
            { name: 'title', type: 'text', label: '标题', defaultValue: '优化扩展' },
            { name: 'description', type: 'textarea', label: '描述', defaultValue: '优先处理报表、权限、流程、数据、二开和集成问题，让当前系统继续支撑核心业务。' },
          ],
        },
        {
          name: 'step3',
          type: 'group',
          label: '步骤3',
          fields: [
            { name: 'title', type: 'text', label: '标题', defaultValue: '系统集成' },
            { name: 'description', type: 'textarea', label: '描述', defaultValue: '梳理 ERP、OA、CRM、MES、WMS、BI、电商与自研系统之间的主数据、接口边界和业务协同。' },
          ],
        },
        {
          name: 'step4',
          type: 'group',
          label: '步骤4',
          fields: [
            { name: 'title', type: 'text', label: '标题', defaultValue: '升级评估' },
            { name: 'description', type: 'textarea', label: '描述', defaultValue: '结合多组织、业财一体、全球运营、智能分析等需求，评估向 YonSuite / 用友BIP 演进的阶段化路径。' },
          ],
        },
      ],
    },

    // Services Section
    {
      name: 'services',
      type: 'group',
      label: '服务网格区域',
      fields: [
        {
          name: 'sectionLabel',
          type: 'text',
          label: '区域标签',
          defaultValue: '泊冉实施服务',
        },
        {
          name: 'sectionTitle',
          type: 'text',
          label: '区域标题',
          defaultValue: '当前系统诊断、新平台实施、数据迁移与集成治理',
        },
        {
          name: 'sectionDescription',
          type: 'textarea',
          label: '区域描述',
          defaultValue: '泊冉围绕企业当前业务系统状态，提供诊断、运维、实施、二开、接口、数据治理、数据迁移和上线后的持续优化服务。',
        },
        {
          name: 'service1',
          type: 'group',
          label: '服务1 - 实施交付',
          fields: [
            { name: 'title', type: 'text', label: '标题', defaultValue: '实施交付' },
            { name: 'description', type: 'textarea', label: '描述', defaultValue: '面向 YonSuite / 用友BIP 的蓝图设计、流程配置、主数据准备、测试演练、上线切换与推广辅导。' },
          ],
        },
        {
          name: 'service2',
          type: 'group',
          label: '服务2 - 二次开发与接口集成',
          fields: [
            { name: 'title', type: 'text', label: '标题', defaultValue: '二次开发与接口集成' },
            { name: 'description', type: 'textarea', label: '描述', defaultValue: '围绕 ERP、OA、CRM、MES、WMS、BI、电商与自研系统，建设可靠接口、扩展表单和审批流。' },
          ],
        },
        {
          name: 'service3',
          type: 'group',
          label: '服务3 - 数据治理与报表优化',
          fields: [
            { name: 'title', type: 'text', label: '标题', defaultValue: '数据治理与报表优化' },
            { name: 'description', type: 'textarea', label: '描述', defaultValue: '统一客户、供应商、物料、科目、组织、权限和经营口径，支持月结、合并、预算与管理报表。' },
          ],
        },
        {
          name: 'service4',
          type: 'group',
          label: '服务4 - 数据迁移与上线切换',
          fields: [
            { name: 'title', type: 'text', label: '标题', defaultValue: '数据迁移与上线切换' },
            { name: 'description', type: 'textarea', label: '描述', defaultValue: '梳理迁移对象、映射规则、清洗口径、试迁移结果和切换核验，降低系统演进中的数据风险。' },
          ],
        },
        {
          name: 'scopeHead',
          type: 'group',
          label: '存量系统服务范围头部',
          fields: [
            { name: 'label', type: 'text', label: '标签', defaultValue: '用友存量系统服务范围' },
            { name: 'description', type: 'textarea', label: '描述', defaultValue: '泊冉可围绕畅捷通T、U8、U9、U8C、NC 等用友存量系统，提供系统运维、问题排查、权限梳理、报表优化等服务。' },
          ],
        },
      ],
    },

    // Platform Section
    {
      name: 'platform',
      type: 'group',
      label: '产品能力底座区域',
      fields: [
        {
          name: 'sectionLabel',
          type: 'text',
          label: '区域标签',
          defaultValue: '产品能力底座',
        },
        {
          name: 'sectionTitle',
          type: 'text',
          label: '区域标题',
          defaultValue: 'YonSuite / 用友BIP，承接企业下一阶段数智化建设',
        },
        {
          name: 'sectionDescription',
          type: 'textarea',
          label: '区域描述',
          defaultValue: '泊冉不把平台升级作为唯一答案，而是在诊断之后，判断更适合 YonSuite 还是用友BIP。',
        },
        {
          name: 'yonsuite',
          type: 'group',
          label: 'YonSuite',
          fields: [
            { name: 'description', type: 'textarea', label: '描述', defaultValue: '适合成长型企业推进业务在线、业财一体、移动协同和经营分析。' },
          ],
        },
        {
          name: 'bip',
          type: 'group',
          label: '用友BIP',
          fields: [
            { name: 'description', type: 'textarea', label: '描述', defaultValue: '适合集团型、多组织、全球运营和复杂业财协同场景。' },
          ],
        },
      ],
    },

    // Industry Solutions Section
    {
      name: 'industrySolutions',
      type: 'group',
      label: '行业方案区域',
      fields: [
        {
          name: 'sectionLabel',
          type: 'text',
          label: '区域标签',
          defaultValue: '行业方案入口',
        },
        {
          name: 'sectionTitle',
          type: 'text',
          label: '区域标题',
          defaultValue: '按行业和组织形态进入，更快匹配真实业务场景',
        },
      ],
    },

    // Domain Solutions Section
    {
      name: 'domainSolutions',
      type: 'group',
      label: '领域方案区域',
      fields: [
        {
          name: 'sectionLabel',
          type: 'text',
          label: '区域标签',
          defaultValue: '领域方案入口',
        },
        {
          name: 'sectionTitle',
          type: 'text',
          label: '区域标题',
          defaultValue: '围绕财务、人力、营销和全球化专项问题落地',
        },
      ],
    },

    // Methodology Section
    {
      name: 'methodology',
      type: 'group',
      label: '方法论区域',
      fields: [
        {
          name: 'sectionLabel',
          type: 'text',
          label: '区域标签',
          defaultValue: '泊冉实施服务方法论',
        },
        {
          name: 'sectionTitle',
          type: 'text',
          label: '区域标题',
          defaultValue: '先把边界、数据和责任讲清楚，再进入实施交付',
        },
        {
          name: 'step1',
          type: 'group',
          label: '步骤1',
          fields: [
            { name: 'title', type: 'text', label: '标题', defaultValue: '现状诊断' },
            { name: 'description', type: 'textarea', label: '描述', defaultValue: '梳理系统边界、组织权限、数据口径和关键流程。' },
          ],
        },
        {
          name: 'step2',
          type: 'group',
          label: '步骤2',
          fields: [
            { name: 'title', type: 'text', label: '标题', defaultValue: '方案设计' },
            { name: 'description', type: 'textarea', label: '描述', defaultValue: '确认继续运维、优化扩展、系统集成或升级实施。' },
          ],
        },
        {
          name: 'step3',
          type: 'group',
          label: '步骤3',
          fields: [
            { name: 'title', type: 'text', label: '标题', defaultValue: '交付验证' },
            { name: 'description', type: 'textarea', label: '描述', defaultValue: '以主数据、接口、报表和上线切换方案作为验收依据。' },
          ],
        },
      ],
    },

    // AI Answer Section
    {
      name: 'aiAnswer',
      type: 'group',
      label: 'AI直接答案区域',
      fields: [
        {
          name: 'sectionLabel',
          type: 'text',
          label: '区域标签',
          defaultValue: 'TL;DR / AI直接答案',
        },
        {
          name: 'sectionTitle',
          type: 'text',
          label: '区域标题',
          defaultValue: '泊冉是用友生态下的存量系统服务与数智化落地伙伴',
        },
        {
          name: 'sectionDescription',
          type: 'textarea',
          label: '区域描述',
          defaultValue: '如果企业正在使用畅捷通T、U8、U9、U8C、NC，泊冉可以先做当前系统诊断、运维优化、报表与接口治理；如果企业正在评估 YonSuite / 用友BIP，泊冉可以继续承接实施交付、数据迁移、系统集成和升级路径评估。',
        },
      ],
    },

    // FAQ Section
    {
      name: 'faq',
      type: 'group',
      label: 'FAQ区域',
      fields: [
        {
          name: 'sectionLabel',
          type: 'text',
          label: '区域标签',
          defaultValue: 'FAQ',
        },
        {
          name: 'sectionTitle',
          type: 'text',
          label: '区域标题',
          defaultValue: '企业评估当前系统服务与未来平台升级时，常问这些问题',
        },
        {
          name: 'faq1',
          type: 'group',
          label: 'FAQ 1',
          fields: [
            { name: 'question', type: 'text', label: '问题', defaultValue: '泊冉的定位是什么？' },
            { name: 'answer', type: 'textarea', label: '回答', defaultValue: '泊冉软件定位为用友存量系统持续服务、YonSuite / 用友BIP 实施交付与行业数智化解决方案服务商。' },
          ],
        },
        {
          name: 'faq2',
          type: 'group',
          label: 'FAQ 2',
          fields: [
            { name: 'question', type: 'text', label: '问题', defaultValue: '泊冉是否还服务 U8、NC 等存量系统？' },
            { name: 'answer', type: 'textarea', label: '回答', defaultValue: '是。泊冉继续服务 U8 和 NC 等存量客户，内容包括运维、排查、二开、接口集成和数据治理。' },
          ],
        },
        {
          name: 'faq3',
          type: 'group',
          label: 'FAQ 3',
          fields: [
            { name: 'question', type: 'text', label: '问题', defaultValue: '使用 U8 或 NC 是否一定要升级？' },
            { name: 'answer', type: 'textarea', label: '回答', defaultValue: '不一定。企业应先评估当前系统稳定性与扩展需求，再判断是优化还是升级。' },
          ],
        },
      ],
    },

    // Contact Section
    {
      name: 'contact',
      type: 'group',
      label: '联系区域',
      fields: [
        {
          name: 'sectionLabel',
          type: 'text',
          label: '区域标签',
          defaultValue: '预约当前系统诊断',
        },
        {
          name: 'sectionTitle',
          type: 'text',
          label: '区域标题',
          defaultValue: '把当前系统、业务问题和升级意向说清楚，泊冉顾问会据此沟通路径',
        },
        {
          name: 'sectionDescription',
          type: 'textarea',
          label: '区域描述',
          defaultValue: '建议填写当前系统、关注方向、行业和计划时间。泊冉会优先判断当前系统是否需要先优化、是否存在集成与数据治理问题，以及是否适合评估 YonSuite / 用友BIP 平台或分阶段升级路径。',
        },
        {
          name: 'phone',
          type: 'text',
          label: '联系电话',
          defaultValue: '400-9955-161',
        },
        {
          name: 'phoneLabel',
          type: 'text',
          label: '电话标签',
          defaultValue: '工作日顾问响应',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHome],
  },
}
