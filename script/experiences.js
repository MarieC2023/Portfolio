// Fonctions pour l'expérience professionnelle
function createExperienceTimeline() {
  const container = document.querySelector(".timeline");
  const softSkillsContainer = document.querySelector(".soft-skills-container");

  fetch("data/expe.json")
    .then(response => response.json())
    .then(data => {
      data.forEach((item, index) => {
        if (item.id === "exp6") {
          item.summary.forEach(skill => {
            const card = document.createElement("div");
            card.classList.add("skill-card");
            card.innerHTML = `
              <h4>${skill.title}</h4>
              <p>${skill.description}</p>
            `;
            softSkillsContainer.appendChild(card);
          });
        } else {
          const side = index % 2 === 0 ? "left" : "right";

          const timelineItem = document.createElement("div");
          timelineItem.classList.add("timeline-item", side);

          timelineItem.innerHTML = `
            <div class="timeline-content">
              <h3>${item.title}</h3>
              <h4>${item.company} - ${item.location}</h4>
              <p><em>${item.period}</em></p>
              <button class="open-modal btn-container my-btn" data-id="${item.id}">En savoir plus</button>
            </div>
          `;

          container.appendChild(timelineItem);
        }
      });

      setupModal(data);
    });
}



function setupModal(data) {
  const modal = document.getElementById("experienceModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalCompany = document.getElementById("modalCompany");
  const modalDetails = document.getElementById("modalDetails");
  const closeBtn = modal.querySelector(".close");

  document.querySelectorAll(".open-modal").forEach(button => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      const item = data.find(exp => exp.id === id);

      if (item) {
        modalTitle.textContent = item.title;
        modalCompany.textContent = `${item.company} – ${item.location} (${item.period})`;

        // Nettoyer le contenu
        modalDetails.innerHTML = "";

        // Missions
        if (item.missions) {
          const missionSection = document.createElement("div");
          missionSection.innerHTML = "<h5>Missions</h5><ul>" +
            item.missions.map(m => `<li>${m}</li>`).join("") + "</ul>";
          modalDetails.appendChild(missionSection);
        }

        // Outils
        if (item.tools) {
          const toolSection = document.createElement("div");
          toolSection.innerHTML = "<h5>Outils</h5><ul>" +
            item.tools.map(t => `<li>${t}</li>`).join("") + "</ul>";
          modalDetails.appendChild(toolSection);
        }

        // Compétences développées
        if (item.skills) {
          const skillsSection = document.createElement("div");
          skillsSection.innerHTML = "<h5>Compétences développées</h5><ul>" +
            item.skills.map(s => `<li>${s}</li>`).join("") + "</ul>";
          modalDetails.appendChild(skillsSection);
        }

        // Compétences transférables
        if (item.linkToTesting) {
          const testSection = document.createElement("div");
          testSection.innerHTML = "<h5 class='accent-title'>Transférables au métier de Testeur</h5><ul>" +
            item.linkToTesting.map(t => `<li>${t}</li>`).join("") + "</ul>";
          modalDetails.appendChild(testSection);
        }

        // Fichiers téléchargeables
        if (item.downloads) {
          const downloadSection = document.createElement("div");
          downloadSection.classList.add("downloads");
          downloadSection.innerHTML = "<h5>📄 Journaux à télécharger :</h5><ul>" +
            item.downloads.map(d => `<li><a href="${d.file}" download target="_blank" rel="noopener noreferrer">${d.label}</a></li>`).join("") +
            "</ul>";
          modalDetails.appendChild(downloadSection);
        }

        modal.style.display = "flex";
      }
    });
  });

  closeBtn.onclick = () => {
    modal.style.display = "none";
  };

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

}


createExperienceTimeline();