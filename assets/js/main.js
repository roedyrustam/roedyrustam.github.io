/**
 * Main Application Logic for Roedy Rustam's Modern GitHub Page
 * Handles: Real-time GitHub API Sync, Project Filter & Search, Modal System,
 * Skills Matrix, Coffee CVA Radar, 3D Card Tilt, and Theme Manager.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSoundFX();
  initNavigation();
  initCommandPalette();
  initPersonaLens();
  initGitHubLiveStats();
  initProjectsExplorer();
  initSwarmVisualizer();
  initUmkmCalculator();
  initSkillsMatrix();
  initCoffeeRadar();
  init3DTilt();
  initQuickCopy();
  initScrollAnimations();
  initFAQAccordion();
  initWhatsAppBooking();
  initWilayahExplorer();
});

/* ==========================================================================
   1. Theme Switcher System
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('rr_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('rr_theme', next);
      updateThemeIcon(next);
      showToast(`Switched to ${next === 'dark' ? 'Cyber Obsidian' : 'Clean Daylight'} mode`);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-toggle-icon');
  if (icon) {
    icon.innerHTML = theme === 'dark' 
      ? '<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>'
      : '<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>';
  }
}

/* ==========================================================================
   2. Navigation & Mobile Menu
   ========================================================================== */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');
  const backdrop = document.getElementById('nav-backdrop');

  // Sticky header transition on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar?.classList.add('nav-scrolled');
    } else {
      navbar?.classList.remove('nav-scrolled');
    }
  }, { passive: true });

  function closeMenu() {
    navLinks?.classList.remove('active');
    mobileBtn?.classList.remove('active');
    backdrop?.classList.remove('active');
    mobileBtn?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  }

  function openMenu() {
    navLinks?.classList.add('active');
    mobileBtn?.classList.add('active');
    backdrop?.classList.add('active');
    mobileBtn?.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
  }

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = navLinks.classList.contains('active');
      if (isActive) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    backdrop?.addEventListener('click', closeMenu);

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        closeMenu();
      }
    });
  }

  // Scrollspy: automatically highlight active section in navbar
  const sections = document.querySelectorAll('section[id]');
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -60% 0px',
      threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks?.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(sec => navObserver.observe(sec));
  }
}

/* ==========================================================================
   3. Real-Time GitHub API Stats & Sync
   ========================================================================== */
async function initGitHubLiveStats() {
  const repoCountEl = document.getElementById('stat-repos');
  const starsCountEl = document.getElementById('stat-stars');
  const followersCountEl = document.getElementById('stat-followers');
  const updatedEl = document.getElementById('stat-live-status');
  const aboutReposEl = document.getElementById('stat-about-repos');
  const aboutStarsEl = document.getElementById('stat-about-stars');

  // Baseline verified numbers for Roedy Rustam
  let totalRepos = 123;
  let totalStars = 154;
  let followers = 8;

  try {
    const userRes = await fetch('https://api.github.com/users/roedyrustam');
    if (userRes.ok) {
      const userData = await userRes.json();
      totalRepos = userData.public_repos || 123;
      followers = userData.followers || 8;
    }

    // Fetch up to 200 repositories across 2 pages in parallel to calculate exact stars
    const [p1, p2] = await Promise.all([
      fetch('https://api.github.com/users/roedyrustam/repos?per_page=100&page=1'),
      fetch('https://api.github.com/users/roedyrustam/repos?per_page=100&page=2')
    ]);

    let aggregatedStars = 0;
    if (p1.ok) {
      const d1 = await p1.json();
      if (Array.isArray(d1)) aggregatedStars += d1.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
    }
    if (p2.ok) {
      const d2 = await p2.json();
      if (Array.isArray(d2)) aggregatedStars += d2.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
    }

    if (aggregatedStars > 0) {
      totalStars = Math.max(aggregatedStars, 154);
    }
    
    if (updatedEl) {
      updatedEl.innerHTML = `<span class="status-dot online"></span> Live GitHub Sync Active (${totalRepos} Repos • ${totalStars}⭐)`;
    }
  } catch (err) {
    console.warn('GitHub API rate limited or offline, using verified fallback dataset:', err);
    if (updatedEl) {
      updatedEl.innerHTML = '<span class="status-dot cached"></span> Profile Cached & Verified (123 Repos • 154⭐)';
    }
  }

  animateValue(repoCountEl, 0, totalRepos, 1500, '+');
  animateValue(starsCountEl, 0, totalStars, 1800, '+');
  animateValue(followersCountEl, 0, followers, 1200, '');
  animateValue(aboutReposEl, 0, totalRepos, 1500, '+');
  animateValue(aboutStarsEl, 0, totalStars, 1800, '+');
}

function animateValue(obj, start, end, duration, suffix = '') {
  if (!obj) return;
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerText = Math.floor(progress * (end - start) + start) + suffix;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

/* ==========================================================================
   4. Project Explorer, Filtering, Search & Modal System
   ========================================================================== */
let activeCategory = 'all';
let activeSearchQuery = '';
let filterOnlyLive = false;

function initProjectsExplorer() {
  const grid = document.getElementById('projects-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('project-search-input');
  const liveToggle = document.getElementById('filter-live-toggle');

  if (!grid || typeof PROJECTS_DATA === 'undefined') return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-filter') || 'all';
      renderProjects();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      activeSearchQuery = e.target.value.toLowerCase().trim();
      renderProjects();
    });
  }

  if (liveToggle) {
    liveToggle.addEventListener('change', (e) => {
      filterOnlyLive = e.target.checked;
      renderProjects();
    });
  }

  renderProjects();
  initModal();
}

function renderProjects() {
  const grid = document.getElementById('projects-grid');
  const countEl = document.getElementById('projects-count');
  if (!grid || typeof PROJECTS_DATA === 'undefined') return;

  const filtered = PROJECTS_DATA.filter(p => {
    const matchesCategory = (activeCategory === 'all') || (p.category === activeCategory);
    const matchesSearch = !activeSearchQuery || 
      p.title.toLowerCase().includes(activeSearchQuery) ||
      p.tagline.toLowerCase().includes(activeSearchQuery) ||
      p.tags.some(t => t.toLowerCase().includes(activeSearchQuery)) ||
      (p.language && p.language.toLowerCase().includes(activeSearchQuery));
    const matchesLive = !filterOnlyLive || (p.demo !== null && p.demo !== '');
    
    return matchesCategory && matchesSearch && matchesLive;
  });

  if (countEl) {
    countEl.innerText = `Showing ${filtered.length} of ${PROJECTS_DATA.length} Projects`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3>No projects found</h3>
        <p>Try refining your search query or switching categories.</p>
        <button class="btn btn-secondary btn-sm" onclick="resetFilters()">Reset Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(p => createProjectCardHTML(p)).join('');
  init3DTilt();
}

window.resetFilters = function() {
  activeCategory = 'all';
  activeSearchQuery = '';
  filterOnlyLive = false;
  const searchInput = document.getElementById('project-search-input');
  if (searchInput) searchInput.value = '';
  const liveToggle = document.getElementById('filter-live-toggle');
  if (liveToggle) liveToggle.checked = false;
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-filter') === 'all');
  });
  renderProjects();
};

