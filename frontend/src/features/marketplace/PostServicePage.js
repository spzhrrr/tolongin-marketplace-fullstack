// frontend/src/features/marketplace/PostServicePage.js

import { api } from "../../shared/utils/api.js";
import { escape, toast, bindRupiahInput, parseIDRInput } from "../../shared/utils/helpers.js";
import {
  serviceImagesFieldHtml,
  initServiceImagesField,
  getServiceImagesValue,
} from "../../shared/utils/service-image-upload.js";
import { store } from "../../app/store.js";
import { router } from "../../app/router.js";
import {
  postTypeLocationFieldsHtml,
  initPostTypeLocationForm,
  readPostTypeLocation,
  validatePostTypeLocation,
} from "../../shared/utils/post-type-location.js";

export async function PostServicePage({ mount }) {
  const u = store.getState().user;

  if (!u) {
    toast("Silakan login dulu", "warning");
    router.navigate("/login");
    return;
  }

  const cats = await api.get("/categories");

  mount.innerHTML = `
    <div class="container-sm page">
      <a href="#/marketplace" class="text-sm" style="display:inline-block; margin-bottom:20px; text-decoration:none; color:#0a66c2;">
        <i class="fa-solid fa-arrow-left"></i> Kembali ke Marketplace
      </a>
      <div class="card card-pad-lg">
        <div class="page-header" style="margin-bottom:24px;">
          <h1 class="page-title" style="margin:0;">Posting Jasa Baru</h1>
          <p class="page-subtitle">Tawarkan keahlian Anda kepada ribuan klien</p>
        </div>
        
        <form id="service-form" data-testid="post-service-form">
          <div class="form-group">
            <label class="label">Judul Jasa *</label>
            <input class="input" id="title" required placeholder="Contoh: Desain Logo Profesional" data-testid="service-title">
            <div class="text-xs text-muted">Minimal 5 karakter, jelaskan jasa Anda dengan jelas</div>
          </div>
          
          ${postTypeLocationFieldsHtml({
            categoryFieldId: "categoryId",
            categoryTestId: "service-category",
            typeLabel: "Jenis Jasa",
            categoryLabel: "Sub-kategori",
            locationLabel: "Lokasi",
          })}
          
          <div class="form-group">
            <label class="label">Deskripsi Jasa *</label>
            <textarea class="textarea" id="description" rows="6" required placeholder="Jelaskan detail jasa yang Anda tawarkan, termasuk apa yang akan didapatkan klien..." data-testid="service-description"></textarea>
            <div class="text-xs text-muted">Minimal 20 karakter</div>
          </div>
          
          <div class="grid grid-2">
            <div class="form-group">
              <label class="label">Harga (Rp) *</label>
              <input class="input" id="price" type="text" required placeholder="Rp 150.000" inputmode="numeric" data-testid="service-price">
              <div class="text-xs text-muted">Minimal Rp 10.000</div>
            </div>
            <div class="form-group">
              <label class="label">Hari Pengerjaan *</label>
              <input class="input" id="deliveryTime" type="number" required placeholder="3" min="1" max="30" data-testid="service-delivery">
              <div class="text-xs text-muted">1-30 hari</div>
            </div>
          </div>
          
          <div class="form-group">
            <label class="label">Foto Portofolio Jasa *</label>
            ${serviceImagesFieldHtml()}
            <div class="text-xs text-muted">1–5 foto bukti kerja — foto pertama jadi cover</div>
          </div>
          
          <div style="display:flex; gap:12px; justify-content:flex-end; margin-top:24px; padding-top:16px; border-top:1px solid #eee;">
            <a href="#/marketplace" class="btn btn-secondary" style="padding:10px 24px;">Batal</a>
            <button class="btn btn-primary" type="submit" style="padding:10px 24px;" data-testid="service-submit">
              <i class="fa-solid fa-save"></i> Posting Jasa
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  bindRupiahInput(document.getElementById("price"));
  initServiceImagesField(mount);
  initPostTypeLocationForm(mount, { categories: cats });

  const form = document.getElementById("service-form");

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title")?.value.trim();
    const typeLoc = readPostTypeLocation(mount);
    const categoryId = typeLoc.categoryId;
    const description = document.getElementById("description")?.value.trim();
    const price = parseIDRInput(document.getElementById("price")?.value);
    const deliveryTime = parseInt(document.getElementById("deliveryTime")?.value, 10);
    const images = getServiceImagesValue(mount);

    const typeErr = validatePostTypeLocation(typeLoc, "jasa");
    if (typeErr) {
      toast(typeErr, "error");
      return;
    }

    if (!images.length) {
      toast("Upload minimal 1 foto portofolio", "error");
      return;
    }
    if (!title || title.length < 5) {
      toast("Judul minimal 5 karakter", "error");
      return;
    }
    if (!description || description.length < 20) {
      toast("Deskripsi minimal 20 karakter", "error");
      return;
    }
    if (!price || isNaN(price) || price < 10000) {
      toast("Harga minimal Rp 10.000", "error");
      return;
    }
    if (!deliveryTime || isNaN(deliveryTime) || deliveryTime < 1 || deliveryTime > 30) {
      toast("Hari pengerjaan harus 1-30 hari", "error");
      return;
    }

    const submitBtn = form.querySelector("[type=submit]");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...';
    }

    try {
      const created = await api.post("/services", {
        title,
        categoryId,
        description,
        price,
        deliveryTime,
        location: typeLoc.location,
        images,
      });
      toast(
        "🎉 Jasa dipublikasikan! Pelanggan demo pesan ±3–5 detik. Refresh halaman jasa atau buka Pesanan (Penjual).",
        "success",
        9000,
      );
      router.navigate("/services/" + (created.id || created?.data?.id));
    } catch (err) {
      toast(err.message || "Gagal memposting jasa", "error");
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-save"></i> Posting Jasa';
      }
    }
  });
}
