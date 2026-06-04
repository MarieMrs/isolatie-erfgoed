/* =====================
   NAVIGATIE ACTIVE STATE
   ===================== */
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.remove('active');
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}
document.addEventListener('DOMContentLoaded', setActiveNav);

/* =====================
   MODAL (enkel op homepage)
   ===================== */
function initModal() {
  const modal = document.getElementById('modal');
  if (!modal) return;
  const btn = document.getElementById('modal-btn');
  if (btn) btn.addEventListener('click', () => modal.style.display = 'none');
}
document.addEventListener('DOMContentLoaded', initModal);

/* =====================
   TOOL LOGICA
   ===================== */
const toolAnswers = {};
let currentStep = 1;
const totalSteps = 6;

function selectOption(step, value, element) {
  toolAnswers[step] = value;

  // Deselect alle opties in deze stap
  const container = element.closest('.options');
  if (container) {
    container.querySelectorAll('.option-btn, .option-btn-simple').forEach(btn => {
      btn.classList.remove('selected');
    });
  }
  element.classList.add('selected');

  // Speciale logica stap 3 (geen problemen)
  if (step === 3 && value === 'geen_prob') {
    const geenProbMsg = document.getElementById('geen-prob-msg');
    const behandeldOptions = document.getElementById('behandeld-options');
    if (geenProbMsg) geenProbMsg.style.display = 'block';
    if (behandeldOptions) behandeldOptions.style.display = 'none';
    toolAnswers[4] = 'geen_prob';
  }

  // Speciale logica stap 4
  if (step === 4) {
    const blockMsgNee = document.getElementById('block-msg-nee');
    const droogOptions = document.getElementById('droog-options');
    const nextBtn = document.getElementById('next-4');

    if (blockMsgNee) blockMsgNee.classList.remove('visible');
    if (droogOptions) droogOptions.style.display = 'none';
    if (nextBtn) nextBtn.disabled = true;

    if (value === 'nee') {
      if (blockMsgNee) blockMsgNee.classList.add('visible');
      return;
    }
    if (value === 'ja') {
      if (droogOptions) { droogOptions.style.display = 'flex'; droogOptions.style.flexDirection = 'column'; droogOptions.style.gap = '0.75rem'; }
      return;
    }
    if (value === 'droog' || value === 'nog_vochtig' || value === 'gedeeltelijk') {
      if (nextBtn) nextBtn.disabled = false;
      return;
    }
  }

  // Speciale logica stap 6
  if (step === 6) {
    const blockMsgHist = document.getElementById('block-msg-hist');
    const nextBtn = document.getElementById('next-6');
    if (blockMsgHist) blockMsgHist.classList.remove('visible');
    if (value === 'historisch') {
      if (blockMsgHist) blockMsgHist.classList.add('visible');
      if (nextBtn) nextBtn.disabled = true;
      return;
    }
  }

  // Activeer volgende knop
  const nextBtn = document.getElementById(`next-${step}`);
  if (nextBtn) nextBtn.disabled = false;
}

function goToStep(step) {
  document.querySelectorAll('.tool-step').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(`step-${step}`);
  if (target) target.classList.add('active');
  currentStep = step;
  updateProgress(step);

  // Reset stap 3/4 weergave bij terugkeren
  if (step === 3) {
    const geenProbMsg = document.getElementById('geen-prob-msg');
    const behandeldOptions = document.getElementById('behandeld-options');
    if (geenProbMsg) geenProbMsg.style.display = 'none';
    if (behandeldOptions) { behandeldOptions.style.display = 'flex'; behandeldOptions.style.flexDirection = 'column'; behandeldOptions.style.gap = '0.75rem'; }
  }

  // Scroll naar tool
  const toolWrapper = document.querySelector('.tool-wrapper');
  if (toolWrapper) window.scrollTo(0, toolWrapper.offsetTop - 80);
}

function updateProgress(step) {
  for (let i = 1; i <= totalSteps; i++) {
    const dot = document.getElementById(`dot-${i}`);
    if (!dot) continue;
    if (i <= step) dot.classList.add('done');
    else dot.classList.remove('done');
  }
}

function showAdvice() {
  document.querySelectorAll('.tool-step').forEach(s => s.classList.remove('active'));
  const adviceStep = document.getElementById('step-advice');
  if (adviceStep) adviceStep.classList.add('active');
  updateProgress(7);
  generateAdvice();
  const toolWrapper = document.querySelector('.tool-wrapper');
  if (toolWrapper) window.scrollTo(0, toolWrapper.offsetTop - 80);
}