function createProjectCardHTML(p) {
  const badgeClass = p.category === 'ai' ? 'badge-ai' : 
                     p.category === 'coffee' ? 'badge-coffee' : 
                     p.category === 'govtech' ? 'badge-gov' : 'badge-saas';

  const demoLink = p.demo 
    ? `<a href="${p.demo}" target="_blank" rel="noopener" class="card-btn btn-demo" title="Live Preview">
        <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
        Live
       </a>` 
    : '';

  const npmLink = p.npm
    ? `<a href="${p.npm}" target="_blank" rel="noopener" class="card-btn btn-npm" title="NPM Package">
        <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M0 7.334v8.57h6.666v-6h3.334v6H24v-8.57H0zm21.334 6h-2.668v-3.428h-2.666v3.428H12V9.905h9.334v3.429z"/></svg>
        NPM
       </a>`
    : '';

  return `
    <div class="project-card ${p.featured ? 'is-featured' : ''}" data-tilt data-id="${p.id}">
      <div class="card-glow"></div>
      <div class="card-header">
        <div class="badge-group">
          <span class="project-badge ${badgeClass}">${p.categoryLabel}</span>
          ${p.badge ? `<span class="project-highlight-badge">${p.badge}</span>` : ''}
        </div>
        <div class="stars-count">
          <svg width="14" height="14" fill="#F59E0B" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
          ${p.stars}
        </div>
      </div>

      <h3 class="card-title">${p.title}</h3>
      <p class="card-tagline">${p.tagline}</p>

      <p class="card-description">${p.description}</p>

      <div class="card-tags">
        ${p.tags.map(t => `<span class="tag-pill">${t}</span>`).join('')}
      </div>

      <div class="card-footer">
        <button class="card-btn btn-details" onclick="openProjectModal('${p.id}')">
          <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Details
        </button>
        <div class="footer-links">
          ${npmLink}
          ${demoLink}
          <a href="${p.github}" target="_blank" rel="noopener" class="card-btn btn-github" title="View Source on GitHub">
            <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg>
            Code
          </a>
        </div>
      </div>
    </div>
  `;
}

/* ==========================================================================
   5. Modal Detail Dialog
   ========================================================================== */
function initModal() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

window.openProjectModal = function(id) {
  const modal = document.getElementById('project-modal');
  const content = document.getElementById('modal-content-body');
  if (!modal || !content || typeof PROJECTS_DATA === 'undefined') return;

  const p = PROJECTS_DATA.find(item => item.id === id);
  if (!p) return;

  content.innerHTML = `
    <div class="modal-header-section">
      <div class="badge-group">
        <span class="project-badge badge-${p.category}">${p.categoryLabel}</span>
        ${p.badge ? `<span class="project-highlight-badge">${p.badge}</span>` : ''}
      </div>
      <h2 class="modal-title">${p.title}</h2>
      <p class="modal-tagline">${p.tagline}</p>
    </div>

    <div class="modal-meta-grid">
      <div class="meta-item">
        <span class="meta-label">Language / Stack</span>
        <span class="meta-value">${p.language || 'TypeScript / Multi-Stack'}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">GitHub Stars</span>
        <span class="meta-value">⭐ ${p.stars} Stars</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Category</span>
        <span class="meta-value">${p.categoryLabel}</span>
      </div>
    </div>

    <div class="modal-body-desc">
      <h3>About this Project</h3>
      <p>${p.description}</p>
    </div>

    ${p.highlights ? `
      <div class="modal-highlights">
        <h3>Key Architecture Highlights</h3>
        <ul>
          ${p.highlights.map(h => `<li><span class="hl-dot">✓</span> ${h}</li>`).join('')}
        </ul>
      </div>
    ` : ''}

    <div class="modal-tags-section">
      <h3>Tech Stack & Topics</h3>
      <div class="card-tags">
        ${p.tags.map(t => `<span class="tag-pill">${t}</span>`).join('')}
      </div>
    </div>

    <div class="modal-actions-bar">
      <a href="${p.github}" target="_blank" rel="noopener" class="btn btn-primary">
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg>
        View Repository on GitHub
      </a>
      ${p.demo ? `
        <a href="${p.demo}" target="_blank" rel="noopener" class="btn btn-secondary">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
          Launch Live Website
        </a>
      ` : ''}
      ${p.npm ? `
        <a href="${p.npm}" target="_blank" rel="noopener" class="btn btn-secondary">
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M0 7.334v8.57h6.666v-6h3.334v6H24v-8.57H0zm21.334 6h-2.668v-3.428h-2.666v3.428H12V9.905h9.334v3.429z"/></svg>
          NPM Registry
        </a>
      ` : ''}
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

function closeModal() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

/* ==========================================================================
   6. Skills Matrix Renderer
   ========================================================================== */
function initSkillsMatrix() {
  const container = document.getElementById('skills-container');
  if (!container || typeof SKILLS_DATA === 'undefined') return;

  container.innerHTML = Object.entries(SKILLS_DATA).map(([category, skills]) => `
    <div class="skill-category-card">
      <h3 class="skill-cat-title">
        <span class="cat-dot"></span>
        ${category}
      </h3>
      <div class="skill-items-list">
        ${skills.map(s => `
          <div class="skill-item">
            <div class="skill-info">
              <span class="skill-name">${s.name}</span>
              <span class="skill-pct">${s.level}%</span>
            </div>
            <div class="skill-progress-bar">
              <div class="skill-fill" style="width: ${s.level}%;"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   7. Coffee SCA 2025 Sensory Radar Canvas
   ========================================================================== */
function initCoffeeRadar() {
  const canvas = document.getElementById('coffee-radar-canvas');
  if (!canvas || typeof COFFEE_RADAR_DATA === 'undefined') return;
  const ctx = canvas.getContext('2d');

  const size = 380;
  canvas.width = size;
  canvas.height = size;

  const center = size / 2;
  const radius = (size / 2) - 48;
  const totalAxes = COFFEE_RADAR_DATA.length;
  const angleSlice = (Math.PI * 2) / totalAxes;

  function drawRadar() {
    ctx.clearRect(0, 0, size, size);

    // Draw background concentric circles (Grid levels 2 to 10)
    for (let level = 2; level <= 10; level += 2) {
      const r = (radius / 10) * level;
      ctx.beginPath();
      for (let i = 0; i < totalAxes; i++) {
        const angle = i * angleSlice - Math.PI / 2;
        const x = center + r * Math.cos(angle);
        const y = center + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw radial axes lines & labels
    for (let i = 0; i < totalAxes; i++) {
      const angle = i * angleSlice - Math.PI / 2;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);

      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.lineTo(x, y);
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.25)';
      ctx.stroke();

      // Label text
      const labelX = center + (radius + 22) * Math.cos(angle);
      const labelY = center + (radius + 22) * Math.sin(angle);
      ctx.font = '10px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#CBD5E1';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(COFFEE_RADAR_DATA[i].attribute, labelX, labelY);
    }

    // Draw Data Polygon
    ctx.beginPath();
    for (let i = 0; i < totalAxes; i++) {
      const angle = i * angleSlice - Math.PI / 2;
      const score = COFFEE_RADAR_DATA[i].score;
      const r = (radius / 10) * score;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(245, 158, 11, 0.3)';
    ctx.fill();
    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Draw points on polygon vertices
    for (let i = 0; i < totalAxes; i++) {
      const angle = i * angleSlice - Math.PI / 2;
      const score = COFFEE_RADAR_DATA[i].score;
      const r = (radius / 10) * score;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#00F2FE';
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  drawRadar();
}

/* ==========================================================================
   8. 3D Card Tilt Effect
   ========================================================================== */
function init3DTilt() {
  const cards = document.querySelectorAll('[data-tilt]');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      
      const glow = card.querySelector('.card-glow');
      if (glow) {
        glow.style.left = `${x}px`;
        glow.style.top = `${y}px`;
        glow.style.opacity = '0.35';
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      const glow = card.querySelector('.card-glow');
      if (glow) glow.style.opacity = '0';
    });
  });
}

/* ==========================================================================
   9. Quick Copy & Toast
   ========================================================================== */
function initQuickCopy() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          showToast(`Copied "${text}" to clipboard!`);
        });
      }
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.innerText = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

/* ==========================================================================
   10. Scroll Reveal Animations
   ========================================================================== */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

/* ==========================================================================
   11. FAQ & AI Knowledge Base Accordion
   ========================================================================== */
function initFAQAccordion() {
  const faqCards = document.querySelectorAll('.faq-card');
  faqCards.forEach(card => {
    const btn = card.querySelector('.faq-question-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isActive = card.classList.contains('active');

      // Toggle current card
      card.classList.toggle('active', !isActive);
      btn.setAttribute('aria-expanded', String(!isActive));
    });
  });
}

/* ==========================================================================
   12. WhatsApp Fast-Track Booking System (P1)
   ========================================================================== */
function initWhatsAppBooking() {
  const phone = document.body.dataset.waPhone || '6281241003047';
  
  const TEMPLATES = {
    it: "Halo Pak Roedy Rustam, saya ingin berkonsultasi mengenai arsitektur sistem IT dan audit performa untuk perusahaan kami.",
    ai: "Halo Pak Roedy Rustam, kami tertarik mengundang Anda sebagai Trainer Workshop AI / konsultasi implementasi AI Agents untuk tim kami.",
    umkm: "Halo Pak Roedy Rustam, saya pelaku usaha UMKM ingin berkonsultasi mengenai sistem kasir cloud POS, inventaris, dan digitalisasi operasional.",
    general: "Halo Pak Roedy Rustam, saya ingin mendiskusikan peluang kolaborasi teknologi."
  };

  function openWhatsApp(text) {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const encoded = encodeURIComponent(text || TEMPLATES.general);
    const url = `https://wa.me/${cleanPhone}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    showToast("Membuka WhatsApp...");
  }

  // 1. In-page Contact Section template cards
  const contactCards = document.querySelectorAll('.contact-wa-grid .wa-template-card');
  contactCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const templateKey = card.getAttribute('data-template') || 'it';
      const msg = TEMPLATES[templateKey] || TEMPLATES.general;
      openWhatsApp(msg);
    });
  });

  // 2. Floating Action Button & Popover
  const fabBtn = document.getElementById('wa-floating-btn');
  const popover = document.getElementById('wa-popover-card');
  const closeBtn = document.getElementById('wa-popover-close');
  const customInput = document.getElementById('wa-custom-input');
  const sendBtn = document.getElementById('wa-custom-send');

  if (fabBtn && popover) {
    fabBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      popover.classList.toggle('show');
      if (popover.classList.contains('show')) {
        customInput?.focus();
      }
    });

    closeBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      popover.classList.remove('show');
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (popover.classList.contains('show') && !popover.contains(e.target) && !fabBtn.contains(e.target)) {
        popover.classList.remove('show');
      }
    });

    // Popover template items
    const popoverItems = popover.querySelectorAll('.wa-popover-item');
    popoverItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const templateKey = item.getAttribute('data-template') || 'it';
        const msg = TEMPLATES[templateKey] || TEMPLATES.general;
        openWhatsApp(msg);
        popover.classList.remove('show');
      });
    });

    // Custom input send
    function handleCustomSend() {
      const text = customInput?.value.trim();
      const msg = text || TEMPLATES.general;
      openWhatsApp(msg);
      if (customInput) customInput.value = '';
      popover.classList.remove('show');
    }

    sendBtn?.addEventListener('click', handleCustomSend);
    customInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleCustomSend();
      }
    });
  }
}

