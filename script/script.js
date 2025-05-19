// Function to add the "navbarDark" class to the navbar on scroll
function handleNavbarScroll() {
    const header = document.querySelector(".navbarScroll");
    window.onscroll = function () {
        const top = window.scrollY;
        if (top >= 100) {
            header.classList.add("navbarDark");
        } else {
            header.classList.remove("navbarDark");
        }
    };
}

// Function to handle navbar collapse on small devices after a click
function handleNavbarCollapse() {
    const navLinks = document.querySelectorAll(".nav-item");
    const menuToggle = document.getElementById("navbarSupportedContent");

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            new bootstrap.Collapse(menuToggle).toggle();
        });
    });
}

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



// Function to dynamically create HTML elements from the JSON file
function createSkillsFromJSON() {
    const container = document.querySelector("#skills .container");
    let row = document.createElement("div");
    row.classList.add("row");

    // Load the JSON file
    fetch("data/skills.json")
        .then((response) => response.json())
        .then((data) => {
            // Iterate through the JSON data and create HTML elements
            data.forEach((item, index) => {
                const card = document.createElement("div");
                card.classList.add("col-lg-4", "mt-4");
                card.innerHTML = `
                    <div class="card skillsText">
                        <div class="card-body">
                            <img src="./images/skills/${item.image}" />
                            <h3 class="card-title mt-3">${item.title}</h3>
                            <p class="card-text mt-3">${item.text}</p>
                        </div>
                    </div>
                `;

                // Append the card to the current row
                row.appendChild(card);

                // If the index is a multiple of 3 or it's the last element, create a new row
                if ((index + 1) % 3 === 0 || index === data.length - 1) {
                    container.appendChild(row);
                    row = document.createElement("div");
                    row.classList.add("row");
                }
            });
        });
}
// Function to dynamically create HTML elements from the JSON file
function createPortfolioFromJSON() {
    const container = document.querySelector("#portfolio .container");
    let row = document.createElement("div");
    row.classList.add("row");

    // Load the JSON file
    fetch("data/portfolio.json")
        .then((response) => response.json())
        .then((data) => {
            // Iterate through the JSON data and create HTML elements
            data.forEach((item, index) => {
                const card = document.createElement("div");
                card.classList.add("col-lg-4", "mt-4");
                card.innerHTML = `
                    <div class="card portfolioContent">
                    <img class="card-img-top" src="images/${item.image}" style="width:100%">
                    <div class="card-body">
                        <h3 class="card-title">${item.title}</h3>
                        <p class="card-text">${item.text}</p>
                        <div class="text-center">
                            <a href="${item.link}" class="btn btn-success">Lien</a>
                        </div>
                    </div>
                </div>
                `;

                // Append the card to the current row
                row.appendChild(card);

                // If the index is a multiple of 3 or it's the last element, create a new row
                if ((index + 1) % 3 === 0 || index === data.length - 1) {
                    container.appendChild(row);
                    row = document.createElement("div");
                    row.classList.add("row");
                }
            });
        });
}

// Call the functions to execute the code
handleNavbarScroll();
handleNavbarCollapse();
createExperienceTimeline();
createSkillsFromJSON();
createPortfolioFromJSON();
