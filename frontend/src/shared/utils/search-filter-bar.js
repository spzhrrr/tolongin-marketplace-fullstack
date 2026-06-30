// Discover filter bar — web: search + type chips + filter panel modal

import { escape } from "./helpers.js";

export const LOCATION_OPTIONS = [
  { value: "", label: "Semua kota" },
  { value: "Jakarta", label: "Jakarta & Jabodetabek" },
  { value: "Bandung", label: "Bandung" },
  { value: "Surabaya", label: "Surabaya" },
  { value: "Yogyakarta", label: "Yogyakarta" },
  { value: "Malang", label: "Malang" },
  { value: "Bali", label: "Bali" },
  { value: "Tangerang", label: "Tangerang" },
];

const TYPE_SEGMENTS = [
  { type: "", label: "Semua", icon: "fa-border-all" },
  { type: "DIGITAL", label: "Digital", icon: "fa-laptop-code" },
  { type: "PHYSICAL", label: "Fisik", icon: "fa-person-digging" },
];

/**
 * @param {object} opts
 */
export function initSearchFilterBar(opts) {
  const { shellEl, categories, context, onChange } = opts;
  const typeWord = context === "jobs" ? "kerja" : "jasa";
  const typeWordCap = context === "jobs" ? "Kerja" : "Jasa";
  const sortDefault = opts.sortDefault || opts.sortOptions?.[0]?.value || "newest";

  let state = {
    serviceType: "",
    categorySlug: "",
    location: "",
  };
  let sortValue = sortDefault;
  let panelOpen = false;

  const byType = (type) =>
    categories.filter((c) => (c.serviceType || "DIGITAL") === type);

  function categoryList() {
    return state.serviceType ? byType(state.serviceType) : categories;
  }

  function categoryOptionsHtml(selected = state.categorySlug) {
    return categoryList()
      .map(
        (c) =>
          `<option value="${escape(c.slug)}"${selected === c.slug ? " selected" : ""}>${escape(c.name)}</option>`,
      )
      .join("");
  }

  function mountStructure() {
    const sortHtml = (opts.sortOptions || [])
      .map(
        (s) =>
          `<option value="${s.value}"${sortValue === s.value ? " selected" : ""}>${escape(s.label)}</option>`,
      )
      .join("");

    shellEl.innerHTML = `
      <div class="discover-bar" data-testid="filters-bar">
        <div class="discover-row">
          <div class="discover-search input-icon">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input class="input" id="ufb-q" type="search" enterkeyhint="search"
              placeholder="${context === "jobs" ? "Cari pekerjaan…" : "Cari jasa…"}"
              autocomplete="off" data-testid="search-input">
          </div>

          <div class="discover-type discover-type--inline" role="group" aria-label="Jenis ${typeWord}">
            ${TYPE_SEGMENTS.map(
              (s) =>
                `<button type="button" class="discover-type-btn${state.serviceType === s.type ? " active" : ""}"
                  data-type="${s.type}" data-testid="filter-type-${s.type || "all"}" title="${s.label}">
                  <i class="fa-solid ${s.icon}"></i><span class="discover-type-label">${s.label}</span>
                </button>`,
            ).join("")}
          </div>

          <div class="discover-actions">
            <button type="button" class="discover-filter-btn" id="filter-open" data-testid="filter-open-btn" title="Filter lanjutan">
              <i class="fa-solid fa-sliders"></i>
              <span class="discover-filter-text">Filter</span>
              <span class="discover-filter-badge is-hidden" id="filter-badge" aria-hidden="true">0</span>
            </button>
            <label class="discover-sort-wrap">
              <span class="sr-only">Urutkan</span>
              <select class="select discover-sort" id="filter-sort" aria-label="Urutkan">
                ${sortHtml}
              </select>
            </label>
          </div>

          <span class="discover-count" id="sf-result-badge" data-testid="results-count" hidden></span>
        </div>

        <div class="discover-tags is-empty" id="active-filter-tags" data-testid="active-filter-tags"></div>
      </div>

      <div class="discover-panel-backdrop is-hidden" id="filter-panel-backdrop" aria-hidden="true">
        <div class="discover-panel" role="dialog" aria-modal="true" aria-labelledby="filter-panel-title">
          <div class="discover-panel-head">
            <div>
              <h3 id="filter-panel-title">Filter ${typeWordCap.toLowerCase()}</h3>
              <p class="discover-panel-sub">Sesuaikan pencarian ${typeWord} Anda</p>
            </div>
            <button type="button" class="discover-panel-close" id="filter-panel-close" aria-label="Tutup">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div class="discover-panel-body">
            <div class="discover-field">
              <label class="discover-label" for="filter-category">
                <i class="fa-solid fa-grid-2"></i> Kategori
              </label>
              <select class="select" id="filter-category" data-testid="filter-category">
                <option value="">Semua kategori</option>
                ${categoryOptionsHtml()}
              </select>
            </div>
            <div class="discover-field is-hidden" id="filter-loc-section">
              <label class="discover-label" for="filter-location">
                <i class="fa-solid fa-location-dot"></i> Lokasi
              </label>
              <select class="select" id="filter-location" data-testid="filter-location">
                ${LOCATION_OPTIONS.map(
                  (o) =>
                    `<option value="${escape(o.value)}"${state.location === o.value ? " selected" : ""}>${escape(o.label)}</option>`,
                ).join("")}
              </select>
            </div>
            <div class="discover-panel-extra" data-slot="panel-extra"></div>
            <div id="ufb-advanced-wrap" class="discover-panel-advanced"></div>
          </div>
          <div class="discover-panel-foot">
            <button type="button" class="btn btn-secondary" id="filter-panel-reset">Reset filter</button>
            <button type="button" class="btn btn-primary" id="filter-panel-apply" data-testid="filter-apply-btn">
              Terapkan filter
            </button>
          </div>
        </div>
      </div>`;

    const extraSlot = shellEl.querySelector('[data-slot="panel-extra"]');
    if (extraSlot) {
      extraSlot.innerHTML = opts.panelExtraHtml || opts.midSlotHtml || "";
    }
    const adv = shellEl.querySelector("#ufb-advanced-wrap");
    if (adv && opts.advancedHtml) adv.innerHTML = opts.advancedHtml;

    syncTypeButtons();
    syncPanelFromState();
    updateFilterBadge();
    mountPanelToHost();
  }

  function getPanelBackdrop() {
    return document.getElementById("filter-panel-backdrop");
  }

  function panelEl(id) {
    return document.getElementById(id);
  }

  /** Panel di modal-host agar tidak terjebak stacking context sticky bar */
  function mountPanelToHost() {
    let backdrop = shellEl.querySelector("#filter-panel-backdrop") || getPanelBackdrop();
    const host = document.getElementById("modal-host");
    if (!backdrop || !host) return;
    if (backdrop.parentNode !== host) host.appendChild(backdrop);
    if (backdrop.dataset.panelBound) return;
    backdrop.dataset.panelBound = "1";

    backdrop.addEventListener("click", (e) => {
      if (e.target.closest("#filter-panel-close")) {
        closePanel();
        return;
      }
      if (e.target.closest("#filter-panel-apply")) {
        readPanelToState();
        closePanel();
        emit();
        return;
      }
      if (e.target.closest("#filter-panel-reset")) {
        resetPanelFilters();
        return;
      }
      if (e.target === backdrop) closePanel();
    });
  }

  function syncTypeButtons() {
    shellEl.querySelectorAll(".discover-type-btn").forEach((btn) => {
      btn.classList.toggle("active", (btn.dataset.type || "") === state.serviceType);
    });
  }

  function syncPanelFromState() {
    const catEl = panelEl("filter-category");
    const locEl = panelEl("filter-location");
    const locSection = panelEl("filter-loc-section");

    if (catEl) {
      catEl.innerHTML = `<option value="">Semua kategori</option>${categoryOptionsHtml()}`;
      catEl.value = state.categorySlug;
    }
    if (locEl) {
      locEl.value = state.location;
    }
    if (locSection) {
      const showLoc = state.serviceType === "PHYSICAL";
      locSection.classList.toggle("is-hidden", !showLoc);
    }

    const sortEl = shellEl.querySelector("#filter-sort");
    if (sortEl) sortEl.value = sortValue;
  }

  function readPanelToState() {
    const catEl = panelEl("filter-category");
    const locEl = panelEl("filter-location");
    state.categorySlug = catEl?.value || "";
    state.location = locEl?.value || "";
    if (state.categorySlug && !state.serviceType) {
      const cat = categories.find((c) => c.slug === state.categorySlug);
      if (cat?.serviceType) state.serviceType = cat.serviceType;
    }
    syncTypeButtons();
  }

  function countPanelFilters() {
    let n = 0;
    if (state.categorySlug) n++;
    if (state.serviceType === "PHYSICAL" && state.location) n++;
    if (opts.getExtraTags) n += opts.getExtraTags().length;
    return n;
  }

  function updateFilterBadge() {
    const badge = shellEl.querySelector("#filter-badge");
    const btn = shellEl.querySelector("#filter-open");
    if (!badge) return;
    const n = countPanelFilters();
    badge.textContent = String(n);
    badge.classList.toggle("is-hidden", n === 0);
    badge.setAttribute("aria-hidden", n === 0 ? "true" : "false");
    btn?.classList.toggle("has-filters", n > 0);
  }

  function openPanel() {
    syncPanelFromState();
    mountPanelToHost();
    const backdrop = getPanelBackdrop();
    backdrop?.classList.remove("is-hidden");
    backdrop?.setAttribute("aria-hidden", "false");
    panelOpen = true;
    document.body.style.overflow = "hidden";
    backdrop?.querySelector("#filter-category")?.focus();
  }

  function closePanel() {
    const backdrop = getPanelBackdrop();
    backdrop?.classList.add("is-hidden");
    backdrop?.setAttribute("aria-hidden", "true");
    panelOpen = false;
    document.body.style.overflow = "";
  }

  function buildTags() {
    const tags = [];
    const q = shellEl.querySelector("#ufb-q")?.value.trim();
    if (q) tags.push({ key: "q", label: `"${q}"` });

    if (state.serviceType === "DIGITAL") {
      tags.push({ key: "serviceType", label: "Digital" });
    } else if (state.serviceType === "PHYSICAL") {
      tags.push({ key: "serviceType", label: "Fisik" });
    }

    if (state.categorySlug) {
      const cat = categories.find((c) => c.slug === state.categorySlug);
      if (cat) tags.push({ key: "categorySlug", label: cat.name });
    }

    if (state.serviceType === "PHYSICAL" && state.location) {
      const loc = LOCATION_OPTIONS.find((o) => o.value === state.location);
      tags.push({ key: "location", label: loc?.short || loc?.label || state.location });
    }

    if (opts.sortOptions?.length && sortValue !== sortDefault) {
      const s = opts.sortOptions.find((o) => o.value === sortValue);
      if (s) tags.push({ key: "sortBy", label: s.label });
    }

    if (opts.getExtraTags) {
      for (const t of opts.getExtraTags()) tags.push(t);
    }
    return tags;
  }

  function renderTags() {
    const el = shellEl.querySelector("#active-filter-tags");
    if (!el) return;
    const tags = buildTags();
    updateFilterBadge();
    if (!tags.length) {
      el.innerHTML = "";
      el.classList.add("is-empty");
      return;
    }
    el.classList.remove("is-empty");
    el.innerHTML =
      tags
        .map(
          (t) =>
            `<button type="button" class="discover-tag" data-clear="${escape(t.key)}">
              ${escape(t.label)}<i class="fa-solid fa-xmark"></i>
            </button>`,
        )
        .join("") +
      `<button type="button" class="discover-tag-clear" id="clear-all-tags">Hapus semua</button>`;
  }

  function clearTag(key) {
    if (key === "q") {
      shellEl.querySelector("#ufb-q").value = "";
    } else if (key === "serviceType") {
      state.serviceType = "";
      state.categorySlug = "";
      state.location = "";
    } else if (key === "categorySlug") {
      state.categorySlug = "";
    } else if (key === "location") {
      state.location = "";
    } else if (key === "sortBy") {
      sortValue = sortDefault;
    } else {
      opts.onClearTag?.(key);
    }
    syncTypeButtons();
    syncPanelFromState();
    emit();
  }

  function resetPanelFilters() {
    state.categorySlug = "";
    state.location = "";
    opts.onClearExtra?.();
    syncPanelFromState();
  }

  function getParams() {
    const params = {};
    const q = shellEl.querySelector("#ufb-q")?.value.trim();
    if (q) params.q = q;
    if (state.serviceType) params.serviceType = state.serviceType;
    if (state.categorySlug) {
      const cat = categories.find((c) => c.slug === state.categorySlug);
      if (cat) params.categoryId = cat.id;
    }
    if (state.serviceType === "PHYSICAL" && state.location) {
      params.location = state.location;
    }
    return params;
  }

  function reset() {
    state = { serviceType: "", categorySlug: "", location: "" };
    sortValue = sortDefault;
    shellEl.querySelector("#ufb-q").value = "";
    opts.onClearExtra?.();
    closePanel();
    syncTypeButtons();
    syncPanelFromState();
  }

  function applyInitial(initial = {}) {
    if (initial.q) shellEl.querySelector("#ufb-q").value = initial.q;
    if (initial.serviceType) state.serviceType = initial.serviceType;
    if (initial.category) {
      const cat = categories.find((c) => c.slug === initial.category);
      if (cat) {
        state.categorySlug = cat.slug;
        if (!state.serviceType) state.serviceType = cat.serviceType || "";
      }
    }
    if (initial.location) state.location = initial.location;
    syncTypeButtons();
    syncPanelFromState();
    renderTags();
  }

  function emit() {
    renderTags();
    onChange?.(getParams());
  }

  function setResultBadge(text, tone = "") {
    const el = shellEl.querySelector("#sf-result-badge");
    if (!el) return;
    el.textContent = text;
    el.className = "discover-count" + (tone ? ` discover-count--${tone}` : "");
    el.hidden = !text;
  }

  mountStructure();

  shellEl.addEventListener("click", (e) => {
    const typeBtn = e.target.closest(".discover-type-btn");
    if (typeBtn) {
      const next = typeBtn.dataset.type || "";
      if (state.serviceType === next) return;
      state.serviceType = next;
      state.categorySlug = "";
      if (state.serviceType !== "PHYSICAL") state.location = "";
      syncTypeButtons();
      syncPanelFromState();
      emit();
      return;
    }

    if (e.target.closest("#filter-open")) {
      openPanel();
      return;
    }

    const tagBtn = e.target.closest(".discover-tag");
    if (tagBtn) {
      clearTag(tagBtn.dataset.clear);
      return;
    }

    if (e.target.closest("#clear-all-tags")) {
      reset();
      emit();
    }
  });

  shellEl.addEventListener("change", (e) => {
    if (e.target.id !== "filter-category") return;
    const slug = e.target.value || "";
    const locSection = getPanelBackdrop()?.querySelector("#filter-loc-section");
    if (!locSection) return;
    if (slug) {
      const cat = categories.find((c) => c.slug === slug);
      locSection.classList.toggle(
        "is-hidden",
        (cat?.serviceType || "DIGITAL") !== "PHYSICAL",
      );
    } else {
      locSection.classList.toggle("is-hidden", state.serviceType !== "PHYSICAL");
    }
  });

  shellEl.querySelector("#filter-sort")?.addEventListener("change", (e) => {
    sortValue = e.target.value || sortDefault;
    emit();
  });

  shellEl.querySelector("#ufb-q")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      emit();
    }
  });

  let qTimer;
  shellEl.querySelector("#ufb-q")?.addEventListener("input", () => {
    clearTimeout(qTimer);
    qTimer = setTimeout(emit, 350);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && panelOpen) closePanel();
  });

  initScrollHideBar(shellEl);
  applyInitial(opts.initial || {});

  return {
    getParams,
    getSort: () => sortValue,
    setSort: (v) => {
      sortValue = v;
      syncPanelFromState();
    },
    reset,
    applyInitial,
    refreshTags: renderTags,
    setResultBadge,
    getQueryEl: () => shellEl.querySelector("#ufb-q"),
    getAdvancedWrap: () => panelEl("ufb-advanced-wrap"),
    openFilterPanel: openPanel,
    closeFilterPanel: closePanel,
  };
}

