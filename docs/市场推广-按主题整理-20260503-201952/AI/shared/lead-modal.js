(function () {
  if (window.__boranLeadModalReady) return;
  window.__boranLeadModalReady = true;

  const bottomForm = document.querySelector(".lead-form");
  if (!bottomForm || document.querySelector(".appointment-modal")) return;

  const triggerSelector = [
    "[data-lead-modal]",
    "[data-modal-open]",
    "a[href='#diagnosis']",
    "a[href='#consultation']",
    "a[href='#appointment']",
  ].join(",");

  const fallbackTitle = bottomForm.querySelector("h3")?.textContent.trim() || "预约顾问沟通";
  let started = false;
  let lastFocus = null;

  function trackEvent(name, payload = {}) {
    if (!name) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...payload });
    document.dispatchEvent(new CustomEvent("boran:track", { detail: { name, ...payload } }));
  }

  function submitEventName(type) {
    const formName = bottomForm.dataset.formName || "";
    if (formName.includes("yonyou-bip")) {
      if (type === "start") return "lead_form_start_yonyou_bip";
      if (type === "error") return "lead_submit_error_yonyou_bip";
      return "lead_submit_yonyou_bip";
    }
    if (type === "start") return "lead_form_start_marketing_modal";
    if (type === "error") return "lead_submit_error_marketing_modal";
    return "lead_submit_marketing_modal";
  }

  function buildModal() {
    const modal = document.createElement("div");
    modal.className = "boran-lead-modal";
    modal.id = "boran-lead-modal";
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = `
      <div class="boran-lead-modal__backdrop" data-lead-modal-close></div>
      <section class="boran-lead-modal__card" role="dialog" aria-modal="true" aria-labelledby="boran-lead-modal-title">
        <div class="boran-lead-modal__head">
          <div>
            <h2 id="boran-lead-modal-title">${fallbackTitle}</h2>
            <p>留下基本信息即可，泊冉顾问会结合企业现有系统、业务场景和建设方向与您沟通。</p>
          </div>
          <button class="boran-lead-modal__close" type="button" data-lead-modal-close aria-label="关闭弹窗">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" fill="none" /></svg>
          </button>
        </div>
        <form class="boran-lead-modal__form" novalidate>
          <div class="boran-lead-modal__row">
            <label>企业名称 <b>*</b><input name="company" type="text" autocomplete="organization" required /></label>
            <label>联系人 <b>*</b><input name="contact" type="text" autocomplete="name" required /></label>
          </div>
          <label>手机 / 微信 <b>*</b><input name="phone_wechat" type="text" autocomplete="tel" required /></label>
          <label>沟通需求<textarea name="remark" rows="3" placeholder="例如：当前系统、关注场景、计划推进方向。"></textarea></label>
          <p class="boran-lead-modal__hint" role="status" aria-live="polite">提交后，泊冉顾问将结合您的业务场景与系统现状进行沟通。</p>
          <button class="boran-lead-modal__submit" type="submit">提交需求</button>
        </form>
      </section>
    `;
    document.body.appendChild(modal);
    return modal;
  }

  const modal = buildModal();
  const modalTitle = modal.querySelector("#boran-lead-modal-title");
  const modalForm = modal.querySelector(".boran-lead-modal__form");
  const modalHint = modal.querySelector(".boran-lead-modal__hint");

  function setHint(message, type) {
    modalHint.classList.remove("is-error", "is-success");
    if (type) modalHint.classList.add(`is-${type}`);
    modalHint.textContent = message;
  }

  function getPayload() {
    const data = new FormData(modalForm);
    return {
      form_name: bottomForm.dataset.formName || "marketing-lead",
      company: data.get("company") || "",
      contact: data.get("contact") || "",
      phone_wechat: data.get("phone_wechat") || "",
      remark: data.get("remark") || "",
      source_url: document.querySelector('link[rel="canonical"]')?.href || window.location.href,
      referrer: document.referrer || "",
      page_title: document.title,
    };
  }

  function markStarted(fieldName) {
    if (started) return;
    started = true;
    trackEvent(submitEventName("start"), {
      form_name: bottomForm.dataset.formName || "marketing-lead",
      field: fieldName || "",
      source: "modal",
    });
  }

  function openModal(trigger) {
    lastFocus = document.activeElement;
    const title = trigger?.dataset.modalTitle || trigger?.textContent.trim() || fallbackTitle;
    const prefill =
      trigger?.dataset.prefillInterest ||
      trigger?.dataset.prefillMessage ||
      trigger?.dataset.prefillScene ||
      trigger?.dataset.prefillIssue ||
      "";
    modalTitle.textContent = title;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("boran-modal-open");
    modalForm.reset();
    modalForm.querySelectorAll(".is-invalid").forEach((field) => field.classList.remove("is-invalid"));
    if (prefill) modalForm.elements.remark.value = prefill;
    started = false;
    setHint("提交后，泊冉顾问将结合您的业务场景与系统现状进行沟通。", "");
    if (trigger?.dataset.track) {
      trackEvent(trigger.dataset.track, {
        label: title,
        href: trigger.getAttribute("href") || "",
        source: "modal",
      });
    }
    trackEvent("lead_modal_open", {
      form_name: bottomForm.dataset.formName || "marketing-lead",
      label: title,
      href: trigger?.getAttribute("href") || "",
      source: trigger?.dataset.track || "",
    });
    window.setTimeout(() => modalForm.elements.company?.focus(), 30);
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("boran-modal-open");
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  document.addEventListener(
    "click",
    (event) => {
      const trigger = event.target.closest(triggerSelector);
      if (!trigger) return;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      openModal(trigger);
    },
    true,
  );

  modal.querySelectorAll("[data-lead-modal-close]").forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  modalForm.querySelectorAll("input, textarea").forEach((field) => {
    field.addEventListener("focus", () => markStarted(field.name), { once: true });
    field.addEventListener("input", () => {
      markStarted(field.name);
      field.classList.remove("is-invalid");
    });
  });

  modalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const required = Array.from(modalForm.querySelectorAll("[required]"));
    const invalid = required.filter((field) => !String(field.value || "").trim());
    const phone = modalForm.elements.phone_wechat;
    if (phone?.value.trim() && phone.value.trim().length < 3 && !invalid.includes(phone)) {
      invalid.push(phone);
    }

    modalForm.querySelectorAll(".is-invalid").forEach((field) => field.classList.remove("is-invalid"));
    invalid.forEach((field) => field.classList.add("is-invalid"));

    if (invalid.length) {
      trackEvent(submitEventName("error"), {
        form_name: bottomForm.dataset.formName || "marketing-lead",
        source: "modal",
        field: invalid[0].name || "",
      });
      setHint("请先补充企业名称、联系人和有效的手机 / 微信。", "error");
      invalid[0].focus();
      return;
    }

    const submit = modalForm.querySelector(".boran-lead-modal__submit");
    submit.disabled = true;
    window.setTimeout(() => {
      trackEvent(submitEventName("success"), { ...getPayload(), source: "modal" });
      setHint("已收到需求，泊冉顾问会尽快与您沟通。", "success");
      submit.disabled = false;
    }, 300);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });
})();
