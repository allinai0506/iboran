'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Stethoscope, ShieldCheck, Database, BarChart3, 
  Settings2, Activity, CheckCircle, ArrowRight,
  ClipboardCheck, ScanBarcode, FileCheck
} from 'lucide-react'
import styles from '../solution.module.css'
import { DemoRequestModal } from '@/components/DemoRequestModal'

export const MedicalPharmaYonSuiteContent: React.FC = () => {
  return (
    <div className={styles.solutionPage}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <span className={styles.label}>Medical & Pharma Digital Suite</span>
            <h1>医药与医疗器械：合规与数智化闭环</h1>
            <p className={styles.heroLead}>
              把 GMP、GSP、UDI、CSV、批号效期和业财一体化放进同一套合规运营闭环，驱动行业增长。
            </p>
            <div className={styles.heroActions}>
              <DemoRequestModal 
                title="预约医药行业方案诊断" 
                source="industry-medical-pharma-yonsuite"
                className={styles.btnPrimary}
              >
                预约方案诊断
              </DemoRequestModal>
              <a href="#scenarios" className={styles.btnSecondary}>查看合规场景</a>
            </div>
          </div>
          <aside className={styles.console}>
            <div className={styles.consoleHeader}>
              <span>Compliance Command Center</span>
              <strong>合规监测中</strong>
            </div>
            <div className={styles.consoleGrid}>
              <div className={styles.metric}>
                <span>GMP 质量放行</span>
                <strong>100%</strong>
                <small>电子签名可审计</small>
              </div>
              <div className={styles.metric}>
                <span>UDI 扫码绑定率</span>
                <strong>99.8%</strong>
                <small>实时追溯流向</small>
              </div>
              <div className={styles.metric}>
                <span>CSV 验证覆盖</span>
                <strong>全生命周期</strong>
                <small>合规风险受控</small>
              </div>
              <div className={styles.metric}>
                <span>近效期预警</span>
                <strong>12项</strong>
                <small>已推至供应链</small>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span>Industry Challenges</span>
          <h2>行业难点在于合规、质量与效率的平衡</h2>
          <p>医药行业系统要回答的不只是“业务是否在线”，还要确保“过程受控、证据完整、批次可追溯”。</p>
        </div>
        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <div className={styles.cardIcon}><ShieldCheck size={24} /></div>
            <h3>GMP/GSP 合规闭环</h3>
            <p>把首营资料、证照资质、验收复核记录嵌入日常业务，实现自然留痕、自动控制。</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}><ScanBarcode size={24} /></div>
            <h3>UDI 全链路追溯</h3>
            <p>基于医疗器械唯一标识，串联赋码、入库、出库、调拨与客户流向，支持一键追溯。</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}><FileCheck size={24} /></div>
            <h3>CSV 验证支持</h3>
            <p>沉淀 URS、配置、测试、权限、审计追踪与变更记录，缩短验证周期，降低审计风险。</p>
          </div>
        </div>
      </section>

      <section id="scenarios" className={styles.scenarios}>
        <div className={styles.sectionHead}>
          <span>Core Scenarios</span>
          <h2>覆盖医药与器械全生命周期的数智场景</h2>
        </div>
        <div className={styles.scenarioGrid}>
          {[
            { 
              title: '资质证照动态预警', 
              desc: '管好客商档案与首营资料，证照到期前自动提醒并限制高风险业务。',
              tags: ['合规准入', '到期预警'] 
            },
            { 
              title: '电子批记录 (EBR)', 
              desc: '记录生产全过程数据，支持电子签名与审计追踪，满足 GMP 监管要求。',
              tags: ['GMP', '可审计'] 
            },
            { 
              title: '批号效期智能管控', 
              desc: '按效期、批次进行先进先出，提供近效期库存预警，优化资金占用。',
              tags: ['库存健康', '批次管理'] 
            },
            { 
              title: 'UDI 扫码出入库', 
              desc: '移动端扫码即时同步库存与 UDI 流向，减少人工录入错误。',
              tags: ['移动作业', '全过程追溯'] 
            },
            { 
              title: '业财核算一体化', 
              desc: '发货、开票、应收、成本与总账基于同一事实，月底不再需要对账。',
              tags: ['财务对账', '经营核算'] 
            },
            { 
              title: 'AI 审计辅助助理', 
              desc: '自动整理审计清单素材，辅助质量人员准备检查材料，提升效率。',
              tags: ['AI赋能', '决策支持'] 
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
          <h2>分阶段稳步推进医药数智化转型</h2>
        </div>
        <div className={styles.timeline}>
          <div className={styles.timelineItem}>
            <b>01</b>
            <div>
              <h3>合规边界与蓝图梳理</h3>
              <p>界定监管要求、业务断点、质量控制点及 CSV 验证边界。</p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <b>02</b>
            <div>
              <h3>高频场景试点上线</h3>
              <p>优先跑通证照预警、批号效期管理、UDI 扫码或业财对账闭环。</p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <b>03</b>
            <div>
              <h3>全业务闭环集成</h3>
              <p>扩展到 GMP/GSP 完整流程、多组织交易及第三方系统集成。</p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <b>04</b>
            <div>
              <h3>数智运营深化</h3>
              <p>基于 ChatBI 与 AI 预警，实现经营问数、自动审计准备与运营优化。</p>
            </div>
          </div>
        </div>
      </section>

      <section id="diagnosis" className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2>构建合规与效率并重的运营体系</h2>
          <p>泊冉顾问将结合您的子行业特征与合规基础，提供阶段化的落地建议。</p>
          <div className={styles.ctaActions}>
            <DemoRequestModal 
              title="获取医药医疗器械行业方案" 
              source="industry-medical-pharma-bottom"
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
