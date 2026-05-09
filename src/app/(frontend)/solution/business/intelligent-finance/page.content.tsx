'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import styles from './intelligent-finance.module.css'
import { useAttribution } from '@/providers/Attribution'

export const IntelligentFinanceContent: React.FC = () => {
  const attribution = useAttribution()
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    // Process checkboxes
    const interestScenarios = Array.from(formData.getAll('interestScenarios'))
    const financeNeeds = Array.from(formData.getAll('financeNeeds'))

    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      company: formData.get('company'),
      position: formData.get('role'),
      company_size: formData.get('companySize'),
      current_system: formData.get('currentSystem'),
      message: `${formData.get('message')}\n\n关注场景: ${interestScenarios.join(', ')}\n专项需求: ${financeNeeds.join(', ')}\n多组织: ${formData.get('isMultiOrg')}\n海外主体: ${formData.get('hasOverseasEntity')}`,
      source: '智能财务解决方案',
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
        alert('预约成功！我们的财务顾问将尽快与您联系。')
        ;(e.target as HTMLFormElement).reset()
      } else {
        alert('提交失败，请重试或直接拨打 400-9955-161')
      }
    } catch (_err) {
      alert('网络错误，请稍后重试')
    }
  }

  const faqs = [
    { q: '什么是智能财务？', a: '智能财务是把业务事项与财务核算、预算控制、报表分析、资金和税务管理连接起来的财务数智化体系。它关注的不只是记账，而是让业务数据进入财务闭环，并支撑经营管理。' },
    { q: '智能财务和普通财务软件有什么区别？', a: '普通财务软件更偏核算记录，智能财务更强调业务事项驱动、业财融合、实时核算、预算过程控制、集团报告、全球多账簿和 AI 分析。' },
    { q: '什么是会计事项中台？', a: '会计事项中台用于识别业务动作背后的会计含义，把订单、合同、发票、收付款、库存、项目和费用等事项转化为可核算、可追溯、可分析的财务数据颗粒。' },
    { q: '业财融合和业财一体化有什么区别？', a: '业财融合更强调业务流程和财务管理目标的协同，业财一体化更强调系统、数据和单据链路的打通。智能财务通常需要两者同时规划。' },
  ]

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.gridBg} />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}><span />INTELLIGENT FINANCE</div>
            <h1>
              <span className={styles.heroTitleLine}>智能财务解决方案：</span>
              <span className={styles.heroTitleLine}>以会计事项中台打通业财融合</span>
            </h1>
            <p className={styles.heroLead}>让业务发生即财务可见，让财务核算反推经营决策</p>
            <p>
              基于 YonSuite / YonBIP 智能财务能力，贯通销售、采购、库存、生产、项目、费用、资金、税务与多组织数据，支撑实时核算、全面预算、合并报表、全球多账簿和 AI 经营分析。
            </p>
            <div className={styles.valueTags}>
              <span>业财融合</span>
              <span>会计事项中台</span>
              <span>智能核算</span>
              <span>全面预算</span>
              <span>合并报表</span>
              <span>全球多账簿</span>
              <span>AI 财务分析</span>
            </div>
            <div className={styles.heroActions}>
              <Link href="#diagnosis" className={`${styles.btn} ${styles.btnPrimary}`}>预约智能财务诊断</Link>
              <Link href="#scenarios" className={`${styles.btn} ${styles.btnSecondary}`}>查看典型场景</Link>
            </div>
          </div>

          <aside className={styles.financeVisual}>
            <div className={styles.visualToolbar}>
              <span>Finance Flow</span>
              <strong>授权确认后入流程</strong>
            </div>
            <div className={styles.matterStream}>
              <div><b>业务事项</b><span>订单 · 合同 · 发票</span></div>
              <i />
              <div className={styles.centerNode}><b>会计中台</b><span>规则识别 · 映射</span></div>
              <i />
              <div><b>财务闭环</b><span>核算 · 预算 · 合并</span></div>
            </div>
            <div className={styles.dashboardGrid}>
              <article><small>凭证草稿</small><strong>由财务确认</strong><em>核算建议</em></article>
              <article><small>预算占用</small><strong>过程控制</strong><em>异常提醒</em></article>
              <article><small>集团报告</small><strong>口径统一</strong><em>合并追溯</em></article>
              <article><small>经营问数</small><strong>收入 / 成本</strong><em>AI 辅助分析</em></article>
            </div>
          </aside>
        </div>
      </section>

      {/* Answer Section */}
      <section className={styles.section} id="answer">
        <div className={styles.sectionHead}>
          <span>先看现状</span>
          <h2>经营数据闭环中的关键断点</h2>
          <p>围绕结账、预算、合并、多账簿、现金流与经营问数，定位影响财务响应的关键环节。</p>
        </div>
        <div className={styles.qaGrid}>
          <article className={styles.card}>
            <h3>月底结账总在追数据</h3>
            <p>业务数据分散在不同系统里，财务要反复取数、补附件、核发票、对往来，结账压力集中在月末。</p>
          </article>
          <article className={styles.card}>
            <h3>老板和 CFO 要数时口径不一</h3>
            <p>收入、成本、费用、利润和预算执行情况需要临时整理，不同部门口径不一致，很难支撑决策。</p>
          </article>
          <article className={styles.card}>
            <h3>预算控制总是慢半拍</h3>
            <p>预算编制在表格里，业务执行在流程里。等财务看到超预算时，业务动作往往已经发生。</p>
          </article>
          <article className={styles.card}>
            <h3>合并报表仍靠月底拼表</h3>
            <p>多公司、多账簿、多币种依赖人工采集与调整，集团报表周期长，数据追溯吃力。</p>
          </article>
        </div>
      </section>

      {/* Scenario Section */}
      <section className={`${styles.section} ${styles.softBg}`} id="scenarios">
        <div className={styles.sectionHead}>
          <span>典型场景</span>
          <h2>12 个典型智能财务场景</h2>
          <p>按企业现有流程、系统环境和财务口径选择切入点。</p>
        </div>
        <div className={styles.scenarioGrid}>
          <article className={styles.scenarioCard}>
            <small>01</small>
            <h3>业财融合中台</h3>
            <dl>
              <dt>适合企业</dt><dd>多组织、多系统、多业务线企业。</dd>
              <dt>方案动作</dt><dd>抽象业务事项，配置会计含义、核算口径和追溯链路。</dd>
            </dl>
          </article>
          <article className={styles.scenarioCard}>
            <small>02</small>
            <h3>智能核算</h3>
            <dl>
              <dt>适合企业</dt><dd>月结压力大、凭证规则复杂的企业。</dd>
              <dt>方案动作</dt><dd>按业务事项配置凭证草稿规则，形成月结辅助链路。</dd>
            </dl>
          </article>
          <article className={styles.scenarioCard}>
            <small>03</small>
            <h3>全面预算</h3>
            <dl>
              <dt>适合企业</dt><dd>费用、采购、项目需要过程控制的企业。</dd>
              <dt>方案动作</dt><dd>建立责任中心、控制规则，让流程联动预算占用。</dd>
            </dl>
          </article>
        </div>
      </section>

      {/* AI Landing Section */}
      <section className={styles.section} id="ai-landing">
        <div className={styles.sectionHead}>
          <span>AI 落地</span>
          <h2>把 AI 财务能力放进日常工作流</h2>
          <p>AI 嵌入问数、预警、审单、报告，让财务人员在原有流程里更快发现问题。</p>
        </div>
        <div className={styles.aiLandingGrid}>
          <article className={styles.card}>
            <h3>经营问数</h3>
            <p>围绕收入、成本、利润、现金流，让老板用自然语言查询授权范围内的数据。</p>
          </article>
          <article className={styles.card}>
            <h3>异常预警</h3>
            <p>对预算超支、费用超标、现金流缺口生成提醒，提前定位需要处理的事项。</p>
          </article>
          <article className={styles.card}>
            <h3>报告草稿</h3>
            <p>基于财务驾驶舱生成经营分析摘要、预算执行说明，由负责人复核后使用。</p>
          </article>
        </div>
      </section>

      {/* Diagnosis Section */}
      <section className={styles.section} id="diagnosis">
        <div className={styles.diagnosis}>
          <div className={styles.diagnosisCopy}>
            <span>Intelligent Finance Diagnosis</span>
            <h2>准备把财务从事后记账升级为实时经营管控吗？</h2>
            <p>预约泊冉智能财务场景诊断，梳理您的业务流程、财务口径和系统集成现状。</p>
            <div className={styles.diagnosisChecks}>
              <div><strong>先看高频断点</strong><span>费用、采购、收入、预算从哪里切入。</span></div>
              <div><strong>再定财务口径</strong><span>会计事项规则、主数据、权限一起梳理。</span></div>
            </div>
            <div className={styles.contactActions}>
              <a href="tel:400-9955-161" className={styles.phoneLink}>电话咨询 400-9955-161</a>
            </div>
          </div>

          <form className={styles.leadForm} onSubmit={handleSubmit}>
            <h3>预约智能财务诊断</h3>
            <div className={styles.fieldGrid}>
              <label><span>姓名 *</span><input name="name" type="text" required /></label>
              <label><span>手机号 *</span><input name="phone" type="tel" required /></label>
            </div>
            <div className={styles.fieldGrid}>
              <label><span>公司名称 *</span><input name="company" type="text" required /></label>
              <label><span>职位</span><input name="role" type="text" placeholder="例如：CFO / 财务负责人" /></label>
            </div>
            <div className={styles.fieldGrid}>
              <label>
                <span>企业规模</span>
                <select name="companySize">
                  <option value="">请选择</option>
                  <option>100人以下</option>
                  <option>100-500人</option>
                  <option>500-2000人</option>
                  <option>2000人以上</option>
                </select>
              </label>
              <label><span>使用系统</span><input name="currentSystem" type="text" placeholder="U8 / OA / YonSuite" /></label>
            </div>
            <fieldset className={styles.choiceField}>
              <legend>关注场景 *</legend>
              <div>
                <label><input type="checkbox" name="interestScenarios" value="业财融合" /><span>业财融合</span></label>
                <label><input type="checkbox" name="interestScenarios" value="智能核算" /><span>智能核算</span></label>
                <label><input type="checkbox" name="interestScenarios" value="全面预算" /><span>全面预算</span></label>
                <label><input type="checkbox" name="interestScenarios" value="合并报表" /><span>合并报表</span></label>
              </div>
            </fieldset>
            <button type="submit" className={styles.submitBtn}>预约智能财务诊断</button>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`${styles.section} ${styles.softBg}`} id="faq">
        <div className={styles.sectionHead}>
          <span>FAQ</span>
          <h2>常见问题解答</h2>
        </div>
        <div className={styles.faqList}>
          {faqs.map((faq, idx) => (
            <div key={idx} className={styles.faqItem} onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
              <button type="button" className={styles.faqQuestion}>
                <span>{faq.q}</span>
                <b>{activeFaq === idx ? '-' : '+'}</b>
              </button>
              {activeFaq === idx && <p className={styles.faqAnswer}>{faq.a}</p>}
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
