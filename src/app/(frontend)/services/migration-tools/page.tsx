import type { Metadata } from 'next'
import { MigrationContent } from './page.content'
import { GEOJsonLd } from '@/components/GEOJsonLd'

export const metadata: Metadata = {
  title: '迁移与工具服务｜数据抽取、数据同步、BIP升迁、数据脱敏、云巡检 | 泊冉软件',
  description: '提供数据抽取、数据同步、BIP升迁、历史数据迁移、业务数据转凭证、数据脱敏、云巡检、数据库转换和数据备份等工具化服务，保障数据完整和系统平滑切换。',
  keywords: ['数据迁移', '数据抽取', '数据同步', 'BIP升迁', '数据脱敏', '云巡检', '数据库转换', '业务数据转凭证', '数据卸载'],
  openGraph: {
    title: '迁移与工具服务｜数据抽取、数据同步、BIP升迁、数据脱敏、云巡检 | 泊冉软件',
    description: '提供数据抽取、数据同步、BIP升迁、历史数据迁移、业务数据转凭证、数据脱敏、云巡检、数据库转换和数据备份等工具化服务，保障数据完整和系统平滑切换。',
    url: 'https://www.iboran.com/services/migration-tools',
  },
  alternates: {
    canonical: 'https://www.iboran.com/services/migration-tools',
  },
}

const FAQS = [
  {
    question: '迁移评估先看哪些信息？',
    answer: '先看源系统与目标系统版本、组织账套、模块范围、历史期间、数据量、附件、接口、审批流、停机窗口和必须保留的查询口径，再判断适合升迁、抽取、同步、脱敏、卸载还是组合交付。',
  },
  {
    question: '如何证明数据真的迁准了？',
    answer: '不能只看工具执行成功。需要按对象数量、金额合计、科目余额、辅助余额、凭证状态、单据链路、附件可访问性和抽样业务场景做核对，并形成对账报告和确认清单。',
  },
  {
    question: '集团拆分或子公司独立能处理吗？',
    answer: '可以按公司、组织、账套、模块和年度设计抽取范围，形成独立数据环境或审计数据包，同时处理敏感数据隔离、历史查询、权限控制和核对报告。',
  },
  {
    question: '正式迁移一定要长时间停机吗？',
    answer: '不一定。通常先做试迁移和差异修复，再根据数据量、业务冻结要求和接口切换窗口安排正式迁移；关键场景会提前设计备份点、回滚条件和现场保障机制。',
  },
  {
    question: '数据抽取、数据同步和正式迁移有什么区别？',
    answer: '数据抽取更偏历史保留、审计查询和离线分析；数据同步更偏新旧系统并行、跨系统数据流转和阶段性过渡；正式迁移则要进入目标系统生产使用，必须处理清洗、转换、校验、切换、回滚和客户确认。',
  },
  {
    question: '数据脱敏适合哪些场景，脱敏后还能核对吗？',
    answer: '适合测试环境、开发联调、外部协作、审计包和历史查询场景。脱敏规则会保留必要的数据结构、关联关系和统计口径，例如编码映射、金额区间、日期偏移和字段遮蔽，既降低敏感信息暴露风险，又保留校验和测试价值。',
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
      '@id': 'https://www.iboran.com/services/migration-tools#webpage',
      name: '迁移与工具服务｜数据抽取、数据同步、BIP升迁、数据脱敏、云巡检',
      url: 'https://www.iboran.com/services/migration-tools',
      description: '提供数据抽取、数据同步、BIP升迁、历史数据迁移、业务数据转凭证、数据脱敏、云巡检、数据库转换和数据备份等工具化服务，保障数据完整和系统平滑切换。',
      inLanguage: 'zh-CN',
      provider: { '@id': 'https://www.iboran.com/#organization' },
      breadcrumb: { '@id': 'https://www.iboran.com/services/migration-tools#breadcrumb' },
      about: { '@id': 'https://www.iboran.com/services/migration-tools#service' },
    },
    {
      '@type': 'Service',
      '@id': 'https://www.iboran.com/services/migration-tools#service',
      name: '迁移与工具服务',
      serviceType: '企业数智化全生命周期服务',
      provider: { '@type': 'Organization', name: '泊冉软件', url: 'https://www.iboran.com' },
      areaServed: ['上海', '长三角', '中国'],
      audience: { '@type': 'BusinessAudience', audienceType: '中小型成长企业与大中型集团客户' },
      description: '围绕系统升级、数据迁移、集团拆分、历史数据归档、多系统同步、业务数据转凭证、数据安全和运行巡检等场景，提供工具化、标准化、可验证的迁移与工具服务。',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.iboran.com/services/migration-tools#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首页', item: 'https://www.iboran.com' },
        { '@type': 'ListItem', position: 2, name: '服务体系', item: 'https://www.iboran.com/services' },
        { '@type': 'ListItem', position: 3, name: '迁移与工具服务', item: 'https://www.iboran.com/services/migration-tools' },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.iboran.com/services/migration-tools#faq',
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
      <GEOJsonLd
        title="迁移与工具服务"
        description="数据抽取、数据同步、BIP升迁、数据脱敏与云巡检等工具化迁移服务。"
        faqs={FAQS}
        url="https://www.iboran.com/services/migration-tools"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MigrationContent />
    </>
  )
}
