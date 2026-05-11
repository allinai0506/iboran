const siteHeader = document.querySelector(".site-header");
const mobileMenu = document.querySelector(".mobile-menu");
const scrollLinks = document.querySelectorAll("[data-scroll-target]");
const trackTargets = document.querySelectorAll("[data-track]");
const feedbackTargets = document.querySelectorAll(".btn, .header-cta, .mobile-cta a, .faq-item button, .modal-submit, .mobile-menu, .scenario-card, .ltc-card, .fit-card, .role-tab");
const leadForm = document.querySelector(".lead-form");
const PAGE_PATH = "/solutions/eto-mto-manufacturing";
let scroll50Tracked = false;
let scroll90Tracked = false;
let formStarted = false;

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
  setHiddenValue(form, "page_path", PAGE_PATH);
  setHiddenValue(form, "landing_page", canonicalUrl);
  setHiddenValue(form, "referrer", document.referrer);
  ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((key) => {
    setHiddenValue(form, key, params.get(key));
  });
}

function collectFormPayload(form) {
  const data = new FormData(form);
  return {
    form_name: form.dataset.formName || "eto-mto-manufacturing-lead",
    page_path: data.get("page_path") || PAGE_PATH,
    landing_page: data.get("landing_page") || window.location.href,
    referrer: data.get("referrer") || document.referrer,
    utm_source: data.get("utm_source") || "",
    utm_medium: data.get("utm_medium") || "",
    utm_campaign: data.get("utm_campaign") || "",
    utm_term: data.get("utm_term") || "",
    utm_content: data.get("utm_content") || "",
    button_source: data.get("button_source") || "",
    industry: data.get("industry") || "",
    company_size: data.get("company_size") || "",
    role: data.get("role") || "",
    pain_points: data.getAll("pain_point").join(","),
    erp_status: data.get("erp_status") || "",
    system_status: data.get("system_status") || "",
    launch_time: data.get("launch_time") || "",
  };
}

function prefillPain(text) {
  if (!leadForm || !text) return;
  const normalized = text.trim();
  const checkboxes = Array.from(leadForm.querySelectorAll('input[name="pain_point"]'));
  const matched = checkboxes.find((item) => normalized.includes(item.value) || item.value.includes(normalized));
  if (matched) {
    matched.checked = true;
    return;
  }
  const remark = leadForm.elements.remark;
  if (remark && !remark.value.trim()) {
    remark.value = normalized;
  }
}

function setButtonSource(source) {
  if (!leadForm || !source) return;
  setHiddenValue(leadForm, "button_source", source);
}

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
    const id = link.getAttribute("href");
    if (link.dataset.prefillIssue) prefillPain(link.dataset.prefillIssue);
    if (link.dataset.buttonSource) setButtonSource(link.dataset.buttonSource);
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
    if (eventName === "lead_form_submit" || eventName === "form_submit") return;
    const payload = {
      label: target.textContent.trim(),
      href: target.getAttribute("href") || "",
    };
    if (target.dataset.scenario) payload.scenario = target.dataset.scenario;
    if (target.dataset.card) payload.card = target.dataset.card;
    if (target.dataset.role) payload.role = target.dataset.role;
    if (target.dataset.ctaMode) payload.cta_mode = target.dataset.ctaMode;
    trackEvent(eventName, payload);
    if (target.dataset.extraTrack) {
      trackEvent(target.dataset.extraTrack, payload);
    }
  });
});

feedbackTargets.forEach((button) => {
  button.addEventListener("click", addRipple);
});

document.querySelectorAll(".scenario-card, .ltc-card, .fit-card").forEach((card) => {
  card.addEventListener("click", () => {
    card.parentElement?.querySelectorAll(".is-active").forEach((item) => item.classList.remove("is-active"));
    card.classList.add("is-active");
  });
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      card.click();
    }
  });
});

document.querySelectorAll("[data-role-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    const role = button.dataset.roleTab;
    document.querySelectorAll("[data-role-tab]").forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
    });
    document.querySelectorAll("[data-role-panel]").forEach((panel) => {
      panel.hidden = panel.dataset.rolePanel !== role;
    });
    trackEvent("role_tab_click", { role, label: button.textContent.trim() });
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

if (leadForm) {
  populateSourceFields(leadForm);
  leadForm.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener(
      "focus",
      () => {
        if (formStarted) return;
        formStarted = true;
        trackEvent("lead_form_start", { form_name: leadForm.dataset.formName || "eto-mto-manufacturing-lead" });
      },
      { once: true },
    );
  });

  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    populateSourceFields(leadForm);
    const phone = leadForm.elements.phone;
    const invalidFields = [];
    if (!phone?.value.trim() || !/^[0-9+\-\s]{6,20}$/.test(phone.value.trim())) {
      invalidFields.push(phone);
    }

    phone?.classList.toggle("is-invalid", invalidFields.includes(phone));

    if (invalidFields.length) {
      setFormHint(leadForm, "请先填写有效手机号，便于顾问联系您做初步评估。", "error");
      invalidFields[0]?.focus();
      return;
    }

    const payload = collectFormPayload(leadForm);
    trackEvent("lead_form_submit", payload);
    trackEvent("lead_form_success", payload);
    setFormHint(leadForm, "已收到需求，泊冉顾问将结合企业类型、订单模式和系统现状进行初步评估。", "success");
    leadForm.reset();
    populateSourceFields(leadForm);
  });
}

const observerOptions = { threshold: 0.35 };
if ("IntersectionObserver" in window) {
  const ltcSection = document.getElementById("ltc");
  if (ltcSection) {
    const ltcObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        trackEvent("ltc_module_view");
        ltcObserver.disconnect();
      });
    }, observerOptions);
    ltcObserver.observe(ltcSection);
  }

  const scenarioObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || entry.target.dataset.viewTracked === "true") return;
      entry.target.dataset.viewTracked = "true";
      trackEvent("scenario_card_view", { scenario: entry.target.dataset.scenario || entry.target.textContent.trim() });
    });
  }, observerOptions);

  document.querySelectorAll(".scenario-card").forEach((card) => scenarioObserver.observe(card));
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
