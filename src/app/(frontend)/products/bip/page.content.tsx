'use client'

import React, { useState, useEffect, Fragment } from 'react'
import { createPortal } from 'react-dom'
import './bip.css'
import './lead-modal.css'
import { useAttribution } from '@/providers/Attribution'
import { scenarios, roles, industries, faqItems } from './data'

export const BipContent: React.FC = () => {
  const attribution = useAttribution()
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const [modalOpen, setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState('预约BIP方案沟通')
  const [modalPrefill, setModalPrefill] = useState('')
  const [modalHint, setModalHint] = useState('提交后，泊冉顾问将结合企业现有系统、业务场景和建设方向与您沟通。')
  const [modalSubmitting, setModalSubmitting] = useState(false)

  // 触发弹窗：拦截 #consultation / #diagnosis / #appointment / data-lead-modal / data-modal-open
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
      setModalTitle(trigger.dataset.modalTitle || trigger.textContent?.trim() || '预约BIP方案沟通')
      setModalPrefill(prefill)
      setModalHint('提交后，泊冉顾问将结合企业现有系统、业务场景和建设方向与您沟通。')
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

    const contact = (formData.get('contact') || '').toString().trim()
    const rawPhone = (formData.get('phone_wechat') || '').toString().trim()
    const company = (formData.get('company') || '').toString().trim()

    if (!company || !contact) {
      alert('请填写企业名称和联系人。')
      return
    }

    const digits = rawPhone.replace(/[\s-]/g, '').replace(/^\+?86/, '')
    const phone = digits.match(/^1[3-9]\d{9}$/)?.[0] || ''

    if (!phone) {
      alert('请填写 11 位手机号，便于泊冉顾问与您联系。')
      return
    }

    const currentSystemParts = [
      (formData.get('current_system') || '').toString().trim(),
      (formData.get('upgrade_direction') || '').toString().trim(),
    ].filter(Boolean)

    const focusScene = (formData.get('focus_scene') || '').toString().trim()

    const remarkParts: string[] = []
    const companySize = (formData.get('company_size') || '').toString().trim()
    if (companySize) remarkParts.push(`企业规模: ${companySize}`)
    const industry = (formData.get('industry') || '').toString().trim()
    if (industry) remarkParts.push(`所属行业: ${industry}`)
    const localization = (formData.get('localization') || '').toString().trim()
    if (localization) remarkParts.push(`是否涉及信创国产替代: ${localization}`)
    const aiInterest = (formData.get('ai_interest') || '').toString().trim()
    if (aiInterest) remarkParts.push(`是否关注YonGPT/智友/DataAgent/智能体: ${aiInterest}`)
    const contactTime = (formData.get('contact_time') || '').toString().trim()
    if (contactTime) remarkParts.push(`期望沟通时间: ${contactTime}`)
    const remark = (formData.get('remark') || '').toString().trim()
    if (remark) remarkParts.push(`补充说明: ${remark}`)

    const data = {
      name: contact,
      phone,
      company,
      currentSystem: currentSystemParts.join('；') || undefined,
      interest: focusScene ? [focusScene] : undefined,
      remark: remarkParts.join('\n') || undefined,
      source: '用友BIP商业创新平台',
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
        alert('已收到需求，我们的顾问将尽快与您联系。')
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
      source: '用友BIP商业创新平台',
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
    <div className="bip-scope">
      <section className="hero" id="top">
        <div className="grid-bg" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="eyebrow"><span></span>YONYOU BIP BUSINESS INNOVATION PLATFORM</div>
            <h1>用友BIP商业创新平台</h1>
            <p className="hero-lead">以数智商业应用级基础设施，支撑集团业务创新与产业协同</p>
            <p className="hero-desc">
              泊冉软件面向大中型企业、集团型企业和多组织经营企业，围绕用友BIP建设统一的应用服务、数据服务、业务服务和智能化能力，帮助企业打通财务、供应链、采购、制造、人力、资产、项目、协同和经营分析闭环。
            </p>
            <p className="hero-note">
              无论企业是准备新建用友BIP，还是当前使用NC、NCC、U8、U9、金蝶、SAP、Oracle，或多套自研和行业系统并存，泊冉都可以从建设目标澄清、系统现状梳理、业务蓝图设计、数据迁移、接口集成、分阶段上线和持续运营优化入手，帮助企业稳步完成用友BIP建设与升级。
            </p>
            <div className="value-tags" aria-label="用友BIP核心价值标签">
              <span>用友BIP商业创新平台</span>
              <span>旧系统平滑升级与异构协同</span>
              <span>集团财务与供应链闭环</span>
              <span>信创国产替代规划</span>
              <span>YonGPT / 智友 / DataAgent落地</span>
              <span>企业智能体共创</span>
            </div>
            <div className="hero-actions">
              <a className="btn primary" href="#consultation" data-modal-open="lead-modal" data-track="cta_click_bip_diagnosis_hero">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4V5Zm3 3v2h10V8H7Zm0 4v2h7v-2H7Zm0 4v1h4v-1H7Z" /></svg>
                预约BIP方案沟通
              </a>
              <a className="btn secondary" href="#scenarios" data-scroll-target data-track="cta_click_bip_solution_hero">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" /></svg>
                获取用友BIP场景方案
              </a>
            </div>
            <p className="core-line">泊冉不只是帮助企业上线用友BIP，而是帮助企业把旧系统、老流程、分散数据和复杂组织，升级为可管控、可协同、可分析、可智能运营的数智化底座。</p>
          </div>

          <aside className="hero-console bip-platform-map" aria-label="用友BIP平台能力架构示意">
            <div className="console-top">
              <div>
                <span>YonBIP Platform Architecture</span>
                <h2>平台服务 · 应用服务 · 业务服务 · 数据服务</h2>
              </div>
              <b>BIP架构</b>
            </div>
            <div className="system-layer platform-base">
              <strong>数智商业基础设施</strong>
              <div>
                <span>云原生</span><span>元数据驱动</span><span>低代码</span><span>中台化</span><span>数用分离</span><span>信创适配</span>
              </div>
            </div>
            <div className="system-layer platform-engine">
              <strong>数据与智能服务</strong>
              <div>
                <span>数据治理</span><span>流程引擎</span><span>权限体系</span><span>指标模型</span><span>YonGPT</span><span>DataAgent</span><span>企业智能体</span>
              </div>
            </div>
            <div className="system-layer platform-apps">
              <strong>企业级应用服务</strong>
              <div>
                <span>财务云</span><span>人力云</span><span>供应链云</span><span>采购云</span><span>制造云</span><span>营销云</span><span>项目云</span><span>资产云</span><span>协同云</span>
              </div>
            </div>
            <div className="system-layer platform-ecosystem">
              <strong>产业与生态协同</strong>
              <div>
                <span>行业方案</span><span>产业链协同</span><span>伙伴生态</span><span>API集成</span><span>全球化运营</span>
              </div>
            </div>
            <div className="console-alert">建设判断：先明确业务创新目标、应用边界、数据口径和协同范围，再规划新建、升级、集成或分阶段替换路径。</div>
          </aside>
        </div>
      </section>

      <section className="section architecture" id="architecture">
        <div className="section-head architecture-head">
          <span>用友BIP集团能力架构</span>
          <h2>集团业务运营、数据治理与智能决策一体化</h2>
          <p>围绕统一入口、业务场景、AI / 数据 / 流程引擎、系统协同与业务闭环，承载多组织、多法人、多业态的集团化运营。</p>
        </div>
        <div className="architecture-blueprint" aria-label="用友BIP集团五层能力蓝图">
          <div className="blueprint-row entry">
            <div className="blueprint-label"><b>01</b><span>统一业务入口</span></div>
            <div className="arch-chip-row">
              <span>智友</span><span>移动端</span><span>PC工作台</span><span>友空间</span><span>业务门户</span><span>第三方入口</span><span>企业微信</span><span>飞书</span><span>钉钉</span>
            </div>
          </div>
          <div className="blueprint-core">
            <article className="blueprint-card">
              <div className="blueprint-label"><b>02</b><span>业务场景层</span></div>
              <p>财务共享、全面预算、全球司库、供应链计划、采购寻源、供应商协同、制造执行、项目管理、人力服务、资产管理、协同办公。</p>
            </article>
            <article className="blueprint-engine">
              <div className="blueprint-label invert"><b>03</b><span>AI / 数据 / 流程能力层</span></div>
              <div className="engine-kicker">AI · Data · Workflow</div>
              <h3>智能运营与治理引擎</h3>
              <div className="engine-grid">
                <span>YonGPT</span><span>智友</span><span>DataAgent</span><span>智能体构建</span><span>智能问数</span><span>经营分析</span><span>风险预警</span><span>流程编排</span><span>权限控制</span><span>数据治理</span>
              </div>
            </article>
            <article className="blueprint-card">
              <div className="blueprint-label"><b>04</b><span>系统协同层</span></div>
              <p>NC、NCC、U8、U9、金蝶、SAP、Oracle、MES、WMS、TMS、CRM、OA、电商、银企直联、税务、条码、设备与自研系统。</p>
            </article>
          </div>
          <div className="blueprint-row loop">
            <div className="blueprint-label"><b>05</b><span>BIP业务闭环</span></div>
            <div className="arch-chip-row">
              <span>财务</span><span>供应链</span><span>采购</span><span>制造</span><span>营销</span><span>人力</span><span>资产</span><span>项目</span><span>协同</span><span>数据服务</span><span>管理决策</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section scenarios" id="scenarios">
        <div className="section-head compact">
          <span>核心业务场景</span>
          <h2>以集团经营场景牵引BIP业务闭环与智能运营升级</h2>
          <p>围绕财务、资金、供应链、制造、项目、资产和企业AI等高价值场景，形成可扩展的集团级运营能力地图。</p>
        </div>
        <div className="scenario-grid">
          {scenarios.map((s) => (
            <article tabIndex={0} data-track="scenario_card_click" data-scenario-name={s.name} key={s.id}>
              <h3>{s.name}</h3>
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

      <section className="section direct-answer" id="direct-answer">
        <div className="section-head compact">
          <span>BIP立项决策框架</span>
          <h2>以集团治理目标定义BIP建设路径</h2>
          <p>从组织边界、数据口径、系统协同、权限体系和试点优先级出发，形成可评估、可验证、可分阶段推进的建设判断。</p>
        </div>
        <div className="answer-list">
          <article><h3>先定建设范围</h3><p>先明确集团、区域、法人、业务单元和模块范围，再确定财务、供应链、采购、制造、人力、资产、项目、协同和数据分析的上线批次。</p></article>
          <article><h3>新建、迁移还是集成</h3><p>如果没有统一ERP底座，可以新建BIP；如果已有NC、NCC、U8、U9、金蝶、SAP、Oracle或自研系统，应先评估迁移、并行、接口集成或分阶段替换路径。</p></article>
          <article><h3>集团管控先看口径</h3><p>重点看组织、法人、账套、预算、资金、采购、成本、库存、项目和风险口径是否统一，能否支持总部穿透分析和分级授权。</p></article>
          <article><h3>迁移风险先前置</h3><p>主数据、历史数据、权限规则、自定义报表、接口链路和上线窗口，要在蓝图阶段前置盘点，避免切换阶段集中暴露。</p></article>
          <article><h3>AI先做辅助闭环</h3><p>企业AI更适合先生成草稿、建议、预警、分析和报告；涉及审批、生效、付款、核算、合同、主数据变更等动作，由授权人员确认后进入流程。</p></article>
          <article><h3>试点要可验证</h3><p>优先选择财务月结、采购寻源、库存预警、项目成本、经营问数等边界清晰场景，用数据口径、流程效率和管理响应验证价值。</p></article>
        </div>
      </section>

      <section className="section migration" id="migration">
        <div className="section-head compact">
          <span>旧系统迁移与集成专项</span>
          <h2>不只是上新系统，更要安全迁移旧系统、打通老数据、稳住业务连续性</h2>
          <p>泊冉面向已有ERP、财务、供应链、制造、CRM、OA、WMS、MES等系统的企业，提供用友BIP迁移、升级、集成和并行切换方案，帮助企业在不打断核心业务的前提下，逐步完成数智化升级。</p>
        </div>
        <div className="migration-grid">
          <article tabIndex={0} data-track="migration_card_click" data-system-type="yonyou_old">
            <span>NC · NCC · U8 · U9</span>
            <h3>用友旧系统升级</h3>
            <p><strong>适用系统：</strong>NC、NCC、U8、U9、老版本用友系统、多套用友系统并存。</p>
            <p>从用友旧系统到用友BIP，泊冉帮助企业重新梳理流程、数据、权限、组织与接口，让升级不只是版本变化，而是管理能力升级。</p>
          </article>
          <article tabIndex={0} data-track="migration_card_click" data-system-type="kingdee">
            <span>K/3 · EAS · 金蝶云星空</span>
            <h3>金蝶迁移、替换与集成</h3>
            <p><strong>适用系统：</strong>金蝶K/3、金蝶EAS、金蝶云星空、金蝶财务、供应链、制造、人力等系统。</p>
            <p>针对金蝶系统存量客户，泊冉可结合企业业务连续性要求，设计迁移、替换、集成或双系统并行方案，逐步打通业务数据和管理流程。</p>
          </article>
          <article tabIndex={0} data-track="migration_card_click" data-system-type="sap_oracle">
            <span>SAP · Oracle · 外资ERP</span>
            <h3>SAP / Oracle迁移与国产替代</h3>
            <p><strong>适用系统：</strong>SAP、Oracle及其他外资ERP。</p>
            <p>面向SAP、Oracle等系统存量客户，泊冉可围绕国产化替代、集团管控、财务共享、供应链协同和数据治理，设计分阶段迁移路径。</p>
          </article>
          <article tabIndex={0} data-track="migration_card_click" data-system-type="heterogeneous">
            <span>MES · WMS · TMS · CRM · OA</span>
            <h3>异构系统集成</h3>
            <p><strong>适用系统：</strong>MES、WMS、TMS、CRM、OA、PLM、电商平台、银企直联、税务系统、自研系统。</p>
            <p>对于暂不适合一次性替换的系统，泊冉可通过接口、数据治理和流程集成，将用友BIP建设为企业统一的业务与数据协同平台。</p>
          </article>
        </div>
      </section>

      <section className="section roles" id="roles">
        <div className="section-head compact">
          <span>角色视角</span>
          <h2>不同角色，看不同的BIP结果</h2>
        </div>
        <div className="role-grid">
          {roles.map((r) => (
            <article tabIndex={0} data-track="role_card_click" data-role-name={r.title} key={r.id}>
              <h3>{r.title}</h3>
              <p><strong>关注：</strong>{r.concern}</p>
              <p><strong>风险：</strong>{r.risk}</p>
              <span>指标：{r.metrics}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section industries" id="industries">
        <div className="section-head compact">
          <span>内置行业方案</span>
          <h2>把行业解决方案嵌入BIP建设路径</h2>
          <p>用友BIP可结合系统内置行业方案、流程模板、主数据口径和指标体系落地；泊冉会根据企业实际业务选择启用、扩展或集成，而不是从空白系统重新搭建。</p>
        </div>
        <div className="industry-grid">
          {industries.map((ind) => (
            <article tabIndex={0} data-track="industry_card_click" data-industry-name={ind.name} key={ind.id}>
              <h3>{ind.name}</h3>
              <p>{ind.desc}</p>
              <span>{ind.seo}</span>
              <a className="inline-link" href={ind.href}>{ind.linkText}</a>
            </article>
          ))}
        </div>
      </section>

      <section className="section ai" id="enterprise-ai">
        <div className="section-head compact">
          <span>企业AI落地</span>
          <h2>让企业AI进入业务闭环</h2>
          <p>泊冉围绕YonGPT、智友、DataAgent和企业智能体能力，帮助企业从低风险、高频、边界清晰的场景试点AI，再逐步进入核心业务流程。</p>
        </div>
        <div className="ai-layout">
          <div className="ai-grid">
            <article><h3>经营问数智能体</h3><p>自然语言查询收入、毛利、库存、费用、资金和项目指标，生成分析建议。</p></article>
            <article><h3>财务分析智能体</h3><p>辅助月结检查、费用分析、往来分析、预算执行分析和报表解读。</p></article>
            <article><h3>采购风险智能体</h3><p>识别供应商异常、价格波动、合同风险、履约风险和围标风险线索。</p></article>
            <article><h3>供应链预警智能体</h3><p>分析缺货、超储、呆滞、交付延期和需求波动，生成预警建议。</p></article>
            <article><h3>项目风险智能体</h3><p>跟踪项目进度、成本、工时、采购、验收和回款风险。</p></article>
            <article><h3>知识问答智能体</h3><p>面向制度、流程、操作手册、项目文档和业务知识库提供智能检索与问答。</p></article>
          </div>
          <aside className="boundary-note">
            <h3>边界提示</h3>
            <p>AI优先生成草稿、建议、预警、分析和报告；涉及审批、生效、付款、核算、合同、主数据变更等动作，必须由授权人员确认后进入流程。</p>
          </aside>
        </div>
      </section>

      <section className="section localization" id="localization">
        <div className="section-head compact">
          <span>信创国产替代</span>
          <h2>以BIP承载信创替代与运营升级</h2>
          <p>信创项目的关键不只是替换软件，而是确认国产基础设施、数据库、中间件、应用版本和业务接口是否形成可验证的组合。以下列出项目中常见的适配核验范围，实际以用友官方认证、产品版本和企业现场环境为准。</p>
        </div>
        <div className="localization-matrix">
          <div className="compatibility-panel">
            <div className="compatibility-head">
              <span>适配范围</span>
              <h3>从基础软硬件到应用服务的信创适配核验</h3>
              <p>以下为项目中常见的适配核验对象，具体以用友官方认证、产品版本和企业实际环境为准。</p>
            </div>
            <dl className="compatibility-list">
              <div><dt>CPU / 服务器</dt><dd>鲲鹏、飞腾、海光、兆芯、龙芯及国产服务器体系。</dd></div>
              <div><dt>操作系统</dt><dd>银河麒麟、统信UOS、openEuler 等国产操作系统。</dd></div>
              <div><dt>数据库</dt><dd>达梦、人大金仓、南大通用GBase、openGauss / GaussDB、OceanBase 等国产数据库。</dd></div>
              <div><dt>应用中间件</dt><dd>东方通 TongWeb、金蝶 Apusic、宝兰德 BES、普元等中间件。</dd></div>
              <div><dt>集成与运维</dt><dd>身份认证、日志审计、备份灾备、消息服务、接口网关和监控体系。</dd></div>
            </dl>
          </div>
          <aside className="localization-status">
            <span>企业落地关注点</span>
            <ol>
              <li><b>版本确认</b><em>确认BIP版本、部署方式、数据库和中间件组合。</em></li>
              <li><b>数据迁移验证</b><em>验证主数据、历史数据、报表和权限规则。</em></li>
              <li><b>接口连续性</b><em>核验MES、WMS、OA、CRM、自研系统和外部平台接口。</em></li>
              <li><b>上线验收</b><em>完成性能、安全、审计、备份和运维纳管确认。</em></li>
            </ol>
          </aside>
        </div>
      </section>

      <section className="section pains" id="why-upgrade">
        <div className="section-head compact">
          <span>为什么升级</span>
          <h2>多系统并存下的集团管控挑战</h2>
          <p>很多企业已经上线过ERP、财务、供应链、OA、CRM、MES、WMS等系统，但随着组织扩张、业务复杂化和监管要求提升，原有系统逐渐变成新的管理瓶颈。</p>
        </div>
        <div className="card-grid three">
          <article><h3>系统林立</h3><p>财务、供应链、销售、采购、制造、人力、OA、MES、WMS分散运行，业务靠人工衔接。</p></article>
          <article><h3>数据孤岛</h3><p>集团总部看不到实时经营数据，收入、成本、库存、资金、费用和项目口径不统一。</p></article>
          <article><h3>流程断点</h3><p>合同、订单、发货、开票、收款、采购、入库、对账、付款之间存在大量线下补录和人工确认。</p></article>
          <article><h3>集团管控困难</h3><p>多法人、多组织、多账套、多业态管理复杂，预算、资金、采购、成本和风险难以穿透。</p></article>
          <article><h3>老系统升级压力</h3><p>NC、NCC、U8、U9、金蝶、SAP、Oracle等系统运行多年，扩展、集成、体验和运维压力上升。</p></article>
          <article><h3>AI难落地</h3><p>企业有AI想法，但缺少统一数据底座、业务流程入口和可验证的场景闭环。</p></article>
        </div>
      </section>

      <section className="section delivery-roadmap" id="delivery">
        <span className="section-anchor" id="implementation-path" aria-hidden="true" />
        <div className="section-head compact">
          <span>实施路径与交付保障</span>
          <h2>一套路径，贯穿评估、建设与持续运营</h2>
          <p>先把建设范围、迁移路径、数据口径和试点场景说清楚，再进入蓝图、配置、联调、上线和运营优化。泊冉以近百人咨询、实施与交付团队，以及14年服务中大型客户的经验，支撑复杂项目稳步推进。</p>
        </div>
        <div className="delivery-flow">
          <ol className="flow-rail">
            <li><span>01</span><h3>现状评估</h3><p>系统清单、流程问题、数据问题、接口问题、风险清单、优先试点建议。</p></li>
            <li><span>02</span><h3>蓝图设计</h3><p>业务蓝图、系统蓝图、数据蓝图、集成蓝图、权限蓝图、上线策略。</p></li>
            <li><span>03</span><h3>试点验证</h3><p>选择财务、采购、供应链、项目、AI问数等边界清晰场景先验证。</p></li>
            <li><span>04</span><h3>迁移集成</h3><p>历史数据迁移、主数据治理、接口联调、并行测试、业务验证。</p></li>
            <li><span>05</span><h3>上线切换</h3><p>上线切换、用户培训、权限配置、问题处理、运行支持。</p></li>
            <li><span>06</span><h3>持续运营</h3><p>数据分析、流程优化、AI智能体扩展、系统运维和管理提升。</p></li>
          </ol>
          <aside className="delivery-assurance">
            <span>交付保障</span>
            <h3>专家顾问 + 实施团队 + 集成交付协同</h3>
            <ul>
              <li>近百人咨询、实施与交付团队。</li>
              <li>14年服务中大型客户经验。</li>
              <li>覆盖方案蓝图、实施配置、迁移治理、异构集成、信创适配和企业AI共创。</li>
              <li>以分阶段试点、并行验证和持续优化控制复杂项目风险。</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section faq" id="faq">
        <div className="section-head compact">
          <span>FAQ</span>
          <h2>用友BIP常见问题</h2>
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

      <section className="section diagnosis" id="consultation">
        <div className="diagnosis-copy">
          <span>BIP Solution Consultation</span>
          <h2>准备推进用友BIP？先明确建设范围与推进路径</h2>
          <p>无论您正在使用NC、NCC、U8、U9、金蝶、SAP、Oracle，还是多套自研和行业系统并存，泊冉都可以帮助您梳理当前系统问题、迁移风险、优先试点场景和用友BIP落地路径。</p>
          <div className="diagnosis-checks">
            <div><strong>看系统</strong><span>判断新建、迁移、集成、并行切换或分阶段替换。</span></div>
            <div><strong>看场景</strong><span>财务、供应链、采购、制造、项目和企业AI优先级。</span></div>
            <div><strong>看边界</strong><span>高风险动作由AI生成建议或草稿，再由授权人员确认。</span></div>
          </div>
          <p className="core-line light">泊冉不只是帮助企业上线用友BIP，而是帮助企业把旧系统、老流程、分散数据和复杂组织，升级为可管控、可协同、可分析、可智能运营的数智化底座。</p>
          <div className="contact-strip">
            <a href="tel:400-9955-161" data-track="phone_click">电话咨询：400-9955-161</a>
            <a href="https://www.iboran.com/contact" data-track="chat_click">在线咨询</a>
          </div>
        </div>
        <form className="lead-form compact-lead-form" data-form-name="yonyou-bip-consultation" noValidate onSubmit={handleLeadFormSubmit}>
          <h3>预约BIP方案沟通</h3>
          <div className="field-grid">
            <label><span>企业名称 <b>*</b></span><input name="company" type="text" autoComplete="organization" required /></label>
            <label><span>联系人 <b>*</b></span><input name="contact" type="text" autoComplete="name" required /></label>
          </div>
          <div className="field-grid">
            <label><span>手机 / 微信 <b>*</b></span><input name="phone_wechat" type="text" autoComplete="tel" required /></label>
            <label><span>当前系统概况</span><input name="current_system" type="text" placeholder="例如：NC / SAP / 金蝶 / MES / 多套自研系统" /></label>
          </div>
          <div className="field-grid">
            <label>
              <span>计划方向</span>
              <select name="upgrade_direction">
                <option value="">请选择</option>
                <option>新建BIP</option>
                <option>旧系统升级</option>
                <option>迁移与集成</option>
                <option>信创国产替代</option>
                <option>企业AI落地</option>
                <option>还在评估</option>
              </select>
            </label>
            <label>
              <span>关注场景</span>
              <select name="focus_scene">
                <option value="">请选择</option>
                <option>财务共享 / 预算 / 资金</option>
                <option>供应链 / 采购 / 库存</option>
                <option>制造 / 成本 / 质量</option>
                <option>项目 / 资产 / 人力</option>
                <option>经营分析 / 企业AI</option>
                <option>集团整体建设</option>
              </select>
            </label>
          </div>
          <label>
            <span>补充说明</span>
            <textarea name="remark" rows={3} placeholder="例如：当前NC与MES/WMS并存，想评估财务共享、采购、库存预警和信创替代路径。"></textarea>
          </label>
          <details className="optional-fields">
            <summary>补充企业规模、行业、信创与AI关注点</summary>
            <div className="field-grid">
              <label><span>企业规模</span><input name="company_size" type="text" placeholder="例如：500人 / 多法人集团 / 央国企二级单位" /></label>
              <label><span>所属行业</span><input name="industry" type="text" placeholder="制造 / 消费品 / 医药流通 / 服务项目 / 央国企" /></label>
            </div>
            <div className="field-grid">
              <label>
                <span>是否涉及信创国产替代</span>
                <select name="localization">
                  <option value="">请选择</option>
                  <option>是</option>
                  <option>否</option>
                  <option>待评估</option>
                </select>
              </label>
              <label>
                <span>是否关注YonGPT / 智友 / DataAgent / 智能体</span>
                <select name="ai_interest">
                  <option value="">请选择</option>
                  <option>是</option>
                  <option>否</option>
                  <option>待评估</option>
                </select>
              </label>
            </div>
            <label><span>期望沟通时间</span><input name="contact_time" type="text" placeholder="例如：本周工作日 / 月底前 / 先电话沟通" /></label>
          </details>
          <p className="form-hint" role="status" aria-live="polite">提交后，泊冉顾问将根据您的系统现状和业务场景，初步判断适合新建、迁移、集成、并行切换还是分阶段替换。</p>
          <button className="modal-submit" type="submit">
            提交BIP建设需求
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
        <a href="#consultation" data-scroll-target data-track="cta_click_bip_diagnosis_hero">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4V5Zm3 3v2h10V8H7Zm0 4v2h7v-2H7Zm0 4v1h4v-1H7Z" /></svg>
          沟通
        </a>
        <a href="#scenarios" data-scroll-target data-track="cta_click_bip_solution_hero">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" /></svg>
          方案
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