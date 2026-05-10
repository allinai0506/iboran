'use client'

import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAttribution } from '@/providers/Attribution'
import { getClientSideURL } from '@/utilities/getURL'
import s from './home.module.css'
import type { Post } from '@/payload-types'

interface HomeContentProps {
  latestPosts: Post[]
}

export function HomeContent({ latestPosts }: HomeContentProps) {
  const [loading, setLoading] = useState(false)
  const [hint, setHint] = useState({ msg: '', type: '' })
  const attribution = useAttribution()

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const name = (fd.get('name') as string || '').trim()
    const company = (fd.get('company') as string || '').trim()
    const phone = (fd.get('phone') as string || '').trim()
    
    if (!name || !company || !phone) {
      setHint({ msg: '请填写必填项（姓名、公司、手机号）。', type: 'error' })
      return
    }

    setLoading(true)
    setHint({ msg: '', type: '' })

    try {
      const notes = [
        `当前系统: ${fd.get('current_system') || '未选择'}`,
        `关注方向: ${fd.get('interest') || '未选择'}`,
        `所属行业: ${fd.get('industry') || '未选择'}`,
        `计划时间: ${fd.get('timeline') || '未选择'}`,
        `业务问题: ${fd.get('message') || '无'}`,
      ].join('\n')

      const res = await fetch(`${getClientSideURL()}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, company, phone,
          source: '新版首页评估需求',
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
      
      setHint({ msg: '已收到您的需求，泊冉顾问将尽快联系您。', type: 'success' })
      form.reset()
    } catch {
      setHint({ msg: '提交失败，请稍后再试或致电 400-9955-161。', type: 'error' })
    } finally {
      setLoading(false)
    }
  }, [attribution])

  return (
    <div className={s.page}>
      {/* Hero Section */}
      <section className={s.hero} id="home">
        <div className={s.heroGrid} aria-hidden="true" />
        <div className={s.heroInner}>
          <div className={s.heroCopy}>
            <p className={s.eyebrow}>YONYOU LIFECYCLE DIGITAL SERVICE</p>
            <h1 className={s.heroTitle}>用友存量系统持续服务与 YonSuite / BIP 数智化落地伙伴</h1>
            <h2 className={s.heroSubtitle}>服务好今天正在运行的系统，规划好明天要升级的平台</h2>
            <p className={s.heroDesc}>
              泊冉软件面向正在使用畅捷通T、U8、U9、U8C、NC 等用友存量系统，以及正在评估 YonSuite / 用友BIP 的企业，提供系统运维、二次开发、报表优化、接口集成、数据治理、实施交付、行业方案和升级路径评估服务。我们以 U8 和 NC 客户服务为重点，帮助企业在不打断核心业务的前提下，逐步走向业务在线、数据驱动和智能运营。
            </p>
            <div className={s.heroActions}>
              <a className={s.btnPrimary} href="#contact">预约当前系统诊断</a>
              <a className={s.btnSecondary} href="#entries">查看 12 个方案入口</a>
            </div>
            <div className={s.valueTags}>
              <span>用友存量系统服务</span>
              <span>U8 / NC 主流客户服务</span>
              <span>YonSuite / BIP 实施交付</span>
              <span>12 个行业与领域方案入口</span>
              <span>数据治理与系统集成</span>
            </div>
          </div>

          <div className={s.heroVisual}>
            <div className={s.visualHead}>
              <div>
                <span>Lifecycle Service Desk</span>
                <strong>用友系统全生命周期服务台</strong>
              </div>
              <img src="/assets/home/yongyoulogo.png" alt="用友生态" />
            </div>
            <div className={s.systemStack}>
              <div className={`${s.stackCard} ${s.stackCardActive}`}>
                <span>当前系统</span>
                <strong>畅捷通T / U8 / U9 / U8C / NC</strong>
                <em>重点服务：U8 / NC 主流客户</em>
                <em>运维、权限、报表、二开、接口、数据治理</em>
              </div>
              <div className={s.stackArrow}>诊断当前问题 → 判断优化路径 → 评估平台演进</div>
              <div className={s.stackCard}>
                <span>未来平台</span>
                <strong>YonSuite / 用友BIP</strong>
                <em>业务在线、业财一体、智能分析、全球运营</em>
              </div>
            </div>
            <div className={s.healthPanel}>
              <div><b>U8 / NC</b><span>主流存量客户服务</span></div>
              <div><b>12 个入口</b><span>产品 / 服务 / 行业 / 领域</span></div>
              <div><b>4 类路径</b><span>运维 / 优化 / 集成 / 升级</span></div>
            </div>
            <p className={s.visualNote}>兼顾第三方 ERP、自研系统与异构系统集成评估。</p>
          </div>
        </div>
      </section>

      {/* Entry Groups */}
      <section className={s.section} id="entries">
        <div className={s.sectionHead}>
          <span>首页核心入口</span>
          <h2>按产品、服务、行业和领域，找到适合你的数智化入口</h2>
          <p>不确定该先优化现有系统、打通数据接口，还是推进新平台？可以从产品能力、实施服务、典型行业和管理领域进入，快速找到与企业阶段匹配的方案。</p>
        </div>
        <div className={s.entryGroups}>
          <article className={s.entryGroup}>
            <div className={s.groupTitle}><span>Products</span><h3>产品</h3></div>
            <strong className={s.groupCardTitle}>看产品能力</strong>
            <p className={s.groupDesc}>了解 YonSuite 与用友BIP 如何支撑企业从业务在线、数据驱动到智能运营。</p>
            <Link href="/products/yonsuite"><strong>YonSuite</strong><em>成长型企业一体化 SaaS 云 ERP</em></Link>
            <Link href="/products/bip"><strong>用友BIP</strong><em>集团型企业数智化平台能力</em></Link>
          </article>
          <article className={s.entryGroup}>
            <div className={s.groupTitle}><span>Services</span><h3>服务</h3></div>
            <Link href="/services">
              <strong className={s.groupCardTitle}>看交付落地</strong>
            </Link>
            <p className={s.groupDesc}>了解泊冉如何围绕存量系统服务、实施交付、数据迁移、系统集成和上线运营提供服务。</p>
            <Link href="/services/implementation"><strong>实施服务</strong><em>YonSuite / 用友BIP 交付与上线</em></Link>
            <Link href="/services/operations"><strong>当前系统诊断</strong><em>运行状态、权限流程、报表接口与数据口径梳理</em></Link>
            <Link href="/services/migration-tools"><strong>U8 / NC 服务</strong><em>围绕财务、供应链、制造、集团管控持续优化</em></Link>
            <Link href="/services/integration-development"><strong>数据治理与系统集成</strong><em>主数据、接口集成、二次开发与报表优化</em></Link>
          </article>
          <article className={s.entryGroup}>
            <div className={s.groupTitle}><span>Industries</span><h3>典型行业</h3></div>
            <strong className={s.groupCardTitle}>看行业方案</strong>
            <p className={s.groupDesc}>按企业所在行业或组织形态，查看更贴近真实业务场景的解决方案。</p>
            <Link href="/products/bip"><strong>多组织集团</strong><em>集团管控、多组织协同、合并与主数据治理</em></Link>
            <Link href="/solution/industry/consumer-goods"><strong>消费品</strong><em>渠道订单、价格政策、库存周转与毛利</em></Link>
            <Link href="/solution/industry/manufacturing-yonsuite"><strong>个性化制造</strong><em>订单、BOM、计划、生产、质量与成本</em></Link>
            <Link href="/solution/industry/medical-pharma-yonsuite"><strong>医药医疗器械</strong><em>合规、追溯、渠道协同与经营分析</em></Link>
            <Link href="/solution/industry/modern-service"><strong>现代服务业</strong><em>项目、合同、交付、核算与经营分析</em></Link>
          </article>
          <article className={s.entryGroup}>
            <div className={s.groupTitle}><span>Domains</span><h3>领域</h3></div>
            <strong className={s.groupCardTitle}>看管理领域</strong>
            <p className={s.groupDesc}>按财务、人力、营销、全球化等专项管理问题进入对应方案。</p>
            <Link href="/solution/industry/global-operations"><strong>全球运营</strong><em>出海、多组织、财务供应链与合规</em></Link>
            <Link href="/solution/industry/consumer-goods"><strong>营销多渠道</strong><em>渠道订单、会员、价格政策与库存协同</em></Link>
            <Link href="/solution/business/intelligent-finance"><strong>智能财务</strong><em>业财融合、预算合并、全球多账簿</em></Link>
            <Link href="/solution/business/hrm"><strong>HR</strong><em>组织、员工自助、移动审批与人效分析</em></Link>
          </article>
        </div>
      </section>

      {/* Legacy System Section */}
      <section className={s.legacySection} id="legacy">
        <div className={s.section}>
          <div className={s.sectionHead}>
            <span className={s.eyebrow}>用友存量系统诊断</span>
            <h2>正在使用用友存量系统？先诊断当前问题，再规划优化路径</h2>
            <p>
              很多企业的核心业务仍然运行在畅捷通T、U8、U9、U8C、NC 等用友存量系统上，其中 U8 和 NC 是泊冉重点服务的主流客户群。泊冉不会简单建议企业马上替换系统，而是先结合企业现有系统状态评估是继续优化、局部扩展、系统集成，还是分阶段升级到 YonSuite / 用友BIP。
            </p>
          </div>
          <div className={s.legacyCards}>
            <a className={s.legacyCard} href="#contact">
              <span>01</span>
              <h3>当前系统运维与售后服务</h3>
              <p>适合当前畅捷通T、U8、U9、U8C、NC 仍在承载核心业务，但需要处理权限、报表、流程、接口、月结等问题的企业。</p>
              <em>预约当前系统诊断</em>
            </a>
            <a className={`${s.legacyCard} ${s.legacyCardIsFeatured}`} href="#contact">
              <span>02</span>
              <h3>U8 / NC 主流客户服务</h3>
              <p>适合正在使用 U8 或 NC 的企业，围绕财务、供应链、制造、集团管控、预算、合并报表等场景提供持续服务。</p>
              <em>咨询 U8 / NC 服务方案</em>
            </a>
            <a className={s.legacyCard} href="#contact">
              <span>03</span>
              <h3>评估 YonSuite / BIP 升级路径</h3>
              <p>适合多组织、多渠道、全球运营、业财一体化需求增长，当前系统扩展难度增加的企业。</p>
              <em>评估升级路径</em>
            </a>
          </div>
        </div>
      </section>

      {/* Recent Posts Section (Blog) */}
      <section className={s.section} id="posts">
        <div className={s.sectionHead}>
          <span>泊冉观察</span>
          <h2>最新的数智化洞察与行业实践</h2>
          <p>我们分享在用友系统实施、业务流程优化以及 AI 数字员工落地过程中的实战经验。</p>
        </div>
        <div className={s.postsGrid}>
          {latestPosts.map((post) => (
            <Link key={post.id} href={`/posts/${post.slug}`} className={s.postCard}>
              <div className={s.postImage}>
                {post.meta?.image && typeof post.meta.image !== 'string' && (
                  <Image
                    src={post.meta.image.url || ''}
                    alt={post.title}
                    width={400}
                    height={225}
                    className="object-cover w-full h-full"
                  />
                )}
              </div>
              <div className={s.postContent}>
                <h3 className={s.postTitle}>{post.title}</h3>
                <p className={s.postExcerpt}>{post.meta?.description}</p>
                <div className={s.postFooter}>
                  <span>{new Date(post.publishedAt || '').toLocaleDateString('zh-CN')}</span>
                  <span>阅读更多 →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/posts" className={s.btnSecondary} style={{ color: 'var(--boran-blue)', borderColor: 'var(--boran-blue)' }}>
            查看更多观察文章
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={s.section} id="faq">
        <div className={s.sectionHead}>
          <span>FAQ</span>
          <h2>企业评估当前系统服务与未来平台升级时，常问这些问题</h2>
        </div>
        <div className={s.faqList}>
          <details>
            <summary>泊冉的定位是什么？</summary>
            <p>泊冉软件定位为用友存量系统持续服务、YonSuite / 用友BIP 实施交付与行业数智化解决方案服务商。我们先服务好企业当前正在运行的系统，再结合业务发展阶段评估优化、扩展、集成或升级路径。</p>
          </details>
          <details>
            <summary>泊冉是否还服务畅捷通T、U8、U9、U8C、NC 等用友存量系统客户？</summary>
            <p>是。泊冉继续服务畅捷通T、U8、U9、U8C、NC 等用友存量系统客户，其中 U8 和 NC 是当前主流服务对象。服务内容包括系统运维、问题排查、权限流程梳理、报表优化、二次开发、接口集成、数据治理和升级路径评估。</p>
          </details>
          <details>
            <summary>使用 U8 或 NC 的企业是否一定要升级到 YonSuite / BIP？</summary>
            <p>不一定。U8 和 NC 承载了很多企业多年的业务数据、财务口径和管理流程。企业应先评估当前系统稳定性、业务复杂度、扩展需求和未来发展目标，再判断是继续优化、局部扩展、系统集成，还是分阶段升级到 YonSuite / 用友BIP。</p>
          </details>
        </div>
      </section>

      {/* Contact Section */}
      <section className={s.section} id="contact">
        <div className={s.contactSection}>
          <div className={s.contactCopy}>
            <span className={s.eyebrow}>预约当前系统诊断</span>
            <h2>把当前系统、业务问题和升级意向说清楚，泊冉顾问会据此沟通路径</h2>
            <p>建议填写当前系统、关注方向、行业和计划时间。泊冉会优先判断当前系统是否需要先优化、是否存在集成与数据治理问题。</p>
            <div className={s.contactDirect}>
              <a href="tel:400-9955-161">400-9955-161</a>
              <span>工作日顾问响应</span>
            </div>
          </div>
          <form className={s.leadForm} onSubmit={handleSubmit} noValidate>
            <div className={s.fieldGrid}>
              <label>
                <span>姓名 <b>*</b></span>
                <input name="name" type="text" autoComplete="name" placeholder="您的姓名" required />
              </label>
              <label>
                <span>公司名称 <b>*</b></span>
                <input name="company" type="text" autoComplete="organization" placeholder="您的公司" required />
              </label>
            </div>
            <div className={s.fieldGrid}>
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
              <textarea name="message" rows={4} placeholder="例如：U8 月结报表慢、NC 权限流程需要梳理、接口数据不一致、历史数据迁移等"></textarea>
            </label>
            {hint.msg && (
              <p className={`${s.formHint} ${hint.type === 'error' ? s.formHintError : s.formHintSuccess}`}>
                {hint.msg}
              </p>
            )}
            <button className={s.formSubmit} type="submit" disabled={loading}>
              {loading ? '提交中...' : '提交评估需求'}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
