//La funcion recibe la contraseña y la verificacion, las compara y devuelve un mensaje dado el caso.
export function validarContraseñas(password, passwordVerify) {
  if (password !== passwordVerify) {
    //Este mensaje se revela con setcustomvalidity()
    return "Las contraseñas deben coincidir";
  }
  //Si son iguales, string vacio.
  return "";
}

//Se checkean validaciones.
export function validarFormulario(formulario) {
  return formulario.checkValidity();
}
