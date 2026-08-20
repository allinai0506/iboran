const sampleData = {
  omni: {
    kicker: "SAMPLE 01",
    title: "全渠道订单中心",
    tagline: "多平台、多门店、多经销渠道订单统一归集，订单、库存、物流、账单和财务状态同步处理。",
    when: "直营、加盟、经销、平台电商和私域商城并行，订单分散在不同系统和表格里。",
    start: "业务团队先选择 1-2 个订单量最大的渠道，梳理商品、客户、仓库、物流与财务规则。",
    flow: ["订单归集", "商品客户匹配", "库存履约", "财务对账"],
    results: ["订单处理更集中", "差异追溯更清楚", "履约状态可视化"],
    detail:
      "适合多电商平台、多店铺、多经销体系的消费品企业。第一阶段可以先把订单、退款、发货、物流状态、账单和应收数据打通，再逐步接入促销费用、返利和财务核算。",
  },
  dms: {
    kicker: "SAMPLE 02",
    title: "DMS 经销商协同",
    tagline: "把经销商协议、价盘、信用、在线订货、库存可用量、发货、应收和对账放到同一条渠道协同链路。",
    when: "经销商数量多、订货靠电话微信、价格政策和库存状态不透明，渠道回款、返利和对账经常滞后。",
    start: "先选择一个区域或重点经销商群，统一客户、商品、协议、价格、信用、仓库和结算规则。",
    flow: ["协议价盘", "在线订货", "库存信用校验", "发货对账"],
    results: ["渠道订货更规范", "履约状态更透明", "应收返利更清楚"],
    detail:
      "DMS 不建议孤立建设。经销商订货结果要回流订单中心、库存补货、促销费用、返利核算、应收对账和经营分析，才能真正形成渠道协同闭环。",
  },
  sfa: {
    kicker: "SAMPLE 03",
    title: "SFA 终端拜访执行",
    tagline: "把销售人员拜访计划、门店陈列、库存盘点、动销反馈、竞品信息、促销执行和整改任务统一在线。",
    when: "终端网点多、销售拜访靠表格或聊天记录，促销有没有执行、陈列有没有到位、门店库存是否异常很难及时掌握。",
    start: "先选重点区域和核心门店，定义拜访路线、检查项、陈列标准、动销字段、照片证据和任务闭环规则。",
    flow: ["拜访计划", "终端采集", "任务整改", "动销回流"],
    results: ["终端执行可视", "促销落地可查", "补货预测更准"],
    detail:
      "SFA 的价值在于和 DMS、订单、库存、促销、费用、会员和业财数据融合。终端反馈可以触发补货建议、促销复盘、费用核销和区域经营分析。",
  },
  promo: {
    kicker: "SAMPLE 04",
    title: "促销费用闭环",
    tagline: "把促销政策、客户费用、返利、买赠和折扣从线下表格搬进系统，形成事前预算、事中控制、事后核销。",
    when: "促销活动多、渠道政策多、费用申请和核销靠邮件或 Excel，财务很难判断真实 ROI。",
    start: "先选一个典型渠道政策，如 KA 费用、经销商返利或电商大促费用，梳理申请、审批、执行、结算和分析节点。",
    flow: ["政策制定", "预算申请", "执行核销", "ROI 分析"],
    results: ["费用口径统一", "重复核销减少", "促销效果可追踪"],
    detail:
      "适合食品饮料、美妆日化、家居服饰和连锁零售企业。系统可围绕定价中心、促销中心、返利中心、客户费用和信用控制建立管理闭环。",
  },
  store: {
    kicker: "SAMPLE 05",
    title: "门店智能要货",
    tagline: "结合门店销量、当前库存、促销计划、区域库存和安全库存规则，生成补货或调拨建议。",
    when: "门店要货靠经验，总部要反复查销量、库存和促销计划，畅销缺货与慢销积压并存。",
    start: "先选择高频 SKU 和重点门店，建立销量、库存、在途、促销、补货周期和安全库存字段。",
    flow: ["门店要货", "销量库存校验", "补货建议", "调拨草稿"],
    results: ["缺货预警更早", "补货建议更稳", "库存周转可改善"],
    detail:
      "适合连锁餐饮、新零售、门店零售和区域仓配业务。第一阶段建议 AI 输出建议和预警，由授权人员确认后再生成要货申请或调拨单草稿。",
  },
  production: {
    kicker: "SAMPLE 06",
    title: "产销计划与质量追溯",
    tagline: "把销售预测、渠道订单、库存计划、采购需求、生产或委外执行、质检放行和批次追溯放到同一条链路里。",
    when: "新品铺货、大促备货、畅销补货或委外加工频繁，销售、供应链、生产、质量和财务各自拉表协调。",
    start: "先选择一个高频品类或重点 SKU，梳理预测、物料、产能、委外、质检、入库、发货和成本核算节点。",
    flow: ["需求预测", "计划排程", "质检放行", "批次追溯"],
    results: ["产销响应更快", "质量证据更完整", "成本归集更清楚"],
    detail:
      "适合有自制、委外、保质期、批次、来料检验或客诉召回要求的消费品企业。第一阶段可以先跑通销售预测到生产或委外、质检入库、批次出库和成本核算的样板链路。",
  },
  member: {
    kicker: "SAMPLE 07",
    title: "会员精准运营",
    tagline: "统一会员、积分、卡券、钱包、购买行为和触达数据，支持用户分群、自动营销与复购分析。",
    when: "会员数据、门店数据、商品数据、交易数据分散，活动做了很多，但复购和客单价提升不清楚。",
    start: "先统一会员 ID、渠道来源、交易记录、卡券使用和触达记录，再建立核心人群标签。",
    flow: ["统一会员", "人群分层", "权益触达", "复购分析"],
    results: ["会员画像更完整", "触达更精准", "复购效果可分析"],
    detail:
      "适合有私域商城、线下门店、会员积分、卡券、权益和自动化营销需求的消费品企业。重点不是多发券，而是把行为、交易和权益数据打通。",
  },
  finance: {
    kicker: "SAMPLE 08",
    title: "业财经营驾驶舱",
    tagline: "按品牌、渠道、区域、客户、门店和 SKU 穿透收入、毛利、费用、库存、应收和现金流。",
    when: "经营会议前临时拉数，销售、供应链、财务各有一套口径，毛利和费用解释不一致。",
    start: "先选管理层最常看的指标，统一品牌、渠道、客户、商品、费用和财务核算维度。",
    flow: ["统一指标", "采集业务事项", "实时核算", "经营预警"],
    results: ["报表口径统一", "异常更快发现", "经营动作可跟进"],
    detail:
      "适合多组织、多品牌、多区域经营的消费品企业。可以先做收入、毛利、费用、应收、库存和现金流六类指标，再扩展 AI 智能问数和异常归因。",
  },
};