export function bindAdvChipGroups(root, config, onChange) {
  if (!root) return;
  for (const [group, def] of Object.entries(config)) {
    const wrap = root.querySelector(`[data-adv-group="${group}"]`);
    if (!wrap) continue;
    wrap.querySelectorAll(".sf-adv-chip, .ufb-adv-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        wrap.querySelectorAll(".sf-adv-chip, .ufb-adv-chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        wrap.dataset.value = chip.dataset.value || "";
        onChange?.(group, chip.dataset.value || "");
      });
    });
    const initial = wrap.querySelector(
      `.sf-adv-chip[data-value="${def.default || ""}"], .ufb-adv-chip[data-value="${def.default || ""}"]`,
    );
    if (initial) initial.classList.add("active");
    wrap.dataset.value = def.default || "";
  }
}

export function getAdvChipValue(root, group) {
  return root?.querySelector(`[data-adv-group="${group}"]`)?.dataset.value || "";
}

export function getAdvSelectValue(id) {
  return document.getElementById(id)?.value || "";
}

export function resetAdvChipGroups(root, config) {
  if (!root) return;
  for (const [group, def] of Object.entries(config)) {
    const wrap = root.querySelector(`[data-adv-group="${group}"]`);
    if (!wrap) continue;
    wrap.querySelectorAll(".sf-adv-chip, .ufb-adv-chip").forEach((c) => {
      c.classList.toggle("active", (c.dataset.value || "") === (def.default || ""));
    });
    wrap.dataset.value = def.default || "";
  }
}

