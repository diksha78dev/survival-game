// --- Preloader ---
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('hidden');
      }, 1000);
    });
  }
}

// --- Scroll Progress Bar ---
function initScrollProgress() {
  const progressBar = document.getElementById('progressBar');
  if (!progressBar) return;
  
  window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

// --- Back to Top Button ---
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// --- Bottom Navigation ---
function initBottomNav() {
  const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
  if (bottomNavItems.length === 0) return;
  
  const updateActiveNav = () => {
    const scrollPosition = window.scrollY + 200;
    
    bottomNavItems.forEach(item => {
      const sectionId = item.dataset.section;
      const section = document.getElementById(sectionId);
      
      if (section) {
        const { offsetTop, offsetHeight } = section;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          bottomNavItems.forEach(i => i.classList.remove('active'));
          item.classList.add('active');
        }
      }
    });
  };
  
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();
}

// --- Typewriter Effect ---
function initTypewriter() {
  const h1 = document.querySelector('h1');
  if (!h1) return;
  
  const text = h1.innerText;
  h1.innerText = '';
  let index = 0;
  
  const type = () => {
    if (index < text.length) {
      const char = text[index];
      if (char === '\n') {
        h1.innerHTML += '<br>';
      } else {
        h1.innerHTML += char;
      }
      index++;
      setTimeout(type, 80);
    }
  };
  
  // Start after a delay
  setTimeout(type, 500);
}

