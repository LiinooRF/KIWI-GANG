//Validacion Rut
//formulario representa el registro.
const formulario = document.querySelector(".registro-form");

//Validacion contraseña
const password = document.querySelector("#password");
const passwordverify = document.querySelector("#passwordverify");

formulario.addEventListener("submit", (event) => {
//Para cuando el formulario se manda se comparan, si no son iguales flaggea.
  if (password.value !== passwordverify.value) {
    //Desc interna de la comparacion
    passwordverify.setCustomValidity("Las contraseñas deben coincidir");
  } else {
    passwordverify.setCustomValidity("");
  }
 
//Cuando se haga submit en el form, se checkea validacion, de ser falso:
const mensaje = document.querySelector("#registroExitoso");
if (!formulario.checkValidity()) {
    //Prevernir al form de mandarse
    event.preventDefault();
    mensaje.classList.add("d-none");
    }
    else {
    event.preventDefault();
    mensaje.classList.remove("d-none");
    }
    //mostrar los estados de validacion de los campos al usuario.
    formulario.classList.add("was-validated")
});

