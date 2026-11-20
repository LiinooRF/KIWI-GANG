import listaUsuarios from "../js/usuariosRegistrados";

//La funcion toma los valores ingresados, los compara con lo encontrado en la lista y si fue encontrado, devuelve true, caso contrario false.
export function validarCredenciales(correo, contrasena) {
    const usuarioEncontrado = listaUsuarios.find(
    usuario =>
      usuario.correo === correo &&
      usuario.contraseña === contrasena
  );
    if (usuarioEncontrado) {
    return true;
  }
    return false;
}