// --- Smooth Page Transitions ---
function initPageTransitions() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#' || !href.startsWith('#')) return;
      
      const targetId = href.substring(1);
      const target = document.getElementById(targetId);
      
      if (target) {
        e.preventDefault();
        // Smooth scroll is handled by CSS, but we can add a visual transition
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// --- Particle Spark Effect ---
function createParticleSpark(x, y) {
  const container = document.getElementById('particlesContainer');
  if (!container) return;
  
  const particleCount = 12;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    const angle = (i / particleCount) * Math.PI * 2;
    const velocity = 3 + Math.random() * 3;
    const size = 2 + Math.random() * 3;
    
    particle.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      background: var(--red);
      border-radius: 50%;
      pointer-events: none;
      box-shadow: 0 0 ${size * 2}px var(--red);
    `;
    
    container.appendChild(particle);
    
    let lifespan = 60;
    let vx = Math.cos(angle) * velocity;
    let vy = Math.sin(angle) * velocity;
    let x_pos = x;
    let y_pos = y;
    
    const animate = () => {
      x_pos += vx;
      y_pos += vy;
      vy += 0.1; // gravity
      lifespan--;
      
      particle.style.left = x_pos + 'px';
      particle.style.top = y_pos + 'px';
      particle.style.opacity = lifespan / 60;
      
      if (lifespan > 0) {
        requestAnimationFrame(animate);
      } else {
        particle.remove();
      }
    };
    animate();
  }
}

// --- Confetti Animation ---
function createConfetti() {
  const container = document.getElementById('particlesContainer');
  if (!container) return;
  
  const confettiCount = 50;
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    const xStart = Math.random() * window.innerWidth;
    const colors = ['var(--red)', 'var(--gold)', 'var(--cyan)'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    confetti.style.cssText = `
      position: fixed;
      left: ${xStart}px;
      top: -10px;
      width: 10px;
      height: 10px;
      background: ${color};
      pointer-events: none;
      animation: confeltiFall ${2 + Math.random() * 2}s linear forwards;
      transform: rotate(${Math.random() * 360}deg);
    `;
    
    container.appendChild(confetti);
    setTimeout(() => confetti.remove(), (2 + Math.random() * 2) * 1000);
  }
}

// Add confetti animation keyframes
if (!document.querySelector('style[data-confetti]')) {
  const style = document.createElement('style');
  style.setAttribute('data-confetti', 'true');
  style.textContent = `
    @keyframes confeltiFall {
      0% { transform: translateY(0) rotate(0deg); opacity: 1; }
      100% { transform: translateY(${window.innerHeight}px) rotate(720deg); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

// --- Countdown Timer ---
function initCountdown() {
  const eventDate = new Date();
  eventDate.setDate(eventDate.getDate() + 7);
  eventDate.setHours(18, 0, 0, 0);
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate.getTime() - now;
    
    if (distance < 0) {
      document.getElementById('countdown-days').textContent = '0';
      document.getElementById('countdown-hours').textContent = '0';
      document.getElementById('countdown-minutes').textContent = '0';
      document.getElementById('countdown-seconds').textContent = '0';
      return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('countdown-days').textContent = String(days).padStart(2, '0');
    document.getElementById('countdown-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('countdown-minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('countdown-seconds').textContent = String(seconds).padStart(2, '0');
  }
  
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// --- Trial Countdown Timer ---
function initTrialCountdown() {
  const countdownSection = document.getElementById('countdown-section');
  if (!countdownSection) return;
  
  // Set target date 7 days from today
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 7);
  targetDate.setHours(0, 0, 0, 0);
  
  const hoursElement = document.getElementById('trial-hours');
  const minutesElement = document.getElementById('trial-minutes');
  const secondsElement = document.getElementById('trial-seconds');
  const expiredMessage = document.getElementById('trial-expired');
  const timeBoxes = document.querySelectorAll('.time-box');
  const separators = document.querySelectorAll('.time-separator');
  
  function updateTrialCountdown() {
    try {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      
      if (distance < 0) {
        // Timer has expired
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        
        // Show expired state
        timeBoxes.forEach(box => box.classList.add('expired'));
        separators.forEach(sep => sep.classList.add('expired'));
        expiredMessage.classList.add('show');
        
        return; // Stop updating
      }
      
      // Calculate HH:MM:SS
      const totalSeconds = Math.floor(distance / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      
      // Update display with zero padding
      hoursElement.textContent = String(hours).padStart(2, '0');
      minutesElement.textContent = String(minutes).padStart(2, '0');
      secondsElement.textContent = String(seconds).padStart(2, '0');
    } catch (error) {
      console.error('Error updating trial countdown:', error);
    }
  }
  
  updateTrialCountdown();
  setInterval(updateTrialCountdown, 1000);
}

// --- Parallax Grid Effect ---
function initParallaxGrid() {
  const heroGrid = document.querySelector('.hero-grid');
  const heroSection = document.getElementById('hero');
  
  window.addEventListener('scroll', () => {
    if (!heroGrid) return;
    
    const heroRect = heroSection.getBoundingClientRect();
    const heroVisible = heroRect.bottom > 0 && heroRect.top < window.innerHeight;
    
    if (heroVisible) {
      const scrollY = window.scrollY;
      const heroTop = heroSection.offsetTop;
      const offset = (scrollY - heroTop) * 0.5;
      
      heroGrid.style.transform = `translateY(${offset}px)`;
    }
  });
}

// --- Custom Cursor ---
function initCustomCursor() {
  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    setTimeout(() => {
      cursorRing.style.left = e.clientX + 'px';
      cursorRing.style.top = e.clientY + 'px';
    }, 80);
  });
  
  document.querySelectorAll('a, button, input, select, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(2)';
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });
}

// --- Mobile Menu ---
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.add('open');
    });
  }
  
  if (mobileClose) {
    mobileClose.addEventListener('click', closeMobileMenu);
  }
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) mobileMenu.classList.remove('open');
}

// --- Scroll Reveal ---
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// --- Count Up ---
function initCountUp() {
  const countEls = document.querySelectorAll('[data-count]');
  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const duration = 1500;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = Math.floor(current);
          if (current >= target) clearInterval(timer);
        }, 16);
        countObserver.unobserve(el);
      }
    });
  });
  countEls.forEach(el => countObserver.observe(el));
}

// --- Password Show/Hide Toggle ---
function initPasswordToggle() {
  const passwordInput = document.getElementById('password');
  const passwordToggle = document.getElementById('passwordToggle');
  
  if (!passwordToggle) return;
  
  passwordToggle.addEventListener('click', (e) => {
    e.preventDefault();
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    passwordToggle.textContent = isPassword ? '👁‍🗨️' : '👁️';
  });
}

