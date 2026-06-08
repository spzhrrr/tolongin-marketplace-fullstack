import { api } from "../../shared/utils/api.js";
import {
  escape,
  fmtIDR,
  toast,
  modal,
  confirmModal,
} from "../../shared/utils/helpers.js";
import { statusPill, serviceCard, empty } from "../../shared/ui/components.js";
import { store } from "../../app/store.js";
import { router } from "../../app/router.js";

function sidebar(active) {
  const u = store.getState().user;
  return `<aside class="dash-side">
    <div class="who">
      <img src="${u.avatar || "https://i.pravatar.cc/100?u=" + u.id}" class="avatar"/>
      <div><div class="name">${escape(u.name)}</div><div class="role">${u.role === "ADMIN" ? "Admin" : "Pengguna"}</div></div>
    </div>
    <a href="#/dashboard" class="side-link ${active === "overview" ? "active" : ""}" data-testid="side-overview"><i class="fa-solid fa-gauge"></i> Overview</a>
    <a href="#/dashboard/buyer/orders" class="side-link ${active === "b-orders" ? "active" : ""}" data-testid="side-b-orders"><i class="fa-solid fa-receipt"></i> Pesanan Saya</a>
    <a href="#/dashboard/buyer/jobs" class="side-link ${active === "b-jobs" ? "active" : ""}" data-testid="side-b-jobs"><i class="fa-solid fa-folder-open"></i> Proyek Saya</a>
    <a href="#/dashboard/buyer/favorites" class="side-link ${active === "b-fav" ? "active" : ""}" data-testid="side-fav"><i class="fa-solid fa-heart"></i> Freelancer Favorit</a>
    <a href="#/dashboard/seller/services" class="side-link ${active === "s-services" ? "active" : ""}" data-testid="side-s-services"><i class="fa-solid fa-box"></i> Layanan Saya</a>
    <a href="#/dashboard/seller/orders" class="side-link ${active === "s-orders" ? "active" : ""}" data-testid="side-s-orders"><i class="fa-solid fa-inbox"></i> Pesanan Masuk</a>
    <a href="#/dashboard/seller/earnings" class="side-link ${active === "s-earn" ? "active" : ""}" data-testid="side-s-earn"><i class="fa-solid fa-coins"></i> Penghasilan</a>
    <a href="#/verification" class="side-link" data-testid="side-verif"><i class="fa-solid fa-id-card"></i> Verifikasi</a>
    <a href="#/profile" class="side-link"><i class="fa-solid fa-user"></i> Profil</a>
    <a href="#/settings" class="side-link"><i class="fa-solid fa-gear"></i> Pengaturan</a>
  </aside>`;
}

export async function DashboardOverview({ mount }) {
  const u = store.getState().user;
  mount.innerHTML = `<div class="container page"><div class="dash-wrap">${sidebar("overview")}<section><div class="spinner"></div></section></div></div>`;
  const main = mount.querySelector("section");
  try {
    const orders = await api.get("/orders");
    const my = orders.filter((o) => o.buyerId === u.id);
    const recv = orders.filter((o) => o.sellerId === u.id);
    const myEarn = recv
      .filter((o) => o.status === "completed")
      .reduce((s, o) => s + o.amount, 0);
    const isBuyerRole = true;
    const isSellerRole = true;
    main.innerHTML = `
      <div class="page-header"><div><h1 class="page-title">Halo, ${escape(u.name.split(" ")[0])}! 👋</h1><p class="page-subtitle">Berikut ringkasan aktivitas Anda</p></div></div>
      <div class="kpis">
        ${
          isBuyerRole
            ? `
        <div class="kpi"><div class="ic"><i class="fa-solid fa-receipt"></i></div><div class="v">${my.length}</div><div class="l">Pesanan Saya</div></div>
        <div class="kpi"><div class="ic"><i class="fa-solid fa-heart"></i></div><div class="v">${my.filter((o) => ["pending", "accepted", "in_progress"].includes(o.status)).length}</div><div class="l">Pesanan Aktif</div></div>`
            : ""
        }
        ${
          isSellerRole
            ? `
        <div class="kpi"><div class="ic"><i class="fa-solid fa-briefcase"></i></div><div class="v">${recv.length}</div><div class="l">Pesanan Diterima</div></div>
        <div class="kpi"><div class="ic"><i class="fa-solid fa-coins"></i></div><div class="v">${fmtIDR(myEarn)}</div><div class="l">Total Penghasilan</div></div>
        <div class="kpi"><div class="ic"><i class="fa-solid fa-star"></i></div><div class="v">${(u.rating || 0).toFixed(1)}</div><div class="l">Rating Anda</div></div>`
            : ""
        }
      </div>
      <div class="card card-pad-lg mt-3">
        <h3>Pesanan Terbaru</h3>
        ${
          orders.slice(0, 5).length
            ? `
        <div class="scroll-x"><table class="tbl">
          <thead><tr><th>Order</th><th>Status</th><th>Total</th><th></th></tr></thead>
          <tbody>${orders
            .slice(0, 5)
            .map(
              (o) =>
                `<tr><td>${escape(o.title)}</td><td>${statusPill(o.status)}</td><td>${fmtIDR(o.amount)}</td><td><a class="btn btn-secondary btn-sm" href="#/orders/${o.id}">Lihat</a></td></tr>`,
            )
            .join("")}</tbody>
        </table></div>`
            : empty("Belum ada pesanan", "", "fa-receipt")
        }
      </div>`;
  } catch (e) {
    main.innerHTML = empty("Gagal memuat", e.message);
  }
}

