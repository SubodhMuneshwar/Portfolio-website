/**
 * Subodh Uttam Muneshwar - Portfolio Interactivity & Render Engine
 * Playful Geometric UI Interaction logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
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
  initNimbusDrag();
  initGlobalClickAnimation();
  initScrollReveal();
  initDbzJokePlaceholders();
  initHeroRotatingWord();
  initPhotoRevealLens();
  initHeroProfileCardInteractive();
  initScrollProgress();
  initHeroParallax();
  initCardSpotlight();
  initCardTilt();
  initMagneticButtons();
  initStatCountUp();
  initFlashcardDecks();
  initStartupQuestBriefing();
  initSoundEffects();
  initDraggableTicker();
  initScouterSummaryConsole();
});

/* ==========================================================================
   Web Audio Synthesizers & Sound Effects (SFX) Engine
   ========================================================================== */
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

const SFX_STORAGE_KEY = 'portfolio_sfx_enabled';

let isSfxEnabledState = (() => {
  try {
    const saved = localStorage.getItem(SFX_STORAGE_KEY);
    return saved !== null ? saved === 'true' : true;
  } catch (e) {
    return true;
  }
})();

function isSoundEffectsEnabled() {
  return isSfxEnabledState;
}
window.isSoundEffectsEnabled = isSoundEffectsEnabled;

function setSoundEffectsEnabled(enabled, playConfirmation = false) {
  isSfxEnabledState = !!enabled;
  try {
    localStorage.setItem(SFX_STORAGE_KEY, isSfxEnabledState ? 'true' : 'false');
  } catch (e) {}

  updateSfxUI();

  if (isSfxEnabledState && playConfirmation) {
    playSfxChirp();
  }
}
window.setSoundEffectsEnabled = setSoundEffectsEnabled;

window.toggleSoundEffects = function() {
  setSoundEffectsEnabled(!isSfxEnabledState, true);
};

function playSfxChirp() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, now); // D5
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.18);
  } catch (e) {}
}

function updateSfxUI() {
  const toggleBtns = document.querySelectorAll('.sfx-toggle-btn, #sfxToggleBtn');
  toggleBtns.forEach(btn => {
    btn.setAttribute('aria-checked', isSfxEnabledState ? 'true' : 'false');
    btn.classList.toggle('sfx-active', isSfxEnabledState);
    btn.classList.toggle('sfx-muted', !isSfxEnabledState);
    btn.title = isSfxEnabledState
      ? "Sound Effects: ON (Click or press 'M' to Mute)"
      : "Sound Effects: OFF (Click or press 'M' to Unmute)";

    const iconOn = btn.querySelector('.sfx-icon-on');
    const iconOff = btn.querySelector('.sfx-icon-off');
    const srStatus = btn.querySelector('.sfx-sr-status');

    if (iconOn) iconOn.style.display = isSfxEnabledState ? 'inline-block' : 'none';
    if (iconOff) iconOff.style.display = isSfxEnabledState ? 'none' : 'inline-block';
    if (srStatus) srStatus.textContent = isSfxEnabledState ? 'Sound ON' : 'Sound OFF';
  });

  // Also update Goku widget chip if present
  const gokuSfxIcons = document.querySelectorAll('.goku-sfx-icon');
  const gokuSfxTexts = document.querySelectorAll('.goku-sfx-text');
  gokuSfxTexts.forEach(t => { t.textContent = isSfxEnabledState ? 'Sound: ON' : 'Sound: OFF'; });
  gokuSfxIcons.forEach(i => {
    i.setAttribute('data-lucide', isSfxEnabledState ? 'volume-2' : 'volume-x');
  });
  if (window.lucide && gokuSfxIcons.length) {
    try { window.lucide.createIcons(); } catch(e){}
  }
}

function initSoundEffects() {
  updateSfxUI();
}

