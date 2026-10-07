import { useState, useRef } from "react";
import comunas from "../js/comunas";
import {validarContraseñas, validarFormulario} from "../js/val_registro";
function Registro() {
  const [validated, setValidated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [registroExitoso, setRegistroExitoso] = useState(false);

  //una variable referencial que mas tarde se le da a la verificacion de la password.
  const passwordVerifyRef = useRef(null);

  const handleSubmit = (event) => {
    //Detiene los checkeos por defecto
    event.preventDefault();
    //define al formulario actual como "formulario"
    const formulario = event.currentTarget;

    //Inicia el intento de validacion
    setValidated(true);

    //da el string correspondiente en respuesta, a la variable error
    const error = validarContraseñas(
      password,
      passwordVerify
    );

    //al ref actual de la contra repetida, le activa el customvalidity de error si aplica.
    passwordVerifyRef.current.setCustomValidity(error);

    //le da el estado de validez a esValido y se decide si el registro fue exitoso
    const esValido = validarFormulario(formulario)

    if (!esValido) {
      setRegistroExitoso(false);
      return;
    }

    setRegistroExitoso(true);
  };
    return (
        <>
          <main>
      <section className="hero">
        <h1>Registro</h1>
        <p>Crea una cuenta de forma gratuita en pocos minutos.</p>
        <p>Gestiona tus despachos en un solo lugar.</p>
      </section>

      <section className="hero">
        <form noValidate onSubmit={handleSubmit} className={`registro-form ${validated ? "was-validated" : ""}`}>
          <div className="mt-3">
            <label htmlFor="rut" className="form-label">Rut</label>
            <input 
            type="text"
            className="form-control" 
            id="rut" 
            name="rut"
            pattern="[0-9]{6,8}[0-9Kk]"
            minLength="7"
            maxLength="9"
            required
            aria-describedby="rutHelp rutError"
            ></input>

            <div id="rutHelp" className="form-text">
              Ingresa tu rut sin puntos ni guión.
            </div>

            <div id="rutError" className="invalid-feedback">
              El rut debe tener entre 7 y 9 caracteres.
            </div>
          </div>

          <div className="mt-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input type="text" className="form-control" id="nombre" name="nombre" required></input>
          </div>

          <div className="mt-3">
              <label htmlFor="apellidos" className="form-label">Apellidos</label>
              <input type="text" className="form-control" id="apellidos" name="apellidos" required></input>
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
              aria-describedby="correoHelp correoError"
              ></input>

              <div id="correoHelp" className="form-text">
              Correos admitidos: @duoc.cl, @profesor.duoc.cl y @gmail.com.
              </div>

              <div id="correoError" className="invalid-feedback">
              Ingresa un correo admitido.
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
              value={password}
              //al cambiar el contenido del imput, cambia el valor que se tenga por el value ingresado en password
              onChange={(e) => setPassword(e.target.value)}
              aria-describedby="contraHelp contraError"
              ></input>

              <div id="contraHelp" className="form-text">
                La contraseña debe contener entre 4 y 10 caracteres.
              </div>

              <div id="contraError" className="invalid-feedback">
                Contraseña invalida.
              </div>
          </div>

          <div className="mt-3">
              <label htmlFor="passwordverify" className="form-label">Repetir contraseña</label>
              <input 
              type="password" 
              className="form-control" 
              id="passwordverify" 
              name="passwordverify" 
              required
              value={passwordVerify}
              onChange={(e) => setPasswordVerify(e.target.value)}
              aria-describedby="contravError"
              //Permite acceder al input mediante el ref, uqe luego evalua si hay un error o no basado en la funcion.
              ref={passwordVerifyRef}
              ></input>

              <div id="contravError" className="invalid-feedback" align="left">
                Las contraseñas no coinciden.
              </div>
          </div>

          <div className="mt-3">
              <label htmlFor="telefono" className="form-label">Teléfono (Opcional)</label>
              <input type="text" className="form-control" id="telefono" name="telefono"></input>
          </div>

          <div className="mt-3">
              <label htmlFor="direccion" className="form-label">Dirección</label>
              <input type="text" className="form-control" id="direccion" name="direccion" required></input>
          </div>

          <div className="mt-3">
              <label htmlFor="comuna" className="form-label">Comuna</label>
              <select className="form-select" id="comuna" name="comuna" required>
                <option value="">Selecciona una comuna</option>
                {/* Se hace un recorrido de cada key y valor para mostrar los nombres de las comunas.*/}
                {comunas.map((comuna) => (
                <option
                  key={comuna.id_comuna}
                  value={comuna.id_comuna}
                  >
                  {comuna.nombre_comuna}
                </option>
                ))}
              </select>
          </div>
            <button className="btn btn-success mt-4" type="submit">Registrarse</button>

          <div id="registroExitoso"   className={registroExitoso ? "alert alert-success mt-3": "alert alert-success mt-3 d-none"} role="alert">
            Usuario registrado correctamente (Test).
          </div>
        </form>
      </section>
    </main>
        </>
    )
}

export default Registro;