export async function BuyerOrders({ mount }) {
  const u = store.getState().user;
  mount.innerHTML = `<div class="container page"><div class="dash-wrap">${sidebar("b-orders")}<section><h1>Pesanan Saya</h1><div id="list"></div></section></div></div>`;
  try {
    const o = await api.get("/orders?role=buyer");
    document.getElementById("list").innerHTML = o.length
      ? `
      <div class="scroll-x"><table class="tbl"><thead><tr><th>Order</th><th>Status</th><th>Total</th><th></th></tr></thead><tbody>
        ${o.map((x) => `<tr><td>${escape(x.title)}</td><td>${statusPill(x.status)}</td><td>${fmtIDR(x.amount)}</td><td><a class="btn btn-secondary btn-sm" href="#/orders/${x.id}">Detail</a></td></tr>`).join("")}
      </tbody></table></div>`
      : empty("Belum ada pesanan");
  } catch (e) {
    document.getElementById("list").innerHTML = empty("Gagal");
  }
}

export async function BuyerJobs({ mount }) {
  const u = store.getState().user;
  mount.innerHTML = `<div class="container page"><div class="dash-wrap">${sidebar("b-jobs")}<section><div class="flex-between mb-2"><h1>Job Saya</h1><a href="#/post-job" class="btn btn-primary" data-testid="dash-post-job"><i class="fa-solid fa-plus"></i> Posting Job</a></div><div id="list"></div></section></div></div>`;
  try {
    const jr = await api.get("/jobs?buyerId=" + u.id);
    const j = Array.isArray(jr) ? jr : jr.data || [];
    document.getElementById("list").innerHTML = j.length
      ? `<div class="flex-col">${j
          .map(
            (x) => `
      <div class="card card-pad">
        <div class="flex-between"><div><h3 style="margin:0">${escape(x.title)}</h3><div class="text-sm text-muted">${escape(x.category)} · ${fmtIDR(x.budget)}</div></div>${statusPill(x.status)}</div>
        <div class="flex gap-sm mt-2"><a class="btn btn-secondary btn-sm" href="#/jobs/${x.id}" data-testid="view-job-${x.id}">Lihat (${x.applicationCount} pelamar)</a></div>
      </div>`,
          )
          .join("")}</div>`
      : empty("Belum ada job");
  } catch (e) {
    document.getElementById("list").innerHTML = empty("Gagal");
  }
}

export async function BuyerFavorites({ mount }) {
  mount.innerHTML = `<div class="container page"><div class="dash-wrap">${sidebar("b-fav")}<section><h1>Favorit</h1><div id="list" class="grid grid-3"></div></section></div></div>`;
  try {
    const favs = await api.get("/favorites");
    document.getElementById("list").innerHTML = favs.length
      ? favs.map((s) => serviceCard(s, { favorited: true })).join("")
      : empty(
          "Belum ada favorit",
          "Tambahkan jasa ke favorit dari marketplace",
        );
  } catch (e) {
    document.getElementById("list").innerHTML = empty("Gagal");
  }
}

