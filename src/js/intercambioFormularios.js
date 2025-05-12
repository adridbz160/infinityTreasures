
    function showForm(formId){
        document.querySelectorAll(".form-box").forEach(form => form.classList.remove("active"));
        document.getElementById(formId).classList.add("active");
    }

    const switchToRegister = document.querySelector("form#login-form p a")
    const switchToLogin = document.querySelector("form#registro-form p a")

    switchToRegister.addEventListener("click", function(){
        showForm('registerForm');
    });
    switchToLogin.addEventListener("click", function(){
showForm('loginForm');
    });