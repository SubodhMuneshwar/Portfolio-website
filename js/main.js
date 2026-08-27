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
});

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
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('open');
    });

    // Auto-close menu when any nav link is clicked
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
        navMenu.classList.remove('open');
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

  window.getBallSVGString = function(starNum, size = 34) {
    let innerContent = '';
    const scale = size / 34;
    const r = (radius) => radius * scale;
    const c = (coord) => coord * scale;

    const num = starNum.toString();

    if (num === '1') {
      innerContent = createStarPolygon(c(17), c(17), r(3.8));
    } else if (num === '2') {
      innerContent = createStarPolygon(c(12), c(17), r(3.0)) + createStarPolygon(c(22), c(17), r(3.0));
    } else if (num === '3') {
      innerContent = createStarPolygon(c(17), c(11), r(2.9)) + createStarPolygon(c(11.5), c(21.5), r(2.9)) + createStarPolygon(c(22.5), c(21.5), r(2.9));
    } else if (num === '4') {
      innerContent = createStarPolygon(c(12), c(12), r(2.8)) + createStarPolygon(c(22), c(12), r(2.8)) + createStarPolygon(c(12), c(22), r(2.8)) + createStarPolygon(c(22), c(22), r(2.8));
    } else if (num === '5') {
      innerContent = createStarPolygon(c(17), c(10), r(2.6)) + createStarPolygon(c(10.5), c(15.5), r(2.6)) + createStarPolygon(c(23.5), c(15.5), r(2.6)) + createStarPolygon(c(13), c(23.5), r(2.6)) + createStarPolygon(c(21), c(23.5), r(2.6));
    } else if (num === '6') {
      innerContent = createStarPolygon(c(12), c(10.5), r(2.5)) + createStarPolygon(c(22), c(10.5), r(2.5)) + createStarPolygon(c(9.5), c(17), r(2.5)) + createStarPolygon(c(24.5), c(17), r(2.5)) + createStarPolygon(c(12), c(23.5), r(2.5)) + createStarPolygon(c(22), c(23.5), r(2.5));
    } else if (num === '7') {
      innerContent = createStarPolygon(c(17), c(17), r(2.5)) + createStarPolygon(c(17), c(9.5), r(2.3)) + createStarPolygon(c(23.5), c(13), r(2.3)) + createStarPolygon(c(23.5), c(21), r(2.3)) + createStarPolygon(c(17), c(24.5), r(2.3)) + createStarPolygon(c(10.5), c(21), r(2.3)) + createStarPolygon(c(10.5), c(13), r(2.3));
    } 
    // --- Fake Dragon Balls Trick Variations ---
    else if (num === '8') {
      // Impossible 8-Star Dragon Ball!
      innerContent = createStarPolygon(c(12), c(9), r(2.2)) + createStarPolygon(c(22), c(9), r(2.2)) +
                     createStarPolygon(c(8), c(17), r(2.2)) + createStarPolygon(c(17), c(17), r(2.2)) + createStarPolygon(c(26), c(17), r(2.2)) +
                     createStarPolygon(c(12), c(25), r(2.2)) + createStarPolygon(c(22), c(25), r(2.2)) + createStarPolygon(c(17), c(9), r(2.0));
    } else if (num === '9') {
      // 9-Star Ancient Decoy Ball (3x3 grid of stars)
      innerContent = createStarPolygon(c(10), c(10), r(2.0)) + createStarPolygon(c(17), c(10), r(2.0)) + createStarPolygon(c(24), c(10), r(2.0)) +
                     createStarPolygon(c(10), c(17), r(2.0)) + createStarPolygon(c(17), c(17), r(2.0)) + createStarPolygon(c(24), c(17), r(2.0)) +
                     createStarPolygon(c(10), c(24), r(2.0)) + createStarPolygon(c(17), c(24), r(2.0)) + createStarPolygon(c(24), c(24), r(2.0));
    } else if (num === '0') {
      // Blank smooth decoy orb with faint shine
      innerContent = '';
    } else if (num === 'emoji') {
      // Cool Sunglasses Emoji inside the orb!
      innerContent = `<text x="${c(17)}" y="${c(23)}" font-size="${c(17)}" text-anchor="middle">😎</text>`;
    } else if (num === 'spiral') {
      // Hypnotic Spiral Galaxy Stars
      innerContent = createStarPolygon(c(17), c(17), r(3.2)) +
        `<path d="M ${c(17)} ${c(17)} m -${c(9)}, 0 a ${c(9)},${c(9)} 0 1,0 ${c(18)},0 a ${c(9)},${c(9)} 0 1,0 -${c(18)},0" stroke="#DC2626" stroke-width="${Math.max(1.2, 1.6 * scale)}" fill="none" stroke-dasharray="${c(3)},${c(2)}" />`;
    } else if (num === 'cookie') {
      // Painted Chocolate Chip Cookie Ball
      innerContent = `<circle cx="${c(11)}" cy="${c(13)}" r="${c(2)}" fill="#581C87" /><circle cx="${c(22)}" cy="${c(12)}" r="${c(2.2)}" fill="#581C87" /><circle cx="${c(16)}" cy="${c(19)}" r="${c(1.8)}" fill="#581C87" /><circle cx="${c(10)}" cy="${c(23)}" r="${c(2.2)}" fill="#581C87" /><circle cx="${c(23)}" cy="${c(23)}" r="${c(2)}" fill="#581C87" />`;
    } else if (num === 'glitch') {
      // Cyber Matrix Glitch Decoy Ball
      innerContent = `<text x="${c(17)}" y="${c(22)}" font-family="monospace" font-weight="900" font-size="${c(15)}" fill="#10B981" text-anchor="middle">⚡01</text>`;
    } else if (num === '100') {
      // 100-Star Ultra Mythic Ball
      innerContent = `<text x="${c(17)}" y="${c(22)}" font-family="sans-serif" font-weight="900" font-size="${c(13)}" fill="#DC2626" text-anchor="middle">100★</text>`;
    } else if (num === 'cracked') {
      // Cracked 4-Star Ball with cartoon crack path
      innerContent = createStarPolygon(c(12), c(12), r(2.8)) + createStarPolygon(c(22), c(22), r(2.8)) +
        `<path d="M ${c(6)} ${c(14)} L ${c(14)} ${c(19)} L ${c(18)} ${c(16)} L ${c(28)} ${c(22)}" stroke="#1E293B" stroke-width="${Math.max(1.5, 2 * scale)}" stroke-linecap="round" fill="none" />` +
        `<rect x="${c(12)}" y="${c(15)}" width="${c(10)}" height="${c(4)}" rx="${c(1)}" fill="#FDE68A" stroke="#1E293B" stroke-width="1" transform="rotate(-20 ${c(17)} ${c(17)})" />`;
    } else if (num === 'question') {
      // Mystery question mark
      innerContent = `<text x="${c(17)}" y="${c(23)}" font-family="sans-serif" font-weight="900" font-size="${c(18)}" fill="#DC2626" text-anchor="middle">?</text>`;
    } else if (num === 'rock') {
      // Painted orange pebble
      innerContent = `<circle cx="${c(14)}" cy="${c(14)}" r="${c(1.5)}" fill="#78350F" /><circle cx="${c(21)}" cy="${c(20)}" r="${c(2)}" fill="#78350F" /><circle cx="${c(12)}" cy="${c(22)}" r="${c(1.5)}" fill="#78350F" />`;
    }

    return `
      <svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" style="display: block; pointer-events: none;">
        <defs>
          <radialGradient id="db-orb-${num}-${size}" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#FDE047" />
            <stop offset="65%" stop-color="#F59E0B" />
            <stop offset="100%" stop-color="#EA580C" />
          </radialGradient>
        </defs>
        <circle cx="${c(17)}" cy="${c(17)}" r="${r(15)}" fill="url(#db-orb-${num}-${size})" stroke="#1E293B" stroke-width="${Math.max(1.5, 2 * scale)}" />
        <ellipse cx="${c(12)}" cy="${c(10)}" rx="${r(4)}" ry="${r(2)}" fill="#FFFFFF" opacity="0.6" transform="rotate(-30 ${c(12)} ${c(10)})" />
        ${innerContent}
      </svg>
    `;
  };

  // Render SVG inside real section dragon balls
  document.querySelectorAll('.dragon-ball[data-ball]').forEach(ball => {
    const ballNum = ball.getAttribute('data-ball');
    ball.innerHTML = window.getBallSVGString(ballNum, 34);
  });

  // Render SVG inside fake decoy dragon balls
  document.querySelectorAll('.fake-dragon-ball[data-fake-ball]').forEach(ball => {
    const fakeType = ball.getAttribute('data-fake-ball');
    ball.innerHTML = window.getBallSVGString(fakeType, 34);
  });

  // Render SVG inside Shenron modal celebration balls
  document.querySelectorAll('.shenron-star-ball[data-shenron-ball]').forEach(ball => {
    const ballNum = ball.getAttribute('data-shenron-ball');
    ball.innerHTML = window.getBallSVGString(ballNum, 34);
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
             title="${ball.name} (${isCollected ? 'Collected' : 'Detected'})"
             onclick="focusSector('${ball.selector}')">
          ${isCollected ? '' : ball.num}
        </div>
      `;
    }).join('');
  }

  if (signalsList) {
    signalsList.innerHTML = dragonBallLocations.map(ball => {
      const isCollected = collectedBalls.has(ball.num);
      return `
        <div class="radar-signal-card ${isCollected ? 'collected' : ''}" onclick="focusSector('${ball.selector}')" style="cursor: pointer;">
          <div class="radar-signal-card-ball">
            ${window.getBallSVGString(ball.num, 20)}
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

  // Mark collected
  collectedBalls.add(ballNumber);
  if (sourceBall) sourceBall.classList.add('collected');

  // 1. Play magical chime and create sparkle burst at click point
  playDragonBallCollectChime();
  createKiSparks(clickX, clickY);

  // 2. Render enlarged ball SVG (110px)
  if (enlargedBall) {
    enlargedBall.innerHTML = window.getBallSVGString(ballNumber, 110);
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
    flyer.innerHTML = window.getBallSVGString(ballNumber, 90);
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
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(720, ctx.currentTime + 0.16);
    osc.frequency.exponentialRampToValueAtTime(240, ctx.currentTime + 0.36);
    gain.gain.setValueAtTime(0.32, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.42);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.42);
  } catch (e) {}
}

