'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Building2, Users, BarChart3, ArrowRight, CheckCircle, 
  FileText, Briefcase, Clock, CreditCard, PieChart, TrendingUp, Search
} from 'lucide-react'
import styles from '../solution.module.css'
import { useAttribution } from '@/providers/Attribution'
import { DemoRequestModal } from '@/components/DemoRequestModal'
import { openAifafanChat } from '@/utilities/openAifafanChat'

export const ModernServiceContent: React.FC = () => {
  const attribution = useAttribution()
  const [activeScenario, setActiveScenario] = useState(0)
  const [isDemoOpen, setIsDemoOpen] = useState(false)

  const handleOpenConsult = () => {
    openAifafanChat()
  }

  const challenges = [
    {
      icon: PieChart,
      title: '项目忙完才算账',
      description: '收入、人工、费用、外包成本分散，项目结束才知道亏还是赚，缺乏事中干预能力。',
    },
    {
      icon: Clock,
      title: '工时成本失真',
      description: '人力成本占大头，但工时填报不规范、不及时，导致项目真实毛利分析严重滞后。',
    },
    {
      icon: FileText,
      title: '合同与回款脱节',
      description: '合同验收节点、开票计划与实际回款记录不统一，财务追账压力大，现金流风险高。',
    },
    {
      icon: Briefcase,
      title: '业务财务双重台账',
      description: '业务记业务的，财务记财务的，每月对账耗时耗力，管理层看不到统一的项目经营视图。',
    }
  ]

  const architecture = [
    {
      id: '01',
      title: '商机与立项',
      desc: '打通商机、合同与项目立项，确保销售承诺与交付范围高度一致。',
      color: '#0052D9',
      features: ['合同转项目', '项目预算管理', '资源冲突预警']
    },
    {
      id: '02',
      title: '过程管理',
      desc: '标准化项目计划、工时填报与费用归集，实现交付过程的透明化。',
      color: '#E60012',
      features: ['精细化任务拆解', '移动端工时填报', '项目报销实时归集']
    },
    {
      id: '03',
      title: '业财经营',
      desc: '自动化收入确认、开票回款与多维毛利分析，支撑实时经营决策。',
      color: '#059669',
      features: ['里程碑自动预警', '多准则收入确认', '实时项目损益看板']
    }
  ]

  const scenarios = [
    {
      title: '项目全周期预算控制',
      problem: '开工后成本超支难发现。',
      solution: '立项时确立多维预算（人工、差旅、外包），执行中实时对标消耗情况。',
      outcome: '预算超支率平均降低 20%，交付成本更可控。',
    },
    {
      title: '精细化人力成本分摊',
      problem: '人力投入无法量化，毛利核算靠估。',
      solution: '员工按项目/任务填报工时，系统自动关联薪资水平核算真实人力成本。',
      outcome: '实现项目级盈利分析，支撑资源投放决策。',
    },
    {
      title: '业财联动回款管理',
      problem: '项目验收了但不催款，财务不知道该催谁。',
      solution: '验收节点自动触发开票申请，回款计划与项目进度动态绑定。',
      outcome: 'DSO（应收账款周转天数）显著缩短，回款及时率提升。',
    },
    {
      title: '智能经营看板',
      problem: '老板看数靠拼表。',
      solution: '按项目、事业部、客户维度实时呈现收入、成本、费用、毛利排行。',
      outcome: '经营会议从"对数"转向"决策"，决策时效提升。',
    }
  ]

  const metrics = [
    { value: '30%+', label: '毛利率提升空间', description: '通过精细化成本控制' },
    { value: '80%', label: '对账效率提升', description: '业财数据同源同步' },
    { value: '24h', label: '经营数据反馈', description: '告别按月看报表' },
    { value: '100%', label: '预算执行透明', description: '每一分钱都有出处' },
  ]

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.gridBg} />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}><span />PROJECT-BASED SERVICE SOLUTIONS</div>
            <h1>现代服务业项目核算</h1>
            <p className={styles.heroLead}>让每一个项目都赚得清，让每一笔投入都有据可查</p>
            <p>
              面向IT、咨询、工程、检测等项目型服务企业，泊冉提供"商机-合同-项目-核算-分析"全生命周期方案。解决项目多、毛利乱、回款难的核心痛点。
            </p>
            <div className={styles.valueTags}>
              <span>商机到回款闭环</span>
              <span>工时费用精准归集</span>
              <span>多维项目毛利分析</span>
              <span>业财经营一体化</span>
            </div>
            <div className={styles.heroActions}>
              <button onClick={() => setIsDemoOpen(true)} className={`${styles.btn} ${styles.btnPrimary}`}>
                预约项目核算诊断
                <ArrowRight size={18} />
              </button>
              <button onClick={handleOpenConsult} className={`${styles.btn} ${styles.btnSecondary}`}>
                查看服务行业样板
              </button>
            </div>
          </div>

          <aside className={styles.heroConsole}>
            <div className={styles.consolePanel}>
              <div className={styles.panelTitle}>
                <span>Project Profit Command Center</span>
                <strong>实时监控中</strong>
              </div>
              <div className={styles.moduleGrid}>
                {[
                  { icon: Briefcase, name: '项目立项', desc: '合同驱动' },
                  { icon: Clock, name: '工时填报', desc: '精准核人' },
                  { icon: CreditCard, name: '费用归集', desc: '实时报销' },
                  { icon: FileText, name: '合同执行', desc: '里程碑' },
                  { icon: TrendingUp, name: '毛利分析', desc: '穿透到单' },
                  { icon: BarChart3, name: '经营大屏', desc: '多维看板' },
                ].map((m, idx) => (
                  <div key={idx} className={styles.moduleCard}>
                    <m.icon size={20} />
                    <strong>{m.name}</strong>
                    <small>{m.desc}</small>
                  </div>
                ))}
              </div>
              <div className={styles.metricGrid}>
                <div><b>72%</b><small>预算消耗率</small></div>
                <div><b>2笔</b><small>回款预警</small></div>
                <div><b>实时</b><small>毛利计算</small></div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span>Core Challenges</span>
          <h2>项目型服务企业面临的经营难点</h2>
          <p>如何在项目快速增长的同时，保持健康的利润水平与现金流？</p>
        </div>
        <div className={styles.challengeGrid}>
          {challenges.map((c, i) => (
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
          <h2>现代服务业"业财一体"架构</h2>
          <p>打通业务执行与财务核算，构建透明的经营中枢。</p>
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
          <h2>核心业务场景化应用</h2>
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
                <h4>😣 交付痛点</h4>
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
          <h2 style={{ color: '#fff' }}>数智化驱动交付确定性</h2>
          <p style={{ color: '#aebbd1' }}>为服务型企业建立可持续的盈利能力。</p>
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
        <h2>立即开启项目核算优化</h2>
        <p>预约行业顾问，获取《现代服务业业财一体化白皮书》与场景诊断</p>
        <div className={styles.ctaActions}>
          <button onClick={() => setIsDemoOpen(true)} className={`${styles.btn} ${styles.btnPrimary}`}>
            立即预约专家
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
        source="industry-modern-service"
      />
    </div>
  )
}
