// --- Countdown Timer ---
function initCountdown() {
  // Set event date to 7 days from now
  const eventDate = new Date();
  eventDate.setDate(eventDate.getDate() + 7);
  eventDate.setHours(18, 0, 0, 0); // 6 PM
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate.getTime() - now;
    
    if (distance < 0) {
      // Event has started
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

// --- Parallax Grid Effect ---
function initParallaxGrid() {
  const heroGrid = document.querySelector('.hero-grid');
  const heroSection = document.getElementById('hero');
  
  window.addEventListener('scroll', () => {
    if (!heroGrid) return;
    
    const heroRect = heroSection.getBoundingClientRect();
    const heroVisible = heroRect.bottom > 0 && heroRect.top < window.innerHeight;
    
    if (heroVisible) {
      // Calculate parallax offset based on scroll position
      const scrollY = window.scrollY;
      const heroTop = heroSection.offsetTop;
      const offset = (scrollY - heroTop) * 0.5; // Parallax factor 0.5
      
      heroGrid.style.transform = `translateY(${offset}px)`;
    }
  });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initParallaxGrid();
});

// --- Custom Cursor ---
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

// --- Mobile Menu ---
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.add('open');
});
document.getElementById('mobileClose').addEventListener('click', closeMobileMenu);
function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
}

// --- Scroll Reveal ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// --- Count Up ---
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

function renderLeaderboard(data) {
  const maxScore = Math.max(...data.map(p => p.score));
  const tbody = document.getElementById('lbBody');
  tbody.innerHTML = data.map((p, i) => {
    const rank = i + 1;
    const rankClass = rank <= 3 ? `rank-${rank}` : '';
    const changeIcon = p.change > 0 ? `<span class="up">▲ ${p.change}</span>` : p.change < 0 ? `<span class="down">▼ ${Math.abs(p.change)}</span>` : `<span class="same">—</span>`;
    const pct = (p.score / maxScore * 100).toFixed(1);
    return `
      <tr data-status="${p.status}">
        <td class="lb-rank ${rankClass}">${rank <= 3 ? ['🥇','🥈','🥉'][rank-1] : rank}</td>
        <td class="lb-name">
          <span style="font-family:'Share Tech Mono',monospace;font-size:0.65rem;color:var(--muted);margin-right:8px;">#${p.id}</span>
          ${p.name}
        </td>
        <td class="lb-score">
          ${p.score.toLocaleString()}
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

// --- Form Validation ---
let playerCount = 456;
document.getElementById('registrationForm').addEventListener('submit', function(e) {
  e.preventDefault();
  let valid = true;

  const fields = {
    firstName: { el: document.getElementById('firstName'), err: document.getElementById('firstNameError'), check: v => v.trim().length >= 2 ? '' : 'NAME MUST BE AT LEAST 2 CHARACTERS' },
    lastName: { el: document.getElementById('lastName'), err: document.getElementById('lastNameError'), check: v => v.trim().length >= 2 ? '' : 'NAME MUST BE AT LEAST 2 CHARACTERS' },
    email: { el: document.getElementById('email'), err: document.getElementById('emailError'), check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'INVALID EMAIL ADDRESS' },
    age: { el: document.getElementById('age'), err: document.getElementById('ageError'), check: v => (parseInt(v) >= 18 && parseInt(v) <= 99) ? '' : 'YOU MUST BE 18–99 TO ENTER' },
    trial: { el: document.getElementById('trial'), err: document.getElementById('trialError'), check: v => v ? '' : 'SELECT A TRIAL' },
    motivation: { el: document.getElementById('motivation'), err: document.getElementById('motivationError'), check: v => (v.trim().length >= 10 && v.trim().length <= 200) ? '' : 'MUST BE 10–200 CHARACTERS' },
  };

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
    playerCount++;
    const firstName = document.getElementById('firstName').value.toUpperCase();
    const lastName = document.getElementById('lastName').value.toUpperCase();
    document.getElementById('successMsg').textContent = `Player #${playerCount} — ${firstName} ${lastName}. Welcome to the Arena. Prepare yourself.`;
    document.getElementById('registrationForm').style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
  }
});
