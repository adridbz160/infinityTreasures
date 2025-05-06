document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(loginForm);
      const email = formData.get("email");
      const contraseña = formData.get("contraseña");

      const popup = document.createElement("div");
      popup.id = "popup";
      popup.className = "popup hidden";
      popup.innerHTML = `
        <span id="popup-icon">✔️</span>
        <span id="popup-text">Mensaje</span>
      `;
      document.body.appendChild(popup);

      const popupIcon = popup.querySelector("#popup-icon");
      const popupText = popup.querySelector("#popup-text");

      // Verificamos que popupIcon y popupText no sean null
      if (!popupIcon || !popupText) {
        console.error("Error: El pop-up no se pudo crear correctamente.");
        return;
      }

      try {
        const response = await fetch("/api/login", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          showPopup("✔️", "Inicio de sesión exitoso", true);
          setTimeout(() => {
            window.location.href = "/perfil";
          }, 3000);
        } else if (response.status === 401) {
          showPopup("❌", "Los datos introducidos no son correctos. Inténtalo de nuevo.", false);
        } else {
          showPopup("❌", "Ocurrió un error. Intenta más tarde.", false);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        showPopup("❌", "Error al conectar con el servidor.", false);
      }
    });
  }

  function showPopup(icon, message, success) {
    const popup = document.getElementById("popup");
    if (!popup) return;

    const popupIcon = popup.querySelector("#popup-icon");
    const popupText = popup.querySelector("#popup-text");

    // Verificamos que popupIcon y popupText no sean null
    if (!popupIcon || !popupText) {
      console.error("Error: No se pudo acceder a los elementos del pop-up.");
      return;
    }

    popupIcon.textContent = icon;
    popupText.textContent = message;
    popup.style.backgroundColor = success ? "#d4edda" : "#f8d7da";
    popup.style.borderColor = success ? "#28a745" : "#dc3545";
    popup.classList.remove("hidden");

    setTimeout(() => {
      popup.classList.add("hidden");
    }, 3000);
  }
});
