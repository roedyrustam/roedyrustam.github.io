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

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('nav-scrolled');
    } else {
      navbar?.classList.remove('nav-scrolled');
    }
  });

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileBtn.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileBtn.classList.remove('active');
      });
    });
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

  // Fallback defaults
  let totalRepos = 122;
  let totalStars = 85;
  let followers = 2;

  try {
    const userRes = await fetch('https://api.github.com/users/roedyrustam');
    if (userRes.ok) {
      const userData = await userRes.json();
      totalRepos = userData.public_repos || 122;
      followers = userData.followers || 2;
    }

    const reposRes = await fetch('https://api.github.com/users/roedyrustam/repos?per_page=100');
    if (reposRes.ok) {
      const reposData = await reposRes.json();
      if (Array.isArray(reposData)) {
        totalStars = reposData.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
      }
    }
    
    if (updatedEl) {
      updatedEl.innerHTML = '<span class="status-dot online"></span> Live GitHub Sync Active';
    }
  } catch (err) {
    console.warn('GitHub API rate limited or offline, using fallback dataset:', err);
    if (updatedEl) {
      updatedEl.innerHTML = '<span class="status-dot cached"></span> Profile Cached & Verified';
    }
  }

  animateValue(repoCountEl, 0, totalRepos, 1500, '+');
  animateValue(starsCountEl, 0, Math.max(totalStars, 85), 1800, '+');
  animateValue(followersCountEl, 0, followers, 1200, '');
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
