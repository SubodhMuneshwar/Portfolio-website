/**
 * Subodh Uttam Muneshwar - Portfolio Interactivity & Render Engine
 * Optimized for performance: Reduced DOM manipulation, efficient event handling
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize essential functionality first
  initLucideIcons();
  initSmoothScroll();
  initPageIntroAnimation();

  // Initialize core rendering
  renderSkills();
  renderExperience();
  renderProjects('all');
  renderAchievements();
  renderEducation();
  renderCertifications();

  // Initialize interactive features (deferred for better initial load)
  setTimeout(() => {
    initHeroStats();
    initProjectFilters();
    initContactInteractions();
    initConfettiTriggers();
    initMobileMenu();
    initScrollSpy();
    initKeyboardShortcuts();
    initSaiyanMode();
    initDragonBallsCollector();
    initNimbusDrag();
    initGlobalClickAnimation();
    initScrollReveal();
    initDbzJokePlaceholders();
    initHeroRotatingWord();
    initPhotoRevealLens();
    initScrollProgress();
    initHeroParallax();
    initCardSpotlight();
    initCardTilt();
    initMagneticButtons();
    initStatCountUp();
    initFlashcardDecks();
    initStartupQuestBriefing();
    initSoundEffects();
  }, 100);
});

/* ==========================================================================
   Web Audio Synthesizers & Sound Effects (SFX) Engine - Optimized
   ========================================================================== */
let audioCtx = null;
let sfxGainNode = null;
let isSfxEnabledState = true;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
      // Create gain node for better volume control
      sfxGainNode = audioCtx.createGain();
      sfxGainNode.gain.value = 0.3; // Reduced volume for less intrusive SFX
      sfxGainNode.connect(audioCtx.destination);
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

const SFX_STORAGE_KEY = 'portfolio_sfx_enabled';

// Initialize SFX state from localStorage
try {
  const saved = localStorage.getItem(SFX_STORAGE_KEY);
  isSfxEnabledState = saved !== null ? saved === 'true' : true;
} catch (e) {
  isSfxEnabledState = true;
}

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

// Optimized SFX function - reduced complexity and frequency range
function playSfxChirp() {
  if (!isSfxEnabledState) return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Create a simple, short sound
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime); // A4
    osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.08); // E5

    osc.connect(sfxGainNode);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {
    // Silently fail if audio context issues
  }
}

/* ==========================================================================
   Optimized Core Functions
   ========================================================================== */

function initLucideIcons() {
  // Batch process icon replacements for better performance
  const icons = document.querySelectorAll('[data-lucide]');
  icons.forEach(el => {
    const name = el.getAttribute('data-lucide');
    if (name && window.lucide) {
      const icon = window.lucide.icons[name];
      if (icon) {
        el.innerHTML = icon;
      }
    }
  });
}

