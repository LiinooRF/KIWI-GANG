import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import {validarCredenciales} from "../js/val_login";
import { useState } from "react";

function Login() {
  const handleSubmit = (event) => {
  event.preventDefault();

  //Se asigna el resultado de los input a las variables a evaluar para la funcion.
  const formulario = event.currentTarget;
  const correo = formulario.email.value;
  const contraseña = formulario.password.value;

  //Se le dan a la funcion.
  const credencialesValidas = validarCredenciales(
    correo,
    contraseña
  );

  //Muestra validacion de Bootstrap
  formulario.classList.add("was-validated");
  const mensaje = document.querySelector("#IngresoExitoso");
  
  //si son validas se aplica el cartel de ingreso exitoso.
  if (credencialesValidas) {
    mensaje.classList.remove("d-none");
    return;
  }
  else {
    mensaje.classList.add("d-none"); 
  }

};
    return (
    <>
    <Header />
          <main>
    <section className="hero">
      <h1>Iniciar sesión</h1>
      <p>Para solicitar envíos, y revisar el seguimiento de tu pedido.</p>
    </section>

    <section className="formulario">
      <form noValidate className="login-form" onSubmit={handleSubmit}>
          <div className="hero">
            <h1 className="text-center"> 🥝 KiwiExpress </h1>
          </div>

          <div className="mt-3">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              
              <input 
              type="email" 
              className="form-control" 
              id="email" 
              name="email"
              pattern=".+@(duoc.cl|profesor.duoc.cl|gmail.com)"
              required
              aria-describedby="correoError"
              ></input>

              <div id="correoError" className="invalid-feedback">
              El correo es incorrecto.
              </div>
          </div>

          <div className="mt-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input 
              type="password" 
              className="form-control" 
              id="password" 
              name="password"
              minLength="4"
              maxLength="10"
              required
              aria-describedby="contraError"
              ></input>

              <div id="contraError" className="invalid-feedback">
                La contraseña es incorrecta.
              </div>
          </div>
          <div>
            <span> ¿No tienes una cuenta? Registrate <a className="nav-link d-inline p-0 text-primary" href="registro.html"> <u> aqui</u></a>! </span>
          </div>
          <button className="btn btn-success mt-4" type="submit">Ingresar</button>
          <div id="IngresoExitoso" className="alert alert-success d-none mt-3 text-center" role="alert">
            Ingreso Correcto. (Test)
          </div>
      </form>
    </section>

    <section className="formulario">
      <h2>Usuarios de prueba</h2>
      <p>Estos usuarios son de prueba para revisar el sitio y entrar al panel de administración.</p>
      <table className="tabla-paquetes">
        <tbody>
          <tr>
            <th>Rol</th>
            <th>Correo</th>
            <th>Contraseña</th>
          </tr>
          <tr>
            <td>Administrador</td>
            <td>rodrigofuentes@duoc.cl</td>
            <td>admin123</td>
          </tr>
          <tr>
            <td>Operario</td>
            <td>javieradiaz@duoc.cl</td>
            <td>oper123</td>
          </tr>
          <tr>
            <td>Cliente</td>
            <td>catalinasoto@gmail.com</td>
            <td>ctr123</td>
          </tr>
        </tbody>
      </table>
      <p className="mt-3"><a href="admin.html">Ir al panel de administración</a></p>
    </section>
  </main>
  <Footer />
  </>
     )
}

export default Login;