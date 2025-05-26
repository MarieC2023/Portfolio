async function loadSkills() {
  try {
    const response = await fetch('data/skills.json');
    const skills = await response.json();

    const track = document.getElementById('skillsTrack');

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

loadSkills();

