/**
 * Subodh Uttam Muneshwar - Portfolio Interactivity & Render Engine
 * Playful Geometric UI Interaction logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initPageIntroAnimation();
  initHeroStats();
  renderSkills();
  renderExperience();
  renderProjects('all');
  renderAchievements();
  renderEducation();
  renderCertifications();
  initProjectFilters();
  initContactInteractions();
  initConfettiTriggers();
  initMobileMenu();
  initScrollSpy();
  initLucideIcons();
  initKeyboardShortcuts();
  initSaiyanMode();
  initDragonBallsCollector();
  initNimbusClick();
  initGlobalClickAnimation();
  initScrollReveal();
  initDbzJokePlaceholders();
  initHeroRotatingWord();
  initPhotoRevealLens();
});

function playWebAudioTone(freq=440, type='sine', duration=0.15, vol=0.15) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration);
  } catch(e) {}
}

/* --- 1-Click Copy Contact Info --- */
window.copyContactEmail = function() {
  const email = 'muneshwarsubodh1@gmail.com';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).then(() => {
      showToast('📋 Copied email (muneshwarsubodh1@gmail.com) to clipboard!');
      playWebAudioTone(587, 'triangle', 0.12, 0.1);
    }).catch(() => {
      prompt('Copy Subodh\'s email:', email);
    });
  } else {
    prompt('Copy Subodh\'s email:', email);
  }
};

// Escape key to close modal
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeShenronModal();
      closeDragonRadarModal();
      closeKidGokuPrankModal();
    }
  });
}

// Re-initialize Lucide icons whenever content changes
function initLucideIcons() {
  if (window.lucide) {
    try {
      window.lucide.createIcons();
    } catch (err) {
      console.warn('Lucide icon init note:', err);
    }
  }
}

/* --- Hero Stats Initialization --- */
function initHeroStats() {
  const statsContainer = document.getElementById('statsGrid');
  if (!statsContainer || !portfolioData.personal.stats) return;

  statsContainer.innerHTML = portfolioData.personal.stats.map(stat => `
    <div class="stat-card">
      <div class="stat-icon-wrapper" style="background-color: var(--${stat.color});">
        <i data-lucide="${stat.icon}" style="width: 22px; height: 22px; stroke-width: 2.5;"></i>
      </div>
      <div class="stat-value">${stat.value}</div>
      <div class="stat-label">${stat.label}</div>
    </div>
  `).join('');
}

/* --- Render Skills Matrix — with Scouter Power Levels (Claude PowerBar-inspired) --- */
function renderSkills() {
  const container = document.getElementById('skillsGrid');
  if (!container || !portfolioData.skills) return;

  container.innerHTML = portfolioData.skills.map(cat => `
    <div class="skill-category-card">
      <div class="skill-card-header">
        <div class="skill-icon-box" style="background-color: var(--${cat.color});">
          <i data-lucide="${cat.icon}" style="width: 22px; height: 22px; stroke-width: 2.5;"></i>
        </div>
        <h3 class="skill-card-title">${cat.category}</h3>
      </div>
      ${cat.power ? `
      <div class="skill-power-row" aria-label="${cat.category} power ${cat.power}">
        <div class="skill-power-track" role="progressbar" aria-valuenow="${cat.level}" aria-valuemin="0" aria-valuemax="100">
          <div class="skill-power-fill" data-level="${cat.level}" style="background:var(--${cat.color});width:0%"></div>
        </div>
        <span class="skill-power-label" style="color:var(--${cat.color})"><span class="skill-power-dot" style="background:var(--${cat.color})"></span>PWR <strong>${cat.power.toLocaleString()}</strong> · ${cat.level}%</span>
      </div>` : ''}
      <div class="skill-items-wrap">
        ${cat.items.map(skill => `
          <div class="skill-chip">
            <span>${skill.name}</span>
            <span class="skill-chip-tag">${skill.tag}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
  const fills=container.querySelectorAll('.skill-power-fill[data-level]');
  if(!fills.length) return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){ fills.forEach(f=>f.style.width=f.dataset.level+'%'); return; }
  const io=new IntersectionObserver((entries,obs)=>{entries.forEach(e=>{if(e.isIntersecting){const f=e.target; requestAnimationFrame(()=>{f.style.width=f.dataset.level+'%'; f.classList.add('is-animated');}); obs.unobserve(f);}});},{threshold:.35});
  fills.forEach(f=>io.observe(f));
}

/* --- Render Experience --- */
function renderExperience() {
  const container = document.getElementById('experienceTimeline');
  if (!container || !portfolioData.experience) return;

  container.innerHTML = portfolioData.experience.map(exp => `
    <div class="experience-card">
      <div class="card-floating-badge" style="background-color: var(--${exp.badgeColor}); color: #FFFFFF;">
        <i data-lucide="briefcase" style="width: 14px; height: 14px;"></i>
        ${exp.type}
      </div>
      <div class="exp-header">
        <div>
          <h3 class="exp-role">${exp.role}</h3>
          <div class="exp-company">
            <i data-lucide="building-2" style="width: 18px; height: 18px;"></i>
            ${exp.company} • ${exp.location}
          </div>
        </div>
        <div class="exp-period-badge">
          <i data-lucide="calendar" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle; margin-right: 4px;"></i>
          ${exp.period}
        </div>
      </div>
      <p class="exp-description">${exp.description}</p>
      <ul class="exp-bullet-list">
        ${exp.highlights.map(hl => `
          <li class="exp-bullet-item">
            <span class="exp-bullet-icon">✓</span>
            <span>${hl}</span>
          </li>
        `).join('')}
      </ul>
      <div class="exp-tech-tags">
        ${exp.techStack.map(tech => `<span class="exp-tag">#${tech}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

/* --- Render Projects --- */
function renderProjects(filterCategory = 'all') {
  const container = document.getElementById('projectsGrid');
  if (!container || !portfolioData.projects) return;

  const filtered = filterCategory === 'all'
    ? portfolioData.projects
    : portfolioData.projects.filter(p => p.category === filterCategory);

  container.innerHTML = filtered.map(proj => `
    <div class="project-card project-card-enter">
      <div class="project-card-image-wrap">
        <img src="${proj.image}" alt="${proj.title}" class="project-card-image" loading="lazy" />
      </div>
      <div class="project-card-body">
        <div class="project-meta-row">
          <span class="project-badge" style="background-color: var(--${proj.badgeColor}); color: ${proj.badgeColor === 'accent' || proj.badgeColor === 'secondary' ? '#FFFFFF' : '#1E293B'};">
            ${proj.badge}
          </span>
          <span class="project-period">${proj.period}</span>
        </div>
        <h3 class="project-title">${proj.title}</h3>
        <p class="project-tagline">${proj.tagline}</p>
        <div class="project-tech-chips">
          ${proj.techStack.slice(0, 4).map(t => `<span class="project-chip">${t}</span>`).join('')}
          ${proj.techStack.length > 4 ? `<span class="project-chip">+${proj.techStack.length - 4}</span>` : ''}
        </div>
        <div class="project-actions">
          <button type="button" class="btn btn-outline btn-sm" onclick="openProjectModal('${proj.id}')">
            <span>Explore Details</span>
            <div class="btn-icon-circle"><i data-lucide="arrow-right" style="width: 14px; height: 14px;"></i></div>
          </button>
          <a href="${proj.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" title="View Source Code on GitHub">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>
  `).join('');

  initLucideIcons();
  if (window.refreshScrollReveal) window.refreshScrollReveal();
}

/* --- Project Filter Handlers --- */
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-filter');
      renderProjects(category);
    });
  });
}

/* --- Project Modal Deep Dive --- */
window.openProjectModal = function(projectId) {
  const proj = portfolioData.projects.find(p => p.id === projectId);
  if (!proj) return;

  const modalBackdrop = document.getElementById('projectModal');
  const modalContent = document.getElementById('modalContent');
  if (!modalBackdrop || !modalContent) return;

  modalContent.innerHTML = `
    <div style="margin-bottom: 1.5rem;">
      <span class="project-badge" style="background-color: var(--${proj.badgeColor}); color: ${proj.badgeColor === 'accent' || proj.badgeColor === 'secondary' ? '#FFFFFF' : '#1E293B'}; margin-bottom: 0.75rem; display: inline-block;">
        ${proj.badge}
      </span>
      <h2 style="font-size: 1.75rem; font-weight: 900; margin-bottom: 0.5rem;">${proj.title}</h2>
      <p style="color: var(--muted-fg); font-weight: 600;">${proj.tagline}</p>
    </div>

    <div style="border-radius: var(--radius-lg); overflow: hidden; border: 2px solid var(--border); margin-bottom: 1.5rem; background: var(--muted);">
      <img src="${proj.image}" alt="${proj.title}" style="width: 100%; height: auto; display: block;" />
    </div>

    <h4 style="font-size: 1.1rem; margin-bottom: 0.75rem;">Key Architecture & Deliverables:</h4>
    <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
      ${proj.bullets.map(b => `
        <li style="display: flex; gap: 0.65rem; font-size: 0.95rem; line-height: 1.5;">
          <span style="color: var(--accent); font-weight: 900;">➔</span>
          <span>${b}</span>
        </li>
      `).join('')}
    </ul>

    <h4 style="font-size: 1.1rem; margin-bottom: 0.75rem;">Technologies Used:</h4>
    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
      ${proj.techStack.map(t => `<span class="tech-pill">${t}</span>`).join('')}
    </div>

    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <a href="${proj.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
        <span>Explore GitHub Repository</span>
      </a>
      <button type="button" class="btn btn-outline" onclick="closeProjectModal()">
        <span>Close Window</span>
      </button>
    </div>
  `;

  modalBackdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
  initLucideIcons();
};

