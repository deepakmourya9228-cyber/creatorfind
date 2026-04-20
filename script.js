<script>
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
  { id:1,  name:"Priya Sharma",     handle:"@priyastyled",  genre:"fashion",   followers:820000,  eng:4.2, views:1200000, avatar:"PS", icon:"👗", bio:"Fashion & lifestyle creator from Mumbai. Iconic lookbooks, brand collabs & street style content loved by 800K+ followers.", rate:"₹45,000", reels:[{e:"👗",v:"2.1M"},{e:"💄",v:"980K"},{e:"✨",v:"750K"},{e:"🛍",v:"600K"}] },
  { id:2,  name:"Arjun Fitness",    handle:"@arjunfit",     genre:"fitness",   followers:340000,  eng:6.8, views:890000,  avatar:"AF", icon:"💪", bio:"Certified trainer & fitness educator. Workout tips, nutrition science & transformation stories.", rate:"₹22,000", reels:[{e:"💪",v:"1.4M"},{e:"🏋",v:"800K"},{e:"🥗",v:"420K"},{e:"🏃",v:"380K"}] },
  { id:3,  name:"Riya Eats",        handle:"@riyaeats",     genre:"food",      followers:1500000, eng:5.1, views:3200000, avatar:"RE", icon:"🍜", bio:"Restaurant reviews, street food adventures & quick recipes across India. Foodie at heart, creator by passion.", rate:"₹80,000", reels:[{e:"🍜",v:"5.2M"},{e:"🍕",v:"3.1M"},{e:"🥘",v:"2.8M"},{e:"🧆",v:"1.9M"}] },
  { id:4,  name:"TechWala Raj",     handle:"@techwalaraj",  genre:"tech",      followers:280000,  eng:7.3, views:620000,  avatar:"TR", icon:"📱", bio:"Unboxings, reviews & tech tips in Hindi. Making technology accessible to every Indian.", rate:"₹18,000", reels:[{e:"📱",v:"1.1M"},{e:"💻",v:"700K"},{e:"🎮",v:"500K"},{e:"📡",v:"320K"}] },
  { id:5,  name:"Wanderer Meera",   handle:"@meerawanders",  genre:"travel",   followers:95000,   eng:8.9, views:410000,  avatar:"WM", icon:"✈️", bio:"Solo female traveller sharing budget tips & hidden gems across India & South East Asia.", rate:"₹8,000",  reels:[{e:"🏔",v:"620K"},{e:"🏖",v:"390K"},{e:"🌅",v:"280K"},{e:"🗺",v:"210K"}] },
  { id:6,  name:"Glamour by Sana",  handle:"@sanaglam",     genre:"beauty",    followers:2100000, eng:4.5, views:4800000, avatar:"GS", icon:"💅", bio:"Makeup tutorials, skincare reviews & beauty hacks trusted by 2M+ fans. Brand partnerships open.", rate:"₹1,20,000", reels:[{e:"💄",v:"7.8M"},{e:"✨",v:"4.2M"},{e:"💅",v:"3.1M"},{e:"🪞",v:"2.4M"}] },
  { id:7,  name:"Dev Finance",      handle:"@devfinance",   genre:"finance",   followers:410000,  eng:5.6, views:780000,  avatar:"DF", icon:"📊", bio:"Stocks, mutual funds & personal finance simplified for everyday Indians. SEBI registered.", rate:"₹28,000", reels:[{e:"📊",v:"1.3M"},{e:"💰",v:"900K"},{e:"📈",v:"600K"},{e:"🏦",v:"450K"}] },
  { id:8,  name:"GamingWithKaran",  handle:"@karangames",   genre:"gaming",    followers:760000,  eng:9.1, views:2100000, avatar:"GK", icon:"🎮", bio:"BGMI, mobile gaming & esports. The fastest growing gaming channel in India with the best community.", rate:"₹38,000", reels:[{e:"🎮",v:"3.4M"},{e:"🏆",v:"2.1M"},{e:"⚡",v:"1.8M"},{e:"🎯",v:"1.5M"}] },
  { id:9,  name:"Naina Style",      handle:"@nainastyle",   genre:"fashion",   followers:58000,   eng:10.2,views:180000,  avatar:"NS", icon:"👠", bio:"Sustainable fashion & thrift hauls. Micro-influencer with sky-high engagement and authentic community.", rate:"₹5,000",  reels:[{e:"👠",v:"280K"},{e:"👜",v:"190K"},{e:"🛍",v:"120K"},{e:"🌿",v:"95K"}] },
  { id:10, name:"Chef Vikram",      handle:"@chefvikram",   genre:"food",      followers:430000,  eng:6.2, views:950000,  avatar:"CV", icon:"👨‍🍳", bio:"5-star chef turned creator. Gourmet recipes made simple — from your home kitchen.", rate:"₹30,000", reels:[{e:"👨‍🍳",v:"1.6M"},{e:"🍳",v:"1.1M"},{e:"🥩",v:"700K"},{e:"🍰",v:"560K"}] },
  { id:11, name:"Ananya Wellness",  handle:"@ananyafit",    genre:"fitness",   followers:72000,   eng:11.4,views:320000,  avatar:"AW", icon:"🧘", bio:"Yoga, pilates & mindful wellness in Hindi & English. India's most trusted wellness micro-creator.", rate:"₹6,500",  reels:[{e:"🧘",v:"480K"},{e:"🏃",v:"310K"},{e:"🥦",v:"200K"},{e:"🌸",v:"170K"}] },
  { id:12, name:"TravelBro Sid",    handle:"@travelsidd",   genre:"travel",    followers:1800000, eng:3.8, views:2900000, avatar:"TS", icon:"🌍", bio:"International travel, luxury stays & adventure sports. Collab inquiries welcome.", rate:"₹95,000", reels:[{e:"🌍",v:"4.2M"},{e:"🏄",v:"2.8M"},{e:"🏕",v:"1.9M"},{e:"🚀",v:"1.4M"}] },
  { id:13, name:"Memes by Sahil",   handle:"@sahilmemes",   genre:"comedy",    followers:1200000, eng:12.1,views:5100000, avatar:"MS", icon:"😂", bio:"India's most viral comedy creator. Relatable memes, skits & trending audio content for Gen Z.", rate:"₹65,000", reels:[{e:"😂",v:"8.1M"},{e:"🤣",v:"5.6M"},{e:"🎭",v:"3.9M"},{e:"⚡",v:"2.8M"}] },
  { id:14, name:"Neha Lifestyle",   handle:"@nehavibes",    genre:"lifestyle", followers:390000,  eng:7.8, views:820000,  avatar:"NL", icon:"🌟", bio:"Morning routines, home decor & mindful living. Aesthetic content that inspires real change.", rate:"₹24,000", reels:[{e:"🌟",v:"1.2M"},{e:"🏡",v:"780K"},{e:"☕",v:"530K"},{e:"📚",v:"410K"}] },
  { id:15, name:"StartupWala",      handle:"@startupwala",  genre:"finance",   followers:88000,   eng:9.3, views:290000,  avatar:"SW", icon:"🚀", bio:"Startup stories, founder interviews & business tips for the next generation of Indian entrepreneurs.", rate:"₹7,000",  reels:[{e:"🚀",v:"450K"},{e:"💡",v:"320K"},{e:"📈",v:"240K"},{e:"🤝",v:"180K"}] },
  { id:16, name:"Preet Comedy",     handle:"@preetcomedy",  genre:"comedy",    followers:3400000, eng:8.6, views:8900000, avatar:"PC", icon:"🎭", bio:"Viral comedy skits & Punjabi humor. One of India's top comedy creators with massive loyal fanbase.", rate:"₹2,00,000",reels:[{e:"🎭",v:"12M"},{e:"😂",v:"9.4M"},{e:"🤣",v:"7.2M"},{e:"⚡",v:"5.8M"}] },
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

