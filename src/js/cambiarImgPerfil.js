document.addEventListener("DOMContentLoaded", function(){
    document.getElementById('change-photo-btn').addEventListener('click', function () {
      document.getElementById('profile-upload').click();
    });
  
    // Opcional: vista previa de la imagen seleccionada
    document.getElementById('profile-upload').addEventListener('change', function (event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function (e) {
          document.getElementById('profile-pic').src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

});
