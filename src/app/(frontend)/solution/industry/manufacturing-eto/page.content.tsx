'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Wrench, Settings, Cpu, BarChart3, 
  Layers, Database, Activity, CheckCircle, ArrowRight,
  ClipboardList, GitBranch, Briefcase
} from 'lucide-react'
import styles from '../solution.module.css'
import { DemoRequestModal } from '@/components/DemoRequestModal'

export const ETOManufacturingContent: React.FC = () => {
  return (
    <div className={styles.solutionPage}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <span className={styles.label}>ETO & MTO Manufacturing Solution</span>
            <h1>研发型定制：让非标制造更精准</h1>
            <p className={styles.heroLead}>
              解决“边设计、边采购、边生产”的挑战，把项目计划、特征选配、订单 BOM 与成本核算串成闭环。
            </p>
            <div className={styles.heroActions}>
              <DemoRequestModal 
                title="预约研发型定制方案诊断" 
                source="industry-manufacturing-eto"
                className={styles.btnPrimary}
              >
                预约方案诊断
              </DemoRequestModal>
              <a href="#scenarios" className={styles.btnSecondary}>查看核心场景</a>
            </div>
          </div>
          <aside className={styles.console}>
            <div className={styles.consoleHeader}>
              <span>Project Management Dashboard</span>
              <strong>实时进度跟踪</strong>
            </div>
            <div className={styles.consoleGrid}>
              <div className={styles.metric}>
                <span>项目计划达成</span>
                <strong>91%</strong>
                <small>关键工序已完工</small>
              </div>
              <div className={styles.metric}>
                <span>订单 BOM 匹配</span>
                <strong>100%</strong>
                <small>选配规则自动校验</small>
              </div>
              <div className={styles.metric}>
                <span>在制成本偏差</span>
                <strong>-4.2%</strong>
                <small>预算执行良好</small>
              </div>
              <div className={styles.metric}>
                <span>交付提前期</span>
                <strong>-15%</strong>
                <small>协同效率提升</small>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span>Industry Challenges</span>
          <h2>研发型定制企业的管理断点，在于“变”与“控”</h2>
          <p>客户需求多变、工程变更频繁、项目成本难算。我们需要一套能支撑复杂选配与项目治理的底座。</p>
        </div>
        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <div className={styles.cardIcon}><Briefcase size={24} /></div>
            <h3>项目型制造治理</h3>
            <p>以项目为主线，挂接销售、研发、采购、生产、质量与财务数据，实现全生命周期管理。</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}><GitBranch size={24} /></div>
            <h3>特征选配与订单BOM</h3>
            <p>基于特征参数自动生成订单 BOM 与工艺，减少人工拆单压力，缩短从需求到生产的转化时间。</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}><BarChart3 size={24} /></div>
            <h3>项目实时成本核算</h3>
            <p>动态归集材料、人工、委外与制造费用，实时分析项目盈亏，辅助经营决策。</p>
          </div>
        </div>
      </section>

      <section id="scenarios" className={styles.scenarios}>
        <div className={styles.sectionHead}>
          <span>Core Scenarios</span>
          <h2>覆盖 ETO/MTO 模式下的核心数智场景</h2>
        </div>
        <div className={styles.scenarioGrid}>
          {[
            { 
              title: '配置化报价与方案', 
              desc: '按客户选配特征自动计算预估成本与建议报价，支持快速响应。',
              tags: ['ATO/MTO', '结构化定价'] 
            },
            { 
              title: '工程变更影响评估', 
              desc: '一键分析 ECN 变更对在途采购、在线生产、在库物料的影响。',
              tags: ['ECN', '风险控制'] 
            },
            { 
              title: '长周期件提前采购', 
              desc: '基于项目关键路径，提前锁定长周期物料，降低交付风险。',
              tags: ['路径分析', '齐套预警'] 
            },
            { 
              title: '非标工序委外协同', 
              desc: '管理委外发料、加工、质检与结算，实现外协全过程透明化。',
              tags: ['供应链协同', '进度同步'] 
            },
            { 
              title: '项目物料齐套分析', 
              desc: '实时查看项目各阶段物料到位情况，辅助精准排产。',
              tags: ['MRP/LRP', '缺料预警'] 
            },
            { 
              title: '移动报工与质检', 
              desc: '车间现场扫码报工、记录异常、上传图片，确保数据实时真实。',
              tags: ['MES', '质量追溯'] 
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
          <h2>研发型定制数智化落地路径</h2>
        </div>
        <div className={styles.timeline}>
          <div className={styles.timelineItem}>
            <b>01</b>
            <div>
              <h3>主数据与特征库建设</h3>
              <p>建立标准件库、参数化特征库与配置规则。 </p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <b>02</b>
            <div>
              <h3>项目全链路闭环试点</h3>
              <p>选择典型非标项目，跑通研发、采购、生产与核算闭环。</p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <b>03</b>
            <div>
              <h3>全量项目治理与集成</h3>
              <p>扩展到全量业务，并与 PLM、CRM 或第三方系统深度集成。</p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <b>04</b>
            <div>
              <h3>AI 赋能经营分析</h3>
              <p>引入 AI 预警与 ChatBI，实现项目盈利预测与交付瓶颈分析。</p>
            </div>
          </div>
        </div>
      </section>

      <section id="diagnosis" className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2>让每一个非标项目都尽在掌握</h2>
          <p>泊冉顾问将根据您的产品复杂程度与项目特征，为您提供分阶段的数智化演进路径。</p>
          <div className={styles.ctaActions}>
            <DemoRequestModal 
              title="获取研发型定制方案清单" 
              source="industry-manufacturing-eto-bottom"
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