const kidGokuPrankQuotes = [
  "Bleh! 😝 That's not a real Dragon Ball! That's just an ordinary orange rock I found in the woods!",
  "Hehehe! 😜 You got tricked! That ball has 8 stars! Shenron only has 7!",
  "Bleeehh! 👅 Fooled ya! Master Roshi said fake Dragon Balls don't grant wishes!",
  "Aha! 🤪 That's my decoy ball! Check your Capsule Corp Dragon Radar to find the real ones!",
  "Bwahaha! 😋 Grandpa Gohan taught me that trick! Keep searching, silly!",
  "Nya-ha-ha! 😛 You found a chocolate chip cookie painted orange! Delicious, but no wishes!",
  "Woooosh! 💨 That's just a yellow smoke bomb! Don't let King Piccolo catch you with fakes!",
  "Ehehe! 🤪 Even Oolong's shape-shifting looks more real than this ball!",
  "Bleeeh! 😜 You tapped a 100-star ball! You can't summon 14 Shenrons at once!",
  "Gotcha! 😋 Bulma told me only authentic Dragon Balls emit 7.5 micro-wave radar pings!"
];

let kidGokuPrankTimer = null;

window.triggerKidGokuPrank = function(fakeType, clickX, clickY) {
  if (kidGokuPrankTimer) clearTimeout(kidGokuPrankTimer);

  playPrankBoingSound();
  createKiSparks(clickX, clickY);

  const quoteEl = document.getElementById('prankQuoteText');
  if (quoteEl) {
    const randomQuote = kidGokuPrankQuotes[Math.floor(Math.random() * kidGokuPrankQuotes.length)];
    quoteEl.textContent = randomQuote;
  }

  const modal = document.getElementById('kidGokuPrankModal');
  const timerBar = document.getElementById('prankTimerBar');

  if (timerBar) {
    // Reset timer progress bar animation
    timerBar.style.animation = 'none';
    void timerBar.offsetWidth;
    timerBar.style.animation = '';
  }

  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    initLucideIcons();
  }

  showToast("🤪 BLEH! Fooled ya! That's a FAKE Dragon Ball!");

  // Auto-dismiss after 7 seconds
  kidGokuPrankTimer = setTimeout(() => {
    closeKidGokuPrankModal();
  }, 7000);
};

