'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './manufacturing.module.css'
import { useAttribution } from '@/providers/Attribution'
import { faqItems } from './structured-data'

const SCENARIOS = [
  { id: '01', title: '销售订单转生产计划', pain: '订单承诺与计划排程脱节。', action: '按订单、库存、BOM、产能生成计划建议。', value: '减少人工追单和交期不透明。', tags: '销售订单 / MPS / MRP / 交付' },
  { id: '02', title: 'BOM与研发变更管理', pain: '旧版本BOM影响采购和生产。', action: '管理版本、生效日期、影响范围和审批。', value: '让变更可追溯、可评估、可生效。', tags: 'EBOM / MBOM / 工艺 / ECN' },
  { id: '03', title: '车间派工与实时报工', pain: '现场进度滞后，异常反馈慢。', action: '派工、领料、报工、完工和异常回写。', value: '订单进度从黑箱变为可视。', tags: '派工 / 报工 / 工序 / MES集成' },
  { id: '04', title: '质量检验与批次追溯', pain: '质量记录散落，追溯耗时。', action: '串联来料、工序、成品、发货与客户流向。', value: '按物料、批次、订单和工序查询。', tags: '质检 / 批次 / 序列号 / 追溯' },
  { id: '05', title: '订单/批次/工序成本核算', pain: '月底才知道订单是否偏离目标。', action: '归集材料、人工、委外、制造费用和损耗。', value: '更早发现成本差异和毛利风险。', tags: '生产成本 / 订单成本 / 毛利' },
  { id: '06', title: '采购协同与供应商管理', pain: '缺料、到货、对账和质量表现分散。', action: '采购计划、到货、质检、对账和供应商评价联动。', value: '让供应链响应计划和订单变化。', tags: '采购协同 / SRM / 到货 / 对账' },
  { id: '07', title: 'WMS库存与线边仓管理', pain: '账实不一，线边仓和呆滞库存难管。', action: '库位、批次、扫码、调拨、盘点和安全库存管理。', value: '库存状态服务计划和成本分析。', tags: 'WMS / 线边仓 / 批次 / 库存健康' },
  { id: '08', title: '定制化选配与订单BOM', pain: '客户选配靠人工拆BOM，报价和交付易偏差。', action: '按特征、配置和订单生成订单BOM与工艺建议。', value: '支持多品种、小批量和个性化制造。', tags: 'ATO / MTO / 订单BOM / 选配' },
]