function playWebAudioTone(freq=440, type='sine', duration=0.15, vol=0.15) {
  if (!isSoundEffectsEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
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

/* --- Keyboard Shortcuts --- */
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeShenronModal();
      closeDragonRadarModal();
      closeKidGokuPrankModal();
      closeQuestBriefingModal();
    } else if (e.key === '?' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      openQuestBriefingModal();
    } else if ((e.key === 'm' || e.key === 'M') && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      window.toggleSoundEffects();
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
        <i data-lucide="${stat.icon}" style="width: 22px; height: 22px; stroke-width: 2.2;"></i>
      </div>
      ${stat.category ? `<div class="stat-category">${stat.category}</div>` : ''}
      <div class="stat-value">${stat.value}</div>
      <div class="stat-label">${stat.label}</div>
      ${stat.sublabel ? `<div class="stat-sublabel">${stat.sublabel}</div>` : ''}
    </div>
  `).join('');

  initLucideIcons();
}

/* ==========================================================================
   Goku's 3D Spirit Bomb (Genki Dama) Tech Sphere Engine
   Interactive 3D Fibonacci Sphere • Canvas Energy Core • Scouter Dossier HUD
   ========================================================================== */
function initSpiritBomb() {
  const arena = document.getElementById('spiritArena');
  const canvas = document.getElementById('spiritCoreCanvas');
  const nodesLayer = document.getElementById('spiritNodesLayer');
  const compactHud = document.getElementById('spiritCompactHud');
  const tooltip = document.getElementById('spiritHoverTooltip');
  const filterHud = document.getElementById('spiritFilterHud');
  const rotateToggleBtn = document.getElementById('spiritRotateToggle');
  const resetBtn = document.getElementById('spiritResetView');
  const rotateIcon = document.getElementById('spiritRotateIcon');
  const rotateText = document.getElementById('spiritRotateText');
  const totalCountEl = document.getElementById('spiritTotalCount');
  const catalogHeading = document.getElementById('catalogHeading');
  const catalogCountPill = document.getElementById('catalogCountPill');
  const catalogChipsGrid = document.getElementById('catalogChipsGrid');

  if (!arena || !canvas || !nodesLayer) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const playKiSound = (freq = 440, type = 'sine', duration = 0.08, vol = 0.08) => {
    if (typeof playWebAudioTone === 'function') {
      playWebAudioTone(freq, type, duration, vol);
    }
  };
  const playSynthTone = playKiSound;

  // Retrieve skill nodes from portfolioData
  const skillsData = (typeof portfolioData !== 'undefined' && portfolioData.spiritBombSkills && portfolioData.spiritBombSkills.length)
    ? portfolioData.spiritBombSkills
    : [];

  if (!skillsData.length) return;

  if (totalCountEl) totalCountEl.textContent = skillsData.length;

  const N = skillsData.length;
  let activeSkillId = skillsData[0].id;
  let activeFilter = 'all';

  // Spirit Bomb Ki Gathering Animation on Scroll
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let isGathering = false;
  let gatheringStartTime = null;
  let gatheringComplete = prefersReducedMotion;
  let hasTriggeredScrollGather = prefersReducedMotion;
  const GATHER_STAGGER = 65; // ms between each skill taking flight
  const GATHER_TRAVEL_DURATION = 680; // ms for individual Ki mote to travel inward & settle

  // 3D Sphere geometry with uniform spherical Fibonacci distribution
  const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // Golden Angle (~2.3999632 rad)
  const sphereNodes = skillsData.map((skill, i) => {
    // Distribute uniformly across spherical surface with vertical Y pole
    const y = 1 - 2 * (i + 0.5) / N; // vertical pole +1 (top) to -1 (bottom)
    const rAtY = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = i * goldenAngle;
    const x = Math.cos(theta) * rAtY;
    const z = Math.sin(theta) * rAtY;

    return {
      skill,
      origX: x,
      origY: y,
      origZ: z,
      el: null,
      x: 0,
      y: 0,
      z: 0,
      scale: 1,
      screenX: 0,
      screenY: 0,
      curScreenX: 0,
      curScreenY: 0,
      arrived: false,
      gathering: false
    };
  });

  // Render DOM nodes into nodesLayer with icon + small name label below
  nodesLayer.innerHTML = '';
  sphereNodes.forEach((nodeItem) => {
    const el = document.createElement('div');
    el.className = 'spirit-tech-node';
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.setAttribute('aria-label', `${nodeItem.skill.name} - ${nodeItem.skill.level}`);
    el.style.setProperty('--node-color', nodeItem.skill.brandColor || '#38bdf8');

    // Initially hide until gathering sequence starts (unless user prefers reduced motion)
    if (!prefersReducedMotion) {
      el.style.opacity = '0';
      el.style.pointerEvents = 'none';
    }

    const shortLabelMap = {
      'CNN Deep Learning': 'CNNs',
      'RESTful APIs & Microservices': 'REST APIs',
      'Active Directory & LDAP': 'LDAP / AD',
      'Linux & Bash Scripting': 'Linux',
      'Oracle Database': 'Oracle DB',
      'Git & GitHub': 'Git',
      'Scikit-Learn': 'Scikit',
      'Tailwind CSS': 'Tailwind'
    };
    const displayLabel = nodeItem.skill.shortName || shortLabelMap[nodeItem.skill.name] || nodeItem.skill.name;

    el.innerHTML = `
      <div class="spirit-node-icon-circle">
        ${nodeItem.skill.svgIcon || `<span style="font-weight:900;font-size:12px;">${nodeItem.skill.name.slice(0, 2)}</span>`}
      </div>
      <span class="spirit-node-label">${displayLabel}</span>
    `;

    // Event listeners for node: small details on hover & click
    el.addEventListener('mouseenter', () => {
      showTooltip(nodeItem);
      renderCompactHud(nodeItem.skill);
      playSynthTone(580, 'sine', 0.03, 0.04);
    });

    el.addEventListener('mouseleave', () => {
      hideTooltip();
      const currentActive = sphereNodes.find(n => n.skill.id === activeSkillId);
      if (currentActive) renderCompactHud(currentActive.skill);
    });

    el.addEventListener('click', (e) => {
      e.stopPropagation();
      selectSkill(nodeItem.skill.id, true);
    });

    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectSkill(nodeItem.skill.id, true);
      }
    });

    nodeItem.el = el;
    nodesLayer.appendChild(el);
  });

  // Ki Gathering Animation Orchestration Helpers
  function startKiGatheringSequence(force = false) {
    if (prefersReducedMotion) {
      gatheringComplete = true;
      sphereNodes.forEach(item => { item.arrived = true; });
      return;
    }
    if (isGathering && !force) return;

    isGathering = true;
    gatheringComplete = false;
    gatheringStartTime = performance.now();

    impactRings = [];
    coreFlare = 1.0;

    sphereNodes.forEach(item => {
      item.arrived = false;
      item.gathering = false;
      if (item.el) {
        item.el.classList.remove('is-ki-inflow');
        const circle = item.el.querySelector('.spirit-node-icon-circle');
        if (circle) circle.classList.remove('ki-arrived-pulse');
        item.el.style.opacity = '0';
        item.el.style.pointerEvents = 'none';
      }
    });

    const gokuWrapper = document.getElementById('spiritGokuWrapper');
    if (gokuWrapper) gokuWrapper.classList.add('is-charging');
    arena.classList.add('is-gathering');
    arena.classList.remove('is-charged');

    animateDossierPowerLevel();
    playSynthTone(220, 'sine', 0.28, 0.04);
  }

  function triggerSpiritBombFullChargePulse() {
    arena.classList.remove('is-gathering');
    arena.classList.add('is-charged');
    const gokuWrapper = document.getElementById('spiritGokuWrapper');
    if (gokuWrapper) gokuWrapper.classList.remove('is-charging');

    playSynthTone(587.33, 'triangle', 0.45, 0.04);

    setTimeout(() => {
      arena.classList.remove('is-charged');
    }, 1200);
  }

  function animateDossierPowerLevel() {
    if (!compactHud) return;
    const gaugeFill = compactHud.querySelector('.dossier-gauge-fill');
    if (gaugeFill) {
      gaugeFill.style.transition = 'none';
      gaugeFill.style.width = '0%';
      setTimeout(() => {
        gaugeFill.style.transition = 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
        const curSkill = sphereNodes.find(n => n.skill.id === activeSkillId)?.skill || skillsData[0];
        gaugeFill.style.width = `${curSkill.powerPercent || 90}%`;
      }, 350);
    }
  }

  // Scroll Observer: Trigger Spirit Bomb energy gathering when user scrolls into view
  const skillsSection = document.getElementById('skills') || arena.closest('.section');
  if (skillsSection && !prefersReducedMotion) {
    const gatherObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasTriggeredScrollGather) {
          hasTriggeredScrollGather = true;
          startKiGatheringSequence();
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });
    gatherObserver.observe(skillsSection);
  } else {
    hasTriggeredScrollGather = true;
    startKiGatheringSequence();
  }

  // Rotation & Motion State
  let rotX = -0.15;
  let rotY = 0;
  let velX = 0;
  let velY = 0;
  let autoRotate = true;
  const baseRotSpeed = 0.0035;
  let isDragging = false;
  let lastPointerX = 0;
  let lastPointerY = 0;
  let targetRotX = null;
  let targetRotY = null;

  // Canvas Energy Particles & Lightning Flares
  const particles = [];
  const PARTICLE_COUNT = 36;
  for (let p = 0; p < PARTICLE_COUNT; p++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: canvas.height * 0.6 + Math.random() * (canvas.height * 0.4),
      speedY: 0.8 + Math.random() * 1.6,
      speedX: (Math.random() - 0.5) * 0.6,
      size: 1.2 + Math.random() * 2.5,
      alpha: 0.2 + Math.random() * 0.6
    });
  }

  // Procedural Lightning Sparks & Ki Vortex Effects
  let lightningArcs = [];
  let lightningTimer = 0;
  let currentCoreR = 135;
  let impactRings = [];
  let coreFlare = 1.0;

  function generateLightning() {
    lightningArcs = [];
    const count = 2 + Math.floor(Math.random() * 3);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const r = currentCoreR;
    for (let k = 0; k < count; k++) {
      const startAngle = Math.random() * Math.PI * 2;
      const arcLength = (Math.random() * 0.8 + 0.3) * (Math.random() > 0.5 ? 1 : -1);
      const steps = 7;
      const points = [];
      for (let s = 0; s <= steps; s++) {
        const frac = s / steps;
        const currentAngle = startAngle + arcLength * frac;
        const jitter = (Math.random() - 0.5) * 22;
        const px = cx + Math.cos(currentAngle) * (r + jitter);
        const py = cy + Math.sin(currentAngle) * (r + jitter);
        points.push({ x: px, y: py });
      }
      lightningArcs.push({
        points,
        alpha: 0.7 + Math.random() * 0.3,
        width: 1.2 + Math.random() * 1.5
      });
    }
  }

  // Pointer Interaction for 3D Dragging
  arena.addEventListener('pointerdown', (e) => {
    if (e.target.closest('.spirit-stage-controls') || e.target.closest('.spirit-filter-hud')) return;

    isDragging = true;
    lastPointerX = e.clientX;
    lastPointerY = e.clientY;
    velX = 0;
    velY = 0;
    targetRotX = null;
    targetRotY = null;
    arena.classList.add('is-dragging');
    try {
      arena.setPointerCapture(e.pointerId);
    } catch(err) {}
  });

  arena.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - lastPointerX;
    const dy = e.clientY - lastPointerY;
    lastPointerX = e.clientX;
    lastPointerY = e.clientY;

    const dragFactor = 0.0055;
    rotY += dx * dragFactor;
    rotX -= dy * dragFactor;

    // Clamp pitch to avoid gimbal flip
    rotX = Math.max(-Math.PI * 0.42, Math.min(Math.PI * 0.42, rotX));

    velY = dx * dragFactor * 0.75;
    velX = -dy * dragFactor * 0.75;
  });

  const endDrag = (e) => {
    if (!isDragging) return;
    isDragging = false;
    arena.classList.remove('is-dragging');
    try {
      if (arena.hasPointerCapture && arena.hasPointerCapture(e.pointerId)) {
        arena.releasePointerCapture(e.pointerId);
      }
    } catch(err) {}
  };

  arena.addEventListener('pointerup', endDrag);
  arena.addEventListener('pointercancel', endDrag);

  // Control Buttons
  if (rotateToggleBtn) {
    rotateToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      autoRotate = !autoRotate;
      targetRotX = null;
      targetRotY = null;
      if (autoRotate) {
        if (rotateIcon) rotateIcon.setAttribute('data-lucide', 'pause');
        if (rotateText) rotateText.textContent = 'Orbiting';
      } else {
        if (rotateIcon) rotateIcon.setAttribute('data-lucide', 'play');
        if (rotateText) rotateText.textContent = 'Paused';
      }
      initLucideIcons();
      playSynthTone(520, 'sine', 0.04, 0.05);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      targetRotX = -0.15;
      targetRotY = 0;
      velX = 0;
      velY = 0;
      playSynthTone(440, 'triangle', 0.06, 0.06);
      startKiGatheringSequence(true);
    });
  }

  // Multi-Category Intelligence Mapping
  const categorySkillMap = {
    'languages': ['python', 'csharp', 'javascript', 'php'],
    'backend': ['csharp', 'aspnet', 'flask', 'php', 'sap', 'activedirectory'],
    'ai-ml': ['python', 'opencv', 'cnn', 'numpy', 'pandas', 'scikitlearn'],
    'frontend': ['html5', 'css3', 'tailwind', 'bootstrap', 'javascript', 'figma', 'canva'],
    'database': ['mysql', 'oracle', 'azure', 'aws'],
    'devops': ['git', 'docker', 'linux', 'azure', 'aws']
  };

  function skillMatchesCategory(skill, cat) {
    if (!skill) return false;
    if (cat === 'all') return true;
    if (categorySkillMap[cat]) {
      return categorySkillMap[cat].includes(skill.id);
    }
    return skill.category === cat;
  }

  // Category Energy Filter HUD Logic
  if (filterHud) {
    const filterButtons = filterHud.querySelectorAll('.spirit-filter-btn');
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-cat') || 'all';
        activeFilter = cat;

        filterButtons.forEach(b => {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');

        // Update node dimmed classes
        sphereNodes.forEach((nodeItem) => {
          if (skillMatchesCategory(nodeItem.skill, activeFilter)) {
            nodeItem.el.classList.remove('is-dimmed');
          } else {
            nodeItem.el.classList.add('is-dimmed');
          }
        });

        // Re-render Quick-Select Category Arsenal for this category
        renderCategoryCatalog(activeFilter);

        // If currently active skill is dimmed by filter, select first matching skill
        const currentActive = sphereNodes.find(n => n.skill.id === activeSkillId);
        if (currentActive && activeFilter !== 'all' && !skillMatchesCategory(currentActive.skill, activeFilter)) {
          const firstMatching = sphereNodes.find(n => skillMatchesCategory(n.skill, activeFilter));
          if (firstMatching) {
            selectSkill(firstMatching.skill.id, true);
          }
        }

        playSynthTone(660, 'sine', 0.05, 0.05);
      });
    });
  }

  // Quick-Select Category Arsenal Catalog
  const categoryNames = {
    'all': 'All Technologies',
    'languages': 'Languages',
    'backend': 'Backend & Systems',
    'ai-ml': 'AI, ML & Vision',
    'frontend': 'Frontend & UI',
    'database': 'Databases & Cloud',
    'devops': 'DevOps & Tooling'
  };

  function renderCategoryCatalog(cat = 'all') {
    if (!catalogChipsGrid) return;
    const filtered = (cat === 'all')
      ? skillsData
      : skillsData.filter(s => skillMatchesCategory(s, cat));

    if (catalogHeading) {
      catalogHeading.textContent = categoryNames[cat] || 'Tools & Stack';
    }
    if (catalogCountPill) {
      catalogCountPill.textContent = `${filtered.length} Tools`;
    }

    const chipLabelMap = {
      'CNN Deep Learning': 'CNNs',
      'Active Directory & LDAP': 'Active Directory',
      'Linux & Bash Scripting': 'Linux',
      'Oracle Database': 'Oracle DB',
      'Git & GitHub': 'Git',
      'Microsoft Azure': 'Azure',
      'Amazon Web Services (AWS)': 'AWS',
      'SAP ERP & NCo 3.0': 'SAP ERP'
    };

    catalogChipsGrid.innerHTML = '';
    filtered.forEach(skill => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = `catalog-skill-chip ${skill.id === activeSkillId ? 'is-active' : ''}`;
      chip.setAttribute('data-skill-id', skill.id);
      chip.style.setProperty('--chip-accent', skill.brandColor || '#38bdf8');
      chip.title = `${skill.name} • ${skill.level}`;

      const displayLabel = chipLabelMap[skill.name] || skill.name;

      chip.innerHTML = `
        <span class="catalog-chip-icon">${skill.svgIcon || ''}</span>
        <span class="catalog-chip-label">${displayLabel}</span>
      `;

      chip.addEventListener('click', (e) => {
        e.preventDefault();
        selectSkill(skill.id, true);
      });

      catalogChipsGrid.appendChild(chip);
    });
  }

  function updateCatalogActiveItem(skillId) {
    if (!catalogChipsGrid) return;
    const chips = catalogChipsGrid.querySelectorAll('.catalog-skill-chip');
    chips.forEach(c => {
      if (c.getAttribute('data-skill-id') === skillId) {
        c.classList.add('is-active');
        try {
          c.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
        } catch(e) {}
      } else {
        c.classList.remove('is-active');
      }
    });
  }

  // Tooltip Helper (Directly follows node on 3D sphere)
  function showTooltip(nodeItem) {
    if (!tooltip) return;
    const catEl = document.getElementById('spiritTooltipCat');
    const levelEl = document.getElementById('spiritTooltipLevel');
    const titleEl = document.getElementById('spiritTooltipTitle');
    const descEl = document.getElementById('spiritTooltipDesc');

    if (catEl) catEl.textContent = nodeItem.skill.categoryLabel || nodeItem.skill.category;
    if (levelEl) levelEl.textContent = `${nodeItem.skill.level} • ${nodeItem.skill.powerLevel || (nodeItem.skill.powerPercent + '%')}`;
    if (titleEl) titleEl.textContent = nodeItem.skill.name;
    if (descEl) descEl.textContent = nodeItem.skill.description || 'Click to lock & view specs';

    tooltip.style.left = `${nodeItem.screenX}px`;
    tooltip.style.top = `${nodeItem.screenY - 32}px`;
    tooltip.style.opacity = '1';
    tooltip.setAttribute('aria-hidden', 'false');
  }

  function hideTooltip() {
    if (!tooltip) return;
    tooltip.style.opacity = '0';
    tooltip.setAttribute('aria-hidden', 'true');
  }

  // Select Skill & Smoothly Bring to Front
  function selectSkill(skillId, smoothlyRotate = true) {
    activeSkillId = skillId;
    const targetNode = sphereNodes.find(n => n.skill.id === skillId);
    if (!targetNode) return;

    // Update active class on nodes
    sphereNodes.forEach(n => {
      if (n.skill.id === skillId) {
        n.el.classList.add('is-active');
      } else {
        n.el.classList.remove('is-active');
      }
    });

    // Update Category Arsenal active chip
    updateCatalogActiveItem(skillId);

    if (smoothlyRotate) {
      // Calculate target rotation to bring this node directly front-facing (z = 1)
      const wantedRotY = -Math.atan2(targetNode.origX, targetNode.origZ);
      let diffY = (wantedRotY - rotY) % (Math.PI * 2);
      if (diffY > Math.PI) diffY -= Math.PI * 2;
      if (diffY < -Math.PI) diffY += Math.PI * 2;
      targetRotY = rotY + diffY;

      const wantedRotX = Math.max(-0.35, Math.min(0.35, Math.asin(Math.max(-0.85, Math.min(0.85, targetNode.origY)))));
      targetRotX = wantedRotX;

      velX = 0;
      velY = 0;

      // Play Saiyan Ki lock-on SFX
      playSynthTone(440, 'triangle', 0.08, 0.08);
      setTimeout(() => playSynthTone(880, 'sine', 0.12, 0.07), 40);
    }

    renderCompactHud(targetNode.skill);
  }

  // Concise Micro-Tags mapping for all 26 skills (keeps UI minimal and simple)
  const skillMicroTags = {
    python: ['CNN Pipelines', 'OpenCV Vision', 'Flask APIs', 'NumPy ETL'],
    csharp: ['SAP NCo 3.0', 'Active Directory', 'Oracle DB', 'RBAC Security'],
    aspnet: ['Enterprise APIs', 'T-Code Auth', 'Audit Logging', 'SAP BAPI'],
    flask: ['AI Inference', 'File Streaming', 'Blueprints', 'CORS APIs'],
    opencv: ['Face Recognition', 'CLAHE Filters', 'Frame Capture', 'Biometrics'],
    cnn: ['Retinal Scanning', 'DenseNet121', 'Transfer Learning', '92% Acc'],
    numpy: ['Vectorized Math', 'Tensor Reshaping', 'Pixel Normalization', 'Fast ETL'],
    pandas: ['Data Cleaning', 'Diagnostic Splits', 'Attendance Logs', 'Analytics'],
    scikitlearn: ['Ensemble Models', 'Cross-Validation', 'ROC-AUC', 'Feature Scaling'],
    javascript: ['ES6+ Syntax', 'Async / Await', 'DOM Engines', 'Physics RAF'],
    html5: ['Semantic HTML5', 'WCAG AA Accessibility', 'Canvas 2D', 'Responsive'],
    css3: ['CSS Grid & Flexbox', 'Glassmorphism', '3D Transforms', 'Animations'],
    tailwind: ['Utility-First CSS', 'Design Tokens', 'Modern UI', 'Responsive'],
    bootstrap: ['Responsive Grid', 'Admin Portals', 'Modal Forms', 'Tables'],
    mysql: ['ACID Transactions', 'Relational Schemas', 'Foreign Keys', 'Fast Queries'],
    oracle: ['Enterprise DB', 'PL/SQL Packages', 'High Concurrency', 'Audit Trail'],
    sap: ['SAP NCo 3.0', 'RFC Function Modules', 'BAPI Provisioning', 'T-Code Matrix'],
    activedirectory: ['LDAP Directory', 'User Auth', 'Security Groups', 'Enterprise SSO'],
    git: ['Branching Workflows', 'Rebasing', 'GitHub Actions', 'Code Review'],
    docker: ['Containerization', 'Microservices', 'Dockerfiles', 'Reproducibility'],
    azure: ['App Services', 'Azure SQL', 'Entra ID Federation', 'Cloud Hosting'],
    aws: ['EC2 Compute', 'S3 Object Storage', 'IAM Policies', 'Cloud Scale'],
    linux: ['Bash Automation', 'Systemd Daemons', 'Cron Jobs', 'SSH Security'],
    php: ['Server-Side Web', 'PDO MySQL', 'REST API Integration', 'Session Auth'],
    figma: ['UI/UX Wireframes', 'Design Systems', 'Interactive Prototypes', 'Auto-Layout'],
    canva: ['Graphic Branding', 'Slide Decks', 'Thumbnails', 'Visual Assets']
  };

  // Render Clean & Simple Scouter Telemetry Dossier Card (No Image)
  function renderCompactHud(skill) {
    if (!compactHud || !skill) return;

    const brandColor = skill.brandColor || '#38bdf8';
    compactHud.style.setProperty('--active-accent', brandColor);

    const tags = skillMicroTags[skill.id] || (skill.keyCapabilities ? skill.keyCapabilities.slice(0, 3).map(c => c.split(' ').slice(0, 2).join(' ')) : []);

    const projectChipHtml = (skill.projects && skill.projects.length)
      ? `
        <button type="button" class="hud-project-chip" data-project-ref="${skill.projects[0].id}" title="Jump to ${skill.projects[0].name}">
          <i data-lucide="arrow-up-right" style="width: 12px; height: 12px;"></i>
          <span>${skill.projects[0].name}</span>
        </button>
      `
      : '';

    const expShort = skill.experience ? skill.experience.split('•')[0].trim() : '';
    const expPill = expShort
      ? `
        <div class="dossier-metric-pill" title="Experience Level">
          <i data-lucide="clock" style="width: 12px; height: 12px; color: ${brandColor};"></i>
          <span>${expShort}</span>
        </div>
      `
      : '';

    const filteredList = skillsData.filter(s => skillMatchesCategory(s, activeFilter));
    const currentIndex = filteredList.findIndex(s => s.id === skill.id);
    const posText = currentIndex >= 0 ? `${currentIndex + 1} / ${filteredList.length}` : '';

    compactHud.innerHTML = `
      <div class="dossier-header">
        <div class="dossier-icon-badge" style="border-color: ${brandColor}; box-shadow: 0 0 16px ${brandColor}44; color: ${brandColor};">
          ${skill.svgIcon || ''}
        </div>
        <div class="dossier-identity">
          <div class="dossier-meta-top">
            <span class="dossier-cat-tag" style="color: ${brandColor}; border-color: ${brandColor}55;">${skill.categoryLabel || skill.category}</span>
            <span class="dossier-level-badge">${skill.level || 'Proficient'}</span>
          </div>
          <h3 class="dossier-skill-name">${skill.name}</h3>
        </div>
        <div class="dossier-power-pill" title="Ki Power Rating">
          <i data-lucide="zap" style="width: 13px; height: 13px; color: ${brandColor};"></i>
          <span class="dossier-power-val">${skill.powerLevel || (skill.powerPercent + '%')}</span>
        </div>
      </div>

      <!-- Scouter Ki Power Meter Bar -->
      <div class="dossier-power-gauge" title="${skill.powerPercent || 90}% Mastery">
        <div class="dossier-gauge-track">
          <div class="dossier-gauge-fill" style="width: ${skill.powerPercent || 90}%; background: linear-gradient(90deg, ${brandColor}88, ${brandColor});"></div>
        </div>
        <span class="dossier-gauge-label">${skill.powerPercent || 90}% Power</span>
      </div>

      <!-- Minimal Micro Highlights -->
      <div class="dossier-micro-tags">
        ${tags.slice(0, 4).map(tag => `
          <span class="dossier-tag-pill">
            <span class="tag-dot" style="background: ${brandColor}; box-shadow: 0 0 6px ${brandColor};"></span>
            <span>${tag}</span>
          </span>
        `).join('')}
      </div>

      ${(expPill || projectChipHtml) ? `
      <!-- Sleek Footer Telemetry Row -->
      <div class="dossier-footer-row">
        ${expPill}
        ${projectChipHtml}
      </div>
      ` : ''}

      <!-- Ultra-Minimal Scouter Navigation Stepper -->
      <div class="dossier-stepper-row">
        <button type="button" class="dossier-step-btn" id="dossierPrevBtn" aria-label="Previous Tool">
          <i data-lucide="chevron-left" style="width: 14px; height: 14px;"></i>
          <span>Prev</span>
        </button>
        <span class="dossier-step-counter">${posText}</span>
        <button type="button" class="dossier-step-btn" id="dossierNextBtn" aria-label="Next Tool">
          <span>Next</span>
          <i data-lucide="chevron-right" style="width: 14px; height: 14px;"></i>
        </button>
      </div>
    `;

    // Hook up project navigation clicks
    compactHud.querySelectorAll('[data-project-ref]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const projId = btn.getAttribute('data-project-ref');
        navigateToProject(projId);
      });
    });

    // Hook up scouter previous / next tool stepper
    const prevBtn = compactHud.querySelector('#dossierPrevBtn');
    const nextBtn = compactHud.querySelector('#dossierNextBtn');
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        cycleSkill(-1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        cycleSkill(1);
      });
    }

    initLucideIcons();
  }

  function cycleSkill(direction = 1) {
    const list = skillsData.filter(s => skillMatchesCategory(s, activeFilter));
    if (!list.length) return;
    const currentIndex = list.findIndex(s => s.id === activeSkillId);
    let nextIndex = (currentIndex + direction) % list.length;
    if (nextIndex < 0) nextIndex = list.length - 1;
    selectSkill(list[nextIndex].id, true);
  }

  // Smooth Navigation to Featured Projects
  function navigateToProject(projId) {
    const projectsSection = document.getElementById('projects');
    if (!projectsSection) return;

    // Reset filter to 'all' so target project is visible
    const allFilterBtn = document.querySelector('.filter-btn[data-filter="all"]');
    if (allFilterBtn && !allFilterBtn.classList.contains('active')) {
      allFilterBtn.click();
    }

    projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    setTimeout(() => {
      // Find matching card or open modal if available
      const card = document.querySelector(`[data-project-id="${projId}"]`) ||
                   document.querySelector(`[data-project-id*="${projId.slice(0, 5)}"]`);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.style.transition = 'box-shadow 0.4s ease, transform 0.4s ease';
        card.style.boxShadow = '0 0 40px #38bdf8, 0 0 80px rgba(56, 189, 248, 0.6)';
        card.style.transform = 'scale(1.03)';
        setTimeout(() => {
          card.style.boxShadow = '';
          card.style.transform = '';
        }, 1800);
      } else if (typeof window.openProjectModal === 'function') {
        window.openProjectModal(projId);
      }
    }, 550);
  }

  // Expose global selector
  window.selectSpiritSkill = (skillId) => selectSkill(skillId, true);

  // Initial renders
  renderCompactHud(skillsData[0]);
  renderCategoryCatalog('all');
  updateCatalogActiveItem(skillsData[0].id);

  // Main RAF Animation Loop
  let lastTime = performance.now();

  function animate(now) {
    lastTime = now;

    // Auto-rotation / Target lerping / Momentum
    if (targetRotX !== null && targetRotY !== null) {
      rotX += (targetRotX - rotX) * 0.085;
      rotY += (targetRotY - rotY) * 0.085;
      if (Math.abs(targetRotX - rotX) < 0.001 && Math.abs(targetRotY - rotY) < 0.001) {
        rotX = targetRotX;
        rotY = targetRotY;
        targetRotX = null;
        targetRotY = null;
      }
    } else if (isDragging) {
      // While dragging, rotation updated directly by pointermove
    } else {
      // Momentum velocity damping
      rotX += velX;
      rotY += velY;
      velX *= 0.92;
      velY *= 0.92;
      if (Math.abs(velX) < 0.0001) velX = 0;
      if (Math.abs(velY) < 0.0001) velY = 0;

      // Base auto rotation when not dragging
      if (autoRotate) {
        rotY += baseRotSpeed;
      }
    }

    // Geometry Calculation
    const arenaWidth = arena.clientWidth || 540;
    const isMobile = arenaWidth < 640;
    const centerX = arenaWidth / 2;
    const centerY = isMobile ? 165 : 195; // Center of Spirit Bomb sphere aligned with Goku

    // Responsive radius: adapt smoothly to container width
    const R = isMobile
      ? Math.max(115, Math.min(140, arenaWidth * 0.35))
      : Math.max(145, Math.min(175, arenaWidth * 0.32));

    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);

    // Update 3D position of each node with Ki Gathering entrance physics
    let allArrived = true;

    for (let i = 0; i < N; i++) {
      const item = sphereNodes[i];
      let distMult = 1.0;
      let nodeScale = 1.0;
      let nodeOpacity = 1.0;
      let spiralAngle = 0;
      let ySkyOffset = 0;

      if (!gatheringComplete) {
        if (!hasTriggeredScrollGather || gatheringStartTime === null) {
          allArrived = false;
          if (item.el) {
            item.el.style.opacity = '0';
            item.el.style.pointerEvents = 'none';
          }
          continue;
        }

        const nodeDelay = i * GATHER_STAGGER;
        const elapsed = now - (gatheringStartTime + nodeDelay);

        if (elapsed < 0) {
          allArrived = false;
          item.gathering = false;
          if (item.el) {
            item.el.classList.remove('is-ki-inflow');
            item.el.style.opacity = '0';
            item.el.style.pointerEvents = 'none';
          }
          continue;
        } else if (elapsed < GATHER_TRAVEL_DURATION) {
          allArrived = false;
          item.gathering = true;
          if (item.el && !item.el.classList.contains('is-ki-inflow')) {
            item.el.classList.add('is-ki-inflow');
          }

          const t = elapsed / GATHER_TRAVEL_DURATION;

          // Gravitational suction physics: acceleration inward followed by orbital settle
          // Phase 1 (0 -> 0.85): Accretion acceleration inward toward the Genki Dama
          // Phase 2 (0.85 -> 1.0): Orbital capture and elastic cushion settling onto sphere
          let pullProgress;
          if (t < 0.85) {
            const p = t / 0.85;
            pullProgress = Math.pow(p, 2.2) * 0.88;
          } else {
            const p = (t - 0.85) / 0.15;
            pullProgress = 0.88 + (1 - Math.pow(1 - p, 3)) * 0.12;
          }

          const startDist = 3.8 + (i % 5) * 0.45; // Outer cosmic perimeter
          distMult = 1.0 + (1.0 - pullProgress) * (startDist - 1.0);

          // Conservation of angular momentum: spiral swirl tightens as radius shrinks
          const swirlDir = (i % 2 === 0) ? 1 : -1;
          spiralAngle = Math.pow(1.0 - pullProgress, 1.4) * (2.8 + (i % 4) * 0.35) * swirlDir;

          // Funnel inward vertically: gathering down from celestial sky and up from earth
          const verticalOrigin = (i % 3 === 0) ? 0.75 : ((i % 3 === 1) ? -0.45 : 0.35);
          ySkyOffset = (1.0 - pullProgress) * verticalOrigin;

          // Scale: starts as concentrated Ki core (0.28), surges with energy (1.32), settles to 1.0
          if (t < 0.85) {
            nodeScale = 0.28 + (t / 0.85) * 1.04;
          } else {
            const settleP = (t - 0.85) / 0.15;
            nodeScale = 1.32 - settleP * 0.32;
          }

          nodeOpacity = Math.min(1.0, t * 3.2);

          // Impact & Absorption on sphere surface
          if (t >= 0.92 && !item.arrived) {
            item.arrived = true;
            if (item.el) {
              item.el.classList.remove('is-ki-inflow');
              const iconCircle = item.el.querySelector('.spirit-node-icon-circle');
              if (iconCircle) {
                iconCircle.classList.add('ki-arrived-pulse');
                setTimeout(() => {
                  iconCircle.classList.remove('ki-arrived-pulse');
                }, 500);
              }
            }
            // Spawn expanding energetic Ki impact ripple on canvas
            const nodeBrandColor = item.skill.brandColor || (isRose ? '#FF2E97' : '#38BDF8');
            impactRings.push({
              x: item.curScreenX || centerX,
              y: item.curScreenY || centerY,
              r: 6,
              maxR: 38,
              alpha: 0.85,
              color: nodeBrandColor
            });
            // Momentary surge in Spirit Bomb core luminosity
            coreFlare = Math.min(1.35, coreFlare + 0.035);

            playKiSound(320 + (i / N) * 440, 'sine', 0.04, 0.015);
          }
        } else {
          item.arrived = true;
          item.gathering = false;
          if (item.el) {
            item.el.classList.remove('is-ki-inflow');
          }
          distMult = 1.0;
          nodeScale = 1.0;
          nodeOpacity = 1.0;
          spiralAngle = 0;
          ySkyOffset = 0;
        }
      } else {
        item.arrived = true;
        item.gathering = false;
      }

      // Rotate with incoming spiral angle
      const cosSp = Math.cos(spiralAngle);
      const sinSp = Math.sin(spiralAngle);
      const baseOrigX = item.origX * cosSp - item.origZ * sinSp;
      const baseOrigZ = item.origX * sinSp + item.origZ * cosSp;
      const baseOrigY = item.origY + ySkyOffset;

      // Rotate around vertical Y axis
      const x1 = baseOrigX * cosY + baseOrigZ * sinY;
      const z1 = -baseOrigX * sinY + baseOrigZ * cosY;
      const y1 = baseOrigY;

      // Rotate around horizontal X axis (subtle pitch)
      const y2 = y1 * cosX - z1 * sinX;
      const z2 = y1 * sinX + z1 * cosX;
      const x2 = x1;

      const perspective = 580;
      const curR = R * distMult;
      const projScale = perspective / Math.max(100, perspective - z2 * curR);
      const screenX = centerX + x2 * curR * projScale;
      const screenY = centerY - y2 * curR * projScale; // Note: minus because +y is up in 3D

      item.x = x2;
      item.y = y2;
      item.z = z2;
      item.scale = projScale;
      item.screenX = screenX;
      item.screenY = screenY;
      item.curScreenX = screenX;
      item.curScreenY = screenY;

      const el = item.el;
      if (el) {
        // Translation with hardware acceleration
        const finalScale = projScale * 0.96 * nodeScale;
        el.style.transform = `translate3d(${screenX - 34}px, ${screenY - 24}px, 0) scale(${finalScale})`;
        el.style.zIndex = Math.round((z2 + 2.5) * 100);

        const labelEl = el.querySelector('.spirit-node-label');

        if (!item.arrived) {
          el.style.opacity = nodeOpacity;
          el.style.filter = 'none';
          if (labelEl) labelEl.style.opacity = '0';
          el.style.pointerEvents = 'none';
        } else {
          // Smart depth-fading: hide labels on nodes in the back to prevent clutter
          if (z2 < -0.15) {
            const backAlpha = Math.max(0.2, 0.52 + z2 * 0.4);
            el.style.opacity = backAlpha;
            el.style.filter = `blur(${Math.min(1.8, Math.abs(z2) * 1.5)}px)`;
            if (labelEl) labelEl.style.opacity = '0';
          } else {
            el.style.opacity = '1';
            el.style.filter = 'none';
            if (labelEl) {
              const labelAlpha = Math.min(1, Math.max(0, (z2 + 0.15) / 0.3));
              labelEl.style.opacity = labelAlpha;
            }
          }
          el.style.pointerEvents = 'auto';
        }
      }
    }

    // Check if entire Ki gathering sequence has completed
    if (isGathering && allArrived) {
      isGathering = false;
      gatheringComplete = true;
      triggerSpiritBombFullChargePulse();
    }

    // Canvas Spirit Bomb Core Render
    renderCanvasCore(now, R);

    requestAnimationFrame(animate);
  }

  // Canvas Spirit Bomb Core Rendering
  function renderCanvasCore(now, R) {
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const isRose = !document.body.classList.contains('saiyan-mode');
    const cx = width / 2;
    const cy = height / 2;

    // Smooth core flare back to 1.0
    coreFlare += (1.0 - coreFlare) * 0.055;

    // Dynamic Growth: Core grows in size and power as skills gather into it!
    const maxCoreR = Math.max(110, R * 0.72);
    let coreR = maxCoreR;
    if (!gatheringComplete && isGathering && gatheringStartTime !== null) {
      const arrivedCount = sphereNodes.filter(n => n.arrived).length;
      const gatherRatio = Math.min(1.0, Math.max(0.18, arrivedCount / N));
      coreR = maxCoreR * (0.24 + 0.76 * gatherRatio) * coreFlare;
    } else if (!hasTriggeredScrollGather && !gatheringComplete) {
      coreR = maxCoreR * 0.24;
    }
    currentCoreR = coreR;

    // Color definitions
    const primaryGlow = isRose ? 'rgba(255, 46, 151, ' : 'rgba(56, 189, 248, ';
    const secondaryGlow = isRose ? 'rgba(219, 39, 119, ' : 'rgba(14, 165, 233, ';
    const innerHot = '#ffffff';

    // 0. Gravitational Energy Suction Accretion Waves
    // Concentric cosmic ripples contracting inward toward the Spirit Bomb core (No connecting lines!)
    if (isGathering && !gatheringComplete) {
      ctx.save();
      const suctionRings = 3;
      for (let s = 0; s < suctionRings; s++) {
        const ringPhase = ((now * 0.0009 + s * (1 / suctionRings)) % 1.0);
        // Radius contracts inward: from (coreR * 2.3) down to (coreR * 0.94)
        const currentR = (coreR * 0.94) + (1.0 - ringPhase) * (coreR * 1.36);
        const ringAlpha = Math.sin(ringPhase * Math.PI) * 0.38;

        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, currentR, 0, Math.PI * 2);
        ctx.strokeStyle = primaryGlow + ringAlpha + ')';
        ctx.lineWidth = 1.6 + (1.0 - ringPhase) * 2.2;
        ctx.shadowColor = isRose ? '#ff2e97' : '#38bdf8';
        ctx.shadowBlur = 14;
        ctx.setLineDash([12, 16]);
        ctx.lineDashOffset = -now * 0.03 * (s % 2 === 0 ? 1 : -1);
        ctx.stroke();
        ctx.restore();
      }
      ctx.restore();
    }

    // Energy Absorption Impact Rings (shockwaves created as each skill enters the sphere)
    if (impactRings.length > 0) {
      ctx.save();
      impactRings.forEach(ring => {
        ring.r += 1.6;
        ring.alpha *= 0.91;
        if (ring.alpha > 0.02) {
          ctx.beginPath();
          ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
          ctx.strokeStyle = ring.color || (isRose ? '#FF2E97' : '#38BDF8');
          ctx.lineWidth = 2.2;
          ctx.globalAlpha = ring.alpha;
          ctx.shadowColor = ring.color || (isRose ? '#FF2E97' : '#38BDF8');
          ctx.shadowBlur = 14;
          ctx.stroke();
        }
      });
      impactRings = impactRings.filter(r => r.alpha > 0.02);
      ctx.restore();
    }

    // 1. Radiant Outer Corona
    const coronaGrad = ctx.createRadialGradient(cx, cy, coreR * 0.2, cx, cy, coreR * 1.55);
    coronaGrad.addColorStop(0, primaryGlow + '0.45)');
    coronaGrad.addColorStop(0.5, secondaryGlow + '0.22)');
    coronaGrad.addColorStop(0.85, primaryGlow + '0.06)');
    coronaGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = coronaGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, coreR * 1.55, 0, Math.PI * 2);
    ctx.fill();

    // 2. Swirling Energy Plasma Vortex Rings
    const ringCount = 3;
    for (let r = 0; r < ringCount; r++) {
      const angleOffset = (now * 0.0012 * (r % 2 === 0 ? 1 : -1)) + (r * Math.PI / 1.5);
      const ringScaleX = 1 + Math.sin(now * 0.002 + r) * 0.08;
      const ringScaleY = 0.85 + Math.cos(now * 0.002 + r) * 0.08;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angleOffset);
      ctx.scale(ringScaleX, ringScaleY);

      ctx.beginPath();
      ctx.arc(0, 0, coreR * (0.88 + r * 0.1), 0, Math.PI * 2);
      ctx.strokeStyle = primaryGlow + (0.28 - r * 0.06) + ')';
      ctx.lineWidth = 4 + r * 2;
      ctx.shadowColor = isRose ? '#ff2e97' : '#38bdf8';
      ctx.shadowBlur = 18;
      ctx.stroke();
      ctx.restore();
    }

    // 3. Dense Spherical Energy Core
    const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
    coreGrad.addColorStop(0, innerHot);
    coreGrad.addColorStop(0.25, primaryGlow + '0.95)');
    coreGrad.addColorStop(0.65, secondaryGlow + '0.8)');
    coreGrad.addColorStop(0.92, primaryGlow + '0.4)');
    coreGrad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
    ctx.fill();

    // 4. Procedural Surface Lightning Bolts (Genki Dama electricity)
    lightningTimer++;
    if (lightningTimer % 7 === 0) {
      generateLightning();
    }

    ctx.save();
    lightningArcs.forEach(arc => {
      ctx.strokeStyle = '#ffffff';
      ctx.shadowColor = isRose ? '#ff2e97' : '#38bdf8';
      ctx.shadowBlur = 14;
      ctx.lineWidth = arc.width;
      ctx.globalAlpha = arc.alpha;

      ctx.beginPath();
      arc.points.forEach((pt, idx) => {
        if (idx === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.stroke();
    });
    ctx.restore();

    // 5. Rising Life Energy Motes (Gravitational suction during gathering)
    ctx.save();
    particles.forEach(p => {
      if (isGathering && !gatheringComplete) {
        // Gravitational suction physics: pull motes towards the center of Genki Dama
        const dx = cx - p.x;
        const dy = cy - p.y;
        const dist = Math.hypot(dx, dy) || 1;
        const pull = Math.min(5.2, (200 / Math.max(35, dist)) * 2.4);
        const swirlX = (-dy / dist) * 1.4;
        const swirlY = (dx / dist) * 1.4;

        p.x += (dx / dist) * pull + swirlX;
        p.y += (dy / dist) * pull + swirlY;

        // Reset if sucked into core
        if (dist < coreR * 0.55) {
          const spawnAngle = Math.random() * Math.PI * 2;
          const spawnDist = coreR * 2.0 + Math.random() * (coreR * 0.9);
          p.x = cx + Math.cos(spawnAngle) * spawnDist;
          p.y = cy + Math.sin(spawnAngle) * spawnDist;
          p.alpha = 0.2 + Math.random() * 0.6;
        }
      } else {
        p.y -= p.speedY;
        p.x += p.speedX;

        // Reset when particle enters core or goes off top
        const distFromCenter = Math.hypot(p.x - cx, p.y - cy);
        if (p.y < cy || distFromCenter < coreR * 0.4) {
          p.x = cx + (Math.random() - 0.5) * (coreR * 2.2);
          p.y = height * 0.85 + Math.random() * (height * 0.15);
          p.alpha = 0.2 + Math.random() * 0.6;
        }
      }

      // Draw particle
      ctx.fillStyle = innerHot;
      ctx.shadowColor = isRose ? '#ff2e97' : '#38bdf8';
      ctx.shadowBlur = 8;
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
  }

  // Start RAF loop
  requestAnimationFrame(animate);
}

/* --- Render Skills — Goku's 3D Spirit Bomb Wrapper --- */
function renderSkills() {
  initSpiritBomb();
}


/* --- Render Experience — Modern Minimalist Timeline --- */
function renderExperience() {
  const container = document.getElementById('experienceTimeline');
  if (!container || !portfolioData.experience) return;

  container.innerHTML = portfolioData.experience.map((exp, idx) => `
    <div class="exp-timeline-item" data-index="${idx}">
      <!-- Visual Timeline Rail Spine & Beacon Node -->
      <div class="exp-rail" aria-hidden="true">
        <div class="exp-node">
          <span class="exp-node-beacon"></span>
          <i data-lucide="briefcase" class="exp-node-icon"></i>
        </div>
        <div class="exp-rail-line"></div>
      </div>

      <!-- Modern Minimalist Experience Card -->
      <div class="experience-card">
        <!-- Header Bar: Company Monogram + Role Title + Meta + Date Badge -->
        <div class="exp-header-bar">
          <div class="exp-company-block">
            <div class="exp-company-avatar">
              ${exp.logo ? `
                <img src="${exp.logo}" alt="${exp.company} Logo" class="exp-company-logo" width="38" height="38" />
              ` : `
                <span>${exp.logoText || 'EXP'}</span>
              `}
            </div>
            <div class="exp-title-meta">
              <div class="exp-role-row">
                <h3 class="exp-role">${exp.role}</h3>
                <span class="exp-type-badge">${exp.type || 'Internship'}</span>
              </div>
              <div class="exp-company-line">
                <span class="exp-company-name">
                  <span class="exp-company-full">${exp.company}</span>
                  <span class="exp-company-short">${exp.shortCompany || exp.company}</span>
                </span>
                <div class="exp-meta-group">
                  <span class="exp-meta-separator">•</span>
                  <span class="exp-location-tag">
                    <i data-lucide="map-pin" style="width: 12px; height: 12px;"></i>
                    <span>${exp.location}</span>
                  </span>
                  ${exp.mode ? `
                    <span class="exp-meta-separator">•</span>
                    <span class="exp-mode-tag">
                      <i data-lucide="building" style="width: 12px; height: 12px;"></i>
                      <span>${exp.mode}</span>
                    </span>
                  ` : ''}
                </div>
              </div>
            </div>
          </div>

          <div class="exp-date-container">
            <div class="exp-date-pill">
              <i data-lucide="calendar" style="width: 13px; height: 13px;"></i>
              <span>${exp.period}</span>
            </div>
            ${exp.duration ? `
              <span class="exp-duration-pill">${exp.duration}</span>
            ` : ''}
          </div>
        </div>

        <!-- Clean 2-Column Minimalist Body (Story on Left, Workplace Photo on Right) -->
        <div class="exp-body">
          <div class="exp-content-col">
            <p class="exp-description">${exp.description}</p>

            <ul class="exp-bullet-list">
              ${(exp.highlights || []).map((hl, i) => {
                const fullText = typeof hl === 'object' ? (hl.description || hl.title) : hl;
                const shortText = (exp.shortHighlights && exp.shortHighlights[i]) ? exp.shortHighlights[i] : fullText;
                return `
                  <li class="exp-bullet-item">
                    <span class="exp-bullet-dot"></span>
                    <span class="exp-bullet-text">
                      <span class="exp-text-full">${fullText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</span>
                      <span class="exp-text-short">${shortText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</span>
                    </span>
                  </li>
                `;
              }).join('')}
            </ul>

            <div class="exp-tech-row">
              ${exp.techStack.map(tech => `
                <span class="exp-tag">${tech}</span>
              `).join('')}
            </div>
          </div>

          ${exp.photo ? `
            <div class="exp-photo-col">
              <div class="exp-photo-frame"
                   onclick="window.openAchPhotoModal('${exp.photo}', '${(exp.photoCaption || exp.company).replace(/'/g, "\\'")}')"
                   onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();window.openAchPhotoModal('${exp.photo}','${(exp.photoCaption || exp.company).replace(/'/g, "\\'")}');}"
                   role="button"
                   tabindex="0"
                   aria-label="View on-site workplace photo"
                   title="Click to view full photo">
                <img src="${exp.photo}" alt="${exp.photoCaption || exp.company}" class="exp-photo-img" decoding="async" />
                <div class="exp-photo-badge">
                  <span class="exp-badge-dot"></span>
                  <span class="exp-badge-text-desktop">On-site • Mumbai ↗</span>
                  <span class="exp-badge-text-mobile">RCF HQ ↗</span>
                </div>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `).join('');

  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}


/* --- Render Projects — Scroll-Linked Stacking Cards Showcase --- */
let activeProjectCategory = 'all';

function renderProjects(filterCategory = 'all') {
  activeProjectCategory = filterCategory;
  const container = document.getElementById('projectsGrid');
  if (!container || !portfolioData.projects) return;

  const filtered = filterCategory === 'all'
    ? portfolioData.projects
    : portfolioData.projects.filter(p => p.category === filterCategory);

  if (!filtered.length) {
    container.innerHTML = `
      <div class="project-empty-state">
        <div class="empty-state-icon"><i data-lucide="folder-search" style="width: 32px; height: 32px;"></i></div>
        <h4 class="empty-state-title">No projects found in this filter</h4>
        <p class="empty-state-desc">Select "All Projects" to explore all engineering builds.</p>
        <button type="button" class="btn btn-primary btn-sm" onclick="document.querySelector('.filter-btn[data-filter=\\'all\\']').click()">
          <span>Show All Projects</span>
        </button>
      </div>`;
    initLucideIcons();
    return;
  }

  container.innerHTML = `
    <div class="projects-stack-deck" id="projectsStackDeck">
      ${filtered.map((proj, idx) => {
        const numStr = String(idx + 1).padStart(2, '0');
        const totalStr = String(filtered.length).padStart(2, '0');
        let metricTag = '★ High Performance';
        if (proj.id === 'dr-detection' || proj.id === 'diabetic-retinopathy') metricTag = '★ 92% Acc · 10,000+ Scans';
        else if (proj.id === 'facial-recognition') metricTag = '★ 98% Acc · Biometric Real-Time';
        else if (proj.id === 'foodies-goodies') metricTag = '★ Edamam REST API · 100+ Recipes';

        const isVideo = !!(proj.video || (proj.image && proj.image.endsWith('.mp4')));
        const mediaSrc = proj.video || proj.image;
        const posterSrc = proj.poster || (proj.image && !proj.image.endsWith('.mp4') ? proj.image : 'assets/dr.png');

        return `
          <div class="project-stack-card" style="--card-idx: ${idx}; --total-cards: ${filtered.length}; --theme-color: var(--${proj.badgeColor || 'accent'});" data-stack-idx="${idx}" data-project-id="${proj.id}">
            <!-- Card Header Band -->
            <div class="stack-card-header">
              <div class="stack-header-left">
                <span class="stack-card-idx">${numStr} / ${totalStr}</span>
                <span class="stack-card-badge" style="background-color: var(--${proj.badgeColor || 'accent'});">
                  ${proj.badge}
                </span>
              </div>
              <div class="stack-header-right">
                <span class="stack-card-period">
                  <i data-lucide="calendar" style="width: 13px; height: 13px;"></i>
                  <span>${proj.period}</span>
                </span>
              </div>
            </div>

            <!-- Card Content Body -->
            <div class="stack-card-body">
              <!-- Left Visual Panel -->
              <div class="stack-media-col">
                <div class="stack-media-frame" onclick="window.openProjectModal('${proj.id}')" title="Click to inspect system architecture">
                  <div class="stack-browser-bar">
                    <div class="stack-dots">
                      <span class="s-dot dot-r"></span>
                      <span class="s-dot dot-y"></span>
                      <span class="s-dot dot-g"></span>
                    </div>
                    <span class="stack-url-tag">https://${proj.id}.app.internal</span>
                    ${isVideo ? `
                      <span class="stack-video-pill">
                        <span class="stack-video-pulse"></span>
                        <span>LIVE DEMO</span>
                      </span>` : ''}
                  </div>
                  <div class="stack-img-wrap">
                    ${isVideo ? `
                      <video src="${encodeURI(mediaSrc)}" poster="${encodeURI(posterSrc)}" class="stack-proj-img" autoplay loop muted playsinline preload="auto" title="${proj.title} Live Demo Video"></video>
                    ` : `
                      <img src="${encodeURI(proj.image)}" alt="${proj.title}" class="stack-proj-img" loading="lazy" />
                    `}
                    <span class="stack-metric-pill">${metricTag}</span>
                    <div class="stack-lens-overlay">
                      <span class="stack-lens-badge">
                        <i data-lucide="${isVideo ? 'play' : 'search'}" style="width: 14px; height: 14px;"></i>
                        <span>${isVideo ? 'Inspect Demo & Architecture' : 'Inspect Architecture'}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Action buttons -->
                <div class="stack-actions-row">
                  <button type="button" class="btn btn-primary btn-sm project-details-btn stack-cta-primary" data-project-id="${proj.id}">
                    <i data-lucide="layers" style="width: 14px; height: 14px;"></i>
                    <span>Architecture & Details</span>
                  </button>
                  <a href="${proj.github}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm project-github-link stack-cta-secondary" title="GitHub Repository">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    <span>View Code</span>
                  </a>
                </div>
              </div>

              <!-- Right Dossier Panel -->
              <div class="stack-dossier-col">
                <h3 class="stack-proj-title">${proj.title}</h3>
                <p class="stack-proj-tagline">${proj.tagline}</p>
                
                <!-- Deliverables Box -->
                <div class="stack-deliverables-box">
                  <div class="stack-deliverables-header">
                    <i data-lucide="sparkles" style="width: 14px; height: 14px; color: var(--accent);"></i>
                    <span>Engineered Deliverables:</span>
                  </div>
                  <ul class="stack-bullet-list">
                    ${(proj.bullets || []).map(b => `
                      <li>
                        <span class="stack-bullet-caret">▸</span>
                        <span>${b}</span>
                      </li>
                    `).join('')}
                  </ul>
                </div>

                <!-- Tech Stack Tags -->
                <div class="stack-tech-row">
                  <span class="stack-tech-label">Stack:</span>
                  <div class="stack-tech-tags">
                    ${proj.techStack.map(t => `<span class="stack-tech-chip">${t}</span>`).join('')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  initLucideIcons();
  initStackCardScrollAnimation();
  initStackCardReveals();

  container.querySelectorAll('video').forEach(vid => {
    vid.muted = true;
    const p = vid.play();
    if (p !== undefined) p.catch(() => {});
  });
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

  // Global delegated click listener for project buttons
  document.addEventListener('click', (e) => {
    const detailsBtn = e.target.closest('.project-details-btn');
    if (detailsBtn) {
      e.preventDefault();
      e.stopPropagation();
      const pid = detailsBtn.getAttribute('data-project-id');
      if (pid) window.openProjectModal(pid);
      return;
    }
    const ghLink = e.target.closest('.project-github-link');
    if (ghLink) {
      e.stopPropagation();
    }
  });
}

/* --- Project Modal Deep Dive --- */
window.openProjectModal = function(projectId) {
  const proj = portfolioData.projects.find(p => p.id === projectId);
  if (!proj) return;

  const modalBackdrop = document.getElementById('projectModal');
  const modalContent = document.getElementById('modalContent');
  if (!modalBackdrop || !modalContent) return;

  const isVideo = !!(proj.video || (proj.image && proj.image.endsWith('.mp4')));
  const mediaSrc = proj.video || proj.image;
  const posterSrc = proj.poster || (proj.image && !proj.image.endsWith('.mp4') ? proj.image : 'assets/dr.png');

  const mediaHtml = isVideo
    ? `
      <div style="border-radius: var(--radius-lg); overflow: hidden; border: 2px solid var(--border); margin-bottom: 1.5rem; background: #080612; position: relative;">
        <video src="${encodeURI(mediaSrc)}" poster="${encodeURI(posterSrc)}" controls autoplay loop muted playsinline style="width: 100%; height: auto; max-height: 480px; display: block; object-fit: contain; margin: 0 auto;"></video>
      </div>`
    : `
      <div style="border-radius: var(--radius-lg); overflow: hidden; border: 2px solid var(--border); margin-bottom: 1.5rem; background: var(--muted);">
        <img src="${encodeURI(proj.image)}" alt="${proj.title}" style="width: 100%; height: auto; display: block;" loading="lazy" onerror="this.style.display='none'" />
      </div>`;

  modalContent.innerHTML = `
    <div class="project-modal-header" style="margin-bottom: 1.25rem;">
      <span class="project-badge badge-${proj.badgeColor}" style="background-color: var(--${proj.badgeColor}); margin-bottom: 0.75rem; display: inline-block;">
        ${proj.badge}
      </span>
      <h2 class="project-modal-title" style="font-size: clamp(1.35rem, 4.5vw, 1.85rem); font-weight: 900; line-height: 1.25; margin-bottom: 0.5rem;">${proj.title}</h2>
      <p class="project-modal-tagline" style="color: var(--muted-fg); font-weight: 600; font-size: clamp(0.88rem, 2.8vw, 1rem); line-height: 1.45;">${proj.tagline}</p>
    </div>

    ${mediaHtml}

    <h4 style="font-size: clamp(1rem, 3.5vw, 1.15rem); margin-bottom: 0.75rem;">Key Architecture & Deliverables:</h4>
    <ul class="project-modal-bullets" style="list-style: none; display: flex; flex-direction: column; gap: 0.65rem; margin-bottom: 1.5rem; padding: 0;">
      ${proj.bullets.map(b => `
        <li style="display: flex; gap: 0.65rem; font-size: clamp(0.85rem, 2.8vw, 0.95rem); line-height: 1.5;">
          <span style="color: var(--accent); font-weight: 900; flex-shrink: 0;">➔</span>
          <span>${b}</span>
        </li>
      `).join('')}
    </ul>

    <h4 style="font-size: clamp(1rem, 3.5vw, 1.15rem); margin-bottom: 0.75rem;">Technologies Used:</h4>
    <div class="project-modal-tech" style="display: flex; flex-wrap: wrap; gap: 0.45rem; margin-bottom: 1.75rem;">
      ${proj.techStack.map(t => `<span class="tech-pill">${t}</span>`).join('')}
    </div>

    <div class="project-modal-actions" style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
      <a href="${proj.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="flex: 1 1 200px; justify-content: center;">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
        <span>Explore GitHub Repository</span>
      </a>
      <button type="button" class="btn btn-outline" onclick="closeProjectModal()" style="flex: 1 1 120px; justify-content: center;">
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
    const modalVideo = modalBackdrop.querySelector('video');
    if (modalVideo) {
      try { modalVideo.pause(); } catch (e) {}
    }
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
};

// Global delegated handler for project cards — robust fallback for dynamically rendered cards
document.addEventListener('click', (e) => {
  const detailsBtn = e.target.closest('.project-details-btn');
  if (detailsBtn) {
    e.preventDefault();
    e.stopPropagation();
    const pid = detailsBtn.getAttribute('data-project-id') || detailsBtn.dataset.projectId;
    if (pid && window.openProjectModal) window.openProjectModal(pid);
    return;
  }
  const ghLink = e.target.closest('.project-github-link');
  if (ghLink) {
    e.stopPropagation();
  }
});

/* --- Render Achievements — Vertical Stacking Slider with Photo Showcase & Scatter --- */
let currentModalAchIdx = 0;
let currentModalPhotoIdx = 0;

function renderAchievements() {
  const deck = document.getElementById('achievementsStackDeck') || document.getElementById('achHorizontalTrack') || document.getElementById('achievementsGrid');
  if (!deck || !portfolioData.achievements) return;

  const items = portfolioData.achievements;
  const total = items.length;

  deck.innerHTML = items.map((ach, idx) => {
    const numStr = ach.num || String(idx + 1).padStart(2, '0');
    const totalStr = String(total).padStart(2, '0');
    const colorVar = ach.color || 'accent';
    const accentColor = ach.accentColor || '#EC4899';
    const metricText = ach.metric || ach.badge;
    const images = ach.images || [];
    const firstImg = images.length > 0 ? images[0] : { src: '', caption: 'Archival Record' };

    const tagsHtml = (ach.tags && ach.tags.length > 0)
      ? ach.tags.map(t => `
          <span class="ach-tag-chip">
            <span class="ach-tag-dot" style="background-color: ${accentColor};"></span>
            <span>${t}</span>
          </span>
        `).join('')
      : '';

    // Archival Scatter Photos (Peripheral Scroll-Linked Exhibition)
    const scatterPhotosHtml = images.map((img, pIdx) => `
      <div class="ach-scatter-photo" data-photo-idx="${pIdx}" data-ach-idx="${idx}" data-total-photos="${images.length}" role="button" tabindex="0" aria-label="${img.caption}">
        <div class="ach-photo-frame" style="--photo-accent: ${accentColor};">
          <img src="${img.src}" alt="${img.caption}" loading="lazy" />
          <div class="ach-photo-zoom-lens">
            <i data-lucide="maximize-2" style="width: 16px; height: 16px;"></i>
            <span>Zoom</span>
          </div>
          <div class="ach-scatter-badge">${pIdx + 1}/${images.length}</div>
        </div>
        <div class="ach-photo-caption-pill">
          <span class="ach-photo-cap-icon" style="color: ${accentColor};">✦</span>
          <span class="ach-photo-cap-text">${img.caption}</span>
        </div>
      </div>
    `).join('');

    // Interactive Thumbnail Strip for Card Face Showcase
    const thumbStripHtml = images.length > 1
      ? `
        <div class="ach-thumb-strip" role="tablist" aria-label="Photo thumbnails for ${ach.title}">
          ${images.map((img, tIdx) => `
            <button type="button" 
                    class="ach-thumb-btn ${tIdx === 0 ? 'is-active' : ''}" 
                    data-ach-idx="${idx}"
                    data-thumb-idx="${tIdx}" 
                    data-src="${img.src}" 
                    data-caption="${img.caption}" 
                    title="${img.caption}"
                    aria-label="View ${img.caption}">
              <img src="${img.src}" alt="${img.caption}" loading="lazy" />
            </button>
          `).join('')}
        </div>
      `
      : '';

    const isLastCard = idx === total - 1;
    const hasMultiplePhotos = images.length > 1;

    return `
      <div class="achievement-stack-card ${isLastCard ? 'ach-last-card' : ''}" style="--card-idx: ${idx}; --total-cards: ${total}; --theme-color: var(--${colorVar}); --card-accent: ${accentColor};" data-stack-idx="${idx}" data-ach-idx="${idx}">
        ${hasMultiplePhotos ? `
          <!-- Archival Photo Scatter Cluster (Emerges from behind the card and scatters outward) -->
          <div class="ach-scatter-cluster" data-cluster-idx="${idx}" aria-label="Archival photos for ${ach.title}">
            ${scatterPhotosHtml}
          </div>
        ` : ''}

        <!-- Foreground Achievement Card Surface -->
        <article class="ach-card-surface">
          <!-- Card Header Band -->
          <div class="stack-card-header ach-stack-header">
            <div class="stack-header-left">
              <span class="stack-card-idx ach-card-idx">${numStr} / ${totalStr}</span>
              <span class="stack-card-badge ach-card-badge" style="background-color: var(--${colorVar});">
                ${ach.badge}
              </span>
              <span class="ach-verified-badge" style="color: ${accentColor}; border-color: ${accentColor}44; background: ${accentColor}12;">
                <i data-lucide="check-circle" style="width: 12px; height: 12px;"></i>
                <span>Verified Record</span>
              </span>
            </div>
            <div class="stack-header-right">
              <span class="stack-card-period ach-card-period">
                <i data-lucide="calendar" style="width: 13px; height: 13px;"></i>
                <span>${ach.period}</span>
              </span>
            </div>
          </div>

          <!-- Card Content Body (Media Showcase Left, Dossier Right) -->
          <div class="stack-card-body ach-card-body">
            <!-- Left Visual Showcase Column -->
            <div class="stack-media-col ach-media-col">
              <div class="ach-card-hero-showcase">
                <!-- Large Featured Archival Photo Frame -->
                <div class="ach-hero-frame" 
                     role="button" 
                     tabindex="0" 
                     aria-label="Inspect ${firstImg.caption} in High Resolution" 
                     data-ach-idx="${idx}"
                     data-active-photo-idx="0"
                     style="--hero-accent: ${accentColor};">
                  <img class="ach-hero-img" src="${firstImg.src}" alt="${firstImg.caption}" loading="lazy" />
                  <div class="ach-hero-zoom-lens">
                    <i data-lucide="maximize-2" style="width: 18px; height: 18px;"></i>
                    <span>Inspect Full HD</span>
                  </div>
                  <div class="ach-hero-caption-overlay">
                    <i data-lucide="image" style="width: 12px; height: 12px; color: ${accentColor};"></i>
                    <span class="ach-hero-cap-text">${firstImg.caption}</span>
                  </div>
                  <div class="ach-hero-count-pill" style="border-color: ${accentColor}55;">
                    <i data-lucide="camera" style="width: 12px; height: 12px;"></i>
                    <span>${images.length} ${images.length === 1 ? 'Record' : 'Records'}</span>
                  </div>
                </div>

                <!-- Interactive Thumbnail Strip -->
                ${thumbStripHtml}
              </div>

              <!-- Organization & Metric Capsule -->
              <div class="ach-org-capsule" style="border-color: ${accentColor}44;">
                <div class="ach-org-icon-badge" style="background: ${accentColor}18; color: ${accentColor}; border: 1.5px solid ${accentColor}55;">
                  <i data-lucide="${ach.icon || 'award'}" style="width: 18px; height: 18px;"></i>
                </div>
                <div class="ach-org-details">
                  <span class="ach-org-name">${ach.organization}</span>
                  <span class="ach-metric-highlight" style="color: ${accentColor};">
                    <i data-lucide="sparkles" style="width: 12px; height: 12px;"></i>
                    <span>${metricText}</span>
                  </span>
                </div>
              </div>
            </div>

            <!-- Right Dossier Panel -->
            <div class="stack-dossier-col ach-dossier-col">
              <div class="ach-title-wrap">
                <h3 class="stack-proj-title ach-title-text">${ach.title}</h3>
              </div>

              <!-- Metric Spotlight Strip -->
              <div class="ach-spotlight-bar" style="background: linear-gradient(135deg, ${accentColor}14, ${accentColor}05); border-color: ${accentColor}40;">
                <div class="ach-spotlight-icon" style="color: ${accentColor};">
                  <i data-lucide="trophy" style="width: 16px; height: 16px;"></i>
                </div>
                <div class="ach-spotlight-info">
                  <span class="ach-spotlight-label">Impact Standing</span>
                  <span class="ach-spotlight-val">${metricText} • ${ach.organization}</span>
                </div>
              </div>

              <p class="stack-proj-tagline ach-desc-text">${ach.description}</p>

              <!-- Key Honors & Domains Box -->
              <div class="stack-deliverables-box ach-honors-box">
                <div class="stack-deliverables-header">
                  <i data-lucide="award" style="width: 14px; height: 14px; color: ${accentColor};"></i>
                  <span>Key Honors &amp; Domains:</span>
                </div>
                <div class="ach-stack-tags">
                  ${tagsHtml}
                </div>
              </div>

              <!-- Action & Gallery Row -->
              <div class="ach-card-action-row">
                <button type="button" class="ach-gallery-trigger-btn" onclick="openAchGallery(${idx}, 0)" style="--btn-accent: ${accentColor};">
                  <i data-lucide="images" style="width: 15px; height: 15px;"></i>
                  <span>Inspect Archival Records (${images.length})</span>
                </button>
                <div class="ach-scroll-interaction-hint">
                  <i data-lucide="${hasMultiplePhotos ? 'mouse' : 'maximize-2'}" style="width: 13px; height: 13px; color: ${accentColor};"></i>
                  <span>${hasMultiplePhotos ? 'Scroll down to scatter photos' : 'Click photo or button to inspect record'}</span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    `;
  }).join('') + '<div class="ach-stack-runway" aria-hidden="true"></div>';

  initLucideIcons();
  initAchievementCardGalleries();
  initAchievementScatterEngine();
  initStackCardScrollAnimation();
  initStackCardReveals();
}

function initAchievementCardGalleries() {
  const cards = document.querySelectorAll('.achievement-stack-card');
  cards.forEach(card => {
    const achIdx = parseInt(card.getAttribute('data-ach-idx'), 10);
    const heroFrame = card.querySelector('.ach-hero-frame');
    const heroImg = card.querySelector('.ach-hero-img');
    const heroCap = card.querySelector('.ach-hero-cap-text');
    const thumbs = card.querySelectorAll('.ach-thumb-btn');

    thumbs.forEach(btn => {
      const onSelect = () => {
        thumbs.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const src = btn.getAttribute('data-src');
        const cap = btn.getAttribute('data-caption');
        const tIdx = btn.getAttribute('data-thumb-idx');
        if (heroImg && src) {
          heroImg.src = src;
          heroImg.alt = cap || '';
        }
        if (heroCap && cap) {
          heroCap.textContent = cap;
        }
        if (heroFrame) {
          heroFrame.setAttribute('data-active-photo-idx', tIdx);
        }
      };

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        onSelect();
      });
      btn.addEventListener('mouseenter', () => {
        onSelect();
      });
    });

    if (heroFrame) {
      heroFrame.addEventListener('click', (e) => {
        e.stopPropagation();
        const activeIdx = parseInt(heroFrame.getAttribute('data-active-photo-idx') || '0', 10);
        window.openAchGallery(achIdx, activeIdx);
      });
      heroFrame.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          heroFrame.click();
        }
      });
    }
  });
}

/* --- Scroll-Linked Photo Scatter Engine --- */
let achScatterEngineInit = false;

function initAchievementScatterEngine() {
  const deck = document.getElementById('achievementsStackDeck');
  if (!deck) return;

  const achCards = deck.querySelectorAll('.achievement-stack-card');
  const total = achCards.length;
  if (!total) return;

  // Setup click-to-zoom on all scatter photos
  deck.querySelectorAll('.ach-scatter-photo').forEach(photoEl => {
    photoEl.addEventListener('click', (e) => {
      e.stopPropagation();
      const achIdx = parseInt(photoEl.getAttribute('data-ach-idx') || '0', 10);
      const photoIdx = parseInt(photoEl.getAttribute('data-photo-idx') || '0', 10);
      window.openAchGallery(achIdx, photoIdx);
    });
    photoEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        photoEl.click();
      }
    });
  });

    if (achScatterEngineInit) return;
  achScatterEngineInit = true;

  function updateScatter() {
    const winH = window.innerHeight || 800;
    const winW = window.innerWidth || 1200;

    const firstCard = achCards[0];
    if (!firstCard) return;
    const computedTopStr = window.getComputedStyle(firstCard).top;
    const stickyTop = parseFloat(computedTopStr) || 96;

    achCards.forEach((card, idx) => {
      const cluster = card.querySelector('.ach-scatter-cluster');
      if (!cluster) return;
      const photos = cluster.querySelectorAll('.ach-scatter-photo');
      const photoCount = photos.length;
      if (!photoCount) return;

      // On narrow tablet / mobile, card face hero gallery is primary; hide peripheral scatter to prevent clutter
      if (winW <= 980) {
        photos.forEach(p => {
          p.style.opacity = '0';
          p.style.visibility = 'hidden';
          p.style.pointerEvents = 'none';
        });
        return;
      }

      const cardRect = card.getBoundingClientRect();
      const cardW = cardRect.width || 860;
      const cardHalfW = cardW / 2;

      // Larger scatter photo: 285px wide (half-width 142.5px)
      const photoW = 285;
      const photoHalfW = 142.5;

      const sideGutter = Math.max(0, (winW - cardW) / 2);

      let scaleMul = 1.0;
      let clearX = cardHalfW + photoHalfW + 28;
      const maxAllowedX = Math.max(cardHalfW + 50, (winW / 2) - photoHalfW - 16);

      if (winW < 1520) {
        scaleMul = Math.min(1.0, Math.max(0.68, (sideGutter - 16) / photoW));
        clearX = Math.min(clearX, maxAllowedX);
      }

      // Card scroll progress through its runway
      let prog = 0;
      if (idx < total - 1) {
        const nextCard = achCards[idx + 1];
        const nextRect = nextCard.getBoundingClientRect();
        const cardHeight = cardRect.height || 480;
        const initialNextTop = stickyTop + cardHeight + (winH * 0.85);
        const distToNextDock = Math.max(0, nextRect.top - stickyTop);
        const totalRunway = initialNextTop - stickyTop;
        if (totalRunway > 0) {
          prog = Math.max(0, Math.min(1, 1 - (distToNextDock / totalRunway)));
        }
      } else {
        const deckRect = deck.getBoundingClientRect();
        const cardHeight = cardRect.height || 480;
        const lastRunway = winH * 0.85;
        const remaining = Math.max(0, deckRect.bottom - (stickyTop + cardHeight));
        prog = Math.max(0, Math.min(1, 1 - (remaining / lastRunway)));
      }

      // Scatter Factor calculation:
      // 0.00 -> 0.04: Behind card (scatter = 0)
      // 0.04 -> 0.18: Fast, smooth emergence outward (scatter = 0 -> 1)
      // 0.18 -> 0.84: FULL EXHIBITION SHOWCASE (scatter = 1.0) — photos fully visible & held
      // 0.84 -> 0.95: Smooth retraction back behind card (scatter = 1 -> 0)
      // 0.95 -> 1.00: Behind card as next card docks
      let scatterFactor = 0;
      if (prog < 0.04) {
        scatterFactor = 0;
      } else if (prog <= 0.18) {
        const norm = (prog - 0.04) / (0.18 - 0.04);
        scatterFactor = Math.sin((norm * Math.PI) / 2);
      } else if (prog <= 0.84) {
        scatterFactor = 1.0;
      } else if (prog <= 0.95) {
        const norm = (prog - 0.84) / (0.95 - 0.84);
        scatterFactor = 1.0 - (0.5 - 0.5 * Math.cos(norm * Math.PI));
      } else {
        scatterFactor = 0;
      }

      photos.forEach((photo, pIdx) => {
        let targetX = 0;
        let targetY = 0;
        let targetRot = 0;

        if (photoCount === 4) {
          if (pIdx === 0) { targetX = -clearX; targetY = -165; targetRot = -6.5; }
          else if (pIdx === 1) { targetX = clearX; targetY = -165; targetRot = 6.0; }
          else if (pIdx === 2) { targetX = -clearX; targetY = 165; targetRot = 5.0; }
          else if (pIdx === 3) { targetX = clearX; targetY = 165; targetRot = -5.5; }
        } else if (photoCount === 3) {
          if (pIdx === 0) { targetX = -clearX; targetY = 0; targetRot = -6.0; }
          else if (pIdx === 1) { targetX = clearX; targetY = -150; targetRot = 6.0; }
          else if (pIdx === 2) { targetX = clearX; targetY = 150; targetRot = -5.5; }
        } else if (photoCount === 2) {
          if (pIdx === 0) { targetX = -clearX; targetY = 0; targetRot = -5.5; }
          else if (pIdx === 1) { targetX = clearX; targetY = 0; targetRot = 5.5; }
        } else {
          targetX = clearX; targetY = 0; targetRot = 5.0;
        }

        const curX = targetX * scatterFactor;
        const curY = targetY * scatterFactor;
        const curRot = targetRot * scatterFactor;
        const curScale = (0.55 + (0.45 * scatterFactor)) * scaleMul;
        const curOpacity = Math.max(0, Math.min(1, scatterFactor * 2.8));

        if (scatterFactor <= 0.01) {
          photo.style.opacity = '0';
          photo.style.visibility = 'hidden';
          photo.style.pointerEvents = 'none';
          photo.style.zIndex = '1';
          photo.style.transform = 'translate3d(0, 0, 0) scale(0.4) rotate(0deg)';
        } else {
          photo.style.opacity = curOpacity.toFixed(3);
          photo.style.visibility = 'visible';
          photo.style.pointerEvents = scatterFactor > 0.4 ? 'auto' : 'none';
          photo.style.zIndex = '35';
          photo.style.transform = `translate3d(${curX.toFixed(1)}px, ${curY.toFixed(1)}px, 0) rotate(${curRot.toFixed(1)}deg) scale(${curScale.toFixed(3)})`;
        }
      });
    });
  }

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateScatter();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    updateScatter();
  }, { passive: true });

  if (window.lenis && typeof window.lenis.on === 'function') {
    window.lenis.on('scroll', onScroll);
  } else {
    const checkLenisAch = setInterval(() => {
      if (window.lenis && typeof window.lenis.on === 'function') {
        window.lenis.on('scroll', onScroll);
        clearInterval(checkLenisAch);
      }
    }, 150);
    setTimeout(() => clearInterval(checkLenisAch), 4000);
  }

  setTimeout(updateScatter, 150);
  setTimeout(updateScatter, 600);
}

/* --- Archival Photo Lightbox Modal Handlers --- */
window.openAchGallery = function(achIdx, photoIdx = 0) {
  if (!portfolioData || !portfolioData.achievements) return;
  const ach = portfolioData.achievements[achIdx];
  if (!ach || !ach.images || !ach.images.length) return;

  currentModalAchIdx = achIdx;
  currentModalPhotoIdx = Math.max(0, Math.min(ach.images.length - 1, photoIdx));
  updateAchModalContent();

  const modal = document.getElementById('achPhotoModal');
  if (!modal) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  if (window.lenis && typeof window.lenis.stop === 'function') {
    window.lenis.stop();
  }
  initLucideIcons();
};

window.openAchPhotoModal = function(src, caption) {
  let foundAchIdx = -1;
  let foundPhotoIdx = -1;
  if (portfolioData && portfolioData.achievements) {
    for (let a = 0; a < portfolioData.achievements.length; a++) {
      const imgs = portfolioData.achievements[a].images || [];
      for (let p = 0; p < imgs.length; p++) {
        if (imgs[p].src === src) {
          foundAchIdx = a;
          foundPhotoIdx = p;
          break;
        }
      }
      if (foundAchIdx !== -1) break;
    }
  }

  if (foundAchIdx !== -1) {
    window.openAchGallery(foundAchIdx, foundPhotoIdx);
  } else {
    const modal = document.getElementById('achPhotoModal');
    const img = document.getElementById('achPhotoModalImg');
    const cap = document.getElementById('achPhotoModalCaption');
    const counter = document.getElementById('achModalCounter');
    const badgeText = document.getElementById('achModalBadgeText');
    const prevBtn = document.getElementById('achModalPrevBtn');
    const nextBtn = document.getElementById('achModalNextBtn');

    if (!modal || !img) return;
    img.src = src;
    img.alt = caption || 'Achievement Record';
    if (cap) cap.textContent = caption || '';
    if (badgeText) badgeText.textContent = (src && src.includes('rcf')) ? 'Workplace Verification' : 'Archival Record';
    if (counter) counter.textContent = '1 / 1';
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (window.lenis && typeof window.lenis.stop === 'function') {
      window.lenis.stop();
    }
    initLucideIcons();
  }
};

window.navAchModal = function(direction) {
  if (!portfolioData || !portfolioData.achievements) return;
  const ach = portfolioData.achievements[currentModalAchIdx];
  if (!ach || !ach.images || !ach.images.length) return;

  const total = ach.images.length;
  currentModalPhotoIdx = (currentModalPhotoIdx + direction + total) % total;
  updateAchModalContent();
};

function updateAchModalContent() {
  if (!portfolioData || !portfolioData.achievements) return;
  const ach = portfolioData.achievements[currentModalAchIdx];
  if (!ach || !ach.images) return;
  const total = ach.images.length;
  const photo = ach.images[currentModalPhotoIdx];
  if (!photo) return;

  const img = document.getElementById('achPhotoModalImg');
  const cap = document.getElementById('achPhotoModalCaption');
  const counter = document.getElementById('achModalCounter');
  const badgeText = document.getElementById('achModalBadgeText');
  const prevBtn = document.getElementById('achModalPrevBtn');
  const nextBtn = document.getElementById('achModalNextBtn');

  if (img) {
    img.src = photo.src;
    img.alt = photo.caption || ach.title;
  }
  if (cap) {
    cap.textContent = photo.caption || ach.title;
  }
  if (counter) {
    counter.textContent = `${currentModalPhotoIdx + 1} / ${total}`;
  }
  if (badgeText) {
    badgeText.textContent = `${ach.badge} • ${ach.period}`;
  }
  if (prevBtn) {
    prevBtn.style.display = total > 1 ? 'flex' : 'none';
  }
  if (nextBtn) {
    nextBtn.style.display = total > 1 ? 'flex' : 'none';
  }
  initLucideIcons();
}

window.closeAchPhotoModal = function() {
  const modal = document.getElementById('achPhotoModal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
  if (window.lenis && typeof window.lenis.start === 'function') {
    window.lenis.start();
  }
};

document.addEventListener('keydown', (e) => {
  const achModal = document.getElementById('achPhotoModal');
  if (achModal && achModal.classList.contains('active')) {
    if (e.key === 'Escape') {
      window.closeAchPhotoModal();
    } else if (e.key === 'ArrowLeft') {
      window.navAchModal(-1);
    } else if (e.key === 'ArrowRight') {
      window.navAchModal(1);
    }
  }
});

/* --- Scroll-Linked Card Stacking & Field Reveal Engine --- */
let stackAnimationInit = false;

function initStackCardScrollAnimation() {
  if (stackAnimationInit) return;
  stackAnimationInit = true;

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateCardsStackDepth();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  // Also synchronize with Lenis smooth scroll engine
  if (window.lenis && typeof window.lenis.on === 'function') {
    window.lenis.on('scroll', onScroll);
  } else {
    const checkLenis = setInterval(() => {
      if (window.lenis && typeof window.lenis.on === 'function') {
        window.lenis.on('scroll', onScroll);
        clearInterval(checkLenis);
      }
    }, 200);
    setTimeout(() => clearInterval(checkLenis), 3000);
  }

  // Initial calls
  setTimeout(updateCardsStackDepth, 150);
  setTimeout(updateCardsStackDepth, 600);
}

function updateCardsStackDepth() {
  const projCards = document.querySelectorAll('.project-stack-card');
  const achCards = document.querySelectorAll('.achievement-stack-card');

  // Ensure any card approaching/within viewport has is-stacked-in-view class
  const winH = window.innerHeight || document.documentElement.clientHeight || 800;
  projCards.forEach(c => {
    if (c.getBoundingClientRect().top < winH + 150) c.classList.add('is-stacked-in-view');
  });
  achCards.forEach(c => {
    if (c.getBoundingClientRect().top < winH + 150) c.classList.add('is-stacked-in-view');
  });

  applyStackTransform(projCards);
  applyStackTransform(achCards);
}

function applyStackTransform(cards) {
  const total = cards.length;
  if (!total) return;

  // Resolved sticky top in pixels (e.g. 96px desktop, 86px tablet, 72px mobile, 66px small)
  const computedTopStr = window.getComputedStyle(cards[0]).top;
  const stickyTop = parseFloat(computedTopStr) || 96;
  const winH = window.innerHeight || document.documentElement.clientHeight || 800;

  // Measure all card rects and determine the highest card that has docked
  const cardRects = [];
  let activeDockIdx = -1;

  for (let i = 0; i < total; i++) {
    const r = cards[i].getBoundingClientRect();
    cardRects.push(r);
    // A card is considered docked if its top has reached or passed stickyTop (with 18px tolerance for subpixels & scaling)
    if (r.top <= stickyTop + 18) {
      activeDockIdx = i;
    }
  }

  cards.forEach((card, idx) => {
    const currentRect = cardRects[idx];

    // Case 1: Any card before activeDockIdx is completely covered by a higher docked card
    if (idx < activeDockIdx) {
      card.style.opacity = '0';
      card.style.transform = 'scale(0.94)';
      card.style.filter = 'blur(6px)';
      card.style.visibility = 'hidden';
      card.style.pointerEvents = 'none';
      return;
    }

    // Case 2: This card is currently the active docked card
    if (idx === activeDockIdx) {
      card.classList.add('is-stacked-in-view');
      // If there is an incoming card after this one, smoothly fade out as it approaches
      if (idx < total - 1) {
        const nextRect = cardRects[idx + 1];
        const fadeDistance = Math.min(winH * 0.72, (currentRect.height || 460) * 0.95);
        const distFromDock = nextRect.top - stickyTop;

        if (distFromDock <= 18) {
          // Next card has docked flush over this one
          card.style.opacity = '0';
          card.style.transform = 'scale(0.94)';
          card.style.filter = 'blur(6px)';
          card.style.visibility = 'hidden';
          card.style.pointerEvents = 'none';
        } else if (distFromDock < fadeDistance) {
          const prog = (fadeDistance - distFromDock) / fadeDistance;
          const clampedProg = Math.max(0, Math.min(1, prog));
          const opacity = Math.max(0, 1 - Math.pow(clampedProg, 1.25));
          const scale = 1 - (clampedProg * 0.05);
          const blur = clampedProg * 5;

          card.style.opacity = opacity.toFixed(3);
          card.style.transform = `scale(${scale.toFixed(3)})`;
          card.style.filter = `blur(${blur.toFixed(1)}px)`;
          card.style.visibility = opacity <= 0.02 ? 'hidden' : 'visible';
          card.style.pointerEvents = clampedProg > 0.6 ? 'none' : 'auto';
        } else {
          // Next card is far below: this card is 100% active and in focus
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
          card.style.filter = 'blur(0px)';
          card.style.visibility = 'visible';
          card.style.pointerEvents = 'auto';
        }
      } else {
        // This is the LAST card (idx === total - 1) and it has arrived at the dock!
        // It stays 100% in exclusive focus!
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
        card.style.filter = 'blur(0px)';
        card.style.visibility = 'visible';
        card.style.pointerEvents = 'auto';
      }
      return;
    }

    // Case 3: Card is approaching from below in normal scroll flow (idx > activeDockIdx)
    card.style.opacity = '1';
    card.style.transform = 'scale(1)';
    card.style.filter = 'blur(0px)';
    card.style.visibility = 'visible';
    card.style.pointerEvents = 'auto';
  });
}

/* --- Staggered Field Appearance on Card Scroll Entry --- */
let stackRevealsObserver = null;

function initStackCardReveals() {
  if (stackRevealsObserver) {
    stackRevealsObserver.disconnect();
  }

  const cards = document.querySelectorAll('.project-stack-card, .achievement-stack-card');
  if (!cards.length) return;

  // Immediately mark any cards already in viewport or approaching
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 800;
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < viewportHeight * 0.92) {
      card.classList.add('is-stacked-in-view');
    }
  });

  if ('IntersectionObserver' in window) {
    stackRevealsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-stacked-in-view');
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '100px 0px 50px 0px'
    });

    cards.forEach(card => stackRevealsObserver.observe(card));
  } else {
    // Fallback: reveal all
    cards.forEach(card => card.classList.add('is-stacked-in-view'));
  }
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
        showToast('Copied email: subodhum1603@gmail.com');
      }).catch(() => {
        showToast('subodhum1603@gmail.com');
      });
    });
  }

  // 2. Copy Phone to Clipboard
  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('+91 9029920228').then(() => {
        showToast('Copied phone: +91 9029920228');
      }).catch(() => {
        showToast('+91 9029920228');
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
        showToast('Please fill in all fields before sending.');
        return;
      }

      // Try AJAX submission first for a smoother experience
      e.preventDefault();

      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending Message...</span>';

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
            _subject: `New Portfolio Inquiry from ${name}`,
            _template: 'table',
            _captcha: 'false'
          })
        });

        const data = await response.json();

        if (data.success === 'true' || data.success === true) {
          contactForm.reset();
          submitBtn.innerHTML = '<span>Message Sent Successfully!</span>';
          submitBtn.style.backgroundColor = '#10B981';
          submitBtn.style.color = '#FFFFFF';
          showToast('Message sent directly to Subodh at subodhum1603@gmail.com!');

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
        showToast('Redirecting to send your message...');
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
    // State machine: 'closed' | 'opening' | 'open' | 'closing'
    let drawerState = 'closed';
    let closeTimer = null;

    function setDrawerState(isOpen) {
      // Guard against rapid/invalid transitions
      if (isOpen) {
        if (drawerState === 'open' || drawerState === 'opening') return;
        if (drawerState === 'closing') {
          // Cancel pending close
          if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
        }
        drawerState = 'opening';
        navMenu.classList.remove('closing');
        document.body.classList.remove('mobile-drawer-closing');
        navMenu.classList.add('open');
        document.body.classList.add('mobile-drawer-open');
        toggleBtn.setAttribute('aria-expanded', 'true');
        toggleBtn.innerHTML = '<i data-lucide="x" style="width: 22px; height: 22px;"></i>';
        // Transition to 'open' after animation starts
        requestAnimationFrame(() => {
          if (drawerState === 'opening') drawerState = 'open';
        });
      } else {
        if (drawerState === 'closed' || drawerState === 'closing') return;
        drawerState = 'closing';
        navMenu.classList.add('closing');
        document.body.classList.add('mobile-drawer-closing');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.innerHTML = '<i data-lucide="menu" style="width: 22px; height: 22px;"></i>';

        if (closeTimer) clearTimeout(closeTimer);
        closeTimer = setTimeout(() => {
          navMenu.classList.remove('open', 'closing');
          document.body.classList.remove('mobile-drawer-open', 'mobile-drawer-closing');
          drawerState = 'closed';
          closeTimer = null;
        }, 300);
      }
      initLucideIcons();
    }

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = drawerState === 'open' || drawerState === 'opening';
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
      if (e.key === 'Escape' && (drawerState === 'open' || drawerState === 'opening')) {
        setDrawerState(false);
      }
    });
  }
}

/* --- ScrollSpy Navigation Active Highlight (Optimized with Cached Offsets) --- */
/* --- ScrollSpy Navigation Active Highlight (Dynamically Aligned with Scrolling Fields) --- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar .nav-link[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  function updateActiveLink() {
    const header = document.querySelector('.site-header');
    const headerHeight = header ? header.offsetHeight : 80;
    // The active trigger line is aligned right below the floating navbar
    const activeThreshold = headerHeight + 60;

    let currentId = '';
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      // Section is active if its top is at or above activeThreshold, and its bottom is still below activeThreshold
      if (rect.top <= activeThreshold && rect.bottom > activeThreshold) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        const targetHref = link.getAttribute('href');
        if (targetHref === `#${currentId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }

  let scrollSpyTicking = false;
  function handleScrollSpy() {
    if (!scrollSpyTicking) {
      scrollSpyTicking = true;
      requestAnimationFrame(() => {
        updateActiveLink();
        scrollSpyTicking = false;
      });
    }
  }

  window.addEventListener('scroll', handleScrollSpy, { passive: true });
  window.addEventListener('resize', handleScrollSpy, { passive: true });
  if (window.lenis && typeof window.lenis.on === 'function') {
    window.lenis.on('scroll', handleScrollSpy);
  }
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

/* --- Super Saiyan Theme Toggle — persistent + system-aware with interactive slider --- */
function initSaiyanMode() {
  const saiyanBtn = document.getElementById('saiyanModeBtn');
  const themeSlider = document.getElementById('themeSliderToggle');
  const optRose = document.getElementById('sliderOptRose');
  const optSaiyan = document.getElementById('sliderOptSaiyan');
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  function syncMeta(isSaiyan){ if(themeMeta) themeMeta.setAttribute('content', isSaiyan ? '#050D09' : '#FFF8FA'); }

  function syncSliderUI(isSaiyan) {
    if (themeSlider) {
      themeSlider.setAttribute('aria-checked', isSaiyan ? 'true' : 'false');
      themeSlider.title = isSaiyan ? 'Current: Super Saiyan Mode (Slide to switch to Rosé)' : 'Current: Rosé Mode (Slide to switch to Super Saiyan)';
    }
    if (optRose) optRose.classList.toggle('active', !isSaiyan);
    if (optSaiyan) optSaiyan.classList.toggle('active', isSaiyan);
    if (saiyanBtn) saiyanBtn.setAttribute('aria-pressed', isSaiyan ? 'true' : 'false');
  }

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

      // 3. Trigger visual golden Ki energy flash & minimal lightning burst after video ends (~1.7s duration)
      if (flash) flash.classList.add('flashing');
      try { triggerLightningStorm(1700); } catch(e) {}

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

    // Prepare overlay, lock scroll, and start playback (no lightning during video)
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
    
    if (enableSaiyan) {
      const applySaiyan = () => {
        document.body.classList.add('saiyan-mode');
        document.documentElement.classList.add('saiyan-mode');
        document.body.classList.remove('rose-mode');
        document.documentElement.classList.remove('rose-mode');
        syncSliderUI(true);
        syncMeta(true);
        if(!noPersist) try{localStorage.setItem('portfolio-theme','saiyan');}catch(e){}
        if(!silent){ showToast('Super Saiyan Mode ON'); runPlanetNamekTransformation(); }
      };

      if (!silent) {
        playSaiyanTransformationCutscene(applySaiyan);
      } else {
        applySaiyan();
      }
    } else {
      const applyRose = () => {
        document.body.classList.remove('saiyan-mode');
        document.documentElement.classList.remove('saiyan-mode');
        document.body.classList.add('rose-mode');
        document.documentElement.classList.add('rose-mode');
        syncSliderUI(false);
        syncMeta(false);
        if(!noPersist) try{localStorage.setItem('portfolio-theme','light');}catch(e){}
        if(!silent) showToast('Rosé Mode ON');
      };

      if (!silent) {
        // Clear any active lightning canvas
        try {
          const lightningCanvas = document.getElementById('lightningOverlay');
          if (lightningCanvas) {
            const ctx = lightningCanvas.getContext('2d');
            if (ctx) ctx.clearRect(0, 0, lightningCanvas.width, lightningCanvas.height);
            lightningCanvas.classList.remove('active');
          }
        } catch(e) {}

        // Clean, minimal, and professional cross-fade transition
        if (document.startViewTransition) {
          document.startViewTransition(() => {
            applyRose();
          });
        } else {
          document.documentElement.classList.add('theme-transitioning');
          applyRose();
          setTimeout(() => {
            document.documentElement.classList.remove('theme-transitioning');
          }, 350);
        }
      } else {
        applyRose();
      }
    }
  }

  // Sync body with html anti-FOUC state or system setting without re-triggering cutscene
  const storedTheme = (() => {
    try { return localStorage.getItem('portfolio-theme'); } catch(e) { return null; }
  })();
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const shouldBeSaiyan = storedTheme ? (storedTheme === 'saiyan') : (document.documentElement.classList.contains('saiyan-mode') || systemPrefersDark);

  if (shouldBeSaiyan) {
    document.body.classList.add('saiyan-mode');
    document.documentElement.classList.add('saiyan-mode');
    document.body.classList.remove('rose-mode');
    document.documentElement.classList.remove('rose-mode');
    setSaiyanState(true, { silent: true, noPersist: true });
  } else {
    document.documentElement.classList.remove('saiyan-mode');
    document.body.classList.remove('saiyan-mode');
    document.documentElement.classList.add('rose-mode');
    document.body.classList.add('rose-mode');
    syncSliderUI(false);
    syncMeta(false);
  }

  // Listen for real-time system color scheme changes if user has not explicitly set a manual preference
  if (window.matchMedia) {
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      try {
        const manualPref = localStorage.getItem('portfolio-theme');
        if (!manualPref) {
          setSaiyanState(e.matches, { silent: true, noPersist: true });
        }
      } catch(err) {}
    };

    if (darkQuery.addEventListener) {
      darkQuery.addEventListener('change', handleSystemThemeChange);
    } else if (darkQuery.addListener) {
      darkQuery.addListener(handleSystemThemeChange);
    }
  }

  if (themeSlider) {
    let isDragging = false;
    let startX = 0;
    let dragDistance = 0;
    let initialSaiyan = false;
    const glider = themeSlider.querySelector('.theme-slider-bg-glider');

    themeSlider.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      isDragging = true;
      startX = e.clientX;
      dragDistance = 0;
      initialSaiyan = document.body.classList.contains('saiyan-mode');
      try { themeSlider.setPointerCapture(e.pointerId); } catch(err){}
    });

    themeSlider.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      dragDistance = e.clientX - startX;
      
      // If user drags (> 3px), animate the glider in real-time
      if (Math.abs(dragDistance) > 3 && glider) {
        glider.style.transition = 'none';
        const sliderWidth = themeSlider.offsetWidth;
        const maxSlide = (sliderWidth / 2) - 3;
        
        let currentPos = initialSaiyan ? maxSlide : 0;
        let newPos = Math.max(0, Math.min(maxSlide, currentPos + dragDistance));
        glider.style.transform = `translateX(${newPos}px)`;
      }
    });

    const finishDrag = (e) => {
      if (!isDragging) return;
      isDragging = false;
      try { themeSlider.releasePointerCapture(e.pointerId); } catch(err){}
      
      if (glider) {
        glider.style.transition = '';
        glider.style.transform = '';
      }

      // If dragged past threshold (> 10px), trigger state change
      if (Math.abs(dragDistance) > 10) {
        if (dragDistance > 10 && !initialSaiyan) {
          // Dragged right from Rosé -> switch to Saiyan
          setSaiyanState(true);
        } else if (dragDistance < -10 && initialSaiyan) {
          // Dragged left from Saiyan -> switch to Rosé
          setSaiyanState(false);
        } else {
          // Snap back
          syncSliderUI(initialSaiyan);
        }
      }
    };

    themeSlider.addEventListener('pointerup', finishDrag);
    themeSlider.addEventListener('pointercancel', finishDrag);

    themeSlider.addEventListener('click', (e) => {
      // If this was a drag gesture, do not treat as a static click
      if (Math.abs(dragDistance) > 10) return;

      const isCurrentlySaiyan = document.body.classList.contains('saiyan-mode');
      const targetOpt = e.target.closest('.theme-slider-btn');

      if (targetOpt) {
        // Click on a button: only switch if clicking the INACTIVE option
        if (targetOpt.id === 'sliderOptRose' && isCurrentlySaiyan) {
          e.stopPropagation();
          setSaiyanState(false);
        } else if (targetOpt.id === 'sliderOptSaiyan' && !isCurrentlySaiyan) {
          e.stopPropagation();
          setSaiyanState(true);
        }
        // Clicking the already-active button does nothing (no toggle)
      } else {
        // Click on track (not a button): toggle
        setSaiyanState(!isCurrentlySaiyan);
      }
    });

    themeSlider.addEventListener('keydown', (e) => {
      const isCurrentlySaiyan = document.body.classList.contains('saiyan-mode');
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setSaiyanState(!isCurrentlySaiyan);
      } else if (e.key === 'ArrowRight' && !isCurrentlySaiyan) {
        e.preventDefault();
        setSaiyanState(true);
      } else if (e.key === 'ArrowLeft' && isCurrentlySaiyan) {
        e.preventDefault();
        setSaiyanState(false);
      }
    });
  }

  if (saiyanBtn) {
    saiyanBtn.addEventListener('click', () => {
      const isCurrentlySaiyan = document.body.classList.contains('saiyan-mode');
      setSaiyanState(!isCurrentlySaiyan);
    });
  }

  window.setSaiyanState=setSaiyanState;
}

