'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import styles from './operations.module.css'
import { useAttribution } from '@/providers/Attribution'

export const OperationsContent: React.FC = () => {
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
      source: '系统运维与客户成功服务',
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
            <div className={styles.eyebrow}>Service 03</div>
            <h1>系统运维与客户成功服务<span><em>稳定运行与持续运营</em></span></h1>
            <p>围绕系统上线后的长期稳定运行，提供工单支持、问题诊断、运行巡检、补丁升级、月结保障、权限检查、培训赋能和客户成功运营服务。</p>
            <div className={styles.heroTags}>
              <span>在线支持</span>
              <span>工单分诊</span>
              <span>系统巡检</span>
              <span>月结保障</span>
              <span>升级护航</span>
              <span>客户成功</span>
            </div>
            <div className={styles.heroActions}>
              <Link href="#diagnosis" className={`${styles.btn} ${styles.btnPrimary}`}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4V5Zm3 3v2h10V8H7Zm0 4v2h7v-2H7Zm0 4v1h4v-1H7Z" /></svg>
                预约运维评估
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
              <Link href="/services/integration-development" className={styles.loopCard}>
                <span className={styles.loopIndex}>02</span>
                <strong>集成与开发服务</strong>
                <p>让系统连起来、扩起来。</p>
              </Link>
              <Link href="/services/operations" className={`${styles.loopCard} ${styles.loopCardCurrent}`}>
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
              <div><strong>分层服务路径</strong><span>成长型轻量运营，集团型核心保障</span></div>
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
          <article className={styles.painCard}><h3 data-index="01">上线后问题没有统一入口，处理过程不可追踪</h3></article>
          <article className={styles.painCard}><h3 data-index="02">顾问撤场后，客户内部关键用户和管理员能力不足</h3></article>
          <article className={styles.painCard}><h3 data-index="03">月结、升级、补丁、安全检查等关键时刻缺少保障</h3></article>
          <article className={styles.painCard}><h3 data-index="04">客开、接口、补丁、版本升级之间缺少完整交接</h3></article>
          <article className={styles.painCard}><h3 data-index="05">同类问题反复发生，知识没有沉淀为标准解决方案</h3></article>
        </div>
      </section>

      {/* Success Plans */}
      <section className={styles.sectionFluid}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.sectionKicker}>Success Plans</span>
              <h2>成长型企业客户成功计划</h2>
            </div>
            <p>把标准支持、配置调整、管理员赋能、运营分析和关键时刻保障分层组合，让日常运维不再依赖临时救火。</p>
          </div>
          <div className={styles.serviceGrid}>
            <article className={styles.infoCard}>
              <span className={styles.cardIcon}>01</span>
              <h3>标准计划</h3>
              <p>适合基础运行保障和管理员赋能。</p>
              <ul className={styles.miniList}>
                <li>操作手册、FAQ、培训视频</li>
                <li>权限、组织、基础参数指导</li>
                <li>工单记录、问题跟踪和基础响应</li>
              </ul>
            </article>
            <article className={styles.infoCard}>
              <span className={styles.cardIcon}>02</span>
              <h3>加速计划</h3>
              <p>适合希望提高服务优先级和业务连续性的企业。</p>
              <ul className={styles.miniList}>
                <li>覆盖标准计划能力</li>
                <li>更高优先级顾问响应</li>
                <li>工单、配置问题和月结问题跟进加强</li>
              </ul>
            </article>
            <article className={styles.infoCard}>
              <span className={styles.cardIcon}>03</span>
              <h3>优先计划</h3>
              <p>适合需要深度应用指导和运营报告的团队。</p>
              <ul className={styles.miniList}>
                <li>产品应用培训和深度应用指导</li>
                <li>应用健康度评估</li>
                <li>系统运营报告和关键时刻支持</li>
              </ul>
            </article>
            <article className={styles.infoCard}>
              <span className={styles.cardIcon}>04</span>
              <h3>尊享计划</h3>
              <p>适合对专家辅导、业务创新规划和关键时刻保障要求更高的企业。</p>
              <ul className={styles.miniList}>
                <li>开发者支持和互动研讨</li>
                <li>业务创新最佳实践规划</li>
                <li>成功指标检查和专家建议</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* OMS Service Packages */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div>
            <span className={styles.sectionKicker}>OMS Service</span>
            <h2>OMS 场景服务包</h2>
          </div>
          <p>将常见售后需求拆成可购买、可交付、可验证的服务包，覆盖配置优化、专项业务和交付支持。</p>
        </div>
        <div className={styles.packageGrid}>
          <article className={styles.packageCard}>
            <span className={styles.cardIcon}>01</span>
            <h3>配置调整类</h3>
            <dl>
              <div><dt>典型内容</dt><dd>审批流、权限、组织架构、科目表、业务流、打印模板、UI 模板和公式调整</dd></div>
              <div><dt>客户价值</dt><dd>减少日常配置阻塞，让系统随业务变化保持可用</dd></div>
            </dl>
          </article>
          <article className={styles.packageCard}>
            <span className={styles.cardIcon}>02</span>
            <h3>专项业务类</h3>
            <dl>
              <div><dt>典型内容</dt><dd>合并报表、生产计划培训、业财对账、业务加速器、财务健康诊断、报表服务、月结服务</dd></div>
              <div><dt>客户价值</dt><dd>围绕财务、供应链，制造和报表场景做深度应用保障</dd></div>
            </dl>
          </article>
          <article className={styles.packageCard}>
            <span className={styles.cardIcon}>03</span>
            <h3>交付支持类</h3>
            <dl>
              <div><dt>典型内容</dt><dd>安装服务、定制培训、客开运维、历史凭证迁移、专属现场和驻场支持</dd></div>
              <div><dt>客户价值</dt><dd>在关键阶段获得更强的专项支持和交付资源补位</dd></div>
            </dl>
          </article>
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
            <div className={`${styles.segmentPanel} ${activeTab === 'growth' ? styles.segmentPanelActive : ''}`}>
              <h3>在线化、轻量化、持续化运维</h3>
              <p>帮助客户降低使用门槛、提升管理员能力、持续应用标准产品能力。</p>
              <ul className={styles.chipList}>
                <li>快速</li><li>标准</li><li>轻量</li><li>低成本</li><li>在线化</li><li>持续迭代</li>
              </ul>
              <ul className={styles.checkList}>
                <li>问题接入、工单记录、配置答疑和进度跟踪</li>
                <li>租户管理员培训、权限配置指导、组织配置指导</li>
                <li>审批流、权限、组织、科目表、业务流、打印模板、公式等配置调整</li>
                <li>新版本功能说明、影响说明、操作指引</li>
                <li>模块启用、用户活跃、流程使用情况、低活跃风险分析</li>
                <li>操作手册、培训视频、FAQ、角色化培训</li>
              </ul>
            </div>
            <div className={`${styles.segmentPanel} ${activeTab === 'enterprise' ? styles.segmentPanelActive : ''}`}>
              <h3>集团型客户核心系统保障</h3>
              <p>面向多组织、多账套、多系统集成和关键业务连续性要求高的客户，提供专属服务团队、阶段性驻场、关键窗口值守、重大问题升级、巡检整改、月结 / 年结 / 升级护航和客户成功运营复盘。</p>
              <ul className={styles.chipList}>
                <li>专属团队</li><li>驻场支持</li><li>实时响应</li><li>月结值守</li><li>升级护航</li><li>运营复盘</li>
              </ul>
              <div className={styles.enterpriseServiceGrid}>
                <article className={styles.enterpriseServiceCard}>
                  <span>01</span>
                  <h4>专属服务小组</h4>
                  <p>建立客户成功经理，应用顾问、技术顾问，开发 / 集成支持和本地顾问的固定服务接口。</p>
                  <ul className={styles.miniList}>
                    <li>明确业务，IT、财务和关键用户对接人</li>
                    <li>按周 / 月跟踪工单、风险和优化事项</li>
                  </ul>
                </article>
                <article className={styles.enterpriseServiceCard}>
                  <span>02</span>
                  <h4>驻场与现场保障</h4>
                  <p>在上线后稳定期、月结窗口、升级窗口和重大问题处理阶段安排现场或驻场顾问。</p>
                  <ul className={styles.miniList}>
                    <li>现场梳理问题，陪同关键用户操作验证</li>
                    <li>形成问题清单、处理计划和确认记录</li>
                  </ul>
                </article>
                <article className={styles.enterpriseServiceCard}>
                  <span>03</span>
                  <h4>关键时段实时响应</h4>
                  <p>对影响生产、发货、开票、结账和管理报表的事项，建立分级响应和升级通道。</p>
                  <ul className={styles.miniList}>
                    <li>关键窗口保障群、日会或专项协调会</li>
                    <li>重大问题优先分诊，跨团队协同定位</li>
                  </ul>
                </article>
                <article className={styles.enterpriseServiceCard}>
                  <span>04</span>
                  <h4>月结 / 年结保障</h4>
                  <p>围绕总账、应收应付、存货核算，成本、合并报表等结账链路提前检查和现场值守。</p>
                  <ul className={styles.miniList}>
                    <li>结账前检查、跑批监控、异常单据处理</li>
                    <li>对账差异跟踪、结账复盘和下月优化清单</li>
                  </ul>
                </article>
                <article className={styles.enterpriseServiceCard}>
                  <span>05</span>
                  <h4>升级与补丁护航</h4>
                  <p>针对版本升级、补丁发布、客开适配和接口变更，提前做影响分析、测试验证和回退预案。</p>
                  <ul className={styles.miniList}>
                    <li>升级影响清单、回归测试用例、上线窗口值守</li>
                    <li>客开、接口、报表和权限适配结果确认</li>
                  </ul>
                </article>
                <article className={styles.enterpriseServiceCard}>
                  <span>06</span>
                  <h4>巡检与运营复盘</h4>
                  <p>定期检查运行健康、权限安全、备份恢复、接口稳定性和用户使用情况，推动问题闭环。</p>
                  <ul className={styles.miniList}>
                    <li>巡检报告、整改建议，责任人和完成时间</li>
                    <li>工单趋势、培训计划、流程优化和价值复盘</li>
                  </ul>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operation Loop */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div>
            <span className={styles.sectionKicker}>Operation Loop</span>
            <h2>运维服务闭环</h2>
          </div>
          <p>把运维流程拆成可追踪节点，响应、验证和知识沉淀才可闭环。</p>
        </div>
        <div className={styles.processStrip}>
          <article className={styles.processNode}><span>01</span><strong>接入</strong><p>统一工单、会议、项目群和现场问题入口。</p></article>
          <article className={styles.processNode}><span>02</span><strong>分诊</strong><p>按影响范围、紧急程度和责任边界分级处理。</p></article>
          <article className={styles.processNode}><span>03</span><strong>处理</strong><p>顾问、开发、产品和本地团队协同定位问题。</p></article>
          <article className={styles.processNode}><span>04</span><strong>验证</strong><p>确认业务结果、数据一致性和用户可操作性。</p></article>
          <article className={styles.processNode}><span>05</span><strong>沉淀</strong><p>形成 FAQ、SOP、配置记录和风险清单。</p></article>
          <article className={styles.processNode}><span>06</span><strong>运营分析</strong><p>复盘高频问题、使用活跃和后续优化计划。</p></article>
        </div>
      </section>

      {/* Service Packages */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div>
            <span className={styles.sectionKicker}>Service Packages</span>
            <h2>运维服务产品建议</h2>
          </div>
          <p>针对不同客户对象、关键业务窗口和现场保障要求，组合不同强度的服务；重点客户可共同协商驻场方式、响应机制和服务内容。</p>
        </div>
        <div className={styles.packageGrid}>
          <article className={styles.packageCard}>
            <span className={styles.cardIcon}>01</span>
            <h3>标准支持服务</h3>
            <dl>
              <div><dt>适用对象</dt><dd>中小型 / 成长型客户</dd></div>
              <div><dt>服务内容</dt><dd>问题接入、工单跟踪、操作手册、FAQ、培训答疑</dd></div>
            </dl>
          </article>
          <article className={styles.packageCard}>
            <span className={styles.cardIcon}>02</span>
            <h3>OMS 运营维护服务</h3>
            <dl>
              <div><dt>适用对象</dt><dd>成长型客户</dd></div>
              <div><dt>服务内容</dt><dd>配置调整、流程优化、报表服务、月结支持</dd></div>
            </dl>
          </article>
          <article className={styles.packageCard}>
            <span className={styles.cardIcon}>03</span>
            <h3>核心系统保障服务</h3>
            <dl>
              <div><dt>适用对象</dt><dd>大中型客户</dd></div>
              <div><dt>服务内容</dt><dd>巡检、安全、补丁、运行支持、重大问题响应</dd></div>
            </dl>
          </article>
          <article className={styles.packageCard}>
            <span className={styles.cardIcon}>04</span>
            <h3>月结保障服务</h3>
            <dl>
              <div><dt>适用对象</dt><dd>财务、供应链、制造客户</dd></div>
              <div><dt>服务内容</dt><dd>月结检查、对账、异常修复、月结复盘</dd></div>
            </dl>
          </article>
          <article className={styles.packageCard}>
            <span className={styles.cardIcon}>05</span>
            <h3>升级护航服务</h3>
            <dl>
              <div><dt>适用对象</dt><dd>BIP / NC / NCC 客户</dd></div>
              <div><dt>服务内容</dt><dd>升级影响分析、回归测试、客开适配、回滚预案</dd></div>
            </dl>
          </article>
          <article className={styles.packageCard}>
            <span className={styles.cardIcon}>06</span>
            <h3>客户成功运营服务</h3>
            <dl>
              <div><dt>适用对象</dt><dd>重点客户</dd></div>
              <div><dt>服务内容</dt><dd>健康度分析、使用报告、价值复盘、培训计划</dd></div>
            </dl>
          </article>
          <article className={styles.packageCard}>
            <span className={styles.cardIcon}>07</span>
            <h3>驻场保障服务</h3>
            <dl>
              <div><dt>适用对象</dt><dd>大中型 / 集团型客户</dd></div>
              <div><dt>服务内容</dt><dd>上线稳定期、月结窗口、升级窗口和重大问题处理阶段安排顾问驻场或现场值守</dd></div>
              <div><dt>交付结果</dt><dd>现场问题清单、处理记录、验证确认、风险日报和阶段复盘</dd></div>
            </dl>
          </article>
          <article className={styles.packageCard}>
            <span className={styles.cardIcon}>08</span>
            <h3>个性化定制服务</h3>
            <dl>
              <div><dt>适用对象</dt><dd>集团型 / 重点客户</dd></div>
              <div><dt>服务内容</dt><dd>与客户共同协商服务方式、响应时段、驻场周期、会议机制、专项清单和交付口径</dd></div>
              <div><dt>交付结果</dt><dd>定制服务方案、服务台账、月度服务报告、优化路线和双方确认机制</dd></div>
            </dl>
          </article>
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
          <ul className={styles.aiList}>
            <li>工单分诊</li>
            <li>问题诊断</li>
            <li>客户上下文</li>
            <li>主动巡检</li>
            <li>升级护航</li>
            <li>知识沉淀</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.section} id="faq">
        <div className={styles.sectionHead}>
          <div>
            <span className={styles.sectionKicker}>FAQ</span>
            <h2>系统运维与客户成功服务常见问题</h2>
          </div>
        </div>
        <div className={styles.faqList}>
          {[
            {
              q: '月结 / 年结保障通常具体做什么？',
              a: '会先梳理结账链路和关键岗位，包括总账、应收应付、存货核算，成本、供应链单据、合并报表等；结账前检查异常单据、凭证状态、接口未处理数据和关键报表口径，结账期间协助定位差异，结账后输出问题清单、处理记录和下月优化建议。'
            },
            {
              q: '驻场服务不是坐班，怎么定义驻场价值？',
              a: '驻场不只是"人在现场"，而是围绕上线稳定期、月结窗口、升级窗口或重大问题处理设定目标。交付前会明确驻场周期、服务时段、现场任务、对接人、问题分级和验收方式，交付物包括现场问题台账，日 / 周进展、验证记录、风险提醒和阶段复盘。'
            },
            {
              q: '重大问题响应如何分级，不会所有问题都走同一套流程吗？',
              a: '会按业务影响范围、是否阻断生产经营、是否影响结账或发货、是否存在数据风险来分级。重大问题会拉通应用顾问，技术顾问，开发 / 集成支持和本地顾问，先恢复业务可用，再定位根因，最后沉淀补丁、配置、操作或流程优化方案。'
            },
            {
              q: '升级、补丁、客开和接口经常互相影响，如何控制风险？',
              a: '升级或补丁前会先做影响分析，列出客开对象、接口、报表、权限、审批流和关键业务场景；再准备回归测试用例、上线窗口、备份点和回退条件。升级后重点验证单据流转、接口推送、报表口径和核心岗位操作，避免"系统升级了，业务断了"。'
            },
            {
              q: '客户成功服务如何避免只变成工单处理？',
              a: '工单只是入口，客户成功更关注系统是否持续被用好。我们会结合模块启用、用户活跃、流程卡点、高频问题、培训缺口和关键指标变化，形成月度服务报告、优化清单、培训计划和价值复盘，让运维从被动救火转向持续运营。'
            },
            {
              q: '个性化定制服务通常可以协商哪些内容？',
              a: '可协商服务方式、响应时段、驻场周期，会议机制、服务人员角色、专项服务清单、服务台账格式、报告频率和双方确认机制。适合集团型客户、多系统客户、月结压力大或现场保障要求高的客户，最终以定制服务方案和确认口径为准。'
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
            <h2>上线不是终点，稳定运行才是长期价值的开始。</h2>
            <p>我们可以为您的系统建立运维服务档案、巡检机制和关键时刻保障方案，降低运行风险，提升应用价值。</p>
          </div>
          <Link href="#diagnosis" className={`${styles.btn} ${styles.btnPrimary}`}>预约运维评估</Link>
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
            <input type="hidden" name="source_page" value="operations" />
            <input type="hidden" name="source_path" value="/services/operations" />
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
              <label><input type="checkbox" name="interest" value="系统运维服务" defaultChecked /><span>系统运维服务</span></label>
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