// ─── RENDER CARD ────────────────────────────────────
function renderCard(c, delay) {
  const col = getColor(c.genre);
  const t = TIERS[tierOf(c.followers)];
  const reelsHtml = c.reels.slice(0,3).map(r => `
    <div class="reel-chip" style="background:${col.tile}">
      <span style="font-size:18px">${r.e}</span>
      <span class="reel-views">${r.v}</span>
    </div>`).join('');

  return `
  <div class="creator-card${selectedId===c.id?' selected':''}"
       style="animation-delay:${delay}ms"
       onclick="openDetail(${c.id})">
    <div class="tier-badge" style="background:${t.bg};color:${t.color}">${t.label}</div>
    <div class="card-cover" style="background:${col.bg}">
      <span style="font-size:36px">${c.icon}</span>
    </div>
    <div class="card-body">
      <div class="card-avatar" style="background:${col.bg};color:${col.text}">${c.avatar}</div>
      <div class="card-name">${c.name}</div>
      <div class="card-handle">${c.handle}</div>
      <div class="card-genre" style="background:${col.bg};color:${col.text}">${c.genre}</div>
      <div class="card-reels">${reelsHtml}</div>
      <div class="card-meta">
        <div class="meta-item">
          <span class="meta-val">${fmt(c.followers)}</span>
          <span class="meta-lbl">Followers</span>
        </div>
        <div class="meta-item">
          <span class="meta-val">${c.eng}%</span>
          <span class="meta-lbl">Engagement</span>
        </div>
        <div class="meta-item">
          <span class="meta-val">${fmt(c.views)}</span>
          <span class="meta-lbl">Avg views</span>
        </div>
      </div>
    </div>
  </div>`;
}

