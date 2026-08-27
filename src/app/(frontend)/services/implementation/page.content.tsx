'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import styles from './implementation.module.css'
import { useAttribution } from '@/providers/Attribution'

export const ImplementationContent: React.FC = () => {
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
            <div className={styles.eyebrow}>Service 01</div>
            <h1>系统实施服务<span><em>项目上线更可控</em></span></h1>
            <p>基于不同客户规模和产品形态，提供从成功规划、方案设计、系统构建、测试培训到上线切换的专业实施服务。</p>
            <div className={styles.heroTags}>
              <span>SaaS快速上线</span>
              <span>BIP敏捷交付</span>
              <span>蓝图设计</span>
              <span>系统建设</span>
              <span>上线切换</span>
              <span>客户成功移交</span>
            </div>
            <div className={styles.heroActions}>
              <Link href="#diagnosis" className={`${styles.btn} ${styles.btnPrimary}`}>
                <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18"><path d="M4 5h16v14H4V5Zm3 3v2h10V8H7Zm0 4v2h7v-2H7Zm0 4v1h4v-1H7Z" fill="currentColor" /></svg>
                预约实施评估
              </Link>
              <Link href="#service-path" className={`${styles.btn} ${styles.btnSecondary}`}>
                <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18"><path d="M4 5h16v4H4V5Zm0 6h7v8H4v-8Zm9 0h7v8h-7v-8Z" fill="currentColor" /></svg>
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
              <Link href="/services/implementation" className={`${styles.loopCard} ${styles.loopCardCurrent}`}>
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
          <article className={styles.painCard}><h3 data-index="01">项目目标不清，售前承诺与实施范围不一致</h3></article>
          <article className={styles.painCard}><h3 data-index="02">需求发散，标准功能、配置、开发和流程优化边界不清</h3></article>
          <article className={styles.painCard}><h3 data-index="03">客户关键用户参与不足，导致上线后不会用、用不好</h3></article>
          <article className={styles.painCard}><h3 data-index="04">数据准备滞后，测试和上线切换风险集中爆发</h3></article>
          <article className={styles.painCard}><h3 data-index="05">大型项目涉及多团队、多系统、多集成，缺少统一项目治理</h3></article>
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
                  <h3>SaaS 快速实施路径</h3>
                  <p>面向 YonSuite SaaS 和标准产品场景，以快速上线和持续运营为目标，优先采用标准产品能力、远程交付、客户培训、智能交付工具和 CSM 持续运营。</p>
                  <ul className={styles.chipList}>
                    <li>快速</li><li>标准优先</li><li>远程交付</li><li>客户培训</li><li>CSM运营</li><li>持续迭代</li>
                  </ul>
                  <div className={styles.timeline}>
                    <article className={styles.timelineCard} data-step="01">
                      <strong>成功规划</strong>
                      <p>内部交接、双方团队组建、实施主计划确认、项目启动</p>
                      <span>客户成功规划表、实施工作任务书、项目团队通讯录、实施主计划</span>
                    </article>
                    <article className={styles.timelineCard} data-step="02">
                      <strong>构建上线</strong>
                      <p>价值引领培训、需求匹配、共建场景解决方案、系统配置、业务验证</p>
                      <span>需求匹配清单、配置清单、项目解决方案、用户测试报告</span>
                    </article>
                    <article className={styles.timelineCard} data-step="03">
                      <strong>培训上线</strong>
                      <p>管理员培训、关键用户培训、最终用户培训、上线确认</p>
                      <span>产品手册、操作视频、系统激活确认书、上线报告</span>
                    </article>
                    <article className={styles.timelineCard} data-step="04">
                      <strong>持续运营</strong>
                      <p>线上移交 CSM、满意度调查、应用深化、持续价值提升</p>
                      <span>项目总结、满意度调查、CSM 交接记录</span>
                    </article>
                  </div>
                </>
              ) : (
                <>
                  <h3>BIP 敏捷交付路径</h3>
                  <p>面向 YonBIP、NC、NCC、私有云、专属云、混合云等复杂项目，以可控交付、质量保障和客户价值落地为目标。</p>
                  <ul className={styles.chipList}>
                    <li>稳定</li><li>可控</li><li>治理</li><li>合规</li><li>可追溯</li><li>可运维</li>
                  </ul>
                  <div className={styles.timeline}>
                    <article className={styles.timelineCard} data-step="01">
                      <strong>售前评估</strong>
                      <p>工作量评估、产品匹配评估、风险评估</p>
                      <span>售前风险评估、工作量评估、实施工作任务书</span>
                    </article>
                    <article className={styles.timelineCard} data-step="02">
                      <strong>筹建准备</strong>
                      <p>项目经理任命、售前交接、团队组建、项目管理机制、项目计划、启动会</p>
                      <span>售前交接单、项目章程、项目主计划、项目启动会材料</span>
                    </article>
                    <article className={styles.timelineCard} data-step="03">
                      <strong>蓝图设计</strong>
                      <p>高层访谈、标准产品培训、业务调研、流程梳理、差异分析、解决方案设计、数据迁移方案</p>
                      <span>高层访谈纪要、业务调研报告、需求分析报告、业务解决方案、数据迁移方案</span>
                    </article>
                    <article className={styles.timelineCard} data-step="04">
                      <strong>系统建设</strong>
                      <p>PRD 环境部署、客户化开发、补丁管理、基础档案配置、业务配置、集成测试、方案验证</p>
                      <span>配置清单、开发方案、补丁清单、集成测试报告、系统测试报告</span>
                    </article>
                    <article className={styles.timelineCard} data-step="05">
                      <strong>上线切换</strong>
                      <p>内部支持体系、应急方案、安全扫描、压测、最终用户培训、模拟演练、上线检查、系统切换</p>
                      <span>上线切换方案、应急预案、安全扫描报告、压测报告、上线报告</span>
                    </article>
                    <article className={styles.timelineCard} data-step="06">
                      <strong>持续运营</strong>
                      <p>项目总结、客成交接、运行支持、产品升级</p>
                      <span>项目总结报告、转客成交接单、客成运维方案、升级计划</span>
                    </article>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div>
            <span className={styles.sectionKicker}>Capabilities</span>
            <h2>实施服务关键能力</h2>
          </div>
          <p>围绕项目从售前到上线后移交的关键控制点，形成可复核的交付闭环。</p>
        </div>
        <div className={styles.capabilityGrid}>
          <article className={styles.infoCard}>
            <span className={styles.cardIcon}>01</span>
            <h3>售前与实施交接</h3>
            <p>承接售前范围、风险、工作量和关键承诺，避免项目启动后重新拉齐口径。</p>
          </article>
          <article className={styles.infoCard}>
            <span className={styles.cardIcon}>02</span>
            <h3>价值引领与需求匹配</h3>
            <p>用标准产品能力和业务场景先做匹配，减少无效定制和范围蔓延。</p>
          </article>
          <article className={styles.infoCard}>
            <span className={styles.cardIcon}>03</span>
            <h3>方案设计与评审</h3>
            <p>把业务方案、集成方案、客开方案和数据迁移方案纳入统一评审。</p>
          </article>
          <article className={styles.infoCard}>
            <span className={styles.cardIcon}>04</span>
            <h3>数据准备与上线切换</h3>
            <p>提前管理静态数据、动态数据、期初数据、切换窗口和回滚预案。</p>
          </article>
          <article className={styles.infoCard}>
            <span className={styles.cardIcon}>05</span>
            <h3>客户成功移交</h3>
            <p>上线后交接系统范围、配置口径、遗留事项、运维方案和持续运营计划。</p>
          </article>
        </div>
      </section>

      {/* Deliverables */}
      <section className={styles.sectionFluid}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.sectionKicker}>Deliverables</span>
              <h2>角色职责与交付物清单</h2>
            </div>
            <p>实施服务不是只配置系统，关键是把双方职责、阶段交付物和验收口径在项目过程中沉淀下来。</p>
          </div>
          <div className={styles.packageGrid}>
            <article className={styles.packageCard}>
              <div className={styles.cardIconSmall}>01</div>
              <h3>成长型上线交付物</h3>
              <dl>
                <div><dt>阶段</dt><dd>成功规划、构建上线、持续运营</dd></div>
                <div><dt>输出</dt><dd>实施任务书、主计划、需求匹配清单、配置清单、测试报告、系统激活确认书、CSM 交接记录</dd></div>
              </dl>
            </article>
            <article className={styles.packageCard}>
              <div className={styles.cardIconSmall}>02</div>
              <h3>集团型项目交付物</h3>
              <dl>
                <div><dt>阶段</dt><dd>售前评估、筹建准备、蓝图设计、系统建设、上线切换、持续运营</dd></div>
                <div><dt>输出</dt><dd>风险评估、项目章程、业务解决方案、集成方案、测试报告、上线切换方案、项目转客成交接单</dd></div>
              </dl>
            </article>
            <article className={styles.packageCard}>
              <div className={styles.cardIconSmall}>03</div>
              <h3>客户侧关键角色</h3>
              <dl>
                <div><dt>角色</dt><dd>项目负责人、关键用户、租户管理员、IT 协同、业务部门负责人</dd></div>
                <div><dt>职责</dt><dd>确认需求边界、提供数据、参与测试、组织培训、完成验收和上线确认</dd></div>
              </dl>
            </article>
            <article className={styles.packageCard}>
              <div className={styles.cardIconSmall}>04</div>
              <h3>服务侧关键角色</h3>
              <dl>
                <div><dt>角色</dt><dd>项目经理、方案顾问、实施顾问、开发顾问、测试与运维支持</dd></div>
                <div><dt>职责</dt><dd>负责计划推进、方案落地、配置开发、联调验证、上线保障和交接沉淀</dd></div>
              </dl>
            </article>
            <article className={styles.packageCard}>
              <div className={styles.cardIconSmall}>05</div>
              <h3>验收口径</h3>
              <dl>
                <div><dt>业务验收</dt><dd>流程跑通、数据正确、权限可用、报表可查、关键用户能独立操作</dd></div>
                <div><dt>技术验收</dt><dd>环境稳定、接口正常、补丁可追溯、备份可恢复、上线问题可闭环</dd></div>
              </dl>
            </article>
            <article className={styles.packageCard}>
              <div className={styles.cardIconSmall}>06</div>
              <h3>移交内容</h3>
              <dl>
                <div><dt>移交对象</dt><dd>客户管理员、内部运维、客户成功或后续服务团队</dd></div>
                <div><dt>移交材料</dt><dd>配置说明、操作手册、问题清单、风险事项、支持机制和持续运营建议</dd></div>
              </dl>
            </article>
          </div>
        </div>
      </section>

      {/* Risk Control */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div>
            <span className={styles.sectionKicker}>Risk Control</span>
            <h2>实施风险控制</h2>
          </div>
          <p>围绕范围、质量、进度、变更、数据和上线六类风险建立控制点，让项目过程可管理、可复核。</p>
        </div>
        <div className={styles.packageGrid}>
          <article className={styles.riskCard}>
            <h3>范围风险</h3>
            <p>通过需求池、Fit-Gap、变更审批和阶段验收，避免实施范围持续扩张。</p>
          </article>
          <article className={styles.riskCard}>
            <h3>质量风险</h3>
            <p>通过方案评审、配置检查、测试用例、缺陷闭环和上线检查把控交付质量。</p>
          </article>
          <article className={styles.riskCard}>
            <h3>进度风险</h3>
            <p>用主计划、周计划、里程碑和风险台账跟踪关键任务，提前暴露阻塞点。</p>
          </article>
          <article className={styles.riskCard}>
            <h3>变更风险</h3>
            <p>对需求变更、组织变更、接口变更和上线窗口变更做影响评估与记录。</p>
          </article>
          <article className={styles.riskCard}>
            <h3>数据风险</h3>
            <p>提前完成数据模板、清洗规则、导入批次、校验口径和回滚准备。</p>
          </article>
          <article className={styles.riskCard}>
            <h3>上线风险</h3>
            <p>上线前完成演练、备份、权限、接口、性能、安全和应急预案检查。</p>
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
              <div className={styles.cardIconSmall}>01</div>
              <h3>智能协同</h3>
              <p>通过在线会议、工单、知识库和智能服务工具提升日常问题响应效率。</p>
            </article>
            <article className={styles.infoCard}>
              <div className={styles.cardIconSmall}>02</div>
              <h3>本地响应</h3>
              <p>关键项目节点和重要问题可安排本地顾问协同支持。</p>
            </article>
            <article className={styles.infoCard}>
              <div className={styles.cardIconSmall}>03</div>
              <h3>现场保障</h3>
              <p>上线切换、迁移割接、接口联调、月结保障等场景提供现场服务。</p>
            </article>
            <article className={styles.infoCard}>
              <div className={styles.cardIconSmall}>04</div>
              <h3>专项服务</h3>
              <p>面向中大型客户提供驻场、巡检、升级护航和专项保障。</p>
            </article>
          </div>
          <div className={styles.localSegments}>
            <article className={styles.segmentCard}>
              <h3>成长型客户</h3>
              <p>以智能交付工具和标准化服务包为支撑，帮助快速上线、及时响应、持续运营；关键节点可按需本地支持。</p>
              <ul className={styles.chipList}>
                <li>智能交付</li><li>在线支持</li><li>标准服务包</li><li>按需现场</li>
              </ul>
            </article>
            <article className={styles.segmentCard}>
              <h3>中大型客户</h3>
              <p>在蓝图设计、集成联调、迁移切换、月结保障和重大问题处理等关键阶段提供本地化项目保障。</p>
              <ul className={styles.chipList}>
                <li>项目制保障</li><li>现场支持</li><li>专项响应</li><li>驻场服务</li>
              </ul>
            </article>
          </div>
          <div className={styles.localScenarios}>
            <article className={styles.infoCard}>
              <div className={styles.cardIconSmall}>01</div>
              <h3>系统实施</h3>
              <p>项目启动、关键用户培训、上线切换现场保障。</p>
            </article>
            <article className={styles.infoCard}>
              <div className={styles.cardIconSmall}>02</div>
              <h3>集成与开发</h3>
              <p>接口联调、第三方系统协调、上线窗口支持。</p>
            </article>
            <article className={styles.infoCard}>
              <div className={styles.cardIconSmall}>03</div>
              <h3>系统运维</h3>
              <p>重大问题响应、月结保障、巡检、升级护航。</p>
            </article>
            <article className={styles.infoCard}>
              <div className={styles.cardIconSmall}>04</div>
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
            <li>
              <strong>启动会</strong>
              <span>生成议程、RACI、风险预案</span>
            </li>
            <li>
              <strong>调研阶段</strong>
              <span>生成问卷、访谈提纲、需求池、待澄清清单</span>
            </li>
            <li>
              <strong>方案阶段</strong>
              <span>生成方案初稿、POC 计划、测试用例</span>
            </li>
            <li>
              <strong>培训阶段</strong>
              <span>将操作视频转成操作手册、FAQ 和练习任务</span>
            </li>
            <li>
              <strong>数据阶段</strong>
              <span>生成数据清洗规则、导入计划、校验清单和回滚预案</span>
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.section} id="faq">
        <div className={styles.sectionHead}>
          <div>
            <span className={styles.sectionKicker}>FAQ</span>
            <h2>系统实施服务常见问题</h2>
          </div>
        </div>
        <div className={styles.faqList}>
          {[
            {
              q: 'SaaS 快速上线和 BIP 敏捷交付的边界怎么判断？',
              a: '主要看组织复杂度、业务差异、接口数量、数据迁移范围、客开需求和管控要求。标准流程清晰、组织层级较少、以配置和培训为主的项目，更适合 SaaS 快速上线；多组织、多账套、多系统协同、需要蓝图设计和项目治理的客户，更适合 BIP 敏捷交付路径。'
            },
            {
              q: '项目启动前客户需要准备哪些资料，才能减少返工？',
              a: '建议准备组织架构、岗位权限、基础档案、业务流程、历史数据样例、报表样式、接口清单、关键用户名单和上线窗口。资料不是越多越好，关键是能支撑顾问判断标准功能、配置实现、低代码扩展、客开和数据迁移的边界。'
            },
            {
              q: '蓝图设计阶段如何避免"什么都想定制"？',
              a: '会先做 Fit-Gap 判断：优先标准产品能力，其次配置和低代码，再评估客开。每个差异需求都会记录业务原因、影响范围、替代方案、开发成本、上线风险和后续运维责任，避免因为局部习惯把项目拖成大量客开。'
            },
            {
              q: '上线切换前如何判断系统已经具备上线条件？',
              a: '不能只看功能是否配置完成。还要看关键用户是否完成演练，基础档案和期初数据是否核对，接口和报表是否通过联调，权限是否按岗位验证，异常场景是否有处理预案，并形成上线检查表、问题关闭清单和切换确认记录。'
            },
            {
              q: '实施结束后为什么要做 CSM 移交？',
              a: '上线不是项目结束，而是进入持续运营。CSM 移交会把项目范围、配置说明、未关闭问题、培训资料、关键用户、运维注意事项和后续优化建议交接给客户成功团队，避免顾问撤场后客户不知道找谁、问题也没有上下文。'
            },
            {
              q: '中大型项目如何控制范围蔓延和上线延期？',
              a: '需要在项目制里管理范围、里程碑、变更和风险。泊冉会把需求准入、蓝图确认、开发配置、测试验证、数据迁移、上线切换和验收交付拆成节点，变更需求必须评估影响并确认优先级，避免"边做边加"冲击上线节奏。'
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
            <h2>让项目从一开始就可控。</h2>
            <p>我们可以根据您的产品形态、上线目标和组织复杂度，评估适合采用 SaaS 快速实施还是 BIP 敏捷交付路径。</p>
          </div>
          <Link href="#diagnosis" className={`${styles.btn} ${styles.btnPrimary}`}>预约实施评估</Link>
        </div>
      </section>

      {/* Diagnosis Section */}
      <section className={styles.sectionDiagnosis} id="diagnosis">
        <div className={styles.diagnosisContainer}>
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
            <input type="hidden" name="source_page" value="implementation" />
            <input type="hidden" name="source_path" value="/services/implementation" />
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
              <label><input type="checkbox" name="interest" value="系统实施服务" defaultChecked /><span>系统实施服务</span></label>
              <label><input type="checkbox" name="interest" value="集成与开发服务" /><span>集成与开发服务</span></label>
              <label><input type="checkbox" name="interest" value="系统运维服务" /><span>系统运维服务</span></label>
              <label><input type="checkbox" name="interest" value="迁移与工具服务" /><span>迁移与工具服务</span></label>
              <label><input type="checkbox" name="interest" value="上海及长三角本地化保障" /><span>上海及长三角本地化保障</span></label>
              <label><input type="checkbox" name="interest" value="AI 赋能服务" /><span>AI 赋能服务</span></label>
            </fieldset>
            <label><span>补充说明</span><textarea name="remark" rows={4} placeholder="例如：计划 8 月上线 YonSuite，需要评估实施周期、接口范围和上海现场支持" /></label>
            <p className={styles.formHint}>提交后由泊冉顾问联系，不做无效打扰。</p>
            <button type="submit" className={styles.modalSubmit}>
              提交服务评估需求
              <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18"><path d="M5 12h12.2l-5.1-5.1L14 5l8 8-8 8-1.9-1.9 5.1-5.1H5v-2Z" fill="currentColor" /></svg>
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