window.closeProjectModal = function() {
  const modalBackdrop = document.getElementById('projectModal');
  if (modalBackdrop) {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
};

/* --- Render Achievements --- */
function renderAchievements() {
  const container = document.getElementById('achievementsGrid');
  if (!container || !portfolioData.achievements) return;

  container.innerHTML = portfolioData.achievements.map(ach => `
    <div class="achievement-card">
      <div class="ach-icon-circle" style="background-color: var(--${ach.color});">
        <i data-lucide="${ach.icon}" style="width: 24px; height: 24px; stroke-width: 2.5;"></i>
      </div>
      <div class="card-floating-badge" style="background-color: var(--${ach.color}); color: ${ach.color === 'accent' || ach.color === 'secondary' ? '#FFFFFF' : '#1E293B'};">
        ${ach.badge}
      </div>
      <h3 class="ach-title">${ach.title}</h3>
      <div class="ach-org">${ach.organization} • ${ach.period}</div>
      <p class="ach-desc">${ach.description}</p>
    </div>
  `).join('');
}

/* --- Render Education --- */
function renderEducation() {
  const container = document.getElementById('educationColumn');
  if (!container || !portfolioData.education) return;

  container.innerHTML = portfolioData.education.map(edu => `
    <div class="edu-card">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem; gap: 1rem; flex-wrap: wrap;">
        <div>
          <h4 style="font-size: 1.15rem; font-weight: 800;">${edu.degree}</h4>
          <p style="font-weight: 700; color: var(--muted-fg); font-size: 0.9rem;">${edu.institution}</p>
        </div>
        <span class="edu-score-pill">${edu.score}</span>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--fg); font-weight: 600;">
        <span>${edu.highlight}</span>
        <span style="font-family: var(--font-mono); color: var(--muted-fg);">${edu.period}</span>
      </div>
    </div>
  `).join('');
}

/* --- Render Certifications --- */
function renderCertifications() {
  const container = document.getElementById('certificationsColumn');
  if (!container || !portfolioData.certifications) return;

  container.innerHTML = portfolioData.certifications.map(cert => `
    <div class="cert-card">
      <div class="cert-icon-box" style="background-color: var(--${cert.color});">
        <i data-lucide="${cert.icon}" style="width: 22px; height: 22px; stroke-width: 2.5;"></i>
      </div>
      <div>
        <h4 style="font-size: 1rem; font-weight: 800; margin-bottom: 0.25rem;">${cert.title}</h4>
        <p style="font-size: 0.85rem; color: var(--muted-fg); font-weight: 600;">${cert.issuer} • ${cert.date}</p>
      </div>
    </div>
  `).join('');

  if (window.refreshScrollReveal) window.refreshScrollReveal();
}

/* --- Toast Helper (Accessible Live Region) --- */
function showToast(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    toast.setAttribute('aria-live', 'polite');
    toast.setAttribute('role', 'status');
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/* --- Confetti Micro-Explosion --- */
function triggerConfetti() {
  if (window.confetti) {
    window.confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#8B5CF6', '#F472B6', '#FBBF24', '#34D399']
    });
  }
}

function initConfettiTriggers() {
  const confettiBtns = document.querySelectorAll('.trigger-confetti');
  confettiBtns.forEach(btn => {
    btn.addEventListener('click', triggerConfetti);
  });
}

/* --- Contact Form & Gmail Delivery Engine --- */
function initContactInteractions() {
  const contactForm = document.getElementById('contactForm');
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyPhoneBtn = document.getElementById('copyPhoneBtn');

  // 1. Copy Email to Clipboard
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('subodhum1603@gmail.com').then(() => {
        showToast('📋 Copied email: subodhum1603@gmail.com');
      }).catch(() => {
        showToast('📧 subodhum1603@gmail.com');
      });
    });
  }

  // 2. Copy Phone to Clipboard
  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('+91 9029920228').then(() => {
        showToast('📋 Copied phone: +91 9029920228');
      }).catch(() => {
        showToast('📱 +91 9029920228');
      });
    });
  }

  // 3. Live Form Submission directly to subodhum1603@gmail.com
  // Strategy: Try AJAX first for smooth UX. On failure, fall back to native form POST.
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      const nameInput = document.getElementById('senderName');
      const emailInput = document.getElementById('senderEmail');
      const messageInput = document.getElementById('senderMessage');
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      if (!nameInput || !emailInput || !messageInput || !submitBtn) return;

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();

      if (!name || !email || !message) {
        e.preventDefault();
        showToast('⚠️ Please fill in all fields before sending.');
        return;
      }

      // Try AJAX submission first for a smoother experience
      e.preventDefault();

      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending Message... ⏳</span>';

      try {
        const response = await fetch('https://formsubmit.co/ajax/subodhum1603@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            message: message,
            _subject: `⚡ New Portfolio Inquiry from ${name}`,
            _template: 'table',
            _captcha: 'false'
          })
        });

        const data = await response.json();

        if (data.success === 'true' || data.success === true) {
          contactForm.reset();
          submitBtn.innerHTML = '<span>Message Sent Successfully! ✅</span>';
          submitBtn.style.backgroundColor = '#10B981';
          submitBtn.style.color = '#FFFFFF';
          showToast('🚀 Message sent directly to Subodh at subodhum1603@gmail.com!');

          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHtml;
            submitBtn.style.backgroundColor = '';
            submitBtn.style.color = '';
          }, 3500);
        } else {
          // AJAX returned but FormSubmit says not activated yet — fall through to native POST
          throw new Error('FormSubmit endpoint not yet activated');
        }
      } catch (err) {
        console.warn('AJAX submission failed, falling back to native form POST:', err.message);
        // Re-enable button and submit the form natively (standard POST to FormSubmit)
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
        showToast('📨 Redirecting to send your message...');
        contactForm.submit(); // Native HTML form POST — triggers FormSubmit activation email
      }
    });
  }
}

/* --- Mobile Menu Toggle & Auto-Close Engine --- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (toggleBtn && navMenu) {
    function setDrawerState(isOpen) {
      if (isOpen) {
        navMenu.classList.add('open');
        document.body.classList.add('mobile-drawer-open');
        toggleBtn.setAttribute('aria-expanded', 'true');
        toggleBtn.innerHTML = '<i data-lucide="x" style="width: 22px; height: 22px;"></i>';
      } else {
        navMenu.classList.remove('open');
        document.body.classList.remove('mobile-drawer-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.innerHTML = '<i data-lucide="menu" style="width: 22px; height: 22px;"></i>';
      }
      initLucideIcons();
    }

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.contains('open');
      setDrawerState(!isOpen);
    });

    // Auto-close menu when any nav link is clicked
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        setDrawerState(false);
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
        setDrawerState(false);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        setDrawerState(false);
      }
    });
  }
}

/* --- ScrollSpy Navigation Active Highlight --- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar .nav-link[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  function updateActiveLink() {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  // Clicking brand logo or back-to-top scrolls completely to absolute top (0, 0)
  const topScrollLinks = document.querySelectorAll('.brand-logo, a[href="#hero"], .site-footer a[href="#hero"]');
  topScrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      if (history.pushState) {
        history.pushState(null, null, window.location.pathname);
      }
    });
  });
}

/* ==========================================================================
   Dragon Ball & Super Saiyan Interactive Engine - Planet Namek Saga
   Staggered element transformation, lightning storm, and earthquake rumble
   ========================================================================== */

/* --- Super Saiyan Theme Toggle — persistent + system-aware (Claude-inspired) --- */
function initSaiyanMode() {
  const saiyanBtn = document.getElementById('saiyanModeBtn');
  const saiyanBtnText = document.getElementById('saiyanBtnText');
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (!saiyanBtn) return;

  function syncMeta(isSaiyan){ if(themeMeta) themeMeta.setAttribute('content', isSaiyan?'#060E0A':'#FF2E97'); }

  function playSaiyanTransformationCutscene(onTransition) {
    const overlay = document.getElementById('saiyanVideoOverlay');
    const video = document.getElementById('saiyanCutsceneVideo');
    const flash = document.getElementById('saiyanCutsceneFlash');
    const skipBtn = document.getElementById('saiyanCutsceneSkip');

    if (!overlay || !video) {
      if (typeof onTransition === 'function') onTransition();
      return;
    }

    let isCutsceneEnding = false;
    let cutsceneRafId = null;
    let fallbackTimer = null;

    function finishCutscene() {
      if (isCutsceneEnding) return;
      isCutsceneEnding = true;

      if (cutsceneRafId) {
        cancelAnimationFrame(cutsceneRafId);
        cutsceneRafId = null;
      }
      if (fallbackTimer) {
        clearTimeout(fallbackTimer);
        fallbackTimer = null;
      }

      // 1. Redirect to Home Page (Hero section at top) immediately under the transition
      try {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        if (window.location.hash) {
          history.replaceState(null, null, window.location.pathname + window.location.search);
        }
      } catch(e) {}

      // 2. Transition DOM to Super Saiyan dark mode immediately
      try {
        if (typeof onTransition === 'function') onTransition();
      } catch(e) {
        console.error('Saiyan transition error:', e);
      }

      // 3. Trigger visual golden Ki energy flash
      if (flash) flash.classList.add('flashing');
      try { drawLightningStrike(); } catch(e) {}

      // 4. Add smooth reveal shockwave to hero section on the home page
      try {
        const hero = document.querySelector('.hero-section');
        if (hero) {
          hero.classList.remove('saiyan-reveal-shockwave');
          void hero.offsetWidth;
          hero.classList.add('saiyan-reveal-shockwave');
        }
      } catch(e) {}

      // 5. Cross-fade out the cutscene overlay smoothly over 550ms
      overlay.classList.remove('active');
      document.body.style.overflow = '';

      setTimeout(() => {
        if (flash) flash.classList.remove('flashing');
        try { video.pause(); } catch(e) {}
      }, 550);
    }

    // Prepare overlay, lock scroll, and start playback
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    video.currentTime = 0;
    video.muted = true;

    // Track playback progress frame-by-frame to transition smoothly at the video climax/end
    function monitorCutscene() {
      if (isCutsceneEnding) return;

      if (video.duration && video.duration > 0) {
        // Transition 0.15s before video hard-ends to ensure zero freeze/lag
        if (video.currentTime >= video.duration - 0.18) {
          finishCutscene();
          return;
        }
      }

      cutsceneRafId = requestAnimationFrame(monitorCutscene);
    }

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        cutsceneRafId = requestAnimationFrame(monitorCutscene);
      }).catch(() => {
        // If autoplay fails, fallback gracefully
        finishCutscene();
      });
    }

    video.onended = finishCutscene;
    video.onerror = finishCutscene;

    // Attach skip listeners with 350ms buffer so initial button click doesn't trigger skip
    setTimeout(() => {
      if (isCutsceneEnding) return;

      overlay.onclick = (e) => {
        e.stopPropagation();
        finishCutscene();
      };

      if (skipBtn) {
        skipBtn.onclick = (e) => {
          e.stopPropagation();
          finishCutscene();
        };
      }

      const onKeyDown = (e) => {
        if (overlay.classList.contains('active')) {
          document.removeEventListener('keydown', onKeyDown);
          finishCutscene();
        }
      };
      document.addEventListener('keydown', onKeyDown);
    }, 350);

    // Watchdog fallback (15s max)
    fallbackTimer = setTimeout(finishCutscene, 15000);
  }

  function setSaiyanState(enableSaiyan, opts={}) {
    const silent=!!opts.silent, noPersist=!!opts.noPersist;
    const iconSpan = saiyanBtn.querySelector('.saiyan-btn-icon');
    
    if (enableSaiyan) {
      const applySaiyan = () => {
        document.body.classList.add('saiyan-mode');
        document.documentElement.classList.add('saiyan-mode');
        saiyanBtn.setAttribute('aria-pressed', 'true');
        if (iconSpan) iconSpan.textContent = '✨';
        if (saiyanBtnText) saiyanBtnText.textContent = 'Base';
        saiyanBtn.title = 'Switch to Light (Base) Mode';
        syncMeta(true);
        if(!noPersist) try{localStorage.setItem('portfolio-theme','saiyan');}catch(e){}
        if(!silent){ showToast('⚡ Super Saiyan Mode ON'); runPlanetNamekTransformation(); }
      };

      if (!silent) {
        playSaiyanTransformationCutscene(applySaiyan);
      } else {
        applySaiyan();
      }
    } else {
      document.body.classList.remove('saiyan-mode');
      document.documentElement.classList.remove('saiyan-mode');
      saiyanBtn.setAttribute('aria-pressed', 'false');
      if (iconSpan) iconSpan.textContent = '⚡';
      if (saiyanBtnText) saiyanBtnText.textContent = 'Saiyan';
      saiyanBtn.title = 'Toggle Super Saiyan (Dark) Mode';
      syncMeta(false);
      if(!noPersist) try{localStorage.setItem('portfolio-theme','light');}catch(e){}
      if(!silent) showToast('✨ Base Mode ON');
    }
  }

  // Sync body with html anti-FOUC state without re-triggering animation — light is default
  if(document.documentElement.classList.contains('saiyan-mode')){
    document.body.classList.add('saiyan-mode');
    setSaiyanState(true,{silent:true,noPersist:true});
  } else {
    // Ensure light mode is fully applied on first visit (no stored preference → light)
    document.documentElement.classList.remove('saiyan-mode');
    document.body.classList.remove('saiyan-mode');
    syncMeta(false);
  }

  saiyanBtn.addEventListener('click', () => {
    const isCurrentlySaiyan = document.body.classList.contains('saiyan-mode');
    setSaiyanState(!isCurrentlySaiyan);
  });
  window.setSaiyanState=setSaiyanState;
}

