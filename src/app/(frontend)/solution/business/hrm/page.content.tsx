'use client'

import React, { useState, useEffect, Fragment } from 'react'
import { createPortal } from 'react-dom'
import './hrm.css'
import './lead-modal.css'
import { useAttribution } from '@/providers/Attribution'
import { scenarios, roles, faqItems } from './data'

export const HrContent: React.FC = () => {
  const attribution = useAttribution()
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [activeRole, setActiveRole] = useState<string>('ceo')

  const [modalOpen, setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState('预约HR场景诊断')
  const [modalPrefill, setModalPrefill] = useState('')
  const [modalHint, setModalHint] = useState('提交后，泊冉顾问将结合企业员工规模、组织结构、现有系统和当前HR痛点进行初步评估。')
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
      setModalTitle(trigger.dataset.modalTitle || trigger.textContent?.trim() || '预约HR场景诊断')
      setModalPrefill(prefill)
      setModalHint('提交后，泊冉顾问将结合企业员工规模、组织结构、现有系统和当前HR痛点进行初步评估。')
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

    const focusScenarios = Array.from(formData.getAll('focusScenarios')).map(String)
    if (focusScenarios.length === 0) {
      alert('请选择当前最关注的HR场景')
      return
    }
    const multiScope = Array.from(formData.getAll('multiScope')).map(String)

    const remarkParts: string[] = []
    const message = (formData.get('message') || '').toString().trim()
    if (message) remarkParts.push(`补充说明: ${message}`)
    const industry = (formData.get('industry') || '').toString().trim()
    if (industry) remarkParts.push(`所属行业: ${industry}`)
    const employeeScale = (formData.get('employeeScale') || '').toString().trim()
    if (employeeScale) remarkParts.push(`员工规模: ${employeeScale}`)
    if (multiScope.length) remarkParts.push(`组织形态: ${multiScope.join('/')}`)
    const email = (formData.get('email') || '').toString().trim()
    if (email) remarkParts.push(`邮箱: ${email}`)

    const hasHrSystem = (formData.get('hasHrSystem') || '').toString().trim()
    const hasAttendanceOrCollab = (formData.get('hasAttendanceOrCollab') || '').toString().trim()
    const currentSystemParts = [hasHrSystem, hasAttendanceOrCollab].filter(Boolean)

    const data = {
      name: (formData.get('name') || '').toString().trim(),
      phone: (formData.get('phone') || '').toString().trim(),
      company: (formData.get('company') || '').toString().trim(),
      currentSystem: currentSystemParts.join('；') || undefined,
      interest: focusScenarios,
      remark: remarkParts.join('\n'),
      source: '成长型企业人力资源数智化管理方案',
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
      setModalHint('请填写企业名称和联系人。')
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
      source: '成长型企业人力资源数智化管理方案',
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

  const activeRoleData = roles.find((r) => r.id === activeRole)

  return (
    <div className="hr-scope">
      <section className="hero" id="top">
        <div className="grid-bg" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="eyebrow"><span></span>DIGITAL HR FOR GROWTH ENTERPRISES</div>
            <h1>成长型企业人力资源数智化管理方案</h1>
            <p className="hero-lead">从人人可用开始，让HR管理更轻、更快、更智能</p>
            <p className="hero-summary">
              员工自助办理，主管移动参与，HR智能减负，管理层实时看人效。帮助成长型企业从入转调离、考勤假勤、薪酬核对、绩效反馈等高频场景切入，逐步建立可流转、可追踪、可分析的人力管理闭环。
            </p>
            <div className="value-tags" aria-label="首屏价值标签">
              <span>成长型企业</span>
              <span>人人可用</span>
              <span>移动参与</span>
              <span>移动审批</span>
              <span>智能减负</span>
              <span>人效可视</span>
            </div>
            <div className="hero-actions">
              <a className="btn primary" href="#diagnosis" data-scroll-target data-track="hero_primary_cta_click" data-track-extra="consultation_click">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4V5Zm3 3v2h10V8H7Zm0 4v2h7v-2H7Zm0 4v1h4v-1H7Z" /></svg>
                预约HR场景诊断
              </a>
              <a
                className="btn secondary"
                href="#diagnosis"
                data-scroll-target
                data-track="hero_secondary_cta_click"
                data-prefill-message="我想获取人力数字化试点清单，并评估适合优先试点的HR场景。"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v10.2l3.4-3.4 1.8 1.8L12 16.8l-5.2-5.2 1.8-1.8 3.4 3.4V3h2Zm-7 14h14v4H5v-4Z" /></svg>
                获取人力数字化试点清单
              </a>
            </div>
            <p className="hero-context">
              很多成长型企业的人力管理，不是缺少复杂体系，而是日常事务太多、员工参与度低、主管不进流程、HR反复催办核对、管理层看不到实时数据。泊冉建议先从“人人可用”的HR场景开始，用移动化降低使用门槛，用智能化减轻管理压力，再逐步走向人效分析和组织效能提升。
            </p>
          </div>

          <aside className="hr-visual" aria-label="人力管理闭环示意">
            <div className="visual-toolbar">
              <span>HR Flow Console</span>
              <strong>授权确认后进入流程</strong>
            </div>
            <div className="flow-ring" aria-hidden="true">
              <div className="flow-node active">员工自助</div>
              <div className="flow-node">主管移动</div>
              <div className="flow-node">HR复核</div>
              <div className="flow-node">财务核对</div>
              <div className="flow-node">管理看板</div>
            </div>
            <div className="dashboard-grid">
              <article><small>待办审批</small><strong>移动处理</strong><em>超时提醒</em></article>
              <article><small>考勤异常</small><strong>日常发现</strong><em>主管确认</em></article>
              <article><small>薪酬核对</small><strong>过程可控</strong><em>财务复核</em></article>
              <article><small>人效指标</small><strong>实时看板</strong><em>趋势预警</em></article>
            </div>
            <div className="logic-strip">
              <span>易用是入口</span>
              <i></i>
              <span>智能化是减负</span>
              <i></i>
              <span>组织效能是结果</span>
            </div>
            <div className="warning-card">
              <span>边界</span>
              <p>AI生成建议、草稿、分析、摘要或预警，涉及关键人事动作时，由授权人员确认后进入流程。</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section pains" id="pains">
        <div className="section-head compact">
          <span>HR 日常痛点</span>
          <h2>成长型企业的HR难题，往往不是“体系太少”，而是“日常太重”</h2>
          <p>当企业快速扩张、人员增加、门店增多、部门变复杂后，HR每天面对的不只是员工档案，而是大量重复、分散、需要追踪的业务动作。</p>
        </div>
        <div className="pain-layout">
          <article tabIndex={0} data-track="pain_card_click" data-pain-name="员工什么都问HR"><strong>员工什么都问HR</strong><p>员工请假、补卡、查工资、查假期、开证明、问制度，都依赖HR人工回复，HR被重复事务占用。</p></article>
          <article tabIndex={0} data-track="pain_card_click" data-pain-name="主管不进流程"><strong>主管不进流程</strong><p>很多审批、绩效、排班、考勤确认依赖主管参与，但主管没有轻便入口，最终变成HR催办和代办。</p></article>
          <article tabIndex={0} data-track="pain_card_click" data-pain-name="考勤薪酬反复核对"><strong>考勤薪酬反复核对</strong><p>请假、加班、补卡、排班、薪资项目分散在表格和群消息中，月底集中核对，容易出错且耗时。</p></article>
          <article tabIndex={0} data-track="pain_card_click" data-pain-name="入转调离不成闭环"><strong>入转调离不成闭环</strong><p>入职资料、转岗审批、离职交接、权限变更、薪酬调整等动作分散处理，过程难追踪。</p></article>
          <article tabIndex={0} data-track="pain_card_click" data-pain-name="管理层看不到人效"><strong>管理层看不到人效</strong><p>老板和管理层想看人员成本、流失、编制、绩效、人均产出，但数据往往滞后、分散、不统一。</p></article>
          <article tabIndex={0} data-track="pain_card_click" data-pain-name="HR数字化难启动"><strong>HR数字化难启动</strong><p>企业担心系统复杂、员工不会用、主管不配合、上线周期长，所以更适合从高频、轻量、可验证的场景先试点。</p></article>
        </div>
        <p className="section-slogan">先让大家用起来，再让流程跑起来，最后让数据沉淀下来。</p>
      </section>

      <section className="section values" id="values">
        <div className="section-head compact">
          <span>核心价值</span>
          <h2>HR数字化不必一开始就复杂，先做到四件事</h2>
          <p>易用是入口，智能化是减负，组织效能是结果。先让员工、主管、HR、财务和管理层都进入同一套流程，再逐步沉淀数据和优化口径。</p>
        </div>
        <div className="value-grid">
          <article className="value-card" data-view-track="value_easy_use_view">
            <b>01</b>
            <h3>员工能自助，HR少重复</h3>
            <p>请假、加班、补卡、入职资料、员工证明、薪资查询、假期余额等事项，让员工通过自助入口提交和查询，减少HR重复答疑和手工处理。</p>
            <strong>让员工自己能办的事，不再都找HR。</strong>
          </article>
          <article className="value-card" data-view-track="value_mobile_view">
            <b>02</b>
            <h3>主管随手批，流程不堵点</h3>
            <p>主管可以在移动端处理审批、确认考勤、调整排班、反馈绩效、查看团队人员信息，让管理动作进入日常，而不是堆到月底集中处理。</p>
            <strong>让主管参与流程，而不是让HR替主管催流程。</strong>
          </article>
          <article className="value-card" data-view-track="value_intelligent_view">
            <b>03</b>
            <h3>异常早提醒，分析自动出草稿</h3>
            <p>通过智能提醒、异常预警、数据核验、摘要生成和报告草稿，帮助HR和管理者减少重复核对、重复催办和重复统计。</p>
            <strong>智能化不是替人拍板，而是帮人少做重复工作。</strong>
          </article>
          <article className="value-card" data-view-track="value_analytics_view">
            <b>04</b>
            <h3>老板看数据，管理有依据</h3>
            <p>将组织、人员、考勤、薪酬、绩效、流失等数据沉淀为看板和报表，让管理层更及时地了解人效、成本和组织状态。</p>
            <strong>从月底统计，走向日常可见。</strong>
          </article>
        </div>
      </section>

      <section className="section direct-answer" id="direct-answer">
        <div className="section-head compact">
          <span>AI 直接答案</span>
          <h2>关于成长型企业HR数字化，先看这几个答案</h2>
          <p>用于搜索、广告落地页和首次沟通的简明口径，帮助业务负责人快速判断是否适合从高频场景试点。</p>
        </div>
        <div className="qa-grid">
          <article><h3>Q：这个方案是什么？</h3><p>A：这是面向成长型企业的人力资源数智化管理方案，重点不是建设复杂体系，而是先把员工自助、移动审批、入转调离、考勤假勤、薪酬核对、绩效反馈和人效分析等高频HR场景在线化、标准化和可视化。</p></article>
          <article><h3>Q：适合哪些企业？</h3><p>A：适合正在快速扩张、员工数量增加、门店或部门变多、HR仍大量依赖表格和人工核对的成长型企业。尤其适合希望先从轻量场景试点，而不是一次性做大规模系统改造的企业。</p></article>
          <article><h3>Q：解决什么问题？</h3><p>A：主要解决员工反复找HR、主管不进流程、考勤薪酬反复核对、入转调离不闭环、绩效反馈不及时、人效数据看不清等问题。</p></article>
          <article><h3>Q：为什么要强调易用？</h3><p>A：成长型企业HR数字化能否成功，关键在于员工和主管是否愿意用。移动化、自助化和轻量化入口可以降低使用门槛，让员工、主管、HR、财务和管理层都能参与流程。</p></article>
          <article><h3>Q：智能化能带来什么价值？</h3><p>A：智能化可以帮助HR和管理者减少重复答疑、重复核对、重复统计和重复催办。例如生成岗位描述草稿、提醒考勤异常、辅助整理绩效反馈、生成分析摘要和风险预警。</p></article>
          <article><h3>Q：AI会直接做人事决策吗？</h3><p>A：不建议。AI可以生成建议、草稿、分析和预警，但涉及录用、淘汰、绩效等级、调薪、奖金、发薪、离职等关键动作，应由授权人员确认后进入流程。</p></article>
        </div>
      </section>

      <section className="section architecture" id="architecture">
        <div className="section-head">
          <span>能力架构</span>
          <h2>从移动入口到人效分析，形成成长型企业HR管理闭环</h2>
          <p>围绕“人人可用”的入口、高频流程、智能辅助、数据分析和业务闭环，逐步把人力事务变成可流转、可追踪、可分析的经营管理能力。</p>
        </div>
        <div className="architecture-map" aria-label="五层人力资源数智化能力架构">
          <article>
            <b>01</b>
            <h3>前端入口层：人人可用</h3>
            <ul>
              <li>员工自助入口</li>
              <li>主管移动审批</li>
              <li>HR业务工作台</li>
              <li>财务复核入口</li>
              <li>管理层看板</li>
              <li>移动端 / PC端 / 企业常用协同入口</li>
            </ul>
          </article>
          <article>
            <b>02</b>
            <h3>高频流程层：日常业务在线化</h3>
            <ul>
              <li>入职、转岗、调动、离职</li>
              <li>请假、加班、补卡、出差</li>
              <li>排班、调班、工时确认</li>
              <li>薪资核对、假期余额、员工证明</li>
              <li>绩效目标、绩效反馈、绩效确认</li>
            </ul>
          </article>
          <article>
            <b>03</b>
            <h3>智能辅助层：减轻管理压力</h3>
            <ul>
              <li>员工常见问题辅助解答</li>
              <li>考勤异常提醒</li>
              <li>薪酬核对提示</li>
              <li>绩效反馈建议</li>
              <li>招聘信息摘要</li>
              <li>人力分析报告草稿</li>
              <li>风险预警与待办提醒</li>
            </ul>
          </article>
          <article>
            <b>04</b>
            <h3>数据分析层：人效可视化</h3>
            <ul>
              <li>人员结构分析</li>
              <li>考勤异常分析</li>
              <li>加班与工时分析</li>
              <li>薪酬成本分析</li>
              <li>流失趋势分析</li>
              <li>绩效分布分析</li>
              <li>编制使用分析</li>
              <li>人效指标看板</li>
            </ul>
          </article>
          <article>
            <b>05</b>
            <h3>业务闭环层：从事务到经营</h3>
            <ul>
              <li>人员变动影响审批权限和成本归属</li>
              <li>考勤工时影响薪资核算和项目/门店成本</li>
              <li>绩效结果影响激励和人才发展</li>
              <li>人力数据支撑经营分析和组织优化</li>
            </ul>
          </article>
        </div>
        <div className="boundary-note">
          所有智能能力均定位为辅助、建议、草稿、提醒或预警。涉及录用、淘汰、绩效等级、调薪、奖金、发薪、离职等关键动作，由授权人员确认后进入流程。
        </div>
      </section>

      <section className="section scenarios" id="scenarios">
        <div className="section-head compact">
          <span>高频业务场景</span>
          <h2>建议从这些高频HR场景先试点</h2>
          <p>从员工最常用、主管最容易参与、HR最容易减负的场景开始，先验证入口、流程和数据口径，再逐步扩展到人效分析。</p>
        </div>
        <div className="scenario-grid">
          {scenarios.map((s) => (
            <article className="scenario-card" tabIndex={0} key={s.id}>
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

      <section className="section roles" id="roles">
        <div className="section-head compact">
          <span>按角色看价值</span>
          <h2>不同角色，都能从HR数字化中获得价值</h2>
          <p>同一组高频HR流程，对老板、HR负责人、财务负责人、一线主管和信息化负责人意味着不同的管理入口和指标口径。</p>
        </div>
        <div className="role-tabs" role="tablist" aria-label="角色价值">
          {roles.map((r) => (
            <button
              type="button"
              className={activeRole === r.id ? 'is-active' : ''}
              role="tab"
              aria-selected={activeRole === r.id}
              aria-controls="role-panel"
              data-role-tab={r.id}
              data-track={`role_${r.id}_click`}
              key={r.id}
              onClick={() => setActiveRole(r.id)}
            >
              {r.title}
            </button>
          ))}
        </div>
        {activeRoleData && (
          <article className="role-panel" id="role-panel" role="tabpanel" aria-live="polite">
            <div className="role-panel-head">
              <span>{activeRoleData.kicker}</span>
              <h3>{activeRoleData.title}</h3>
              <p>{activeRoleData.concern}</p>
            </div>
            <div className="role-panel-grid">
              <section>
                <h4>推荐场景</h4>
                <p>{activeRoleData.scenes}</p>
              </section>
              <section>
                <h4>价值表达</h4>
                <p>{activeRoleData.value}</p>
              </section>
              <section>
                <h4>关注指标</h4>
                <p>{activeRoleData.metrics}</p>
              </section>
            </div>
          </article>
        )}
      </section>

      <section className="section intelligent" id="intelligent">
        <div className="section-head compact">
          <span>智能化减负</span>
          <h2>智能化不是替代HR，而是让HR和管理者少做重复工作</h2>
          <p>成长型企业更需要的是“能减轻日常管理压力”的智能化，而不是复杂概念。建议从提醒、核对、摘要、问答、报告草稿等低风险场景先落地。</p>
        </div>
        <div className="assist-grid">
          <article><h3>智能问答</h3><p>用于员工制度、流程、假期、证明、申请入口等常见问题解答。</p><strong>边界：涉及个人薪酬、合同、绩效等敏感信息时，必须按权限展示。</strong></article>
          <article><h3>智能提醒</h3><p>用于缺卡、迟到、加班超时、审批超时、资料缺失、流程卡点提醒。</p><strong>边界：提醒不等于处罚，最终处理由授权人员确认。</strong></article>
          <article><h3>智能核对</h3><p>用于考勤数据、薪酬项目、假期余额、绩效流程完成情况等核验。</p><strong>边界：核对结果作为复核依据，不直接替代财务或HR确认。</strong></article>
          <article><h3>智能生成</h3><p>用于岗位描述、面试纪要、绩效反馈、分析报告、人效摘要等草稿生成。</p><strong>边界：草稿需人工审核，不直接作为正式结论。</strong></article>
          <article><h3>智能预警</h3><p>用于流失风险、薪酬异常、加班异常、编制异常、绩效异常等趋势提醒。</p><strong>边界：预警是辅助判断，不直接触发高风险人事动作。</strong></article>
        </div>
      </section>

      <section className="section governance" id="governance">
        <div className="section-head compact">
          <span>实施边界</span>
          <h2>先试点，再扩展；先减负，再升级</h2>
          <p>人力数字化要尊重企业规则、授权边界和现有系统环境。建议先选择高频、轻量、可验证的场景，跑通后再扩展到更复杂的人效指标和管理模型。</p>
        </div>
        <div className="governance-grid">
          <article><h3>哪些可以先做</h3><ul><li>员工自助服务</li><li>移动审批</li><li>入转调离流程</li><li>考勤假勤</li><li>薪酬核对</li><li>基础绩效流程</li><li>人效基础看板</li></ul></article>
          <article><h3>哪些需要人工确认</h3><ul><li>招聘录用</li><li>员工淘汰</li><li>绩效最终评分</li><li>调薪</li><li>奖金</li><li>发薪</li><li>离职审批</li><li>违纪处理</li><li>关键岗位任用</li><li>敏感个人信息变更</li></ul></article>
          <article><h3>哪些需要系统集成</h3><ul><li>考勤设备或打卡工具</li><li>协同办公系统</li><li>财务系统</li><li>费用报销系统</li><li>门店系统</li><li>项目管理系统</li><li>招聘渠道</li><li>银行、社保、税务相关接口</li></ul></article>
          <article><h3>哪些属于共创能力</h3><ul><li>企业专属人效指标</li><li>薪酬成本分析口径</li><li>绩效评价模型</li><li>人才画像模型</li><li>流失风险模型</li><li>组织诊断模型</li><li>员工服务知识库</li><li>管理驾驶舱指标体系</li></ul></article>
        </div>
        <div className="promise-grid">
          <article>
            <h3>避免过度承诺</h3>
            <p>不使用绝对化承诺，不把智能化表述为无需人工确认的人事决策，不承诺固定比例的成本变化。</p>
          </article>
          <article>
            <h3>建议表达方式</h3>
            <p>可先试点、可逐步扩展、可结合企业规则配置、可辅助生成、可形成提醒或预警，由授权人员确认后进入流程，以企业实际业务口径为准。</p>
          </article>
        </div>
      </section>

      <section className="section faq" id="faq">
        <div className="section-head compact">
          <span>FAQ</span>
          <h2>常见问题</h2>
        </div>
        <div className="faq-list">
          {faqItems.map((f, i) => (
            <article className={`faq-item${activeFaq === i ? ' is-open' : ''}`} key={i}>
              <button type="button" aria-expanded={activeFaq === i} onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                <span>{f.q}</span>
                <b></b>
              </button>
              <p>{f.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section diagnosis" id="diagnosis">
        <div className="diagnosis-copy">
          <span>HR Scenario Diagnosis</span>
          <h2>先从一个高频HR场景开始，让人力管理真正用起来</h2>
          <p>不必一开始就做复杂体系。泊冉建议先从员工自助、移动审批、考勤假勤、入转调离或薪酬核对等高频场景切入，帮助企业降低使用门槛，减少HR重复事务，让主管和员工都参与到流程中。</p>
          <div className="diagnosis-checks">
            <div><strong>先看高频断点</strong><span>判断员工、主管、HR、财务和管理层在哪些环节最费时。</span></div>
            <div><strong>再定试点场景</strong><span>选择1-2个高频、轻量、可验证的流程先跑通。</span></div>
            <div><strong>最后沉淀指标</strong><span>把流程数据变成人效看板和持续优化依据。</span></div>
          </div>
          <div className="contact-actions">
            <a href="tel:400-9955-161" data-track="phone_click">电话咨询 400-9955-161</a>
            <a href="#diagnosis" data-scroll-target data-track="consultation_click">预约顾问沟通</a>
          </div>
          <p className="assist-note">提交后，顾问将结合企业员工规模、组织结构、现有系统和当前HR痛点，协助判断适合先试点的场景。</p>
        </div>

        <form className="lead-form" data-form-name="hr-digital-management-diagnosis" noValidate onSubmit={handleLeadFormSubmit}>
          <h3>预约HR场景诊断</h3>
          <input type="hidden" name="source_page" value="成长型企业人力资源数智化管理方案" />
          <input type="hidden" name="source_path" value="/solution/business/hrm" />
          <input type="hidden" name="source_url" />
          <input type="hidden" name="referrer" />
          <input type="hidden" name="utm_source" />
          <input type="hidden" name="utm_medium" />
          <input type="hidden" name="utm_campaign" />
          <input type="hidden" name="utm_term" />
          <input type="hidden" name="utm_content" />
          <div className="field-grid">
            <label><span>姓名 <b>*</b></span><input name="name" type="text" autoComplete="name" required /></label>
            <label><span>手机号 <b>*</b></span><input name="phone" type="tel" autoComplete="tel" inputMode="tel" required /></label>
          </div>
          <div className="field-grid">
            <label><span>公司名称 <b>*</b></span><input name="company" type="text" autoComplete="organization" required /></label>
            <label><span>邮箱</span><input name="email" type="email" autoComplete="email" /></label>
          </div>
          <div className="field-grid">
            <label><span>所属行业</span><input name="industry" type="text" placeholder="例如：制造、零售、服务、医药、互联网" /></label>
            <label>
              <span>员工规模 <b>*</b></span>
              <select name="employeeScale" required>
                <option value="">请选择</option>
                <option>50人以下</option>
                <option>50-100人</option>
                <option>100-300人</option>
                <option>300-1000人</option>
                <option>1000人以上</option>
              </select>
            </label>
          </div>

          <fieldset className="choice-field compact-choice">
            <legend>是否多组织/多门店/多工厂/多项目</legend>
            <label><input type="checkbox" name="multiScope" value="多组织" /><span>多组织</span></label>
            <label><input type="checkbox" name="multiScope" value="多门店" /><span>多门店</span></label>
            <label><input type="checkbox" name="multiScope" value="多工厂" /><span>多工厂</span></label>
            <label><input type="checkbox" name="multiScope" value="多项目" /><span>多项目</span></label>
          </fieldset>

          <fieldset className="choice-field focus-choice" data-required-group="focusScenarios">
            <legend>当前最关注的HR场景 <b>*</b></legend>
            <label><input type="checkbox" name="focusScenarios" value="员工自助" /><span>员工自助</span></label>
            <label><input type="checkbox" name="focusScenarios" value="移动审批" /><span>移动审批</span></label>
            <label><input type="checkbox" name="focusScenarios" value="入转调离" /><span>入转调离</span></label>
            <label><input type="checkbox" name="focusScenarios" value="考勤假勤" /><span>考勤假勤</span></label>
            <label><input type="checkbox" name="focusScenarios" value="排班调班" /><span>排班调班</span></label>
            <label><input type="checkbox" name="focusScenarios" value="薪酬核对" /><span>薪酬核对</span></label>
            <label><input type="checkbox" name="focusScenarios" value="绩效反馈" /><span>绩效反馈</span></label>
            <label><input type="checkbox" name="focusScenarios" value="招聘协同" /><span>招聘协同</span></label>
            <label><input type="checkbox" name="focusScenarios" value="人效分析" /><span>人效分析</span></label>
            <label><input type="checkbox" name="focusScenarios" value="系统集成" /><span>系统集成</span></label>
          </fieldset>

          <div className="field-grid">
            <label>
              <span>当前是否已有HR系统</span>
              <select name="hasHrSystem">
                <option value="">请选择</option>
                <option>已有，使用较稳定</option>
                <option>已有，但大量依赖表格补充</option>
                <option>暂未建设，主要依赖表格和线下流程</option>
                <option>不确定，需要梳理</option>
              </select>
            </label>
            <label>
              <span>当前是否已有考勤或协同系统</span>
              <select name="hasAttendanceOrCollab">
                <option value="">请选择</option>
                <option>已有考勤和协同入口</option>
                <option>已有考勤，协同入口不统一</option>
                <option>已有协同入口，考勤仍需整合</option>
                <option>暂未建设或不确定</option>
              </select>
            </label>
          </div>

          <label>
            <span>希望沟通的问题</span>
            <textarea name="message" rows={4} placeholder="例如：目前考勤薪酬核对耗时，想先评估员工自助、移动审批或入转调离试点"></textarea>
          </label>

          <label className="privacy-row">
            <input name="privacyConsent" type="checkbox" required />
            <span>我已阅读并同意 <a href="https://www.iboran.com/privacy" target="_blank" rel="noopener">隐私政策</a>，同意泊冉顾问围绕本次诊断需求联系我。<b>*</b></span>
          </label>

          <p className="form-hint" role="status" aria-live="polite">提交后由泊冉顾问联系，不做无效打扰。</p>
          <div className="form-actions">
            <button className="modal-submit" type="submit" data-track="form_submit">
              预约HR场景诊断
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h12.2l-5.1-5.1L14 5l8 8-8 8-1.9-1.9 5.1-5.1H5v-2Z" /></svg>
            </button>
            <a
              className="btn checklist"
              href="#diagnosis"
              data-scroll-target
              data-track="hero_secondary_cta_click"
              data-prefill-message="我想获取人力数字化试点清单，并评估适合优先试点的HR场景。"
            >
              获取试点清单
            </a>
          </div>
        </form>
      </section>

      {/* Mobile CTA */}
      <nav className="mobile-cta" aria-label="移动端快捷操作">
        <a href="tel:400-9955-161" data-track="phone_click">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7A2 2 0 0 1 22 16.9Z" /></svg>
          电话
        </a>
        <a href="#diagnosis" data-scroll-target data-track="hero_primary_cta_click" data-track-extra="consultation_click">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4V5Zm3 3v2h10V8H7Zm0 4v2h7v-2H7Zm0 4v1h4v-1H7Z" /></svg>
          诊断
        </a>
        <a href="#diagnosis" data-scroll-target data-track="hero_secondary_cta_click" data-prefill-message="我想获取人力数字化试点清单，并评估适合优先试点的HR场景。">
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
