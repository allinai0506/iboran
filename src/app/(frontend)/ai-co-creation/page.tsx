import { Metadata } from 'next'
import { AiCoCreationPageContent } from './page.content'
import { GeoSection } from '@/components/GeoSection'

const PAGE_URL = 'https://www.iboran.com/ai-co-creation'
const SITE_NAME = '泊冉软件'

export const metadata: Metadata = {
  title: 'AI数字员工共创方案_接入业务系统与智能问数_泊冉软件',
  description:
    '泊冉 AI 数字员工共创方案，基于业务系统接口、MCP/API、智能问数、企业微信、飞书、钉钉与行业算法能力，帮助企业把采购单、询价单、Excel、PDF、图片和聊天记录转化为报价单、销售订单、服务工单、报销预审、智能问数和经营预警。',
  keywords:
    'AI数字员工,用友AI,ERP AI,业务系统集成,MCP,智能问数,AI快速报价,客户采购单生成销售订单,AI读单建单,经营预警,企业微信AI,飞书AI,钉钉AI,泊冉软件',
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'AI数字员工共创方案_接入业务系统与智能问数_泊冉软件',
    description:
      'AI数字员工接任务，业务系统接口调流程，智能问数看经营和推预警，企业系统沉淀单据和流程。',
    url: PAGE_URL,
    siteName: SITE_NAME,
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI数字员工共创方案 | 泊冉软件',
    description: '不只是AI问答，帮助企业从业务指令到流程闭环。',
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.iboran.com/#organization',
      name: '泊冉软件',
      url: 'https://www.iboran.com/',
      telephone: '400-9955-161',
      logo: 'https://www.iboran.com/assets/boran-logo.png',
      address: {
        '@type': 'PostalAddress',
        addressLocality: '上海',
        streetAddress: '上海市普陀区曹杨路1888号星光耀广场1号楼1005室',
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: 'AI数字员工共创方案',
      description:
        'AI数字员工接任务，业务系统接口调流程，智能问数看经营和推预警，企业系统沉淀单据和流程。',
      isPartOf: {
        '@type': 'WebSite',
        name: SITE_NAME,
        url: 'https://www.iboran.com/',
      },
      about: { '@id': `${PAGE_URL}#service` },
    },
    {
      '@type': 'Service',
      '@id': `${PAGE_URL}#service`,
      name: 'AI数字员工共创方案',
      provider: { '@id': 'https://www.iboran.com/#organization' },
      serviceType: 'AI数字员工、业务系统连接、智能问数与经营预警共创服务',
      areaServed: '中国',
      description:
        '基于AI数字员工、业务系统接口、智能问数和企业协同入口，帮助企业将客户采购单、询价单、Excel、PDF、图片和聊天记录转化为报价单、销售订单、服务工单、报销预审、智能问数和经营预警。',
      audience: {
        '@type': 'Audience',
        audienceType:
          '制造、消费品、医药、连锁零售、跨境电商、现代服务、集团财务共享企业',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首页', item: 'https://www.iboran.com/' },
        { '@type': 'ListItem', position: 2, name: 'AI数字员工共创方案', item: PAGE_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'AI数字员工和普通AI问答有什么区别？',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '普通 AI 问答主要回答问题和生成文字。AI 数字员工更强调业务执行：能读客户采购单、识别字段、匹配客户和物料、计算价格和库存、生成单据草稿，并将结果传递到企业现有业务流程中。',
          },
        },
        {
          '@type': 'Question',
          name: '业务系统连接 / MCP 是什么？',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'MCP/API 是让 AI 在授权范围内调用业务系统能力的一类连接方式。员工用自然语言描述目标后，AI 可以调用客户、物料、库存、价格、信用、报价、销售订单、采购申请、审批等业务工具，完成多步骤业务动作。',
          },
        },
        {
          '@type': 'Question',
          name: '智能问数能解决什么问题？',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '智能问数主要解决指标解释、经营归因和异常预警。管理层、财务、销售、运营可以直接问销售、库存、毛利、费用、现金流、采购履约、项目毛利等数据，也可以接收系统主动推送的风险提醒。',
          },
        },
        {
          '@type': 'Question',
          name: '企业一定要先做复杂算法吗？',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '不需要。第一批 AI 场景建议从简单重复工作开始，例如客户采购单转销售订单、询价单快速报价、发票报销预审、门店要货转调拨、客户邮件转工单、经营指标问数和库存预警。',
          },
        },
        {
          '@type': 'Question',
          name: '可以接企业微信、飞书和钉钉吗？',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '可以作为协同入口进行设计。员工可以在企业微信、飞书、钉钉中发起任务、接收待办、查看预警和确认结果。具体接入方式需要根据企业当前协同工具、权限体系和业务系统集成条件确认。',
          },
        },
        {
          '@type': 'Question',
          name: 'AI 可以直接生成销售订单吗？',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '建议第一阶段先生成销售订单草稿。AI 读取客户采购单后，可以识别客户、商品、数量、价格和交期，并做库存、信用、价格等校验。校验通过后生成订单草稿，关键动作由授权人员确认后提交审批。',
          },
        },
        {
          '@type': 'Question',
          name: '哪些企业适合先做 AI 数字员工？',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '适合有大量重复录入、查价、核库存、填单、审批、催办、报表和预警工作的企业，尤其是制造、消费品、医药、连锁零售、跨境电商、现代服务和集团财务共享类企业。',
          },
        },
        {
          '@type': 'Question',
          name: '泊冉的 AI 共创怎么开始？',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '建议先做一次 AI 业务场景诊断。泊冉会结合企业行业、现有系统、协同工具、数据基础和业务痛点，筛选 1–3 个高频、低风险、可验证的 AI 数字员工样板，先跑通一个小场景，再逐步扩展。',
          },
        },
      ],
    },
  ],
}

export default function AiCoCreationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AiCoCreationPageContent />
      <GeoSection
        title="AI数字员工共创方案"
        description={
          (metadata.description as string) ||
          'AI数字员工接任务，业务系统接口调流程，智能问数看经营。'
        }
        keywords={metadata.keywords}
        url={PAGE_URL}
        breadcrumbs={[
          { name: '首页', url: '/' },
          { name: 'AI数字员工共创方案', url: '/ai-co-creation' },
        ]}
        identityTitle="本网页由【泊冉软件】提供。"
        identityDescription="泊冉软件是用友软件实施服务商，提供AI数字员工共创方案，帮助企业将业务动作从手工录入转向AI辅助执行。"
        variant="listing"
      />
    </>
  )
}
