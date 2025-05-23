function createSkillsFromJSON() {
  const container = document.querySelector("#skills .container");

  // Créer un conteneur flex identique à .projects-container
  const skillsContainer = document.createElement("div");
  skillsContainer.classList.add("projects-container");

  fetch("data/skills.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("project-card");
        card.innerHTML = `
          <img src="./images/skills/${item.image}" alt="${item.title}">
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        `;

        skillsContainer.appendChild(card);
      });

      container.appendChild(skillsContainer);
    });
}

createSkillsFromJSON();