/* --- Planet Namek Destruction / Staggered Transformation Engine --- */
function runPlanetNamekTransformation() {
  // 1. Immediately apply the dark Planet Namek destruction sky & body theme
  document.body.classList.add('saiyan-mode');
  document.documentElement.classList.add('saiyan-mode');
  
  // 2. Trigger Planet Namek earthquake ground rumble on main content (never on document.body)
  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    mainContent.classList.remove('namek-earthquake');
    void mainContent.offsetWidth;
    mainContent.classList.add('namek-earthquake');
    setTimeout(() => {
      mainContent.classList.remove('namek-earthquake');
    }, 2400);
  }
  document.body.classList.remove('namek-earthquake');

  // 3. Fallback: trigger minimal lightning if cutscene video was not present
  if (!document.getElementById('saiyanVideoOverlay')) {
    try { triggerLightningStorm(1700); } catch(e) {}
  }

  // 4. Sequential list of elements to power up one at a time (individual components)
  const elementsToTransform = [
    document.querySelector('.hero-photo-frame'),
    document.querySelector('.hero-title'),
    ...document.querySelectorAll('#statsGrid .stat-card'),
    document.querySelector('#about .sticker-card'),
    document.querySelector('#skillsGrid'),
    document.querySelector('#experienceTimeline'),
    document.querySelector('#projectsGrid'),
    document.querySelector('#achHorizontalTrack, #achievementsGrid'),
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

        setTimeout(() => {
          el.classList.remove('saiyan-charging');
        }, 700);
      }, index * 250); // Staggered by 250ms per element for dramatic effect
  });
}

