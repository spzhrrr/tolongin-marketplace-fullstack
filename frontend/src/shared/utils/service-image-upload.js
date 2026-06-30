import { resolveAssetUrl } from "./api.js";
import { toStoredUploadPath } from "./uploads.js";
import { escape } from "./helpers.js";
import { mountImageUpload } from "./upload-widget.js";

const MAX_IMAGES = 5;

function normalizeUrls(input) {
  if (Array.isArray(input)) return input.filter(Boolean).map(String);
  if (typeof input === "string" && input.trim()) return [input.trim()];
  return [];
}

/** HTML mount for 1–5 portfolio / promo images */
export function serviceImagesFieldHtml(existingUrls = []) {
  const urls = normalizeUrls(existingUrls);
  const initial = urls.length ? urls : [""];
  return `
    <div class="service-images-field" id="service-images-field">
      <div class="service-images-grid" id="service-images-grid"></div>
      <button type="button" class="btn btn-secondary btn-sm service-images-add" id="service-images-add">
        <i class="fa-solid fa-plus"></i> Tambah foto (<span id="service-images-count">${initial.filter(Boolean).length}</span>/${MAX_IMAGES})
      </button>
      <input type="hidden" id="serviceImagesJson" value="${escape(JSON.stringify(initial.filter(Boolean)))}">
      <p class="text-xs text-muted" style="margin-top:6px">Unggah 1–5 foto portofolio / bukti kerja. Foto pertama jadi cover di marketplace.</p>
    </div>`;
}

/** @deprecated use serviceImagesFieldHtml — kept for single-image callers */
export function serviceImageFieldHtml(existingUrl = "") {
  return serviceImagesFieldHtml(existingUrl ? [existingUrl] : []);
}

export function initServiceImagesField(container, existingUrls = []) {
  const field = container?.querySelector("#service-images-field");
  const grid = container?.querySelector("#service-images-grid");
  const hidden = container?.querySelector("#serviceImagesJson");
  const addBtn = container?.querySelector("#service-images-add");
  const countEl = container?.querySelector("#service-images-count");
  if (!field || !grid || !hidden) return null;

  let slots = normalizeUrls(existingUrls);
  if (!slots.length) slots = [""];
  const widgets = [];

  function persist() {
    const saved = slots.filter(Boolean);
    hidden.value = JSON.stringify(saved);
    if (countEl) countEl.textContent = String(saved.length);
    if (addBtn) addBtn.disabled = slots.length >= MAX_IMAGES;
  }

  function renderSlots() {
    grid.innerHTML = "";
    widgets.length = 0;

    slots.forEach((url, index) => {
      const slot = document.createElement("div");
      slot.className = "service-image-slot";
      slot.innerHTML = `
        <div class="service-image-slot-head">
          <span class="service-image-slot-label">${index === 0 ? "Cover" : `Foto ${index + 1}`}</span>
          ${slots.length > 1 ? `<button type="button" class="service-image-slot-remove" data-index="${index}" aria-label="Hapus foto"><i class="fa-solid fa-xmark"></i></button>` : ""}
        </div>
        <div class="service-image-slot-mount" data-index="${index}"></div>`;
      grid.appendChild(slot);

      const mountEl = slot.querySelector(".service-image-slot-mount");
      const w = mountImageUpload(mountEl, {
        folder: "services",
        testid: `service-image-${index}`,
        name: `service-image-${index}`,
        initial: url ? resolveAssetUrl(url) : "",
        onChange: (newUrl) => {
          slots[index] = newUrl ? toStoredUploadPath(newUrl) : "";
          persist();
        },
      });
      widgets.push(w);

      slot.querySelector(".service-image-slot-remove")?.addEventListener("click", () => {
        slots.splice(index, 1);
        if (!slots.length) slots = [""];
        renderSlots();
        persist();
      });
    });

    persist();
  }

  addBtn?.addEventListener("click", () => {
    if (slots.length >= MAX_IMAGES) return;
    slots.push("");
    renderSlots();
  });

  renderSlots();
  return { getValue: () => getServiceImagesValue(container) };
}

/** @deprecated */
export function initServiceImageField(container, existingUrl = "") {
  return initServiceImagesField(container, existingUrl ? [existingUrl] : []);
}

export function getServiceImagesValue(container) {
  const raw = container?.querySelector("#serviceImagesJson")?.value;
  try {
    const arr = JSON.parse(raw || "[]");
    return Array.isArray(arr) ? arr.filter(Boolean) : [];
  } catch {
    return [];
  }
}

/** @deprecated — returns first image only */
export function getServiceImageValue(container) {
  const imgs = getServiceImagesValue(container);
  return imgs[0] || "";
}
