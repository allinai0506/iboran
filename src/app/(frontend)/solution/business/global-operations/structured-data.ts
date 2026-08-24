// 企业出海与全球运营解决方案页结构化数据（WebPage / Service / BreadcrumbList / FAQPage）
// Organization 节点由全站 OrganizationJsonLd 统一输出，此处不重复
export const globalOperationsStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.iboran.com/solution/business/global-operations#webpage",
      "url": "https://www.iboran.com/solution/business/global-operations",
      "name": "企业出海与全球运营解决方案 | 全球财务供应链人力合规 | 泊冉软件",
      "description": "泊冉软件为出海企业提供全球运营数智化解决方案，覆盖跨境电商、海外渠道、本地经营、全球财务、供应链、人力、合规与数据分析，帮助企业从单点出海走向全球一体化运营。",
      "inLanguage": "zh-CN",
      "about": {
        "@id": "https://www.iboran.com/solution/business/global-operations#service"
      },
      "provider": {
        "@id": "https://www.iboran.com/#organization"
      }
    },
    {
      "@type": "Service",
      "@id": "https://www.iboran.com/solution/business/global-operations#service",
      "name": "企业出海与全球运营数智化解决方案",
      "serviceType": "全球运营数智化咨询、业务系统集成、数据分析与预警、合规治理与多区域部署规划服务",
      "provider": {
        "@id": "https://www.iboran.com/#organization"
      },
      "areaServed": {
        "@type": "AdministrativeArea",
        "name": "全球"
      },
      "audience": {
        "@type": "BusinessAudience",
        "audienceType": "出海企业、跨国经营企业、集团总部、海外区域公司，以及老板、财务负责人、信息化负责人、海外业务负责人、供应链负责人和人力负责人"
      },
      "description": "面向企业出海和全球运营场景，围绕全球财务、全球供应链、全球人力、全球合规、跨境对账、海外渠道、本地经营、数据分析与多区域部署，帮助企业规划从单点出海到全球一体化运营的数智化路径。"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.iboran.com/solution/business/global-operations#breadcrumb",
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
          "item": "https://www.iboran.com/solution"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "企业出海与全球运营数智化解决方案",
          "item": "https://www.iboran.com/solution/business/global-operations"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.iboran.com/solution/business/global-operations#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "这是不是一个跨境电商解决方案？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "不是。跨境电商只是企业出海中的一个业务场景。本方案主轴是企业出海、全球运营、全球财务、全球供应链、全球人力、全球合规、数据分析与多区域部署。"
          }
        },
        {
          "@type": "Question",
          "name": "企业应该从哪个出海阶段开始规划？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "企业可以先识别自身处于出口贸易、海外营销、海外运营还是全球化运营阶段，再明确当前最迫切要解决的是跨境对账、海外渠道、全球财务、全球供应链、全球人力还是数据合规与多区域部署问题。"
          }
        },
        {
          "@type": "Question",
          "name": "是否需要推倒现有业务系统重建？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "通常不建议先推倒重建。泊冉软件解决方案会先评估现有系统、表格台账、接口和数据口径，再通过业务系统集成、主数据治理、流程优化和数据分析逐步改善。"
          }
        },
        {
          "@type": "Question",
          "name": "全球财务场景包含哪些重点？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "重点包括多币种核算、跨境对账、收入与成本口径、合并报表准备、资金计划、税务资料准备和经营分析。涉及凭证生效、资金支付和税务申报时，只生成建议、草稿或预警，由授权人员确认后进入正式流程。"
          }
        },
        {
          "@type": "Question",
          "name": "数据跨境和隐私合规如何处理？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "建议先梳理数据分类、使用目的、存储区域、访问权限、传输链路和日志留痕。涉及数据跨境时，系统只生成建议、草稿或预警，由授权人员确认后进入正式流程。"
          }
        },
        {
          "@type": "Question",
          "name": "全球人力是否可以覆盖海外薪酬和派遣？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "可以按地区差异规划员工档案、派遣、假勤、福利、薪酬计算和人力分析。涉及薪酬发放、个税申报、社保缴纳等高风险动作时，只生成建议、草稿或预警，由授权人员确认后进入正式流程。"
          }
        },
        {
          "@type": "Question",
          "name": "多区域部署需要提前考虑什么？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "需要结合业务所在国家或地区、访问体验、数据分类、隐私要求、系统集成、运维能力和安全策略，选择集中、分布或混合部署方式，并预留后续扩展空间。"
          }
        }
      ]
    }
  ]
} as const