/* --- Canvas Realistic Super Saiyan Lightning Storm --- */
let activeLightningStorms = 0;

function triggerLightningStorm(durationOrCount = 1700) {
  const canvas = document.getElementById('lightningOverlay');
  if (!canvas) return;

  const durationMs = (typeof durationOrCount === 'number' && durationOrCount <= 20)
    ? 1700
    : (durationOrCount || 1700);

  if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  canvas.classList.add('active');
  activeLightningStorms++;

  const ctx = canvas.getContext('2d');
  const startTime = performance.now();
  let boltClearTimer = null;

  function flashStep() {
    const elapsed = performance.now() - startTime;
    if (elapsed >= durationMs) {
      if (boltClearTimer) clearTimeout(boltClearTimer);
      activeLightningStorms = Math.max(0, activeLightningStorms - 1);
      if (activeLightningStorms === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.classList.remove('active');
      }
      return;
    }

    // Draw 1 single minimal crisp bolt
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSingleBolt(ctx, canvas.width, canvas.height);

    // After brief persistence (85ms), clear the bolt for a clean gap
    boltClearTimer = setTimeout(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 85);

    // Rhythmic spacing between strikes: ~220ms - 320ms
    const nextInterval = 220 + Math.random() * 100;
    setTimeout(flashStep, nextInterval);
  }

  flashStep();
}

