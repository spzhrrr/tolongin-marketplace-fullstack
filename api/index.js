// api/index.js - Backend lengkap untuk Vercel
module.exports = async (req, res) => {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const url = req.url;

  // ========== REGISTER ==========
  if (url === "/api/auth/register" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    await new Promise((resolve) => req.on("end", resolve));

    try {
      const { email, password, name } = JSON.parse(body);
      const token = Buffer.from(`${email}:${Date.now()}`).toString("base64");

      return res.status(201).json({
        token: token,
        user: {
          id: Date.now().toString(),
          email: email,
          name: name || email.split("@")[0],
          role: "USER",
        },
      });
    } catch (err) {
      return res.status(400).json({ message: "Invalid request" });
    }
  }

  // ========== LOGIN ==========
  if (url === "/api/auth/login" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    await new Promise((resolve) => req.on("end", resolve));

    try {
      const { email, password } = JSON.parse(body);
      const token = Buffer.from(`${email}:${Date.now()}`).toString("base64");

      return res.status(200).json({
        token: token,
        user: {
          id: Date.now().toString(),
          email: email,
          name: email.split("@")[0],
          role: "USER",
        },
      });
    } catch (err) {
      return res.status(400).json({ message: "Invalid request" });
    }
  }

  // ========== GET SERVICES ==========
  if (url === "/api/services" && req.method === "GET") {
    return res.status(200).json({
      data: [
        {
          id: "1",
          title: "Desain Logo Professional",
          price: 150000,
          seller: {
            name: "Citra Kirana",
            avatar: "https://i.pravatar.cc/100",
            verified: true,
          },
          rating: 4.9,
          reviewCount: 127,
          image:
            "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
          deliveryTime: 2,
        },
        {
          id: "2",
          title: "Service AC Rumahan",
          price: 150000,
          seller: {
            name: "Budi Setiawan",
            avatar: "https://i.pravatar.cc/101",
            verified: true,
          },
          rating: 4.8,
          reviewCount: 342,
          image:
            "https://images.pexels.com/photos/2582874/pexels-photo-2582874.jpeg",
          deliveryTime: 1,
        },
        {
          id: "3",
          title: "Jasa Pindahan Jakarta",
          price: 500000,
          seller: {
            name: "Seller Demo",
            avatar: "https://i.pravatar.cc/102",
            verified: true,
          },
          rating: 4.5,
          reviewCount: 31,
          image:
            "https://images.pexels.com/photos/1345386/pexels-photo-1345386.jpeg",
          deliveryTime: 1,
        },
      ],
      meta: { total: 3, page: 1, limit: 20 },
    });
  }

  // ========== GET CATEGORIES ==========
  if (url === "/api/categories" && req.method === "GET") {
    return res.status(200).json([
      { id: "1", slug: "desain-grafis", name: "Desain Grafis" },
      { id: "2", slug: "service-reparasi", name: "Service & Reparasi" },
      { id: "3", slug: "pindahan", name: "Pindahan & Logistik" },
      { id: "4", slug: "data-entry", name: "Data Entry" },
    ]);
  }

  // ========== GET USER PROFILE ==========
  if (url === "/api/auth/me" && req.method === "GET") {
    return res.status(200).json({
      id: "1",
      email: "user@tolongin.com",
      name: "User Demo",
      role: "USER",
      verified: true,
    });
  }

  // ========== FAVORITES ==========
  if (url === "/api/favorites" && req.method === "GET") {
    return res.status(200).json([]);
  }

  if (url.match(/\/api\/favorites\/.+/) && req.method === "POST") {
    return res.status(200).json({ favorited: true });
  }

  // ========== GET JOBS ==========
  if (url === "/api/jobs" && req.method === "GET") {
    return res.status(200).json({
      data: [
        {
          id: "1",
          title: "Butuh Desain Logo Coffee Shop",
          budget: 300000,
          location: "Jakarta",
          status: "OPEN",
          applicationCount: 2,
        },
      ],
      meta: { total: 1, page: 1, limit: 20 },
    });
  }

  // ========== DEFAULT 404 ==========
  return res.status(404).json({
    message: `Endpoint ${req.method} ${url} not found`,
    tip: "Available: /api/auth/register, /api/auth/login, /api/services, /api/categories",
  });
};
