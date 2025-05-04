// Función para validar los formularios
function validateForm() {
    const email = document.getElementById('email').value;
    const emailConfirm = document.getElementById('email_confirm').value;
    const contraseña = document.getElementById('contraseña').value;
    const contraseñaConfirm = document.getElementById('contraseña_confirm').value;

    let isValid = true;

    // Limpiar los mensajes de error previos
    document.getElementById('emailError').innerText = '';
    document.getElementById('passwordError').innerText = '';
    document.getElementById('errorMessages').style.display = 'none';

    // Validar los emails
    if (email !== emailConfirm) {
      document.getElementById('emailError').innerText = 'Los emails no coinciden';
      document.getElementById('email').style.borderColor = 'red';
      document.getElementById('email_confirm').style.borderColor = 'red';
      isValid = false;
    }

    // Validar las contraseñas
    if (contraseña !== contraseñaConfirm) {
      document.getElementById('passwordError').innerText = 'Las contraseñas no coinciden';
      document.getElementById('contraseña').style.borderColor = 'red';
      document.getElementById('contraseña_confirm').style.borderColor = 'red';
      isValid = false;
    }

    // Mostrar los mensajes de error si no son válidos
    if (!isValid) {
      document.getElementById('errorMessages').style.display = 'block';
    }

    return isValid;
  }

  // Función para resetear el borde cuando el usuario hace click dentro de un input
  document.querySelectorAll('input').forEach(input => {
    input.addEventListener('click', () => {
      input.style.borderColor = '';  // Resetear el borde al hacer click
      document.getElementById('email_confirm').style.borderColor = '';  // Resetear email confirm
      document.getElementById('contraseña_confirm').style.borderColor = '';  // Resetear contraseña confirm
    });
  });