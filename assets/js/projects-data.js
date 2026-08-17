/**
 * Projects & Digital Works Data for Roedy Rustam
 * Curated list spanning AI Agents & MCP, Specialty Coffee Tech, GovTech, SaaS, and Developer Tools.
 */
const PROJECTS_DATA = [
  // ==========================================
  // 1. AI AGENTS, MCP & DEVELOPER ECOSYSTEM
  // ==========================================
  {
    id: "vibes-plug",
    title: "vibes-plug",
    tagline: "70+ AI Developer Skills & Multi-Agent Swarm for Claude Code, Antigravity & Cursor",
    category: "ai",
    categoryLabel: "AI & MCP Agents",
    featured: true,
    stars: 45,
    forks: 8,
    language: "Python / TS",
    tags: ["AI Agents", "MCP", "Claude Code", "Antigravity", "Swarm", "Prompt Engineering"],
    description: "Mega plugin dan koleksi 70+ skill developer AI otonom untuk Google Antigravity, Claude Code, dan Cursor. Mendukung multi-agent swarms, security hardening, fullstack scaffolding, dan integrasi Model Context Protocol.",
    github: "https://github.com/roedyrustam/vibes-plug",
    npm: "https://www.npmjs.com/package/vibes-plug",
    demo: "https://www.npmjs.com/package/vibes-plug",
    badge: "🔥 Featured • 45+ Stars",
    icon: "sparkles",
    highlights: [
      "70+ Specialized AI engineering skills",
      "Model Context Protocol (MCP) compatible",
      "Multi-agent autonomous swarm coordination",
      "Available on NPM & GitHub"
    ]
  },
  {
    id: "doku-gemini-mcp",
    title: "doku-gemini-mcp",
    tagline: "DOKU Payment Gateway Model Context Protocol (MCP) Server for AI Agentic Commerce",
    category: "ai",
    categoryLabel: "AI & MCP Agents",
    featured: true,
    stars: 5,
    forks: 1,
    language: "TypeScript / Node.js",
    tags: ["Agentic Commerce", "MCP", "DOKU", "FinTech", "Gemini", "QRIS", "Virtual Account"],
    description: "Plugin AI canggih dan server Model Context Protocol (MCP) untuk mengintegrasikan DOKU Payment Gateway (Jokul & SNAP API). Memungkinkan AI coding assistant melakukan scaffold, testing sandbox, perhitungan cryptographic signature HMAC-SHA256, dan validasi webhook.",
    github: "https://github.com/roedyrustam/doku-gemini-mcp",
    demo: null,
    badge: "FinTech MCP",
    icon: "credit-card",
    highlights: [
      "Autonomous payment link & VA generation",
      "Cryptographic HMAC-SHA256 calculation tools",
      "Integrated with Antigravity, Claude Desktop & Cursor",
      "Automated webhook verification tester"
    ]
  },
  {
    id: "gravitycheck",
    title: "GravityCheck",
    tagline: "Futuristic Google Antigravity Token Consumption & Analytics Monitor",
    category: "ai",
    categoryLabel: "AI & MCP Agents",
    featured: true,
    stars: 2,
    forks: 0,
    language: "TypeScript",
    tags: ["Antigravity", "Token Analytics", "Telemetry", "Dashboard", "LLM Ops"],
    description: "Sistem monitoring internal performa tinggi untuk memantau konsumsi token, kecepatan inferensi, dan pemanfaatan context window 1M+ pada Google Antigravity secara real-time.",
    github: "https://github.com/roedyrustam/gravitycheck",
    demo: null,
    badge: "Telemetry Tool",
    icon: "activity",
    highlights: [
      "Real-time token budgeting & cost optimizer",
      "Subagent swarm activity monitor",
      "Latency & context window utilization tracking"
    ]
  },
  {
    id: "claudevibeskills",
    title: "Claude Vibe Skills",
    tagline: "Ready-to-Use 20 Claude AI Skills for Modern SaaS & Architecture",
    category: "ai",
    categoryLabel: "AI & MCP Agents",
    featured: false,
    stars: 3,
    forks: 1,
    language: "Markdown / Shell",
    tags: ["Claude AI", "Claude Skills", "SaaS Engineering", "Best Practices"],
    description: "Koleksi 20 Claude Skills siap pakai untuk percepatan pengembangan aplikasi SaaS, integrasi web modern, dan otomatisasi CI/CD.",
    github: "https://github.com/roedyrustam/claudevibeskills",
    demo: null,
    badge: "AI Skills",
    icon: "cpu"
  },
  {
    id: "multi-agent-cli",
    title: "Multi-Agent CLI (macli)",
    tagline: "Autonomous Multi-Agent Task Orchestration in Terminal",
    category: "ai",
    categoryLabel: "AI & MCP Agents",
    featured: false,
    stars: 1,
    forks: 0,
    language: "Python / TS",
    tags: ["CLI", "Multi-Agent", "Swarm", "Automation"],
    description: "Command line interface untuk menjalankan orkestrasi multi-agent secara terdistribusi dengan memori bersama dan eksekusi tugas paralel.",
    github: "https://github.com/roedyrustam/multi_agent_cli",
    demo: null,
    badge: "CLI Agent",
    icon: "terminal"
  },
  {
    id: "lamellong",
    title: "Lamellong AI",
    tagline: "AI-Powered Conversational & Assistance Web Interface",
    category: "ai",
    categoryLabel: "AI & MCP Agents",
    featured: false,
    stars: 0,
    forks: 0,
    language: "HTML / JS",
    tags: ["AI Web", "Chatbot", "Vercel"],
    description: "Platform web interaktif berbasis kecerdasan buatan untuk pemrosesan teks dan asistensi cerdas.",
    github: "https://github.com/roedyrustam/lamellong",
    demo: "https://lamellong.vercel.app",
    badge: "Web AI",
    icon: "bot"
  },

  // ==========================================
  // 2. SPECIALTY COFFEE & AGRITECH SYSTEMS
  // ==========================================
  {
    id: "cuppingnotes",
    title: "CuppingNotes (coffeangu)",
    tagline: "Enterprise Digital Cupping Platform conforming to SCA 2025 Coffee Value Assessment",
    category: "coffee",
    categoryLabel: "Coffee Tech & Agri",
    featured: true,
    stars: 8,
    forks: 2,
    language: "TypeScript / Angular",
    tags: ["SCA 2025 CVA", "Specialty Coffee", "Angular", "Radar Telemetry", "PWA"],
    description: "Platform digital cupping specialty coffee kelas enterprise yang merevolusi alur kerja kertas standar. Mengimplementasikan panduan ketat SCA 2025 Coffee Value Assessment (CVA) dengan radar visualisasi sensori rasa dan penghitungan skor otomatis.",
    github: "https://github.com/roedyrustam/coffeangu",
    demo: "https://cuppingnotes.online",
    badge: "☕ SCA 2025 Standard",
    icon: "coffee",
    highlights: [
      "Compliant with SCA 2025 Coffee Value Assessment (CVA)",
      "Interactive multi-axis sensory flavor radar",
      "Real-time cupping session aggregation & export",
      "Live at cuppingnotes.online"
    ]
  },
  {
    id: "beanshub",
    title: "BeansHub Roastery ERP",
    tagline: "Intelligent Green Bean & Roast Batch ERP for Specialty Roasteries",
    category: "coffee",
    categoryLabel: "Coffee Tech & Agri",
    featured: true,
    stars: 3,
    forks: 3,
    language: "TypeScript",
    tags: ["Roastery Management", "ERP", "Green Bean Inventory", "Batch Telemetry"],
    description: "Platform digital cerdas untuk coffee house roastery skala kecil-menengah dalam mengelola pengadaan green bean, inventaris lot panen, batch roasting curve, hingga penjualan dan audit stok secara otomatis.",
    github: "https://github.com/roedyrustam/beanshub1",
    demo: null,
    badge: "Roastery ERP",
    icon: "archive",
    highlights: [
      "Green bean procurement & batch tracking",
      "Roast profile telemetry & development time ratio",
      "Inventory alerts & batch traceability"
    ]
  },
  {
    id: "artisan-roaster",
    title: "Artisan Visual Scope",
    tagline: "Visual Scope & Real-time Thermocouple Telemetry for Coffee Roasters",
    category: "coffee",
    categoryLabel: "Coffee Tech & Agri",
    featured: false,
    stars: 1,
    forks: 0,
    language: "Python / C++",
    tags: ["Roasting Curves", "Hardware Telemetry", "RoR Tracking"],
    description: "Integrasi telemetry sensor suhu BT/ET (Bean Temperature / Environmental Temperature) dan Rate of Rise (RoR) untuk profil roasting presisi.",
    github: "https://github.com/roedyrustam/artisan",
    demo: "https://artisan-scope.org",
    badge: "Roast Tech",
    icon: "trending-up"
  },
  {
    id: "agro-root-story",
    title: "Agro Root Story",
    tagline: "Origin Traceability & Agricultural Digital Storytelling",
    category: "coffee",
    categoryLabel: "Coffee Tech & Agri",
    featured: false,
    stars: 1,
    forks: 0,
    language: "TypeScript / React",
    tags: ["Traceability", "AgriTech", "Origin Tracking", "Vercel"],
    description: "Platform visual interaktif untuk menceritakan asal-usul varietas kopi, ketinggian tanam, proses pascapanen (Washed, Natural, Anaerobic), dan petani produsen.",
    github: "https://github.com/roedyrustam/agro-root-story-main",
    demo: "https://roedyrustam.vercel.app",
    badge: "AgriTech",
    icon: "globe"
  },

  // ==========================================
  // 3. GOVTECH, GIS & OPEN DATA SOLUTIONS
  // ==========================================
  {
    id: "api-wilayah-2024",
    title: "API Wilayah Indonesia 2024",
    tagline: "Comprehensive High-Performance Database & REST API for Indonesian Administrative Regions",
    category: "govtech",
    categoryLabel: "GovTech & Open Data",
    featured: true,
    stars: 20,
    forks: 10,
    language: "PHP / SQL / JSON",
    tags: ["Open Data", "Indonesia", "REST API", "Provinsi", "Kabupaten", "Kecamatan", "Desa"],
    description: "Dataset komprehensif dan REST API data wilayah administratif Indonesia terlengkap (Provinsi, Kabupaten/Kota, Kecamatan, dan Kelurahan/Desa) dengan skema relasional teroptimasi untuk integrasi aplikasi nasional.",
    github: "https://github.com/roedyrustam/API-Wilayah-2024",
    demo: null,
    badge: "⭐ 20 Stars • 10 Forks",
    icon: "map-pin",
    highlights: [
      "Lengkap 38 Provinsi, 514 Kab/Kota, 7.200+ Kecamatan, 83.000+ Desa",
      "Format SQL dump, JSON, dan PHP REST endpoint siap pakai",
      "Digunakan oleh puluhan developer di berbagai aplikasi publik"
    ]
  },
  {
    id: "peta-desa-panaikang",
    title: "SIPD & Peta Desa Panaikang",
    tagline: "Interactive GIS Village Land Mapping & Administrative Information Portal",
    category: "govtech",
    categoryLabel: "GovTech & Open Data",
    featured: true,
    stars: 2,
    forks: 0,
    language: "HTML / Leaflet JS / GeoJSON",
    tags: ["GIS Mapping", "Smart Village", "GeoJSON", "SIPD", "Vercel"],
    description: "Sistem Informasi Pemerintahan Desa dan Pemetaan Geografis (GIS) interaktif untuk Desa Panaikang. Menampilkan batas dusun, fasilitas umum, demografi warga, dan potensi ekonomi desa secara spasial.",
    github: "https://github.com/roedyrustam/Peta-Desa-Panaikang",
    demo: "https://sipd-desa-panaikang.vercel.app",
    badge: "Smart Village GIS",
    icon: "map",
    highlights: [
      "Layering peta polygon GeoJSON interaktif",
      "Integrasi profil demografi & pelayanan warga",
      "Live deployment di Vercel"
    ]
  },
  {
    id: "admin-pandu",
    title: "Admin Pandu & Pandu Talenta",
    tagline: "Village Government Starter Portal & Youth Talent Ecosystem",
    category: "govtech",
    categoryLabel: "GovTech & Open Data",
    featured: false,
    stars: 1,
    forks: 0,
    language: "HTML / CSS / Tailwind",
    tags: ["GovTech", "Starter Kit", "Talent Portal", "Vercel"],
    description: "App Starter kit dan dashboard administrasi terpadu untuk aparatur desa dan platform pemberdayaan talenta pemuda desa.",
    github: "https://github.com/roedyrustam/AdminPandu",
    demo: "https://pandutalenta.vercel.app",
    badge: "GovTech Portal",
    icon: "users"
  },
  {
    id: "filamentdatapemilih",
    title: "Filament Data Pemilih & Wilayah",
    tagline: "Electoral Demographics & Voter Management Dashboard",
    category: "govtech",
    categoryLabel: "GovTech & Open Data",
    featured: false,
    stars: 0,
    forks: 1,
    language: "PHP / Laravel / Filament",
    tags: ["Laravel", "Filament PHP", "Voter Registry", "Demographics"],
    description: "Dashboard manajemen data pemilih dan persebaran suara berbasis hierarki wilayah administratif menggunakan Filament TALL stack.",
    github: "https://github.com/roedyrustam/filamentdatapemilih",
    demo: null,
    badge: "Dashboard",
    icon: "pie-chart"
  },

  // ==========================================
  // 4. SAAS, DIGITAL TOOLS & UTILITIES
  // ==========================================
  {
    id: "posas-kasir",
    title: "POSAS / Kasir Simpel",
    tagline: "Ultra-Lightweight Cloud Point of Sale for MSMEs & Retail",
    category: "saas",
    categoryLabel: "SaaS & Tools",
    featured: true,
    stars: 2,
    forks: 0,
    language: "JavaScript / PWA",
    tags: ["Cloud POS", "Kasir Online", "PWA", "Receipt Generator", "Vercel"],
    description: "Aplikasi kasir web modern yang cepat, responsif, dan mudah digunakan untuk UMKM. Mendukung pencatatan transaksi cepat, cetak struk bluetooth, dan rekap omset instan tanpa instalasi rumit.",
    github: "https://github.com/roedyrustam/posas",
    demo: "https://kasirsimpel.vercel.app",
    badge: "Cloud POS",
    icon: "shopping-bag",
    highlights: [
      "Offline-ready PWA capability",
      "Instant barcode / item search & receipt printing",
      "Live deployment at kasirsimpel.vercel.app"
    ]
  },
  {
    id: "autoculling-lightroom",
    title: "Auto Culling Assistant",
    tagline: "Adobe Lightroom Plugin for Automated Photo Selection & Tagging",
    category: "saas",
    categoryLabel: "SaaS & Tools",
    featured: true,
    stars: 1,
    forks: 0,
    language: "Lua / Lightroom SDK",
    tags: ["Lightroom Plugin", "Photography", "Lua", "Workflow Automation"],
    description: "Plugin Adobe Lightroom berbasis bahasa Lua untuk fotografer profesional guna mengotomatiskan seleksi foto (culling), deteksi fokus, dan pemberian rating foto dalam jumlah ribuan frame secara instan.",
    github: "https://github.com/roedyrustam/AutoCullingAssistant.lrplugin",
    demo: null,
    badge: "Creative Tool",
    icon: "camera"
  },
  {
    id: "subtitelpro",
    title: "SubtitelPro",
    tagline: "Smart Subtitle Timing & Translation Utilities",
    category: "saas",
    categoryLabel: "SaaS & Tools",
    featured: false,
    stars: 1,
    forks: 0,
    language: "JavaScript",
    tags: ["Subtitle", "SRT/VTT", "Video Tools", "Media"],
    description: "Utilitas pengolahan dan penyesuaian subtitle video format SRT/VTT dengan sinkronisasi waktu otomatis dan konversi encoding.",
    github: "https://github.com/roedyrustam/subtitelpro",
    demo: null,
    badge: "Media Tool",
    icon: "film"
  },
  {
    id: "lofi-timer",
    title: "Lofi Ambient Timer",
    tagline: "Aesthetic Pomodoro & Ambient Sound Productivity Companion",
    category: "saas",
    categoryLabel: "SaaS & Tools",
    featured: false,
    stars: 0,
    forks: 0,
    language: "TypeScript",
    tags: ["Pomodoro", "Lofi Music", "Aesthetic UI", "Productivity"],
    description: "Aplikasi pewaktu produktivitas Pomodoro dengan estetika lofi minimalis dan generator background noise suara hujan serta ketukan lofi.",
    github: "https://github.com/roedyrustam/lofi-timer",
    demo: null,
    badge: "Productivity",
    icon: "clock"
  },
  {
    id: "sitecure",
    title: "SiteCure Security Scanner",
    tagline: "Automated Web Vulnerability & Header Misconfiguration Auditor",
    category: "saas",
    categoryLabel: "SaaS & Tools",
    featured: false,
    stars: 1,
    forks: 0,
    language: "Python",
    tags: ["Cybersecurity", "Header Audit", "SSL/TLS", "Vulnerability"],
    description: "Alat pemindai keamanan web otomatis untuk mendeteksi missing security headers, konfigurasi SSL/TLS yang lemah, dan potensi kebocoran informasi endpoint.",
    github: "https://github.com/roedyrustam/sitecure",
    demo: null,
    badge: "Security",
    icon: "shield"
  },
  {
    id: "klipku-rustigen",
    title: "Klipku & Rustigen",
    tagline: "High-Performance Clipboard & Code Generation Tools Built with Rust",
    category: "saas",
    categoryLabel: "SaaS & Tools",
    featured: false,
    stars: 1,
    forks: 0,
    language: "Rust",
    tags: ["Rust", "System Utility", "Clipboard", "Performance"],
    description: "Kumpulan modul utilitas desktop dan command line berperforma tinggi yang dibangun menggunakan bahasa Rust untuk efisiensi memori tingkat rendah.",
    github: "https://github.com/roedyrustam/klipku",
    demo: null,
    badge: "Rust Utility",
    icon: "zap"
  }
];

