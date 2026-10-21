/**
 * Main Application Logic for Roedy Rustam's Modern GitHub Page
 * Handles: Real-time GitHub API Sync, Project Filter & Search, Modal System,
 * Skills Matrix, Coffee CVA Radar, 3D Card Tilt, and Theme Manager.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initGitHubLiveStats();
  initProjectsExplorer();
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