const siteHeader = document.querySelector(".site-header");
const mobileMenu = document.querySelector(".mobile-menu");
const sampleButtons = document.querySelectorAll(".sample-tabs button");
const sampleDetail = document.querySelector("[data-sample-detail]");
const scrollLinks = document.querySelectorAll("[data-scroll-target]");
const trackTargets = document.querySelectorAll("[data-track]");
const feedbackTargets = document.querySelectorAll(".btn, .header-cta, .mobile-cta a, .sample-tabs button, .faq-item button, .modal-submit, .mobile-menu");
let scroll50Tracked = false;
let scroll90Tracked = false;

function trackEvent(name, payload = {}) {
  if (!name) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...payload });
  document.dispatchEvent(new CustomEvent("boran:track", { detail: { name, ...payload } }));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function compactText(value, maxLength = 76) {
  const text = String(value).replace(/\s+/g, " ").trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

function renderSample(key) {
  const data = sampleData[key];
  if (!data || !sampleDetail) return;

  sampleDetail.innerHTML = `
    <div class="sample-topline">
      <div class="sample-kicker">${escapeHtml(data.kicker)}</div>
      <h3>${escapeHtml(data.title)}</h3>
      <p>${escapeHtml(data.tagline)}</p>
    </div>
    <div class="sample-context">
      <div>
        <strong>什么时候用</strong>
        <span>${escapeHtml(compactText(data.when, 72))}</span>
      </div>
      <div>
        <strong>用户怎么开始</strong>
        <span>${escapeHtml(compactText(data.start, 72))}</span>
      </div>
    </div>
    <div class="sample-mini-flow" aria-label="${escapeHtml(data.title)}流程">
      ${data.flow
        .map(
          (item, index) => `
            <div>
              <b>${String(index + 1).padStart(2, "0")}</b>
              <span>${escapeHtml(item)}</span>
            </div>
          `,
        )
        .join("")}
    </div>
    <div class="sample-result" aria-label="${escapeHtml(data.title)}关键结果">
      ${data.results
        .map(
          (item) => `
            <div>
              <strong>${escapeHtml(item)}</strong>
              <span>可作为第一阶段验收指标</span>
            </div>
          `,
        )
        .join("")}
    </div>
    <details class="sample-more">
      <summary>展开样板说明</summary>
      <p>${escapeHtml(data.detail)}</p>
    </details>
  `;
}

function closeMobileMenu() {
  siteHeader?.classList.remove("is-menu-open");
  mobileMenu?.setAttribute("aria-expanded", "false");
}

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

function highlightTarget(target) {
  target.classList.remove("target-highlight");
  window.requestAnimationFrame(() => target.classList.add("target-highlight"));
}

function setFormHint(form, message, type) {
  const hint = form.querySelector(".form-hint");
  if (!hint) return;
  hint.classList.remove("is-error", "is-success");
  if (type) hint.classList.add(`is-${type}`);
  hint.textContent = message;
}

mobileMenu?.addEventListener("click", () => {
  const isOpen = siteHeader?.classList.toggle("is-menu-open") || false;
  mobileMenu.setAttribute("aria-expanded", String(isOpen));
  trackEvent("mobile_menu_toggle", { open: isOpen });
});

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

sampleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    sampleButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderSample(button.dataset.sample);
    trackEvent("sample_tab_click", { sample: button.dataset.sample });
  });
});

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    if (!item) return;
    const isOpen = item.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) {
      trackEvent("faq_expand", { question: button.textContent.trim() });
    }
  });
});

scrollLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const id = link.getAttribute("href");
    if (!id || !id.startsWith("#")) return;
    const target = document.querySelector(id);
    if (!target) return;
    closeMobileMenu();
    window.setTimeout(() => highlightTarget(target), 360);
  });
});

trackTargets.forEach((target) => {
  target.addEventListener("click", () => {
    trackEvent(target.dataset.track, { label: target.textContent.trim() });
  });
});

feedbackTargets.forEach((button) => {
  button.addEventListener("click", addRipple);
});

document.querySelectorAll(".lead-form").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const requiredFields = Array.from(form.querySelectorAll("input[required]"));
    const invalidFields = requiredFields.filter((field) => !field.value.trim());
    const phone = form.elements.phone;
    if (phone?.value.trim() && !/^1[3-9]\d{9}$/.test(phone.value.trim())) {
      invalidFields.push(phone);
    }

    requiredFields.forEach((field) => {
      field.classList.toggle("is-invalid", invalidFields.includes(field));
    });

    if (phone) {
      phone.classList.toggle("is-invalid", invalidFields.includes(phone));
    }

    if (invalidFields.length) {
      setFormHint(form, "请先补充姓名、公司名称和有效手机号。", "error");
      invalidFields[0].focus();
      return;
    }

    trackEvent("form_submit_consumer_goods_diagnosis", {
      segment: form.elements.segment?.value || "",
      priority: form.elements.priority?.value || "",
      system: form.elements.system?.value || "",
    });

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    try {
      const payload = {
        name: form.elements.name.value.trim(),
        company: form.elements.company.value.trim(),
        phone: form.elements.phone.value.trim(),
        source: "consumer-goods-page",
        sourcePath: "/solution/industry/consumer-goods",
        sourcePageUrl: window.location.href,
        customer_type: form.elements.segment?.value || "",
        currentSystem: form.elements.system?.value || "",
        interest: form.elements.priority?.value || "",
        remark: form.elements.problem?.value || "",
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setFormHint(form, "已收到诊断需求，泊冉顾问会根据渠道结构、DMS/SFA现状、产销链路、质量追溯、费用规则、主数据质量和业财口径与您沟通。", "success");
        form.reset();
      } else {
        setFormHint(form, data.error || data.message || "提交失败，请稍后重试。", "error");
      }
    } catch (err) {
      setFormHint(form, "提交失败，请稍后重试。", "error");
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
});

renderSample("omni");

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
});

window.addEventListener(
  "scroll",
  () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = scrollTop / maxScroll;

    if (!scroll50Tracked && progress >= 0.5) {
      scroll50Tracked = true;
      trackEvent("scroll_50");
    }

    if (!scroll90Tracked && progress >= 0.9) {
      scroll90Tracked = true;
      trackEvent("scroll_90");
    }
  },
  { passive: true },
);
