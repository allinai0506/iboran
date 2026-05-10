'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import styles from './operations.module.css'
import { useAttribution } from '@/providers/Attribution'

export const OperationsContent: React.FC = () => {
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
      source: '系统运维服务',
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
            <div className={styles.eyebrow}>Service 03</div>
            <h1>系统运维与客户成功服务<span><em>稳定运行与持续运营</em></span></h1>
            <p>围绕系统上线后的长期稳定运行，提供工单支持、系统巡检、月结保障、补丁升级等服务。</p>
            <div className={styles.heroTags}>
              <span>在线支持</span><span>系统巡检</span><span>月结保障</span><span>升级护航</span>
            </div>
            <div className={styles.heroActions}>
              <Link href="#diagnosis" className={`${styles.btn} ${styles.btnPrimary}`}>预约运维评估</Link>
              <Link href="#service-path" className={`${styles.btn} ${styles.btnSecondary}`}>查看服务内容</Link>
            </div>
          </div>

          <aside className={styles.serviceConsole}>
            <div className={styles.consoleTop}>
              <div><span>Service Console</span><h2>稳定运行闭环</h2></div>
            </div>
            <div className={styles.loopVisual}>
              <div className={styles.loopCard}>
                <span className={styles.loopIndex}>01</span>
                <strong>系统实施</strong>
                <p>建设、交付、上线。</p>
              </div>
              <div className={styles.loopCard}>
                <span className={styles.loopIndex}>02</span>
                <strong>集成开发</strong>
                <p>连接、扩展、治理。</p>
              </div>
              <div className={`${styles.loopCard} ${styles.loopCardCurrent}`}>
                <span className={styles.loopIndex}>03</span>
                <strong>系统运维</strong>
                <p>稳健、持续创造价值。</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Pain Points */}
      <section className={styles.section} id="pain-points">
        <div className={styles.sectionHead}>
          <div><span className={styles.sectionKicker}>Pain Points</span><h2>业务风险断点</h2></div>
        </div>
        <div className={styles.painGrid}>
          <article className={styles.painCard}><h3 data-index="01">问题缺少统一入口，处理不可追踪</h3></article>
          <article className={styles.painCard}><h3 data-index="02">关键时刻（月结、升级）缺少保障</h3></article>
          <article className={styles.painCard}><h3 data-index="03">知识没有沉淀，同类问题反复发生</h3></article>
        </div>
      </section>

      {/* Success Plans */}
      <section className={styles.sectionFluid}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <div><span className={styles.sectionKicker}>Success Plans</span><h2>分层客户成功计划</h2></div>
          </div>
          <div className={styles.capabilityGrid}>
            <article className={styles.infoCard}><h3>标准计划</h3><p>基础运行保障与管理员赋能。</p><ul className={styles.miniList}><li>操作手册、FAQ、培训视频</li><li>工单记录与问题跟踪</li></ul></article>
            <article className={styles.infoCard}><h3>优先计划</h3><p>深度应用指导与运营报告。</p><ul className={styles.miniList}><li>健康度评估</li><li>系统运营报告</li></ul></article>
            <article className={styles.infoCard}><h3>尊享计划</h3><p>专家辅导与业务创新规划。</p><ul className={styles.miniList}><li>开发者支持</li><li>业务创新最佳实践</li></ul></article>
          </div>
        </div>
      </section>

      {/* OMS Packages */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div><span className={styles.sectionKicker}>Packages</span><h2>OMS 场景服务包</h2></div>
        </div>
        <div className={styles.packageGrid}>
          <article className={styles.packageCard}>
            <div className={styles.cardIcon}>01</div>
            <h3>配置调整类</h3>
            <p>审批流、权限、组织架构等日常配置优化。</p>
          </article>
          <article className={styles.packageCard}>
            <div className={styles.cardIcon}>02</div>
            <h3>专项业务类</h3>
            <p>合并报表、业财对账、月结专项服务。</p>
          </article>
          <article className={styles.packageCard}>
            <div className={styles.cardIcon}>03</div>
            <h3>升级护航类</h3>
            <p>版本升级影响分析、回归测试与切换保障。</p>
          </article>
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
                  <h3>在线化、轻量化运维</h3>
                  <ul className={styles.chipList}><li>在线化</li><li>标准支持</li><li>持续迭代</li></ul>
                  <ul className={styles.checkList}>
                    <li>问题接入、工单记录与配置答疑</li>
                    <li>新版本功能说明与操作指引</li>
                    <li>模块启用与活跃情况分析</li>
                  </ul>
                </>
              ) : (
                <>
                  <h3>核心系统保障</h3>
                  <ul className={styles.chipList}><li>专属团队</li><li>驻场支持</li><li>月结值守</li></ul>
                  <ul className={styles.checkList}>
                    <li>专属服务小组定期跟进风险</li>
                    <li>月结 / 年结现场值守与复盘</li>
                    <li>重大问题分级响应与升级通道</li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Diagnosis Section */}
      <section className={styles.section} id="diagnosis">
        <div className={styles.diagnosis}>
          <div className={styles.diagnosisCopy}>
            <span className={styles.sectionKicker}>Service Assessment</span>
            <h2>预约运维服务评估</h2>
            <p>梳理您的日常运维风险点，给出保障方案建议。</p>
          </div>
          <form className={styles.leadForm} onSubmit={handleSubmit}>
            <h3>预约运维评估</h3>
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
    </main>
  )
}
