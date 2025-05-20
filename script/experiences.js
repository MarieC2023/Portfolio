// Fonctions pour l'expérience professionnelle

function createExperienceTimeline() {
  const container = document.querySelector(".timeline");

  fetch("data/expe.json")
    .then(response => response.json())
    .then(data => {
      data.forEach((item, index) => {
        const side = index % 2 === 0 ? "left" : "right";

        const timelineItem = document.createElement("div");
        timelineItem.classList.add("timeline-item", side);

        if (item.id !== "exp6") {
          // Expériences classiques
          timelineItem.innerHTML = `
            <div class="timeline-content">
              <h3>${item.title}</h3>
              <h4>${item.company} - ${item.location}</h4>
              <p><em>${item.period}</em></p>
              <button id="btn" class="open-modal btn-container" data-id="${item.id}">En savoir plus</button>
            </div>
          `;
        } else {
          // Synthèse des soft skills (exp6)
          timelineItem.innerHTML = `
            <div class="timeline-content">
              <h4>${item.title}</h4>
              <ul>
                ${item.summary.map(point => `<li>${point}</li>`).join("")}
              </ul>
            </div>
          `;
        }

        container.appendChild(timelineItem);
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

        if (item.missions) {
          const missionSection = document.createElement("div");
          missionSection.innerHTML = "<h5>Missions</h5><ul>" +
            item.missions.map(m => `<li>${m}</li>`).join("") + "</ul>";
          modalDetails.appendChild(missionSection);
        }

        if (item.tools) {
          const toolSection = document.createElement("div");
          toolSection.innerHTML = "<h5>Outils</h5><ul>" +
            item.tools.map(t => `<li>${t}</li>`).join("") + "</ul>";
          modalDetails.appendChild(toolSection);
        }

        if (item.skills) {
          const skillsSection = document.createElement("div");
          skillsSection.innerHTML = "<h5>Compétences développées</h5><ul>" +
            item.skills.map(s => `<li>${s}</li>`).join("") + "</ul>";
          modalDetails.appendChild(skillsSection);
        }

        if (item.linkToTesting) {
          const testSection = document.createElement("div");
          testSection.innerHTML = "<h5>Transférables au métier de Testeur</h5><ul>" +
            item.linkToTesting.map(t => `<li>${t}</li>`).join("") + "</ul>";
          modalDetails.appendChild(testSection);
        }

        modal.style.display = "flex";
      }
    });
  });

  closeBtn.onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
}

createExperienceTimeline();