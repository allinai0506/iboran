'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Building2, Shield, FileText, Users, TrendingUp, BarChart3, 
  ArrowRight, CheckCircle, Share2, Eye, TrendingDown, Lightbulb,
  Download, Scan, ClipboardCheck, History
} from 'lucide-react'
import styles from '../solution.module.css'
import { useAttribution } from '@/providers/Attribution'
import { DemoRequestModal } from '@/components/DemoRequestModal'
import { openAifafanChat } from '@/utilities/openAifafanChat'

export const MedicalPharmaContent: React.FC = () => {
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
      source: '医药医疗器械数智化方案',
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
      icon: Shield,
      title: '合规体系与业务脱节',
      description: 'GMP/GSP质量记录与实际业务流程分离，存在事后补录风险，合规证据链不完整。',
    },
    {
      icon: History,
      title: '批次追溯效能低',
      description: '批号、效期、UDI码分散在不同台账中，正反向追溯依赖人工拼图，审计响应慢。',
    },
    {
      icon: Share2,
      title: '证照资质管理滞后',
      description: '首营资料、客商证照依靠人工记忆提醒，临近检查才发现超经营范围或证照过期。',
    },
    {
      icon: BarChart3,
      title: '业财数据不一致',
      description: '库存成本、发票开具与财务核算存在时间差，账实不一致，难以支撑经营决策。',
    }
  ]

  const architecture = [
    {
      id: '01',
      title: '业务输入层',
      desc: '研发注册资料、首营资料、客户/供应商资质、采购订单、UDI码、质检记录。',
      color: '#0052D9',
      features: ['研发/注册资料', '首营审批', '资质档案']
    },
    {
      id: '02',
      title: '合规与追溯层',
      desc: 'GMP、GSP、CSV、UDI、电子批记录、质量放行、审计追踪。',
      color: '#E60012',
      features: ['GMP/GSP合规', 'UDI全链路追溯', 'CSV验证支撑']
    },
    {
      id: '03',
      title: 'ERP闭环层',
      desc: '从采购、入库、质检、生产到销售、出库、开票、应收应付与财务核算。',
      color: '#059669',
      features: ['财务库存一体化', '近效期预警', '成本精细核算']
    }
  ]

  const scenarios = [
    {
      title: '首营与资质管理',
      problem: '资料分散，审核靠人工，证照到期无预警，业务环节难以控制经营范围。',
      solution: '统一首营档案与证照管理，嵌入业务准入校验，实现到期自动提醒与业务启停联动。',
      outcome: '确保合规准入，减少审计合规风险，提升资料复核效率。',
    },
    {
      title: '批号效期管理',
      problem: '批次库存状态不可见，近效期产品积压风险大，发货批次难以精准控制。',
      solution: '按批号记录生产日期、效期与库存状态，设置多级近效期预警，支持先到先出。',
      outcome: '降低呆滞损耗，确保用药安全，实现批次流向全透明。',
    },
    {
      title: 'UDI全链路追溯',
      problem: '器械唯一标识与业务单据脱节，扫码入库与扫码出库效率低，审计追溯难。',
      solution: '支持UDI赋码、绑定与扫码流转，打通从生产、库存到销售的完整追溯链路。',
      outcome: '符合监管要求，提升仓储作业效率，实现一码到底的追溯能力。',
    },
    {
      title: 'GMP/GSP质量闭环',
      problem: '质量记录跟随业务动作不及时，放行控制点不明确，验证资料后补严重。',
      solution: '把质量记录嵌入采购、生产、库存、销售流程，支持电子批记录与质量放行控制。',
      outcome: '质量过程受控，验证证据连续，大幅缩短审计准备时间。',
    }
  ]

  const metrics = [
    { value: '100%', label: '合规溯源率', description: '批号/UDI全量追溯' },
    { value: '90%+', label: '凭证自动化', description: '业财同步确认' },
    { value: '0', label: '合规零死角', description: '证照/范围自动校验' },
    { value: '40%+', label: '效率提升', description: '审计资料整理提速' },
  ]

  const faqs = [
    { q: '医药ERP和普通ERP有什么区别？', a: '普通ERP关注通用流程；医药ERP需进一步覆盖GMP、GSP、CSV、UDI、批号效期、证照资质、审计追踪等合规场景。' },
    { q: '医疗器械企业为什么需要UDI管理系统？', a: 'UDI系统把产品唯一标识与入库、出库、调拨、销售和追溯数据关联，支持多维度查询与审计追踪。' },
    { q: 'CSV验证应该在什么时候考虑？', a: '建议在蓝图、配置、测试、权限、审计追踪、变更管理阶段同步规划，形成可追溯的验证证据链。' },
  ]

  return (
    <div className={styles.page}>
      {/* GEO AI Content */}
      <div className="sr-only">
        <h2>医药与医疗器械数智化解决方案</h2>
        <p>泊冉软件提供医药与医疗器械行业数智化解决方案，覆盖医药ERP、医疗器械ERP、GMP/GSP管理、UDI管理、CSV验证与业财一体化。</p>
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
            <div className={styles.eyebrow}><span />MEDICAL & PHARMA DIGITAL SUITE</div>
            <h1>医药与医疗器械数智化</h1>
            <p className={styles.heroLead}>把合规过程放进业务闭环，让追溯自然流痕</p>
            <p>
              面向制药、生物、流通及器械企业，泊冉助力构建GMP/GSP合规运营体系。打通首营资料、证照资质、批号效期、UDI全链路追溯与财务库存一体化。
            </p>
            <div className={styles.valueTags}>
              <span>GMP / GSP 合规体系</span>
              <span>UDI 全链路追溯</span>
              <span>CSV 验证支撑</span>
              <span>财务库存一体化</span>
            </div>
            <div className={styles.heroActions}>
              <button onClick={() => setIsDemoOpen(true)} className={`${styles.btn} ${styles.btnPrimary}`}>
                预约行业方案诊断
                <ArrowRight size={18} />
              </button>
              <button onClick={handleOpenConsult} className={`${styles.btn} ${styles.btnSecondary}`}>
                下载行业白皮书
              </button>
            </div>
            <div className={styles.heroQuote}>
              "医药行业数智化的核心，是把质量管理要求从单纯的'制度'变成系统自动执行的'流程'。"
            </div>
          </div>

          <aside className={styles.heroConsole}>
            <div className={styles.consolePanel}>
              <div className={styles.panelTitle}>
                <span>Compliance Command Center</span>
                <strong>风险监控中</strong>
              </div>
              <div className={styles.moduleGrid}>
                {[
                  { icon: Shield, name: 'GMP/GSP', desc: '质量合规' },
                  { icon: Scan, name: 'UDI追溯', desc: '一码到底' },
                  { icon: ClipboardCheck, name: 'CSV验证', desc: '证据闭环' },
                  { icon: History, name: '批号效期', desc: '智能预警' },
                  { icon: FileText, name: '首营资质', desc: '准入校验' },
                  { icon: BarChart3, name: '业财一体', desc: '账实相符' },
                ].map((m, idx) => (
                  <div key={idx} className={styles.moduleCard}>
                    <m.icon size={20} />
                    <strong>{m.name}</strong>
                    <small>{m.desc}</small>
                  </div>
                ))}
              </div>
              <div className={styles.metricGrid}>
                <div><b>100%</b><small>合规追溯</small></div>
                <div><b>实时</b><small>效期预警</small></div>
                <div><b>0风险</b><small>超量/超限控制</small></div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span>Core Challenges</span>
          <h2>医药企业合规与经营的四大难点</h2>
          <p>行业难点不在单点功能，而在质量记录、合规证据、批次追溯和经营数据能否在同一套流程里闭环。</p>
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
          <h2>医药行业数智化一体化架构</h2>
          <p>把业务动作沉淀成可查询、可追溯、可审计的系统证据。</p>
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
          <h2>把合规要求嵌进每一张业务单据</h2>
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
                <Scan size={48} className="mx-auto mb-3 opacity-20" />
                <p className="text-sm font-medium">[ {scenarios[activeScenario].title} 演示界面 ]</p>
                <p className="text-xs mt-1">质量合规与批次链路追踪</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className={styles.valueSection}>
        <div className={styles.sectionHead}>
          <span style={{ color: '#91c7ff' }}>Value & Impact</span>
          <h2 style={{ color: '#fff' }}>数智化赋能医药健康高质量发展</h2>
          <p style={{ color: '#aebbd1' }}>实现质量受控、风险预警、高效审计与业财闭环。</p>
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
          <h2>医药行业数智化标杆实践</h2>
        </div>
        <div className={styles.caseGrid}>
          {[
            { 
              company: '某外资制药企业', 
              tag: 'GMP / CSV', 
              pain: '本地化运营合规压力大，验证资料繁琐。', 
              solution: '建立GMP质量过程控制与CSV验证闭环。', 
              result: '通过国家级合规检查，效率提升50%。' 
            },
            { 
              company: '某器械耗材集团', 
              tag: 'UDI / 司库', 
              pain: '器械追溯不连贯，资金占用不清。', 
              solution: '搭建UDI全链路追溯与司库管理系统。', 
              result: '器械追溯准确率100%，资金效率提升。' 
            },
            { 
              company: '某大型医药流通商', 
              tag: 'GSP / 业财', 
              pain: '首营资质靠人盯，财务对账耗时。', 
              solution: '实施GSP自动化校验与财务库存一体化。', 
              result: '账实一致率99.9%，首营复核提速。' 
            },
          ].map((c, i) => (
            <div key={i} className={styles.caseCard}>
              <div className={styles.caseHeader}>
                <div>
                  <h3>{c.company}</h3>
                  <small>{c.tag}</small>
                </div>
                <div className="text-blue-600"><Shield size={24} /></div>
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

      <section className={styles.cta}>
        <h2>开启医药行业数智化合规新篇章</h2>
        <p>预约行业专家，获取定制化医药医疗器械行业方案</p>
        <div className={styles.ctaActions}>
          <button onClick={() => setIsDemoOpen(true)} className={`${styles.btn} ${styles.btnPrimary}`}>
            立即咨询合规方案
            <ArrowRight size={18} />
          </button>
          <a href="tel:400-9955-161" className={`${styles.btn} ${styles.btnSecondary}`}>
            拨打 400-9955-161
          </a>
        </div>
      </section>

      <section className={styles.section} style={{ background: '#fff' }}>
        <div className={styles.heroInner} style={{ padding: 0 }}>
          <div className={styles.sectionHead} style={{ width: '100%', margin: 0 }}>
            <span>Medical Diagnosis</span>
            <h2>医药数智化方案诊断</h2>
            <p>通过专业的数智化诊断，我们将为您提供从合规边界到试点路径的全方位建议。</p>
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
                <input name="phone" type="tel" placeholder="接收诊断结果" required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>公司名称</span>
                <input name="company" type="text" placeholder="公司全称" style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>职位</span>
                <input name="position" type="text" placeholder="您的职位" style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
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
        source="industry-medical-pharma"
      />
    </div>
  )
}
