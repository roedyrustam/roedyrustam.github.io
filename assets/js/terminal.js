/**
 * Interactive Terminal Emulator: Vibes CLI v2.5 (RoedyOS)
 */
(function() {
  const terminalBody = document.getElementById('terminal-body');
  const terminalInput = document.getElementById('terminal-input');
  const terminalContainer = document.getElementById('terminal-container');
  if (!terminalBody || !terminalInput) return;

  const HISTORY = [];
  let historyIndex = -1;

  const COMMANDS = {
    help: `
<span class="cmd-cyan">AVAILABLE COMMANDS:</span>
  <span class="cmd-green">about</span>       - Bio, verified profile & architect manifesto
  <span class="cmd-green">photo</span>       - View official portrait photo & verified card
  <span class="cmd-green">services</span>    - Consulting & Training portfolio (UMKM, AI, IT, Trainer)
  <span class="cmd-green">umkm</span>        - Konsultan UMKM & Digitalisasi Ritel POS
  <span class="cmd-green">ai</span>          - AI Engineer & Multi-Agent Swarms (vibes-plug & sinapsai)
  <span class="cmd-green">konsultan</span>   - Konsultan IT & Enterprise Architecture proof
  <span class="cmd-green">trainer</span>     - Trainer IT & Corporate AI Workshops
  <span class="cmd-green">wa</span>          - Fast-track direct WhatsApp chat with 3 templates
  <span class="cmd-green">skills</span>      - Technical stack & competency matrix (161 skills)
  <span class="cmd-green">projects</span>    - Featured digital products & creations
  <span class="cmd-green">vibes</span>       - AI agent & MCP ecosystem (vibes-plug, 109+ ⭐, 25 forks)
  <span class="cmd-green">coffee</span>      - CuppingNotes & SCA 2025 Coffee Tech
  <span class="cmd-green">govtech</span>     - API Wilayah 2024 (21 ⭐) & GIS systems
  <span class="cmd-green">repos</span>       - Real-time GitHub statistics (123+ repos, 154+ ⭐)
  <span class="cmd-green">faq</span>         - Generative AI & general FAQ
  <span class="cmd-green">contact</span>     - Social profiles & connection links
  <span class="cmd-green">matrix</span>      - Cyberpunk matrix animation stream
  <span class="cmd-green">clear</span>       - Clear terminal window
    `,

    services: `
<span class="cmd-purple">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
<span class="cmd-bold cmd-cyan">LAYANAN KONSULTASI & PELATIHAN RESMI — ROEDY RUSTAM</span>
<span class="cmd-purple">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
Solusi terukur dan terbukti melalui 123+ repositori GitHub:
  1. <span class="cmd-green">Konsultan UMKM</span>      : Kasir Simpel POS, BeansHub ERP, CuppingNotes SCA.
  2. <span class="cmd-green">AI Engineer</span>         : vibes-plug (161 skills), sinapsai gateway, MCP v1.x.
  3. <span class="cmd-green">Konsultan IT</span>        : Enterprise architecture, Core Web Vitals 100/100, API Wilayah.
  4. <span class="cmd-green">Trainer IT</span>          : Corporate workshop AI agent, prompt engineering, anti-slop.
Type <span class="cmd-yellow">'umkm'</span>, <span class="cmd-yellow">'ai'</span>, <span class="cmd-yellow">'konsultan'</span>, atau <span class="cmd-yellow">'trainer'</span> untuk rincian bukti karya!
    `,

    layanan: `
[Redirected to services]
Type <span class="cmd-yellow">'services'</span> to see all consulting offerings.
    `,

    konsultan: `
<span class="cmd-cyan">🏛️ KONSULTAN IT & ENTERPRISE ARCHITECTURE (INDONESIA)</span>
Advisory arsitektur sistem skala tinggi, optimasi performa & open data:
  • <span class="cmd-yellow">Bukti Empiris</span> : Pencipta <a href="https://github.com/roedyrustam/API-Wilayah-2024" target="_blank" class="term-link">API-Wilayah-2024</a> (38 Provinsi, 514 Kab/Kota, 83.000+ Desa, 21⭐, 10 forks).
  • <span class="cmd-yellow">Portofolio</span>    : 123+ repositori publik (TypeScript, Node.js, PHP, Python, Rust, Go).
  • <span class="cmd-yellow">Layanan</span>       : Audit arsitektur sistem, Core Web Vitals 100/100, database tuning SQL/PostGIS, dan migrasi zero-downtime.
Hubungi untuk konsultasi: <a href="#contact" class="term-link">#contact</a>
    `,

    ai: `
<span class="cmd-purple">🤖 AI ENGINEER & MULTI-AGENT SWARMS (INDONESIA)</span>
Implementasi sistem AI agentic otonom dan in-process gateway:
  • <span class="cmd-yellow">vibes-plug</span>    : 161 specialized AI skills & MCP tools (<a href="https://github.com/roedyrustam/vibes-plug" target="_blank" class="term-link">github.com/roedyrustam/vibes-plug</a>, 109⭐, 25 forks).
  • <span class="cmd-yellow">sinapsai</span>      : In-process AI Gateway dengan Circuit Breaker & Failover (<a href="https://github.com/roedyrustam/sinapsai" target="_blank" class="term-link">github.com/roedyrustam/sinapsai</a>).
  • <span class="cmd-yellow">doku-gemini</span>   : Agentic commerce via DOKU Payment Gateway Model Context Protocol.
  • <span class="cmd-yellow">Layanan</span>       : Multi-agent swarm design, custom MCP servers, hybrid reasoning LLM, prompt injection firewall.
    `,

    praktisi: `
[Lihat rincian Praktisi AI dengan mengetik: <span class="cmd-yellow">'ai'</span>]
    `,

    umkm: `
<span class="cmd-yellow">🏪 KONSULTAN DIGITALISASI & RETAIL UMKM INDONESIA</span>
Transformasi digital hemat biaya tanpa biaya langganan mencekik:
  • <span class="cmd-green">Kasir Simpel</span>   : Cloud Point of Sale (POS) offline-first PWA untuk UMKM & kafe (<a href="https://github.com/roedyrustam/posas" target="_blank" class="term-link">github.com/roedyrustam/posas</a>).
  • <span class="cmd-green">BeansHub ERP</span>   : Manajemen batch roastery, inventaris biji kopi, & order tracking (<a href="https://github.com/roedyrustam/beanshub1" target="_blank" class="term-link">github.com/roedyrustam/beanshub1</a>).
  • <span class="cmd-green">CuppingNotes</span>   : Platform evaluasi sensori SCA 2025 CVA standar dunia (<a href="https://cuppingnotes.online" target="_blank" class="term-link">cuppingnotes.online</a>).
  • <span class="cmd-green">Layanan</span>        : Modernisasi POS ritel, manajemen rantai pasok UMKM, dan standarisasi mutu produk.
    `,

    trainer: `
<span class="cmd-green">🎓 TRAINER IT & WORKSHOP AI DEVELOPER INDONESIA</span>
Pelatihan intensif engineering untuk korporasi, institusi, dan software house:
  • <span class="cmd-yellow">Kurikulum Swarm</span> : Berbasis ekosistem <a href="https://github.com/roedyrustam/vibes-plug" target="_blank" class="term-link">vibes-plug</a> yang teruji di industri.
  • <span class="cmd-yellow">Topik Utama</span>     : Adopsi AI Agent (Gemini 4 Pro, Claude Code, Cursor), Model Context Protocol (MCP), Autonomous TDD Debugging, dan Doktrin Anti-Slop (Zero Tech Debt).
  • <span class="cmd-yellow">Format</span>          : Hands-on coding workshop, arsitektur review bootcamp, dan sesi advisory tim.
Undang trainer: <a href="#contact" class="term-link">#contact</a>
    `,

    workshop: `
[Lihat jadwal dan materi workshop dengan mengetik: <span class="cmd-yellow">'trainer'</span>]
    `,

    wa: `
<span class="cmd-green">💬 JALUR CEPAT WHATSAPP LANGSUNG DENGAN ROEDY RUSTAM</span>
Pilih salah satu template pesan untuk membuka WhatsApp:
  1. 🏛️ <a href="https://wa.me/6281241003047?text=Halo%20Pak%20Roedy%20Rustam%2C%20saya%20ingin%20berkonsultasi%20mengenai%20arsitektur%20sistem%20IT%20dan%20audit%20performa%20untuk%20perusahaan%20kami." target="_blank" class="term-link">[Buka Chat Konsultasi IT Enterprise]</a>
  2. 🤖 <a href="https://wa.me/6281241003047?text=Halo%20Pak%20Roedy%20Rustam%2C%20kami%20tertarik%20mengundang%20Anda%20sebagai%20Trainer%20Workshop%20AI%20%2F%20konsultasi%20implementasi%20AI%20Agents%20untuk%20tim%20kami." target="_blank" class="term-link">[Buka Chat Training AI & Workshop]</a>
  3. 🏪 <a href="https://wa.me/6281241003047?text=Halo%20Pak%20Roedy%20Rustam%2C%20saya%20pelaku%20usaha%20UMKM%20ingin%20berkonsultasi%20mengenai%20sistem%20kasir%20cloud%20POS%2C%20inventaris%2C%20dan%20digitalisasi%20operasional." target="_blank" class="term-link">[Buka Chat Konsultasi Digitalisasi UMKM]</a>
Atau klik tombol mengambang hijau di pojok kanan bawah layar!
    `,

    whatsapp: `
<span class="cmd-green">💬 JALUR CEPAT WHATSAPP LANGSUNG DENGAN ROEDY RUSTAM</span>
Pilih salah satu template pesan untuk membuka WhatsApp:
  1. 🏛️ <a href="https://wa.me/6281241003047?text=Halo%20Pak%20Roedy%20Rustam%2C%20saya%20ingin%20berkonsultasi%20mengenai%20arsitektur%20sistem%20IT%20dan%20audit%20performa%20untuk%20perusahaan%20kami." target="_blank" class="term-link">[Buka Chat Konsultasi IT Enterprise]</a>
  2. 🤖 <a href="https://wa.me/6281241003047?text=Halo%20Pak%20Roedy%20Rustam%2C%20kami%20tertarik%20mengundang%20Anda%20sebagai%20Trainer%20Workshop%20AI%20%2F%20konsultasi%20implementasi%20AI%20Agents%20untuk%20tim%20kami." target="_blank" class="term-link">[Buka Chat Training AI & Workshop]</a>
  3. 🏪 <a href="https://wa.me/6281241003047?text=Halo%20Pak%20Roedy%20Rustam%2C%20saya%20pelaku%20usaha%20UMKM%20ingin%20berkonsultasi%20mengenai%20sistem%20kasir%20cloud%20POS%2C%20inventaris%2C%20dan%20digitalisasi%20operasional." target="_blank" class="term-link">[Buka Chat Konsultasi Digitalisasi UMKM]</a>
    `,

    photo: `
<span class="cmd-cyan">📸 ROEDY RUSTAM OFFICIAL PORTRAIT:</span>
  Full portrait loaded at: <a href="assets/images/roedy-rustam.jpg" target="_blank" class="term-link">assets/images/roedy-rustam.jpg</a>
  Identity : <span class="cmd-green">Roedy Rustam</span> (Verified Open Source Architect)
  Location : <span class="cmd-yellow">Jakarta, Indonesia</span> (GEO: -6.2088, 106.8456)
  Role     : Full-Stack & AI Agent Architect
  Status   : <span class="cmd-green">● Available for Advisory & AI Architecture</span>
  Scroll down to <a href="#about" class="term-link">#about</a> section to view full executive card.
    `,

    profile: `
<span class="cmd-purple">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
<span class="cmd-bold cmd-cyan">Roedy Rustam</span> | Full-Stack & AI Agent Architect
<span class="cmd-purple">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
📍 Location : Jakarta, Indonesia (UTC+7)
🚀 Focus    : Autonomous AI Agents, In-process Gateways (sinapsai),
              Specialty Coffee Tech (CuppingNotes SCA 2025 CVA), & GovTech Open Data.
📦 Repos    : 132+ Public Repositories on GitHub
⭐ Stars    : 121+ GitHub Stars (38+ Forks)
🌟 Flagship : vibes-plug (77+ Stars, 19 Forks, 155 Skills)
☕ Passion  : Specialty Coffee Science, Roasting Telemetry & Sensory Evaluation
🔗 Web      : <a href="https://roedyrustam.github.io/" target="_blank" class="term-link">https://roedyrustam.github.io/</a>
    `,

    faq: `
<span class="cmd-cyan">💡 FREQUENTLY ASKED QUESTIONS (AI KNOWLEDGE BASE)</span>
  • <span class="cmd-yellow">Who is Roedy Rustam?</span>
    Indonesian Full-Stack Engineer & AI Agent Architect with 132+ GitHub repos and 121+ stars based in Jakarta.
  • <span class="cmd-yellow">What is vibes-plug?</span>
    Unified 155-skill AI plugin & MCP suite with 77+ stars (<span class="cmd-green">npm i vibes-plug</span>).
  • <span class="cmd-yellow">What is sinapsai?</span>
    Blazing-fast in-process AI Gateway & Control Plane with Circuit Breaker and failover.
  • <span class="cmd-yellow">What is CuppingNotes?</span>
    SCA 2025 Coffee Value Assessment sensory scoring PWA (<a href="https://cuppingnotes.online" target="_blank" class="term-link">cuppingnotes.online</a>).
  • <span class="cmd-yellow">How to connect?</span>
    GitHub: <a href="https://github.com/roedyrustam" target="_blank" class="term-link">@roedyrustam</a> | X: <a href="https://x.com/rudyasho" target="_blank" class="term-link">@rudyasho</a>
    `,

    about: `
<span class="cmd-purple">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
<span class="cmd-bold cmd-cyan">Roedy Rustam</span> | Full-Stack & AI Agent Architect
<span class="cmd-purple">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
📍 Location : Jakarta, Indonesia (UTC+7)
🚀 Focus    : AI Agent Swarms, Model Context Protocol (MCP),
              Specialty Coffee Tech (SCA 2025 CVA), & GovTech Open Data.
📦 Repos    : 132+ Public Repositories on GitHub
⭐ Stars    : 121+ Total Stars across Open Source works
🌟 Flagship : vibes-plug (77+ Stars & 19 Forks on GitHub & NPM)
☕ Passion  : Specialty Coffee Science, Roasting Telemetry & Sensory Evaluation
🔗 Web      : <a href="https://roedyrustam.github.io/" target="_blank" class="term-link">https://roedyrustam.github.io/</a>
    `,

    skills: `
<span class="cmd-cyan">⚡ CORE SKILLS & CAPABILITIES (155 SKILLS ECOSYSTEM):</span>
  🤖 <span class="cmd-yellow">AI & MCP</span>        : Model Context Protocol (MCP v1.x), Multi-Agent Swarms, sinapsai AI Gateway, Gemini 4 Pro / Astra, Claude Code.
  ☕ <span class="cmd-yellow">Coffee Tech</span>     : SCA 2025 CVA Standard, Sensory Radar, RoR Roasting Telemetry, BeansHub ERP.
  💻 <span class="cmd-yellow">Frontend</span>        : TypeScript, Angular 19, Modern CSS / Tailwind v4, Astro, React, Signals PWA.
  🛠️ <span class="cmd-yellow">Backend</span>         : Node.js, PHP/Laravel, Python FastAPI, Rust, REST APIs, Microservices.
  🗺️ <span class="cmd-yellow">GovTech & Data</span>  : Indonesian Regional Open Data (API Wilayah 2024), GIS Leaflet/GeoJSON, SQL Optimization.
    `,

    projects: `
<span class="cmd-cyan">🚀 NOTABLE DIGITAL CREATIONS:</span>
  1. <span class="cmd-green">vibes-plug</span>       [AI/MCP]    - 155 AI skills & agent swarms for Claude/Antigravity (77+ ⭐, 19 forks)
  2. <span class="cmd-green">sinapsai</span>         [AI Gateway]- In-process AI Gateway with Circuit Breaker & Failover (4 ⭐)
  3. <span class="cmd-green">API Wilayah 2024</span> [GovTech]   - Comprehensive Indonesian administrative REST API (21 ⭐, 10 forks)
  4. <span class="cmd-green">CuppingNotes</span>     [Coffee]    - SCA 2025 Coffee Value Assessment platform (<a href="https://cuppingnotes.online" target="_blank" class="term-link">cuppingnotes.online</a>)
  5. <span class="cmd-green">doku-gemini-mcp</span>  [FinTech]   - DOKU payment MCP Server for AI agentic commerce
  6. <span class="cmd-green">centaury</span>         [Fullstack] - Autonomous engine for Gemini 4 Pro & Project Astra
  7. <span class="cmd-green">BeansHub</span>         [Coffee ERP]- Specialty roastery green bean inventory & batch tracking (3 ⭐)
  8. <span class="cmd-green">SIPD Panaikang</span>   [GIS]       - Interactive village land mapping & demographic portal
  9. <span class="cmd-green">Kasir Simpel</span>     [SaaS/POS]  - Lightweight cloud POS for MSMEs (<a href="https://kasirsimpel.vercel.app" target="_blank" class="term-link">kasirsimpel.vercel.app</a>)

Type <span class="cmd-yellow">vibes</span>, <span class="cmd-yellow">coffee</span>, or <span class="cmd-yellow">govtech</span> for deep dives!
    `,

    vibes: `
<span class="cmd-purple">🤖 VIBES-PLUG & AI AGENT ECOSYSTEM</span>
An advanced AI developer toolkit empowering coding assistants with 155 autonomous skills.
  • Multi-Agent swarm orchestration with shared memory graph
  • In-process AI routing, automated PRD architecture & security hardening
  • Model Context Protocol (MCP v1.x) server & client integration
  • Available via NPM: <span class="cmd-yellow">npm install vibes-plug</span>
  • GitHub: <a href="https://github.com/roedyrustam/vibes-plug" target="_blank" class="term-link">github.com/roedyrustam/vibes-plug</a> (77+ Stars, 19 Forks)
    `,

    coffee: `
<span class="cmd-yellow">☕ SPECIALTY COFFEE TECH INNOVATION</span>
Bridging coffee science with cutting-edge software architecture:
  • <span class="cmd-bold">CuppingNotes</span>: Fully compliant with SCA 2025 Coffee Value Assessment (CVA), sensory flavor radar.
  • <span class="cmd-bold">BeansHub ERP</span>: Intelligent green bean inventory & roast batch management.
  • <span class="cmd-bold">Artisan Scope</span>: Real-time thermocouple Rate of Rise (RoR) curve telemetry.
Live platform: <a href="https://cuppingnotes.online" target="_blank" class="term-link">https://cuppingnotes.online</a>
    `,

    govtech: `
<span class="cmd-cyan">🏛️ GOVTECH &amp; INDONESIAN OPEN DATA</span>
High-impact public sector digital transformations:
  • <span class="cmd-bold">API-Wilayah-2024</span>: 38 Provinces, 514 Cities/Regencies, 7,200+ Districts, 83,000+ Villages (21 Stars, 10 Forks).
  • <span class="cmd-bold">Interactive Live Explorer</span>: <a href="#govtech-explorer" class="term-link">[Buka Live Explorer 38 Provinsi]</a>
  • <span class="cmd-bold">Peta Desa Panaikang</span>: WebGIS land ownership &amp; demographic intelligence portal.
  • <span class="cmd-bold">Pandu Talenta</span>: Village governance starter kit &amp; youth ecosystem.
GitHub: <a href="https://github.com/roedyrustam/API-Wilayah-2024" target="_blank" class="term-link">github.com/roedyrustam/API-Wilayah-2024</a>
    `,

    wilayah: `
<span class="cmd-cyan">🗺️ LIVE EXPLORER API WILAYAH INDONESIA 2024</span>
Database &amp; REST API 38 Provinsi, 514 Kab/Kota, 7.200+ Kecamatan, 83.000+ Desa.
  • Buka widget interaktif langsung: <a href="#govtech-explorer" class="term-link">#govtech-explorer</a>
  • Repository &amp; SQL Dump: <a href="https://github.com/roedyrustam/API-Wilayah-2024" target="_blank" class="term-link">roedyrustam/API-Wilayah-2024</a>
    `,

    repos: `
<span class="cmd-cyan">📊 GITHUB PROFILE SUMMARY</span>
  • Username       : roedyrustam
  • Public Repos   : 132+
  • Total Stars    : 121+
  • Total Forks    : 38+
  • Primary Focus  : AI Agents, TypeScript, Python, PHP, Angular, Rust
  • Live Repos URL : <a href="https://github.com/roedyrustam?tab=repositories" target="_blank" class="term-link">https://github.com/roedyrustam?tab=repositories</a>
    `,

    contact: `
<span class="cmd-green">📫 GET IN TOUCH WITH ROEDY RUSTAM</span>
  • GitHub    : <a href="https://github.com/roedyrustam" target="_blank" class="term-link">@roedyrustam</a>
  • Twitter/X : <a href="https://x.com/rudyasho" target="_blank" class="term-link">@rudyasho</a>
  • Live Hub  : <a href="https://roedyrustam.pages.dev" target="_blank" class="term-link">roedyrustam.pages.dev</a>
  • Coffee Hub: <a href="https://cuppingnotes.online" target="_blank" class="term-link">cuppingnotes.online</a>
    `,

    matrix: () => {
      let output = '<div class="matrix-rain">';
      const chars = '01ROEDYRUSTAMVIBESPLUGMCP2026AIAGENTSCVACOFFEEDATAGOVTECH';
      for (let i = 0; i < 6; i++) {
        let line = '';
        for (let j = 0; j < 40; j++) {
          line += chars[Math.floor(Math.random() * chars.length)] + ' ';
        }
        output += `<div class="cmd-green">${line}</div>`;
      }
      output += '</div><span class="cmd-yellow">✨ Neural Stream Synchronized.</span>';
      return output;
    }
  };

  function printOutput(html, isCommand = false, cmdText = '') {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    if (isCommand) {
      line.innerHTML = `<span class="prompt-user">visitor@roedy-os</span>:<span class="prompt-path">~</span>$ <span class="cmd-text">${escapeHtml(cmdText)}</span>`;
      terminalBody.appendChild(line);
    }
    
    if (html) {
      const resp = document.createElement('div');
      resp.className = 'terminal-response';
      resp.innerHTML = html;
      terminalBody.appendChild(resp);
    }

    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function handleCommand(cmd) {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) {
      printOutput('', true, '');
      return;
    }

    HISTORY.push(cmd);
    historyIndex = HISTORY.length;

    if (trimmed === 'clear' || trimmed === 'cls') {
      terminalBody.innerHTML = `
        <div class="terminal-line text-muted">RoedyOS Interactive Shell [Vibes CLI v2.5]. Type <span class="cmd-green">'help'</span> to explore.</div>
      `;
      return;
    }

    const commandFn = COMMANDS[trimmed];
    if (typeof commandFn === 'function') {
      printOutput(commandFn(), true, cmd);
    } else if (typeof commandFn === 'string') {
      printOutput(commandFn, true, cmd);
    } else {
      printOutput(`
        <span class="cmd-red">command not found: ${escapeHtml(trimmed)}</span>. Type <span class="cmd-yellow">'help'</span> for available commands.
      `, true, cmd);
    }
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      terminalInput.value = '';
      handleCommand(val);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = HISTORY[historyIndex] || '';
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < HISTORY.length - 1) {
        historyIndex++;
        terminalInput.value = HISTORY[historyIndex] || '';
      } else {
        historyIndex = HISTORY.length;
        terminalInput.value = '';
      }
    }
  });

  // Pill click triggers
  document.querySelectorAll('.term-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const cmd = pill.getAttribute('data-cmd');
      if (cmd) {
        handleCommand(cmd);
        terminalInput.focus();
      }
    });
  });

  // Focus terminal input when clicking anywhere in terminal body
  if (terminalContainer) {
    terminalContainer.addEventListener('click', () => {
      terminalInput.focus();
    });
  }
})();
