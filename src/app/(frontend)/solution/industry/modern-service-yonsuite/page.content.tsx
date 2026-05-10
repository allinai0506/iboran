'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Building2, Users, BarChart3, ArrowRight, CheckCircle, 
  FileText, Briefcase, Clock, CreditCard, PieChart, TrendingUp, TrendingDown, Search,
  Cloud, Zap, ShieldCheck, Smartphone
} from 'lucide-react'
import styles from '../solution.module.css'
import { useAttribution } from '@/providers/Attribution'
import { DemoRequestModal } from '@/components/DemoRequestModal'
import { openAifafanChat } from '@/utilities/openAifafanChat'

export const ModernServiceYonSuiteContent: React.FC = () => {
  const attribution = useAttribution()
  const [activeScenario, setActiveScenario] = useState(0)
  const [isDemoOpen, setIsDemoOpen] = useState(false)

  const handleOpenConsult = () => {
    openAifafanChat()
  }

  const challenges = [
    {
      icon: Cloud,
      title: 'IT资源极度匮乏',
      description: '成长型服务企业通常没有专职IT，传统ERP维护难、成本高，需要零运维、在线化的云原生系统。',
    },
    {
      icon: Smartphone,
      title: '员工分布散，填报难',
      description: '交付人员常年驻场或居家办公，传统PC端系统填报率低，急需极简、易用的手机端工时与费用入口。',
    },
    {
      icon: TrendingDown,
      title: '项目损益看不到',
      description: '项目越做越多，但每个项目赚多少钱、人员闲置率多高，完全靠拍脑袋，缺乏实时的数字化经营视图。',
    },
    {
      icon: Zap,
      title: '业财断点，对账烦',
      description: '业务合同执行、人员投入与财务报销核算完全脱节，月底为了分摊成本、冲销费用，财务忙得不可开交。',
    }
  ]

  const architecture = [
    {
      id: '01',
      title: '云原生项目底座',
      desc: '基于YonSuite纯云架构，无需买服务器，1周即可跑通从立项到核算的闭环。',
      color: '#0052D9',
      features: ['多租户隔离', '零维护成本', '在线自动升级']
    },
    {
      id: '02',
      title: '移动协同中心',
      desc: '深度集成移动端，让员工在手机上完成工时、费用、审批与进度填报。',
      color: '#E60012',
      features: ['随时随地报销', '极简工时填报', '移动经营看板']
    },
    {
      id: '03',
      title: '实时业财经营',
      desc: '业务动作即财务分录，实时计算项目损益、资源利用率与回款偏差。',
      color: '#059669',
      features: ['秒级损益计算', '自动收入确认', '多维获利分析']
    }
  ]

  const scenarios = [
    {
      title: '极速立项与排期',
      problem: '立项流程长，人员排期靠Excel，容易冲突。',
      solution: '合同在线转项目，图形化查看资源负载，一键完成人员指派。',
      outcome: '立项效率提升 70%，资源利用率显著提高。',
    },
    {
      title: '移动工时与即时报销',
      problem: '员工嫌系统难用，月底突击补填，数据不准。',
      solution: '手机端"傻瓜式"工时日历，费用报销随手拍，系统自动归集到具体项目任务。',
      outcome: '数据实时准确，财务月初关账提速 3-5 天。',
    },
    {
      title: '里程碑驱动回款',
      problem: '交付进度财务不知道，回款节点经常漏。',
      solution: '项目经理确认里程碑，系统自动推送开票申请，回款状态全闭环。',
      outcome: '现金流更稳健，减少死账风险。',
    },
    {
      title: '项目经理经营驾驶舱',
      problem: '项目经理只管干活，不管盈亏。',
      solution: '手机端直接看项目毛利、预算余额、回款情况，做有经营意识的交付。',
      outcome: '全员经营体感增强，整体项目利润率稳步提升。',
    }
  ]

  const metrics = [
    { value: '2周', label: '平均上线周期', description: '标准化快速交付' },
    { value: '95%+', label: '工时填报准确率', description: '通过移动端便捷入口' },
    { value: '20%', label: '运营成本降低', description: '省去软硬件运维支出' },
    { value: '实时', label: '项目获利分析', description: '每一分钱都有出处' },
  ]

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.gridBg} />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}><span />YONSUITE SERVICE CLOUD</div>
            <h1>成长型服务业数智化</h1>
            <p className={styles.heroLead}>云原生项目管理，让增长更稳健，让交付更高效</p>
            <p>
              依托用友YonSuite云原生平台，泊冉为中小项目型服务企业提供"轻资产、快落地、全在线"的数智化方案。实现业务、协同、财务三位一体。
            </p>
            <div className={styles.valueTags}>
              <span>纯云架构 · 零运维</span>
              <span>全移动端办公</span>
              <span>秒级项目损益分析</span>
              <span>快交付 · 高性价比</span>
            </div>
            <div className={styles.heroActions}>
              <button onClick={() => setIsDemoOpen(true)} className={`${styles.btn} ${styles.btnPrimary}`}>
                预约YonSuite方案演示
                <ArrowRight size={18} />
              </button>
              <button onClick={handleOpenConsult} className={`${styles.btn} ${styles.btnSecondary}`}>
                查看成长型服务案例
              </button>
            </div>
          </div>

          <aside className={styles.heroConsole}>
            <div className={styles.consolePanel}>
              <div className={styles.panelTitle}>
                <span>YonSuite Project Cloud</span>
                <strong>在线运行中</strong>
              </div>
              <div className={styles.moduleGrid}>
                {[
                  { icon: Cloud, name: '云项目', desc: '随需扩容' },
                  { icon: Smartphone, name: '移动办公', desc: '随时随地' },
                  { icon: Zap, name: '极速核算', desc: '业财同步' },
                  { icon: Clock, name: '极简工时', desc: '精准核人' },
                  { icon: PieChart, name: '实时毛利', desc: '穿透到单' },
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
                <div><b>0运维</b><small>云端托管</small></div>
                <div><b>7*24h</b><small>系统可用</small></div>
                <div><b>快速</b><small>上线闭环</small></div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span>Core Challenges</span>
          <h2>成长型服务企业的三大经营阵痛</h2>
          <p>如何在资源有限的情况下，实现从"忙碌交付"到"数智经营"的跨越？</p>
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
          <h2>YonSuite 现代服务业"快经营"架构</h2>
          <p>轻资产、重效率，专为成长型服务企业打造的数智底座。</p>
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
          <h2>YonSuite 项目管理明星场景</h2>
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
                <h4>😣 运营痛点</h4>
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
          <h2 style={{ color: '#fff' }}>YonSuite 驱动服务业效率变革</h2>
          <p style={{ color: '#aebbd1' }}>为每一家成长型服务企业提供大企业级的数字化能力。</p>
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
        <h2>立即开启您的云端项目经营之旅</h2>
        <p>预约行业顾问，免费获取成长型服务企业数智化转型路线图</p>
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
        source="industry-modern-service-yonsuite"
      />
    </div>
  )
}
