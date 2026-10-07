//La funcion recibe la contraseña y la verificacion, las compara y devuelve un mensaje dado el caso.
export function validarContraseñas(password, passwordVerify) {
  if (password !== passwordVerify) {
    return "Las contraseñas deben coincidir";
  }
  //Si son iguales, string vacio.
    return "";
}

//Se checkean validaciones del HTML del jsx.
export function validarFormulario(formulario) {
  return formulario.checkValidity();
}
