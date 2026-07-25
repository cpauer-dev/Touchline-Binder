
const DEFAULT_PLAYERS = [{"id": "landon-cartier", "first": "Landon", "last": "Cartier", "jersey": "14", "email": "lauranizolek@gmail.com", "phone": "518-796-9686", "contactName": "Laura Cartier", "relationship": "Parent/Guardian", "notes": "", "medical": ""}, {"id": "jude-budge", "first": "Jude", "last": "Budge", "jersey": "", "email": "", "phone": "", "contactName": "", "relationship": "Parent/Guardian", "notes": "", "medical": ""}, {"id": "grayson-santoro", "first": "Grayson", "last": "Santoro", "jersey": "23", "email": "asantoro2@nycap.rr.com", "phone": "518-495-2252", "contactName": "Katy Santoro", "relationship": "Parent/Guardian", "notes": "", "medical": ""}, {"id": "colin-nichol", "first": "Colin", "last": "Nichol", "jersey": "17", "email": "ryan.larson@bkwschools.org", "phone": "518-429-7012", "contactName": "", "relationship": "Parent/Guardian", "notes": "Last name appeared as \u201cNicol\u201d on last season\u2019s roster.", "medical": ""}, {"id": "luca-bertagnoli", "first": "Luca", "last": "Bertagnoli", "jersey": "20", "email": "tonybert@gmail.com", "phone": "714-345-7645", "contactName": "", "relationship": "Parent/Guardian", "notes": "", "medical": ""}, {"id": "finnley-clark", "first": "Finnley", "last": "Clark", "jersey": "17", "email": "tracylclark24@gmail.com", "phone": "", "contactName": "", "relationship": "Parent/Guardian", "notes": "Jersey #17 conflicts with Colin Nichol.", "medical": ""}, {"id": "jacob-madara", "first": "Jacob", "last": "Madara", "jersey": "10", "email": "jwmadara@yahoo.com", "phone": "518-330-2899", "contactName": "", "relationship": "Parent/Guardian", "notes": "", "medical": ""}, {"id": "brody-waite", "first": "Brody", "last": "Waite", "jersey": "34", "email": "angela.waite.aw@gmail.com", "phone": "518-859-5787", "contactName": "", "relationship": "Parent/Guardian", "notes": "", "medical": ""}, {"id": "derrick-lopez", "first": "Derrick", "last": "Lopez", "jersey": "21", "email": "maddiec95@yahoo.com", "phone": "518-338-8411", "contactName": "", "relationship": "Parent/Guardian", "notes": "First name appeared as \u201cDerek\u201d on last season\u2019s roster.", "medical": ""}, {"id": "jaxon-mcdonough", "first": "Jaxon", "last": "McDonough", "jersey": "11", "email": "tobeysnyder@hotmail.com", "phone": "518-926-8974", "contactName": "", "relationship": "Parent/Guardian", "notes": "", "medical": ""}, {"id": "carson-pauer", "first": "Carson", "last": "Pauer", "jersey": "13", "email": "kaitling1987@gmail.com", "phone": "215-680-0765", "contactName": "Kate Pauer", "relationship": "Parent/Guardian", "notes": "", "medical": ""}, {"id": "duke-kitchell", "first": "Duke", "last": "Kitchell", "jersey": "", "email": "", "phone": "", "contactName": "", "relationship": "Parent/Guardian", "notes": "", "medical": ""}, {"id": "hunter-harrington", "first": "Hunter", "last": "Harrington", "jersey": "27", "email": "kalienamarie@yahoo.com", "phone": "518-379-7678", "contactName": "", "relationship": "Parent/Guardian", "notes": "", "medical": ""}, {"id": "ezra-hall", "first": "Ezra", "last": "Hall", "jersey": "5", "email": "dhallrmadrid@gmail.com", "phone": "", "contactName": "", "relationship": "Parent/Guardian", "notes": "", "medical": ""}, {"id": "paul-roden", "first": "Paul", "last": "Roden", "jersey": "", "email": "", "phone": "", "contactName": "", "relationship": "Parent/Guardian", "notes": "", "medical": ""}];
const KEY='touchline-v051';
let installPrompt=null;
let timer=null, elapsed=0, timerRunning=false;

