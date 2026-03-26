let cur=null,srch='',fCap=false,fLive=false,fQueue=false,A={},ROSTER=[],curRole=null,pmIdx=-1,rpmRoleId=null;
const gk=(id,t,f)=>id+'|||'+t+'|||'+f;
const gkd=(id,t)=>id+'|||'+t+'|||doers';
function getDoers(id,t){try{return JSON.parse(A[gkd(id,t)]||'[]');}catch(e){return[];}}
function setDoers(id,t,arr){A[gkd(id,t)]=JSON.stringify(arr);}

function load(){
  try{const s=localStorage.getItem('ftm10');if(s){const d=JSON.parse(s);A=d.A||{};ROSTER=d.R||[...ROSTER_DEFAULT.map(p=>({...p}))];}}
  catch(e){ROSTER=[...ROSTER_DEFAULT.map(p=>({...p}))];}
  if(!ROSTER.length)ROSTER=[...ROSTER_DEFAULT.map(p=>({...p}))];
  ROSTER.forEach(p=>{
    if(!p.email){
      const np=NOTION_PEOPLE.find(x=>x.n.toLowerCase()===p.n.toLowerCase());
      if(np){p.email=np.email;p.notionSynced=true;}
    }
  });
}
function doSave(){
  try{localStorage.setItem('ftm10',JSON.stringify({A,R:ROSTER}));}catch(e){}
  const m=document.getElementById('saved-msg');if(m){m.style.display='inline';setTimeout(()=>m.style.display='none',2000);}
}
function liveCnt(d){return d.subdepts.reduce((n,s)=>n+s.tasks.filter(t=>t.ai&&(A[gk(d.id,t.t,'st')]||'none')==='live').length,0);}
function capCnt(d){return d.subdepts.reduce((n,s)=>n+s.tasks.filter(t=>t.ai).length,0);}
function aColor(n){let h=0;for(const c of n)h=(h*31+c.charCodeAt(0))%ACOLS.length;return ACOLS[h];}
function initials(n){return n.split(' ').filter(Boolean).slice(0,2).map(w=>w[0]).join('').toUpperCase();}
function sortedRoster(){return[...ROSTER].sort((a,b)=>a.n.localeCompare(b.n));}
function personOpts(sel){let o='<option value="">— Unassigned —</option>';sortedRoster().forEach(p=>{o+='<option value="'+esc(p.n)+'"'+(p.n===sel?' selected':'')+'>'+esc(p.n)+'</option>';});return o;}
function datalistOpts(){return sortedRoster().map(p=>'<option value="'+esc(p.n)+'">').join('');}
function rebuildDL(){const dl=document.getElementById('ppl-list');if(dl)dl.innerHTML=datalistOpts();}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}
function roleColor(rid){const r=ROLES.find(x=>x.id===rid);return r?r.color:'#888';}
function roleName(rid){const r=ROLES.find(x=>x.id===rid);return r?r.name:'';}

function switchTab(tab){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  document.getElementById('view-'+tab).classList.add('active');
  document.getElementById('tab-'+tab).classList.add('active');
  if(tab==='roster')renderRoster();
  if(tab==='person')renderPersonSelect();
  if(tab==='roles')renderRolesSidebar();
}

function renderSidebar(){
  let h='';
  SECTS.forEach(sec=>{
    h+='<div class="sec"><span class="sec-lbl">'+sec.l+'</span>';
    sec.ids.forEach(id=>{
      const d=D.find(x=>x.id===id);if(!d)return;
      const lv=liveCnt(d),cp=capCnt(d);
      const badge=lv>0?'<span class="live-badge">'+lv+'/'+cp+'</span>':'';
      h+='<button class="dept-btn'+(cur&&cur.id===id?' active':'')+'" data-id="'+id+'">'
        +'<span class="dept-dot" style="background:'+d.color+'"></span>'
        +'<span class="dept-name">'+d.name+'</span>'+badge+'</button>';
    });
    h+='</div>';
  });
  document.getElementById('sidebar').innerHTML=h;
  document.querySelectorAll('.dept-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{cur=D.find(d=>d.id===btn.dataset.id);renderSidebar();renderMain();});
  });
}

