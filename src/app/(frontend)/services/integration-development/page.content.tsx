'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import styles from './integration.module.css'
import { useAttribution } from '@/providers/Attribution'

export const IntegrationContent: React.FC = () => {
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
      source: '集成与开发服务',
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
            <div className={styles.eyebrow}>Service 02</div>
            <h1>集成与开发服务<span><em>系统互联与扩展</em></span></h1>
            <p>围绕企业多系统协同和个性化业务扩展需求，提供系统集成、API 对接、低代码扩展等服务。</p>
            <div className={styles.heroTags}>
              <span>API对接</span><span>数据集成</span><span>集成总线</span><span>低代码扩展</span>
            </div>
            <div className={styles.heroActions}>
              <Link href="#diagnosis" className={`${styles.btn} ${styles.btnPrimary}`}>预约集成评估</Link>
              <Link href="#service-path" className={`${styles.btn} ${styles.btnSecondary}`}>查看服务内容</Link>
            </div>
          </div>

          <aside className={styles.serviceConsole}>
            <div className={styles.consoleTop}>
              <div><span>Service Console</span><h2>互联与扩展闭环</h2></div>
            </div>
            <div className={styles.loopVisual}>
              <div className={styles.loopCard}>
                <span className={styles.loopIndex}>01</span>
                <strong>系统实施</strong>
                <p>建设、交付、上线。</p>
              </div>
              <div className={`${styles.loopCard} ${styles.loopCardCurrent}`}>
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
        </div>
        <div className={styles.painGrid}>
          <article className={styles.painCard}><h3 data-index="01">ERP、OA、MES、WMS 等系统割裂</h3></article>
          <article className={styles.painCard}><h3 data-index="02">接口缺少生命周期管理，异常难以补偿</h3></article>
          <article className={styles.painCard}><h3 data-index="03">定制需求失控，导致系统难以升级</h3></article>
        </div>
      </section>

      {/* Control Points */}
      <section className={styles.sectionFluid}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <div><span className={styles.sectionKicker}>Control Points</span><h2>受控集成控制点</h2></div>
          </div>
          <div className={styles.packageGrid}>
            <article className={styles.infoCard}><h3>标准产品优先</h3><p>优先标准 API，减少后期维护成本。</p></article>
            <article className={styles.infoCard}><h3>配置低代码优先</h3><p>能配置的不客开，能低代码的不专业开发。</p></article>
            <article className={styles.infoCard}><h3>补丁可追溯</h3><p>保留开发方案、版本说明和回滚预案。</p></article>
          </div>
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
                  <h3>标准连接 + 轻量扩展</h3>
                  <ul className={styles.chipList}><li>快速</li><li>标准</li><li>低成本</li></ul>
                  <ul className={styles.checkList}>
                    <li>钉钉、企业微信、OA 审批集成</li>
                    <li>银企、商旅、电商、发票系统对接</li>
                    <li>移动端低代码扩展</li>
                  </ul>
                </>
              ) : (
                <>
                  <h3>企业级集成治理 + 客开治理</h3>
                  <ul className={styles.chipList}><li>治理</li><li>可运维</li><li>升级适配</li></ul>
                  <ul className={styles.checkList}>
                    <li>集成架构设计与 API 生命周期管理</li>
                    <li>复杂接口联调与对账机制</li>
                    <li>客户化开发补丁版本治理</li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Process Strip */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div><span className={styles.sectionKicker}>Lifecycle</span><h2>集成服务生命周期</h2></div>
        </div>
        <div className={styles.processStrip}>
          <article className={styles.processNode}><span>01</span><strong>现状评估</strong><p>梳理系统能力与边界</p></article>
          <article className={styles.processNode}><span>02</span><strong>方案评审</strong><p>技术可行性与安全评估</p></article>
          <article className={styles.processNode}><span>03</span><strong>联调测试</strong><p>正反向与异常验证</p></article>
          <article className={styles.processNode}><span>04</span><strong>集成运维</strong><p>建立监控与补偿机制</p></article>
        </div>
      </section>

      {/* Diagnosis Section */}
      <section className={styles.section} id="diagnosis">
        <div className={styles.diagnosis}>
          <div className={styles.diagnosisCopy}>
            <span className={styles.sectionKicker}>Service Assessment</span>
            <h2>预约集成服务评估</h2>
            <p>梳理系统清单、接口现状，给出集成风险方案。</p>
          </div>
          <form className={styles.leadForm} onSubmit={handleSubmit}>
            <h3>预约集成评估</h3>
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
