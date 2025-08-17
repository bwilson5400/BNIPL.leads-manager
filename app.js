let leads = JSON.parse(localStorage.getItem("leads")||"[]");
let collapsed = false;
let lightMode = localStorage.getItem("theme")==="light";

function renderLeads() {
  const tbody=document.querySelector("#leadsTable tbody");
  tbody.innerHTML="";
  leads.forEach(l=>{
    const tr=document.createElement("tr");
    tr.innerHTML=`<td>${l.name}</td><td>${l.phone}</td><td>${l.email}</td>
      <td>${l.date}</td><td>${l.stage}</td><td>${l.follow}</td><td>${l.notes}</td>`;
    tbody.appendChild(tr);
  });
}

document.getElementById("addLead").onclick=()=>{
  const lead={
    name:document.getElementById("leadName").value,
    phone:document.getElementById("leadPhone").value,
    email:document.getElementById("leadEmail").value,
    date:document.getElementById("leadDate").value,
    stage:document.getElementById("leadStage").value,
    follow:document.getElementById("leadFollowUp").value,
    notes:document.getElementById("leadNotes").value
  };
  leads.push(lead);
  localStorage.setItem("leads",JSON.stringify(leads));
  renderLeads();
};

document.getElementById("collapseToggle").onclick=()=>{
  collapsed=!collapsed;
  document.getElementById("topSection").style.display=collapsed?"none":"grid";
};

function applyTheme(){ document.body.classList.toggle("light",lightMode); }
document.getElementById("themeToggle").onclick=()=>{
  lightMode=!lightMode;
  localStorage.setItem("theme",lightMode?"light":"dark");
  applyTheme();
};

function showModal(content){
  const modal=document.getElementById("modal");
  document.getElementById("modalContent").innerHTML=content+"<br><br><button onclick='closeModal()'>Close</button>";
  modal.classList.remove("hidden");
}
function closeModal(){ document.getElementById("modal").classList.add("hidden"); }

document.getElementById("summaryBtn").onclick=()=>{
  const today=new Date().toISOString().split("T")[0];
  const todays=leads.filter(l=>l.date===today||l.follow===today);
  showModal("<h3>📊 Daily Summary</h3>"+(todays.length?todays.map(l=>l.name+" - "+l.stage).join("<br>"):"No leads today."));
};

document.getElementById("metricsBtn").onclick=()=>{
  let counts={};
  leads.forEach(l=>counts[l.stage]=(counts[l.stage]||0)+1);
  let html="<h3>📈 Supervisor Metrics</h3>Total Leads: "+leads.length+"<br>";
  for(let stage in counts){ html+=stage+": "+counts[stage]+"<br>"; }
  showModal(html);
};

document.getElementById("assistantBtn").onclick=()=>{
  showModal("<h3>🤖 Assistant</h3>This app helps you manage wireless leads. Use Add Lead to track, Collapse Top to focus, Daily Summary for today, Metrics for pipeline stats.");
};

applyTheme();
renderLeads();
