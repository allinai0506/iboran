const siteHeader = document.querySelector(".site-header");
const mobileMenu = document.querySelector(".mobile-menu");
const scrollLinks = document.querySelectorAll("[data-scroll-target]");
const trackTargets = document.querySelectorAll("[data-track]");
const mobileCta = document.querySelector(".mobile-cta");
const feedbackTargets = document.querySelectorAll(
  ".btn, .header-cta, .mobile-cta a, .faq-item button, .modal-submit, .mobile-menu",
);

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
    field.addEventListener("input", () => field.classList.remove("is-invalid"));
    field.addEventListener("change", () => field.classList.remove("is-invalid"));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (form.dataset.submitted === "true" || form.dataset.submitting === "true") {
      trackEvent("form_submit_error", { reason: "duplicate_submit" });
      setFormHint(form, "诊断需求已提交，请勿重复提交。", "success");
      return;
    }

    const formData = new FormData(form);
    trackEvent("form_submit", {
      industry: formData.get("industry") || "",
      scene: formData.get("scene") || "",
      system: formData.get("system") || "",
    });

    const requiredFields = Array.from(form.querySelectorAll("input[required], select[required], textarea[required]"));
    const invalidFields = requiredFields.filter((field) => !String(field.value || "").trim());
    const phone = form.elements.phone;
    const normalizedPhone = normalizePhone(phone?.value || "");

    if (phone && normalizedPhone && !/^1[3-9]\d{9}$/.test(normalizedPhone)) {
      invalidFields.push(phone);
    }

    fields.forEach((field) => {
      field.classList.toggle("is-invalid", invalidFields.includes(field));
    });

    if (invalidFields.length) {
      const firstInvalid = invalidFields[0];
      trackEvent("form_submit_error", {
        reason: firstInvalid.name === "phone" ? "invalid_phone" : "missing_required",
        field: firstInvalid.name || "",
      });
      setFormHint(form, "请先补充公司名称、所属行业、关注场景、联系人和有效手机号。", "error");
      firstInvalid.focus();
      return;
    }

    form.dataset.submitting = "true";
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.dataset.originalText = submitButton.textContent.trim();
      submitButton.firstChild.textContent = "正在提交...";
    }

    window.setTimeout(() => {
      form.dataset.submitting = "false";
      form.dataset.submitted = "true";
      trackEvent("form_submit_success", {
        industry: formData.get("industry") || "",
        scene: formData.get("scene") || "",
      });
      setFormHint(form, "已收到诊断需求，泊冉顾问会结合GMP/GSP、UDI、CSV、批号效期、库存追溯和业财一体化场景与您沟通。", "success");
    }, 500);
  });
});

if ("IntersectionObserver" in window && mobileCta) {
  const hiddenTriggerIds = ["top", "diagnosis"];
  const activeTriggers = new Set();
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
