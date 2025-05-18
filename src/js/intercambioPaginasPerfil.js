document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#lateralPerfil a[href^='/']").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const idSeccion = link.getAttribute("href").replace("/", "");

      // Ocultar todas las secciones
      document.querySelectorAll(".seccion").forEach((sec) =>
        sec.classList.remove("active")
      );

      // Mostrar la sección correspondiente
      const activa = document.getElementById(idSeccion);
      if (activa) activa.classList.add("active");
    });
  });
});
