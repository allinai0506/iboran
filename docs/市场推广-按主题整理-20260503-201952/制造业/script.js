const scenarioData = {
  ai: {
    kicker: "KEY SCENARIO 01",
    title: "YonSuite AI+全场景：助力制造企业智能运营",
    body:
      "YonSuite 企业 AI 以统一数智底座为基础，嵌入财务、研发、供应链、制造、人力、营销、采购、协同等核心业务，让智能排产、生产分析、质量分析和经营问数真正服务日常运营。",
    plain: "业务焦点：AI 不是外挂工具，而是按照“统一数智底座、嵌入核心业务、实时智能运营、结果可靠与安全合规”的模型进入计划、采购、库存、质量、成本和经营分析。",
    points: [
      "关键能力：智友、ChatBI、智能体、智能排产、生产分析助理",
      "业务价值：减少人工统计，让异常识别、问数分析和管理决策更及时",
      "关注指标：订单准交率、库存周转、质量异常、成本偏差",
    ],
  },
  rd: {
    kicker: "KEY SCENARIO 02",
    title: "产品研发精细化管理",
    body:
      "YonSuite 研发云支持文档分类、权限控制、在线协作与一体化 BOM 管理，推动 EBOM、PBOM、MBOM 平滑衔接；结合 EC 过程管理和 ERP 变更集成，让产品结构、工艺与物料变更可控。",
    plain: "业务焦点：把研发资料、产品结构、BOM、工艺和工程变更纳入统一版本管理，让设计制造一体化真正传递到采购、计划、车间和成本核算。",
    points: [
      "关键能力：研发项目、技术文档、EBOM/PBOM/MBOM、EC 变更",
      "业务价值：降低旧版误用、重复建档、设计制造断层和生产错用风险",
      "关注指标：变更响应周期、BOM 准确率、研发交付及时率",
    ],
  },
  plan: {
    kicker: "KEY SCENARIO 03",
    title: "精益计划确保精准交付",
    body:
      "YonSuite 制造云支持 MPS、MRP、LRP、备料计划等多计划模式，基于销售订单、库存、BOM、产能与采购情况自动运算，帮助企业实现计划、采购、车间与交付实时协同。",
    plain: "业务焦点：把订单需求、库存现状、采购周期、BOM 用量和产能约束纳入统一计算，支撑交期承诺、齐套分析和排产协同。",
    points: [
      "关键能力：MPS、MRP、LRP、备料计划、插单影响评估",
      "业务价值：提升计划可执行性，减少缺料、停线和交付延期",
      "关注指标：计划达成率、物料齐套率、采购及时率",
    ],
  },
  shop: {
    kicker: "KEY SCENARIO 04",
    title: "生产管理智能化",
    body:
      "YonSuite 面向 MTO、MTS、ETO、ATO 等生产模式，支持分派模式、超市模式、流转卡模式；通过 PDA、条码和车间数据采集，把派工、领料、报工、完工和异常处理纳入业务闭环。",
    plain: "业务焦点：将派工、领料、报工、完工、异常、线边仓和在制品状态纳入过程管理，让计划与现场形成实时闭环。",
    points: [
      "关键能力：派工、报工、完工、流转卡、线边仓、PDA 采集",
      "业务价值：提高现场透明度，缩短异常反馈和处理周期",
      "关注指标：工序达成率、在制品周转、异常关闭周期",
    ],
  },
  quality: {
    kicker: "KEY SCENARIO 05",
    title: "全面高质量管控",
    body:
      "YonSuite 质量管理覆盖来料检验、工序检验、产品检验、在库检验、发货检验、退货检验等业务类型，支持样品管理、抽检/全检、质量判定、批次追溯和质量分析助理。",
    plain: "业务焦点：构建从供应商来料到工序、成品、库存、发货和售后的质量数据链路，并把质量异常沉淀为可分析、可追责、可改善的管理资产。",
    points: [
      "关键能力：来料检、工序检、成品检、退货检、批次追溯",
      "业务价值：提升质量问题定位效率，支撑客户验厂与整改闭环",
      "关注指标：一次合格率、退货率、质量异常关闭率",
    ],
  },
  cost: {
    kicker: "KEY SCENARIO 06",
    title: "精细化成本管控实现有效降本",
    body:
      "YonSuite 财务云支持实际成本、标准成本、分项成本、专项成本等核算方式，可按多层 BOM 卷积归集材料、人工、制造费用、委外、损耗和质量成本，为报价、毛利和降本提供依据。",
    plain: "业务焦点：通过事项法会计和业财融合，把业务发生过程中的成本数据沉淀到产品、订单、批次、工序、工厂、车间与产线等核算维度。",
    points: [
      "关键能力：标准成本、实际成本、分项成本、BOM 成本卷积",
      "业务价值：支撑报价、订单毛利、成本差异追踪和降本决策",
      "关注指标：订单毛利率、成本偏差、费用归集及时率",
    ],
  },
  feature: {
    kicker: "KEY SCENARIO 07",
    title: "全局特征管理满足客户个性化需求",
    body:
      "YonSuite 特征体系面向定制家居、消费电子、装备选配等个性化制造场景，从销售订单开始支持客户选配，按物料与特征生成订单 BOM 和工艺，匹配结构化定价。",
    plain: "业务焦点：把规格、型号、颜色、尺寸、配置等客户需求转化为结构化规则，驱动报价、订单 BOM、工艺、采购和生产任务。",
    points: [
      "关键能力：特征选配、特征定价、订单 BOM、工艺匹配",
      "业务价值：提升定制订单响应速度，降低配置错误和报价偏差",
      "关注指标：报价周期、配置准确率、定制订单准交率",
    ],
  },
  network: {
    kicker: "KEY SCENARIO 08",
    title: "构建产业链网络，实现价值共赢",
    body:
      "YonSuite 通过统一平台连接客户、供应商、伙伴与多组织工厂，覆盖客户需求协同、研发制造协同、多工厂生产协同、多组织交易协同、供应商供货协同和物流配送协同。",
    plain: "业务焦点：面向集团、多工厂、多仓、多供应商和多渠道经营，建立跨组织业务协同、内部交易处理和统一经营分析能力。",
    points: [
      "关键能力：客户运营、供应商协同、多工厂计划、跨组织交易",
      "业务价值：提高集团管控能力，减少跨组织协同和内部交易成本",
      "关注指标：供应商交付率、库存共享率、跨组织协同周期",
    ],
  },
};

