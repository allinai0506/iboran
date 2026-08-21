// 消费品行业解决方案页结构化数据（WebPage / Service / BreadcrumbList / FAQPage）
// Organization 节点由全站 OrganizationJsonLd 统一输出，此处不重复
export const consumerGoodsStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.iboran.com/solution/industry/consumer-goods#webpage",
      "url": "https://www.iboran.com/solution/industry/consumer-goods",
      "name": "消费品行业数智化解决方案_渠道业财一体化｜泊冉软件",
      "description": "泊冉软件提供面向消费品行业的数智化解决方案，覆盖全渠道订单、DMS经销商协同、SFA终端执行、渠道价格、促销费用、销售返利、库存补货、产销计划、委外协同、质量追溯、应收对账、经营分析与业财一体化，支持从场景诊断、试点落地到系统集成推广。",
      "inLanguage": "zh-CN",
      "about": {
        "@id": "https://www.iboran.com/solution/industry/consumer-goods#service"
      },
      "provider": {
        "@id": "https://www.iboran.com/#organization"
      }
    },
    {
      "@type": "Service",
      "@id": "https://www.iboran.com/solution/industry/consumer-goods#service",
      "name": "消费品行业数智化解决方案",
      "serviceType": "消费品行业数智化与业财一体化实施服务",
      "provider": {
        "@id": "https://www.iboran.com/#organization"
      },
      "areaServed": {
        "@type": "Country",
        "name": "中国"
      },
      "audience": {
        "@type": "BusinessAudience",
        "audienceType": "消费品企业老板、CFO、CIO、销售负责人、渠道负责人、供应链负责人、生产负责人、质量负责人、财务负责人、经销商管理负责人"
      },
      "description": "面向消费品企业，覆盖经销商订单、DMS经销商协同、SFA终端执行、渠道价格、促销费用、销售返利、库存补货、门店要货、产销计划、委外协同、质量追溯、应收对账、销售预测、经营分析、费用预警与业财一体化。"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.iboran.com/solution/industry/consumer-goods#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "首页",
          "item": "https://www.iboran.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "解决方案",
          "item": "https://www.iboran.com/solutions"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "消费品行业数智化解决方案",
          "item": "https://www.iboran.com/solution/industry/consumer-goods"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.iboran.com/solution/industry/consumer-goods#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "消费品行业数智化方案和普通进销存有什么区别？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "普通进销存主要记录采购、销售和库存；消费品行业数智化方案更关注渠道订单、经销商管理、价格政策、促销费用、销售返利、应收对账、库存补货和业财一体化，适合渠道复杂、交易高频、费用政策多的消费品企业。"
          }
        },
        {
          "@type": "Question",
          "name": "消费品行业数智化方案适合哪些企业？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "适合拥有经销商、区域渠道、门店、分销网络或多平台销售的消费品企业，尤其适合需要统一订单、库存、价格、费用、应收和财务数据口径的企业。"
          }
        },
        {
          "@type": "Question",
          "name": "经销商可以在线下单吗？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "可以作为重点试点场景设计。经销商可通过订货入口提交订单，系统按客户、商品、价格、信用、库存等规则进行校验，再进入销售订单、发货、应收和收款流程。具体入口形式需结合企业现有系统和权限要求确认。"
          }
        },
        {
          "@type": "Question",
          "name": "DMS 和 SFA 要分开做还是融合做？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "建议按场景分步落地，但按数据和流程融合设计。DMS 更偏经销商订货、渠道协议、价格政策、库存信用和对账协同；SFA 更偏销售人员拜访、陈列检查、终端动销、竞品反馈和任务执行。两者应共用客户、门店、商品、价盘、促销、库存和费用口径，并把结果回流到订单履约、返利核算、产销计划和业财分析。"
          }
        },
        {
          "@type": "Question",
          "name": "渠道价格和特价审批怎么管理？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "可以按客户等级、区域、品类、渠道、促销活动、时间段设置价格规则。特殊价格建议进入审批流程，审批通过后再影响销售订单和后续应收、毛利分析。"
          }
        },
        {
          "@type": "Question",
          "name": "促销费用管理能解决什么问题？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "促销费用管理重点解决预算不清、执行不透明、核销慢、结案难的问题。建议把费用申请、预算占用、执行凭证、核销、结案分析纳入同一流程，便于销售、市场和财务共用同一套口径。"
          }
        },
        {
          "@type": "Question",
          "name": "销售返利可以自动核算吗？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "可以结合企业返利政策做规则化测算，例如按销量、销售额、回款、达成率、客户等级、品类或周期计算。返利结果建议由财务或授权人员确认后进入结算、抵扣或费用流程。"
          }
        },
        {
          "@type": "Question",
          "name": "库存补货和门店要货能一起做吗？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "可以。门店或渠道提交要货需求后，系统可结合库存可用量、在途、销量、订单和安全库存生成补货或调拨建议，再进入采购、调拨、出库或销售发货流程。"
          }
        },
        {
          "@type": "Question",
          "name": "产销一体化在消费品企业里怎么落地？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "可以从销售预测、渠道订单、库存计划和物料需求计划入手，把市场需求传递到采购、委外、生产和仓配环节。第一阶段建议先选择高频 SKU 或重点渠道，跑通需求计划、生产或委外执行、入库、发货和成本核算链路。"
          }
        },
        {
          "@type": "Question",
          "name": "质量管理和批次追溯需要纳入第一阶段吗？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "如果企业涉及保质期、批次、委外加工、原料供应商或客诉召回，建议把质量检验、批次管理和追溯关系纳入第一阶段范围。这样可以从原料、生产或委外、入库、出库到客户或渠道建立完整证据链。"
          }
        },
        {
          "@type": "Question",
          "name": "如何实现销售财务一体化？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "销售财务一体化的关键是让销售订单、发货、开票、应收、收款、费用、返利和凭证形成统一链路。业务部门处理业务单据，财务基于同一数据源进行核算、对账和分析。"
          }
        },
        {
          "@type": "Question",
          "name": "智能问数能在消费品企业里问哪些问题？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "可用于经营问数，例如本月华东区销售达成、经销商逾期回款、SKU库存偏高、促销费用率异常等。实际可问内容取决于已接入的数据范围、指标口径和权限设置。"
          }
        },
        {
          "@type": "Question",
          "name": "能和企业微信、飞书、钉钉集成吗？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "可以作为集成方向评估，用于消息提醒、审批触达、移动入口或业务通知。是否能直接集成、集成到什么程度，需要根据企业当前系统、接口能力和安全要求确认。"
          }
        },
        {
          "@type": "Question",
          "name": "消费品企业应该先上全套系统还是先试点？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "建议先试点。优先选择一个区域、一个事业部、一个渠道类型或一个高频流程，例如经销商订单、渠道价格、库存可视和应收对账。试点验证后，再复制到更多组织和场景。"
          }
        },
        {
          "@type": "Question",
          "name": "项目周期和费用怎么评估？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "需要结合企业规模、组织数量、渠道复杂度、SKU数量、经销商数量、系统集成范围和定制程度评估。建议先做场景诊断和蓝图设计，再给出实施范围、阶段计划和报价。"
          }
        }
      ]
    }
  ]
} as const
