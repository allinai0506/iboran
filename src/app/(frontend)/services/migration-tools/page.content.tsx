'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import styles from './migration.module.css'
import { useAttribution } from '@/providers/Attribution'

export const MigrationContent: React.FC = () => {
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
            <div className={styles.eyebrow}>Service 04</div>
            <h1>迁移与工具服务<span><em>迁准可控</em></span></h1>
            <p>面向 NC、NCC、U8 Cloud、YonBIP 等用友体系及相关第三方系统，围绕版本升迁、集团拆分、历史数据延续、多系统同步、数据脱敏、云巡检和备份回滚，提供工具化、标准化、可验证的迁移服务。</p>
            <div className={styles.heroTags}>
              <span>数据抽取</span><span>数据同步</span><span>BIP升迁</span>
              <span>数据脱敏</span><span>云巡检</span><span>业务转凭证</span><span>数据备份</span>
            </div>
            <div className={styles.heroActions}>
              <Link href="#diagnosis" className={`${styles.btn} ${styles.btnPrimary}`} data-track="hero_cta_click" data-prefill-interest="迁移与工具服务">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4V5Zm3 3v2h10V8H7Zm0 4v2h7v-2H7Zm0 4v1h4v-1H7Z" /></svg>
                预约迁移评估
              </Link>
              <Link href="#service-path" className={`${styles.btn} ${styles.btnSecondary}`} data-track="secondary_cta_click">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v4H4V5Zm0 6h7v8H4v-8Zm9 0h7v8h-7v-8Z" /></svg>
                查看服务内容
              </Link>
            </div>
          </div>

          <aside className={styles.serviceConsole} aria-label="企业数智化服务闭环示意">
            <div className={styles.consoleTop}>
              <div><span>Service Command Center</span><h2>全生命周期服务闭环</h2></div>
              <b className={styles.consoleBadge}>AI 辅助复核</b>
            </div>
            <div className={styles.loopVisual}>
              <Link href="/services/implementation" className={styles.loopCard}><span className={styles.loopIndex}>01</span><strong>系统实施服务</strong><p>让系统建起来、用起来、跑起来。</p></Link>
              <Link href="/services/integration-development" className={styles.loopCard}><span className={styles.loopIndex}>02</span><strong>集成与开发服务</strong><p>让系统连起来、扩起来。</p></Link>
              <Link href="/services/operations" className={styles.loopCard}><span className={styles.loopIndex}>03</span><strong>系统运维服务</strong><p>让系统稳下来、持续创造价值。</p></Link>
              <Link href="/services/migration-tools" className={`${styles.loopCard} ${styles.loopCardCurrent}`}><span className={styles.loopIndex}>04</span><strong>迁移与工具服务</strong><p>让数据迁得动、风险控得住。</p></Link>
            </div>
            <div className={styles.consoleFoot}>
              <div><strong>分层服务路径</strong><span>轻量数据初始化，复杂迁移治理</span></div>
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
              <h2>迁移与工具服务不是单一工具或单点支持</h2>
              <p>迁移与工具服务覆盖数据抽取、数据同步、移动审批、BIP升迁、数据迁移、数据脱敏、数据卸载、业务数据初始化、数据库转换、数据备份和云巡检。重点不只是"把数据搬过去"，而是把源系统、目标系统、组织账套、业务对象、字段规则、异常处理、数据对账、切换窗口和回退路径全部设计清楚。</p>
            </div>
            <aside className={styles.promiseSide}><span>Risk Control</span><strong>范围、规则、验证、切换和运维必须一起设计。</strong></aside>
          </div>
        </div>
      </section>

      {/* Service Path */}
      <section className={styles.sectionFluid} id="service-path">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <div><span className={styles.sectionKicker}>Service Path</span><h2>企业分层服务路径</h2></div>
            <p>同一条服务线下，不同规模企业的交付范围、治理深度与保障方式不同。</p>
          </div>
          <div className={styles.segmentShell}>
            <div className={styles.segmentTabs}>
              <button className={`${styles.segmentTab} ${activeTab === 'growth' ? styles.segmentTabActive : ''}`} onClick={() => setActiveTab('growth')}>中小型 / 成长型客户</button>
              <button className={`${styles.segmentTab} ${activeTab === 'enterprise' ? styles.segmentTabActive : ''}`} onClick={() => setActiveTab('enterprise')}>大中型 / 集团型客户</button>
            </div>
            <div className={`${styles.segmentPanel} ${styles.segmentPanelActive}`}>
              {activeTab === 'growth' ? (
                <>
                  <h3>轻量化数据初始化与工具服务</h3>
                  <p>围绕基础资料、期初数据、历史凭证、常用业务数据和移动审批等高频场景，用标准工具加顾问校验的方式，保障系统快速启用和业务平稳承接。</p>
                  <ul className={styles.chipList}><li>快速</li><li>标准</li><li>轻量</li><li>低成本</li><li>可验证</li><li>按需现场</li></ul>
                  <ul className={styles.checkList}><li>基础资料整理</li><li>期初数据导入</li><li>历史凭证迁移</li><li>轻量数据同步</li><li>移动审批集成</li><li>脱敏与培训数据</li></ul>
                </>
              ) : (
                <>
                  <h3>完整迁移治理与工具化保障</h3>
                  <p>覆盖系统升迁、历史数据迁移、集团数据抽取、多系统同步、业务数据转凭证、数据脱敏、数据库转换、云巡检和备份灾备。</p>
                  <ul className={styles.chipList}><li>稳定</li><li>可控</li><li>治理</li><li>合规</li><li>可追溯</li><li>可运维</li></ul>
                  <ul className={styles.checkList}><li>BIP 升迁</li><li>历史数据迁移</li><li>集团拆分与数据抽取</li><li>数据同步</li><li>数据脱敏</li><li>数据备份与灾备</li><li>云巡检</li><li>数据库转换</li></ul>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* High Value Scenarios */}
      <section className={styles.section} id="migration-scenarios">
        <div className={styles.sectionHead}>
          <div><span className={styles.sectionKicker}>High Value Scenarios</span><h2>最值得优先评估的迁移场景</h2></div>
          <p>迁移最有价值的地方，往往不是一次导入，而是解决版本升迁、集团拆分、数据同步、系统瘦身、历史延续、安全共享和上线后稳定这些高风险问题。</p>
        </div>
        <div className={styles.packageGrid}>
          <article className={styles.packageCard}><span className={styles.cardIcon}>01</span><h3>BIP 升迁与版本升级</h3><dl><div><dt>常见触发</dt><dd>U8 Cloud、NC、NC Cloud、YonBIP 高级版升迁到旗舰版、超级版或新版本。</dd></div><div><dt>关键动作</dt><dd>盘点组织、账簿、用户、人员、客户、科目、辅助核算、期初和凭证等对象，完成加载、转换、迁移和核对。</dd></div><div><dt>交付结果</dt><dd>升迁评估、对象清单、映射规则、试迁移报告、差异台账、正式切换确认。</dd></div></dl></article>
          <article className={styles.packageCard}><span className={styles.cardIcon}>02</span><h3>集团拆分、公司独立与审计抽取</h3><dl><div><dt>常见触发</dt><dd>子公司上市、业务剥离、组织重组、外部审计、历史数据独立保管。</dd></div><div><dt>关键动作</dt><dd>按公司、组织、账套、模块、年度抽取，隔离敏感数据，形成独立数据环境或审计数据包。</dd></div><div><dt>交付结果</dt><dd>抽取范围清单、独立库或数据包、抽取日志、审计核对报告、权限隔离说明。</dd></div></dl></article>
          <article className={styles.packageCard}><span className={styles.cardIcon}>03</span><h3>多单位、多账套数据同步</h3><dl><div><dt>常见触发</dt><dd>总部与子集团、内外账套、财务共享、多套业务系统需要周期同步或集中汇总。</dd></div><div><dt>关键动作</dt><dd>建立基础档案对照、同步任务中心、频率规则、异常重试、补偿机制和差异对账。</dd></div><div><dt>交付结果</dt><dd>同步方案、字段映射表、任务配置清单、异常处理规则、运行监控报告。</dd></div></dl></article>
          <article className={styles.packageCard}><span className={styles.cardIcon}>04</span><h3>历史凭证与业务数据延续</h3><dl><div><dt>常见触发</dt><dd>新系统上线后仍需查询历史凭证、余额、业务单据、审批记录、附件和电子档案。</dd></div><div><dt>关键动作</dt><dd>梳理历史期间、数据对象、单据链路、凭证规则、附件路径和查询权限。</dd></div><div><dt>交付结果</dt><dd>历史数据迁移清单、查询口径、凭证核对表、附件抽样记录、历史联查说明。</dd></div></dl></article>
          <article className={styles.packageCard}><span className={styles.cardIcon}>05</span><h3>移动审批与业务回写</h3><dl><div><dt>常见触发</dt><dd>审批待办需要进入钉钉、企业微信、OA 或移动端，审批结果要回写业务系统。</dd></div><div><dt>关键动作</dt><dd>梳理审批对象、字段、消息模板、附件预览、审批动作、状态回写和审计记录。</dd></div><div><dt>交付结果</dt><dd>审批集成方案、字段映射表、联调记录、消息推送配置、审批闭环报告。</dd></div></dl></article>
          <article className={styles.packageCard}><span className={styles.cardIcon}>06</span><h3>脱敏与安全共享</h3><dl><div><dt>常见触发</dt><dd>开发测试、外包分析、培训演示、跨系统共享需要使用真实结构数据。</dd></div><div><dt>关键动作</dt><dd>识别姓名、电话、证件、地址、银行卡、薪资等敏感字段，设计替换、掩码和扰动规则。</dd></div><div><dt>交付结果</dt><dd>敏感字段清单、脱敏规则、脱敏数据集、可用性验证、安全合规说明。</dd></div></dl></article>
          <article className={styles.packageCard}><span className={styles.cardIcon}>07</span><h3>业务数据转凭证与初始化</h3><dl><div><dt>常见触发</dt><dd>外部业务系统需要生成总账凭证，或系统重建时需要保留基础资料并清理业务数据。</dd></div><div><dt>关键动作</dt><dd>定义凭证模板、业务字段取数、摘要规则、辅助核算、期初口径、清理范围和保留范围。</dd></div><div><dt>交付结果</dt><dd>转凭证规则、初始化清单、凭证样例、导入日志、期初与凭证核对报告。</dd></div></dl></article>
          <article className={styles.packageCard}><span className={styles.cardIcon}>08</span><h3>云巡检、备份与回滚保障</h3><dl><div><dt>常见触发</dt><dd>迁移切换、系统升级、月结前后、重大业务窗口、补丁检查和安全检查要求。</dd></div><div><dt>关键动作</dt><dd>检查服务器、数据库、网络、补丁、备份、接口任务、业务指标和安全风险。</dd></div><div><dt>交付结果</dt><dd>巡检报告、风险等级、备份确认、恢复演练记录、回滚预案和问题闭环清单。</dd></div></dl></article>
        </div>
      </section>

      {/* Migration Objects */}
      <section className={styles.sectionFluid} id="migration-objects">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <div><span className={styles.sectionKicker}>Data Scope</span><h2>迁移对象与核验口径</h2></div>
            <p>迁移评估要先回答哪些数据必须迁、哪些需要清洗后迁、哪些只归档、哪些确认废弃，避免正式切换时才发现口径不一致。</p>
          </div>
          <div className={styles.packageGrid}>
            <article className={styles.packageCard}><span className={styles.cardIcon}>01</span><h3>主数据</h3><dl><div><dt>对象范围</dt><dd>客户、供应商、人员、组织、部门、物料、商品、BOM、计量单位。</dd></div><div><dt>常见风险</dt><dd>名称重复、编码不统一、停用数据未清理、关键字段缺失、BOM版本混乱。</dd></div><div><dt>核验口径</dt><dd>编码唯一性、启停状态、字段完整率、上下级关系、业务引用是否可用。</dd></div></dl></article>
            <article className={styles.packageCard}><span className={styles.cardIcon}>02</span><h3>财务数据</h3><dl><div><dt>对象范围</dt><dd>科目、辅助核算、期初余额、应收应付、凭证、现金银行和往来余额。</dd></div><div><dt>常见风险</dt><dd>辅助核算缺失、期初不平、往来余额不一致、凭证期间和状态异常。</dd></div><div><dt>核验口径</dt><dd>科目余额、辅助余额、借贷平衡、期间合计、凭证抽样和报表一致性。</dd></div></dl></article>
            <article className={styles.packageCard}><span className={styles.cardIcon}>03</span><h3>供应链与库存</h3><dl><div><dt>对象范围</dt><dd>仓库、库位、批次、序列号、库存期初、采购订单、销售订单和出入库单。</dd></div><div><dt>常见风险</dt><dd>账实不符、批次缺失、库位错误、未结订单状态不清、单位换算不一致。</dd></div><div><dt>核验口径</dt><dd>库存数量、金额、批次库位、未结业务、单据状态和新系统业务流转。</dd></div></dl></article>
            <article className={styles.packageCard}><span className={styles.cardIcon}>04</span><h3>生产与项目数据</h3><dl><div><dt>对象范围</dt><dd>生产订单、工序、工单、BOM版本、项目档案、项目预算、成本归集数据。</dd></div><div><dt>常见风险</dt><dd>生产状态断裂、成本对象不清、项目阶段不一致、历史成本口径无法追溯。</dd></div><div><dt>核验口径</dt><dd>在制状态、完工状态、BOM引用、项目余额、成本对象和关键业务追溯。</dd></div></dl></article>
            <article className={styles.packageCard}><span className={styles.cardIcon}>05</span><h3>历史单据与附件</h3><dl><div><dt>对象范围</dt><dd>历史订单、历史凭证、历史报表、审批记录、附件、影像、电子档案。</dd></div><div><dt>常见风险</dt><dd>关联关系断裂、附件路径失效、审批记录缺失、历史查询口径不一致。</dd></div><div><dt>核验口径</dt><dd>单据链路、凭证联查、附件打开、审批轨迹、历史期间和抽样业务场景。</dd></div></dl></article>
            <article className={styles.packageCard}><span className={styles.cardIcon}>06</span><h3>接口与同步数据</h3><dl><div><dt>对象范围</dt><dd>主数据同步、业务单据同步、凭证同步、审批回写、第三方系统回传数据。</dd></div><div><dt>常见风险</dt><dd>数据源头不清、重复推送、状态回写失败、异常补偿缺失、对账口径不一致。</dd></div><div><dt>核验口径</dt><dd>同步成功率、延迟、失败原因、重试结果、差异清单和业务闭环状态。</dd></div></dl></article>
          </div>
        </div>
      </section>

      {/* Tool Matrix */}
      <section className={styles.section} id="tool-matrix">
        <div className={styles.sectionHead}>
          <div><span className={styles.sectionKicker}>Tool Matrix</span><h2>专项工具服务矩阵</h2></div>
          <p>每一项工具服务都要能说明处理对象、执行动作、交付物和验证口径，避免只停留在工具名称。</p>
        </div>
        <div className={styles.toolGrid}>
          <article className={styles.toolCard}><span className={styles.cardIcon}>01</span><h3>数据抽取与系统拆分服务</h3><dl><div><dt>适用场景</dt><dd>公司独立、组织调整、审计数据提供、历史数据隔离和老系统瘦身。</dd></div><div><dt>执行动作</dt><dd>按公司、模块、年度、组织和账套抽取，支持抽取后独立部署或形成审计数据包。</dd></div><div><dt>交付物</dt><dd>抽取范围清单、抽取规则、独立库或数据包、抽取日志、核对报告。</dd></div><div><dt>验证口径</dt><dd>组织数、单据数、凭证数、金额合计、期间范围、附件可访问性。</dd></div></dl></article>
          <article className={styles.toolCard}><span className={styles.cardIcon}>02</span><h3>数据同步与集中管控服务</h3><dl><div><dt>适用场景</dt><dd>总部与子集团、内外账套、多系统部署、财务共享和跨版本数据汇总。</dd></div><div><dt>执行动作</dt><dd>建立基础档案对照、读取外部系统数据、转换字段、配置任务中心和异常补偿。</dd></div><div><dt>交付物</dt><dd>同步方案、字段映射表、任务配置清单、异常处理规则、运行监控报告。</dd></div><div><dt>验证口径</dt><dd>同步成功率、失败率、延迟时间、差异数据、业务单据闭环状态。</dd></div></dl></article>
          <article className={styles.toolCard}><span className={styles.cardIcon}>03</span><h3>BIP 升迁与版本升级服务</h3><dl><div><dt>适用场景</dt><dd>U8 Cloud、NC、NC Cloud、YonBIP 高级版升迁到 YonBIP 旗舰版、超级版或新版本。</dd></div><div><dt>执行动作</dt><dd>加载源系统数据，迁移组织、账簿、会计主体、部门、人员、客户、项目、科目、期初和凭证。</dd></div><div><dt>交付物</dt><dd>升迁评估报告、迁移对象清单、映射规则、试迁移报告、差异台账、切换方案。</dd></div><div><dt>验证口径</dt><dd>档案数量、凭证金额、余额一致性、单据链路、历史查询和抽样核对。</dd></div></dl></article>
          <article className={styles.toolCard}><span className={styles.cardIcon}>04</span><h3>历史数据迁移服务</h3><dl><div><dt>适用场景</dt><dd>NC5、NC6、NC Cloud、YonBIP、金蝶、浪潮、U8、Oracle、SAP 等系统历史数据延续。</dd></div><div><dt>执行动作</dt><dd>迁移历史凭证、期初、余额、业务单据、附件和查询数据，保留必要联查关系。</dd></div><div><dt>交付物</dt><dd>历史迁移清单、数据转换规则、迁移日志、凭证核对表、抽样检查记录。</dd></div><div><dt>验证口径</dt><dd>期间完整性、借贷平衡、金额合计、单据链路、附件打开和历史查询可用性。</dd></div></dl></article>
          <article className={styles.toolCard}><span className={styles.cardIcon}>05</span><h3>业务数据转凭证服务</h3><dl><div><dt>适用场景</dt><dd>外部业务系统、线下台账或历史业务数据需要转成总账凭证进入财务系统。</dd></div><div><dt>执行动作</dt><dd>定义凭证模板、摘要规则、科目取值、辅助核算、借贷方向、金额来源和异常处理。</dd></div><div><dt>交付物</dt><dd>转凭证规则、凭证样例、导入模板、失败清单、总账核对报告。</dd></div><div><dt>验证口径</dt><dd>凭证数量、借贷平衡、科目和辅助核算完整率、金额汇总、凭证状态。</dd></div></dl></article>
          <article className={styles.toolCard}><span className={styles.cardIcon}>06</span><h3>移动审批集成服务</h3><dl><div><dt>适用场景</dt><dd>NC、NC Cloud、YonBIP 审批待办进入钉钉、企业微信、泛微、致远OA等入口。</dd></div><div><dt>执行动作</dt><dd>配置审批对象、消息模板、接口转发、附件预览、审批动作、状态回写和审计记录。</dd></div><div><dt>交付物</dt><dd>审批对象清单、字段映射表、消息推送配置、联调记录、上线确认单。</dd></div><div><dt>验证口径</dt><dd>发起、待办、同意、驳回、撤回、回写、消息提醒和审批轨迹完整性。</dd></div></dl></article>
          <article className={styles.toolCard}><span className={styles.cardIcon}>07</span><h3>数据脱敏与安全共享服务</h3><dl><div><dt>适用场景</dt><dd>开发测试、外包分析、培训演示、跨系统共享需要使用真实结构数据。</dd></div><div><dt>执行动作</dt><dd>识别身份、地址、手机号、银行卡、薪资等敏感字段，配置替换、掩码、扰动和保留格式规则。</dd></div><div><dt>交付物</dt><dd>敏感字段清单、脱敏规则表、脱敏数据集、可用性验证记录、安全说明。</dd></div><div><dt>验证口径</dt><dd>敏感字段不可逆、字段格式可用、业务链路可测、测试数据可复用。</dd></div></dl></article>
          <article className={styles.toolCard}><span className={styles.cardIcon}>08</span><h3>数据卸载与系统瘦身服务</h3><dl><div><dt>适用场景</dt><dd>历史年度数据量过大、数据库性能下降、查询缓慢或主系统需要减负。</dd></div><div><dt>执行动作</dt><dd>确认保留期间、卸载历史年度、生成归档库或查询环境，保留必要审计与联查路径。</dd></div><div><dt>交付物</dt><dd>卸载方案、保留清单、归档数据包、性能对比、历史查询说明。</dd></div><div><dt>验证口径</dt><dd>主库容量、关键查询耗时、历史期间可查、数据条数和金额一致性。</dd></div></dl></article>
          <article className={styles.toolCard}><span className={styles.cardIcon}>09</span><h3>业务数据初始化服务</h3><dl><div><dt>适用场景</dt><dd>系统重建、试点重启、测试环境刷新或正式环境需要保留基础资料后清理业务数据。</dd></div><div><dt>执行动作</dt><dd>确认保留基础资料、流程和权限，清理总账、固定资产、应收应付、供应链等业务数据。</dd></div><div><dt>交付物</dt><dd>初始化范围清单、保留对象说明、清理日志、重启检查表、验证报告。</dd></div><div><dt>验证口径</dt><dd>基础资料可用、业务数据清理完整、流程可启动、权限和参数未丢失。</dd></div></dl></article>
          <article className={styles.toolCard}><span className={styles.cardIcon}>10</span><h3>数据库转换与兼容性服务</h3><dl><div><dt>适用场景</dt><dd>SQL Server 与 Oracle 等数据库切换、数据库版本调整、历史库迁移和性能优化。</dd></div><div><dt>执行动作</dt><dd>评估兼容性、转换表结构、迁移数据、修复异常、检查字符集、索引和关键查询。</dd></div><div><dt>交付物</dt><dd>转换评估、转换脚本、异常清单、性能对比、数据库切换建议。</dd></div><div><dt>验证口径</dt><dd>对象数量、数据条数、查询结果、关键报表、接口任务和性能指标。</dd></div></dl></article>
          <article className={styles.toolCard}><span className={styles.cardIcon}>11</span><h3>数据备份与回滚保障服务</h3><dl><div><dt>适用场景</dt><dd>迁移切换、升级窗口、重大补丁、生产库变更和异地灾备要求。</dd></div><div><dt>执行动作</dt><dd>制定备份策略、确认备份点、执行恢复演练、设计回滚条件、同步附件和脚本。</dd></div><div><dt>交付物</dt><dd>备份确认单、恢复验证记录、回滚预案、切换检查表、问题升级清单。</dd></div><div><dt>验证口径</dt><dd>备份完整性、恢复可用性、恢复时长、回滚触发条件和责任人确认。</dd></div></dl></article>
          <article className={styles.toolCard}><span className={styles.cardIcon}>12</span><h3>云巡检与补丁安全服务</h3><dl><div><dt>适用场景</dt><dd>上线前体检、月结保障、补丁检查、漏洞排查、系统稳定性检查。</dd></div><div><dt>执行动作</dt><dd>覆盖技术环境体检、应用指标体检、安全检测和补丁管理，输出风险等级和整改建议。</dd></div><div><dt>交付物</dt><dd>巡检报告、风险清单、补丁建议、整改跟踪表、复检记录。</dd></div><div><dt>验证口径</dt><dd>CPU、内存、磁盘、数据库表空间、网络响应、补丁状态和业务异常闭环率。</dd></div></dl></article>
        </div>
      </section>

      {/* Migration Deliverables */}
      <section className={styles.sectionFluid}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <div><span className={styles.sectionKicker}>Deliverables</span><h2>迁移交付物与核对清单</h2></div>
            <p>真正能降低迁移风险的，是这些可检查、可签收、可复用的材料，而不只是一次工具执行。</p>
          </div>
          <div className={styles.packageGrid}>
            <article className={styles.packageCard}><h3>范围确认清单</h3><p>明确源系统、目标系统、组织、账套、模块、期间、数据对象、附件、接口和冻结窗口。</p></article>
            <article className={styles.packageCard}><h3>字段映射与转换规则</h3><p>记录字段来源、目标字段、转换规则、默认值、异常值、枚举值、主外键关系和负责人。</p></article>
            <article className={styles.packageCard}><h3>试迁移报告</h3><p>记录样本批次、迁移耗时、成功数量、失败数量、失败原因、修复建议和下一轮动作。</p></article>
            <article className={styles.packageCard}><h3>数据对账报告</h3><p>核对数量、金额、余额、状态、期间、凭证、单据链路、附件和抽样业务场景。</p></article>
            <article className={styles.packageCard}><h3>切换与回滚方案</h3><p>明确正式迁移窗口、停机影响、备份点、回滚条件、联系人、验收动作和问题升级路径。</p></article>
            <article className={styles.packageCard}><h3>运维交接材料</h3><p>交接工具脚本、运行参数、异常处理方法、补偿机制、巡检项、权限说明和后续优化建议。</p></article>
          </div>
        </div>
      </section>

      {/* Migration Method */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div><span className={styles.sectionKicker}>Migration Method</span><h2>升迁与迁移执行路径</h2></div>
          <p>把源系统、对象范围、转换规则、验证口径和切换窗口拆成可验收节点，迁移风险才可控。</p>
        </div>
        <div className={styles.processStrip}>
          <article className={styles.processNode}><span>01</span><strong>场景与源系统确认</strong><p>明确升迁、抽取、同步、脱敏、初始化或巡检场景。</p></article>
          <article className={styles.processNode}><span>02</span><strong>外部系统定义</strong><p>登记源系统版本、数据库、组织账套、模块和连接方式。</p></article>
          <article className={styles.processNode}><span>03</span><strong>迁移对象盘点</strong><p>确认档案、期初、凭证、单据、附件、接口和历史期间。</p></article>
          <article className={styles.processNode}><span>04</span><strong>映射转换对照</strong><p>建立字段映射、科目对照、档案对照和转换规则。</p></article>
          <article className={styles.processNode}><span>05</span><strong>试迁移与异常修复</strong><p>用样本和试迁移发现规则缺口、脏数据和性能风险。</p></article>
          <article className={styles.processNode}><span>06</span><strong>数据验证与对账</strong><p>核对数量、金额、状态、凭证、余额和业务链路。</p></article>
          <article className={styles.processNode}><span>07</span><strong>正式迁移与切换</strong><p>按上线窗口执行，监控批次、异常和业务确认结果。</p></article>
          <article className={styles.processNode}><span>08</span><strong>巡检交接与回滚</strong><p>交接脚本、报告、巡检项、备份点和回滚触发条件。</p></article>
        </div>
      </section>

      {/* Tool Capability Map */}
      <section className={styles.sectionFluid}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <div><span className={styles.sectionKicker}>More Tools</span><h2>工具能力地图</h2></div>
            <p>把用友服务工具拆成可购买、可实施、可验收的能力组，便于企业按问题选择专项服务或组合交付。</p>
          </div>
          <div className={styles.packageGrid}>
            <article className={styles.packageCard}><h3>升迁升级类</h3><p>适合系统平台升级、版本换代和数据资产延续。</p><ul className={styles.miniList}><li>YonBIP 旗舰版升迁</li><li>YonBIP 旗舰版升级</li><li>YonBIP 高级版升迁</li><li>组织、档案、财务和期初迁移</li></ul></article>
            <article className={styles.packageCard}><h3>抽取归档类</h3><p>适合集团拆分、公司独立、审计提供和历史数据瘦身。</p><ul className={styles.miniList}><li>数据抽取工具</li><li>数据卸载工具</li><li>历史年度归档</li><li>独立库与审计数据包</li></ul></article>
            <article className={styles.packageCard}><h3>同步集成类</h3><p>适合多系统并行、总部汇总、审批移动化和业务数据入账。</p><ul className={styles.miniList}><li>数据同步工具</li><li>移动审批工具</li><li>业务数据转凭证工具</li><li>基础档案对照与任务中心</li></ul></article>
            <article className={styles.packageCard}><h3>迁移转换类</h3><p>适合历史凭证延续、第三方系统迁入和数据库切换。</p><ul className={styles.miniList}><li>数据迁移工具</li><li>数据库转换工具</li><li>SQL Server / Oracle 转换</li><li>金蝶、浪潮、SAP、Oracle 数据接入</li></ul></article>
            <article className={styles.packageCard}><h3>安全合规类</h3><p>适合开发测试、外包分析、培训演示和跨系统共享。</p><ul className={styles.miniList}><li>数据脱敏工具</li><li>敏感字段识别</li><li>脱敏规则配置</li><li>可用性与安全验证</li></ul></article>
            <article className={styles.packageCard}><h3>保障运行类</h3><p>适合上线切换、月结窗口、补丁升级和运维风险排查。</p><ul className={styles.miniList}><li>数据备份工具</li><li>云巡检工具</li><li>IPv6 升级评估</li><li>技术环境、应用指标、安全与补丁检查</li></ul></article>
          </div>
        </div>
      </section>

      {/* Regional Assurance */}
      <section className={styles.sectionFluid} id="regional-assurance">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <div><span className={styles.sectionKicker}>Regional Service Assurance</span><h2>上海及长三角本地化服务保障</h2></div>
            <p>立足上海，服务长三角，结合智能协同、本地顾问和现场支持能力，为企业提供更及时、更稳定、更可控的服务保障。</p>
          </div>
          <p className={styles.localNote}>面向上海及长三角区域企业客户，提供项目启动、业务调研、方案评审、系统联调、上线切换、运维巡检、数据迁移和重大问题处理等本地化服务支持。</p>
          <div className={styles.localGrid}>
            <article className={styles.infoCard}><span className={styles.cardIcon}>01</span><h3>智能协同</h3><p>通过在线会议、工单、知识库和智能服务工具提升日常问题响应效率。</p></article>
            <article className={styles.infoCard}><span className={styles.cardIcon}>02</span><h3>本地响应</h3><p>关键项目节点和重要问题可安排本地顾问协同支持。</p></article>
            <article className={styles.infoCard}><span className={styles.cardIcon}>03</span><h3>现场保障</h3><p>上线切换、迁移割接、接口联调、月结保障等场景提供现场服务。</p></article>
            <article className={styles.infoCard}><span className={styles.cardIcon}>04</span><h3>专项服务</h3><p>面向中大型客户提供驻场、巡检、升级护航和专项保障。</p></article>
          </div>
          <div className={styles.localSegments}>
            <article className={styles.infoCard}><h3>成长型客户</h3><p>以智能交付工具和标准化服务包为支撑，帮助快速上线、及时响应、持续运营；关键节点可按需本地支持。</p><ul className={styles.chipList}><li>智能交付</li><li>在线支持</li><li>标准服务包</li><li>按需现场</li></ul></article>
            <article className={styles.infoCard}><h3>中大型客户</h3><p>在蓝图设计、集成联调、迁移切换、月结保障和重大问题处理等关键阶段提供本地化项目保障。</p><ul className={styles.chipList}><li>项目制保障</li><li>现场支持</li><li>专项响应</li><li>驻场服务</li></ul></article>
          </div>
          <div className={styles.localScenarios}>
            <article className={styles.infoCard}><span className={styles.cardIcon}>01</span><h3>系统实施</h3><p>项目启动、关键用户培训、上线切换现场保障。</p></article>
            <article className={styles.infoCard}><span className={styles.cardIcon}>02</span><h3>集成与开发</h3><p>接口联调、第三方系统协调、上线窗口支持。</p></article>
            <article className={styles.infoCard}><span className={styles.cardIcon}>03</span><h3>系统运维</h3><p>重大问题响应、月结保障、巡检、升级护航。</p></article>
            <article className={styles.infoCard}><span className={styles.cardIcon}>04</span><h3>迁移与工具</h3><p>试迁移、正式迁移、数据核对、切换保障。</p></article>
          </div>
        </div>
      </section>

      {/* AI Enablement */}
      <section className={styles.section} id="ai-enablement">
        <div className={styles.aiBand}>
          <div><span className={styles.sectionKicker}>AI Enablement</span><h2>AI 赋能服务全过程</h2><p>AI 是资料助理、初稿顾问和风险检查员，负责初加工；人负责判断、确认、承诺和最终交付。</p></div>
          <ul className={styles.aiList}>
            <li>生成数据清洗规则、字段映射表和异常数据清单</li>
            <li>辅助设计试迁移计划、校验清单和回滚预案</li>
            <li>分析迁移失败记录，归类错误原因并生成修复建议</li>
            <li>自动整理迁移报告、对账报告、客户确认清单</li>
            <li>将迁移规则、问题处理过程沉淀为工具服务资产</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.section} id="faq">
        <div className={styles.sectionHead}><div><span className={styles.sectionKicker}>FAQ</span><h2>迁移与工具服务常见问题</h2></div></div>
        <div className={styles.faqList}>
          {[
            { q: '迁移评估先看哪些信息？', a: '先看源系统与目标系统版本、组织账套、模块范围、历史期间、数据量、附件、接口、审批流、停机窗口和必须保留的查询口径，再判断适合升迁、抽取、同步、脱敏、卸载还是组合交付。' },
            { q: '如何证明数据真的迁准了？', a: '不能只看工具执行成功。需要按对象数量、金额合计、科目余额、辅助余额、凭证状态、单据链路、附件可访问性和抽样业务场景做核对，并形成对账报告和确认清单。' },
            { q: '集团拆分或子公司独立能处理吗？', a: '可以按公司、组织、账套、模块和年度设计抽取范围，形成独立数据环境或审计数据包，同时处理敏感数据隔离、历史查询、权限控制和核对报告。' },
            { q: '正式迁移一定要长时间停机吗？', a: '不一定。通常先做试迁移和差异修复，再根据数据量、业务冻结要求和接口切换窗口安排正式迁移；关键场景会提前设计备份点、回滚条件和现场保障机制。' },
            { q: '数据抽取、数据同步和正式迁移有什么区别？', a: '数据抽取更偏历史保留、审计查询和离线分析；数据同步更偏新旧系统并行、跨系统数据流转和阶段性过渡；正式迁移则要进入目标系统生产使用，必须处理清洗、转换、校验、切换、回滚和客户确认。' },
            { q: '数据脱敏适合哪些场景，脱敏后还能核对吗？', a: '适合测试环境、开发联调、外部协作、审计包和历史查询场景。脱敏规则会保留必要的数据结构、关联关系和统计口径，例如编码映射、金额区间、日期偏移和字段遮蔽，既降低敏感信息暴露风险，又保留校验和测试价值。' }
          ].map((faq, idx) => (
            <article key={idx} className={styles.faqItem}>
              <button type="button" onClick={() => setOpenFaq(openFaq === idx ? null : idx)} aria-expanded={openFaq === idx}><span>{faq.q}</span><b /></button>
              <p>{faq.a}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA Panel */}
      <section className={styles.section}>
        <div className={styles.ctaPanel}>
          <div><h2>数据迁移越复杂，越需要提前评估。</h2><p>我们可以帮助您梳理源系统、目标系统、迁移范围、数据质量、接口风险和上线窗口，形成可执行的迁移与工具服务方案。</p></div>
          <Link href="#diagnosis" className={`${styles.btn} ${styles.btnPrimary}`} data-track="bottom_cta_click">预约迁移评估</Link>
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
            <input type="hidden" name="source_page" value="migration-tools" />
            <input type="hidden" name="source_path" value="/services/migration-tools" />
            <div className={styles.fieldGrid}>
              <label><span>姓名 <b>*</b></span><input name="name" type="text" autoComplete="name" required /></label>
              <label><span>手机 <b>*</b></span><input name="phone" type="tel" autoComplete="tel" inputMode="tel" required /></label>
            </div>
            <div className={styles.fieldGrid}>
              <label><span>公司名称 <b>*</b></span><input name="company" type="text" autoComplete="organization" required /></label>
              <label><span>客户类型</span><select name="customer_type"><option value="">请选择</option><option>中小型 / 成长型客户</option><option>大中型 / 集团型客户</option><option>不确定，需要评估</option></select></label>
            </div>
            <label><span>当前系统或计划系统</span><select name="current_system"><option value="">请选择</option><option>YonSuite</option><option>YonBIP</option><option>NC / NCC</option><option>其他 ERP / 业务系统</option><option>暂未确定</option></select></label>
            <fieldset className={styles.issueField}>
              <legend>关注服务</legend>
              <label><input type="checkbox" name="interest" value="系统实施服务" /><span>系统实施服务</span></label>
              <label><input type="checkbox" name="interest" value="集成与开发服务" /><span>集成与开发服务</span></label>
              <label><input type="checkbox" name="interest" value="系统运维服务" /><span>系统运维服务</span></label>
              <label><input type="checkbox" name="interest" value="迁移与工具服务" defaultChecked /><span>迁移与工具服务</span></label>
              <label><input type="checkbox" name="interest" value="上海及长三角本地化保障" /><span>上海及长三角本地化保障</span></label>
              <label><input type="checkbox" name="interest" value="AI 赋能服务" /><span>AI 赋能服务</span></label>
            </fieldset>
            <label><span>补充说明</span><textarea name="remark" rows={4} placeholder="例如：计划 8 月上线 YonSuite，需要评估实施周期、接口范围和上海现场支持" /></label>
            <p className={styles.formHint}>提交后由泊冉顾问联系，不做无效打扰。</p>
            <button type="submit" className={styles.modalSubmit} data-track="form_submit">提交服务评估需求<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h12.2l-5.1-5.1L14 5l8 8-8 8-1.9-1.9 5.1-5.1H5v-2Z" /></svg></button>
          </form>
      </section>
    </main>
  )
}
