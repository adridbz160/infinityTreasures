document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login-form");
  
    // Crear el pop-up dinámicamente
    const popup = document.createElement("div");
    popup.id = "popup";
    popup.className = "popup hidden";
    popup.innerHTML = `
      <span id="popup-icon" class="popup-icon">✔️</span>
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
          popup.classList.remove("error"); // Eliminar la clase de error
          popup.classList.add("success");  // Añadir la clase de éxito
          popupIcon.textContent = "✔️";   // Icono de éxito
          showPopup("¡Inicio de sesión exitoso!");
          
          setTimeout(() => {
            window.location.href = "/perfil"; // Redirige a la página del perfil
          }, 2000);
        } else {
          // Si el inicio de sesión falla
          popup.classList.remove("success"); // Eliminar la clase de éxito
          popup.classList.add("error");      // Añadir la clase de error
          popupIcon.textContent = "❌";       // Icono de error
          showPopup(result.message || "Los datos introducidos no son correctos. Intenta de nuevo.");
        }
      } catch (error) {
        // En caso de error inesperado
        popup.classList.remove("success"); // Eliminar la clase de éxito
        popup.classList.add("error");      // Añadir la clase de error
        popupIcon.textContent = "❌";       // Icono de error
        showPopup("Error al iniciar sesión. Intenta de nuevo más tarde.");
      }
    });
  
    function showPopup(message) {
      popupText.textContent = message;
      popup.classList.remove("hidden"); // Mostrar el pop-up
  
      setTimeout(() => {
        popup.classList.add("hidden");  // Ocultar el pop-up después de 3 segundos
      }, 3000);
    }
  });
  