const INDUSTRIES = [
  {
    id: 'machinery',
    name: '机械装备',
    desc: '机械装备通常以按单设计、项目制造和长周期交付为主，系统建设要把报价、设计、采购、委外、生产、成本和售后备件连成一条项目链路。',
    focus: ['项目BOM、版本生效与替代料', '长周期件、委外加工和关键件追溯', '按订单归集材料、委外和制造成本'],
    pains: ['报价BOM、设计BOM和生产BOM口径不一致', '采购到货、设计变更与现场计划不同步', '项目毛利到交付后才复盘'],
    priority: '选择一个项目型订单跑通需求、BOM、采购、派工、质检、入库和订单成本',
    tags: ['按单设计', '项目制造', '订单成本', '关键件追溯'],
  },
  {
    id: 'electronics',
    name: '电子电气',
    desc: '电子电气企业更关注多层BOM、替代料、批次序列号、来料检验和快速交付，核心是让研发、计划、采购、质检和生产使用同一套物料与版本规则。',
    focus: ['多层BOM、替代料和版本控制', '批次、序列号、来料检验和工序质检', '委外协同、快速排产和交付异常反馈'],
    pains: ['替代料规则靠人工判断，计划与采购口径不一致', '批次序列号只在局部系统记录，追溯链不完整', '质量异常回写慢，影响交期和返工判断'],
    priority: '先从多层BOM、替代料和来料/工序质检联动切入，再延伸到批次追溯和交付预警',
    tags: ['多层BOM', '替代料', '序列号', '来料检验'],
  },
  {
    id: 'chip',
    name: '芯片研发',
    desc: '芯片研发更关注研发项目、版本迭代、样品流转、委外封测、试产转量产和项目成本，系统建设要让研发、采购、仓储、质量和财务共用同一条项目数据链。',
    focus: ['研发项目、阶段任务和版本里程碑', '样品BOM、替代料、委外封测和试产批次', '项目领料、费用归集和样机成本分析'],
    pains: ['研发变更影响采购、库存和试产计划，传递不及时', '委外封测、样品检验和项目进度分散记录', '研发费用、样品材料和项目成本难以及时归集'],
    priority: '选择一个芯片项目，跑通研发任务、样品BOM、采购申请、委外封测、检验和项目成本',
    tags: ['研发项目', '样品BOM', '委外封测', '项目成本'],
  },
  {
    id: 'hightech',
    name: '高科技',
    desc: '高科技企业通常研发迭代快、项目并行多、关键物料价值高，系统重点是把项目计划、研发变更、试制验证、供应协同、质量记录和经营分析连起来。',
    focus: ['研发立项、试制验证和产品版本', '关键物料、供应风险和高价值库存', '项目预算、样机成本和交付复盘'],
    pains: ['研发、采购、生产和售后信息分散，项目状态不透明', '高价值物料领用、借用、退库和报废追踪不完整', '样机成本、试制损耗和项目毛利分析滞后'],
    priority: '从一个新产品项目切入，跑通研发BOM、试制计划、关键料、质量验证和项目成本',
    tags: ['研发迭代', '试制验证', '关键料', '项目经营'],
  },
  {
    id: 'auto',
    name: '汽配制造',
    desc: '汽配制造常见多客户、多料号、滚动预测和质量索赔场景，系统重点是把客户需求、供应商协同、产线执行、批次质量和成本分析关联起来。',
    focus: ['客户预测、滚动计划和供需平衡', '供应商交付、来料质量和批次追溯', '产线报工、质量索赔和成本分析'],
    pains: ['预测变化传递慢，采购与生产调整滞后', '批次追溯、检验记录和客户流向没有完整关联', '索赔、返工和报废成本难以及时归因'],
    priority: '以客户预测和一条主力产线为试点，跑通计划、供应、报工、质检和批次追溯',
    tags: ['滚动计划', '批次追溯', '供应协同', '质量索赔'],
  },
  {
    id: 'materials',
    name: '化工及新材料',
    desc: '化工及新材料更强调配方、批次、质检放行、效期、安全库存和合规追溯，系统建设要先把批记录、检验和仓储规则沉淀清楚。',
    focus: ['配方版本、批次投料和生产批记录', '质检放行、保质期、仓储安全和先进先出', '材料损耗、批次成本和合规追溯'],
    pains: ['配方变更、生效日期和现场执行口径不一致', '检验结果、批次状态和库存可用量没有联动', '批次成本与损耗分析滞后'],
    priority: '先选一个典型产品批次，打通配方、投料、检验、入库、出库和成本归集',
    tags: ['配方管理', '批次效期', '质检放行', '合规追溯'],
  },
  {
    id: 'food',
    name: '食品',
    desc: '食品企业更关注配方、批次、效期、质检放行、产销协同和渠道交付，系统建设要让原料、生产、仓储、质量和销售流向可追溯、可分析。',
    focus: ['配方版本、批次投料和生产批记录', '保质期、质检放行、先进先出和仓储周转', '渠道订单、发货流向和批次追溯'],
    pains: ['配方、投料、检验和入库记录没有完整关联', '效期库存、批次状态和渠道需求同步慢', '质量追溯、召回分析和批次成本响应不够快'],
    priority: '选择一个高频产品批次，跑通原料入库、投料生产、质检放行、发货流向和批次成本',
    tags: ['配方批次', '效期库存', '质检放行', '渠道追溯'],
  },
  {
    id: 'consumer',
    name: '消费电子',
    desc: '消费电子更依赖快速响应、序列号追溯、渠道订单、库存周转和售后返修闭环，关键是让计划、生产、仓储、质量和售后共享同一条产品履历。',
    focus: ['快速排产、成品库存和渠道订单协同', '序列号、批次、返修追溯和售后换修', '关键料齐套、库存周转和交付异常预警'],
    pains: ['渠道订单变化快，计划和库存响应滞后', '序列号、批次、返修记录和客户流向脱节', '关键料缺料或呆滞影响交付与毛利判断'],
    priority: '先选一条高频产品线，跑通订单、排产、发货、序列号追溯和返修闭环',
    tags: ['快速排产', '序列号', '返修追溯', '库存周转'],
  },
  {
    id: 'custom',
    name: '个性化定制',
    desc: '个性化定制面对多品种、小批量、客户选配和按单生产，系统重点是把配置规则、报价、订单BOM、工艺、交付和成本打通，减少人工拆单和反复确认。',
    focus: ['选配规则、配置报价和订单BOM', '按特征生成物料、工艺和计划建议', '小批量排产、变更确认和交付承诺'],
    pains: ['客户需求记录不结构化，报价和BOM靠人工拆解', '订单变更后采购、生产和交付同步慢', '订单成本与个性化配置没有及时关联'],
    priority: '从一类高频定制订单切入，跑通需求配置、报价、订单BOM、计划、生产报工和成本核算',
    tags: ['个性化选配', '配置报价', '订单BOM', '小批量'],
  },
  {
    id: 'group',
    name: '多工厂协同',
    desc: '多工厂协同的难点不只在单厂执行，而在主数据、组织权限、跨厂调拨、集团计划、成本口径和经营分析是否统一。',
    focus: ['物料、BOM、客商、仓库和成本中心统一', '多组织交易、跨厂调拨和集团计划', '权限治理、利润中心和经营分析口径'],
    pains: ['各工厂编码和业务口径不同，集团报表难汇总', '跨厂协同靠线下协调，库存与产能不可视', '成本、库存和利润分析口径不一致'],
    priority: '先统一关键主数据和跨厂业务规则，再选择一个跨厂订单或调拨场景试点',
    tags: ['主数据', '多组织', '跨厂协同', '集团分析'],
  },
]

