import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap';
import { validarCredenciales } from "../js/val_login.js"
import { useState, useRef } from "react";

function Login() {
  //Estado inicial, vacio.
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [validated, setValidated] = useState(false);
  const [loginExitoso, setLoginExitoso] = useState(false);

  //variables referenciales para el manejo de errores
  const correoRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formulario = event.currentTarget;
    //Indica un intento de envio
    setValidated(true);

  //Reinicia la validacion 
  correoRef.current.setCustomValidity("");
  passwordRef.current.setCustomValidity("");

  //lo deja en false, haciendo desaparecer el cartel al cambiar el campo a erroneo.
    if (!formulario.checkValidity()) {
      setLoginExitoso(false)
      return;
    }

    //la variable que define si las credenciales coinciden.
    const esValido = validarCredenciales(correo, contrasena);

    if (!esValido) {
      setLoginExitoso(false)
      correoRef.current.setCustomValidity("Credenciales incorrectas");
      passwordRef.current.setCustomValidity("Credenciales incorrectas");
      return;
    }

    correoRef.current.setCustomValidity("");
    passwordRef.current.setCustomValidity("");

    setLoginExitoso(true);
  };

    return (
    <>
          <main>
    <section className="hero">
      <h1>Iniciar sesión</h1>
      <p>Para solicitar envíos, y revisar el seguimiento de tu pedido.</p>
    </section>

    <section className="formulario">
      <form noValidate onSubmit={handleSubmit} className={`login-form ${validated ? "was-validated" : ""}`}>
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
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              aria-describedby="correoError"
              ref={correoRef}
              ></input>

              <div id="correoError" className="invalid-feedback">
              Correo o contraseña incorrectos.
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
              ref={passwordRef}
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              aria-describedby="contraError"
              ></input>

              <div id="contraError" className="invalid-feedback">
                Correo o contraseña incorrectos.
              </div>
          </div>
          <div>
            <span> ¿No tienes una cuenta? Registrate{' '} <u> <Nav.Link as={Link} to="/registro" className="d-inline p-0 text-primary">aqui</Nav.Link> </u> ! </span>
          </div>
          <button className="btn btn-success mt-4" type="submit">Ingresar</button>
          <div id="IngresoExitoso" className={loginExitoso ? "alert alert-success mt-3" : "alert alert-danger mt-3 d-none"} role="alert">
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
      {/*Falta jsx de admin*/}
      <p className="mt-3" > <Nav.Link as={Link} to="/admin" className="d-inline p-0 text-primary">Ir al panel de administración</Nav.Link></p>
    </section>
  </main>
  </>
  )
}

export default Login;