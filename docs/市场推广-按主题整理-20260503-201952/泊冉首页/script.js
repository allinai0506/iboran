const nav = document.querySelector("#site-nav");
const menuToggle = document.querySelector(".menu-toggle");
const scrollTargets = document.querySelectorAll("[data-scroll-target]");
const modal = document.querySelector("#lead-modal");
const modalOpeners = document.querySelectorAll("[data-modal-open]");
const modalClosers = document.querySelectorAll("[data-modal-close]");
const trackTargets = document.querySelectorAll("[data-track]");
const feedbackTargets = document.querySelectorAll(
  ".btn, .header-cta, .legacy-card, .scope-grid a, .form-submit, .mobile-cta a, .lead-modal-close",
);
const leadForms = document.querySelectorAll("[data-lead-form]");
let lastFocusedElement = null;

function trackEvent(eventName, params = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...params,
  });
}

function getTargetLabel(element) {
  return element.getAttribute("href") || element.dataset.target || "";
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

function closeMenu() {
  nav?.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
}

function highlightTarget(target) {
  target.classList.remove("target-highlight");
  window.requestAnimationFrame(() => target.classList.add("target-highlight"));
}

function scrollToHash(hash) {
  if (!hash || !hash.startsWith("#")) return false;
  const target = document.querySelector(hash);
  if (!target) return false;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => highlightTarget(target), 420);
  return true;
}

function setHiddenInterest(value) {
  if (!value) return;
  leadForms.forEach((form) => {
    const hiddenInterest = form.querySelector('input[name="hidden_interest"]');
    if (hiddenInterest) hiddenInterest.value = value;
  });
}

function openModal(event, trigger) {
  event?.preventDefault();
  if (!modal) return;
  closeMenu();
  setHiddenInterest(trigger?.dataset.prefillInterest);
  lastFocusedElement = document.activeElement;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  const sourceText = trigger?.dataset.cardTitle || trigger?.textContent.trim() || "预约专家评估";
  trackEvent("lead_modal_open", {
    source: trigger?.dataset.track || "",
    target: getTargetLabel(trigger || modal),
    text: sourceText,
  });

  window.setTimeout(() => {
    const firstInput = modal.querySelector(".modal-lead-form input, .modal-lead-form select, .modal-lead-form textarea");
    firstInput?.focus();
  }, 30);
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  }
}

menuToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

document.addEventListener("click", (event) => {
  if (!nav?.classList.contains("is-open")) return;
  const target = event.target;
  if (!(target instanceof Element)) return;
  if (target.closest(".site-nav") || target.closest(".menu-toggle")) return;
  closeMenu();
});

scrollTargets.forEach((link) => {
  link.addEventListener("click", (event) => {
    const hash = link.getAttribute("href");
    setHiddenInterest(link.dataset.prefillInterest);
    if (scrollToHash(hash)) {
      event.preventDefault();
      closeMenu();
    }
  });
});

modalOpeners.forEach((link) => {
  link.addEventListener("click", (event) => openModal(event, link));
});

modalClosers.forEach((button) => {
  button.addEventListener("click", closeModal);
});

feedbackTargets.forEach((target) => {
  target.addEventListener("click", addRipple);
});

trackTargets.forEach((target) => {
  target.addEventListener("click", () => {
    const eventName = target.dataset.track;
    if (!eventName) return;

    if (eventName === "legacy_yonyou_card_click" || eventName === "legacy_erp_card_click") {
      trackEvent(eventName, {
        product_line: target.dataset.productLine || "",
        card_title: target.dataset.cardTitle || target.textContent.trim(),
        card_type: target.dataset.cardType || "",
        target: getTargetLabel(target),
      });
      return;
    }

    trackEvent(eventName, {
      target: getTargetLabel(target),
      text: target.textContent.trim(),
    });
  });
});

function setFormHint(form, message, type) {
  const formHint = form.querySelector(".form-hint");
  if (!formHint) return;
  formHint.classList.remove("is-error", "is-success");
  if (type) formHint.classList.add(`is-${type}`);
  formHint.textContent = message;
}

function getFormPayload(form) {
  const data = new FormData(form);
  return {
    name: data.get("name") || "",
    company: data.get("company") || "",
    phone: data.get("phone") || "",
    current_system: data.get("current_system") || "",
    interest: data.get("interest") || "",
    hidden_interest: data.get("hidden_interest") || "",
    industry: data.get("industry") || "",
    timeline: data.get("timeline") || "",
    message: data.get("message") || "",
  };
}

leadForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const requiredFields = Array.from(form.querySelectorAll("input[required]"));
    const invalidFields = requiredFields.filter((field) => !field.value.trim());
    requiredFields.forEach((field) => field.classList.toggle("is-invalid", invalidFields.includes(field)));

    const payload = getFormPayload(form);
    const location = form.dataset.formLocation || "bottom";
    const eventName = location === "bottom" ? "bottom_form_submit" : "lead_modal_form_submit";

    if (invalidFields.length) {
      setFormHint(form, "请先补充姓名、公司名称和手机号。", "error");
      invalidFields[0].focus();
      trackEvent(eventName, {
        status: "invalid",
        current_system: payload.current_system,
        interest: payload.interest,
        hidden_interest: payload.hidden_interest,
        industry: payload.industry,
        timeline: payload.timeline,
        form_location: location,
      });
      return;
    }

    setFormHint(form, "已收到评估需求。泊冉顾问会结合当前系统和关注方向沟通下一步。", "success");
    trackEvent(eventName, {
      status: "success",
      current_system: payload.current_system,
      interest: payload.interest,
      hidden_interest: payload.hidden_interest,
      industry: payload.industry,
      timeline: payload.timeline,
      company: payload.company,
      form_location: location,
    });
    form.reset();
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    closeModal();
  }
});