function initSmoothScroll() {
  // Use CSS scroll-behavior where possible, fallback to JS only if needed
  if ('scrollBehavior' in document.documentElement.style) {
    return; // Native smooth scroll supported
  }

  // Fallback for older browsers - but most modern browsers support it
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

function initPageIntroAnimation() {
  // Reduced intensity animation for better performance
  document.documentElement.classList.add('page-loading');

  window.addEventListener('load', () => {
    setTimeout(() => {
      document.documentElement.classList.remove('page-loading');
    }, 300); // Reduced from 500ms
  });
}

function initHeroStats() {
  // Optimized stats rendering
  const statsGrid = document.getElementById('statsGrid');
  if (!statsGrid) return;

  // Clear and rebuild efficiently
  statsGrid.innerHTML = '';

  portfolioData.personal.stats.forEach(stat => {
    const statCard = document.createElement('div');
    statCard.className = 'stat-card';
    statCard.innerHTML = `
      <div class="stat-icon" style="color: var(--${stat.color});">
        <i data-lucide="${stat.icon}"></i>
      </div>
      <div class="stat-value">${stat.value}</div>
      <div class="stat-label">${stat.label}</div>
    `;
    statsGrid.appendChild(statCard);
  });

  // Lazy load Lucide icons in stats
  setTimeout(() => {
    const statIcons = statsGrid.querySelectorAll('[data-lucide]');
    statIcons.forEach(el => {
      const name = el.getAttribute('data-lucide');
      if (name && window.lucide) {
        const icon = window.lucide.icons[name];
        if (icon) {
          el.innerHTML = icon;
        }
      }
    });
  }, 0);
}

function renderSkills() {
  const skillsGrid = document.getElementById('skillsGrid');
  if (!skillsGrid) return;

  skillsGrid.innerHTML = '';

  portfolioData.skills.forEach(category => {
    const skillCard = document.createElement('div');
    skillCard.className = 'skill-category-card';
    skillCard.innerHTML = `
      <div class="skill-category-header">
        <div class="skill-icon-box" style="background: var(--${category.color}-alt); color: var(--${category.color});">
          <i data-lucide="${category.icon}"></i>
        </div>
        <h3 class="skill-category-title">${category.category}</h3>
      </div>
      <div class="skill-list">
        ${category.items.map(item => `
          <div class="skill-item">
            <span class="skill-name">${item.name}</span>
            <span class="skill-level">${item.level}</span>
          </div>
        `).join('')}
      </div>
    `;
    skillsGrid.appendChild(skillCard);
  });

  // Lazy load icons
  setTimeout(() => {
    const skillIcons = skillsGrid.querySelectorAll('[data-lucide]');
    skillIcons.forEach(el => {
      const name = el.getAttribute('data-lucide');
      if (name && window.lucide) {
        const icon = window.lucide.icons[name];
        if (icon) {
          el.innerHTML = icon;
        }
      }
    });
  }, 0);
}

function renderExperience() {
  const experienceTimeline = document.getElementById('experienceTimeline');
  if (!experienceTimeline) return;

  experienceTimeline.innerHTML = '';

  portfolioData.experience.forEach((exp, index) => {
    const experienceCard = document.createElement('div');
    experienceCard.className = `experience-card ${index % 2 === 0 ? 'even' : 'odd'}`;
    experienceCard.innerHTML = `
      <div class="experience-header">
        <div class="experience-company">
          <div class="experience-logo">
            ${exp.logo ? `<img src="${exp.logo}" alt="${exp.logoText || 'Company logo'}">` : '<div class="logo-placeholder">🏢</div>'}
          </div>
          <div class="experience-company-info">
            <div class="experience-company-name">${exp.company}</div>
            <div class="experience-company-location">${exp.location}</div>
          </div>
        </div>
        <div class="experience-period">${exp.period}</div>
        ${exp.badgeColor ? `<span class="experience-badge" style="background: var(--${exp.badgeColor}-alt); color: var(--${exp.badgeColor});">${exp.badge}</span>` : ''}
      </div>
      <h3 class="experience-title">${exp.role}</h3>
      <p class="experience-description">${exp.description}</p>

      ${exp.highlights && exp.highlights.length > 0 ? `
        <ul class="experience-highlights">
          ${exp.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
        </ul>
      ` : ''}

      ${exp.techStack && exp.techStack.length > 0 ? `
        <div class="experience-tech-stack">
          ${exp.techStack.map(tech => `<span class="experience-tech">${tech}</span>`).join('')}
        </div>
      ` : ''}
    `;
    experienceTimeline.appendChild(experienceCard);
  });
}

function renderProjects(filter = 'all') {
  const projectsGrid = document.getElementById('projectsGrid');
  if (!projectsGrid) return;

  projectsGrid.innerHTML = '';

  const filteredProjects = filter === 'all'
    ? portfolioData.projects
    : portfolioData.projects.filter(p => p.category === filter);

  if (filteredProjects.length === 0) {
    projectsGrid.innerHTML = '<p class="no-projects">No projects found for this category.</p>';
    return;
  }

  filteredProjects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.innerHTML = `
      <img src="${project.image}" alt="${project.title}" class="project-card-img" loading="lazy">
      <div class="project-card-content">
        <h3 class="project-card-title">${project.title}</h3>
        <p class="project-card-tagline">${project.tagline}</p>
        <ul class="project-card-bullets">
          ${project.bullets.map(bullet => `<li>${bullet}</li>`).join('')}
        </ul>
        <div class="project-actions">
          <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
            <i data-lucide="github"></i>
            <span>GitHub</span>
          </a>
          ${project.demo ? `<a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Demo</a>` : ''}
        </div>
      </div>
    `;
    projectsGrid.appendChild(projectCard);
  });

  // Lazy load images and icons
  setTimeout(() => {
    // Lazy load images
    const projectImages = projectsGrid.querySelectorAll('img[loading="lazy"]');
    projectImages.forEach(img => {
      img.src = img.getAttribute('src');
    });

    // Load Lucide icons
    const projectIcons = projectsGrid.querySelectorAll('[data-lucide]');
    projectIcons.forEach(el => {
      const name = el.getAttribute('data-lucide');
      if (name && window.lucide) {
        const icon = window.lucide.icons[name];
        if (icon) {
          el.innerHTML = icon;
        }
      }
    });
  }, 0);
}

function renderAchievements() {
  const achievementsGrid = document.getElementById('achievementsGrid');
  if (!achievementsGrid) return;

  achievementsGrid.innerHTML = '';

  portfolioData.achievements.forEach(achievement => {
    const achievementCard = document.createElement('div');
    achievementCard.className = 'achievement-card';
    achievementCard.innerHTML = `
      <div class="achievement-header">
        <div class="achievement-icon" style="background: var(--${achievement.color}-alt); color: var(--${achievement.color});">
          <i data-lucide="${achievement.icon}"></i>
        </div>
        <div>
          <h4 class="achievement-title">${achievement.title}</h4>
          <div class="achievement-organization">${achievement.organization}</div>
          <div class="achievement-period">${achievement.period}</div>
        </div>
      </div>
      <p class="achievement-description">${achievement.description}</p>
    `;
    achievementsGrid.appendChild(achievementCard);
  });

  // Lazy load icons
  setTimeout(() => {
    const achievementIcons = achievementsGrid.querySelectorAll('[data-lucide]');
    achievementIcons.forEach(el => {
      const name = el.getAttribute('data-lucide');
      if (name && window.lucide) {
        const icon = window.lucide.icons[name];
        if (icon) {
          el.innerHTML = icon;
        }
      }
    });
  }, 0);
}

