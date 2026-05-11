const siteHeader = document.querySelector(".site-header");
const mobileMenu = document.querySelector(".mobile-menu");
const scrollLinks = document.querySelectorAll("[data-scroll-target]");
const trackTargets = document.querySelectorAll("[data-track]");
const feedbackTargets = document.querySelectorAll(".btn, .header-cta, .mobile-cta a, .segment-tab, .faq-item button, .modal-submit, .mobile-menu");
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
  document.body.classList.remove("menu-open");
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
  setHiddenValue(form, "source_url", canonicalUrl);
  setHiddenValue(form, "referrer", document.referrer);
  ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((key) => {
    setHiddenValue(form, key, params.get(key));
  });
}

function collectFormPayload(form) {
  const data = new FormData(form);
  const interests = data.getAll("interest");
  return {
    form_name: form.dataset.formName || "service-assessment",
    source_page: data.get("source_page") || "",
    source_path: data.get("source_path") || "",
    source_url: data.get("source_url") || window.location.href,
    referrer: data.get("referrer") || document.referrer,
    utm_source: data.get("utm_source") || "",
    utm_medium: data.get("utm_medium") || "",
    utm_campaign: data.get("utm_campaign") || "",
    customer_type: data.get("customer_type") || "",
    current_system: data.get("current_system") || "",
    interests: interests.join(","),
  };
}

function prefillInterest(text) {
  if (!leadForm || !text) return;
  const normalized = text.trim();
  const checkboxes = Array.from(leadForm.querySelectorAll('input[name="interest"]'));
  const matched = checkboxes.find((item) => normalized.includes(item.value) || item.value.includes(normalized));
  if (matched) {
    matched.checked = true;
    return;
  }
  const remark = leadForm.elements.remark;
  if (remark && !remark.value.trim()) remark.value = normalized;
}

mobileMenu?.addEventListener("click", () => {
  const isOpen = siteHeader?.classList.toggle("is-menu-open") || false;
  document.body.classList.toggle("menu-open", isOpen);
  mobileMenu.setAttribute("aria-expanded", String(isOpen));
  trackEvent("mobile_menu_toggle", { open: isOpen });
});

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

scrollLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const id = link.getAttribute("href");
    const interest = link.dataset.prefillInterest;
    if (interest) prefillInterest(interest);
    if (!id || !id.startsWith("#")) return;
    const target = document.querySelector(id);
    if (!target) return;
    closeMobileMenu();
    window.setTimeout(() => highlightTarget(target), 360);
  });
});

document.querySelectorAll("[data-segment-group]").forEach((group) => {
  const tabs = Array.from(group.querySelectorAll("[data-segment-tab]"));
  const panels = Array.from(group.querySelectorAll("[data-segment-panel]"));
  const activateSegment = (target, shouldTrack = false) => {
    const activeTab = tabs.find((item) => item.dataset.segmentTab === target);
    if (!activeTab) return;
    tabs.forEach((item) => item.setAttribute("aria-selected", String(item === activeTab)));
    panels.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.segmentPanel === target));
    if (shouldTrack) trackEvent("segment_tab_click", { segment: target, label: activeTab.textContent.trim() });
  };
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activateSegment(tab.dataset.segmentTab, true);
    });
  });
  const hashTarget = window.location.hash ? document.querySelector(window.location.hash) : null;
  const hashPanel = hashTarget?.matches("[data-segment-panel]")
    ? hashTarget
    : hashTarget?.closest("[data-segment-panel]");
  if (hashPanel && group.contains(hashPanel)) {
    activateSegment(hashPanel.dataset.segmentPanel);
    window.setTimeout(() => {
      hashPanel.scrollIntoView({ block: "start" });
      highlightTarget(hashPanel);
    }, 120);
  }
});

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    if (!item) return;
    const isOpen = item.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) trackEvent("faq_expand", { question: button.textContent.trim() });
  });
});

trackTargets.forEach((target) => {
  target.addEventListener("click", () => {
    const eventName = target.dataset.track;
    if (eventName === "form_submit") return;
    trackEvent(eventName, {
      label: target.textContent.trim(),
      href: target.getAttribute("href") || "",
    });
  });
});

feedbackTargets.forEach((button) => {
  button.addEventListener("click", addRipple);
});

if (leadForm) {
  populateSourceFields(leadForm);
  leadForm.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener(
      "focus",
      () => {
        if (formStarted) return;
        formStarted = true;
        trackEvent("form_start", { form_name: leadForm.dataset.formName || "service-assessment" });
      },
      { once: true },
    );
  });

  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    populateSourceFields(leadForm);
    const requiredFields = Array.from(leadForm.querySelectorAll("input[required]"));
    const invalidFields = requiredFields.filter((field) => !field.value.trim());
    const phone = leadForm.elements.phone;
    if (phone?.value.trim() && !/^[0-9+\-\s]{6,20}$/.test(phone.value.trim())) {
      invalidFields.push(phone);
    }

    requiredFields.forEach((field) => {
      field.classList.toggle("is-invalid", invalidFields.includes(field));
    });
    if (phone) phone.classList.toggle("is-invalid", invalidFields.includes(phone));

    if (invalidFields.length) {
      setFormHint(leadForm, "请先补充姓名、公司名称和有效手机号。", "error");
      invalidFields[0].focus();
      return;
    }

    trackEvent("form_submit", collectFormPayload(leadForm));
    setFormHint(leadForm, "已收到服务评估需求，泊冉顾问会结合您的系统阶段与服务关注点沟通。", "success");
    leadForm.reset();
    populateSourceFields(leadForm);
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMobileMenu();
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
