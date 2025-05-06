document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");

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

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Detener envío por defecto

    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        showPopup("✔️", "Inicio de sesión exitoso", true);
        setTimeout(() => {
          window.location.href = "/perfil";
        }, 3000);
      } else {
        showPopup("❌", result.message || "Credenciales incorrectas", false);
      }
    } catch (err) {
      showPopup("❌", "Error al conectar con el servidor", false);
    }
  });

  function showPopup(icon, message, success) {
    popupIcon.textContent = icon;
    popupText.textContent = message;
    
    // Cambiar la clase de éxito o error para aplicar los estilos correspondientes
    popup.classList.remove("success", "error");
    popup.classList.add(success ? "success" : "error");
  
    popup.classList.remove("hidden");
  
    setTimeout(() => {
      popup.classList.add("hidden");
    }, 3000);
  }
  
});