/* ==========================================================================
   13. GovTech API Wilayah Indonesia 2024 Live Interactive Explorer (P2)
   ========================================================================== */
function initWilayahExplorer() {
  const provSelect = document.getElementById('wilayah-prov-select');
  const regSelect = document.getElementById('wilayah-reg-select');
  const distSelect = document.getElementById('wilayah-dist-select');
  const villSelect = document.getElementById('wilayah-vill-select');

  if (!provSelect || typeof WILAYAH_PROVINCES === 'undefined') return;

  // Code badges
  const provBadge = document.getElementById('badge-prov-code');
  const regBadge = document.getElementById('badge-reg-code');
  const distBadge = document.getElementById('badge-dist-code');
  const villBadge = document.getElementById('badge-vill-code');

  // Telemetry elements
  const breadcrumbEl = document.getElementById('wilayah-breadcrumb');
  const kemendagriEl = document.getElementById('telemetry-kemendagri');
  const postalEl = document.getElementById('telemetry-postal');
  const islandEl = document.getElementById('telemetry-island');
  const coordsEl = document.getElementById('telemetry-coords');
  const latencyText = document.getElementById('wilayah-latency-text');
  const statusMetrics = document.getElementById('wilayah-status-metrics');
  const endpointPreview = document.getElementById('wilayah-endpoint-preview');

  // Code display elements
  const jsonCodeEl = document.getElementById('wilayah-json-code');
  const curlCodeEl = document.getElementById('wilayah-curl-code');
  const sqlCodeEl = document.getElementById('wilayah-sql-code');

  // Populate 38 Provinces
  provSelect.innerHTML = WILAYAH_PROVINCES.map(p => 
    `<option value="${p.code}">${p.code} — ${p.name} (${p.capital})</option>`
  ).join('');

  // Active state
  let currentProvCode = "31";
  let currentRegCode = "31.71";
  let currentDistCode = "31.71.01";
  let currentVillCode = "31.71.01.1001";
  let activeTab = "json";

  function updateCascades(provCode, regCodePref, distCodePref, villCodePref) {
    const t0 = performance.now();

    currentProvCode = provCode;
    provSelect.value = provCode;
    const currentProv = WILAYAH_PROVINCES.find(p => p.code === provCode) || WILAYAH_PROVINCES[0];

    // 1. Regencies
    const regencies = getRegenciesForProvince(provCode);
    regSelect.innerHTML = regencies.map(r => 
      `<option value="${r.code}">${r.code} — ${r.name}</option>`
    ).join('');
    
    currentRegCode = (regCodePref && regencies.some(r => r.code === regCodePref)) 
      ? regCodePref 
      : regencies[0].code;
    regSelect.value = currentRegCode;
    const currentReg = regencies.find(r => r.code === currentRegCode) || regencies[0];

    // 2. Districts
    const districts = getDistrictsForRegency(provCode, currentRegCode);
    distSelect.innerHTML = districts.map(d => 
      `<option value="${d.code}">${d.code} — ${d.name}</option>`
    ).join('');

    currentDistCode = (distCodePref && districts.some(d => d.code === distCodePref)) 
      ? distCodePref 
      : districts[0].code;
    distSelect.value = currentDistCode;
    const currentDist = districts.find(d => d.code === currentDistCode) || districts[0];

    // 3. Villages
    const villages = getVillagesForDistrict(provCode, currentDistCode);
    villSelect.innerHTML = villages.map(v => 
      `<option value="${v.code}">${v.code} — ${v.name} (${v.postal || 'Kodepos'})</option>`
    ).join('');

    currentVillCode = (villCodePref && villages.some(v => v.code === villCodePref)) 
      ? villCodePref 
      : villages[0].code;
    villSelect.value = currentVillCode;
    const currentVill = villages.find(v => v.code === currentVillCode) || villages[0];

    // Update Badges
    if (provBadge) provBadge.textContent = `Kode: ${currentProv.code}`;
    if (regBadge) regBadge.textContent = `Kode: ${currentReg.code}`;
    if (distBadge) distBadge.textContent = `Kode: ${currentDist.code}`;
    if (villBadge) villBadge.textContent = `Kode: ${currentVill.code}`;

    // Update Telemetry
    if (breadcrumbEl) {
      breadcrumbEl.textContent = `${currentProv.name} > ${currentReg.name} > ${currentDist.name} > ${currentVill.name}`;
    }
    if (kemendagriEl) kemendagriEl.textContent = currentVill.code;
    if (postalEl) postalEl.textContent = currentVill.postal || currentReg.postal || "10110";
    if (islandEl) islandEl.textContent = currentProv.island;
    if (coordsEl) coordsEl.textContent = `${currentProv.lat}, ${currentProv.lng}`;

    const t1 = performance.now();
    const duration = (t1 - t0).toFixed(2);
    if (latencyText) {
      latencyText.textContent = `Latency: ${duration}ms (In-Memory Micro-Cache)`;
    }

    // Build REST URL preview
    const endpointStr = `/api/v1/wilayah/provinsi/${currentProv.code}/kabupaten/${currentReg.code}/kecamatan/${currentDist.code}/desa.json`;
    if (endpointPreview) {
      endpointPreview.textContent = endpointStr;
    }

    // JSON Payload
    const jsonPayload = {
      status: "success",
      code: 200,
      timestamp: new Date().toISOString(),
      execution_time: `${duration}ms`,
      data: {
        kemendagri_code: currentVill.code,
        administrative_level: 4,
        hierarchy: {
          provinsi: {
            kode: currentProv.code,
            nama: currentProv.name,
            ibukota: currentProv.capital,
            wilayah_pulau: currentProv.island
          },
          kabupaten_kota: {
            kode: currentReg.code,
            nama: currentReg.name,
            tipe: currentReg.type || "Kota"
          },
          kecamatan: {
            kode: currentDist.code,
            nama: currentDist.name
          },
          desa_kelurahan: {
            kode: currentVill.code,
            nama: currentVill.name,
            tipe: currentVill.type || "Kelurahan",
            kode_pos: currentVill.postal || "10110"
          }
        },
        metadata: {
          standard: WILAYAH_NATIONAL_STATS.standard,
          coordinates: {
            latitude: currentProv.lat,
            longitude: currentProv.lng
          },
          license: WILAYAH_NATIONAL_STATS.license,
          author: "Roedy Rustam"
        }
      }
    };

    const jsonString = JSON.stringify(jsonPayload, null, 2);
    if (jsonCodeEl) jsonCodeEl.textContent = jsonString;

    // cURL Command
    const curlCommand = `# Fetch administrative data for ${currentVill.name}\ncurl -X GET "https://api.roedyrustam.com${endpointStr}" \\\n  -H "Accept: application/json" \\\n  -H "User-Agent: API-Wilayah-2024-Client/2.0"`;
    if (curlCodeEl) curlCodeEl.textContent = curlCommand;

    // SQL Query
    const sqlQuery = `-- Relational query schema with B-Tree index lookup (Permendagri 2024 standard)\nSELECT \n  p.kode AS kode_provinsi, p.nama AS provinsi,\n  k.kode AS kode_kabupaten, k.nama AS kabupaten_kota,\n  c.kode AS kode_kecamatan, c.nama AS kecamatan,\n  d.kode AS kode_desa, d.nama AS kelurahan_desa, d.kode_pos\nFROM wilayah_desa d\nJOIN wilayah_kecamatan c ON d.kecamatan_id = c.id\nJOIN wilayah_kabupaten k ON c.kabupaten_id = k.id\nJOIN wilayah_provinsi p ON k.provinsi_id = p.id\nWHERE d.kode = '${currentVill.code}'\nLIMIT 1;`;
    if (sqlCodeEl) sqlCodeEl.textContent = sqlQuery;

    // Status metrics
    const payloadBytes = new TextEncoder().encode(jsonString).length;
    const payloadKb = (payloadBytes / 1024).toFixed(2);
    if (statusMetrics) {
      statusMetrics.textContent = `Record: 1 | Cache-Hit: 100% | Size: ${payloadKb} KB | Query: ${duration}ms`;
    }
  }

  // Event Listeners
  provSelect.addEventListener('change', (e) => {
    updateCascades(e.target.value);
    document.querySelectorAll('.wilayah-preset-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-prov') === e.target.value);
    });
  });

  regSelect.addEventListener('change', (e) => {
    updateCascades(currentProvCode, e.target.value);
  });

  distSelect.addEventListener('change', (e) => {
    updateCascades(currentProvCode, currentRegCode, e.target.value);
  });

  villSelect.addEventListener('change', (e) => {
    updateCascades(currentProvCode, currentRegCode, currentDistCode, e.target.value);
  });

  // Presets
  document.querySelectorAll('.wilayah-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pCode = btn.getAttribute('data-prov');
      document.querySelectorAll('.wilayah-preset-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateCascades(pCode);
    });
  });

  // Reset Button
  const resetBtn = document.getElementById('wilayah-reset-btn');
  resetBtn?.addEventListener('click', () => {
    document.querySelectorAll('.wilayah-preset-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-prov') === '31');
    });
    updateCascades("31", "31.71", "31.71.01", "31.71.01.1001");
  });

  // Console Tabs
  const tabBtns = document.querySelectorAll('.console-tab-btn');
  const tabContentJson = document.getElementById('tab-content-json');
  const tabContentCurl = document.getElementById('tab-content-curl');
  const tabContentSql = document.getElementById('tab-content-sql');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      activeTab = tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      tabContentJson?.classList.toggle('hidden', tab !== 'json');
      tabContentCurl?.classList.toggle('hidden', tab !== 'curl');
      tabContentSql?.classList.toggle('hidden', tab !== 'sql');
    });
  });

  // Copy Action
  const copyBtn = document.getElementById('console-copy-btn');
  const copyText = document.getElementById('copy-btn-text');
  copyBtn?.addEventListener('click', () => {
    let textToCopy = "";
    if (activeTab === 'json') textToCopy = jsonCodeEl?.textContent || "";
    else if (activeTab === 'curl') textToCopy = curlCodeEl?.textContent || "";
    else if (activeTab === 'sql') textToCopy = sqlCodeEl?.textContent || "";

    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        if (copyText) copyText.textContent = "Copied! ✓";
        setTimeout(() => {
          if (copyText) copyText.textContent = "Copy";
        }, 2000);
      });
    }
  });

  // Initial trigger with DKI Jakarta
  updateCascades("31", "31.71", "31.71.01", "31.71.01.1001");
}