function renderMain(){
  const ta=document.getElementById('table-area');
  const dh=document.getElementById('dhead');
  if(!cur){
    ta.innerHTML='<div class="empty"><strong>Select a department to begin</strong>Role badges appear on each task — click any role badge to jump to that role definition.</div>';
    dh.style.display='none';
    document.getElementById('task-count').textContent='';
    document.getElementById('live-count').textContent='';
    document.getElementById('dept-pill').style.display='none';
    document.getElementById('dept-title').textContent='Select a department';
    return;
  }
  document.getElementById('dept-title').textContent=cur.name;
  const pill=document.getElementById('dept-pill');
  pill.textContent=TLBL[cur.type];pill.className='pill '+TCLS[cur.type];pill.style.display='inline-block';
  dh.style.display='flex';
  const dhs=document.getElementById('dhead-select');
  const curHead=A['__hd__'+cur.id]||'';
  dhs.innerHTML=personOpts(curHead);
  dhs.onchange=()=>{A['__hd__'+cur.id]=dhs.value;doSave();renderSidebar();};
  const lv=liveCnt(cur),cp=capCnt(cur);
  document.getElementById('live-count').textContent=lv>0?lv+' of '+cp+' AI tasks live':'';
  const hasTeam=cur.subdepts.some(s=>s.tasks.some(t=>t.team));
  let total=0,html='';
  cur.subdepts.forEach(sub=>{
    const tasks=sub.tasks.filter(t=>{
      const st=A[gk(cur.id,t.t,'st')]||'none';
      if(fCap&&!t.ai)return false;
      if(fLive&&st!=='live')return false;
      if(fQueue&&st!=='queued'&&st!=='training')return false;
      if(srch&&!t.t.toLowerCase().includes(srch)&&!t.d.toLowerCase().includes(srch))return false;
      return true;
    });
    if(!tasks.length)return;
    total+=tasks.length;
    html+='<div class="sub-hdr">'+sub.name+'</div>';
    html+='<table class="task-tbl"><thead><tr>'
      +'<th style="width:175px">Task / Role</th>'
      +'<th style="width:165px">Description</th>'
      +(hasTeam?'<th style="width:75px">Team</th>':'')
      +'<th style="width:108px">Process Owner</th>'
      +'<th style="width:108px">Manager</th>'
      +'<th style="width:125px">Doers</th>'
      +'<th style="width:85px;text-align:center">AI Capable</th>'
      +'<th style="width:50px;text-align:center">Priority</th>'
      +'<th style="width:118px">AI Status</th>'
      +'</tr></thead><tbody>';
    tasks.forEach(t=>{
      const ko=gk(cur.id,t.t,'o'),km=gk(cur.id,t.t,'m'),ks=gk(cur.id,t.t,'st');
      const st=A[ks]||'none',so=SOPTS.find(o=>o.v===st),isLv=st==='live';
      const ov=A[ko]||'',mv=A[km]||'';
      const doers=getDoers(cur.id,t.t);
      // FIX: Apply TASK_ROLE_OVERRIDE — was defined but never used in original
      const rid=TASK_ROLE_OVERRIDE[t.t]||t.role||'',rcolor=rid?roleColor(rid):'#bbb',rname=rid?roleName(rid):'';
      const rolePill=rname
        ?'<div class="role-pill-wrap"><span class="role-pill" data-role="'+esc(rid)+'" style="background:'+rcolor+'22;color:'+rcolor+';border:1px solid '+rcolor+'44">'+esc(rname)+'</span></div>'
        :'';
      const aiH=t.ai?'<div class="ai-wrap"><span class="ai-cap-yes">&#10003; AI enabled</span></div>':'<span class="ai-cap-no">&mdash;</span>';
      const prH=!t.ai?'<span style="color:#ccc">&mdash;</span>':t.p==='h'?'<span class="pri-h">High</span>':t.p==='m'?'<span class="pri-m">Med</span>':'<span class="pri-l">Low</span>';
      const stH=t.ai?'<div style="padding:3px 6px"><select class="ai-sel '+(so?so.c:'')+'" data-ks="'+ks+'">'+SOPTS.map(o=>'<option value="'+o.v+'"'+(st===o.v?' selected':'')+'>'+o.l+'</option>').join('')+'</select></div>':'<div style="padding:4px 8px;font-size:11px;color:#ccc">&mdash;</div>';
      const chipHtml=doers.map((name,i)=>'<span class="doer-chip">'+esc(name)+'<span class="doer-chip-x" data-did="'+cur.id+'" data-dt="'+esc(t.t)+'" data-di="'+i+'">&times;</span></span>').join('');
      html+='<tr class="'+(isLv?'row-live':'')+'">'
        +'<td style="width:175px"><div class="tc">'+esc(t.t)+'</div>'+rolePill+'</td>'
        +'<td style="width:165px"><div class="dc">'+esc(t.d)+'</div></td>'
        +(hasTeam?'<td style="width:75px"><div class="teamc">'+(t.team?'<span class="team-tag">'+esc(t.team)+'</span>':'')+'</div></td>':'')
        +'<td style="width:108px"><div class="rc"><input type="text" list="ppl-list" autocomplete="off" class="role-in'+(ov?' assigned':'')+'" placeholder="Type name…" data-k="'+ko+'" value="'+esc(ov)+'"></div></td>'
        +'<td style="width:108px"><div class="rc"><input type="text" list="ppl-list" autocomplete="off" class="role-in'+(mv?' assigned':'')+'" placeholder="Type name…" data-k="'+km+'" value="'+esc(mv)+'"></div></td>'
        +'<td style="width:125px"><div class="doer-cell"><div class="doer-chips" data-did="'+cur.id+'" data-dt="'+esc(t.t)+'">'+chipHtml+'</div><input type="text" list="ppl-list" autocomplete="off" class="doer-add" placeholder="+ Add doer…" data-did="'+cur.id+'" data-dt="'+esc(t.t)+'"></div></td>'
        +'<td style="width:85px;text-align:center;padding:3px 5px">'+aiH+'</td>'
        +'<td style="width:50px;text-align:center;padding:3px 5px">'+prH+'</td>'
        +'<td style="width:118px">'+stH+'</td>'
        +'</tr>';
    });
    html+='</tbody></table>';
  });
  if(!html)html='<div class="empty"><strong>No tasks match your filters.</strong></div>';
  document.getElementById('task-count').textContent=total+' tasks';
  ta.innerHTML=html;
  rebuildDL();
  ta.querySelectorAll('.role-in').forEach(inp=>{
    inp.addEventListener('change',e=>{
      const v=e.target.value.trim();
      const match=ROSTER.find(p=>p.n.toLowerCase()===v.toLowerCase());
      const final=match?match.n:'';
      e.target.value=final;A[e.target.dataset.k]=final;
      e.target.className='role-in'+(final?' assigned':'');doSave();
    });
    inp.addEventListener('input',e=>{if(e.target.value===''){A[e.target.dataset.k]='';e.target.className='role-in';doSave();}});
  });
  ta.querySelectorAll('.doer-add').forEach(inp=>{
    inp.addEventListener('change',e=>{
      const v=e.target.value.trim();
      const match=ROSTER.find(p=>p.n.toLowerCase()===v.toLowerCase());
      if(!match){e.target.value='';return;}
      const did=e.target.dataset.did,dt=e.target.dataset.dt;
      const doers=getDoers(did,dt);
      if(!doers.includes(match.n)){doers.push(match.n);setDoers(did,dt,doers);doSave();}
      e.target.value='';renderMain();
    });
  });
  ta.querySelectorAll('.doer-chip-x').forEach(x=>{
    x.addEventListener('click',()=>{
      const did=x.dataset.did,dt=x.dataset.dt,idx=parseInt(x.dataset.di);
      const doers=getDoers(did,dt);doers.splice(idx,1);setDoers(did,dt,doers);doSave();renderMain();
    });
  });
  ta.querySelectorAll('.role-pill[data-role]').forEach(p=>{
    p.addEventListener('click',()=>{
      curRole=ROLES.find(r=>r.id===p.dataset.role);
      switchTab('roles');renderRolesSidebar();renderRoleDetail();
    });
  });
  ta.querySelectorAll('select[data-ks]').forEach(sel=>{
    sel.addEventListener('change',e=>{
      A[e.target.dataset.ks]=e.target.value;
      const so=SOPTS.find(o=>o.v===e.target.value);
      e.target.className='ai-sel '+(so?so.c:'');
      const row=e.target.closest('tr');if(row)row.className=e.target.value==='live'?'row-live':'';
      doSave();renderSidebar();
    });
  });
}

