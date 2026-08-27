'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import styles from './integration.module.css'
import { useAttribution } from '@/providers/Attribution'

export const IntegrationContent: React.FC = () => {
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
      <section className={styles.hero} id="top">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}>Service 02</div>
            <h1>集成与开发服务<span><em>系统互联与扩展</em></span></h1>
            <p>围绕企业多系统协同和个性化业务扩展需求，提供系统集成、API 对接、数据交换、移动审批、低代码扩展、客户化开发和开发运维服务。</p>
            <div className={styles.heroTags}>
              <span>API对接</span>
              <span>数据集成</span>
              <span>集成总线</span>
              <span>移动审批</span>
              <span>低代码扩展</span>
              <span>客户化开发</span>
            </div>
            <div className={styles.heroActions}>
              <Link href="#diagnosis" className={`${styles.btn} ${styles.btnPrimary}`}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4V5Zm3 3v2h10V8H7Zm0 4v2h7v-2H7Zm0 4v1h4v-1H7Z" /></svg>
                预约集成评估
              </Link>
              <Link href="#service-path" className={`${styles.btn} ${styles.btnSecondary}`}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v4H4V5Zm0 6h7v8H4v-8Zm9 0h7v8h-7v-8Z" /></svg>
                查看服务内容
              </Link>
            </div>
          </div>

          <aside className={styles.serviceConsole} aria-label="企业数智化服务闭环示意">
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
              <Link href="/services/integration-development" className={`${styles.loopCard} ${styles.loopCardCurrent}`}>
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
              <div><strong>分层服务路径</strong><span>成长型轻量扩展，集团型可控治理</span></div>
              <div><strong>长三角保障</strong><span>智能协同、本地顾问、现场支持</span></div>
            </div>
          </aside>
        </div>
      </section>

      {/* Pain Points */}
      <section className={styles.section} id="pain-points">
        <div className={styles.sectionHead}>
          <div>
            <span className={styles.sectionKicker}>Pain Points</span>
            <h2>业务风险断点</h2>
          </div>
          <p>先识别项目、接口、数据、运维中的风险点，再定义服务范围和交付物。</p>
        </div>
        <div className={styles.painGrid}>
          <article className={styles.painCard}><h3 data-index="01">ERP、OA、MES、WMS、CRM、SRM 等系统割裂</h3></article>
          <article className={styles.painCard}><h3 data-index="02">接口由项目临时开发，缺少监控、告警、补偿和生命周期管理</h3></article>
          <article className={styles.painCard}><h3 data-index="03">个性化需求直接进入开发，导致成本失控、升级困难、运维困难</h3></article>
          <article className={styles.painCard}><h3 data-index="04">集成测试不足，上线后出现数据不同步、单据失败、凭证异常</h3></article>
          <article className={styles.painCard}><h3 data-index="05">第三方厂商配合不充分，责任边界不清，问题难以闭环</h3></article>
        </div>
      </section>

      {/* Control Points */}
      <section className={styles.sectionFluid}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.sectionKicker}>Control Points</span>
              <h2>集成与开发控制点</h2>
            </div>
            <p>所有需求先做 Fit-Gap 判断，把标准、配置、低代码、客开和运维责任边界说清楚。</p>
          </div>
          <div className={styles.packageGrid}>
            <article className={styles.infoCard}><h3>标准产品优先</h3><p>标准功能能覆盖的场景，不进入开发；避免后续升级、补丁和运维成本失控。</p></article>
            <article className={styles.infoCard}><h3>配置实现优先</h3><p>权限、流程、模板、规则、参数能配置解决的，不用代码固化业务变化。</p></article>
            <article className={styles.infoCard}><h3>低代码优先</h3><p>表单、报表、小应用和流程扩展优先采用低代码，降低交付和维护门槛。</p></article>
            <article className={styles.infoCard}><h3>开发评审准入</h3><p>必须开发的需求，先评审价值、范围、非功能要求、依赖关系和验收标准。</p></article>
            <article className={styles.infoCard}><h3>补丁可追溯</h3><p>开发成果必须保留部署清单、依赖关系、回滚方案、版本说明和风险事项。</p></article>
            <article className={styles.infoCard}><h3>升级适配可控</h3><p>客开、接口和第三方依赖需考虑未来升级影响，提前定义适配和验证口径。</p></article>
          </div>
        </div>
      </section>

      {/* Service Path */}
      <section className={styles.sectionFluid} id="service-path">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.sectionKicker}>Service Path</span>
              <h2>企业分层服务路径</h2>
            </div>
            <p>同一条服务线下，不同规模企业的交付范围、治理深度与保障方式不同。</p>
          </div>
          <div className={styles.segmentShell}>
            <div className={styles.segmentTabs}>
              <button
                className={`${styles.segmentTab} ${activeTab === 'growth' ? styles.segmentTabActive : ''}`}
                onClick={() => setActiveTab('growth')}
              >
                中小型 / 成长型客户
              </button>
              <button
                className={`${styles.segmentTab} ${activeTab === 'enterprise' ? styles.segmentTabActive : ''}`}
                onClick={() => setActiveTab('enterprise')}
              >
                大中型 / 集团型客户
              </button>
            </div>
            <div className={styles.segmentPanel}>
              {activeTab === 'growth' ? (
                <>
                  <h3>标准连接 + 轻量扩展</h3>
                  <p>优先采用标准连接、OpenAPI、轻量集成和低代码扩展，满足常见业务协同需求，避免因个性化开发拖慢主系统上线。</p>
                  <ul className={styles.chipList}>
                    <li>快速</li><li>标准</li><li>轻量</li><li>低成本</li><li>在线化</li><li>持续迭代</li>
                  </ul>
                  <ul className={styles.checkList}>
                    <li>钉钉、企业微信、OA 审批集成</li>
                    <li>银企、商旅、电商、WMS、税务、发票等常见系统对接</li>
                    <li>表单、流程、报表、小应用、移动端低代码扩展</li>
                    <li>基础资料、业务单据、审批状态、凭证结果轻量同步</li>
                    <li>ISV 应用、生态应用、轻量定制服务</li>
                  </ul>
                </>
              ) : (
                <>
                  <h3>企业级集成治理 + 客开治理</h3>
                  <p>强调企业级集成治理、API 生命周期管理、主数据同步、复杂接口联调、客户化开发治理、补丁管理和版本升级适配。</p>
                  <ul className={styles.chipList}>
                    <li>稳定</li><li>可控</li><li>治理</li><li>合规</li><li>可追溯</li><li>可运维</li>
                  </ul>
                  <ul className={styles.checkList}>
                    <li>集成架构设计</li>
                    <li>API 治理</li>
                    <li>数据集成</li>
                    <li>集成总线</li>
                    <li>客户化开发</li>
                    <li>升级适配</li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Integration Lifecycle */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div>
            <span className={styles.sectionKicker}>Integration Lifecycle</span>
            <h2>集成服务生命周期</h2>
          </div>
          <p>把流程拆成可验收节点，责任、交付物和风险处理才可追踪。</p>
        </div>
        <div className={styles.processStrip}>
          <article className={styles.processNode}><span>01</span><strong>现状评估</strong><p>梳理系统清单、接口能力和第三方配合边界。</p></article>
          <article className={styles.processNode}><span>02</span><strong>集成蓝图</strong><p>明确系统拓扑、数据流向、主数据源头和接口清单。</p></article>
          <article className={styles.processNode}><span>03</span><strong>方案评审</strong><p>确认业务合理性、技术可行性、安全合规和容量风险。</p></article>
          <article className={styles.processNode}><span>04</span><strong>开发配置</strong><p>配置 API、集成流、低代码编排和必要接口开发。</p></article>
          <article className={styles.processNode}><span>05</span><strong>联调测试</strong><p>覆盖正反向、异常、边界、性能和对账验证。</p></article>
          <article className={styles.processNode}><span>06</span><strong>上线切换</strong><p>检查密钥、任务、告警、回滚和上线窗口。</p></article>
          <article className={styles.processNode}><span>07</span><strong>集成运维</strong><p>建立监控、补偿、版本变更和运行报告机制。</p></article>
        </div>
      </section>

      {/* Development Lifecycle */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div>
            <span className={styles.sectionKicker}>Development Lifecycle</span>
            <h2>受控开发生命周期</h2>
          </div>
          <p>把流程拆成可验收节点，责任、交付物和风险处理才可追踪。</p>
        </div>
        <div className={styles.processStrip}>
          <article className={styles.processNode}><span>01</span><strong>需求准入</strong><p>先判断是否必须开发，评估价值、范围和替代方案。</p></article>
          <article className={styles.processNode}><span>02</span><strong>需求说明</strong><p>明确场景、流程、字段、权限和验收标准。</p></article>
          <article className={styles.processNode}><span>03</span><strong>技术方案</strong><p>设计数据模型、接口、日志、安全、性能和部署方式。</p></article>
          <article className={styles.processNode}><span>04</span><strong>方案评审</strong><p>项目、顾问、开发和关键用户共同确认风险边界。</p></article>
          <article className={styles.processNode}><span>05</span><strong>开发实现</strong><p>使用低代码、脚本、接口或专业开发实现。</p></article>
          <article className={styles.processNode}><span>06</span><strong>测试验证</strong><p>完成单元、SIT、UAT、回归、性能和安全验证。</p></article>
          <article className={styles.processNode}><span>07</span><strong>上线部署</strong><p>完成补丁部署、备份、上线检查和回滚准备。</p></article>
          <article className={styles.processNode}><span>08</span><strong>运维交接</strong><p>交接代码、说明、接口文档、补丁清单和遗留风险。</p></article>
        </div>
      </section>

      {/* Platform Capability */}
      <section className={styles.sectionFluid}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.sectionKicker}>Platform Capability</span>
              <h2>平台能力表达</h2>
            </div>
            <p>把接口、数据、低代码和定制开发分层治理，避免后期升级和运维失控。</p>
          </div>
          <div className={styles.capabilityGrid}>
            <article className={styles.infoCard}>
              <span className={styles.cardIcon}>01</span>
              <h3>API 网关</h3>
              <p>统一开放、授权、鉴权、限流、监控和 API 生命周期管理。</p>
              <ul className={styles.miniList}>
                <li>API 创建、测试、发布、运行、废弃、下线</li>
                <li>IP 黑白名单、熔断、路由、安全策略</li>
                <li>调用监控、预警和 API 资产管理</li>
              </ul>
            </article>
            <article className={styles.infoCard}>
              <span className={styles.cardIcon}>02</span>
              <h3>数据集成</h3>
              <p>支撑主数据同步、数据转换、任务调度、错误修复和对账。</p>
              <ul className={styles.miniList}>
                <li>跨系统数据对象转换规则</li>
                <li>上下游业务数据转换</li>
                <li>脱敏、加密、鉴权和传输监控</li>
              </ul>
            </article>
            <article className={styles.infoCard}>
              <span className={styles.cardIcon}>03</span>
              <h3>集成总线</h3>
              <p>适合多协议连接、服务编排、复杂联调和流程监控。</p>
              <ul className={styles.miniList}>
                <li>HTTP、AMQP、JMS、Database、SOAP 等连接器</li>
                <li>业务连接器、脚本扩展和数据转换</li>
                <li>集成应用设计、部署、测试、监控和运维</li>
              </ul>
            </article>
            <article className={styles.infoCard}>
              <span className={styles.cardIcon}>04</span>
              <h3>YonBuilder / 低代码</h3>
              <p>用于表单、流程、页面、移动端和轻量应用扩展。</p>
              <ul className={styles.miniList}>
                <li>Web、移动应用、小程序构建</li>
                <li>无代码表单、业务流、报表、工作流</li>
                <li>应用引擎、沙箱验证、发布上线和运营</li>
              </ul>
            </article>
            <article className={styles.infoCard}>
              <span className={styles.cardIcon}>05</span>
              <h3>生态定制</h3>
              <p>补充行业应用、小程序、独立业务系统和第三方场景。</p>
              <ul className={styles.miniList}>
                <li>移动应用定制、行业方案和业务系统开发</li>
                <li>ISV 伙伴协同与项目过程管理</li>
                <li>阶段确认、交付物管理和沟通记录留存</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* Regional Assurance */}
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
              <span className={styles.cardIcon}>01</span>
              <h3>智能协同</h3>
              <p>通过在线会议、工单、知识库和智能服务工具提升日常问题响应效率。</p>
            </article>
            <article className={styles.infoCard}>
              <span className={styles.cardIcon}>02</span>
              <h3>本地响应</h3>
              <p>关键项目节点和重要问题可安排本地顾问协同支持。</p>
            </article>
            <article className={styles.infoCard}>
              <span className={styles.cardIcon}>03</span>
              <h3>现场保障</h3>
              <p>上线切换、迁移割接、接口联调、月结保障等场景提供现场服务。</p>
            </article>
            <article className={styles.infoCard}>
              <span className={styles.cardIcon}>04</span>
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
              <span className={styles.cardIcon}>01</span>
              <h3>系统实施</h3>
              <p>项目启动、关键用户培训、上线切换现场保障。</p>
            </article>
            <article className={styles.infoCard}>
              <span className={styles.cardIcon}>02</span>
              <h3>集成与开发</h3>
              <p>接口联调、第三方系统协调、上线窗口支持。</p>
            </article>
            <article className={styles.infoCard}>
              <span className={styles.cardIcon}>03</span>
              <h3>系统运维</h3>
              <p>重大问题响应、月结保障、巡检、升级护航。</p>
            </article>
            <article className={styles.infoCard}>
              <span className={styles.cardIcon}>04</span>
              <h3>迁移与工具</h3>
              <p>试迁移、正式迁移、数据核对、切换保障。</p>
            </article>
          </div>
        </div>
      </section>

      {/* AI Enablement */}
      <section className={styles.section} id="ai-enablement">
        <div className={styles.aiBand}>
          <div>
            <span className={styles.sectionKicker}>AI Enablement</span>
            <h2>AI 赋能服务全过程</h2>
            <p>AI 是资料助理、初稿顾问和风险检查员，负责初加工；人负责判断、确认、承诺和最终交付。</p>
          </div>
          <ul className={styles.aiScenarioList}>
            <li><strong>接口清单整理</strong><span>自动整理接口清单、字段映射表、数据转换规则</span></li>
            <li><strong>方案初稿生成</strong><span>辅助生成开发方案初稿、测试用例和联调计划</span></li>
            <li><strong>风险缺口识别</strong><span>识别接口缺失字段、数据口径冲突和异常处理缺口</span></li>
            <li><strong>问题归因分析</strong><span>根据联调问题记录进行归因、分级和闭环跟踪</span></li>
            <li><strong>知识沉淀</strong><span>将已解决问题沉淀为接口 FAQ、运维 SOP 和知识库</span></li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.section} id="faq">
        <div className={styles.sectionHead}>
          <div>
            <span className={styles.sectionKicker}>FAQ</span>
            <h2>集成与开发服务常见问题</h2>
          </div>
        </div>
        <div className={styles.faqList}>
          {[
            {
              q: '标准接口、低代码扩展和客户化开发如何划边界？',
              a: '先看需求是否已有标准 API、OpenAPI、连接器、审批能力或低代码配置能力。如果标准接口能覆盖，优先标准；如果只是表单、流程、报表、小应用扩展，优先低代码；只有当业务规则、数据模型、性能或权限控制超出标准能力时，才进入受控客开。'
            },
            {
              q: '第三方系统配合不充分，集成项目怎么推进？',
              a: '会先明确第三方系统负责人、接口文档、测试环境、调用频率、字段口径、错误码和上线窗口。若对方接口不稳定，需要形成问题清单、责任边界和临时补偿方案，避免把外部系统的不确定性全部压到上线阶段。'
            },
            {
              q: '接口联调最容易出问题的不是技术，而是什么？',
              a: '通常是业务口径不一致，例如客户、供应商、物料、组织、币种、税率、单据状态、审批状态和凭证结果的字段含义不同。因此联调前要先做字段映射、主数据对齐、异常补偿和回写规则确认，而不是直接写代码。'
            },
            {
              q: '如何避免接口上线后出现重复推送、漏推和单据状态错乱？',
              a: '需要设计幂等规则、唯一键、重试机制、异常队列、状态回写、人工补偿入口和监控告警。上线前通过联调用例覆盖新增、修改、撤销、失败重推、重复请求、网络中断和部分成功等场景，并记录验证结果。'
            },
            {
              q: '客开和补丁升级之间怎么避免互相冲突？',
              a: '客开必须沉淀对象清单、版本依赖、接口依赖、配置依赖和测试用例。补丁或升级前先做影响分析，确认客开对象是否需要适配；升级后做回归测试，重点看单据流、权限、报表、接口和移动端审批是否仍然可用。'
            },
            {
              q: '移动审批、企业微信、钉钉这类轻量集成怎么控制范围？',
              a: '轻量集成也要先确认审批对象、单据范围、审批动作、消息触发条件、回写结果和异常处理。建议先覆盖高频审批和关键提醒，再逐步扩展复杂场景，避免把移动端入口做成另一个不可控的定制系统。'
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
            <h2>不要让接口成为项目上线后的隐患。</h2>
            <p>我们可以先帮您梳理系统清单、接口现状、数据流向和集成风险，再给出适合的集成与开发服务方案。</p>
          </div>
          <Link href="#diagnosis" className={`${styles.btn} ${styles.btnPrimary}`}>预约集成评估</Link>
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
              <a href="tel:400-9955-161">电话咨询 400-9955-161</a>
              <a href="/contact">在线咨询</a>
            </div>
          </div>

          <form className={styles.leadForm} onSubmit={handleSubmit}>
            <h3>预约企业数智化服务评估</h3>
            <input type="hidden" name="source_page" value="integration-development" />
            <input type="hidden" name="source_path" value="/services/integration-development" />
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
              <label><input type="checkbox" name="interest" value="集成与开发服务" defaultChecked /><span>集成与开发服务</span></label>
              <label><input type="checkbox" name="interest" value="系统运维服务" /><span>系统运维服务</span></label>
              <label><input type="checkbox" name="interest" value="迁移与工具服务" /><span>迁移与工具服务</span></label>
              <label><input type="checkbox" name="interest" value="上海及长三角本地化保障" /><span>上海及长三角本地化保障</span></label>
              <label><input type="checkbox" name="interest" value="AI 赋能服务" /><span>AI 赋能服务</span></label>
            </fieldset>
            <label><span>补充说明</span><textarea name="remark" rows={4} placeholder="例如：计划 8 月上线 YonSuite，需要评估实施周期、接口范围和上海现场支持" /></label>
            <p className={styles.formHint}>提交后由泊冉顾问联系，不做无效打扰。</p>
            <button type="submit" className={styles.modalSubmit}>
              提交服务评估需求
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h12.2l-5.1-5.1L14 5l8 8-8 8-1.9-1.9 5.1-5.1H5v-2Z" /></svg>
            </button>
          </form>
      </section>
    </main>
  )
}