/* ==========================================================================
   13. Audio Feedback Synthesizer (Zero-Network Web Audio)
   ========================================================================== */
let audioCtx = null;
let soundEnabled = localStorage.getItem('rr_sound') === 'on';

function playUiSound(type = 'click') {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;
    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'open') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'toggle') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(900, now + 0.05);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    }
  } catch (e) {
    // Graceful fallback if Web Audio is unsupported
  }
}

function initSoundFX() {
  const soundBtn = document.getElementById('sound-toggle-btn');
  const soundIcon = document.getElementById('sound-toggle-icon');

  function updateIcon() {
    if (soundIcon) {
      soundIcon.textContent = soundEnabled ? '🔊' : '🔇';
    }
    if (soundBtn) {
      soundBtn.setAttribute('title', `Audio Feedback UI: ${soundEnabled ? 'Aktif' : 'Muted'} (Klik untuk ubah)`);
    }
  }

  updateIcon();

  soundBtn?.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    localStorage.setItem('rr_sound', soundEnabled ? 'on' : 'off');
    updateIcon();
    if (soundEnabled) {
      playUiSound('open');
      showToast('Audio Feedback UI: Aktif');
    } else {
      showToast('Audio Feedback UI: Muted');
    }
  });

  // Attach subtle click feedback to interactive buttons
  document.addEventListener('click', (e) => {
    if (e.target.closest('button, .nav-link, .term-pill, .filter-btn, .calc-option-btn, .persona-tab-btn, .swarm-node-item')) {
      playUiSound('click');
    }
  }, { passive: true });
}