function drawLightningStrike() {
  const canvas = document.getElementById('lightningOverlay');
  if (!canvas) return;
  if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  canvas.classList.add('active');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSingleBolt(ctx, canvas.width, canvas.height);
  setTimeout(() => {
    if (activeLightningStorms <= 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.classList.remove('active');
    }
  }, 110);
}

function drawSingleBolt(ctx, w, h) {
  let startX = w * (0.25 + Math.random() * 0.5);
  let startY = 0;
  let endX = startX + (Math.random() * 160 - 80);
  let endY = h * (0.55 + Math.random() * 0.35);

  const colors = ['#38BDF8', '#FBBF24', '#FFFFFF'];
  const boltColor = colors[Math.floor(Math.random() * colors.length)];

  ctx.beginPath();
  ctx.moveTo(startX, startY);

  let currentX = startX;
  let currentY = startY;
  const segments = 14;

  for (let i = 0; i < segments; i++) {
    const nextY = currentY + (endY - startY) / segments;
    const nextX = currentX + (Math.random() * 34 - 17);
    ctx.lineTo(nextX, nextY);

    // Subtle minimal fork
    if (i === 7 && Math.random() > 0.5) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(currentX, currentY);
      let forkX = currentX;
      let forkY = currentY;
      for (let f = 0; f < 3; f++) {
        forkY += 20 + Math.random() * 15;
        forkX += (Math.random() * 30 - 15);
        ctx.lineTo(forkX, forkY);
      }
      ctx.strokeStyle = boltColor;
      ctx.lineWidth = 1;
      ctx.shadowColor = boltColor;
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.restore();
    }

    currentX = nextX;
    currentY = nextY;
  }

  // Refined outer glow
  ctx.strokeStyle = boltColor;
  ctx.lineWidth = 1.8;
  ctx.shadowColor = boltColor;
  ctx.shadowBlur = 10;
  ctx.stroke();

  // Crisp inner core
  ctx.lineWidth = 0.8;
  ctx.strokeStyle = '#FFFFFF';
  ctx.shadowBlur = 4;
  ctx.stroke();
}

/* --- 7 Dragon Balls Collector & Realistic Dragon Radar Engine --- */
const DB_STORAGE_KEY = 'portfolio_collected_dragon_balls_v2';
const collectedBalls = new Set();
let dragonBallsInitialized = false;

function loadCollectedDragonBalls() {
  try {
    const raw = localStorage.getItem(DB_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        collectedBalls.clear();
        parsed.forEach(n => {
          const num = parseInt(n, 10);
          if (num >= 1 && num <= 7) collectedBalls.add(num);
        });
      }
    }
  } catch (err) {
    console.warn('Failed to load collected dragon balls:', err);
  }
}

function saveCollectedDragonBalls() {
  try {
    localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(Array.from(collectedBalls)));
  } catch (err) {
    console.warn('Failed to persist collected dragon balls:', err);
  }
}

const dragonBallLocations = [
  { num: 1, name: "1-Star Dragon Ball", sector: "Skills Matrix", hint: "Hidden in Skills Category", x: 30, y: 35, selector: "#skills" },
  { num: 2, name: "2-Star Dragon Ball", sector: "Experience Timeline", hint: "Guarded in Experience Section", x: 68, y: 28, selector: "#experience" },
  { num: 3, name: "3-Star Dragon Ball", sector: "Projects Grid", hint: "Found in Featured Projects", x: 74, y: 64, selector: "#projects" },
  { num: 4, name: "4-Star Dragon Ball (Goku's Treasure)", sector: "AI/ML Project Header", hint: "Resting near Retinopathy AI", x: 40, y: 72, selector: "#projects" },
  { num: 5, name: "5-Star Dragon Ball", sector: "Achievements Arena", hint: "Discovered in Hackathon Wins", x: 26, y: 64, selector: "#achievements" },
  { num: 6, name: "6-Star Dragon Ball", sector: "Education & Degree", hint: "Located in Academics Section", x: 60, y: 46, selector: "#education" },
  { num: 7, name: "7-Star Dragon Ball", sector: "Contact Radar Base", hint: "Secured near Contact Hub", x: 50, y: 22, selector: "#contact" }
];