function renderEducation() {
  const educationColumn = document.getElementById('educationColumn');
  if (!educationColumn) return;

  educationColumn.innerHTML = '';

  portfolioData.education.forEach(edu => {
    const eduItem = document.createElement('div');
    eduItem.className = 'edu-item';
    eduItem.innerHTML = `
      <div>
        <h4 class="edu-degree">${edu.degree}</h4>
        <div class="edu-institution">${edu.institution}</div>
      </div>
      <div>
        <div class="edu-period">${edu.period}</div>
        ${edu.score ? `<span class="edu-score" style="background: var(--${edu.color}-alt); color: var(--${edu.color});">${edu.score}</span>` : ''}
      </div>
    `;
    educationColumn.appendChild(eduItem);
  });
}

function renderCertifications() {
  const certificationsColumn = document.getElementById('certificationsColumn');
  if (!certificationsColumn) return;

  certificationsColumn.innerHTML = '';

  portfolioData.certifications.forEach(cert => {
    const certItem = document.createElement('div');
    certItem.className = 'cert-item';
    certItem.innerHTML = `
      <div>
        <h4 class="cert-title">${cert.title}</h4>
        <div class="cert-issuer">${cert.issuer}</div>
      </div>
      <div>
        <div class="cert-date">${cert.date}</div>
        ${cert.badge ? `<span class="cert-badge" style="background: var(--${cert.color}-alt); color: var(--${cert.color});">${cert.badge}</span>` : ''}
      </div>
    `;
    certificationsColumn.appendChild(certItem);
  });
}

function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  if (!filterButtons.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter projects
      const filter = btn.getAttribute('data-filter');
      renderProjects(filter);
    });
  });
}

function initContactInteractions() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Basic validation
    const name = this.elements['name'].value.trim();
    const email = this.elements['email'].value.trim();
    const message = this.elements['message'].value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all required fields.');
      return;
    }

    // Simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Show success state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;

    // Simulate sending (in real app, this would be an actual API call)
    setTimeout(() => {
      submitBtn.innerHTML = '<span>Message Sent!</span>';
      submitBtn.style.background = 'var(--secondary)';
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
        this.reset();
      }, 2000);
    }, 1000);
  });

  // Copy to clipboard functionality
  document.getElementById('copyEmailBtn')?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('subodhum1603@gmail.com');
      showCopyFeedback('copyEmailBtn');
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  });

  document.getElementById('copyPhoneBtn')?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('+91 9029920228');
      showCopyFeedback('copyPhoneBtn');
    } catch (err) {
      console.error('Failed to copy phone:', err);
    }
  });
}

function showCopyFeedback(buttonId) {
  const btn = document.getElementById(buttonId);
  if (!btn) return;

  const originalHTML = btn.innerHTML;
  btn.innerHTML = '<span>Copied! ✓</span>';
  btn.style.background = 'var(--secondary)';

  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.style.background = '';
  }, 1500);
}

function initConfettiTriggers() {
  // Reduced confetti frequency for better performance
  const confettiTriggers = [
    '.btn-primary',
    '.filter-btn.active',
    '.hero-ctas .btn-primary'
  ];

  confettiTriggers.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => {
      element.addEventListener('click', () => {
        // Only trigger confetti occasionally to reduce performance impact
        if (Math.random() > 0.7) { // 30% chance
          triggerConfetti();
        }
      });
    });
  });
}

function triggerConfetti() {
  try {
    if (window.confetti) {
      window.confetti({
        particleCount: 30, // Reduced from 50
        spread: 16,
        origin: { y: 0.6 }
      });
    }
  } catch (e) {
    // Confetti not available, silently fail
  }
}

function initMobileMenu() {
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');

  if (!mobileMenuToggle || !navMenu) return;

  mobileMenuToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    mobileMenuToggle.setAttribute('aria-expanded', isOpen);

    // Animate icon
    const icon = mobileMenuToggle.querySelector('i');
    if (icon) {
      icon.classList.toggle('lucide-menu');
      icon.classList.toggle('lucide-x');
    }
  });

  // Close mobile menu when clicking a link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        const icon = mobileMenuToggle.querySelector('i');
        if (icon) {
          icon.classList.add('lucide-menu');
          icon.classList.remove('lucide-x');
        }
      }
    });
  });
}

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  // Throttle scroll event for better performance
  let ticking = false;

  function updateActiveNavLink() {
    const scrollPosition = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100; // Offset for header
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
        });
      }
    });

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateActiveNavLink();
        ticking = true;
      });
    }
  }

  window.addEventListener('scroll', onScroll);
  // Initial check
  updateActiveNavLink();
}

