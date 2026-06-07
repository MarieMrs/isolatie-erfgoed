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
const totalSteps = 8;

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

  // Stap 2: blokkeer bij één steen
  if (step === 2) {
    const blockMsg = document.getElementById('block-msg-dun');
    const nextBtn = document.getElementById('next-2');
    if (blockMsg) blockMsg.classList.remove('visible');
    if (value === 'dun') {
      if (blockMsg) blockMsg.classList.add('visible');
      if (nextBtn) nextBtn.disabled = true;
      return;
    }
    if (nextBtn) nextBtn.disabled = false;
    return;
  }

  // Stap 3: blokkeer bij zuidwest + 1,5 steen
  if (step === 3) {
    const blockMsg = document.getElementById('block-msg-zw');
    const nextBtn = document.getElementById('next-3');
    if (blockMsg) blockMsg.classList.remove('visible');
    if (value === 'ja_zw') {
      if (blockMsg) blockMsg.classList.add('visible');
      if (nextBtn) nextBtn.disabled = true;
      return;
    }
    if (nextBtn) nextBtn.disabled = false;
    return;
  }

  // Stap 5: blokkeer bij gedeeltelijk of nee
  if (step === 5) {
    const blockMsg = document.getElementById('block-msg-schade');
    const nextBtn = document.getElementById('next-5');
    if (blockMsg) blockMsg.classList.remove('visible');
    if (value === 'gedeeltelijk' || value === 'nee') {
      if (blockMsg) blockMsg.classList.add('visible');
      if (nextBtn) nextBtn.disabled = true;
      return;
    }
    if (nextBtn) nextBtn.disabled = false;
    return;
  }

  // Stap 7: blokkeer bij historische interieurelementen
  if (step === 7) {
    const blockMsg = document.getElementById('block-msg-interieur');
    const nextBtn = document.getElementById('next-7');
    if (blockMsg) blockMsg.classList.remove('visible');
    if (value === 'ja') {
      if (blockMsg) blockMsg.classList.add('visible');
      if (nextBtn) nextBtn.disabled = true;
      return;
    }
    if (nextBtn) nextBtn.disabled = false;
    return;
  }

  // Stap 8: blokkeer bij slechte balkkoppen
  if (step === 8) {
    const blockMsg = document.getElementById('block-msg-balken');
    const nextBtn = document.getElementById('next-8');
    if (blockMsg) blockMsg.classList.remove('visible');
    if (value === 'ja_slecht') {
      if (blockMsg) blockMsg.classList.add('visible');
      if (nextBtn) nextBtn.disabled = true;
      return;
    }
    if (nextBtn) nextBtn.disabled = false;
    return;
  }

  // Activeer volgende knop voor alle andere stappen
  const nextBtn = document.getElementById(`next-${step}`);
  if (nextBtn) nextBtn.disabled = false;
}

/* =====================
   STAP-SPECIFIEKE NAVIGATIE
   ===================== */

// Stap 1: ga naar 1a als geen bescherming, anders naar stap 2
function handleStep1Next() {
  if (toolAnswers[1] === 'geen') {
    goToStep('1a');
  } else {
    goToStep(2);
  }
}

// Stap 1a: ga altijd naar stap 2
// (al afgehandeld via onclick="goToStep(2)")

// Stap 2 terug: ga naar 1a als geen bescherming, anders naar stap 1
function handleStep2Back() {
  if (toolAnswers[1] === 'geen') {
    goToStep('1a');
  } else {
    goToStep(1);
  }
}

// Stap 2 volgende: ga naar stap 3 als 1,5 steen, anders skip naar stap 4
function handleStep2Next() {
  if (toolAnswers[2] === 'normaal') {
    goToStep(3);
  } else {
    goToStep(4);
  }
}

// Stap 4 terug: ga naar stap 3 als 1,5 steen, anders naar stap 2
function handleStep4Back() {
  if (toolAnswers[2] === 'normaal') {
    goToStep(3);
  } else {
    goToStep(2);
  }
}

