document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const messageBox = document.getElementById("form-message");
  const submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Détection honeypot (anti-bot)
    const honeypot = form.querySelector("#website");
    if (honeypot.value !== "") {
      messageBox.textContent = "Formulaire bloqué.";
      messageBox.className = "form-message form-message--error";
      return;
    }

    const inputs = form.querySelectorAll("input[type=text], input[type=email], textarea");
    const scriptRegex = /<\s*script\b[^>]*>(.*?)<\s*\/\s*script>/gi;
    let hasMaliciousContent = false;

    inputs.forEach((input) => {
      if (scriptRegex.test(input.value)) {
        hasMaliciousContent = true;
      }
    });

    if (hasMaliciousContent) {
      messageBox.textContent = "Le contenu du formulaire contient du code interdit.";
      messageBox.className = "form-message form-message--error";
      return;
    }

    const formData = new FormData(form);

    try {
      submitButton.disabled = true;
      form.setAttribute("aria-busy", "true");

      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        messageBox.textContent = "Votre message a bien été envoyé !";
        messageBox.className = "form-message form-message--success";
        form.reset();
      } else {
        messageBox.textContent = "Une erreur est survenue. Veuillez réessayer.";
        messageBox.className = "form-message form-message--error";
      }
    } catch (error) {
      messageBox.textContent = "Erreur réseau. Vérifiez votre connexion.";
      messageBox.className = "form-message form-message--error";
    } finally {
      submitButton.disabled = false;
      form.setAttribute("aria-busy", "false");

      setTimeout(() => {
        messageBox.textContent = "";
        messageBox.className = "form-message";
      }, 5000);
    }
  });
});