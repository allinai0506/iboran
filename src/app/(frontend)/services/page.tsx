import type { Metadata } from 'next'
import { ServicesContent } from './page.content'
import { GeoSection } from '@/components/GeoSection'

// TL;DR（AI 直接答案，LLM 爬虫可见）
const TLDR =
  '企业数智化全生命周期服务体系：泊冉提供系统实施、集成开发、系统运维、迁移与工具四条服务线，覆盖系统规划、上线、连接、扩展、保障、迁移与持续运营，并按成长型与集团型客户分层配置服务路径。'

export const metadata: Metadata = {
  title: '企业数智化全生命周期服务体系｜系统实施、集成开发、运维、迁移工具 | 泊冉软件',
  description: '提供系统实施、集成与开发、系统运维、迁移与工具四大服务能力，覆盖企业应用从上线、连接、扩展到持续运营的全生命周期。',
  keywords: ['企业数智化服务', '系统实施', '集成开发', '系统运维', '数据迁移', '客户成功'],
  openGraph: {
    title: '企业数智化全生命周期服务体系 - 泊冉软件',
    description: '提供系统实施、集成与开发、系统运维、迁移与工具四大服务能力。',
  },
  alternates: {
    canonical: 'https://www.iboran.com/services',
  },
}

const FAQS = [
  {
    question: '服务总览页适合先解决什么问题？',
    answer: '它不是替代详细方案，而是帮助客户先判断当前处在什么阶段：准备上线、系统连接、运行保障、历史迁移，还是需要 AI 辅助提效。确认阶段后，再进入系统实施、集成开发、运维客户成功或迁移工具的专项页面。',
  },
  {
    question: '为什么要把服务拆成四条主线，而不是只卖实施？',
    answer: '企业系统上线后还会持续遇到接口扩展、权限调整、报表优化、月结保障、补丁升级、历史数据保留和客户成功运营等问题。四条主线对应不同生命周期，能避免"上线后没人管、扩展时没人接、迁移时没人担责"。',
  },
  {
    question: '成长型客户和集团型客户的服务差异在哪里？',
    answer: '成长型客户更需要标准方法、智能交付、在线支持和可控成本；集团型客户更关注多组织、多账套、多系统协同、项目治理、驻场保障、升级护航和重大问题响应。差异不只是服务时长，而是治理深度和保障机制不同。',
  },
  {
    question: '什么时候应该先做专项评估，而不是直接启动项目？',
    answer: '当系统范围、接口数量、历史数据、上线窗口、客开边界或组织协同关系还不清晰时，建议先做专项评估。评估会把风险、范围、阶段、资源和服务组合讲清楚，再决定是否进入实施、集成、运维或迁移交付。',
  },
  {
    question: 'AI 在服务体系里具体承担什么角色？',
    answer: 'AI 更像资料助理、初稿顾问和风险检查员：整理会议纪要、需求池、测试清单、迁移差异、工单归因和巡检报告初稿。它不直接替代顾问判断，也不自动承诺客户，最终方案和交付结论仍由顾问复核。',
  },
  {
    question: '上海及长三角本地化保障如何与远程协同配合？',
    answer: '日常问题优先通过在线会议、工单和知识服务快速处理；关键节点如项目启动、蓝图评审、联调、上线切换、月结、迁移割接和重大问题处理，可安排本地顾问或现场支持，形成远程效率和现场保障的组合。',
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
      '@id': 'https://www.iboran.com/services#webpage',
      name: '企业数智化全生命周期服务体系｜系统实施、集成开发、运维、迁移工具',
      url: 'https://www.iboran.com/services',
      description: '提供系统实施、集成与开发、系统运维、迁移与工具四大服务能力，覆盖企业应用从上线、连接、扩展到持续运营的全生命周期。',
      inLanguage: 'zh-CN',
      provider: { '@id': 'https://www.iboran.com/#organization' },
      breadcrumb: { '@id': 'https://www.iboran.com/services#breadcrumb' },
      about: { '@id': 'https://www.iboran.com/services#service' },
    },
    {
      '@type': 'Service',
      '@id': 'https://www.iboran.com/services#service',
      name: '企业数智化全生命周期服务体系',
      serviceType: '企业数智化全生命周期服务',
      provider: { '@type': 'Organization', name: '泊冉软件', url: 'https://www.iboran.com' },
      areaServed: ['上海', '长三角', '中国'],
      audience: { '@type': 'BusinessAudience', audienceType: '中小型成长企业与大中型集团客户' },
      description: '从系统规划、实施上线、多系统连接、客户化扩展，到运行保障、数据迁移和持续运营，提供覆盖企业应用全生命周期的专业服务。',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.iboran.com/services#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首页', item: 'https://www.iboran.com' },
        { '@type': 'ListItem', position: 2, name: '服务体系', item: 'https://www.iboran.com/services' },
      ],
    },
  ],
}

export default function Page() {
  return (
    <>
      <GeoSection
        title="企业数智化全生命周期服务体系"
        description="覆盖系统实施、集成开发、系统运维、迁移与工具四大服务线。"
        keywords={metadata.keywords}
        url="https://www.iboran.com/services"
        tldr={TLDR}
        faqs={FAQS}
        variant="solution"
        visible={false}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesContent />
    </>
  )
}