/* --- Planet Namek Destruction / Staggered Transformation Engine --- */
function runPlanetNamekTransformation() {
  // 1. Immediately apply the dark Planet Namek destruction sky & body theme
  document.body.classList.add('saiyan-mode');
  document.documentElement.classList.add('saiyan-mode');
  
  // 2. Trigger Planet Namek earthquake ground rumble
  document.body.classList.add('namek-earthquake');
  setTimeout(() => {
    document.body.classList.remove('namek-earthquake');
  }, 2400);

  // 3. Trigger Electric Cyan & Golden Lightning Storm across screen
  triggerLightningStorm(12);

  // 4. Sequential list of elements to power up one at a time
  const elementsToTransform = [
    document.querySelector('.hero-photo-frame'),
    document.querySelector('.hero-title'),
    document.querySelector('#statsGrid'),
    document.querySelector('#about .sticker-card'),
    document.querySelector('#skillsGrid'),
    document.querySelector('#experienceTimeline'),
    document.querySelector('#projectsGrid'),
    document.querySelector('#achievementsGrid'),
    document.querySelector('.edu-cert-grid'),
    document.querySelector('.contact-wrapper')
  ].filter(el => el !== null);

  // 5. Staggered power-up: each element surges with Ki aura and sparks in sequence
  elementsToTransform.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('saiyan-charging');
      
      // Spawn Ki electrical sparks around this element's bounding box
      const rect = el.getBoundingClientRect();
      const sparkX = rect.left + rect.width / 2;
      const sparkY = rect.top + window.scrollY + rect.height / 2;
      createKiSparks(sparkX, sparkY);

      // Trigger micro lightning flash around the mid-point of transformation
      if (index === 0 || index === 4 || index === 7) {
        drawLightningStrike();
      }

      setTimeout(() => {
        el.classList.remove('saiyan-charging');
      }, 700);
    }, index * 180); // Staggered by 180ms per element
  });
}

/* --- Canvas Realistic Super Saiyan Lightning Storm --- */
let lightningAnimId = null;

function triggerLightningStorm(strikeCount = 10) {
  const canvas = document.getElementById('lightningOverlay');
  if (!canvas) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.classList.add('active');

  const ctx = canvas.getContext('2d');
  let strikesRemaining = strikeCount;

  function flashLoop() {
    if (strikesRemaining <= 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.classList.remove('active');
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw 1-2 jagged lightning bolts
    const boltCount = Math.random() > 0.5 ? 2 : 1;
    for (let b = 0; b < boltCount; b++) {
      drawSingleBolt(ctx, canvas.width, canvas.height);
    }

    strikesRemaining--;
    const nextInterval = 80 + Math.random() * 120;
    setTimeout(flashLoop, nextInterval);
  }

  flashLoop();
}

function drawLightningStrike() {
  const canvas = document.getElementById('lightningOverlay');
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.classList.add('active');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSingleBolt(ctx, canvas.width, canvas.height);
  setTimeout(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.classList.remove('active');
  }, 120);
}

function drawSingleBolt(ctx, w, h) {
  let startX = Math.random() * w;
  let startY = 0;
  let endX = startX + (Math.random() * 200 - 100);
  let endY = h * (0.6 + Math.random() * 0.4);

  const colors = ['#FBBF24', '#38BDF8', '#FFFFFF', '#06B6D4'];
  const boltColor = colors[Math.floor(Math.random() * colors.length)];

  ctx.beginPath();
  ctx.moveTo(startX, startY);

  let currentX = startX;
  let currentY = startY;
  const segments = 16;

  for (let i = 0; i < segments; i++) {
    const nextY = currentY + (endY - startY) / segments;
    const nextX = currentX + (Math.random() * 60 - 30);
    ctx.lineTo(nextX, nextY);
    currentX = nextX;
    currentY = nextY;
  }

  ctx.strokeStyle = boltColor;
  ctx.lineWidth = 3 + Math.random() * 2;
  ctx.shadowColor = boltColor;
  ctx.shadowBlur = 20;
  ctx.stroke();

  // Draw bright inner core
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#FFFFFF';
  ctx.stroke();
}

/* --- 7 Dragon Balls Collector & Realistic Dragon Radar Engine --- */
const collectedBalls = new Set();

const dragonBallLocations = [
  { num: 1, name: "1-Star Dragon Ball", sector: "Skills Matrix", hint: "Hidden in Skills Category", x: 30, y: 35, selector: "#skills" },
  { num: 2, name: "2-Star Dragon Ball", sector: "Experience Timeline", hint: "Guarded in Experience Section", x: 68, y: 28, selector: "#experience" },
  { num: 3, name: "3-Star Dragon Ball", sector: "Projects Grid", hint: "Found in Featured Projects", x: 74, y: 64, selector: "#projects" },
  { num: 4, name: "4-Star Dragon Ball (Goku's Treasure)", sector: "AI/ML Project Header", hint: "Resting near Retinopathy AI", x: 40, y: 72, selector: "#projects" },
  { num: 5, name: "5-Star Dragon Ball", sector: "Achievements Arena", hint: "Discovered in Hackathon Wins", x: 26, y: 64, selector: "#achievements" },
  { num: 6, name: "6-Star Dragon Ball", sector: "Education & Degree", hint: "Located in Academics Section", x: 60, y: 46, selector: "#education" },
  { num: 7, name: "7-Star Dragon Ball", sector: "Contact Radar Base", hint: "Secured near Contact Hub", x: 50, y: 22, selector: "#contact" }
];

/* Web Audio Synthesizers for authentic sound effects */
let audioCtx = null;
function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playRadarPingSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1760, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(2640, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch (e) {}
}

function playDragonBallCollectChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const notes = [587.33, 739.99, 880.00, 1174.66, 1479.98, 1760.00];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
      gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.28, ctx.currentTime + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.45);
    });
  } catch (e) {}
}