function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Prevent conflicts with form inputs
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
      return;
    }

    switch (e.key.toLowerCase()) {
      case 'm':
        e.preventDefault();
        window.toggleSoundEffects();
        break;
      case 't':
        e.preventDefault();
        window.toggleTheme();
        break;
      case 'r':
        e.preventDefault();
        if (window.openDragonRadarModal) window.openDragonRadarModal();
        break;
      case 'h':
        e.preventDefault();
        if (window.summonShenron) window.summonShenron();
        break;
      case 'ArrowUp':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        break;
    }
  });
}

function initSaiyanMode() {
  const themeSliderToggle = document.getElementById('themeSliderToggle');
  const sliderOptRose = document.getElementById('sliderOptRose');
  const sliderOptSaiyan = document.getElementById('sliderOptSaiyan');
  const saiyanModeBtn = document.getElementById('saiyanModeBtn');

  if (!themeSliderToggle) return;

  // Initialize from localStorage
  const isSaiyanMode = localStorage.getItem('portfolio-theme') === 'saiyan' ||
                      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (isSaiyanMode) {
    document.documentElement.classList.add('saiyan-mode');
    sliderOptRose.classList.remove('active');
    sliderOptSaiyan.classList.add('active');
    themeSliderToggle.setAttribute('aria-checked', 'true');
  }

  function setSaiyanMode(enabled) {
    if (enabled) {
      document.documentElement.classList.add('saiyan-mode');
      localStorage.setItem('portfolio-theme', 'saiyan');
      sliderOptRose.classList.remove('active');
      sliderOptSaiyan.classList.add('active');
      themeSliderToggle.setAttribute('aria-checked', 'true');
    } else {
      document.documentElement.classList.remove('saiyan-mode');
      localStorage.setItem('portfolio-theme', 'rosé');
      sliderOptRose.classList.add('active');
      sliderOptSaiyan.classList.remove('active');
      themeSliderToggle.setAttribute('aria-checked', 'false');
    }

    // Update button states
    if (saiyanModeBtn) {
      saiyanModeBtn.click(); // Trigger any attached events
    }
  }

  // Click handlers
  themeSliderToggle.addEventListener('click', (e) => {
    e.preventDefault();
    const isChecked = themeSliderToggle.getAttribute('aria-checked') === 'true';
    setSaiyanMode(!isChecked);
  });

  sliderOptRose.addEventListener('click', () => setSaiyanMode(false));
  sliderOptSaiyan.addEventListener('click', () => setSaiyanMode(true));

  // Keyboard accessibility
  themeSliderToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const isChecked = themeSliderToggle.getAttribute('aria-checked') === 'true';
      setSaiyanMode(!isChecked);
    }
  });

  // Fallback button
  if (saiyanModeBtn) {
    saiyanModeBtn.addEventListener('click', () => {
      const isChecked = themeSliderToggle.getAttribute('aria-checked') === 'true';
      setSaiyanMode(!isChecked);
    });
  }
}

