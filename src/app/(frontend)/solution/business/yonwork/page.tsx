import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  Bot,
  Boxes,
  CheckCircle2,
  LayoutDashboard,
  LineChart,
  MessageSquareText,
  ReceiptText,
  ShieldCheck,
  Ship,
  Users,
  Workflow,
  Zap,
} from 'lucide-react'
import { GeoSection } from '@/components/GeoSection'
import { SeoH1 } from '@/components/SeoH1'
import { GEOJsonLd } from '@/components/GEOJsonLd'

const capabilities = [
  {
    title: '从对话到行动',
    desc: '像对话一样提需求，YonWork 不只理解、分析、给建议，更能直接调用系统能力完成复杂执行。从“问 AI”到“让 AI 干”，进入可执行、可追踪、可闭环的阶段。',
    icon: MessageSquareText,
    color: 'text-blue-600',
    bg: 'bg-blue-50/50',
    borderColor: 'border-blue-100',
  },
  {
    title: '懂职责、懂权限、懂上下文',
    desc: '原生理解角色、权限与工作上下文，持续记忆偏好与习惯。对开放性目标自主拆解、调用技能、执行回写；对严流程与人和流程协同，关键动作可控、可审、可交接。',
    icon: Bot,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50/50',
    borderColor: 'border-indigo-100',
  },
  {
    title: '全程可控、可审计、可信赖',
    desc: '在任务执行全程嵌入安全机制——数据边界、身份权限、分级审批。精确界定谁能访问哪些数据、哪些操作需确认，并保留完整执行记录，每一步可追溯、可查验、可复盘。',
    icon: ShieldCheck,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50/50',
    borderColor: 'border-emerald-100',
  },
  {
    title: '技能中心沉淀经验',
    desc: '把业务规则、流程经验、系统操作与最佳实践封装为可复用技能。企业沉淀组织能力，员工提炼个人方法论，构建专属“数字分身”助手，让 AI 更懂业务。',
    icon: Workflow,
    color: 'text-cyan-600',
    bg: 'bg-cyan-50/50',
    borderColor: 'border-cyan-100',
  },
]

// 产品能力全景 —— 充分利用 YonWork 官网产品截图
const productFeatures = [
  {
    title: '智能工作台',
    tag: '按需组装 · 一屏掌控',
    desc: '提供丰富插件组件，支持按需启用、自由拖拽布局，打造个性化工作视图。每张卡片可承载动态提示词、定时任务与业务进展，让企业从单一入口完成理解、判断、执行与跟踪，把工作台变成 AI 指挥中心。',
    points: ['按需装配插件组件', '自由拖拽个性化布局', '动态提示词 + 定时任务 + 业务进展'],
    image: '/images/solutions/yonwork-workbench.png',
    alt: 'YonWork 智能工作台自由拖拽布局界面',
    width: 1119,
    height: 646,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: '技能中心',
    tag: '把经验变成资产',
    desc: '企业级、安全可控的技能中心，把业务规则、流程经验、系统操作与最佳实践封装为可复用技能。企业沉淀组织能力，员工提炼个人方法论，构建专属“数字分身”助手，让 AI 越来越懂业务。',
    points: ['业务规则与最佳实践封装', '组织能力持续沉淀', '个人方法论凝练为数字分身'],
    image: '/images/solutions/yonwork-skill.png',
    alt: 'YonWork 技能中心技能卡片管理界面',
    width: 882,
    height: 630,
    color: 'bg-cyan-50 text-cyan-600',
  },
  {
    title: '深度接入业务系统',
    tag: '松耦合 · 实时可视化',
    desc: '以松耦合方式连接 BIP 旗舰版、BIP 高级版、U9C 及各类异构系统，不依赖单一底座，让所有业务系统都能被 YonWork 接入、理解和调度，无需在多个应用间切换，所有工作进度一屏尽览、实时感知并提醒关键节点。',
    points: ['连接 BIP / U9C 等系统', '异构系统统一调度', '关键节点实时感知'],
    image: '/images/solutions/yonwork-integration.png',
    alt: 'YonWork 深度接入业务系统统一调度界面',
    width: 913,
    height: 630,
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    title: '灵活部署',
    tag: '云上 · 本地，随心选择',
    desc: '根据客户环境与使用诉求灵活选择产品形态，既可云上形态提供统一入口与持续运行能力，也可本地形态深度连接用户终端环境；无论 BIP 采用公有云、专属云、本地部署还是一体机方式，均可接入并使用 YonWork。',
    points: ['云上 / 本地形态随心选择', '统一入口与持续运行', '兼容 BIP 全形态部署'],
    image: '/images/solutions/yonwork-deploy.png',
    alt: 'YonWork 灵活部署模式概览界面',
    width: 934,
    height: 620,
    color: 'bg-indigo-50 text-indigo-600',
  },
]