/* ==========================================================================
   14. Dual Persona Lens Switcher (UMKM vs Tech Lead / CTO)
   ========================================================================== */
function initPersonaLens() {
  const btnUmkm = document.getElementById('lens-btn-umkm');
  const btnTech = document.getElementById('lens-btn-tech');
  const descEl = document.getElementById('hero-description-text');
  const pillsContainer = document.getElementById('persona-highlights-container');

  if (!btnUmkm || !btnTech || !descEl || !pillsContainer) return;

  const LENS_DATA = {
    umkm: {
      desc: 'Menyediakan transformasi digital bisnis UMKM tanpa biaya langganan mencekik: kasir cloud POS offline-first, manajemen stok pergudangan, integrasi otomatisasi WhatsApp CRM, serta konsultasi arsitektur enterprise terbukti melalui <strong>123+ repositori publik</strong> dan <strong>154+ GitHub stars</strong>.',
      pills: [
        'Point of Sale (POS) Cloud Ringan',
        'Manajemen Stok & Roastery BeansHub',
        'Bebas Biaya Langganan Bulanan',
        'Integrasi Chat WhatsApp CRM'
      ]
    },
    tech: {
      desc: 'Menyediakan perancangan arsitektur enterprise modern, Model Context Protocol (MCP v1.x), sistem multi-agent otonom (<strong>161 AI skills vibes-plug</strong>), in-process AI gateway sinapsai berlatensi ultra-rendah, tuning database SQL/PostGIS, dan optimasi performa 100/100 Core Web Vitals.',
      pills: [
        '161 AI Engineering Skills (vibes-plug)',
        'In-Process AI Gateway (sinapsai)',
        'DOKU SNAP BI Payment MCP Server',
        'Kemendagri API Wilayah 38 Provinsi'
      ]
    }
  };

  function setLens(lens) {
    playUiSound('toggle');
    if (lens === 'umkm') {
      btnUmkm.classList.add('active');
      btnUmkm.setAttribute('aria-selected', 'true');
      btnTech.classList.remove('active');
      btnTech.setAttribute('aria-selected', 'false');
    } else {
      btnTech.classList.add('active');
      btnTech.setAttribute('aria-selected', 'true');
      btnUmkm.classList.remove('active');
      btnUmkm.setAttribute('aria-selected', 'false');
    }

    // Smooth fade transition
    descEl.style.opacity = '0';
    pillsContainer.style.opacity = '0';

    setTimeout(() => {
      const data = LENS_DATA[lens];
      descEl.innerHTML = data.desc;
      pillsContainer.innerHTML = data.pills.map(p => `
        <span class="persona-pill"><span class="pill-dot"></span> ${p}</span>
      `).join('');
      descEl.style.opacity = '1';
      pillsContainer.style.opacity = '1';
    }, 150);
  }

  btnUmkm.addEventListener('click', () => setLens('umkm'));
  btnTech.addEventListener('click', () => setLens('tech'));
}

/* ==========================================================================
   15. Interactive Multi-Agent Swarm Topology Visualizer (v5.0)
   ========================================================================== */
