'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import styles from './services.module.css'
import { useAttribution } from '@/providers/Attribution'

export const ServicesContent: React.FC = () => {
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
      source: '服务体系总览',
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
        alert('预约成功！我们的服务顾问将尽快与您联系。')
        ;(e.target as HTMLFormElement).reset()
      } else {
        alert('提交失败，请重试')
      }
    } catch (_err) {
      alert('网络错误')
    }
  }

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}>服务总览</div>
            <h1>企业数智化全生命周期服务体系<span><em>四大服务线闭环</em></span></h1>
            <p>从系统规划、实施上线、多系统连接、客户化扩展，到运行保障、数据迁移和持续运营。</p>
            <div className={styles.heroTags}>
              <span>系统实施</span><span>集成与开发</span><span>系统运维</span><span>迁移与工具</span><span>AI赋能</span>
            </div>
            <div className={styles.heroActions}>
              <Link href="#diagnosis" className={`${styles.btn} ${styles.btnPrimary}`}>预约服务评估</Link>
              <Link href="#service-lines" className={`${styles.btn} ${styles.btnSecondary}`}>查看四大服务能力</Link>
            </div>
          </div>
          
          <aside className={styles.serviceConsole}>
            <div className={styles.consoleTop}>
              <div><span>Service Command Center</span><h2>全生命周期服务闭环</h2></div>
            </div>
            <div className={styles.loopVisual}>
              <div className={styles.loopCard}>
                <span className={styles.loopIndex}>01</span>
                <strong>系统实施</strong>
                <p>让系统建起来、跑起来。</p>
              </div>
              <div className={styles.loopCard}>
                <span className={styles.loopIndex}>02</span>
                <strong>集成开发</strong>
                <p>让系统连起来、扩起来。</p>
              </div>
              <div className={styles.loopCard}>
                <span className={styles.loopIndex}>03</span>
                <strong>系统运维</strong>
                <p>让系统稳下来、持续增值。</p>
              </div>
              <div className={styles.loopCard}>
                <span className={styles.loopIndex}>04</span>
                <strong>迁移工具</strong>
                <p>让数据迁得动、控得住。</p>
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
              <h2>按项目阶段组织服务，而不是单点售后响应</h2>
              <p>我们把服务拆成四条主线，对应从上线交付到持续运营的全过程，并针对不同规模客户配置不同深度的服务路径。</p>
            </div>
            <aside className={styles.promiseSide}>
              <span>Service Method</span>
              <strong>先明确项目阶段，再匹配服务组合。</strong>
            </aside>
          </div>
        </div>
      </section>

      {/* Service Lines Grid */}
      <section className={styles.section} id="service-lines">
        <div className={styles.sectionHead}>
          <div>
            <span className={styles.sectionKicker}>Service Lines</span>
            <h2>四大服务能力入口</h2>
          </div>
          <p>从项目建设到持续运营的服务组合。</p>
        </div>
        <div className={styles.serviceGrid}>
          <article className={styles.serviceCard}>
            <div className={styles.cardIcon}>实施</div>
            <h3>系统实施服务</h3>
            <p>让系统建起来、用起来、跑起来。</p>
            <dl>
              <dt>解决问题</dt><dd>方案设计、系统配置、测试培训、上线切换。</dd>
              <dt>适用场景</dt><dd>YonSuite 快速上线、BIP 敏捷交付、系统升级。</dd>
            </dl>
            <Link href="/services/implementation" className={styles.cardLink}>查看服务详情</Link>
          </article>
          <article className={styles.serviceCard}>
            <div className={styles.cardIcon}>集成</div>
            <h3>集成与开发服务</h3>
            <p>让系统连起来、扩起来。</p>
            <dl>
              <dt>解决问题</dt><dd>API 对接、数据集成、低代码扩展、客开治理。</dd>
              <dt>适用场景</dt><dd>ERP 与 OA/MES/WMS 集成，客开需求治理。</dd>
            </dl>
            <Link href="/services/integration-development" className={styles.cardLink}>查看服务详情</Link>
          </article>
          <article className={styles.serviceCard}>
            <div className={styles.cardIcon}>运维</div>
            <h3>系统运维服务</h3>
            <p>让系统稳下来、持续创造价值。</p>
            <dl>
              <dt>解决问题</dt><dd>工单支持、运行巡检、月结保障、版本升级。</dd>
              <dt>适用场景</dt><dd>上线后支持、系统健康检查、关键时刻保障。</dd>
            </dl>
            <Link href="/services/operations" className={styles.cardLink}>查看服务详情</Link>
          </article>
          <article className={styles.serviceCard}>
            <div className={styles.cardIcon}>迁移</div>
            <h3>迁移与工具服务</h3>
            <p>让数据迁得动、风险控得住。</p>
            <dl>
              <dt>解决问题</dt><dd>数据抽取、同步、BIP 升迁、脱敏。 </dd>
              <dt>适用场景</dt><dd>老系统升级、历史数据迁移、多系统同步。</dd>
            </dl>
            <Link href="/services/migration-tools" className={styles.cardLink}>查看服务详情</Link>
          </article>
        </div>
      </section>

      {/* Segments Section */}
      <section className={styles.sectionFluid}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.sectionKicker}>Customer Segments</span>
              <h2>按企业规模与复杂度选择路径</h2>
            </div>
          </div>
          <div className={styles.segmentShell}>
            <div className={styles.segmentTabs}>
              <button 
                className={`${styles.segmentTab} ${activeTab === 'growth' ? styles.segmentTabActive : ''}`}
                onClick={() => setActiveTab('growth')}
              >中小型 / 成长型客户</button>
              <button 
                className={`${styles.segmentTab} ${activeTab === 'enterprise' ? styles.segmentTabActive : ''}`}
                onClick={() => setActiveTab('enterprise')}
              >大中型 / 集团型客户</button>
            </div>
            <div className={styles.segmentPanel}>
              {activeTab === 'growth' ? (
                <>
                  <h3>中小型 / 成长型客户服务组合</h3>
                  <p>适合正在使用或计划使用公有云 SaaS、标准产品和轻量集成方案的客户。</p>
                  <ul className={styles.chipList}><li>快速</li><li>标准</li><li>低成本</li><li>持续迭代</li></ul>
                  <ul className={styles.checkList}>
                    <li>YonSuite SaaS 快速实施服务</li>
                    <li>标准连接与轻量集成服务</li>
                    <li>基础数据初始化服务</li>
                    <li>在线运维与客户成功服务</li>
                  </ul>
                </>
              ) : (
                <>
                  <h3>大中型 / 集团型客户服务组合</h3>
                  <p>适合多组织、多系统、多账套、多客开、多数据迁移的集团客户。</p>
                  <ul className={styles.chipList}><li>稳定</li><li>可控</li><li>治理</li><li>合规</li></ul>
                  <ul className={styles.checkList}>
                    <li>YonBIP 敏捷交付服务</li>
                    <li>企业级连接集成治理服务</li>
                    <li>客户化开发治理服务</li>
                    <li>数据迁移与升迁服务</li>
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
            <h2>先做一次服务评估</h2>
            <p>泊冉顾问将根据您的产品形态、组织规模、系统复杂度，给出适合的服务组合建议。</p>
            <div className={styles.diagnosisPoints}>
              <div><strong>识别阶段</strong><span>新系统上线、接口扩展、运维保障或升级护航。</span></div>
              <div><strong>规划路径</strong><span>输出智能协同、本地响应、现场保障服务组合。</span></div>
            </div>
          </div>
          
          <form className={styles.leadForm} onSubmit={handleSubmit}>
            <h3>预约企业数智化服务评估</h3>
            <div className={styles.fieldGrid}>
              <label><span>姓名 *</span><input name="name" type="text" required /></label>
              <label><span>手机 *</span><input name="phone" type="tel" required /></label>
            </div>
            <div className={styles.fieldGrid}>
              <label><span>公司名称 *</span><input name="company" type="text" required /></label>
              <label><span>客户类型</span><select name="customer_type"><option>请选择</option><option>中小型 / 成长型客户</option><option>大中型 / 集团型客户</option></select></label>
            </div>
            <label><span>补充说明</span><textarea name="remark" rows={3} placeholder="说明您的具体需求" /></label>
            <button type="submit" className={styles.submitBtn}>提交服务评估需求</button>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div>
            <span className={styles.sectionKicker}>FAQ</span>
            <h2>常见问题</h2>
          </div>
        </div>
        <div className={styles.faqList}>
          {[
            { q: '为什么要把服务拆成四条主线？', a: '企业系统上线后还会持续遇到接口扩展、月结保障、补丁升级等问题。四条主线对应不同生命周期，避免上线后没人管的问题。' },
            { q: '成长型客户和集团型客户的服务差异在哪里？', a: '成长型客户更需要标准方法、在线支持；集团型客户更关注多组织治理、驻场保障和重大问题响应。' }
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