function getRolePeople(rid){try{return JSON.parse(A['__rp__'+rid]||'[]');}catch(e){return[];}}
function setRolePeople(rid,arr){A['__rp__'+rid]=JSON.stringify(arr);}
function roleAssignedCnt(rid){return getRolePeople(rid).length;}

function renderRolesSidebar(){
  const grouped={};
  ROLES.forEach(r=>{if(!grouped[r.dept])grouped[r.dept]=[];grouped[r.dept].push(r);});
  let h='';
  ROLE_DEPT_ORDER.forEach(did=>{
    const roles=grouped[did];if(!roles||!roles.length)return;
    h+='<div class="rs-sec"><span class="rs-sec-lbl">'+esc(ROLE_DEPT_LABELS[did]||did)+'</span>';
    roles.forEach(r=>{
      const cnt=roleAssignedCnt(r.id);
      const badge=cnt>0?'<span class="role-assigned-cnt" style="background:'+r.color+'22;color:'+r.color+'">'+cnt+'</span>':'';
      h+='<button class="role-btn'+(curRole&&curRole.id===r.id?' active':'')+'" data-rid="'+esc(r.id)+'" style="'+(curRole&&curRole.id===r.id?'border-left-color:'+r.color:'')+'"><span class="role-dot" style="background:'+r.color+'"></span><span class="role-btn-name">'+esc(r.name)+'</span>'+badge+'</button>';
    });
    h+='</div>';
  });
  document.getElementById('roles-sidebar').innerHTML=h;
  document.querySelectorAll('.role-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{curRole=ROLES.find(r=>r.id===btn.dataset.rid);renderRolesSidebar();renderRoleDetail();});
  });
}

