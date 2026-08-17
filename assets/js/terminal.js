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
  <span class="cmd-green">about</span>       - Bio, summary & vision
  <span class="cmd-green">skills</span>      - Technical stack & competency matrix
  <span class="cmd-green">projects</span>    - Featured digital products & creations
  <span class="cmd-green">vibes</span>       - AI agent & MCP ecosystem (vibes-plug)
  <span class="cmd-green">coffee</span>      - CuppingNotes & SCA 2025 Coffee Tech
  <span class="cmd-green">govtech</span>     - API Wilayah 2024 & GIS systems
  <span class="cmd-green">repos</span>       - Real-time GitHub statistics
  <span class="cmd-green">contact</span>     - Social profiles & connection links
  <span class="cmd-green">matrix</span>      - Cyberpunk matrix animation stream
  <span class="cmd-green">clear</span>       - Clear terminal window
    `,

    about: `
<span class="cmd-purple">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
<span class="cmd-bold cmd-cyan">Roedy Rustam</span> | Full-Stack & AI Agent Architect
<span class="cmd-purple">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
📍 Location : Indonesia
🚀 Focus    : AI Agent Swarms, Model Context Protocol (MCP),
              Specialty Coffee Tech (SCA 2025 CVA), & GovTech Open Data.
📦 Repos    : 122+ Public Repositories on GitHub
🌟 Flagship : vibes-plug (45+ Stars on GitHub & NPM)
☕ Passion  : Specialty Coffee Science, Roasting Telemetry & Sensory Evaluation
🔗 Web      : <a href="https://github.com/roedyrustam" target="_blank" class="term-link">https://github.com/roedyrustam</a>
    `,

    skills: `
<span class="cmd-cyan">⚡ CORE SKILLS & CAPABILITIES:</span>
  🤖 <span class="cmd-yellow">AI & MCP</span>        : Model Context Protocol, Multi-Agent Swarms, Antigravity SDK, Claude Code, Prompt Eng.
  ☕ <span class="cmd-yellow">Coffee Tech</span>     : SCA 2025 CVA Standard, Sensory Radar, RoR Roasting Telemetry, Green Bean ERP.
  💻 <span class="cmd-yellow">Frontend</span>        : TypeScript, Angular 19, Modern CSS / Tailwind v4, Astro, React, PWA.
  🛠️ <span class="cmd-yellow">Backend</span>         : Node.js, PHP/Laravel, Python FastAPI, Rust, REST APIs, Microservices.
  🗺️ <span class="cmd-yellow">GovTech & Data</span>  : Indonesian Regional Open Data (API Wilayah), GIS Leaflet/GeoJSON, SQL Optimization.
    `,

    projects: `
<span class="cmd-cyan">🚀 NOTABLE DIGITAL CREATIONS:</span>
  1. <span class="cmd-green">vibes-plug</span>       [AI/MCP]    - 70+ AI skills & agent swarms for Claude/Antigravity (45+ ⭐)
  2. <span class="cmd-green">CuppingNotes</span>     [Coffee]    - SCA 2025 Coffee Value Assessment platform (<a href="https://cuppingnotes.online" target="_blank" class="term-link">cuppingnotes.online</a>)
  3. <span class="cmd-green">API Wilayah 2024</span> [GovTech]   - Comprehensive Indonesian administrative REST API (20 ⭐)
  4. <span class="cmd-green">doku-gemini-mcp</span>  [FinTech]   - DOKU payment MCP Server for AI agentic commerce
  5. <span class="cmd-green">SIPD Panaikang</span>   [GIS]       - Interactive village land mapping & demographic portal
  6. <span class="cmd-green">Kasir Simpel</span>     [SaaS/POS]  - Lightweight cloud POS for MSMEs (<a href="https://kasirsimpel.vercel.app" target="_blank" class="term-link">kasirsimpel.vercel.app</a>)
  7. <span class="cmd-green">GravityCheck</span>     [Telemetry] - Futuristic Google Antigravity token monitor

Type <span class="cmd-yellow">vibes</span>, <span class="cmd-yellow">coffee</span>, or <span class="cmd-yellow">govtech</span> for deep dives!
    `,

    vibes: `
<span class="cmd-purple">🤖 VIBES-PLUG & AI AGENT ECOSYSTEM</span>
An advanced AI developer toolkit empowering coding assistants with 70+ autonomous skills.
  • Multi-Agent swarm orchestration with memory graph
  • Automated zero-to-prod deployment pipeline
  • Model Context Protocol (MCP) server integration
  • Available via NPM: <span class="cmd-yellow">npm install vibes-plug</span>
  • GitHub: <a href="https://github.com/roedyrustam/vibes-plug" target="_blank" class="term-link">github.com/roedyrustam/vibes-plug</a> (45+ Stars)
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
<span class="cmd-cyan">🏛️ GOVTECH & INDONESIAN OPEN DATA</span>
High-impact public sector digital transformations:
  • <span class="cmd-bold">API-Wilayah-2024</span>: 38 Provinces, 514 Cities/Regencies, 7,200+ Districts, 83,000+ Villages (20 Stars).
  • <span class="cmd-bold">Peta Desa Panaikang</span>: WebGIS land ownership & demographic intelligence portal.
  • <span class="cmd-bold">Pandu Talenta</span>: Village governance starter kit & youth ecosystem.
    `,

    repos: `
<span class="cmd-cyan">📊 GITHUB PROFILE SUMMARY</span>
  • Username       : roedyrustam
  • Public Repos   : 122+
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
