'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  CheckCircle, ArrowRight, Activity, Database, ShieldCheck, 
  TrendingUp, Building2, Layers, Cpu, FileText
} from 'lucide-react'
import styles from './case.module.css'

export const DiaoCaseContent: React.FC = () => {
  return (
    <div className={styles.casePage}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <span className={styles.label}>Medical Device Case Study</span>
            <h1>迪奥医学：打通研发、生产、质量与财务的运营链路</h1>
            <p className={styles.heroLead}>
              医疗器械企业的数智化重点，不只是把订单和库存管起来，而是让BOM、计划、采购、供应、研发、生产、质量、成本和财务在同一套数据链路中协同。
            </p>
            <div className={styles.heroActions}>
              <a href="#diagnosis" className={styles.btnPrimary}>预约同类案例复盘</a>
              <a href="/solution/industry/medical-pharma" className={styles.btnSecondary}>返回行业方案</a>
            </div>
          </div>
          <aside className={styles.snapshot}>
            <div className={styles.snapshotTitle}>
              <strong>迪奥医学</strong>
              <span>运营链路概览</span>
            </div>
            <div className={styles.flow}>
              <div className={styles.flowNode}><b>研发</b><span>BOM/工艺</span></div>
              <div className={styles.flowLine} />
              <div className={styles.flowNode}><b>生产</b><span>计划/质量</span></div>
              <div className={styles.flowLine} />
              <div className={styles.flowNode}><b>库存</b><span>批次/流向</span></div>
              <div className={styles.flowLine} />
              <div className={styles.flowNode}><b>财务</b><span>成本/核算</span></div>
            </div>
            <div className={styles.metrics}>
              <div className={styles.metricItem}>
                <span>主线</span>
                <strong>研产质财一体化</strong>
              </div>
              <div className={styles.metricItem}>
                <span>核心</span>
                <strong>多系统数据集成</strong>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span>Project Focus</span>
          <h2>从多系统并行，走向全链路数据打通</h2>
          <p>迪奥医学通过数智化转型，解决了研发、生产、质量、库存和财务数据孤岛问题。</p>
        </div>
        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <div className={styles.cardIcon}><Layers size={24} /></div>
            <h3>多系统集成</h3>
            <p>连接业务系统与第三方系统，实现销售、采购、生产、财务数据的互联互通。</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}><Database size={24} /></div>
            <h3>统一基础数据</h3>
            <p>规范BOM、工艺、物料编码等基础档案，为精细化管理打下坚实基础。</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}><Activity size={24} /></div>
            <h3>业财一体化</h3>
            <p>业务单据自动触发财务核算，减少人工对账，实现经营利润的实时可见。</p>
          </div>
        </div>
      </section>

      <section className={styles.pathway}>
        <div className={styles.sectionHead}>
          <span>Implementation Path</span>
          <h2>医疗器械行业建设路径</h2>
        </div>
        <div className={styles.timeline}>
          {[
            { step: '01', title: '主数据治理', desc: '统一物料、BOM、工艺及组织权限。' },
            { step: '02', title: '研产闭环', desc: '打通研发设计、计划、采购与质量。' },
            { step: '03', title: '成本核算', desc: '精细化归集人工、材料与制造费用。' },
            { step: '04', title: '质量追溯', desc: '建立基于UDI与批次的流向追溯。' },
          ].map((item, idx) => (
            <div key={idx} className={styles.timelineItem}>
              <div className={styles.timelineStep}>{item.step}</div>
              <div className={styles.timelineContent}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span>Insights</span>
          <h2>案例复盘：对医疗器械企业的启发</h2>
        </div>
        <div className={styles.insightGrid}>
          <div className={styles.insightCard}>
            <div className={styles.insightBadge}>场景 01</div>
            <h3>BOM与工艺的统一是基石</h3>
            <p>研发与生产共用一套数据标准，是后续计划准、成本清、追溯快的根本保证。</p>
          </div>
          <div className={styles.insightCard}>
            <div className={styles.insightBadge}>场景 02</div>
            <h3>成本核算必须依赖过程数据</h3>
            <p>通过实时采集领料、工时与质检数据，让成本分析从"事后"转向"事中"。</p>
          </div>
          <div className={styles.insightCard}>
            <div className={styles.insightBadge}>场景 03</div>
            <h3>质量追溯体系必须前置规划</h3>
            <p>在流程设计阶段纳入 UDI 与合规要求，确保每一步操作都留下可审计痕迹。</p>
          </div>
        </div>
      </section>

      <section id="diagnosis" className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2>想评估您的医疗器械企业试点路径？</h2>
          <p>泊冉顾问将结合您的业务现状，提供定制化的数智化转型路线图。</p>
          <div className={styles.ctaActions}>
            <button className={styles.btnPrimary}>预约同类案例复盘</button>
            <a href="tel:400-9955-161" className={styles.btnSecondary}>拨打 400-9955-161</a>
          </div>
        </div>
      </section>
    </div>
  )
}
