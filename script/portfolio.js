// Fonction pour créer la section portfolio

const createPortfolioFromJSON = () => {
  const container = document.querySelector("#portfolioCards");
  const filterContainer = document.querySelector("#portfolioFilters");

  fetch("data/portfolio.json")
    .then(response => response.json())
    .then(data => {

      // Étape 1 : extraction de toutes les catégories uniques
      const categories = new Set();
      data.forEach(item => {
        if (Array.isArray(item.categorie)) {
          item.categorie.forEach(cat => categories.add(cat));
        } else if (item.categorie) {
          categories.add(item.categorie);
        }
      });

      // Étape 2 : création des boutons de filtre
      const allCategories = ["tous", ...Array.from(categories)];
      allCategories.forEach(filter => {
        const button = document.createElement("button");
        button.textContent = filter.charAt(0).toUpperCase() + filter.slice(1);
        button.classList.add("filter-btn", "my-btn");
        button.dataset.filter = filter;
        filterContainer.appendChild(button);
      });

      // Étape 3 : fonction pour générer les cartes selon le filtre
      const renderCards = (filter = "tous") => {
        container.innerHTML = ""; 

        const filteredData = filter === "tous"
          ? data
          : data.filter(item => {
              if (Array.isArray(item.categorie)) {
                return item.categorie.includes(filter);
              } else {
                return item.categorie === filter;
              }
            });

        filteredData.forEach(item => {
          const card = document.createElement("div");
          card.classList.add("project-card");
          card.innerHTML = `
            <img src="${item.image}" alt="${item.alt}">
            <h3>${item.title}</h3>
            <button class="my-btn open-project-modal" data-id="${item.id}">
              En savoir plus
            </button>
          `;
          container.appendChild(card);
        });

        setupProjectModal(data); 
      };

      renderCards(); 

      // Étape 4 : gestion des clics sur les boutons
      document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const filter = btn.dataset.filter;
          renderCards(filter);
        });
      });
    });
};

// Fonction pour configurer la modale des projets

const setupProjectModal = (data) => {
  const modal = document.getElementById("projectModal");
  const modalDetails = document.getElementById("projectModalDetails");
  const closeBtn = modal.querySelector(".close");

  document.querySelectorAll(".open-project-modal").forEach(button => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      const item = data.find(proj => proj.id === id);

      if (item) {
        modalDetails.innerHTML = ""; 

        const title = document.createElement("h3");
        title.textContent = item.title;
        modalDetails.prepend(title); 

        if (item.summary) {
          const summarySection = document.createElement("div");
          summarySection.innerHTML = `<h4>Résumé du projet</h4><p>${item.summary}</p>`;
          modalDetails.appendChild(summarySection);
        }

        if (item.objective) {
          const objectiveSection = document.createElement("div");
          objectiveSection.innerHTML = `<h4>Objectif</h4><p>${item.objective}</p>`;
          modalDetails.appendChild(objectiveSection);
        }

        if (item["work-done"] && Array.isArray(item["work-done"])) {
          const workDoneSection = document.createElement("div");
          workDoneSection.innerHTML = "<h4>Travail réalisé</h4><ul>" +
            item["work-done"].map(w => `<li>${w}</li>`).join("") + "</ul>";
          modalDetails.appendChild(workDoneSection);
        }

        if (item.lien_github) {
          const githubLink = document.createElement("div");
          githubLink.classList.add("downloads");
          githubLink.innerHTML = `<h4>Code source</h4><p><a href="${item.lien_github}" target="_blank" rel="noopener noreferrer">${item.lien_github}</a></p>`;
          modalDetails.appendChild(githubLink);
        }

        if (item.lien_demo) {
          const demoLink = document.createElement("div");
          demoLink.classList.add("downloads");
          demoLink.innerHTML = `<h4>Démo</h4><p><a href="${item.lien_demo}" target="_blank" rel="noopener noreferrer">${item.lien_demo}</a></p>`;
          modalDetails.appendChild(demoLink);
        }

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

  window.addEventListener("click", event => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
};

createPortfolioFromJSON();
