document.addEventListener("DOMContentLoaded", function(){
      document.getElementById("profile-upload").addEventListener("change", async function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Convertir la imagen a Base64
        const base64Image = reader.result;
        // Poner el Base64 en un campo oculto
        document.getElementById("base64-foto-perfil").value = base64Image;
      };
      reader.readAsDataURL(file); // Leer la imagen como URL de datos (Base64)
    }
  });
});