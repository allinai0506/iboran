// 用友YonSuite 产品专题 - 结构化数据（提取自源页面，忠实还原文案）
export type FaqItem = { q: string; a: string }
export type Industry = { key: string; label: string; html: string }

export const faqItems: FaqItem[] = [
  {
    "q": "用友YonSuite是什么？",
    "a": "用友YonSuite是面向成长型企业的一体化SaaS商业创新平台，覆盖财务、人力、供应链、营销、采购、制造、研发、项目、资产、协同等核心业务，并融合企业AI、ChatBI、智能体、低代码和集成能力。"
  },
  {
    "q": "YonSuite适合什么企业？",
    "a": "YonSuite适合业务快速增长、组织复杂度提升、需要打通多部门、多组织、多渠道、多系统和多区域管理的成长型企业，尤其适合制造、现代服务、医药与医疗、消费品、IP运营、新能源、新材料、芯片研发和跨境经营企业。"
  },
  {
    "q": "YonSuite和传统ERP有什么区别？",
    "a": "YonSuite更强调云原生、一体化SaaS、全场景应用和AI能力。它不是只解决某个部门的信息化，而是帮助企业把财务、人力、供应链、营销、制造、项目、协同和经营分析放在统一数智底座上。"
  },
  {
    "q": "YonSuite是否支持AI？",
    "a": "支持。YonSuite的AI能力包括智友、ChatBI、智能体、智能助理、AI+财务、AI+人力、AI+供应链、AI+采购、AI+制造、AI+营销、AI+协同等。实际落地时应结合企业数据、权限和流程设计使用边界。"
  },
  {
    "q": "YonSuite可以从单个场景先试点吗？",
    "a": "可以。企业可先从业财一体化、费用报销、采购管理、库存预警、项目核算、经销商订货、ChatBI经营问数等场景试点，再逐步扩展到更多业务域。"
  },
  {
    "q": "YonSuite是否适合制造企业？",
    "a": "适合。YonSuite制造行业方案覆盖研发设计、采购、生产计划、生产订单、质量管理、委外、库存、成本和财务分析等场景，适合需要研产供销一体化和精细成本管控的制造企业。"
  },
  {
    "q": "YonSuite是否适合医药行业？",
    "a": "适合。YonSuite医药行业方案关注GMP/GSP、CSV验证、UDI、电子批记录、DMS文控、质量控制、研发注册项目和业财一体化等场景。具体落地需要结合企业质量体系和监管要求确认。"
  },
  {
    "q": "YonSuite是否支持跨境和全球化经营？",
    "a": "支持。YonSuite具备多语言、多时区、多格式、多币种、多会计准则、多税制、多数据中心和本地化能力，适合出海企业和跨境经营企业评估。"
  },
  {
    "q": "泊冉能提供哪些YonSuite服务？",
    "a": "泊冉可提供YonSuite咨询、业务诊断、方案设计、实施上线、数据治理、系统集成、培训、AI场景共创、运维优化和行业化落地服务。"
  },
  {
    "q": "YonSuite项目周期通常多久？",
    "a": "周期取决于组织范围、业务域数量、数据准备和集成复杂度。单场景试点通常可先按阶段推进，完整多组织、多业务域上线需要在诊断和蓝图阶段评估。"
  },
  {
    "q": "YonSuite能否与现有系统集成？",
    "a": "可以评估与OA、CRM、MES、WMS、TMS、电商平台、银行、税务、主数据和数据平台等系统集成。具体接口、权限和数据同步方式需要结合企业现有系统环境设计。"
  },
  {
    "q": "AI能否自动完成审批、付款和入账？",
    "a": "不建议把高风险动作写成完全自动。AI可以辅助生成建议、草稿、预警和分析结果，但涉及审批、付款、税务、入账、合同生效等动作，应由授权人员确认后执行。"
  }
]

