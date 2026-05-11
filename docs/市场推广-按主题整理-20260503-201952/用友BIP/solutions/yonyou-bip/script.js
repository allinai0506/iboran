const siteHeader = document.querySelector(".site-header");
const mobileMenu = document.querySelector(".mobile-menu");
const scrollLinks = document.querySelectorAll("[data-scroll-target]");
const leadForm = document.querySelector(".lead-form");
const feedbackTargets = document.querySelectorAll(
  ".btn, .header-cta, .mobile-cta a, .mobile-menu, .faq-item button, .modal-submit, [data-track='migration_card_click'], [data-track='scenario_card_click'], [data-track='role_card_click'], [data-track='industry_card_click']",
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

function getValues(form, name) {
  return new FormData(form).getAll(name).filter(Boolean).join(",");
}

function getFormPayload(form) {
  const data = new FormData(form);
  return {
    form_name: form.dataset.formName || "yonyou-bip-consultation",
    company: data.get("company") || "",
    contact: data.get("contact") || "",
    phone_wechat: data.get("phone_wechat") || "",
    current_system: getValues(form, "current_system"),
    upgrade_direction: getValues(form, "upgrade_direction"),
    focus_scene: getValues(form, "focus_scene"),
    company_size: data.get("company_size") || "",
    industry: data.get("industry") || "",
    localization: data.get("localization") || "",
    ai_interest: data.get("ai_interest") || "",
    contact_time: data.get("contact_time") || "",
    source_url: document.querySelector('link[rel="canonical"]')?.href || window.location.href,
    referrer: document.referrer || "",
  };
}

function markCardAsActive(card, selector) {
  document.querySelectorAll(selector).forEach((item) => item.classList.remove("is-active"));
  card.classList.add("is-active");
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

document.querySelectorAll("[data-track]").forEach((target) => {
  target.addEventListener("click", () => {
    const eventName = target.dataset.track;
    if (!eventName) return;
    if (eventName === "migration_card_click") {
      markCardAsActive(target, "[data-track='migration_card_click']");
      trackEvent(eventName, { system_type: target.dataset.systemType || "" });
      return;
    }
    if (eventName === "scenario_card_click") {
      markCardAsActive(target, "[data-track='scenario_card_click']");
      trackEvent(eventName, { scenario_name: target.dataset.scenarioName || target.querySelector("h3")?.textContent.trim() || "" });
      return;
    }
    if (eventName === "role_card_click") {
      markCardAsActive(target, "[data-track='role_card_click']");
      trackEvent(eventName, { role_name: target.dataset.roleName || target.querySelector("h3")?.textContent.trim() || "" });
      return;
    }
    if (eventName === "industry_card_click") {
      markCardAsActive(target, "[data-track='industry_card_click']");
      trackEvent(eventName, { industry_name: target.dataset.industryName || target.querySelector("h3")?.textContent.trim() || "" });
      return;
    }
    trackEvent(eventName, {
      label: target.textContent.trim(),
      href: target.getAttribute("href") || "",
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

feedbackTargets.forEach((target) => {
  target.addEventListener("click", addRipple);
});

if (leadForm) {
  leadForm.querySelectorAll("input, select, textarea").forEach((field) => {
    const markStarted = () => {
      if (formStarted) return;
      formStarted = true;
      trackEvent("lead_form_start_yonyou_bip", {
        form_name: leadForm.dataset.formName || "yonyou-bip-consultation",
        field: field.name || "",
      });
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

  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const requiredFields = Array.from(leadForm.querySelectorAll("input[required], select[required], textarea[required]"));
    const invalidFields = requiredFields.filter((field) => !String(field.value || "").trim());
    const contactField = leadForm.elements.phone_wechat;

    if (contactField?.value.trim() && contactField.value.trim().length < 3) {
      invalidFields.push(contactField);
    }

    leadForm.querySelectorAll(".is-invalid").forEach((field) => field.classList.remove("is-invalid"));
    invalidFields.forEach((field) => field.classList.add("is-invalid"));

    if (invalidFields.length) {
      const firstInvalid = invalidFields[0];
      trackEvent("lead_submit_error_yonyou_bip", {
        reason: firstInvalid.name === "phone_wechat" ? "invalid_contact" : "missing_required",
        field: firstInvalid.name || "",
      });
      setFormHint(leadForm, "请先补充企业名称、联系人和有效的手机 / 微信。", "error");
      firstInvalid.focus();
      return;
    }

    const submitButton = leadForm.querySelector(".modal-submit");
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.dataset.originalText = submitButton.textContent.trim();
    }

    window.setTimeout(() => {
      trackEvent("lead_submit_yonyou_bip", getFormPayload(leadForm));
      setFormHint(leadForm, "已收到BIP建设需求，泊冉顾问会结合系统现状、升级方向、关注场景和信创/AI诉求与您沟通。", "success");
      if (submitButton) {
        submitButton.disabled = false;
      }
    }, 300);
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
});

window.addEventListener("load", () => {
  trackEvent("page_view_yonyou_bip", {
    path: window.location.pathname,
    title: document.title,
    url: document.querySelector('link[rel="canonical"]')?.href || window.location.href,
  });
});
