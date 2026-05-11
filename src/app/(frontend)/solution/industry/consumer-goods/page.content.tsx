'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  ShoppingBag, Users, Truck, BarChart3, 
  Settings2, Activity, CheckCircle, ArrowRight,
  Store, ClipboardCheck, Tag, Zap
} from 'lucide-react'
import styles from '../solution.module.css'
import { DemoRequestModal } from '@/components/DemoRequestModal'

export const ConsumerGoodsContent: React.FC = () => {
  return (
    <div className={styles.solutionPage}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <span className={styles.label}>Consumer Goods Digital Operations</span>
            <h1>消费品：全渠道业财一体化</h1>
            <p className={styles.heroLead}>
              打通 DMS 经销商协同、SFA 终端执行与产销质量闭环，让经营决策更有据可依。
            </p>
            <div className={styles.heroActions}>
              <DemoRequestModal 
                title="预约消费品场景诊断" 
                source="industry-consumer-goods"
                className={styles.btnPrimary}
              >
                预约方案诊断
              </DemoRequestModal>
              <a href="#scenarios" className={styles.btnSecondary}>查看样板场景</a>
            </div>
          </div>
          <aside className={styles.console}>
            <div className={styles.consoleHeader}>
              <span>Digital Sales Command Center</span>
              <strong>实时经营监测</strong>
            </div>
            <div className={styles.consoleGrid}>
              <div className={styles.metric}>
                <span>全渠道订单归集</span>
                <strong>100%</strong>
                <small>DMS/门店/电商同步</small>
              </div>
              <div className={styles.metric}>
                <span>渠道费用核销率</span>
                <strong>92%</strong>
                <small>环比提升 8%</small>
              </div>
              <div className={styles.metric}>
                <span>畅销品齐套率</span>
                <strong>96%</strong>
                <small>智能补货已触发</small>
              </div>
              <div className={styles.metric}>
                <span>质量追溯覆盖</span>
                <strong>全批次</strong>
                <small>从原料到终端</small>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span>Industry Challenges</span>
          <h2>消费品数智化的核心，是把“人货场”变成员工与客户的协同闭环</h2>
          <p>解决渠道散、费用多、订单杂、产销脱节的问题，让每一分投入都能算清 ROI。</p>
        </div>
        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <div className={styles.cardIcon}><Users size={24} /></div>
            <h3>DMS + SFA 深度协同</h3>
            <p>连接经销商订货与销售拜访、终端动销，让渠道政策执行透明、库存可视。</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}><Tag size={24} /></div>
            <h3>费用返利全闭环</h3>
            <p>把促销申请、预算核销、结案分析纳入流程，解决费用核销慢、结案难的问题。</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}><Zap size={24} /></div>
            <h3>产销一体与质量追溯</h3>
            <p>基于销售预测联动采购与委外生产，通过批次管理确保全生命周期的合规与安全。</p>
          </div>
        </div>
      </section>

      <section id="scenarios" className={styles.scenarios}>
        <div className={styles.sectionHead}>
          <span>Core Scenarios</span>
          <h2>覆盖消费品全链路的高频场景</h2>
        </div>
        <div className={styles.scenarioGrid}>
          {[
            { 
              title: '全渠道订单中心', 
              desc: '自动归集多平台、多渠道订单，按预设规则进行发货、对账与结算。',
              tags: ['效率提升', '对账闭环'] 
            },
            { 
              title: '经销商在线订货', 
              desc: '提供自助订货入口，自动校验客户信用、价格与返利，缩短履约周期。',
              tags: ['DMS', '信用管理'] 
            },
            { 
              title: '终端拜访与陈列', 
              desc: '规范 SFA 终端执行，记录陈列检查、动销数据与竞品反馈。',
              tags: ['SFA', '动销分析'] 
            },
            { 
              title: '多维经营核算', 
              desc: '按品牌、渠道、品类、SKU 实时核算收入、成本与毛利，辅助决策。',
              tags: ['经营问数', '毛利看板'] 
            },
            { 
              title: '智能补货与调拨', 
              desc: '根据销售速度与安全库存自动生成补货建议，优化全网库存分布。',
              tags: ['库存周转', '智能协同'] 
            },
            { 
              title: 'AI 营销费用预警', 
              desc: '实时监测活动投入产出比，对预算超支或异常核销进行智能提醒。',
              tags: ['AI赋能', '风险控制'] 
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
          <h2>分阶段稳步提升消费品经营效能</h2>
        </div>
        <div className={styles.timeline}>
          <div className={styles.timelineItem}>
            <b>01</b>
            <div>
              <h3>场景诊断与场景试点</h3>
              <p>识别业务断点，优先跑通订单中心、费用核销或应收对账闭环。</p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <b>02</b>
            <div>
              <h3>全渠道与供应链打通</h3>
              <p>连接全量渠道数据，实现 DMS/SFA 融合及产销协同排程。</p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <b>03</b>
            <div>
              <h3>深化经营治理与集成</h3>
              <p>扩展到全量组织、质量追溯、BI 看板及第三方系统深度集成。</p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <b>04</b>
            <div>
              <h3>AI+智能决策优化</h3>
              <p>引入 AI 预警、ChatBI 经营直答，实现自动化经营复盘与ROI优化。</p>
            </div>
          </div>
        </div>
      </section>

      <section id="diagnosis" className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2>助力消费品企业实现高质量增长</h2>
          <p>泊冉顾问将根据您的渠道结构与管理痛点，为您提供分阶段的数智化演进路径。</p>
          <div className={styles.ctaActions}>
            <DemoRequestModal 
              title="获取消费品数智化方案" 
              source="industry-consumer-goods-bottom"
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
