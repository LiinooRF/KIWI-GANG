//Validacion Rut
//formulario representa el registro.
const formulario = document.querySelector(".registro-form");
if (formulario) {
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
}

const formularioLogin = document.querySelector(".login-form");
if (formularioLogin) {
  const mensaje = document.querySelector("#IngresoExitoso");

  const email = document.querySelector("#email"); //Campos input para manejar sus validaciones.
  const password = document.querySelector("#password");

  formularioLogin.addEventListener("submit", (event) => {
    email.setCustomValidity(""); //Se quitan validaciones custom. (Queda como "sin error personalizado.")
    password.setCustomValidity("");
  if (!formularioLogin.checkValidity()) {
      event.preventDefault();
      mensaje.classList.add("d-none");
      formularioLogin.classList.add("was-validated");
      return;
      }
      const correoIngresado = document.querySelector("#email").value; //Toma los valores del input
      const contraseñaIngresada = document.querySelector("#password").value;
      const usuarioEncontrado = listaUsuarios.find(usuario => //Compara datos ingresados en usuariosRegistrados.js
          usuario.correo === correoIngresado &&
          usuario.contraseña === contraseñaIngresada
      );
      event.preventDefault(); //Previene envio / Limpia mensaje post cambio de inputs
      mensaje.classList.add("d-none");
      if (usuarioEncontrado) { //Imprime el mensaje de exito solo si coinciden
          event.preventDefault();
          mensaje.classList.remove("d-none");

          //Un timeout, {la direccion} , los milisegundos de tiempo.
          setTimeout(() => {window.location.href = "envio.html";}, 1000);
      } else {
        //Validaciones fallidas custom para no dejar pasar si no matchea con usuarioEncontrado (Mensaje interno para ubicar el "error".) 
        email.setCustomValidity("Correo o contraseña incorrectos"); 
        password.setCustomValidity("Correo o contraseña incorrectos");

        formularioLogin.classList.add("was-validated");
        return;
      }

          formularioLogin.classList.add("was-validated");
  });
  }

  const formularioContacto = document.querySelector(".contact-form");
  if (formularioContacto) {
    formularioContacto.addEventListener("submit", (event) => {
    const mensaje = document.querySelector("#EnvioExitoso");
    if (!formularioContacto.checkValidity()) {
    //Logica similar al check de registro.
    event.preventDefault();
    mensaje.classList.add("d-none");
    }
    else {
    event.preventDefault();
    mensaje.classList.remove("d-none");
    }
    formularioContacto.classList.add("was-validated");
    });
  }