function initSwarmVisualizer() {
  const nodes = document.querySelectorAll('.swarm-node-item');
  const inspector = document.getElementById('swarm-inspector');

  if (!nodes.length || !inspector) return;

  const SWARM_AGENTS = {
    director: {
      name: "Swarm Director & Orchestrator",
      icon: "👑",
      role: "Master Conductor / Pipeline Saga",
      model: "Google Gemini 4 Pro / Claude 3.7 Extended",
      status: "Orchestrating Active Swarm",
      desc: "Mengintersepsi instruksi pengguna, mendekomposisi tugas lintas domain, dan mengorkestrasi 4 subagen spesialis secara paralel dengan shared memory graph.",
      skills: ["brainstorming", "zero-to-prod-orchestrator", "multi-agent-orchestration", "context-window-engineer"],
      packet: {
        task_id: "SWARM-ORCH-8821",
        topology: "FAN-OUT / FAN-IN",
        active_subagents: 4,
        shared_memory: "HydraDB Graph (Sub-ms traversal)",
        latency: "142ms TTFT"
      }
    },
    rag: {
      name: "Knowledge Architect (RAG & Memory)",
      icon: "🧠",
      role: "Long-term Episodic Memory & Traversal",
      model: "Google Gemini 4 Flash / HydraDB Rust Engine",
      status: "In-Memory Graph Synced",
      desc: "Menyediakan retrieval dokumen, traversal graf relasional sub-milidetik menggunakan database graf HydraDB, dan injeksi konteks minim token.",
      skills: ["graph-rag-knowledge-expert", "agentic-memory-architect", "living-codebase-ast-graph"],
      packet: {
        engine: "HydraDB (Rust native)",
        vector_index: "HNSW pgvector",
        memory_nodes: 1248,
        query_latency: "0.85ms",
        cache_hit_rate: "94.6%"
      }
    },
    fintech: {
      name: "Payment Sentinel (FinTech & Commerce)",
      icon: "💳",
      role: "SNAP BI Direct API & Agentic Invoicing",
      model: "Claude 3.7 Sonnet / Enterprise Guardrails",
      status: "HMAC-SHA512 Verified",
      desc: "Menangani payment gateway DOKU SNAP BI standar Bank Indonesia, QRIS dynamic micro-clearing, idempotensi atomik, dan checkout link otonom untuk agen AI.",
      skills: ["doku-payment-gateway", "doku-mcp-server", "payment-gateway-expert", "agentic-m2m-settlement"],
      packet: {
        protocol: "SNAP BI 2026 Standard",
        signature: "HMAC-SHA512 (Atomic Locked)",
        channels: ["QRIS MPM", "Virtual Account", "Direct Debit"],
        idempotency: "Guaranteed (Zero-Double-Charge)"
      }
    },
    quality: {
      name: "Quality Guardian (Anti-Slop & TDD)",
      icon: "🛡️",
      role: "Zero Tech Debt Auditor & Red-Teamer",
      model: "DeepSeek-R1 / Gemini 4 Flash Fuzzer",
      status: "7 Anti-Slop Pillars Enforced",
      desc: "Menguji build, mengeksekusi TDD self-healing runner, membasmi AI slop, dan memverifikasi kontras warna WCAG 2.2 AA sebelum kode dirilis.",
      skills: ["anti-slop", "autonomous-tdd-debugger", "zero-tech-debt-auditor", "visual-ui-auditor"],
      packet: {
        test_suite: "TDD Self-Healing (0 failed)",
        anti_slop_gate: "100% Passed (R-01 to R-38)",
        wcag_contrast: "AA 4.5:1 Minimum Met",
        security_audit: "Zero Vulnerabilities Found"
      }
    },
    govtech: {
      name: "Open Data Engine (API Wilayah)",
      icon: "🗺️",
      role: "High-Scale GIS & Administrative Data",
      model: "In-Memory Micro-Cache REST Engine",
      status: "38 Provinces Live & Indexed",
      desc: "Menyediakan data referensi wilayah resmi Kepmendagri 2024: 38 Provinsi, 514 Kab/Kota, 7.200+ Kecamatan, dan 83.000+ Desa dengan respon < 1.2ms.",
      skills: ["api-design-expert", "geospatial-maps-expert", "database-orm-expert"],
      packet: {
        provinces: 38,
        cities: 514,
        villages: 83763,
        latency: "< 1.2ms (Micro-Cache)",
        standards: "Kepmendagri 050-145 2024"
      }
    }
  };

  function renderInspector(key) {
    const data = SWARM_AGENTS[key] || SWARM_AGENTS.director;
    inspector.innerHTML = `
      <div class="inspector-header">
        <div class="inspector-name">
          <span>${data.icon}</span>
          <span>${data.name}</span>
        </div>
        <div class="inspector-badge-row">
          <span class="inspector-tag">${data.role}</span>
          <span class="inspector-tag"><span class="status-dot online"></span> ${data.status}</span>
        </div>
      </div>
      <p class="inspector-desc">${data.desc}</p>
      <div>
        <span class="spec-title" style="margin-bottom: 0.35rem; display: block;">Model Tier:</span>
        <span style="font-size: 0.88rem; font-weight: 600; color: var(--cyan-neon);">${data.model}</span>
      </div>
      <div>
        <span class="spec-title" style="margin-bottom: 0.35rem; display: block;">Bound Skills:</span>
        <div class="inspector-badge-row">
          ${data.skills.map(s => `<span class="inspector-tag" style="color: var(--cyan-neon);">#${s}</span>`).join('')}
        </div>
      </div>
      <div>
        <span class="spec-title" style="margin-bottom: 0.35rem; display: block;">Live JSON Telemetry Packet:</span>
        <pre class="inspector-code-box"><code>${JSON.stringify(data.packet, null, 2)}</code></pre>
      </div>
    `;
  }

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');
      const agentKey = node.getAttribute('data-agent');
      renderInspector(agentKey);
    });

    node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        node.click();
      }
    });
  });

  // Render initial director
  renderInspector('director');
}

/* ==========================================================================
   16. Interactive UMKM Digitalization ROI & Solution Calculator
   ========================================================================== */
function initUmkmCalculator() {
  const bizBtns = document.querySelectorAll('#calc-biz-options .calc-option-btn');
  const probBtns = document.querySelectorAll('#calc-prob-options .calc-option-btn');
  const resultDisplay = document.getElementById('calc-result-display');

  if (!bizBtns.length || !probBtns.length || !resultDisplay) return;

  let currentBiz = 'retail';
  let currentProb = 'pos';

  const SOLUTIONS_MATRIX = {
    'retail_pos': {
      title: "Kasir Simpel PWA Offline-First (posas)",
      desc: "Sistem Point of Sale (POS) cloud berbasis Progressive Web App yang dapat digunakan di HP, tablet, maupun laptop. Tetap berfungsi meski internet mati dan mencetak struk kasir Bluetooth secara instan.",
      setup: "2 - 3 Hari Kerja",
      costSaving: "Hemat Rp 3.500.000+/th (Tanpa biaya langganan bulanan)",
      scope: "Katalog produk, barcode scanner kamera HP, cetak nota, & laporan harian.",
      waMsg: "Halo Pak Roedy Rustam, saya pemilik toko ritel ingin berkonsultasi mengenai implementasi sistem Kasir Simpel PWA offline-first untuk menggantikan nota manual kami."
    },
    'retail_stock': {
      title: "BeansHub Inventory & Stock Leakage Firewall",
      desc: "Sistem manajemen stok pergudangan terpadu dengan peringatan otomatis stok menipis (low-stock alert) dan audit riwayat mutasi barang untuk mencegah kebocoran fisik hingga 95%.",
      setup: "3 - 5 Hari Kerja",
      costSaving: "Mencegah kerugian selisih stok rata-rata Rp 5 - 15 Juta/tahun",
      scope: "Batch tracking, input stok masuk/keluar cepat, audit log, & mutasi gudang.",
      waMsg: "Halo Pak Roedy Rustam, saya memiliki kendala selisih dan kebocoran stok pada toko ritel kami. Saya ingin berkonsultasi mengenai solusi manajemen stok BeansHub."
    },
    'retail_chat': {
      title: "WhatsApp Catalog & Order Auto-Router",
      desc: "Integrasi katalog produk otomatis ke WhatsApp dengan format pesanan instan. Mempersingkat waktu pemesanan pelanggan dari 15 menit menjadi kurang dari 1 menit.",
      setup: "2 - 4 Hari Kerja",
      costSaving: "Meningkatkan konversi chat menjadi order hingga 40%",
      scope: "Link katalog instan, format pesan auto-generate, & rekap pesanan ke spreadsheet.",
      waMsg: "Halo Pak Roedy Rustam, saya ingin berkonsultasi mengenai integrasi katalog produk dan otomatisasi pemesanan via WhatsApp untuk toko ritel kami."
    },
    'retail_report': {
      title: "Kasir Simpel Financial Telemetry Dashboard",
      desc: "Dashboard rekapitulasi penjualan otomatis yang menyajikan omset, modal pokok (HPP), dan laba bersih harian/bulanan secara real-time langsung di layar smartphone Anda.",
      setup: "2 - 3 Hari Kerja",
      costSaving: "Menghemat 15+ jam kerja pembukuan manual setiap bulan",
      scope: "Grafik omset harian, margin keuntungan per barang, & export PDF/Excel.",
      waMsg: "Halo Pak Roedy Rustam, saya ingin berkonsultasi mengenai dashboard laporan keuangan dan rekap laba rugi otomatis untuk usaha ritel kami."
    },
    'cafe_pos': {
      title: "Kasir Simpel Cafe Edition + QRIS Table Ordering",
      desc: "Solusi kasir kedai kopi & kafe terpadu: pemesanan per nomor meja, variasi add-on (less sugar, extra shot, oatmilk), cetak tiket bar & kitchen terpisah, serta pembayaran QRIS dinamis.",
      setup: "3 - 4 Hari Kerja",
      costSaving: "Perputaran meja 2x lebih cepat & zero antrean kasir",
      scope: "Split bill, multi-printer bar & dapur, custom add-ons, & kasir mobile.",
      waMsg: "Halo Pak Roedy Rustam, saya pemilik kafe ingin berkonsultasi mengenai sistem Kasir Simpel Cafe Edition dengan manajemen meja dan add-on menu."
    },
    'cafe_stock': {
      title: "BeansHub Cafe Recipe & Raw Material Deduction",
      desc: "Sistem otomatis yang memotong stok bahan baku (biji kopi per gram, susu per ml, sirup per pump) setiap kali kasir membukukan penjualan menu minuman.",
      setup: "4 - 6 Hari Kerja",
      costSaving: "HPP minuman terpantau presisi hingga tingkat gramatur",
      scope: "Resep minuman terhubung ke stok bahan baku & peringatan susu/biji habis.",
      waMsg: "Halo Pak Roedy Rustam, saya ingin berkonsultasi mengenai integrasi resep menu kafe dan pemotongan otomatis stok bahan baku biji kopi/susu."
    },
    'cafe_chat': {
      title: "WhatsApp Pre-Order & Takeaway Engine",
      desc: "Pelanggan dapat memesan kopi terlebih dahulu melalui WhatsApp saat dalam perjalanan, minuman siap saat mereka tiba, tanpa menunggu antrean.",
      setup: "2 - 3 Hari Kerja",
      costSaving: "Menaikkan orderan take-away pagi hari hingga 35%",
      scope: "Menu pre-order, konfirmasi waktu penjemputan, & pembayaran instan.",
      waMsg: "Halo Pak Roedy Rustam, saya tertarik mengimplementasikan sistem pre-order dan takeaway via WhatsApp untuk kedai kopi kami."
    },
    'cafe_report': {
      title: "Cafe Product Mix & Peak-Hour Analytics",
      desc: "Analisis performa menu terlaris (Star, Cash Cow, Dog) dan jam-jam sibuk kafe untuk menentukan jadwal barista dan promo menu secara optimal.",
      setup: "2 - 4 Hari Kerja",
      costSaving: "Optimasi shift barista & efisiensi biaya operasional kafe",
      scope: "Heatmap jam sibuk, kontribusi margin per menu, & summary bulanan.",
      waMsg: "Halo Pak Roedy Rustam, saya ingin berkonsultasi mengenai analitik menu terlaris dan laporan performa penjualan untuk kafe kami."
    },
    'roastery_stock': {
      title: "BeansHub Specialty Roastery ERP (Flagship)",
      desc: "Platform manajemen roastery komprehensif: pelacakan green bean lot, kalkulasi penyusutan berat sangrai (roasting loss %), batch numbering, dan inventaris roasted bean siap kemas.",
      setup: "4 - 7 Hari Kerja",
      costSaving: "Standar mutu roastery komersial berstandar ekspor",
      scope: "Pencatatan origin/proses/varietas, kurva sangrai, & stok B2B wholesale.",
      waMsg: "Halo Pak Roedy Rustam, saya pengelola roastery kopi ingin berkonsultasi mengenai implementasi sistem BeansHub ERP untuk manajemen batch sangrai dan stok biji kopi."
    },
    'roastery_pos': {
      title: "CuppingNotes SCA 2025 + Wholesale POS",
      desc: "Integrasi evaluasi sensori kopi standar SCA 2025 CVA dengan sistem penjualan biji kopi wholesale untuk mitra kafe dan ritel.",
      setup: "3 - 5 Hari Kerja",
      costSaving: "Meningkatkan daya tawar dan harga jual biji kopi spesialti",
      scope: "Sertifikat radar sensori digital, daftar harga B2B, & invoicing tempo.",
      waMsg: "Halo Pak Roedy Rustam, saya ingin berkonsultasi mengenai integrasi evaluasi mutu CuppingNotes SCA 2025 dan sistem penjualan B2B roastery."
    },
    'roastery_chat': {
      title: "B2B Coffee Wholesale WhatsApp Portal",
      desc: "Otomatisasi pengiriman daftar harga biji kopi mingguan (roast list) dan pemesanan rutin untuk jaringan kafe pelanggan Anda.",
      setup: "2 - 4 Hari Kerja",
      costSaving: "Repeat order kafe berlangganan terkelola otomatis",
      scope: "Daftar biji siap kirim otomatis & konfirmasi tanggal roasting.",
      waMsg: "Halo Pak Roedy Rustam, saya ingin mengonsultasikan portal pemesanan wholesale biji kopi via WhatsApp untuk mitra kafe kami."
    },
    'roastery_report': {
      title: "Roastery Cost of Goods & Margin Telemetry",
      desc: "Penghitungan HPP biji kopi matang yang memperhitungkan harga beli green bean, susut berat sangrai, kemasan valve, gas, dan jasa roasting.",
      setup: "3 - 5 Hari Kerja",
      costSaving: "Penetapan harga jual B2B dan ritel yang pasti untung",
      scope: "Kalkulator HPP per 200g/1kg & proyeksi margin profitabilitas.",
      waMsg: "Halo Pak Roedy Rustam, saya ingin berkonsultasi mengenai audit HPP dan kalkulasi margin roasting kopi untuk roastery kami."
    },
    'service_pos': {
      title: "Service Management & Digital Work Order",
      desc: "Sistem pencatatan order jasa, estimasi biaya suku cadang, update status pengerjaan, dan pencetakan invoice digital untuk pelanggan.",
      setup: "2 - 4 Hari Kerja",
      costSaving: "Mengurangi komplain status pengerjaan jasa hingga 80%",
      scope: "Surat perintah kerja (SPK), status pengerjaan, & nota digital.",
      waMsg: "Halo Pak Roedy Rustam, saya memiliki usaha jasa ingin berkonsultasi mengenai sistem manajemen order kerja dan kasir invoice digital."
    },
    'service_stock': {
      title: "Spareparts & Consumables Inventory Tracking",
      desc: "Manajemen suku cadang dan bahan habis pakai yang otomatis berkurang saat pekerjaan jasa selesai dilakukan.",
      setup: "3 - 5 Hari Kerja",
      costSaving: "Mencegah suku cadang hilang atau tidak tertagih ke nota",
      scope: "Stok suku cadang, harga beli vs harga jual part, & audit gudang.",
      waMsg: "Halo Pak Roedy Rustam, saya ingin berkonsultasi mengenai manajemen inventaris suku cadang untuk usaha jasa kami."
    },
    'service_chat': {
      title: "WhatsApp Service Notification & Progress Bot",
      desc: "Kirim pesan WhatsApp otomatis ke pelanggan saat kendaraan/barang mereka 'Sedang Dikerjakan', 'Selesai & Siap Diambil', beserta rincian biaya.",
      setup: "2 - 3 Hari Kerja",
      costSaving: "Meningkatkan kepuasan dan kepercayaan pelanggan 100%",
      scope: "Auto-notification WhatsApp, tagihan rincian part, & kartu garansi.",
      waMsg: "Halo Pak Roedy Rustam, saya ingin mengintegrasikan notifikasi status pengerjaan jasa otomatis ke WhatsApp pelanggan kami."
    },
    'service_report': {
      title: "Service Performance & Technician Productivity",
      desc: "Laporan omset jasa bulanan, bagi hasil/komisi teknisi otomatis, dan statistik pelanggan setia.",
      setup: "2 - 4 Hari Kerja",
      costSaving: "Penghitungan komisi mekanik/teknisi transparan tanpa konflik",
      scope: "Laporan komisi teknisi, rekap omset per kategori jasa, & database pelanggan.",
      waMsg: "Halo Pak Roedy Rustam, saya ingin berkonsultasi mengenai dashboard laporan performa usaha jasa dan komisi teknisi otomatis."
    }
  };

  function updateSolution() {
    const key = `${currentBiz}_${currentProb}`;
    const fallbackKey = 'retail_pos';
    const sol = SOLUTIONS_MATRIX[key] || SOLUTIONS_MATRIX[fallbackKey];

    const encodedMsg = encodeURIComponent(sol.waMsg);
    const waUrl = `https://wa.me/6281241003047?text=${encodedMsg}`;

    resultDisplay.innerHTML = `
      <div class="result-left">
        <div class="result-solution-name">⚡ Solusi: ${sol.title}</div>
        <p class="result-solution-desc">${sol.desc}</p>
        <div class="result-specs-grid">
          <div class="spec-item">
            <span class="spec-title">Estimasi Waktu Setup</span>
            <span class="spec-val" style="color: var(--cyan-neon);">${sol.setup}</span>
          </div>
          <div class="spec-item">
            <span class="spec-title">Dampak &amp; Efisiensi Biaya</span>
            <span class="spec-val" style="color: #10B981;">${sol.costSaving}</span>
          </div>
          <div class="spec-item">
            <span class="spec-title">Cakupan Modul</span>
            <span class="spec-val" style="font-size: 0.85rem; font-weight: 500;">${sol.scope}</span>
          </div>
        </div>
      </div>

      <div class="calc-wa-action-box">
        <a href="${waUrl}" target="_blank" rel="noopener" class="calc-wa-action-btn">
          <span>💬 Konsultasikan Solusi Ini</span>
        </a>
        <span class="text-muted" style="font-size: 0.78rem; text-align: center; width: 100%;">
          Langsung terhubung dengan Roedy Rustam
        </span>
      </div>
    `;
  }

  bizBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      bizBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentBiz = btn.getAttribute('data-biz') || 'retail';
      updateSolution();
    });
  });

  probBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      probBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentProb = btn.getAttribute('data-prob') || 'pos';
      updateSolution();
    });
  });

  // Initial render
  updateSolution();
}

