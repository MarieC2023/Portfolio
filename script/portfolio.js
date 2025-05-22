function createPortfolioFromJSON() {
  const container = document.querySelector("#portfolioCards");

  fetch("data/portfolio.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("project-card");
        card.innerHTML = `
          <img src="${item.image}" alt="${item.title}">
          <h3>${item.title}</h3>
         <button class="my-btn open-project-modal" data-id="${item.id}">
            En savoir plus
          </button>
        `;

        container.appendChild(card);
      });

      setupProjectModal(data);

    });
}


function setupProjectModal(data) {
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("projectModalTitle");
  const modalDetails = document.getElementById("projectModalDetails");
  const closeBtn = modal.querySelector(".close");

  document.querySelectorAll(".open-project-modal").forEach(button => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      const item = data.find(proj => proj.id === id);

      if (item) {
        modalTitle.textContent = item.title;
        modalDetails.innerHTML = ""; // Nettoyage

        // Résumé du projet
        if (item.summary) {
          const summarySection = document.createElement("div");
          summarySection.innerHTML = `<h4>Résumé du projet</h4><p>${item.summary}</p>`;
          modalDetails.appendChild(summarySection);
        }

        // Objectif
        if (item.objective) {
          const objectiveSection = document.createElement("div");
          objectiveSection.innerHTML = `<h4>Objectif</h4><p>${item.objective}</p>`;
          modalDetails.appendChild(objectiveSection);
        }

        // Travail réalisé
        if (item["work-done"] && Array.isArray(item["work-done"])) {
          const workDoneSection = document.createElement("div");
          workDoneSection.innerHTML = "<h4>Travail réalisé</h4><ul>" +
            item["work-done"].map(w => `<li>${w}</li>`).join("") + "</ul>";
          modalDetails.appendChild(workDoneSection);
        }

        // Lien GitHub
        if (item.lien_github) {
          const githubLink = document.createElement("div");
          githubLink.classList.add("downloads");
          githubLink.innerHTML = `<h4>Code source</h4><p><a href="${item.lien_github}" target="_blank" rel="noopener noreferrer">${item.lien_github}</a></p>`;
          modalDetails.appendChild(githubLink);
        }

        // Lien Démo
        if (item.lien_demo) {
          const demoLink = document.createElement("div");
          demoLink.classList.add("downloads");
          demoLink.innerHTML = `<h4>Démo</h4><p><a href="${item.lien_demo}" target="_blank" rel="noopener noreferrer">${item.lien_demo}</a></p>`;
          modalDetails.appendChild(demoLink);
        }

        // Livrables téléchargeables
        if (item.downloads) {
          const downloadSection = document.createElement("div");
          downloadSection.classList.add("downloads");
          downloadSection.innerHTML = "<h4>📄 Livrables à télécharger :</h4><ul>" +
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


createPortfolioFromJSON();
