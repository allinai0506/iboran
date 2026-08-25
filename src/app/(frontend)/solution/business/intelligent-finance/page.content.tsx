'use client'

import React, { useState, useEffect, Fragment } from 'react'
import { createPortal } from 'react-dom'
import './intelligent-finance.css'
import './lead-modal.css'
import { useAttribution } from '@/providers/Attribution'
import { scenarios, roles, faqItems } from './data'

export const IntelligentFinanceContent: React.FC = () => {
  const attribution = useAttribution()
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const [modalOpen, setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState('预约智能财务诊断')
  const [modalPrefill, setModalPrefill] = useState('')
  const [modalHint, setModalHint] = useState('提交后，泊冉顾问将结合您的业务场景与系统现状进行沟通。')
  const [modalSubmitting, setModalSubmitting] = useState(false)

  // 触发弹窗：拦截 #diagnosis / #consultation / #appointment / data-lead-modal / data-modal-open
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return
      const trigger = target.closest(
        "[data-lead-modal], [data-modal-open], a[href='#diagnosis'], a[href='#consultation'], a[href='#appointment']"
      ) as HTMLElement | null
      if (!trigger) return
      e.preventDefault()
      e.stopPropagation()
      const prefill =
        trigger.dataset.prefillInterest ||
        trigger.dataset.prefillMessage ||
        trigger.dataset.prefillScene ||
        trigger.dataset.prefillIssue ||
        ''
      setModalTitle(trigger.dataset.modalTitle || trigger.textContent?.trim() || '预约智能财务诊断')
      setModalPrefill(prefill)
      setModalHint('提交后，泊冉顾问将结合您的业务场景与系统现状进行沟通。')
      setModalOpen(true)
    }
    document.addEventListener('click', handler, true)
    return () => document.removeEventListener('click', handler, true)
  }, [])

  useEffect(() => {
    if (modalOpen) document.body.classList.add('boran-modal-open')
    else document.body.classList.remove('boran-modal-open')
    return () => document.body.classList.remove('boran-modal-open')
  }, [modalOpen])

  const handleLeadFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    if (!formData.get('privacyConsent')) {
      alert('请先阅读并同意隐私政策')
      return
    }

    const interestScenarios = Array.from(formData.getAll('interestScenarios')).map(String)
    const financeNeeds = Array.from(formData.getAll('financeNeeds')).map(String)

    const remarkParts: string[] = []
    const message = (formData.get('message') || '').toString().trim()
    if (message) remarkParts.push(`补充说明: ${message}`)
    const companySize = (formData.get('companySize') || '').toString().trim()
    if (companySize) remarkParts.push(`企业规模: ${companySize}`)
    const isMultiOrg = (formData.get('isMultiOrg') || '').toString().trim()
    if (isMultiOrg) remarkParts.push(`是否多组织: ${isMultiOrg}`)
    const hasOverseasEntity = (formData.get('hasOverseasEntity') || '').toString().trim()
    if (hasOverseasEntity) remarkParts.push(`是否涉及海外主体: ${hasOverseasEntity}`)
    if (financeNeeds.length) remarkParts.push(`专项需求: ${financeNeeds.join(', ')}`)

    const data = {
      name: (formData.get('name') || '').toString().trim(),
      phone: (formData.get('phone') || '').toString().trim(),
      company: (formData.get('company') || '').toString().trim(),
      role: (formData.get('role') || '').toString().trim(),
      currentSystem: (formData.get('currentSystem') || '').toString().trim(),
      interest: interestScenarios,
      remark: remarkParts.join('\n'),
      source: '智能财务解决方案',
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
        alert('预约成功！我们的财务顾问将尽快与您联系。')
        form.reset()
      } else if (res.status === 429) {
        alert('您刚刚提交过，请稍后再试。')
      } else {
        alert('提交失败，请重试或直接拨打 400-9955-161')
      }
    } catch (_err) {
      alert('网络错误，请稍后重试')
    }
  }

  const handleModalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const company = (formData.get('company') || '').toString().trim()
    const contact = (formData.get('contact') || '').toString().trim()
    const rawPhone = (formData.get('phone_wechat') || '').toString().trim()
    const remark = (formData.get('remark') || '').toString().trim()

    const digits = rawPhone.replace(/[\s-]/g, '').replace(/^\+?86/, '')
    const phone = digits.match(/^1[3-9]\d{9}$/)?.[0] || ''

    if (!company || !contact) {
      setModalHint('请填写企业名称和联系人。', )
      return
    }
    if (!phone) {
      setModalHint('请填写 11 位手机号，便于泊冉顾问与您联系。')
      return
    }

    setModalSubmitting(true)
    const data = {
      name: contact,
      phone,
      company,
      remark: remark || undefined,
      source: '智能财务解决方案',
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
        setModalHint('已收到需求，泊冉顾问会尽快与您沟通。')
        form.reset()
      } else if (res.status === 429) {
        setModalHint('您刚刚提交过，请稍后再试。')
      } else {
        setModalHint('提交失败，请重试或直接拨打 400-9955-161。')
      }
    } catch (_err) {
      setModalHint('网络错误，请稍后重试。')
    } finally {
      setModalSubmitting(false)
    }
  }

  return (
    <div className="if-scope">
      {/* Hero */}
      <section className="hero" id="top">
        <div className="grid-bg" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="eyebrow"><span />INTELLIGENT FINANCE</div>
            <h1>
              <span className="hero-title-line">智能财务解决方案：</span>
              <span className="hero-title-line">以会计事项中台打通业财融合</span>
            </h1>
            <p className="hero-lead">让业务发生即财务可见，让财务核算反推经营决策</p>
            <p>
              基于 YonSuite / YonBIP 智能财务能力，贯通销售、采购、库存、生产、项目、费用、资金、税务与多组织数据，支撑实时核算、全面预算、合并报表、全球多账簿和 AI 经营分析，帮助企业从事后记账走向实时管控。
            </p>
            <div className="value-tags" aria-label="首屏价值标签">
              <span>业财融合</span>
              <span>会计事项中台</span>
              <span>智能核算</span>
              <span>全面预算</span>
              <span>合并报表</span>
              <span>全球多账簿</span>
              <span>AI 财务分析</span>
            </div>
            <div className="hero-actions">
              <a className="btn primary" href="#diagnosis" data-track="click_if_hero_primary_cta">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4V5Zm3 3v2h10V8H7Zm0 4v2h7v-2H7Zm0 4v1h4v-1H7Z" /></svg>
                预约智能财务场景诊断
              </a>
              <a className="btn secondary" href="#scenarios" data-track="click_if_hero_secondary_cta">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 4 8 8-8 8-1.8-1.8 4.9-4.9H4v-2.6h11.1l-4.9-4.9L12 4Z" /></svg>
                查看典型场景
              </a>
            </div>
          </div>

          <aside className="finance-visual" aria-label="业务事项到智能财务闭环示意">
            <div className="visual-toolbar">
              <span>Finance Flow</span>
              <strong>授权确认后入流程</strong>
            </div>
            <div className="matter-stream">
              <div>
                <b>业务事项</b>
                <span>订单 · 合同 · 发票 · 库存 · 项目 · 费用 · 资金</span>
              </div>
              <i />
              <div className="center-node">
                <b>会计事项中台</b>
                <span>规则识别 · 主数据 · 口径沉淀 · 追溯链路</span>
              </div>
              <i />
              <div>
                <b>智能财务闭环</b>
                <span>核算 · 预算 · 合并 · 多账簿 · AI 分析</span>
              </div>
            </div>
            <div className="dashboard-grid">
              <article><small>凭证草稿</small><strong>由财务确认</strong><em>核算建议</em></article>
              <article><small>预算占用</small><strong>过程控制</strong><em>异常提醒</em></article>
              <article><small>集团报告</small><strong>口径统一</strong><em>合并追溯</em></article>
              <article><small>经营问数</small><strong>收入 / 成本 / 现金流</strong><em>AI 辅助分析</em></article>
            </div>
            <div className="warning-card">
              <span>边界</span>
              <p>凭证生效、审批、税务申报、付款和资金划拨等动作，由授权人员确认后进入流程。</p>
            </div>
          </aside>
        </div>
      </section>

      {/* Answer */}
      <section className="section ai-answer" id="answer">
        <div className="section-head compact">
          <span>先看现状</span>
          <h2>经营数据闭环中的关键断点</h2>
          <p>围绕结账、预算、合并、多账簿、现金流与经营问数，定位影响财务响应和经营判断的关键环节。</p>
        </div>
        <div className="qa-grid">
          <article><h3>月底结账总在追数据</h3><p>销售、采购、库存、生产、项目、费用、资金和税务数据分散在不同系统里，财务要反复取数、补附件、核发票、对往来，结账压力集中在月末。</p></article>
          <article><h3>老板和 CFO 要数时口径不一</h3><p>收入、成本、费用、利润、现金流和预算执行情况需要临时整理，不同部门给出的口径不一致，经营会议很难直接基于同一套数据讨论。</p></article>
          <article><h3>预算控制总是慢半拍</h3><p>预算编制在表格里，费用、采购、项目和营销支出发生在业务流程里。等财务看到超预算、超标准或超计划时，业务动作往往已经发生。</p></article>
          <article><h3>合并报表仍靠月底拼表</h3><p>多公司、多账簿、多币种、多准则和内部交易抵消依赖人工采集与调整，集团报表周期长，数据追溯和差异解释都很吃力。</p></article>
          <article><h3>出海和多账簿口径难统一</h3><p>海外主体、本地准则、IFRS、中国准则、税务口径和集团管理口径并行，一套业务事实往往要反复转换，报表和分析难以及时对齐。</p></article>
          <article><h3>想用 AI 问数，但数据底座不稳</h3><p>如果主数据、权限、会计事项规则和报表口径没有先打通，AI 很难回答到可执行层面。智能财务需要先让业务事实、财务口径和授权数据连起来。</p></article>
        </div>
      </section>

      {/* Pains */}
      <section className="section pains" id="pains">
        <div className="section-head compact">
          <span>财务痛点</span>
          <h2>财务数据跟不上业务变化，通常卡在这些环节</h2>
          <p>这些问题不一定来自财务部门，而是流程、系统、主数据、权限和财务口径共同造成的。</p>
        </div>
        <div className="pain-layout">
          <article><strong>业务和财务割裂</strong><p>订单、合同、库存、项目和费用数据分散，财务仍需人工取数。</p></article>
          <article><strong>月底集中补账</strong><p>凭证、附件、发票、成本和往来集中在月末处理，结账压力大。</p></article>
          <article><strong>预算事后才发现</strong><p>预算编制和业务执行脱节，超预算、超标准、超计划难以及时发现。</p></article>
          <article><strong>集团报表周期长</strong><p>多公司、多账簿、多准则、多币种下，合并报表依赖人工调表。</p></article>
          <article><strong>全球化财税复杂</strong><p>出海企业同时面对本地准则、IFRS、中国准则、税务和集团管理口径。</p></article>
          <article><strong>财务数据难支撑经营</strong><p>老板和 CFO 很难实时看到收入、成本、费用、利润、现金流和风险。</p></article>
        </div>
      </section>

      {/* Architecture */}
      <section className="section architecture" id="architecture">
        <div className="section-head">
          <span>能力架构</span>
          <h2>智能财务能力架构</h2>
          <p>把业务动作识别为会计事项，再进入核算、预算、合并、多账簿与分析链路，形成可追溯的经营数据底座。</p>
        </div>
        <div className="architecture-diagram" aria-label="智能财务能力架构图">
          <article className="architecture-node source">
            <span>业务输入</span>
            <h3>业务事项</h3>
            <div className="node-tags">
              <b>订单</b><b>合同</b><b>发票</b><b>收付款</b><b>库存</b><b>项目</b><b>费用</b><b>海外主体</b>
            </div>
          </article>
          <i className="architecture-arrow" aria-hidden="true" />
          <article className="architecture-node hub">
            <span>业财连接</span>
            <h3>会计事项中台</h3>
            <p>把业务动作转成可核算、可追溯、可分析的数据颗粒。</p>
          </article>
          <i className="architecture-arrow" aria-hidden="true" />
          <article className="architecture-node capability">
            <span>能力矩阵</span>
            <h3>智能财务能力</h3>
            <div className="capability-pills">
              <b>智能核算</b><b>全面预算</b><b>合并报表</b><b>全球多账簿</b><b>财税资金</b><b>AI 分析预警</b>
            </div>
          </article>
          <i className="architecture-arrow" aria-hidden="true" />
          <article className="architecture-node loop">
            <span>经营闭环</span>
            <h3>YonSuite / YonBIP / ERP</h3>
            <p>业务发生、财务处理、经营分析和管理决策回到同一链路。</p>
          </article>
        </div>
        <div className="boundary-note">
          凭证生效、审批生效、税务申报、付款和资金划拨等关键动作，系统生成草稿、建议或预警，由授权人员确认后进入正式流程。
        </div>
      </section>

      {/* Scenarios */}
      <section className="section scenarios" id="scenarios">
        <div className="section-head compact">
          <span>明星业务场景</span>
          <h2>12 个典型智能财务场景</h2>
          <p>按企业现有流程、系统环境和财务口径选择切入点，先把高频业务链路和关键管控口径说清楚。</p>
        </div>
        <div className="scenario-grid">
          {scenarios.map((s) => (
            <article className="scenario-card" tabIndex={0} key={s.id} data-scenario-id={s.id} data-scenario-name={s.name}>
              <small>{s.no}</small>
              <h3>{s.name}</h3>
              <p className="scenario-line">{s.line}</p>
              <dl>
                {s.fields.map((f) => (
                  <Fragment key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </Fragment>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </section>

      {/* Roles */}
      <section className="section roles" id="roles">
        <div className="section-head compact">
          <span>按角色看场景</span>
          <h2>不同管理角色的智能财务入口</h2>
          <p>同一套智能财务底座，老板、CFO、集团财务、预算负责人、海外财务和 CIO 看到的是不同管理入口。</p>
        </div>
        <div className="role-grid">
          {roles.map((r) => (
            <article tabIndex={0} key={r.id} data-role-id={r.id} data-role-name={r.name}>
              <div className="role-icon">{r.icon}</div>
              <h3>{r.name}</h3>
              <p>{r.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* AI Landing */}
      <section className="section ai-landing" id="ai-landing">
        <div className="section-head compact">
          <span>AI 落地</span>
          <h2>把 AI 财务能力放进日常工作流</h2>
          <p>AI 不单独做成一个概念功能，而是基于业财融合、会计事项中台和授权数据，嵌入问数、预警、审单、报告和知识库，让财务人员在原有流程里更快发现问题、生成草稿、形成分析，并由授权人员确认关键动作。</p>
        </div>
        <div className="ai-landing-grid">
          <article><h3>经营问数</h3><p>围绕收入、成本、费用、利润、现金流、预算执行、应收应付、合并口径、多账簿口径和多组织数据，让老板、CFO 和财务负责人用自然语言查询授权范围内的数据。</p></article>
          <article><h3>异常预警</h3><p>对预算超支、费用超标、现金流缺口、成本差异、回款逾期、税票异常、合并口径差异和多账簿口径差异生成提醒，帮助财务提前定位需要处理的事项。</p></article>
          <article><h3>报告草稿</h3><p>基于财务驾驶舱和 ChatBI 数据生成 CFO 图文报告、经营分析摘要、预算执行说明、现金流说明和合并报表差异说明，由负责人复核后使用。</p></article>
          <article><h3>智能审单</h3><p>读取报销单、发票、合同、订单、采购申请和付款申请，提示字段缺失、规则不匹配、预算占用异常、发票查重异常、凭证草稿与核算规则差异。审批与生效仍按企业授权流程执行。</p></article>
          <article><h3>知识库问答</h3><p>沉淀预算制度、费用标准、科目说明、会计事项规则、合并规则、多账簿口径和常见处理方式，减少财务 BP 与业务部门反复解释的成本。</p></article>
          <article><h3>系统协同</h3><p>结合 YonSuite / YonBIP / ERP、OA、CRM、WMS、MES、POS、电商平台、银行、发票平台、税务平台、合同系统、主数据平台和 BI 系统，把 AI 建议、预警和报告回到业务流程与财务处理链路。</p></article>
        </div>
        <div className="ai-landing-note">
          AI 负责识别、读取、生成、校验、提醒和建议；涉及凭证生效、付款执行、税务申报、审批生效、资金划拨和合并调整等关键动作，应由授权人员确认后进入正式流程。
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq" id="faq">
        <div className="section-head compact">
          <span>FAQ</span>
          <h2>评估智能财务项目前，通常先问这些问题</h2>
        </div>
        <div className="faq-list">
          {faqItems.map((f, i) => (
            <article className={`faq-item ${activeFaq === i ? 'is-open' : ''}`} key={i}>
              <button type="button" aria-expanded={activeFaq === i} onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                <span>{f.q}</span><b />
              </button>
              {activeFaq === i && <p>{f.a}</p>}
            </article>
          ))}
        </div>
      </section>

      {/* Diagnosis */}
      <section className="section diagnosis" id="diagnosis">
        <div className="diagnosis-copy">
          <span>Intelligent Finance Diagnosis</span>
          <h2>准备把财务从事后记账升级为实时经营管控吗？</h2>
          <p>预约泊冉智能财务场景诊断，梳理您的业务流程、财务口径、预算管理、合并报表、多账簿和系统集成现状，明确本期优先处理的场景、口径和验收指标。</p>
          <div className="diagnosis-checks">
            <div><strong>先看高频断点</strong><span>费用、采购、收入、预算、合并、多账簿或经营问数从哪里切入。</span></div>
            <div><strong>再定财务口径</strong><span>会计事项规则、主数据、权限、接口、预算和报表口径一起梳理。</span></div>
            <div><strong>最后评估扩展</strong><span>从单场景扩展到多组织、多系统、多账簿和集团财务管理。</span></div>
          </div>
          <div className="contact-actions">
            <a href="tel:400-9955-161" data-track="click_if_phone">电话咨询 400-9955-161</a>
            <a href="#scenarios" data-scroll-target data-track="click_if_hero_secondary_cta">先看典型场景</a>
          </div>
        </div>

        <form className="lead-form" data-form-name="intelligent-finance-diagnosis" noValidate onSubmit={handleLeadFormSubmit}>
          <h3>预约智能财务场景诊断</h3>
          <div className="field-grid">
            <label><span>姓名 <b>*</b></span><input name="name" type="text" autoComplete="name" required /></label>
            <label><span>手机号 <b>*</b></span><input name="phone" type="tel" autoComplete="tel" inputMode="tel" required /></label>
          </div>
          <div className="field-grid">
            <label><span>公司名称 <b>*</b></span><input name="company" type="text" autoComplete="organization" required /></label>
            <label><span>职位</span><input name="role" type="text" placeholder="例如：CFO / 财务负责人 / CIO" /></label>
          </div>
          <div className="field-grid">
            <label>
              <span>企业规模</span>
              <select name="companySize">
                <option value="">请选择</option>
                <option>100人以下</option>
                <option>100-500人</option>
                <option>500-2000人</option>
                <option>2000人以上</option>
                <option>集团型 / 多法人</option>
              </select>
            </label>
            <label><span>当前使用系统</span><input name="currentSystem" type="text" placeholder="例如：YonSuite / YonBIP / U8 / OA / 多套业务系统" /></label>
          </div>

          <fieldset className="choice-field" data-required-group="interestScenarios">
            <legend>关注场景 <b>*</b></legend>
            <label><input type="checkbox" name="interestScenarios" value="业财融合与会计事项中台" /><span>业财融合</span></label>
            <label><input type="checkbox" name="interestScenarios" value="智能核算" /><span>智能核算</span></label>
            <label><input type="checkbox" name="interestScenarios" value="全面预算" /><span>全面预算</span></label>
            <label><input type="checkbox" name="interestScenarios" value="合并报表" /><span>合并报表</span></label>
            <label><input type="checkbox" name="interestScenarios" value="全球多账簿" /><span>全球多账簿</span></label>
            <label><input type="checkbox" name="interestScenarios" value="AI财务分析" /><span>AI 问数</span></label>
          </fieldset>

          <div className="field-grid">
            <label>
              <span>是否多组织</span>
              <select name="isMultiOrg">
                <option value="">请选择</option>
                <option>是，多法人 / 多门店 / 多项目</option>
                <option>否，单组织为主</option>
                <option>暂不确定</option>
              </select>
            </label>
            <label>
              <span>是否涉及海外主体</span>
              <select name="hasOverseasEntity">
                <option value="">请选择</option>
                <option>是，已有海外主体</option>
                <option>计划出海</option>
                <option>暂不涉及</option>
              </select>
            </label>
          </div>

          <fieldset className="choice-field compact-choice">
            <legend>是否需要预算 / 合并报表 / 多账簿</legend>
            <label><input type="checkbox" name="financeNeeds" value="预算管理" /><span>预算管理</span></label>
            <label><input type="checkbox" name="financeNeeds" value="合并报表" /><span>合并报表</span></label>
            <label><input type="checkbox" name="financeNeeds" value="全球多账簿" /><span>多账簿</span></label>
            <label><input type="checkbox" name="financeNeeds" value="智能财资" /><span>智能财资</span></label>
          </fieldset>

          <label>
            <span>补充说明</span>
            <textarea name="message" rows={4} placeholder="例如：目前月底结账压力大，想评估采购到付款、预算控制、合并报表或多账簿场景" />
          </label>

          <label className="privacy-row">
            <input name="privacyConsent" type="checkbox" required />
            <span>我已阅读并同意 <a href="https://www.iboran.com/privacy" target="_blank" rel="noopener">隐私政策</a>，同意泊冉顾问围绕本次诊断需求联系我。<b>*</b></span>
          </label>

          <p className="form-hint" role="status" aria-live="polite">提交后由泊冉顾问联系，不做无效打扰。</p>
          <div className="form-actions">
            <button className="modal-submit" type="submit" data-track="submit_intelligent_finance_form">
              预约智能财务场景诊断
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h12.2l-5.1-5.1L14 5l8 8-8 8-1.9-1.9 5.1-5.1H5v-2Z" /></svg>
            </button>
            <a className="btn checklist" href="#diagnosis" data-scroll-target data-track="click_if_pilot_checklist" data-prefill-message="我想获取智能财务评估清单，并评估适合优先梳理的场景。">
              获取智能财务评估清单
            </a>
          </div>
        </form>
      </section>

      {/* Mobile CTA */}
      <nav className="mobile-cta" aria-label="移动端快捷操作">
        <a href="tel:400-9955-161" data-track="click_if_phone">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7A2 2 0 0 1 22 16.9Z" /></svg>
          电话
        </a>
        <a href="#diagnosis" data-scroll-target data-track="click_if_hero_primary_cta">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4V5Zm3 3v2h10V8H7Zm0 4v2h7v-2H7Zm0 4v1h4v-1H7Z" /></svg>
          诊断
        </a>
        <a href="#diagnosis" data-scroll-target data-track="click_if_pilot_checklist" data-prefill-message="我想获取智能财务评估清单，并评估适合优先梳理的场景。">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v10.2l3.4-3.4 1.8 1.8L12 16.8l-5.2-5.2 1.8-1.8 3.4 3.4V3h2Zm-7 14h14v4H5v-4Z" /></svg>
          清单
        </a>
      </nav>

      {/* Lead Modal (portal to body, global lead-modal.css) */}
      {modalOpen && typeof document !== 'undefined'
        ? (() => {
            const modal = (
              <div className="boran-lead-modal is-open">
                <div className="boran-lead-modal__backdrop" onClick={() => setModalOpen(false)} />
                <section className="boran-lead-modal__card" role="dialog" aria-modal="true" aria-labelledby="boran-lead-modal-title">
                  <div className="boran-lead-modal__head">
                    <div>
                      <h2 id="boran-lead-modal-title">{modalTitle}</h2>
                      <p>留下基本信息即可，泊冉顾问会结合企业现有系统、业务场景和建设方向与您沟通。</p>
                    </div>
                    <button className="boran-lead-modal__close" type="button" onClick={() => setModalOpen(false)} aria-label="关闭弹窗">
                      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" fill="none" /></svg>
                    </button>
                  </div>
                  <form className="boran-lead-modal__form" noValidate onSubmit={handleModalSubmit}>
                    <div className="boran-lead-modal__row">
                      <label>企业名称 <b>*</b><input name="company" type="text" autoComplete="organization" required /></label>
                      <label>联系人 <b>*</b><input name="contact" type="text" autoComplete="name" required /></label>
                    </div>
                    <label>手机 / 微信 <b>*</b><input name="phone_wechat" type="text" autoComplete="tel" required /></label>
                    <label>沟通需求<textarea name="remark" rows={3} placeholder="例如：当前系统、关注场景、计划推进方向。" defaultValue={modalPrefill} /></label>
                    <p className="boran-lead-modal__hint" role="status" aria-live="polite">{modalHint}</p>
                    <button className="boran-lead-modal__submit" type="submit" disabled={modalSubmitting}>提交需求</button>
                  </form>
                </section>
              </div>
            )
            return createPortal(modal, document.body)
          })()
        : null}
    </div>
  )
}
