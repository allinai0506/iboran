'use client'

import React, { useEffect, useRef, useState } from 'react'
import './consumer-goods.css'

/* ---------------- 样板场景数据 ---------------- */

type SampleKey =
  | 'omni'
  | 'dms'
  | 'sfa'
  | 'promo'
  | 'store'
  | 'production'
  | 'member'
  | 'finance'

type SampleData = {
  kicker: string
  title: string
  tagline: string
  when: string
  start: string
  flow: string[]
  results: string[]
  detail: string
}

const sampleData: Record<SampleKey, SampleData> = {
  omni: {
    kicker: 'SAMPLE 01',
    title: '全渠道订单中心',
    tagline: '多平台、多门店、多经销渠道订单统一归集，订单、库存、物流、账单和财务状态同步处理。',
    when: '直营、加盟、经销、平台电商和私域商城并行，订单分散在不同系统和表格里。',
    start: '业务团队先选择 1-2 个订单量最大的渠道，梳理商品、客户、仓库、物流与财务规则。',
    flow: ['订单归集', '商品客户匹配', '库存履约', '财务对账'],
    results: ['订单处理更集中', '差异追溯更清楚', '履约状态可视化'],
    detail:
      '适合多电商平台、多店铺、多经销体系的消费品企业。第一阶段可以先把订单、退款、发货、物流状态、账单和应收数据打通，再逐步接入促销费用、返利和财务核算。',
  },
  dms: {
    kicker: 'SAMPLE 02',
    title: 'DMS 经销商协同',
    tagline: '把经销商协议、价盘、信用、在线订货、库存可用量、发货、应收和对账放到同一条渠道协同链路。',
    when: '经销商数量多、订货靠电话微信、价格政策和库存状态不透明，渠道回款、返利和对账经常滞后。',
    start: '先选择一个区域或重点经销商群，统一客户、商品、协议、价格、信用、仓库和结算规则。',
    flow: ['协议价盘', '在线订货', '库存信用校验', '发货对账'],
    results: ['渠道订货更规范', '履约状态更透明', '应收返利更清楚'],
    detail:
      'DMS 不建议孤立建设。经销商订货结果要回流订单中心、库存补货、促销费用、返利核算、应收对账和经营分析，才能真正形成渠道协同闭环。',
  },
  sfa: {
    kicker: 'SAMPLE 03',
    title: 'SFA 终端拜访执行',
    tagline: '把销售人员拜访计划、门店陈列、库存盘点、动销反馈、竞品信息、促销执行和整改任务统一在线。',
    when: '终端网点多、销售拜访靠表格或聊天记录，促销有没有执行、陈列有没有到位、门店库存是否异常很难及时掌握。',
    start: '先选重点区域和核心门店，定义拜访路线、检查项、陈列标准、动销字段、照片证据和任务闭环规则。',
    flow: ['拜访计划', '终端采集', '任务整改', '动销回流'],
    results: ['终端执行可视', '促销落地可查', '补货预测更准'],
    detail:
      'SFA 的价值在于和 DMS、订单、库存、促销、费用、会员和业财数据融合。终端反馈可以触发补货建议、促销复盘、费用核销和区域经营分析。',
  },
  promo: {
    kicker: 'SAMPLE 04',
    title: '促销费用闭环',
    tagline: '把促销政策、客户费用、返利、买赠和折扣从线下表格搬进系统，形成事前预算、事中控制、事后核销。',
    when: '促销活动多、渠道政策多、费用申请和核销靠邮件或 Excel，财务很难判断真实 ROI。',
    start: '先选一个典型渠道政策，如 KA 费用、经销商返利或电商大促费用，梳理申请、审批、执行、结算和分析节点。',
    flow: ['政策制定', '预算申请', '执行核销', 'ROI 分析'],
    results: ['费用口径统一', '重复核销减少', '促销效果可追踪'],
    detail:
      '适合食品饮料、美妆日化、家居服饰和连锁零售企业。系统可围绕定价中心、促销中心、返利中心、客户费用和信用控制建立管理闭环。',
  },
  store: {
    kicker: 'SAMPLE 05',
    title: '门店智能要货',
    tagline: '结合门店销量、当前库存、促销计划、区域库存和安全库存规则，生成补货或调拨建议。',
    when: '门店要货靠经验，总部要反复查销量、库存和促销计划，畅销缺货与慢销积压并存。',
    start: '先选择高频 SKU 和重点门店，建立销量、库存、在途、促销、补货周期和安全库存字段。',
    flow: ['门店要货', '销量库存校验', '补货建议', '调拨草稿'],
    results: ['缺货预警更早', '补货建议更稳', '库存周转可改善'],
    detail:
      '适合连锁餐饮、新零售、门店零售和区域仓配业务。第一阶段建议 AI 输出建议和预警，由授权人员确认后再生成要货申请或调拨单草稿。',
  },
  production: {
    kicker: 'SAMPLE 06',
    title: '产销计划与质量追溯',
    tagline: '把销售预测、渠道订单、库存计划、采购需求、生产或委外执行、质检放行和批次追溯放到同一条链路里。',
    when: '新品铺货、大促备货、畅销补货或委外加工频繁，销售、供应链、生产、质量和财务各自拉表协调。',
    start: '先选择一个高频品类或重点 SKU，梳理预测、物料、产能、委外、质检、入库、发货和成本核算节点。',
    flow: ['需求预测', '计划排程', '质检放行', '批次追溯'],
    results: ['产销响应更快', '质量证据更完整', '成本归集更清楚'],
    detail:
      '适合有自制、委外、保质期、批次、来料检验或客诉召回要求的消费品企业。第一阶段可以先跑通销售预测到生产或委外、质检入库、批次出库和成本核算的样板链路。',
  },
  member: {
    kicker: 'SAMPLE 07',
    title: '会员精准运营',
    tagline: '统一会员、积分、卡券、钱包、购买行为和触达数据，支持用户分群、自动营销与复购分析。',
    when: '会员数据、门店数据、商品数据、交易数据分散，活动做了很多，但复购和客单价提升不清楚。',
    start: '先统一会员 ID、渠道来源、交易记录、卡券使用和触达记录，再建立核心人群标签。',
    flow: ['统一会员', '人群分层', '权益触达', '复购分析'],
    results: ['会员画像更完整', '触达更精准', '复购效果可分析'],
    detail:
      '适合有私域商城、线下门店、会员积分、卡券、权益和自动化营销需求的消费品企业。重点不是多发券，而是把行为、交易和权益数据打通。',
  },
  finance: {
    kicker: 'SAMPLE 08',
    title: '业财经营驾驶舱',
    tagline: '按品牌、渠道、区域、客户、门店和 SKU 穿透收入、毛利、费用、库存、应收和现金流。',
    when: '经营会议前临时拉数，销售、供应链、财务各有一套口径，毛利和费用解释不一致。',
    start: '先选管理层最常看的指标，统一品牌、渠道、客户、商品、费用和财务核算维度。',
    flow: ['统一指标', '采集业务事项', '实时核算', '经营预警'],
    results: ['报表口径统一', '异常更快发现', '经营动作可跟进'],
    detail:
      '适合多组织、多品牌、多区域经营的消费品企业。可以先做收入、毛利、费用、应收、库存和现金流六类指标，再扩展 AI 智能问数和异常归因。',
  },
}

