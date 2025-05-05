document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login-form");
    
    // Crear el pop-up dinámicamente
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
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault(); // Detener envío por defecto
  
      const formData = new FormData(form);
      const data = {
        email: formData.get("email"),
        contraseña: formData.get("contraseña"),
      };
  
      try {
        const res = await fetch("/api/login", {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        });
  
        const result = await res.json();
  
        // Limpiar cualquier mensaje previo
        popupText.innerHTML = "";
  
        if (res.ok && result.success) {
          // Si el inicio de sesión fue exitoso
          showPopup("✔️", "¡Inicio de sesión exitoso!", true);
          setTimeout(() => {
            window.location.href = "/perfil"; // Redirige a la página del perfil
          }, 2000);
        } else {
          // Si el inicio de sesión falla
          showPopup("❌", result.message || "Los datos introducidos no son correctos. Intenta de nuevo.", false);
        }
      } catch (error) {
        // En caso de error inesperado
        showPopup("❌", "Error al iniciar sesión. Intenta de nuevo más tarde.", false);
      }
    });
  
    function showPopup(icon, message, success) {
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
  