const tabButtons = document.querySelectorAll(".scenario-tabs button");
const detail = document.querySelector(".scenario-detail");

function renderScenario(key) {
  const data = scenarioData[key];
  if (!data || !detail) return;

  detail.innerHTML = `
    <div class="scenario-kicker">${data.kicker}</div>
    <h3>${data.title}</h3>
    <p>${data.body}</p>
    <div class="scenario-plain">${data.plain}</div>
    <ul>
      ${data.points.map((point) => `<li>${point}</li>`).join("")}
    </ul>
  `;
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tabButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderScenario(button.dataset.scenario);
  });
});

renderScenario("ai");

const modal = document.querySelector("#appointment-modal");
const modalTitle = document.querySelector("#appointment-title");
const modalForm = document.querySelector(".modal-body");
const modalHint = document.querySelector(".form-hint");
const modalOpeners = document.querySelectorAll("[data-modal-open]");
const modalClosers = document.querySelectorAll("[data-modal-close]");
const scrollLinks = document.querySelectorAll("[data-scroll-target]");
const feedbackTargets = document.querySelectorAll(
  ".btn, .header-cta, .mobile-cta a, .scenario-tabs button, .modal-submit, .modal-close",
);
let lastActiveElement = null;

function addRipple(event) {
  const target = event.currentTarget;
  const rect = target.getBoundingClientRect();
  const ripple = document.createElement("span");
  ripple.className = "button-ripple";
  ripple.style.left = `${event.clientX - rect.left}px`;
  ripple.style.top = `${event.clientY - rect.top}px`;
  target.appendChild(ripple);
  ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
}

function setModalHint(message, type) {
  if (!modalHint) return;
  modalHint.classList.remove("is-error", "is-success");
  if (type) modalHint.classList.add(`is-${type}`);
  modalHint.textContent = message;
}

function openModal(title) {
  if (!modal) return;
  lastActiveElement = document.activeElement;
  if (modalTitle && title) modalTitle.textContent = title;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  setModalHint("");
  modal.querySelectorAll("input").forEach((input) => input.classList.remove("is-invalid"));
  modal.querySelector("input")?.focus();
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (lastActiveElement && "focus" in lastActiveElement) {
    lastActiveElement.focus();
  }
}

function highlightTarget(target) {
  target.classList.remove("target-highlight");
  window.requestAnimationFrame(() => target.classList.add("target-highlight"));
}

feedbackTargets.forEach((button) => {
  button.addEventListener("click", addRipple);
});

modalOpeners.forEach((opener) => {
  opener.addEventListener("click", (event) => {
    event.preventDefault();
    openModal(opener.dataset.modalTitle || "预约专家评估");
  });
});

modalClosers.forEach((closer) => {
  closer.addEventListener("click", closeModal);
});

scrollLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const id = link.getAttribute("href");
    if (!id || !id.startsWith("#")) return;
    const target = document.querySelector(id);
    if (!target) return;
    window.setTimeout(() => highlightTarget(target), 360);
  });
});

modalForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const requiredFields = Array.from(modalForm.querySelectorAll("input[required]"));
  const invalidFields = requiredFields.filter((field) => !field.value.trim());
  requiredFields.forEach((field) => field.classList.toggle("is-invalid", invalidFields.includes(field)));

  if (invalidFields.length) {
    setModalHint("请先补充姓名、公司名称和手机号。", "error");
    invalidFields[0].focus();
    return;
  }

  setModalHint("已完成第一步，请确认关注场景，泊冉顾问会据此沟通制造业方案。", "success");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal?.classList.contains("is-open")) {
    closeModal();
  }
});
