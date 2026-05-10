'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  CheckCircle, ArrowRight, ShieldCheck, Globe, 
  BarChart3, Settings2, FileText, Activity
} from 'lucide-react'
import styles from '../diao-medical-device/case.module.css'

export const MayolyCaseContent: React.FC = () => {
  return (
    <div className={styles.casePage}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <span className={styles.label}>Pharma Case Study</span>
            <h1>Mayoly：中国本地化运营与合规验证支撑</h1>
            <p className={styles.heroLead}>
              外资制药企业在中国推进数智化建设时，重点不只是替换系统，而是把产供销协同、业财打通、预算与成本、资产设备和合规验证纳入同一条运营链路。
            </p>
            <div className={styles.heroActions}>
              <a href="#diagnosis" className={styles.btnPrimary}>预约同类案例复盘</a>
              <a href="/solution/industry/medical-pharma" className={styles.btnSecondary}>返回行业方案</a>
            </div>
          </div>
          <aside className={styles.snapshot}>
            <div className={styles.snapshotTitle}>
              <strong>Mayoly</strong>
              <span>China Operations</span>
            </div>
            <div className={styles.flow}>
              <div className={styles.flowNode}><b>产供销</b><span>计划/协同</span></div>
              <div className={styles.flowLine} />
              <div className={styles.flowNode}><b>业财</b><span>单据/核算</span></div>
              <div className={styles.flowLine} />
              <div className={styles.flowNode}><b>预算</b><span>成本/资产</span></div>
              <div className={styles.flowLine} />
              <div className={styles.flowNode}><b>验证</b><span>CSV/证据</span></div>
            </div>
            <div className={styles.metrics}>
              <div className={styles.metricItem}>
                <span>核心</span>
                <strong>本地化合规运营</strong>
              </div>
              <div className={styles.metricItem}>
                <span>适配</span>
                <strong>制药多团队协同</strong>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span>Project Focus</span>
          <h2>全链路数据打通，支撑高效合规决策</h2>
          <p>Mayoly 项目的关键在于让业务、财务、工厂、IT 和实施团队对目标、流程、数据和验证边界形成统一理解。</p>
        </div>
        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <div className={styles.cardIcon}><Globe size={24} /></div>
            <h3>本地化运营</h3>
            <p>梳理中国本地业务组织、流程与主数据，确保系统完全符合本地法律法规与管理习惯。</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}><Settings2 size={24} /></div>
            <h3>产供销协同</h3>
            <p>深度集成采购、库存、销售与工厂计划，消除人工台账，缩短供应链响应周期。</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}><ShieldCheck size={24} /></div>
            <h3>合规验证支撑</h3>
            <p>将 CSV 验证要求嵌入实施全过程，从需求到上线全程可追溯，确保合规证据链完整。</p>
          </div>
        </div>
      </section>

      <section className={styles.pathway}>
        <div className={styles.sectionHead}>
          <span>Implementation Path</span>
          <h2>制药行业精细化建设路径</h2>
        </div>
        <div className={styles.timeline}>
          {[
            { step: '01', title: '蓝图规划', desc: '明确产供销、预算、标准成本与资产设备业务范围。' },
            { step: '02', title: '合规验证', desc: '将 CSV 要求纳入配置与测试环节，前置合规风险控制。' },
            { step: '03', title: '跨部协同', desc: '业务、财务与IT共同参与，确保系统逻辑与现场逻辑一致。' },
            { step: '04', title: '持续优化', desc: '上线后围绕经营分析与质量管理要求进行迭代演进。' },
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
          <h2>案例复盘：对制药企业的启发</h2>
        </div>
        <div className={styles.insightGrid}>
          <div className={styles.insightCard}>
            <div className={styles.insightBadge}>关键 01</div>
            <h3>合规边界先行</h3>
            <p>GMP/CSV 等合规要求应在设计阶段锁定，而不是在系统上线后再去补齐证据材料。</p>
          </div>
          <div className={styles.insightCard}>
            <div className={styles.insightBadge}>关键 02</div>
            <h3>业务闭环设计</h3>
            <p>产供销、业财、资产设备应作为有机整体进行集成设计，避免出现新的信息孤岛。</p>
          </div>
          <div className={styles.insightCard}>
            <div className={styles.insightBadge}>关键 03</div>
            <h3>数据治理驱动</h3>
            <p>外资企业本地化成功的关键在于主数据的一致性，这决定了经营分析报表的准确性。</p>
          </div>
        </div>
      </section>

      <section id="diagnosis" className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2>想复盘同类医药项目路径？</h2>
          <p>泊冉顾问将根据您的 GMP/GSP 要求，提供最适合您的数智化演进方案。</p>
          <div className={styles.ctaActions}>
            <button className={styles.btnPrimary}>预约案例复盘诊断</button>
            <a href="tel:400-9955-161" className={styles.btnSecondary}>拨打 400-9955-161</a>
          </div>
        </div>
      </section>
    </div>
  )
}
