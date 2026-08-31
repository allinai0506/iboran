import type { Metadata } from 'next'
import { ImplementationContent } from './page.content'
import { GeoSection } from '@/components/GeoSection'

// TL;DR（AI 直接答案，LLM 爬虫可见）
const TLDR =
  '系统实施服务：泊冉面向 YonSuite SaaS 快速上线与 YonBIP 敏捷交付，覆盖蓝图设计、系统建设、测试培训到上线切换，通过售前交接、需求匹配、方案评审、数据准备与客户成功移交，让项目上线更可控。'

export const metadata: Metadata = {
  title: '系统实施服务｜SaaS快速上线与BIP敏捷交付 | 泊冉软件',
  description: '面向中小型成长企业和大中型集团客户，提供从成功规划、蓝图设计、系统建设到上线切换和客户成功移交的系统实施服务。',
  keywords: ['系统实施服务', 'YonSuite实施', 'YonBIP敏捷交付', '蓝图设计', '上线切换'],
  openGraph: {
    title: '系统实施服务 - 泊冉软件',
    description: '专业的 SaaS 快速上线与 BIP 敏捷交付服务。',
  },
  alternates: {
    canonical: 'https://www.iboran.com/services/implementation',
  },
}

const FAQS = [
  {
    question: 'SaaS 快速上线和 BIP 敏捷交付的边界怎么判断？',
    answer: '主要看组织复杂度、业务差异、接口数量、数据迁移范围、客开需求和管控要求。标准流程清晰、组织层级较少、以配置和培训为主的项目，更适合 SaaS 快速上线；多组织、多账套、多系统协同、需要蓝图设计和项目治理的客户，更适合 BIP 敏捷交付路径。',
  },
  {
    question: '项目启动前客户需要准备哪些资料，才能减少返工？',
    answer: '建议准备组织架构、岗位权限、基础档案、业务流程、历史数据样例、报表样式、接口清单、关键用户名单和上线窗口。资料不是越多越好，关键是能支撑顾问判断标准功能、配置实现、低代码扩展、客开和数据迁移的边界。',
  },
  {
    question: '蓝图设计阶段如何避免"什么都想定制"？',
    answer: '会先做 Fit-Gap 判断：优先标准产品能力，其次配置和低代码，再评估客开。每个差异需求都会记录业务原因、影响范围、替代方案、开发成本、上线风险和后续运维责任，避免因为局部习惯把项目拖成大量客开。',
  },
  {
    question: '上线切换前如何判断系统已经具备上线条件？',
    answer: '不能只看功能是否配置完成。还要看关键用户是否完成演练，基础档案和期初数据是否核对，接口和报表是否通过联调，权限是否按岗位验证，异常场景是否有处理预案，并形成上线检查表、问题关闭清单和切换确认记录。',
  },
  {
    question: '实施结束后为什么要做 CSM 移交？',
    answer: '上线不是项目结束，而是进入持续运营。CSM 移交会把项目范围、配置说明、未关闭问题、培训资料、关键用户、运维注意事项和后续优化建议交接给客户成功团队，避免顾问撤场后客户不知道找谁、问题也没有上下文。',
  },
  {
    question: '中大型项目如何控制范围蔓延和上线延期？',
    answer: '需要在项目制里管理范围、里程碑、变更和风险。泊冉会把需求准入、蓝图确认、开发配置、测试验证、数据迁移、上线切换和验收交付拆成节点，变更需求必须评估影响并确认优先级，避免"边做边加"冲击上线节奏。',
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
      '@id': 'https://www.iboran.com/services/implementation#webpage',
      name: '系统实施服务｜SaaS快速上线与BIP敏捷交付',
      url: 'https://www.iboran.com/services/implementation',
      description: '面向中小型成长企业和大中型集团客户，提供从成功规划、蓝图设计、系统建设到上线切换和客户成功移交的系统实施服务。',
      inLanguage: 'zh-CN',
      provider: { '@id': 'https://www.iboran.com/#organization' },
      breadcrumb: { '@id': 'https://www.iboran.com/services/implementation#breadcrumb' },
      about: { '@id': 'https://www.iboran.com/services/implementation#service' },
    },
    {
      '@type': 'Service',
      '@id': 'https://www.iboran.com/services/implementation#service',
      name: '系统实施服务',
      serviceType: '企业数智化全生命周期服务',
      provider: { '@type': 'Organization', name: '泊冉软件', url: 'https://www.iboran.com' },
      areaServed: ['上海', '长三角', '中国'],
      audience: { '@type': 'BusinessAudience', audienceType: '中小型成长企业与大中型集团客户' },
      description: '从成功规划、蓝图设计、系统建设、上线切换到客户成功移交，提供标准方法与项目治理相结合的落地路径。',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.iboran.com/services/implementation#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首页', item: 'https://www.iboran.com' },
        { '@type': 'ListItem', position: 2, name: '服务体系', item: 'https://www.iboran.com/services' },
        { '@type': 'ListItem', position: 3, name: '系统实施服务', item: 'https://www.iboran.com/services/implementation' },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.iboran.com/services/implementation#faq',
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
        title="系统实施服务"
        description="提供 SaaS 快速上线与 BIP 敏捷交付路径，确保项目高质量上线。"
        keywords={metadata.keywords}
        url="https://www.iboran.com/services/implementation"
        tldr={TLDR}
        faqs={FAQS}
        variant="solution"
        visible={false}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ImplementationContent />
    </>
  )
}
