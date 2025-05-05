document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
  
    if (loginForm) {
      loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
  
        const formData = new FormData(loginForm);
        const email = formData.get("email");
        const contraseña = formData.get("contraseña");
  
        try {
          const response = await fetch("/api/login", {
            method: "POST",
            body: formData,
          });
  
          if (response.ok) {
            alert("Inicio de sesión exitoso");
            window.location.href = "/perfil";
          } else if (response.status === 401) {
            alert("Los datos introducidos no son correctos. Inténtalo de nuevo.");
          } else {
            alert("Ocurrió un error. Intenta más tarde.");
          }
        } catch (error) {
          console.error("Error en la solicitud:", error);
          alert("Error al conectar con el servidor.");
        }
      });
    }
  });
  