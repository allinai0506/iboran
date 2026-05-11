const siteHeader = document.querySelector(".site-header");
const mobileMenu = document.querySelector(".mobile-menu");
const scrollLinks = document.querySelectorAll("[data-scroll-target]");
const trackTargets = document.querySelectorAll("[data-track]");
const industryTabs = document.querySelectorAll(".industry-tabs button");
const industryPanels = document.querySelectorAll(".industry-panel");
const leadForm = document.querySelector(".lead-form");
const feedbackTargets = document.querySelectorAll(
  ".btn, .header-cta, .mobile-cta a, .mobile-menu, .faq-item button, .modal-submit, .industry-tabs button",
);
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

function getFormPayload(form) {
  const data = new FormData(form);
  return {
    form_name: form.dataset.formName || "yonsuite-consultation",
    company: data.get("company") || "",
    city: data.get("city") || "",
    industry: data.get("industry") || "",
    contact: data.get("contact") || "",
    title: data.get("title") || "",
    phone: data.get("phone") || "",
    company_size: data.get("company_size") || "",
    current_system: data.get("current_system") || "",
    focus_scene: data.get("focus_scene") || "",
    has_yonyou: data.get("has_yonyou") || "",
    launch_time: data.get("launch_time") || "",
    problem: data.get("problem") || "",
    source_url: document.querySelector('link[rel="canonical"]')?.href || window.location.href,
  };
}

function activateIndustry(targetKey) {
  industryTabs.forEach((tab) => {
    const isActive = tab.dataset.industry === targetKey;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  industryPanels.forEach((panel) => {
    const isActive = panel.dataset.panel === targetKey;
    panel.classList.toggle("active", isActive);
    panel.toggleAttribute("hidden", !isActive);
  });
}

mobileMenu?.setAttribute("aria-expanded", "false");
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
    trackEvent(target.dataset.track, {
      label: target.textContent.trim(),
      href: target.getAttribute("href") || "",
      product: target.dataset.product || "",
      scenario: target.dataset.scenario || "",
      ai: target.dataset.ai || "",
      cta_mode: target.dataset.ctaMode || "",
    });
  });
});

document.querySelectorAll('[tabindex="0"][data-track]').forEach((item) => {
  item.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      item.click();
    }
  });
});

industryTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const industry = tab.dataset.industry;
    activateIndustry(industry);
    trackEvent("yonsuite_industry_tab_click", {
      industry,
      label: tab.textContent.trim(),
    });
  });
});

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    if (!item) return;
    const isOpen = item.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) {
      trackEvent("yonsuite_faq_expand", { question: button.textContent.trim() });
    }
  });
});

feedbackTargets.forEach((target) => {
  target.addEventListener("click", addRipple);
});

if (leadForm) {
  leadForm.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener(
      "focus",
      () => {
        if (formStarted) return;
        formStarted = true;
        trackEvent("yonsuite_form_start", { form_name: leadForm.dataset.formName || "yonsuite-consultation" });
      },
      { once: true },
    );
  });

  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const requiredFields = Array.from(leadForm.querySelectorAll("input[required], select[required], textarea[required]"));
    const invalidFields = requiredFields.filter((field) => !String(field.value || "").trim());
    const phone = leadForm.elements.phone;

    if (phone?.value.trim() && !/^[0-9+\-\s]{6,20}$/.test(phone.value.trim())) {
      invalidFields.push(phone);
    }

    leadForm.querySelectorAll(".is-invalid").forEach((field) => field.classList.remove("is-invalid"));
    invalidFields.forEach((field) => field.classList.add("is-invalid"));

    if (invalidFields.length) {
      setFormHint(leadForm, "请先补充公司名称、所在城市、行业、联系人和有效手机号。", "error");
      invalidFields[0].focus();
      return;
    }

    trackEvent("yonsuite_form_submit", getFormPayload(leadForm));
    setFormHint(leadForm, "已收到YonSuite咨询需求，泊冉顾问会结合行业、当前系统和关注场景与您沟通。", "success");
    leadForm.reset();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
});

window.addEventListener("load", () => {
  trackEvent("yonsuite_page_view", {
    path: window.location.pathname,
    title: document.title,
    url: document.querySelector('link[rel="canonical"]')?.href || window.location.href,
  });
});