function initDragonBallsCollector() {
  // Optimized Dragon Ball collection with reduced DOM operations
  const dragonBalls = document.querySelectorAll('.dragon-ball');
  const dragonRadarWidget = document.getElementById('dragonRadarWidget');
  const ballsFoundCount = document.getElementById('ballsFoundCount');
  const dragonRadarModal = document.getElementById('dragonRadarModal');
  const dragonBallCollectOverlay = document.getElementById('dragonBallCollectOverlay');
  const shenronModal = document.getElementById('shenronModal');
  const kidGokuPrankModal = document.getElementById('kidGokuPrankModal');

  if (!dragonBalls.length) return;

  let foundBalls = new Set();
  const totalBalls = 7;

  // Pre-bind event listeners for better performance
  const handleBallClick = (event) => {
    const ball = event.currentTarget;
    const ballId = ball.getAttribute('data-ball');

    if (!ballId || foundBalls.has(ballId)) return;

    // Fake balls (prank balls)
    if (ball.classList.contains('fake-dragon-ball')) {
      triggerPrank(ball);
      return;
    }

    // Real dragon ball
    foundBalls.add(ballId);
    ball.classList.add('collected');

    // Update radar count
    if (ballsFoundCount) {
      ballsFoundCount.textContent = foundBalls.size;
    }

    // Visual feedback
    ball.style.transform = 'scale(1.2)';
    ball.style.boxShadow = '0 0 20px rgba(255, 126, 0, 0.6)';

    // Check if all balls collected
    if (foundBalls.size === totalBalls) {
      setTimeout(() => {
        triggerDragonBallCollection();
      }, 500);
    }
  };

  dragonBalls.forEach(ball => {
    ball.addEventListener('click', handleBallClick);

    // Prevent duplicate clicks during animation
    ball.addEventListener('mousedown', (e) => {
      if (ball.classList.contains('collected') || ball.classList.contains('ball-disappeared')) {
        e.preventDefault();
      }
    });
  });

  function triggerPrank(ball) {
    // Add prank styling
    ball.classList.add('ball-disappeared');

    // Show prank modal
    if (kidGokuPrankModal) {
      kidGokuPrankModal.style.display = 'flex';
      // Auto-hide after 3 seconds
      setTimeout(() => {
        if (kidGokuPrankModal) {
          kidGokuPrankModal.style.display = 'none';
        }
      }, 3000);
    }

    // Reset ball after prank
    setTimeout(() => {
      ball.classList.remove('ball-disappeared');
    }, 1000);
  }

  function triggerDragonBallCollection() {
    // Show collection animation
    if (dragonBallCollectOverlay) {
      dragonBallCollectOverlay.classList.add('active');
      document.getElementById('dbCollectTitle').textContent = `${totalBalls}-Star Dragon Ball`;

      // Hide after animation
      setTimeout(() => {
        if (dragonBallCollectOverlay) {
          dragonBallCollectOverlay.classList.remove('active');
        }

        // Show Shenron modal
        if (shenronModal) {
          shenronModal.classList.add('active');

          // Auto-hide Shenron after 8 seconds
          setTimeout(() => {
            if (shenronModal) {
              shenronModal.classList.remove('active');
            }

            // Reset for next round
            setTimeout(() => {
              resetDragonBalls();
            }, 1000);
          }, 8000);
        }
      }, 3000);
    }
  }

  function resetDragonBalls() {
    foundBalls.clear();

    // Reset all balls
    dragonBalls.forEach(ball => {
      ball.classList.remove('collected', 'ball-disappeared');
      ball.style.transform = '';
      ball.style.boxShadow = '';
    });

    // Reset radar
    if (ballsFoundCount) {
      ballsFoundCount.textContent = '0';
    }
  }

  // Dragon Radar functionality
  if (dragonRadarWidget && dragonRadarModal) {
    let radarActive = false;

    function toggleRadarModal() {
      radarActive = !radarActive;
      dragonRadarModal.style.display = radarActive ? 'flex' : 'none';
      dragonRadarWidget.classList.toggle('radar-active', radarActive);

      if (radarActive) {
        startRadarScan();
      } else {
        stopRadarScan();
      }
    }

    dragonRadarWidget.addEventListener('click', toggleRadarModal);
    dragonRadarWidget.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleRadarModal();
      }
    });

    // Close modal on backdrop click
    dragonRadarModal.addEventListener('click', (e) => {
      if (e.target === dragonRadarModal) {
        toggleRadarModal();
      }
    });

    function startRadarScan() {
      // Add scanning animation
      dragonRadarWidget.classList.add('radar-scanning');

      // Simulate radar sweep
      const radarSweep = document.querySelector('.radar-sweep-beam');
      if (radarSweep) {
        radarSweep.style.animation = 'radar-sweep 2s linear infinite';
      }

      // Animate blips
      animateRadarBlips();
    }

    function stopRadarScan() {
      dragonRadarWidget.classList.remove('radar-scanning');
      const radarSweep = document.querySelector('.radar-sweep-beam');
      if (radarSweep) {
        radarSweep.style.animation = '';
      }

      // Stop blip animation
      const radarBlips = document.querySelectorAll('.radar-blip');
      radarBlips.forEach(blip => {
        blip.style.animation = '';
        blip.style.opacity = '0.3';
      });
    }

    function animateRadarBlips() {
      const radarBlipsLayer = document.getElementById('radarBlipsLayer');
      if (!radarBlipsLayer) return;

      // Clear existing blips
      radarBlipsLayer.innerHTML = '';

      // Create animated blips for found balls
      foundBalls.forEach(ballId => {
        const blip = document.createElement('div');
        blip.className = 'radar-blip';
        blip.style.background = 'var(--accent)';
        blip.style.width = '8px';
        blip.style.height = '8px';
        blip.style.borderRadius = '50%';
        blip.style.position = 'absolute';

        // Random position within radar
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 60; // 60px radius
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        blip.style.left = `calc(50% + ${x}px)`;
        blip.style.top = `calc(50% + ${y}px)`;
        blip.style.animation = `radar-blink ${2 + Math.random() * 3}s ease-in-out infinite`;

        radarBlipsLayer.appendChild(blip);
      });
    }
  }

  // Ping radar functionality
  document.querySelectorAll('[onclick*="pingRadarScan"]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (dragonRadarModal && dragonRadarModal.style.display === 'flex') {
        // Trigger radar ping effect
        dragonRadarWidget.classList.add('radar-ping-blast');
        setTimeout(() => {
          dragonRadarWidget.classList.remove('radar-ping-blast');
        }, 700);

        // Briefly show all balls on radar
        if (dragonRadarModal.style.display === 'flex') {
          const radarBlipsLayer = document.getElementById('radarBlipsLayer');
          if (radarBlipsLayer) {
            radarBlipsLayer.innerHTML = '';

            // Show all balls temporarily
            for (let i = 1; i <= totalBalls; i++) {
              const blip = document.createElement('div');
              blip.className = 'radar-blip';
              blip.style.background = 'var(--accent)';
              blip.style.width = '10px';
              blip.style.height = '10px';
              blip.style.borderRadius = '50%';
              blip.style.position = 'absolute';

              // Distribute evenly in a circle
              const angle = (i - 1) * (Math.PI * 2) / totalBalls;
              const radius = 50;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              blip.style.left = `calc(50% + ${x}px)`;
              blip.style.top = `calc(50% + ${y}px)`;
              blip.style.opacity = '0.8';

              radarBlipsLayer.appendChild(blip);
            }

            // Hide after brief moment
            setTimeout(() => {
              animateRadarBlips(); // Return to normal state
            }, 1500);
          }
        }
      }
    });
  });
}

