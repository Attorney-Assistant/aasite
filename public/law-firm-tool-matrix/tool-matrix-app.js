/* Law Firm Tool Matrix — App */
(function(){
const LS_KEY='aa-toolmatrix-v2';
let mappings={},activeTab='grid',selectedTool=null,filterStatus='all',expandedAgents={};

function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function mk(s){return s.replace(/[^a-z0-9]/gi,'_').toLowerCase();}
function mapKey(tool,task){return mk(tool)+'||'+mk(task);}

/* persistence */
function load(){try{const d=JSON.parse(localStorage.getItem(LS_KEY));if(d)mappings=d.mappings||{};}catch(e){}}
function save(){try{localStorage.setItem(LS_KEY,JSON.stringify({mappings}));}catch(e){}showSaved();}
function showSaved(){const e=document.getElementById('saved-ind');if(e){e.style.opacity='1';setTimeout(()=>e.style.opacity='0',2000);}}

/* counts */
function mappedCount(){return Object.keys(mappings).length;}
function totalAgents(){return Object.values(AGENTS).reduce((n,cat)=>n+cat.agents.length,0);}
const ALL_TASKS=TASK_GROUPS.flatMap(g=>g.tasks);

/* init */
function init(){
  load();
  renderTabs();
  renderAll();
}

/* tabs */
function renderTabs(){
  const c=document.getElementById('tab-bar');
  c.innerHTML=TABS.map(t=>
    '<button class="tm-tab'+(activeTab===t.id?' active':'')+'" data-tab="'+t.id+'">'+t.icon+' '+t.label+'</button>'
  ).join('');
  c.querySelectorAll('.tm-tab').forEach(btn=>{
    btn.onclick=()=>{activeTab=btn.dataset.tab;renderTabs();renderAll();};
  });
}

function renderAll(){
  if(activeTab==='grid') renderGrid();
  else renderAgentTab(activeTab);
  updateStats();
}

function updateStats(){
  const el=document.getElementById('tm-stats');
  el.textContent=TOOLS.length+' tools \u00b7 '+ALL_TASKS.length+' tasks \u00b7 '+mappedCount()+' mapped \u00b7 '+totalAgents()+' AI agent ideas';
}

/* ========== GRID VIEW ========== */
function renderGrid(){
  const main=document.getElementById('tm-main');
  let h='';
  h+='<div class="tm-toolbar">';
  h+='<select id="tm-filter" class="tm-select">';
  h+='<option value="all">All Tools ('+TOOLS.length+')</option>';
  h+='<option value="active"'+(filterStatus==='active'?' selected':'')+'>Active</option>';
  h+='<option value="future"'+(filterStatus==='future'?' selected':'')+'>Future / Planned</option>';
  h+='<option value="rolling-off"'+(filterStatus==='rolling-off'?' selected':'')+'>Rolling Off</option>';
  h+='<option value="expiring"'+(filterStatus==='expiring'?' selected':'')+'>Expiring Soon</option>';
  h+='</select>';
  h+='<button class="tm-btn-add" id="btn-add-tool">+ Add Tool</button>';
  h+='<span class="tm-hint">Click tool name to edit \u00b7 Click cells to map capabilities</span>';
  h+='</div>';

  const filtered=filterStatus==='all'?TOOLS:TOOLS.filter(t=>t.status===filterStatus);
  h+='<div class="tm-table-wrap"><table class="tm-table"><thead>';
  h+='<tr><th class="tm-th-tool">TOOL</th>';
  TASK_GROUPS.forEach(g=>{h+='<th colspan="'+g.tasks.length+'" class="tm-th-group">'+esc(g.label)+'</th>';});
  h+='</tr><tr><th class="tm-th-tool"></th>';
  ALL_TASKS.forEach(t=>{h+='<th class="tm-th-task"><div class="tm-task-label">'+esc(t)+'</div></th>';});
  h+='</tr></thead><tbody>';

  filtered.forEach((tool,i)=>{
    const sm=STATUS_META[tool.status]||STATUS_META.active;
    const bg=i%2===0?'#fff':'#f8fafc';
    h+='<tr><td class="tm-td-tool" style="background:'+bg+'" data-idx="'+TOOLS.indexOf(tool)+'">';
    h+='<div class="tm-tool-row"><span class="tm-tool-name">'+esc(tool.name)+'</span>';
    h+='<span class="tm-status-badge" style="background:'+sm.bg+';color:'+sm.color+'">'+sm.label+'</span></div>';
    if(tool.status==='expiring'&&tool.expires) h+='<div class="tm-exp-warn">\u26a0 Exp: '+esc(tool.expires)+'</div>';
    h+='</td>';
    ALL_TASKS.forEach(task=>{
      const key=mapKey(tool.name,task);
      const on=mappings[key];
      h+='<td class="tm-td-cell'+(on?' mapped':'')+'" style="background:'+(on?'#e0edff':bg)+'" data-tool="'+esc(tool.name)+'" data-task="'+esc(task)+'">';
      h+='<button class="tm-cell-btn">'+(on?'\u2714':'')+'</button></td>';
    });
    h+='</tr>';
  });
  h+='</tbody></table></div>';

  // sidebar
  h+='<div class="tm-grid-sidebar" id="tm-sidebar">';
  if(selectedTool){
    const t=selectedTool,sm=STATUS_META[t.status]||STATUS_META.active;
    const mapped=ALL_TASKS.filter(task=>mappings[mapKey(t.name,task)]);
    h+='<div class="tm-sb-head"><div class="tm-sb-title">'+esc(t.name)+'</div><button class="tm-sb-edit" id="btn-edit-tool">Edit</button></div>';
    h+='<span class="tm-status-badge" style="background:'+sm.bg+';color:'+sm.color+'">'+sm.label+'</span>';
    if(t.expires) h+='<div class="tm-exp-warn" style="margin-top:6px">\u26a0 Expires: '+esc(t.expires)+'</div>';
    h+='<div class="tm-sb-desc">'+esc(t.description)+'</div>';
    h+='<div class="tm-sb-section"><div class="tm-sb-section-title">Mapped Capabilities ('+mapped.length+')</div>';
    if(mapped.length){h+='<ul class="tm-sb-list">';mapped.forEach(task=>{h+='<li>'+esc(task)+'</li>';});h+='</ul>';}
    else h+='<div class="tm-sb-none">None yet \u2014 click cells in the grid.</div>';
    h+='</div><button class="tm-sb-close" id="btn-close-sb">Close</button>';
  } else {
    h+='<div class="tm-sb-empty">Click a tool name to see details</div>';
  }
  h+='</div>';

  main.innerHTML=h;

  // events
  document.getElementById('tm-filter').onchange=function(){filterStatus=this.value;renderAll();};
  document.getElementById('btn-add-tool').onclick=addTool;
  main.querySelectorAll('.tm-td-cell').forEach(td=>{
    td.onclick=()=>{toggleMapping(td.dataset.tool,td.dataset.task);};
  });
  main.querySelectorAll('.tm-td-tool').forEach(td=>{
    td.onclick=()=>{selectedTool=TOOLS[parseInt(td.dataset.idx)];renderAll();};
  });
  const closeBtn=document.getElementById('btn-close-sb');
  if(closeBtn) closeBtn.onclick=()=>{selectedTool=null;renderAll();};
  const editBtn=document.getElementById('btn-edit-tool');
  if(editBtn) editBtn.onclick=()=>editTool(selectedTool);
}

function toggleMapping(tool,task){
  const key=mapKey(tool,task);
  if(mappings[key]) delete mappings[key]; else mappings[key]=true;
  save();renderAll();
}

/* ========== AGENT TAB VIEW ========== */
function renderAgentTab(tabId){
  const main=document.getElementById('tm-main');
  const cat=AGENTS[tabId];
  if(!cat){main.innerHTML='<div class="tm-empty">No agent data for this category yet.</div>';return;}

  const tab=TABS.find(t=>t.id===tabId);
  const icon=tab?tab.icon:'';
  const agents=cat.agents;
  const highCount=agents.filter(a=>a.priority==='high').length;
  const medCount=agents.filter(a=>a.priority==='medium').length;
  const lowCount=agents.filter(a=>a.priority==='low').length;

  let h='<div class="ag-view"><div class="ag-header">';
  h+='<h2 class="ag-title">'+icon+' '+esc(cat.title)+'</h2>';
  h+='<p class="ag-desc">'+esc(cat.desc)+'</p>';

  // priority filter
  h+='<div class="ag-filters"><span class="ag-filter-label">Filter:</span>';
  const curFilter=window._agFilter||'all';
  ['all','high','medium','low'].forEach(f=>{
    const cls=curFilter===f?' active':'';
    const dot=f==='high'?'\ud83d\udd34':f==='medium'?'\ud83d\udfe1':f==='low'?'\ud83d\udfe2':'';
    h+='<button class="ag-filter-btn'+cls+'" data-f="'+f+'">'+(f==='all'?'All':dot+' '+f.charAt(0).toUpperCase()+f.slice(1))+'</button>';
  });
  h+='</div>';
  h+='<div class="ag-counts"><span>'+highCount+' <em>High priority</em></span><span>'+medCount+' <em>Medium priority</em></span><span>'+lowCount+' <em>Low priority</em></span></div>';
  h+='</div>';

  // cards
  const filtered=curFilter==='all'?agents:agents.filter(a=>a.priority===curFilter);
  h+='<div class="ag-grid">';
  filtered.forEach((a,idx)=>{
    const priClass=a.priority==='high'?'pri-high':a.priority==='medium'?'pri-med':'pri-low';
    const priDot=a.priority==='high'?'\ud83d\udd34':a.priority==='medium'?'\ud83d\udfe1':'\ud83d\udfe2';
    const expKey=tabId+'_'+idx;
    const isExpanded=expandedAgents[expKey];
    h+='<div class="ag-card">';
    h+='<div class="ag-card-top"><div class="ag-card-name">'+esc(a.name)+'</div><div class="ag-card-meta"><span class="ag-pri '+priClass+'">'+priDot+' '+a.priority.charAt(0).toUpperCase()+a.priority.slice(1)+'</span><span class="ag-complexity">'+esc(a.complexity)+'</span></div></div>';
    h+='<p class="ag-card-desc">'+esc(a.desc)+'</p>';
    h+='<button class="ag-toggle" data-key="'+expKey+'">\u25bc see impact & tools</button>';
    if(isExpanded){
      h+='<div class="ag-expand">';
      h+='<div class="ag-impact"><strong>Impact:</strong> '+esc(a.impact)+'</div>';
      h+='<div class="ag-tools-label">Powered by:</div><div class="ag-tools-list">';
      a.tools.forEach(tn=>{
        const tool=TOOLS.find(t=>t.name===tn);
        const sm=tool?STATUS_META[tool.status]:STATUS_META.active;
        h+='<span class="ag-tool-chip" style="background:'+sm.bg+';color:'+sm.color+'">'+esc(tn)+'</span>';
      });
      h+='</div></div>';
    }
    h+='</div>';
  });
  h+='</div></div>';
  main.innerHTML=h;

  // events
  main.querySelectorAll('.ag-filter-btn').forEach(btn=>{
    btn.onclick=()=>{window._agFilter=btn.dataset.f;renderAll();};
  });
  main.querySelectorAll('.ag-toggle').forEach(btn=>{
    btn.onclick=()=>{const k=btn.dataset.key;expandedAgents[k]=!expandedAgents[k];renderAll();};
  });
}

/* ========== EDIT FLYOUT ========== */
let editingTool=null,isNewTool=false;

function addTool(){
  const t={name:'',status:'active',description:'',cost:'',expires:''};
  TOOLS.push(t);
  editingTool=t;isNewTool=true;
  showEditFlyout();
}

function editTool(t){
  editingTool=t;isNewTool=false;
  showEditFlyout();
}

function showEditFlyout(){
  let overlay=document.getElementById('edit-overlay');
  if(!overlay){overlay=document.createElement('div');overlay.id='edit-overlay';document.body.appendChild(overlay);}
  overlay.className='ef-overlay open';
  overlay.onclick=function(e){if(e.target===overlay)closeEditFlyout();};

  let panel=document.getElementById('edit-panel');
  if(!panel){panel=document.createElement('div');panel.id='edit-panel';document.body.appendChild(panel);}
  panel.className='ef-panel open';

  const t=editingTool;
  panel.innerHTML='<div class="ef-icon">\u270f\ufe0f '+esc(t.name||'New Tool')+'</div>'
    +'<div class="ef-field"><label>Tool Name</label><input type="text" id="ef-name" value="'+esc(t.name)+'" placeholder="e.g. Litify"></div>'
    +'<div class="ef-field"><label>Monthly Cost</label><input type="text" id="ef-cost" value="'+esc(t.cost||'')+'" placeholder="e.g. $299/mo"></div>'
    +'<div class="ef-field"><label>Contract Expiration</label><input type="text" id="ef-expires" value="'+esc(t.expires||'')+'" placeholder="e.g. Sep 2025"></div>'
    +'<div class="ef-field"><label>Status</label><select id="ef-status">'
    +Object.entries(STATUS_META).map(([k,v])=>'<option value="'+k+'"'+(t.status===k?' selected':'')+'>'+v.label+'</option>').join('')
    +'</select></div>'
    +'<div class="ef-field"><label>Notes</label><textarea id="ef-notes" rows="3" placeholder="What does this tool do?">'+esc(t.description||'')+'</textarea></div>'
    +'<div class="ef-actions"><button class="ef-save" id="ef-save">Save</button><button class="ef-del" id="ef-del">Del</button><button class="ef-close" id="ef-close">\u00d7</button></div>';

  document.getElementById('ef-save').onclick=saveEditFlyout;
  document.getElementById('ef-del').onclick=deleteFromFlyout;
  document.getElementById('ef-close').onclick=closeEditFlyout;
  document.getElementById('ef-name').focus();
}

function saveEditFlyout(){
  const t=editingTool;
  const name=document.getElementById('ef-name').value.trim();
  if(!name){if(isNewTool){TOOLS.splice(TOOLS.indexOf(t),1);}closeEditFlyout();return;}
  t.name=name;
  t.cost=document.getElementById('ef-cost').value.trim();
  t.expires=document.getElementById('ef-expires').value.trim();
  t.status=document.getElementById('ef-status').value;
  t.description=document.getElementById('ef-notes').value.trim();
  selectedTool=t;
  save();closeEditFlyout();renderAll();
}

function deleteFromFlyout(){
  if(!confirm('Delete "'+editingTool.name+'"?'))return;
  const idx=TOOLS.indexOf(editingTool);
  if(idx>-1)TOOLS.splice(idx,1);
  if(selectedTool===editingTool)selectedTool=null;
  save();closeEditFlyout();renderAll();
}

function closeEditFlyout(){
  if(isNewTool&&editingTool&&!editingTool.name){
    const idx=TOOLS.indexOf(editingTool);if(idx>-1)TOOLS.splice(idx,1);
  }
  editingTool=null;isNewTool=false;
  const overlay=document.getElementById('edit-overlay');if(overlay)overlay.className='ef-overlay';
  const panel=document.getElementById('edit-panel');if(panel)panel.className='ef-panel';
}

/* ========== EXPORTS ========== */
window.exportCSV=function(){
  let csv='Tool,Status,Description,'+ALL_TASKS.map(t=>'"'+t.replace(/"/g,'""')+'"').join(',')+'\n';
  TOOLS.forEach(t=>{
    const sm=STATUS_META[t.status];
    csv+='"'+t.name.replace(/"/g,'""')+'","'+sm.label+'","'+(t.description||'').replace(/"/g,'""')+'"';
    ALL_TASKS.forEach(task=>{csv+=','+(mappings[mapKey(t.name,task)]?'YES':'');});
    csv+='\n';
  });
  dl(csv,'law-firm-tool-matrix.csv','text/csv');
};

window.exportAgentsCSV=function(){
  let csv='Category,Agent Name,Priority,Complexity,Description,Impact,Tools\n';
  Object.values(AGENTS).forEach(cat=>{
    cat.agents.forEach(a=>{
      csv+='"'+cat.title+'","'+a.name.replace(/"/g,'""')+'","'+a.priority+'","'+a.complexity+'","'+a.desc.replace(/"/g,'""')+'","'+a.impact.replace(/"/g,'""')+'","'+a.tools.join(', ')+'"\n';
    });
  });
  dl(csv,'ai-agent-ideas.csv','text/csv');
};

window.exportToGoogleSheets=function(){
  let tsv='Tool\tStatus\tDescription\t'+ALL_TASKS.join('\t')+'\n';
  TOOLS.forEach(t=>{
    const sm=STATUS_META[t.status];
    tsv+=t.name+'\t'+sm.label+'\t'+(t.description||'');
    ALL_TASKS.forEach(task=>{tsv+='\t'+(mappings[mapKey(t.name,task)]?'YES':'');});
    tsv+='\n';
  });
  tsv+='\n\nAI AGENT IDEAS\nCategory\tAgent\tPriority\tComplexity\tDescription\tImpact\tTools\n';
  Object.values(AGENTS).forEach(cat=>{
    cat.agents.forEach(a=>{
      tsv+=cat.title+'\t'+a.name+'\t'+a.priority+'\t'+a.complexity+'\t'+a.desc+'\t'+a.impact+'\t'+a.tools.join(', ')+'\n';
    });
  });
  navigator.clipboard.writeText(tsv).then(()=>{
    if(confirm('Matrix + agent ideas copied to clipboard!\n\nClick OK to open Google Sheets.\nPaste into cell A1.'))
      window.open('https://sheets.new','_blank');
  }).catch(()=>{
    dl(tsv,'law-firm-tool-matrix.tsv','text/tab-separated-values');
    alert('Downloaded as .tsv \u2014 open in Google Sheets via File > Import.');
  });
};

function dl(content,filename,type){
  const blob=new Blob([content],{type});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);a.download=filename;a.click();
}

window.toggleDLMenu=function(){document.getElementById('dl-menu').classList.toggle('open');};
window.closeDLMenu=function(){document.getElementById('dl-menu').classList.remove('open');};

document.addEventListener('click',function(e){
  const wrap=document.querySelector('.dl-wrap');
  if(wrap&&!wrap.contains(e.target))closeDLMenu();
});

document.addEventListener('DOMContentLoaded',init);
})();
