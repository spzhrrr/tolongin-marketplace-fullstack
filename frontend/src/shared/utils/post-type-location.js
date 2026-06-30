// Shared type → sub-category → location fields for post jasa / lowongan forms

import { escape } from "./helpers.js";
import { LOCATION_OPTIONS } from "./search-filter-bar.js";

export const POST_TYPE_SEGMENTS = [
  {
    type: "DIGITAL",
    label: "Digital",
    icon: "fa-laptop-code",
    hint: "Dikerjakan dari jarak jauh — lokasi otomatis Remote",
  },
  {
    type: "PHYSICAL",
    label: "Fisik",
    icon: "fa-person-digging",
    hint: "Membutuhkan kehadiran di lokasi — pilih kota",
  },
];

/** Kota untuk dropdown posting (tanpa opsi "Semua kota") */
export const POST_CITY_OPTIONS = LOCATION_OPTIONS.filter((o) => o.value);

export function resolveInitialServiceType(categories, opts = {}) {
  const { categoryId, isRemote, isOnline, location } = opts;
  if (categoryId) {
    const cat = categories.find((c) => c.id === categoryId);
    if (cat?.serviceType) return cat.serviceType;
  }
  if (isRemote === false || isOnline === false) return "PHYSICAL";
  if (location && String(location).toLowerCase() !== "remote") return "PHYSICAL";
  return "DIGITAL";
}

export function matchPostCityValue(location) {
  if (!location || String(location).toLowerCase() === "remote") return "";
  const loc = String(location);
  const exact = POST_CITY_OPTIONS.find((o) => o.value === loc);
  if (exact) return exact.value;
  const partial = POST_CITY_OPTIONS.find(
    (o) => loc.includes(o.value) || o.value.includes(loc),
  );
  return partial?.value || "";
}

/**
 * @param {object} opts
 */
export function postTypeLocationFieldsHtml(opts = {}) {
  const {
    typeFieldId = "postServiceType",
    categoryFieldId = "categoryId",
    locationFieldId = "postLocation",
    remoteFieldId = "postRemoteDisplay",
    categoryTestId = "",
    typeLabel = "Jenis",
    categoryLabel = "Sub-kategori",
    locationLabel = "Lokasi",
    initialType = "",
    initialLocation = "",
  } = opts;

  const activeHint =
    POST_TYPE_SEGMENTS.find((s) => s.type === initialType)?.hint ||
    "Pilih Digital atau Fisik terlebih dahulu";

  return `
    <div class="form-group">
      <label class="label">${typeLabel} *</label>
      <div class="post-type-segments discover-type discover-type--inline" role="group" aria-label="${escape(typeLabel)}">
        ${POST_TYPE_SEGMENTS.map(
          (s) =>
            `<button type="button" class="discover-type-btn post-type-pick${initialType === s.type ? " active" : ""}"
              data-type="${s.type}" data-testid="post-type-${s.type.toLowerCase()}">
              <i class="fa-solid ${s.icon}"></i><span class="discover-type-label">${s.label}</span>
            </button>`,
        ).join("")}
      </div>
      <input type="hidden" id="${escape(typeFieldId)}" value="${escape(initialType)}">
      <p class="text-xs text-muted post-type-hint">${escape(activeHint)}</p>
    </div>
    <div class="form-group post-subcat-wrap${initialType ? "" : " is-locked"}">
      <label class="label">${categoryLabel} *</label>
      <select class="select" id="${escape(categoryFieldId)}" required
        ${initialType ? "" : "disabled"}${categoryTestId ? ` data-testid="${escape(categoryTestId)}"` : ""}>
        <option value="">${initialType ? "Pilih sub-kategori" : "Pilih jenis dulu"}</option>
      </select>
    </div>
    <div class="form-group post-loc-wrap${initialType ? "" : " is-hidden"}">
      <label class="label">${locationLabel} *</label>
      <div class="post-loc-digital${initialType === "DIGITAL" ? "" : " is-hidden"}">
        <input class="input post-remote-input" id="${escape(remoteFieldId)}" type="text"
          value="Remote" readonly tabindex="-1" aria-readonly="true" data-testid="post-location-remote">
        <div class="text-xs text-muted">Lokasi digital selalu Remote dan tidak dapat diubah</div>
      </div>
      <div class="post-loc-physical${initialType === "PHYSICAL" ? "" : " is-hidden"}">
        <select class="select" id="${escape(locationFieldId)}"
          ${initialType === "PHYSICAL" ? "required" : "disabled"} data-testid="post-location-city">
          <option value="">Pilih kota</option>
          ${POST_CITY_OPTIONS.map(
            (o) =>
              `<option value="${escape(o.value)}"${initialLocation === o.value ? " selected" : ""}>${escape(o.label)}</option>`,
          ).join("")}
        </select>
      </div>
    </div>`;
}