// Technical Skill Matrix
const SKILLS_DATA = {
  "AI & MCP Engineering": [
    { name: "Model Context Protocol (MCP)", level: 95, icon: "cpu" },
    { name: "Multi-Agent Swarm Orchestration", level: 92, icon: "git-merge" },
    { name: "Google Antigravity SDK & Plugins", level: 96, icon: "zap" },
    { name: "Claude Code & Agentic Workflows", level: 94, icon: "terminal" },
    { name: "Prompt Engineering & RAG Architectures", level: 90, icon: "database" }
  ],
  "Specialty Coffee Tech": [
    { name: "SCA 2025 CVA Evaluation Standard", level: 98, icon: "coffee" },
    { name: "Roastery Telemetry & RoR Analysis", level: 92, icon: "trending-up" },
    { name: "Green Bean Inventory & Traceability", level: 94, icon: "archive" },
    { name: "Sensory Radar & Flavor Profiling", level: 96, icon: "activity" }
  ],
  "Frontend & UI/UX": [
    { name: "Modern TypeScript / JavaScript (ESNext)", level: 95, icon: "code" },
    { name: "Angular 19 / Signals / PWA", level: 90, icon: "layout" },
    { name: "Modern CSS, Glassmorphism & Animations", level: 96, icon: "eye" },
    { name: "Astro / Next.js / React / Tailwind v4", level: 90, icon: "globe" }
  ],
  "Backend & Systems": [
    { name: "Node.js / Express / Fastify / REST APIs", level: 92, icon: "server" },
    { name: "PHP / Laravel / Filament Ecosystem", level: 94, icon: "database" },
    { name: "Python / FastAPI / Async Automation", level: 88, icon: "cpu" },
    { name: "Rust / Lua / Embedded Utilities", level: 82, icon: "terminal" }
  ],
  "GovTech, GIS & Databases": [
    { name: "Indonesian Regional Data (API Wilayah)", level: 98, icon: "map-pin" },
    { name: "GIS & Spasial Mapping (Leaflet / GeoJSON)", level: 92, icon: "map" },
    { name: "PostgreSQL / MySQL / SQLite Optimization", level: 90, icon: "database" },
    { name: "Cloudflare Workers / Vercel / Edge Computing", level: 92, icon: "cloud" }
  ]
};

// Coffee SCA 2025 CVA Sensory Attributes for interactive Radar
const COFFEE_RADAR_DATA = [
  { attribute: "Fragrance / Aroma", score: 9.0, max: 10 },
  { attribute: "Flavor Intensity", score: 9.2, max: 10 },
  { attribute: "Aftertaste Cleanliness", score: 8.8, max: 10 },
  { attribute: "Acidity Quality", score: 9.4, max: 10 },
  { attribute: "Body & Mouthfeel", score: 8.9, max: 10 },
  { attribute: "Balance & Harmony", score: 9.1, max: 10 },
  { attribute: "Sweetness Clarity", score: 9.5, max: 10 },
  { attribute: "Overall Impression", score: 9.3, max: 10 }
];