// ─── RENDER DETAIL ───────────────────────────────────
function renderDetail(c) {
  const col = getColor(c.genre);
  const t = TIERS[tierOf(c.followers)];
  const reelsHtml = c.reels.map(r => `
    <div class="dp-reel">
      <div class="dp-reel-cover" style="background:${col.bg}">${r.e}</div>
      <div class="dp-reel-views">${r.v} views</div>
    </div>`).join('');

  return `
  <div class="dp-header">
    <div class="dp-avatar" style="background:${col.bg};color:${col.text}">${c.avatar}</div>
    <div class="dp-info">
      <div class="dp-name">${c.name}</div>
      <div class="dp-handle">${c.handle} &nbsp;·&nbsp;
        <span style="color:${col.text}">${c.genre}</span> &nbsp;·&nbsp;
        <span style="background:${t.bg};color:${t.color};padding:2px 8px;border-radius:6px;font-size:12px;font-weight:600">${t.label}</span>
      </div>
      <div class="dp-bio">${c.bio}</div>
    </div>
    <button onclick="closeDetail()" style="background:none;border:1px solid var(--border);color:var(--muted);padding:6px 14px;border-radius:8px;cursor:pointer;font-size:13px;white-space:nowrap;flex-shrink:0">✕ Close</button>
  </div>

  <div class="dp-stats">
    <div class="dp-stat">
      <span class="v">${fmt(c.followers)}</span>
      <span class="l">Followers</span>
    </div>
    <div class="dp-stat">
      <span class="v">${c.eng}%</span>
      <span class="l">Engagement rate</span>
    </div>
    <div class="dp-stat">
      <span class="v">${fmt(c.views)}</span>
      <span class="l">Avg reel views</span>
    </div>
    <div class="dp-stat">
      <span class="v">${c.rate}</span>
      <span class="l">Rate per post</span>
    </div>
  </div>

  <div class="dp-reels-title">Top reels</div>
  <div class="dp-reels">${reelsHtml}</div>

  <div class="dp-footer">
    <button class="btn-contact" onclick="alert('In the real platform, this will open a contact form or reveal the creator\\'s email. You can connect this to your backend!')">
      Contact creator →
    </button>
    <button class="btn-save" onclick="alert('Save to shortlist — connect this to Supabase to persist saved creators per brand account!')">
      ♡ Save
    </button>
    <div class="dp-rate">${c.rate} <span>/ post</span></div>
  </div>`;
}

// ─── MAIN RENDER ────────────────────────────────────
function render() {
  const list = getFiltered();
  const grid = document.getElementById('grid');
  const empty = document.getElementById('empty');
  const panel = document.getElementById('detailPanel');

  // Update stats
  document.getElementById('countDisplay').textContent = list.length;
  if (list.length) {
    const avgF = Math.round(list.reduce((a,c)=>a+c.followers,0)/list.length);
    const avgE = (list.reduce((a,c)=>a+c.eng,0)/list.length).toFixed(1);
    const total = list.reduce((a,c)=>a+c.followers,0);
    document.getElementById('statReach').textContent = fmt(avgF);
    document.getElementById('statEng').textContent = avgE + '%';
    document.getElementById('statTotal').textContent = fmt(total);
  }

  // Update hero count
  document.getElementById('stat-count').textContent = creators.length;

  if (list.length === 0) {
    grid.innerHTML = '';
    empty.classList.add('show');
  } else {
    empty.classList.remove('show');
    grid.innerHTML = list.map((c,i) => renderCard(c, i*30)).join('');
  }

  // Update detail if open
  if (selectedId) {
    const still = list.find(c => c.id === selectedId);
    if (!still) {
      panel.classList.remove('open');
      selectedId = null;
    }
  }
}

function openDetail(id) {
  selectedId = id;
  const c = creators.find(x => x.id === id);
  const panel = document.getElementById('detailPanel');
  panel.innerHTML = renderDetail(c);
  panel.classList.add('open');
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  render();
}

function closeDetail() {
  selectedId = null;
  document.getElementById('detailPanel').classList.remove('open');
  render();
}

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

['minF','maxF'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    document.getElementById('minFVal').textContent = FLEVELS[+document.getElementById('minF').value];
    document.getElementById('maxFVal').textContent = FLEVELS[+document.getElementById('maxF').value];
    render();
  });
});

document.getElementById('tierSel').addEventListener('change', render);
document.getElementById('sortSel').addEventListener('change', render);

// ─── INIT ────────────────────────────────────────────
render();

// Animate hero stat counter
let count = 0;
const target = creators.length;
const counter = setInterval(() => {
  count = Math.min(count + 1, target);
  document.getElementById('stat-count').textContent = count;
  if (count >= target) clearInterval(counter);
}, 60);
<script>