export function initStickyShell(shellEl) {
  initScrollHideBar(shellEl);
}

/** Hide filter bar on scroll down; show compact floating bar on scroll up */
export function initScrollHideBar(shellEl) {
  if (!shellEl?.parentNode || shellEl.dataset.scrollHideInit) return;
  shellEl.dataset.scrollHideInit = "1";

  const sentinel = document.createElement("div");
  sentinel.className = "filter-sticky-sentinel";
  sentinel.setAttribute("aria-hidden", "true");
  shellEl.parentNode.insertBefore(sentinel, shellEl);

  const navH = () => {
    const nav = document.querySelector(".navbar, .nav, header.app-header");
    return nav ? nav.offsetHeight : 56;
  };

  let lastY = window.scrollY;
  let pastFilter = false;
  let floatVisible = false;
  let placeholder = null;

  function syncFloatGeometry() {
    if (!shellEl.classList.contains("is-floating")) return;
    const container = shellEl.closest(".container") || shellEl.parentElement;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    shellEl.style.setProperty("--filter-float-top", `${navH()}px`);
    shellEl.style.setProperty("--filter-float-left", `${rect.left}px`);
    shellEl.style.setProperty("--filter-float-width", `${rect.width}px`);
  }

  function setPlaceholder(active) {
    if (active) {
      if (!placeholder) {
        placeholder = document.createElement("div");
        placeholder.className = "filter-float-placeholder";
        placeholder.setAttribute("aria-hidden", "true");
        shellEl.after(placeholder);
      }
      placeholder.style.height = `${shellEl.offsetHeight}px`;
    } else {
      placeholder?.remove();
      placeholder = null;
    }
  }

  function resetToFlow() {
    shellEl.classList.remove("is-floating", "is-float-visible", "is-float-hidden");
    shellEl.style.removeProperty("--filter-float-top");
    shellEl.style.removeProperty("--filter-float-left");
    shellEl.style.removeProperty("--filter-float-width");
    shellEl.querySelector(".discover-bar")?.classList.remove("discover-bar--compact");
    setPlaceholder(false);
    floatVisible = false;
  }

  function showFloatBar() {
    if (!pastFilter) return;
    shellEl.classList.add("is-floating", "is-float-visible");
    shellEl.classList.remove("is-float-hidden");
    shellEl.querySelector(".discover-bar")?.classList.add("discover-bar--compact");
    syncFloatGeometry();
    setPlaceholder(true);
    floatVisible = true;
  }

  function hideFloatBar() {
    if (!shellEl.classList.contains("is-floating")) return;
    shellEl.classList.remove("is-float-visible");
    shellEl.classList.add("is-float-hidden");
    floatVisible = false;
  }

  new IntersectionObserver(
    ([entry]) => {
      pastFilter = !entry.isIntersecting;
      if (!pastFilter) resetToFlow();
    },
    { threshold: 0 },
  ).observe(sentinel);

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const delta = y - lastY;

      if (pastFilter) {
        if (delta > 10) hideFloatBar();
        else if (delta < -10) showFloatBar();
      }

      if (shellEl.classList.contains("is-floating")) syncFloatGeometry();
      lastY = y;
      ticking = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", syncFloatGeometry, { passive: true });
}

export function initCategoryFilters(mountEl, categories, options = {}) {
  return initSearchFilterBar({
    shellEl: mountEl,
    categories,
    context: options.context || "services",
    initial: options.initial,
    onChange: () => options.onChange?.(),
  });
}
