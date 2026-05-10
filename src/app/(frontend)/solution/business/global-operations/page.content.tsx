'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Globe, Landmark, Truck, Users, 
  ShieldCheck, BarChart3, Activity, CheckCircle, 
  ArrowRight, CreditCard, Ship, Search
} from 'lucide-react'
import styles from '../../industry/manufacturing/solution.module.css'
import { DemoRequestModal } from '@/components/DemoRequestModal'

export const GlobalOperationsContent: React.FC = () => {
  return (
    <div className={styles.solutionPage}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <span className={styles.label}>Global Operations Digital Suite</span>
            <h1>企业出海与全球运营</h1>
            <p className={styles.heroLead}>
              从单点出海到全球一体化运营，把财务、供应链、人力、合规和数据分析放进同一套管理框架。
            </p>
            <div className={styles.heroActions}>
              <DemoRequestModal 
                title="预约全球运营方案诊断" 
                source="business-global-operations"
                className={styles.btnPrimary}
              >
                预约方案诊断
              </DemoRequestModal>
              <a href="#scenarios" className={styles.btnSecondary}>查看核心场景</a>
            </div>
          </div>
          <aside className={styles.console}>
            <div className={styles.consoleHeader}>
              <span>Global Operations Console</span>
              <strong>预警与建议</strong>
            </div>
            <div className={styles.consoleGrid}>
              <div className={styles.metric}>
                <span>跨境对账差异</span>
                <strong>待复核</strong>
                <small>自动匹配率 94%</small>
              </div>
              <div className={styles.metric}>
                <span>海外库存可视</span>
                <strong>实时同步</strong>
                <small>3个海外仓已连通</small>
              </div>
              <div className={styles.metric}>
                <span>数据跨境合规</span>
                <strong>已预警</strong>
                <small>待授权确认</small>
              </div>
              <div className={styles.metric}>
                <span>全球资金看板</span>
                <strong>+12%</strong>
                <small>现金流头寸平稳</small>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span>Industry Challenges</span>
          <h2>出海进入深水区，管理重点从单点转向全球协同</h2>
          <p>多组织、多币种、多税制、多合规要求。企业需要一套能支撑全球治理与区域灵活经营的数智化底座。</p>
        </div>
        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <div className={styles.cardIcon}><Landmark size={24} /></div>
            <h3>全球财务与对账</h3>
            <p>支持多币种核算、跨境对账、费用归集与合并报表，实现全球业财口径一致。</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}><Truck size={24} /></div>
            <h3>全球供应链协同</h3>
            <p>打通总部计划、海外本地采购、在途物流与区域仓配，提升库存周转与履约效率。</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}><ShieldCheck size={24} /></div>
            <h3>合规治理与安全性</h3>
            <p>梳理财税、隐私与数据合规边界，实现数据跨境透明、审批放行留痕。</p>
          </div>
        </div>
      </section>

      <section id="scenarios" className={styles.scenarios}>
        <div className={styles.sectionHead}>
          <span>Core Scenarios</span>
          <h2>覆盖全球化经营全链路的高频场景</h2>
        </div>
        <div className={styles.scenarioGrid}>
          {[
            { 
              title: '智能跨境对账', 
              desc: '汇总订单、收款、费用与汇率，生成核对建议草稿，由人工授权确认。',
              tags: ['对账效率', '准确性'] 
            },
            { 
              title: '海外渠道与零售', 
              desc: '管理海外经销商、代理商政策及自营门店/电商全渠道库存与业绩。',
              tags: ['渠道管控', '全渠道'] 
            },
            { 
              title: '全球资金看板', 
              desc: '实时汇总全球银行账户余额、资金计划与汇率风险，辅助决策。',
              tags: ['资金安全', '汇率预警'] 
            },
            { 
              title: '多区域合规人力', 
              desc: '按地区差异规划员工假勤、薪酬计算草稿，满足本地劳工法合规。',
              tags: ['本地化', '人力效能'] 
            },
            { 
              title: '海外生产与本地采购', 
              desc: '支撑海外工厂的生产计划、质量控制及本地供应商协同。',
              tags: ['本地制造', '全球协同'] 
            },
            { 
              title: '数据跨境评估辅助', 
              desc: '自动识别敏感数据与传输链路，生成评估建议草稿，确保合规。',
              tags: ['数据治理', '隐私保护'] 
            }
          ].map((item, idx) => (
            <div key={idx} className={styles.scenarioCard}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <div className={styles.tags}>
                {item.tags.map(t => <span key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.pathway}>
        <div className={styles.sectionHead}>
          <span>Implementation Road</span>
          <h2>分阶段跑通全球化运营数智化路径</h2>
        </div>
        <div className={styles.timeline}>
          <div className={styles.timelineItem}>
            <b>01</b>
            <div>
              <h3>出海蓝图与治理评估</h3>
              <p>识别业务阶段、合规边界、数据口径及多区域部署规划。</p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <b>02</b>
            <div>
              <h3>核心区域与场景试点</h3>
              <p>跑通跨境对账、海外库存可视或全球财务合并闭环。</p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <b>03</b>
            <div>
              <h3>全业务闭环扩展</h3>
              <p>扩展到海外工厂、全球人力、本地零售及多系统深度集成。</p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <b>04</b>
            <div>
              <h3>数智运营与 AI 预警</h3>
              <p>引入 ChatBI 与 AI 合规预警，辅助进行全球经营复盘与策略优化。</p>
            </div>
          </div>
        </div>
      </section>

      <section id="diagnosis" className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2>助力中国企业走向全球一体化运营</h2>
          <p>泊冉顾问将根据您的出海阶段与业务特征，为您提供量身定制的数智化建议。</p>
          <div className={styles.ctaActions}>
            <DemoRequestModal 
              title="获取出海数智化自查清单" 
              source="business-global-operations-bottom"
              className={styles.btnPrimary}
            >
              预约专家诊断
            </DemoRequestModal>
            <a href="tel:400-9955-161" className={styles.btnSecondary}>拨打 400-9955-161</a>
          </div>
        </div>
      </section>
    </div>
  )
}
