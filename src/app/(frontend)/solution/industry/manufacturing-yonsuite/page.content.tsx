'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Building2, Users, BarChart3, ArrowRight, CheckCircle, 
  FileText, Briefcase, Clock, CreditCard, PieChart, TrendingUp, Search,
  Cloud, Zap, ShieldCheck, Smartphone, Settings2, PackageCheck
} from 'lucide-react'
import styles from '../solution.module.css'
import { useAttribution } from '@/providers/Attribution'
import { DemoRequestModal } from '@/components/DemoRequestModal'
import { openAifafanChat } from '@/utilities/openAifafanChat'

export const ManufacturingYonSuiteContent: React.FC = () => {
  const attribution = useAttribution()
  const [activeScenario, setActiveScenario] = useState(0)
  const [isDemoOpen, setIsDemoOpen] = useState(false)

  const handleOpenConsult = () => {
    openAifafanChat()
  }

  const challenges = [
    {
      icon: Cloud,
      title: 'IT 运维压力大',
      description: '成长型工厂往往缺乏专业IT，传统服务器部署复杂且维护成本高。',
    },
    {
      icon: Zap,
      title: '研产供销断层',
      description: 'BOM变更传不到车间，计划跟不上订单，库存数据不准导致缺料或积压。',
    },
    {
      icon: TrendingDown,
      title: '成本核算不及时',
      description: '材料、人工、委外成本靠手工录入，月底才知道订单盈亏。',
    },
    {
      icon: Smartphone,
      title: '现场执行黑箱化',
      description: '纸单报工、质检滞后，管理层无法实时掌握产线进度与质量异常。',
    }
  ]

  const architecture = [
    {
      id: '01',
      title: '云原生底座',
      desc: '基于用友 YonSuite 纯云架构，1周内完成基础环境配置，实现轻量化部署。',
      color: '#0052D9',
      features: ['免服务器维护', '在线自动升级', '多地数据同步']
    },
    {
      id: '02',
      title: '数智协同中枢',
      desc: '打通设计、计划、采购与生产，实现全链路业务流数据同源。',
      color: '#E60012',
      features: ['BOM变更在线生效', 'MRP自动运算', '委外加工实时跟踪']
    },
    {
      id: '03',
      title: '全流程业财闭环',
      desc: '业务动作即财务分录，实时核算订单成本、工序成本与多维利润。',
      color: '#059669',
      features: ['秒级成本核算', '自动生成凭证', '经营看板穿透分析']
    }
  ]

  const scenarios = [
    {
      title: '敏捷研发与BOM协同',
      problem: 'EBOM转MBOM慢，变更版本混乱。',
      solution: '建立统一BOM库，变更审批自动同步至计划与采购，确保生产数据唯一。',
      outcome: '数据差错率降低 80%，研发到量产提速 30%。',
    },
    {
      title: '智能化计划与排程',
      problem: '缺料严重，交期承诺靠拍脑袋。',
      solution: 'MRP一键运算，自动分析现有库存、在途采购与产能，生成精准补货与排产建议。',
      outcome: '缺料风险预警提前 3-5 天，交期达成率提升 25%。',
    },
    {
      title: '扫码报工与实时质检',
      problem: '车间进度靠人追，质量追溯翻纸单。',
      solution: '移动端扫码报工、扫码质检，批次信息实时回传。',
      outcome: '现场透明度提升，质量追溯从"天"缩短至"分钟"级。',
    },
    {
      title: '全在线订单成本核算',
      problem: '领料、报工、报废成本归集慢，算不准。',
      solution: '材料成本、人工工时、制造费用随业务发生自动归集。',
      outcome: '实现订单级动态毛利分析，支撑精准定价决策。',
    }
  ]

  const metrics = [
    { value: '4周', label: '平均上线周期', description: '标准化场景快速落地' },
    { value: '30%+', label: '存货周转提升', description: '通过精准计划协同' },
    { value: '100%', label: '数据实时同步', description: '告别跨系统搬运' },
    { value: '0', label: '硬件投入成本', description: '纯云端按需订阅' },
  ]

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.gridBg} />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}><span />YONSUITE MANUFACTURING CLOUD</div>
            <h1>成长型制造业数智化</h1>
            <p className={styles.heroLead}>云原生智能制造，让生产更简单，让经营更透明</p>
            <p>
              依托用友YonSuite云原生平台，泊冉助力中小制造企业实现"研产供销财"一体化。从轻量化MES到业财闭环，驱动工厂数字化转型。
            </p>
            <div className={styles.valueTags}>
              <span>纯云底座 · 快速上线</span>
              <span>研产供销财一体化</span>
              <span>实时成本核算</span>
              <span>移动端全流程办公</span>
            </div>
            <div className={styles.heroActions}>
              <button onClick={() => setIsDemoOpen(true)} className={`${styles.btn} ${styles.btnPrimary}`}>
                申请 YonSuite 演示
                <ArrowRight size={18} />
              </button>
              <button onClick={handleOpenConsult} className={`${styles.btn} ${styles.btnSecondary}`}>
                查看制造业成功案例
              </button>
            </div>
          </div>

          <aside className={styles.heroConsole}>
            <div className={styles.consolePanel}>
              <div className={styles.panelTitle}>
                <span>Manufacturing Cloud Center</span>
                <strong>数据流转中</strong>
              </div>
              <div className={styles.moduleGrid}>
                {[
                  { icon: Settings2, name: 'BOM管理', desc: '变更协同' },
                  { icon: Zap, name: 'MRP计划', desc: '精准补货' },
                  { icon: PackageCheck, name: '生产报工', desc: '扫码即传' },
                  { icon: Search, name: '质量追溯', desc: '批次闭环' },
                  { icon: TrendingUp, name: '订单成本', desc: '秒级核算' },
                  { icon: BarChart3, name: '经营仪表盘', desc: '全局看板' },
                ].map((m, idx) => (
                  <div key={idx} className={styles.moduleCard}>
                    <m.icon size={20} />
                    <strong>{m.name}</strong>
                    <small>{m.desc}</small>
                  </div>
                ))}
              </div>
              <div className={styles.metricGrid}>
                <div><b>98%</b><small>计划达成率</small></div>
                <div><b>实时</b><small>库存预警</small></div>
                <div><b>100%</b><small>账实相符</small></div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span>Core Challenges</span>
          <h2>传统工厂数智化转型的三大阵痛</h2>
          <p>如何在保持生产稳定的同时，通过数字化手段提升响应速度与盈利能力？</p>
        </div>
        <div className={styles.challengeGrid}>
          {challenges.slice(0, 3).map((c, i) => (
            <div key={i} className={styles.challengeCard}>
              <div className={styles.challengeIcon}><c.icon size={24} /></div>
              <h3>{c.title}</h3>
              <p>{c.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span>Architecture</span>
          <h2>YonSuite 制造业"全闭环"架构</h2>
          <p>从云端底座到车间现场，构建一体化数智工厂。</p>
        </div>
        <div className={styles.archGrid}>
          {architecture.map((a, i) => (
            <div key={i} className={styles.archCard}>
              <div className={styles.archBadge} style={{ color: a.color }}>{a.id}</div>
              <h3 style={{ color: a.color }}>{a.title}</h3>
              <p>{a.desc}</p>
              <ul className={styles.archList}>
                {a.features.map((f, fi) => (
                  <li key={fi}><CheckCircle size={14} style={{ color: a.color }} /> {f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span>Key Scenarios</span>
          <h2>YonSuite 智能制造典型场景</h2>
        </div>
        <div className={styles.scenarioTabs}>
          <div className={styles.tabList}>
            {scenarios.map((s, i) => (
              <button 
                key={i} 
                className={`${styles.tabButton} ${activeScenario === i ? styles.tabButtonActive : ''}`}
                onClick={() => setActiveScenario(i)}
              >
                {s.title}
              </button>
            ))}
          </div>
          <motion.div 
            key={activeScenario}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className={styles.scenarioContent}
          >
            <div className={styles.scenarioDetail}>
              <div className={`${styles.detailCard} ${styles.painCard}`}>
                <h4>😣 管理痛点</h4>
                <p>{scenarios[activeScenario].problem}</p>
              </div>
              <div className={`${styles.detailCard} ${styles.solutionCard}`}>
                <h4>💡 解决方案</h4>
                <p>{scenarios[activeScenario].solution}</p>
              </div>
              <div className={`${styles.detailCard} ${styles.resultCard}`}>
                <h4>🚀 实现效果</h4>
                <p>{scenarios[activeScenario].outcome}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className={styles.valueSection}>
        <div className={styles.sectionHead}>
          <span style={{ color: '#91c7ff' }}>Value & Impact</span>
          <h2 style={{ color: '#fff' }}>数智化驱动工厂利润增长</h2>
          <p style={{ color: '#aebbd1' }}>为成长型制造企业打造极致的运营效率。</p>
        </div>
        <div className={styles.valueGrid}>
          {metrics.map((m, i) => (
            <div key={i} className={styles.valueCard}>
              <b style={{ color: i % 2 === 0 ? '#f0d68a' : '#fff' }}>{m.value}</b>
              <strong>{m.label}</strong>
              <small>{m.description}</small>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <h2>开启您的数智工厂新纪元</h2>
        <p>预约行业顾问，获取《成长型制造业数智化转型方案》并安排实地诊断</p>
        <div className={styles.ctaActions}>
          <button onClick={() => setIsDemoOpen(true)} className={`${styles.btn} ${styles.btnPrimary}`}>
            立即咨询专家
            <ArrowRight size={18} />
          </button>
          <a href="tel:400-9955-161" className={`${styles.btn} ${styles.btnSecondary}`}>
            拨打 400-9955-161
          </a>
        </div>
      </section>

      <DemoRequestModal 
        isOpen={isDemoOpen} 
        onClose={() => setIsDemoOpen(false)} 
        source="industry-manufacturing-yonsuite"
      />
    </div>
  )
}
