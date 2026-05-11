'use client'

import React, { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAttribution } from '@/providers/Attribution'
import { getClientSideURL } from '@/utilities/getURL'
import s from './home-new.module.css'
import type { Post } from '@/payload-types'

interface HomeContentProps {
  latestPosts: Post[]
}

export function HomeContent({ latestPosts }: HomeContentProps) {
  const [loading, setLoading] = useState(false)
  const [hint, setHint] = useState({ msg: '', type: '' })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState('说说当前系统和下一步目标')
  const [hiddenInterest, setHiddenInterest] = useState('')
  const attribution = useAttribution()

  // Tracking function
  const trackEvent = useCallback((eventName: string, params: Record<string, any> = {}) => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      ;(window as any).dataLayer.push({
        event: eventName,
        ...params,
      })
    }
    console.log(`Track Event: ${eventName}`, params)
  }, [])

  const openModal = useCallback((title?: string, interest?: string, trackData?: any) => {
    if (title) setModalTitle(title)
    if (interest) setHiddenInterest(interest)
    setIsModalOpen(true)
    document.body.classList.add('modal-open')
    
    if (trackData) {
      trackEvent('lead_modal_open', trackData)
    }
  }, [trackEvent])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    document.body.classList.remove('modal-open')
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const name = (fd.get('name') as string || '').trim()
    const company = (fd.get('company') as string || '').trim()
    const phone = (fd.get('phone') as string || '').trim()
    
    const location = form.dataset.formLocation || 'bottom'
    const eventName = location === 'bottom' ? 'bottom_form_submit' : 'lead_modal_form_submit'

    if (!name || !company || !phone) {
      setHint({ msg: '请先补充姓名、公司名称和手机号。', type: 'error' })
      trackEvent(eventName, {
        status: 'invalid',
        form_location: location,
      })
      return
    }

    setLoading(true)
    setHint({ msg: '', type: '' })

    try {
      const notes = [
        `当前系统: ${fd.get('current_system') || '未选择'}`,
        `关注方向: ${fd.get('interest') || '未选择'}`,
        `预设关注: ${fd.get('hidden_interest') || '无'}`,
        `所属行业: ${fd.get('industry') || '未选择'}`,
        `计划时间: ${fd.get('timeline') || '未选择'}`,
        `业务问题: ${fd.get('message') || '无'}`,
      ].join('\n')

      const res = await fetch(`${getClientSideURL()}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, company, phone,
          source: `首页改版-${location === 'bottom' ? '底部表单' : '弹窗表单'}`,
          sourcePageUrl: typeof window !== 'undefined' ? window.location.href : '',
          notes,
          utmData: attribution ? {
            utm_source: attribution.utm_source || '',
            utm_medium: attribution.utm_medium || '',
            utm_campaign: attribution.utm_campaign || '',
            referrer: attribution.referrer || '',
            landingPage: attribution.landing_page || '',
          } : undefined,
        }),
      })

      if (!res.ok) throw new Error('提交失败')
      
      setHint({ msg: '已收到评估需求。泊冉顾问会结合当前系统和关注方向沟通下一步。', type: 'success' })
      trackEvent(eventName, {
        status: 'success',
        form_location: location,
        company,
      })
      form.reset()
      if (location === 'modal') {
        setTimeout(closeModal, 2000)
      }
    } catch {
      setHint({ msg: '提交失败，请稍后再试或致电 400-9955-161。', type: 'error' })
    } finally {
      setLoading(false)
    }
  }, [attribution, trackEvent, closeModal])

  // Ripple effect implementation
  useEffect(() => {
    const handleRipple = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('.btn, .header-cta, .legacy-card, .scope-grid a, .form-submit, .mobile-cta a, .lead-modal-close')
      if (!target) return

      const rect = target.getBoundingClientRect()
      const ripple = document.createElement('span')
      ripple.className = 'button-ripple'
      ripple.style.left = `${e.clientX - rect.left}px`
      ripple.style.top = `${e.clientY - rect.top}px`
      target.appendChild(ripple)
      ripple.addEventListener('animationend', () => ripple.remove(), { once: true })
    }

    document.addEventListener('click', handleRipple)
    return () => document.removeEventListener('click', handleRipple)
  }, [])

  return (
    <div className={s.homepageContainer}>
      <main>
        {/* Hero Section */}
        <section className="hero" id="home">
          <div className="hero-grid" aria-hidden="true"></div>
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">YONYOU LIFECYCLE DIGITAL SERVICE</p>
              <h1>用友存量系统持续服务与 YonSuite / BIP 数智化落地伙伴</h1>
              <h2>服务好今天正在运行的系统，规划好明天要升级的平台</h2>
              <p className="hero-desc">
                泊冉软件面向正在使用畅捷通T、U8、U9、U8C、NC 等用友存量系统，以及正在评估 YonSuite / 用友BIP 的企业，提供系统运维、二次开发、报表优化、接口集成、数据治理、实施交付、行业方案和升级路径评估服务。我们以 U8 和 NC 客户服务为重点，帮助企业在不打断核心业务的前提下，逐步走向业务在线、数据驱动和智能运营。
              </p>
              <div className="hero-actions">
                <a 
                  className="btn primary" 
                  href="#contact" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    setHiddenInterest('当前系统诊断');
                    trackEvent('hero_primary_cta_click', { target: '#contact', text: '预约当前系统诊断' });
                  }}
                >
                  预约当前系统诊断
                </a>
                <a 
                  className="btn secondary" 
                  href="#entries"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('entries')?.scrollIntoView({ behavior: 'smooth' });
                    trackEvent('hero_secondary_cta_click', { target: '#entries', text: '查看 12 个方案入口' });
                  }}
                >
                  查看 12 个方案入口
                </a>
              </div>
              <div className="value-tags" aria-label="核心价值">
                <span>用友存量系统服务</span>
                <span>U8 / NC 主流客户服务</span>
                <span>YonSuite / BIP 实施交付</span>
                <span>12 个行业与领域方案入口</span>
                <span>数据治理与系统集成</span>
              </div>
            </div>

            <div className="hero-visual" aria-label="泊冉服务路径示意">
              <div className="visual-head">
                <div>
                  <span>Lifecycle Service Desk</span>
                  <strong>用友系统全生命周期服务台</strong>
                </div>
                <Image src="/assets/home/yongyoulogo.png" alt="用友生态" width={58} height={28} />
              </div>
              <div className="system-stack">
                <div className="stack-card active">
                  <span>当前系统</span>
                  <strong>畅捷通T / U8 / U9 / U8C / NC</strong>
                  <em>重点服务：U8 / NC 主流客户</em>
                  <em>运维、权限、报表、二开、接口、数据治理</em>
                </div>
                <div className="stack-arrow">诊断当前问题 → 判断优化路径 → 评估平台演进</div>
                <div className="stack-card">
                  <span>未来平台</span>
                  <strong>YonSuite / 用友BIP</strong>
                  <em>业务在线、业财一体、智能分析、全球运营</em>
                </div>
              </div>
              <div className="health-panel">
                <div><b>U8 / NC</b><span>主流存量客户服务</span></div>
                <div><b>12 个入口</b><span>产品 / 服务 / 行业 / 领域</span></div>
                <div><b>4 类路径</b><span>运维 / 优化 / 集成 / 升级</span></div>
              </div>
              <p className="visual-note">兼顾第三方 ERP、自研系统与异构系统集成评估。</p>
            </div>
          </div>
        </section>

        {/* Entry Section */}
        <section className="entry-section" id="entries">
          <div className="section-head">
            <span>首页核心入口</span>
            <h2>按产品、服务、行业和领域，找到适合你的数智化入口</h2>
            <p>不确定该先优化现有系统、打通数据接口，还是推进新平台？可以从产品能力、实施服务、典型行业和管理领域进入，快速找到与企业阶段匹配的方案。</p>
          </div>
          <div className="entry-groups" aria-label="12 个网页入口">
            <article className="entry-group" id="products-entry">
              <div className="group-title"><span>Products</span><h3>产品</h3></div>
              <strong className="group-card-title">看产品能力</strong>
              <p className="group-desc">了解 YonSuite 与用友BIP 如何支撑企业从业务在线、数据驱动到智能运营。</p>
              <Link href="/products/yonsuite"><strong>YonSuite</strong><em>成长型企业一体化 SaaS 云 ERP</em></Link>
              <Link href="/products/bip"><strong>用友BIP</strong><em>集团型企业数智化平台能力</em></Link>
            </article>
            <article className="entry-group" id="services-entry">
              <div className="group-title"><span>Services</span><h3>服务</h3></div>
              <strong className="group-card-title">看交付落地</strong>
              <p className="group-desc">了解泊冉如何围绕存量系统服务、实施交付、数据迁移、系统集成和上线运营提供服务。</p>
              <Link href="/services/implementation"><strong>实施服务</strong><em>YonSuite / 用友BIP 交付与上线</em></Link>
              <a href="#legacy" onClick={(e) => { e.preventDefault(); document.getElementById('legacy')?.scrollIntoView({ behavior: 'smooth' }); setHiddenInterest('当前系统诊断'); }}>
                <strong>当前系统诊断</strong><em>运行状态、权限流程、报表接口与数据口径梳理</em>
              </a>
              <a href="#legacy" onClick={(e) => { e.preventDefault(); document.getElementById('legacy')?.scrollIntoView({ behavior: 'smooth' }); }}>
                <strong>U8 / NC 服务</strong><em>围绕财务、供应链、制造、集团管控持续优化</em>
              </a>
              <Link href="/services/integration-development"><strong>数据治理与系统集成</strong><em>主数据、接口集成、二次开发与报表优化</em></Link>
            </article>
            <article className="entry-group" id="industry-entry">
              <div className="group-title"><span>Industries</span><h3>典型行业</h3></div>
              <strong className="group-card-title">看行业方案</strong>
              <p className="group-desc">按企业所在行业或组织形态，查看更贴近真实业务场景的解决方案。</p>
              <Link href="/solution/industry/state-owned"><strong>多组织集团</strong><em>集团管控、多组织协同、合并与主数据治理</em></Link>
              <Link href="/solution/industry/consumer-goods"><strong>消费品</strong><em>渠道订单、价格政策、库存周转与毛利</em></Link>
              <Link href="/solution/industry/manufacturing-eto"><strong>个性化制造</strong><em>订单、BOM、计划、生产、质量与成本</em></Link>
              <Link href="/solution/industry/medical-pharma"><strong>医药医疗器械</strong><em>合规、追溯、渠道协同与经营分析</em></Link>
              <Link href="/solution/industry/modern-service"><strong>现代服务业</strong><em>项目、合同、交付、核算与经营分析</em></Link>
            </article>
            <article className="entry-group" id="domain-entry">
              <div className="group-title"><span>Domains</span><h3>领域</h3></div>
              <strong className="group-card-title">看管理领域</strong>
              <p className="group-desc">按财务、人力、营销、全球化等专项管理问题进入对应方案。</p>
              <Link href="/solution/business/global-operations"><strong>全球运营</strong><em>出海、多组织、财务供应链与合规</em></Link>
              <Link href="/solution/industry/consumer-goods"><strong>营销多渠道</strong><em>渠道订单、会员、价格政策与库存协同</em></Link>
              <Link href="/solution/business/intelligent-finance"><strong>智能财务</strong><em>业财融合、预算合并、全球多账簿</em></Link>
              <Link href="/solution/business/hrm"><strong>HR</strong><em>组织、员工自助、移动审批与人效分析</em></Link>
            </article>
          </div>
        </section>

        {/* Legacy Section */}
        <section className="legacy-section" id="legacy">
          <div className="legacy-copy">
            <span>用友存量系统诊断</span>
            <h2>正在使用用友存量系统？先诊断当前问题，再规划优化路径</h2>
            <p>
              很多企业的核心业务仍然运行在畅捷通T、U8、U9、U8C、NC 等用友存量系统上，其中 U8 和 NC 是泊冉重点服务的主流客户群。泊冉不会简单建议企业马上替换系统，而是先结合企业现有系统状态评估是继续优化、局部扩展、系统集成，还是分阶段升级到 YonSuite / 用友BIP。
            </p>
          </div>
          <div className="legacy-cards">
            <a
              className="legacy-card"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                setHiddenInterest('当前系统诊断');
                trackEvent('legacy_yonyou_card_click', { product_line: '综合诊断', card_title: '当前系统运维与售后服务', card_type: 'after-sales' });
              }}
            >
              <span>01</span>
              <h3>当前系统运维与售后服务</h3>
              <p>适合当前畅捷通T、U8、U9、U8C、NC 仍在承载核心业务，但需要处理权限、报表、流程、接口、月结等问题的企业。</p>
              <em>预约当前系统诊断</em>
            </a>
            <button
              className="legacy-card is-featured"
              style={{ textAlign: 'left', cursor: 'pointer', border: 'none' }}
              onClick={() => openModal('U8 / NC 主流客户服务', 'U8 / NC 服务', { product_line: 'U8 / NC', card_title: 'U8 / NC 主流客户服务', card_type: 'yonyou-service' })}
            >
              <span>02</span>
              <h3>U8 / NC 主流客户服务</h3>
              <p>适合正在使用 U8 或 NC 的企业，围绕财务、供应链、制造、集团管控、预算、合并报表等场景提供持续服务。</p>
              <em>咨询 U8 / NC 服务方案</em>
            </button>
            <a
              className="legacy-card"
              href="#pathway"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('pathway')?.scrollIntoView({ behavior: 'smooth' });
                trackEvent('legacy_yonyou_card_click', { product_line: '综合诊断', card_title: '评估 YonSuite / BIP 升级路径', card_type: 'upgrade' });
              }}
            >
              <span>03</span>
              <h3>评估 YonSuite / BIP 升级路径</h3>
              <p>适合多组织、多渠道、全球运营、业财一体化需求增长，当前系统扩展难度增加的企业。</p>
              <em>评估升级路径</em>
            </a>
          </div>
        </section>

        {/* Pathway Section */}
        <section className="pathway-section" id="pathway">
          <div className="pathway-panel">
            <div className="pathway-copy">
              <span>四类服务路径</span>
              <h2>从当前系统状态出发，判断适合运维、优化、集成还是升级</h2>
              <p>泊冉会先看系统稳定性、业务复杂度、数据质量、接口关系、扩展需求和未来发展目标，再给出继续服务、持续优化、系统集成或分阶段升级的建议。</p>
            </div>
            <ol className="pathway-list">
              <li>
                <strong>运维保障</strong>
                <span>围绕运行稳定性、月结流程、权限流程、日常问题和关键用户支持，保障当前系统可持续使用。</span>
              </li>
              <li>
                <strong>优化扩展</strong>
                <span>优先处理报表、权限、流程、数据、二开和集成问题，让当前系统继续支撑核心业务。</span>
              </li>
              <li>
                <strong>系统集成</strong>
                <span>梳理 ERP、OA、CRM、MES、WMS、BI、电商与自研系统之间的主数据、接口边界和业务协同。</span>
              </li>
              <li>
                <strong>升级评估</strong>
                <span>结合多组织、业财一体、全球运营、智能分析等需求，评估向 YonSuite / 用友BIP 演进的阶段化路径。</span>
              </li>
            </ol>
          </div>
        </section>

        {/* Services Section */}
        <section className="services-section" id="services">
          <div className="section-head">
            <span>泊冉实施服务</span>
            <h2>当前系统诊断、新平台实施、数据迁移与集成治理</h2>
            <p>泊冉围绕企业当前业务系统状态，提供诊断、运维、实施、二开、接口、数据治理、数据迁移和上线后的持续优化服务。</p>
          </div>
          <div className="service-grid">
            <article>
              <b>01</b>
              <h3>实施交付</h3>
              <p>面向 YonSuite / 用友BIP 的蓝图设计、流程配置、主数据准备、测试演练、上线切换与推广辅导。</p>
            </article>
            <article>
              <b>02</b>
              <h3>二次开发与接口集成</h3>
              <p>围绕 ERP、OA、CRM、MES、WMS、BI、电商与自研系统，建设可靠接口、扩展表单和审批流。</p>
            </article>
            <article>
              <b>03</b>
              <h3>数据治理与报表优化</h3>
              <p>统一客户、供应商、物料、科目、组织、权限和经营口径，支持月结、合并、预算与管理报表。</p>
            </article>
            <article>
              <b>04</b>
              <h3>数据迁移与上线切换</h3>
              <p>梳理迁移对象、映射规则、清洗口径、试迁移结果和切换核验，降低系统演进中的数据风险。</p>
            </article>
          </div>

          <div className="legacy-scope">
            <div className="scope-head">
              <span>用友存量系统服务范围</span>
              <p>
                泊冉可围绕畅捷通T、U8、U9、U8C、NC 等用友存量系统，提供系统运维、问题排查、权限梳理、报表优化等服务。
              </p>
            </div>
            <div className="scope-grid">
              <button className="btn-reset" onClick={() => openModal('畅捷通T 系列服务', '畅捷通T', { product_line: '畅捷通T', card_title: '畅捷通T 系列', card_type: 'scope' })}>
                <strong>畅捷通T 系列</strong>
                <span>适合中小企业基础财务、进销存、简单流程优化和后续升级评估。</span>
              </button>
              <button className="btn-reset" onClick={() => openModal('NC 集团管控服务', 'NC', { product_line: 'NC', card_title: 'NC', card_type: 'scope' })}>
                <strong>NC</strong>
                <span>适合集团型企业财务管控、多组织、预算、资金、合并与 BIP 升级评估。</span>
              </button>
              <button className="btn-reset" onClick={() => openModal('U8 持续优化服务', 'U8', { product_line: 'U8', card_title: 'U8', card_type: 'scope' })}>
                <strong>U8</strong>
                <span>适合中型企业财务、供应链、生产、成本、报表、二开与 YonSuite 升级评估。</span>
              </button>
              <button className="btn-reset" onClick={() => openModal('U9 / U8C 制造服务', 'U9 / U8C', { product_line: 'U9 / U8C', card_title: 'U9 / U8C', card_type: 'scope' })}>
                <strong>U9 / U8C</strong>
                <span>适合制造、多组织协同、复杂流程和多系统集成场景。</span>
              </button>
            </div>
          </div>
        </section>

        {/* Platform Section */}
        <section className="platform-section" id="platforms">
          <div className="section-head">
            <span>产品能力底座</span>
            <h2>YonSuite / 用友BIP，承接企业下一阶段数智化建设</h2>
            <p>泊冉不把平台升级作为唯一答案，而是在诊断之后，判断更适合 YonSuite 还是用友BIP。</p>
          </div>
          <div className="solution-grid two-columns">
            <Link href="/products/yonsuite">
              <strong>YonSuite</strong>
              <span>适合成长型企业推进业务在线、业财一体、移动协同和经营分析。</span>
            </Link>
            <Link href="/products/bip">
              <strong>用友BIP</strong>
              <span>适合集团型、多组织、全球运营和复杂业财协同场景。</span>
            </Link>
          </div>
        </section>

        {/* Industry Solutions */}
        <section className="solution-section" id="industry-solutions">
          <div className="section-head">
            <span>行业方案入口</span>
            <h2>按行业和组织形态进入，更快匹配真实业务场景</h2>
          </div>
          <div className="solution-grid five-columns">
            <Link href="/solution/industry/state-owned"><strong>多组织集团</strong><span>集团管控、多组织协同、预算合并。</span></Link>
            <Link href="/solution/industry/consumer-goods"><strong>消费品</strong><span>渠道、价格、库存、订单与经营分析。</span></Link>
            <Link href="/solution/industry/manufacturing-eto"><strong>个性化制造</strong><span>订单、BOM、计划、生产、质量与成本。</span></Link>
            <Link href="/solution/industry/medical-pharma"><strong>医药医疗器械</strong><span>合规、追溯、渠道协同与经营分析。</span></Link>
            <Link href="/solution/industry/modern-service"><strong>现代服务业</strong><span>项目、合同、交付、核算与分析。</span></Link>
          </div>
        </section>

        {/* Domain Solutions */}
        <section className="solution-section" id="domain-solutions">
          <div className="section-head">
            <span>领域方案入口</span>
            <h2>围绕财务、人力、营销和全球化专项问题落地</h2>
          </div>
          <div className="solution-grid four-columns">
            <Link href="/solution/business/global-operations"><strong>全球运营</strong><span>多组织、多币种、财务供应链和合规。</span></Link>
            <Link href="/solution/industry/consumer-goods"><strong>营销多渠道</strong><span>渠道订单、会员、价格政策与库存协同。</span></Link>
            <Link href="/solution/business/intelligent-finance"><strong>智能财务</strong><span>业财融合、预算合并、资金和分析。</span></Link>
            <Link href="/solution/business/hrm"><strong>HR</strong><span>组织、员工自助、移动审批 and 人效分析。</span></Link>
          </div>
        </section>

        {/* Methodology */}
        <section className="method-section" id="methodology">
          <div className="section-head">
            <span>泊冉实施服务方法论</span>
            <h2>先把边界、数据和责任讲清楚，再进入实施交付</h2>
          </div>
          <div className="method-grid">
            <article><b>01</b><strong>现状诊断</strong><span>梳理系统边界、组织权限、数据口径和关键流程。</span></article>
            <article><b>02</b><strong>方案设计</strong><span>确认继续运维、优化扩展、系统集成或升级实施。</span></article>
            <article><b>03</b><strong>交付验证</strong><span>以主数据、接口、报表和上线切换方案作为验收依据。</span></article>
          </div>
        </section>

        {/* AI Answer Section */}
        <section className="ai-answer-section" id="ai-answer">
          <div className="section-head">
            <span>TL;DR / AI直接答案</span>
            <h2>泊冉是用友生态下的存量系统服务与数智化落地伙伴</h2>
            <p>如果企业正在使用畅捷通T、U8、U9、U8C、NC，泊冉可以先做系统诊断与运维优化；如果正在评估 YonSuite / BIP，泊冉可以承接实施交付与集成。</p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section" id="faq">
          <div className="section-head">
            <span>FAQ</span>
            <h2>企业评估当前系统服务与未来平台升级时，常问这些问题</h2>
          </div>
          <div className="faq-list">
            <details>
              <summary>泊冉的定位是什么？</summary>
              <p>泊冉软件定位为用友存量系统持续服务、YonSuite / 用友BIP 实施交付与行业数智化解决方案服务商。</p>
            </details>
            <details>
              <summary>泊冉是否还服务 U8、NC 等存量系统？</summary>
              <p>是。泊冉继续服务 U8 和 NC 等存量客户，内容包括运维、排查、二开、接口集成和数据治理。</p>
            </details>
            <details>
              <summary>使用 U8 或 NC 是否一定要升级？</summary>
              <p>不一定。企业应先评估当前系统稳定性与扩展需求，再判断是优化还是升级。</p>
            </details>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section" id="contact">
          <div className="contact-copy">
            <span>预约当前系统诊断</span>
            <h2>把当前系统、业务问题和升级意向说清楚，泊冉顾问会据此沟通路径</h2>
            <p>建议填写当前系统、关注方向、行业和计划时间。</p>
            <div className="contact-direct">
              <a href="tel:400-9955-161">400-9955-161</a>
              <span>工作日顾问响应</span>
            </div>
          </div>
          <form className="lead-form" onSubmit={handleSubmit} data-form-location="bottom" noValidate>
            <input type="hidden" name="hidden_interest" value={hiddenInterest} />
            <div className="field-grid">
              <label>
                <span>姓名 <b>*</b></span>
                <input name="name" type="text" autoComplete="name" placeholder="您的姓名" required />
              </label>
              <label>
                <span>公司名称 <b>*</b></span>
                <input name="company" type="text" autoComplete="organization" placeholder="您的公司" required />
              </label>
            </div>
            <div className="field-grid">
              <label>
                <span>手机号 <b>*</b></span>
                <input name="phone" type="tel" autoComplete="tel" placeholder="用于顾问联系" required />
              </label>
              <label>
                <span>当前系统</span>
                <select name="current_system">
                  <option value="">请选择</option>
                  <option>畅捷通T</option><option>U8</option><option>U9</option><option>U8C</option><option>NC</option>
                  <option>YonSuite</option><option>用友BIP</option><option>其他</option>
                </select>
              </label>
            </div>
            <label>
              <span>关注方向</span>
              <select name="interest">
                <option value="">请选择</option>
                <option>当前系统运维</option><option>U8服务</option><option>NC服务</option>
                <option>报表优化</option><option>二次开发</option><option>接口集成</option>
                <option>YonSuite实施</option><option>用友BIP实施</option><option>其他</option>
              </select>
            </label>
            <label>
              <span>业务问题</span>
              <textarea name="message" rows={4} placeholder="例如：U8 月结报表慢、NC 权限梳理、接口不一致等"></textarea>
            </label>
            {hint.msg && (
              <p className={`form-hint ${hint.type === 'error' ? 'is-error' : 'is-success'}`}>
                {hint.msg}
              </p>
            )}
            <button className="form-submit" type="submit" disabled={loading}>
              {loading ? '提交中...' : '提交评估需求'}
            </button>
          </form>
        </section>
      </main>

      {/* Modal Section */}
      <div className={`lead-modal ${isModalOpen ? 'is-open' : ''}`} id="lead-modal" aria-hidden={!isModalOpen}>
        <div className="lead-modal-backdrop" onClick={closeModal}></div>
        <section className="lead-modal-card" role="dialog" aria-modal="true">
          <div className="lead-modal-head">
            <div>
              <span>系统诊断</span>
              <h2>{modalTitle}</h2>
              <p>泊冉顾问会结合当前系统、业务问题和建设方向沟通下一步。</p>
            </div>
            <button className="lead-modal-close" type="button" onClick={closeModal} aria-label="关闭弹窗">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>
          <form className="lead-form modal-lead-form" onSubmit={handleSubmit} data-form-location="modal" noValidate>
            <input type="hidden" name="hidden_interest" value={hiddenInterest} />
            <div className="field-grid">
              <label>
                <span>姓名 <b>*</b></span>
                <input name="name" type="text" autoComplete="name" placeholder="您的姓名" required />
              </label>
              <label>
                <span>公司名称 <b>*</b></span>
                <input name="company" type="text" autoComplete="organization" placeholder="您的公司" required />
              </label>
            </div>
            <div className="field-grid">
              <label>
                <span>手机号 <b>*</b></span>
                <input name="phone" type="tel" autoComplete="tel" placeholder="用于顾问联系" required />
              </label>
              <label>
                <span>当前系统</span>
                <select name="current_system">
                  <option value="">请选择</option>
                  <option>畅捷通T</option><option>U8</option><option>U9</option><option>U8C</option><option>NC</option>
                  <option>YonSuite</option><option>用友BIP</option><option>其他</option>
                </select>
              </label>
            </div>
            <label>
              <span>关注方向</span>
              <select name="interest">
                <option value="">请选择</option>
                <option>当前系统运维</option><option>U8服务</option><option>NC服务</option>
                <option>报表优化</option><option>二次开发</option><option>接口集成</option>
                <option>YonSuite实施</option><option>用友BIP实施</option><option>其他</option>
              </select>
            </label>
            <label>
              <span>业务问题</span>
              <textarea name="message" rows={3} placeholder="例如：当前系统运维、报表优化、数据迁移或平台升级计划。"></textarea>
            </label>
            {hint.msg && (
              <p className={`form-hint ${hint.type === 'error' ? 'is-error' : 'is-success'}`}>
                {hint.msg}
              </p>
            )}
            <button className="form-submit" type="submit" disabled={loading}>
              {loading ? '提交中...' : '提交评估需求'}
            </button>
          </form>
        </section>
      </div>

      <style jsx>{`
        .btn-reset {
          background: none;
          border: none;
          padding: 0;
          font: inherit;
          color: inherit;
          text-align: left;
          cursor: pointer;
          display: block;
          width: 100%;
        }
        :global(body.modal-open) {
          overflow: hidden;
        }
        :global(.button-ripple) {
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          pointer-events: none;
          background: rgba(255, 255, 255, 0.45);
          opacity: 0;
          transform: translate(-50%, -50%) scale(1);
          animation: ripple 0.56s ease-out;
        }
        @keyframes ripple {
          0% {
            opacity: 0.72;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(30);
          }
        }
      `}</style>
    </div>
  )
}