const sampleTabs: { key: SampleKey; label: string }[] = [
  { key: 'omni', label: '全渠道订单中心' },
  { key: 'dms', label: 'DMS 经销商协同' },
  { key: 'sfa', label: 'SFA 终端执行' },
  { key: 'promo', label: '促销费用闭环' },
  { key: 'store', label: '门店智能要货' },
  { key: 'production', label: '产销质量协同' },
  { key: 'member', label: '会员精准运营' },
  { key: 'finance', label: '业财经营驾驶舱' },
]

/* ---------------- FAQ 数据 ---------------- */

const faqItems: { q: string; a: string }[] = [
  {
    q: '消费品行业数智化方案和普通进销存有什么区别？',
    a: '普通进销存主要记录采购、销售和库存；消费品行业数智化方案更关注渠道订单、经销商管理、价格政策、促销费用、销售返利、应收对账、库存补货和业财一体化，适合渠道复杂、交易高频、费用政策多的消费品企业。',
  },
  {
    q: '消费品行业数智化方案适合哪些企业？',
    a: '适合拥有经销商、区域渠道、门店、分销网络或多平台销售的消费品企业，尤其适合需要统一订单、库存、价格、费用、应收和财务数据口径的企业。',
  },
  {
    q: '经销商可以在线下单吗？',
    a: '可以作为重点试点场景设计。经销商可通过订货入口提交订单，系统按客户、商品、价格、信用、库存等规则进行校验，再进入销售订单、发货、应收和收款流程。具体入口形式需结合企业现有系统和权限要求确认。',
  },
  {
    q: 'DMS 和 SFA 要分开做还是融合做？',
    a: '建议按场景分步落地，但按数据和流程融合设计。DMS 更偏经销商订货、渠道协议、价格政策、库存信用和对账协同；SFA 更偏销售人员拜访、陈列检查、终端动销、竞品反馈和任务执行。两者应共用客户、门店、商品、价盘、促销、库存和费用口径，并把结果回流到订单履约、返利核算、产销计划和业财分析。',
  },
  {
    q: '渠道价格和特价审批怎么管理？',
    a: '可以按客户等级、区域、品类、渠道、促销活动、时间段设置价格规则。特殊价格建议进入审批流程，审批通过后再影响销售订单和后续应收、毛利分析。',
  },
  {
    q: '促销费用管理能解决什么问题？',
    a: '促销费用管理重点解决预算不清、执行不透明、核销慢、结案难的问题。建议把费用申请、预算占用、执行凭证、核销、结案分析纳入同一流程，便于销售、市场和财务共用同一套口径。',
  },
  {
    q: '销售返利可以自动核算吗？',
    a: '可以结合企业返利政策做规则化测算，例如按销量、销售额、回款、达成率、客户等级、品类或周期计算。返利结果建议由财务或授权人员确认后进入结算、抵扣或费用流程。',
  },
  {
    q: '库存补货和门店要货能一起做吗？',
    a: '可以。门店或渠道提交要货需求后，系统可结合库存可用量、在途、销量、订单和安全库存生成补货或调拨建议，再进入采购、调拨、出库或销售发货流程。',
  },
  {
    q: '产销一体化在消费品企业里怎么落地？',
    a: '可以从销售预测、渠道订单、库存计划和物料需求计划入手，把市场需求传递到采购、委外、生产和仓配环节。第一阶段建议先选择高频 SKU 或重点渠道，跑通需求计划、生产或委外执行、入库、发货和成本核算链路。',
  },
  {
    q: '质量管理和批次追溯需要纳入第一阶段吗？',
    a: '如果企业涉及保质期、批次、委外加工、原料供应商或客诉召回，建议把质量检验、批次管理和追溯关系纳入第一阶段范围。这样可以从原料、生产或委外、入库、出库到客户或渠道建立完整证据链。',
  },
  {
    q: '如何实现销售财务一体化？',
    a: '销售财务一体化的关键是让销售订单、发货、开票、应收、收款、费用、返利和凭证形成统一链路。业务部门处理业务单据，财务基于同一数据源进行核算、对账和分析。',
  },
  {
    q: '智能问数能在消费品企业里问哪些问题？',
    a: '可用于经营问数，例如本月华东区销售达成、经销商逾期回款、SKU库存偏高、促销费用率异常等。实际可问内容取决于已接入的数据范围、指标口径和权限设置。',
  },
  {
    q: '能和企业微信、飞书、钉钉集成吗？',
    a: '可以作为集成方向评估，用于消息提醒、审批触达、移动入口或业务通知。是否能直接集成、集成到什么程度，需要根据企业当前系统、接口能力和安全要求确认。',
  },
  {
    q: '消费品企业应该先上全套系统还是先试点？',
    a: '建议先试点。优先选择一个区域、一个事业部、一个渠道类型或一个高频流程，例如经销商订单、渠道价格、库存可视和应收对账。试点验证后，再复制到更多组织和场景。',
  },
  {
    q: '项目周期和费用怎么评估？',
    a: '需要结合企业规模、组织数量、渠道复杂度、SKU数量、经销商数量、系统集成范围和定制程度评估。建议先做场景诊断和蓝图设计，再给出实施范围、阶段计划和报价。',
  },
]