export const industries: Industry[] = [
  {
    "key": "manufacturing",
    "label": "制造业",
    "html": "<span>制造业</span><h3>交付、齐套与成本先闭环</h3>\n              <p class=\"industry-summary\">先把订单、BOM、采购、生产、质量和成本接到同一条链路上，让交期、库存和制造毛利不再靠事后追数。</p>\n              <div class=\"industry-fields\">\n                <div><strong>适合企业</strong><p>装备制造、电子、汽配、包装、化工、离散制造和项目制造企业。</p></div>\n                <div><strong>优先试点场景</strong><p>产供销一体化、BOM变更、采购齐套、质量追溯、成本核算。</p></div>\n                <div><strong>典型痛点</strong><p>交期风险发现晚，库存与计划不同步，制造成本看不清。</p></div>\n                <div><strong>推荐方案</strong><p>销售订单驱动计划、采购、生产、库存、质量和财务成本闭环。</p></div>\n                <div><strong>可跟踪指标</strong><p>准交率、齐套率、库存周转、制造成本偏差、一次合格率。</p></div>\n                <div><strong>适配主题</strong><p>制造业YonSuite、智能制造、产供销一体化、BOM管理、制造成本</p></div>\n              </div>"
  },
  {
    "key": "service",
    "label": "现代服务业",
    "html": "<span>现代服务业</span><h3>项目预算、工时与毛利先闭环</h3>\n              <p class=\"industry-summary\">把商机、合同、项目、工时、费用、开票和回款串起来，让项目负责人在过程中看见利润，而不是结项后再复盘。</p>\n              <div class=\"industry-fields\">\n                <div><strong>适合企业</strong><p>IT服务、咨询服务、工程服务、检测认证、广告传媒和专业服务企业。</p></div>\n                <div><strong>优先试点场景</strong><p>项目立项、工时、费用、采购外包、收入确认、项目毛利分析。</p></div>\n                <div><strong>典型痛点</strong><p>项目多、费用散、收入确认滞后，项目做完才知道赚不赚钱。</p></div>\n                <div><strong>推荐方案</strong><p>商机、合同、项目、工时、费用、开票、回款和毛利一体化。</p></div>\n                <div><strong>可跟踪指标</strong><p>项目毛利、预算消耗、工时投入、回款周期、交付延期率。</p></div>\n                <div><strong>适配主题</strong><p>现代服务业ERP、项目型企业ERP、项目核算、项目毛利</p></div>\n              </div>"
  },
  {
    "key": "medical",
    "label": "医药与医疗",
    "html": "<span>医药与医疗</span><h3>批号效期、证照与追溯先闭环</h3>\n              <p class=\"industry-summary\">先把合规资料、批次流向、质量记录和财务库存统一起来，让风险预警和追溯查询成为日常管理动作。</p>\n              <div class=\"industry-fields\">\n                <div><strong>适合企业</strong><p>医药流通、药品批发、制药、医疗器械、耗材和医疗服务企业。</p></div>\n                <div><strong>优先试点场景</strong><p>GMP/GSP、UDI、CSV验证、批号效期、资质证照、财务库存一体化。</p></div>\n                <div><strong>典型痛点</strong><p>合规资料分散，批次追溯难，证照到期和近效期风险发现晚。</p></div>\n                <div><strong>推荐方案</strong><p>把质量记录、采购库存、销售出库、追溯和财务核算放进同一闭环。</p></div>\n                <div><strong>可跟踪指标</strong><p>证照到期处理率、近效期库存占比、追溯查询时长、账实一致率。</p></div>\n                <div><strong>适配主题</strong><p>医药行业ERP、医疗器械ERP、GSP管理、UDI管理、医药YonSuite</p></div>\n              </div>"
  },
  {
    "key": "consumer",
    "label": "消费品",
    "html": "<span>消费品</span><h3>渠道、SKU与促销费用先闭环</h3>\n              <p class=\"industry-summary\">先打通渠道订单、价格政策、促销费用、库存和回款，让动销、毛利和经销商对账落到同一张经营图。</p>\n              <div class=\"industry-fields\">\n                <div><strong>适合企业</strong><p>食品饮料、日化、美妆、家居、服饰、连锁和经销分销企业。</p></div>\n                <div><strong>优先试点场景</strong><p>全渠道订单、价格政策、促销费用、门店补货、经销商对账。</p></div>\n                <div><strong>典型痛点</strong><p>渠道库存不清，促销费用难核，SKU利润和经销商回款难分析。</p></div>\n                <div><strong>推荐方案</strong><p>客户、渠道、订单、库存、促销、费用、对账和回款一体化。</p></div>\n                <div><strong>可跟踪指标</strong><p>库存周转、渠道动销、促销ROI、低毛利订单、对账差异率。</p></div>\n                <div><strong>适配主题</strong><p>消费品YonSuite、渠道ERP、全渠道营销、经销商管理、SKU利润</p></div>\n              </div>"
  },
  {
    "key": "ip",
    "label": "IP运营",
    "html": "<span>IP运营</span><h3>IP授权与版税结算先闭环</h3>\n              <p class=\"industry-summary\">先把IP档案、授权合同、衍生品SKU、渠道销售和版税应收接起来，减少分账、对账和到期管理的反复确认。</p>\n              <div class=\"industry-fields\">\n                <div><strong>适合企业</strong><p>文创、动漫、游戏、潮玩、品牌授权、版权代理和IP衍生品企业。</p></div>\n                <div><strong>优先试点场景</strong><p>IP立项、授权合同、版税结算、商品开发、渠道订单和库存。</p></div>\n                <div><strong>典型痛点</strong><p>授权规则复杂，分账口径不一，渠道销售、库存和费用难对齐。</p></div>\n                <div><strong>推荐方案</strong><p>打通IP档案、合同授权、衍生品SKU、渠道订单、版税应收和财务核算。</p></div>\n                <div><strong>可跟踪指标</strong><p>授权收入、版税应收、SKU动销、渠道毛利、合同到期预警。</p></div>\n                <div><strong>适配主题</strong><p>IP运营ERP、版权授权管理、版税结算、文创消费品、YonSuite IP</p></div>\n              </div>"
  },
  {
    "key": "new-energy",
    "label": "新能源",
    "html": "<span>新能源</span><h3>项目交付与质量追溯先闭环</h3>\n              <p class=\"industry-summary\">围绕项目订单、物料齐套、质量追溯、售后工单和成本归集，先把交付现场和经营结果连起来。</p>\n              <div class=\"industry-fields\">\n                <div><strong>适合企业</strong><p>光伏、储能、充电设备、电池配套、能源工程和新能源装备企业。</p></div>\n                <div><strong>优先试点场景</strong><p>项目订单、BOM齐套、采购交付、质量追溯、售后工单和成本核算。</p></div>\n                <div><strong>典型痛点</strong><p>项目周期长，物料价格波动大，质保和现场服务成本难及时归集。</p></div>\n                <div><strong>推荐方案</strong><p>订单驱动计划、采购、生产、仓储、交付、售后和项目成本一体化。</p></div>\n                <div><strong>可跟踪指标</strong><p>准交率、齐套率、质保成本、项目毛利、售后响应时长。</p></div>\n                <div><strong>适配主题</strong><p>新能源ERP、储能项目管理、质量追溯、售后服务、YonSuite新能源</p></div>\n              </div>"
  },
  {
    "key": "new-materials",
    "label": "新材料",
    "html": "<span>新材料</span><h3>配方研发与批次质量先闭环</h3>\n              <p class=\"industry-summary\">从配方版本、试制转产、批次质量、原料库存和成本波动切入，让研发、生产、质量和报价使用同一套数据。</p>\n              <div class=\"industry-fields\">\n                <div><strong>适合企业</strong><p>高分子、复合材料、精细化工、涂料、膜材、金属材料和功能材料企业。</p></div>\n                <div><strong>优先试点场景</strong><p>配方版本、试制转产、批次质量、原料库存、成本核算和合规资料。</p></div>\n                <div><strong>典型痛点</strong><p>配方版本多，批次追溯难，原料价格波动影响成本和报价。</p></div>\n                <div><strong>推荐方案</strong><p>研发配方、BOM工艺、采购库存、批次质量、销售报价和财务成本闭环。</p></div>\n                <div><strong>可跟踪指标</strong><p>批次合格率、成本偏差、库存库龄、追溯时长、配方变更周期。</p></div>\n                <div><strong>适配主题</strong><p>新材料ERP、配方管理、批次追溯、质量管理、材料成本</p></div>\n              </div>"
  },
  {
    "key": "chip-rd",
    "label": "芯片研发",
    "html": "<span>芯片研发</span><h3>研发项目、流片预算与费用归集</h3>\n              <p class=\"industry-summary\">先把研发里程碑、IP/EDA采购、样品物料、流片费用和项目核算统一起来，让预算偏差更早暴露。</p>\n              <div class=\"industry-fields\">\n                <div><strong>适合企业</strong><p>芯片设计、半导体研发、EDA/IP服务、传感器设计和研发型硬科技企业。</p></div>\n                <div><strong>优先试点场景</strong><p>研发立项、里程碑、样品物料、IP/EDA采购、流片费用和项目核算。</p></div>\n                <div><strong>典型痛点</strong><p>研发周期长，版本和费用口径复杂，项目预算与实际消耗难及时对齐。</p></div>\n                <div><strong>推荐方案</strong><p>项目、采购、资产、费用、合同、付款和研发成本归集一体化。</p></div>\n                <div><strong>可跟踪指标</strong><p>预算偏差、里程碑达成率、流片费用、研发投入、供应商交付周期。</p></div>\n                <div><strong>适配主题</strong><p>芯片研发ERP、半导体研发管理、研发项目核算、IP授权、EDA费用</p></div>\n              </div>"
  },
  {
    "key": "global",
    "label": "跨境与全球化",
    "html": "<span>跨境与全球化</span><h3>订单、库存、币种与结算统一</h3>\n              <p class=\"industry-summary\">先把平台订单、海外仓库存、多币种结算和全球财务核算放到同一口径，管理层才能看清利润和风险。</p>\n              <div class=\"industry-fields\">\n                <div><strong>适合企业</strong><p>跨境电商、出海品牌、海外仓、多国家经营和全球供应链企业。</p></div>\n                <div><strong>优先试点场景</strong><p>平台订单、海外仓库存、SKU利润、汇率影响、全球财务核算。</p></div>\n                <div><strong>典型痛点</strong><p>多平台、多币种、多税制、多语言和本地化经营数据割裂。</p></div>\n                <div><strong>推荐方案</strong><p>统一订单、库存、采购、销售、结算、财务和经营分析口径。</p></div>\n                <div><strong>可跟踪指标</strong><p>SKU毛利、海外仓周转、物流费用率、汇兑影响、断货率。</p></div>\n                <div><strong>适配主题</strong><p>跨境企业ERP、全球化ERP、海外仓ERP、多币种ERP、跨境YonSuite</p></div>\n              </div>"
  }
]
