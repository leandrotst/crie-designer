// ===================== DADOS =====================
const TILE_COLORS = ['#E3C9C0','#B8C2AE','#EDE7DC','#D8CFC3','#C7CFC0','#EAD9D0','#E3C9C0','#B8C2AE','#EDE7DC'];

const PORTFOLIO = [
  { titulo: 'Projeto Tavares', desc: 'Gestão completa de perfil (@tavaresinformaticaa): conteúdo visual, legendas e agendamento. Resultado: captação de clientes.', imagem: 'assets/imagens/tavares_feed.jpg' },
  { titulo: 'Luciana Santana — Estética Facial', desc: 'Site personalizado para agendamento de procedimentos estéticos, com visual elegante e experiência pensada para converter. Explore o projeto completo: <a href="https://lucianaesteticafacial.my.canva.site/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGno3MG1HcpPgUyA3byDDYObIifsZZrXjNntT020ySAnFrEHbR0MEr0OecxxIE_aem_Df37m3Xn_7wJ7O6LrAGZLw" target="_blank" rel="noopener noreferrer"><strong>clique para conferir aqui</strong></a>', imagem: 'assets/imagens/luciana_site.jpg' },
  { titulo: 'Bianca Tavares — Nutricionista', desc: 'Site personalizado para agendamento de consultas nutricionais. Explore o projeto completo: <a href="https://nutribiancatavares.my.canva.site/" target="_blank" rel="noopener noreferrer"><strong>clique para conferir aqui</strong></a>', imagem: 'assets/imagens/bianca_site.png' },
  { titulo: 'Milena Cafer', desc: 'Site personalizado para agendamento de consultas nutricionais. Explore o projeto completo: <a href="https://milenacarneironutri.my.canva.site/c-pia-de-c-pia-de-milena-cafer" target="_blank" rel="noopener noreferrer"><strong>clique para conferir aqui</strong></a>', imagem: 'assets/imagens/milena_site.png' },
  { titulo: 'Janaina SPA', desc: 'Site personalizado para um espaço de autocuidado com identidade acolhedora e elegante, voltado para SPA, pés e depilação. Explore o projeto completo: <a href="https://retroviic.my.canva.site/janainaferreira" target="_blank" rel="noopener noreferrer"><strong>clique para conferir aqui</strong></a>', imagem: 'assets/imagens/janaina_site.jpg' }
];

// ===================== NAV MOBILE =====================
const navBurger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');
navBurger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ===================== SCROLL REVEAL =====================
const revealTargets = document.querySelectorAll('.card, .step, .port-item, .numero');
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealTargets.forEach(el => revealObserver.observe(el));

// ===================== CONTADORES (números) =====================
function animateCount(el, target, duration = 1500) {
  const startTime = performance.now();
  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(target * eased);
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  }
  requestAnimationFrame(tick);
}

const statsRow = document.getElementById('statsRow');
let statsAnimated = false;
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
      statsAnimated = true;
      document.querySelectorAll('.numero__num').forEach(num => {
        animateCount(num, parseInt(num.dataset.count, 10));
      });
    }
  });
}, { threshold: 0.4 });
if (statsRow) statsObserver.observe(statsRow);

// ===================== CARTÃO DE PERFIL (elemento de assinatura) =====================
const igGrid = document.getElementById('igGrid');
const igHandle = document.getElementById('igHandle');
const metricFollowers = document.getElementById('metricFollowers');
const metricEngage = document.getElementById('metricEngage');

function buildGrid(colors) {
  igGrid.innerHTML = '';
  colors.forEach(c => {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.style.background = c;
    igGrid.appendChild(tile);
  });
}
buildGrid(TILE_COLORS);

function animateMetric(el, target, formatter) {
  const duration = 1700;
  const startTime = performance.now();
  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(target * eased);
    el.textContent = formatter ? formatter(value) : value.toLocaleString('pt-BR');
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = formatter ? formatter(target) : target.toLocaleString('pt-BR');
  }
  requestAnimationFrame(tick);
}

const phoneObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateMetric(metricFollowers, 24800);
      animateMetric(metricEngage, 7, (v) => v + '%');
      phoneObserver.disconnect();
    }
  });
}, { threshold: 0.3 });
const frameEl = document.querySelector('.frame');
if (frameEl) phoneObserver.observe(frameEl);

// troca discreta do handle, a cada bom tempo — sensação de feed vivo, sem agitação
const handles = ['@marca.viva', '@estudio.flora', '@cafe.bonifacio', '@marina.bijoux'];
let handleIdx = 0;
setInterval(() => {
  handleIdx = (handleIdx + 1) % handles.length;
  igHandle.style.opacity = 0;
  setTimeout(() => {
    igHandle.textContent = handles[handleIdx];
    igHandle.style.opacity = 1;
  }, 300);
}, 5000);
igHandle.style.transition = 'opacity .3s ease';

// ===================== PORTFÓLIO (gerado via JS) =====================
const portGrid = document.getElementById('portGrid');
PORTFOLIO.forEach(item => {
  const el = document.createElement('div');
  el.className = 'port-item';

  if (item.imagem) {
    el.classList.add('port-item--image');
    el.innerHTML = `
      <div class="port-item__media"><img src="${item.imagem}" alt="${item.titulo}"></div>
      <div class="port-item__face port-item__face--back">${item.desc}</div>
    `;

    el.addEventListener('click', () => {
      el.classList.toggle('is-active');
    });
  } else {
    el.innerHTML = `
      <div class="port-item__face port-item__face--front">${item.titulo}</div>
      <div class="port-item__face port-item__face--back">${item.desc}</div>
    `;
  }

  portGrid.appendChild(el);
});

// ===================== DEPOIMENTOS (carrossel) =====================
const testiTrack = document.getElementById('testiTrack');
const testis = Array.from(testiTrack.querySelectorAll('.testi'));
const testiDotsWrap = document.getElementById('testiDots');
let testiIndex = 0;

testis.forEach((_, i) => {
  const dot = document.createElement('span');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToTesti(i));
  testiDotsWrap.appendChild(dot);
});
const dots = Array.from(testiDotsWrap.children);

function renderTesti() {
  testis.forEach((t, i) => t.classList.toggle('active', i === testiIndex));
  dots.forEach((d, i) => d.classList.toggle('active', i === testiIndex));
}
function goToTesti(i) {
  testiIndex = (i + testis.length) % testis.length;
  renderTesti();
}
document.getElementById('testiPrev').addEventListener('click', () => goToTesti(testiIndex - 1));
document.getElementById('testiNext').addEventListener('click', () => goToTesti(testiIndex + 1));
renderTesti();

let testiAuto = setInterval(() => goToTesti(testiIndex + 1), 6500);
[document.getElementById('testiPrev'), document.getElementById('testiNext')].forEach(btn => {
  btn.addEventListener('click', () => {
    clearInterval(testiAuto);
    testiAuto = setInterval(() => goToTesti(testiIndex + 1), 6500);
  });
});

// ===================== FORMULÁRIO =====================
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

function setError(fieldName, message) {
  const span = form.querySelector(`.form__error[data-for="${fieldName}"]`);
  const input = form.querySelector(`#${fieldName}`);
  if (span) span.textContent = message || '';
  if (input) input.classList.toggle('invalid', Boolean(message));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  successMsg.classList.remove('show');

  const nome = form.nome.value.trim();
  const email = form.email.value.trim();
  let valid = true;

  if (nome.length < 2) {
    setError('nome', 'me conta seu nome :)');
    valid = false;
  } else setError('nome', '');

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    setError('email', 'esse e-mail não parece válido');
    valid = false;
  } else setError('email', '');

  if (!valid) return;

  const btn = form.querySelector('.btn--primary');
  const label = btn.querySelector('.btn__label');
  const original = label.textContent;
  label.textContent = 'Enviando...';
  btn.disabled = true;

  setTimeout(() => {
    label.textContent = original;
    btn.disabled = false;
    successMsg.classList.add('show');
    form.reset();
  }, 1000);
});

// ===================== VOLTAR AO TOPO =====================
document.getElementById('toTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