// 价值场景 —— 泊冉帮企业做什么（含 传统 vs 智能 对比）
const scenarios = [
  {
    num: '01',
    title: '费用管控：一次报销全流程闭环',
    desc: '把报销从“员工填单 + 财务核对”升级为“发票识别、合规生成、实时查数”的闭环费用管控，全流程自动处理、可追踪。',
    before: '员工逐张找发票、手工填单，财务逐单核对，周期长、易漏易错。',
    after: '一张报销单据，AI 自动识别发票、生成合规凭证、实时查数，全流程闭环可追踪。',
    icon: ReceiptText,
    color: 'bg-blue-50 text-blue-600',
    image: '/images/solutions/yonwork-expense.png',
    alt: 'YonWork 报销单据自动识别与合规处理界面',
    width: 966,
    height: 640,
  },
  {
    num: '02',
    title: '经营决策：CXO 追问秒变决策材料',
    desc: '把业务分析从“等报表”升级为“边追问、边定位原因、边模拟推演、边形成决策材料”，让经营分析会更快、更准。',
    before: '会前等财务出报表，会上靠人工翻数、凭经验判断，难形成可落地的决策材料。',
    after: 'CXO 边追问、AI 边定位原因、模拟推演，直接产出结构化决策材料，会议效率倍增。',
    icon: LineChart,
    color: 'bg-indigo-50 text-indigo-600',
    image: '/images/solutions/yonwork-decision.png',
    alt: 'YonWork 经营决策分析与模拟推演界面',
    width: 865,
    height: 560,
  },
  {
    num: '03',
    title: '人才管理：从效率分析到干预落地',
    desc: '把分散在多个角色与系统的判断，整合为一条驱动执行的人才管理链，覆盖效率分析、人才保留与绩效干预。',
    before: '效率数据、人才保留、绩效干预分散在不同角色与系统，判断靠人工拼凑。',
    after: '一条贯穿效率分析、人才保留到绩效干预的整链，AI 驱动执行、主动干预落地。',
    icon: Users,
    color: 'bg-emerald-50 text-emerald-600',
    image: '/images/solutions/yonwork-talent.png',
    alt: 'YonWork 人才管理智能工作台界面',
    width: 930,
    height: 640,
  },
  {
    num: '04',
    title: '订单履约：一条邮件跑通全链',
    desc: '把订单履约从邮件、单据、出库、开票的分散处理，升级为一条可追踪、可闭环的智能执行链。',
    before: '订单从客户邮件开始，经单据、出库、开票多环节手工流转，易断点、难追踪。',
    after: '一封客户订单邮件触发整条履约链：确认订单、出库、开票全自动执行并实时追踪。',
    icon: Ship,
    color: 'bg-cyan-50 text-cyan-600',
    image: '/images/solutions/yonwork-order.png',
    alt: 'YonWork 订单履约智能执行链界面',
    width: 865,
    height: 560,
  },
]