function renderRoleDetail(){
  const el=document.getElementById('roles-detail');
  if(!curRole){el.innerHTML='<div class="empty"><strong>Select a role to view its tasks and assign people</strong></div>';return;}
  const r=curRole;
  const people=getRolePeople(r.id);
  const chipsHtml=people.map((name,i)=>{
    const p=ROSTER.find(x=>x.n===name);const col=aColor(name);
    return '<span class="rd-person-chip" style="background:'+col+'22;border-color:'+col+'44;color:'+col+'">'
      +'<span style="width:20px;height:20px;border-radius:50%;background:'+col+';display:inline-flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff;flex-shrink:0">'+initials(name)+'</span>'
      +' '+esc(name)+(p?'<span style="font-size:10px;color:'+col+';opacity:.7"> &mdash; '+esc(p.title)+'</span>':'')
      +'<span class="rd-chip-x" data-rid="'+esc(r.id)+'" data-ri="'+i+'">&times;</span></span>';
  }).join('');
  const taskRows=r.tasks.map(tname=>{
    let foundDept='',foundTask=null;
    for(const d of D){for(const s of d.subdepts){const t=s.tasks.find(x=>x.t===tname);if(t){foundDept=d.name;foundTask=t;break;}}if(foundTask)break;}
    if(!foundTask)return '';
    const aiH=foundTask.ai?'<span class="rd-task-ai">AI</span>':'';
    const prH=foundTask.ai&&foundTask.p?(foundTask.p==='h'?'<span class="rd-task-pri-h">High</span>':foundTask.p==='m'?'<span class="rd-task-pri-m">Med</span>':''):'';
    return '<div class="rd-task-row"><span class="rd-task-name">'+esc(tname)+'</span>'+prH+aiH+'<span class="rd-task-dept">'+esc(foundDept)+'</span></div>';
  }).join('');
  el.innerHTML='<div class="rd-header">'
    +'<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">'
    +'<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:'+r.color+'"></span>'
    +'<div class="rd-name">'+esc(r.name)+'</div></div>'
    +'<div class="rd-desc">'+esc(r.desc)+'</div>'
    +'<div class="rd-assign"><span class="rd-assign-lbl">People in this role</span>'
    +'<div class="rd-people">'+chipsHtml
    +'<button class="rd-add-person" data-rid="'+esc(r.id)+'">+ Add person</button>'
    +'</div></div></div>'
    +'<div class="rd-tasks-hdr">Tasks in this role <span class="rd-tasks-hdr-cnt">'+r.tasks.length+'</span></div>'
    +'<div class="rd-task-list">'+taskRows+'</div>';
  el.querySelectorAll('.rd-chip-x').forEach(x=>{
    x.addEventListener('click',()=>{
      const rid=x.dataset.rid,ri=parseInt(x.dataset.ri);
      const people=getRolePeople(rid);people.splice(ri,1);setRolePeople(rid,people);doSave();renderRoleDetail();renderRolesSidebar();
    });
  });
  el.querySelectorAll('.rd-add-person').forEach(btn=>{
    btn.addEventListener('click',()=>openRolePersonModal(btn.dataset.rid));
  });
}