/**
 * @param {HTMLElement} root
 * @param {object} opts
 */
export function initPostTypeLocationForm(root, opts = {}) {
  const {
    categories = [],
    typeFieldId = "postServiceType",
    categoryFieldId = "categoryId",
    locationFieldId = "postLocation",
    initial = {},
  } = opts;

  const typeInput = root.querySelector(`#${typeFieldId}`);
  const categorySelect = root.querySelector(`#${categoryFieldId}`);
  const locationSelect = root.querySelector(`#${locationFieldId}`);
  const locWrap = root.querySelector(".post-loc-wrap");
  const subcatWrap = root.querySelector(".post-subcat-wrap");
  const digitalWrap = root.querySelector(".post-loc-digital");
  const physicalWrap = root.querySelector(".post-loc-physical");
  const hintEl = root.querySelector(".post-type-hint");
  const typeBtns = root.querySelectorAll(".post-type-pick");

  let selectedType = initial.serviceType || "";

  const categoriesForType = (type) =>
    categories.filter((c) => (c.serviceType || "DIGITAL") === type);

  function renderCategoryOptions(type, selectedId = "") {
    if (!categorySelect) return;
    const list = type ? categoriesForType(type) : [];
    categorySelect.innerHTML =
      `<option value="">${type ? "Pilih sub-kategori" : "Pilih jenis dulu"}</option>` +
      list
        .map(
          (c) =>
            `<option value="${c.id}"${selectedId === c.id ? " selected" : ""}>${escape(c.name)}</option>`,
        )
        .join("");
    categorySelect.disabled = !type;
    subcatWrap?.classList.toggle("is-locked", !type);
  }

  function syncLocationUI(type) {
    locWrap?.classList.toggle("is-hidden", !type);
    digitalWrap?.classList.toggle("is-hidden", type !== "DIGITAL");
    physicalWrap?.classList.toggle("is-hidden", type !== "PHYSICAL");
    if (locationSelect) {
      locationSelect.disabled = type !== "PHYSICAL";
      locationSelect.required = type === "PHYSICAL";
      if (type !== "PHYSICAL") locationSelect.value = "";
    }
  }

  function setType(type, keepCategory = false) {
    selectedType = type;
    if (typeInput) typeInput.value = type;
    typeBtns.forEach((btn) =>
      btn.classList.toggle("active", btn.dataset.type === type),
    );
    const seg = POST_TYPE_SEGMENTS.find((s) => s.type === type);
    if (hintEl) {
      hintEl.textContent = seg
        ? seg.hint
        : "Pilih Digital atau Fisik terlebih dahulu";
    }
    const catId = keepCategory
      ? categorySelect?.value || initial.categoryId || ""
      : "";
    renderCategoryOptions(type, keepCategory ? catId : "");
    if (!keepCategory && categorySelect) categorySelect.value = "";
    syncLocationUI(type);
  }

  typeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = btn.dataset.type || "";
      if (next === selectedType) return;
      setType(next, false);
    });
  });

  if (initial.serviceType) {
    setType(initial.serviceType, true);
    if (initial.serviceType === "PHYSICAL" && locationSelect && initial.location) {
      locationSelect.value =
        matchPostCityValue(initial.location) || initial.location;
    }
  } else {
    renderCategoryOptions("");
    syncLocationUI("");
  }

  return {
    getValues: () =>
      readPostTypeLocation(root, {
        typeFieldId,
        categoryFieldId,
        locationFieldId,
      }),
  };
}

export function readPostTypeLocation(root, ids = {}) {
  const {
    typeFieldId = "postServiceType",
    categoryFieldId = "categoryId",
    locationFieldId = "postLocation",
  } = ids;

  const type = root.querySelector(`#${typeFieldId}`)?.value || "";
  const categoryId = root.querySelector(`#${categoryFieldId}`)?.value || "";
  let location = "Remote";
  let isOnline = true;

  if (type === "PHYSICAL") {
    location = root.querySelector(`#${locationFieldId}`)?.value || "";
    isOnline = false;
  }

  return { serviceType: type, categoryId, location, isOnline };
}

export function validatePostTypeLocation(values, noun = "jasa") {
  if (!values.serviceType) {
    return `Pilih jenis ${noun} (Digital atau Fisik)`;
  }
  if (!values.categoryId) {
    return "Pilih sub-kategori";
  }
  if (values.serviceType === "PHYSICAL" && !values.location) {
    return "Pilih lokasi kota";
  }
  return null;
}