window.closeKidGokuPrankModal = function() {
  if (kidGokuPrankTimer) {
    clearTimeout(kidGokuPrankTimer);
    kidGokuPrankTimer = null;
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
  }

  // Real 7 Dragon Balls Click / Touch Handler
  interactiveBalls.forEach(ball => {
    const handleBallCollect = (e) => {
      e.stopPropagation();
      const ballNumber = parseInt(ball.getAttribute('data-ball'), 10);
      const clientX = (e.touches && e.touches.length > 0) ? e.touches[0].clientX : (e.clientX || window.innerWidth / 2);
      const clientY = (e.touches && e.touches.length > 0) ? e.touches[0].clientY : (e.clientY || window.innerHeight / 2);
      
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
  });

  // Fake Decoy Dragon Balls Click / Touch Handler (Kid Goku Prank)
  fakeBalls.forEach(fakeBall => {
    const handleFakeClick = (e) => {
      e.stopPropagation();
      const fakeType = fakeBall.getAttribute('data-fake-ball');
      const clientX = (e.touches && e.touches.length > 0) ? e.touches[0].clientX : (e.clientX || window.innerWidth / 2);
      const clientY = (e.touches && e.touches.length > 0) ? e.touches[0].clientY : (e.clientY || window.innerHeight / 2);
      triggerKidGokuPrank(fakeType, clientX, clientY);
    };

    fakeBall.addEventListener('click', handleFakeClick);
    fakeBall.addEventListener('touchend', (e) => {
      e.preventDefault();
      handleFakeClick(e);
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

/* --- Global Click Animation Engine --- */
function initGlobalClickAnimation() {
  const lightColors = ['#8B5CF6', '#F472B6', '#FBBF24', '#34D399', '#38BDF8'];
  const saiyanColors = ['#FBBF24', '#F59E0B', '#38BDF8', '#EF4444', '#FEF08A'];

  // Debounce flag to prevent double-firing on devices that emit both touch & pointer events
  let lastAnimTime = 0;

  function spawnClickAnimation(x, y) {
    // Throttle: ignore if triggered within 50ms of last animation (prevents double-fire)
    const now = Date.now();
    if (now - lastAnimTime < 50) return;
    lastAnimTime = now;

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

    // 2. Spawning bouncy bursting particles
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
  }

  // Pointer events (works on desktop and most modern mobile browsers)
  document.addEventListener('pointerdown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    spawnClickAnimation(e.clientX, e.clientY);
  });

  // Touch events fallback (ensures mobile compatibility on all browsers)
  document.addEventListener('touchstart', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.touches && e.touches.length > 0) {
      spawnClickAnimation(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  // Click event as final fallback (fires on all mobile browsers after touch)
  document.addEventListener('click', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    spawnClickAnimation(e.clientX, e.clientY);
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

/* ==========================================================================
   Super Saiyan Rosé Goku Black Start Animation & Smooth Transition Controller
   ========================================================================== */
let isIntroFinishing = false;

function initPageIntroAnimation() {
  const overlay = document.getElementById('introOverlay');
  const video = document.getElementById('introVideo');
  const audioBtn = document.getElementById('introAudioBtn');
  const audioIcon = document.getElementById('introAudioIcon');
  const audioText = document.getElementById('introAudioText');
  const skipBtn = document.getElementById('introSkipBtn');
  const progressBar = document.getElementById('introProgressBar');
  const soundPrompt = document.getElementById('introSoundPrompt');
  const replayBtn = document.getElementById('replayIntroBtn');

  if (!overlay || !video) return;

  // Add intro-running class to body for initial staged styling
  document.body.classList.add('page-intro-running');

  // 1. Video Progress updates
  video.addEventListener('timeupdate', () => {
    if (video.duration && progressBar) {
      const progressPercent = (video.currentTime / video.duration) * 100;
      progressBar.style.width = `${progressPercent}%`;

      // Trigger seamless divine transition right as the final Ultra card blast reaches peak (~0.35s before end)
      if (video.currentTime >= video.duration - 0.4 && !isIntroFinishing) {
        finishIntroTransition();
      }
    }
  });

  // 2. Video Ended handler
  video.addEventListener('ended', () => {
    if (!isIntroFinishing) {
      finishIntroTransition();
    }
  });

  // 3. Fallback on load/play error
  video.addEventListener('error', (e) => {
    console.warn('Intro video playback notice:', e);
    finishIntroTransition();
  });

  // 4. Sound Toggle logic
  function toggleAudio(forceState = null) {
    const shouldMute = forceState !== null ? !forceState : !video.muted;
    video.muted = shouldMute;

    if (!video.muted) {
      video.volume = 1.0;
      if (audioBtn) audioBtn.classList.add('audio-active');
      if (audioText) audioText.textContent = 'Mute Audio';
      if (audioIcon) {
        audioIcon.setAttribute('data-lucide', 'volume-2');
        initLucideIcons();
      }
      if (soundPrompt) soundPrompt.classList.add('hidden');
    } else {
      if (audioBtn) audioBtn.classList.remove('audio-active');
      if (audioText) audioText.textContent = 'Enable Audio';
      if (audioIcon) {
        audioIcon.setAttribute('data-lucide', 'volume-x');
        initLucideIcons();
      }
    }
  }

  if (audioBtn) {
    audioBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleAudio();
    });
  }

  // Clicking on overlay anywhere can also toggle audio if muted, or skip if already unmuted
  overlay.addEventListener('click', (e) => {
    if (e.target.closest('.intro-btn') || isIntroFinishing) return;
    if (video.muted) {
      toggleAudio(true);
    }
  });

  // 5. Skip Button handler
  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      finishIntroTransition();
    });
  }

  // 6. Keyboard shortcut: Esc or Space to skip intro
  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('hidden') && !isIntroFinishing) {
      if (e.key === 'Escape' || e.code === 'Space') {
        e.preventDefault();
        finishIntroTransition();
      }
    }
  });

  // 7. Start Video Playback
  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch((err) => {
      console.log('Autoplay started in muted mode or waiting for interaction:', err);
      video.muted = true;
      video.play().catch(() => {
        // If still blocked, user can tap overlay or skip
      });
    });
  }

  // 8. Replay Intro Button in Navbar & Mobile Drawer
  if (replayBtn) {
    replayBtn.addEventListener('click', (e) => {
      e.preventDefault();
      replayIntroAnimation();
    });
  }

  const mobileDrawerIntroBtn = document.getElementById('mobileDrawerIntroBtn');
  if (mobileDrawerIntroBtn) {
    mobileDrawerIntroBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const navMenu = document.getElementById('navMenu');
      const mobileToggle = document.getElementById('mobileMenuToggle');
      if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
      }
      replayIntroAnimation();
    });
  }
}