function openRolePersonModal(rid){
  rpmRoleId=rid;document.getElementById('rpm-input').value='';rebuildDL();
  document.getElementById('role-person-modal-bg').classList.add('open');
  setTimeout(()=>document.getElementById('rpm-input').focus(),50);
}
function closeRolePersonModal(){document.getElementById('role-person-modal-bg').classList.remove('open');rpmRoleId=null;}
function saveRolePersonModal(){
  const v=document.getElementById('rpm-input').value.trim();
  const match=ROSTER.find(p=>p.n.toLowerCase()===v.toLowerCase());
  if(!match||!rpmRoleId){closeRolePersonModal();return;}
  const people=getRolePeople(rpmRoleId);
  if(!people.includes(match.n)){
    people.push(match.n);setRolePeople(rpmRoleId,people);
    const role=ROLES.find(r=>r.id===rpmRoleId);
    if(role){role.tasks.forEach(tname=>{for(const d of D){for(const s of d.subdepts){const t=s.tasks.find(x=>x.t===tname);if(t){const doers=getDoers(d.id,tname);if(!doers.includes(match.n)){doers.push(match.n);setDoers(d.id,tname,doers);}}}}});}
    doSave();
  }
  closeRolePersonModal();renderRoleDetail();renderRolesSidebar();if(cur)renderMain();
}

function renderRoster(q){
  const query=(q||'').toLowerCase();
  const filtered=ROSTER.filter(p=>!query||p.n.toLowerCase().includes(query)||(p.title||'').toLowerCase().includes(query)||(p.dept||'').toLowerCase().includes(query)||(p.email||'').toLowerCase().includes(query));
  document.getElementById('roster-count').textContent=filtered.length+' people';
  let h='';
  filtered.forEach(p=>{
    const ri=ROSTER.indexOf(p);const col=aColor(p.n);
    const emailLine=p.email?'<div class="person-email">'+esc(p.email)+'</div>':'';
    h+='<div class="person-card">'
      +'<div class="avatar" style="background:'+col+'">'+initials(p.n)+'</div>'
      +'<div class="person-info"><div class="person-name">'+esc(p.n)+'</div><div class="person-title">'+esc(p.title||'')+'</div>'
      +'<div class="person-card-meta"><div class="person-dept">'+esc(p.dept||'')+'</div></div>'
      +emailLine+'</div>'
      +'<div class="person-actions"><button class="icon-btn" onclick="openPersonModal('+ri+')">Edit</button><button class="icon-btn del" onclick="deletePerson('+ri+')">Remove</button></div>'
      +'</div>';
  });
  document.getElementById('roster-grid').innerHTML=h||'<div style="color:#9997a3;padding:20px">No results.</div>';
}
function openPersonModal(idx){
  pmIdx=idx;
  document.getElementById('pm-title').textContent=idx===-1?'Add Person':'Edit Person';
  if(idx>=0){
    document.getElementById('pm-name').value=ROSTER[idx].n;
    document.getElementById('pm-title-f').value=ROSTER[idx].title||'';
    document.getElementById('pm-dept').value=ROSTER[idx].dept||'';
    document.getElementById('pm-email').value=ROSTER[idx].email||'';
  }else{
    document.getElementById('pm-name').value='';document.getElementById('pm-title-f').value='';
    document.getElementById('pm-dept').value='';document.getElementById('pm-email').value='';
  }
  document.getElementById('person-modal').classList.add('open');
  setTimeout(()=>document.getElementById('pm-name').focus(),50);
}
function closePersonModal(){document.getElementById('person-modal').classList.remove('open');}
function savePersonModal(){
  const n=document.getElementById('pm-name').value.trim();
  const title=document.getElementById('pm-title-f').value.trim();
  const dept=document.getElementById('pm-dept').value.trim();
  const email=document.getElementById('pm-email').value.trim();
  if(!n)return;
  if(pmIdx===-1)ROSTER.push({n,title,dept,email});
  else ROSTER[pmIdx]={...ROSTER[pmIdx],n,title,dept,email};
  closePersonModal();doSave();rebuildDL();renderRoster(document.getElementById('roster-search').value);renderPersonSelect();
}
function deletePerson(idx){
  if(!confirm('Remove '+ROSTER[idx].n+' from the roster?'))return;
  ROSTER.splice(idx,1);doSave();rebuildDL();renderRoster(document.getElementById('roster-search').value);renderPersonSelect();
}

