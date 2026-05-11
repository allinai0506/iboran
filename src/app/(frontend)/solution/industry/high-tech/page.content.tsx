'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Cpu, Zap, BarChart3, Settings2, ShieldCheck, 
  Layers, Database, Activity, CheckCircle, ArrowRight
} from 'lucide-react'
import styles from '../solution.module.css'
import { DemoRequestModal } from '@/components/DemoRequestModal'

export const HighTechSolutionContent: React.FC = () => {
  return (
    <div className={styles.solutionPage}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <span className={styles.label}>High-Tech & Electronics Solution</span>
            <h1>高科技电子：研产迭代与精益制造</h1>
            <p className={styles.heroLead}>
              在研发快、变更频、物料贵的行业环境下，我们帮助企业把研发项目、试制验证、供应协同与经营分析串成一条连续的数据链路。
            </p>
            <div className={styles.heroActions}>
              <DemoRequestModal 
                title="预约高科技行业方案诊断" 
                source="industry-high-tech"
                className={styles.btnPrimary}
              >
                预约方案诊断
              </DemoRequestModal>
              <a href="#scenarios" className={styles.btnSecondary}>查看核心场景</a>
            </div>
          </div>
          <aside className={styles.console}>
            <div className={styles.consoleHeader}>
              <span>High-Tech Operation Center</span>
              <strong>实时风险预警</strong>
            </div>
            <div className={styles.consoleGrid}>
              <div className={styles.metric}>
                <span>研发项目进度</span>
                <strong>85%</strong>
                <small>关键里程碑完成</small>
              </div>
              <div className={styles.metric}>
                <span>关键料齐套率</span>
                <strong>94%</strong>
                <small>2项主料需跟进</small>
              </div>
              <div className={styles.metric}>
                <span>试制一次合格率</span>
                <strong>92%</strong>
                <small>环比提升 5%</small>
              </div>
              <div className={styles.metric}>
                <span>项目动态毛利</span>
                <strong>+18%</strong>
                <small>预算执行平稳</small>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span>Industry Challenges</span>
          <h2>高科技电子企业的管理重点，在于“快”与“精”</h2>
          <p>研发迭代快、订单变更频、物料单价高，需要的不只是记录，而是全链路的协同预警。</p>
        </div>
        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <div className={styles.cardIcon}><Zap size={24} /></div>
            <h3>研发迭代协同</h3>
            <p>从项目立项、版本管理到试制验证，让研发交付物无缝转入采购与生产。</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}><Database size={24} /></div>
            <h3>关键料与长周期管理</h3>
            <p>针对高价值、长周期物料建立备料计划与风险预警，降低缺料风险与库存资金占用。</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}><ShieldCheck size={24} /></div>
            <h3>全生命周期追溯</h3>
            <p>基于批次与序列号，记录从供应商、到货检验、生产工序到客户交付的全过程数据。</p>
          </div>
        </div>
      </section>

      <section id="scenarios" className={styles.scenarios}>
        <div className={styles.sectionHead}>
          <span>Core Scenarios</span>
          <h2>覆盖高科技电子全链路的高频场景</h2>
        </div>
        <div className={styles.scenarioGrid}>
          {[
            { 
              title: '研发项目管理', 
              desc: '管好阶段任务、图纸版本、评审意见和样机成本。',
              tags: ['研发迭代', '版本控制'] 
            },
            { 
              title: '试制转量产协同', 
              desc: '管理试制批记录、工程变更(ECN)及其对库存、采购的影响。',
              tags: ['ECN变更', '试制验证'] 
            },
            { 
              title: 'MRP 齐套分析', 
              desc: '按订单、计划自动计算缺料情况，触发采购与委外建议。',
              tags: ['智能排产', '齐套预警'] 
            },
            { 
              title: '批次与SN追溯', 
              desc: '建立从原料、工序到成品序列号的完整追溯链。',
              tags: ['质量追溯', '合规管理'] 
            },
            { 
              title: '多基地/组织协同', 
              desc: '支持研发中心与多个工厂之间的业务调拨与数据同步。',
              tags: ['集团管控', '组织协同'] 
            },
            { 
              title: '项目经营驾驶舱', 
              desc: '实时汇总项目收入、采购支出、人工成本与动态毛利。',
              tags: ['AI问数', '决策支持'] 
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
          <h2>分阶段跑通高科技电子业务闭环</h2>
        </div>
        <div className={styles.timeline}>
          <div className={styles.timelineItem}>
            <b>01</b>
            <div>
              <h3>主数据与BOM治理</h3>
              <p>统一物料编码、替代料规则及 EBOM/PBOM 版本管理。</p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <b>02</b>
            <div>
              <h3>研产协同试点</h3>
              <p>跑通研发立项、样机试制、采购到货与成本归集链路。</p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <b>03</b>
            <div>
              <h3>全链路闭环扩展</h3>
              <p>扩展到全量订单、质量追溯、委外加工及集团财务合并。</p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <b>04</b>
            <div>
              <h3>AI+智能运营优化</h3>
              <p>引入 AI 预警、ChatBI 经营问数，辅助进行交期预测与毛利预警。</p>
            </div>
          </div>
        </div>
      </section>

      <section id="diagnosis" className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2>准备好提升您的研产效能了吗？</h2>
          <p>泊冉顾问将根据您的产品特征与业务现状，为您提供定制化的数智化演进路径。</p>
          <div className={styles.ctaActions}>
            <DemoRequestModal 
              title="获取高科技电子方案清单" 
              source="industry-high-tech-bottom"
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
