'use client'

import React, { useState, useEffect } from 'react'
import './yonsuite.css'
import { useAttribution } from '@/providers/Attribution'
import { faqItems, industries } from './data'

export const YonsuiteContent: React.FC = () => {
  const attribution = useAttribution()
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [activeIndustry, setActiveIndustry] = useState<string>('manufacturing')
  const [formHint, setFormHint] = useState('提交后由泊冉顾问联系，不做无效打扰。')
  const [formSubmitting, setFormSubmitting] = useState(false)

  const handleLeadFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const contact = (formData.get('contact') || '').toString().trim()
    const company = (formData.get('company') || '').toString().trim()
    const rawPhone = (formData.get('phone') || '').toString().trim()
    const digits = rawPhone.replace(/[\s-]/g, '').replace(/^\+?86/, '')
    const phone = digits.match(/^1[3-9]\d{9}$/)?.[0] || ''

    if (!company || !contact) {
      setFormHint('请填写公司名称和联系人。')
      return
    }
    if (!phone) {
      setFormHint('请填写 11 位手机号，便于泊冉顾问与您联系。')
      return
    }

    const remarkParts: string[] = []
    const city = (formData.get('city') || '').toString().trim()
    if (city) remarkParts.push(`所在城市: ${city}`)
    const industry = (formData.get('industry') || '').toString().trim()
    if (industry) remarkParts.push(`所属行业: ${industry}`)
    const companySize = (formData.get('company_size') || '').toString().trim()
    if (companySize) remarkParts.push(`企业规模: ${companySize}`)
    const launchTime = (formData.get('launch_time') || '').toString().trim()
    if (launchTime) remarkParts.push(`计划上线: ${launchTime}`)
    const problem = (formData.get('problem') || '').toString().trim()
    if (problem) remarkParts.push(`当前问题: ${problem}`)
    const description = (formData.get('description') || '').toString().trim()
    if (description) remarkParts.push(`需求说明: ${description}`)
    const title = (formData.get('title') || '').toString().trim()
    if (title) remarkParts.push(`联系人职位: ${title}`)

    const hasYonyou = (formData.get('has_yonyou') || '').toString().trim()
    const currentSystemParts = [hasYonyou, (formData.get('current_system') || '').toString().trim()].filter(Boolean)

    const data = {
      name: contact,
      phone,
      company,
      currentSystem: currentSystemParts.join('；') || undefined,
      interest: (formData.get('focus_scene') || '').toString().trim() || undefined,
      remark: remarkParts.join('\n'),
      source: '用友YonSuite',
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

    setFormSubmitting(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setFormHint('已收到YonSuite咨询需求，泊冉顾问会结合行业、当前系统和关注场景与您沟通。')
        form.reset()
      } else if (res.status === 429) {
        setFormHint('您刚刚提交过，请稍后再试。')
      } else {
        setFormHint('提交失败，请重试或直接拨打 400-9955-161。')
      }
    } catch (_err) {
      setFormHint('网络错误，请稍后重试。')
    } finally {
      setFormSubmitting(false)
    }
  }

  return (
    <div className="yonsuite-scope">
<section className="hero" id="top">
        <div className="grid-bg" aria-hidden="true"></div>
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="eyebrow"><span></span>One AI-World · One YonSuite</div>
            <h1>用友YonSuite：<span>AI时代成长型企业</span><span>一体化数智平台</span></h1>
            <p className="hero-lead">从业务在线，到数据驱动，再到智能运营</p>
            <p className="hero-desc">
              泊冉软件基于用友YonSuite，为成长型企业提供财务、人力、供应链、营销、采购、制造、研发、项目、资产、协同一体化的数智化落地服务。
            </p>
            <div className="value-tags" aria-label="核心价值标签">
              <span>一体化SaaS全场景</span>
              <span>企业AI嵌入业务流程</span>
              <span>九类行业场景</span>
              <span>泊冉顾问式实施</span>
            </div>
            <div className="hero-actions">
              <a className="btn primary" href="#diagnosis" data-scroll-target data-track="yonsuite_hero_cta_click" data-cta-mode="consult">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4V5Zm3 3v2h10V8H7Zm0 4v2h7v-2H7Zm0 4v1h4v-1H7Z" /></svg>
                预约YonSuite方案咨询
              </a>
              <a className="btn secondary" href="#product-matrix" data-scroll-target data-track="yonsuite_hero_cta_click" data-cta-mode="capability-list">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" /></svg>
                获取产品能力清单
              </a>
            </div>
            <p className="microcopy">用友提供平台，泊冉负责让平台跑进企业真实业务流程。</p>
            <div className="hero-proof" aria-label="YonSuite专题核心信号">
              <div><strong>10大能力域</strong><span>财务、人力、营销、采购、供应链、制造、研发、项目、资产、协同</span></div>
              <div><strong>9类行业路径</strong><span>制造、服务、医药、消费、IP运营、新能源、新材料、芯片、跨境</span></div>
              <div><strong>AI场景共创</strong><span>读单、问数、预警、待办进入业务流程</span></div>
            </div>
          </div>

          <aside className="hero-console" aria-label="YonSuite一体化业务驾驶舱示意">
            <div className="console-top">
              <div>
                <span>YonSuite Control Tower</span>
                <h2>一体化SaaS闭环</h2>
              </div>
              <b>智能预警中</b>
            </div>
            <div className="suite-map">
              <div>财务</div>
              <div>人力</div>
              <div>营销</div>
              <div>采购</div>
              <div>供应链</div>
              <div>制造</div>
              <div>研发</div>
              <div>项目</div>
              <div>资产</div>
              <div>协同</div>
            </div>
            <div className="console-flow" aria-label="从业务在线到智能运营">
              <article><span>业务在线</span><strong>单据、流程、组织、权限</strong></article>
              <i></i>
              <article><span>数据驱动</span><strong>指标、利润、库存、现金流</strong></article>
              <i></i>
              <article><span>智能运营</span><strong>ChatBI、智能体、预警</strong></article>
            </div>
            <div className="console-alert">示例：AI识别低毛利报价、库存缺口和费用异常，形成分析建议和跟进任务，推动业务团队快速处理。</div>
          </aside>
        </div>
      </section>

      <section className="section direct-answer" id="direct-answer">
        <div className="section-head compact">
          <span>增长信号</span>
          <h2>当业务开始跑快，系统却开始跟不上</h2>
          <p>很多企业不是缺一个新工具，而是在增长过程中逐渐出现口径不一、流程断点、数据滞后和协同成本。先看清这些信号，再判断YonSuite从哪里切入。</p>
        </div>
        <div className="answer-cards">
          <article>
            <h3>月底不是关账，而是在找口径</h3>
            <p>订单、费用、开票、回款和库存各有台账，财务花时间追数据，管理层看到结果已经滞后。</p>
          </article>
          <article>
            <h3>订单多了，交付反而更难控</h3>
            <p>销售、采购、生产、仓储和成本分散，库存看似有数，真正可用量、齐套和交期仍靠人盯。</p>
          </article>
          <article>
            <h3>渠道越多，利润越难看清</h3>
            <p>经销商、电商、门店和B2B订单并行，价格政策、促销费用、库存和回款很难形成同一张经营图。</p>
          </article>
          <article>
            <h3>项目推进了，毛利才发现偏差</h3>
            <p>预算、工时、采购外包、费用和收入确认分散，项目负责人难以及时看到成本消耗和回款风险。</p>
          </article>
          <article>
            <h3>报表很多，会议仍要临时拉数</h3>
            <p>指标分散在多套系统，管理层想追问原因、对比趋势、定位异常时，仍依赖人工整理。</p>
          </article>
          <article>
            <h3>AI不应停在演示，而要进入流程</h3>
            <p>读单、问数、预警、草稿和待办需要连接真实数据与权限；涉及审批、付款、税务等动作，由授权人员确认。</p>
          </article>
        </div>
      </section>

      <section className="section product-matrix" id="product-matrix">
        <div className="section-head compact">
          <span>产品线能力矩阵</span>
          <h2>10大产品能力域，支撑成长型企业全场景经营</h2>
          <p>从财务到制造，从营销到协同，YonSuite的价值不在单个模块，而在业务链路连续流转。</p>
        </div>
        <div className="matrix-grid">
          <article tabIndex={0} data-track="yonsuite_product_matrix_click" data-product="智能财税">
            <b>01</b><h3>智能财税</h3><p>让会计核算、资金管理、税务费控、预算控制和财务分析衔接业务事实。</p><div><span>财务会计</span><span>管理会计</span><span>资金管理</span><span>税务费控</span><span>财务分析</span></div>
          </article>
          <article tabIndex={0} data-track="yonsuite_product_matrix_click" data-product="数智人力">
            <b>02</b><h3>数智人力</h3><p>覆盖组织、员工、招聘、绩效、薪酬与人才发展。</p><div><span>组织员工</span><span>招聘</span><span>绩效</span><span>薪酬</span><span>人才</span></div>
          </article>
          <article tabIndex={0} data-track="yonsuite_product_matrix_click" data-product="数字营销">
            <b>03</b><h3>数字营销</h3><p>支持客户、商机、渠道、订单和全渠道营销增长。</p><div><span>CRM</span><span>全渠道</span><span>价格政策</span><span>订单</span><span>客户经营</span></div>
          </article>
          <article tabIndex={0} data-track="yonsuite_product_matrix_click" data-product="智慧采购">
            <b>04</b><h3>智慧采购</h3><p>打通寻源、供应商、采购订单、到货、对账与应付。</p><div><span>寻源</span><span>供应商</span><span>合同</span><span>到货</span><span>对账</span></div>
          </article>
          <article tabIndex={0} data-track="yonsuite_product_matrix_click" data-product="敏捷供应链">
            <b>05</b><h3>敏捷供应链</h3><p>围绕订单、库存、仓配和履约构建供应链控制塔。</p><div><span>销售</span><span>库存</span><span>仓储</span><span>履约</span><span>控制塔</span></div>
          </article>
          <article tabIndex={0} data-track="yonsuite_product_matrix_click" data-product="智能制造">
            <b>06</b><h3>智能制造</h3><p>支撑计划、生产、质量、委外、设备与制造成本管理。</p><div><span>计划</span><span>生产订单</span><span>质量</span><span>委外</span><span>成本</span></div>
          </article>
          <article tabIndex={0} data-track="yonsuite_product_matrix_click" data-product="数智研发">
            <b>07</b><h3>数智研发</h3><p>连接产品数据、研发过程、BOM变更和研产协同。</p><div><span>PDM</span><span>BOM</span><span>研发项目</span><span>变更</span><span>研制协同</span></div>
          </article>
          <article tabIndex={0} data-track="yonsuite_product_matrix_click" data-product="数智项目">
            <b>08</b><h3>数智项目</h3><p>管理项目预算、工时、费用、收入、成本和项目毛利。</p><div><span>立项</span><span>预算</span><span>工时</span><span>成本</span><span>毛利</span></div>
          </article>
          <article tabIndex={0} data-track="yonsuite_product_matrix_click" data-product="数智资产">
            <b>09</b><h3>数智资产</h3><p>覆盖资产台账、使用、维修、折旧、盘点和资产经营。</p><div><span>台账</span><span>维修</span><span>折旧</span><span>盘点</span><span>经营</span></div>
          </article>
          <article tabIndex={0} data-track="yonsuite_product_matrix_click" data-product="智慧协同">
            <b>10</b><h3>智慧协同</h3><p>统一工作入口、待办、流程、文档和跨组织协作体验。</p><div><span>工作台</span><span>待办</span><span>审批</span><span>文档</span><span>移动办公</span></div>
          </article>
        </div>
      </section>

      <section className="section architecture" id="architecture">
        <div className="section-head">
          <span>一体化架构</span>
          <h2>五层架构，打通业务、AI与ERP闭环</h2>
          <p>泊冉会在蓝图阶段梳理每一层的业务边界、系统边界、数据边界和权限边界。</p>
        </div>
        <div className="layer-stack" aria-label="YonSuite五层一体化架构">
          <article><b>01</b><h3>统一工作入口</h3><p>智友、友空间、数智工作台、第三方协同入口，让员工从同一个入口处理待办、问数和业务任务。</p></article>
          <article><b>02</b><h3>全场景应用</h3><p>财务、人力、营销、采购、供应链、制造、研发、项目、资产、协同在同一业务平台连续流转。</p></article>
          <article><b>03</b><h3>企业AI能力层</h3><p>智友、ChatBI、智能体构建、智能助理和经营预警负责生成建议、草稿、分析和提醒。</p></article>
          <article><b>04</b><h3>集成与扩展层</h3><p>连接OA、CRM、MES、WMS、TMS、电商、银行、税务和数据平台，支持低代码扩展和接口集成。</p></article>
          <article><b>05</b><h3>ERP业务闭环层</h3><p>从商机、订单、采购、生产、库存、交付、开票、回款到财务核算，形成可追溯经营闭环。</p></article>
        </div>
      </section>

      <section className="section ai-capabilities" id="ai-capabilities">
        <div className="section-head compact">
          <span>企业AI能力</span>
          <h2>让AI进入日常业务流程，先从可见价值开始</h2>
          <p>围绕读单、问数、报表、预警和协同待办，YonSuite的AI能力可以先帮助业务团队提升响应效率，再逐步扩展到更多场景。</p>
        </div>
        <div className="ai-layout">
          <div className="ai-grid">
            <article tabIndex={0} data-track="yonsuite_ai_section_click" data-ai="智友"><strong>智友</strong><span>作为统一智能入口，帮助员工发起查询、待办、草稿和经营提醒。</span></article>
            <article tabIndex={0} data-track="yonsuite_ai_section_click" data-ai="ChatBI"><strong>ChatBI</strong><span>用自然语言查询销售、库存、毛利、费用、现金流和项目经营指标。</span></article>
            <article tabIndex={0} data-track="yonsuite_ai_section_click" data-ai="智能体构建"><strong>智能体构建</strong><span>围绕报价、读单、补货、预审、预警等场景共创行业智能体。</span></article>
            <article tabIndex={0} data-track="yonsuite_ai_section_click" data-ai="AI+财务"><strong>AI+财务</strong><span>生成凭证建议、费用预审、预算预警和经营分析草稿，由财务人员确认。</span></article>
            <article tabIndex={0} data-track="yonsuite_ai_section_click" data-ai="AI+供应链"><strong>AI+供应链</strong><span>识别库存异常、交付风险、低周转和齐套缺口，形成预警和跟进建议。</span></article>
            <article tabIndex={0} data-track="yonsuite_ai_section_click" data-ai="AI+采购"><strong>AI+采购</strong><span>辅助供应商比选、寻源建议、采购异常和到货风险分析。</span></article>
            <article tabIndex={0} data-track="yonsuite_ai_section_click" data-ai="AI+制造"><strong>AI+制造</strong><span>围绕BOM、计划、工单、质量和设备异常生成分析建议和预警。</span></article>
            <article tabIndex={0} data-track="yonsuite_ai_section_click" data-ai="AI+营销"><strong>AI+营销</strong><span>支持客户画像、报价草稿、渠道动销、促销费用和低毛利预警。</span></article>
            <article tabIndex={0} data-track="yonsuite_ai_section_click" data-ai="AI+协同"><strong>AI+协同</strong><span>把会议纪要、待办、审批摘要和跨部门任务提醒推入协同流程。</span></article>
          </div>
          <aside className="ai-boundary">
            <h3>让智能能力产生业务成效</h3>
            <p>泊冉围绕YonSuite数据、流程和行业场景设计试点路径，让读单、问数、预警、报表和协同待办先产生可见价值，再逐步扩展到更多业务链路。</p>
            <a className="btn secondary-dark" href="#governance" data-scroll-target data-track="yonsuite_ai_section_click" data-ai="落地保障">查看落地保障</a>
          </aside>
        </div>
      </section>

      <section className="section scenarios" id="scenarios">
        <div className="section-head compact">
          <span>业务场景</span>
          <h2>让高频场景形成端到端业务链路闭环</h2>
          <p>以下10个场景可从单部门试点，也可组合成跨部门、跨组织的YonSuite一体化落地路径。</p>
        </div>
        <div className="scenario-grid">
          <article tabIndex={0} data-track="yonsuite_scenario_card_click" data-scenario="业财税一体化">
            <h3>业财税一体化</h3>
            <dl>
              <dt>适合企业</dt><dd>财务与业务台账割裂、月底对账压力大的成长型企业。</dd>
              <dt>业务痛点</dt><dd>订单、库存、费用、开票、回款和凭证口径不统一。</dd>
              <dt>系统/AI做什么</dt><dd>系统打通业务单据与财务核算，AI生成费用预审、凭证建议和异常预警。</dd>
              <dt>业务闭环</dt><dd>业务发生、财务确认、税务处理和经营分析基于同一业务事实。</dd>
              <dt>数据分析/预警</dt><dd>应收逾期、费用超预算、库存成本异常、税务风险提醒。</dd>
              <dt>适配主题</dt><dd>业财一体化、财税一体化、YonSuite财务、AI财务</dd>
            </dl>
          </article>
          <article tabIndex={0} data-track="yonsuite_scenario_card_click" data-scenario="产供销一体化">
            <h3>产供销一体化</h3>
            <dl>
              <dt>适合企业</dt><dd>订单交付、采购齐套、生产计划和库存管理复杂的制造企业。</dd>
              <dt>业务痛点</dt><dd>销售接单、采购、生产、库存和成本数据分散，交期风险发现晚。</dd>
              <dt>系统/AI做什么</dt><dd>系统贯通销售订单、需求计划、采购、生产、入库和发货，AI提示齐套缺口和交付风险。</dd>
              <dt>业务闭环</dt><dd>订单驱动采购与制造，库存和成本回写经营分析。</dd>
              <dt>数据分析/预警</dt><dd>缺料、延期、超成本、产能瓶颈和质量异常预警。</dd>
              <dt>适配主题</dt><dd>产供销一体化、制造业YonSuite、供应链ERP、智能制造</dd>
            </dl>
          </article>
          <article tabIndex={0} data-track="yonsuite_scenario_card_click" data-scenario="采购寻源">
            <h3>采购寻源</h3>
            <dl>
              <dt>适合企业</dt><dd>供应商多、采购价格波动大、询比价和合同管理不规范的企业。</dd>
              <dt>业务痛点</dt><dd>寻源过程依赖邮件和表格，供应商资质、报价和履约表现难对比。</dd>
              <dt>系统/AI做什么</dt><dd>系统管理供应商、寻源、报价、合同和采购执行，AI生成比价建议和风险提示。</dd>
              <dt>业务闭环</dt><dd>从寻源到采购订单、到货、对账和应付形成闭环。</dd>
              <dt>数据分析/预警</dt><dd>价格异常、交付延迟、供应商绩效和采购预算预警。</dd>
              <dt>适配主题</dt><dd>采购寻源、智慧采购、供应商管理、YonSuite采购</dd>
            </dl>
          </article>
          <article tabIndex={0} data-track="yonsuite_scenario_card_click" data-scenario="全渠道营销">
            <h3>全渠道营销</h3>
            <dl>
              <dt>适合企业</dt><dd>多渠道销售、经销商、门店、电商和B2B客户并存的消费品企业。</dd>
              <dt>业务痛点</dt><dd>渠道价格、促销费用、订单、库存和回款数据分散。</dd>
              <dt>系统/AI做什么</dt><dd>系统打通客户、渠道、订单和库存，AI辅助读单、报价、动销分析和低毛利预警。</dd>
              <dt>业务闭环</dt><dd>从商机、订单、发货、费用、对账到回款沉淀统一数据。</dd>
              <dt>数据分析/预警</dt><dd>渠道库存、促销ROI、低毛利订单、经销商对账差异。</dd>
              <dt>适配主题</dt><dd>全渠道营销、消费品YonSuite、经销商管理、渠道ERP</dd>
            </dl>
          </article>
          <article tabIndex={0} data-track="yonsuite_scenario_card_click" data-scenario="智能制造">
            <h3>智能制造</h3>
            <dl>
              <dt>适合企业</dt><dd>多品种、小批量、项目制造或需要质量追溯的制造企业。</dd>
              <dt>业务痛点</dt><dd>BOM版本、生产计划、工单执行、质量记录和成本归集断点多。</dd>
              <dt>系统/AI做什么</dt><dd>系统管理BOM、计划、工单、质量、委外和成本，AI提示异常工单、质量风险和成本偏差。</dd>
              <dt>业务闭环</dt><dd>研产供销、生产执行、质量和财务成本连续流转。</dd>
              <dt>数据分析/预警</dt><dd>产能、良率、设备异常、质量追溯和制造成本分析。</dd>
              <dt>适配主题</dt><dd>智能制造、制造ERP、BOM管理、生产成本</dd>
            </dl>
          </article>
          <article tabIndex={0} data-track="yonsuite_scenario_card_click" data-scenario="项目型企业管理">
            <h3>项目型企业管理</h3>
            <dl>
              <dt>适合企业</dt><dd>IT服务、咨询、工程服务、检测认证和专业服务企业。</dd>
              <dt>业务痛点</dt><dd>项目预算、工时、费用、采购外包、收入确认和项目毛利看不清。</dd>
              <dt>系统/AI做什么</dt><dd>系统管理项目全生命周期，AI生成项目周报、毛利异常和费用预警。</dd>
              <dt>业务闭环</dt><dd>商机、合同、项目、工时、费用、开票、回款和收入确认闭环。</dd>
              <dt>数据分析/预警</dt><dd>预算消耗、交付进度、项目毛利、回款计划和人力投入。</dd>
              <dt>适配主题</dt><dd>项目型企业ERP、项目核算、项目毛利、现代服务业ERP</dd>
            </dl>
          </article>
          <article tabIndex={0} data-track="yonsuite_scenario_card_click" data-scenario="医药合规">
            <h3>医药合规</h3>
            <dl>
              <dt>适合企业</dt><dd>医药流通、制药、医疗器械、耗材和医疗服务相关企业。</dd>
              <dt>业务痛点</dt><dd>GMP/GSP、UDI、批号效期、资质证照、CSV证据和库存追溯分散。</dd>
              <dt>系统/AI做什么</dt><dd>系统沉淀质量记录和追溯链路，AI生成证照预警、近效期提醒和审计资料草稿。</dd>
              <dt>业务闭环</dt><dd>采购、库存、质量、销售、追溯和财务库存一体化。</dd>
              <dt>数据分析/预警</dt><dd>证照到期、近效期、批次流向、合规资料缺口。</dd>
              <dt>适配主题</dt><dd>医药行业ERP、GSP管理、UDI管理、医药YonSuite</dd>
            </dl>
          </article>
          <article tabIndex={0} data-track="yonsuite_scenario_card_click" data-scenario="跨境全球化">
            <h3>跨境全球化</h3>
            <dl>
              <dt>适合企业</dt><dd>跨境电商、出海品牌、多国家经营和海外仓企业。</dd>
              <dt>业务痛点</dt><dd>多币种、多语言、多税制、多平台订单和海外仓库存难统一。</dd>
              <dt>系统/AI做什么</dt><dd>系统支持全球化经营基础，AI辅助平台订单分析、汇率影响和库存预警。</dd>
              <dt>业务闭环</dt><dd>订单、库存、采购、销售、结算、财务和经营分析跨区域衔接。</dd>
              <dt>数据分析/预警</dt><dd>SKU利润、海外仓断货、汇率波动、物流费用异常。</dd>
              <dt>适配主题</dt><dd>跨境企业ERP、全球化ERP、跨境YonSuite、多币种ERP</dd>
            </dl>
          </article>
          <article tabIndex={0} data-track="yonsuite_scenario_card_click" data-scenario="ChatBI经营问数">
            <h3>ChatBI经营问数</h3>
            <dl>
              <dt>适合企业</dt><dd>管理层、CFO、销售负责人、供应链负责人和事业部负责人。</dd>
              <dt>业务痛点</dt><dd>报表能看，但原因难追，经营会议前临时拉数和解释指标压力大。</dd>
              <dt>系统/AI做什么</dt><dd>ChatBI理解自然语言问题，调用业务与财务数据生成指标解释和追问建议。</dd>
              <dt>业务闭环</dt><dd>问数结果可形成待办、报告、预警或责任人跟进。</dd>
              <dt>数据分析/预警</dt><dd>收入、毛利、库存、费用、现金流、应收、项目毛利。</dd>
              <dt>适配主题</dt><dd>ChatBI、经营问数、智能BI、企业AI</dd>
            </dl>
          </article>
          <article tabIndex={0} data-track="yonsuite_scenario_card_click" data-scenario="AI智能体共创">
            <h3>AI智能体共创</h3>
            <dl>
              <dt>适合企业</dt><dd>希望把重复业务动作变成AI辅助流程的企业。</dd>
              <dt>业务痛点</dt><dd>报价、读单、补货、费用预审、派工和经营预警仍靠人工重复处理。</dd>
              <dt>系统/AI做什么</dt><dd>泊冉与业务团队共创智能体，先做草稿、建议和预警，再接入业务流程。</dd>
              <dt>业务闭环</dt><dd>智能体调用授权数据和业务接口，把结果回到YonSuite流程和待办。</dd>
              <dt>数据分析/预警</dt><dd>低毛利、超预算、库存异常、交付风险、流程积压。</dd>
              <dt>适配主题</dt><dd>AI智能体、YonSuite AI、AI ERP、AI场景共创</dd>
            </dl>
          </article>
        </div>
      </section>

      <section className="section industries" id="industries">
        <div className="section-head compact">
          <span>九类行业入口</span>
          <h2>行业不是换一套话术，而是换一组优先闭环</h2>
          <p>选择行业标签后，先看适合企业、试点场景、典型痛点、推荐方案和可跟踪指标。</p>
        </div>
                <div className="industry-layout">
          <div className="industry-tabs" role="tablist" aria-label="YonSuite行业切换">
            {industries.map((ind) => (
              <button
                type="button"
                className={activeIndustry === ind.key ? 'active' : ''}
                role="tab"
                aria-selected={activeIndustry === ind.key}
                data-industry={ind.key}
                data-track="yonsuite_industry_tab_click"
                key={ind.key}
                onClick={() => setActiveIndustry(ind.key)}
              >
                {ind.label}
              </button>
            ))}
          </div>
          <div className="industry-panels">
            {industries.map((ind) => (
              <article
                className={`industry-panel${activeIndustry === ind.key ? ' active' : ''}`}
                id={`industry-${ind.key}`}
                role="tabpanel"
                data-panel={ind.key}
                key={ind.key}
                dangerouslySetInnerHTML={{ __html: ind.html }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section implementation" id="implementation">
        <div className="section-head compact">
          <span>泊冉实施服务</span>
          <h2>让YonSuite跑进企业真实业务流程</h2>
          <p>我们把YonSuite项目拆成诊断、蓝图、上线、集成、AI共创和持续运营六个阶段，确保业务部门能用、管理层能看、IT能管。</p>
        </div>
        <div className="service-grid">
          <article><b>01</b><h3>业务诊断</h3><p>梳理组织、业务链路、系统现状、数据质量和试点优先级。</p></article>
          <article><b>02</b><h3>蓝图设计</h3><p>定义业务流程、系统边界、主数据、权限、接口和上线节奏。</p></article>
          <article><b>03</b><h3>实施上线</h3><p>配置、测试、数据迁移、培训、切换和上线支持，减少业务中断。</p></article>
          <article><b>04</b><h3>系统集成</h3><p>连接OA、CRM、MES、WMS、TMS、电商、银行、税务和数据平台。</p></article>
          <article><b>05</b><h3>AI场景共创</h3><p>选择高频业务场景，设计智能体、ChatBI、经营预警和协同待办。</p></article>
          <article><b>06</b><h3>持续运营</h3><p>上线后优化指标、流程、权限、报表和新业务扩展，沉淀长期价值。</p></article>
        </div>
      </section>

      <section className="section governance" id="governance">
        <div className="governance-panel">
          <div>
            <span>落地保障</span>
            <h2>让YonSuite在业务现场持续创造价值</h2>
            <p>泊冉将平台能力、行业经验和企业现有流程结合，帮助企业先用小场景验证价值，再扩展到跨部门、跨组织的一体化运营。</p>
          </div>
          <div className="boundary-grid">
            <article><strong>样板先行</strong><p>选择高频、数据清晰、容易验证的场景，先让业务团队看到效率和管理改善。</p></article>
            <article><strong>流程融入</strong><p>把单据、待办、问数、预警和报表放进日常流程，而不是停留在演示系统。</p></article>
            <article><strong>系统连接</strong><p>打通OA、CRM、MES、WMS、TMS、电商、银行、税务和数据平台等关键系统。</p></article>
            <article><strong>行业共创</strong><p>结合制造、服务、医药、消费、IP运营、新能源、新材料、芯片研发和跨境业务，沉淀适合企业自己的应用场景。</p></article>
            <article><strong>持续运营</strong><p>上线后持续优化指标、权限、报表和智能场景，让平台随着业务增长不断进化。</p></article>
          </div>
        </div>
      </section>

      <section className="section faq" id="faq">
        <div className="section-head compact">
          <span>FAQ</span>
          <h2>关于YonSuite咨询与落地，企业常问的12个问题</h2>
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
          <span>YonSuite Consultation</span>
          <h2>预约YonSuite顾问咨询</h2>
          <p>告诉我们企业规模、当前系统和关注场景，泊冉顾问会结合行业、组织、数据和集成条件，建议第一批可落地试点路径。</p>
          <div className="diagnosis-checks">
            <div><strong>先选场景</strong><span>从高频、低风险、可验证场景切入</span></div>
            <div><strong>再定蓝图</strong><span>明确业务流程、权限和集成边界</span></div>
            <div><strong>持续运营</strong><span>上线后继续优化指标、报表和AI场景</span></div>
          </div>
        </div>
        <form className="lead-form" noValidate data-form-name="yonsuite-consultation" onSubmit={handleLeadFormSubmit}>
          <h3>提交咨询需求</h3>
          <div className="field-grid">
            <label><span>公司名称 <b>*</b></span><input name="company" type="text" autoComplete="organization" required /></label>
            <label><span>所在城市 <b>*</b></span><input name="city" type="text" autoComplete="address-level2" required /></label>
          </div>
          <div className="field-grid">
            <label>
              <span>行业 <b>*</b></span>
              <select name="industry" required>
                <option value="">请选择</option>
                <option>制造业</option>
                <option>现代服务业</option>
                <option>医药与医疗</option>
                <option>消费品</option>
                <option>IP运营</option>
                <option>新能源</option>
                <option>新材料</option>
                <option>芯片研发</option>
                <option>跨境与全球化</option>
                <option>其他</option>
              </select>
            </label>
            <label><span>联系人 <b>*</b></span><input name="contact" type="text" autoComplete="name" required /></label>
          </div>
          <div className="field-grid">
            <label><span>职位</span><input name="title" type="text" autoComplete="organization-title" /></label>
            <label><span>手机 <b>*</b></span><input name="phone" type="tel" autoComplete="tel" required /></label>
          </div>
          <div className="field-grid">
            <label>
              <span>企业规模</span>
              <select name="company_size">
                <option value="">请选择</option>
                <option>50人以下</option>
                <option>50-200人</option>
                <option>200-500人</option>
                <option>500-1000人</option>
                <option>1000人以上</option>
              </select>
            </label>
            <label><span>当前系统</span><input name="current_system" type="text" placeholder="ERP / OA / CRM / MES / WMS / 多套系统" /></label>
          </div>
          <div className="field-grid">
            <label><span>关注场景</span><input name="focus_scene" type="text" placeholder="业财一体化 / 制造 / 采购 / ChatBI / AI智能体" /></label>
            <label>
              <span>是否已有用友产品</span>
              <select name="has_yonyou">
                <option value="">请选择</option>
                <option>已有YonSuite</option>
                <option>已有U8 / U9 / NC / 其他用友产品</option>
                <option>暂未使用用友产品</option>
                <option>不确定</option>
              </select>
            </label>
          </div>
          <label>
            <span>计划上线时间</span>
            <select name="launch_time">
              <option value="">请选择</option>
              <option>1个月内评估</option>
              <option>3个月内启动</option>
              <option>6个月内上线</option>
              <option>今年内规划</option>
              <option>暂不确定</option>
            </select>
          </label>
          <label>
            <span>需要解决的问题</span>
            <textarea name="problem" rows={4} placeholder="例如：业财对账慢、库存不准、采购寻源不规范、项目毛利看不清、希望试点ChatBI或AI智能体"></textarea>
          </label>
          <p className="form-hint" role="status" aria-live="polite">提交后，泊冉顾问将结合行业、企业规模、当前系统和关注场景，与您沟通YonSuite试点和实施路径。</p>
          <button className="modal-submit" type="submit">
            预约YonSuite顾问咨询
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h12.2l-5.1-5.1L14 5l8 8-8 8-1.9-1.9 5.1-5.1H5v-2Z" /></svg>
          </button>
        </form>
      </section>    </div>
  )
}
