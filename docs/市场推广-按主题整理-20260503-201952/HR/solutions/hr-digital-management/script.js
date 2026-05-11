const siteHeader = document.querySelector(".site-header");
const mobileMenu = document.querySelector(".mobile-menu");
const scrollLinks = document.querySelectorAll("[data-scroll-target]");
const trackTargets = document.querySelectorAll("[data-track]");
const feedbackTargets = document.querySelectorAll(".btn, .header-cta, .mobile-cta a, .faq-item button, .modal-submit, .mobile-menu, .scenario-card, .pain-layout article, .role-tabs button");
const leadForm = document.querySelector(".lead-form");
const mobileCta = document.querySelector(".mobile-cta");

let formStarted = false;

const roleData = {
  ceo: {
    kicker: "CEO",
    title: "老板 / CEO",
    concern: "人多了，效率有没有提升？成本有没有失控？关键岗位有没有人？",
    scenes: "人效分析、组织看板、薪酬成本、流失预警、关键岗位人才储备。",
    value: "让管理层及时看到人员、成本、绩效和流失趋势，用数据辅助组织调整和经营决策。",
    metrics: "人均产出、人均成本、流失率、编制使用率、关键岗位空缺率。",
  },
  hrd: {
    kicker: "HRD",
    title: "HR负责人",
    concern: "HR每天被重复事务占用，流程难推动，数据难汇总。",
    scenes: "员工自助、入转调离、考勤假勤、绩效流程、员工服务台。",
    value: "让HR从重复答疑、催办、核对和统计中释放出来，把更多时间投入到组织和人才工作。",
    metrics: "HR事务量、流程完成率、考勤异常处理时长、入职办理时长、员工服务满意度。",
  },
  cfo: {
    kicker: "CFO",
    title: "财务负责人",
    concern: "薪资核算口径是否准确？薪酬成本是否可控？预算是否超支？",
    scenes: "薪酬核对、薪酬成本分析、预算预警、发薪复核。",
    value: "让薪酬和成本数据更清楚，减少反复核对，让财务能按部门、项目、门店或业务单元分析用工成本。",
    metrics: "薪资核算周期、异常薪资项目数、薪酬成本占比、预算偏差。",
  },
  manager: {
    kicker: "MGR",
    title: "业务主管 / 门店负责人 / 工厂负责人",
    concern: "排班是否合理？加班是否过多？团队绩效是否跟得上？人员成本是否可控？",
    scenes: "移动审批、排班调班、考勤确认、绩效反馈、团队看板。",
    value: "让一线主管真正参与HR流程，及时处理团队人员、考勤、绩效和异常事项。",
    metrics: "审批时长、加班时长、缺勤率、排班覆盖率、团队绩效完成率。",
  },
  cio: {
    kicker: "CIO",
    title: "信息化负责人",
    concern: "人力数据是否统一？权限是否清楚？是否能和现有系统集成？",
    scenes: "组织主数据、员工主数据、权限体系、协同办公集成、财务集成、考勤设备集成。",
    value: "以组织、人员、岗位、部门为基础数据核心，逐步打通考勤、财务、协同和业务系统。",
    metrics: "主数据完整率、重复录入减少量、系统集成数量、权限异常数。",
  },
};

function trackEvent(name, payload = {}) {
  if (!name) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...payload });
  document.dispatchEvent(new CustomEvent("boran:track", { detail: { name, ...payload } }));
}