function playRadarPingSound() {
  if (!isSoundEffectsEnabled()) return;
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
  if (!isSoundEffectsEnabled()) return;
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
  // Use global DRAGON_BALL_LAYOUTS, createDragonBallStarPolygon, buildDragonBallStars, and window.getBallSVGString

  // Render SVG inside real section dragon balls — glowing authentic ki
  document.querySelectorAll('.dragon-ball[data-ball]').forEach(ball => {
    const ballAttr = ball.getAttribute('data-ball');
    const ballNum = parseInt(ballAttr, 10);
    if (ballNum >= 1 && ballNum <= 7) {
      ball.classList.add('real-dragon-ball');
      ball.classList.remove('fake-dragon-ball');
      ball.innerHTML = window.getBallSVGString(ballAttr, 48);
      ball.setAttribute('role', 'button');
      ball.setAttribute('tabindex', '0');
      ball.setAttribute('aria-label', `${ballAttr}-Star Authentic Dragon Ball`);
      ball.title = `Authentic ${ballAttr}-Star Dragon Ball (Glowing Ki Aura)`;

      if (collectedBalls.has(ballNum)) {
        ball.classList.add('collected', 'ball-disappeared');
        ball.setAttribute('aria-hidden', 'true');
        ball.setAttribute('tabindex', '-1');
        ball.style.setProperty('display', 'none', 'important');
        ball.style.setProperty('visibility', 'hidden', 'important');
        ball.style.setProperty('pointer-events', 'none', 'important');
        ball.style.setProperty('opacity', '0', 'important');
      } else {
        ball.classList.remove('collected', 'ball-disappeared');
        ball.setAttribute('aria-hidden', 'false');
        ball.style.removeProperty('display');
        ball.style.removeProperty('visibility');
        ball.style.removeProperty('pointer-events');
        ball.style.removeProperty('opacity');
      }
    }
  });

  // Render SVG inside fake decoy dragon balls — flat, dull, prank decoy
  document.querySelectorAll('.fake-dragon-ball[data-fake-ball]').forEach(ball => {
    const visualStars = ball.dataset.visualStars || (1 + Math.floor(Math.random() * 7));
    ball.classList.add('fake-dragon-ball');
    ball.classList.remove('real-dragon-ball');
    ball.innerHTML = window.getBallSVGString(String(visualStars), 48);
    ball.setAttribute('role', 'button');
    ball.setAttribute('tabindex', '0');
    ball.setAttribute('aria-label', `${visualStars}-Star Decoy Ball`);
    ball.title = `Suspicious ${visualStars}-Star Orb (Dull Ki)... Is it authentic?`;
    ball.dataset.visualStars = String(visualStars);
  });

  // Render SVG inside Shenron modal celebration balls
  document.querySelectorAll('.shenron-star-ball[data-shenron-ball]').forEach(ball => {
    const ballNum = ball.getAttribute('data-shenron-ball');
    ball.innerHTML = window.getBallSVGString(ballNum, 52);
  });

  // Ambient floating: stagger bobbing animations so balls feel organically alive
  document.querySelectorAll('.floating-decoy-ball').forEach(el => {
    const isReal = el.hasAttribute('data-ball') || el.classList.contains('real-dragon-ball');
    const rot = (Math.random() * 16 - 8).toFixed(1);
    const sc = isReal ? (1.04 + Math.random() * 0.08).toFixed(2) : (0.94 + Math.random() * 0.06).toFixed(2);
    el.style.transform = `rotate(${rot}deg) scale(${sc})`;
    el.style.animationDelay = `${(Math.random() * 2.5).toFixed(2)}s`;
  });

  const radarCount = document.getElementById('ballsFoundCount');
  if (radarCount) {
    radarCount.textContent = Math.min(7, collectedBalls.size);
  }
}

window.resetDragonBallHunt = function() {
  collectedBalls.clear();
  try {
    localStorage.removeItem(DB_STORAGE_KEY);
  } catch (e) {}

  document.querySelectorAll('.dragon-ball[data-ball]').forEach(ball => {
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
  renderRadarHUD();

  const countEl = document.getElementById('ballsFoundCount');
  if (countEl) countEl.textContent = '0';

  if (typeof playRadarPingSound === 'function') playRadarPingSound();
  showToast('✨ All 7 Dragon Balls have been re-scattered across the realm! Happy hunting!');
};

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
            ${window.getBallSVGString(ball.num, 28)}
          </div>
          <div class="radar-signal-card-info">
            <span class="radar-signal-card-name">${ball.num}-Star Ball ${isCollected ? '[Secured]' : '[Active]'}</span>
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
    showToast(`${num}-Star Ball already secured! (${collectedBalls.size}/7) - keep hunting the rest!`);
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
      showToast(`Tracking ${num}-Star Ball - look for the pulsing orb!`);
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
    else showToast(`Scanning for ${num}-Star Ball...`);
  }
};

/* ==========================================================================
   Kid Goku Right-Hand Unread Chat Message Controller
   ========================================================================== */
window.toggleGokuChatWidget = function(expand) {
  const widget = document.getElementById('gokuChatWidget');
  if (!widget) return;

  const shouldExpand = (typeof expand === 'boolean') ? expand : !widget.classList.contains('expanded');

  if (shouldExpand) {
    widget.classList.add('expanded');
    // Simple, gentle soft chime for message open
    playWebAudioTone(880, 'sine', 0.1, 0.06);
    
    // Mark the unread message counter as read
    const unread = document.getElementById('gokuUnreadCount');
    if (unread) unread.classList.add('read');
    
    initLucideIcons();
  } else {
    widget.classList.remove('expanded');
    // Simple, gentle soft low pop for message close
    playWebAudioTone(440, 'sine', 0.08, 0.05);

    // Briefly highlight the Dragon Radar below to guide user
    const radar = document.getElementById('dragonRadarWidget');
    if (radar) {
      radar.classList.remove('radar-attention-pulse');
      void radar.offsetWidth;
      radar.classList.add('radar-attention-pulse');
      setTimeout(() => {
        radar.classList.remove('radar-attention-pulse');
      }, 2600);
    }
  }
};

window.dismissGokuChatWidget = function() {
  const checkbox = document.getElementById('gokuDoNotShowCheckbox');
  if (checkbox && checkbox.checked) {
    try {
      localStorage.setItem('portfolio-quest-brief-seen', 'true');
    } catch (e) {}
  }
  window.toggleGokuChatWidget(false);
};

// Aliases for backward compatibility (Escape key and any external calls)
window.openQuestBriefingModal = function(e) {
  if (e && e.stopPropagation) e.stopPropagation();
  window.toggleGokuChatWidget(true);
};

window.closeQuestBriefingModal = function() {
  window.toggleGokuChatWidget(false);
};

function initStartupQuestBriefing() {
  const widget = document.getElementById('gokuChatWidget');
  if (!widget) return;

  // Explicitly bind click listener to Goku chat badge button
  const badge = document.getElementById('gokuChatBadge');
  if (badge && !badge._gokuBound) {
    badge._gokuBound = true;
    badge.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.toggleGokuChatWidget(true);
    });
  }

  // Ensure message starts collapsed / closed — opens ONLY on user click!
  widget.classList.remove('expanded');

  let isDismissed = false;
  try {
    isDismissed = localStorage.getItem('portfolio-quest-brief-seen') === 'true';
  } catch (e) {}

  if (isDismissed) {
    const unread = document.getElementById('gokuUnreadCount');
    if (unread) unread.classList.add('read');
    return;
  }

  // Play a simple soft notification tone ~1.4s after load to signal unread message from Goku without auto-opening
  setTimeout(() => {
    try {
      playWebAudioTone(880, 'sine', 0.1, 0.06);
      if (badge) {
        badge.classList.add('goku-badge-incoming');
        setTimeout(() => badge.classList.remove('goku-badge-incoming'), 2200);
      }
    } catch(e) {}
  }, 1400);
}

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
    showToast('All 7 Dragon Balls are in your Radar! Shenron awaits!');
  } else {
    showToast(`Radar Ping: ${remaining} Dragon Ball signals active across sectors!`);
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
  saveCollectedDragonBalls();
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
      renderRadarHUD();

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
  if (!isSoundEffectsEnabled()) return;
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
  "Bleh! That's not a real Dragon Ball! That's just an ordinary orange rock I found in the woods!",
  "Hehehe! You got tricked! That ball has 8 stars! Shenron only has 7!",
  "Bwahaha! Grandpa Gohan taught me that trick! Keep searching, silly!",
  "Aww man! You fell for Master Roshi's painted decoy ball!",
  "Bleeeh! You can't summon Shenron with a painted sphere! Check your Dragon Radar!",
  "Pfft! That ball is made of sugar candy! Master Roshi ate the other half!",
  "Oopsie! That's a Capsule Corp prototype ball from Bulma's workshop!",
  "Bleeeh! Master Roshi said fake Dragon Balls don't grant wishes!",
  "Bleeeh! You tapped a 100-star ball! You can't summon 14 Shenrons at once!",
  "Gotcha! Bulma told me only authentic Dragon Balls emit 7.5 micro-wave radar pings!"
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

  showToast("BLEH! Fooled ya! That's a FAKE Dragon Ball!");
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
  loadCollectedDragonBalls();
  renderDragonBallSVGs();
  updateRadarMiniBlips();
  renderRadarHUD();

  const radarWidget = document.getElementById('dragonRadarWidget');
  if (radarWidget && !radarWidget._radarListenerAttached) {
    radarWidget._radarListenerAttached = true;
    let radarTouchX = 0;
    let radarTouchY = 0;
    let radarTouchTime = 0;

    radarWidget.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) {
        radarTouchX = e.touches[0].clientX;
        radarTouchY = e.touches[0].clientY;
      }
    }, { passive: true });

    radarWidget.addEventListener('touchend', (e) => {
      const touch = e.changedTouches && e.changedTouches[0];
      if (touch) {
        const dx = touch.clientX - radarTouchX;
        const dy = touch.clientY - radarTouchY;
        if (Math.hypot(dx, dy) < 16) {
          radarTouchTime = Date.now();
          e.preventDefault();
          e.stopPropagation();
          openDragonRadarModal();
        }
      }
    });

    radarWidget.addEventListener('click', (e) => {
      if (Date.now() - radarTouchTime < 450) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
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

  // Real 7 Dragon Balls Click / Touch / Keyboard Handler
  const interactiveBalls = document.querySelectorAll('.dragon-ball[data-ball]');
  interactiveBalls.forEach(ball => {
    if (ball._dragonBallListenerAttached) return;
    ball._dragonBallListenerAttached = true;

    let touchX = 0;
    let touchY = 0;
    let touchTime = 0;

    const processCollect = (clientX, clientY) => {
      const ballNumber = parseInt(ball.getAttribute('data-ball'), 10);
      if (ballNumber >= 1 && ballNumber <= 7) {
        if (!collectedBalls.has(ballNumber)) {
          triggerDragonBallCollection(ballNumber, ball, clientX, clientY);
        } else {
          createKiSparks(clientX, clientY);
          showToast(`${ballNumber}-Star Dragon Ball is already secured in your Radar! (${collectedBalls.size}/7)`);
        }
      }
    };

    ball.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) {
        touchX = e.touches[0].clientX;
        touchY = e.touches[0].clientY;
      }
    }, { passive: true });

    ball.addEventListener('touchend', (e) => {
      const touch = e.changedTouches && e.changedTouches[0];
      if (touch) {
        const dx = touch.clientX - touchX;
        const dy = touch.clientY - touchY;
        if (Math.hypot(dx, dy) < 16) {
          touchTime = Date.now();
          e.preventDefault();
          e.stopPropagation();
          processCollect(touch.clientX, touch.clientY);
        }
      }
    });

    ball.addEventListener('click', (e) => {
      if (Date.now() - touchTime < 450) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      e.stopPropagation();
      processCollect(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2);
    });

    ball.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const rect = ball.getBoundingClientRect();
        processCollect(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
    });
  });

  // Fake Decoy Dragon Balls Click / Touch / Keyboard Handler (Kid Goku Prank)
  const fakeBalls = document.querySelectorAll('.fake-dragon-ball[data-fake-ball]');
  fakeBalls.forEach(fakeBall => {
    if (fakeBall._fakeBallListenerAttached) return;
    fakeBall._fakeBallListenerAttached = true;

    let touchX = 0;
    let touchY = 0;
    let touchTime = 0;

    const processFakeClick = (clientX, clientY) => {
      const fakeType = fakeBall.getAttribute('data-fake-ball') || 'decoy';
      triggerKidGokuPrank(fakeType, clientX, clientY);
    };

    fakeBall.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) {
        touchX = e.touches[0].clientX;
        touchY = e.touches[0].clientY;
      }
    }, { passive: true });

    fakeBall.addEventListener('touchend', (e) => {
      const touch = e.changedTouches && e.changedTouches[0];
      if (touch) {
        const dx = touch.clientX - touchX;
        const dy = touch.clientY - touchY;
        if (Math.hypot(dx, dy) < 16) {
          touchTime = Date.now();
          e.preventDefault();
          e.stopPropagation();
          processFakeClick(touch.clientX, touch.clientY);
        }
      }
    });

    fakeBall.addEventListener('click', (e) => {
      if (Date.now() - touchTime < 450) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      e.stopPropagation();
      processFakeClick(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2);
    });

    fakeBall.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const rect = fakeBall.getBoundingClientRect();
        processFakeClick(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
    });
  });

  // Mobile ticker pause on touch
  const tickerTrack = document.querySelector('.ticker-track');
  const tickerBalls = document.querySelectorAll('.ticker-container .dragon-ball, .ticker-container .fake-dragon-ball');
  if (tickerTrack && tickerBalls.length) {
    tickerBalls.forEach(b => {
      if (b._tickerPauseListenerAttached) return;
      b._tickerPauseListenerAttached = true;
      b.addEventListener('touchstart', () => tickerTrack.classList.add('ticker-paused'), {passive: true});
      b.addEventListener('touchend', () => setTimeout(() => tickerTrack.classList.remove('ticker-paused'), 900), {passive: true});
      b.addEventListener('mousedown', () => tickerTrack.classList.add('ticker-paused'));
      b.addEventListener('mouseleave', () => tickerTrack.classList.remove('ticker-paused'));
      b.addEventListener('focus', () => tickerTrack.classList.add('ticker-paused'));
      b.addEventListener('blur', () => tickerTrack.classList.remove('ticker-paused'));
    });
  }
}

function rebindDragonBallHandlers() {
  initDragonBallsCollector();
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

/* ==========================================================================
   Interactive Draggable Marquee Ticker Stream (Momentum + Seamless Loop)
   ========================================================================== */
function initDraggableTicker() {
  const container = document.querySelector('.ticker-container');
  const track = document.querySelector('.ticker-track');
  if (!container || !track) return;

  container.classList.add('is-draggable');
  track.style.animation = 'none';

  let currentX = 0;
  const autoSpeed = -1.15;
  let velocityX = 0;
  let isDragging = false;
  let hasDragged = false;
  let startX = 0;
  let lastX = 0;
  let lastTime = 0;
  let isHovered = false;

  let totalWidth = track.scrollWidth;
  let loopWidth = totalWidth / 2;

  function measureLoop() {
    totalWidth = track.scrollWidth;
    loopWidth = totalWidth / 2;
  }
  window.addEventListener('resize', measureLoop);
  setTimeout(measureLoop, 300);

  function tick() {
    if (!isDragging) {
      if (Math.abs(velocityX) > 0.08) {
        currentX += velocityX;
        velocityX *= 0.94; // natural fluid friction
      } else {
        velocityX = 0;
        if (!track.classList.contains('ticker-paused')) {
          currentX += isHovered ? (autoSpeed * 0.4) : autoSpeed;
        }
      }
    }

    if (loopWidth > 50) {
      while (currentX <= -loopWidth) currentX += loopWidth;
      while (currentX > 0) currentX -= loopWidth;
    }

    track.style.transform = `translate3d(${currentX.toFixed(2)}px, 0, 0)`;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  // Pointer event listeners (Mouse, Touch, Pen)
  container.addEventListener('pointerdown', (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    isDragging = true;
    hasDragged = false;
    startX = e.clientX;
    lastX = e.clientX;
    lastTime = performance.now();
    velocityX = 0;

    container.classList.add('is-dragging');
    try {
      container.setPointerCapture(e.pointerId);
    } catch (err) {}
  });

  container.addEventListener('pointermove', (e) => {
    if (!isDragging) return;

    const dx = e.clientX - lastX;
    if (Math.abs(e.clientX - startX) > 4) {
      hasDragged = true;
    }

    currentX += dx;

    if (loopWidth > 50) {
      while (currentX <= -loopWidth) currentX += loopWidth;
      while (currentX > 0) currentX -= loopWidth;
    }

    track.style.transform = `translate3d(${currentX.toFixed(2)}px, 0, 0)`;

    const now = performance.now();
    const dt = Math.max(1, now - lastTime);
    const instantV = dx / (dt / 16.67);
    velocityX = velocityX * 0.35 + instantV * 0.65;

    lastX = e.clientX;
    lastTime = now;
  });

  function endDrag(e) {
    if (!isDragging) return;
    isDragging = false;
    container.classList.remove('is-dragging');
    try {
      if (e && container.hasPointerCapture(e.pointerId)) {
        container.releasePointerCapture(e.pointerId);
      }
    } catch (err) {}

    velocityX = Math.max(-28, Math.min(28, velocityX));
  }

  container.addEventListener('pointerup', endDrag);
  container.addEventListener('pointercancel', endDrag);

  // Prevent accidental click triggering on dragon balls or items during drag
  container.addEventListener('click', (e) => {
    if (hasDragged) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  // Horizontal wheel / trackpad scroll support
  container.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      currentX -= e.deltaX * 0.85;
      velocityX = -e.deltaX * 0.25;
    }
  }, { passive: false });

  // Hover states
  container.addEventListener('mouseenter', () => { isHovered = true; });
  container.addEventListener('mouseleave', () => {
    isHovered = false;
    if (isDragging) endDrag();
  });
}

function initNimbusDrag() {
  const nimbus = document.getElementById('flyingNimbus');
  if (!nimbus) return;

  launchRandomNimbusFlight();

  nimbus.addEventListener('animationiteration', () => {
    if (!nimbus.classList.contains('nimbus-turbo') && !nimbus.classList.contains('nimbus-dragging')) {
      launchRandomNimbusFlight();
    }
  });

  const HOLD_DELAY = 300;
  let holdTimer = null;
  let isDragging = false;
  let activePointerId = null;
  let dragStartX = 0;
  let dragStartY = 0;
  let nimbusStartLeft = 0;
  let nimbusStartTop = 0;

  function triggerNimbusTurbo() {
    if (nimbusTurboTimer) clearTimeout(nimbusTurboTimer);
    nimbus.classList.remove('nimbus-turbo');
    void nimbus.offsetWidth;
    nimbus.classList.add('nimbus-turbo');

    const rect = nimbus.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        createKiSparks(cx + (Math.random() * 40 - 20), cy + (Math.random() * 30 - 15));
      }, i * 100);
    }
    drawLightningStrike();

    nimbusTurboTimer = setTimeout(() => {
      nimbus.classList.remove('nimbus-turbo');
      launchRandomNimbusFlight();
    }, 4200);
  }

  function onWindowPointerMove(e) {
    if (e.pointerId !== activePointerId || !isDragging) return;
    e.preventDefault();
    const dx = e.clientX - dragStartX;
    const dy = e.clientY - dragStartY;
    nimbus.style.position = 'fixed';
    nimbus.style.left = `${nimbusStartLeft + dx - nimbus.offsetWidth / 2}px`;
    nimbus.style.top = `${nimbusStartTop + dy - nimbus.offsetHeight / 2}px`;
    nimbus.style.transform = 'none';
  }

  function onWindowPointerUp(e) {
    if (e.pointerId !== activePointerId) return;
    window.removeEventListener('pointermove', onWindowPointerMove);
    window.removeEventListener('pointerup', onWindowPointerUp);
    window.removeEventListener('pointercancel', onWindowPointerUp);

    if (holdTimer) {
      clearTimeout(holdTimer);
      holdTimer = null;
      // Resume animation since we're not dragging (click without hold triggers turbo)
      nimbus.style.animationPlayState = '';
      activePointerId = null;
      triggerNimbusTurbo();
      return;
    }

    if (!isDragging) return;
    isDragging = false;
    nimbus.classList.remove('nimbus-dragging');
    nimbus.style.animationPlayState = '';

    const rect = nimbus.getBoundingClientRect();
    const viewH = window.innerHeight;
    const topPct = Math.round((rect.top + rect.height / 2) / viewH * 100);
    const clampedTop = Math.max(5, Math.min(85, topPct));

    nimbus.style.position = '';
    nimbus.style.left = '';
    nimbus.style.top = '';
    nimbus.style.transform = '';

    nimbus.style.setProperty('--nimbus-top', `${clampedTop}%`);
    nimbus.classList.remove('nimbus-flying-ltr', 'nimbus-flying-rtl', 'nimbus-turbo');
    void nimbus.offsetWidth;
    const midX = rect.left + rect.width / 2;
    const isLTR = midX < window.innerWidth / 2;
    nimbus.classList.add(isLTR ? 'nimbus-flying-ltr' : 'nimbus-flying-rtl');
    activePointerId = null;
  }

  nimbus.addEventListener('pointerdown', (e) => {
    if (e.button && e.button !== 0) return;
    if (activePointerId !== null) return;
    e.preventDefault();
    e.stopPropagation();

    activePointerId = e.pointerId;
    dragStartX = e.clientX;
    dragStartY = e.clientY;

    // Immediately pause animation and capture position so nimbus stays in place during hold
    nimbus.style.animationPlayState = 'paused';
    const rect = nimbus.getBoundingClientRect();
    nimbusStartLeft = rect.left + rect.width / 2;
    nimbusStartTop = rect.top + rect.height / 2;

    holdTimer = setTimeout(() => {
      holdTimer = null;
      isDragging = true;
      nimbus.classList.add('nimbus-dragging');
    }, HOLD_DELAY);

    window.addEventListener('pointermove', onWindowPointerMove);
    window.addEventListener('pointerup', onWindowPointerUp);
    window.addEventListener('pointercancel', onWindowPointerUp);
  });

  nimbus.addEventListener('dragstart', (e) => e.preventDefault());
  nimbus.addEventListener('contextmenu', (e) => e.preventDefault());
}

