function createPortfolioFromJSON() {
  const container = document.querySelector("#portfolioCards");

  fetch("data/portfolio.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("project-card");
        card.innerHTML = `
  <img src="${item.image}" alt="${item.titre}">
  <h5>${item.titre}</h5>
  <button id="btn" class="btn btn-primary open-portfolio-modal" data-id="${item.id}">
    En savoir plus
  </button>
`;

        container.appendChild(card);
      });

      setupPortfolioModal(data);
    });
}

function setupPortfolioModal(data) {
  const modal = document.getElementById("portfolioModal");
  const modalTitle = document.getElementById("portfolioModalTitle");
  const modalImage = document.getElementById("portfolioModalImage");
  const modalText = document.getElementById("portfolioModalText");
  const modalLinks = document.getElementById("portfolioModalLinks");
  const closeBtn = modal.querySelector(".close");

  document.querySelectorAll(".open-portfolio-modal").forEach((button) => {
    button.addEventListener("click", () => {
      const id = parseInt(button.dataset.id);
      const item = data.find((p) => p.id === id);

      if (item) {
        modalTitle.textContent = item.titre;
        modalImage.src = item.image;
        modalImage.alt = item.titre;
        modalText.innerHTML = item.texte.replace(/\n/g, "<br>");

        modalLinks.innerHTML = "";

        if (item.documents && item.documents.length > 0) {
          item.documents.forEach((doc, i) => {
            const docLink = document.createElement("a");
            docLink.href = doc;
            docLink.textContent = `Télécharger document ${i + 1}`;
            docLink.classList.add("btn", "btn-outline-secondary");
            docLink.target = "_blank";
            docLink.rel = "noopener noreferrer";
            docLink.download = "";
            modalLinks.appendChild(docLink);
          });
        }

        if (item.lien_github) {
          const githubLink = document.createElement("a");
          githubLink.href = item.lien_github;
          githubLink.innerHTML = `<img src="images/logo/github-logo.png" alt="GitHub">`;
          githubLink.target = "_blank";
          githubLink.rel = "noopener noreferrer";
          modalLinks.appendChild(githubLink);
        }

        if (item.lien_demo) {
          const demoBtn = document.createElement("a");
          demoBtn.href = item.lien_demo;
          demoBtn.textContent = "Démo";
          demoBtn.classList.add("btn", "btn-success");
          demoBtn.target = "_blank";
          demoBtn.rel = "noopener noreferrer";
          modalLinks.appendChild(demoBtn);
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

createPortfolioFromJSON();