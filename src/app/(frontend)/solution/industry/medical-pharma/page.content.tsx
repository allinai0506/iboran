'use client'

import React, { useState, useEffect, useRef } from 'react'
import './medical-pharma.css'
import { useAttribution } from '@/providers/Attribution'
import { faqItems, industryOptions, sceneOptions } from './data'

const HERO_IMG = '/solution/industry/medical-pharma/medical-pharma-og.webp'
const FORM_NAME = 'medical-pharma-diagnosis'
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
  window.setTimeout(() => {
    target.classList.remove('target-highlight')
    window.requestAnimationFrame(() => target.classList.add('target-highlight'))
  }, 360)
}

/* ---------------- 主组件 ---------------- */

export const MedicalPharmaContent: React.FC = () => {
  const attribution = useAttribution()
  const [openFaqs, setOpenFaqs] = useState<Set<number>>(new Set())
  const [hint, setHint] = useState<{ msg: string; type: '' | 'error' | 'success' }>({
    msg: DEFAULT_HINT,
    type: '',
  })
  const [invalidFields, setInvalidFields] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  /* 点击埋点（事件委托）+ 锚点滚动 + 表单预填 */
  useEffect(() => {
    const root = document.querySelector('.mp-scope')
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
        if (trackEl.dataset.prefillScene) payload.prefill_scene = trackEl.dataset.prefillScene
        trackEvent(trackEl.dataset.track ?? '', payload)
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

      // 预填表单（data-prefill-scene → 关注场景下拉）
      const prefillEl = target.closest<HTMLElement>('[data-prefill-scene]')
      if (prefillEl?.dataset.prefillScene) {
        prefillScene(prefillEl.dataset.prefillScene)
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

  /* 移动端 CTA 显隐 */
  useEffect(() => {
    const mobileCta = document.querySelector<HTMLElement>('.mp-scope .mobile-cta')
    if (!mobileCta || !('IntersectionObserver' in window)) return
    const hiddenIds = ['top', 'diagnosis']
    const active = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) active.add(entry.target.id)
          else active.delete(entry.target.id)
        })
        mobileCta.classList.toggle('is-hidden', active.size > 0)
      },
      { threshold: 0.14 },
    )
    hiddenIds.forEach((id) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])

  /* 表单预填：匹配关注场景下拉 */
  const prefillScene = (scene: string) => {
    if (!formRef.current || !scene) return
    const select = formRef.current.querySelector<HTMLSelectElement>('select[name="scene"]')
    if (!select) return
    const matched = Array.from(select.options).find((opt) => opt.textContent?.trim() === scene.trim())
    if (matched) {
      select.value = matched.value || matched.textContent?.trim() || ''
      select.classList.remove('is-invalid')
    }
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

    const company = (formData.get('company') || '').toString().trim()
    const industry = (formData.get('industry') || '').toString().trim()
    const system = (formData.get('system') || '').toString().trim()
    const scene = (formData.get('scene') || '').toString().trim()
    const contact = (formData.get('contact') || '').toString().trim()
    const phone = (formData.get('phone') || '').toString().trim()
    const remark = (formData.get('remark') || '').toString().trim()

    const invalid: string[] = []
    if (!company) invalid.push('company')
    if (!industry) invalid.push('industry')
    if (!scene) invalid.push('scene')
    if (!contact) invalid.push('contact')
    const digits = phone.replace(/[\s-]/g, '').replace(/^\+?86/, '')
    const validPhone = /^1[3-9]\d{9}$/.test(digits)
    if (!phone || !validPhone) invalid.push('phone')

    setInvalidFields(invalid)
    if (invalid.length) {
      setHint({ msg: '请先补充公司名称、所属行业、关注场景、联系人和有效手机号。', type: 'error' })
      return
    }

    setSubmitting(true)
    const remarkParts: string[] = []
    if (system) remarkParts.push(`当前系统: ${system}`)
    if (remark) remarkParts.push(`备注: ${remark}`)

    const data = {
      name: contact,
      phone: digits,
      company,
      customerType: industry || undefined,
      interest: scene || undefined,
      currentSystem: system || undefined,
      remark: remarkParts.join('\n') || undefined,
      source: '医药与医疗器械数智化方案',
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
          msg: '已收到诊断需求，泊冉顾问会结合GMP/GSP、UDI、CSV、批号效期、库存追溯和业财一体化场景与您沟通。',
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
    <div className="mp-scope">
      {/* Hero */}
      <section className="hero" id="top">
        <div className="grid-bg" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="eyebrow"><span />Medical &amp; Pharma Digital Suite</div>
            <h1>医药与医疗器械数智化<span className="nowrap">解决方案</span></h1>
            <p className="hero-lead">把GMP、GSP、UDI、CSV、批号效期和业财一体化放进同一套合规运营闭环</p>
            <p>
              面向制药生产、生物制药、医药流通、药品批发、医疗器械和耗材企业，泊冉结合用友数智化平台与行业实施方法，梳理研发、生产、采购、库存、销售、质量、财务与合规数据，让质量记录、批次流向、验证证据和财务结果在日常业务中自然留痕。
            </p>
            <div className="value-tags" aria-label="核心价值标签">
              <span>GMP/GSP合规体系</span>
              <span>UDI全链路追溯</span>
              <span>CSV验证支撑</span>
              <span>批号效期与业财一体化</span>
            </div>
            <div className="hero-actions">
              <a className="btn primary" href="#diagnosis" data-scroll-target data-track="hero_primary_cta_click">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4V5Zm3 3v2h10V8H7Zm0 4v2h7v-2H7Zm0 4v1h4v-1H7Z" /></svg>
                预约医药行业方案诊断
              </a>
              <a
                className="btn secondary"
                href="#diagnosis"
                data-scroll-target
                data-track="hero_secondary_cta_click"
                data-extra-track="brochure_download_click"
                data-prefill-scene="获取医药医疗器械行业方案"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v10.2l3.4-3.4 1.8 1.8L12 16.8l-5.2-5.2 1.8-1.8 3.4 3.4V3h2Zm-7 14h14v4H5v-4Z" /></svg>
                获取医药医疗器械行业方案
              </a>
            </div>
          </div>

          <aside className="hero-console" aria-label="医药医疗器械合规运营驾驶舱示意">
            <img
              className="hero-banner"
              src={HERO_IMG}
              alt="医药与医疗器械行业解决方案示意"
              width={1200}
              height={630}
              fetchPriority="high"
            />
            <div className="console-panel">
              <div className="panel-title">
                <span>Compliance Command Center</span>
                <strong>风险预警中</strong>
              </div>
              <div className="alert-row warn"><span>GMP</span><b>批记录与放行控制点待质量确认</b><em>复核</em></div>
              <div className="alert-row ok"><span>UDI</span><b>扫码出库记录与销售订单已关联</b><em>通过</em></div>
              <div className="alert-row danger"><span>CSV</span><b>验证脚本与配置变更证据待归档</b><em>跟进</em></div>
            </div>
          </aside>
        </div>
      </section>

      {/* Pains */}
      <section className="section pains" id="pains">
        <div className="section-head compact">
          <span>行业痛点</span>
          <h2>行业难点不在单点功能，而在合规与经营闭环</h2>
          <p>不同企业可能从研发注册、生产质量、流通合规、器械追溯或业财管控切入，但共同点都是：质量体系、合规证据、批次追溯和经营数据必须在一套流程里闭环。</p>
        </div>
        <div className="pain-layout">
          <article>
            <div className="pain-kicker"><span>准入</span><strong>资质证照分散</strong></div>
            <p className="pain-lead">证照不是附件，而是采购、销售和出入库的业务准入条件。</p>
            <dl><dt>断点</dt><dd>客商、首营资料、经营范围、授权文件散落在表格、网盘和邮件里。</dd><dt>闭环</dt><dd>统一档案、到期预警、经营范围校验，并联动业务启停。</dd></dl>
          </article>
          <article>
            <div className="pain-kicker"><span>批次</span><strong>批号效期割裂</strong></div>
            <p className="pain-lead">批号、效期和库存状态一旦分散，追溯就会变成事后拼图。</p>
            <dl><dt>断点</dt><dd>库存、销售、退货和质量记录分散，正反向追溯依赖人工。</dd><dt>闭环</dt><dd>批号入库、库存状态、近效预警、销售流向持续关联。</dd></dl>
          </article>
          <article>
            <div className="pain-kicker"><span>质量</span><strong>GMP/GSP记录滞后</strong></div>
            <p className="pain-lead">质量记录不能等检查前补，必须跟随业务动作自然沉淀。</p>
            <dl><dt>断点</dt><dd>生产、验收、复核、养护、放行、不合格品处理记录分离。</dd><dt>闭环</dt><dd>把质量控制点嵌入采购、生产、库存、销售和放行流程。</dd></dl>
          </article>
          <article>
            <div className="pain-kicker"><span>器械</span><strong>UDI追溯链路断点</strong></div>
            <p className="pain-lead">UDI不只是扫码，而是器械从赋码到流向的追溯入口。</p>
            <dl><dt>断点</dt><dd>赋码、扫码、绑定、出入库和流通数据没有统一链路。</dd><dt>闭环</dt><dd>UDI与产品、批号、库存、订单、发货和退货数据绑定。</dd></dl>
          </article>
          <article>
            <div className="pain-kicker"><span>验证</span><strong>CSV验证材料后补</strong></div>
            <p className="pain-lead">验证证据如果上线后再整理，蓝图、配置和测试链路容易断。</p>
            <dl><dt>断点</dt><dd>需求、配置、测试、权限、审计追踪和变更记录分散。</dd><dt>闭环</dt><dd>从蓝图阶段同步规划URS、测试脚本、执行记录和验证报告。</dd></dl>
          </article>
          <article>
            <div className="pain-kicker"><span>业财</span><strong>业财与成本口径不同步</strong></div>
            <p className="pain-lead">业务发生和财务确认不在一条链路，经营分析就会滞后。</p>
            <dl><dt>断点</dt><dd>库存成本、开票、应收应付、凭证和账实一致需要反复对账。</dd><dt>闭环</dt><dd>采购、库存、销售、成本、应收应付和总账基于同一事实流转。</dd></dl>
          </article>
        </div>
        <div className="pain-conclusion">医药行业系统要回答的不只是“业务有没有在线”，还要回答“质量过程是否受控、验证证据是否完整、批次能否追溯、财务结果能否对得上”。</div>
      </section>

      {/* Answer */}
      <section className="section answer" id="answer">
        <div className="section-head compact">
          <span>一屏看懂 · 行业边界</span>
          <h2>先判断企业处在哪条合规链路，再决定系统范围</h2>
          <p>医药医疗器械不是一个单一业务模型。制药生产、药品流通、器械经营、耗材配送和集团化运营的系统重点不同，方案边界应从监管要求、质量证据、批次追溯和经营核算一起定义。</p>
        </div>
        <div className="answer-grid">
          <article>
            <h3>制药生产 / 生物制药</h3>
            <p>重点不只是采购、生产和库存，而是GMP批记录、质量放行、偏差/CAPA、变更、培训、设备验证与CSV证据链能否连续。</p>
          </article>
          <article>
            <h3>药品流通 / 批发零售</h3>
            <p>重点是GSP首营、经营范围、证照有效期、入库验收、出库复核、在库养护、不合格品、停售召回与财务库存闭环。</p>
          </article>
          <article>
            <h3>医疗器械 / 高值耗材</h3>
            <p>重点是UDI赋码、扫码出入库、批号/序列号绑定、调拨退货、临床耗用、售后召回和审计追踪是否能一链到底。</p>
          </article>
          <article>
            <h3>集团化 / 多组织经营</h3>
            <p>重点是主数据、权限、组织间交易、成本核算、应收应付、库存占用和经营分析口径能否统一，而不是各部门各建一套台账。</p>
          </article>
          <article className="wide">
            <h3>泊冉的切入方式</h3>
            <p>不从“上一套系统”开始，而是先梳理监管边界、业务链路、质量证据和财务闭环；再选择GMP批记录、GSP出入库、UDI扫码、CSV验证资料、批号效期或业财对账等场景试点。AI只做建议、草稿、预警和辅助分析，高风险动作由授权人员确认。</p>
          </article>
        </div>
      </section>

      {/* Architecture */}
      <section className="section architecture" id="architecture">
        <div className="section-head">
          <span>能力架构</span>
          <h2>从业务输入到合规闭环的一体化架构</h2>
          <p>把医药企业每天发生的业务动作沉淀成可查询、可追溯、可核算、可审计的系统证据。</p>
        </div>
        <div className="layer-stack" aria-label="五层能力架构">
          <article><b>01</b><h3>业务输入层</h3><p>研发/注册资料、首营资料、客户/供应商资质、采购订单、生产/委外记录、销售订单、UDI码、批号、效期、质检记录</p></article>
          <article><b>02</b><h3>业务处理层</h3><p>研发项目、采购管理、生产/委外、销售管理、库存管理、质量管理、证照管理、批号效期管理</p></article>
          <article><b>03</b><h3>合规与追溯层</h3><p>GMP、GSP、CSV、UDI、电子批记录、质量放行、正向追溯、反向追溯、审计追踪</p></article>
          <article><b>04</b><h3>数据分析与AI层</h3><p>ChatBI、经营问数、库存预警、资质预警、近效期预警、审计资料整理草稿</p></article>
          <article><b>05</b><h3>ERP闭环层</h3><p>采购 → 入库 → 质检 → 生产/委外 → 库存 → 销售 → 出库 → 开票 → 应收应付 → 财务核算</p></article>
        </div>
      </section>

      {/* Scenarios */}
      <section className="section scenarios" id="scenarios">
        <div className="section-head compact">
          <span>业务场景</span>
          <h2>把合规要求嵌进每一张业务单据</h2>
          <p>以下不是功能堆叠，而是医药企业每天会触发的业务动作。每个场景都可以独立试点，也可以逐步并入完整业财一体化。</p>
        </div>
        <div className="scenario-grid">
          <article>
            <h3>首营资料管理</h3>
            <p className="scenario-summary">把首营企业、首营品种、资质附件和审批留痕放在业务启用之前，避免“先交易、后补资料”。</p>
            <dl><dt>当前断点</dt><dd>资料分散在表格、网盘和邮件里，质量审核难以追溯。</dd><dt>系统介入</dt><dd>统一首营档案、审批节点、证照附件、有效期和启用状态。</dd><dt>闭环结果</dt><dd>资料提交 → 质量审核 → 业务启用 → 到期复核。</dd></dl>
            <span>适配：首营企业 · 首营品种 · 质量审核</span>
          </article>
          <article>
            <h3>客户/供应商资质管理</h3>
            <p className="scenario-summary">让资质不只是附件，而是采购、销售、出入库流程中的业务规则。</p>
            <dl><dt>当前断点</dt><dd>经营范围、授权文件和证照有效期无法稳定联动业务控制。</dd><dt>系统介入</dt><dd>按客户、供应商、品类和经营范围建立资质档案与校验规则。</dd><dt>闭环结果</dt><dd>资质建档 → 范围校验 → 业务引用 → 持续复核。</dd></dl>
            <span>适配：客商档案 · 经营范围 · 授权资质</span>
          </article>
          <article>
            <h3>证照到期预警</h3>
            <p className="scenario-summary">提前看见证照风险，把“临近检查才补资料”变成日常预警和复核任务。</p>
            <dl><dt>当前断点</dt><dd>证照过期靠人工记忆，临近审计或监管检查才集中处理。</dd><dt>系统介入</dt><dd>按证照类型、有效期、客商、责任人和提醒周期配置预警。</dd><dt>闭环结果</dt><dd>证照采集 → 到期提醒 → 资料更新 → 状态联动。</dd></dl>
            <span>适配：证照台账 · 到期提醒 · 合规复核</span>
          </article>
          <article>
            <h3>采购入库质量控制</h3>
            <p className="scenario-summary">让验收、拒收、质检和批号效期在入库时一次沉淀，不把质量记录留到事后补录。</p>
            <dl><dt>当前断点</dt><dd>到货、验收、拒收和质检记录难以形成连续证据。</dd><dt>系统介入</dt><dd>入库验收、拒收记录、质检结果、批号效期和库存状态联动。</dd><dt>闭环结果</dt><dd>采购到货 → 入库验收 → 质量判定 → 库存更新。</dd></dl>
            <span>适配：入库验收 · 拒收记录 · 批号效期</span>
          </article>
          <article>
            <h3>销售出库质量控制</h3>
            <p className="scenario-summary">出库不是发货结束，而是客户资质、批次流向和质量复核记录开始形成证据链。</p>
            <dl><dt>当前断点</dt><dd>出库复核、运输记录和客户资质校验容易被事后补录。</dd><dt>系统介入</dt><dd>销售订单、资质校验、批号效期校验、出库复核和发货记录联动。</dd><dt>闭环结果</dt><dd>销售订单 → 出库复核 → 发货记录 → 流向追踪。</dd></dl>
            <span>适配：出库复核 · 发货记录 · 客户资质</span>
          </article>
          <article>
            <h3>批号效期与近效期预警</h3>
            <p className="scenario-summary">让每一批库存都有清晰状态、有效期和处理节奏，避免近效期库存被动暴露。</p>
            <dl><dt>当前断点</dt><dd>批号、效期、货位、可用量和销售流向无法实时拼在一起。</dd><dt>系统介入</dt><dd>按商品、批号、仓库、货位、效期阈值和库存状态设置预警。</dd><dt>闭环结果</dt><dd>批号入库 → 库存监控 → 近效提醒 → 协同处理。</dd></dl>
            <span>适配：批号库存 · 近效期 · 库存预警</span>
          </article>
          <article>
            <h3>GMP生产质量过程</h3>
            <p className="scenario-summary">把物料、生产、委外、检验、偏差、放行和批记录放在同一条质量过程里，而不是事后整理文档。</p>
            <dl><dt>当前断点</dt><dd>生产执行、质量检验、放行控制和批记录分散，过程证据难以连续。</dd><dt>系统介入</dt><dd>围绕工序、批次、检验、偏差/CAPA、变更、培训和放行节点建立留痕。</dd><dt>闭环结果</dt><dd>生产计划 → 过程记录 → 质量判定 → 放行归档。</dd></dl>
            <span>适配：GMP · 电子批记录 · 质量放行</span>
          </article>
          <article>
            <h3>CSV验证资料管理</h3>
            <p className="scenario-summary">把CSV验证从“上线后补文档”前移到蓝图、配置、测试和变更管理全过程。</p>
            <dl><dt>当前断点</dt><dd>需求、风险、配置、测试、权限和变更记录分散，验证报告缺少稳定证据来源。</dd><dt>系统介入</dt><dd>沉淀URS、配置说明、测试脚本、执行记录、审计追踪和验证报告素材。</dd><dt>闭环结果</dt><dd>需求定义 → 风险评估 → 配置测试 → 验证报告。</dd></dl>
            <span>适配：CSV · GAMP5 · 验证报告</span>
          </article>
          <article>
            <h3>UDI解析与绑定</h3>
            <p className="scenario-summary">让UDI从“贴码动作”变成医疗器械从入库到销售流向的追溯入口。</p>
            <dl><dt>当前断点</dt><dd>赋码、扫码、绑定和业务单据关联靠人工，查询链路断点多。</dd><dt>系统介入</dt><dd>支持UDI生成、打印、绑定、扫码入库、扫码出库和流通关联。</dd><dt>闭环结果</dt><dd>赋码 → 绑定产品/批号 → 扫码流转 → 追溯查询。</dd></dl>
            <span>适配：UDI赋码 · 扫码出入库 · 器械追溯</span>
          </article>
          <article>
            <h3>库存追溯与审计资料准备</h3>
            <p className="scenario-summary">把审计准备前移到日常流程，减少临时拼采购、库存、销售和质量记录的压力。</p>
            <dl><dt>当前断点</dt><dd>审计资料来自多个系统和人工台账，批次证据链难以快速还原。</dd><dt>系统介入</dt><dd>按批号、商品、客商、UDI码和单据维度查询完整业务链路。</dd><dt>闭环结果</dt><dd>业务记录沉淀 → 正反向追溯 → 清单生成 → 人工确认。</dd></dl>
            <span>适配：批次追溯 · 审计清单 · 质量记录</span>
          </article>
          <article>
            <h3>发货、开票、应收应付</h3>
            <p className="scenario-summary">让发货、开票、回款和应收应付接在同一条业务链路上，减少月底反复对账。</p>
            <dl><dt>当前断点</dt><dd>发货、开票、回款、库存成本和应收应付口径不统一。</dd><dt>系统介入</dt><dd>销售发货、开票、应收、收款、采购应付和财务凭证联动。</dd><dt>闭环结果</dt><dd>发货 → 开票 → 应收 → 收款 → 财务核算。</dd></dl>
            <span>适配：发货开票 · 应收应付 · 财务核算</span>
          </article>
          <article>
            <h3>财务库存一体化</h3>
            <p className="scenario-summary">把账实一致从月底对账变成日常管理，让库存状态、成本金额和财务报表使用同一套业务事实。</p>
            <dl><dt>当前断点</dt><dd>库存数量、批次状态、成本金额和财务账面需要人工核对。</dd><dt>系统介入</dt><dd>统一采购、库存、销售、成本、应收应付与总账数据链路。</dd><dt>闭环结果</dt><dd>业务单据 → 库存变化 → 成本核算 → 凭证报表。</dd></dl>
            <span>适配：账实一致 · 库存成本 · 业财闭环</span>
          </article>
        </div>
      </section>

      {/* Topic GMP */}
      <section className="section topic gmp" id="gmp">
        <div className="topic-copy">
          <span>GMP专题</span>
          <h2>GMP不是生产部门的文档，而是贯穿生产、质量与放行的过程控制</h2>
          <p>面向制药生产、生物制药、委外加工和器械生产企业，把物料、工艺、生产执行、检验、偏差、变更、培训、设备验证和批记录纳入可追溯流程。</p>
          <a className="btn primary" href="#diagnosis" data-scroll-target data-track="gmp_cta_click" data-prefill-scene="GMP">预约GMP质量流程诊断</a>
        </div>
        <div className="topic-list">
          <div>物料、工艺、BOM和批记录关联</div>
          <div>生产过程检验、偏差、CAPA与变更管理</div>
          <div>质量放行控制点与电子签名留痕</div>
          <div>设备验证、培训记录与体系文件受控</div>
          <div>按批次正向/反向质量追溯</div>
          <div>与采购、库存、成本和财务核算衔接</div>
        </div>
      </section>

      {/* Topic GSP */}
      <section className="section topic gsp" id="gsp">
        <div className="topic-copy">
          <span>GSP专题</span>
          <h2>GSP不是制度，而是系统自动执行的流程</h2>
          <p>结合医药行业合规要求，把首营、资质、验收、复核、养护、不合格品和召回处理嵌入采购、库存、销售和质量流程。</p>
          <a className="btn primary" href="#diagnosis" data-scroll-target data-track="gsp_cta_click" data-prefill-scene="GSP">预约GSP合规诊断</a>
        </div>
        <div className="topic-list">
          <div>首营企业/首营品种审批</div>
          <div>经营资质完整性、有效性和经营范围管控</div>
          <div>入库验收/拒收记录</div>
          <div>出库复核记录</div>
          <div>在库养护计划与养护记录</div>
          <div>不合格品处理、停售、召回、销毁</div>
        </div>
      </section>

      {/* Topic UDI */}
      <section className="section topic udi" id="udi">
        <div className="topic-copy">
          <span>UDI专题</span>
          <h2>UDI不是编码问题，而是医疗器械全生命周期追溯能力</h2>
          <p>围绕医疗器械唯一标识，把赋码、打印、扫码出入库、流通、库存、销售和审计追踪放到同一条数据链路里。</p>
          <a className="btn primary" href="#diagnosis" data-scroll-target data-track="udi_cta_click" data-prefill-scene="UDI">预约UDI方案评估</a>
        </div>
        <div className="topic-list">
          <div>UDI赋码生成、打印与绑定</div>
          <div>入库、出库、调拨、退货扫码</div>
          <div>与批号、库存、销售、发货数据关联</div>
          <div>支持多维度查询与审计追踪</div>
          <div>支持GS1/MA等主流编码规范</div>
        </div>
      </section>

      {/* Topic CSV */}
      <section className="section topic csv" id="csv">
        <div className="topic-copy">
          <span>CSV专题</span>
          <h2>CSV不是上线后的补材料，而是从蓝图到验证报告的证据链</h2>
          <p>对受监管业务系统，建议在需求、配置、权限、测试、审计追踪和变更管理阶段同步规划CSV验证材料，减少上线后集中补证据的压力。</p>
          <a className="btn primary" href="#diagnosis" data-scroll-target data-track="csv_cta_click" data-prefill-scene="CSV验证">预约CSV验证路径评估</a>
        </div>
        <div className="topic-list">
          <div>URS需求、风险评估与验证计划</div>
          <div>配置说明、权限矩阵与审计追踪</div>
          <div>测试脚本、执行记录与偏差处理</div>
          <div>验证报告、上线确认与交付归档</div>
          <div>变更管理、配置管理与可追溯性</div>
          <div>结合企业实际流程确定验证边界</div>
        </div>
      </section>

      {/* AI */}
      <section className="section ai" id="ai">
        <div className="section-head compact">
          <span>AI数字员工</span>
          <h2>让AI帮你盯证照、看库存、查批次、做报表</h2>
          <p>AI能力统一定位为建议、草稿、预警和辅助分析，审批、放行、财务确认等高风险动作由授权人员确认。</p>
        </div>
        <div className="ai-layout">
          <div className="ai-grid">
            <article><strong>医院采购单转销售订单</strong><span>AI生成销售订单草稿，由人员确认。</span></article>
            <article><strong>资质资料读取</strong><span>AI提取证照有效期、经营范围等信息，需人工复核。</span></article>
            <article><strong>证照到期提醒</strong><span>提前预警，辅助质量和合规人员安排复核。</span></article>
            <article><strong>近效期库存预警</strong><span>提醒销售、采购、仓储人员处理。</span></article>
            <article><strong>批次追溯问答</strong><span>按批号查询采购、库存、销售、出库流向。</span></article>
            <article><strong>审计资料整理</strong><span>AI生成资料清单和草稿，由合规人员确认。</span></article>
            <article><strong>ChatBI经营问数</strong><span>查询库存、毛利、应收、近效期占比等指标。</span></article>
          </div>
          <aside className="ai-boundary">
            <h3>AI边界说明</h3>
            <p>AI不直接替代审批，不自动执行放行，不直接写入高风险财务结果。AI生成建议、草稿、预警，由授权人员确认后进入流程。</p>
            <a className="btn secondary-dark" href="#diagnosis" data-scroll-target data-track="ai_cta_click" data-prefill-scene="AI数字员工">评估AI数字员工场景</a>
          </aside>
        </div>
      </section>

      {/* Roles */}
      <section className="section roles" id="roles">
        <div className="section-head compact">
          <span>按角色看价值</span>
          <h2>不同负责人看到的是同一套数据，不同的管理重点</h2>
        </div>
        <div className="role-grid">
          <article>
            <div className="role-icon">¥</div>
            <h3>CFO</h3>
            <p>把库存、成本、发票、应收应付和总账口径对齐。</p>
            <div className="role-tags"><span>账实一致</span><span>毛利</span><span>现金流</span></div>
          </article>
          <article>
            <div className="role-icon">IT</div>
            <h3>CIO</h3>
            <p>统一主数据、权限、接口和多组织系统扩展路径。</p>
            <div className="role-tags"><span>集成</span><span>权限</span><span>扩展</span></div>
          </article>
          <article>
            <div className="role-icon">QA</div>
            <h3>质量负责人</h3>
            <p>让GMP/GSP记录、检验、放行和审计追溯跟着流程走。</p>
            <div className="role-tags"><span>质量记录</span><span>放行</span><span>追溯</span></div>
          </article>
          <article>
            <div className="role-icon">SC</div>
            <h3>供应链负责人</h3>
            <p>看清库存结构、批号效期、发货准确率和近效期压力。</p>
            <div className="role-tags"><span>批号</span><span>效期</span><span>发货</span></div>
          </article>
          <article>
            <div className="role-icon">REG</div>
            <h3>合规负责人</h3>
            <p>把证照、资质、CSV证据和监管检查资料前置沉淀。</p>
            <div className="role-tags"><span>证照</span><span>CSV</span><span>审计</span></div>
          </article>
        </div>
      </section>

      {/* Cases */}
      <section className="section cases" id="cases">
        <div className="section-head compact">
          <span>客户实践</span>
          <h2>案例重点不是单点工具，而是运营闭环</h2>
        </div>
        <div className="case-grid">
          <article>
            <div className="case-logo text-logo mayoly" aria-label="Mayoly logo"><span>Mayoly</span></div>
            <h3>支持外资制药企业在中国的合规与本地化运营</h3>
            <p>围绕产供销管理、业财打通、计划预算、标准成本、资产设备和多端数据贯通展开，支撑中国本地化运营与合规验证协同。</p>
            <a className="case-action" href="/cases/mayoly-medical-pharma" data-track="case_mayoly_click">查看案例详情</a>
          </article>
          <article>
            <div className="case-logo text-logo diao" aria-label="迪奥医学 logo"><span>迪奥医学</span></div>
            <h3>医疗器械企业推进数智化运营</h3>
            <p>打通销售、采购、供应、研发、生产、质量、财务全链路数据，推进BOM、计划、库存、成本核算和多系统集成等场景改善。</p>
            <a className="case-action" href="/cases/diao-medical-device" data-track="case_diao_click">查看案例详情</a>
          </article>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq" id="faq">
        <div className="section-head compact">
          <span>FAQ</span>
          <h2>评估医药行业方案，先问这些问题</h2>
        </div>
        <div className="faq-list">
          {faqItems.map((f, i) => {
            const isOpen = openFaqs.has(i)
            return (
              <article className={`faq-item${isOpen ? ' is-open' : ''}`} key={i}>
                <button type="button" aria-expanded={isOpen} onClick={() => toggleFaq(i)}>
                  <span>{f.q}</span><b />
                </button>
                {/* SSR 常驻输出，CSS 控制显隐，确保搜索引擎/AI 可抓取 */}
                <p>{f.a}</p>
              </article>
            )
          })}
        </div>
      </section>

      {/* Diagnosis */}
      <section className="section diagnosis" id="diagnosis">
        <div className="diagnosis-copy">
          <span>Medical &amp; Pharma Diagnosis</span>
          <h2>做一次医药行业系统诊断，先把合规边界和试点路径说清楚</h2>
          <p>从GMP、GSP、CSV、UDI、资质证照、批号效期、库存追溯到业财一体化，泊冉顾问帮助您梳理当前系统风险点与优先试点路径。</p>
          <div className="diagnosis-checks">
            <div><strong>先看合规风险</strong><span>GMP/GSP记录、CSV验证、首营、证照、UDI与批次追溯是否存在断点。</span></div>
            <div><strong>再定试点路径</strong><span>选择高频、可验证、能快速形成管理闭环的1-3个场景。</span></div>
            <div><strong>最后规划扩展</strong><span>逐步扩展到完整业财一体化、AI辅助分析和多组织协同。</span></div>
          </div>
        </div>

        <form className="lead-form" noValidate data-form-name={FORM_NAME} onSubmit={handleLeadFormSubmit} ref={formRef}>
          <h3>预约医药行业方案诊断</h3>
          <div className="field-grid">
            <label><span>公司名称 <b>*</b></span><input name="company" type="text" autoComplete="organization" required className={fieldInvalid('company')} /></label>
            <label>
              <span>所属行业 <b>*</b></span>
              <select name="industry" defaultValue="" required className={fieldInvalid('industry')}>
                <option value="">请选择</option>
                {industryOptions.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="field-grid">
            <label><span>当前系统</span><input name="system" type="text" placeholder="例如：ERP / U8 / 金蝶 / Excel / 多套业务系统" /></label>
            <label>
              <span>关注场景 <b>*</b></span>
              <select name="scene" defaultValue="" required className={fieldInvalid('scene')}>
                <option value="">请选择</option>
                {sceneOptions.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="field-grid">
            <label><span>联系人 <b>*</b></span><input name="contact" type="text" autoComplete="name" required className={fieldInvalid('contact')} /></label>
            <label><span>手机号 <b>*</b></span><input name="phone" type="tel" autoComplete="tel" inputMode="tel" required className={fieldInvalid('phone')} /></label>
          </div>
          <label>
            <span>备注</span>
            <textarea name="remark" rows={4} placeholder="例如：目前用Excel管理证照和批号，想先评估GMP批记录、GSP出入库记录、CSV验证或UDI扫码追溯" />
          </label>
          <p className={`form-hint${hint.type ? ` is-${hint.type}` : ''}`} role="status" aria-live="polite">{hint.msg}</p>
          <button className="modal-submit" type="submit" data-track="form_submit" disabled={submitting}>
            预约医药行业方案诊断
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
        <a href="#diagnosis" data-scroll-target data-track="hero_primary_cta_click">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4V5Zm3 3v2h10V8H7Zm0 4v2h7v-2H7Zm0 4v1h4v-1H7Z" /></svg>
          诊断
        </a>
        <a href="#diagnosis" data-scroll-target data-track="brochure_download_click" data-prefill-scene="获取医药医疗器械行业方案">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v10.2l3.4-3.4 1.8 1.8L12 16.8l-5.2-5.2 1.8-1.8 3.4 3.4V3h2Zm-7 14h14v4H5v-4Z" /></svg>
          方案
        </a>
      </nav>
    </div>
  )
}
