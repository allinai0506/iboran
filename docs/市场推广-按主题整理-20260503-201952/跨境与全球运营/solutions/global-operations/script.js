const siteHeader = document.querySelector(".site-header");
const mobileMenu = document.querySelector(".mobile-menu");
const scrollLinks = document.querySelectorAll("[data-scroll-target]");
const trackTargets = document.querySelectorAll("[data-track]:not(.scenario-card):not(.role-tabs button)");
const mobileCta = document.querySelector(".mobile-cta");
const feedbackTargets = document.querySelectorAll(
  ".btn, .header-cta, .mobile-cta a, .faq-item button, .modal-submit, .mobile-menu, .role-tabs button",
);
const roleButtons = document.querySelectorAll(".role-tabs button");
const rolePanel = document.querySelector(".role-panel");

let scroll50Tracked = false;
let scroll90Tracked = false;
let formStartTracked = false;

const roleContent = {
  owner: {
    kicker: "老板",
    title: "看清全球业务在哪里增长，风险在哪里聚集",
    body: "从区域收入、毛利、现金流、库存占用、组织效率和合规预警看全球运营整体状态，支持战略复盘和资源投入判断。",
    points: ["全球经营看板与区域对比", "重点国家或地区风险预警", "海外业务投入与回报分析"],
  },
  finance: {
    kicker: "财务负责人",
    title: "把跨境对账、资金计划和合并准备放在同一口径下",
    body: "关注多币种核算、收入成本匹配、跨境对账、税务资料、资金计划和合并报表准备。凭证、支付、申报统一生成建议、草稿或预警，由授权人员确认后进入正式流程。",
    points: ["跨境对账差异清单", "资金计划与税务资料草稿", "全球财务分析口径"],
  },
  it: {
    kicker: "信息化负责人",
    title: "规划全球运营数智化底座，而不是继续增加孤岛",
    body: "关注业务系统集成、主数据、权限、接口、日志、运维、数据安全和多区域部署，让总部与海外区域在统一架构下协同扩展。",
    points: ["系统集成与接口治理", "多区域部署与访问策略", "数据权限和日志留痕"],
  },
  business: {
    kicker: "海外业务负责人",
    title: "把渠道、客户、订单、库存和回款放进同一张经营图",
    body: "关注海外渠道、海外零售、本地促销、客户信用、销售预测、库存占用和区域毛利，减少海外业务与总部口径割裂。",
    points: ["海外渠道与价格政策", "订单履约和区域库存", "本地经营分析与预警"],
  },
  supply: {
    kicker: "供应链负责人",
    title: "看见全球需求、供应、库存和海外工厂的异常信号",
    body: "关注需求计划、采购协同、海外仓、物流跟踪、本地生产、质量记录、库存成本和供应风险，把异常提前进入复核队列。",
    points: ["全球供应链可视", "海外工厂协同", "库存和履约异常预警"],
  },
  hr: {
    kicker: "人力负责人",
    title: "统一海外人员、派遣、假勤、薪酬和组织效能数据",
    body: "关注海外人员档案、派遣、假勤、福利、薪酬计算草稿、人力成本和组织效能分析。薪酬发放、个税和社保事项统一生成建议、草稿或预警，由授权人员确认后进入正式流程。",
    points: ["全球人力主数据", "派遣与假勤规则", "薪酬草稿和人力成本分析"],
  },
};

function trackEvent(name, payload = {}) {
  if (!name) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...payload });
  document.dispatchEvent(new CustomEvent("boran:track", { detail: { name, ...payload } }));
}

function closeMobileMenu() {
  siteHeader?.classList.remove("is-menu-open");
  mobileMenu?.setAttribute("aria-expanded", "false");
}

function addRipple(event) {
  const target = event.currentTarget;
  if (!target || target.disabled) return;
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

function normalizePhone(value) {
  return String(value).replace(/[\s-]/g, "");
}

function prefillScene(scene) {
  if (!scene) return;
  const sceneSelect = document.querySelector('.lead-form select[name="scene"]');
  if (!sceneSelect) return;
  const matchedOption = Array.from(sceneSelect.options).find((option) => option.textContent.trim() === scene);
  if (matchedOption) {
    sceneSelect.value = matchedOption.value || matchedOption.textContent.trim();
    sceneSelect.classList.remove("is-invalid");
  }
}

function setSubmitText(button, text) {
  if (!button) return;
  const firstText = Array.from(button.childNodes).find((node) => node.nodeType === Node.TEXT_NODE);
  if (firstText) {
    firstText.nodeValue = ` ${text} `;
  }
}

function renderRole(roleKey) {
  const content = roleContent[roleKey] || roleContent.owner;
  if (!rolePanel) return;
  rolePanel.innerHTML = `
    <div>
      <span class="role-kicker">${content.kicker}</span>
      <h3>${content.title}</h3>
      <p>${content.body}</p>
    </div>
    <ul>
      ${content.points.map((point) => `<li>${point}</li>`).join("")}
    </ul>
  `;
}

mobileMenu?.addEventListener("click", () => {
  const isOpen = siteHeader?.classList.toggle("is-menu-open") || false;
  mobileMenu.setAttribute("aria-expanded", String(isOpen));
  trackEvent("mobile_menu_toggle", { open: isOpen });
});

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
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

roleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    roleButtons.forEach((item) => {
      item.classList.remove("is-active");
      item.setAttribute("aria-selected", "false");
    });
    button.classList.add("is-active");
    button.setAttribute("aria-selected", "true");
    renderRole(button.dataset.role);
    trackEvent("role_tab_click", { role: button.textContent.trim() });
  });
});

