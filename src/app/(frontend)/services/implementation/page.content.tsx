'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import styles from './implementation.module.css'
import { useAttribution } from '@/providers/Attribution'

export const ImplementationContent: React.FC = () => {
  const attribution = useAttribution()
  const [activeTab, setActiveTab] = useState<'growth' | 'enterprise'>('growth')
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      company: formData.get('company'),
      customer_type: formData.get('customer_type'),
      current_system: formData.get('current_system'),
      message: `${formData.get('remark')}\n\n关注服务: ${Array.from(formData.getAll('interest')).join(', ')}`,
      source: '系统实施服务',
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
        alert('预约成功！')
        ;(e.target as HTMLFormElement).reset()
      } else {
        alert('提交失败')
      }
    } catch (_err) {
      alert('网络错误')
    }
  }

  return (
    <main className={styles.main}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}>Service 01</div>
            <h1>系统实施服务<span><em>项目上线更可控</em></span></h1>
            <p>基于不同客户规模和产品形态，提供从方案设计到上线切换的专业实施服务。</p>
            <div className={styles.heroTags}>
              <span>SaaS快速上线</span><span>BIP敏捷交付</span><span>蓝图设计</span><span>上线切换</span>
            </div>
            <div className={styles.heroActions}>
              <Link href="#diagnosis" className={`${styles.btn} ${styles.btnPrimary}`}>预约实施评估</Link>
              <Link href="#service-path" className={`${styles.btn} ${styles.btnSecondary}`}>查看服务内容</Link>
            </div>
          </div>

          <aside className={styles.serviceConsole}>
            <div className={styles.consoleTop}>
              <div><span>Service Console</span><h2>服务全过程闭环</h2></div>
            </div>
            <div className={styles.loopVisual}>
              <div className={`${styles.loopCard} ${styles.loopCardCurrent}`}>
                <span className={styles.loopIndex}>01</span>
                <strong>系统实施</strong>
                <p>建设、交付、上线。</p>
              </div>
              <div className={styles.loopCard}>
                <span className={styles.loopIndex}>02</span>
                <strong>集成开发</strong>
                <p>连接、扩展、治理。</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Pain Points */}
      <section className={styles.section} id="pain-points">
        <div className={styles.sectionHead}>
          <div><span className={styles.sectionKicker}>Pain Points</span><h2>业务风险断点</h2></div>
          <p>先识别风险点，再定义服务范围。</p>
        </div>
        <div className={styles.painGrid}>
          <article className={styles.painCard}><h3 data-index="01">项目目标不清，实施范围不一致</h3></article>
          <article className={styles.painCard}><h3 data-index="02">需求发散，标准与客开边界不清</h3></article>
          <article className={styles.painCard}><h3 data-index="03">用户参与不足，上线后不会用</h3></article>
        </div>
      </section>

      {/* Service Path */}
      <section className={styles.sectionFluid} id="service-path">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <div><span className={styles.sectionKicker}>Service Path</span><h2>企业分层服务路径</h2></div>
          </div>
          <div className={styles.segmentShell}>
            <div className={styles.segmentTabs}>
              <button 
                className={`${styles.segmentTab} ${activeTab === 'growth' ? styles.segmentTabActive : ''}`}
                onClick={() => setActiveTab('growth')}
              >成长型客户</button>
              <button 
                className={`${styles.segmentTab} ${activeTab === 'enterprise' ? styles.segmentTabActive : ''}`}
                onClick={() => setActiveTab('enterprise')}
              >集团型客户</button>
            </div>
            <div className={styles.segmentPanel}>
              {activeTab === 'growth' ? (
                <>
                  <h3>SaaS 快速实施路径</h3>
                  <ul className={styles.chipList}><li>快速</li><li>标准优先</li><li>远程交付</li></ul>
                  <div className={styles.timeline}>
                    <article className={styles.timelineCard} data-step="01"><strong>成功规划</strong><p>项目启动、主计划确认</p><span>实施任务书、计划</span></article>
                    <article className={styles.timelineCard} data-step="02"><strong>构建上线</strong><p>配置、业务验证</p><span>配置清单、测试报告</span></article>
                    <article className={styles.timelineCard} data-step="03"><strong>培训上线</strong><p>用户培训、确认上线</p><span>操作视频、上线报告</span></article>
                  </div>
                </>
              ) : (
                <>
                  <h3>BIP 敏捷交付路径</h3>
                  <ul className={styles.chipList}><li>稳定</li><li>治理</li><li>可追溯</li></ul>
                  <div className={styles.timeline}>
                    <article className={styles.timelineCard} data-step="01"><strong>蓝图设计</strong><p>调研、方案设计</p><span>调研报告、蓝图方案</span></article>
                    <article className={styles.timelineCard} data-step="02"><strong>系统建设</strong><p>开发、联调验证</p><span>开发方案、集成测试报告</span></article>
                    <article className={styles.timelineCard} data-step="03"><strong>上线切换</strong><p>应急演练、系统切换</p><span>切换方案、上线报告</span></article>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Capability Grid */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div><span className={styles.sectionKicker}>Capabilities</span><h2>实施服务关键能力</h2></div>
        </div>
        <div className={styles.capabilityGrid}>
          <article className={styles.infoCard}><span className={styles.cardIcon}>01</span><h3>售前实施交接</h3><p>承接承诺，避免启动后重拉口径。</p></article>
          <article className={styles.infoCard}><span className={styles.cardIcon}>02</span><h3>价值引领匹配</h3><p>优先标准功能，减少无效定制。</p></article>
          <article className={styles.infoCard}><span className={styles.cardIcon}>03</span><h3>数据准备切换</h3><p>管理静态动态数据，准备回退预案。</p></article>
        </div>
      </section>

      {/* Diagnosis Section */}
      <section className={styles.section} id="diagnosis">
        <div className={styles.diagnosis}>
          <div className={styles.diagnosisCopy}>
            <span className={styles.sectionKicker}>Service Assessment</span>
            <h2>预约实施服务评估</h2>
            <p>梳理您的组织规模、系统复杂度，给出服务路径建议。</p>
            <div className={styles.diagnosisPoints}>
              <div><strong>识别阶段</strong><span>新系统上线、NC/NCC 升级等。</span></div>
              <div><strong>确认范围</strong><span>明确组织、账套、接口范围。</span></div>
            </div>
          </div>
          <form className={styles.leadForm} onSubmit={handleSubmit}>
            <h3>预约实施评估</h3>
            <div className={styles.fieldGrid}>
              <label><span>姓名 *</span><input name="name" type="text" required /></label>
              <label><span>手机 *</span><input name="phone" type="tel" required /></label>
            </div>
            <div className={styles.fieldGrid}>
              <label><span>公司名称 *</span><input name="company" type="text" required /></label>
              <label><span>当前系统</span><select name="current_system"><option>YonSuite</option><option>YonBIP</option><option>NC/NCC</option></select></label>
            </div>
            <label><span>需求备注</span><textarea name="remark" rows={3} /></label>
            <button type="submit" className={styles.submitBtn}>提交评估申请</button>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div><span className={styles.sectionKicker}>FAQ</span><h2>常见问题</h2></div>
        </div>
        <div className={styles.faqList}>
          {[
            { q: 'SaaS 上线和 BIP 交付怎么判断？', a: '主要看业务差异、组织复杂度和客开需求量。' },
            { q: '项目启动前需准备什么？', a: '组织架构、岗位权限、业务流程和历史数据样例。' }
          ].map((faq, idx) => (
            <div key={idx} className={styles.faqItem}>
              <button type="button" onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
                <span>{faq.q}</span>
              </button>
              {activeFaq === idx && <p>{faq.a}</p>}
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
