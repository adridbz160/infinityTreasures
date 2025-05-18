document.addEventListener("DOMContentLoaded", () => {

 document.querySelectorAll("#lateralPerfil a[href^='/']").forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();

          const idSeccion = link.getAttribute("href").replace("/", "");

          document.querySelectorAll(".seccion").forEach((sec) =>
            sec.classList.add("hidden")
          );

          const activa = document.getElementById(idSeccion);
          if (activa) activa.classList.remove("hidden");
        });
      });
});