export async function SellerServices({ mount }) {
  const u = store.getState().user;
  mount.innerHTML = `<div class="container page"><div class="dash-wrap">${sidebar("s-services")}<section><div class="flex-between mb-2"><h1>Jasa Saya</h1><button class="btn btn-primary" id="add-svc" data-testid="add-service-btn"><i class="fa-solid fa-plus"></i> Tambah Jasa</button></div><div id="svc-list" class="grid grid-3"></div></section></div></div>`;
  const load = async () => {
    try {
      const svcsResp = await api.get("/services?sellerId=" + u.id);
      const svcs = Array.isArray(svcsResp) ? svcsResp : svcsResp.data || [];
      document.getElementById("svc-list").innerHTML = svcs.length
        ? svcs
            .map(
              (s) => `
        <div class="service-card ${s.active === false ? "inactive" : ""}" style="${s.active === false ? "opacity:.6" : ""}">
          <div class="thumb"><img src="${s.image}" loading="lazy"/></div>
          <div class="body">
            <div class="title">${escape(s.title)} ${s.active === false ? '<span class="badge">Nonaktif</span>' : ""}</div>
            <div class="meta"><span class="price">${fmtIDR(s.price)}</span></div>
            <div class="flex gap-sm" style="flex-wrap:wrap">
              <button class="btn btn-secondary btn-sm" data-edit="${s.id}" data-testid="edit-svc-${s.id}"><i class="fa-solid fa-pen"></i> Edit</button>
              <button class="btn btn-ghost btn-sm" data-toggle="${s.id}" data-testid="toggle-svc-${s.id}"><i class="fa-solid ${s.active === false ? "fa-eye" : "fa-eye-slash"}"></i> ${s.active === false ? "Aktifkan" : "Nonaktifkan"}</button>
              <button class="btn btn-danger btn-sm" data-del="${s.id}" data-testid="del-svc-${s.id}"><i class="fa-solid fa-trash"></i> Hapus</button>
            </div>
          </div>
        </div>`,
            )
            .join("")
        : empty("Belum ada jasa", "Tambahkan jasa pertama Anda");
      bindActions(svcs);
    } catch (e) {
      toast(e.message, "error");
    }
  };
  const bindActions = (svcs) => {
    document.querySelectorAll("[data-del]").forEach((b) =>
      b.addEventListener("click", () =>
        confirmModal("Hapus jasa?", async () => {
          try {
            await api.del("/services/" + b.dataset.del);
            toast("Dihapus", "success");
            load();
          } catch (err) {
            toast(err.message, "error");
          }
        }),
      ),
    );
    document.querySelectorAll("[data-toggle]").forEach((b) =>
      b.addEventListener("click", async () => {
        try {
          const r = await api.post("/services/" + b.dataset.toggle + "/toggle");
          toast(r.active ? "Jasa diaktifkan" : "Jasa dinonaktifkan", "success");
          load();
        } catch (err) {
          toast(err.message, "error");
        }
      }),
    );
    document
      .querySelectorAll("[data-edit]")
      .forEach((b) =>
        b.addEventListener("click", () =>
          showForm(svcs.find((x) => x.id === b.dataset.edit)),
        ),
      );
  };
  const showForm = async (existing) => {
    const cats = await api.get("/categories");
    const { mountImageUpload } =
      await import("../../shared/utils/upload-widget.js");
    const m = modal({
      title: existing ? "Edit Jasa" : "Tambah Jasa",
      size: "lg",
      body: `<form id="sf">
        <div class="form-group"><label class="label">Judul</label><input class="input" id="title" required value="${escape(existing?.title || "")}" data-testid="svc-title"></div>
        <div class="form-group"><label class="label">Kategori</label><select class="select" id="category" data-testid="svc-cat">${cats.map((c) => `<option value="${c.slug}" ${existing?.category === c.slug ? "selected" : ""}>${c.name}</option>`).join("")}</select></div>
        <div class="form-group"><label class="label">Deskripsi</label><textarea class="textarea" id="description" required data-testid="svc-desc">${escape(existing?.description || "")}</textarea></div>
        <div class="grid grid-2">
          <div class="form-group"><label class="label">Harga (Rp)</label><input class="input" type="number" id="price" required min="50000" step="1000" value="${existing?.price || ""}" placeholder="Min Rp 50.000" data-testid="svc-price"></div>
          <div class="form-group"><label class="label">Hari Pengerjaan</label><input class="input" type="number" id="dd" value="${existing?.deliveryDays || 3}" data-testid="svc-days"></div>
        </div>
        <div class="form-group"><label class="label">Gambar Cover</label><div id="svc-img-upload"></div></div>
        <button class="btn btn-primary btn-block" type="submit" data-testid="svc-save-btn">${existing ? "Update" : "Simpan"}</button>
      </form>`,
    });
    let imageUrl = existing?.image || "";
    mountImageUpload(m.el.querySelector("#svc-img-upload"), {
      folder: "services",
      initial: imageUrl,
      name: "svc-image",
      testid: "svc-image-upload",
      onChange: (u) => {
        imageUrl = u;
      },
    });
    m.el.querySelector("#sf").addEventListener("submit", async (e) => {
      e.preventDefault();
      const price = parseFloat(m.el.querySelector("#price").value);
      if (price < 50000) return toast("Harga minimum jasa Rp 50.000", "error");
      const body = {
        title: m.el.querySelector("#title").value,
        category: m.el.querySelector("#category").value,
        description: m.el.querySelector("#description").value,
        price,
        deliveryDays: parseInt(m.el.querySelector("#dd").value) || 3,
        image: imageUrl || null,
        city: u.city || "",
      };
      try {
        if (existing) await api.put("/services/" + existing.id, body);
        else await api.post("/services", body);
        m.close();
        toast("Tersimpan", "success");
        load();
      } catch (err) {
        toast(err.message, "error");
      }
    });
  };
  document
    .getElementById("add-svc")
    .addEventListener("click", () => showForm(null));
  load();
}