function renderPersonSelect(){
  const sel=document.getElementById('pv-select');const v=sel.value;
  sel.innerHTML='<option value="">— Select a person —</option>';
  sortedRoster().forEach(p=>{sel.innerHTML+='<option value="'+esc(p.n)+'"'+(p.n===v?' selected':'')+'>'+esc(p.n)+' — '+esc(p.title)+'</option>';});
  if(v)renderPersonView(v);
}
function renderPersonView(name){
  if(!name){document.getElementById('pv-content').innerHTML='<div class="pv-empty"><strong>Select a person</strong></div>';document.getElementById('pv-stats').style.display='none';return;}
  const heads=[],owners=[],managers=[],doers_list=[];
  D.forEach(d=>{
    if((A['__hd__'+d.id]||'')==name)heads.push({dept:d.name,sub:'',task:d.name+' — Dept Head'});
    d.subdepts.forEach(s=>{s.tasks.forEach(t=>{
      if((A[gk(d.id,t.t,'o')]||'')==name)owners.push({dept:d.name,sub:s.name,task:t.t});
      if((A[gk(d.id,t.t,'m')]||'')==name)managers.push({dept:d.name,sub:s.name,task:t.t});
      if(getDoers(d.id,t.t).includes(name))doers_list.push({dept:d.name,sub:s.name,task:t.t});
    });});
  });
  const total=heads.length+owners.length+managers.length+doers_list.length;
  document.getElementById('pvn-head').textContent=heads.length;
  document.getElementById('pvn-owner').textContent=owners.length;
  document.getElementById('pvn-mgr').textContent=managers.length;
  document.getElementById('pvn-doer').textContent=doers_list.length;
  document.getElementById('pvn-total').textContent=total;
  document.getElementById('pv-stats').style.display='flex';
  if(!total){document.getElementById('pv-content').innerHTML='<div class="pv-empty"><strong>No assignments yet for '+esc(name)+'</strong>Assign them in the Task Map or Roles tab.</div>';return;}
  function sec(items,label,cls){
    if(!items.length)return '';
    return '<div class="pv-section"><div class="pv-sec-hdr">'+label+'<span class="pv-sec-cnt">'+items.length+'</span></div><div class="pv-tasks">'
      +items.map(i=>'<div class="pv-task"><span class="seat-badge '+cls+'">'+label.split(' ')[0]+'</span><span class="pv-task-name">'+esc(i.task)+'</span><span class="pv-sub">'+esc(i.sub)+'</span><span class="pv-dept">'+esc(i.dept)+'</span></div>').join('')
      +'</div></div>';
  }
  document.getElementById('pv-content').innerHTML=
    sec(heads,'Dept Head','sb-head')+sec(owners,'Owner','sb-owner')+sec(managers,'Manager','sb-mgr')+sec(doers_list,'Doer','sb-doer');
}