function emitAdConversion(payload = {}) {
  if (Array.isArray(window._hmt)) {
    window._hmt.push(["_trackEvent", "HR落地页", "form_submit", "ad_landing_form_submit"]);
  }

  window.uetq = window.uetq || [];
  window.uetq.push("event", "ad_landing_form_submit", {
    event_category: "lead_form",
    event_label: "hr_digital_management",
    ...payload,
  });
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

function setHiddenValue(form, name, value) {
  const input = form.querySelector(`input[name="${name}"]`);
  if (input) input.value = value || "";
}

function populateSourceFields(form) {
  if (!form) return;
  const params = new URLSearchParams(window.location.search);
  const canonicalUrl = document.querySelector('link[rel="canonical"]')?.href || window.location.href;
  setHiddenValue(form, "source_url", canonicalUrl);
  setHiddenValue(form, "referrer", document.referrer);
  ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((key) => {
    setHiddenValue(form, key, params.get(key));
  });
}

function normalizePhone(value) {
  return String(value || "").replace(/[\s-]/g, "");
}

function getCheckedValues(form, name) {
  return Array.from(form.querySelectorAll(`input[name="${name}"]:checked`)).map((input) => input.value);
}

function collectFormPayload(form) {
  const data = new FormData(form);
  return {
    form_name: form.dataset.formName || "hr-digital-management-diagnosis",
    source_page: data.get("source_page") || "",
    source_path: data.get("source_path") || "",
    source_url: data.get("source_url") || window.location.href,
    referrer: data.get("referrer") || document.referrer,
    utm_source: data.get("utm_source") || "",
    utm_medium: data.get("utm_medium") || "",
    utm_campaign: data.get("utm_campaign") || "",
    utm_term: data.get("utm_term") || "",
    utm_content: data.get("utm_content") || "",
    name: data.get("name") || "",
    company: data.get("company") || "",
    phone: normalizePhone(data.get("phone")),
    email: data.get("email") || "",
    industry: data.get("industry") || "",
    employee_scale: data.get("employeeScale") || "",
    multi_scope: getCheckedValues(form, "multiScope").join(","),
    focus_scenarios: getCheckedValues(form, "focusScenarios").join(","),
    has_hr_system: data.get("hasHrSystem") || "",
    has_attendance_or_collab: data.get("hasAttendanceOrCollab") || "",
    message: data.get("message") || "",
  };
}

function prefillMessage(message) {
  if (!leadForm || !message) return;
  const field = leadForm.elements.message;
  if (field && !field.value.trim()) {
    field.value = message;
  }
}

function getTrackPayload(target) {
  const payload = {
    label: target.textContent.trim(),
    href: target.getAttribute("href") || "",
  };
  if (target.dataset.scenarioId) payload.scenario_id = target.dataset.scenarioId;
  if (target.dataset.scenarioName) payload.scenario_name = target.dataset.scenarioName;
  if (target.dataset.roleTab) payload.role_id = target.dataset.roleTab;
  if (target.dataset.painName) payload.pain_name = target.dataset.painName;
  return payload;
}

function updateRolePanel(roleId) {
  const data = roleData[roleId];
  if (!data) return;

  document.querySelectorAll("[data-role-tab]").forEach((button) => {
    const active = button.dataset.roleTab === roleId;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });

  const fields = {
    "role-kicker": data.kicker,
    "role-title": data.title,
    "role-concern": data.concern,
    "role-scenes": data.scenes,
    "role-value": data.value,
    "role-metrics": data.metrics,
  };

  Object.entries(fields).forEach(([id, value]) => {
    const target = document.getElementById(id);
    if (target) target.textContent = value;
  });
}

trackEvent("hr_page_view", {
  path: window.location.pathname,
  title: document.title,
});

mobileMenu?.addEventListener("click", () => {
  const isOpen = siteHeader?.classList.toggle("is-menu-open") || false;
  mobileMenu.setAttribute("aria-expanded", String(isOpen));
  trackEvent("mobile_menu_toggle", { open: isOpen });
});

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

scrollLinks.forEach((link) => {
  link.addEventListener("click", () => {
    prefillMessage(link.dataset.prefillMessage);
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
    const eventName = target.dataset.track;
    if (eventName === "form_submit") return;
    const payload = getTrackPayload(target);
    trackEvent(eventName, payload);
    String(target.dataset.trackExtra || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .forEach((extraEvent) => trackEvent(extraEvent, payload));
  });
});

feedbackTargets.forEach((button) => {
  button.addEventListener("click", addRipple);
});

document.querySelectorAll(".scenario-card").forEach((card) => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".scenario-card").forEach((item) => item.classList.remove("is-active"));
    card.classList.add("is-active");
  });
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      card.click();
    }
  });
});

document.querySelectorAll(".pain-layout article").forEach((card) => {
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      card.click();
    }
  });
});

document.querySelectorAll("[data-role-tab]").forEach((button) => {
  button.addEventListener("click", () => updateRolePanel(button.dataset.roleTab));
});

document.querySelectorAll(".faq-item button").forEach((button, index) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    if (!item) return;
    const isOpen = item.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) {
      trackEvent("faq_expand", {
        faq_index: index + 1,
        question: button.textContent.trim(),
      });
    }
  });
});

if ("IntersectionObserver" in window) {
  const valueObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const eventName = entry.target.dataset.viewTrack;
        trackEvent(eventName, {
          label: entry.target.querySelector("h3")?.textContent.trim() || "",
        });
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.52 },
  );

  document.querySelectorAll("[data-view-track]").forEach((target) => valueObserver.observe(target));
}

