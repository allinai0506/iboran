import type { Metadata } from 'next'
import { IntegrationContent } from './page.content'
import { GeoSection } from '@/components/GeoSection'

// TL;DR（AI 直接答案，LLM 爬虫可见）
const TLDR =
  '集成与开发服务：泊冉围绕 ERP 与 OA、MES、WMS、CRM、SRM、银企、税务、BI 等系统，提供 API 对接、数据集成、低代码扩展与客户化开发，遵循标准优先、配置优先、低代码优先的治理原则，让系统互联与扩展可控。'

export const metadata: Metadata = {
  title: '集成与开发服务｜API对接、数据集成、低代码扩展、客户化开发 | 泊冉软件',
  description: '提供系统集成、API治理、数据集成、移动审批、低代码扩展和客户化开发服务，帮助企业打通业务流、数据流和管理流。',
  keywords: ['系统集成', 'API对接', '数据集成', '低代码开发', '客户化开发', '集成总线'],
  openGraph: {
    title: '集成与开发服务 - 泊冉软件',
    description: '专业的系统集成与个性化扩展开发服务。',
    url: 'https://www.iboran.com/services/integration-development',
  },
  alternates: {
    canonical: 'https://www.iboran.com/services/integration-development',
  },
}

const FAQS = [
  {
    question: '标准接口、低代码扩展和客户化开发如何划边界？',
    answer: '先看需求是否已有标准 API、OpenAPI、连接器、审批能力或低代码配置能力。如果标准接口能覆盖，优先标准；如果只是表单、流程、报表、小应用扩展，优先低代码；只有当业务规则、数据模型、性能或权限控制超出标准能力时，才进入受控客开。',
  },
  {
    question: '第三方系统配合不充分，集成项目怎么推进？',
    answer: '会先明确第三方系统负责人、接口文档、测试环境、调用频率、字段口径、错误码和上线窗口。若对方接口不稳定，需要形成问题清单、责任边界和临时补偿方案，避免把外部系统的不确定性全部压到上线阶段。',
  },
  {
    question: '接口联调最容易出问题的不是技术，而是什么？',
    answer: '通常是业务口径不一致，例如客户、供应商、物料、组织、币种、税率、单据状态、审批状态和凭证结果的字段含义不同。因此联调前要先做字段映射、主数据对齐、异常补偿和回写规则确认，而不是直接写代码。',
  },
  {
    question: '如何避免接口上线后出现重复推送、漏推和单据状态错乱？',
    answer: '需要设计幂等规则、唯一键、重试机制、异常队列、状态回写、人工补偿入口和监控告警。上线前通过联调用例覆盖新增、修改、撤销、失败重推、重复请求、网络中断和部分成功等场景，并记录验证结果。',
  },
  {
    question: '客开和补丁升级之间怎么避免互相冲突？',
    answer: '客开必须沉淀对象清单、版本依赖、接口依赖、配置依赖和测试用例。补丁或升级前先做影响分析，确认客开对象是否需要适配；升级后做回归测试，重点看单据流、权限、报表、接口和移动端审批是否仍然可用。',
  },
  {
    question: '移动审批、企业微信、钉钉这类轻量集成怎么控制范围？',
    answer: '轻量集成也要先确认审批对象、单据范围、审批动作、消息触发条件、回写结果和异常处理。建议先覆盖高频审批和关键提醒，再逐步扩展复杂场景，避免把移动端入口做成另一个不可控的定制系统。',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.iboran.com/#organization',
      name: '泊冉软件',
      url: 'https://www.iboran.com',
      telephone: '400-9955-161',
      logo: 'https://www.iboran.com/assets/images/boran-logo.png',
    },
    {
      '@type': 'WebPage',
      '@id': 'https://www.iboran.com/services/integration-development#webpage',
      name: '集成与开发服务｜API对接、数据集成、低代码扩展、客户化开发',
      url: 'https://www.iboran.com/services/integration-development',
      description: '提供系统集成、API治理、数据集成、移动审批、低代码扩展和客户化开发服务，帮助企业打通业务流、数据流和管理流。',
      inLanguage: 'zh-CN',
      provider: { '@id': 'https://www.iboran.com/#organization' },
      breadcrumb: { '@id': 'https://www.iboran.com/services/integration-development#breadcrumb' },
      about: { '@id': 'https://www.iboran.com/services/integration-development#service' },
    },
    {
      '@type': 'Service',
      '@id': 'https://www.iboran.com/services/integration-development#service',
      name: '集成与开发服务',
      serviceType: '企业数智化全生命周期服务',
      provider: { '@type': 'Organization', name: '泊冉软件', url: 'https://www.iboran.com' },
      areaServed: ['上海', '长三角', '中国'],
      audience: { '@type': 'BusinessAudience', audienceType: '中小型成长企业与大中型集团客户' },
      description: '围绕企业多系统协同和个性化业务扩展需求，提供系统集成、API 对接、数据交换、移动审批、低代码扩展、客户化开发和开发运维服务。',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.iboran.com/services/integration-development#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首页', item: 'https://www.iboran.com' },
        { '@type': 'ListItem', position: 2, name: '服务体系', item: 'https://www.iboran.com/services' },
        { '@type': 'ListItem', position: 3, name: '集成与开发服务', item: 'https://www.iboran.com/services/integration-development' },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.iboran.com/services/integration-development#faq',
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
  ],
}

export default function Page() {
  return (
    <>
      <GeoSection
        title="集成与开发服务"
        description="打通多系统孤岛，提供低代码与受控客开服务。"
        keywords={metadata.keywords}
        url="https://www.iboran.com/services/integration-development"
        tldr={TLDR}
        faqs={FAQS}
        variant="solution"
        visible={false}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <IntegrationContent />
    </>
  )
}