function initNimbusDrag() {
  // Optimized Nimbus drag with reduced calculations
  const nimbusElements = document.querySelectorAll('.flying-nimbus');

  if (!nimbusElements.length) return;

  nimbusElements.forEach(nimbus => {
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    const startDrag = (e) => {
      isDragging = true;
      nimbus.classList.add('nimbus-dragging');

      const rect = nimbus.getBoundingClientRect();
      initialLeft = rect.left;
      initialTop = rect.top;

      if (e.type === 'touchstart') {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      } else {
        startX = e.clientX;
        startY = e.clientY;
      }

      e.preventDefault();
    };

    const doDrag = (e) => {
      if (!isDragging) return;

      let clientX, clientY;
      if (e.type === 'touchmove') {
        if (e.touches.length === 0) return;
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const dx = clientX - startX;
      const dy = clientY - startY;

      // Apply movement with bounds checking
      const newLeft = Math.max(0, Math.min(window.innerWidth - nimbus.offsetWidth, initialLeft + dx));
      const newTop = Math.max(0, Math.min(window.innerHeight - nimbus.offsetHeight, initialTop + dy));

      nimbus.style.left = `${newLeft}px`;
      nimbus.style.top = `${newTop}px`;

      e.preventDefault();
    };

    const endDrag = () => {
      isDragging = false;
      nimbus.classList.remove('nimbus-dragging');
    };

    // Mouse events
    nimbus.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', doDrag);
    document.addEventListener('mouseup', endDrag);

    // Touch events
    nimbus.addEventListener('touchstart', startDrag, { passive: false });
    document.addEventListener('touchmove', doDrag, { passive: false });
    document.addEventListener('touchend', endDrag);
    document.addEventListener('touchcancel', endDrag);
  });
}

function initGlobalClickAnimation() {
  // Optimized click particles with object pooling
  const particles = [];
  const maxParticles = 10; // Limit concurrent particles
  let particleIndex = 0;

  function createParticle(x, y) {
    // Reuse particles from pool
    let particle = particles[particleIndex];
    if (!particle) {
      particle = document.createElement('div');
      particle.className = 'global-click-particle';
      particle.style.position = 'fixed';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '9999';
      particle.style.borderRadius = '50%';
      document.body.appendChild(particle);
      particles[particleIndex] = particle;
    }

    // Configure particle
    const size = 4 + Math.random() * 6; // 4-10px
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = `hsl(${Math.random() * 60 + 30}, 70%, 60%)`; // Orange-yellow range
    particle.style.left = `${x - size/2}px`;
    particle.style.top = `${y - size/2}px`;

    // Animate and reset
    particle.style.opacity = '0.8';
    particle.style.transform = 'scale(0)';

    // Trigger reflow for animation
    void particle.offsetWidth;

    particle.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
    particle.style.transform = 'scale(1.5)';
    particle.style.opacity = '0';

    // Reset after animation
    setTimeout(() => {
      particleIndex = (particleIndex + 1) % maxParticles;
    }, 300);
  }

  document.addEventListener('click', (e) => {
    // Limit click particles to reduce performance impact
    if (Math.random() > 0.3) return; // 30% chance

    createParticle(e.clientX, e.clientY);
  });

  // Ring effect (simplified)
  document.addEventListener('click', (e) => {
    if (Math.random() > 0.1) return; // 10% chance for ring

    const ring = document.createElement('div');
    ring.className = 'click-shockwave-ring';
    ring.style.position = 'fixed';
    ring.style.pointerEvents = 'none';
    ring.style.zIndex = '9998';
    ring.style.borderRadius = '50%';
    ring.style.border = '2px solid var(--accent)';
    ring.style.left = `${e.clientX}px`;
    ring.style.top = `${e.clientY}px`;
    ring.style.transform = 'translate(-50%, -50%) scale(0.1)';
    ring.style.opacity = '0.6';

    document.body.appendChild(ring);

    // Animate ring
    void ring.offsetWidth; // Trigger reflow
    ring.style.transition = 'transform 0.4s ease-out, opacity 0.4s ease-out';
    ring.style.transform = 'translate(-50%, -50%) scale(1.5)';
    ring.style.opacity = '0';

    // Remove after animation
    setTimeout(() => {
      ring.remove();
    }, 400);
  });
}

function initScrollReveal() {
  // Optimized scroll reveal with intersection observer
  const revealElements = document.querySelectorAll(
    '.sticker-card, .stat-card, .skill-category-card, .experience-card, ' +
    '.achievement-card, .edu-card, .cert-card, .project-card'
  );

  if (!revealElements.length) return;

  // Use Intersection Observer for better performance
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target); // Stop observing once visible
      }
    });
  }, observerOptions);

  revealElements.forEach(element => {
    element.classList.add('reveal-hidden');
    observer.observe(element);
  });

  // Add CSS for reveal animation
  const style = document.createElement('style');
  style.textContent = `
    .reveal-hidden {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.4s ease-out, transform 0.4s ease-out;
    }

    .reveal-visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
}

function initDbzJokePlaceholders() {
  // Optimized joke placeholder initialization
  const jokeButtons = document.querySelectorAll('#rollDbzPromptBtn');

  jokeButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Simple joke rotation - reduced complexity
      const jokes = [
        "Why did the Saiyan bring a ladder to the bar? He heard the drinks were on the house!",
        "What do you call a Namekian who tells jokes? A comic relief!",
        "Why don't Androids ever get lost? They always follow their GPS (Global Positioning System)!",
        "What's a Frieza's favorite type of music? Cool tunes!",
        "Why did Krillin go to art school? To learn how to draw his destructo disc!",
        "What do you call a Saiyan who can't stop telling jokes? A Super Saiyan 'LOL'!"
      ];

      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
      alert(randomJoke);
    });
  });
}

function initHeroRotatingWord() {
  // Optimized rotating word with reduced DOM operations
  const rotatingWord = document.getElementById('heroRotatingWord');
  if (!rotatingWord) return;

  const words = ['Backend Builder', 'API Architect', 'AI Engineer', 'Systems Designer', 'Cloud Specialist'];
  let wordIndex = 0;

  function updateWord() {
    rotatingWord.textContent = words[wordIndex];
    wordIndex = (wordIndex + 1) % words.length;
  }

  // Change word every 3 seconds
  setInterval(updateWord, 3000);

  // Initialize first word
  rotatingWord.textContent = words[0];
}

function initPhotoRevealLens() {
  // Optimized photo reveal with CSS transitions
  const photoFrame = document.getElementById('heroPhotoFrame');
  const photoImg = document.querySelector('.hero-photo-img');
  const revealLayers = document.querySelectorAll('.hero-reveal-layer');

  if (!photoFrame || !photoImg) return;

  // Use CSS transitions instead of JS animations where possible
  photoFrame.addEventListener('mousemove', (e) => {
    const rect = photoFrame.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top;  // y position within the element

    // Calculate position as percentage
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    // Apply to reveal layers with reduced intensity
    revealLayers.forEach((layer, index) => {
      const offset = index * 15; // Increased offset for better effect
      layer.style.backgroundPosition = `${xPercent - offset}% ${yPercent - offset}%`;
    });
  });

  photoFrame.addEventListener('mouseleave', () => {
    // Reset to center
    revealLayers.forEach(layer => {
      layer.style.backgroundPosition = '50% 50%';
    });
  });
}

function initScrollProgress() {
  // Optimized scroll progress bar
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress-bar';
  progressBar.style.position = 'fixed';
  progressBar.style.top = '0';
  progressBar.style.left = '0';
  progressBar.style.height = '3px';
  progressBar.style.background = 'var(--accent)';
  progressBar.style.width = '0%';
  progressBar.style.zIndex = '1000';
  progressBar.style.transition = 'width 0.1s ease-out';
  document.body.appendChild(progressBar);

  function updateScrollProgress() {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = `${progress}%`;
  }

  // Throttle scroll events
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateScrollProgress();
        ticking = true;
      });
    }
  }

  window.addEventListener('scroll', onScroll);
  window.addEventListener('resize', () => {
    updateScrollProgress(); // Update on resize as well
  });

  // Initial update
  updateScrollProgress();
}

function initHeroParallax() {
  // Optimized parallax with reduced calculations
  const heroSection = document.querySelector('.hero-section');
  if (!heroSection) return;

  let ticking = false;

  function onMouseMove(e) {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        // Calculate movement with reduced intensity
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01; // Reduced multiplier
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

        // Apply to background elements only
        heroSection.style.backgroundPosition = `${50 + moveX}% ${50 + moveY}%`;

        ticking = false;
      });
    }
  }

  document.addEventListener('mousemove', onMouseMove);
}

function initCardSpotlight() {
  // Optimized card spotlight with CSS
  const cards = document.querySelectorAll(
    '.sticker-card, .stat-card, .skill-category-card, .experience-card, ' +
    '.achievement-card, .edu-card, .cert-card, .project-card'
  );

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-2px)';
      card.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = 'none';
    });
  });
}

function initCardTilt() {
  // Optimized card tilt with limited elements
  const tiltCards = document.querySelectorAll('.tilt-card');

  if (!tiltCards.length) return;

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate tilt with reduced intensity
      const tiltX = ((x / rect.width) - 0.5) * 2; // -1 to 1
      const tiltY = ((y / rect.height) - 0.5) * 2; // -1 to 1

      // Apply transform with limits
      const rotateX = tiltY * 5; // Reduced from 10 to 5 degrees
      const rotateY = tiltX * -5; // Reduced from 10 to -5 degrees

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1, 1, 1)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
}

function initMagneticButtons() {
  // Optimized magnetic buttons with reduced calculations
  const magneticBtns = document.querySelectorAll('.magnetic-btn');

  if (!magneticBtns.length) return;

  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate magnetic pull with reduced intensity
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const distanceX = x - centerX;
      const distanceY = y - centerY;

      // Reduced magnetic effect
      const pullX = distanceX * 0.03; // Reduced from 0.1
      const pullY = distanceY * 0.03; // Reduced from 0.1

      // Apply transform with limits
      const translateX = Math.max(-4, Math.min(4, pullX)); // Limit movement
      const translateY = Math.max(-4, Math.min(4, pullY));

      btn.style.transform = `translate(${translateX}px, ${translateY}px) scale(1.02)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px) scale(1)';
    });
  });
}