document.querySelectorAll(".scenario-card").forEach((card) => {
  const activate = () => {
    const scenario = card.dataset.scenario || card.querySelector("h3")?.textContent.trim() || "";
    prefillScene(scenario);
    trackEvent("scenario_card_click", { scenario });
  };

  card.addEventListener("click", activate);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      activate();
    }
  });
});

scrollLinks.forEach((link) => {
  link.addEventListener("click", () => {
    prefillScene(link.dataset.prefillScene);
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
    const payload = { label: target.textContent.trim() };
    trackEvent(target.dataset.track, payload);
    if (target.dataset.extraTrack) {
      trackEvent(target.dataset.extraTrack, payload);
    }
  });
});

feedbackTargets.forEach((button) => {
  button.addEventListener("click", addRipple);
});

document.querySelectorAll(".lead-form").forEach((form) => {
  const submitButton = form.querySelector(".modal-submit");
  const fields = form.querySelectorAll("input, select, textarea");

  fields.forEach((field) => {
    const markStarted = () => {
      if (formStartTracked) return;
      formStartTracked = true;
      trackEvent("bottom_form_start", { field: field.name || "" });
    };

    field.addEventListener("focus", markStarted, { once: true });
    field.addEventListener("input", () => {
      markStarted();
      field.classList.remove("is-invalid");
    });
    field.addEventListener("change", () => {
      markStarted();
      field.classList.remove("is-invalid");
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (form.dataset.submitted === "true" || form.dataset.submitting === "true") {
      trackEvent("bottom_form_submit", { status: "duplicate" });
      setFormHint(form, "诊断需求已提交，请勿重复提交。", "success");
      return;
    }

    const formData = new FormData(form);
    const requiredFields = Array.from(form.querySelectorAll("input[required], select[required], textarea[required]"));
    const invalidFields = requiredFields.filter((field) => {
      if (field.type === "checkbox") return !field.checked;
      return !String(field.value || "").trim();
    });
    const phone = form.elements.phone;
    const normalizedPhone = normalizePhone(phone?.value || "");

    if (phone && normalizedPhone && !/^\+?\d{6,20}$/.test(normalizedPhone)) {
      invalidFields.push(phone);
    }

    fields.forEach((field) => {
      field.classList.toggle("is-invalid", invalidFields.includes(field));
    });

    if (invalidFields.length) {
      const firstInvalid = invalidFields[0];
      trackEvent("bottom_form_submit", {
        status: "error",
        reason: firstInvalid.name === "phone" ? "invalid_phone" : "missing_required",
        field: firstInvalid.name || "",
      });
      setFormHint(form, "请先补充姓名、公司名称、有效手机号、企业所处阶段、关注场景，并勾选隐私授权。", "error");
      firstInvalid.focus();
      return;
    }

    form.dataset.submitting = "true";
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.dataset.originalText = submitButton.textContent.trim();
      setSubmitText(submitButton, "正在提交...");
    }

    window.setTimeout(() => {
      form.dataset.submitting = "false";
      form.dataset.submitted = "true";
      trackEvent("bottom_form_submit", {
        status: "success",
        stage: formData.get("stage") || "",
        scene: formData.get("scene") || "",
        regions: formData.get("regions") || "",
      });
      setFormHint(form, "已收到诊断需求，泊冉顾问会结合企业出海阶段、涉及地区、系统现状和关注场景与您沟通。", "success");
      if (submitButton) {
        setSubmitText(submitButton, "已提交");
      }
    }, 500);
  });
});

if ("IntersectionObserver" in window && mobileCta) {
  const hiddenTriggerIds = ["top", "diagnosis"];
  const activeTriggers = new Set();
  mobileCta.classList.add("is-hidden");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeTriggers.add(entry.target.id);
        } else {
          activeTriggers.delete(entry.target.id);
        }
      });
      mobileCta.classList.toggle("is-hidden", activeTriggers.size > 0);
    },
    { threshold: 0.14 },
  );

  hiddenTriggerIds.forEach((id) => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });
}

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