function renderDragonBallSVGs() {
  // ── Anime-canonical star layouts (100×100 viewBox) ───────────────────────
  // Verified against Toriyama's manga + Toei anime cel references.
  // Each ball's stars must match the exact screen arrangement.
  const LAYOUTS = {
    // 1-Star: single centered (Bulma's first discovery)
    1: [[50, 50]],
    // 2-Star: horizontal pair (seen in Pilaf arc)
    2: [[35, 50], [65, 50]],
    // 3-Star: upright triangle (turtle hermit)
    3: [[50, 32], [34, 63], [66, 63]],
    // 4-Star: diamond / cross (Gohan's hat jewel — most iconic)
    4: [[50, 27], [27, 50], [73, 50], [50, 73]],
    // 5-Star: quincunx — 4 corners + center
    5: [[50, 50], [33, 33], [67, 33], [33, 67], [67, 67]],
    // 6-Star: two neat columns of three
    6: [[36, 30], [64, 30], [36, 50], [64, 50], [36, 70], [64, 70]],
    // 7-Star: center + hexagon ring (Shenron's final ball)
    7: [[50, 50], [50, 26], [70, 38], [70, 62], [50, 74], [30, 62], [30, 38]],
    // Decoy variants (fake balls — keep for prank system)
    8: [[36, 26], [64, 26], [24, 50], [50, 50], [76, 50], [36, 74], [64, 74], [50, 26]],
    9: [[30, 30], [50, 30], [70, 30], [30, 50], [50, 50], [70, 50], [30, 70], [50, 70], [70, 70]]
  };

  // Perfect anime star: sharp 5-point, inner radius 0.38 — matches Toriyama's
  // hand-drawn proportion exactly (not the bloated 0.40 pinched look).
  function createStarPolygon(cx, cy, r) {
    let pts = [];
    for (let i = 0; i < 10; i++) {
      const radius = i % 2 === 0 ? r : r * 0.38;
      const angle = (Math.PI / 5) * i - Math.PI / 2;
      pts.push(`${(cx + radius * Math.cos(angle)).toFixed(2)},${(cy + radius * Math.sin(angle)).toFixed(2)}`);
    }
    return pts.join(' ');
  }

  // Anime stars are FLAT solid crimson — no multi-layer highlight.
  // A single crisp polygon + one subtle soft shadow is the Toriyama look.
  function buildStars(starCoords, r) {
    return starCoords.map(([sx, sy]) => {
      const pts = createStarPolygon(sx, sy, r);
      // Soft drop shadow (the star is BEHIND the glass)
      const shadow = `<polygon points="${createStarPolygon(sx + 0.7, sy + 0.9, r)}" fill="#4A0A00" opacity="0.55" />`;
      // Solid anime red star — THE canonical #E30613 / #CC0000 family
      const body = `<polygon points="${pts}" fill="#D90000" stroke="#7A0000" stroke-width="0.6" stroke-linejoin="round" stroke-linecap="round" />`;
      return shadow + body;
    }).join('');
  }

  window.getBallSVGString = function(starNum, size = 34) {
    const num = starNum ? starNum.toString() : '4';
    const uid = `db-${num}-${size}-${Math.random().toString(36).slice(2, 7)}`;
    const parsedNum = parseInt(num, 10);
    const hasCanonicalLayout = !isNaN(parsedNum) && LAYOUTS[parsedNum];
    
    // Tuned star radii — anime stars leave breathing room, never kiss the edge.
    // Smaller = more elegant, lets the orange sphere dominate like in the show.
    let starR;
    if (parsedNum === 1) starR = 10.5;
    else if (parsedNum === 2) starR = 9.0;
    else if (parsedNum === 3) starR = 8.6;
    else if (parsedNum === 4) starR = 8.4;
    else if (parsedNum === 5) starR = 7.6;
    else if (parsedNum === 6) starR = 7.2;
    else if (parsedNum === 7) starR = 6.8;
    else starR = 7.5;

    let innerContent = '';

    if (hasCanonicalLayout) {
      innerContent = buildStars(LAYOUTS[parsedNum], starR);
    } else {
      // Prank balls now MIMIC normal balls — random 1-7 so you can't tell by look
      const rnd = 1 + Math.floor(Math.random() * 7);
      let rndR;
      if (rnd === 1) rndR = 10.5;
      else if (rnd === 2) rndR = 9.0;
      else if (rnd === 3) rndR = 8.6;
      else if (rnd === 4) rndR = 8.4;
      else if (rnd === 5) rndR = 7.6;
      else if (rnd === 6) rndR = 7.2;
      else rndR = 6.8;
      innerContent = buildStars(LAYOUTS[rnd], rndR);
    }

    // ── UNIFIED SPHERE SHELL ──────────────────────────────────────────
    // Now identical to the brand header orb (index.html:82) — same 3
    // radial gradients, same gloss ellipse, same rim & stroke.
    // Only the stars (innerContent / LAYOUTS) remain dynamic.
    return `
      <svg viewBox="0 0 100 100" width="${size}" height="${size}" style="display: block; pointer-events: none;" aria-hidden="true">
        <defs>
          <radialGradient id="db-body-${uid}" cx="34%" cy="28%" r="78%">
            <stop offset="0%" stop-color="#FFF3C4" />
            <stop offset="26%" stop-color="#FFD54A" />
            <stop offset="62%" stop-color="#FFA51F" />
            <stop offset="100%" stop-color="#C2610A" />
          </radialGradient>
          <radialGradient id="db-gloss-${uid}" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95" />
            <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0" />
          </radialGradient>
          <radialGradient id="db-rim-${uid}" cx="50%" cy="82%" r="52%">
            <stop offset="0%" stop-color="#FF8A3D" stop-opacity="0.75" />
            <stop offset="100%" stop-color="#FF8A3D" stop-opacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="46" fill="url(#db-body-${uid})" />
        <circle cx="50" cy="50" r="46" fill="url(#db-rim-${uid})" />
        <g opacity="0.98">
          ${innerContent}
        </g>
        <ellipse cx="33" cy="27" rx="16" ry="11" fill="url(#db-gloss-${uid})" transform="rotate(-28 33 27)" />
        <circle cx="50" cy="50" r="46" fill="none" stroke="#7C3A06" stroke-width="1.5" opacity="0.55" />
      </svg>
    `;
  };

  // ── TRUE RANDOM: shuffle which 7 of the 22 slots hold the REAL balls — no fixed pattern ──
  const pool = Array.from(document.querySelectorAll('.dragon-ball[data-ball], .fake-dragon-ball[data-fake-ball]'));
  // Fisher-Yates shuffle pool
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const starPool = [1,2,3,4,5,6,7];
  for (let i = starPool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [starPool[i], starPool[j]] = [starPool[j], starPool[i]];
  }
  pool.forEach((el, idx) => {
    if (idx < 7) {
      // This slot becomes a REAL Dragon Ball (goes to radar)
      el.classList.add('dragon-ball');
      el.classList.remove('fake-dragon-ball');
      el.removeAttribute('data-fake-ball');
      el.setAttribute('data-ball', String(starPool[idx]));
    } else {
      // Remaining slots become PRANK balls — but will LOOK identical to real
      el.classList.add('dragon-ball', 'fake-dragon-ball');
      el.removeAttribute('data-ball');
      el.setAttribute('data-fake-ball', String(1 + Math.floor(Math.random() * 7)));
    }
  });

  // Render SVG inside real section dragon balls (now shuffled)
  document.querySelectorAll('.dragon-ball[data-ball]').forEach(ball => {
    const ballNum = ball.getAttribute('data-ball');
    ball.innerHTML = window.getBallSVGString(ballNum, 34);
    ball.setAttribute('role', 'button');
    ball.setAttribute('tabindex', '0');
    ball.setAttribute('aria-label', `${ballNum}-Star Dragon Ball`);
    ball.title = `Collect the ${ballNum}-Star Dragon Ball!`;
  });

  // Render SVG inside fake decoy dragon balls — now VISUALLY IDENTICAL to real (random 1-7)
  document.querySelectorAll('.fake-dragon-ball[data-fake-ball]').forEach(ball => {
    const rnd = 1 + Math.floor(Math.random() * 7);
    ball.innerHTML = window.getBallSVGString(String(rnd), 34);
    ball.setAttribute('role', 'button');
    ball.setAttribute('tabindex', '0');
    ball.setAttribute('aria-label', `${rnd}-Star Dragon Ball`);
    ball.title = `Collect the ${rnd}-Star Dragon Ball!`;
    ball.dataset.visualStars = String(rnd);
  });

  // Render SVG inside Shenron modal celebration balls
  document.querySelectorAll('.shenron-star-ball[data-shenron-ball]').forEach(ball => {
    const ballNum = ball.getAttribute('data-shenron-ball');
    ball.innerHTML = window.getBallSVGString(ballNum, 34);
  });

  // ── Random scatter: floating decoys jump to new random spots each load ──
  // Mobile-optimized: keep real 7 balls in safe, tappable zone away from header/footer/radar
  const isMobileScatter = window.innerWidth < 768;
  document.querySelectorAll('.floating-decoy-ball').forEach(el => {
    const isReal = el.hasAttribute('data-ball');
    const topMin = isMobileScatter ? (isReal ? 18 : 10) : 4;
    const topRange = isMobileScatter ? (isReal ? 56 : 64) : 72;
    const leftMin = isMobileScatter ? 5 : 3;
    const leftRange = isMobileScatter ? (isReal ? 66 : 74) : 82;
    let top = (topMin + Math.random() * topRange).toFixed(2);
    let left = (leftMin + Math.random() * leftRange).toFixed(2);
    // Nudge real balls away from Dragon Radar corner on mobile (bottom-right)
    if (isMobileScatter && isReal) {
      const t = parseFloat(top), l = parseFloat(left);
      if (t > 74 && l > 66) {
        top = (62 + Math.random() * 6).toFixed(2);
        left = (38 + Math.random() * 20).toFixed(2);
      }
    }
    el.style.top = top + '%';
    el.style.left = left + '%';
    el.style.right = 'auto';
    el.style.bottom = 'auto';
    const rot = (Math.random() * 26 - 13).toFixed(1);
    const sc = isMobileScatter ? (isReal ? (1.04 + Math.random() * 0.08).toFixed(2) : (0.86 + Math.random() * 0.12).toFixed(2)) : (0.90 + Math.random() * 0.22).toFixed(2);
    el.style.transform = `rotate(${rot}deg) scale(${sc})`;
  });
  // Inline balls: subtle random offset so even fixed-in-header balls don't sit identically each reload
  document.querySelectorAll('.dragon-ball:not(.floating-decoy-ball), .fake-dragon-ball:not(.floating-decoy-ball)').forEach(el => {
    if (el.classList.contains('shenron-star-ball')) return;
    const dx = (Math.random() * 12 - 6).toFixed(1);
    const dy = (Math.random() * 8 - 4).toFixed(1);
    el.style.position = 'relative';
    el.style.left = dx + 'px';
    el.style.top = dy + 'px';
  });
}

function updateRadarMiniBlips() {
  const miniContainer = document.getElementById('radarMiniBlips');
  if (!miniContainer) return;

  miniContainer.innerHTML = dragonBallLocations.map(ball => {
    const isCollected = collectedBalls.has(ball.num);
    const color = isCollected ? '#F59E0B' : '#EF4444';
    return `<span style="position: absolute; left: ${ball.x}%; top: ${ball.y}%; width: 4px; height: 4px; border-radius: 50%; background: ${color}; box-shadow: 0 0 4px ${color}; transform: translate(-50%, -50%);"></span>`;
  }).join('');
}

function renderRadarHUD() {
  const blipsLayer = document.getElementById('radarBlipsLayer');
  const signalsList = document.getElementById('radarSignalsList');
  const statusText = document.getElementById('radarStatusText');

  if (statusText) {
    statusText.textContent = collectedBalls.size === 7 ? "ALL 7 SIGNALS LOCKED! SHENRON READY!" : `${collectedBalls.size}/7 SIGNALS ACQUIRED`;
  }

  if (blipsLayer) {
    blipsLayer.innerHTML = dragonBallLocations.map(ball => {
      const isCollected = collectedBalls.has(ball.num);
      return `
        <div class="radar-signal-dot ${isCollected ? 'signal-collected' : 'signal-uncollected'}"
             style="left: ${ball.x}%; top: ${ball.y}%;"
             title="${ball.name} (${isCollected ? 'Collected — click to view' : 'Click to locate exact position!'})"
             onclick="focusDragonBall(${ball.num})">
           ${isCollected ? '' : ball.num}
        </div>
      `;
    }).join('');
  }

  if (signalsList) {
    signalsList.innerHTML = dragonBallLocations.map(ball => {
      const isCollected = collectedBalls.has(ball.num);
      return `
        <div class="radar-signal-card ${isCollected ? 'collected' : ''}" onclick="focusDragonBall(${ball.num})" style="cursor: pointer;" title="${isCollected ? 'Already secured' : 'Click to jump to exact Dragon Ball location'}">
          <div class="radar-signal-card-ball">
            ${window.getBallSVGString(ball.num, 24)}
          </div>
          <div class="radar-signal-card-info">
            <span class="radar-signal-card-name">${ball.num}-Star Ball ${isCollected ? '✅' : '📡'}</span>
            <span class="radar-signal-card-sector">${isCollected ? 'Secured in Radar' : ball.sector}</span>
          </div>
        </div>
      `;
    }).join('');
  }
}

window.focusSector = function(selector) {
  closeDragonRadarModal();
  const target = document.querySelector(selector);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    target.classList.add('saiyan-charging');
    setTimeout(() => target.classList.remove('saiyan-charging'), 1200);
  }
};

window.focusDragonBall = function(num) {
  const isCollected = collectedBalls.has(num);
  closeDragonRadarModal();
  if (isCollected) {
    showToast(`⭐ ${num}-Star Ball already secured! (${collectedBalls.size}/7) — keep hunting the rest!`);
    return;
  }
  // Find the EXACT orb element that currently holds this star (after pool shuffle it could be anywhere on page)
  const ball = document.querySelector(`.dragon-ball[data-ball="${num}"]`);
  if (ball) {
    ball.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    // Highlight after scroll settles so user spots it instantly
    setTimeout(() => {
      ball.classList.add('radar-target-highlight');
      ball.classList.add('saiyan-charging');
      const rect = ball.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      createKiSparks(cx, cy);
      setTimeout(() => createKiSparks(cx, cy), 180);
      ball.style.filter = 'drop-shadow(0 0 18px #FF2E97) drop-shadow(0 0 32px #FF7E00) brightness(1.18)';
      showToast(`📡 Tracking ${num}-Star Ball — look for the pulsing orb!`);
      setTimeout(() => {
        ball.classList.remove('radar-target-highlight');
        ball.classList.remove('saiyan-charging');
        ball.style.filter = '';
      }, 1800);
    }, 520);
  } else {
    // Fallback: go to sector
    const info = dragonBallLocations.find(b => b.num === num);
    if (info) window.focusSector(info.selector);
    else showToast(`📡 Scanning for ${num}-Star Ball...`);
  }
};