export async function SellerOrders({ mount }) {
  mount.innerHTML = `<div class="container page"><div class="dash-wrap">${sidebar("s-orders")}<section><h1>Pesanan Diterima</h1><div id="list"></div></section></div></div>`;
  try {
    const o = await api.get("/orders?role=seller");
    document.getElementById("list").innerHTML = o.length
      ? `
      <div class="scroll-x"><table class="tbl"><thead><tr><th>Order</th><th>Pembeli</th><th>Status</th><th>Total</th><th></th></tr></thead><tbody>
        ${o.map((x) => `<tr><td>${escape(x.title)}</td><td>${escape(x.buyer?.name)}</td><td>${statusPill(x.status)}</td><td>${fmtIDR(x.amount)}</td><td><a class="btn btn-secondary btn-sm" href="#/orders/${x.id}">Kelola</a></td></tr>`).join("")}
      </tbody></table></div>`
      : empty("Belum ada pesanan");
  } catch (e) {
    document.getElementById("list").innerHTML = empty("Gagal");
  }
}

export async function SellerEarnings({ mount }) {
  mount.innerHTML = `<div class="container page"><div class="dash-wrap">${sidebar("s-earn")}<section><h1>Penghasilan</h1><div id="content"></div></section></div></div>`;
  try {
    const o = await api.get("/orders?role=seller");
    const done = o.filter((x) => x.status === "completed");
    const pending = o.filter((x) =>
      ["accepted", "in_progress"].includes(x.status),
    );
    const total = done.reduce((s, x) => s + x.amount * 0.95, 0);
    document.getElementById("content").innerHTML = `
      <div class="kpis">
        <div class="kpi"><div class="ic"><i class="fa-solid fa-wallet"></i></div><div class="v">${fmtIDR(total)}</div><div class="l">Saldo Tersedia</div></div>
        <div class="kpi"><div class="ic"><i class="fa-solid fa-hourglass"></i></div><div class="v">${fmtIDR(pending.reduce((s, x) => s + x.amount * 0.95, 0))}</div><div class="l">Pending</div></div>
        <div class="kpi"><div class="ic"><i class="fa-solid fa-trophy"></i></div><div class="v">${done.length}</div><div class="l">Pesanan Selesai</div></div>
      </div>
      <div class="card card-pad-lg mt-3 flex-between">
        <div><h3 style="margin:0">Tarik Penghasilan</h3><p class="text-muted" style="margin:0">Withdraw ke rekening bank Anda</p></div>
        <button class="btn btn-primary" data-testid="withdraw-btn" onclick="(${() => {
          window.dispatchEvent(
            new CustomEvent("toast", {
              detail: {
                type: "info",
                text: "Fitur withdraw demo - hubungi support",
              },
            }),
          );
        }})()"><i class="fa-solid fa-money-bill-transfer"></i> Tarik Sekarang</button>
      </div>`;
  } catch (e) {
    document.getElementById("content").innerHTML = empty("Gagal");
  }
}
