import type { Metadata } from 'next'
import { OperationsContent } from './page.content'
import { GeoSection } from '@/components/GeoSection'

// TL;DR（AI 直接答案，LLM 爬虫可见）
const TLDR =
  '系统运维与客户成功服务：泊冉围绕系统上线后的长期运行，提供工单支持、问题诊断、运行巡检、补丁升级、月结保障、权限检查与客户成功运营，并按标准、加速、优先、尊享计划分层保障系统持续创造价值。'

export const metadata: Metadata = {
  title: '系统运维与客户成功服务｜巡检、月结保障、升级护航、工单支持 | 泊冉软件',
  description: '围绕系统上线后的长期稳定运行，提供工单支持、问题诊断、系统巡检、月结保障、补丁升级和客户成功运营服务。',
  keywords: ['系统运维', '客户成功', '工单支持', '系统巡检', '月结保障', '升级护航'],
  openGraph: {
    title: '系统运维与客户成功服务 - 泊冉软件',
    description: '专业的系统稳定运行与持续价值保障服务。',
    url: 'https://www.iboran.com/services/operations',
  },
  alternates: {
    canonical: 'https://www.iboran.com/services/operations',
  },
}

const FAQS = [
  {
    question: '月结 / 年结保障通常具体做什么？',
    answer: '会先梳理结账链路和关键岗位，包括总账、应收应付、存货核算，成本、供应链单据、合并报表等；结账前检查异常单据、凭证状态、接口未处理数据和关键报表口径，结账期间协助定位差异，结账后输出问题清单、处理记录和下月优化建议。',
  },
  {
    question: '驻场服务不是坐班，怎么定义驻场价值？',
    answer: '驻场不只是"人在现场"，而是围绕上线稳定期、月结窗口、升级窗口或重大问题处理设定目标。交付前会明确驻场周期、服务时段、现场任务、对接人、问题分级和验收方式，交付物包括现场问题台账，日 / 周进展、验证记录、风险提醒和阶段复盘。',
  },
  {
    question: '重大问题响应如何分级，不会所有问题都走同一套流程吗？',
    answer: '会按业务影响范围、是否阻断生产经营、是否影响结账或发货、是否存在数据风险来分级。重大问题会拉通应用顾问，技术顾问，开发 / 集成支持和本地顾问，先恢复业务可用，再定位根因，最后沉淀补丁、配置、操作或流程优化方案。',
  },
  {
    question: '升级、补丁、客开和接口经常互相影响，如何控制风险？',
    answer: '升级或补丁前会先做影响分析，列出客开对象、接口、报表、权限、审批流和关键业务场景；再准备回归测试用例、上线窗口、备份点和回退条件。升级后重点验证单据流转、接口推送、报表口径和核心岗位操作，避免"系统升级了，业务断了"。',
  },
  {
    question: '客户成功服务如何避免只变成工单处理？',
    answer: '工单只是入口，客户成功更关注系统是否持续被用好。我们会结合模块启用、用户活跃、流程卡点、高频问题、培训缺口和关键指标变化，形成月度服务报告、优化清单、培训计划和价值复盘，让运维从被动救火转向持续运营。',
  },
  {
    question: '个性化定制服务通常可以协商哪些内容？',
    answer: '可协商服务方式、响应时段、驻场周期，会议机制、服务人员角色、专项服务清单、服务台账格式、报告频率和双方确认机制。适合集团型客户、多系统客户、月结压力大或现场保障要求高的客户，最终以定制服务方案和确认口径为准。',
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
      '@id': 'https://www.iboran.com/services/operations#webpage',
      name: '系统运维与客户成功服务｜巡检、月结保障、升级护航、工单支持',
      url: 'https://www.iboran.com/services/operations',
      description: '围绕系统上线后的长期稳定运行，提供工单支持、问题诊断、系统巡检、月结保障、补丁升级和客户成功运营服务。',
      inLanguage: 'zh-CN',
      provider: { '@id': 'https://www.iboran.com/#organization' },
      breadcrumb: { '@id': 'https://www.iboran.com/services/operations#breadcrumb' },
      about: { '@id': 'https://www.iboran.com/services/operations#service' },
    },
    {
      '@type': 'Service',
      '@id': 'https://www.iboran.com/services/operations#service',
      name: '系统运维与客户成功服务',
      serviceType: '企业数智化全生命周期服务',
      provider: { '@type': 'Organization', name: '泊冉软件', url: 'https://www.iboran.com' },
      areaServed: ['上海', '长三角', '中国'],
      audience: { '@type': 'BusinessAudience', audienceType: '中小型成长企业与大中型集团客户' },
      description: '围绕系统上线后的长期稳定运行，提供工单支持、问题诊断、系统巡检、月结保障、补丁升级、驻场服务和客户成功运营服务。',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.iboran.com/services/operations#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首页', item: 'https://www.iboran.com' },
        { '@type': 'ListItem', position: 2, name: '服务体系', item: 'https://www.iboran.com/services' },
        { '@type': 'ListItem', position: 3, name: '系统运维与客户成功服务', item: 'https://www.iboran.com/services/operations' },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.iboran.com/services/operations#faq',
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
        title="系统运维与客户成功服务"
        description="巡检、月结保障、升级护航与客户成功运营服务。"
        keywords={metadata.keywords}
        url="https://www.iboran.com/services/operations"
        tldr={TLDR}
        faqs={FAQS}
        variant="solution"
        visible={false}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <OperationsContent />
    </>
  )
}