const ROLES = [
  { id: 'boss', name: '老板/总经理', content: '关注订单交付、产能瓶颈、库存占用、订单毛利、客户盈利和经营风险，适合看经营驾驶舱、交付风险清单和利润分析。' },
  { id: 'cfo', name: 'CFO', content: '关注成本核算、存货金额、应收应付、制造费用分摊、凭证自动化和业财一致性，适合从订单成本和存货核算切入。' },
  { id: 'cio', name: 'CIO', content: '关注系统架构、主数据、权限、接口、第三方系统集成、数据安全和低代码扩展，适合先做系统现状盘点。' },
  { id: 'production', name: '生产负责人', content: '关注计划达成、派工、报工、工序进度、异常反馈、产线效率和完工入库，适合从车间可视化和报工闭环切入。' },
  { id: 'supply', name: '供应链负责人', content: '关注缺料预警、采购计划、供应商到货、委外协同、安全库存、呆滞库存和线边仓，适合从计划与库存联动切入。' },
  { id: 'quality', name: '质量负责人', content: '关注来料检验、过程检验、成品检验、质量异常、批次追溯、放行和质量分析，适合从检验和追溯闭环切入。' },
  { id: 'rd', name: '研发负责人', content: '关注BOM版本、工艺路线、工程变更、订单BOM、替代料和研发到制造衔接，适合从BOM治理和变更管理切入。' },
]

const TLDR_POINTS = [
  {
    icon: 'compass',
    title: '不是单点 MES',
    desc: '面向制造企业经营闭环的行业级方案，覆盖研发、计划、采购、生产、质量、库存、成本、财务 9 大模块。',
  },
  {
    icon: 'layers',
    title: '计划体系协同',
    desc: 'MPS 主需求计划、MRP 物料需求计划、LRP 批次需求计划、备料计划联动，按订单和预测生成建议。',
  },
  {
    icon: 'factory',
    title: '10 个子行业适配',
    desc: '机械装备 / 电子电气 / 芯片研发 / 高科技 / 汽配 / 化工新材料 / 食品 / 消费电子 / 个性化定制 / 多工厂协同。',
  },
  {
    icon: 'users',
    title: '7 类角色视角',
    desc: '老板 / CFO / CIO / 生产 / 供应链 / 质量 / 研发负责人看到的同一业务链路，分别有不同管理重点。',
  },
  {
    icon: 'sparkles',
    title: 'AI 辅助经营',
    desc: '围绕订单、计划、现场、质量和经营分析生成建议、草稿、摘要与预警，关键动作由授权岗位确认。',
  },
  {
    icon: 'route',
    title: '6 阶段落地',
    desc: '诊断 → 蓝图 → 试点 → 集成 → 上线 → 运营优化，先跑通一个高频闭环，再复制到更多产线、工厂。',
  },
]

function TldrIcon({ kind }: { kind: string }) {
  const c = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (kind) {
    case 'compass':
      return (<svg viewBox="0 0 24 24" width="22" height="22" {...c}><circle cx="12" cy="12" r="9" /><path d="m9 15 2-5 5-2-2 5Z" /></svg>)
    case 'layers':
      return (<svg viewBox="0 0 24 24" width="22" height="22" {...c}><path d="m12 4 9 5-9 5-9-5 9-5Z" /><path d="m3 14 9 5 9-5" /></svg>)
    case 'factory':
      return (<svg viewBox="0 0 24 24" width="22" height="22" {...c}><path d="M3 20V10l5 3V10l5 3V8l8 4v8Z" /><path d="M7 20v-3M11 20v-3M15 20v-3M19 20v-3" /></svg>)
    case 'users':
      return (<svg viewBox="0 0 24 24" width="22" height="22" {...c}><circle cx="9" cy="9" r="3.5" /><path d="M2.5 19c0-3.3 2.9-6 6.5-6s6.5 2.7 6.5 6" /><path d="M17 11a3 3 0 1 0 0-6" /><path d="M21.5 19c0-2.8-2-5-4.5-5" /></svg>)
    case 'sparkles':
      return (<svg viewBox="0 0 24 24" width="22" height="22" {...c}><path d="M12 3v4M12 17v4M3 12h4M17 12h4" /><path d="m6 6 2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" /></svg>)
    case 'route':
    default:
      return (<svg viewBox="0 0 24 24" width="22" height="22" {...c}><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="M6 8.5v3a4 4 0 0 0 4 4h4a4 4 0 0 1 4 4v0" /></svg>)
  }
}