// 为什么选择泊冉 —— 合作伙伴差异化
const whyBoran = [
  {
    title: '懂用友体系',
    desc: '深耕 YonBIP / YonSuite / U8C 等用友产品多年，深刻理解产品能力边界与扩展方式，能把 YonWork 与既有用友系统无缝打通。',
    icon: Boxes,
    color: 'text-blue-600 bg-blue-50',
  },
  {
    title: '懂业务落地',
    desc: '不只是卖工具，更从企业真实业务场景切入，把 YonWork 能力转化为可量化、可落地、可运营的业务成果。',
    icon: Workflow,
    color: 'text-emerald-600 bg-emerald-50',
  },
  {
    title: '全程交付陪伴',
    desc: '从场景洞察、方案设计、配置落地到持续运营，泊冉实施团队全程陪伴，让 AI 越用越懂企业、越跑越有价值。',
    icon: Users,
    color: 'text-cyan-600 bg-cyan-50',
  },
  {
    title: '安全合规护航',
    desc: '严格遵循数据边界、身份权限与分级审批，确保智能体在执行全程可控、可审计、可信赖，杜绝越权与数据泄露。',
    icon: ShieldCheck,
    color: 'text-indigo-600 bg-indigo-50',
  },
]

const integrationSystems = ['YonBIP', 'YonSuite', 'BIP Advanced', 'U9C', 'U8C', '异构系统']

const steps = [
  {
    title: '业务洞察',
    desc: '泊冉顾问深入梳理企业核心流程，定位最适合 AI 执行的场景与高价值抓手。',
  },
  {
    title: '方案设计',
    desc: '结合 YonWork 能力设计智能体与技能中心蓝图，明确数据边界、权限与审批规则。',
  },
  {
    title: '配置落地',
    desc: '由泊冉实施团队完成智能体配置、技能封装与跨系统集成，打通业务闭环。',
  },
  {
    title: '持续运营',
    desc: '上线后持续优化提示词、沉淀技能、迭代场景，让 AI 越用越懂企业。',
  },
]

const faqs = [
  {
    question: 'YonWork 和企业普通 AI 问答助手有什么区别？',
    answer:
      'YonWork 是企业级 AI 执行智能体，不只是问答。它在理解问题、分析业务的基础上，能直接调用系统能力完成复杂执行，从“问 AI”变成“让 AI 干”，并全程可控、可审计、可追踪，把结果回写到业务系统。泊冉软件作为用友合作伙伴，专注把 YonWork 能力落地为企业可执行的业务场景。',
  },
  {
    question: '泊冉能帮企业用 YonWork 做什么？',
    answer:
      '泊冉从企业真实业务场景切入，帮助落地费用管控、经营决策、人才管理、订单履约等场景，提供场景梳理、智能体与技能中心设计、配置落地、跨系统集成与持续运营的全套服务，让 YonWork 产生可衡量的经营价值。',
  },
  {
    question: 'YonWork 能和企业现有的用友系统打通吗？',
    answer:
      '可以。YonWork 通过松耦合连接 YonBIP、YonSuite、BIP Advanced、U9C、U8C 以及各类异构系统，让所有业务流都能被连接、理解与编排。泊冉团队熟悉用友产品体系，能帮企业完成跨系统集成，消除多系统切换。',
  },
  {
    question: 'YonWork 支持哪些部署方式？',
    answer:
      'YonWork 支持公有云、专属云、本地部署等多种部署模式，安装简单、连接方便、统一管控与策略治理。泊冉会根据企业规模、成本与安全要求，给出合适的部署方案。',
  },
  {
    question: '引入 YonWork 需要企业做好准备吗？',
    answer:
      '建议先由泊冉进行业务洞察，梳理出最适合 AI 执行的高价值场景。泊冉会基于企业现有流程、系统与数据现状，设计落地方案并分阶段推进，降低上线风险。',
  },
]

