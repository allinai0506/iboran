const siteHeader = document.querySelector(".site-header");
const mobileMenu = document.querySelector(".mobile-menu");
const scrollLinks = document.querySelectorAll("[data-scroll-target]");
const trackTargets = document.querySelectorAll("[data-track]");
const feedbackTargets = document.querySelectorAll(".btn, .header-cta, .mobile-cta a, .faq-item button, .modal-submit, .mobile-menu, .scenario-card, .tab-button");
const leadForm = document.querySelector(".lead-form");

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

function collectFormPayload(form) {
  const data = new FormData(form);
  return {
    form_name: form.dataset.formName || "manufacturing-diagnosis",
    source_page: data.get("source_page") || "",
    source_path: data.get("source_path") || "",
    source_url: data.get("source_url") || window.location.href,
    referrer: data.get("referrer") || document.referrer,
    utm_source: data.get("utm_source") || "",
    utm_medium: data.get("utm_medium") || "",
    utm_campaign: data.get("utm_campaign") || "",
    subindustry: data.get("subindustry") || "",
    current_system: data.get("current_system") || "",
    core_pain: data.get("core_pain") || "",
    has_yonyou: data.get("has_yonyou") || "",
    launch_time: data.get("launch_time") || "",
  };
}

function activateTab(button) {
  const group = button.dataset.tabGroup;
  const targetId = button.dataset.tabTarget;
  if (!group || !targetId) return;

  const groupButtons = document.querySelectorAll(`[data-tab-group="${group}"]`);
  groupButtons.forEach((item) => {
    const isActive = item === button;
    item.classList.toggle("is-active", isActive);
    item.setAttribute("aria-selected", String(isActive));
  });

  const panelIds = Array.from(groupButtons).map((item) => item.dataset.tabTarget).filter(Boolean);
  panelIds.forEach((id) => {
    const panel = document.getElementById(id);
    if (!panel) return;
    const isActive = id === targetId;
    panel.classList.toggle("is-active", isActive);
    panel.toggleAttribute("hidden", !isActive);
  });

  trackEvent(button.dataset.track, {
    group,
    tab: targetId,
    label: button.textContent.trim(),
  });
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
    if (!id || !id.startsWith("#")) return;
    const target = document.querySelector(id);
    if (!target) return;
    closeMobileMenu();
    window.setTimeout(() => highlightTarget(target), 360);
  });
});

trackTargets.forEach((target) => {
  target.addEventListener("click", () => {
    if (target.matches("[data-tab-target]")) return;
    const eventName = target.dataset.track;
    const payload = {
      label: target.textContent.trim(),
      href: target.getAttribute("href") || "",
    };
    if (target.dataset.scenario) payload.scenario = target.dataset.scenario;
    if (target.dataset.ctaMode) payload.cta_mode = target.dataset.ctaMode;
    trackEvent(eventName, payload);
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

document.querySelectorAll(".tab-button").forEach((button) => {
  button.addEventListener("click", () => activateTab(button));
  button.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      activateTab(button);
    }
  });
});

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    if (!item) return;
    const isOpen = item.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) {
      trackEvent("manufacturing_faq_expand", { question: button.textContent.trim() });
    }
  });
});

if (leadForm) {
  populateSourceFields(leadForm);
  leadForm.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("input", () => field.classList.remove("is-invalid"));
    field.addEventListener("change", () => field.classList.remove("is-invalid"));
    field.addEventListener(
      "focus",
      () => {
        if (formStarted) return;
        formStarted = true;
        trackEvent("manufacturing_form_start", { form_name: leadForm.dataset.formName || "manufacturing-diagnosis" });
      },
      { once: true },
    );
  });

  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    populateSourceFields(leadForm);

    const phone = leadForm.elements.phone;
    const normalizedPhone = normalizePhone(phone?.value || "");
    const invalidFields = [];

    if (!phone || !normalizedPhone || !/^1[3-9]\d{9}$/.test(normalizedPhone)) {
      invalidFields.push(phone);
    }

    leadForm.querySelectorAll("input, select, textarea").forEach((field) => {
      field.classList.toggle("is-invalid", invalidFields.includes(field));
    });

    if (invalidFields.length) {
      trackEvent("manufacturing_form_submit_error", { reason: "invalid_phone" });
      setFormHint(leadForm, "请填写有效手机号。", "error");
      invalidFields[0]?.focus();
      return;
    }

    trackEvent("manufacturing_form_submit", collectFormPayload(leadForm));
    setFormHint(leadForm, "已收到您的制造业诊断需求，泊冉顾问将尽快联系您", "success");
    leadForm.dataset.submitted = "true";
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
      trackEvent("manufacturing_scroll_50");
    }

    if (!scroll90Tracked && progress >= 0.9) {
      scroll90Tracked = true;
      trackEvent("manufacturing_scroll_90");
    }
  },
  { passive: true },
);