export const ManufacturingContent: React.FC = () => {
  const attribution = useAttribution()
  const [activeIndustry, setActiveIndustry] = useState('machinery')
  const [activeRole, setActiveRole] = useState('boss')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      company: formData.get('company'),
      position: formData.get('position'),
      company_size: formData.get('company_size'),
      subindustry: formData.get('subindustry'),
      current_system: formData.get('current_system'),
      core_pain: formData.get('core_pain'),
      has_yonyou: formData.get('has_yonyou'),
      launch_time: formData.get('launch_time'),
      remark: formData.get('remark'),
      source: '制造业数智化总览',
      sourcePageUrl: typeof window !== 'undefined' ? window.location.href : '',
      utmData: attribution
        ? {
            utm_source: attribution.utm_source || '',
            utm_medium: attribution.utm_medium || '',
            utm_campaign: attribution.utm_campaign || '',
            referrer: attribution.referrer || '',
            landingPage: attribution.landing_page || '',
          }
        : undefined,
    }

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        alert('预约成功！我们的顾问将尽快与您联系。')
        ;(e.target as HTMLFormElement).reset()
      } else {
        alert('提交失败，请重试或直接拨打 400-9955-161')
      }
    } catch (_err) {
      alert('网络错误，请稍后重试')
    }
  }

  return (
    <div className={styles.manufacturingPage}>
      {/* Hero */}
      <section className={styles.hero} id="top">
        <div className={styles.gridBg} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}><span />MANUFACTURING DIGITAL SOLUTION</div>
            <h1>制造业数智化解决方案</h1>
            <p className={styles.heroLead}>打通研产供销财，让制造企业从订单到交付、从现场到成本真正闭环</p>
            <p>
              泊冉软件围绕制造企业经营闭环，帮助企业把研发BOM、MPS/MRP/LRP计划、采购协同、生产派工、报工质检、WMS库存、成本核算和经营分析串成一条可执行的数据链路。
            </p>
            <p className={styles.heroDesc}>
              这不是单点MES页面，而是面向制造企业经营闭环的行业解决方案。车间执行、设备采集和现场追溯可作为生产执行子场景，与 <Link href="/solution/business/mes">MES生产执行方案</Link> 协同。
            </p>
            <div className={styles.valueTags} aria-label="核心价值标签">
              <span>研产供销财一体化</span>
              <span>MPS / MRP / LRP计划协同</span>
              <span>车间报工与质量追溯</span>
              <span>订单成本与业财闭环</span>
            </div>
            <div className={styles.heroActions}>
              <a href="#diagnosis" className={`${styles.btn} ${styles.primary}`} data-track="manufacturing_hero_cta_click">
                <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true"><path d="M4 5h16v14H4V5Zm3 3v2h10V8H7Zm0 4v2h7v-2H7Zm0 4v1h4v-1H7Z" /></svg>
                预约制造业数智化诊断
              </a>
              <a href="#scenarios" className={`${styles.btn} ${styles.secondary}`} data-track="manufacturing_secondary_cta_click">
                <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true"><path d="M5 4h14v3H5V4Zm0 5h14v3H5V9Zm0 5h14v3H5v-3Zm0 5h9v1H5v-1Z" /></svg>
                查看制造业场景清单
              </a>
            </div>
            <div className={styles.heroQuote}>制造业系统建设的关键，不是多上一套软件，而是让每一张订单都能看见计划、物料、现场、质量、成本和财务结果。</div>
          </div>

          <aside className={styles.heroConsole} aria-label="制造业经营看板视觉卡片">
            <Image
              src="/assets/manufacturing/manufacturing-digital-og.png"
              alt="制造业数智化解决方案示意"
              width={1200}
              height={630}
              className={styles.heroBanner}
              priority
            />
            <div className={styles.consolePanel}>
              <div className={styles.panelTitle}>
                <span>Manufacturing Command Center</span>
                <strong>闭环监控中</strong>
              </div>
              <div className={styles.projectFlow} aria-label="制造业经营闭环">
                <span>订单</span><i /><span>计划</span><i /><span>采购</span><i /><span>生产</span><i /><span>成本</span><i /><span>分析</span>
              </div>
              <div className={`${styles.metricGrid} ${styles.manufacturingDashboard}`}>
                <div><small>订单交付</small><b>92%</b><em>3张订单存在交期风险</em></div>
                <div><small>缺料预警</small><b>18项</b><em>建议采购确认到货计划</em></div>
                <div><small>质量追溯</small><b>批次</b><em>关联来料、工序与发货</em></div>
                <div><small>订单成本</small><b>+3.6%</b><em>材料与委外成本待复核</em></div>
                <div><small>库存健康</small><b>68天</b><em>呆滞与线边仓需治理</em></div>
              </div>
              <div className={`${styles.alertRow} ${styles.warn}`}><span>MRP</span><b>关键物料低于安全库存，建议补货确认</b><em>预警</em></div>
              <div className={styles.alertRow}><span>报工</span><b>工序完工数据已回写订单进度</b><em>通过</em></div>
              <div className={`${styles.alertRow} ${styles.danger}`}><span>成本</span><b>订单毛利偏离目标，建议财务与生产复核</b><em>分析</em></div>
            </div>
          </aside>
        </div>
      </section>

      {/* TL;DR */}
      <section className={styles.tldr} id="tldr" aria-label="TL;DR 制造业数智化方案速读">
        <div className={styles.tldrInner}>
          <div className={styles.tldrHead}>
            <span>TL;DR</span>
            <h2>制造业数智化方案，30 秒读懂</h2>
            <p>面向制造企业经营闭环的行业级数智化方案，把 9 大业务模块、10 个子行业、7 类角色、AI 预警和 6 阶段落地路径串成研产供销财一体化。</p>
          </div>
          <ul className={styles.tldrGrid}>
            {TLDR_POINTS.map((p, i) => (
              <li key={i}>
                <i className={styles.tldrIcon}><TldrIcon kind={p.icon} /></i>
                <strong>{p.title}</strong>
                <span>{p.desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 痛点 */}
      <section className={`${styles.section} ${styles.pains}`} id="pains">
        <div className={`${styles.sectionHead} ${styles.compact}`}>
          <span>制造业痛点</span>
          <h2>制造企业的管理断点，通常藏在订单、BOM、计划、现场和成本之间</h2>
          <p>很多企业已经有ERP、MES、WMS或PLM，但如果主数据、计划、执行和财务口径没有闭环，交付风险仍会靠人工盯，成本偏差仍会到月末才暴露。</p>
        </div>
        <div className={styles.painLayout}>
          <article><strong>订单交付靠人盯</strong><p>销售、计划、采购、生产各有台账，交期风险靠会议和群消息追。</p></article>
          <article><strong>BOM变更靠群通知</strong><p>研发变更没有稳定生效规则，采购和生产容易使用旧版本数据。</p></article>
          <article><strong>计划不准导致插单混乱</strong><p>库存、产能、采购在途和订单优先级没有同步，插单影响难评估。</p></article>
          <article><strong>车间进度像黑箱</strong><p>派工、领料、报工、质检和异常反馈滞后，管理层看不清真实进度。</p></article>
          <article><strong>质量追溯翻纸单</strong><p>批次、序列号、供应商、工序检验和客户流向没有完整关联。</p></article>
          <article><strong>成本核算月末才知道</strong><p>材料、人工、委外、制造费用和报废损耗没有及时归集到订单或批次。</p></article>
        </div>
        <div className={styles.painConclusion}>下一步不是直接选系统，而是先把这些断点归类到订单、物料、现场、质量、成本和财务链路中，判断哪些环节最影响交付和经营结果。</div>
      </section>

      {/* 评估逻辑 */}
      <section className={`${styles.section} ${styles.answer}`} id="answer">
        <div className={`${styles.sectionHead} ${styles.compact}`}>
          <span>评估逻辑</span>
          <h2>先归类断点，再确定场景</h2>
          <p>制造业项目先回答三件事：企业业务复杂度是否需要行业级闭环，当前最影响经营的断点在哪里，系统边界和试点节奏如何逐步收敛。</p>
        </div>
        <div className={styles.answerSummary} aria-label="制造业方案速览">
          <article>
            <strong>看企业复杂度</strong>
            <span>覆盖离散制造、研发型制造、流程批次、食品效期、个性化定制和多工厂协同等场景。</span>
          </article>
          <article>
            <strong>看经营断点</strong>
            <span>从订单交付、BOM变更、计划协同、车间报工、质量追溯、库存健康和订单成本中定位高频问题。</span>
          </article>
          <article>
            <strong>看落地路径</strong>
            <span>先用1-3个场景验证数据、流程和权限，再逐步扩展到研产供销财闭环。</span>
          </article>
        </div>
      </section>

      {/* 五层架构 */}
      <section className={`${styles.section} ${styles.architecture}`} id="architecture">
        <div className={styles.sectionHead}>
          <span>核心架构</span>
          <h2>五层架构把前端业务、数智底座、AI预警和ERP闭环连起来</h2>
          <p>制造业方案不是功能堆叠，而是把业务入口、数据底座、AI分析、系统集成和ERP闭环统一编排。</p>
        </div>
        <div className={styles.layerStack} aria-label="制造业五层核心架构">
          <article><b>01</b><h3>前端业务入口</h3><p>销售订单、客户需求、报价、研发变更、车间报工、移动扫码、供应商协同、企业微信/飞书/钉钉等业务入口。</p></article>
          <article><b>02</b><h3>统一数智底座</h3><p>组织、客户、供应商、物料、BOM、工艺、仓库、成本中心、权限、审批和主数据规则统一治理。</p></article>
          <article><b>03</b><h3>AI理解/分析/预警</h3><p>围绕缺料、交期、质量异常、库存健康、成本偏差和经营指标生成建议、草稿、摘要和预警。</p></article>
          <article><b>04</b><h3>业务系统/API/MCP/集成</h3><p>连接PLM、MES、WMS、SRM、CRM、OA、BI、设备数据和第三方系统，评估接口、字段、权限和写回边界。</p></article>
          <article><b>05</b><h3>ERP业务闭环</h3><p>把研发、计划、采购、生产、库存、质量、销售、成本、应收应付、总账和经营分析串成闭环。</p></article>
        </div>
      </section>

      {/* 业务闭环流程图 */}
      <section className={`${styles.section} ${styles.flowSection}`} id="closed-loop">
        <div className={`${styles.sectionHead} ${styles.compact}`}>
          <span>业务闭环流程图</span>
          <h2>从客户需求到经营分析，每一步都能沉淀业务事实</h2>
          <p>沿着这条链路梳理在线节点、人工断点和系统集成点。</p>
        </div>
        <div className={styles.closedLoopDiagram} aria-label="制造业业务闭环流程">
          <article className={styles.loopStage}>
            <div className={styles.stageHead}><span>01</span><div><strong>客户与订单</strong><em>把需求转成可执行订单</em></div></div>
            <ol>
              <li><b>客户需求</b><small>规格、数量、交期和特殊约束进入统一入口。</small></li>
              <li><b>报价</b><small>结合物料、工艺、采购周期和目标毛利形成报价依据。</small></li>
              <li><b>销售订单</b><small>确认交期、配置、价格和交付责任，进入计划链路。</small></li>
            </ol>
          </article>
          <article className={styles.loopStage}>
            <div className={styles.stageHead}><span>02</span><div><strong>工程与计划</strong><em>把订单拆成物料和产能需求</em></div></div>
            <ol>
              <li><b>BOM/工艺</b><small>确认版本、替代料、工艺路线和工程变更影响。</small></li>
              <li><b>MPS/MRP/LRP</b><small>按订单、预测、库存和产能计算采购与生产建议。</small></li>
              <li><b>采购/委外</b><small>联动供应商到货、委外加工、缺料预警和对账基础。</small></li>
            </ol>
          </article>
          <article className={styles.loopStage}>
            <div className={styles.stageHead}><span>03</span><div><strong>生产与交付</strong><em>把现场执行变成可追溯数据</em></div></div>
            <ol>
              <li><b>生产派工</b><small>按订单、工序、人员、设备和产线下达执行任务。</small></li>
              <li><b>报工/质检</b><small>记录工序进度、完工数量、异常、检验和批次信息。</small></li>
              <li><b>入库/发货</b><small>联动库存、批次、序列号、出库和客户交付状态。</small></li>
            </ol>
          </article>
          <article className={styles.loopStage}>
            <div className={styles.stageHead}><span>04</span><div><strong>财务与经营</strong><em>把业务结果沉淀为经营判断</em></div></div>
            <ol>
              <li><b>成本核算</b><small>归集材料、人工、委外、制造费用、损耗和报废。</small></li>
              <li><b>财务凭证</b><small>把入库、出库、应收应付和成本结果进入财务口径。</small></li>
              <li><b>经营分析</b><small>分析交付、库存、质量、订单毛利和经营风险。</small></li>
            </ol>
          </article>
        </div>
        <div className={styles.loopFeedback}>
          <strong>分析反哺</strong>
          <p>经营分析结果可以反哺报价策略、计划参数、供应策略、质量改进和成本控制，形成下一轮订单的优化依据。</p>
        </div>
      </section>

      {/* 8 场景卡片 */}
      <section className={`${styles.section} ${styles.scenarios}`} id="scenarios">
        <div className={`${styles.sectionHead} ${styles.compact}`}>
          <span>8个业务场景卡片</span>
          <h2>优先从高频、可验证、能形成闭环的制造场景开始</h2>
          <p>以下场景可按企业基础分阶段推进，先跑通一个关键闭环，再复制到更多产线、工厂和业务单元。</p>
        </div>
        <div className={styles.scenarioGrid}>
          {SCENARIOS.map((s) => (
            <article key={s.id} className={styles.scenarioCard} tabIndex={0} data-scenario={s.title} data-track="manufacturing_scene_card_click">
              <small>SCENARIO {s.id}</small>
              <h3>{s.title}</h3>
              <dl>
                <dt>痛点</dt><dd>{s.pain}</dd>
                <dt>动作</dt><dd>{s.action}</dd>
                <dt>价值</dt><dd>{s.value}</dd>
              </dl>
              <span>{s.tags}</span>
            </article>
          ))}
        </div>
      </section>

      {/* 子行业模块 */}
      <section className={`${styles.section} ${styles.industry}`} id="industries">
        <div className={`${styles.sectionHead} ${styles.compact}`}>
          <span>子行业模块</span>
          <h2>不同制造子行业，系统重点不一样</h2>
          <p>不同子行业关注点不同，建议先从高频、可验证的业务断点切入。</p>
        </div>
        <div className={styles.tabList} role="tablist" aria-label="制造子行业">
          {INDUSTRIES.map((ind) => (
            <button
              key={ind.id}
              type="button"
              role="tab"
              aria-selected={activeIndustry === ind.id}
              aria-controls={`industry-${ind.id}`}
              id={`tab-industry-${ind.id}`}
              className={`${styles.tabButton} ${activeIndustry === ind.id ? styles.isActive : ''}`}
              onClick={() => setActiveIndustry(ind.id)}
              data-track="manufacturing_industry_tab_click"
            >
              {ind.name}
            </button>
          ))}
        </div>
        <div className={styles.tabPanels}>
          {INDUSTRIES.map((ind) => (
            <article
              key={ind.id}
              role="tabpanel"
              id={`industry-${ind.id}`}
              aria-labelledby={`tab-industry-${ind.id}`}
              className={styles.tabPanel}
              hidden={activeIndustry !== ind.id}
            >
              <h3>{ind.name}</h3>
              <p>{ind.desc}</p>
              <div className={styles.industryMap} aria-label={`${ind.name}管理重点`}>
                <div><b>管理重点</b><ul>{ind.focus.map((f) => <li key={f}>{f}</li>)}</ul></div>
                <div><b>典型断点</b><ul>{ind.pains.map((p) => <li key={p}>{p}</li>)}</ul></div>
                <div><b>优先切入</b><ul><li>{ind.priority}</li></ul></div>
              </div>
              <div className={styles.roleTags}>
                {ind.tags.map((t) => <span key={t}>{t}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 角色模块 */}
      <section className={`${styles.section} ${styles.roles}`} id="roles">
        <div className={`${styles.sectionHead} ${styles.compact}`}>
          <span>角色模块</span>
          <h2>同一条业务链路，不同角色看到不同管理重点</h2>
          <p>老板、财务、IT、生产、供应链、质量和研发看到的是同一条业务链路，但各自需要不同的管理视角。</p>
        </div>
        <div className={styles.tabList} role="tablist" aria-label="制造企业角色">
          {ROLES.map((r) => (
            <button
              key={r.id}
              type="button"
              role="tab"
              aria-selected={activeRole === r.id}
              aria-controls={`role-${r.id}`}
              id={`tab-role-${r.id}`}
              className={`${styles.tabButton} ${activeRole === r.id ? styles.isActive : ''}`}
              onClick={() => setActiveRole(r.id)}
              data-track="manufacturing_role_tab_click"
            >
              {r.name}
            </button>
          ))}
        </div>
        <div className={`${styles.tabPanels} ${styles.rolePanels}`}>
          {ROLES.map((r) => (
            <article
              key={r.id}
              role="tabpanel"
              id={`role-${r.id}`}
              aria-labelledby={`tab-role-${r.id}`}
              className={styles.tabPanel}
              hidden={activeRole !== r.id}
            >
              <h3>{r.name}</h3>
              <p>{r.content}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 实施路径 */}
      <section className={`${styles.section} ${styles.implementation}`} id="implementation">
        <div className={`${styles.sectionHead} ${styles.compact}`}>
          <span>实施路径模块</span>
          <h2>从诊断到运营优化，分阶段跑通制造业闭环</h2>
          <p>泊冉建议先明确业务断点和系统边界，再用可验证的试点场景降低实施风险。</p>
        </div>
        <div className={styles.implementationGrid}>
          <article><b>01</b><h3>诊断</h3><p>访谈销售、研发、计划、采购、生产、质量、仓储和财务，识别流程断点、数据问题和系统边界。</p></article>
          <article><b>02</b><h3>蓝图</h3><p>梳理组织、主数据、BOM、计划、生产、库存、质量、成本和财务流程，确定目标蓝图。</p></article>
          <article><b>03</b><h3>试点</h3><p>选择订单交付、计划、报工、质量追溯或订单成本等场景，用真实业务跑通闭环。</p></article>
          <article><b>04</b><h3>集成</h3><p>评估PLM、MES、WMS、SRM、OA、BI等系统接口、字段、权限、同步频率和写回风险。</p></article>
          <article><b>05</b><h3>上线</h3><p>完成配置、数据初始化、权限、培训、联调、切换和上线支持，确保关键岗位能稳定使用。</p></article>
          <article><b>06</b><h3>运营优化</h3><p>围绕交付、库存、质量、成本和经营分析持续复盘，逐步扩展AI预警、ChatBI问数和流程优化。</p></article>
        </div>
      </section>

      {/* AI 应用场景 */}
      <section className={`${styles.section} ${styles.aiApplications}`} id="ai-applications">
        <div className={`${styles.sectionHead} ${styles.compact}`}>
          <span>AI应用场景</span>
          <h2>让AI参与订单、计划、现场、质量和经营分析</h2>
          <p>制造业AI的价值不只是问答，而是围绕业务事实识别风险、生成建议、整理草稿和辅助分析，让管理团队更早看到交付、库存、质量和成本变化。</p>
        </div>
        <div className={styles.aiScenarioLayout}>
          <div className={styles.aiCommandCard}>
            <small>Manufacturing AI Copilot</small>
            <h3>从业务数据中发现问题，再回到流程里推进处理</h3>
            <div className={styles.aiPipeline} aria-label="制造业AI应用链路">
              <span>订单/BOM/库存</span><i /><span>AI理解分析</span><i /><span>风险预警</span><i /><span>建议与草稿</span><i /><span>岗位确认</span>
            </div>
            <p>订单、BOM、库存、报工、质检、成本和财务数据沉淀越完整，AI越能围绕真实业务给出更贴近现场的分析结果。</p>
          </div>
          <div className={styles.aiUsecaseGrid}>
            <article><b>01</b><h3>订单与报价助手</h3><p>解析客户需求、规格、数量和交期约束，结合历史价格、库存和成本口径，生成报价草稿与交付风险提示。</p></article>
            <article><b>02</b><h3>计划与缺料预警</h3><p>读取MPS/MRP/LRP结果，识别关键物料短缺、替代料、到货延期和产能冲突，形成采购或排产建议。</p></article>
            <article><b>03</b><h3>BOM变更影响分析</h3><p>围绕工程变更分析受影响的采购、库存、在制、订单和成本，生成影响清单，辅助研发、计划和采购协同评估。</p></article>
            <article><b>04</b><h3>车间异常摘要</h3><p>汇总报工、质检、设备和异常反馈，生成班组日报、异常原因摘要和待跟进事项，帮助现场问题更快闭环。</p></article>
            <article><b>05</b><h3>质量追溯与分析</h3><p>按批次、序列号、供应商、工序和客户流向查询追溯链路，辅助整理质量异常摘要和改进建议草稿。</p></article>
            <article><b>06</b><h3>经营问数与成本分析</h3><p>面向订单毛利、库存呆滞、成本偏差、交付风险和质量表现进行问数分析，生成经营复盘摘要。</p></article>
          </div>
        </div>
        <div className={styles.aiApplicationNote}>
          <strong>AI应用方式</strong>
          <p>AI输出以建议、草稿、摘要和预警的形式进入业务流程，审批、生效、财务入账、质量判定等关键动作由授权岗位确认。</p>
        </div>
      </section>

      {/* FAQ */}
      <section className={`${styles.section} ${styles.faq}`} id="faq">
        <div className={`${styles.sectionHead} ${styles.compact}`}>
          <span>FAQ</span>
          <h2>制造企业评估数智化方案时，通常先问这些问题</h2>
        </div>
        <div className={styles.faqList}>
          {faqItems.map((f, i) => (
            <div key={i} className={`${styles.faqItem} ${openFaq === i ? styles.isOpen : ''}`}>
              <button type="button" aria-expanded={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span>{f.q}</span><b />
              </button>
              <p>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 诊断表单 */}
      <section className={`${styles.section} ${styles.diagnosis}`} id="diagnosis">
        <div className={styles.diagnosisCopy}>
          <span>Manufacturing Diagnosis</span>
          <h2>预约制造业数智化诊断，把订单、现场和成本先梳理清楚</h2>
          <p>泊冉顾问将结合企业规模、子行业、当前系统、核心痛点和预计启动时间，评估制造业数智化方案、MES/WMS/PLM集成边界和分阶段落地路径。</p>
          <div className={styles.conversionLines} aria-label="制造业诊断关注点">
            <p>订单交付靠人盯？先看计划、物料和现场数据是否能闭环。</p>
            <p>成本月末才知道？先把订单、批次、工序和财务口径说清楚。</p>
            <p>已有MES/WMS/PLM？先评估接口、字段、权限和写回风险。</p>
          </div>
          <div className={styles.diagnosisChecks}>
            <div><strong>梳理业务断点</strong><span>订单、BOM、计划、采购、生产、质量、库存、成本和财务。</span></div>
            <div><strong>确认系统边界</strong><span>ERP、MES、WMS、PLM、OA、BI及第三方接口。</span></div>
            <div><strong>规划试点路径</strong><span>选择高频、可验证、可复制的场景先跑通。</span></div>
          </div>
          <div className={styles.contactActions}>
            <a href="tel:400-9955-161" data-track="manufacturing_phone_click">电话咨询 400-9955-161</a>
            <Link href="/contact" data-track="manufacturing_online_consult_click">在线咨询</Link>
            <a href="#scenarios" data-track="manufacturing_download_click">下载制造业场景清单</a>
          </div>
        </div>

        <form className={styles.leadForm} onSubmit={handleSubmit} noValidate>
          <h3>预约制造业数智化诊断</h3>
          <div className={styles.fieldGrid}>
            <label><span>姓名</span><input name="name" type="text" autoComplete="name" /></label>
            <label><span>手机号 <b>*</b></span><input name="phone" type="tel" autoComplete="tel" inputMode="tel" required /></label>
          </div>
          <div className={styles.fieldGrid}>
            <label><span>公司名称</span><input name="company" type="text" autoComplete="organization" /></label>
            <label><span>职位</span><input name="position" type="text" placeholder="例如：总经理 / CFO / CIO / 生产负责人" /></label>
          </div>
          <div className={styles.fieldGrid}>
            <label>
              <span>企业规模</span>
              <select name="company_size" defaultValue="">
                <option value="">请选择</option>
                <option>100人以下</option>
                <option>100-300人</option>
                <option>300-1000人</option>
                <option>1000人以上</option>
                <option>多工厂/集团型</option>
              </select>
            </label>
            <label>
              <span>所属子行业</span>
              <select name="subindustry" defaultValue="">
                <option value="">请选择</option>
                <option>机械装备</option>
                <option>电子电气</option>
                <option>芯片研发</option>
                <option>高科技</option>
                <option>汽配制造</option>
                <option>化工及新材料</option>
                <option>食品</option>
                <option>消费电子</option>
                <option>个性化定制</option>
                <option>多工厂协同</option>
                <option>其他制造业</option>
              </select>
            </label>
          </div>
          <div className={styles.fieldGrid}>
            <label>
              <span>当前系统</span>
              <select name="current_system" defaultValue="">
                <option value="">请选择</option>
                <option>Excel/手工台账</option>
                <option>已有ERP</option>
                <option>已有MES</option>
                <option>已有WMS</option>
                <option>已有PLM</option>
                <option>多套系统并存</option>
                <option>暂未确定</option>
              </select>
            </label>
            <label>
              <span>核心痛点</span>
              <select name="core_pain" defaultValue="">
                <option value="">请选择</option>
                <option>订单交付靠人盯</option>
                <option>BOM变更靠群通知</option>
                <option>计划不准导致插单混乱</option>
                <option>车间进度像黑箱</option>
                <option>质量追溯翻纸单</option>
                <option>成本核算月末才知道</option>
                <option>多系统集成与数据治理</option>
              </select>
            </label>
          </div>
          <div className={styles.fieldGrid}>
            <label>
              <span>当前系统生态</span>
              <select name="has_yonyou" defaultValue="">
                <option value="">请选择</option>
                <option>已有ERP系统</option>
                <option>已有MES/WMS/PLM</option>
                <option>多套业务系统并存</option>
                <option>暂无核心业务系统</option>
                <option>不确定</option>
              </select>
            </label>
            <label>
              <span>预计启动时间</span>
              <select name="launch_time" defaultValue="">
                <option value="">请选择</option>
                <option>1个月内</option>
                <option>1-3个月</option>
                <option>3-6个月</option>
                <option>6个月以上</option>
                <option>先做方案评估</option>
              </select>
            </label>
          </div>
          <label>
            <span>补充说明</span>
            <textarea name="remark" rows={4} placeholder="例如：已有ERP和MES，但计划、车间报工、质量追溯和订单成本还没有打通，想评估制造业数智化方案和集成边界" />
          </label>
          <p className={styles.formHint} role="status" aria-live="polite">请留下有效手机号，泊冉顾问会结合制造业场景与您沟通。</p>
          <button type="submit" className={styles.modalSubmit} data-track="manufacturing_form_submit">
            提交制造业诊断需求
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M5 12h12.2l-5.1-5.1L14 5l8 8-8 8-1.9-1.9 5.1-5.1H5v-2Z" /></svg>
          </button>
        </form>
      </section>
    </div>
  )
}