// Stap 4 volgende: ga naar stap 5 als schade, anders skip naar stap 6
function handleStep4Next() {
  if (toolAnswers[4] === 'geen_prob') {
    goToStep(6);
  } else {
    goToStep(5);
  }
}

// Stap 6 terug: ga naar stap 5 als er schade was, anders naar stap 4
function handleStep6Back() {
  if (toolAnswers[4] !== 'geen_prob') {
    goToStep(5);
  } else {
    goToStep(4);
  }
}

/* =====================
   STAP NAVIGATIE
   ===================== */
function goToStep(step) {
  document.querySelectorAll('.tool-step').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(`step-${step}`);
  if (target) target.classList.add('active');
  currentStep = step;

  // Update progress: tel numerieke stappen
  const stepNum = step === '1a' ? 1 : parseInt(step);
  updateProgress(stepNum);

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
  updateProgress(9);
  generateAdvice();
  const toolWrapper = document.querySelector('.tool-wrapper');
  if (toolWrapper) window.scrollTo(0, toolWrapper.offsetTop - 80);
}

/* =====================
   ADVIES GENEREREN
   ===================== */
function generateAdvice() {
  const statuut = toolAnswers[1];
  const renovatieplicht = toolAnswers['1a'];
  const muurdikte = toolAnswers[2];
  const orientatie = toolAnswers[3];
  const schade = toolAnswers[4];
  const behandeld = toolAnswers[5];
  const geschilderd = toolAnswers[6];
  const interieur = toolAnswers[7];
  const balkkoppen = toolAnswers[8];

  // Bepaal systeem op basis van alle factoren
  let systeem = '';
  let systeemReden = '';
  let doorverwijzing = false;
  let doorverwijzingReden = '';
  let expertType = '';

  // Geschilderde gevel: waarschijnlijk dampdicht maar doorverwijzing
  if (geschilderd === 'ja') {
    doorverwijzing = true;
    doorverwijzingReden = 'Uw gevel is geschilderd. Capillair actieve systemen zijn uitgesloten omdat de dampopen werking wordt geblokkeerd door de verflaag. Een dampdicht systeem (PIR of schuimglas) is waarschijnlijk de meest aangewezen optie, maar dit vereist een dauwpuntberekening door een bouwfysisch adviseur om de veiligheid te garanderen.';
    expertType = 'bouwfysisch';
    systeem = 'dampdicht';
  }

  // Balkkoppen in goede staat: capillair actief sterk aanbevolen
  else if (balkkoppen === 'ja_goed') {
    systeem = 'capillair';
    systeemReden = 'Houten balkkoppen zijn aanwezig in uw muur. Bij een dampdicht systeem zou al het vocht zich concentreren ter hoogte van de balkkoppen, wat houtrot veroorzaakt. Een capillair actief systeem is sterk aanbevolen omdat het de vochthuishouding van de muur nagenoeg niet wijzigt. Zorgvuldige detaillering rondom de balkkoppen is absoluut vereist.';
    expertType = 'restauratiearchitect';
  }

  // Voorgeschiedenis van zoutschade: dampdicht met schuimglas
  else if (schade === 'zout' && behandeld === 'ja') {
    systeem = 'dampdicht_schuimglas';
    systeemReden = 'Uw muur heeft een voorgeschiedenis van zoutschade. Ook al is de schade volledig behandeld, sluit schuimglas de muur volledig af van verdere zoutmigratie en biedt daarmee de meest duurzame bescherming na sanering.';
    expertType = 'bouwfysisch';
  }

  // Voorgeschiedenis van opstijgend vocht of regendoorslag: dampdicht
  else if ((schade === 'opstijgend' || schade === 'regendoorslag') && behandeld === 'ja') {
    systeem = 'dampdicht';
    systeemReden = 'Uw muur heeft een voorgeschiedenis van vochtproblemen. Ook al is de schade volledig behandeld, is een dampdicht systeem de meest robuuste keuze om herhaling te voorkomen en de constructie te beschermen.';
    expertType = 'bouwfysisch';
  }

  // Standaard: capillair actief als voorkeur
  else {
    systeem = 'capillair';
    systeemReden = 'Op basis van uw antwoorden is een capillair actief systeem het meest aangewezen. Dit systeem respecteert de bouwfysische werking van de historische muur en laat toe dat vocht gecontroleerd wordt opgenomen, herverdeeld en afgegeven aan de binnenomgeving.';
    expertType = 'aannemer';
  }

  // Materialen per systeem
  const materialenDampdicht = [
    {
      naam: 'PIR-platen',
      img: 'pir.jpg',
      badge: 'aanbevolen',
      info: 'λ 0,022 W/mK · ± 7 cm voor Rd 3,0 · 20–35 €/m² · Dunste optie, ideaal bij beperkte ruimte'
    },
    {
      naam: 'Schuimglas (Foamglas)',
      img: 'foamglas.jpg',
      badge: 'alternatief',
      info: 'λ 0,038 W/mK · ± 11 cm voor Rd 3,0 · 60–100 €/m² · Volledig vocht- en dampdicht, onbrandbaar, ideaal bij vochthistoriek'
    }
  ];

  const materialenDampdichtSchuimglas = [
    {
      naam: 'Schuimglas (Foamglas)',
      img: 'foamglas.jpg',
      badge: 'sterk aanbevolen',
      info: 'λ 0,038 W/mK · ± 11 cm voor Rd 3,0 · 60–100 €/m² · Sluit de muur volledig af van verdere zoutmigratie. Onbrandbaar, geen dampscherm nodig.'
    },
    {
      naam: 'PIR-platen',
      img: 'pir.jpg',
      badge: 'alternatief',
      info: 'λ 0,022 W/mK · ± 7 cm voor Rd 3,0 · 20–35 €/m² · Goedkopere optie bij beperkte ruimte, maar minder absoluut dampdicht dan schuimglas'
    }
  ];

  const materialenCapillair = [
    {
      naam: 'Calciumsilicaat',
      img: 'calciumsilicaat.jpg',
      badge: 'aanbevolen',
      info: 'λ 0,065 W/mK · ± 20 cm voor Rd 3,0 · 30–60 €/m² · Meest aanbevolen voor erfgoedcontext. Hoge capillaire activiteit, brandveilig.'
    },
    {
      naam: 'Houtvezelplaten',
      img: 'houtvezel.jpg',
      badge: 'alternatief',
      info: 'λ 0,036–0,047 W/mK · ± 13 cm voor Rd 3,0 · 11–25 €/m² · Biobased alternatief met goede vochtregulering. Niet geschikt bij hoge vochtbelasting.'
    },
    {
      naam: 'Kalkhennepblokken',
      img: 'kalkhennep.jpg',
      badge: 'alternatief',
      info: 'λ 0,071 W/mK · ± 21 cm voor Rd 3,0 · Variabel · Meest compatibel met historische muren. Vereist veel ruimte. Enkel bij lage vochtbelasting.'
    }
  ];

  let materialen = [];
  let systeemTitel = '';
  let systeemBadge = '';

  if (systeem === 'dampdicht_schuimglas') {
    materialen = materialenDampdichtSchuimglas;
    systeemTitel = 'Dampdicht systeem aanbevolen — schuimglas als voorkeur';
    systeemBadge = 'Dampdicht';
  } else if (systeem === 'dampdicht' || doorverwijzing) {
    materialen = materialenDampdicht;
    systeemTitel = doorverwijzing ? 'Waarschijnlijk dampdicht systeem — doorverwijzing vereist' : 'Dampdicht systeem aanbevolen';
    systeemBadge = 'Dampdicht';
  } else {
    materialen = materialenCapillair;
    systeemTitel = 'Capillair actief systeem aanbevolen';
    systeemBadge = 'Capillair actief';
  }

  // Aandachtspunten
  const aandachtspunten = [];

  if (statuut === 'monument' || statuut === 'stadsgezicht') {
    aandachtspunten.push('Uw gebouw is beschermd. Raadpleeg de <strong>erfgoedconsulent</strong> voor aanvang van de werken. Hun advies is bindend bij ingrepen aan de straatgevel.');
  }
  if (statuut === 'vastgesteld') {
    aandachtspunten.push('Uw gebouw staat op de vastgestelde inventaris. Informeer bij uw <strong><a href="ioed.html">IOED</a></strong> over de specifieke geldende regels voor uw situatie.');
  }
  if (renovatieplicht === 'ja') {
    aandachtspunten.push('U valt onder de <strong>renovatieplicht</strong>. U moet binnen 6 jaar na aankoop energielabel D bereiken. Voor buitenmuren geldt U ≤ 0,24 W/m²K. Alle besproken materialen kunnen deze eis halen bij de juiste isolatiedikte op basis van de volledige wandopbouw.');
  }
  if (muurdikte === 'normaal') {
    aandachtspunten.push('Uw muur is anderhalve steen dik. Zorg dat het voegwerk in goede staat is voor aanvang van de isolatiewerken.');
  }
  if (balkkoppen === 'ja_goed') {
    aandachtspunten.push('Houten balkkoppen aanwezig: de isolatie mag rondom de balkkoppen <strong>niet worden doorgezet</strong> over een zone van circa 20 cm. Dit vereist een zorgvuldige detaillering door een restauratiearchitect.');
  }
  if (geschilderd === 'ja') {
    aandachtspunten.push('Geschilderde gevel: vraag een <strong>dauwpuntberekening</strong> aan bij een bouwfysisch adviseur via software zoals WUFI of DELPHIN voor u isoleert.');
  }
  if (schade !== 'geen_prob' && behandeld === 'ja') {
    aandachtspunten.push('Uw muur heeft een voorgeschiedenis van schade. Laat de muur volledig uitdrogen en controleer door een specialist voor aanvang van de isolatiewerken.');
  }

  // Expert aanbeveling
  const expertTekst = {
    'bouwfysisch': 'een <strong>bouwfysisch adviseur</strong> voor een hygrothermische berekening',
    'restauratiearchitect': 'een <strong>restauratiearchitect</strong> voor de detaillering en een <strong>aannemer met certificaat van bekwaamheid</strong> voor de uitvoering',
    'aannemer': 'een <strong>aannemer met certificaat van bekwaamheid</strong> voor de uitvoering'
  };

  // HTML genereren
  let html = `
    <div class="advice-box">
      <span class="advice-badge badge-groen">${systeemBadge}</span>
      <h2 class="advice-title">${systeemTitel}</h2>
      <p class="advice-sub">${doorverwijzing ? doorverwijzingReden : systeemReden}</p>
      <div class="advice-materials">
        ${materialen.map(m => `
          <div class="advice-mat">
            <img src="${m.img}" alt="${m.naam}">
            <div class="advice-mat-body">
              <span class="mat-badge">${m.badge}</span>
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

  html += `
    <div class="info-banner">
      <p><strong>Volgende stap:</strong> Raadpleeg ${expertTekst[expertType] || expertTekst['aannemer']}. Bekijk ook de pagina <strong><a href="materialen.html">Materialen</a></strong> voor meer technische informatie en contacteer uw <strong><a href="ioed.html">IOED</a></strong> voor gratis pre-advies.</p>
    </div>`;

  const adviceContent = document.getElementById('advice-content');
  if (adviceContent) adviceContent.innerHTML = html;
}

/* =====================
   RESET
   ===================== */
function resetTool() {
  Object.keys(toolAnswers).forEach(k => delete toolAnswers[k]);
  document.querySelectorAll('.option-btn, .option-btn-simple').forEach(b => b.classList.remove('selected'));
  document.querySelectorAll('.tool-next').forEach(b => b.disabled = true);
  document.querySelectorAll('.block-msg').forEach(b => b.classList.remove('visible'));

  for (let i = 1; i <= totalSteps; i++) {
    const dot = document.getElementById(`dot-${i}`);
    if (dot) dot.classList.remove('done');
  }
  const dot1 = document.getElementById('dot-1');
  if (dot1) dot1.classList.add('done');

  goToStep(1);
}