function dlCSV(rows,filename){
  const csv=rows.map(r=>r.map(c=>'"'+String(c).replace(/"/g,'""')+'"').join(',')).join('\n');
  const d=new Date().toISOString().slice(0,10);
  const a=document.createElement('a');
  a.href='data:text/csv;charset=utf-8,\uFEFF'+encodeURIComponent(csv);
  a.download=filename.replace('.csv','')+'_'+d+'.csv';
  a.click();
}
function exportCSV(){
  const rows=[['Department','Practice Area','Dept Head','Sub-Department','Task','Role','Team','AI Capable','AI Priority','AI Status','Process Owner','Manager','Doers']];
  D.forEach(d=>{
    const dh=A['__hd__'+d.id]||'';
    d.subdepts.forEach(s=>{s.tasks.forEach(t=>{
      const st=A[gk(d.id,t.t,'st')]||'none';
      const stl=(SOPTS.find(o=>o.v===st)||{l:'Not started'}).l;
      const pr=t.ai?(t.p==='h'?'High':t.p==='m'?'Medium':'Low'):'';
      const rid=TASK_ROLE_OVERRIDE[t.t]||t.role||'';
      const doers=getDoers(d.id,t.t).join('; ');
      rows.push([d.name,TLBL[d.type],dh,s.name,t.t,roleName(rid),t.team||'',t.ai?'Yes':'No',pr,stl,
        A[gk(d.id,t.t,'o')]||'',A[gk(d.id,t.t,'m')]||'',doers]);
    });});
  });
  dlCSV(rows,'forever_task_map');
}
function exportRosterCSV(){
  const rows=[['Full Name','Title','Department','Email']];
  sortedRoster().forEach(p=>{rows.push([p.n,p.title||'',p.dept||'',p.email||'']);});
  dlCSV(rows,'people_roster');
}
function exportRolesCSV(){
  const rows=[['Role','Department','Task Count','People Assigned','Description','Tasks']];
  ROLES.forEach(r=>{
    const dept=D.find(d=>d.id===r.dept);const people=getRolePeople(r.id).join('; ');
    rows.push([r.name,dept?dept.name:r.dept,r.tasks.length,people,r.desc,r.tasks.join('; ')]);
  });
  dlCSV(rows,'roles_and_descriptions');
}
function toggleDLMenu(){document.getElementById('dl-menu').classList.toggle('open');}
function closeDLMenu(){document.getElementById('dl-menu').classList.remove('open');}
document.addEventListener('click',e=>{if(!e.target.closest('.dl-wrap'))closeDLMenu();});

// Initialize
load();rebuildDL();renderSidebar();
document.getElementById('search').addEventListener('input',e=>{srch=e.target.value.toLowerCase().trim();renderMain();});
document.getElementById('btn-cap').addEventListener('click',()=>{fCap=!fCap;fLive=false;fQueue=false;document.getElementById('btn-cap').classList.toggle('on',fCap);document.getElementById('btn-live').classList.remove('on-live');document.getElementById('btn-queue').classList.remove('on');renderMain();});
document.getElementById('btn-live').addEventListener('click',()=>{fLive=!fLive;fCap=false;fQueue=false;document.getElementById('btn-live').classList.toggle('on-live',fLive);document.getElementById('btn-cap').classList.remove('on');document.getElementById('btn-queue').classList.remove('on');renderMain();});
document.getElementById('btn-queue').addEventListener('click',()=>{fQueue=!fQueue;fCap=false;fLive=false;document.getElementById('btn-queue').classList.toggle('on',fQueue);document.getElementById('btn-cap').classList.remove('on');document.getElementById('btn-live').classList.remove('on-live');renderMain();});
document.getElementById('btn-save').addEventListener('click',doSave);
document.getElementById('btn-export').addEventListener('click',exportCSV);
document.getElementById('roster-search').addEventListener('input',e=>renderRoster(e.target.value));
document.getElementById('pv-select').addEventListener('change',e=>renderPersonView(e.target.value));
document.getElementById('person-modal').addEventListener('click',e=>{if(e.target===document.getElementById('person-modal'))closePersonModal();});
document.getElementById('role-person-modal-bg').addEventListener('click',e=>{if(e.target===document.getElementById('role-person-modal-bg'))closeRolePersonModal();});
