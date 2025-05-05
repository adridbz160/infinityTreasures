document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registro-form");
    const email = document.getElementById("email");
    const repeatEmail = document.getElementById("repeat-email");
    const emailError = document.getElementById("email-error");
  
    const password = document.getElementById("password");
    const repeatPassword = document.getElementById("repeat-password");
    const passwordError = document.getElementById("password-error");
  
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
  
      let valid = true;
  
      // Reset estilos
      [email, repeatEmail, password, repeatPassword].forEach((input) => {
        input.style.border = "";
      });
      emailError.textContent = "";
      passwordError.textContent = "";
  
      // Validar email
      if (email.value !== repeatEmail.value) {
        email.style.border = "2px solid red";
        repeatEmail.style.border = "2px solid red";
        emailError.textContent = "Los emails no coinciden";
        valid = false;
      }
  
      // Validar contraseña
      if (password.value !== repeatPassword.value) {
        password.style.border = "2px solid red";
        repeatPassword.style.border = "2px solid red";
        passwordError.textContent = "Las contraseñas no coinciden";
        valid = false;
      }
  
      if (!valid) return;
  
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
  
      try {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
  
        const result = await res.json();
  
        if (res.ok && result.success) {
          showPopup("✔️", "Registro exitoso", true);
          setTimeout(() => {
            window.location.href = "/acceso";
          }, 3000);
        } else {
          showPopup("❌", result.message || "Datos introducidos no válidos", false);
        }
      } catch (err) {
        showPopup("❌", "Error al conectar con el servidor", false);
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
  