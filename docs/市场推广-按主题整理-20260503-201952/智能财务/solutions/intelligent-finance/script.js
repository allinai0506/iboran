const siteHeader = document.querySelector(".site-header");
const mobileMenu = document.querySelector(".mobile-menu");
const scrollLinks = document.querySelectorAll("[data-scroll-target]");
const trackTargets = document.querySelectorAll("[data-track]");
const feedbackTargets = document.querySelectorAll(".btn, .header-cta, .mobile-cta a, .faq-item button, .modal-submit, .mobile-menu, .scenario-card, .role-grid article");
const leadForm = document.querySelector(".lead-form");
const mobileCta = document.querySelector(".mobile-cta");

let formStarted = false;
let scroll50Tracked = false;
let scroll90Tracked = false;

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
    form_name: form.dataset.formName || "intelligent-finance-diagnosis",
    source_page: data.get("source_page") || "",
    source_path: data.get("source_path") || "",
    source_url: data.get("source_url") || window.location.href,
    referrer: data.get("referrer") || document.referrer,
    utm_source: data.get("utm_source") || "",
    utm_medium: data.get("utm_medium") || "",
    utm_campaign: data.get("utm_campaign") || "",
    name: data.get("name") || "",
    company: data.get("company") || "",
    role: data.get("role") || "",
    company_size: data.get("companySize") || "",
    current_system: data.get("currentSystem") || "",
    interest_scenarios: getCheckedValues(form, "interestScenarios").join(","),
    is_multi_org: data.get("isMultiOrg") || "",
    has_overseas_entity: data.get("hasOverseasEntity") || "",
    finance_needs: getCheckedValues(form, "financeNeeds").join(","),
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
  if (target.dataset.roleId) payload.role_id = target.dataset.roleId;
  if (target.dataset.roleName) payload.role_name = target.dataset.roleName;
  return payload;
}

trackEvent("view_intelligent_finance_page", {
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
    if (eventName === "submit_intelligent_finance_form") return;
    trackEvent(eventName, getTrackPayload(target));
  });
});

feedbackTargets.forEach((button) => {
  button.addEventListener("click", addRipple);
});

document.querySelectorAll(".scenario-card").forEach((card) => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".scenario-card").forEach((item) => item.classList.remove("is-active"));
    card.classList.add("is-active");
    trackEvent("click_if_scenario_card", {
      scenario_id: card.dataset.scenarioId || "",
      scenario_name: card.dataset.scenarioName || card.querySelector("h3")?.textContent.trim() || "",
    });
  });
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      card.click();
    }
  });
});

document.querySelectorAll(".role-grid article").forEach((card) => {
  card.addEventListener("click", () => {
    trackEvent("click_if_role_card", {
      role_id: card.dataset.roleId || "",
      role_name: card.dataset.roleName || card.querySelector("h3")?.textContent.trim() || "",
    });
  });
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      card.click();
    }
  });
});

document.querySelectorAll(".faq-item button").forEach((button, index) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    if (!item) return;
    const isOpen = item.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) {
      trackEvent("expand_if_faq", {
        faq_index: index + 1,
        question: button.textContent.trim(),
      });
    }
  });
});

if (leadForm) {
  populateSourceFields(leadForm);

  leadForm.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener(
      "focus",
      () => {
        if (formStarted) return;
        formStarted = true;
        trackEvent("start_intelligent_finance_form", {
          form_name: leadForm.dataset.formName || "intelligent-finance-diagnosis",
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
      setFormHint(leadForm, "已收到您的智能财务场景诊断需求，请勿重复提交。", "success");
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
      const reason = firstInvalid === phone ? "invalid_phone" : "missing_required";
      trackEvent("submit_intelligent_finance_form_error", {
        reason,
        field: firstInvalid.name || firstInvalid.dataset.requiredGroup || "",
      });
      setFormHint(leadForm, "请先补充姓名、手机号、公司名称、关注场景，并勾选隐私协议；手机号需为有效中国大陆手机号。", "error");
      const focusTarget = firstInvalid.matches?.("fieldset") ? firstInvalid.querySelector("input") : firstInvalid;
      focusTarget?.focus();
      return;
    }

    const submitButton = leadForm.querySelector(".modal-submit");
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.dataset.originalText = submitButton.textContent.trim();
      submitButton.firstChild.textContent = "正在提交...";
    }

    window.setTimeout(() => {
      trackEvent("submit_intelligent_finance_form", collectFormPayload(leadForm));
      leadForm.dataset.submitted = "true";
      setFormHint(
        leadForm,
        "已收到您的智能财务场景诊断需求，泊冉顾问将结合您的行业、系统现状和关注场景进行初步评估。",
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
    (entries) => {
      entries.forEach((entry) => {
        entry.target.toggleAttribute("data-mobile-cta-trigger-visible", entry.isIntersecting);
      });
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

window.addEventListener(
  "scroll",
  () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = scrollTop / maxScroll;

    if (!scroll50Tracked && progress >= 0.5) {
      scroll50Tracked = true;
      trackEvent("scroll_50", { page: "intelligent_finance" });
    }

    if (!scroll90Tracked && progress >= 0.9) {
      scroll90Tracked = true;
      trackEvent("scroll_90", { page: "intelligent_finance" });
    }
  },
  { passive: true },
);