function generateAdvice() {
  const o = toolAnswers[5]; // oriëntatie
  const p = toolAnswers[3]; // probleem
  const b = toolAnswers[4]; // behandeld
  const d = toolAnswers[2]; // dikte
  const s = toolAnswers[1]; // statuut

  // Bepaal systeem
  const hoogRegenbelasting = (o === 'west' || o === 'zuid');
  const regendoorslag = (p === 'regendoorslag');
  const zoutSchade = (p === 'zout');
  const opstijgend = (p === 'opstijgend');

  let systeem = '';
  if (regendoorslag) {
    systeem = 'capillair';
  } else if ((zoutSchade || opstijgend) && b === 'droog') {
    systeem = 'dampdicht';
  } else if (hoogRegenbelasting) {
    systeem = 'capillair';
  } else if (d === 'dun') {
    systeem = 'dampdicht';
  } else {
    systeem = 'capillair';
  }

  // Materialen per systeem
  const materialenDampdicht = [
    { naam: 'Schuimglas (Foamglas)', img: 'img/foamglas.jpg', badge: 'aanbevolen', info: 'λ 0,038 W/mK · ± 7 cm voor Rd 1,75 · 60–100 €/m² · Volledig vocht- en dampdicht, onbrandbaar' },
    { naam: 'PIR-platen', img: 'img/pir.jpg', badge: 'alternatief', info: 'λ 0,022 W/mK · ± 6 cm voor Rd 1,75 · 20–35 €/m² · Dunste optie bij beperkte ruimte' }
  ];
  const materialenCapillair = [
    { naam: 'Calciumsilicaat', img: 'img/calciumsilicaat.jpg', badge: 'aanbevolen', info: 'λ 0,065 W/mK · ± 11 cm voor Rd 1,75 · 30–60 €/m² · Meest aanbevolen voor erfgoedcontext' },
    { naam: 'Houtvezelplaten', img: 'img/houtvezel.jpg', badge: 'alternatief', info: 'λ 0,036–0,047 W/mK · ± 9 cm voor Rd 1,75 · 11–25 €/m² · Ecologisch alternatief' },
    { naam: 'Kalkhennepblokken', img: 'img/kalkhennep.jpg', badge: 'alternatief', info: 'λ 0,071 W/mK · ± 20 cm · Meest compatibel met historische muren' }
  ];

  const materialen = systeem === 'dampdicht' ? materialenDampdicht : materialenCapillair;
  const systeemTitel = systeem === 'dampdicht' ? 'Dampdicht systeem aanbevolen' : 'Capillair actief systeem aanbevolen';
  const systeemUitleg = systeem === 'dampdicht'
    ? 'Op basis van uw antwoorden is een dampdicht isolatiesysteem het meest aangewezen. Dit systeem sluit de muur volledig af voor vocht en beschermt de constructie optimaal na een volledige sanering.'
    : 'Op basis van uw antwoorden is een capillair actief isolatiesysteem het meest aangewezen. Dit systeem werkt samen met de historische muur en laat toe dat vocht gecontroleerd wordt opgenomen en herverdeeld.';

  // Aandachtspunten
  const aandachtspunten = [];
  if (s === 'monument' || s === 'stadsgezicht') aandachtspunten.push('Uw gebouw is beschermd. Raadpleeg de erfgoedconsulent voor aanvang van de werken.');
  if (s === 'vastgesteld') aandachtspunten.push('Uw gebouw staat op de vastgestelde inventaris. Informeer bij uw IOED over de specifieke geldende regels.');
  if (d === 'dun') aandachtspunten.push('Uw muur is slechts één steen dik. Zorg voor een volledig regendichte buitengevel voor aanvang.');
  if (b === 'gedeeltelijk') aandachtspunten.push('De problemen zijn slechts gedeeltelijk behandeld. Zorg voor volledige sanering voor isolatie.');
  if (b === 'nog_vochtig') aandachtspunten.push('De muur is nog niet volledig uitgedroogd. Wacht tot de muur volledig droog is voor u isoleert.');

  // HTML genereren
  let html = `
    <div class="advice-box">
      <span class="advice-badge badge-groen">${systeem === 'dampdicht' ? 'Dampdicht' : 'Capillair actief'}</span>
      <h2 class="advice-title">${systeemTitel}</h2>
      <p class="advice-sub">${systeemUitleg}</p>
      <div class="advice-materials">
        ${materialen.map(m => `
          <div class="advice-mat">
            <img src="${m.img}" alt="${m.naam}">
            <div class="advice-mat-body">
              <h4>${m.naam}</h4>
              <p>${m.info}</p>
            </div>
          </div>`).join('')}
      </div>
    </div>`;

  if (aandachtspunten.length > 0) {
    html += `<div class="warning-banner">
      <p><strong>Aandachtspunten voor uw situatie:</strong></p>
      <ul style="margin-top:0.5rem;padding-left:1.25rem;">
        ${aandachtspunten.map(a => `<li style="font-size:0.85rem;color:var(--slate);margin-bottom:0.4rem;">${a}</li>`).join('')}
      </ul>
    </div>`;
  }

  html += `<div class="info-banner"><p>Bekijk de pagina <strong><a href="materialen.html">Materialen</a></strong> voor meer technische informatie. Contacteer uw <strong><a href="ioed.html">IOED</a></strong> voor gratis pre-advies.</p></div>`;

  const adviceContent = document.getElementById('advice-content');
  if (adviceContent) adviceContent.innerHTML = html;
}

function resetTool() {
  Object.keys(toolAnswers).forEach(k => delete toolAnswers[k]);
  document.querySelectorAll('.option-btn, .option-btn-simple').forEach(b => b.classList.remove('selected'));
  document.querySelectorAll('.tool-next').forEach(b => b.disabled = true);
  document.querySelectorAll('.block-msg').forEach(b => b.classList.remove('visible'));
  const geenProbMsg = document.getElementById('geen-prob-msg');
  const behandeldOptions = document.getElementById('behandeld-options');
  const droogOptions = document.getElementById('droog-options');
  if (geenProbMsg) geenProbMsg.style.display = 'none';
  if (behandeldOptions) { behandeldOptions.style.display = 'flex'; behandeldOptions.style.flexDirection = 'column'; behandeldOptions.style.gap = '0.75rem'; }
  if (droogOptions) droogOptions.style.display = 'none';
  for (let i = 1; i <= totalSteps; i++) {
    const dot = document.getElementById(`dot-${i}`);
    if (dot) { dot.classList.remove('done'); }
  }
  const dot1 = document.getElementById('dot-1');
  if (dot1) dot1.classList.add('done');
  goToStep(1);
}
