'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './manufacturing.module.css'
import { useAttribution } from '@/providers/Attribution'

export const ManufacturingContent: React.FC = () => {
  const attribution = useAttribution()
  const [activeIndustry, setActiveIndustry] = useState('machinery')
  const [activeRole, setActiveRole] = useState('boss')
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

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
      source: '制造业数智化总览',
      sourcePageUrl: typeof window !== 'undefined' ? window.location.href : '',
      utmData: attribution ? {
        utm_source: attribution.utm_source || '',
        utm_medium: attribution.utm_medium || '',
        utm_campaign: attribution.utm_campaign || '',
        referrer: attribution.referrer || '',
        landingPage: attribution.landing_page || '',
      } : undefined,
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

  const industries = [
    { id: 'machinery', name: '机械装备' },
    { id: 'electronics', name: '电子电气' },
    { id: 'chip', name: '芯片研发' },
    { id: 'hightech', name: '高科技' },
    { id: 'auto', name: '汽配制造' },
    { id: 'materials', name: '化工及新材料' },
    { id: 'food', name: '食品' },
    { id: 'consumer', name: '消费电子' },
    { id: 'custom', name: '个性化定制' },
    { id: 'group', name: '多工厂协同' },
  ]

  const industryContent: Record<string, any> = {
    machinery: {
      title: '机械装备',
      desc: '机械装备通常以按单设计、项目制造和长周期交付为主，系统建设要把报价、设计、采购、委外、生产、成本和售后备件连成一条项目链路。',
      focus: ['项目BOM、版本生效与替代料', '长周期件、委外加工和关键件追溯', '按订单归集材料、委外 and 制造成本'],
      pains: ['报价BOM、设计BOM和生产BOM口径不一致', '采购到货、设计变更与现场计划不同步', '项目毛利到交付后才复盘'],
      priority: '选择一个项目型订单跑通需求、BOM、采购、派工、质检、入库 and 订单成本',
      tags: ['按单设计', '项目制造', '订单成本', '关键件追溯'],
    },
    electronics: {
      title: '电子电气',
      desc: '电子电气企业更关注多层BOM、替代料、批次序列号、来料检验和快速交付，核心是让研发、计划、采购、质检和生产使用同一套物料与版本规则。',
      focus: ['多层BOM、替代料和版本控制', '批次、序列号、来料检验和工序质检', '委外协同、快速排产 and 交付异常反馈'],
      pains: ['替代料规则靠人工判断，计划与采购口径不一致', '批次序列号只在局部系统记录，追溯链不完整', '质量异常回写慢，影响交期 and 返工判断'],
      priority: '先从多层BOM、替代料和来料/工序质检联动切入，再延伸到批次追溯 and 交付预警',
      tags: ['多层BOM', '替代料', '序列号', '来料检验'],
    },
    chip: {
      title: '芯片研发',
      desc: '芯片研发更关注研发项目、版本迭代、样品流转、委外封测、试产转量产 and 项目成本。',
      focus: ['研发项目、阶段任务 and 版本里程碑', '样品BOM、替代料、委外封测 and 试产批次', '项目领料、费用归集 and 样机成本分析'],
      pains: ['研发变更影响采购、库存 and 试产计划，传递不及时', '委外封测、样品检验 and 项目进度分散记录', '研发费用、样品材料 and 项目成本难以及时归集'],
      priority: '选择一个芯片项目，跑通研发任务、样品BOM、采购申请、委外封测、检验 and 项目成本',
      tags: ['研发项目', '样品BOM', '委外封测', '项目成本'],
    }
  }

  const roles = [
    { id: 'boss', name: '老板/总经理', content: '关注订单交付、产能瓶颈、库存占用、订单毛利、客户盈利和经营风险，适合看经营驾驶舱、交付风险清单和利润分析。' },
    { id: 'cfo', name: 'CFO', content: '关注成本核算、存货金额、应收应付、制造费用分摊、凭证自动化和业财一致性，适合从订单成本和存货核算切入。' },
    { id: 'cio', name: 'CIO', content: '关注系统架构、主数据、权限、接口、第三方系统集成、数据安全和低代码扩展，适合先做系统现状盘点。' },
    { id: 'production', name: '生产负责人', content: '关注计划达成、派工、报工、工序进度、异常反馈、产线效率和完工入库，适合从车间可视化和报工闭环切入。' },
  ]

  const faqs = [
    { q: '制造业数智化解决方案适合哪些企业？', a: '适合机械装备、电子电气、芯片研发、高科技、汽配制造、化工及新材料、食品、消费电子、个性化定制和多工厂协同型制造企业，尤其适合存在多系统割裂、计划不准、车间不可视、质量追溯慢、成本核算滞后等问题的企业。' },
    { q: '制造业数智化方案能解决哪些核心问题？', a: '可以围绕研产供销财一体化，解决订单交付、BOM变更、MPS/MRP计划、采购协同、生产报工、库存管理、质量追溯、成本核算和业财一体化等问题。' },
    { q: '这和 MES 系统有什么区别？', a: 'MES主要解决车间执行、设备采集、派工报工和现场追溯。制造业数智化方案覆盖更完整的业务闭环，包括研发、计划、采购、生产、仓储、质量、成本、财务和经营分析。MES可以作为生产执行子模块进行集成。' },
  ]

  return (
    <div className={styles.manufacturingPage}>
      <section className={styles.hero}>
        <div className={styles.gridBg} />
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
            <div className={styles.valueTags}>
              <span>研产供销财一体化</span>
              <span>MPS / MRP / LRP计划协同</span>
              <span>车间报工与质量追溯</span>
              <span>订单成本与业财闭环</span>
            </div>
            <div className={styles.heroActions}>
              <a href="#diagnosis" className={`${styles.btn} ${styles.btnPrimary}`}>
                <svg viewBox="0 0 24 24" width="19" height="19"><path d="M4 5h16v14H4V5Zm3 3v2h10V8H7Zm0 4v2h7v-2H7Zm0 4v1h4v-1H7Z" /></svg>
                预约制造业数智化诊断
              </a>
              <a href="#scenarios" className={`${styles.btn} ${styles.btnSecondary}`}>
                <svg viewBox="0 0 24 24" width="19" height="19"><path d="M5 4h14v3H5V4Zm0 5h14v3H5V9Zm0 5h14v3H5v-3Zm0 5h9v1H5v-1Z" /></svg>
                查看制造业场景清单
              </a>
            </div>
            <div className={styles.heroQuote}>
              制造业系统建设的关键，不是多上一套软件，而是让每一张订单都能看见计划、物料、现场、质量、成本和财务结果。
            </div>
          </div>

          <aside className={styles.heroConsole}>
            <Image
              src="/assets/manufacturing/manufacturing-digital-og.png"
              alt="制造业数智化解决方案"
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
              <div className={styles.projectFlow}>
                <span>订单</span><i /><span>计划</span><i /><span>采购</span><i /><span>生产</span><i /><span>成本</span><i /><span>分析</span>
              </div>
              <div className={styles.metricGrid}>
                <div><small>订单交付</small><b>92%</b><em>3张订单存在交期风险</em></div>
                <div><small>缺料预警</small><b>18项</b><em>建议采购确认到货计划</em></div>
                <div><small>质量追溯</small><b>批次</b><em>关联来料、工序与发货</em></div>
                <div><small>订单成本</small><b>+3.6%</b><em>材料与委外成本待复核</em></div>
              </div>
              <div className={styles.alertRow}><span>MRP</span><b>关键物料低于安全库存</b><em>预警</em></div>
              <div className={`${styles.alertRow} ${styles.danger}`}><span>成本</span><b>订单毛利偏离目标</b><em>分析</em></div>
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
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
      </section>

      <section className={styles.section} style={{ background: '#fff' }}>
        <div className={styles.sectionHead}>
          <span>评估逻辑</span>
          <h2>先归类断点，再确定场景</h2>
          <p>制造业项目先回答三件事：企业业务复杂度是否需要行业级闭环，当前最影响经营的断点在哪里，系统边界和试点节奏如何逐步收敛。</p>
        </div>
        <div className={styles.answerSummary}>
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

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span>核心架构</span>
          <h2>五层架构把前端业务、数智底座、AI预警和ERP闭环连起来</h2>
        </div>
        <div className={styles.layerStack}>
          <article><b>01</b><h3>前端业务入口</h3><p>销售订单、客户需求、报价、研发变更、车间报工、移动扫码、供应商协同等。</p></article>
          <article><b>02</b><h3>统一数智底座</h3><p>组织、客户、供应商、物料、BOM、工艺、仓库、成本中心、权限、审批和主数据规则统一治理。</p></article>
          <article><b>03</b><h3>AI理解/分析/预警</h3><p>围绕缺料、交期、质量异常、库存健康、成本偏差和经营指标生成建议、草稿、摘要和预警。</p></article>
          <article><b>04</b><h3>业务系统集成</h3><p>连接PLM、MES、WMS、SRM、CRM、OA、BI、设备数据和第三方系统。</p></article>
          <article><b>05</b><h3>ERP业务闭环</h3><p>把研发、计划、采购、生产、库存、质量、销售、成本、财务和经营分析串成闭环。</p></article>
        </div>
      </section>

      <section className={styles.section} id="scenarios">
        <div className={styles.sectionHead}>
          <span>8个业务场景卡片</span>
          <h2>优先从高频、可验证、能形成闭环的制造场景开始</h2>
        </div>
        <div className={styles.scenarioGrid}>
          {[
            { id: '01', title: '销售订单转生产计划', pain: '订单承诺与计划排程脱节。', action: '按订单、库存、BOM、产能生成计划建议。', value: '减少人工追单和交期不透明。', tags: '销售订单 / MPS / MRP / 交付' },
            { id: '02', title: 'BOM与研发变更管理', pain: '旧版本BOM影响采购和生产。', action: '管理版本、生效日期、影响范围和审批。', value: '让变更可追溯、可评估、可生效。', tags: 'EBOM / MBOM / 工艺 / ECN' },
            { id: '03', title: '车间派工与实时报工', pain: '现场进度滞后，异常反馈慢。', action: '派工、领料、报工、完工和异常回写。', value: '订单进度从黑箱变为可视。', tags: '派工 / 报工 / 工序 / MES集成' },
            { id: '04', title: '质量检验与批次追溯', pain: '质量记录散落，追溯耗时。', action: '串联来料、工序、成品、发货与客户流向。', value: '按物料、批次、订单和工序查询。', tags: '质检 / 批次 / 序列号 / 追溯' },
          ].map(s => (
            <article key={s.id} className={styles.scenarioCard}>
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

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span>子行业模块</span>
          <h2>不同制造子行业，系统重点不一样</h2>
        </div>
        <div className={styles.tabList}>
          {industries.map(ind => (
            <button
              key={ind.id}
              className={`${styles.tabButton} ${activeIndustry === ind.id ? styles.tabButtonActive : ''}`}
              onClick={() => setActiveIndustry(ind.id)}
            >
              {ind.name}
            </button>
          ))}
        </div>
        <div className={styles.tabPanel}>
          {industryContent[activeIndustry] ? (
            <>
              <h3>{industryContent[activeIndustry].title}</h3>
              <p>{industryContent[activeIndustry].desc}</p>
              <div className={styles.industryMap}>
                <div><b>管理重点</b><ul>{industryContent[activeIndustry].focus.map((f: string) => <li key={f}>{f}</li>)}</ul></div>
                <div><b>典型断点</b><ul>{industryContent[activeIndustry].pains.map((p: string) => <li key={p}>{p}</li>)}</ul></div>
                <div><b>优先切入</b><p style={{fontSize: '14px', color: '#5f6b82'}}>{industryContent[activeIndustry].priority}</p></div>
              </div>
              <div className={styles.roleTags}>
                {industryContent[activeIndustry].tags.map((t: string) => <span key={t}>{t}</span>)}
              </div>
            </>
          ) : (
            <p>更多子行业方案正在完善中...</p>
          )}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span>角色模块</span>
          <h2>同一条业务链路，不同角色看到不同管理重点</h2>
        </div>
        <div className={styles.tabList}>
          {roles.map(r => (
            <button
              key={r.id}
              className={`${styles.tabButton} ${activeRole === r.id ? styles.tabButtonActive : ''}`}
              onClick={() => setActiveRole(r.id)}
            >
              {r.name}
            </button>
          ))}
        </div>
        <div className={styles.tabPanel}>
          <h3>{roles.find(r => r.id === activeRole)?.name}</h3>
          <p>{roles.find(r => r.id === activeRole)?.content}</p>
        </div>
      </section>

      <section className={styles.section} id="ai-applications">
        <div className={styles.sectionHead}>
          <span>AI应用场景</span>
          <h2>让AI参与订单、计划、现场、质量和经营分析</h2>
        </div>
        <div className={styles.aiScenarioLayout}>
          <div className={styles.aiCommandCard}>
            <small>Manufacturing AI Copilot</small>
            <h3>从业务数据中发现问题，再回到流程里推进处理</h3>
            <div className={styles.aiPipeline}>
              <span>订单/BOM/库存</span><i></i><span>AI理解分析</span><i></i><span>风险预警</span><i></i><span>岗位确认</span>
            </div>
            <p>订单、BOM、库存、报工、质检、成本和财务数据沉淀越完整，AI越能围绕真实业务给出更贴近现场的分析结果。</p>
          </div>
          <div className={styles.aiUsecaseGrid}>
            <article><b>01</b><h3>订单与报价助手</h3><p>解析需求、交期，结合库存、成本，生成报价草稿与风险提示。</p></article>
            <article><b>02</b><h3>计划与缺料预警</h3><p>识别物料短缺、到货延期，形成采购或排产建议。</p></article>
            <article><b>03</b><h3>BOM变更影响分析</h3><p>分析变更对采购、库存、订单的影响，生成影响清单。</p></article>
            <article><b>04</b><h3>经营问数与分析</h3><p>面向毛利、呆滞、成本偏差进行问数分析，生成复盘摘要。</p></article>
          </div>
        </div>
      </section>

      <section className={styles.section} id="faq">
        <div className={styles.sectionHead}>
          <span>FAQ</span>
          <h2>制造企业评估数智化方案时，通常先问这些问题</h2>
        </div>
        <div className={styles.faqList}>
          {faqs.map((f, i) => (
            <div key={i} className={styles.faqItem}>
              <button className={styles.faqQuestion} onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                {f.q}
                <span>{activeFaq === i ? '−' : '+'}</span>
              </button>
              {activeFaq === i && <div className={styles.faqAnswer}>{f.a}</div>}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.diagnosis} id="diagnosis">
        <div className={styles.diagnosisCopy}>
          <span>Manufacturing Diagnosis</span>
          <h2>预约制造业数智化诊断，把订单、现场 and 成本先梳理清楚</h2>
          <p>泊冉顾问将结合企业规模、子行业、当前系统、核心痛点，评估制造业数智化方案、集成边界 and 分阶段落地路径。</p>
          <div className={styles.diagnosisChecks}>
            <div><strong>梳理业务断点</strong><span>订单、BOM、计划、采购、生产、质量、库存、成本 and 财务。</span></div>
            <div><strong>确认系统边界</strong><span>ERP、MES、WMS、PLM及第三方接口。</span></div>
            <div><strong>规划试点路径</strong><span>选择高频、可验证、可复制的场景先跑通。</span></div>
          </div>
          <div className={styles.contactActions}>
            <a href="tel:400-9955-161">电话咨询 400-9955-161</a>
            <Link href="/contact">在线咨询</Link>
          </div>
        </div>

        <form className={styles.leadForm} onSubmit={handleSubmit}>
          <h3>预约制造业数智化诊断</h3>
          <div className={styles.fieldGrid}>
            <label><span>姓名</span><input name="name" type="text" placeholder="您的姓名" /></label>
            <label><span>手机号 *</span><input name="phone" type="tel" placeholder="接收方案诊断结果" required /></label>
          </div>
          <div className={styles.fieldGrid}>
            <label><span>公司名称</span><input name="company" type="text" placeholder="公司全称" /></label>
            <label><span>职位</span><input name="position" type="text" placeholder="您的职位" /></label>
          </div>
          <div className={styles.fieldGrid}>
            <label>
              <span>企业规模</span>
              <select name="company_size">
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
              <select name="subindustry">
                <option value="">请选择</option>
                <option>机械装备</option>
                <option>电子电气</option>
                <option>芯片研发</option>
                <option>汽配制造</option>
                <option>其他制造业</option>
              </select>
            </label>
          </div>
          <button type="submit" className={styles.modalSubmit}>预约方案诊断</button>
        </form>
      </section>
    </div>
  )
}