function initStatCountUp() {
  // Optimized stat count up with Intersection Observer
  const statValues = document.querySelectorAll('.stat-value');

  if (!statValues.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStatCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  statValues.forEach(stat => {
    observer.observe(stat);
  });

  function animateStatCount(element) {
    const target = parseInt(element.getAttribute('data-target')) ||
                   parseInt(element.textContent.replace(/[^0-9]/g, '')) || 0;
    const duration = 1500; // Reduced from 2000ms
    const startTime = performance.now();

    function updateCount(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smoother animation
      const easedProgress = progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;

      const currentValue = Math.floor(easedProgress * target);
      element.textContent = currentValue.toString();

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        // Format the final number with commas if needed
        if (target >= 1000) {
          element.textContent = target.toLocaleString();
        }
      }
    }

    requestAnimationFrame(updateCount);
  }
}

function initFlashcardDecks() {
  // Optimized flashcard initialization
  const flashcardTracks = document.querySelectorAll('.flashcard-track');

  if (!flashcardTracks.length) return;

  flashcardTracks.forEach(track => {
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    const startDrag = (e) => {
      isDragging = true;
      track.classList.add('is-dragging');

      if (e.type === 'touchstart') {
        startX = e.touches[0].clientX;
      } else {
        startX = e.clientX;
      }

      scrollLeft = track.scrollLeft;

      e.preventDefault();
    };

    const doDrag = (e) => {
      if (!isDragging) return;

      let clientX;
      if (e.type === 'touchmove') {
        if (e.touches.length === 0) return;
        clientX = e.touches[0].clientX;
      } else {
        clientX = e.clientX;
      }

      const dx = clientX - startX;
      const walk = dx * 2; // Scroll speed multiplier
      track.scrollLeft = scrollLeft - walk;

      e.preventDefault();
    };

    const endDrag = () => {
      isDragging = false;
      track.classList.remove('is-dragging');
    };

    track.addEventListener('mousedown', startDrag);
    track.addEventListener('touchstart', startDrag, { passive: false });

    document.addEventListener('mousemove', doDrag);
    document.addEventListener('touchmove', doDrag, { passive: false });

    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
    document.addEventListener('touchcancel', endDrag);
  });
}

