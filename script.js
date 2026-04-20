// ─── DATA ───────────────────────────────────────────
const FLEVELS = ["Any","1K","5K","10K","50K","100K","250K","500K","1M","5M","10M+"];
const FVALUES = [0,1000,5000,10000,50000,100000,250000,500000,1000000,5000000,Infinity];

const COLORS = {
  fashion:   { bg:'rgba(255,95,160,0.15)',  text:'#ff5fa0',  tile:'rgba(255,95,160,0.2)' },
  fitness:   { bg:'rgba(200,241,53,0.12)',  text:'#c8f135',  tile:'rgba(200,241,53,0.18)' },
  food:      { bg:'rgba(255,140,66,0.15)',  text:'#ff8c42',  tile:'rgba(255,140,66,0.2)' },
  tech:      { bg:'rgba(95,180,255,0.15)',  text:'#5fb4ff',  tile:'rgba(95,180,255,0.2)' },
  travel:    { bg:'rgba(45,212,191,0.15)',  text:'#2dd4bf',  tile:'rgba(45,212,191,0.2)' },
  beauty:    { bg:'rgba(168,85,247,0.15)',  text:'#a855f7',  tile:'rgba(168,85,247,0.2)' },
  finance:   { bg:'rgba(250,204,21,0.12)',  text:'#facc15',  tile:'rgba(250,204,21,0.18)' },
  gaming:    { bg:'rgba(168,85,247,0.15)',  text:'#a855f7',  tile:'rgba(168,85,247,0.2)' },
  lifestyle: { bg:'rgba(45,212,191,0.15)',  text:'#2dd4bf',  tile:'rgba(45,212,191,0.2)' },
  comedy:    { bg:'rgba(255,140,66,0.15)',  text:'#ff8c42',  tile:'rgba(255,140,66,0.2)' },
};

const TIERS = {
  nano:  { label:'Nano',  bg:'rgba(45,212,191,0.15)',  color:'#2dd4bf' },
  micro: { label:'Micro', bg:'rgba(95,180,255,0.15)',  color:'#5fb4ff' },
  macro: { label:'Macro', bg:'rgba(168,85,247,0.15)', color:'#a855f7' },
  mega:  { label:'Mega',  bg:'rgba(255,95,160,0.15)', color:'#ff5fa0' },
};

const creators = [
  // your full creator list stays unchanged
];

// ─── STATE ──────────────────────────────────────────
let activeGenre = 'all';
let selectedId = null;

// ─── HELPERS ────────────────────────────────────────
function fmt(n) {
  if (n >= 1000000) return (n/1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n/1000).toFixed(0) + 'K';
  return n.toString();
}

function tierOf(f) {
  if (f < 10000) return 'nano';
  if (f < 100000) return 'micro';
  if (f < 1000000) return 'macro';
  return 'mega';
}

function getColor(genre) {
  return COLORS[genre] || { bg:'rgba(122,122,144,0.15)', text:'#7a7a90', tile:'rgba(122,122,144,0.2)' };
}

// ─── FILTER ─────────────────────────────────────────
function getFiltered() {
  const minF = FVALUES[+document.getElementById('minF').value];
  const maxF = FVALUES[+document.getElementById('maxF').value];
  const tier = document.getElementById('tierSel').value;
  const sort = document.getElementById('sortSel').value;

  let list = creators.filter(c => {
    if (activeGenre !== 'all' && c.genre !== activeGenre) return false;
    if (c.followers < minF) return false;
    if (c.followers > maxF) return false;
    if (tier !== 'all' && tierOf(c.followers) !== tier) return false;
    return true;
  });

  if (sort === 'followers') list.sort((a,b) => b.followers - a.followers);
  else if (sort === 'engagement') list.sort((a,b) => b.eng - a.eng);
  else list.sort((a,b) => b.views - a.views);

  return list;
}

// ─── RENDER ─────────────────────────────────────────
function render() {
  const list = getFiltered();
  const grid = document.getElementById('grid');
  const empty = document.getElementById('empty');
  const panel = document.getElementById('detailPanel');

  document.getElementById('countDisplay').textContent = list.length;

  if (list.length === 0) {
    grid.innerHTML = '';
    empty.classList.add('show');
  } else {
    empty.classList.remove('show');
    grid.innerHTML = list.map(c => `
      <div class="card" onclick="openDetail(${c.id})">
        <h3>${c.name}</h3>
        <p>${c.handle}</p>
        <small>${fmt(c.followers)} followers</small>
      </div>
    `).join('');
  }

  if (selectedId && !list.find(c => c.id === selectedId)) {
    closeDetail();
  }
}

// ─── DETAIL ─────────────────────────────────────────
function openDetail(id) {
  selectedId = id;
  const c = creators.find(x => x.id === id);
  const panel = document.getElementById('detailPanel');

  panel.innerHTML = `
    <h2>${c.name}</h2>
    <p>${c.bio}</p>
    <button onclick="connectInstagram()">Connect Instagram</button>
  `;

  panel.classList.add('open');
}

function closeDetail() {
  selectedId = null;
  document.getElementById('detailPanel').classList.remove('open');
}

// ─── FIXED FUNCTION ─────────────────────────────────
function connectInstagram() {
  alert("Instagram connect will be added using backend (OAuth).");
}

// ─── EVENTS ─────────────────────────────────────────
document.getElementById('genrePills').addEventListener('click', e => {
  const p = e.target.closest('.pill');
  if (!p) return;

  document.querySelectorAll('.pill').forEach(x => x.classList.remove('active'));
  p.classList.add('active');

  activeGenre = p.dataset.genre;
  closeDetail();
  render();
});

['minF','maxF','tierSel','sortSel'].forEach(id => {
  document.getElementById(id).addEventListener('input', render);
});

// ─── INIT ────────────────────────────────────────────
render();

let count = 0;
const target = creators.length;
const counter = setInterval(() => {
  count = Math.min(count + 1, target);
  document.getElementById('stat-count').textContent = count;
  if (count >= target) clearInterval(counter);
}, 60);
