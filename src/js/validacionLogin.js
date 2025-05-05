document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
  
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const formData = new FormData(loginForm);
      const email = formData.get("email");
      const contraseña = formData.get("contraseña");
  
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          body: new URLSearchParams({ email, contraseña }),
        });
  
        if (response.status === 302) {
          showPopup("Iniciando sesión con éxito", true);
          setTimeout(() => {
            window.location.href = "/perfil";
          }, 1500);
        } else {
          const text = await response.text();
          showPopup(text || "Datos incorrectos, vuelve a intentarlo", false);
        }
      } catch (err) {
        showPopup("Error al conectar con el servidor", false);
        console.error(err);
      }
    });
  });
  
  function showPopup(message, success) {
    let popup = document.querySelector(".popup");
  
    if (!popup) {
      popup = document.createElement("div");
      popup.className = "popup";
      document.body.appendChild(popup);
    }
  
    popup.textContent = message;
  
    // Colores según éxito o error (opcional: puedes también cambiarlos con clases si prefieres)
    popup.style.backgroundColor = success ? "#d4edda" : "#f8d7da";
    popup.style.borderColor = success ? "#28a745" : "#dc3545";
    popup.style.color = success ? "#155724" : "#721c24";
  
    popup.classList.remove("hidden");
  
    setTimeout(() => {
      popup.classList.add("hidden");
    }, 3000);
  }
  