/**
 * Executes the cinematic smooth transition from the anime intro into the portfolio
 */
function finishIntroTransition() {
  if (isIntroFinishing) return;
  isIntroFinishing = true;

  const overlay = document.getElementById('introOverlay');
  const video = document.getElementById('introVideo');
  const progressBar = document.getElementById('introProgressBar');

  if (progressBar) progressBar.style.width = '100%';

  // Smooth audio fade-down
  if (video && !video.muted) {
    let currentVol = video.volume;
    const fadeInterval = setInterval(() => {
      if (currentVol > 0.15) {
        currentVol -= 0.15;
        video.volume = Math.max(0, currentVol);
      } else {
        clearInterval(fadeInterval);
        video.muted = true;
      }
    }, 50);
  }

  if (overlay) {
    // Step 1: Trigger divine Ki aura blast flash & video expansion
    overlay.classList.add('transitioning');

    // Step 2: Unveil the webpage with smooth glide and spring
    document.body.classList.remove('page-intro-running');
    document.body.classList.add('page-intro-revealed');

    // Step 3: Trigger celebratory arrival sparks & lightning pulse
    setTimeout(() => {
      try {
        if (typeof confetti === 'function') {
          confetti({
            particleCount: 45,
            spread: 70,
            origin: { y: 0.25 },
            colors: ['#EC4899', '#D946EF', '#8B5CF6', '#F59E0B']
          });
        }
      } catch (err) {}
    }, 250);

    // Step 4: Fully hide intro overlay after smooth transition completes
    setTimeout(() => {
      overlay.classList.add('hidden');
      if (video) video.pause();
      isIntroFinishing = false;
    }, 750);
  }
}

/**
 * Replays the intro animation anytime the user clicks "Intro" in the header
 */
function replayIntroAnimation() {
  const overlay = document.getElementById('introOverlay');
  const video = document.getElementById('introVideo');
  const progressBar = document.getElementById('introProgressBar');
  const soundPrompt = document.getElementById('introSoundPrompt');

  if (!overlay || !video) return;

  isIntroFinishing = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });

  overlay.classList.remove('hidden');
  overlay.classList.remove('transitioning');
  document.body.classList.add('page-intro-running');
  document.body.classList.remove('page-intro-revealed');

  if (progressBar) progressBar.style.width = '0%';
  if (soundPrompt) soundPrompt.classList.remove('hidden');

  video.currentTime = 0;
  video.volume = 1.0;

  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch((err) => {
      console.warn('Replay play notice:', err);
    });
  }
}


