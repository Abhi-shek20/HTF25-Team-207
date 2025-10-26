let skills = [];
let projects = [];

document.addEventListener("DOMContentLoaded", () => {
  renderSkills();
  renderProjects();
  updatePreview();
});

// Add skill
function addSkill() {
  const skillInput = document.getElementById("skill-input");
  const skill = skillInput.value.trim();
  if (skill) {
    skills.push(skill);
    skillInput.value = "";
    renderSkills();
    updatePreview();
  }
}
document.getElementById("skill-input").addEventListener("keypress", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    addSkill();
  }
});
function removeSkill(idx) {
  skills.splice(idx, 1);
  renderSkills();
  updatePreview();
}
function renderSkills() {
  const list = document.getElementById("skills-list");
  list.innerHTML = "";
  skills.forEach((skill, idx) => {
    const chip = document.createElement("span");
    chip.className = "skill-chip";
    chip.textContent = skill;
    const btn = document.createElement("button");
    btn.className = "remove-btn";
    btn.textContent = "x";
    btn.onclick = () => removeSkill(idx);
    chip.appendChild(btn);
    list.appendChild(chip);
  });
}

// Add project
function addProject() {
  const pt = document.getElementById("project-title");
  const pl = document.getElementById("project-link");
  const pd = document.getElementById("project-desc");
  if (pt.value.trim() === "") return;
  projects.push({ title: pt.value.trim(), link: pl.value.trim(), desc: pd.value.trim() });
  pt.value = ""; pl.value = ""; pd.value = "";
  renderProjects();
  updatePreview();
}
function removeProject(idx) {
  projects.splice(idx, 1);
  renderProjects();
  updatePreview();
}
function renderProjects() {
  const list = document.getElementById("projects-list");
  list.innerHTML = "";
  projects.forEach((proj, idx) => {
    const div = document.createElement("div");
    div.className = "project-block";
    div.innerHTML = `<strong>${escapeHtml(proj.title)}</strong>
       ${proj.link ? `<br><a href="${escapeAttr(proj.link)}" target="_blank">${proj.link}</a>` : ''}
       <br><span>${escapeHtml(proj.desc)}</span>`;
    const btn = document.createElement("button");
    btn.className = "remove-btn";
    btn.textContent = "Remove";
    btn.onclick = () => removeProject(idx);
    div.appendChild(btn);
    list.appendChild(div);
  });
}

document.getElementById("portfolio-form").addEventListener("input", updatePreview);

function updatePreview() {
  const name = escapeHtml(document.getElementById("name").value);
  const title = escapeHtml(document.getElementById("title").value);
  const location = escapeHtml(document.getElementById("location").value);
  const email = escapeHtml(document.getElementById("email").value);
  const bio = escapeHtml(document.getElementById("bio").value);
  const avatar = document.getElementById("avatar").value;
  const github = escapeAttr(document.getElementById("github").value);
  const linkedin = escapeAttr(document.getElementById("linkedin").value);
  const twitter = escapeAttr(document.getElementById("twitter").value);

  const preview = document.getElementById("preview");
  preview.innerHTML = `
    <div style="text-align:center;">
      ${avatar ? `<img src="${avatar}" class="avatar-preview" alt="Avatar"/>` : ""}
      <h2>${name}</h2>
      <div style="color:#10b981;font-weight:500;">${title}</div>
      <div style="color:#2563eb;margin-top:5px;">${location}${location && email ? " | " : ""}<span>${email}</span></div>
    </div>
    <hr>
    <div><strong>About:</strong><div style="font-style:italic;color:#64748b;">${bio}</div></div>
    <hr>
    <div><strong>Skills:</strong><br>${skills.map(s => `<span class="skill-chip">${escapeHtml(s)}</span>`).join(" ")}</div>
    <hr>
    <div><strong>Projects:</strong><br>${projects.map(p =>
      `<div class="project-block"><strong>${escapeHtml(p.title)}</strong>
      ${p.link ? `<br><a href="${escapeAttr(p.link)}" target="_blank">${escapeAttr(p.link)}</a>` : ""}
      <br><span>${escapeHtml(p.desc)}</span></div>`).join("")}</div>
    <hr>
    <div><strong>Contact:</strong><br>
      ${github ? `GitHub: <a href="${github}" target="_blank">${github}</a><br>` : ""}
      ${linkedin ? `LinkedIn: <a href="${linkedin}" target="_blank">${linkedin}</a><br>` : ""}
      ${twitter ? `Twitter: <a href="${twitter}" target="_blank">${twitter}</a>` : ""}
    </div>`;
}

// Download PDF
function downloadPortfolio() {
  const previewElement = document.getElementById("preview");
  const options = {
    margin: [10, 10],
    filename: "My_Portfolio.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
  };
  html2pdf().from(previewElement).set(options).save();
}

// Escape utilities
function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function escapeAttr(str) {
  if (!str) return "";
  return str.replace(/"/g, "&quot;");
}

// Toggle dark mode
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}
