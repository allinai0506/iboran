'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import styles from './migration.module.css'
import { useAttribution } from '@/providers/Attribution'

export const MigrationContent: React.FC = () => {
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
      source: '迁移与工具服务',
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
            <div className={styles.eyebrow}>Service 04</div>
            <h1>迁移与工具服务<span><em>迁准可控</em></span></h1>
            <p>面向 NC、YonBIP 等用友体系，围绕升迁、拆分、数据延续、脱敏等场景提供工具化服务。</p>
            <div className={styles.heroTags}>
              <span>数据同步</span><span>BIP升迁</span><span>数据脱敏</span><span>云巡检</span>
            </div>
            <div className={styles.heroActions}>
              <Link href="#diagnosis" className={`${styles.btn} ${styles.btnPrimary}`}>预约迁移评估</Link>
              <Link href="#service-path" className={`${styles.btn} ${styles.btnSecondary}`}>查看服务内容</Link>
            </div>
          </div>

          <aside className={styles.serviceConsole}>
            <div className={styles.consoleTop}>
              <div><span>Service Console</span><h2>数据延续闭环</h2></div>
            </div>
            <div className={styles.loopVisual}>
              <div className={styles.loopCard}>
                <span className={styles.loopIndex}>01</span>
                <strong>系统实施</strong>
                <p>上线使用。</p>
              </div>
              <div className={`${styles.loopCard} ${styles.loopCardCurrent}`}>
                <span className={styles.loopIndex}>04</span>
                <strong>迁移工具</strong>
                <p>数据迁得动、风险控得住。</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Promise Band */}
      <section className={styles.sectionFluid}>
        <div className={styles.sectionInner}>
          <div className={styles.promiseBand}>
            <div className={styles.promiseMain}>
              <h2>迁移不只是工具，更是治理</h2>
              <p>迁移覆盖抽取、同步、升迁、脱敏等。核心在于映射规则、异常处理和回滚预案的设计。</p>
            </div>
            <aside className={styles.promiseSide}>
              <span>Risk Control</span>
              <strong>范围、规则、验证、切换。</strong>
            </aside>
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
                  <h3>数据初始化与工具服务</h3>
                  <ul className={styles.chipList}><li>快速</li><li>标准</li><li>轻量</li></ul>
                  <ul className={styles.checkList}>
                    <li>主数据、期初数据整理导入</li>
                    <li>历史凭证与单据轻量同步</li>
                    <li>脱敏与培训环境准备</li>
                  </ul>
                </>
              ) : (
                <>
                  <h3>完整迁移治理</h3>
                  <ul className={styles.chipList}><li>治理</li><li>合规</li><li>可追溯</li></ul>
                  <ul className={styles.checkList}>
                    <li>BIP 完整升迁治理方案</li>
                    <li>集团拆分、独立审计抽取</li>
                    <li>异构数据库转换与备份灾备</li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Scenarios */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div><span className={styles.sectionKicker}>Scenarios</span><h2>高价值迁移场景</h2></div>
        </div>
        <div className={styles.toolGrid}>
          <article className={styles.toolCard}>
            <div className={styles.cardIcon}>01</div>
            <h3>BIP 升迁与版本升级</h3>
            <p>盘点核对主数据、科目、期初与凭证，平滑过渡到新版本。</p>
          </article>
          <article className={styles.toolCard}>
            <div className={styles.cardIcon}>02</div>
            <h3>集团拆分与审计抽取</h3>
            <p>按组织、年度抽取，隔离敏感数据，形成独立库。</p>
          </article>
          <article className={styles.toolCard}>
            <div className={styles.cardIcon}>03</div>
            <h3>数据脱敏与安全共享</h3>
            <p>识别关键字段，配置替换规则，保障开发测试合规。</p>
          </article>
        </div>
      </section>

      {/* AI Enablement */}
      <section className={styles.section}>
        <div className={styles.aiBand}>
          <div>
            <span className={styles.sectionKicker}>AI Enablement</span>
            <h2>AI 赋能迁移全过程</h2>
            <p>AI 辅助生成规则、识别异常并自动整理对账报告。</p>
          </div>
          <ul className={styles.aiList}>
            <li>自动映射字段规则</li>
            <li>失败原因自动诊断</li>
            <li>迁移报告自动生成</li>
          </ul>
        </div>
      </section>

      {/* Diagnosis Section */}
      <section className={styles.section} id="diagnosis">
        <div className={styles.diagnosis}>
          <div className={styles.diagnosisCopy}>
            <span className={styles.sectionKicker}>Service Assessment</span>
            <h2>预约迁移服务评估</h2>
            <p>分析您的数据现状、版本风险，给出迁移方案建议。</p>
          </div>
          <form className={styles.leadForm} onSubmit={handleSubmit}>
            <h3>预约迁移评估</h3>
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