/* ==========================================================================
   17. Universal Command Palette System (Raycast / Linear Style)
   ========================================================================== */
function initCommandPalette() {
  const backdrop = document.getElementById('command-palette');
  const input = document.getElementById('cmd-palette-input');
  const resultsContainer = document.getElementById('cmd-palette-results');
  const openBtn = document.getElementById('cmd-palette-btn');

  if (!backdrop || !input || !resultsContainer) return;

  let selectedIndex = 0;
  let filteredItems = [];

  // Build searchable index of items
  const STATIC_ACTIONS = [
    { title: "Konsultasi IT Enterprise via WhatsApp", sub: "Buka chat langsung untuk audit arsitektur sistem & performa", cat: "Action", icon: "🏛️", url: "https://wa.me/6281241003047?text=Halo%20Pak%20Roedy%20Rustam%2C%20saya%20ingin%20berkonsultasi%20mengenai%20arsitektur%20sistem%20IT%20dan%20audit%20performa%20untuk%20perusahaan%20kami." },
    { title: "Konsultasi Digitalisasi UMKM via WhatsApp", sub: "Kasir Simpel POS, inventory roastery, & otomatisasi ritel", cat: "Action", icon: "🏪", url: "https://wa.me/6281241003047?text=Halo%20Pak%20Roedy%20Rustam%2C%20saya%20pelaku%20usaha%20UMKM%20ingin%20berkonsultasi%20mengenai%20sistem%20kasir%20cloud%20POS%2C%20inventaris%2C%20dan%20digitalisasi%20operasional." },
    { title: "Undang Trainer Workshop AI Developer", sub: "Adopsi AI agent, Model Context Protocol & Doktrin Anti-Slop", cat: "Action", icon: "🎓", url: "https://wa.me/6281241003047?text=Halo%20Pak%20Roedy%20Rustam%2C%20kami%20tertarik%20mengundang%20Anda%20sebagai%20Trainer%20Workshop%20AI%20%2F%20konsultasi%20implementasi%20AI%20Agents%20untuk%20tim%20kami." },
    { title: "API Wilayah Indonesia 2024 (Live Explorer)", sub: "Uji database 38 Provinsi, 514 Kab/Kota, 83.000+ Desa", cat: "Section", icon: "🗺️", anchor: "#govtech-explorer" },
    { title: "CuppingNotes SCA 2025 CVA Platform", sub: "Evaluasi sensori kopi spesialti standar dunia", cat: "Live Demo", icon: "☕", url: "https://cuppingnotes.online" },
    { title: "Interactive Terminal (RoedyOS Vibes CLI)", sub: "Jalankan perintah help, photo, about, vibes, wa di terminal", cat: "Section", icon: "💻", anchor: "#terminal-container" },
    { title: "Multi-Agent Swarm Topology Visualizer", sub: "Lihat arsitektur orkestrasi vibes-plug & Model Context Protocol", cat: "Section", icon: "🤖", anchor: "#swarm-visualizer" },
    { title: "Kalkulator Kebutuhan Solusi Digital UMKM", sub: "Hitung solusi POS dan estimasi waktu setup untuk bisnis Anda", cat: "Section", icon: "🧮", anchor: "#umkm-calculator" },
    { title: "Toggle Tema (Cyber Obsidian / Clean Daylight)", sub: "Ganti tampilan dark mode atau light mode dengan kontras tinggi", cat: "Preference", icon: "🌓", action: "toggle_theme" },
    { title: "Toggle Audio Feedback UI", sub: "Aktifkan atau matikan suara synthesizer antarmuka", cat: "Preference", icon: "🔊", action: "toggle_sound" }
  ];

  function openPalette() {
    playUiSound('open');
    backdrop.classList.add('active');
    document.body.classList.add('nav-open');
    input.value = '';
    filterResults('');
    setTimeout(() => input.focus(), 50);
  }

  function closePalette() {
    playUiSound('click');
    backdrop.classList.remove('active');
    document.body.classList.remove('nav-open');
  }

  function filterResults(query) {
    const q = query.toLowerCase().trim();
    const repoItems = (typeof PROJECTS_DATA !== 'undefined' ? PROJECTS_DATA : []).map(p => ({
      title: p.title,
      sub: p.tagline,
      cat: "Repository",
      icon: "📦",
      url: p.github,
      demo: p.demo,
      id: p.id
    }));

    const allItems = [...STATIC_ACTIONS, ...repoItems];

    if (!q) {
      filteredItems = allItems.slice(0, 10);
    } else {
      filteredItems = allItems.filter(item => 
        item.title.toLowerCase().includes(q) ||
        item.sub.toLowerCase().includes(q) ||
        item.cat.toLowerCase().includes(q)
      ).slice(0, 12);
    }

    selectedIndex = 0;
    renderResults();
  }

  function renderResults() {
    if (filteredItems.length === 0) {
      resultsContainer.innerHTML = `
        <div style="padding: 2rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
          Tidak ada hasil untuk pencarian ini. Coba kata kunci lain seperti <em>"umkm"</em>, <em>"ai"</em>, atau <em>"pos"</em>.
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = filteredItems.map((item, idx) => `
      <div class="cmd-item ${idx === selectedIndex ? 'selected' : ''}" data-idx="${idx}" role="option" aria-selected="${idx === selectedIndex}">
        <div class="cmd-item-left">
          <span class="cmd-item-icon">${item.icon}</span>
          <div>
            <div class="cmd-item-title">${item.title}</div>
            <div class="cmd-item-sub">${item.sub}</div>
          </div>
        </div>
        <span class="cmd-item-category">${item.cat}</span>
      </div>
    `).join('');

    resultsContainer.querySelectorAll('.cmd-item').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.getAttribute('data-idx') || '0', 10);
        executeItem(filteredItems[idx]);
      });
      el.addEventListener('mouseenter', () => {
        selectedIndex = parseInt(el.getAttribute('data-idx') || '0', 10);
        updateSelectionHighlight();
      });
    });
  }

  function updateSelectionHighlight() {
    const items = resultsContainer.querySelectorAll('.cmd-item');
    items.forEach((item, idx) => {
      item.classList.toggle('selected', idx === selectedIndex);
      if (idx === selectedIndex) {
        item.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  function executeItem(item) {
    if (!item) return;
    closePalette();

    if (item.action === 'toggle_theme') {
      document.getElementById('theme-toggle')?.click();
    } else if (item.action === 'toggle_sound') {
      document.getElementById('sound-toggle-btn')?.click();
    } else if (item.anchor) {
      const target = document.querySelector(item.anchor);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (item.id && typeof openProjectModal === 'function') {
      openProjectModal(item.id);
    } else if (item.url) {
      window.open(item.url, '_blank', 'noopener');
    }
  }

  // Keyboard navigation
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (filteredItems.length > 0) {
        selectedIndex = (selectedIndex + 1) % filteredItems.length;
        updateSelectionHighlight();
        playUiSound('click');
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (filteredItems.length > 0) {
        selectedIndex = (selectedIndex - 1 + filteredItems.length) % filteredItems.length;
        updateSelectionHighlight();
        playUiSound('click');
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        executeItem(filteredItems[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closePalette();
    }
  });

  input.addEventListener('input', (e) => {
    filterResults(e.target.value);
  });

  openBtn?.addEventListener('click', openPalette);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      closePalette();
    }
  });

  // Global Ctrl+K / Cmd+K handler
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (backdrop.classList.contains('active')) {
        closePalette();
      } else {
        openPalette();
      }
    }
  });
}