// --- Password Strength Indicator ---
function updatePasswordStrength(password) {
  const strengthBars = document.querySelectorAll('.pwd-strength-bar');
  const strengthText = document.getElementById('strengthText');
  
  let strength = 0;
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^a-zA-Z\d]/.test(password)) strength++;
  
  // Cap strength at 4 for display
  strength = Math.min(strength, 4);
  
  strengthBars.forEach((bar, i) => {
    if (i < strength) {
      if (strength <= 1) bar.style.background = 'var(--red)';
      else if (strength === 2) bar.style.background = 'var(--gold)';
      else if (strength === 3) bar.style.background = 'var(--cyan)';
      else bar.style.background = 'var(--cyan)';
    } else {
      bar.style.background = 'rgba(255,255,255,0.1)';
    }
  });
  
  const strengthLabels = ['NO PASSWORD', 'WEAK', 'FAIR', 'GOOD', 'STRONG'];
  strengthText.textContent = strengthLabels[strength];
}

// --- Leaderboard Data ---
const players = [
  { id: '001', name: 'Seong Ji-Ho', score: 9800, trials: 5, status: 'alive', change: 0 },
  { id: '067', name: 'Han Mi-Rae', score: 9400, trials: 5, status: 'alive', change: 2 },
  { id: '218', name: 'Cho Sang-Woo', score: 9100, trials: 4, status: 'alive', change: -1 },
  { id: '199', name: 'Abdul Ali', score: 8700, trials: 4, status: 'alive', change: 1 },
  { id: '212', name: 'Kang Sae-Byeok', score: 8400, trials: 4, status: 'alive', change: -2 },
  { id: '101', name: 'Park Jun-Seo', score: 7200, trials: 3, status: 'alive', change: 3 },
  { id: '456', name: 'Lee Byeong-Gil', score: 6800, trials: 3, status: 'alive', change: 0 },
  { id: '069', name: 'Nina Petrova', score: 5900, trials: 2, status: 'alive', change: 1 },
  { id: '240', name: 'Oh Il-Nam', score: 4300, trials: 2, status: 'eliminated', change: -4 },
  { id: '333', name: 'Marco Ricci', score: 3100, trials: 1, status: 'eliminated', change: -2 },
  { id: '111', name: 'Yoon Ji-Eun', score: 2800, trials: 1, status: 'eliminated', change: -1 },
  { id: '305', name: 'Chen Wei', score: 1500, trials: 0, status: 'eliminated', change: -3 },
];

let currentFilter = 'all';
let currentSort = 'score';
let lastRegisteredPlayerId = null;

// --- Animated Score Ticker ---
function animateScoreTicker(element, newScore, oldScore) {
  const diff = newScore - oldScore;
  if (diff === 0) {
    element.textContent = newScore.toLocaleString();
    return;
  }
  
  const duration = 600;
  const steps = 30;
  const stepValue = diff / steps;
  let current = oldScore;
  let step = 0;
  
  const tickInterval = setInterval(() => {
    step++;
    current += stepValue;
    
    if (step >= steps) {
      current = newScore;
      clearInterval(tickInterval);
    }
    
    element.textContent = Math.floor(current).toLocaleString();
  }, duration / steps);
}