if (leadForm) {
  populateSourceFields(leadForm);

  leadForm.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener(
      "focus",
      () => {
        if (formStarted) return;
        formStarted = true;
        trackEvent("form_start", {
          form_name: leadForm.dataset.formName || "hr-digital-management-diagnosis",
        });
      },
      { once: true },
    );
    field.addEventListener("input", () => {
      field.classList.remove("is-invalid");
      field.closest(".choice-field, .privacy-row")?.classList.remove("is-invalid");
    });
    field.addEventListener("change", () => {
      field.classList.remove("is-invalid");
      field.closest(".choice-field, .privacy-row")?.classList.remove("is-invalid");
    });
  });

  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    populateSourceFields(leadForm);

    if (leadForm.dataset.submitted === "true") {
      setFormHint(leadForm, "已收到您的HR场景诊断需求，请勿重复提交。", "success");
      return;
    }

    const invalidTargets = [];
    const requiredFields = Array.from(leadForm.querySelectorAll("input[required], select[required], textarea[required]"));

    requiredFields.forEach((field) => {
      const isCheckbox = field.type === "checkbox";
      const invalid = isCheckbox ? !field.checked : !String(field.value || "").trim();
      field.classList.toggle("is-invalid", invalid && !isCheckbox);
      if (invalid) invalidTargets.push(field);
    });

    const phone = leadForm.elements.phone;
    const normalizedPhone = normalizePhone(phone?.value);
    if (phone && normalizedPhone && !/^1[3-9]\d{9}$/.test(normalizedPhone)) {
      phone.classList.add("is-invalid");
      invalidTargets.push(phone);
    }

    const email = leadForm.elements.email;
    if (email && email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      email.classList.add("is-invalid");
      invalidTargets.push(email);
    }

    leadForm.querySelectorAll("[data-required-group]").forEach((group) => {
      const name = group.dataset.requiredGroup;
      const checked = name ? leadForm.querySelectorAll(`input[name="${name}"]:checked`).length > 0 : true;
      group.classList.toggle("is-invalid", !checked);
      if (!checked) invalidTargets.push(group);
    });

    const privacyInput = leadForm.elements.privacyConsent;
    const privacyRow = privacyInput?.closest(".privacy-row");
    if (privacyInput && !privacyInput.checked) {
      privacyRow?.classList.add("is-invalid");
      invalidTargets.push(privacyInput);
    } else {
      privacyRow?.classList.remove("is-invalid");
    }

    if (invalidTargets.length) {
      const firstInvalid = invalidTargets[0];
      const reason = firstInvalid === phone ? "invalid_phone" : firstInvalid === email ? "invalid_email" : "missing_required";
      trackEvent("form_submit_error", {
        reason,
        field: firstInvalid.name || firstInvalid.dataset.requiredGroup || "",
      });
      setFormHint(leadForm, "请先补充姓名、手机号、公司名称、员工规模、关注场景，并勾选隐私协议；手机号需为有效中国大陆手机号。", "error");
      const focusTarget = firstInvalid.matches?.("fieldset") ? firstInvalid.querySelector("input") : firstInvalid;
      focusTarget?.focus();
      return;
    }

    const payload = collectFormPayload(leadForm);
    const submitButton = leadForm.querySelector(".modal-submit");
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.dataset.originalText = submitButton.textContent.trim();
      submitButton.firstChild.textContent = "正在提交...";
    }

    trackEvent("form_submit", payload);
    trackEvent("ad_landing_form_submit", {
      form_name: payload.form_name,
      source_path: payload.source_path,
      utm_source: payload.utm_source,
      utm_medium: payload.utm_medium,
      utm_campaign: payload.utm_campaign,
    });
    emitAdConversion(payload);

    window.setTimeout(() => {
      leadForm.dataset.submitted = "true";
      trackEvent("form_submit_success", payload);
      setFormHint(
        leadForm,
        "已收到您的HR场景诊断需求，泊冉顾问将结合员工规模、组织结构、现有系统和当前HR痛点进行初步评估。",
        "success",
      );
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.firstChild.textContent = "已提交，等待顾问联系";
      }
    }, 420);
  });
}

if ("IntersectionObserver" in window && mobileCta) {
  const syncMobileCtaVisibility = () => {
    const shouldHide = ["top", "diagnosis"].some((id) => {
      const section = document.getElementById(id);
      if (!section) return false;
      const rect = section.getBoundingClientRect();
      return rect.bottom > 90 && rect.top < window.innerHeight - 70;
    });
    mobileCta.classList.toggle("is-hidden", shouldHide);
  };
  const observer = new IntersectionObserver(
    () => {
      syncMobileCtaVisibility();
    },
    { threshold: 0.12 },
  );

  ["top", "diagnosis"].forEach((id) => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });
  syncMobileCtaVisibility();
  window.addEventListener("scroll", syncMobileCtaVisibility, { passive: true });
  window.addEventListener("resize", syncMobileCtaVisibility);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
});
