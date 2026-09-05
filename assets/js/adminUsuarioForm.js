// form nuevo/editar usuario (admin)

// si viene ?id= en la url, es modo edición (por ahora solo cambia textos, sin precarga)
const params = new URLSearchParams(window.location.search);
const idUsuario = params.get("id");

if (idUsuario) {
  document.getElementById("tituloForm").textContent = "Editar usuario";
  document.getElementById("btnGuardar").textContent = "Guardar cambios";
}

// llena el select de comunas con el arreglo de comunas.js (mismo patrón que envio.js)
function cargarComunasForm() {
  const select = document.getElementById("comuna");
  for (let i = 0; i < comunas.length; i++) {
    const opcion = document.createElement("option");
    opcion.value = comunas[i].id_comuna;
    opcion.textContent = comunas[i].nombre_comuna;
    select.appendChild(opcion);
  }
}
cargarComunasForm();

const formUsuarioAdmin = document.getElementById("formUsuarioAdmin");
const password = document.getElementById("password");
const passwordverify = document.getElementById("passwordverify");
const mensajeExito = document.getElementById("usuarioGuardadoExitoso");

formUsuarioAdmin.addEventListener("submit", (event) => {
  if (password.value !== passwordverify.value) {
    passwordverify.setCustomValidity("Las contraseñas deben coincidir");
  } else {
    passwordverify.setCustomValidity("");
  }

  if (!formUsuarioAdmin.checkValidity()) {
    event.preventDefault();
    mensajeExito.classList.add("d-none");
  } else {
    event.preventDefault();

    // solo en modo "nuevo" agregamos a la lista en memoria (no hay backend/persistencia real)
    if (!idUsuario) {
      const nuevoUsuario = {
        rut: document.getElementById("rut").value,
        nombre: document.getElementById("nombre").value,
        apellidos: document.getElementById("apellidos").value,
        correo: document.getElementById("email").value,
        contraseña: password.value,
        telefono: document.getElementById("telefono").value,
        direccion: document.getElementById("direccion").value,
        comuna: document.getElementById("comuna").selectedOptions[0].textContent,
        rol: document.getElementById("rol").value
      };
      listaUsuarios.push(nuevoUsuario);
    }

    mensajeExito.classList.remove("d-none");
    formUsuarioAdmin.reset();
    formUsuarioAdmin.classList.remove("was-validated");
  }

  formUsuarioAdmin.classList.add("was-validated");
});