/* --- Global Click Animation Engine (Shockwave Ripple Rings) --- */
function initGlobalClickAnimation() {
  // On mobile/touch devices, skip continuous shockwave DOM creation to eliminate touch/scroll lag
  if (window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches) return;
  let lastAnimTime = 0;

  function spawnClickAnimation(x, y) {
    const now = Date.now();
    if (now - lastAnimTime < 80) return;
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

    setTimeout(() => ring.remove(), 450);
  }

  document.addEventListener('click', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.closest('#shenronModal')) return;
    spawnClickAnimation(e.clientX, e.clientY);
  }, { passive: true });
}

/* ==========================================================================
   Dragon Ball SVG Generation (Global Scope - used by multiple functions)
   ========================================================================== */
// Anime-canonical star layouts (100×100 viewBox)
// Verified against Toriyama's manga + Toei anime cel references.
// Each ball's stars must match the exact screen arrangement.
const DRAGON_BALL_LAYOUTS = {
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
function createDragonBallStarPolygon(cx, cy, r) {
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
function buildDragonBallStars(starCoords, r) {
  return starCoords.map(([sx, sy]) => {
    const pts = createDragonBallStarPolygon(sx, sy, r);
    // Soft drop shadow (the star is BEHIND the glass)
    const shadow = `<polygon points="${createDragonBallStarPolygon(sx + 0.7, sy + 0.9, r)}" fill="#4A0A00" opacity="0.55" />`;
    // Solid anime red star — THE canonical #E30613 / #CC0000 family
    const body = `<polygon points="${pts}" fill="#D90000" stroke="#7A0000" stroke-width="0.6" stroke-linejoin="round" stroke-linecap="round" />`;
    return shadow + body;
  }).join('');
}

window.getBallSVGString = function(starNum, size = 48) {
  const num = starNum ? starNum.toString() : '4';
  const uid = `db-${num}-${size}-${Math.random().toString(36).slice(2, 7)}`;
  const parsedNum = parseInt(num, 10);
  const hasCanonicalLayout = !isNaN(parsedNum) && DRAGON_BALL_LAYOUTS[parsedNum];

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
    innerContent = buildDragonBallStars(DRAGON_BALL_LAYOUTS[parsedNum], starR);
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
    innerContent = buildDragonBallStars(DRAGON_BALL_LAYOUTS[rnd], rndR);
  }

  // ── UNIFIED SPHERE SHELL ──────────────────────────────────────────
  // Now identical to the brand header orb (index.html:82) — same 3
  // radial gradients, same gloss ellipse, same rim & stroke.
  // Only the stars (innerContent / LAYOUTS) remain dynamic.
  return `
    <svg class="dragon-ball-svg" viewBox="0 0 100 100" width="${size}" height="${size}" style="display: block; pointer-events: none; stroke: none !important; fill: none !important;" aria-hidden="true">
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
      <circle cx="50" cy="50" r="46" fill="url(#db-body-${uid})" stroke="none" style="stroke: none !important;" />
      <circle cx="50" cy="50" r="46" fill="url(#db-rim-${uid})" stroke="none" style="stroke: none !important;" />
      <g opacity="0.98">
        ${innerContent}
      </g>
      <ellipse cx="33" cy="27" rx="16" ry="11" fill="url(#db-gloss-${uid})" stroke="none" style="stroke: none !important;" transform="rotate(-28 33 27)" />
      <circle cx="50" cy="50" r="46" fill="none" stroke="#7C3A06" stroke-width="1.5" opacity="0.55" style="stroke: #7C3A06 !important; stroke-width: 1.5px !important;" />
    </svg>
  `;
};

/* ==========================================================================
   Realistic Cinematic Shenron Emergence from Dragon Balls & Wish Engine
   ========================================================================== */
let shenronTimelineTimers = [];
let shenronStormLoopId = null;

function playShenronThunderSynth() {
  if (!isSoundEffectsEnabled()) return;
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
  if (!isSoundEffectsEnabled()) return;
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

function playSuperSaiyanAuraSound() {
  if (!isSoundEffectsEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(330, now + 0.8);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 1.2);
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

/* Shenron image-based summon — no video/chroma needed */
function startShenronChromaLoop() { /* no-op: using shenron.png */ }
function stopShenronChromaLoop() { /* no-op: using shenron.png */ }

// Preload shenron image on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const img = document.getElementById('shenronDragonImg');
  if (img) { img.src = 'assets/shenron.png'; }
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

  // Phase 2 (0.3s): The 7 Dragon Balls surge with golden Ki
  const t1 = setTimeout(() => {
    modal.classList.add('balls-active');
    playDragonBallCollectChime();
  }, 300);

  // Phase 3 (0.85s): Golden Energy Vortex rises smoothly from the balls
  const t2 = setTimeout(() => {
    modal.classList.add('beam-active');
    playSuperSaiyanAuraSound();
    drawLightningStrike();
  }, 850);

  // Phase 4 (1.45s): Shenron rises slowly & majestically from the Dragon Balls
  const t3 = setTimeout(() => {
    modal.classList.add('dragon-active');
    playShenronRoarSound();
    drawLightningStrike();
    triggerLightningStorm(2);
    startShenronChromaLoop();
  }, 1450);

  // Phase 5 (4.05s): Wish console appears after slow rise completes
  const t4 = setTimeout(() => {
    modal.classList.add('decree-active');
    playDragonBallCollectChime();
  }, 4050);

  shenronTimelineTimers.push(t1, t2, t3, t4);
};

window.closeShenronModal = function() {
  const modal = document.getElementById('shenronModal');
  if (modal) {
    modal.classList.remove('active', 'balls-active', 'beam-active', 'dragon-active', 'decree-active', 'scattering');
    document.body.style.overflow = '';
  }
  // Cleanup scatter clones + formation glow and re-enable button if interrupted mid-flight
  document.querySelectorAll('.db-scatter-clone').forEach(c => c.remove());
  document.querySelectorAll('.db-circle-central-glow').forEach(c => c.remove());
  const scatterBtn = document.querySelector('.shenron-scatter-btn');
  if (scatterBtn) scatterBtn.disabled = false;
  stopShenronLightningStorm();
  stopShenronChromaLoop();
  shenronTimelineTimers.forEach(t => clearTimeout(t));
  shenronTimelineTimers = [];
};

window.grantShenronWish = function(type) {
  drawLightningStrike();

  if (type === 'hire') {
    showToast("'YOUR WISH HAS BEEN GRANTED! CONNECTING WITH SUBODH!'");
    setTimeout(() => {
      closeShenronModal();
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const messageBox = document.getElementById('message');
        if (messageBox) {
          messageBox.value = "Hi Subodh! I collected all 7 Dragon Balls and summoned Shenron to connect with you regarding a Software / AI/ML Engineering opportunity!";
          try { messageBox.focus(); } catch(e){}
        }
      }
    }, 650);
  } else if (type === 'resume') {
    showToast("'YOUR WISH HAS BEEN GRANTED! OPENING RESUME!'");
    setTimeout(() => {
      closeShenronModal();
      const link = document.createElement('a');
      link.href = 'assets/Subodh_Muneshwar_ATS_Resume.pdf';
      link.target = '_blank';
      link.rel = 'noopener';
      link.download = 'Subodh_Muneshwar_ATS_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => link.remove(), 1000);
      // fallback to opening in new tab if download blocked
      setTimeout(() => { window.open('assets/Subodh_Muneshwar_ATS_Resume.pdf', '_blank', 'noopener'); }, 400);
    }, 500);
  } else if (type === 'projects') {
    showToast("'YOUR WISH HAS BEEN GRANTED! SHOWING PROJECTS!'");
    setTimeout(() => {
      closeShenronModal();
      const proj = document.getElementById('projects');
      if (proj) proj.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 550);
  }
};

window.scatterDragonBallsAgain = function() {
  const modal = document.getElementById('shenronModal');
  const scatterBtn = document.querySelector('.shenron-scatter-btn');

  // If modal not active (edge: called outside cinematic), fallback to instant scatter
  const isModalActive = modal && modal.classList.contains('active');
  if (!isModalActive) {
    closeShenronModal();
    collectedBalls.clear();
    saveCollectedDragonBalls();
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
    renderRadarHUD();
    try { rebindDragonBallHandlers(); } catch(e) {}
    const radarCount = document.getElementById('ballsFoundCount');
    if (radarCount) radarCount.textContent = '0';
    drawLightningStrike();
    playDragonBallCollectChime();
    showToast("The 7 Dragon Balls have scattered into the skies across the realm! Seek them out on your Dragon Radar!");
    // Staggered pop entrance for the newly scattered page balls
    const fallbackBalls = document.querySelectorAll('.dragon-ball[data-ball], .fake-dragon-ball[data-fake-ball]');
    fallbackBalls.forEach((ball, idx) => {
      ball.classList.remove('scattered-entrance');
      void ball.offsetWidth;
      ball.style.animationDelay = (idx * 105) + 'ms';
      ball.classList.add('scattered-entrance');
      const scFallback = setTimeout(() => {
        ball.classList.remove('scattered-entrance');
        ball.style.removeProperty('animation-delay');
      }, 3800 + idx * 10);
      ball.addEventListener('animationend', () => {
        clearTimeout(scFallback);
        ball.classList.remove('scattered-entrance');
        ball.style.removeProperty('animation-delay');
      }, { once: true });
    });
    return;
  }

  // Prevent double-trigger while scattering
  if (modal.classList.contains('scattering')) return;
  modal.classList.add('scattering');
  if (scatterBtn) scatterBtn.disabled = true;
  document.body.style.overflow = 'hidden';

  // Cinematic FX: roar, thunder, lightning burst
  try { playShenronRoarSound(); } catch(e) {}
  try { playShenronThunderSynth(); } catch(e) {}
  try { drawLightningStrike(); triggerLightningStorm(3); } catch(e) {}

  const altarBalls = modal.querySelectorAll('.shenron-star-ball');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clones = [];

  // Viewport center for the formation circle — gather then scatter opposite
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const centerX = vw / 2;
  const centerY = vh / 2;
  const isMobileCircle = vw < 480;
  const isTabletCircle = vw < 768;
  const circleRadius = isMobileCircle ? 68 : isTabletCircle ? 86 : 112;
  const maxDist = Math.max(vw, vh) * 0.92 + 180;

  // Central formation glow — create early so it is visible while circle forms
  const circleGlow = document.createElement('div');
  circleGlow.className = 'db-circle-central-glow';
  circleGlow.setAttribute('aria-hidden', 'true');
  document.body.appendChild(circleGlow);
  void circleGlow.offsetWidth;
  setTimeout(() => { if (circleGlow.parentNode) circleGlow.remove(); }, 4400);

  altarBalls.forEach((ball, i) => {
    const rect = ball.getBoundingClientRect();
    if (!rect.width && !rect.height) return;
    const starNum = ball.getAttribute('data-shenron-ball') || String(i + 1);
    const clone = document.createElement('div');
    clone.className = 'db-scatter-clone';
    clone.setAttribute('aria-hidden', 'true');
    clone.innerHTML = `<div class="db-scatter-clone-inner">${window.getBallSVGString ? window.getBallSVGString(starNum, window.innerWidth < 480 ? 46 : window.innerWidth < 768 ? 52 : 64) : ''}</div>`;
    const size = window.innerWidth < 480 ? 50 : window.innerWidth < 768 ? 56 : 68;
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;
    clone.style.left = (originX - size / 2) + 'px';
    clone.style.top = (originY - size / 2) + 'px';

    const baseAngle = (i / 7) * Math.PI * 2 - Math.PI / 2; // start at top, clockwise
    const jitter = (Math.random() - 0.5) * 0.32; // keep circle neat ±9°
    const angle = baseAngle + jitter;
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);

    // Circle formation around viewport center
    const circleX = centerX + cosA * circleRadius;
    const circleY = centerY + sinA * circleRadius;
    const circleOffsetX = circleX - originX;
    const circleOffsetY = circleY - originY;

    // Scatter target far beyond the circle, opposite direction (outward from center)
    let scatterDist = maxDist;
    const distScale = 0.9 + Math.random() * 0.18;
    scatterDist *= distScale;
    const scatterX = centerX + cosA * scatterDist;
    const scatterY = centerY + sinA * scatterDist;
    const biasedScatterY = scatterY - (sinA > 0 ? 60 : 0);
    const scatterOffsetX = scatterX - originX;
    const scatterOffsetY = biasedScatterY - originY;

    const rot = (520 + Math.random() * 420) * (Math.random() > 0.5 ? 1 : -1);

    clone.style.setProperty('--circle-x', circleOffsetX.toFixed(1) + 'px');
    clone.style.setProperty('--circle-y', circleOffsetY.toFixed(1) + 'px');
    clone.style.setProperty('--scatter-x', scatterOffsetX.toFixed(1) + 'px');
    clone.style.setProperty('--scatter-y', scatterOffsetY.toFixed(1) + 'px');
    clone.style.setProperty('--scatter-rot', rot.toFixed(1) + 'deg');
    clone.style.setProperty('--scatter-delay', (i * 34) + 'ms');
    document.body.appendChild(clone);
    clones.push(clone);

    setTimeout(() => {
      createKiSparks(originX, originY);
    }, i * 62);
  });


  // Central altar burst sparks
  setTimeout(() => {
    const altar = document.getElementById('shenronAltarBalls');
    if (altar) {
      const r = altar.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      for (let k = 0; k < 8; k++) {
        setTimeout(() => createKiSparks(cx + (Math.random() * 110 - 55), cy + (Math.random() * 32 - 16)), k * 98);
      }
    }
  }, 140);

  const flightMs = prefersReduced ? 1600 : 4400;

  setTimeout(() => {
    // Remove flying clones + formation glow
    clones.forEach(c => { if (c.parentNode) c.remove(); });
    document.querySelectorAll(".db-circle-central-glow").forEach(c => { if (c.parentNode) c.remove(); });
    // Safety: clear any stray clones after a beat
    setTimeout(() => document.querySelectorAll('.db-scatter-clone').forEach(c => c.remove()), 400);

    // Unlock modal and then reset page balls
    if (modal) modal.classList.remove('scattering');
    closeShenronModal();
    collectedBalls.clear();
    saveCollectedDragonBalls();

    document.querySelectorAll('.dragon-ball, .fake-dragon-ball').forEach(ball => {
      ball.classList.remove('collected', 'ball-disappeared', 'scattered-entrance', 'collected');
      ball.style.removeProperty('display');
      ball.style.removeProperty('visibility');
      ball.style.removeProperty('opacity');
      ball.style.removeProperty('pointer-events');
      ball.style.removeProperty('animation-delay');
      ball.setAttribute('aria-hidden', 'false');
      ball.setAttribute('tabindex', '0');
    });

    renderDragonBallSVGs();
    updateRadarMiniBlips();
    renderRadarHUD();
    try { rebindDragonBallHandlers(); } catch(e) {}

    const radarCount = document.getElementById('ballsFoundCount');
    if (radarCount) radarCount.textContent = '0';

    // Staggered golden pop entrance across the freshly scattered world
    const pageBalls = document.querySelectorAll('.dragon-ball[data-ball], .fake-dragon-ball[data-fake-ball]');
    pageBalls.forEach((ball, idx) => {
      ball.classList.remove('scattered-entrance');
      void ball.offsetWidth;
      ball.style.animationDelay = (idx * 105) + 'ms';
      ball.classList.add('scattered-entrance');
      const scFallback2 = setTimeout(() => {
        ball.classList.remove('scattered-entrance');
        ball.style.removeProperty('animation-delay');
      }, 3800 + idx * 10);
      ball.addEventListener('animationend', () => {
        clearTimeout(scFallback2);
        ball.classList.remove('scattered-entrance');
        ball.style.removeProperty('animation-delay');
      }, { once: true });
    });

    // Celebrate dispersal with radar pulse + lightning + chime
    const radarWidget = document.getElementById('dragonRadarWidget');
    if (radarWidget) {
      radarWidget.classList.remove('radar-ping-blast');
      void radarWidget.offsetWidth;
      radarWidget.classList.add('radar-ping-blast');
      setTimeout(() => radarWidget.classList.remove('radar-ping-blast'), 800);
    }
    try { drawLightningStrike(); } catch(e) {}
    if (!prefersReduced) try { triggerLightningStorm(3); } catch(e) {}
    try { playDragonBallCollectChime(); } catch(e) {}
    showToast("The 7 Dragon Balls have scattered into the skies across the realm! Seek them out on your Dragon Radar!");
    if (scatterBtn) scatterBtn.disabled = false;
  }, flightMs);
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
    // Intro removed — ensure landing is immediately visible with buttery smooth entrance
    document.documentElement.classList.remove('page-intro-running');
    document.body.classList.remove('page-intro-running');
    requestAnimationFrame(() => {
      document.body.classList.add('page-intro-revealed');
    });
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

    // Trigger layout refresh across all dynamic scroll runways
    window.dispatchEvent(new Event('resize'));
    setTimeout(() => window.dispatchEvent(new Event('resize')), 150);

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
   Smooth Inertia Momentum Scrolling Engine (Lenis - Zunedaalim style)
   ========================================================================== */
function initSmoothScroll() {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // On touch/mobile devices, use native hardware-accelerated momentum scrolling directly
  const isTouchDevice = window.innerWidth <= 768 || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
  if (isTouchDevice || typeof Lenis === 'undefined') {
    const siteHeader = document.querySelector('.site-header');
    if (siteHeader) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
          siteHeader.classList.add('is-scrolled');
        } else {
          siteHeader.classList.remove('is-scrolled');
        }
      }, { passive: true });
    }
    return;
  }

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.0,
    infinite: false,
  });

  window.lenis = lenis;

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Sync floating header scrolled state on scroll
  const siteHeader = document.querySelector('.site-header');
  lenis.on('scroll', (e) => {
    if (siteHeader) {
      if (e.scroll > 60) {
        siteHeader.classList.add('is-scrolled');
      } else {
        siteHeader.classList.remove('is-scrolled');
      }
    }
  });

  // Continuously recalculate scroll bounds when DOM dimensions update
  if ('ResizeObserver' in window) {
    const resizeObs = new ResizeObserver(() => {
      lenis.resize();
    });
    resizeObs.observe(document.body);
  }
  window.addEventListener('load', () => lenis.resize());

  // Automatically pause/resume Lenis during full-screen modals or cutscenes
  if ('MutationObserver' in window) {
    const bodyScrollObserver = new MutationObserver(() => {
      if (document.body.style.overflow === 'hidden') {
        lenis.stop();
      } else {
        lenis.start();
      }
    });
    bodyScrollObserver.observe(document.body, { attributes: true, attributeFilter: ['style'] });
  }

  // Smooth programmatic anchor navigation with header offset compensation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (!href || href === '#' || href === '#!') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const header = document.querySelector('.site-header');
        const headerOffset = header ? header.offsetHeight : 80;
        lenis.scrollTo(target, { offset: -headerOffset, duration: 1.15 });
        if (history.pushState) {
          history.pushState(null, null, href);
        }
      }
    });
  });

  // Also support back-to-top buttons
  document.querySelectorAll('.brand-logo, #footerBackToTop, .footer-float-top').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      lenis.scrollTo(0, { duration: 1.15 });
      if (history.pushState) {
        history.pushState(null, null, window.location.pathname);
      }
    });
  });
}

/* ==========================================================================
   Scroll-Triggered Reveal Engine (IntersectionObserver with One-by-One Cascades)
   ========================================================================== */
function initScrollReveal() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.scroll-reveal').forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observerOptions = {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        // Clean up will-change after transition completes to preserve memory
        setTimeout(() => {
          if (entry.target.classList.contains('is-revealed')) {
            entry.target.style.willChange = 'auto';
          }
        }, 1100);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  function attachElements() {
    // 1. Section Header elements - individual sequential stagger: tag (0ms), title (90ms), subtitle (180ms)
    document.querySelectorAll('.section-header').forEach(header => {
      const tag = header.querySelector('.section-tag, .section-badge');
      const title = header.querySelector('.section-title');
      const subtitle = header.querySelector('.section-subtitle, .section-desc');

      if (tag && !tag.classList.contains('scroll-reveal')) {
        tag.classList.add('scroll-reveal');
        tag.style.setProperty('--reveal-delay', '0ms');
        revealObserver.observe(tag);
      }
      if (title && !title.classList.contains('scroll-reveal')) {
        title.classList.add('scroll-reveal');
        title.style.setProperty('--reveal-delay', '90ms');
        revealObserver.observe(title);
      }
      if (subtitle && !subtitle.classList.contains('scroll-reveal')) {
        subtitle.classList.add('scroll-reveal');
        subtitle.style.setProperty('--reveal-delay', '180ms');
        revealObserver.observe(subtitle);
      }
    });

    // 2. Grids and structured collections with one-by-one sequential item cascades
    const groupConfigs = [
      { container: '.skills-grid', items: '.skill-category-card', step: 95, bloom: true },
      { container: '.projects-grid', items: '.project-card', step: 110, bloom: true },
      { container: '.project-filters', items: '.filter-btn', step: 60, bloom: false },
      { container: '.achievements-grid', items: '.achievement-card', step: 100, bloom: true },
      { container: '.experience-timeline', items: '.experience-card', step: 120, bloom: true },
      { container: '.edu-cert-grid', items: '.edu-card, .cert-card, .flashcard-deck', step: 110, bloom: true },
      { container: '.contact-cards-grid', items: '.contact-card', step: 95, bloom: true },
      { container: '.contact-form-container form', items: '.contact-form-group, .btn', step: 80, bloom: false },
      { container: '.footer-grid', items: '.footer-brand, .footer-nav, .footer-connect', step: 100, bloom: false }
    ];

    groupConfigs.forEach(group => {
      const containers = document.querySelectorAll(group.container);
      containers.forEach(cont => {
        const items = cont.querySelectorAll(group.items);
        items.forEach((item, idx) => {
          if (!item.classList.contains('scroll-reveal')) {
            item.classList.add('scroll-reveal');
            if (group.bloom) item.classList.add('card-bloom');
            item.style.setProperty('--reveal-delay', `${idx * group.step}ms`);
            revealObserver.observe(item);
          }
        });
      });
    });

    // 3. Standalone high-impact elements
    const standaloneSelectors = [
      '#about .sticker-card',
      '.scouter-card-wrapper',
      '.ticker-container',
      '.footer-bottom'
    ];

    standaloneSelectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        if (!el.classList.contains('scroll-reveal')) {
          el.classList.add('scroll-reveal');
          el.classList.add('card-bloom');
          el.style.setProperty('--reveal-delay', '60ms');
          revealObserver.observe(el);
        }
      });
    });
  }

  // Initial attach
  attachElements();

  // Expose global refresh for dynamic cards (e.g. project filter clicks)
  window.refreshScrollReveal = function() {
    setTimeout(attachElements, 60);
  };
}