window.openDragonRadarModal = function() {
  const modal = document.getElementById('dragonRadarModal');
  if (modal) {
    playRadarPingSound();
    renderRadarHUD();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeDragonRadarModal = function() {
  const modal = document.getElementById('dragonRadarModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.pingRadarScan = function() {
  playRadarPingSound();
  renderRadarHUD();
  const remaining = 7 - collectedBalls.size;
  if (remaining === 0) {
    showToast('🐉 All 7 Dragon Balls are in your Radar! Shenron awaits!');
  } else {
    showToast(`📡 Radar Ping: ${remaining} Dragon Ball signals active across sectors!`);
  }
};

let isCollectingAnimationRunning = false;

function triggerDragonBallCollection(ballNumber, sourceBall, clickX, clickY) {
  if (isCollectingAnimationRunning) return;
  isCollectingAnimationRunning = true;

  const overlay = document.getElementById('dragonBallCollectOverlay');
  const enlargedBall = document.getElementById('dbEnlargedBall');
  const title = document.getElementById('dbCollectTitle');
  const radarWidget = document.getElementById('dragonRadarWidget');
  const radarCount = document.getElementById('ballsFoundCount');

  // Mark collected and make it disappear from the page (puff + vanish)
  collectedBalls.add(ballNumber);
  if (sourceBall) {
    sourceBall.classList.add('collected');
    // Puff animation then hide — blends with site's playful poof
    setTimeout(() => {
      sourceBall.classList.add('ball-disappeared');
      sourceBall.setAttribute('aria-hidden', 'true');
      sourceBall.setAttribute('tabindex', '-1');
      sourceBall.style.pointerEvents = 'none';
    }, 380);
    // After poof, remove from layout so it truly disappears from webpage (use !important to override mobile CSS)
    setTimeout(() => {
      if (sourceBall.classList.contains('ball-disappeared')) {
        sourceBall.style.setProperty('display', 'none', 'important');
        sourceBall.style.setProperty('visibility', 'hidden', 'important');
        sourceBall.style.setProperty('opacity', '0', 'important');
      }
    }, 1050);
  }

  // 1. Play magical chime and create sparkle burst at click point
  playDragonBallCollectChime();
  createKiSparks(clickX, clickY);

  // 2. Render enlarged ball SVG (120px) with photorealistic crystal layers
  if (enlargedBall) {
    enlargedBall.innerHTML = window.getBallSVGString(ballNumber, 120) + '<div class="db-rim-light"></div>';
  }
  if (title) {
    title.textContent = `${ballNumber}-Star Dragon Ball`;
  }

  // 3. Show full-screen shining collection modal
  if (overlay) {
    overlay.classList.add('active');
  }

  // 4. Stage 1: Enlarge and pulse in center (950ms)
  setTimeout(() => {
    // 5. Stage 2: Create a flying clone that shoots down into the radar widget
    const radarRect = radarWidget ? radarWidget.getBoundingClientRect() : { left: window.innerWidth - 80, top: window.innerHeight - 80, width: 60, height: 60 };
    const startX = window.innerWidth / 2;
    const startY = window.innerHeight / 2;
    const targetX = radarRect.left + radarRect.width / 2;
    const targetY = radarRect.top + radarRect.height / 2;

    const flyer = document.createElement('div');
    flyer.className = 'db-flying-clone';
    flyer.innerHTML = window.getBallSVGString(ballNumber, 90) + '<div class="db-rim-light"></div>';
    flyer.style.left = `${startX - 85}px`;
    flyer.style.top = `${startY - 85}px`;
    document.body.appendChild(flyer);

    // Hide central overlay
    if (overlay) overlay.classList.remove('active');

    // Trigger flight animation
    requestAnimationFrame(() => {
      const deltaX = targetX - startX;
      const deltaY = targetY - startY;
      flyer.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.2) rotate(360deg)`;
      flyer.style.opacity = '0.9';
    });

    // 6. Stage 3: Impact at Dragon Radar (after 600ms flight)
    setTimeout(() => {
      flyer.remove();
      playRadarPingSound();

      if (radarWidget) {
        radarWidget.classList.remove('radar-ping-blast');
        void radarWidget.offsetWidth; // Force reflow
        radarWidget.classList.add('radar-ping-blast');
      }

      const currentCount = Math.min(7, collectedBalls.size);
      if (radarCount) radarCount.textContent = currentCount;
      updateRadarMiniBlips();

      createKiSparks(targetX, targetY);
      showToast(`⭐ Added the ${ballNumber}-Star Dragon Ball to Radar! (${currentCount}/7)`);

      isCollectingAnimationRunning = false;

      // If all 7 collected -> summon Shenron!
      if (currentCount === 7) {
        setTimeout(() => {
          openShenronModal();
        }, 700);
      }
    }, 600);
  }, 950);
}

function playPrankBoingSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    const now = ctx.currentTime;

    // Playful cartoon boing pitch sweep
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(520, now + 0.12);
    osc.frequency.exponentialRampToValueAtTime(260, now + 0.25);
    osc.frequency.exponentialRampToValueAtTime(420, now + 0.38);

    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.46);
  } catch (e) {}
}

const kidGokuPrankQuotes = [
  "Bleh! 😝 That's not a real Dragon Ball! That's just an ordinary orange rock I found in the woods!",
  "Hehehe! 😜 You got tricked! That ball has 8 stars! Shenron only has 7!",
  "Bwahaha! 😋 Grandpa Gohan taught me that trick! Keep searching, silly!",
  "Aww man! 🤣 You fell for Master Roshi's painted decoy ball!",
  "Bleeeh! 👅 You can't summon Shenron with a painted sphere! Check your Dragon Radar!",
  "Pfft! 🤪 That ball is made of sugar candy! Master Roshi ate the other half!",
  "Oopsie! 😆 That's a Capsule Corp prototype ball from Bulma's workshop!",
  "Bleeeh! 👅 Master Roshi said fake Dragon Balls don't grant wishes!",
  "Bleeeh! 😜 You tapped a 100-star ball! You can't summon 14 Shenrons at once!",
  "Gotcha! 😋 Bulma told me only authentic Dragon Balls emit 7.5 micro-wave radar pings!"
];

let kidGokuPrankTimer = null;
let kidGokuPrankAnimation = null;

window.triggerKidGokuPrank = function(fakeType, clickX, clickY) {
  if (kidGokuPrankTimer) {
    clearTimeout(kidGokuPrankTimer);
    kidGokuPrankTimer = null;
  }
  if (kidGokuPrankAnimation) {
    kidGokuPrankAnimation.cancel();
    kidGokuPrankAnimation = null;
  }

  playPrankBoingSound();
  createKiSparks(clickX, clickY);

  const quoteEl = document.getElementById('prankQuoteText');
  if (quoteEl) {
    const randomQuote = kidGokuPrankQuotes[Math.floor(Math.random() * kidGokuPrankQuotes.length)];
    quoteEl.textContent = randomQuote;
  }

  const modal = document.getElementById('kidGokuPrankModal');
  const timerBar = document.getElementById('prankTimerBar');

  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    initLucideIcons();
  }

  // Exact 5-second countdown timer animation & auto-dismiss
  if (timerBar) {
    timerBar.style.transform = 'scaleX(1)';
    if (typeof timerBar.animate === 'function') {
      kidGokuPrankAnimation = timerBar.animate(
        [
          { transform: 'scaleX(1)' },
          { transform: 'scaleX(0)' }
        ],
        {
          duration: 5000,
          easing: 'linear',
          fill: 'forwards'
        }
      );
      kidGokuPrankAnimation.onfinish = () => {
        closeKidGokuPrankModal();
      };
    } else {
      kidGokuPrankTimer = setTimeout(() => {
        closeKidGokuPrankModal();
      }, 5000);
    }
  } else {
    kidGokuPrankTimer = setTimeout(() => {
      closeKidGokuPrankModal();
    }, 5000);
  }

  showToast("🤪 BLEH! Fooled ya! That's a FAKE Dragon Ball!");
};

window.closeKidGokuPrankModal = function() {
  if (kidGokuPrankTimer) {
    clearTimeout(kidGokuPrankTimer);
    kidGokuPrankTimer = null;
  }
  if (kidGokuPrankAnimation) {
    kidGokuPrankAnimation.cancel();
    kidGokuPrankAnimation = null;
  }

  const modal = document.getElementById('kidGokuPrankModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.openDragonRadarFromPrank = function() {
  closeKidGokuPrankModal();
  setTimeout(() => {
    openDragonRadarModal();
  }, 220);
};

function initDragonBallsCollector() {
  renderDragonBallSVGs();
  updateRadarMiniBlips();

  const interactiveBalls = document.querySelectorAll('.dragon-ball[data-ball]');
  const fakeBalls = document.querySelectorAll('.fake-dragon-ball[data-fake-ball]');
  const radarWidget = document.getElementById('dragonRadarWidget');

  if (radarWidget) {
    radarWidget.addEventListener('click', (e) => {
      e.stopPropagation();
      openDragonRadarModal();
    });
    radarWidget.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openDragonRadarModal();
      }
    });
  }

  // Real 7 Dragon Balls Click / Touch / Keyboard Handler — perfect mobile touch
  interactiveBalls.forEach(ball => {
    const handleBallCollect = (e) => {
      e.stopPropagation();
      const ballNumber = parseInt(ball.getAttribute('data-ball'), 10);
      const touch = (e.touches && e.touches[0]) || (e.changedTouches && e.changedTouches[0]);
      const clientX = touch ? touch.clientX : (e.clientX || window.innerWidth / 2);
      const clientY = touch ? touch.clientY : (e.clientY || window.innerHeight / 2);
      
      if (ballNumber >= 1 && ballNumber <= 7) {
        if (!collectedBalls.has(ballNumber)) {
          triggerDragonBallCollection(ballNumber, ball, clientX, clientY);
        } else {
          createKiSparks(clientX, clientY);
          showToast(`✨ ${ballNumber}-Star Dragon Ball is already secured in your Radar! (${collectedBalls.size}/7)`);
        }
      }
    };

    ball.addEventListener('click', handleBallCollect);
    ball.addEventListener('touchend', (e) => {
      e.preventDefault();
      handleBallCollect(e);
    });
    ball.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const rect = ball.getBoundingClientRect();
        handleBallCollect({
          stopPropagation: () => {},
          clientX: rect.left + rect.width / 2,
          clientY: rect.top + rect.height / 2
        });
      }
    });
  });

  // Fake Decoy Dragon Balls Click / Touch / Keyboard Handler (Kid Goku Prank) — mobile perfect
  fakeBalls.forEach(fakeBall => {
    const handleFakeClick = (e) => {
      e.stopPropagation();
      const fakeType = fakeBall.getAttribute('data-fake-ball');
      const touch = (e.touches && e.touches[0]) || (e.changedTouches && e.changedTouches[0]);
      const clientX = touch ? touch.clientX : (e.clientX || window.innerWidth / 2);
      const clientY = touch ? touch.clientY : (e.clientY || window.innerHeight / 2);
      triggerKidGokuPrank(fakeType, clientX, clientY);
    };

    fakeBall.addEventListener('click', handleFakeClick);
    fakeBall.addEventListener('touchend', (e) => {
      e.preventDefault();
      handleFakeClick(e);
    });
    fakeBall.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const rect = fakeBall.getBoundingClientRect();
        handleFakeClick({
          stopPropagation: () => {},
          clientX: rect.left + rect.width / 2,
          clientY: rect.top + rect.height / 2
        });
      }
    });
  });

  // Perfect mobile: pause ticker on touch for easier collection (moving target)
  const tickerTrack = document.querySelector('.ticker-track');
  const tickerBalls = document.querySelectorAll('.ticker-container .dragon-ball, .ticker-container .fake-dragon-ball');
  if (tickerTrack && tickerBalls.length) {
    tickerBalls.forEach(b => {
      b.addEventListener('touchstart', () => tickerTrack.classList.add('ticker-paused'), {passive: true});
      b.addEventListener('touchend', () => setTimeout(() => tickerTrack.classList.remove('ticker-paused'), 900), {passive: true});
      b.addEventListener('mousedown', () => tickerTrack.classList.add('ticker-paused'));
      b.addEventListener('mouseleave', () => tickerTrack.classList.remove('ticker-paused'));
      b.addEventListener('focus', () => tickerTrack.classList.add('ticker-paused'));
      b.addEventListener('blur', () => tickerTrack.classList.remove('ticker-paused'));
    });
  }
}

/* --- Ki Spark Click Effect --- */
function createKiSparks(x, y) {
  for (let i = 0; i < 6; i++) {
    const spark = document.createElement('div');
    spark.className = 'ki-spark';
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    const angle = (i / 6) * Math.PI * 2;
    const distance = 30 + Math.random() * 20;
    spark.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
    spark.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 600);
  }
}

/* --- Dynamic Random Flying Nimbus Flight Engine --- */
let nimbusTurboTimer = null;
let currentNimbusDirection = 'ltr';

function launchRandomNimbusFlight() {
  const nimbus = document.getElementById('flyingNimbus');
  if (!nimbus) return;

  // Random vertical altitude between 10% and 82% of screen height
  const randomTop = Math.floor(10 + Math.random() * 72);
  nimbus.style.setProperty('--nimbus-top', `${randomTop}%`);

  // Random flight direction: 60% Left-to-Right, 40% Right-to-Left
  const isLTR = Math.random() > 0.40;
  currentNimbusDirection = isLTR ? 'ltr' : 'rtl';

  // Random duration between 18s and 26s (on mobile: 14s - 20s)
  const isMobile = window.innerWidth < 768;
  const duration = isMobile 
    ? Math.floor(14 + Math.random() * 6) 
    : Math.floor(18 + Math.random() * 8);
  nimbus.style.setProperty('--nimbus-duration', `${duration}s`);

  // Reset classes and trigger reflow
  nimbus.classList.remove('nimbus-flying-ltr', 'nimbus-flying-rtl', 'nimbus-turbo');
  void nimbus.offsetWidth;

  if (isLTR) {
    nimbus.classList.add('nimbus-flying-ltr');
  } else {
    nimbus.classList.add('nimbus-flying-rtl');
  }
}

function initNimbusClick() {
  const nimbus = document.getElementById('flyingNimbus');
  if (!nimbus) return;

  // Launch initial random trajectory flight
  launchRandomNimbusFlight();

  // On every animation loop completion, randomize flight altitude & direction for the next pass
  nimbus.addEventListener('animationiteration', () => {
    if (!nimbus.classList.contains('nimbus-turbo')) {
      launchRandomNimbusFlight();
    }
  });

  function triggerNimbusTurbo() {
    if (nimbusTurboTimer) clearTimeout(nimbusTurboTimer);

    // Apply high-velocity turbo speed in active direction
    nimbus.classList.remove('nimbus-turbo');
    void nimbus.offsetWidth;
    nimbus.classList.add('nimbus-turbo');

    // Spawn Ki sparks & trailing cloud puffs around nimbus
    const rect = nimbus.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        createKiSparks(cx + (Math.random() * 40 - 20), cy + (Math.random() * 30 - 15));
      }, i * 100);
    }

    drawLightningStrike();

    // Return to normal cruising speed & pick new random flight path after 4.2s
    nimbusTurboTimer = setTimeout(() => {
      nimbus.classList.remove('nimbus-turbo');
      launchRandomNimbusFlight();
    }, 4200);
  }

  // Pointer events (uniform handling across desktop mouse, touch, and stylus)
  nimbus.addEventListener('pointerdown', (e) => {
    e.stopPropagation();
    triggerNimbusTurbo();
  });

  // Mobile touch immediate trigger
  nimbus.addEventListener('touchstart', (e) => {
    e.preventDefault();
    e.stopPropagation();
    triggerNimbusTurbo();
  }, { passive: false });

  // Click fallback
  nimbus.addEventListener('click', (e) => {
    e.stopPropagation();
    triggerNimbusTurbo();
  });
}

/* --- Global Click Animation Engine (Shockwave Ripple Rings) --- */
function initGlobalClickAnimation() {
  let lastAnimTime = 0;

  function spawnClickAnimation(x, y) {
    const now = Date.now();
    if (now - lastAnimTime < 50) return;
    lastAnimTime = now;

    const isSaiyan = document.body.classList.contains('saiyan-mode');

    // Spawning shockwave expanding ring
    const ring = document.createElement('div');
    ring.className = 'click-shockwave-ring';
    ring.style.left = `${x}px`;
    ring.style.top = `${y}px`;
    ring.style.borderColor = isSaiyan ? '#FBBF24' : '#8B5CF6';
    ring.style.width = isSaiyan ? '50px' : '40px';
    ring.style.height = isSaiyan ? '50px' : '40px';
    document.body.appendChild(ring);

    setTimeout(() => ring.remove(), 500);
  }

  document.addEventListener('pointerdown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.closest('#shenronModal')) return;
    spawnClickAnimation(e.clientX, e.clientY);
  });

  document.addEventListener('touchstart', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.closest('#shenronModal')) return;
    if (e.touches && e.touches.length > 0) {
      spawnClickAnimation(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  document.addEventListener('click', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.closest('#shenronModal')) return;
    spawnClickAnimation(e.clientX, e.clientY);
  });
}

/* ==========================================================================
   Realistic Cinematic Shenron Emergence from Dragon Balls & Wish Engine
   ========================================================================== */
let shenronTimelineTimers = [];
let shenronStormLoopId = null;

function playShenronThunderSynth() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Sub-bass thunder rumble
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(45, now);
    osc.frequency.exponentialRampToValueAtTime(20, now + 1.8);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, now);
    filter.frequency.exponentialRampToValueAtTime(40, now + 1.8);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 2.0);
  } catch (e) {}
}

function playShenronRoarSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Resonant harmonic dragon roar sweep
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(90, now);
    osc1.frequency.exponentialRampToValueAtTime(220, now + 0.6);
    osc1.frequency.exponentialRampToValueAtTime(60, now + 2.2);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(180, now);
    osc2.frequency.exponentialRampToValueAtTime(440, now + 0.6);
    osc2.frequency.exponentialRampToValueAtTime(110, now + 2.2);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.3);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 2.3);
    osc2.stop(now + 2.3);
  } catch (e) {}
}

function startShenronLightningStorm() {
  const canvas = document.getElementById('shenronLightningCanvas');
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');

  function renderStormFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // 25% chance per tick to flash a branching bolt
    if (Math.random() < 0.28) {
      drawSingleBolt(ctx, canvas.width, canvas.height);
      if (Math.random() < 0.35) {
        playShenronThunderSynth();
      }
    }
    shenronStormLoopId = setTimeout(renderStormFrame, 120 + Math.random() * 260);
  }
  renderStormFrame();
}

function stopShenronLightningStorm() {
  if (shenronStormLoopId) {
    clearTimeout(shenronStormLoopId);
    shenronStormLoopId = null;
  }
  const canvas = document.getElementById('shenronLightningCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

/* ==========================================================================
   Shenron Greenscreen Video — Chroma Key & Blend Engine
   Uses canvas to remove pure green background (#00FF00 range) and blend
   Shenron over the dark storm. Falls back to mix-blend-mode if canvas fails.
   ========================================================================== */
let shenronChromaRaf = null;
let shenronVideoEl = null;
let shenronCanvasEl = null;
let shenronCanvasCtx = null;
let shenronChromaActive = false;

function initShenronVideoChroma() {
  if (shenronVideoEl && shenronCanvasEl) return;
  shenronVideoEl = document.getElementById('shenronVideo');
  shenronCanvasEl = document.getElementById('shenronChromaCanvas');
  if (!shenronVideoEl || !shenronCanvasEl) return;
  try {
    shenronCanvasCtx = shenronCanvasEl.getContext('2d', { willReadFrequently: true });
  } catch (e) {
    shenronCanvasCtx = shenronCanvasEl.getContext('2d');
  }
  // Ensure video is muted and playsinline for mobile autoplay
  shenronVideoEl.muted = true;
  shenronVideoEl.playsInline = true;
  shenronVideoEl.preload = 'auto';
  // Fallback: if video fails to load, show fallback image
  shenronVideoEl.addEventListener('error', () => {
    console.warn('Shenron video failed, using fallback image');
    if (shenronCanvasEl) shenronCanvasEl.style.display = 'none';
    const fallback = document.getElementById('shenronDragonImg');
    if (fallback) fallback.style.opacity = '0.98';
    shenronVideoEl.classList.add('fallback-visible');
  });
}

function startShenronChromaLoop() {
  initShenronVideoChroma();
  if (!shenronVideoEl || !shenronCanvasEl || !shenronCanvasCtx) {
    // Fallback to CSS blend mode
    if (shenronVideoEl) {
      shenronVideoEl.classList.add('fallback-visible');
      shenronVideoEl.style.display = 'block';
      shenronVideoEl.play().catch(() => {});
    }
    return;
  }
  shenronChromaActive = true;
  // Size canvas to wrapper size for performance (downscale on mobile)
  const wrapper = document.getElementById('shenronDragonWrapper');
  const isMobile = window.innerWidth < 768;
  const targetW = isMobile ? 640 : 960;
  const targetH = isMobile ? 360 : 540;
  shenronCanvasEl.width = targetW;
  shenronCanvasEl.height = targetH;
  // Ensure video is playing
  shenronVideoEl.currentTime = 0;
  const playPromise = shenronVideoEl.play();
  if (playPromise) playPromise.catch(() => {
    // Autoplay blocked, fallback to image
    console.warn('Shenron video autoplay blocked');
    shenronVideoEl.classList.add('fallback-visible');
  });
  // Start RAF loop
  function renderChroma() {
    if (!shenronChromaActive || !shenronVideoEl || shenronVideoEl.paused || shenronVideoEl.ended) {
      if (shenronChromaActive && shenronVideoEl && !shenronVideoEl.ended) {
        shenronChromaRaf = requestAnimationFrame(renderChroma);
      }
      return;
    }
    const cw = shenronCanvasEl.width;
    const ch = shenronCanvasEl.height;
    try {
      shenronCanvasCtx.drawImage(shenronVideoEl, 0, 0, cw, ch);
      const imageData = shenronCanvasCtx.getImageData(0, 0, cw, ch);
      const data = imageData.data;
      // Chroma key: remove greenscreen, preserve Shenron's desaturated scales
      // Background is bright saturated green; Shenron's own green is darker desaturated (G~70-110, R~60-80)
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i+1], b = data[i+2];
        // Two-tier detection: pure bright green vs. green-dominant spill
        const isPureGreen = g > 140 && r < 110 && b < 110 && g > r + 40 && g > b + 40;
        const isGreenDominant = g > 95 && g > r + 12 && g > b + 18;
        const isGreenScreen = isPureGreen || isGreenDominant;
        if (isGreenScreen) {
          const diff = Math.min(g - r, g - b);
          if (diff > 60 || isPureGreen) {
            // Pure / strong green -> fully transparent
            data[i+3] = 0;
          } else if (diff > 18) {
            // Fringe / spill (yellow aura mixed with green) -> mostly transparent + desaturate
            const t = (diff - 18) / 42; // 0..1
            data[i+3] = 255 * (0.22 + 0.08 * (1 - t)); // 22% to 8% opacity -> almost transparent
            // Pull green toward neutral to kill spill
            const avg = (r + b) * 0.5;
            data[i] = r * 0.55 + avg * 0.45;
            data[i+1] = g * 0.25 + avg * 0.75;
            data[i+2] = b * 0.55 + avg * 0.45;
          } else {
            // Very weak green edge -> faint feather
            data[i+3] = 255 * 0.35;
            data[i+1] = data[i+1] * 0.6 + ((r + b) / 2) * 0.4;
          }
        }
        // Also make near-black letterbox at bottom transparent-ish to blend with dark storm
        // The video has black bars at bottom (0,0,0) - keep but blend, no need to remove
      }
      shenronCanvasCtx.putImageData(imageData, 0, 0);
    } catch (e) {
      // If getImageData fails due to CORS, fallback to CSS blend
      console.warn('Chroma canvas failed, fallback to blend mode', e);
      shenronVideoEl.classList.add('fallback-visible');
      shenronChromaActive = false;
      return;
    }
    shenronChromaRaf = requestAnimationFrame(renderChroma);
  }
  renderChroma();
}

function stopShenronChromaLoop() {
  shenronChromaActive = false;
  if (shenronChromaRaf) {
    cancelAnimationFrame(shenronChromaRaf);
    shenronChromaRaf = null;
  }
  if (shenronVideoEl) {
    try { shenronVideoEl.pause(); } catch(e) {}
    shenronVideoEl.currentTime = 0;
    shenronVideoEl.classList.remove('fallback-visible');
  }
  if (shenronCanvasEl && shenronCanvasCtx) {
    try { shenronCanvasCtx.clearRect(0, 0, shenronCanvasEl.width, shenronCanvasEl.height); } catch(e) {}
  }
}

// Pre-init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initShenronVideoChroma();
  // Preload video metadata
  const v = document.getElementById('shenronVideo');
  if (v) v.load();
});

window.openShenronModal = function() {
  const modal = document.getElementById('shenronModal');
  if (!modal) return;

  // Clear any leftover timers
  shenronTimelineTimers.forEach(t => clearTimeout(t));
  shenronTimelineTimers = [];

  // Reset stage classes
  modal.classList.remove('balls-active', 'beam-active', 'dragon-active', 'decree-active');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Phase 1 (0.0s): Dark Sky & Lightning Strikes begin
  startShenronLightningStorm();
  playShenronThunderSynth();

  // Phase 2 (0.2s): The 7 Dragon Balls at the base surge with pulsating golden Ki
  const t1 = setTimeout(() => {
    modal.classList.add('balls-active');
    playDragonBallCollectChime();
  }, 200);

  // Phase 3 (1.0s): Golden Energy Vortex erupts upward from the 7 balls
  const t2 = setTimeout(() => {
    modal.classList.add('beam-active');
    playSuperSaiyanAuraSound();
    drawLightningStrike();
  }, 1000);

  // Phase 4 (2.0s): Shenron Dragon emerges directly from the vortex at the balls and ascends
  const t3 = setTimeout(() => {
    modal.classList.add('dragon-active');
    playShenronRoarSound();
    drawLightningStrike();
    triggerLightningStorm(4);
    // Start greenscreen video with chroma key blending
    startShenronChromaLoop();
  }, 2000);

  // Phase 5 (3.8s): Simple, sleek wish speech bubble appears
  const t4 = setTimeout(() => {
    modal.classList.add('decree-active');
    playDragonBallCollectChime();
  }, 3800);

  shenronTimelineTimers.push(t1, t2, t3, t4);
};

window.closeShenronModal = function() {
  const modal = document.getElementById('shenronModal');
  if (modal) {
    modal.classList.remove('active', 'balls-active', 'beam-active', 'dragon-active', 'decree-active');
    document.body.style.overflow = '';
  }
  stopShenronLightningStorm();
  stopShenronChromaLoop();
  shenronTimelineTimers.forEach(t => clearTimeout(t));
  shenronTimelineTimers = [];
};

window.grantShenronWish = function(type) {
  playShenronRoarSound();
  drawLightningStrike();
  triggerLightningStorm(5);

  if (type === 'hire') {
    showToast("🐉 'YOUR WISH HAS BEEN GRANTED! CONNECTING WITH SUBODH!'");
    setTimeout(() => {
      closeShenronModal();
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const messageBox = document.getElementById('message');
        if (messageBox) {
          messageBox.value = "Hi Subodh! I collected all 7 Dragon Balls and summoned Shenron to connect with you regarding a Software / AI/ML Engineering opportunity!";
          messageBox.focus();
        }
      }
    }, 850);
  } else if (type === 'saiyan') {
    showToast("🐉 'SUPER SAIYAN GOD OVERDRIVE UNLEASHED!'");
    if (!document.body.classList.contains('saiyan-mode')) {
      toggleSaiyanMode();
    }
    setTimeout(() => {
      closeShenronModal();
    }, 850);
  } else if (type === 'blast') {
    showToast("🐉 'DRAGON FIST KAMEHAMEHA DETONATED!'");
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 160,
        spread: 120,
        origin: { y: 0.5 },
        colors: ['#F59E0B', '#10B981', '#FF2E97', '#38BDF8', '#FFFFFF']
      });
    }
    setTimeout(() => {
      closeShenronModal();
    }, 1000);
  }
};

window.scatterDragonBallsAgain = function() {
  closeShenronModal();
  collectedBalls.clear();

  // Re-enable and reshuffle all dragon balls across the webpage
  document.querySelectorAll('.dragon-ball, .fake-dragon-ball').forEach(ball => {
    ball.classList.remove('collected', 'ball-disappeared');
    ball.style.removeProperty('display');
    ball.style.removeProperty('visibility');
    ball.style.removeProperty('opacity');
    ball.style.removeProperty('pointer-events');
    ball.setAttribute('aria-hidden', 'false');
    ball.setAttribute('tabindex', '0');
  });

  renderDragonBallSVGs();
  updateRadarMiniBlips();

  const radarCount = document.getElementById('ballsFoundCount');
  if (radarCount) radarCount.textContent = '0';

  drawLightningStrike();
  playDragonBallCollectChime();
  showToast("🐉 The 7 Dragon Balls have scattered into the skies across the realm! Seek them out on your Dragon Radar!");
};

/* ==========================================================================
   Super Saiyan Rosé Goku Black Start Animation & Smooth Transition Controller
   ========================================================================== */
const INTRO_TARGET_DURATION = 6.2; // Aligned with new_intro.mp4 climax (6.63s total)
const INTRO_FALLBACK_TIMEOUT = 1.8; // Max 1.8s buffer time before automatic graceful transition
let isIntroFinishing = false;
let introTimer = null;
let introFallbackTimer = null;
let introRafId = null;

function initPageIntroAnimation() {
  const overlay = document.getElementById('introOverlay');
  const video = document.getElementById('introVideo');

  if (!overlay || !video) {
    // Intro removed — ensure landing is immediately visible (no veil lock)
    document.documentElement.classList.remove('page-intro-running');
    document.body.classList.remove('page-intro-running');
    document.body.classList.add('page-intro-revealed');
    return;
  }

  // Add intro-running class to html & body for full-screen lock
  document.documentElement.classList.add('page-intro-running');
  document.body.classList.add('page-intro-running');

  let hasStartedPlaying = false;

  // Always keep muted
  video.muted = true;
  video.volume = 0;

  // Frame-synced check to transition at climax (6.2s or video duration)
  function checkPlaybackLoop() {
    if (isIntroFinishing) return;

    const targetTime = video.duration ? Math.min(INTRO_TARGET_DURATION, video.duration - 0.15) : INTRO_TARGET_DURATION;
    if (video.currentTime >= targetTime - 0.05) {
      finishIntroTransition();
      return;
    }

    introRafId = requestAnimationFrame(checkPlaybackLoop);
  }

  // 1. When video starts actual playback
  const onVideoPlaying = () => {
    if (hasStartedPlaying) return;
    hasStartedPlaying = true;

    // Clear fallback buffer timer once video is actively rendering frames
    if (introFallbackTimer) {
      clearTimeout(introFallbackTimer);
      introFallbackTimer = null;
    }

    // Start playback check loop
    if (introRafId) cancelAnimationFrame(introRafId);
    introRafId = requestAnimationFrame(checkPlaybackLoop);

    // Hard ceiling timer for intro duration
    if (introTimer) clearTimeout(introTimer);
    introTimer = setTimeout(() => {
      if (!isIntroFinishing) finishIntroTransition();
    }, (INTRO_TARGET_DURATION + 0.4) * 1000);
  };

  video.addEventListener('playing', onVideoPlaying);
  video.addEventListener('canplay', () => {
    video.play().catch(() => {});
  });

  // 2. Video Ended handler
  video.addEventListener('ended', () => {
    if (!isIntroFinishing) finishIntroTransition();
  });

  // 3. Fallback on load/play error
  video.addEventListener('error', () => {
    finishIntroTransition();
  });

  // 4. Safe buffer watchdog: If video takes too long on slow mobile connections, transition immediately
  if (introFallbackTimer) clearTimeout(introFallbackTimer);
  introFallbackTimer = setTimeout(() => {
    if (!hasStartedPlaying && !isIntroFinishing) {
      finishIntroTransition();
    }
  }, INTRO_FALLBACK_TIMEOUT * 1000);

  // 5. Tap or Click ANYWHERE on screen/overlay to skip intro and enter portfolio directly
  overlay.addEventListener('click', () => {
    finishIntroTransition();
  });

  document.addEventListener('touchstart', (e) => {
    if (!overlay.classList.contains('hidden') && !isIntroFinishing) {
      finishIntroTransition();
    }
  }, { passive: true });

  // 6. Keyboard shortcuts: Any key (Esc, Space, Enter) skips intro directly
  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('hidden') && !isIntroFinishing) {
      if (e.key === 'Escape' || e.code === 'Space' || e.key === 'Enter') {
        e.preventDefault();
        finishIntroTransition();
      }
    }
  });

  // 7. Start Silent Playback immediately
  video.muted = true;
  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // Autoplay fallback: watchdog will seamlessly transition
    });
  }
}

/**
 * Executes the fast, cinematic smooth transition from the anime intro into the portfolio
 */
function finishIntroTransition() {
  if (isIntroFinishing) return;
  isIntroFinishing = true;

  if (introTimer) {
    clearTimeout(introTimer);
    introTimer = null;
  }
  if (introFallbackTimer) {
    clearTimeout(introFallbackTimer);
    introFallbackTimer = null;
  }
  if (introRafId) {
    cancelAnimationFrame(introRafId);
    introRafId = null;
  }

  const overlay = document.getElementById('introOverlay');
  const video = document.getElementById('introVideo');

  if (video) {
    try {
      video.muted = true;
      video.volume = 0;
    } catch (e) {}
  }

  if (overlay) {
    // Step 1: Trigger Rosé divine burst (GPU-accelerated pink bloom + energy rings)
    overlay.classList.add('transitioning');
    spawnRosePetals();

    // Step 2: Unveil the landing page immediately
    document.documentElement.classList.remove('page-intro-running');
    document.body.classList.remove('page-intro-running');
    document.body.classList.add('page-intro-revealed');

    // Step 3: Fully hide intro overlay after 550ms (fast, punchy handoff)
    setTimeout(() => {
      overlay.classList.add('hidden');
      if (video) {
        try { video.pause(); } catch (e) {}
      }
      isIntroFinishing = false;
    }, 550);
  }
}

function spawnRosePetals() {
  const container = document.getElementById('introRoseParticles');
  if (!container) return;
  container.innerHTML = '';
  const count = 12;
  for (let i = 0; i < count; i++) {
    const petal = document.createElement('span');
    petal.className = 'rose-petal';
    const startX = 48 + Math.random() * 4;
    const startY = 38 + Math.random() * 8;
    petal.style.left = startX + '%';
    petal.style.top = startY + '%';
    const dx = (Math.random() - 0.5) * 280;
    const dy = 100 + Math.random() * 180;
    petal.style.setProperty('--dx', dx + 'px');
    petal.style.setProperty('--dy', dy + 'px');
    petal.style.animationDelay = (i * 0.04) + 's';
    const s = 0.7 + Math.random() * 0.6;
    petal.style.width = (8 * s) + 'px';
    petal.style.height = (8 * s) + 'px';
    container.appendChild(petal);
  }
}

/**
 * Replays the intro animation anytime the user clicks "Intro" in the header
 */
function replayIntroAnimation() {
  const overlay = document.getElementById('introOverlay');
  const video = document.getElementById('introVideo');

  if (!overlay || !video) return;

  isIntroFinishing = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });

  overlay.classList.remove('hidden');
  overlay.classList.remove('transitioning');
  document.documentElement.classList.add('page-intro-running');
  document.body.classList.add('page-intro-running');
  document.body.classList.remove('page-intro-revealed');

  try {
    video.currentTime = 0;
    video.muted = true;
    video.volume = 0;
  } catch (e) {}

  if (introTimer) clearTimeout(introTimer);
  introTimer = setTimeout(() => {
    if (!isIntroFinishing) {
      finishIntroTransition();
    }
  }, (INTRO_TARGET_DURATION + 0.3) * 1000);

  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {});
  }
}

/* ==========================================================================
   Scroll-Triggered Reveal Engine (IntersectionObserver with Staggered Cascades)
   ========================================================================== */
function initScrollReveal() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.scroll-reveal').forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observerOptions = {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  function attachElements() {
    const targets = document.querySelectorAll(
      '.section-header, .stat-card, .skill-group, .timeline-item, .project-card, .achievement-card, .edu-card, .cert-card, .contact-wrapper, .hero-photo-frame, .hero-content, .card-sticker'
    );

    targets.forEach(el => {
      if (!el.classList.contains('scroll-reveal')) {
        el.classList.add('scroll-reveal');

        // Apply natural staggered delays to sibling cards
        const parentGrid = el.closest('.skills-grid, .projects-grid, .achievements-grid, .stats-grid, .education-grid, .timeline, .certs-grid');
        if (parentGrid) {
          const siblingIndex = Array.from(parentGrid.children).indexOf(el);
          if (siblingIndex >= 0) {
            const delayClass = `reveal-delay-${(siblingIndex % 6) + 1}`;
            el.classList.add(delayClass);
          }
        }

        revealObserver.observe(el);
      }
    });
  }

  // Initial attach
  attachElements();

  // Expose global refresh for dynamic cards (e.g. project filter clicks)
  window.refreshScrollReveal = function() {
    setTimeout(attachElements, 50);
  };
}

/* ==========================================================================
   Dragon Ball Inside Joke Placeholder Cycler & Prompt Generator
   ========================================================================== */
function initDbzJokePlaceholders() {
  const nameInput = document.getElementById('senderName');
  const emailInput = document.getElementById('senderEmail');
  const messageInput = document.getElementById('senderMessage');
  const rollBtn = document.getElementById('rollDbzPromptBtn');
  if (!messageInput) return;

  const dbzRoster = [
    {
      name: "Prince Vegeta IV (Prince of All Saiyans)",
      email: "vegeta@planetvegeta.org",
      msg: "Vegeta: What does the scouter say about your backend power level? OVER 9000! Join our engineering fleet at once."
    },
    {
      name: "Lord Frieza (Galactic Real Estate CEO)",
      email: "lordfrieza@galacticempire.corp",
      msg: "Frieza: Greetings, monkey. This isn't even my architecture's final form! Fix our latency in 5 minutes."
    },
    {
      name: "Perfect Cell (Biotech Systems Architect)",
      email: "cell@perfection.biotech",
      msg: "Cell: P is for Priceless... E is for Extinction of all bugs. Your 98% accuracy ML models are in Perfect Form!"
    },
    {
      name: "Captain Ginyu (Ginyu Special Force Leader)",
      email: "ginyu.force.pose@friezaforce.com",
      msg: "Captain Ginyu: *Strikes dynamic pose* 🕺 We need a 10x Saiyan Engineer to lead the Ginyu backend squad!"
    },
    {
      name: "Piccolo (Senior Systems Architect & Mentor)",
      email: "piccolo@namekian-kami.dbz",
      msg: "Piccolo: DODGE! That legacy codebase is about to blow! We have an enterprise backend role for you."
    },
    {
      name: "Lord Beerus (God of Destruction & Tech Recruiter)",
      email: "beerus.nap@universe7.god",
      msg: "Lord Beerus: Whis told me your REST APIs are delicious. Work with us, or I'll Hakai your staging servers!"
    },
    {
      name: "Majin Buu (Bug Exterminator)",
      email: "buu.eats.candy@hercule-estate.net",
      msg: "Majin Buu: Buu like your computer vision model! Subodh join team, Buu promise not to turn servers into candy!"
    },
    {
      name: "Farmer with Shotgun (Power Level: 5)",
      email: "farmer.shotgun@earth-outskirts.com",
      msg: "Farmer: Holy smokes! Scouter says your coding speed is over 9000! Take my shotgun and sign our job offer!"
    },
    {
      name: "Master Roshi (Jackie Chun / Kame House Coach)",
      email: "roshi@kamehouse.tropical",
      msg: "Master Roshi: Send two crates of Senzu Beans and your resume straight to Kame House for an interview!"
    },
    {
      name: "King Kai (Planet 10G Cloud Infrastructure Lead)",
      email: "kingkai@ten-gravity.otherworld",
      msg: "King Kai: Tell me a coding joke that makes me laugh! ...Also, your 98% accuracy model is out of this world."
    },
    {
      name: "Future Trunks (Time Patrol Lead)",
      email: "trunks.sword@future-capsule.timeline",
      msg: "Trunks: I traveled 20 years back in time to hire you before the Androids attacked our production clusters!"
    },
    {
      name: "Mr. Satan (World Martial Arts Champion)",
      email: "hercule.champ@worldchamp.dojo",
      msg: "Mr. Satan: HAHAHA! The World Champion demands your backend wizardry! The other devs are all smoke and mirrors!"
    }
  ];

  let currentJokeIndex = 0;

  if (rollBtn) {
    rollBtn.addEventListener('click', () => {
      currentJokeIndex = (currentJokeIndex + 1) % dbzRoster.length;
      const joke = dbzRoster[currentJokeIndex];
      
      messageInput.value = joke.msg;
      if (nameInput && !nameInput.value) nameInput.placeholder = `e.g. ${joke.name}`;
      if (emailInput && !emailInput.value) emailInput.placeholder = `e.g. ${joke.email}`;
      
      messageInput.focus();
      
      // Playful bounce & toast notification
      rollBtn.style.transform = 'scale(1.15) rotate(-5deg)';
      setTimeout(() => { rollBtn.style.transform = ''; }, 200);
      
      if (typeof showToast === 'function') {
        showToast(`✨ Loaded DBZ Meme Prompt from ${joke.name.split(' ')[0]}!`);
      }
    });
  }
}

/* ==========================================================================
   Hero Rotating Word — Claude-inspired scouter cycling (1.8s)
   Cycles Backend Builder → Full-Stack Builder → AI/ML Engineer
   Respects prefers-reduced-motion — keeps static first word
   ========================================================================== */
function initHeroRotatingWord() {
  const el = document.getElementById('heroRotatingWord');
  if (!el) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const words = ['Backend Builder', 'Full-Stack Builder', 'AI/ML Engineer'];
  // Ensure starting index matches current text; fallback to 0
  let idx = words.indexOf(el.textContent.trim());
  if (idx < 0) idx = 0;
  setInterval(() => {
    idx = (idx + 1) % words.length;
    el.classList.remove('is-entering');
    el.classList.add('is-exiting');
    setTimeout(() => {
      el.textContent = words[idx];
      el.classList.remove('is-exiting');
      void el.offsetWidth;
      el.classList.add('is-entering');
      setTimeout(() => el.classList.remove('is-entering'), 520);
    }, 320);
  }, 1800);
}

/* ── Cursor-following face-aligned photo reveal (light: rose2.jpg, dark: goku.webp) ── */
function initPhotoRevealLens() {
  const frame = document.getElementById('heroPhotoFrame');
  if (!frame) return;
  const reveal = frame.querySelector('.hero-photo-reveal');
  if (!reveal) return;
  if (window.matchMedia('(hover: none)').matches || window.matchMedia('(pointer: coarse)').matches) return;
  // Preload both reveal images for instant lens
  try { new Image().src = 'assets/rose2.jpg'; new Image().src = 'assets/goku.webp'; } catch(e) {}
  let rafId = null;
  let px = 0, py = 0;
  function apply() {
    rafId = null;
    reveal.style.setProperty('--rx', px + 'px');
    reveal.style.setProperty('--ry', py + 'px');
  }
  frame.addEventListener('mousemove', (e) => {
    const r = frame.getBoundingClientRect();
    px = e.clientX - r.left;
    py = e.clientY - r.top;
    px = Math.max(0, Math.min(px, r.width));
    py = Math.max(0, Math.min(py, r.height));
    if (rafId === null) rafId = requestAnimationFrame(apply);
  });
  frame.addEventListener('mouseenter', (e) => {
    const r = frame.getBoundingClientRect();
    px = e.clientX - r.left;
    py = e.clientY - r.top;
    reveal.style.setProperty('--rx', px + 'px');
    reveal.style.setProperty('--ry', py + 'px');
  });
  frame.addEventListener('mouseleave', () => {
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  });
}




