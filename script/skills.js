// function createSkillsFromJSON() {
//   const container = document.querySelector("#skills .container");

//   // Créer un conteneur flex identique à .projects-container
//   const skillsContainer = document.createElement("div");
//   skillsContainer.classList.add("projects-container");

//   fetch("data/skills.json")
//     .then((response) => response.json())
//     .then((data) => {
//       data.forEach((item) => {
//         const card = document.createElement("div");
//         card.classList.add("project-card");
//         card.innerHTML = `
//           <img src="./images/skills/${item.image}" alt="${item.title}">
//           <h3>${item.title}</h3>
//           <p>${item.text}</p>
//         `;

//         skillsContainer.appendChild(card);
//       });

//       container.appendChild(skillsContainer);
//     });
// }

// createSkillsFromJSON();

  async function loadSkills() {
    try {
      const response = await fetch('data/skills.json');
      const skills = await response.json();

      const track = document.getElementById('skillsTrack');

      // Fonction pour créer une skill card
      const createSkillCard = (skill) => {
        const card = document.createElement('div');
        card.className = 'skill-card';

        const img = document.createElement('img');
        img.src = skill.image;
        img.alt = skill.title;
        img.title = skill.title;

        const span = document.createElement('span');
        span.textContent = skill.title;

        card.appendChild(img);
        card.appendChild(span);

        return card;
      };

      // Générer une fois la liste
      skills.forEach(skill => {
        const card = createSkillCard(skill);
        track.appendChild(card);
      });

      // Dupliquer pour effet infini
      skills.forEach(skill => {
        const card = createSkillCard(skill);
        track.appendChild(card);
      });

    } catch (error) {
      console.error('Erreur lors du chargement des compétences :', error);
    }
  }

  // Lancer au chargement
  loadSkills();