/* --- Dynamic: Scroll Progress Bar --- */
function initScrollProgress() {
  if (document.querySelector('.scroll-progress-bar')) return;
  const bar = document.createElement('div');
  bar.className = 'scroll-progress-bar';
  bar.setAttribute('aria-hidden', 'true');
  document.body.prepend(bar);
  let ticking = false;
  function update() {
    const h = document.documentElement;
    const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
    const v = isFinite(scrolled) ? Math.max(0, Math.min(1, scrolled)) : 0;
    // Directly scale the bar element via GPU compositor to avoid style invalidation across document tree
    bar.style.transform = `scaleX(${v})`;
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  if (window.lenis) {
    window.lenis.on('scroll', update);
  }
  update();
}

/* --- Dynamic: Hero Parallax (rAF, respects reduced-motion & desktop only) --- */
function initHeroParallax() {
  if (window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const hero = document.querySelector('.hero-section');
  if (!hero) return;
  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    // only parallax while hero is in view
    if (y < hero.offsetHeight + 200) {
      hero.style.setProperty('--parallax-y', y + 'px');
      const scale = 1 + Math.min(y / 4000, 0.06);
      hero.style.setProperty('--aura-scale', String(scale));
    }
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  if (window.lenis) {
    window.lenis.on('scroll', onScroll);
  }
  onScroll();
}

/* --- Dynamic: Unified Card Tilt, Spotlight & Specular Glare (rAF Throttled, Zero Layout Thrashing) --- */
function initCardSpotlight() {
  // Handled uniformly inside initCardTilt for high-performance zero-reflow execution
}

function initCardTilt() {
  if (window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(hover: none)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cardSelector = '.stat-card, .sticker-card, .skill-category-card, .project-card, .achievement-card, .edu-card, .cert-card, .contact-card';

  document.querySelectorAll(cardSelector).forEach(c => c.classList.add('tilt-card'));

  let activeCard = null;
  let cardRect = null;
  let pointerX = 0;
  let pointerY = 0;
  let cardRafId = null;

  function resetCard(card) {
    if (!card) return;
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
    card.style.setProperty('--glare-opacity', '0');
  }

  function applyCardTransforms() {
    cardRafId = null;
    if (!activeCard || !cardRect) return;

    const w = cardRect.width || 1;
    const h = cardRect.height || 1;
    const px = Math.max(0, Math.min(1, (pointerX - cardRect.left) / w));
    const py = Math.max(0, Math.min(1, (pointerY - cardRect.top) / h));

    // Spotlight cursor follow (percentage)
    activeCard.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
    activeCard.style.setProperty('--my', (py * 100).toFixed(1) + '%');

    // 3D Tilt angles (degrees)
    const cx = px - 0.5;
    const cy = py - 0.5;
    const rx = (cx * 12).toFixed(2) + 'deg';
    const ry = (-cy * 12).toFixed(2) + 'deg';
    activeCard.style.setProperty('--tilt-x', rx);
    activeCard.style.setProperty('--tilt-y', ry);
    activeCard.style.setProperty('--glare-x', (px * 100).toFixed(1) + '%');
    activeCard.style.setProperty('--glare-y', (py * 100).toFixed(1) + '%');
    activeCard.style.setProperty('--glare-opacity', '1');
  }

  document.addEventListener('pointermove', (e) => {
    if (!e.target || typeof e.target.closest !== 'function') return;
    const card = e.target.closest(cardSelector);
    if (!card) {
      if (activeCard) {
        resetCard(activeCard);
        activeCard = null;
        cardRect = null;
      }
      return;
    }

    if (card !== activeCard) {
      if (activeCard) resetCard(activeCard);
      activeCard = card;
      if (!card.classList.contains('tilt-card')) card.classList.add('tilt-card');
      cardRect = card.getBoundingClientRect();
    }

    pointerX = e.clientX;
    pointerY = e.clientY;

    if (!cardRafId) {
      cardRafId = requestAnimationFrame(applyCardTransforms);
    }
  }, { passive: true });

  document.addEventListener('pointerleave', (e) => {
    if (!e.target || typeof e.target.closest !== 'function') return;
    const card = e.target.closest(cardSelector);
    if (card) {
      resetCard(card);
      if (card === activeCard) {
        activeCard = null;
        cardRect = null;
      }
    }
  }, true);
}

/* --- Dynamic: Magnetic Buttons — rAF-throttled with cached bounds --- */
function initMagneticButtons() {
  if (window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(hover: none)').matches) return;

  let activeBtn = null;
  let btnRect = null;
  let btnPointerX = 0;
  let btnPointerY = 0;
  let btnRafId = null;

  function applyBtnTransform() {
    btnRafId = null;
    if (!activeBtn || !btnRect) return;
    const dx = (btnPointerX - (btnRect.left + btnRect.width / 2)) * 0.18;
    const dy = (btnPointerY - (btnRect.top + btnRect.height / 2)) * 0.22;
    activeBtn.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
  }

  document.addEventListener('pointermove', (e) => {
    if (!e.target || typeof e.target.closest !== 'function') return;
    const btn = e.target.closest('.btn, .nav-ctrl-btn, .filter-btn');
    if (!btn) {
      if (activeBtn) {
        activeBtn.style.transform = '';
        activeBtn = null;
        btnRect = null;
      }
      return;
    }

    if (btn !== activeBtn) {
      if (activeBtn) activeBtn.style.transform = '';
      activeBtn = btn;
      btnRect = btn.getBoundingClientRect();
    }

    btnPointerX = e.clientX;
    btnPointerY = e.clientY;

    if (!btnRafId) {
      btnRafId = requestAnimationFrame(applyBtnTransform);
    }
  }, { passive: true });

  document.addEventListener('pointerleave', (e) => {
    if (activeBtn) {
      activeBtn.style.transform = '';
      activeBtn = null;
      btnRect = null;
    }
  }, true);
}

/* --- Dynamic: Stat Count-Up --- */
function initStatCountUp() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const vals = document.querySelectorAll('.stat-value');
  if (!vals.length || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const raw = el.textContent.trim();
      // extract leading number
      const m = raw.match(/^([\d.]+)(.*)$/);
      if (!m) { obs.unobserve(el); return; }
      const num = parseFloat(m[1]);
      const suffix = m[2] || '';
      if (isNaN(num)) { obs.unobserve(el); return; }
      const isFloat = m[1].includes('.');
      const decimals = isFloat ? (m[1].split('.')[1] || '').length : 0;
      const duration = 1100;
      const start = performance.now();
      el.classList.add('is-counting');
      function tick(now) {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const cur = num * eased;
        el.textContent = (isFloat ? cur.toFixed(decimals) : Math.round(cur).toString()) + suffix;
        if (t < 1) requestAnimationFrame(tick);
        else { el.textContent = raw; el.classList.remove('is-counting'); }
      }
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  vals.forEach(v => io.observe(v));
}

/* --- Dynamic: 3D Flashcard Carousel Decks (Retired in favor of single-focus spotlights) --- */
function initFlashcardDecks() {
  const deckSelectors = [];

  deckSelectors.forEach(sel => {
    const grid = document.querySelector(sel);
    if (!grid) return;
    if (grid.dataset.flashcardDeckInit === '1') return;
    grid.dataset.flashcardDeckInit = '1';

    grid.classList.add('flashcard-track');

    // Wrap with scroller for edge fades + nav
    const wrap = document.createElement('div');
    wrap.className = 'flashcard-scroller-wrap';
    wrap.setAttribute('tabindex', '0');
    wrap.setAttribute('role', 'region');
    const cleanName = sel.replace('#', '').replace('Grid', '');
    wrap.setAttribute('aria-label', `${cleanName.charAt(0).toUpperCase() + cleanName.slice(1)} Carousel`);
    grid.parentNode.insertBefore(wrap, grid);
    wrap.appendChild(grid);

    // Side Navigation Arrows
    const nav = document.createElement('div');
    nav.className = 'flashcard-nav';
    nav.innerHTML = `
      <button type="button" class="flashcard-arrow flashcard-prev" aria-label="Previous card"><i data-lucide="chevron-left" style="width:20px;height:20px;"></i></button>
      <button type="button" class="flashcard-arrow flashcard-next" aria-label="Next card"><i data-lucide="chevron-right" style="width:20px;height:20px;"></i></button>
    `;
    wrap.appendChild(nav);

    // Bottom Navigation Controls Wrap (positioned below cards)
    const controlsWrap = document.createElement('div');
    controlsWrap.className = 'flashcard-controls-wrap';
    controlsWrap.innerHTML = `
      <div class="flashcard-controls-bar">
        <button type="button" class="flashcard-pill-btn flashcard-pill-prev" aria-label="Previous card">
          <i data-lucide="chevron-left" style="width:15px;height:15px;"></i>
          <span>Prev</span>
        </button>
        <div class="flashcard-dots" role="tablist" aria-label="Carousel pagination"></div>
        <div class="flashcard-counter-badge" aria-live="polite">
          <span class="cur-card-num">01</span><span class="counter-sep">/</span><span class="total-card-num">01</span>
        </div>
        <button type="button" class="flashcard-pill-btn flashcard-pill-next" aria-label="Next card">
          <span>Next</span>
          <i data-lucide="chevron-right" style="width:15px;height:15px;"></i>
        </button>
      </div>
      <div class="flashcard-drag-hint" aria-hidden="true">
        <span>←</span><span>Drag, swipe or use arrow keys</span><span>→</span>
      </div>
    `;
    wrap.appendChild(controlsWrap);

    if (window.lucide) try { window.lucide.createIcons(); } catch(e){}

    const prevBtn = nav.querySelector('.flashcard-prev');
    const nextBtn = nav.querySelector('.flashcard-next');
    const pillPrev = controlsWrap.querySelector('.flashcard-pill-prev');
    const pillNext = controlsWrap.querySelector('.flashcard-pill-next');
    const dotsWrap = controlsWrap.querySelector('.flashcard-dots');
    const curNumEl = controlsWrap.querySelector('.cur-card-num');
    const totalNumEl = controlsWrap.querySelector('.total-card-num');

    let dots = [];

    function buildDots() {
      dotsWrap.innerHTML = '';
      dots = [];
      const cards = Array.from(grid.children);
      totalNumEl.textContent = String(cards.length).padStart(2, '0');

      cards.forEach((card, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'flashcard-dot';
        dot.setAttribute('aria-label', `Go to card ${i + 1}`);
        dot.setAttribute('role', 'tab');
        dot.addEventListener('click', (e) => {
          e.preventDefault();
          scrollToCard(i);
        });
        dotsWrap.appendChild(dot);
        dots.push(dot);

        // Click on side card to smoothly glide it to center
        card.addEventListener('click', (e) => {
          if (grid.dataset.dragging === '1') return;
          // Don't intercept button or link clicks on active card
          if (e.target.closest('a, button, .btn, .project-details-btn, .project-github-link, .modal-close-btn')) return;
          const gridCenter = grid.getBoundingClientRect().left + grid.clientWidth / 2;
          const cardCenter = card.getBoundingClientRect().left + card.offsetWidth / 2;
          if (Math.abs(cardCenter - gridCenter) > 40) {
            scrollToCard(i);
          }
        });
      });
    }

    function updateState() {
      const cards = Array.from(grid.children);
      if (!cards.length) return;

      const gridRect = grid.getBoundingClientRect();
      const mid = gridRect.left + gridRect.width / 2;

      let bestIdx = 0;
      let minDiff = Infinity;
      cards.forEach((card, idx) => {
        const r = card.getBoundingClientRect();
        const cardCenter = (r.left + r.right) / 2;
        const diff = Math.abs(cardCenter - mid);
        if (diff < minDiff) {
          minDiff = diff;
          bestIdx = idx;
        }
      });

      // Update counter and dots
      curNumEl.textContent = String(bestIdx + 1).padStart(2, '0');
      dots.forEach((d, idx) => {
        const isActive = idx === bestIdx;
        d.classList.toggle('is-active', isActive);
        d.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      // Update card classes for depth (no skew)
      cards.forEach((card, idx) => {
        card.classList.remove('is-active-card', 'is-prev-card', 'is-next-card', 'is-far-card');
        if (idx === bestIdx) {
          card.classList.add('is-active-card');
        } else if (idx === bestIdx - 1) {
          card.classList.add('is-prev-card');
        } else if (idx === bestIdx + 1) {
          card.classList.add('is-next-card');
        } else {
          card.classList.add('is-far-card');
        }
      });

      // Update button disabled states
      const atStart = bestIdx === 0;
      const atEnd = bestIdx === cards.length - 1;
      if (prevBtn) prevBtn.disabled = atStart;
      if (nextBtn) nextBtn.disabled = atEnd;
      if (pillPrev) pillPrev.disabled = atStart;
      if (pillNext) pillNext.disabled = atEnd;
      wrap.classList.toggle('at-start', atStart);
      wrap.classList.toggle('at-end', atEnd);
    }

    function scrollToCard(idx) {
      const cards = Array.from(grid.children);
      if (idx < 0 || idx >= cards.length) return;
      const card = cards[idx];
      if (!card) return;
      const targetLeft = card.offsetLeft - (grid.clientWidth - card.offsetWidth) / 2;
      grid.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: 'smooth'
      });
    }

    function goPrev() {
      const cards = Array.from(grid.children);
      const curIdx = dots.findIndex(d => d.classList.contains('is-active'));
      const target = Math.max(0, (curIdx >= 0 ? curIdx : 0) - 1);
      scrollToCard(target);
    }

    function goNext() {
      const cards = Array.from(grid.children);
      const curIdx = dots.findIndex(d => d.classList.contains('is-active'));
      const target = Math.min(cards.length - 1, (curIdx >= 0 ? curIdx : 0) + 1);
      scrollToCard(target);
    }

    prevBtn.addEventListener('click', (e) => { e.preventDefault(); goPrev(); });
    nextBtn.addEventListener('click', (e) => { e.preventDefault(); goNext(); });
    pillPrev.addEventListener('click', (e) => { e.preventDefault(); goPrev(); });
    pillNext.addEventListener('click', (e) => { e.preventDefault(); goNext(); });

    // Keyboard navigation: Left/Right Arrow keys
    wrap.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      }
    });

    let ticking = false;
    grid.addEventListener('scroll', () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          updateState();
          ticking = false;
        });
      }
    }, { passive: true });

    // Drag / Swipe handling (desktop mouse & trackpad)
    let isDown = false, startX = 0, startLeft = 0, hasDragged = false;
    grid.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse') return;
      if (e.button !== 0) return;
      if (e.target.closest('button, a, .btn, .project-details-btn, .project-github-link, .project-actions, .modal-close-btn')) return;
      isDown = true;
      hasDragged = false;
      grid.dataset.dragging = '1';
      startX = e.clientX;
      startLeft = grid.scrollLeft;
      grid.setPointerCapture(e.pointerId);
      grid.style.scrollSnapType = 'none';
      grid.style.scrollBehavior = 'auto';
    });

    grid.addEventListener('pointermove', (e) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 6) hasDragged = true;
      grid.scrollLeft = startLeft - dx;
    });

    function endDrag(e) {
      if (!isDown) return;
      isDown = false;
      delete grid.dataset.dragging;
      grid.style.scrollSnapType = '';
      grid.style.scrollBehavior = '';
      try { grid.releasePointerCapture(e.pointerId); } catch(err){}
      if (hasDragged) {
        const handler = (ev) => { ev.preventDefault(); ev.stopPropagation(); };
        grid.addEventListener('click', handler, { capture: true, once: true });
        setTimeout(() => { hasDragged = false; }, 80);
      }
      setTimeout(updateState, 150);
    }

    grid.addEventListener('pointerup', endDrag);
    grid.addEventListener('pointercancel', endDrag);

    // Initial setup
    buildDots();
    requestAnimationFrame(() => {
      updateState();
      setTimeout(updateState, 200);
    });

    // Rebuild dots on DOM mutation (e.g. project filter)
    const mo = new MutationObserver(() => {
      buildDots();
      requestAnimationFrame(updateState);
    });
    mo.observe(grid, { childList: true });

    window.addEventListener('resize', updateState, { passive: true });
  });
}

window.refreshFlashcardDecks = function() {
  const tracks = document.querySelectorAll('.flashcard-track');
  tracks.forEach(track => {
    track.dispatchEvent(new Event('scroll'));
  });
};

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
      msg: "Captain Ginyu: *Strikes dynamic pose* We need a 10x Saiyan Engineer to lead the Ginyu backend squad!"
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
        showToast(`Loaded DBZ Meme Prompt from ${joke.name.split(' ')[0]}!`);
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
  let idx = words.indexOf(el.textContent.trim());
  if (idx < 0) idx = 0;

  // Only animate if hero is currently intersecting with viewport
  let isHeroVisible = true;
  if ('IntersectionObserver' in window) {
    const hero = document.getElementById('hero');
    if (hero) {
      const io = new IntersectionObserver((entries) => {
        isHeroVisible = entries[0].isIntersecting;
      }, { threshold: 0.1 });
      io.observe(hero);
    }
  }

  setInterval(() => {
    if (!isHeroVisible) return;
    idx = (idx + 1) % words.length;
    el.classList.remove('is-entering');
    el.classList.add('is-exiting');
    setTimeout(() => {
      el.textContent = words[idx];
      el.classList.remove('is-exiting');
      requestAnimationFrame(() => {
        el.classList.add('is-entering');
        setTimeout(() => el.classList.remove('is-entering'), 400);
      });
    }, 280);
  }, 3200);
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

/* ── Capsule Corp Scouter Profile Card 3D Tilt & Power Flare Interactivity ── */
function initHeroProfileCardInteractive() {
  const card = document.getElementById('heroHudCard') || document.querySelector('.hero-hud-frame');
  const scouterBtn = document.getElementById('heroScouterReadout');
  const powerNum = document.getElementById('heroPowerNum');
  if (!card) return;

  // 1. Interactive Scouter Combat Power Analysis
  if (scouterBtn && powerNum) {
    let isScanning = false;
    scouterBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isScanning) return;
      isScanning = true;

      // Scouter chirps
      if (typeof playWebAudioTone === 'function') {
        playWebAudioTone(680, 'sine', 0.05, 0.05);
        setTimeout(() => playWebAudioTone(880, 'triangle', 0.08, 0.06), 70);
        setTimeout(() => playWebAudioTone(1140, 'square', 0.12, 0.07), 150);
      }

      // Energy surge visual pulse
      card.style.transition = 'box-shadow 0.2s ease, transform 0.2s ease';
      card.classList.add('scouter-power-surging');

      const readings = ['8,420', '9,150', '9,890', 'OVER 9000!', 'MAX: 99,999+', '9,001+'];
      let step = 0;
      const interval = setInterval(() => {
        if (step < readings.length) {
          powerNum.textContent = readings[step];
          step++;
        } else {
          clearInterval(interval);
          isScanning = false;
          card.classList.remove('scouter-power-surging');
          card.style.transition = '';
        }
      }, 120);
    });
  }

  // 2. Subtle 3D Perspective Tilt on Desktop
  if (window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let tiltRaf = null;
    let targetRotX = 0, targetRotY = 0;

    function applyTilt() {
      tiltRaf = null;
      card.style.transform = `perspective(1200px) rotateX(${targetRotX.toFixed(2)}deg) rotateY(${targetRotY.toFixed(2)}deg) translateZ(4px)`;
    }

    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const centerX = r.left + r.width / 2;
      const centerY = r.top + r.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      // Subtle tilt: max ~4 degrees
      targetRotX = -(mouseY / (r.height / 2)) * 4.2;
      targetRotY = (mouseX / (r.width / 2)) * 4.2;

      if (tiltRaf === null) tiltRaf = requestAnimationFrame(applyTilt);
    });

    card.addEventListener('mouseleave', () => {
      if (tiltRaf) { cancelAnimationFrame(tiltRaf); tiltRaf = null; }
      card.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
      card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      setTimeout(() => { card.style.transition = ''; }, 450);
    });
  }
}

/* --- Capsule Corp Saiyan Scouter Summary Console Interactivity --- */
function initScouterSummaryConsole() {
  const cards = document.querySelectorAll('.scouter-pillar-card');
  cards.forEach((card, idx) => {
    card.addEventListener('mouseenter', () => {
      // Scouter lock-on chirps: rising frequency by sector
      const baseFreq = 620 + idx * 80;
      if (typeof playWebAudioTone === 'function') {
        playWebAudioTone(baseFreq, 'sine', 0.05, 0.04);
      }
    });
  });

  const spiritBombBtn = document.querySelector('.scouter-spirit-bomb-btn');
  if (spiritBombBtn) {
    spiritBombBtn.addEventListener('click', () => {
      // Ki charging surge audio
      if (typeof playWebAudioTone === 'function') {
        playWebAudioTone(440, 'triangle', 0.14, 0.08);
        setTimeout(() => {
          playWebAudioTone(660, 'sine', 0.22, 0.09);
        }, 120);
      }
    });
  }

  const actionBtns = document.querySelectorAll('.scouter-github-btn, .scouter-linkedin-btn, .scouter-contact-btn');
  actionBtns.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      if (typeof playWebAudioTone === 'function') {
        playWebAudioTone(740, 'sine', 0.04, 0.03);
      }
    });
  });
}
