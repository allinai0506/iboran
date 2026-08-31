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

export const MayolyCaseContent: React.FC = () => {
  return (
    <div className="mp-scope mp-case">
      {/* Case Hero */}
      <section className="case-hero">
        <div className="case-hero-inner">
          <div>
            <span className="case-label">Pharma Case Study</span>
            <h1>Mayoly：中国本地化运营与合规验证支撑</h1>
            <p>外资制药企业在中国推进数智化建设时，重点不只是替换系统，而是把产供销协同、业财打通、预算与成本、资产设备和合规验证纳入同一条运营链路。</p>
            <div className="case-hero-actions">
              <a className="btn primary" href="/solution/industry/medical-pharma#diagnosis" data-track="case_detail_cta_click">预约同类案例复盘</a>
              <a className="btn secondary" href="/solution/industry/medical-pharma" data-track="case_detail_back_click">返回行业方案</a>
            </div>
          </div>
          <aside className="case-snapshot" aria-label="Mayoly案例运营链路概览">
            <div className="snapshot-top">
              <div className="case-mini-logo"><strong>Mayoly</strong><span>China Operations</span></div>
              <span className="snapshot-status">站内案例</span>
            </div>
            <div className="snapshot-flow" aria-label="核心链路">
              <div><b>产供销</b><span>计划/协同</span></div>
              <i aria-hidden="true" />
              <div><b>业财</b><span>单据/核算</span></div>
              <i aria-hidden="true" />
              <div><b>预算</b><span>成本/资产</span></div>
              <i aria-hidden="true" />
              <div><b>验证</b><span>CSV/证据</span></div>
            </div>
            <div className="snapshot-metrics">
              <div><span>主线</span><strong>中国本地化运营与合规验证支撑</strong></div>
              <div><span>关注</span><strong>产供销、业财、预算、标准成本与资产设备</strong></div>
              <div><span>适配</span><strong>制药企业多团队协同与验证证据链管理</strong></div>
            </div>
          </aside>
        </div>
      </section>

      {/* 项目关注点 */}
      <section className="case-section">
        <div className="case-section-head">
          <span>项目关注点</span>
          <h2>从项目启动开始，把业务目标和验证要求同步规划</h2>
          <p>这类项目的关键，不是单点上线，而是让业务团队、财务团队、工厂团队、IT团队和实施团队对目标、流程、数据和验证边界形成统一理解。</p>
        </div>
        <div className="case-card-grid">
          <article className="case-card"><h3>本地化运营</h3><p>围绕中国业务的组织、流程、主数据和权限进行梳理，支撑跨团队协同和本地业务管理要求。</p></article>
          <article className="case-card"><h3>产供销协同</h3><p>把采购、库存、销售、工厂与供应链计划连接起来，减少业务流转中的人工台账和信息滞后。</p></article>
          <article className="case-card"><h3>业财打通</h3><p>让业务单据、预算、成本、资产设备和财务核算基于同一套数据流转，为经营分析提供统一口径。</p></article>
        </div>
      </section>

      {/* 建设路径 */}
      <section className="case-band">
        <div className="case-section-head">
          <span>建设路径</span>
          <h2>医药项目不能只看上线节点，还要看证据链是否完整</h2>
        </div>
        <div className="case-timeline">
          <div className="case-step"><b>01</b><div><h3>梳理业务蓝图</h3><p>明确产供销、财务、预算、标准成本、资产设备和多端数据贯通的业务范围。</p></div></div>
          <div className="case-step"><b>02</b><div><h3>同步验证要求</h3><p>把需求、配置、权限、测试、变更和上线确认纳入CSV验证思路，减少后补材料压力。</p></div></div>
          <div className="case-step"><b>03</b><div><h3>推动关键用户协同</h3><p>通过业务、财务、工厂、IT和项目团队共同参与，确保系统配置与真实流程一致。</p></div></div>
          <div className="case-step"><b>04</b><div><h3>形成可扩展底座</h3><p>上线后继续围绕经营分析、流程优化和质量合规要求迭代，避免系统只停留在单次交付。</p></div></div>
        </div>
      </section>

      {/* 可借鉴场景 */}
      <section className="case-section">
        <div className="case-section-head">
          <span>可借鉴场景</span>
          <h2>对制药企业的启发</h2>
        </div>
        <div className="case-result-grid">
          <article className="case-result"><h3>先定合规边界</h3><p>涉及GMP、CSV、质量放行或审计追踪的业务，应在蓝图阶段同步规划，不等上线后补证据。</p></article>
          <article className="case-result"><h3>再定业务闭环</h3><p>产供销、业财、预算、成本和资产设备不要拆成孤立项目，应围绕经营闭环进行集成设计。</p></article>
          <article className="case-result"><h3>最后规划扩展</h3><p>可先从关键流程和核心数据治理开始，再扩展到ChatBI经营问数、预警和AI辅助分析场景。</p></article>
        </div>
      </section>

      {/* 底部 CTA */}
      <section className="case-bottom-wrap">
        <div className="case-bottom-cta">
          <div>
            <h2>想复盘同类医药项目路径？</h2>
            <p>泊冉顾问可以结合企业当前系统、GMP/GSP/CSV要求和业财闭环情况，帮助梳理优先试点场景。</p>
          </div>
          <a className="btn primary" href="/solution/industry/medical-pharma#diagnosis" data-track="case_detail_cta_click">预约案例复盘诊断</a>
        </div>
      </section>
    </div>
  )
}