// --- Render Leaderboard with Search ---
function renderLeaderboard(data) {
  const maxScore = Math.max(...data.map(p => p.score || 0));
  const tbody = document.getElementById('lbBody');
  tbody.innerHTML = data.map((p, i) => {
    const rank = i + 1;
    const rankClass = rank <= 3 ? `rank-${rank}` : '';
    const changeIcon = p.change > 0 ? `<span class="up">▲ ${p.change}</span>` : p.change < 0 ? `<span class="down">▼ ${Math.abs(p.change)}</span>` : `<span class="same">—</span>`;
    const pct = maxScore > 0 ? (p.score / maxScore * 100).toFixed(1) : 0;
    const isNewPlayer = lastRegisteredPlayerId === p.id ? ' style="background: rgba(255,0,51,0.1);"' : '';
    
    return `
      <tr data-status="${p.status}"${isNewPlayer}>
        <td class="lb-rank ${rankClass}">${rank <= 3 ? ['🥇','🥈','🥉'][rank-1] : rank}</td>
        <td class="lb-name">
          <span style="font-family:'Share Tech Mono',monospace;font-size:0.65rem;color:var(--muted);margin-right:8px;">#${p.id}</span>
          ${p.name}
        </td>
        <td class="lb-score">
          <span class="score-ticker">${p.score.toLocaleString()}</span>
          <div class="score-bar-wrap"><div class="score-bar" style="width:${pct}%"></div></div>
        </td>
        <td style="font-family:'Share Tech Mono',monospace;font-size:0.75rem;color:var(--muted);">${p.trials}/6</td>
        <td><span class="lb-status status-${p.status}">${p.status.toUpperCase()}</span></td>
        <td>${changeIcon}</td>
      </tr>`;
  }).join('');
}

function filterLeaderboard(filter, btn) {
  currentFilter = filter;
  document.querySelectorAll('.lb-filter').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  applyLeaderboard();
}

function sortLeaderboard(sort, btn) {
  currentSort = sort;
  document.querySelectorAll('.lb-filter').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  applyLeaderboard();
}

function applyLeaderboard() {
  let data = [...players];
  if (currentFilter === 'alive') data = data.filter(p => p.status === 'alive');
  if (currentFilter === 'eliminated') data = data.filter(p => p.status === 'eliminated');
  if (currentSort === 'score') data.sort((a, b) => b.score - a.score);
  renderLeaderboard(data);
}

// --- Leaderboard Search ---
function initLeaderboardSearch() {
  const searchInput = document.getElementById('lbSearch');
  if (!searchInput) return;
  
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    let data = [...players];
    
    if (query) {
      data = data.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.id.includes(query)
      );
    }
    
    if (currentFilter === 'alive') data = data.filter(p => p.status === 'alive');
    if (currentFilter === 'eliminated') data = data.filter(p => p.status === 'eliminated');
    if (currentSort === 'score') data.sort((a, b) => b.score - a.score);
    
    renderLeaderboard(data);
  });
}

applyLeaderboard();

// Live score simulation
setInterval(() => {
  players.forEach(p => {
    if (p.status === 'alive' && Math.random() > 0.7) {
      const delta = Math.floor(Math.random() * 200 - 80);
      p.score = Math.max(0, p.score + delta);
      p.change = delta > 0 ? 1 : delta < 0 ? -1 : 0;
    }
  });
  applyLeaderboard();
}, 4000);

