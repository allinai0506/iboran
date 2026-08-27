'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import styles from './services.module.css'
import { useAttribution } from '@/providers/Attribution'

export const ServicesContent: React.FC = () => {
  const attribution = useAttribution()
  const [activeTab, setActiveTab] = useState<'growth' | 'enterprise'>('growth')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const phone = String(formData.get('phone') || '').replace(/[\s-]/g, '').replace(/^\+?86/, '')
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      alert('请输入有效的手机号码')
      return
    }

    const data = {
      name: formData.get('name'),
      phone,
      company: formData.get('company'),
      customer_type: formData.get('customer_type'),
      current_system: formData.get('current_system'),
      remark: formData.get('remark') || '',
      interest: Array.from(formData.getAll('interest')),
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
        try {
          const err = await res.json()
          alert(err?.error || '提交失败，请重试')
        } catch {
          alert('提交失败，请重试')
        }
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
            <p>从系统规划、实施上线、多系统连接、客户化扩展，到运行保障、数据迁移和持续运营，提供覆盖企业应用全生命周期的专业服务。</p>
            <div className={styles.heroTags}>
              <span>系统实施</span>
              <span>集成与开发</span>
              <span>系统运维</span>
              <span>迁移与工具</span>
              <span>AI赋能</span>
              <span>客户成功</span>
            </div>
            <div className={styles.heroActions}>
              <a href="#diagnosis" className={`${styles.btn} ${styles.btnPrimary}`} data-track="hero_cta_click">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4V5Zm3 3v2h10V8H7Zm0 4v2h7v-2H7Zm0 4v1h4v-1H7Z" /></svg>
                预约服务评估
              </a>
              <a href="#service-lines" className={`${styles.btn} ${styles.btnSecondary}`} data-track="secondary_cta_click">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v4H4V5Zm0 6h7v8H4v-8Zm9 0h7v8h-7v-8Z" /></svg>
                查看四大服务能力
              </a>
            </div>
          </div>

          <aside className={styles.serviceConsole}>
            <div className={styles.consoleTop}>
              <div>
                <span>Service Command Center</span>
                <h2>全生命周期服务闭环</h2>
              </div>
              <b className={styles.consoleBadge}>AI 辅助复核</b>
            </div>
            <div className={styles.loopVisual}>
              <Link href="/services/implementation" className={styles.loopCard}>
                <span className={styles.loopIndex}>01</span>
                <strong>系统实施服务</strong>
                <p>让系统建起来、用起来、跑起来。</p>
              </Link>
              <Link href="/services/integration-development" className={styles.loopCard}>
                <span className={styles.loopIndex}>02</span>
                <strong>集成与开发服务</strong>
                <p>让系统连起来、扩起来。</p>
              </Link>
              <Link href="/services/operations" className={styles.loopCard}>
                <span className={styles.loopIndex}>03</span>
                <strong>系统运维服务</strong>
                <p>让系统稳下来、持续创造价值。</p>
              </Link>
              <Link href="/services/migration-tools" className={styles.loopCard}>
                <span className={styles.loopIndex}>04</span>
                <strong>迁移与工具服务</strong>
                <p>让数据迁得动、风险控得住。</p>
              </Link>
            </div>
            <div className={styles.consoleFoot}>
              <div><strong>分层服务路径</strong><span>成长型快速上线，集团型可控治理</span></div>
              <div><strong>长三角保障</strong><span>智能协同、本地顾问、现场支持</span></div>
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
              <p>企业数智化建设通常经历规划实施、系统连接、运行保障、数据迁移和持续运营。我们把服务拆成四条主线，分别对应上线交付、集成扩展、运维客户成功和迁移工具，并针对不同规模与复杂度的客户配置不同深度的服务路径。</p>
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
          <p>不是单点售后，而是从项目建设到持续运营的服务组合。</p>
        </div>
        <div className={styles.serviceGrid}>
          <article className={styles.serviceCard}>
            <div className={styles.cardIcon}>实施</div>
            <h3>系统实施服务</h3>
            <p>让系统建起来、用起来、跑起来。</p>
            <dl>
              <dt>解决问题</dt>
              <dd>项目启动、方案设计、系统配置、数据准备、测试培训、上线切换。</dd>
              <dt>适用场景</dt>
              <dd>YonSuite SaaS 快速上线、YonBIP 敏捷交付、NC/NCC 系统升级、新项目上线、分阶段建设。</dd>
            </dl>
            <Link href="/services/implementation" className={styles.cardLink}>查看服务详情</Link>
          </article>
          <article className={styles.serviceCard}>
            <div className={styles.cardIcon}>集成</div>
            <h3>集成与开发服务</h3>
            <p>让系统连起来、扩起来。</p>
            <dl>
              <dt>解决问题</dt>
              <dd>API 对接、数据集成、移动审批、低代码扩展、客户化开发、第三方系统联调。</dd>
              <dt>适用场景</dt>
              <dd>ERP 与 OA/MES/WMS/CRM/SRM/银企/税务/BI 集成，低代码应用扩展，客开需求治理。</dd>
            </dl>
            <Link href="/services/integration-development" className={styles.cardLink}>查看服务详情</Link>
          </article>
          <article className={styles.serviceCard}>
            <div className={styles.cardIcon}>运维</div>
            <h3>系统运维服务</h3>
            <p>让系统稳下来、持续创造价值。</p>
            <dl>
              <dt>解决问题</dt>
              <dd>工单支持、问题诊断、运行巡检、补丁升级、月结保障、权限检查、客户成功运营。</dd>
              <dt>适用场景</dt>
              <dd>上线后支持、周期性巡检、版本升级、系统健康检查、关键时刻保障、客户成功计划。</dd>
            </dl>
            <Link href="/services/operations" className={styles.cardLink}>查看服务详情</Link>
          </article>
          <article className={styles.serviceCard}>
            <div className={styles.cardIcon}>迁移</div>
            <h3>迁移与工具服务</h3>
            <p>让数据迁得动、风险控得住。</p>
            <dl>
              <dt>解决问题</dt>
              <dd>数据抽取、数据同步、BIP 升迁、数据脱敏、云巡检、数据库转换、数据备份。</dd>
              <dt>适用场景</dt>
              <dd>老系统升级、集团拆分、历史数据迁移、多系统同步、开发测试脱敏、系统巡检。</dd>
            </dl>
            <Link href="/services/migration-tools" className={styles.cardLink}>查看服务详情</Link>
          </article>
        </div>
      </section>

      {/* Customer Segments Section */}
      <section className={styles.sectionFluid} id="service-path">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.sectionKicker}>Customer Segments</span>
              <h2>按企业规模与复杂度选择服务路径</h2>
            </div>
            <p>成长型客户重视上线速度与轻量运营，集团型客户更看重治理、集成、迁移和长期保障。</p>
          </div>
          <div className={styles.segmentShell}>
            <div className={styles.segmentTabs} role="tablist" aria-label="客户分层">
              <button
                className={`${styles.segmentTab} ${activeTab === 'growth' ? styles.segmentTabActive : ''}`}
                onClick={() => setActiveTab('growth')}
                aria-selected={activeTab === 'growth'}
              >
                中小型 / 成长型客户
              </button>
              <button
                className={`${styles.segmentTab} ${activeTab === 'enterprise' ? styles.segmentTabActive : ''}`}
                onClick={() => setActiveTab('enterprise')}
                aria-selected={activeTab === 'enterprise'}
              >
                大中型 / 集团型客户
              </button>
            </div>
            <div className={`${styles.segmentPanel} ${activeTab === 'growth' ? styles.segmentPanelActive : ''}`} data-segment-panel="growth">
              <h3>中小型 / 成长型客户服务组合</h3>
              <p>适合正在使用或计划使用公有云 SaaS、标准产品和轻量集成方案的客户。</p>
              <ul className={styles.chipList}>
                <li>快速</li><li>标准</li><li>轻量</li><li>低成本</li><li>在线化</li><li>持续迭代</li>
              </ul>
              <ul className={styles.checkList}>
                <li>YonSuite SaaS 快速实施服务</li>
                <li>标准连接与轻量集成服务</li>
                <li>低代码扩展服务</li>
                <li>基础数据初始化服务</li>
                <li>在线运维与客户成功服务</li>
              </ul>
            </div>
            <div className={`${styles.segmentPanel} ${activeTab === 'enterprise' ? styles.segmentPanelActive : ''}`} data-segment-panel="enterprise">
              <h3>大中型 / 集团型客户服务组合</h3>
              <p>适合多组织、多系统、多账套、多接口、多客开、多数据迁移的集团客户。</p>
              <ul className={styles.chipList}>
                <li>稳定</li><li>可控</li><li>治理</li><li>合规</li><li>可追溯</li><li>可运维</li>
              </ul>
              <ul className={styles.checkList}>
                <li>YonBIP 敏捷交付服务</li>
                <li>企业级连接集成治理服务</li>
                <li>客户化开发治理服务</li>
                <li>数据迁移与升迁服务</li>
                <li>核心系统运维保障服务</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Success Capabilities */}
      <section className={styles.section} id="customer-success-capabilities">
        <div className={styles.sectionHead}>
          <div>
            <span className={styles.sectionKicker}>Customer Success</span>
            <h2>从客户支持到客户成功</h2>
          </div>
          <p>服务不是只响应问题，而是把分层服务、运营服务、场景服务、AI 服务和工具服务放进同一套持续运营体系。</p>
        </div>
        <div className={styles.packageGrid}>
          <article className={styles.infoCard}>
            <span className={styles.cardEyebrow}>Service Tier</span>
            <h3>服务分层</h3>
            <p>面向不同规模和复杂度，形成标准、高级、定制以及标准、加速、优先、尊享等分层服务口径。</p>
          </article>
          <article className={styles.infoCard}>
            <span className={styles.cardEyebrow}>Knowledge Service</span>
            <h3>知识服务</h3>
            <p>围绕操作手册、FAQ、培训视频和管理员赋能沉淀标准服务资产，帮助团队持续用好系统。</p>
          </article>
          <article className={styles.infoCard}>
            <span className={styles.cardEyebrow}>Operation</span>
            <h3>运营服务</h3>
            <p>应用健康度评估、系统运营报告、成功指标检查和业务创新建议，帮助上线后持续用好系统。</p>
          </article>
          <article className={styles.infoCard}>
            <span className={styles.cardEyebrow}>Scenario</span>
            <h3>场景服务</h3>
            <p>配置调整、合并报表、生产计划培训、业财对账、报表服务、月结服务和历史凭证迁移。</p>
          </article>
          <article className={styles.infoCard}>
            <span className={styles.cardEyebrow}>AI Boundary</span>
            <h3>AI 边界</h3>
            <p>AI 只参与资料整理、初稿生成和风险检查，所有交付结论由顾问复核，不替代判断和客户承诺。</p>
          </article>
          <article className={styles.infoCard}>
            <span className={styles.cardEyebrow}>Tools</span>
            <h3>工具服务</h3>
            <p>数据抽取、同步、移动审批、BIP 升迁、脱敏、云巡检、备份和数据库转换，支撑复杂交付。</p>
          </article>
        </div>
      </section>

      {/* Regional Service Assurance */}
      <section className={styles.sectionFluid} id="regional-assurance">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.sectionKicker}>Regional Service Assurance</span>
              <h2>上海及长三角本地化服务保障</h2>
            </div>
            <p>立足上海，服务长三角，结合智能协同、本地顾问和现场支持能力，为企业提供更及时、更稳定、更可控的服务保障。</p>
          </div>
          <p className={styles.localNote}>面向上海及长三角区域企业客户，提供项目启动、业务调研、方案评审、系统联调、上线切换、运维巡检、数据迁移和重大问题处理等本地化服务支持。</p>
          <div className={styles.localGrid}>
            <article className={styles.infoCard}>
              <div className={styles.cardIcon}>01</div>
              <h3>智能协同</h3>
              <p>通过在线会议、工单、知识库和智能服务工具提升日常问题响应效率。</p>
            </article>
            <article className={styles.infoCard}>
              <div className={styles.cardIcon}>02</div>
              <h3>本地响应</h3>
              <p>关键项目节点和重要问题可安排本地顾问协同支持。</p>
            </article>
            <article className={styles.infoCard}>
              <div className={styles.cardIcon}>03</div>
              <h3>现场保障</h3>
              <p>上线切换、迁移割接、接口联调、月结保障等场景提供现场服务。</p>
            </article>
            <article className={styles.infoCard}>
              <div className={styles.cardIcon}>04</div>
              <h3>专项服务</h3>
              <p>面向中大型客户提供驻场、巡检、升级护航和专项保障。</p>
            </article>
          </div>
          <div className={styles.localSegments}>
            <article className={styles.infoCard}>
              <h3>成长型客户</h3>
              <p>以智能交付工具和标准化服务包为支撑，帮助快速上线、及时响应、持续运营；关键节点可按需本地支持。</p>
              <ul className={styles.chipList}>
                <li>智能交付</li><li>在线支持</li><li>标准服务包</li><li>按需现场</li>
              </ul>
            </article>
            <article className={styles.infoCard}>
              <h3>中大型客户</h3>
              <p>在蓝图设计、集成联调、迁移切换、月结保障和重大问题处理等关键阶段提供本地化项目保障。</p>
              <ul className={styles.chipList}>
                <li>项目制保障</li><li>现场支持</li><li>专项响应</li><li>驻场服务</li>
              </ul>
            </article>
          </div>
          <div className={styles.localScenarios}>
            <article className={styles.infoCard}>
              <div className={styles.cardIcon}>01</div>
              <h3>系统实施</h3>
              <p>项目启动、关键用户培训、上线切换现场保障。</p>
            </article>
            <article className={styles.infoCard}>
              <div className={styles.cardIcon}>02</div>
              <h3>集成与开发</h3>
              <p>接口联调、第三方系统协调、上线窗口支持。</p>
            </article>
            <article className={styles.infoCard}>
              <div className={styles.cardIcon}>03</div>
              <h3>系统运维</h3>
              <p>重大问题响应、月结保障、巡检、升级护航。</p>
            </article>
            <article className={styles.infoCard}>
              <div className={styles.cardIcon}>04</div>
              <h3>迁移与工具</h3>
              <p>试迁移、正式迁移、数据核对、切换保障。</p>
            </article>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div>
            <span className={styles.sectionKicker}>Methodology</span>
            <h2>方法论支撑</h2>
          </div>
          <p>用标准方法控制项目边界，用工具化资产提升交付效率。</p>
        </div>
        <div className={styles.packageGrid}>
          <Link href="/services/implementation#saas-fast-path" className={`${styles.infoCard} ${styles.methodCard}`} data-track="methodology_card_click">
            <h3>SaaS 快速实施方法</h3>
            <p>围绕成功规划、构建上线、培训上线和持续运营，把标准产品优先、远程交付、关键用户培训、上线确认和 CSM 移交拆成可执行节点。</p>
            <span className={styles.cardLink}>查看 SaaS 实施路径</span>
          </Link>
          <Link href="/services/implementation#bip-delivery-path" className={`${styles.infoCard} ${styles.methodCard}`} data-track="methodology_card_click">
            <h3>BIP 敏捷交付方法</h3>
            <p>从售前评估、筹建准备、蓝图设计、系统建设到上线切换，按工作量、风险、配置、开发、集成、迁移和客成交接进行项目治理。</p>
            <span className={styles.cardLink}>查看 BIP 交付路径</span>
          </Link>
        </div>
      </section>

      {/* AI Enablement */}
      <section className={styles.section} id="ai-enablement">
        <div className={styles.aiBand}>
          <div>
            <span className={styles.sectionKicker}>AI Enablement</span>
            <h2>AI 赋能服务全过程</h2>
            <p>AI 不直接替代顾问做判断，而是把项目资料先整理成可复核的工作底稿。顾问负责确认口径、补充业务判断、对客户承诺最终结果。</p>
          </div>
          <ul className={styles.aiScenarioList}>
            <li>
              <strong>启动会与项目管理</strong>
              <span>根据售前交接、合同范围和项目计划，生成启动会议程、RACI 分工、里程碑清单和风险预案初稿。</span>
            </li>
            <li>
              <strong>调研与蓝图设计</strong>
              <span>把访谈记录整理成需求池、Fit-Gap 表、待澄清问题和蓝图方案初稿，顾问再判断标准、配置、低代码或客开边界。</span>
            </li>
            <li>
              <strong>集成与开发联调</strong>
              <span>整理接口清单、字段映射、数据转换规则、联调用例和异常补偿清单，帮助提前发现缺字段、重复推送和回写失败风险。</span>
            </li>
            <li>
              <strong>运维与客户成功</strong>
              <span>把工单、月结问题、配置调整和巡检记录归类成问题原因、处理建议、SOP、FAQ 和下月优化清单。</span>
            </li>
            <li>
              <strong>迁移与工具服务</strong>
              <span>根据源系统字段、清洗规则和试迁移日志，生成迁移批次计划、失败原因分类、对账清单和回滚预案初稿。</span>
            </li>
            <li>
              <strong>交付边界复核</strong>
              <span>所有 AI 输出都必须由顾问复核，不能自动写入生产系统，不能自动承诺客户，不能替代验收签字。</span>
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.section} id="faq">
        <div className={styles.sectionHead}>
          <div>
            <span className={styles.sectionKicker}>FAQ</span>
            <h2>企业数智化全生命周期服务体系常见问题</h2>
          </div>
        </div>
        <div className={styles.faqList}>
          {[
            {
              q: '服务总览页适合先解决什么问题？',
              a: '它不是替代详细方案，而是帮助客户先判断当前处在什么阶段：准备上线、系统连接、运行保障、历史迁移，还是需要 AI 辅助提效。确认阶段后，再进入系统实施、集成开发、运维客户成功或迁移工具的专项页面。'
            },
            {
              q: '为什么要把服务拆成四条主线，而不是只卖实施？',
              a: '企业系统上线后还会持续遇到接口扩展、权限调整、报表优化、月结保障、补丁升级、历史数据保留和客户成功运营等问题。四条主线对应不同生命周期，能避免"上线后没人管、扩展时没人接、迁移时没人担责"。'
            },
            {
              q: '成长型客户和集团型客户的服务差异在哪里？',
              a: '成长型客户更需要标准方法、智能交付、在线支持和可控成本；集团型客户更关注多组织、多账套、多系统协同、项目治理、驻场保障、升级护航和重大问题响应。差异不只是服务时长，而是治理深度和保障机制不同。'
            },
            {
              q: '什么时候应该先做专项评估，而不是直接启动项目？',
              a: '当系统范围、接口数量、历史数据、上线窗口、客开边界或组织协同关系还不清晰时，建议先做专项评估。评估会把风险、范围、阶段、资源和服务组合讲清楚，再决定是否进入实施、集成、运维或迁移交付。'
            },
            {
              q: 'AI 在服务体系里具体承担什么角色？',
              a: 'AI 更像资料助理、初稿顾问和风险检查员：整理会议纪要、需求池、测试清单、迁移差异、工单归因和巡检报告初稿。它不直接替代顾问判断，也不自动承诺客户，最终方案和交付结论仍由顾问复核。'
            },
            {
              q: '上海及长三角本地化保障如何与远程协同配合？',
              a: '日常问题优先通过在线会议、工单和知识服务快速处理；关键节点如项目启动、蓝图评审、联调、上线切换、月结、迁移割接和重大问题处理，可安排本地顾问或现场支持，形成远程效率和现场保障的组合。'
            }
          ].map((faq, idx) => (
            <article key={idx} className={styles.faqItem}>
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                aria-expanded={openFaq === idx}
              >
                <span>{faq.q}</span>
                <b />
              </button>
              <p>{faq.a}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA Panel */}
      <section className={styles.section}>
        <div className={styles.ctaPanel}>
          <div>
            <h2>不确定该选哪类服务？先做一次服务评估。</h2>
            <p>我们将根据您的产品形态、企业规模、系统复杂度、数据范围、集成需求和上线目标，给出适合的服务路径建议。</p>
          </div>
          <a href="#diagnosis" className={`${styles.btn} ${styles.btnPrimary}`} data-track="bottom_cta_click">预约服务评估</a>
        </div>
      </section>

      {/* Diagnosis Section */}
      <section className={styles.sectionDiagnosis} id="diagnosis">
        <div className={styles.diagnosisCopy}>
          <span className={styles.sectionKicker}>Service Assessment</span>
          <h2>先做一次服务评估，把系统阶段、风险和服务路径讲清楚</h2>
          <p>泊冉顾问将结合您的产品形态、组织规模、系统复杂度、数据范围、集成需求和上线目标，给出适合的服务组合建议。</p>
          <div className={styles.diagnosisPoints}>
            <div><strong>识别阶段</strong><span>新系统上线、接口扩展、运维保障、数据迁移或升级护航。</span></div>
            <div><strong>确认范围</strong><span>明确组织、账套、系统、接口、数据对象和关键窗口。</span></div>
            <div><strong>规划路径</strong><span>输出智能协同、本地响应、现场保障或专项服务组合。</span></div>
          </div>
          <div className={styles.contactActions}>
            <a href="tel:400-9955-161" data-track="phone_click">电话咨询 400-9955-161</a>
            <a href="/contact" data-track="chat_click">在线咨询</a>
          </div>
        </div>

        <form className={styles.leadForm} onSubmit={handleSubmit}>
          <h3>预约企业数智化服务评估</h3>
          <input type="hidden" name="source_page" value="services-overview" />
          <input type="hidden" name="source_path" value="/services" />
          <div className={styles.fieldGrid}>
            <label><span>姓名 <b>*</b></span><input name="name" type="text" autoComplete="name" required /></label>
            <label><span>手机 <b>*</b></span><input name="phone" type="tel" autoComplete="tel" inputMode="tel" required /></label>
          </div>
          <div className={styles.fieldGrid}>
            <label><span>公司名称 <b>*</b></span><input name="company" type="text" autoComplete="organization" required /></label>
            <label><span>客户类型</span>
              <select name="customer_type">
                <option value="">请选择</option>
                <option>中小型 / 成长型客户</option>
                <option>大中型 / 集团型客户</option>
                <option>不确定，需要评估</option>
              </select>
            </label>
          </div>
          <label><span>当前系统或计划系统</span>
            <select name="current_system">
              <option value="">请选择</option>
              <option>YonSuite</option>
              <option>YonBIP</option>
              <option>NC / NCC</option>
              <option>其他 ERP / 业务系统</option>
              <option>暂未确定</option>
            </select>
          </label>
          <fieldset className={styles.issueField}>
            <legend>关注服务</legend>
            <label><input type="checkbox" name="interest" value="系统实施服务" /><span>系统实施服务</span></label>
            <label><input type="checkbox" name="interest" value="集成与开发服务" /><span>集成与开发服务</span></label>
            <label><input type="checkbox" name="interest" value="系统运维服务" /><span>系统运维服务</span></label>
            <label><input type="checkbox" name="interest" value="迁移与工具服务" /><span>迁移与工具服务</span></label>
            <label><input type="checkbox" name="interest" value="上海及长三角本地化保障" /><span>上海及长三角本地化保障</span></label>
            <label><input type="checkbox" name="interest" value="AI 赋能服务" /><span>AI 赋能服务</span></label>
          </fieldset>
          <label><span>补充说明</span><textarea name="remark" rows={4} placeholder="例如：计划 8 月上线 YonSuite，需要评估实施周期、接口范围和上海现场支持" /></label>
          <p className={styles.formHint}>提交后由泊冉顾问联系，不做无效打扰。</p>
          <button type="submit" className={styles.modalSubmit} data-track="form_submit">
            提交服务评估需求
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h12.2l-5.1-5.1L14 5l8 8-8 8-1.9-1.9 5.1-5.1H5v-2Z" /></svg>
          </button>
        </form>
      </section>
    </main>
  )
}
