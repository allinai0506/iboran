'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Factory, Settings, Truck, BarChart3, 
  Layers, Database, Activity, CheckCircle, ArrowRight,
  ShieldCheck, Zap, Monitor
} from 'lucide-react'
import styles from '../manufacturing/solution.module.css'
import { DemoRequestModal } from '@/components/DemoRequestModal'

export const ManufacturingBIPContent: React.FC = () => {
  return (
    <div className={styles.solutionPage}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <span className={styles.label}>Advanced Manufacturing Solution</span>
            <h1>制造业：YonBIP 工业一体化</h1>
            <p className={styles.heroLead}>
              打通研产供销财全链路数据，支撑大中型制造企业从传统工厂向智能工厂、精益运营的全面跨越。
            </p>
            <div className={styles.heroActions}>
              <DemoRequestModal 
                title="预约制造业数智化诊断" 
                source="industry-manufacturing-bip"
                className={styles.btnPrimary}
              >
                预约方案诊断
              </DemoRequestModal>
              <a href="#scenarios" className={styles.btnSecondary}>查看核心能力</a>
            </div>
          </div>
          <aside className={styles.console}>
            <div className={styles.consoleHeader}>
              <span>Smart Factory Monitor</span>
              <strong>工厂状态：优</strong>
            </div>
            <div className={styles.consoleGrid}>
              <div className={styles.metric}>
                <span>产销协同率</span>
                <strong>98%</strong>
                <small>需求波动已自动对齐</small>
              </div>
              <div className={styles.metric}>
                <span>关键料齐套率</span>
                <strong>99.2%</strong>
                <small>无停工待料风险</small>
              </div>
              <div className={styles.metric}>
                <span>质量直通率</span>
                <strong>94.5%</strong>
                <small>同比提升 3.2%</small>
              </div>
              <div className={styles.metric}>
                <span>单位制造成本</span>
                <strong>-5.8%</strong>
                <small>精益改善成效显著</small>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span>Industry Challenges</span>
          <h2>解决“制造孤岛”，实现从计划到现场的纵向集成</h2>
          <p>制造业的价值增长点，在于产销的敏捷协同、物料的精准掌控与质量的全程闭环。</p>
        </div>
        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <div className={styles.cardIcon}><Monitor size={24} /></div>
            <h3>智能计划与产销协同</h3>
            <p>基于销售预测联动 MRP/APS 排产，动态匹配产能与物料，减少库存积压与交付延期。</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}><Settings size={24} /></div>
            <h3>精益生产与现场管理</h3>
            <p>数字化车间、工序级排程、移动报工与看板，让生产现场透明化、执行可追溯。</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}><BarChart3 size={24} /></div>
            <h3>业财一体与成本治理</h3>
            <p>自动归集直接材料、人工与制造费用，支持多种成本核算模型，实时监控经营毛利。</p>
          </div>
        </div>
      </section>

      <section id="scenarios" className={styles.scenarios}>
        <div className={styles.sectionHead}>
          <span>Core Scenarios</span>
          <h2>面向制造全流程的深度数智化场景</h2>
        </div>
        <div className={styles.scenarioGrid}>
          {[
            { 
              title: 'LRP/MRP 智能齐套', 
              desc: '按订单、计划自动进行齐套分析，生成采购与委外建议，确保不停工待料。',
              tags: ['缺料分析', '备料提醒'] 
            },
            { 
              title: '数字化质量追溯', 
              desc: '记录从供应商批次、工序参数到成品序列号的完整数据，支持一键追溯。',
              tags: ['批次管理', '质量合规'] 
            },
            { 
              title: '委外加工闭环协同', 
              desc: '管理外协申请、发料、加工、质检与结算，确保供应链端到端受控。',
              tags: ['外协管理', '进度透明'] 
            },
            { 
              title: '设备预测性维护', 
              desc: '监控核心设备状态，基于运行数据触发巡检与保养建议，降低故障停机。',
              tags: ['设备资产', '资产健康'] 
            },
            { 
              title: '项目型制造管理', 
              desc: '针对非标定制设备，以项目为主线挂接研产供销财数据，监控进度与毛利。',
              tags: ['ETO/MTO', '项目核算'] 
            },
            { 
              title: 'AI 经营问数 (ChatBI)', 
              desc: '通过语音或文字查询产量、良率、库存与毛利异常，辅助快速决策。',
              tags: ['AI赋能', '智慧管理'] 
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
          <h2>助力制造企业实现数智化转型飞跃</h2>
        </div>
        <div className={styles.timeline}>
          <div className={styles.timelineItem}>
            <b>01</b>
            <div>
              <h3>数智化现状诊断</h3>
              <p>评估业务断点、数据口径与流程痛点，输出演进蓝图。</p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <b>02</b>
            <div>
              <h3>核心场景试点落地</h3>
              <p>优先跑通产销协同、物料齐套或质量追溯闭环，产生可见价值。</p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <b>03</b>
            <div>
              <h3>工业一体化闭环扩展</h3>
              <p>扩展到全量工厂、供应商协同及深度业财一体化集成。</p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <b>04</b>
            <div>
              <h3>精益运营与智能优化</h3>
              <p>基于 AI 预警与大数据分析，实现主动运营、良率优化与成本精降。</p>
            </div>
          </div>
        </div>
      </section>

      <section id="diagnosis" className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2>构建您的工业数智化未来</h2>
          <p>泊冉顾问将根据您的产品工艺特征与管理基础，提供分阶段的落地建议。</p>
          <div className={styles.ctaActions}>
            <DemoRequestModal 
              title="获取制造业数智化方案" 
              source="industry-manufacturing-bip-bottom"
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
