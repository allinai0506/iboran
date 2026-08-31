'use client'

import React from 'react'
import './case-detail.css'
import '../../solution/industry/medical-pharma/medical-pharma.css'

/* ---------------- 工具函数 ---------------- */

function trackEvent(name: string, payload: Record<string, unknown> = {}) {
  if (!name) return
  const w = window as unknown as { dataLayer?: unknown[] }
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push({ event: name, ...payload })
  document.dispatchEvent(new CustomEvent('boran:track', { detail: { name, ...payload } }))
}

/* ---------------- 主组件 ---------------- */

export const DiaoCaseContent: React.FC = () => {
  return (
    <div className="mp-scope mp-case">
      {/* Case Hero */}
      <section className="case-hero">
        <div className="case-hero-inner">
          <div>
            <span className="case-label">Medical Device Case Study</span>
            <h1>迪奥医学：打通研发、生产、质量与财务的运营链路</h1>
            <p>医疗器械企业的数智化重点，不只是把订单和库存管起来，而是让BOM、计划、采购、供应、研发、生产、质量、成本和财务在同一套数据链路中协同。</p>
            <div className="case-hero-actions">
              <a className="btn primary" href="/solution/industry/medical-pharma#diagnosis" data-track="case_detail_cta_click">预约同类案例复盘</a>
              <a className="btn secondary" href="/solution/industry/medical-pharma" data-track="case_detail_back_click">返回行业方案</a>
            </div>
          </div>
          <aside className="case-snapshot" aria-label="迪奥医学案例运营链路概览">
            <div className="snapshot-top">
              <div className="case-mini-logo diao"><strong>迪奥医学</strong><span>Medical Device</span></div>
              <span className="snapshot-status">站内案例</span>
            </div>
            <div className="snapshot-flow" aria-label="核心链路">
              <div><b>研发</b><span>BOM/工艺</span></div>
              <i aria-hidden="true" />
              <div><b>生产</b><span>计划/质量</span></div>
              <i aria-hidden="true" />
              <div><b>库存</b><span>批次/流向</span></div>
              <i aria-hidden="true" />
              <div><b>财务</b><span>成本/核算</span></div>
            </div>
            <div className="snapshot-metrics">
              <div><span>主线</span><strong>研发、生产、质量与财务闭环</strong></div>
              <div><span>关注</span><strong>BOM、计划、库存、成本与多系统集成</strong></div>
              <div><span>适配</span><strong>医疗器械企业精细化运营与质量追溯</strong></div>
            </div>
          </aside>
        </div>
      </section>

      {/* 项目关注点 */}
      <section className="case-section">
        <div className="case-section-head">
          <span>项目关注点</span>
          <h2>从多系统并行，走向全链路数据打通</h2>
          <p>医疗器械企业常见难点是研发、生产、质量、库存和财务各自有台账，BOM、工艺、物料、供应商和客户主数据口径不统一，影响计划、成本和质量追溯。</p>
        </div>
        <div className="case-card-grid">
          <article className="case-card"><h3>多系统集成</h3><p>连接业务系统和三方系统，让销售、采购、供应、研发、生产、质量和财务数据互联互通。</p></article>
          <article className="case-card"><h3>统一基础数据</h3><p>规范BOM、工艺、产品名称、规格型号、客户和供应商档案，为后续精细化管理建立统一编码。</p></article>
          <article className="case-card"><h3>业财一体化</h3><p>把业务单据、库存变化、成本核算、应收应付和财务凭证接到同一条流程中，减少重复对账。</p></article>
        </div>
      </section>

      {/* 建设路径 */}
      <section className="case-band">
        <div className="case-section-head">
          <span>建设路径</span>
          <h2>医疗器械企业需要把“产品数据”和“经营数据”放在一起看</h2>
        </div>
        <div className="case-timeline">
          <div className="case-step"><b>01</b><div><h3>先治理主数据</h3><p>统一物料、BOM、工艺、产品规格、客商档案和组织权限，减少跨部门口径不一致。</p></div></div>
          <div className="case-step"><b>02</b><div><h3>再打通研发生产</h3><p>让研发设计、计划、采购、生产、质量和库存流转形成闭环，减少BOM重复设计和计划滞后。</p></div></div>
          <div className="case-step"><b>03</b><div><h3>同步成本核算</h3><p>把生产成本细化到车间、班组、作业工序等维度，为成本控制和毛利分析提供依据。</p></div></div>
          <div className="case-step"><b>04</b><div><h3>延伸质量追溯</h3><p>结合批号、UDI、质量记录和出入库流向，形成面向审计和召回场景的追溯基础。</p></div></div>
        </div>
      </section>

      {/* 可借鉴场景 */}
      <section className="case-section">
        <div className="case-section-head">
          <span>可借鉴场景</span>
          <h2>对医疗器械企业的启发</h2>
        </div>
        <div className="case-result-grid">
          <article className="case-result"><h3>BOM与工艺先统一</h3><p>医疗器械企业如果研发、生产、质量各用一套编码，后续计划、成本和追溯都会被拉长。</p></article>
          <article className="case-result"><h3>成本核算要靠过程数据</h3><p>成本分析不能只看财务末端，应从物料、工序、工时、质检和库存变化中获得可核算依据。</p></article>
          <article className="case-result"><h3>UDI与质量追溯要前置</h3><p>UDI、批号、出入库、销售流向和售后召回应在流程设计阶段纳入，而不是上线后再补。</p></article>
        </div>
      </section>

      {/* 底部 CTA */}
      <section className="case-bottom-wrap">
        <div className="case-bottom-cta">
          <div>
            <h2>想评估医疗器械企业的试点路径？</h2>
            <p>泊冉顾问可以结合当前BOM、UDI、质量、库存、成本和财务链路，帮助梳理优先落地场景。</p>
          </div>
          <a className="btn primary" href="/solution/industry/medical-pharma#diagnosis" data-track="case_detail_cta_click">预约案例复盘诊断</a>
        </div>
      </section>
    </div>
  )
}
