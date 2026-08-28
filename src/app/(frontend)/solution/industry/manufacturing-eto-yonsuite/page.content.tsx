'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import styles from './manufacturing-eto-yonsuite.module.css'
import { useAttribution } from '@/providers/Attribution'

export const ETOManufacturingYonSuiteContent: React.FC = () => {
  const attribution = useAttribution()
  const [activeRole, setActiveRole] = useState<string>('sales')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const phone = String(formData.get('phone') || '').replace(/[\s-]/g, '').replace(/^\+?86/, '')
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      alert('请输入有效的手机号码')
      return
    }

    const painPoints = Array.from(formData.getAll('pain_point'))
    const industry = String(formData.get('industry') || '')
    const companySize = String(formData.get('company_size') || '')
    const role = String(formData.get('role') || '')
    const erpStatus = String(formData.get('erp_status') || '')
    const systemStatus = String(formData.get('system_status') || '')
    const launchTime = String(formData.get('launch_time') || '')
    const remarkText = String(formData.get('remark') || '')

    const structured = [
      industry && `所在行业: ${industry}`,
      companySize && `企业规模: ${companySize}`,
      role && `角色: ${role}`,
      erpStatus && `当前ERP: ${erpStatus}`,
      systemStatus && `现有系统: ${systemStatus}`,
      launchTime && `启动时间: ${launchTime}`,
    ].filter(Boolean).join('\n')
    const remark = [structured, remarkText].filter(Boolean).join('\n')

    const data = {
      name: formData.get('name'),
      phone,
      company: formData.get('company'),
      customer_type: role,
      current_system: erpStatus,
      interest: painPoints,
      remark,
      source: '研发型定制制造解决方案',
      sourcePath: '/solution/industry/manufacturing-eto-yonsuite',
      sourcePageUrl: typeof window !== 'undefined' ? window.location.href : '',
      utmData: attribution ? {
        utm_source: attribution.utm_source || '',
        utm_medium: attribution.utm_medium || '',
        utm_campaign: attribution.utm_campaign || '',
        utm_content: attribution.utm_content || '',
        utm_term: attribution.utm_term || '',
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
        alert('提交成功！泊冉顾问将根据您的行业和痛点提供初步诊断建议。')
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
      alert('网络错误，请稍后重试')
    }
  }

  const roles = [
    { key: 'sales', label: '销售 / 方案负责人' },
    { key: 'rd', label: '研发负责人' },
    { key: 'supply', label: '采购 / 供应链负责人' },
    { key: 'pm', label: '项目负责人' },
    { key: 'service', label: '售后服务负责人' },
    { key: 'finance', label: '老板 / CFO / CIO' },
  ]

  const scenarios = [
    { n: '01', title: '客户线索与商机识别', pain: '线索分散在销售、展会、客户群和老板口头沟通里。', action: '沉淀客户需求、预算区间、交付时间、关键人和风险点。', value: '从线索阶段就为方案、报价和项目立项准备数据。', tag: 'LTC线索到回款 / 非标设备项目管理 / 装备制造ERP' },
    { n: '02', title: '需求文档与投标资料读取', pain: '技术要求、验收条款和风险条件藏在大量文档里。', action: 'AI辅助生成需求摘要、参数清单和待澄清问题。', value: '售前、研发和项目团队更快形成同一理解。', tag: 'AI项目协同 / 科研仪器ERP / 检测设备ERP' },
    { n: '03', title: '售前技术方案协同', pain: '销售承诺、研发方案和采购可行性口径不一致。', action: '围绕项目机会管理方案版本、评审意见和责任人。', value: '方案不是个人经验，而是跨团队可追溯的交付依据。', tag: '专用设备ERP / 研发型制造企业ERP / 项目交付管理系统' },
    { n: '04', title: '销售报价与毛利测算', pain: '物料、外协、服务、安装和售后成本估不准。', action: 'AI辅助报价草稿与成本建议，授权人员确认正式报价。', value: '报价时同步看预算毛利和风险假设。', tag: '订单成本核算 / 项目毛利分析 / AI项目管理系统' },
    { n: '05', title: '合同与收款协议管理', pain: '付款条件、验收节点和交付范围未进入项目执行。', action: '把合同条款、收款协议、验收条件和责任人关联到项目。', value: '销售承诺、交付节点和财务回款同步推进。', tag: 'LTC线索到回款 / 开票回款 / 项目回款管理' },
    { n: '06', title: '项目立项与WBS计划', pain: '项目启动靠会议纪要，任务拆解和责任边界不清。', action: 'AI辅助生成WBS建议、里程碑和周报草稿，项目经理确认。', value: '让项目从立项开始有计划、有责任、有节点。', tag: '项目制造ERP / AI项目协同 / 项目交付管理系统' },
    { n: '07', title: '研发任务与图纸文档管理', pain: '图纸、文档、评审意见和任务状态散落在不同工具。', action: '将研发任务、图纸文档、评审意见和项目节点关联。', value: '研发交付物成为项目进度和成本控制的依据。', tag: '研发型制造企业ERP / 研发任务管理 / 项目BOM管理' },
    { n: '08', title: '研发BOM / 项目BOM / 订单BOM', pain: '研发、采购、项目和成本口径里的BOM版本不一致。', action: '管理BOM版本、项目物资清单、订单差异和生效规则。', value: '每个项目都有清楚的物资、采购和成本依据。', tag: '研发BOM管理 / 项目BOM管理 / 个性化定制制造ERP' },
    { n: '09', title: '设计变更影响分析', pain: '变更影响哪些采购、外协、现场和成本，事后才发现。', action: 'AI辅助生成变更影响分析，BOM生效由授权人员确认。', value: '变更先看影响，再进入采购、项目和成本流程。', tag: '设计变更 / 项目BOM管理 / AI项目协同' },
    { n: '10', title: '外协加工与服务采购协同', pain: '外协加工、外采服务和外包安装进度不透明。', action: '把请购、询价、订单、交付、验收和费用归集到项目。', value: '外部资源成为项目计划和项目成本的可控变量。', tag: '外协采购协同 / 供应商协同管理 / 项目成本管理' },
    { n: '11', title: '供应商交期与到货跟踪', pain: '关键件延迟后，项目经理才知道交付风险。', action: '跟踪供应商承诺、到货、质检和异常，AI辅助风险预警。', value: '供应商交期直接映射到项目里程碑。', tag: '供应商协同管理 / 订单交期管理 / 外协采购协同' },
    { n: '12', title: '项目物资清单与现场仓管理', pain: '项目物资、现场领用、退料和缺件状态不清。', action: '以项目物资清单管理到货、领用、退回、补采和现场库存。', value: '让物资齐套和现场成本可追踪。', tag: '项目物资清单 / 现场仓管理 / 订单成本核算' },
    { n: '13', title: '装配、联调与测试验证', pain: '装配问题、联调记录和测试结果未沉淀到项目。', action: '记录装配任务、测试验证、问题闭环和返工费用。', value: '交付质量、项目进度和成本偏差可以一起看。', tag: '项目交付管理系统 / 质量追溯 / 项目成本管理' },
    { n: '14', title: '发运、现场安装与客户验收', pain: '设备发出后，现场安装、资料确认和验收节点失控。', action: '把发运、安装、调试、问题清单和验收资料关联到项目。', value: '交付结果能支撑开票、回款和售后接续。', tag: '安装验收 / 设备售后服务管理 / 项目交付管理系统' },
    { n: '15', title: '开票回款协同', pain: '验收节点、开票条件、应收状态和项目进度割裂。', action: '关联付款条款、验收资料、开票计划和回款跟进。', value: 'LTC终点落到现金回收和经营结果确认。', tag: 'LTC线索到回款 / 开票回款 / 项目毛利分析' },
    { n: '16', title: '售后工单与维保服务', pain: '售后靠电话和群聊流转，服务质量与成本难统计。', action: 'AI辅助工单摘要和派工建议，派工由授权人员确认。', value: '售后响应、维保记录和服务成本形成闭环。', tag: '设备售后服务管理 / 售后工单 / 设备维保管理' },
    { n: '17', title: '备件管理与设备履历', pain: '设备配置、维修记录、备件消耗和客户现场信息难追溯。', action: '关联设备履历、序列号、工单、备件出入库和服务费用。', value: '每台设备都有可追溯的服务和成本档案。', tag: '备件管理系统 / 设备履历 / 设备售后服务管理' },
    { n: '18', title: '项目成本归集与项目毛利分析', pain: '材料、外协、服务、现场、售后和费用不在同一口径。', action: '统一项目成本对象，关联预算、收入、实际成本和费用分摊。', value: '从报价毛利、执行毛利到最终毛利持续追踪。', tag: '项目成本管理 / 订单成本核算 / 项目毛利分析' },
    { n: '19', title: 'AI经营问数与项目复盘', pain: '管理层想知道哪些项目拖期、超支或低毛利，要靠人工拼报表。', action: 'AI辅助经营问数、项目复盘摘要和异常原因分析。', value: '用经营分析沉淀下一次报价、交付和供应商选择经验。', tag: 'AI经营问数 / 智能经营分析 / 项目复盘' },
  ]

  const industries = [
    { small: '科研仪器 / 实验室设备', title: '从需求参数到验收资料先打通', plan: '需求资料读取、方案报价、研发BOM、项目计划、验收资料。', pain: '参数多、交付要求细、客户验收严格，项目资料和成本口径容易分散。', metrics: '指标：方案周期、需求澄清次数、验收资料完整率、项目毛利偏差。' },
    { small: '检测设备企业', title: '把方案、外协和测试验证串起来', plan: '售前方案、外协采购、装配联调、测试验证、售后工单。', pain: '客户指标变化快，关键部件和测试资源影响交付周期。', metrics: '指标：外协准交率、测试问题闭环率、延期次数、售后响应时长。' },
    { small: '专用设备企业', title: '以项目计划牵引研发与供应商', plan: 'WBS计划、研发任务、项目BOM、供应商交期、项目成本。', pain: '项目周期长、定制比例高、采购外协多，交付延期直接影响回款。', metrics: '指标：项目计划达成率、供应商延期次数、成本归集及时率、回款节点达成率。' },
    { small: '机器人与自动化', title: '管好外协件、现场调试和维保', plan: '方案报价、外协加工、现场安装、联调问题、设备履历。', pain: '系统集成度高，现场问题多，售后和备件影响客户满意度。', metrics: '指标：现场问题闭环时长、一次验收率、备件缺货率、服务成本。' },
    { small: '医疗设备企业', title: '把项目履历和服务合规沉淀下来', plan: '项目文档、设备履历、安装验收、维保工单、备件管理。', pain: '客户现场分散，服务记录、备件消耗和设备履历需要更清楚。', metrics: '指标：设备履历完整率、工单响应时长、备件周转率、单台设备服务成本。' },
    { small: '非标 / 系统集成设备', title: '先让外协采购和毛利透明', plan: '需求澄清、报价毛利、外协采购、安装验收、项目复盘。', pain: '每单都不同，外部资源多，项目结束后才知道到底赚没赚钱。', metrics: '指标：报价毛利偏差、外协费用偏差、验收延期次数、项目复盘完成率。' },
  ]

  const faqs = [
    { q: '什么是研发型定制制造与专用设备数智化解决方案？', a: '这是面向科研仪器、检测设备、专用设备、机器人与自动化、医疗设备、实验室设备、非标设备和系统集成类企业的行业解决方案。它围绕 LTC（Lead to Cash，线索到回款），打通客户线索、商机、技术方案、报价、合同、项目计划、研发BOM、外协采购、供应商协同、装配调试、安装验收、售后服务、开票回款和项目毛利分析。' },
    { q: 'LTC（Lead to Cash，线索到回款）在研发型定制制造企业中是什么意思？', a: 'LTC（Lead to Cash，线索到回款）不是单纯销售流程，而是从客户线索、商机识别、方案沟通、销售报价、合同签订，到项目立项、研发BOM、外协采购、供应商交付、装配调试、现场安装、客户验收、开票、回款、售后和项目毛利分析的完整经营链路。' },
    { q: '这类企业算不算装备制造企业？', a: '广义上，科研仪器、检测设备、专用设备、机器人与自动化、医疗设备、非标设备和系统集成类企业可以归入装备或专用设备制造范畴。但推广表达应聚焦研发型定制制造、项目交付、外协采购、售后服务和项目毛利，而不是传统装备制造。' },
    { q: '为什么研发型定制制造企业更需要AI增强协同？', a: '这类企业往往重研发、重销售、重项目交付和重售后，制造端还会涉及大量零部件采购、外协加工、外采服务和外包安装。AI可以辅助读取需求、生成方案和报价草稿、拆解项目计划、识别变更影响、提示供应商风险和进行经营问数，但关键业务动作必须由授权人员确认后进入流程。' },
    { q: 'AI可以如何辅助需求文档和投标资料读取？', a: 'AI可以辅助提取客户需求、技术参数、交付范围、验收条件、风险条款和待澄清问题，生成摘要、清单或方案输入建议。它不替代销售、研发和法务判断，报价、合同和承诺内容仍需授权人员确认后进入流程。' },
    { q: 'AI辅助报价会不会直接形成正式报价？', a: '不会。AI只能辅助生成报价草稿、成本测算建议、历史项目参考和毛利预警。最终报价、折扣、合同条款和对客户的正式承诺，必须由授权人员审核确认后进入流程。' },
    { q: '研发BOM、项目BOM和订单BOM如何协同？', a: '建议以项目或订单为核心对象，把研发任务、图纸文档、BOM版本、采购需求、外协加工、装配调试和成本对象关联起来。BOM生效、设计变更和替代料使用必须保留审批与授权确认边界。' },
    { q: '外协加工和服务采购如何纳入项目管理？', a: '可以把外协加工、外采服务、外包安装和供应商交付纳入同一项目计划，关联请购、询价、采购订单、交付节点、到货验收、费用归集和付款状态，让项目经理能看到外部协同对交期、成本和毛利的影响。' },
    { q: '如何跟踪供应商交期和到货风险？', a: '可以把关键物料、外协件、服务采购和现场安装资源绑定到项目里程碑，形成到货计划、逾期预警、替代方案建议和责任跟进。AI可以辅助生成风险预警和跟进摘要，但采购审批、供应商变更和费用确认仍需授权人员确认。' },
    { q: '项目成本和项目毛利如何看清？', a: '建议以项目或订单为成本对象，将材料、外协加工、外采服务、研发投入、装配调试、现场安装、售后服务和费用分摊尽量归集到同一项目维度，再结合合同收入、开票回款、预算和实际成本形成项目毛利分析。' },
    { q: '售后工单、维保服务和备件如何闭环？', a: '建议以客户、设备履历、序列号、工单、维保计划、服务工程师、备件出入库和服务费用为核心对象，形成售后响应、处理记录、备件消耗和服务成本闭环。AI可以辅助工单摘要、知识推荐和派工建议，派工和费用处理需授权确认。' },
    { q: '适合哪些企业先做试点？', a: '适合上海及长三角地区的科研仪器、检测设备、专用设备、机器人与自动化、医疗设备、实验室设备、非标设备和系统集成类设备企业。建议先选择一类典型项目，从线索、方案报价、项目计划、研发BOM、外协采购、交付验收、售后和项目毛利跑通闭环。' },
    { q: '如何与现有ERP、PLM、OA、CRM和售后系统集成？', a: '不建议一开始推倒重来。应先梳理LTC主链路和关键数据对象，再判断现有ERP、PLM、OA、CRM、供应商协同、售后服务和财务系统哪些保留、集成、替换或升级，并通过试点验证数据口径和流程边界。' },
  ]

  return (
    <main className={styles.meyPage}>
      {/* Hero */}
      <section className={styles.hero} id="top">
        <div className={styles.gridBg} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}><span />AI-DRIVEN CUSTOM EQUIPMENT COLLABORATION</div>
            <h1>研发型定制制造与专用设备<br />数智化解决方案</h1>
            <p className={styles.heroTitle}>用AI增强项目协同，把定制订单从线索、方案、外协采购管到交付、售后和毛利</p>
            <p>
              面向科研仪器、检测设备、专用设备、机器人与自动化、医疗设备、非标设备和系统集成类企业，围绕 LTC 线索到回款，打通商机、技术方案、销售报价、合同、项目计划、研发BOM、外协采购、供应商协同、装配调试、现场安装、客户验收、售后服务、开票回款和项目毛利分析。
            </p>
            <div className={styles.heroPoints} aria-label="首屏核心判断">
              <div><strong>客户类型</strong><span>上海及长三角研发型、项目型、定制设备企业。</span></div>
              <div><strong>协同重点</strong><span>销售、研发、采购、项目、外协、现场、售后同一项目口径。</span></div>
              <div><strong>经营结果</strong><span>看清交期风险、成本偏差、回款节点和项目毛利。</span></div>
            </div>
            <div className={styles.valueTags} aria-label="核心价值标签">
              <span>AI增强项目协同</span>
              <span>LTC线索到回款闭环</span>
              <span>销售、研发、采购、项目、售后一体化</span>
              <span>研发BOM、项目BOM、外协采购协同</span>
              <span>供应商交期、外协进度、项目风险预警</span>
              <span>售后服务、备件、设备履历闭环</span>
              <span>项目成本、回款节点、项目毛利可追踪</span>
            </div>
            <div className={styles.heroActions}>
              <a className={`${styles.btn} ${styles.primary}`} href="#diagnosis" data-scroll-target data-track="hero_primary_cta_click" data-button-source="hero_primary">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4V5Zm3 3v2h10V8H7Zm0 4v2h7v-2H7Zm0 4v1h4v-1H7Z" /></svg>
                预约定制制造顾问评估
              </a>
              <a
                className={`${styles.btn} ${styles.secondary}`}
                href="#diagnosis"
                data-scroll-target
                data-track="hero_secondary_cta_click"
                data-extra-track="solution_download_click"
                data-button-source="hero_secondary"
                data-prefill-issue="获取AI项目协同方案"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v10.2l3.4-3.4 1.8 1.8L12 16.8l-5.2-5.2 1.8-1.8 3.4 3.4V3h2Zm-7 14h14v4H5v-4Z" /></svg>
                获取AI项目协同方案
              </a>
            </div>
            <div className={styles.heroQuote}>研发型定制制造的难点，不是单点生产，而是把客户需求、研发变更、外协采购、现场交付和经营结果放到同一张项目地图上。</div>
          </div>

          <aside className={styles.heroConsole} aria-label="AI增强定制制造项目协同驾驶舱示意">
            <Image
              className={styles.heroBanner}
              src="/images/solutions/eto-mto-manufacturing-og.jpg"
              alt="研发型定制制造与专用设备AI项目协同解决方案示意图"
              width={1200}
              height={630}
              priority
            />
            <div className={styles.consolePanel}>
              <div className={styles.panelTitle}>
                <span>AI Collaboration Command Center</span>
                <strong>项目风险预警</strong>
              </div>
              <div className={`${styles.projectFlow} ${styles.isLtc}`} aria-label="LTC 线索到回款闭环">
                <span>线索</span><i /><span>方案</span><i /><span>报价</span><i /><span>项目</span><i /><span>外协</span><i /><span>售后</span><i /><span>毛利</span>
              </div>
              <div className={styles.metricGrid}>
                <div><small>外协交期风险</small><b>5天</b><em>关键件到货需跟进</em></div>
                <div><small>项目预算消耗</small><b>72%</b><em>安装费用需复核</em></div>
                <div><small>变更影响项</small><b>4项</b><em>BOM与采购同步确认</em></div>
                <div><small>回款节点</small><b>2个</b><em>验收后触发跟进</em></div>
              </div>
              <div className={`${styles.alertRow} ${styles.warn}`}><span>需求</span><b>AI提取待澄清条款，建议销售与研发复核</b><em>建议</em></div>
              <div className={`${styles.alertRow} ${styles.ok}`}><span>外协</span><b>供应商到货摘要已生成，项目经理确认后跟进</b><em>摘要</em></div>
              <div className={`${styles.alertRow} ${styles.danger}`}><span>毛利</span><b>预算消耗高于项目进度，建议授权人员确认</b><em>预警</em></div>
              <div className={styles.consoleNote}>AI只生成草稿、建议、摘要、预警和问数结果；报价、合同、预算、BOM生效、采购审批、派工、开票、回款和财务处理均由授权人员确认后进入流程。</div>
            </div>
          </aside>
        </div>
      </section>

      {/* 客户问题 */}
      <section className={`${styles.section} ${styles.answer}`} id="answer">
        <div className={`${styles.sectionHead} ${styles.compact}`}>
          <span>客户正在遇到的问题</span>
          <h2>客户催方案、外协卡交期、项目忙交付，最后却看不清毛利？</h2>
          <p>如果报价、研发BOM、外协采购、现场验收、售后和回款还靠人追表对口径，项目越多，交付压力和利润风险就越难控。</p>
        </div>
        <div className={styles.answerSummary} aria-label="方案判断维度">
          <article><strong>报价别再靠猜</strong><span>客户要快，内部要准。把需求、历史项目、研发BOM、外协采购和费用项放到同一报价口径。</span></article>
          <article><strong>交付别再靠催</strong><span>项目经理不用天天追人问进度，外协到货、研发变更、现场安装和验收资料都能围绕项目推进。</span></article>
          <article><strong>毛利别等事后算</strong><span>从报价、预算、外协、安装到售后，把成本变化提前暴露出来，授权人员及时确认处理。</span></article>
        </div>
        <div className={styles.answerGrid}>
          <article><h3>客户发来需求书，谁能快速拆出报价重点？</h3><p>AI辅助提取技术参数、验收条件、风险条款和待澄清问题，销售与研发先拿到一份可评审的需求摘要。</p><span>少翻文档，快一步进入方案评审。</span></article>
          <article><h3>方案报价一拖再拖，客户还在等回复？</h3><p>把历史项目、材料、外协、安装、售后和费用项拉到同一口径，生成报价草稿和毛利测算建议。</p><span>报价更快，毛利风险更早暴露。</span></article>
          <article><h3>研发改了图纸，采购和外协有没有同步？</h3><p>设计变更影响研发BOM、项目物资、外协订单、交期和预算，系统形成影响提示，授权人员确认后进入流程。</p><span>减少漏采、错采和返工。</span></article>
          <article><h3>供应商晚到几天，会不会拖住客户验收？</h3><p>关键件、外协件、外采服务和现场安装资源都关联项目节点，延期风险能更早被项目经理看到。</p><span>交期风险不再等客户催才发现。</span></article>
          <article><h3>设备交付后，售后和备件成本还算得清吗？</h3><p>把设备履历、维保工单、备件消耗和服务费用沉淀到客户与项目维度，方便复盘和后续服务。</p><span>售后不只是救火，也是利润和复购管理。</span></article>
          <article><h3>老板最关心：这个项目到底赚不赚钱？</h3><p>从报价毛利、预算消耗、外协费用、安装成本、售后成本到回款节点，持续跟踪项目经营结果。</p><span>用经营指标判断哪些项目值得复制。</span></article>
        </div>
      </section>

      {/* AI协同 */}
      <section className={`${styles.section} ${styles.ai}`} id="ai-collaboration">
        <div className={`${styles.sectionHead} ${styles.compact}`}>
          <span>AI增强协同</span>
          <h2>为什么研发型定制制造企业，更需要AI增强协同？</h2>
          <p>这类企业的核心压力不只在装配环节，而在需求变化、研发响应、外协交期、现场验收、售后服务和项目毛利之间的连续协同。</p>
        </div>
        <div className={styles.aiLayout}>
          <div className={styles.aiGrid}>
            <article><strong>AI辅助读需求和投标资料</strong><span>提取技术参数、交付范围、验收条件、风险条款和待澄清问题，生成摘要供销售与研发复核。</span></article>
            <article><strong>AI辅助生成方案和报价草稿</strong><span>结合历史项目、物料清单、外协经验和费用项生成报价草稿与毛利测算建议。</span></article>
            <article><strong>AI辅助项目计划和任务拆解</strong><span>根据合同范围和交付节点生成WBS建议、责任分工和项目周报草稿。</span></article>
            <article><strong>AI辅助识别设计变更影响</strong><span>提示变更可能影响的图纸、研发BOM、采购订单、外协件、交期和预算项。</span></article>
            <article><strong>AI辅助供应商与外协风险预警</strong><span>根据到货延期、询价反馈、质检异常和历史履约记录生成风险预警与跟进摘要。</span></article>
            <article><strong>AI辅助售后和经营分析</strong><span>生成工单摘要、知识建议、备件消耗分析和AI经营问数结果，帮助管理层快速定位项目问题。</span></article>
          </div>
          <aside className={styles.aiBoundary}>
            <h3>AI只做辅助，不越权生效</h3>
            <p>涉及报价、合同、预算、BOM生效、采购审批、派工、开票、回款和财务处理的动作，必须由授权人员确认后进入流程。</p>
          </aside>
        </div>
      </section>

      {/* 协同对象 */}
      <section className={`${styles.section} ${styles.ltc}`} id="collaboration">
        <div className={`${styles.sectionHead} ${styles.compact}`}>
          <span>协同对象</span>
          <h2>把内部团队、外协供应商和客户现场协同起来</h2>
          <p>研发型定制制造企业经常不是全流程自制，项目成功取决于内部团队、外部供应商和客户现场能否围绕同一项目节奏协同。</p>
        </div>
        <div className={styles.ltcGrid}>
          <article className={styles.ltcCard} tabIndex={0} data-track="ltc_card_click" data-card="客户协同"><b>01</b><h3>客户协同</h3><p>统一需求、技术澄清、方案确认、验收条件和回款节点。</p><ul className={styles.miniList}><li>需求变更留痕</li><li>验收资料可追踪</li></ul></article>
          <article className={styles.ltcCard} tabIndex={0} data-track="ltc_card_click" data-card="内部协同"><b>02</b><h3>内部协同</h3><p>销售、研发、采购、项目、售后和财务围绕项目对象共享口径。</p><ul className={styles.miniList}><li>任务责任清晰</li><li>BOM、成本、交期同源</li></ul></article>
          <article className={styles.ltcCard} tabIndex={0} data-track="ltc_card_click" data-card="供应商协同"><b>03</b><h3>供应商协同</h3><p>将询价、下单、到货、质检和异常跟进纳入项目计划。</p><ul className={styles.miniList}><li>关键件交期预警</li><li>到货影响项目节点</li></ul></article>
          <article className={styles.ltcCard} tabIndex={0} data-track="ltc_card_click" data-card="外协服务协同"><b>04</b><h3>外协服务协同</h3><p>外协加工、外采服务、外包安装和现场支持都进入项目成本。</p><ul className={styles.miniList}><li>外协进度可见</li><li>费用归集到项目</li></ul></article>
          <article className={styles.ltcCard} tabIndex={0} data-track="ltc_card_click" data-card="财务协同"><b>05</b><h3>财务协同</h3><p>合同付款条件、开票计划、回款状态和项目毛利同步查看。</p><ul className={styles.miniList}><li>验收触发开票提醒</li><li>现金回收连接毛利分析</li></ul></article>
        </div>
      </section>

      {/* LTC 线索到回款 */}
      <section className={`${styles.section} ${styles.ltc}`} id="ltc">
        <div className={`${styles.sectionHead} ${styles.compact}`}>
          <span>Lead to Cash</span>
          <h2>研发型定制制造企业为什么要先打通 LTC 线索到回款？</h2>
          <p>客户从一个线索到最终回款，会经历需求、方案、报价、合同、项目、研发BOM、外协采购、装配调试、现场验收、售后等多个阶段。任何断点都会传导到交期、成本、回款和毛利。</p>
        </div>
        <div className={styles.ltcGrid}>
          <article className={styles.ltcCard} tabIndex={0} data-track="ltc_card_click" data-card="报价不是销售一个部门的事"><b>01</b><h3>报价不是销售一个部门的事</h3><p>报价要同时看需求、技术方案、研发BOM、外协采购、安装服务和毛利。</p><ul className={styles.miniList}><li>销售、研发、采购、项目、财务共用口径</li><li>减少低价中标和报价失真</li></ul></article>
          <article className={styles.ltcCard} tabIndex={0} data-track="ltc_card_click" data-card="合同不是终点，而是项目起点"><b>02</b><h3>合同不是终点，而是项目起点</h3><p>合同签订后，立即转入项目立项、WBS计划、预算和交付管理。</p><ul className={styles.miniList}><li>合同、项目、外协、费用关联</li><li>付款条件与回款节点同步跟踪</li></ul></article>
          <article className={styles.ltcCard} tabIndex={0} data-track="ltc_card_click" data-card="交付不是发货，而是验收和回款"><b>03</b><h3>交付不是发货，而是验收和回款</h3><p>发运、现场安装、联调测试、客户验收和资料确认都影响最终回款。</p><ul className={styles.miniList}><li>交付节点连接开票条件</li><li>验收结果衔接售后服务</li></ul></article>
          <article className={styles.ltcCard} tabIndex={0} data-track="ltc_card_click" data-card="毛利不是月底才看，而是全过程预警"><b>04</b><h3>毛利不是月底才看，而是全过程预警</h3><p>毛利受研发变更、外协采购、服务采购、现场费用和售后成本共同影响。</p><ul className={styles.miniList}><li>报价、预算、执行、交付后持续跟踪</li><li>异常形成预警，由授权人员确认</li></ul></article>
        </div>
        <div className={styles.ltcQuote}>LTC（Lead to Cash，线索到回款）不是单纯销售流程，而是研发型定制制造企业从客户需求到现金回收、从项目交付到利润沉淀的经营闭环。</div>
      </section>

      {/* 五层架构 */}
      <section className={`${styles.section} ${styles.architecture}`} id="architecture">
        <div className={styles.sectionHead}>
          <span>核心能力架构</span>
          <h2>从 LTC 到项目交付，打通定制制造全链路</h2>
          <p>以项目为核心对象，向前连接商机与售前方案，向后连接研发BOM、外协采购、装配联调、现场验收、售后服务和项目毛利分析。</p>
        </div>
        <div className={styles.layerStack} aria-label="研发型定制制造项目协同五层架构">
          <article><b>01</b><h3>业务输入层</h3><p>客户线索、需求文档、投标资料、技术方案、报价、合同、项目任务、研发BOM、外协采购、安装计划、售后工单和备件需求。</p></article>
          <article><b>02</b><h3>AI辅助理解层</h3><p>需求摘要、报价草稿、WBS建议、变更影响分析、供应商风险预警、售后工单摘要和AI经营问数。</p></article>
          <article><b>03</b><h3>业务系统与协同层</h3><p>结合现状规划 ERP、PLM、CRM、OA/BPM、供应商协同、售后服务、财务和企业微信/飞书/钉钉等集成路径。</p></article>
          <article><b>04</b><h3>项目执行与外协层</h3><p>研发任务、图纸文档、项目物资清单、外协加工、服务采购、供应商到货、装配联调、现场安装和客户验收。</p></article>
          <article><b>05</b><h3>经营分析与闭环层</h3><p>项目计划、外协进度、供应商交期、预算消耗、成本归集、开票回款、售后成本、项目毛利和复盘分析。</p></article>
        </div>
      </section>

      {/* 方案适配 */}
      <section className={`${styles.section} ${styles.fit}`} id="fit">
        <div className={`${styles.sectionHead} ${styles.compact}`}>
          <span>方案适配</span>
          <h2>不是先选系统，而是先看业务复杂度</h2>
          <p>研发型定制制造企业做数智化，不应先被产品线名称牵着走，而要先判断项目模式、研发协同、外协采购、供应商交期、售后服务和成本核算边界。</p>
        </div>
        <div className={styles.fitGrid}>
          <article className={styles.fitCard} tabIndex={0} data-track="solution_fit_card_click" data-card="研发驱动型成长企业"><small>研发驱动型成长企业</small><h3>先跑通方案、项目和外协采购</h3><dl><div><dt>特征</dt><dd>订单增长快，研发、采购、项目和财务口径不统一。</dd></div><div><dt>关注</dt><dd>方案报价、项目计划、研发BOM、外协采购和项目毛利。</dd></div><div><dt>方向</dt><dd>从一类典型项目试点，先建立可复制的协同模板。</dd></div></dl></article>
          <article className={styles.fitCard} tabIndex={0} data-track="solution_fit_card_click" data-card="外协采购占比高的企业"><small>外协采购占比高</small><h3>让供应商交期进入项目视图</h3><dl><div><dt>特征</dt><dd>大量零部件、外协加工、外采服务和外包安装依赖外部资源。</dd></div><div><dt>关注</dt><dd>供应商履约、到货风险、费用归集、付款协同和毛利影响。</dd></div><div><dt>方向</dt><dd>围绕项目物资清单、采购节点和外协任务建立协同看板。</dd></div></dl></article>
          <article className={styles.fitCard} tabIndex={0} data-track="solution_fit_card_click" data-card="售后服务重的设备企业"><small>售后服务重</small><h3>把设备履历、工单和备件闭环</h3><dl><div><dt>特征</dt><dd>设备交付后仍有安装、调试、维保、备件和客户现场服务。</dd></div><div><dt>关注</dt><dd>设备履历、工单响应、备件消耗、服务费用和客户复购。</dd></div><div><dt>方向</dt><dd>以客户和设备履历为主线，连接售后、备件和项目成本。</dd></div></dl></article>
          <article className={styles.fitCard} tabIndex={0} data-track="solution_fit_card_click" data-card="已有多套系统但协同断点明显"><small>已有系统但断点明显</small><h3>先梳理主链路，再判断集成或升级</h3><dl><div><dt>特征</dt><dd>已有ERP、PLM、OA、CRM或售后系统，但方案、项目、BOM、外协、成本和回款割裂。</dd></div><div><dt>关注</dt><dd>数据口径、接口边界、权限流程和AI能力接入点。</dd></div><div><dt>方向</dt><dd>先梳理 LTC 主链路，再判断保留、集成、替换或升级范围。</dd></div></dl></article>
        </div>
        <div className={styles.fitSummary}>行业推广页的核心不是先推某一条产品线，而是先看：LTC 线索到回款有没有打通，研发BOM和外协采购是否协同，供应商交期能否影响项目计划，项目成本和毛利能不能及时看清。</div>
      </section>

      {/* 19 场景 */}
      <section className={`${styles.section} ${styles.scenarios}`} id="scenarios">
        <div className={`${styles.sectionHead} ${styles.compact}`}>
          <span>明星业务场景</span>
          <h2>19个场景，把研发型定制项目从线索管到复盘</h2>
          <p>每个场景都可作为试点入口，优先选择数据可取得、流程边界清晰、能衡量交付和经营结果的典型项目。</p>
        </div>
        <div className={styles.scenarioGrid}>
          {scenarios.map((s) => (
            <article className={styles.scenarioCard} key={s.n} tabIndex={0} data-scenario={s.title} data-track="scenario_card_click">
              <small>SCENARIO {s.n}</small>
              <h3>{s.title}</h3>
              <dl><dt>痛点</dt><dd>{s.pain}</dd><dt>动作</dt><dd>{s.action}</dd><dt>价值</dt><dd>{s.value}</dd></dl>
              <span>{s.tag}</span>
            </article>
          ))}
        </div>
      </section>

      {/* 行业 */}
      <section className={`${styles.section} ${styles.industries}`} id="industries">
        <div className={`${styles.sectionHead} ${styles.compact}`}>
          <span>按行业/企业类型展示</span>
          <h2>不同研发型定制企业，优先试点场景不同</h2>
          <p>先选一个最能代表企业交付特征的项目，用小范围试点验证流程、数据和指标，再扩展到更多产品线和组织。</p>
        </div>
        <div className={styles.industryGrid}>
          {industries.map((it) => (
            <article className={styles.industryCard} key={it.small}>
              <small>{it.small}</small>
              <h3>{it.title}</h3>
              <dl>
                <div><dt>优先试点</dt><dd>{it.plan}</dd></div>
                <div><dt>典型痛点</dt><dd>{it.pain}</dd></div>
              </dl>
              <div className={styles.metrics}>指标：{it.metrics.replace('指标：', '')}</div>
            </article>
          ))}
        </div>
      </section>

      {/* 角色 tab */}
      <section className={`${styles.section} ${styles.roles}`} id="roles">
        <div className={`${styles.sectionHead} ${styles.compact}`}>
          <span>按角色价值</span>
          <h2>同一条 LTC 链路，不同角色看到不同经营答案</h2>
        </div>
        <div className={styles.roleTabs} role="tablist" aria-label="角色价值">
          {roles.map((r) => (
            <button
              key={r.key}
              className={`${styles.roleTab} ${activeRole === r.key ? styles.isActive : ''}`}
              type="button"
              role="tab"
              aria-selected={activeRole === r.key}
              onClick={() => setActiveRole(r.key)}
            >
              {r.label}
            </button>
          ))}
        </div>
        <div className={styles.rolePanels}>
          <article className={styles.rolePanel} data-role-panel="sales" hidden={activeRole !== 'sales'}>
            <h3>销售 / 方案负责人</h3>
            <p>关注线索质量、需求澄清、方案版本、报价效率、毛利测算和客户承诺边界。</p>
            <ul><li>投标资料能否快速提取重点</li><li>报价草稿是否有成本依据</li><li>客户承诺是否进入项目计划</li></ul>
          </article>
          <article className={styles.rolePanel} data-role-panel="rd" hidden={activeRole !== 'rd'}>
            <h3>研发负责人</h3>
            <p>关注研发任务、图纸文档、BOM版本、设计变更和跨部门评审。</p>
            <ul><li>研发交付物是否关联项目节点</li><li>变更影响是否覆盖采购和外协</li><li>BOM生效是否有授权确认</li></ul>
          </article>
          <article className={styles.rolePanel} data-role-panel="supply" hidden={activeRole !== 'supply'}>
            <h3>采购 / 供应链负责人</h3>
            <p>关注外协加工、服务采购、供应商交期、到货质检、异常跟进和付款协同。</p>
            <ul><li>关键件延期是否影响项目里程碑</li><li>外协费用是否归集到项目</li><li>供应商风险是否提前预警</li></ul>
          </article>
          <article className={styles.rolePanel} data-role-panel="pm" hidden={activeRole !== 'pm'}>
            <h3>项目负责人</h3>
            <p>关注WBS计划、任务协同、物资齐套、外协进度、现场安装、验收资料和回款节点。</p>
            <ul><li>项目延期卡在哪个环节</li><li>现场问题是否闭环</li><li>验收资料是否支撑开票回款</li></ul>
          </article>
          <article className={styles.rolePanel} data-role-panel="service" hidden={activeRole !== 'service'}>
            <h3>售后服务负责人</h3>
            <p>关注设备履历、维保计划、工单响应、备件库存、工程师派工建议和服务成本。</p>
            <ul><li>工单摘要是否清楚</li><li>备件消耗是否可追溯</li><li>服务成本是否进入项目复盘</li></ul>
          </article>
          <article className={styles.rolePanel} data-role-panel="finance" hidden={activeRole !== 'finance'}>
            <h3>老板 / CFO / CIO</h3>
            <p>关注经营效率、现金回收、项目利润、系统集成边界、权限治理和AI能力落地风险。</p>
            <ul><li>哪些项目拖期或低毛利</li><li>开票回款是否跟得上交付</li><li>AI建议是否受权限和流程约束</li></ul>
          </article>
        </div>
      </section>

      {/* 治理 */}
      <section className={`${styles.section} ${styles.governance}`} id="governance">
        <div className={`${styles.sectionHead} ${styles.compact}`}>
          <span>治理边界/实施边界</span>
          <h2>先把可验证场景做扎实，再逐步扩展系统与AI能力</h2>
          <p>泊冉建议先建立清晰实施边界，把 LTC 主链路、研发BOM、外协采购、项目成本和项目毛利分析跑稳，再逐步连接更多系统与AI共创能力。</p>
        </div>
        <div className={styles.governanceGrid}>
          <article><h3>可以先做</h3><p>线索商机、需求资料摘要、方案报价草稿、项目立项、WBS计划、研发BOM、外协采购、供应商交期、项目成本、开票回款、售后工单和项目毛利分析。</p></article>
          <article><h3>需要授权确认</h3><p>销售报价、合同条款、项目预算、BOM生效、设计变更、采购审批、派工、开票、回款、费用报销、成本结转、财务凭证和项目关闭等关键动作。</p></article>
          <article><h3>需要系统集成</h3><p>ERP、PLM、CRM、OA/BPM、供应商协同、售后服务、财务系统、企业微信/飞书/钉钉、BI或数据分析平台等。</p></article>
          <article><h3>可共创扩展</h3><p>AI可生成需求摘要、报价草稿、WBS建议、变更影响分析、供应商风险预警、售后工单摘要、项目毛利预警和AI经营问数结果。</p></article>
          <article className={styles.wide}><h3>避免过度承诺</h3><p>页面和实施沟通应写成：可帮助企业建立统一流程和数据口径；可结合业务规则形成建议、草稿、摘要、预警和分析；可在授权人员确认后进入业务流程；可通过试点逐步验证指标和推广范围。</p></article>
        </div>
      </section>

      {/* FAQ */}
      <section className={`${styles.section} ${styles.faq}`} id="faq">
        <div className={`${styles.sectionHead} ${styles.compact}`}>
          <span>FAQ</span>
          <h2>研发型定制制造企业评估AI项目协同时，通常先问这些问题</h2>
        </div>
        <div className={styles.faqList}>
          {faqs.map((f, idx) => (
            <article key={idx} className={`${styles.faqItem} ${openFaq === idx ? styles.isOpen : ''}`}>
              <button type="button" onClick={() => setOpenFaq(openFaq === idx ? null : idx)} aria-expanded={openFaq === idx}><span>{f.q}</span><b /></button>
              <p>{f.a}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 诊断 + 留资 */}
      <section className={`${styles.section} ${styles.diagnosis}`} id="diagnosis">
        <div className={styles.diagnosisCopy}>
          <span>Custom Equipment AI Collaboration Diagnosis</span>
          <h2>让定制设备项目，从方案报价管到外协交付、售后和毛利</h2>
          <p>如果您的企业正在经历需求资料难读、报价靠经验、研发BOM和采购脱节、外协交期难控、项目成本归集滞后、开票回款不同步、售后服务脱节等问题，泊冉软件可以为您梳理一套适合研发型定制制造企业的AI增强协同落地路径。</p>
          <div className={styles.conversionLines} aria-label="广告落地页转化话术">
            <p>科研仪器企业，如何管好项目交付和成本？</p>
            <p>专用设备定制项目复杂？用AI打通协同和毛利。</p>
            <p>机器人自动化企业，从方案报价管到安装回款。</p>
            <p>非标设备企业，外协采购、项目进度、售后如何协同？</p>
            <p>个性化定制制造，如何看清每个项目赚不赚钱？</p>
            <p>研发型制造企业，如何用AI提升项目协同效率？</p>
          </div>
          <div className={styles.diagnosisChecks}>
            <div><strong>梳理项目类型</strong><span>判断科研仪器、专用设备、自动化、医疗设备或系统集成交付模式。</span></div>
            <div><strong>定位协同断点</strong><span>识别需求、方案、研发BOM、外协采购、交付、回款、售后的断点。</span></div>
            <div><strong>规划AI试点</strong><span>选择报价草稿、WBS建议、变更分析、供应商预警或AI经营问数。</span></div>
          </div>
          <div className={styles.contactActions}>
            <a href="tel:400-9955-161" data-track="phone_click">电话咨询 400-9955-161</a>
            <a href="https://www.iboran.com/contact" data-track="wechat_consult_click">在线咨询</a>
          </div>
        </div>

        <form className={styles.leadForm} onSubmit={handleSubmit} data-form-name="eto-mto-manufacturing-yonsuite-lead">
          <h3>提交需求，获取初步诊断</h3>
          <input type="hidden" name="source_page" value="manufacturing-eto-yonsuite" />
          <input type="hidden" name="source_path" value="/solution/industry/manufacturing-eto-yonsuite" />
          <div className={styles.fieldGrid}>
            <label><span>姓名 <b>*</b></span><input name="name" type="text" autoComplete="name" required /></label>
            <label><span>手机号 <b>*</b></span><input name="phone" type="tel" autoComplete="tel" inputMode="tel" required /></label>
          </div>
          <div className={styles.fieldGrid}>
            <label><span>公司名称</span><input name="company" type="text" autoComplete="organization" /></label>
            <label>
              <span>所在行业</span>
              <select name="industry">
                <option value="">请选择</option>
                <option>科研仪器</option>
                <option>检测设备</option>
                <option>专用设备</option>
                <option>机器人与自动化</option>
                <option>医疗设备</option>
                <option>实验室设备</option>
                <option>非标设备</option>
                <option>系统集成类设备企业</option>
                <option>其他研发型定制制造</option>
              </select>
            </label>
          </div>
          <div className={styles.fieldGrid}>
            <label>
              <span>企业规模</span>
              <select name="company_size">
                <option value="">请选择</option>
                <option>100人以下</option>
                <option>100-500人</option>
                <option>500-1000人</option>
                <option>1000人以上</option>
                <option>多组织/多工厂</option>
              </select>
            </label>
            <label>
              <span>您的角色</span>
              <select name="role">
                <option value="">请选择</option>
                <option>老板 / 总经理</option>
                <option>CFO / 财务负责人</option>
                <option>CIO / 信息化负责人</option>
                <option>销售 / 方案负责人</option>
                <option>研发负责人</option>
                <option>采购 / 供应链负责人</option>
                <option>项目负责人</option>
                <option>售后负责人</option>
                <option>其他</option>
              </select>
            </label>
          </div>
          <fieldset className={styles.issueField}>
            <legend>当前主要痛点</legend>
            <label><input type="checkbox" name="pain_point" value="方案报价" /><span>方案报价</span></label>
            <label><input type="checkbox" name="pain_point" value="研发BOM/项目BOM" /><span>研发BOM/项目BOM</span></label>
            <label><input type="checkbox" name="pain_point" value="外协采购" /><span>外协采购</span></label>
            <label><input type="checkbox" name="pain_point" value="供应商交期" /><span>供应商交期</span></label>
            <label><input type="checkbox" name="pain_point" value="项目计划" /><span>项目计划</span></label>
            <label><input type="checkbox" name="pain_point" value="项目成本" /><span>项目成本</span></label>
            <label><input type="checkbox" name="pain_point" value="现场安装" /><span>现场安装</span></label>
            <label><input type="checkbox" name="pain_point" value="开票回款" /><span>开票回款</span></label>
            <label><input type="checkbox" name="pain_point" value="售后维保" /><span>售后维保</span></label>
            <label><input type="checkbox" name="pain_point" value="AI经营分析" /><span>AI经营分析</span></label>
          </fieldset>
          <div className={styles.fieldGrid}>
            <label>
              <span>是否已有ERP</span>
              <select name="erp_status">
                <option value="">请选择</option>
                <option>无</option>
                <option>用友</option>
                <option>金蝶</option>
                <option>SAP</option>
                <option>Oracle</option>
                <option>自研</option>
                <option>其他</option>
              </select>
            </label>
            <label>
              <span>是否已有PLM/OA/CRM/售后系统</span>
              <select name="system_status">
                <option value="">请选择</option>
                <option>已有PLM</option>
                <option>已有OA/BPM</option>
                <option>已有CRM</option>
                <option>已有售后服务系统</option>
                <option>已有多个系统</option>
                <option>暂未建设</option>
                <option>不确定</option>
              </select>
            </label>
          </div>
          <label>
            <span>计划启动时间</span>
            <select name="launch_time">
              <option value="">请选择</option>
              <option>1个月内</option>
              <option>3个月内</option>
              <option>半年内</option>
              <option>仅调研</option>
            </select>
          </label>
          <label>
            <span>备注</span>
            <textarea name="remark" rows={4} placeholder="例如：目前方案报价和外协采购靠Excel跟进，想先评估AI报价草稿、研发BOM协同、供应商交期和项目毛利分析" />
          </label>
          <p className={styles.formHint} role="status" aria-live="polite">提交后将由泊冉顾问根据企业类型、订单模式、现有系统和核心痛点，提供初步评估建议。</p>
          <button className={styles.modalSubmit} type="submit" data-track="lead_form_submit">
            提交需求，获取初步诊断
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h12.2l-5.1-5.1L14 5l8 8-8 8-1.9-1.9 5.1-5.1H5v-2Z" /></svg>
          </button>
        </form>
      </section>

      {/* 相关推荐 */}
      <section className={`${styles.section} ${styles.related}`} id="related">
        <div className={`${styles.sectionHead} ${styles.compact}`}>
          <span>相关页面推荐</span>
          <h2>继续了解项目协同、供应链、AI和业财一体化能力</h2>
        </div>
        <div className={styles.relatedGrid}>
          <a className={styles.relatedCard} href="https://www.iboran.com/solution/business/p2c-project-to-cost" data-track="bottom_cta_click"><small>项目管理</small><h3>P2C 项目到成本</h3><p>适合继续了解项目对象、成本归集、预算执行和项目经营分析。</p><span>查看页面</span></a>
          <a className={styles.relatedCard} href="https://www.iboran.com/solution/business/s2p" data-track="bottom_cta_click"><small>供应链</small><h3>采购与供应链协同</h3><p>了解供应商、采购订单、到货、质检、库存和结算协同。</p><span>查看页面</span></a>
          <a className={styles.relatedCard} href="https://www.iboran.com/solution/business/aip-intelligent-apps" data-track="bottom_cta_click"><small>AI智能应用</small><h3>AI应用与经营问数</h3><p>了解AI生成草稿、建议、摘要、预警和分析，并由授权人员确认后进入流程的共创路径。</p><span>查看页面</span></a>
          <a className={styles.relatedCard} href="https://www.iboran.com/solution/business/finance-cloud" data-track="bottom_cta_click"><small>业财一体化</small><h3>智能财务与经营分析</h3><p>了解业务单据驱动成本、应收应付、开票回款和经营报表。</p><span>查看页面</span></a>
          <a className={styles.relatedCard} href="https://www.iboran.com/solution/business/revenue-cloud" data-track="bottom_cta_click"><small>营销增长</small><h3>线索、商机与合同协同</h3><p>继续了解从客户机会、销售过程到合同与回款协同的业务链路。</p><span>查看页面</span></a>
        </div>
      </section>
    </main>
  )
}
