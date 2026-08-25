/**
 * Subodh Uttam Muneshwar - Portfolio Interactivity & Render Engine
 * Playful Geometric UI Interaction logic
 */

document.addEventListener('DOMContentLoaded', () => {
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
  initLucideIcons();
  initKeyboardShortcuts();
  initSaiyanMode();
  initDragonBallsCollector();
  initNimbusClick();
  initGlobalClickAnimation();
});

// Escape key to close modal
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeShenronModal();
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

/* --- Render Skills Matrix --- */
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
    <div class="project-card">
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
            <i data-lucide="github" style="width: 16px; height: 16px;"></i>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>
  `).join('');

  initLucideIcons();
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
        <i data-lucide="github" style="width: 18px; height: 18px;"></i>
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
}

/* --- Toast Helper --- */
function showToast(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/* --- Contact & Clipboard Actions --- */
function initContactInteractions() {
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('subodhum1603@gmail.com');
      showToast('🎉 Copied subodhum1603@gmail.com to clipboard!');
      triggerConfetti();
    });
  }

  const copyPhoneBtn = document.getElementById('copyPhoneBtn');
  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('+919029920228');
      showToast('📞 Copied +91 9029920228 to clipboard!');
      triggerConfetti();
    });
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName').value;
      showToast(`🚀 Thanks ${name}! Message prepared. Subodh will respond shortly!`);
      triggerConfetti();
      contactForm.reset();
    });
  }
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

/* --- Mobile Menu Toggle --- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      const isVisible = navMenu.style.display === 'flex';
      navMenu.style.display = isVisible ? 'none' : 'flex';
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '80px';
      navMenu.style.left = '0';
      navMenu.style.width = '100%';
      navMenu.style.backgroundColor = '#FFFDF5';
      navMenu.style.padding = '1.5rem';
      navMenu.style.borderBottom = '2.5px solid #1E293B';
    });
  }
}

/* ==========================================================================
   Dragon Ball & Super Saiyan Interactive Engine - Planet Namek Saga
   Staggered element transformation, lightning storm, and earthquake rumble
   ========================================================================== */

/* --- Super Saiyan Theme Toggle --- */
function initSaiyanMode() {
  const saiyanBtn = document.getElementById('saiyanModeBtn');
  const saiyanBtnText = document.getElementById('saiyanBtnText');
  if (!saiyanBtn) return;

  saiyanBtn.addEventListener('click', () => {
    const isCurrentlySaiyan = document.body.classList.contains('saiyan-mode');

    if (!isCurrentlySaiyan) {
      if (saiyanBtnText) saiyanBtnText.textContent = '⚡ Saiyan: ON!';
      showToast('⚡ PLANET NAMEK: TRANSFORMATION INITIATED! KI LEVEL SURGING...');
      runPlanetNamekTransformation();
    } else {
      document.body.classList.remove('saiyan-mode');
      if (saiyanBtnText) saiyanBtnText.textContent = 'Go Super Saiyan!';
      showToast('✨ Returned to Base Form.');
    }
  });
}

/* --- Planet Namek Destruction / Staggered Transformation Engine --- */
function runPlanetNamekTransformation() {
  // 1. Immediately apply the dark Planet Namek destruction sky & body theme
  document.body.classList.add('saiyan-mode');
  
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
    document.querySelector('.site-header'),
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

/* --- 7 Dragon Balls Collector & SVG Star Renderer --- */
const collectedBalls = new Set();

function renderDragonBallSVGs() {
  function createStarPolygon(cx, cy, r = 2.8) {
    let points = [];
    for (let i = 0; i < 5; i++) {
      let outerAngle = (i * 72 - 90) * Math.PI / 180;
      let innerAngle = (i * 72 + 36 - 90) * Math.PI / 180;
      points.push(`${cx + r * Math.cos(outerAngle)},${cy + r * Math.sin(outerAngle)}`);
      points.push(`${cx + (r * 0.45) * Math.cos(innerAngle)},${cy + (r * 0.45) * Math.sin(innerAngle)}`);
    }
    return `<polygon points="${points.join(' ')}" fill="#DC2626" />`;
  }

  function getBallSVG(starNum) {
    let stars = '';
    const num = parseInt(starNum, 10);
    if (num === 1) {
      stars = createStarPolygon(17, 17, 3.8);
    } else if (num === 2) {
      stars = createStarPolygon(12, 17, 3.0) + createStarPolygon(22, 17, 3.0);
    } else if (num === 3) {
      stars = createStarPolygon(17, 11, 2.9) + createStarPolygon(11.5, 21.5, 2.9) + createStarPolygon(22.5, 21.5, 2.9);
    } else if (num === 4) {
      stars = createStarPolygon(12, 12, 2.8) + createStarPolygon(22, 12, 2.8) + createStarPolygon(12, 22, 2.8) + createStarPolygon(22, 22, 2.8);
    } else if (num === 5) {
      stars = createStarPolygon(17, 10, 2.6) + createStarPolygon(10.5, 15.5, 2.6) + createStarPolygon(23.5, 15.5, 2.6) + createStarPolygon(13, 23.5, 2.6) + createStarPolygon(21, 23.5, 2.6);
    } else if (num === 6) {
      stars = createStarPolygon(12, 10.5, 2.5) + createStarPolygon(22, 10.5, 2.5) + createStarPolygon(9.5, 17, 2.5) + createStarPolygon(24.5, 17, 2.5) + createStarPolygon(12, 23.5, 2.5) + createStarPolygon(22, 23.5, 2.5);
    } else if (num === 7) {
      stars = createStarPolygon(17, 17, 2.5) + createStarPolygon(17, 9.5, 2.3) + createStarPolygon(23.5, 13, 2.3) + createStarPolygon(23.5, 21, 2.3) + createStarPolygon(17, 24.5, 2.3) + createStarPolygon(10.5, 21, 2.3) + createStarPolygon(10.5, 13, 2.3);
    }

    return `
      <svg viewBox="0 0 34 34" width="34" height="34" style="display: block; pointer-events: none;">
        <defs>
          <radialGradient id="db-orb-${num}" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#FDE047" />
            <stop offset="65%" stop-color="#F59E0B" />
            <stop offset="100%" stop-color="#EA580C" />
          </radialGradient>
        </defs>
        <circle cx="17" cy="17" r="15" fill="url(#db-orb-${num})" stroke="#1E293B" stroke-width="2" />
        <ellipse cx="12" cy="10" rx="4" ry="2" fill="#FFFFFF" opacity="0.6" transform="rotate(-30 12 10)" />
        ${stars}
      </svg>
    `;
  }

  // Render SVG inside section dragon balls
  document.querySelectorAll('.dragon-ball[data-ball]').forEach(ball => {
    const ballNum = ball.getAttribute('data-ball');
    ball.innerHTML = getBallSVG(ballNum);
  });

  // Render SVG inside Shenron modal celebration balls
  document.querySelectorAll('.shenron-star-ball[data-shenron-ball]').forEach(ball => {
    const ballNum = ball.getAttribute('data-shenron-ball');
    ball.innerHTML = getBallSVG(ballNum);
  });
}

function initDragonBallsCollector() {
  renderDragonBallSVGs();

  const interactiveBalls = document.querySelectorAll('.dragon-ball[data-ball]');
  const radarCount = document.getElementById('ballsFoundCount');
  const radarWidget = document.getElementById('dragonRadarWidget');

  if (radarWidget) {
    radarWidget.addEventListener('click', () => {
      const remaining = 7 - collectedBalls.size;
      if (remaining > 0) {
        showToast(`📟 Dragon Radar: ${collectedBalls.size}/7 found! Explore sections to find the rest!`);
      } else {
        openShenronModal();
      }
    });
  }

  interactiveBalls.forEach(ball => {
    ball.addEventListener('click', (e) => {
      e.stopPropagation();
      const ballNumber = parseInt(ball.getAttribute('data-ball'), 10);
      
      // Ensure only valid 1-7 stars are counted
      if (ballNumber >= 1 && ballNumber <= 7) {
        if (!collectedBalls.has(ballNumber)) {
          collectedBalls.add(ballNumber);
          ball.classList.add('collected');
          
          const currentCount = Math.min(7, collectedBalls.size);
          if (radarCount) radarCount.textContent = currentCount;
          
          createKiSparks(e.clientX, e.clientY);
          showToast(`⭐ Found the ${ballNumber}-Star Dragon Ball! (${currentCount}/7)`);

          if (currentCount === 7) {
            setTimeout(() => {
              openShenronModal();
            }, 600);
          }
        } else {
          createKiSparks(e.clientX, e.clientY);
          showToast(`✨ Already collected the ${ballNumber}-Star Dragon Ball! (${Math.min(7, collectedBalls.size)}/7)`);
        }
      }
    });
  });
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

/* --- Flying Nimbus Interaction & Turbo Acceleration --- */
let nimbusTurboTimer = null;

function initNimbusClick() {
  const nimbus = document.getElementById('flyingNimbus');
  if (!nimbus) return;

  nimbus.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // Clear any existing turbo timer
    if (nimbusTurboTimer) clearTimeout(nimbusTurboTimer);

    // Apply high-velocity speed boost
    nimbus.classList.remove('nimbus-turbo');
    // Force reflow to restart turbo keyframe
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
    showToast("☁️ KINTO'UN TURBO SPEED ENGAGED! ⚡");

    // Return to normal cruising speed after 4.9s
    nimbusTurboTimer = setTimeout(() => {
      nimbus.classList.remove('nimbus-turbo');
    }, 4900);
  });
}

/* --- Global Click Animation Engine --- */
function initGlobalClickAnimation() {
  const lightColors = ['#8B5CF6', '#F472B6', '#FBBF24', '#34D399', '#38BDF8'];
  const saiyanColors = ['#FBBF24', '#F59E0B', '#38BDF8', '#EF4444', '#FEF08A'];

  document.addEventListener('pointerdown', (e) => {
    // Avoid interfering when typing in inputs/textareas
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    const x = e.clientX;
    const y = e.clientY;
    const isSaiyan = document.body.classList.contains('saiyan-mode');
    const colorPalette = isSaiyan ? saiyanColors : lightColors;

    // 1. Spawning shockwave expanding ring
    const ring = document.createElement('div');
    ring.className = 'click-shockwave-ring';
    ring.style.left = `${x}px`;
    ring.style.top = `${y}px`;
    ring.style.borderColor = isSaiyan ? '#FBBF24' : '#8B5CF6';
    ring.style.width = isSaiyan ? '50px' : '40px';
    ring.style.height = isSaiyan ? '50px' : '40px';
    document.body.appendChild(ring);

    // 2. Spawning 7 bouncy bursting particles
    const particleCount = isSaiyan ? 8 : 6;
    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('div');
      p.className = 'global-click-particle';
      p.style.left = `${x}px`;
      p.style.top = `${y}px`;
      
      const size = Math.floor(6 + Math.random() * 6);
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      p.style.backgroundColor = color;
      p.style.boxShadow = isSaiyan ? `0 0 8px ${color}` : `2px 2px 0px #1E293B`;

      // Random trajectory angle & velocity distance
      const angle = (i / particleCount) * Math.PI * 2 + (Math.random() * 0.4 - 0.2);
      const distance = 25 + Math.random() * 35;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;

      p.style.setProperty('--dx', `${dx}px`);
      p.style.setProperty('--dy', `${dy}px`);

      document.body.appendChild(p);

      setTimeout(() => p.remove(), 600);
    }

    setTimeout(() => ring.remove(), 500);
  });
}

/* --- Shenron Modal & Wish Action --- */
window.openShenronModal = function() {
  const modal = document.getElementById('shenronModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    drawLightningStrike();
  }
};

window.closeShenronModal = function() {
  const modal = document.getElementById('shenronModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.superSaiyanGodBlast = function() {
  drawLightningStrike();
  triggerLightningStorm(6);
  showToast("🐉 'YOUR WISH HAS BEEN GRANTED!'");
};