function freshState(){
  return {
    team:{name:'BSSC U12 Boys B',season:'2026–27',primary:'White',secondary:'Black',shorts:'Black',socks:'Black'},
    players:structuredClone(DEFAULT_PLAYERS),
    events:[],
    aars:[],
    score:{us:0,them:0},
    notes:[]
  };
}
let state=load();
function load(){
  try{
    const saved=JSON.parse(localStorage.getItem(KEY));
    if(saved) return saved;
  }catch(e){}
  const s=freshState(); localStorage.setItem(KEY,JSON.stringify(s)); return s;
}
function save(){localStorage.setItem(KEY,JSON.stringify(state));}
function esc(s=''){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
function nav(view){
  document.querySelectorAll('.view').forEach(x=>x.classList.remove('active'));
  document.getElementById(view).classList.add('active');
  document.querySelectorAll('.bottom-nav button').forEach(x=>x.classList.toggle('active',x.dataset.view===view));
  render();
}
document.querySelectorAll('.bottom-nav button').forEach(b=>b.onclick=()=>nav(b.dataset.view));

function conflicts(){
  const map={};
  state.players.forEach(p=>{if(p.jersey)(map[p.jersey]??=[]).push(p.first+' '+p.last)});
  return Object.entries(map).filter(([,v])=>v.length>1);
}
function missing(){
  return state.players.filter(p=>!p.jersey||!p.email||!p.phone);
}
function renderDashboard(){
  const c=conflicts(), m=missing();
  dashboard.innerHTML=`
    <div class="grid two">
      <div class="card"><div class="muted">Players</div><div class="stat">${state.players.length}</div></div>
      <div class="card"><div class="muted">Roster records needing data</div><div class="stat">${m.length}</div></div>
    </div>
    ${c.length?`<div class="card warning"><h3>Jersey conflict</h3>${c.map(([n,names])=>`<p><b>#${n}</b>: ${names.join(' and ')}</p>`).join('')}</div>`:'<div class="card success"><b>No jersey conflicts.</b></div>'}
    <div class="card"><h2>Current roster status</h2>
      <p><b>12 of 15</b> players were matched to last season's rosters.</p>
      <p><b>Jude Budge, Duke Kitchell, and Paul Roden</b> were not found, so their jersey and contact fields remain blank.</p>
      <p class="small muted">Birthdays remain a coach-dashboard-only future feature and are not shown to parents.</p>
    </div>
    <div class="card"><h3>Next event</h3><p class="muted">${state.events.length?esc(state.events.sort((a,b)=>a.date.localeCompare(b.date))[0].title):'No events scheduled.'}</p><button onclick="nav('events')">Open Events</button></div>`;
}
function renderPlayers(){
  players.innerHTML=`<div class="card"><h2>Players</h2><p class="muted">Tap a player to review or edit coach-held contact and safety information.</p>
  ${state.players.map(p=>`<div class="player-row" onclick="editPlayer('${p.id}')">
    <div class="jersey ${p.jersey?'':'empty'}">${p.jersey||'—'}</div>
    <div><b>${esc(p.first)} ${esc(p.last)}</b>
      <div class="contact-links">${p.email?`<a onclick="event.stopPropagation()" href="mailto:${esc(p.email)}">Email</a>`:''}${p.phone?`<a onclick="event.stopPropagation()" href="tel:${esc(p.phone)}">Call</a>`:''}</div>
      ${p.notes?`<div class="small muted">${esc(p.notes)}</div>`:''}
    </div><button class="secondary">Edit</button>
  </div>`).join('')}</div>`;
}
function openModal(html,onSave){
  modalContent.innerHTML=html; modal.showModal();
  modalCancel.onclick=()=>modal.close();
  modalForm.onsubmit=e=>{e.preventDefault();onSave(new FormData(modalForm));modal.close();save();render();};
}
window.editPlayer=id=>{
  const p=state.players.find(x=>x.id===id);
  openModal(`<h2>${esc(p.first)} ${esc(p.last)}</h2>
  <label>Jersey number</label><input name="jersey" value="${esc(p.jersey)}">
  <label>Parent/guardian name</label><input name="contactName" value="${esc(p.contactName)}">
  <label>Email</label><input type="email" name="email" value="${esc(p.email)}">
  <label>Phone</label><input name="phone" value="${esc(p.phone)}">
  <label>Participation/safety alert</label><textarea name="medical">${esc(p.medical)}</textarea>
  <label>Coach notes</label><textarea name="notes">${esc(p.notes)}</textarea>`,fd=>{
    ['jersey','contactName','email','phone','medical','notes'].forEach(k=>p[k]=fd.get(k).trim());
  });
}
function renderEvents(){
  events.innerHTML=`<div class="card"><h2>Events</h2><button onclick="newEvent()">Add event</button></div>
  ${state.events.length?state.events.map(e=>`<div class="card"><h3>${esc(e.title)}</h3><p>${esc(e.date)} · ${esc(e.type)}</p><p class="muted">${esc(e.location||'Location not set')}</p></div>`).join(''):'<div class="card muted">No events yet.</div>'}`;
}
window.newEvent=()=>openModal(`<h2>New event</h2><label>Title</label><input name="title" required><label>Type</label><select name="type"><option>Practice</option><option>Game</option><option>Meeting</option></select><label>Date and time</label><input type="datetime-local" name="date" required><label>Location</label><input name="location">`,fd=>state.events.push(Object.fromEntries(fd.entries())));
function fmt(sec){return String(Math.floor(sec/60)).padStart(2,'0')+':'+String(sec%60).padStart(2,'0')}
function renderPractice(){
  practice.innerHTML=`<div class="card"><h2>Practice Mode</h2><div class="timer">${fmt(elapsed)}</div><div style="display:flex;gap:8px;justify-content:center"><button onclick="toggleTimer()">${timerRunning?'Pause':'Start'}</button><button class="secondary" onclick="resetTimer()">Reset</button></div></div>
  <div class="card"><h3>Quick note</h3><textarea id="practiceNote" placeholder="What needs attention?"></textarea><button onclick="saveNote('practice')">Save note</button></div>`;
}
window.toggleTimer=()=>{timerRunning=!timerRunning;if(timerRunning)timer=setInterval(()=>{elapsed++;renderPractice()},1000);else clearInterval(timer);renderPractice();}
window.resetTimer=()=>{clearInterval(timer);timerRunning=false;elapsed=0;renderPractice();}
window.saveNote=type=>{const el=document.getElementById(type+'Note');if(el&&el.value.trim()){state.notes.push({type,text:el.value.trim(),time:new Date().toISOString()});save();el.value='';}}
function renderGame(){
 game.innerHTML=`<div class="card"><h2>Game Day</h2><div class="score"><button onclick="score(-1,0)">−</button><span>${state.score.us} – ${state.score.them}</span><button onclick="score(1,0)">+</button></div><p class="muted" style="text-align:center">Touchline score – Opponent</p><div class="score"><button class="secondary" onclick="score(0,-1)">Opp −</button><button class="secondary" onclick="score(0,1)">Opp +</button></div></div>
 <div class="card"><h3>Quick match note</h3><textarea id="gameNote"></textarea><button onclick="saveNote('game')">Save note</button></div>`;
}
window.score=(u,t)=>{state.score.us=Math.max(0,state.score.us+u);state.score.them=Math.max(0,state.score.them+t);save();renderGame();}
function renderAars(){
 aars.innerHTML=`<div class="card"><h2>AAR Index</h2><p class="muted">Completed practice and match reviews will appear here.</p></div>`;
}
function renderSettings(){
 settings.innerHTML=`<div class="card"><h2>Team Settings</h2>
 <p><b>${esc(state.team.name)}</b><br>${esc(state.team.season)}</p>
 <span class="pill">Primary: ${esc(state.team.primary)}</span><span class="pill">Secondary: ${esc(state.team.secondary)}</span><span class="pill">Shorts: ${esc(state.team.shorts)}</span><span class="pill">Socks: ${esc(state.team.socks)}</span>
 </div><div class="card"><h3>Data</h3><button onclick="exportData()">Export JSON</button> <button class="secondary" onclick="importFile.click()">Import JSON</button> <button class="danger" onclick="resetAll()">Reset app</button></div>
 <div class="card warning"><b>Local-first:</b> this information is stored in this browser on this device. Export a backup before replacing site data or clearing browser storage.</div>`;
}
window.exportData=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(state,null,2)],{type:'application/json'}));a.download='touchline-backup.json';a.click();URL.revokeObjectURL(a.href);}
importFile.onchange=async()=>{try{state=JSON.parse(await importFile.files[0].text());save();render();alert('Import complete.')}catch(e){alert('That file could not be imported.')}}
window.resetAll=()=>{if(confirm('Reset Touchline and restore the preloaded roster?')){state=freshState();save();render();}}
function render(){renderDashboard();renderPlayers();renderEvents();renderPractice();renderGame();renderAars();renderSettings();}
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;installBtn.classList.remove('hidden')});
installBtn.onclick=async()=>{if(installPrompt){installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;installBtn.classList.add('hidden')}};
if('serviceWorker'in navigator) navigator.serviceWorker.register('./sw.js');
nav('dashboard');
