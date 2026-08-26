'use client'

import React, { useState, useEffect, useRef } from 'react'
import './modern-service.css'
import { useAttribution } from '@/providers/Attribution'
import { faqItems, scenarios, proofCases, issueOptions } from './data'

const HERO_IMG = '/solution/industry/modern-service/modern-service-og.jpg'
const FORM_NAME = 'modern-service-diagnosis'
const DEFAULT_HINT = '提交后由泊冉顾问联系，不做无效打扰。'

/* ---------------- 工具函数 ---------------- */

function trackEvent(name: string, payload: Record<string, unknown> = {}) {
  if (!name) return
  const w = window as unknown as { dataLayer?: unknown[] }
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push({ event: name, ...payload })
  document.dispatchEvent(new CustomEvent('boran:track', { detail: { name, ...payload } }))
}

function scrollToAnchor(href: string) {
  if (!href.startsWith('#')) return
  const target = document.querySelector(href)
  if (!target) return
  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  // 高亮目标区块
  window.setTimeout(() => {
    target.classList.remove('target-highlight')
    window.requestAnimationFrame(() => target.classList.add('target-highlight'))
  }, 360)
}

/* ---------------- 主组件 ---------------- */

export const ModernServiceContent: React.FC = () => {
  const attribution = useAttribution()
  const [openFaqs, setOpenFaqs] = useState<Set<number>>(new Set())
  const [activeScenario, setActiveScenario] = useState<string | null>(null)
  const [openProofs, setOpenProofs] = useState<Set<string>>(new Set())
  const [hint, setHint] = useState<{ msg: string; type: '' | 'error' | 'success' }>({
    msg: DEFAULT_HINT,
    type: '',
  })
  const [invalidFields, setInvalidFields] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  /* 点击埋点（事件委托）+ 锚点滚动 + 表单预填 */
  useEffect(() => {
    const root = document.querySelector('.ms-scope')
    if (!root) return

    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement

      // data-track 上报
      const trackEl = target.closest<HTMLElement>('[data-track]')
      if (trackEl && trackEl.dataset.track !== 'form_submit') {
        const payload: Record<string, unknown> = {
          label: (trackEl.textContent || '').trim(),
          href: trackEl.getAttribute('href') || '',
        }
        if (trackEl.dataset.scenario) payload.scenario = trackEl.dataset.scenario
        if (trackEl.dataset.case) payload.case = trackEl.dataset.case
        if (trackEl.dataset.ctaMode) payload.cta_mode = trackEl.dataset.ctaMode
        trackEvent(trackEl.dataset.track, payload)
      }

      // 锚点滚动（data-scroll-target）
      const scrollEl = target.closest<HTMLElement>('[data-scroll-target]')
      if (scrollEl) {
        const href = scrollEl.getAttribute('href')
        if (href?.startsWith('#')) {
          e.preventDefault()
          scrollToAnchor(href)
        }
      }

      // 预填表单（data-prefill-issue）
      const prefillEl = target.closest<HTMLElement>('[data-prefill-issue]')
      if (prefillEl?.dataset.prefillIssue) {
        prefillIssue(prefillEl.dataset.prefillIssue)
      }
    }

    root.addEventListener('click', handleClick)
    return () => root.removeEventListener('click', handleClick)
  }, [])

  /* 滚动深度埋点 */
  useEffect(() => {
    let s50 = false
    let s90 = false
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const progress = scrollTop / maxScroll
      if (!s50 && progress >= 0.5) {
        s50 = true
        trackEvent('scroll_50')
      }
      if (!s90 && progress >= 0.9) {
        s90 = true
        trackEvent('scroll_90')
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* 表单预填：匹配关注问题复选框，否则写入备注 */
  const prefillIssue = (issueText: string) => {
    if (!formRef.current || !issueText) return
    const normalized = issueText.trim()
    const checkboxes = Array.from(
      formRef.current.querySelectorAll<HTMLInputElement>('input[name="issue"]')
    )
    const matched = checkboxes.find(
      (item) => normalized.includes(item.value) || item.value.includes(normalized)
    )
    if (matched) {
      matched.checked = true
      return
    }
    const remark = formRef.current.elements.namedItem('remark') as HTMLTextAreaElement | null
    if (remark && !remark.value.trim()) {
      remark.value = normalized
    }
  }

  /* 场景卡片点击高亮 */
  const handleScenarioClick = (name: string) => {
    setActiveScenario(activeScenario === name ? null : name)
  }

  /* 案例要点展开/收起 */
  const toggleProof = (id: string) => {
    setOpenProofs((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  /* FAQ 展开/收起 */
  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
    if (!openFaqs.has(index)) {
      trackEvent('faq_expand', { question: faqItems[index].q })
    }
  }

  /* 留资表单提交 → POST /api/leads */
  const handleLeadFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const name = (formData.get('name') || '').toString().trim()
    const phone = (formData.get('phone') || '').toString().trim()
    const company = (formData.get('company') || '').toString().trim()

    const invalid: string[] = []
    if (!name) invalid.push('name')
    if (!company) invalid.push('company')
    const digits = phone.replace(/[\s-]/g, '').replace(/^\+?86/, '')
    const validPhone = /^1[3-9]\d{9}$/.test(digits)
    if (!phone || !validPhone) invalid.push('phone')

    setInvalidFields(invalid)
    if (invalid.length) {
      setHint({ msg: '请先补充姓名、公司名称和有效手机号。', type: 'error' })
      return
    }

    const industry = (formData.get('industry') || '').toString().trim()
    const managementMethod = (formData.get('management_method') || '').toString().trim()
    const issues = Array.from(formData.getAll('issue')).map(String)
    const remark = (formData.get('remark') || '').toString().trim()

    const remarkParts: string[] = []
    if (industry) remarkParts.push(`所属行业: ${industry}`)
    if (remark) remarkParts.push(`备注: ${remark}`)

    setSubmitting(true)
    const data = {
      name,
      phone: digits,
      company,
      currentSystem: managementMethod || undefined,
      interest: issues.length ? issues : undefined,
      remark: remarkParts.join('\n') || undefined,
      source: '现代服务业项目核算方案',
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
        setHint({
          msg: '已收到诊断需求，泊冉顾问会结合项目类型、收入确认、工时与费用归集现状与您沟通。',
          type: 'success',
        })
        form.reset()
      } else if (res.status === 429) {
        setHint({ msg: '您刚刚提交过，请稍后再试。', type: 'error' })
      } else {
        setHint({ msg: '提交失败，请重试或直接拨打 400-9955-161', type: 'error' })
      }
    } catch (_err) {
      setHint({ msg: '网络错误，请稍后重试', type: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  const fieldInvalid = (name: string) => (invalidFields.includes(name) ? ' is-invalid' : '')

  return (
    <div className="ms-scope">
      {/* Hero */}
      <section className="hero" id="top">
        <div className="grid-bg" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="eyebrow"><span />Project-Based Service ERP Solution</div>
            <h1>现代服务业项目核算与经营分析一体化方案</h1>
            <p className="hero-lead">项目做完才知道赚不赚钱？让每一个项目从一开始就算得清</p>
            <p>
              泊冉帮助项目型服务企业打通商机、合同、项目、人员、工时、费用、采购外包、开票、回款与项目毛利分析，解决项目忙完才知道赚不赚钱的问题。
            </p>
            <p className="hero-desc">
              面向IT服务、咨询服务、工程服务、检测认证、广告传媒与专业服务机构，泊冉基于项目管理、财务、合同、费控与经营分析能力，帮助企业构建从项目立项到收入确认、从成本归集到毛利分析的业财一体化闭环。
            </p>
            <div className="value-tags" aria-label="核心价值标签">
              <span>商机到回款全流程贯通</span>
              <span>工时、费用、采购外包成本统一归集</span>
              <span>项目预算、进度、成本、毛利实时分析</span>
              <span>可扩展AI周报、风险预警与ChatBI项目问数</span>
            </div>
            <div className="hero-actions">
              <a className="btn primary" href="#diagnosis" data-scroll-target data-track="hero_cta_click" data-cta-mode="anchor">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4V5Zm3 3v2h10V8H7Zm0 4v2h7v-2H7Zm0 4v1h4v-1H7Z" /></svg>
                预约现代服务业项目核算诊断
              </a>
              <a
                className="btn secondary"
                href="#diagnosis"
                data-scroll-target
                data-track="secondary_cta_click"
                data-cta-mode="anchor"
                data-prefill-issue="获取项目型企业方案"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v10.2l3.4-3.4 1.8 1.8L12 16.8l-5.2-5.2 1.8-1.8 3.4 3.4V3h2Zm-7 14h14v4H5v-4Z" /></svg>
                获取项目型企业方案
              </a>
            </div>
            <div className="hero-quote">现代服务业的利润，不在报表里，而在每一个项目里。</div>
          </div>

          <aside className="hero-console" aria-label="现代服务业项目经营驾驶舱示意">
            <img
              className="hero-banner"
              src={HERO_IMG}
              alt="现代服务业项目核算与经营分析方案示意"
              width={1200}
              height={630}
              fetchPriority="high"
            />
            <div className="console-panel">
              <div className="panel-title">
                <span>Project Profit Command Center</span>
                <strong>过程预警中</strong>
              </div>
              <div className="project-flow" aria-label="商机到回款闭环">
                <span>商机</span><i /><span>合同</span><i /><span>项目</span><i /><span>工时费用</span><i /><span>开票回款</span><i /><span>毛利</span>
              </div>
              <div className="metric-grid">
                <div><small>项目预算消耗</small><b>72%</b><em>需复核外包成本</em></div>
                <div><small>回款计划</small><b>2笔</b><em>进入跟进窗口</em></div>
                <div><small>工时填报</small><b>86%</b><em>存在漏填提醒</em></div>
                <div><small>毛利偏差</small><b>-4.8%</b><em>建议项目经理确认</em></div>
              </div>
              <div className="alert-row warn"><span>费用</span><b>差旅与外包费用已归集到项目阶段</b><em>检查</em></div>
              <div className="alert-row ok"><span>收入</span><b>验收节点满足后生成收入确认待办</b><em>确认</em></div>
              <div className="alert-row danger"><span>毛利</span><b>预算消耗高于进度，建议发起项目复盘</b><em>预警</em></div>
            </div>
          </aside>
        </div>
      </section>

      {/* Answer */}
      <section className="section answer" id="answer">
        <div className="section-head compact">
          <span>项目经营看板</span>
          <h2>别等项目结束才算利润，让交付过程就能看清收入、成本和毛利</h2>
          <p>把项目立项、预算、工时、费用、采购外包、开票回款和收入确认串成一张经营视图，老板、财务和项目经理围绕同一个项目口径做决策。</p>
        </div>
        <div className="answer-summary" aria-label="项目经营核心收益">
          <article>
            <strong>少补账</strong>
            <span>工时、费用、外包成本随业务发生归到项目，月底少追单、少补录。</span>
          </article>
          <article>
            <strong>早预警</strong>
            <span>预算消耗、毛利偏差、回款延期提前暴露，项目还没结束就能处理。</span>
          </article>
          <article>
            <strong>好落地</strong>
            <span>先从一个典型项目或交付团队跑通，再逐步扩展到更多业务单元。</span>
          </article>
        </div>
        <div className="answer-grid">
          <article>
            <h3>销售赢单后，交付信息不断档</h3>
            <p>客户、合同、预算、交付范围和关键节点进入项目主数据，减少销售承诺和交付执行之间的信息偏差。</p>
          </article>
          <article>
            <h3>项目经理看得到投入和偏差</h3>
            <p>人员排期、工时填报、费用报销和外包采购沉淀到项目，进度之外还能看到成本消耗和毛利变化。</p>
          </article>
          <article>
            <h3>财务少做月底追数和调整</h3>
            <p>费用、采购、外包、开票、回款与收入确认围绕项目归集，减少月底靠Excel补口径、补成本。</p>
          </article>
          <article>
            <h3>老板能按项目、客户、团队看利润</h3>
            <p>项目利润排行、客户利润排行、团队交付效率和风险清单统一呈现，经营会议不再只讨论总账结果。</p>
          </article>
          <article>
            <h3>回款风险可以更早跟进</h3>
            <p>验收节点、开票计划、应收账款和回款记录联动，项目交付进度和现金流节奏放在一起管理。</p>
          </article>
          <article>
            <h3>后续可扩展AI周报和经营问数</h3>
            <p>在项目数据沉淀后，再让AI生成周报草稿、风险建议和经营问数结果，由授权人员确认后进入流程。</p>
          </article>
        </div>
      </section>

      {/* Pains */}
      <section className="section pains" id="pains">
        <div className="section-head compact">
          <span>项目型企业痛点</span>
          <h2>项目越做越多，利润却越来越难看清？</h2>
          <p>服务企业的利润不是月底凭证里突然出现的，它在销售承诺、合同条款、交付投入、工时填报、费用报销、采购外包和回款节奏里一点点发生。</p>
        </div>
        <div className="pain-layout">
          <article><strong>项目忙完才算账</strong><p>项目收入、人工、费用、外包成本分散在不同系统或Excel里。</p></article>
          <article><strong>工时填了但没进成本</strong><p>交付人员工时无法准确分摊到项目，项目真实人力成本失真。</p></article>
          <article><strong>费用报销难归集</strong><p>差旅、招待、采购、外包费用无法及时归集到项目。</p></article>
          <article><strong>合同、开票、回款断点多</strong><p>合同执行、验收、开票、回款与收入确认口径不一致。</p></article>
          <article><strong>项目经理看进度，财务看利润</strong><p>业务和财务各看各的，缺少统一项目经营视图。</p></article>
          <article><strong>周报靠人工汇总</strong><p>项目周报、风险预警、毛利分析依赖人工整理，滞后且不可持续。</p></article>
        </div>
        <div className="pain-conclusion">先把每个项目的收入、成本、费用、工时和回款放到同一张经营视图里，利润才有机会被提前看见。</div>
      </section>

      {/* Architecture */}
      <section className="section architecture" id="architecture">
        <div className="section-head">
          <span>方案能力架构</span>
          <h2>从业务输入到财务闭环，构建现代服务业项目经营中枢</h2>
          <p>基于统一数智化平台底座，把项目型服务企业的商机、合同、项目、成本、收入与经营分析串成一条可追踪的闭环。</p>
        </div>
        <div className="layer-stack" aria-label="现代服务业项目经营中枢五层架构">
          <article><b>01</b><h3>前端业务入口</h3><p>商机、客户、合同、项目立项、服务工单、会议纪要、企业微信/飞书/钉钉协同入口。</p></article>
          <article><b>02</b><h3>项目过程管理</h3><p>项目立项、项目预算、项目计划、项目任务拆解、人员排期、工时填报、项目验收、项目归档。</p></article>
          <article><b>03</b><h3>成本与收入核算</h3><p>费用归集、采购成本、外包成本、人力成本、合同收入、开票回款、收入确认。</p></article>
          <article><b>04</b><h3>数据分析与预警</h3><p>项目全景看板、项目预算执行分析、项目成本分析、项目毛利分析、回款分析、风险预警、ChatBI经营问数。</p></article>
          <article><b>05</b><h3>ERP业务闭环</h3><p>CRM、合同、项目管理、费控、采购、应收、应付、资金、总账、经营分析一体化。</p></article>
        </div>
      </section>

      {/* Scenarios */}
      <section className="section scenarios" id="scenarios">
        <div className="section-head compact">
          <span>明星业务场景</span>
          <h2>从商机到回款，把项目利润放进过程里管理</h2>
          <p>以下场景可按企业基础分阶段试点。先跑通一个项目类型，再复制到更多事业部、交付团队和服务业务线。</p>
        </div>
        <div className="scenario-grid">
          {scenarios.map((s) => (
            <article
              className={`scenario-card${activeScenario === s.name ? ' is-active' : ''}`}
              tabIndex={0}
              key={s.no}
              data-scenario={s.name}
              data-track="scenario_card_click"
              onClick={() => handleScenarioClick(s.name)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleScenarioClick(s.name)
                }
              }}
            >
              <small>{s.no}</small>
              <h3>{s.name}</h3>
              <dl>
                {s.fields.map((f) => (
                  <React.Fragment key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </React.Fragment>
                ))}
              </dl>
              <span>关键词：{s.keyword}</span>
            </article>
          ))}
        </div>
      </section>

      {/* Proof */}
      <section className="section proof" id="proof">
        <div className="section-head compact">
          <span>客户实践参考</span>
          <h2>相关服务型客户实践参考</h2>
        </div>
        <div className="proof-grid">
          {proofCases.map((c) => {
            const isOpen = openProofs.has(c.id)
            return (
              <article className={`proof-card${isOpen ? ' is-open' : ''}`} key={c.id}>
                <small>{c.tag}</small>
                <h3>{c.name}</h3>
                <p>{c.desc}</p>
                <div className="proof-metrics">
                  {c.metrics.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
                <button
                  className="proof-toggle"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={c.id}
                  data-track="customer_case_click"
                  data-case={c.caseName}
                  onClick={() => toggleProof(c.id)}
                >
                  <span>{isOpen ? '收起案例要点' : '查看案例要点'}</span>
                </button>
                <div className="proof-detail" id={c.id} hidden={!isOpen}>
                  {c.details.map((d) => (
                    <p key={d}>{d}</p>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* Roles */}
      <section className="section roles" id="roles">
        <div className="section-head compact">
          <span>按行业/角色展示</span>
          <h2>不同角色，都能看到同一个项目的真实经营结果</h2>
        </div>
        <div className="role-grid">
          <article>
            <h3>老板/总经理</h3>
            <p><strong>关注：</strong>哪些项目赚钱，哪些客户消耗资源，哪些团队交付效率高。</p>
            <p><strong>推荐看板：</strong>项目利润排行、客户利润排行、项目风险清单、回款预测。</p>
            <span>关键词：项目型企业经营分析</span>
          </article>
          <article>
            <h3>CFO/财务负责人</h3>
            <p><strong>关注：</strong>收入确认、成本归集、费用控制、项目毛利、现金流。</p>
            <p><strong>推荐方案：</strong>项目核算、应收应付、资金管理、收入确认、项目毛利分析。</p>
            <span>关键词：服务业业财一体化、项目财务管理系统</span>
          </article>
          <article>
            <h3>CIO/IT负责人</h3>
            <p><strong>关注：</strong>系统集成、数据口径、权限流程、移动协同。</p>
            <p><strong>推荐方案：</strong>统一平台、OpenAPI、低代码/零代码扩展、企业微信/飞书/钉钉入口。</p>
            <span>关键词：现代服务业ERP、项目型企业ERP</span>
          </article>
          <article>
            <h3>项目负责人/交付负责人</h3>
            <p><strong>关注：</strong>项目计划、人员排期、任务进度、成本偏差、交付物归档。</p>
            <p><strong>推荐方案：</strong>项目计划、任务拆解、工时管理、项目周报、项目风险预警。</p>
            <span>关键词：项目交付管理、项目任务管理、工时管理系统</span>
          </article>
        </div>
      </section>

      {/* AI */}
      <section className="section ai" id="ai">
        <div className="section-head compact">
          <span>AI数字员工可扩展场景</span>
          <h2>AI不是替代项目经理，而是帮团队少做重复统计</h2>
          <p>AI能力统一定位为生成草稿、建议、摘要和预警，由授权人员确认后进入流程，不自动完成高风险写回。</p>
        </div>
        <div className="ai-layout">
          <div className="ai-grid">
            <article><strong>客户邮件转服务工单</strong><span>AI读取客户邮件，生成服务工单草稿，由授权人员确认后进入流程。</span></article>
            <article><strong>会议纪要转项目任务</strong><span>AI根据会议纪要生成任务、负责人、截止日期建议，由项目负责人确认。</span></article>
            <article><strong>项目周报自动生成</strong><span>AI汇总进度、工时、费用、风险，生成项目周报草稿。</span></article>
            <article><strong>工时异常提醒</strong><span>识别未填、漏填、异常超时等情况，提醒员工或项目经理处理。</span></article>
            <article><strong>项目毛利预警</strong><span>当预算消耗、成本偏差、回款延迟影响毛利时，生成预警建议。</span></article>
            <article><strong>合同条款摘要</strong><span>AI提取合同中的交付范围、验收节点、付款条件与违约条款摘要。</span></article>
            <article><strong>ChatBI项目问数</strong><span>管理层可询问"本月哪些项目毛利低于目标""哪些项目回款延期"。</span></article>
          </div>
          <aside className="ai-boundary">
            <h3>AI边界说明</h3>
            <p>所有AI动作只生成草稿、建议或预警，不自动完成高风险写回，不自动确认收入，不自动审批付款，不自动变更财务口径。</p>
            <a className="btn secondary-dark" href="#diagnosis" data-scroll-target data-track="secondary_cta_click" data-prefill-issue="AI周报/项目风险预警">评估AI数字员工场景</a>
          </aside>
        </div>
      </section>

      {/* Governance */}
      <section className="section governance" id="governance">
        <div className="section-head compact">
          <span>治理边界/实施边界</span>
          <h2>先把可验证场景做扎实，再逐步扩展智能化能力</h2>
          <p>泊冉建议先建立清晰实施边界，把项目核算、费用归集、工时与毛利分析跑稳，再逐步连接更多系统和AI场景。</p>
        </div>
        <div className="governance-grid">
          <article><h3>可以先做</h3><p>项目立项、项目预算、任务拆解、工时填报、费用归集、项目毛利分析。</p></article>
          <article><h3>需要人工确认</h3><p>收入确认、开票申请、付款审批、项目验收、合同条款变更。</p></article>
          <article><h3>需要系统集成</h3><p>CRM、OA、企业微信、飞书、钉钉、第三方工单系统、电子发票、银行回单等。</p></article>
          <article><h3>可共创扩展</h3><p>AI周报、AI工单、AI合同摘要、ChatBI问数、项目风险预警模型。</p></article>
          <article className="wide"><h3>避免过度承诺</h3><p>不承诺全自动运行，不承诺由AI替代授权人员，不承诺固定降本比例，不承诺绕过实施即可上线。关键财务与审批动作应由授权人员确认。</p></article>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq" id="faq">
        <div className="section-head compact">
          <span>FAQ</span>
          <h2>项目型服务企业评估项目核算方案时，通常先问这些问题</h2>
        </div>
        <div className="faq-list">
          {faqItems.map((f, i) => {
            const isOpen = openFaqs.has(i)
            return (
              <article className={`faq-item${isOpen ? ' is-open' : ''}`} key={i}>
                <button type="button" aria-expanded={isOpen} onClick={() => toggleFaq(i)}>
                  <span>{f.q}</span><b />
                </button>
                {isOpen && <p>{f.a}</p>}
              </article>
            )
          })}
        </div>
      </section>

      {/* Diagnosis */}
      <section className="section diagnosis" id="diagnosis">
        <div className="diagnosis-copy">
          <span>Modern Service Diagnosis</span>
          <h2>做一次现代服务业项目核算诊断，看清每个项目真实利润</h2>
          <p>泊冉顾问将结合你的项目类型、收入确认方式、工时管理方式和费用归集现状，梳理一套可落地的项目核算与经营分析方案。</p>
          <div className="conversion-lines" aria-label="广告落地页转化话术">
            <p>项目多、费用乱、毛利看不清？先做一次项目核算诊断。</p>
            <p>从商机到回款，帮项目型服务企业打通项目经营闭环。</p>
            <p>别等项目结束才算利润，让项目过程就能看清收入、成本和毛利。</p>
          </div>
          <div className="diagnosis-checks">
            <div><strong>梳理项目类型</strong><span>明确IT服务、咨询、工程、检测、传媒等不同项目模型。</span></div>
            <div><strong>定位核算断点</strong><span>识别合同、工时、费用、外包、开票、回款和收入确认断点。</span></div>
            <div><strong>规划试点路径</strong><span>选一个事业部、项目类型或交付团队先跑通闭环。</span></div>
          </div>
          <div className="contact-actions">
            <a href="tel:400-9955-161" data-track="phone_click">电话咨询 400-9955-161</a>
            <a href="https://www.iboran.com/contact" data-track="chat_click">在线咨询</a>
          </div>
        </div>

        <form className="lead-form" noValidate data-form-name={FORM_NAME} onSubmit={handleLeadFormSubmit} ref={formRef}>
          <h3>预约现代服务业项目核算诊断</h3>
          <div className="field-grid">
            <label><span>姓名 <b>*</b></span><input name="name" type="text" autoComplete="name" required className={fieldInvalid('name')} /></label>
            <label><span>手机 <b>*</b></span><input name="phone" type="tel" autoComplete="tel" inputMode="tel" required className={fieldInvalid('phone')} /></label>
          </div>
          <div className="field-grid">
            <label><span>公司名称 <b>*</b></span><input name="company" type="text" autoComplete="organization" required className={fieldInvalid('company')} /></label>
            <label>
              <span>所属行业</span>
              <select name="industry" defaultValue="">
                <option value="">请选择</option>
                <option>IT服务</option>
                <option>咨询服务</option>
                <option>工程服务</option>
                <option>检测认证</option>
                <option>广告传媒</option>
                <option>专业服务机构</option>
                <option>其他现代服务业</option>
              </select>
            </label>
          </div>
          <label>
            <span>当前项目管理方式</span>
            <select name="management_method" defaultValue="">
              <option value="">请选择</option>
              <option>Excel</option>
              <option>OA</option>
              <option>ERP</option>
              <option>自研系统</option>
              <option>其他</option>
            </select>
          </label>
          <fieldset className="issue-field">
            <legend>关注问题</legend>
            {issueOptions.map((opt) => (
              <label key={opt}><input type="checkbox" name="issue" value={opt} /><span>{opt}</span></label>
            ))}
          </fieldset>
          <label>
            <span>备注</span>
            <textarea name="remark" rows={4} placeholder="例如：目前项目成本靠Excel月底汇总，想先试点工时、费用归集和项目毛利分析" />
          </label>
          <p className={`form-hint${hint.type ? ` is-${hint.type}` : ''}`} role="status" aria-live="polite">{hint.msg}</p>
          <button className="modal-submit" type="submit" data-track="form_submit" disabled={submitting}>
            预约现代服务业项目核算诊断
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h12.2l-5.1-5.1L14 5l8 8-8 8-1.9-1.9 5.1-5.1H5v-2Z" /></svg>
          </button>
        </form>
      </section>

      {/* Mobile CTA */}
      <nav className="mobile-cta" aria-label="移动端快捷操作">
        <a href="tel:400-9955-161" data-track="phone_click">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7A2 2 0 0 1 22 16.9Z" /></svg>
          电话
        </a>
        <a href="#diagnosis" data-scroll-target data-track="hero_cta_click">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4V5Zm3 3v2h10V8H7Zm0 4v2h7v-2H7Zm0 4v1h4v-1H7Z" /></svg>
          诊断
        </a>
        <a href="#diagnosis" data-scroll-target data-track="secondary_cta_click" data-prefill-issue="获取项目型企业方案">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v10.2l3.4-3.4 1.8 1.8L12 16.8l-5.2-5.2 1.8-1.8 3.4 3.4V3h2Zm-7 14h14v4H5v-4Z" /></svg>
          方案
        </a>
      </nav>
    </div>
  )
}
