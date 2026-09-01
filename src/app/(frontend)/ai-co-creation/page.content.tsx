'use client'

import React, { useState, useCallback } from 'react'
import { useAttribution } from '@/providers/Attribution'
import { getClientSideURL } from '@/utilities/getURL'
import './ai-co-creation.css'
import {
  scenarioData,
  industryData,
  faqItems,
  scenarioKeys,
  industryKeys,
  scenarioTabLabels,
  industryTabLabels,
} from './data'

/* ================================================================
   AI 数字员工共创方案 — Page Content (converted from static HTML)
   ================================================================ */

export function AiCoCreationPageContent() {
  const [activeScenario, setActiveScenario] = useState<string>(scenarioKeys[0])
  const [activeIndustry, setActiveIndustry] = useState<string>(industryKeys[0])

  return (
    <div className="ai-scope">
      <HeroSection />
      <AnswerSection />
      <ChainSection />
      <ArchitectureSection />
      <ScenarioSection active={activeScenario} setActive={setActiveScenario} />
      <IndustrySection active={activeIndustry} setActive={setActiveIndustry} />
      <GovernanceSection />
      <FAQSection />
      <DiagnosisSection />
    </div>
  )
}

/* ── Hero ── */
function HeroSection() {
  return (
    <section className="hero">
      <div className="grid-bg" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-copy">
          <div className="eyebrow">
            <span />
            AI DIGITAL EMPLOYEE · BUSINESS SYSTEM · INSIGHT
          </div>
          <h1>AI数字员工：不只是问答，而是把业务动作做完</h1>
          <p className="hero-lead">AI 接任务，接口调业务，智能问数看经营，系统落单据。</p>
          <p>先从报价、读单、补货、费用预审、经营问数等高频动作试点。</p>
          <div className="hero-actions">
            <a className="btn primary" href="#diagnosis">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 6h16v10H7l-3 3V6Zm4 3v2h8V9H8Zm0 4v2h5v-2H8Z" />
              </svg>
              预约 AI 业务场景诊断
            </a>
            <a className="btn secondary" href="#scenarios">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 5h16v4H4V5Zm0 6h7v8H4v-8Zm9 0h7v8h-7v-8Z" />
              </svg>
              获取 AI 数字员工样板清单
            </a>
          </div>
          <p className="microcopy">先选一个高频、低风险、可验证的动作做样板。</p>
          <div className="hero-proof" aria-label="核心价值">
            <div>
              <strong>读得懂文档</strong>
              <span>Excel、PDF、图片、合同、邮件、采购单与聊天记录</span>
            </div>
            <div>
              <strong>算得清业务</strong>
              <span>价格、毛利、税额、库存、费用、信用与风险</span>
            </div>
            <div>
              <strong>落得进系统</strong>
              <span>报价单、销售订单、服务工单、预审与待办</span>
            </div>
          </div>
        </div>

        <div className="ai-console" aria-label="AI数字员工业务执行示意">
          <div className="console-top">
            <div>
              <span className="console-label">AI Command Center</span>
              <h2>从采购单到业务草稿</h2>
            </div>
            <span className="status-dot">可控执行中</span>
          </div>
          <div className="task-card">
            <span>员工输入</span>
            <p>“把这份客户采购单生成销售订单，库存不足的行先标红。”</p>
          </div>
          <div className="execution-flow" aria-label="执行链路">
            <div className="flow-node active">读资料</div>
            <div className="flow-line" />
            <div className="flow-node">配主数据</div>
            <div className="flow-line" />
            <div className="flow-node">算结果</div>
            <div className="flow-line" />
            <div className="flow-node">调接口</div>
            <div className="flow-line" />
            <div className="flow-node">出草稿</div>
          </div>
          <div className="console-body">
            <div className="draft-panel">
              <div className="panel-title">
                <span>销售订单草稿</span>
                <strong>需人工确认</strong>
              </div>
              <div className="draft-row ok">
                <span>客户</span>
                <b>上海某消费品客户</b>
                <em>已匹配</em>
              </div>
              <div className="draft-row ok">
                <span>物料</span>
                <b>500ml 玻璃瓶</b>
                <em>已匹配</em>
              </div>
              <div className="draft-row warn">
                <span>库存</span>
                <b>可用 420 箱 / 需求 500 箱</b>
                <em>预警</em>
              </div>
              <div className="draft-row ok">
                <span>毛利</span>
                <b>目标 18% / 测算 21.6%</b>
                <em>通过</em>
              </div>
            </div>
            <div className="agent-panel">
              <span>智能体协同</span>
              <ul>
                <li>AI 快速报价</li>
                <li>AI 读单建单</li>
                <li>AI 费用预审</li>
                <li>AI 经营问数</li>
              </ul>
            </div>
          </div>
          <div className="console-alert">
            经营预警：本周 3 张低毛利报价、2 个库存不足订单、1 个超信用额度客户需跟进。
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Answer (flow overview) ── */
function AnswerSection() {
  return (
    <section className="section answer" id="answer">
      <div className="section-head">
        <span>流程总览</span>
        <h2>AI 数字员工进入业务流程的执行路径</h2>
        <p>默认先出草稿、待办和预警，关键动作由授权人员确认。</p>
      </div>
      <div className="answer-map" aria-label="AI数字员工业务闭环图">
        <div>
          <b>01</b>
          <strong>接任务</strong>
          <span>业务指令 / 文件 / 群消息</span>
        </div>
        <i />
        <div>
          <b>02</b>
          <strong>读资料</strong>
          <span>客户 / 商品 / 数量 / 交期</span>
        </div>
        <i />
        <div>
          <b>03</b>
          <strong>调业务</strong>
          <span>价格 / 库存 / 信用 / 流程</span>
        </div>
        <i />
        <div className="is-result">
          <b>04</b>
          <strong>出结果</strong>
          <span>草稿 / 待办 / 预警</span>
        </div>
      </div>
      <div className="answer-example">
        <strong>典型示例：</strong>
        客户发来采购单，AI 先读出客户、商品、数量和交期，再查价格、库存和信用，最后生成销售订单草稿，交给授权人员确认。
      </div>
      <div className="answer-grid">
        <article>
          <h3>不是聊天框</h3>
          <p>是业务执行助手。</p>
        </article>
        <article>
          <h3>不是自动生效</h3>
          <p>先出草稿，人工确认。</p>
        </article>
        <article>
          <h3>业务连接负责动作</h3>
          <p>查数据、建草稿、推待办。</p>
        </article>
        <article>
          <h3>智能问数负责分析</h3>
          <p>解释指标，主动预警。</p>
        </article>
      </div>
    </section>
  )
}

/* ── Chain (7 key nodes) ── */
function ChainSection() {
  const nodes = [
    ['01', '输入', '业务指令 / 附件'],
    ['02', '读取', '字段识别'],
    ['03', '匹配', '客户 / 物料'],
    ['04', '测算', '价格 / 库存 / 毛利'],
    ['05', '调用', '业务接口'],
    ['06', '草稿', '单据 / 待办'],
    ['07', '预警', '智能问数'],
  ]
  return (
    <section className="section chain" id="chain">
      <div className="section-head compact">
        <span>受控执行路径</span>
        <h2>从业务指令到系统结果的 7 个关键节点</h2>
        <p>把复杂流程拆成可验证节点，默认不直接生效。</p>
      </div>
      <div className="chain-grid">
        {nodes.map(([n, t, d]) => (
          <article key={n}>
            <b>{n}</b>
            <h3>{t}</h3>
            <p>{d}</p>
          </article>
        ))}
      </div>
      <div className="chain-example">
        <strong>例：</strong>“把这份采购单生成销售订单，库存不足的行先标红。”
        <span>AI 输出的是草稿和异常提示，不直接替代审批。</span>
      </div>
    </section>
  )
}

/* ── Architecture ── */
function ArchitectureSection() {
  const layers = [
    ['AI数字员工', '接任务', '自然语言 / Excel / PDF / 图片 / 群消息'],
    ['业务系统连接 / MCP', '调业务', '客户 / 物料 / 库存 / 价格 / 单据'],
    ['智能问数 / BI', '问数据', '指标解释 / 异常归因 / 风险推送'],
    ['ERP / OA / CRM / 业务系统', '落流程', '主数据 / 审批 / 库存 / 财务 / 留痕'],
  ]
  return (
    <section className="section architecture" id="architecture">
      <div className="arch-copy">
        <span>四层能力架构</span>
        <h2>数字员工接任务，业务接口调流程，智能问数看经营，企业系统沉淀结果</h2>
        <p>四层各司其职，避免把 AI 说成万能自动化。</p>
      </div>
      <div className="architecture-grid" aria-label="AI数字员工能力架构">
        {layers.map(([label, title, desc]) => (
          <article key={title}>
            <b>{label}</b>
            <h3>{title}</h3>
            <p>{desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ── Scenarios (tabbed) ── */
function ScenarioSection({
  active,
  setActive,
}: {
  active: string
  setActive: (k: string) => void
}) {
  const data = scenarioData[active]!
  return (
    <section className="section scenarios" id="scenarios">
      <div className="section-head compact">
        <span>明星样板场景</span>
        <h2>先从简单、重复、低风险的动作开始，让业务人员快速感受到 AI 价值</h2>
        <p>默认看流程和结果，完整说明可展开。</p>
      </div>
      <div className="scenario-layout">
        <div className="scenario-tabs" role="tablist" aria-label="AI数字员工样板场景">
          {scenarioKeys.map(k => (
            <button
              key={k}
              type="button"
              className={active === k ? 'active' : ''}
              onClick={() => setActive(k)}
              role="tab"
              aria-selected={active === k}
            >
              {scenarioTabLabels[k]}
            </button>
          ))}
        </div>
        <article className="scenario-detail" aria-live="polite">
          <div className="scenario-topline">
            <div className="scenario-kicker">{data.kicker}</div>
            <h3>{data.title}</h3>
            <p className="scenario-tagline">{data.tagline}</p>
          </div>
          <div className="scenario-context">
            <div>
              <strong>什么时候用</strong>
              <span>{data.fields.find(([l]) => l === '业务痛点')?.[1] || ''}</span>
            </div>
            <div>
              <strong>用户怎么开始</strong>
              <span>{data.fields.find(([l]) => l === '员工怎么用')?.[1] || ''}</span>
            </div>
          </div>
          <div className="scenario-badges" aria-label="关键结果">
            {data.highlights.map(h => (
              <span key={h}>{h}</span>
            ))}
          </div>
          <div className="scenario-mini-flow" aria-label="场景流程">
            {data.flow.map((f, i) => (
              <div key={f} className={i === data.flow.length - 1 ? 'is-result' : ''}>
                <b>{String(i + 1).padStart(2, '0')}</b>
                <span>{f}</span>
              </div>
            ))}
          </div>
          <details className="scenario-more">
            <summary>展开完整场景说明</summary>
            <div className="scenario-columns">
              {data.fields.map(([label, body]) => (
                <div key={label}>
                  <strong>{label}</strong>
                  <span>{body}</span>
                </div>
              ))}
            </div>
          </details>
        </article>
      </div>
    </section>
  )
}

/* ── Industries (tabbed) ── */
function IndustrySection({
  active,
  setActive,
}: {
  active: string
  setActive: (k: string) => void
}) {
  const data = industryData[active]!
  const chips = data.title.replace('优先试点：', '').split('、')
  return (
    <section className="section industries" id="industries">
      <div className="section-head">
        <span>行业试点路径</span>
        <h2>不同行业先从不同的简单业务动作开始</h2>
        <p>避免一上来讲复杂大模型工程，先把客户最熟悉、最高频、最容易验证的业务动作做成样板。</p>
      </div>
      <div className="industry-layout">
        <div className="industry-tabs" role="tablist" aria-label="行业场景">
          {industryKeys.map(k => (
            <button
              key={k}
              type="button"
              className={active === k ? 'active' : ''}
              onClick={() => setActive(k)}
            >
              {industryTabLabels[k]}
            </button>
          ))}
        </div>
        <article className="industry-detail" aria-live="polite">
          <span>{data.label}</span>
          <h3>优先试点场景</h3>
          <div className="industry-chips">
            {chips.map(c => (
              <em key={c}>{c}</em>
            ))}
          </div>
          <p>{data.body}</p>
          <details className="industry-more">
            <summary>查看行业说明与关键词</summary>
            <p>{data.body}</p>
            <b>{data.keywords}</b>
          </details>
        </article>
      </div>
    </section>
  )
}

/* ── Governance ── */
function GovernanceSection() {
  return (
    <section className="section governance" id="governance">
      <div className="governance-panel">
        <div>
          <span>治理边界与风险控制</span>
          <h2>AI 可以做很多事，但关键动作必须可控</h2>
          <p>
            泊冉建议第一批 AI 数字员工试点遵循：先简单，后复杂；先读文档，后写系统；先生成草稿，后自动执行；先人工确认，后流程闭环。
          </p>
        </div>
        <div className="governance-grid">
          <article>
            <strong>草稿优先</strong>
            <p>先生成草稿、建议、测算、报告和预警，降低试点风险。</p>
          </article>
          <article>
            <strong>授权确认</strong>
            <p>涉及审批、生效、财务口径、权限体系和高风险写回的动作，由授权人员确认。</p>
          </article>
          <article>
            <strong>权限继承</strong>
            <p>AI 调用系统能力时遵循企业现有组织、岗位、角色和数据权限。</p>
          </article>
          <article>
            <strong>证据留痕</strong>
            <p>输入、识别、测算、调用、确认与结果进入流程，关键节点可追溯。</p>
          </article>
        </div>
      </div>
    </section>
  )
}

/* ── FAQ ── */
function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  return (
    <section className="section faq" id="faq">
      <div className="section-head compact">
        <span>FAQ</span>
        <h2>企业评估 AI 数字员工时，通常先问这些问题</h2>
      </div>
      <div className="faq-list">
        {faqItems.map((item, i) => (
          <article key={i} className={`faq-item ${openIdx === i ? 'is-open' : ''}`}>
            <button
              type="button"
              aria-expanded={openIdx === i}
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
            >
              <span>{item.q}</span>
              <b />
            </button>
            <p>{item.a}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ── Diagnosis Form ── */
function DiagnosisSection() {
  const [loading, setLoading] = useState(false)
  const [hint, setHint] = useState({
    msg: '提交后，泊冉顾问将优先判断：场景是否高频、数据是否可取、流程是否能闭环、是否适合作为第一批 AI 数字员工试点。',
    type: '',
  })
  const attribution = useAttribution()

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const form = e.currentTarget
      const fd = new FormData(form)
      const name = (fd.get('name') as string || '').trim()
      const company = (fd.get('company') as string || '').trim()
      const phone = (fd.get('phone') as string || '').trim()
      if (!name || !company || !phone) {
        setHint({ msg: '请先补充姓名、公司名称和手机号。', type: 'error' })
        return
      }
      setLoading(true)
      setHint({ msg: '', type: '' })
      try {
        const notes = [
          `行业: ${fd.get('industry') || '未选择'}`,
          `当前系统: ${fd.get('system') || '未填写'}`,
          `协同工具: ${fd.get('collaboration') || '未选择'}`,
          `业务问题: ${fd.get('problem') || '无'}`,
        ].join('\n')

        const res = await fetch(`${getClientSideURL()}/api/leads`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            company,
            phone,
            source: 'AI数字员工共创方案',
            sourcePageUrl: typeof window !== 'undefined' ? window.location.href : '',
            notes,
            utmData: attribution
              ? {
                  utm_source: attribution.utm_source || '',
                  utm_medium: attribution.utm_medium || '',
                  utm_campaign: attribution.utm_campaign || '',
                  referrer: attribution.referrer || '',
                  landingPage: attribution.landing_page || '',
                }
              : undefined,
          }),
        })
        if (!res.ok) throw new Error('提交失败')
        if (typeof window !== 'undefined' && window._agl) {
          window._agl.push(['track', ['success', { t: 3 }]])
        }
        setHint({
          msg: '已收到诊断需求，泊冉顾问会根据场景高频度、数据可取性和流程闭环条件与您沟通。',
          type: 'success',
        })
        form.reset()
      } catch {
        setHint({ msg: '提交失败，请稍后再试或致电 400-9955-161。', type: 'error' })
      } finally {
        setLoading(false)
      }
    },
    [attribution],
  )

  return (
    <section className="section diagnosis" id="diagnosis">
      <div className="diagnosis-copy">
        <span>AI Co-Creation Lab</span>
        <h2>你的企业，第一位 AI 数字员工适合放在哪个岗位？</h2>
        <p>
          可以先从一个简单、重复、低风险的场景开始：客户采购单转销售订单、询价单快速报价、包装箱规测算、门店要货转调拨、发票报销预审、客户邮件转工单、经营指标智能问数、库存 / 毛利 / 费用异常预警。
        </p>
        <div className="diagnosis-checks">
          <div>
            <strong>高频吗？</strong>
            <span>每天或每周反复发生</span>
          </div>
          <div>
            <strong>可取数吗？</strong>
            <span>客户、物料、价格、库存有系统数据</span>
          </div>
          <div>
            <strong>能闭环吗？</strong>
            <span>草稿、确认、审批、预警路径清晰</span>
          </div>
        </div>
      </div>
      <form className="lead-form" noValidate onSubmit={handleSubmit}>
        <h3>预约 AI 业务场景诊断</h3>
        <div className="field-grid">
          <label>
            <span>
              姓名 <b>*</b>
            </span>
            <input name="name" type="text" autoComplete="name" required />
          </label>
          <label>
            <span>
              公司 <b>*</b>
            </span>
            <input name="company" type="text" autoComplete="organization" required />
          </label>
        </div>
        <label>
          <span>
            手机号 <b>*</b>
          </span>
          <input name="phone" type="tel" autoComplete="tel" required />
        </label>
        <div className="field-grid">
          <label>
            <span>行业</span>
            <select name="industry">
              <option value="">请选择</option>
              <option>制造业</option>
              <option>消费品</option>
              <option>医药医疗</option>
              <option>连锁零售</option>
              <option>跨境电商</option>
              <option>现代服务</option>
              <option>集团 / 财务共享</option>
            </select>
          </label>
          <label>
            <span>当前使用系统</span>
            <input name="system" type="text" placeholder="ERP / OA / CRM / MES / 其他" />
          </label>
        </div>
        <label>
          <span>当前协同工具</span>
          <select name="collaboration">
            <option value="">请选择</option>
            <option>企业微信</option>
            <option>飞书</option>
            <option>钉钉</option>
            <option>其他</option>
          </select>
        </label>
        <label>
          <span>最想解决的业务问题</span>
          <textarea
            name="problem"
            rows={4}
            placeholder="例如：客户采购单录入太慢、销售报价要反复查价、门店补货靠人工判断"
          />
        </label>
        <p
          className={`form-hint ${hint.type === 'error' ? 'is-error' : ''} ${hint.type === 'success' ? 'is-success' : ''}`}
          role="status"
          aria-live="polite"
        >
          {hint.msg}
        </p>
        <button className="modal-submit" type="submit" disabled={loading}>
          {loading ? '提交中...' : '提交诊断需求'}
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h12.2l-5.1-5.1L14 5l8 8-8 8-1.9-1.9 5.1-5.1H5v-2Z" />
          </svg>
        </button>
      </form>
    </section>
  )
}