/* ---------------- 工具函数 ---------------- */

function trackEvent(name: string, payload: Record<string, unknown> = {}) {
  if (!name) return
  const w = window as unknown as { dataLayer?: unknown[] }
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push({ event: name, ...payload })
}

function compactText(value: string, maxLength = 72) {
  const text = value.replace(/\s+/g, ' ').trim()
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}...`
}

/* ---------------- 主组件 ---------------- */

const DEFAULT_HINT =
  '提交后，泊冉顾问会结合渠道结构、DMS/SFA现状、系统基础、主数据质量、产销链路、质量追溯、费用规则和业财口径，建议第一阶段落地范围。'

export default function ConsumerGoods() {
  const [activeSample, setActiveSample] = useState<SampleKey>('omni')
  const [openFaqs, setOpenFaqs] = useState<Set<number>>(new Set())
  const [hint, setHint] = useState<{ msg: string; type: '' | 'error' | 'success' }>({
    msg: DEFAULT_HINT,
    type: '',
  })
  const [invalidFields, setInvalidFields] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  /* 点击埋点（事件委托）与锚点高亮 */
  useEffect(() => {
    const root = document.querySelector('.cg-scope')
    if (!root) return

    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement
      const trackEl = target.closest<HTMLElement>('[data-track]')
      if (trackEl) {
        trackEvent(trackEl.dataset.track || '', {
          label: (trackEl.textContent || '').trim(),
        })
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

  const scrollToAnchor = (href: string) => {
    if (!href.startsWith('#')) return
    const target = document.querySelector(href)
    if (!target) return
    target.classList.remove('target-highlight')
    window.requestAnimationFrame(() => target.classList.add('target-highlight'))
  }

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
        trackEvent('faq_expand', { question: faqItems[index].q })
      }
      return next
    })
  }

  const handleSampleTab = (key: SampleKey) => {
    setActiveSample(key)
    trackEvent('sample_tab_click', { sample: key })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = formRef.current
    if (!form) return

    const get = (name: string) => {
      const el = form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | null
      return el ? el.value.trim() : ''
    }

    const invalid: string[] = []
    if (!get('name')) invalid.push('name')
    if (!get('company')) invalid.push('company')
    const phone = get('phone')
    if (!phone) {
      invalid.push('phone')
    } else if (!/^1[3-9]\d{9}$/.test(phone)) {
      invalid.push('phone')
    }

    setInvalidFields(invalid)
    if (invalid.length) {
      setHint({ msg: '请先补充姓名、公司名称和有效手机号。', type: 'error' })
      const first = form.elements.namedItem(invalid[0]) as HTMLElement | null
      first?.focus()
      return
    }

    trackEvent('form_submit_consumer_goods_diagnosis', {
      segment: get('segment'),
      priority: get('priority'),
      system: get('system'),
    })

    setSubmitting(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: get('name'),
          company: get('company'),
          phone: get('phone'),
          source: 'consumer-goods-page',
          sourcePath: '/solution/industry/consumer-goods',
          sourcePageUrl: window.location.href,
          customer_type: get('segment'),
          currentSystem: get('system'),
          interest: get('priority'),
          remark: get('problem'),
        }),
      })
      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean
        error?: string
        message?: string
      }

      if (res.ok && data.success) {
        const agl = (window as unknown as { _agl?: unknown[][] })._agl
        if (Array.isArray(agl)) {
          agl.push(['track', ['success', { t: 3 }]])
        }
        setHint({
          msg: '已收到诊断需求，泊冉顾问会根据渠道结构、DMS/SFA现状、产销链路、质量追溯、费用规则、主数据质量和业财口径与您沟通。',
          type: 'success',
        })
        form.reset()
        setInvalidFields([])
      } else {
        setHint({ msg: data.error || data.message || '提交失败，请稍后重试。', type: 'error' })
      }
    } catch {
      setHint({ msg: '提交失败，请稍后重试。', type: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  const fieldClass = (name: string) =>
    invalidFields.includes(name) ? 'is-invalid' : undefined

  const sample = sampleData[activeSample]

  return (
    <main>
      {/* ---------- Hero ---------- */}
      <section className="hero" id="top">
        <div className="grid-bg" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="eyebrow">
              <span />
              CONSUMER GOODS · DIGITAL OPERATIONS · AI
            </div>
            <h1>
              <span>消费品行业</span>
              <span>数智化解决方案</span>
            </h1>
            <p className="hero-lead">
              打通 DMS 经销商协同、SFA 终端执行、订单、库存、产销计划、质量追溯、促销费用与财务数据，让消费品企业从“卖得多”走向“赚得清、供得稳、终端看得见”。
            </p>
            <p>
              面向食品饮料、美妆日化、家居服饰、连锁餐饮、新零售与电商业务，泊冉结合企业系统基础、业务流程与数据治理，帮企业建立从产品、生产供应、经销网络、终端执行、全渠道履约到会员运营的业财一体化经营闭环。
            </p>
            <div className="hero-actions">
              <a
                className="btn primary"
                href="#diagnosis"
                onClick={() => scrollToAnchor('#diagnosis')}
                data-track="cta_hero_diagnosis"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 5h16v14H4V5Zm3 3v2h10V8H7Zm0 4v2h7v-2H7Zm0 4v1h4v-1H7Z" />
                </svg>
                做一次消费品场景诊断
              </a>
              <a
                className="btn secondary"
                href="#samples"
                onClick={() => scrollToAnchor('#samples')}
                data-track="cta_hero_samples"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 5h18v4H3V5Zm0 6h8v8H3v-8Zm10 0h8v8h-8v-8Z" />
                </svg>
                查看样板场景
              </a>
            </div>
            <div className="hero-proof" aria-label="方案重点">
              <div>
                <strong>全渠道经营</strong>
                <span>B2B、B2C、B2b2C、直营、经销、平台电商与私域商城统一看数</span>
              </div>
              <div>
                <strong>DMS + SFA 融合</strong>
                <span>经销商订货、销售拜访、终端动销、陈列执行与渠道费用联动</span>
              </div>
              <div>
                <strong>质量业财联动</strong>
                <span>批次追溯、质检放行、成本核算、费用返利和应收凭证不再割裂</span>
              </div>
            </div>
          </div>

          <aside className="industry-console" aria-label="消费品经营驾驶舱示意">
            <div className="console-top">
              <div>
                <span className="console-label">Consumer Goods Command Center</span>
                <h2>从渠道订单到产销质量利润</h2>
              </div>
              <span className="status-dot">实时更新</span>
            </div>
            <div className="console-grid">
              <div className="metric-card">
                <span>全渠道订单</span>
                <strong>统一归集</strong>
                <b>DMS / 门店 / 电商</b>
              </div>
              <div className="metric-card">
                <span>终端执行</span>
                <strong>SFA 闭环</strong>
                <b>拜访 / 陈列 / 动销</b>
              </div>
              <div className="metric-card">
                <span>产销计划</span>
                <strong>协同排程</strong>
                <b>预测 / 物料 / 委外</b>
              </div>
              <div className="metric-card">
                <span>质量追溯</span>
                <strong>批次穿透</strong>
                <b>原料 / 生产 / 发货</b>
              </div>
            </div>
            <div className="console-flow" aria-label="业务流转">
              <div>终端</div>
              <i />
              <div>订货</div>
              <i />
              <div>产供</div>
              <i />
              <div>质检</div>
              <i />
              <div>财务</div>
            </div>
            <div className="console-panel">
              <div className="panel-title">
                <span>今日经营预警</span>
                <strong>AI 建议优先处理</strong>
              </div>
              <div className="alert-row warn">
                <span>华东 KA</span>
                <b>买赠政策费用超预算</b>
                <em>需复核</em>
              </div>
              <div className="alert-row ok">
                <span>线上旗舰店</span>
                <b>订单、账单、物流状态已匹配</b>
                <em>通过</em>
              </div>
              <div className="alert-row danger">
                <span>畅销 SKU</span>
                <b>上海仓安全库存低于阈值，需联动补货与委外排产</b>
                <em>补货</em>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ---------- TL;DR 一张图看懂 ---------- */}
      <section className="section answer" id="answer">
        <div className="section-head">
          <span>TL;DR · 一张图看懂</span>
          <h2>消费品数智化的核心，是把“人货场”和“产供销”变成一套可协同、可追溯、可核算的数据闭环</h2>
          <p>
            不是单点上一套系统，而是让渠道触点、DMS订货、SFA拜访、商品价格、需求计划、生产质量、订单履约、促销费用与财务结果在同一条链路里流转。
          </p>
        </div>
        <div className="answer-map" aria-label="消费品行业数智化流程图">
          <div>
            <b>01</b>
            <strong>连接触点</strong>
            <span>门店 / 经销 / SFA / 私域</span>
          </div>
          <i />
          <div>
            <b>02</b>
            <strong>统一规则</strong>
            <span>DMS / 商品 / 价格 / 促销</span>
          </div>
          <i />
          <div>
            <b>03</b>
            <strong>产销协同</strong>
            <span>预测 / 计划 / 采购 / 委外</span>
          </div>
          <i />
          <div>
            <b>04</b>
            <strong>质量追溯</strong>
            <span>批次 / 检验 / 放行 / 召回</span>
          </div>
          <i />
          <div className="is-result">
            <b>05</b>
            <strong>业财经营</strong>
            <span>收入 / 成本 / 费用 / 预警</span>
          </div>
        </div>
        <div className="answer-example">
          <strong>可以这样理解：</strong>
          一场渠道促销或新品铺货，从 SFA 终端反馈、DMS 经销商订货、销售预测、物料准备、生产或委外、质量放行、订单履约、费用结算到财务入账，系统自动沉淀同一套业务证据，管理层可以按品牌、区域、渠道、客户、终端、批次和 SKU 追踪真实 ROI。
        </div>
      </section>

      {/* ---------- 业务场景 ---------- */}
      <section className="section business" id="business">
        <div className="section-head compact">
          <span>业务场景</span>
          <h2>先把高频业务动作在线化，再把经营结果算清楚</h2>
          <p>消费品行业的系统价值，往往来自这些每天都在发生、但跨部门最容易断点的流程。</p>
        </div>
        <div className="business-grid">
          <article>
            <b>01</b>
            <h3>全渠道订单履约</h3>
            <p>直营门店、加盟商、经销商、平台电商、私域商城订单统一进入订单中心，按仓库、库存、物流和财务规则协同处理。</p>
            <span>订单归集 · 发货协同 · 物流对账</span>
          </article>
          <article>
            <b>02</b>
            <h3>价格促销与返利</h3>
            <p>把定价、促销、买赠、折扣、返利和客户费用从线下表格搬进流程，避免政策失控、重复核销和费用口径不一致。</p>
            <span>价盘控制 · 促销闭环 · 费用核销</span>
          </article>
          <article>
            <b>03</b>
            <h3>会员洞察与精准营销</h3>
            <p>统一会员、积分、卡券、钱包和消费行为数据，支持千人千面触达、复购分析和消费者生命周期经营。</p>
            <span>会员画像 · 自动营销 · 复购提升</span>
          </article>
          <article>
            <b>04</b>
            <h3>DMS 经销商协同</h3>
            <p>统一管理经销商、加盟商、代理商、协议、价盘、信用、订货、发货、库存和对账，让渠道订货与履约状态可追踪。</p>
            <span>渠道协议 · 在线订货 · 应收对账</span>
          </article>
          <article>
            <b>05</b>
            <h3>SFA 终端执行</h3>
            <p>围绕销售拜访、陈列检查、库存盘点、动销采集、竞品反馈和任务整改，把终端执行结果回流到促销、补货和经营分析。</p>
            <span>拜访计划 · 终端动销 · 任务闭环</span>
          </article>
          <article>
            <b>06</b>
            <h3>产销协同与计划执行</h3>
            <p>把销售预测、渠道订单、库存策略、采购计划、物料需求、生产或委外执行联动起来，减少畅销缺货和盲目备货并存的问题。</p>
            <span>需求计划 · 物料协同 · 委外排程</span>
          </article>
          <article>
            <b>07</b>
            <h3>质量管理与批次追溯</h3>
            <p>围绕原料、半成品、成品、委外加工和发货批次建立质量检验、放行、追溯和异常处理链路，支撑客诉召回与质量复盘。</p>
            <span>来料检验 · 批次放行 · 全程追溯</span>
          </article>
          <article>
            <b>08</b>
            <h3>业务财务一体核算</h3>
            <p>业务单据自动触发财务核算，实时分析收入、毛利、费用、应收、库存成本和现金流，让经营会议不再临时拉数。</p>
            <span>自动凭证 · 多维分析 · 经营预警</span>
          </article>
        </div>
      </section>

      {/* ---------- 行业痛点 ---------- */}
      <section className="section pains" id="pains">
        <div className="section-head compact">
          <span>行业痛点</span>
          <h2>增长压力不只在前端，真正拖慢消费品企业的是跨渠道、跨组织、跨财务口径的断点</h2>
        </div>
        <div className="pain-layout">
          <article>
            <strong>渠道多，规则散</strong>
            <p>B2B、B2C、平台电商、私域、直营、加盟和经销体系并行，DMS、SFA、价格、促销、库存和财务口径难统一。</p>
          </article>
          <article>
            <strong>终端远，执行弱</strong>
            <p>销售拜访、陈列检查、门店库存、竞品反馈和动销数据散在线下，促销政策是否真正落地很难及时验证。</p>
          </article>
          <article>
            <strong>促销多，费用难算</strong>
            <p>买赠、折扣、返利、客费、陈列费、活动费多头审批，事前预算、事中控制和事后核销脱节。</p>
          </article>
          <article>
            <strong>订单多，对账慢</strong>
            <p>多平台订单、退款、物流、账单、发票和收款需要人工比对，月底关账慢，差异追溯难。</p>
          </article>
          <article>
            <strong>库存多，周转低</strong>
            <p>畅销品缺货、慢销品积压、区域仓调拨不及时，销售预测和补货计划缺少统一数据依据。</p>
          </article>
          <article>
            <strong>产销脱节，响应慢</strong>
            <p>渠道需求变化传不到生产、委外和采购计划，需求计划、物料准备、产能排程和仓配履约靠人工反复协调。</p>
          </article>
          <article>
            <strong>质量散，追溯难</strong>
            <p>原料、生产、委外、质检、入库和发货批次分散记录，出现客诉或召回时难以快速定位责任批次和影响范围。</p>
          </article>
          <article>
            <strong>会员多，洞察浅</strong>
            <p>会员、门店、商品、交易和触达数据分散，营销动作难以精细评估，复购和客单价提升缺抓手。</p>
          </article>
          <article>
            <strong>报表多，决策慢</strong>
            <p>品牌、区域、渠道、客户、SKU 的毛利、费用和现金流分析靠人工拼表，经营异常发现太晚。</p>
          </article>
        </div>
      </section>

      {/* ---------- 解决方案模块 ---------- */}
      <section className="section modules" id="modules">
        <div className="section-head">
          <span>解决方案模块</span>
          <h2>用泊冉交付方法，把数智化能力装进消费品经营链路</h2>
          <p>以下链接均来自泊冉官网当前可访问页面，便于后续和官网导航、产品中心及解决方案中心自然衔接。</p>
        </div>
        <div className="module-grid">
          <a href="https://www.iboran.com/solution" data-track="module_business_core">
            <small>Business Core</small>
            <h3>业务在线化底座</h3>
            <p>承接财务、供应链、营销、采购、协同等核心应用，作为消费品企业业务在线与数据驱动的主平台。</p>
            <span>了解更多</span>
          </a>
          <a href="https://www.iboran.com/solution" data-track="module_digital_platform">
            <small>Digital Base</small>
            <h3>集团化数智平台</h3>
            <p>支撑集团化、多组织、流程、权限、集成、数据和 AI 能力，适合更复杂的消费品集团管控。</p>
            <span>了解更多</span>
          </a>
          <a href="https://www.iboran.com/solution/business/revenue-cloud" data-track="module_revenue_cloud">
            <small>Growth</small>
            <h3>DMS / SFA 渠道增长</h3>
            <p>围绕经销商订货、销售拜访、终端动销、价格促销、会员和渠道费用，建立从终端执行到经营结果的闭环。</p>
            <span>了解更多</span>
          </a>
          <a href="https://www.iboran.com/solution/business/s2p" data-track="module_s2p">
            <small>Supply</small>
            <h3>供应链管理与 S2P</h3>
            <p>覆盖采购协同、供应商管理、库存管理、供应链控制与计划协同，支撑从销售需求到采购供应的敏捷响应。</p>
            <span>了解更多</span>
          </a>
          <a href="https://www.iboran.com/solution" data-track="module_production_quality">
            <small>Production &amp; Quality</small>
            <h3>生产协同与质量追溯</h3>
            <p>面向自制、委外、批次、质检和放行场景，打通计划执行、生产入库、质量异常与追溯分析。</p>
            <span>了解更多</span>
          </a>
          <a href="https://www.iboran.com/solution/business/finance-cloud" data-track="module_finance_cloud">
            <small>Finance</small>
            <h3>财务云与业财一体</h3>
            <p>让业务单据、费用、应收、应付、成本、凭证和报表打通，支撑多维经营分析。</p>
            <span>了解更多</span>
          </a>
          <a href="https://www.iboran.com/products/bi-data" data-track="module_bi">
            <small>Analytics</small>
            <h3>BI 数据中台</h3>
            <p>按品牌、渠道、区域、客户、门店、SKU、费用和毛利建立经营指标体系与可视化看板。</p>
            <span>了解更多</span>
          </a>
          <a href="https://www.iboran.com/solution/business/aip-intelligent-apps" data-track="module_ai">
            <small>AI</small>
            <h3>AI 智能应用</h3>
            <p>接入智能问数、库存预警、销售达成分析、会员洞察、费用风险提醒与业务助手。</p>
            <span>了解更多</span>
          </a>
          <a href="https://www.iboran.com/solution/business/digital-modeling" data-track="module_modeling">
            <small>Modeling</small>
            <h3>数字化建模</h3>
            <p>补齐消费品企业特有的渠道政策、费用规则、终端数据、主数据和流程扩展场景。</p>
            <span>了解更多</span>
          </a>
        </div>
      </section>

      {/* ---------- 样板场景 ---------- */}
      <section className="section samples" id="samples">
        <div className="section-head compact">
          <span>样板场景</span>
          <h2>把“大方案”拆成可以先跑通的小样板</h2>
          <p>建议优先选择高频、规则清晰、数据可取、结果容易验证的场景，先做出业务体感。</p>
        </div>
        <div className="sample-layout">
          <div className="sample-tabs" role="tablist" aria-label="消费品样板场景">
            {sampleTabs.map((tab) => (
              <button
                key={tab.key}
                className={tab.key === activeSample ? 'active' : undefined}
                type="button"
                role="tab"
                aria-selected={tab.key === activeSample}
                onClick={() => handleSampleTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <article className="sample-detail" aria-live="polite">
            <div className="sample-topline">
              <div className="sample-kicker">{sample.kicker}</div>
              <h3>{sample.title}</h3>
              <p>{sample.tagline}</p>
            </div>
            <div className="sample-context">
              <div>
                <strong>什么时候用</strong>
                <span>{compactText(sample.when)}</span>
              </div>
              <div>
                <strong>用户怎么开始</strong>
                <span>{compactText(sample.start)}</span>
              </div>
            </div>
            <div className="sample-mini-flow" aria-label={`${sample.title}流程`}>
              {sample.flow.map((item, index) => (
                <div key={item}>
                  <b>{String(index + 1).padStart(2, '0')}</b>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="sample-result" aria-label={`${sample.title}关键结果`}>
              {sample.results.map((item) => (
                <div key={item}>
                  <strong>{item}</strong>
                  <span>可作为第一阶段验收指标</span>
                </div>
              ))}
            </div>
            <details className="sample-more">
              <summary>展开样板说明</summary>
              <p>{sample.detail}</p>
            </details>
          </article>
        </div>
      </section>

      {/* ---------- 官网案例入口 ---------- */}
      <section className="section cases" id="cases">
        <div className="section-head compact">
          <span>官网案例入口</span>
          <h2>消费品与新零售客户，可以继续查看泊冉官网真实案例</h2>
          <p>以下案例链接来自官网当前页面，可作为页面上线后的延展阅读入口。</p>
        </div>
        <div className="case-strip">
          <a href="https://www.iboran.com/cases?category=retail" data-track="case_retail_category">
            <span>新零售案例合集</span>
            <b>查看行业案例</b>
          </a>
          <a href="https://www.iboran.com/cases/han-bao-wang" data-track="case_burger_king">
            <img src="https://www.iboran.com/logos/burger-king.svg" alt="汉堡王" />
            <span>汉堡王</span>
          </a>
          <a href="https://www.iboran.com/cases/mstand" data-track="case_mstand">
            <img src="https://www.iboran.com/logos/mstand.png" alt="M Stand" />
            <span>M Stand</span>
          </a>
          <a href="https://www.iboran.com/cases/tims" data-track="case_tims">
            <img src="https://www.iboran.com/logos/tim-hortons.svg" alt="Tim Hortons" />
            <span>Tim Hortons</span>
          </a>
          <a href="https://www.iboran.com/cases/lin-qing-xuan" data-track="case_linqingxuan">
            <img src="https://www.iboran.com/logos/lin-qing-xuan.png" alt="林清轩" />
            <span>林清轩</span>
          </a>
          <a href="https://www.iboran.com/cases/nanji-ecommerce" data-track="case_nanji">
            <img src="https://www.iboran.com/logos/nanji.png" alt="南极电商" />
            <span>南极电商</span>
          </a>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="section faq" id="faq">
        <div className="section-head compact">
          <span>FAQ</span>
          <h2>消费品企业评估数智化方案时，通常先问这些问题</h2>
        </div>
        <div className="faq-list">
          {faqItems.map((item, index) => {
            const open = openFaqs.has(index)
            return (
              <article key={item.q} className={open ? 'faq-item is-open' : 'faq-item'}>
                <button type="button" aria-expanded={open} onClick={() => toggleFaq(index)}>
                  <span>{item.q}</span>
                  <b />
                </button>
                <p>{item.a}</p>
              </article>
            )
          })}
        </div>
      </section>

      {/* ---------- 诊断表单 ---------- */}
      <section className="section diagnosis" id="diagnosis">
        <div className="diagnosis-copy">
          <span>Consumer Goods Diagnosis</span>
          <h2>先做一次消费品行业数智化诊断</h2>
          <p>
            把渠道、商品、订单、库存、产销计划、质量追溯、费用、会员和财务数据摊开看，判断第一阶段最值得先落地的 1-3 个场景。
          </p>
          <div className="diagnosis-checks">
            <div>
              <strong>渠道复杂吗？</strong>
              <span>直营、加盟、经销、平台电商、私域是否并行</span>
            </div>
            <div>
              <strong>费用可控吗？</strong>
              <span>促销、返利、客费、陈列费是否能闭环核销</span>
            </div>
            <div>
              <strong>产销协同吗？</strong>
              <span>预测、采购、委外、生产、质检、入库是否能联动</span>
            </div>
          </div>
        </div>
        <form className="lead-form" noValidate ref={formRef} onSubmit={handleSubmit}>
          <h3>预约专家评估</h3>
          <div className="field-grid">
            <label>
              <span>
                姓名 <b>*</b>
              </span>
              <input name="name" type="text" autoComplete="name" required className={fieldClass('name')} />
            </label>
            <label>
              <span>
                公司 <b>*</b>
              </span>
              <input
                name="company"
                type="text"
                autoComplete="organization"
                required
                className={fieldClass('company')}
              />
            </label>
          </div>
          <div className="field-grid">
            <label>
              <span>
                手机号 <b>*</b>
              </span>
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                className={fieldClass('phone')}
              />
            </label>
            <label>
              <span>细分行业</span>
              <select name="segment">
                <option value="">请选择</option>
                <option>食品饮料</option>
                <option>美妆日化</option>
                <option>服饰鞋包</option>
                <option>家居家电</option>
                <option>连锁餐饮</option>
                <option>新零售 / 电商</option>
              </select>
            </label>
          </div>
          <div className="field-grid">
            <label>
              <span>当前系统</span>
              <input
                name="system"
                type="text"
                placeholder="例如：现有业务系统 / 进销存 / 电商 OMS"
              />
            </label>
            <label>
              <span>优先场景</span>
              <select name="priority">
                <option value="">请选择</option>
                <option>全渠道订单履约</option>
                <option>DMS 经销商协同</option>
                <option>SFA 终端执行</option>
                <option>价格促销与费用核销</option>
                <option>经销商渠道管理</option>
                <option>产销计划与委外协同</option>
                <option>质量管理与批次追溯</option>
                <option>库存补货与调拨</option>
                <option>会员精细运营</option>
                <option>业财一体化分析</option>
              </select>
            </label>
          </div>
          <label>
            <span>当前最想解决的问题</span>
            <textarea
              name="problem"
              rows={4}
              placeholder="例如：DMS 订货不规范、SFA 拜访数据难用、促销费用核销慢、经销商库存看不清"
            />
          </label>
          <p className={`form-hint ${hint.type ? `is-${hint.type}` : ''}`} role="status" aria-live="polite">
            {hint.msg}
          </p>
          <button className="modal-submit" type="submit" disabled={submitting} data-track="form_submit_click">
            提交诊断需求
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h12.2l-5.1-5.1L14 5l8 8-8 8-1.9-1.9 5.1-5.1H5v-2Z" />
            </svg>
          </button>
        </form>
      </section>
    </main>
  )
}