// --- Real-time Form Validation & Progress ---
function initFormValidation() {
  const form = document.getElementById('registrationForm');
  if (!form) return;
  
  const fields = {
    firstName: { el: document.getElementById('firstName'), err: document.getElementById('firstNameError'), check: v => v.trim().length >= 2 ? '' : 'NAME MUST BE AT LEAST 2 CHARACTERS' },
    lastName: { el: document.getElementById('lastName'), err: document.getElementById('lastNameError'), check: v => v.trim().length >= 2 ? '' : 'NAME MUST BE AT LEAST 2 CHARACTERS' },
    email: { el: document.getElementById('email'), err: document.getElementById('emailError'), check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'INVALID EMAIL ADDRESS' },
    password: { el: document.getElementById('password'), err: document.getElementById('passwordError'), check: v => v.length >= 8 ? '' : 'PASSWORD MUST BE AT LEAST 8 CHARACTERS' },
    age: { el: document.getElementById('age'), err: document.getElementById('ageError'), check: v => (parseInt(v) >= 18 && parseInt(v) <= 99) ? '' : 'YOU MUST BE 18–99 TO ENTER' },
    trial: { el: document.getElementById('trial'), err: document.getElementById('trialError'), check: v => v ? '' : 'SELECT A TRIAL' },
    motivation: { el: document.getElementById('motivation'), err: document.getElementById('motivationError'), check: v => (v.trim().length >= 10 && v.trim().length <= 200) ? '' : 'MUST BE 10–200 CHARACTERS' },
  };
  
  // Real-time validation on input
  Object.entries(fields).forEach(([key, field]) => {
    if (!field.el) return;
    
    field.el.addEventListener('input', (e) => {
      const msg = field.check(field.el.value);
      field.err.textContent = msg;
      
      if (msg) {
        field.el.style.borderColor = 'var(--red)';
      } else {
        field.el.style.borderColor = 'rgba(0,255,204,0.3)';
      }
      
      // Update password strength specifically
      if (key === 'password') {
        updatePasswordStrength(field.el.value);
      }
      
      updateFormProgress();
    });
  });
  
  // Form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;
    
    for (const [key, field] of Object.entries(fields)) {
      const msg = field.check(field.el.value);
      field.err.textContent = msg;
      if (msg) { valid = false; field.el.style.borderColor = 'var(--red)'; }
      else { field.el.style.borderColor = 'rgba(0,255,204,0.3)'; }
    }
    
    const agree = document.getElementById('agree');
    const agreeErr = document.getElementById('agreeError');
    if (!agree.checked) {
      agreeErr.textContent = 'YOU MUST ACCEPT TO CONTINUE';
      valid = false;
    } else { agreeErr.textContent = ''; }
    
    if (valid) {
      // Create new player
      const playerCount = players.length + 1;
      const firstName = document.getElementById('firstName').value.toUpperCase();
      const lastName = document.getElementById('lastName').value.toUpperCase();
      const newPlayerId = String(playerCount).padStart(3, '0');
      
      const newPlayer = {
        id: newPlayerId,
        name: `${firstName} ${lastName}`,
        score: Math.floor(Math.random() * 1000) + 500,
        trials: 0,
        status: 'alive',
        change: 0
      };
      
      players.unshift(newPlayer);
      lastRegisteredPlayerId = newPlayerId;
      
      document.getElementById('successMsg').textContent = `Player #${newPlayerId} — ${firstName} ${lastName}. Welcome to the Arena. Prepare yourself.`;
      document.getElementById('registrationForm').style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';
      
      // Confetti and particle effects
      createConfetti();
      createParticleSpark(window.innerWidth / 2, window.innerHeight / 2);
      
      // Highlight in leaderboard
      setTimeout(() => {
        applyLeaderboard();
      }, 300);
    }
  });
}

function updateFormProgress() {
  const progressBar = document.getElementById('formProgress');
  const progressText = document.getElementById('progressText');
  if (!progressBar) return;
  
  const form = document.getElementById('registrationForm');
  const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], input[type="number"], select, textarea');
  
  let filledCount = 0;
  inputs.forEach(input => {
    if (input.value.trim() !== '') {
      filledCount++;
    }
  });
  
  const progress = (filledCount / inputs.length) * 100;
  progressBar.style.width = progress + '%';
  progressText.textContent = Math.round(progress) + '%';
}

// --- Particle Spark on Button Hover ---
function initButtonSparks() {
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mouseenter', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      createParticleSpark(x, y);
    });
  });
}

// --- Theme Toggle ---
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;
  
  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);
  
  // Toggle theme on button click
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

function applyTheme(theme) {
  if (theme === 'light') {
    document.body.setAttribute('data-theme', 'light');
    document.getElementById('themeToggle').textContent = '☀️';
  } else {
    document.body.removeAttribute('data-theme');
    document.getElementById('themeToggle').textContent = '🌙';
  }
}

// --- Quiz Game ---
const quizData = [
  {
    question: "In the Glass Bridge trial, how many panels are there per step?",
    options: ["1", "2", "3", "4"],
    correctIndex: 1,
    labels: ["A)", "B)", "C)", "D)"]
  },
  {
    question: "What is the maximum number of players in TERMINUS Arena?",
    options: ["100", "256", "456", "999"],
    correctIndex: 2,
    labels: ["A)", "B)", "C)", "D)"]
  },
  {
    question: "Which trial has the lowest survival rate in TERMINUS?",
    options: ["Shape Carver", "Glass Bridge", "Maze of No Return", "The Final Reckoning"],
    correctIndex: 3,
    labels: ["A)", "B)", "C)", "D)"]
  }
];

