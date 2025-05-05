

document.addEventListener("DOMContentLoaded", function(){
const form = document.getElementById("registro-form");
const email = document.getElementById("email");
const repeatEmail = document.getElementById("repeat-email");
const emailError = document.getElementById("email-error");

const password = document.getElementById("password");
const repeatPassword = document.getElementById("repeat-password");
const passwordError = document.getElementById("password-error");

form.addEventListener("submit", (e) => {
  let valid = true;

  // Reset styles
  [email, repeatEmail, password, repeatPassword].forEach(input => {
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

  if (!valid) {
    e.preventDefault(); // Evitar que se envíe el formulario
  }
});
});