function initStartupQuestBriefing() {
  // Optimized quest briefing with reduced DOM operations
  const questBriefing = document.getElementById('startupQuestBriefing');
  if (!questBriefing) return;

  const hasSeen = localStorage.getItem('portfolio-quest-brief-seen') === 'true';

  if (!hasSeen) {
    // Show briefly then hide
    questBriefing.style.display = 'block';

    setTimeout(() => {
      questBriefing.style.display = 'none';
      localStorage.setItem('portfolio-quest-brief-seen', 'true');
    }, 5000); // Reduced from 8000ms
  }
}

function initSoundEffects() {
  // Already initialized in the SFX section above
  // This function exists for compatibility with the original code
}

/* ==========================================================================
   Theme Toggle Function (for global access)
   ========================================================================== */
window.toggleTheme = function() {
  const isSaiyanMode = document.documentElement.classList.contains('saiyan-mode');
  document.documentElement.classList.toggle('saiyan-mode', !isSaiyanMode);

  // Update localStorage
  if (isSaiyanMode) {
    localStorage.setItem('portfolio-theme', 'rosé');
  } else {
    localStorage.setItem('portfolio-theme', 'saiyan');
  }

  // Update UI elements if they exist
  const sliderOptRose = document.getElementById('sliderOptRose');
  const sliderOptSaiyan = document.getElementById('sliderOptSaiyan');
  const themeSliderToggle = document.getElementById('themeSliderToggle');

  if (sliderOptRose && sliderOptSaiyan && themeSliderToggle) {
    if (!isSaiyanMode) {
      sliderOptRose.classList.add('active');
      sliderOptSaiyan.classList.remove('active');
      themeSliderToggle.setAttribute('aria-checked', 'false');
    } else {
      sliderOptRose.classList.remove('active');
      sliderOptSaiyan.classList.add('active');
      themeSliderToggle.setAttribute('aria-checked', 'true');
    }
  }
};

/* ==========================================================================
   Performance Monitoring (optional)
   ========================================================================== */
// Uncomment to enable basic performance monitoring
/*
if ('performance' in window) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const timing = window.performance.timing;
      const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
      console.log(`Page load time: ${pageLoadTime}ms`);

      if (pageLoadTime > 3000) {
        console.warn('Page load time is high - consider further optimizations');
      }
    }, 1000);
  });
}
*/