export const metadata: Metadata = {
  title: 'YonWork 智能体应用解决方案 | 泊冉软件',
  description:
    '泊冉软件作为用友合作伙伴，帮助企业落地 YonWork 企业级 AI 执行智能体：从费用管控、经营决策到人才管理与订单履约，完成场景设计、智能体配置、跨系统集成与持续运营，让 AI 真正为企业干活。',
  keywords: [
    'YonWork',
    'AI智能体',
    '企业级AI',
    '智能工作台',
    '技能中心',
    'YonBIP',
    'YonSuite',
    '用友实施',
    '泊冉软件',
  ],
  openGraph: {
    title: 'YonWork 智能体应用解决方案',
    description: '泊冉软件帮企业把 YonWork 能力落地为可执行的业务场景，让 AI 不只是应答者，更是企业经营的执行者。',
  },
  alternates: {
    canonical: 'https://www.iboran.com/solution/business/yonwork',
  },
}

export default function YonWorkPage() {
  return (
    <>
      <SeoH1 title={metadata.title as string} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0F172A] py-20 md:py-28">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-2h-2v2h2zm0 4v-2h-2v2h2zm0-8v-2h-2v2h2zm0-4v-2h-2v2h2zM24 34v-2h-2v2h2zm0 4v-2h-2v2h2zm0-8v-2h-2v2h2zm0-4v-2h-2v2h2zM2 34v-2H0v2h2zm0 4v-2H0v2h2zm0-8v-2H0v2h2zm0-4v-2H0v2h2zm20 4v-2h-2v2h2zm0 4v-2h-2v2h2zm0-8v-2h-2v2h2zm0-4v-2h-2v2h2zM6 34v-2H4v2h2zm0 4v-2H4v2h2zm0-8v-2H4v2h2zm0-4v-2H4v2h2zm20 4v-2h-2v2h2zm0 4v-2h-2v2h2zm0-8v-2h-2v2h2zm0-4v-2h-2v2h2zm6 4v-2h-2v2h2zm0 4v-2h-2v2h2zm0-8v-2h-2v2h2zm0-4v-2h-2v2h2zm20 4v-2h-2v2h2zm0 4v-2h-2v2h2zm0-8v-2h-2v2h2zm0-4v-2h-2v2h2zm-4 4v-2h-2v2h2zm0 4v-2h-2v2h2zm0-8v-2h-2v2h2zm0-4v-2h-2v2h2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-black leading-[1.15] text-white sm:text-5xl lg:text-6xl tracking-tight">
                让 AI 真正为企业干活
                <span className="block text-blue-400 mt-3">泊冉帮你把 YonWork 落地</span>
              </h1>
              <p className="mt-8 text-lg leading-relaxed text-slate-300 md:text-xl max-w-xl font-medium">
                YonWork 是企业级 AI 执行智能体——开口即执行，从对话到行动。
                泊冉软件作为用友合作伙伴，帮你把 YonWork 能力落地为可执行的业务场景：
                从费用管控、经营决策到人才管理与订单履约，全流程闭环。
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-500 hover:shadow-blue-500/40 active:scale-[0.98]"
                >
                  预约泊冉专家咨询
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="https://yonwork.diwork.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-800/50 px-8 py-4 text-base font-bold text-white backdrop-blur-md transition-all hover:bg-slate-800 hover:border-slate-600 active:scale-[0.98]"
                >
                  了解 YonWork 产品
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl border border-slate-700/60 shadow-2xl shadow-blue-900/30 bg-white overflow-hidden">
                <Image
                  src="/images/solutions/yonwork-hero-full.png"
                  alt="YonWork 智能体对话执行界面截图"
                  width={1910}
                  height={1264}
                  className="block w-full h-auto"
                  priority
                />
              </div>
              <div className="absolute -bottom-5 -left-5 hidden rounded-xl border border-slate-700 bg-slate-900/90 p-4 shadow-xl backdrop-blur-md md:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">AI 执行中</p>
                    <p className="text-xs text-slate-400">报销、决策、履约全闭环</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Features Panorama — 充分利用产品截图 */}
      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center gap-3">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
              YonWork 产品能力全景
            </h2>
            <p className="text-slate-500 font-medium">
              智能工作台、技能中心、跨系统集成、灵活部署——四大能力让 AI 真正嵌入企业经营
            </p>
          </div>

          <div className="mx-auto flex max-w-6xl flex-col gap-12">
            {productFeatures.map((item: any, idx: number) => {
              const reversed = idx % 2 === 1
              return (
                <div
                  key={item.title}
                  className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
                >
                  <div className={`flex flex-col gap-4 ${reversed ? 'lg:order-2' : ''}`}>
                    <span className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${item.color}`}>
                      {item.tag}
                    </span>
                    <h3 className="text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
                      {item.title}
                    </h3>
                    <p className="text-base leading-relaxed text-slate-600">{item.desc}</p>
                    <ul className="flex flex-col gap-3">
                      {item.points.map((p: string) => (
                        <li key={p} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
                          <span className="text-slate-700 font-medium">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`overflow-hidden rounded-2xl border border-slate-200 shadow-lg ${reversed ? 'lg:order-1' : ''}`}>
                    <Image
                      src={item.image}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      className="h-auto w-full"
                      loading="lazy"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Core Capabilities Section */}
      <section className="relative bg-slate-50 py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center gap-3">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
              YonWork 能做什么
            </h2>
            <p className="text-slate-500 font-medium">
              不止回答，更能执行——以安全可控为前提，把复杂业务交给懂业务、可执行、能治理的智能体
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {capabilities.map((item: any) => {
              const Icon = item.icon
              return (
                <article
                  key={item.title}
                  className={`group h-full rounded-2xl border ${item.borderColor} ${item.bg} p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50`}
                >
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-transform group-hover:scale-110`}>
                    <Icon className={`h-7 w-7 ${item.color}`} />
                  </div>
                  <h3 className="mt-6 text-2xl font-black tracking-tight text-slate-900">{item.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-slate-600 font-medium">{item.desc}</p>
                </article>
              )
            })}
          </div>

          {/* Integration strip */}
          <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
              <div className="flex items-center gap-3">
                <LayoutDashboard className="h-6 w-6 text-blue-600" />
                <p className="font-bold text-slate-900">跨系统业务集成，实时掌控关键进展</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {integrationSystems.map((sys) => (
                  <span
                    key={sys}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-semibold text-slate-600"
                  >
                    {sys}
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-slate-500 md:text-left">
              松耦合连接 YonBIP、YonSuite、BIP Advanced、U9C、U8C 及异构系统，所有业务流可被 YonWork 连接、理解与编排，无需在多应用间切换。
            </p>
          </div>
        </div>
      </section>

      {/* Landing Scenarios Section — 泊冉帮企业做什么 */}
      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center gap-3">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
              泊冉帮企业利用 YonWork 做什么
            </h2>
            <p className="text-slate-500 font-medium">
              不止是工具，更是一套可落地的业务解决方案——从场景切入，让 AI 直接产生业务价值
            </p>
          </div>

          <div className="mx-auto flex max-w-5xl flex-col gap-10">
            {scenarios.map((item: any, idx: number) => {
              const Icon = item.icon
              const reversed = idx % 2 === 1
              return (
                <div
                  key={item.title}
                  className="grid items-center gap-8 rounded-2xl border border-slate-100 bg-slate-50 p-6 md:grid-cols-2 md:p-8"
                >
                  <div className={`flex flex-col gap-4 ${reversed ? 'md:order-2' : ''}`}>
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${item.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-black tracking-tight text-slate-900">{item.title}</h3>
                    <p className="text-base leading-relaxed text-slate-600">{item.desc}</p>

                    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-slate-200 text-[10px] font-black text-slate-500">前</span>
                        <p className="text-sm text-slate-500">{item.before}</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-black text-emerald-600">后</span>
                        <p className="text-sm font-medium text-slate-700">{item.after}</p>
                      </div>
                    </div>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition-colors hover:text-blue-700"
                    >
                      了解泊冉如何落地
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <div className={`overflow-hidden rounded-2xl border border-slate-200 shadow-lg ${reversed ? 'md:order-1' : ''}`}>
                    <Image
                      src={item.image}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      className="h-auto w-full"
                      loading="lazy"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Boran — 为什么选择泊冉 */}
      <section className="bg-slate-50 py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center gap-3">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
              为什么选择泊冉落地 YonWork
            </h2>
            <p className="text-slate-500 font-medium">
              用友合作伙伴，不是卖工具，而是把 YonWork 变成企业的经营成果
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {whyBoran.map((item: any) => {
              const Icon = item.icon
              return (
                <article
                  key={item.title}
                  className="group h-full rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50"
                >
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${item.color} transition-transform group-hover:scale-110`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-xl font-black tracking-tight text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Implementation Steps — 泊冉实施路径 */}
      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center gap-3">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
              泊冉如何帮企业落地
            </h2>
            <p className="text-slate-500 font-medium">
              从场景洞察到持续运营，一套清晰的实施路径，让 YonWork 真正跑起来
            </p>
          </div>

          <div className="mx-auto max-w-5xl">
            <div className="relative grid grid-cols-1 gap-12 md:grid-cols-4">
              <div className="absolute top-[3.5rem] left-[12%] right-[12%] hidden h-[2px] bg-slate-200 md:block" />
              {steps.map((step: any, idx: number) => (
                <div key={step.title} className="relative z-10 flex flex-col items-center text-center">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-black text-white shadow-lg shadow-blue-200">
                    {idx + 1}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-slate-50 py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center gap-3">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
              常见问题
            </h2>
            <p className="text-slate-500 font-medium">
              关于 YonWork 与泊冉落地服务，你可能想问的这些
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200 bg-white p-6 open:shadow-md"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
                  <span className="text-lg font-bold text-slate-900">{faq.question}</span>
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-transform group-open:rotate-45">
                    <Zap className="h-4 w-4" />
                  </span>
                </summary>
                <p className="mt-4 text-base leading-relaxed text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Value / CTA Section */}
      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl bg-slate-900 px-8 py-16 text-center shadow-2xl">
            <div className="absolute top-0 right-[-10%] h-[200px] w-[200px] rounded-full bg-blue-500/8 blur-[80px]" />
            <div className="absolute bottom-0 left-[-10%] h-[200px] w-[200px] rounded-full bg-cyan-500/8 blur-[80px]" />

            <div className="relative z-10">
              <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl lg:text-5xl">
                让 YonWork 从工具变成业务成果
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
                泊冉软件作为用友 YonWork 实施与定制服务伙伴，从场景梳理到智能体落地，
                把 YonWork 能力真正嵌进你的业务流程，让 AI 产生可衡量的经营价值。
              </p>
              <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-10 py-4 text-base font-bold text-slate-900 transition-all hover:bg-slate-100 active:scale-[0.98]"
                >
                  预约泊冉专家咨询
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="https://yonwork.diwork.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-800/50 px-10 py-4 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-slate-800 active:scale-[0.98]"
                >
                  前往 YonWork 产品官网
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GeoSection
        title={metadata.title as string}
        description={metadata.description as string}
        keywords={metadata.keywords}
        url="https://www.iboran.com/solution/business/yonwork"
        variant="solution"
        showDecisionFramework
      />

      <GEOJsonLd
        title={metadata.title as string}
        description={metadata.description as string}
        faqs={faqs}
        url="https://www.iboran.com/solution/business/yonwork"
        image="https://www.iboran.com/images/solutions/yonwork-workbench.png"
      />
    </>
  )
}