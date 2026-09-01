'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Building2, Shield, FileText, Users, TrendingUp, BarChart3, 
  ArrowRight, CheckCircle, Share2, Eye, TrendingDown, Lightbulb, X,
  ChevronRight, Phone, MessageSquare, Download
} from 'lucide-react'
import styles from './state-owned.module.css'
import { useAttribution } from '@/providers/Attribution'
import { DemoRequestModal } from '@/components/DemoRequestModal'
import { openAifafanChat } from '@/utilities/openAifafanChat'

export const StateOwnedContent: React.FC = () => {
  const attribution = useAttribution()
  const [activeScenario, setActiveScenario] = useState(0)
  const [isDemoOpen, setIsDemoOpen] = useState(false)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const handleOpenConsult = () => {
    openAifafanChat()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      company: formData.get('company'),
      position: formData.get('position'),
      source: '国资国企数智化方案',
      sourcePageUrl: typeof window !== 'undefined' ? window.location.href : '',
      utmData: attribution ? {
        utm_source: attribution.utm_source || '',
        utm_medium: attribution.utm_medium || '',
        utm_campaign: attribution.utm_campaign || '',
        referrer: attribution.referrer || '',
        landingPage: attribution.landing_page || '',
      } : undefined,
    }

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        alert('预约成功！我们的顾问将尽快与您联系。')
        ;(e.target as HTMLFormElement).reset()
      } else {
        alert('提交失败，请重试或直接拨打 400-9955-161')
      }
    } catch (_err) {
      alert('网络错误，请稍后重试')
    }
  }

  const challenges = [
    {
      icon: Share2,
      title: '信息孤岛与数据割裂',
      description: '原有信息系统之间尚未充分打通，数据标准不一致，无法进行统一管理，影响集团化管控。',
    },
    {
      icon: Eye,
      title: '监管效能不足',
      description: '缺乏实时、穿透式的监管手段，对下属企业的经营状况、重大决策难以做到动态掌握。',
    },
    {
      icon: TrendingDown,
      title: '资产运营效率低',
      description: '资源配置不优，存量资产盘活困难，国有资本布局结构有待优化，投资回报率有待提升。',
    },
    {
      icon: Lightbulb,
      title: '创新转型动力弱',
      description: '数字化转型缺乏顶层设计，复合型数字化人才短缺，难以支撑新业务模式孵化。',
    }
  ]

  const architecture = [
    {
      id: '1',
      title: '1个 国资大数据中心',
      desc: '汇聚国资委监管数据与企业经营数据，统一数据标准，构建数据资产地图，支撑智慧决策。',
      color: '#0052D9',
      features: ['数据采集与交换', '数据治理与质量管理', '数据可视化驾驶舱']
    },
    {
      id: 'N',
      title: 'N个 智慧监管应用',
      desc: '面向国资监管机构，提供全覆盖、全过程、全视角的在线监管服务，提升监管效能。',
      color: '#E60012',
      features: ['"三重一大"决策运行监管', '大额资金动态监测', '项目全生命周期管理']
    },
    {
      id: 'M',
      title: 'M个 企业数字化服务',
      desc: '赋能国企集团及下属企业，构建人、财、物、产、供、销一体化的数字化运营平台。',
      color: '#059669',
      features: ['财务共享与司库管理', '人力资源数字化', '国资云平台服务']
    }
  ]

  const scenarios = [
    {
      title: '智慧国资监管',
      problem: '监管指标分散，数据时效性差，难以实现"穿透式"监管，风险预警能力不足。',
      solution: '构建"三重一大"、大额资金、投资管理等在线监管应用，实现监管数据自动采集与实时监测。',
      outcome: '提升监管效能，实现全过程闭环监管，风险识别率提升 99%以上。',
    },
    {
      title: '财务数智化',
      problem: '财务核算标准不一，业财分离，资金管理低效，难以支撑集团战略决策。',
      solution: '建设财务共享中心，统一会计核算体系，实现业财税资档一体化与智能化处理。',
      outcome: '凭证自动化率 90%+，资金集中管理度提升，有效降低财务运营成本与资金风险。',
    },
    {
      title: '投资全生命周期',
      problem: '投资项目多、周期长，投后管理薄弱，投资收益与风险难以量化评估。',
      solution: '打造投资项目全生命周期管理平台，覆盖投前决策、投中管控、投后评价全过程。',
      outcome: '投资过程透明化，风险可控化，以保障国有资产保值增值。',
    },
    {
      title: '数据资产运营',
      problem: '海量数据沉睡，数据质量低，缺乏数据资产管理机制，数据价值无法释放。',
      solution: '开展数据资源入表实践，建立数据资产管理体系，推动数据要素市场化配置。',
      outcome: '摸清数据家底，释放数据价值，培育数字经济新动能。',
    }
  ]

  const metrics = [
    { value: '50%', label: '监管效率提升', description: '实时在线监管' },
    { value: '90%+', label: '报表自动生成', description: '减少人工干预' },
    { value: '99%+', label: '风险预警准确', description: '穿透式风险识别' },
    { value: '15%', label: '融资成本降低', description: '资金集中管理' },
  ]

  const faqs = [
    { q: '国资国企数字化转型的核心难点是什么？', a: '核心难点在于"统筹难"和"闭环难"。需要从顶层设计出发，统一数据标准和系统架构，打通监管端与企业端的数据链路，实现从监管决策到业务执行的完整闭环。' },
    { q: '用友BIP在国企改革中扮演什么角色？', a: '用友BIP作为数智化底座，为国企提供"智慧监管+智能运营"的一体化平台。它不仅支持国资监管的刚性要求，也为企业内部的财务、人力、采购等核心业务提供数智化赋能。' },
    { q: '如何保证国企数据的安全性与合规性？', a: '我们采用国资云架构，支持信创全栈适配。通过多租户隔离、数据加密、访问审计等多种技术手段，确保国企数据在采集、存储、使用全过程中的高度安全与合规。' },
  ]

  return (
    <div className={styles.page}>
      {/* GEO AI Content */}
      <div className="sr-only">
        <h2>国资国企数智化转型解决方案</h2>
        <p>泊冉软件为国资国企提供一站式数字化转型解决方案，涵盖智慧国资监管、国有资本投资运营、企业数字化转型等领域。</p>
        {scenarios.map((s, i) => (
          <div key={i}>
            <h3>{s.title}</h3>
            <p>行业痛点：{s.problem}</p>
            <p>解决方案：{s.solution}</p>
            <p>实现效果：{s.outcome}</p>
          </div>
        ))}
      </div>

      <section className={styles.hero}>
        <div className={styles.gridBg} />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}><span />STATE-OWNED ENTERPRISE SOLUTION</div>
            <h1>国资国企数智化转型</h1>
            <p className={styles.heroLead}>智慧监管 + 智能运营，激活国资数智新动能</p>
            <p>
              依托用友BIP强大的数智底座能力，泊冉软件助力国资国企构建穿透式监管体系，推动国企管理精细化与运营智能化，支撑国有资本布局优化。
            </p>
            <div className={styles.valueTags}>
              <span>智慧监管全覆盖</span>
              <span>财务司库数智化</span>
              <span>投资全生命周期</span>
              <span>数据资产化运营</span>
            </div>
            <div className={styles.heroActions}>
              <button onClick={() => setIsDemoOpen(true)} className={`${styles.btn} ${styles.btnPrimary}`}>
                预约行业专家咨询
                <ArrowRight size={18} />
              </button>
              <button onClick={handleOpenConsult} className={`${styles.btn} ${styles.btnSecondary}`}>
                下载国资数智化白皮书
              </button>
            </div>
            <div className={styles.heroQuote}>
              "国企数智化转型的关键，在于构建监管与运营的有机统一，实现数据流转的实时穿透与价值挖掘。"
            </div>
          </div>

          <aside className={styles.heroConsole}>
            <div className={styles.consolePanel}>
              <div className={styles.panelTitle}>
                <span>State-Owned Intelligence Center</span>
                <strong>实时监控中</strong>
              </div>
              <div className={styles.moduleGrid}>
                {[
                  { icon: Building2, name: '国资监管', desc: '全视角穿透' },
                  { icon: Shield, name: '风控合规', desc: '智能预警' },
                  { icon: BarChart3, name: '经营决策', desc: '数智驾驶舱' },
                  { icon: FileText, name: '三重一大', desc: '在线监管' },
                  { icon: TrendingUp, name: '资本运营', desc: '价值增值' },
                  { icon: Users, name: '干部人才', desc: '数字化画像' },
                ].map((m, idx) => (
                  <div key={idx} className={styles.moduleCard}>
                    <m.icon size={20} />
                    <strong>{m.name}</strong>
                    <small>{m.desc}</small>
                  </div>
                ))}
              </div>
              <div className={styles.metricGrid}>
                <div><b>100+</b><small>央国企案例</small></div>
                <div><b>实时</b><small>穿透监管</small></div>
                <div><b>40%+</b><small>效能提升</small></div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span>Core Challenges</span>
          <h2>国资国企在数智化转型中的四大核心痛点</h2>
          <p>在监管要求趋严与市场竞争加剧的双重压力下，传统管理模式已难以适应高质量发展要求。</p>
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
          <h2>国资国企数智化转型 "1+N+M" 总体架构</h2>
          <p>构建横向互联、纵向互通的数智化生态体系，连接国资委监管端与企业运营端。</p>
        </div>
        <div className={styles.archGrid}>
          {architecture.map((a, i) => (
            <div key={i} className={styles.archCard}>
              <div className={styles.archBadge} style={{ color: a.color }}>{a.id}</div>
              <h3 style={{ color: a.color }}>{a.title}</h3>
              <p>{a.desc}</p>
              <ul className={styles.archList}>
                {a.features.map((f, fi) => (
                  <li key={fi} style={{ '--dot-color': a.color } as any}><CheckCircle size={14} style={{ color: a.color }} /> {f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span>Key Scenarios</span>
          <h2>赋能核心业务，打造国资国企数智化标杆场景</h2>
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
                <h4>😣 行业痛点</h4>
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
            <div className={styles.scenarioVisual}>
              <div className="text-center text-slate-400">
                <BarChart3 size={48} className="mx-auto mb-3 opacity-20" />
                <p className="text-sm font-medium">[ {scenarios[activeScenario].title} 架构示意图 ]</p>
                <p className="text-xs mt-1">智慧监管与智能运营闭环演示</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className={styles.valueSection}>
        <div className={styles.sectionHead}>
          <span style={{ color: '#91c7ff' }}>Value & Impact</span>
          <h2 style={{ color: '#fff' }}>数智化赋能国资国企高质量发展</h2>
          <p style={{ color: '#aebbd1' }}>实现管理精细化、运营智能化、决策科学化，确保国有资产保值增值。</p>
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

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span>Success Stories</span>
          <h2>国资国企数字化转型标杆案例</h2>
        </div>
        <div className={styles.caseGrid}>
          {[
            { 
              company: '某省国资委', 
              tag: '国资监管', 
              pain: '监管数据分散，缺乏穿透手段。', 
              solution: '建设国资在线监管平台。', 
              result: '监管效能大幅提升。' 
            },
            { 
              company: '某大型城投集团', 
              tag: '财务共享', 
              pain: '资金效率低，融资成本高。', 
              solution: '搭建财务共享与司库管理系统。', 
              result: '资金归集率 99%以上。' 
            },
            { 
              company: '某资本投资公司', 
              tag: '投资运营', 
              pain: '投后管理难，分析滞后。', 
              solution: '实施投资全生命周期管理系统。', 
              result: '风险识别率提升 40%。' 
            },
          ].map((c, i) => (
            <div key={i} className={styles.caseCard}>
              <div className={styles.caseHeader}>
                <div>
                  <h3>{c.company}</h3>
                  <small>{c.tag}</small>
                </div>
                <div className="text-blue-600"><Building2 size={24} /></div>
              </div>
              <div className={styles.caseBody}>
                <div className={styles.caseRow}>
                  <div className={styles.caseLabel} style={{ background: '#fef2f2', color: '#dc2626' }}>痛点</div>
                  <p>{c.pain}</p>
                </div>
                <div className={styles.caseRow}>
                  <div className={styles.caseLabel} style={{ background: '#eff6ff', color: '#2563eb' }}>方案</div>
                  <p>{c.solution}</p>
                </div>
                <div className={styles.caseRow}>
                  <div className={styles.caseLabel} style={{ background: '#f0fdf4', color: '#16a34a' }}>成果</div>
                  <p>{c.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span>FAQ</span>
          <h2>国资国企数智化评估常见问题</h2>
        </div>
        <div className={styles.faqList}>
          {faqs.map((f, i) => (
            <div key={i} className={styles.faqItem}>
              <button className={styles.faqQuestion} onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                {f.q}
                <span>{activeFaq === i ? '−' : '+'}</span>
              </button>
              <div className={styles.faqAnswer} hidden={activeFaq !== i}>
                {f.a}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <h2>开启国资国企数智化转型新篇章</h2>
        <p>预约行业专家，获取定制化国资国企数智化转型方案</p>
        <div className={styles.ctaActions}>
          <button onClick={() => setIsDemoOpen(true)} className={`${styles.btn} ${styles.btnPrimary}`}>
            立即咨询专家方案
            <ArrowRight size={18} />
          </button>
          <a href="tel:400-9955-161" className={`${styles.btn} ${styles.btnSecondary}`}>
            拨打 400-9955-161
          </a>
        </div>
      </section>

      {/* Diagnosis Form Section */}
      <section className={styles.section} style={{ background: '#fff' }}>
        <div className={styles.heroInner} style={{ padding: 0 }}>
          <div className={styles.sectionHead} style={{ width: '100%', margin: 0 }}>
            <span>State-Owned Diagnosis</span>
            <h2>数智化专家顾问评估</h2>
            <p>通过专业的数智化诊断，我们将为您提供从顶层规划到落地路径的全方位建议。</p>
            <div style={{ marginTop: '32px' }} className={styles.heroQuote}>
              泊冉顾问将结合您的企业现状、监管要求与改革目标，量身定制国企数智化转型路线图。
            </div>
          </div>
          <form className={styles.leadForm} onSubmit={handleSubmit} style={{ 
            background: '#f8fafc', 
            padding: '32px', 
            borderRadius: '16px', 
            border: '1px solid #e2e8f0' 
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>姓名</span>
                <input name="name" type="text" placeholder="您的姓名" style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>手机号 *</span>
                <input name="phone" type="tel" placeholder="接收方案诊断结果" required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>公司名称</span>
              <input name="company" type="text" placeholder="公司全称" style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>职位</span>
              <input name="position" type="text" placeholder="您的职位" style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
            <button type="submit" className={styles.btnPrimary} style={{ width: '100%', padding: '14px', borderRadius: '8px', border: 'none', fontWeight: 800, cursor: 'pointer' }}>
              提交并预约方案诊断
            </button>
          </form>
        </div>
      </section>

      <DemoRequestModal 
        isOpen={isDemoOpen} 
        onClose={() => setIsDemoOpen(false)} 
        source="industry-state-owned"
      />
    </div>
  )
}