let currentQuestion = 0;
let score = 0;

function initQuiz() {
  const quizCard = document.getElementById('quizCard');
  const resultScreen = document.getElementById('resultScreen');
  const retryBtn = document.getElementById('retryBtn');
  
  if (!quizCard || !resultScreen) return;
  
  loadQuestion();
  
  if (retryBtn) {
    retryBtn.addEventListener('click', resetQuiz);
  }
}

function loadQuestion() {
  const question = quizData[currentQuestion];
  const questionText = document.getElementById('questionText');
  const optionsGrid = document.getElementById('optionsGrid');
  const questionCounter = document.getElementById('questionCounter');
  const progressBar = document.getElementById('progressBar');
  const nextBtn = document.getElementById('nextBtn');
  
  // Update progress
  questionCounter.textContent = `QUESTION ${currentQuestion + 1} OF ${quizData.length}`;
  const progressPercent = ((currentQuestion + 1) / quizData.length) * 100;
  progressBar.style.width = progressPercent + '%';
  
  // Update question
  questionText.textContent = question.question;
  
  // Clear options
  optionsGrid.innerHTML = '';
  
  // Create option buttons
  question.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = question.labels[index] + ' ' + option;
    btn.dataset.index = index;
    btn.addEventListener('click', () => selectAnswer(index));
    optionsGrid.appendChild(btn);
  });
  
  // Reset next button
  nextBtn.disabled = true;
}

function selectAnswer(index) {
  const question = quizData[currentQuestion];
  const optionBtns = document.querySelectorAll('.option-btn');
  const nextBtn = document.getElementById('nextBtn');
  
  // Disable all options
  optionBtns.forEach(btn => btn.disabled = true);
  
  // Show correct and incorrect answers
  optionBtns.forEach((btn, btnIndex) => {
    if (btnIndex === question.correctIndex) {
      btn.classList.add('correct');
    } else if (btnIndex === index) {
      btn.classList.add('incorrect');
    }
  });
  
  // Update score if correct
  if (index === question.correctIndex) {
    score++;
  }
  
  // Enable next button
  nextBtn.disabled = false;
  
  // Add click handler to next button
  nextBtn.onclick = () => nextQuestion();
}

function nextQuestion() {
  currentQuestion++;
  
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const quizCard = document.getElementById('quizCard');
  const resultScreen = document.getElementById('resultScreen');
  const resultScore = document.getElementById('resultScore');
  const resultTitle = document.getElementById('resultTitle');
  const resultMessage = document.getElementById('resultMessage');
  
  // Hide quiz card, show result
  quizCard.style.display = 'none';
  resultScreen.classList.add('show');
  
  // Build result based on score
  resultScore.textContent = `${score}/${quizData.length}`;
  
  let title, message;
  if (score <= 1) {
    title = 'ELIMINATED';
    message = 'You were not ready for the arena. The trials have claimed you.';
  } else if (score === 2) {
    title = 'SURVIVOR';
    message = 'You have survived the arena. Prepare for harder challenges ahead.';
  } else {
    title = 'CHAMPION';
    message = 'Exceptional performance! You dominate the arena.';
  }
  
  resultTitle.textContent = title;
  resultMessage.textContent = message;
}

function resetQuiz() {
  currentQuestion = 0;
  score = 0;
  
  const quizCard = document.getElementById('quizCard');
  const resultScreen = document.getElementById('resultScreen');
  
  quizCard.style.display = 'flex';
  resultScreen.classList.remove('show');
  
  loadQuestion();
}

// --- Initialize All ---
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initScrollProgress();
  initBackToTop();
  initBottomNav();
  initTypewriter();
  initPageTransitions();
  initCountdown();
  initTrialCountdown();
  initParallaxGrid();
  initCustomCursor();
  initMobileMenu();
  initScrollReveal();
  initCountUp();
  initPasswordToggle();
  initFormValidation();
  initLeaderboardSearch();
  initButtonSparks();
  initThemeToggle();
  initQuiz();
});
