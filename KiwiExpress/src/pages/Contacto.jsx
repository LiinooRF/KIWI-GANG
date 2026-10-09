import {useState} from "react"
//Aqui se realiza el testeo de Boton.jsx
import Boton from "../components/layout/Boton.jsx";

function Contacto() {
  const [validated, setValidated] = useState(false);
  const [envioExitoso, setEnvioExitoso] = useState(false)
  const handleSubmit = (event) => {
    
//Para que el boton de testing no de true siempre, se le redirige al formulario, para que funcione como disparador de onSubmit (por el onClick del test) 
    const formulario = event.currentTarget.tagName === "BUTTON" 
    ? event.currentTarget.closest("form") 
    : event.currentTarget;

    event.preventDefault();
    setValidated(true)
      if (!formulario.checkValidity()) {
      setEnvioExitoso(false)
      return;
    }
    setEnvioExitoso(true)
  }
  return (
    <div>
      <main>
        <section className="hero">
          <h1>Contacto</h1>
          <p>Envíanos tus mensajes, dudas o sugerencias.</p>
        </section>

        <section className="formulario">
          <form noValidate onSubmit={handleSubmit} className={`login-form ${validated ? "was-validated" : ""}`}>
              <div className="mt-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="nombre" name="nombre" required maxLength="100"/>
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
                  maxLength="100"
                  aria-describedby="correoHelp correoError"
                  />
                  
                  <div id="correoHelp" className="form-text">
                    Correos admitidos: @duoc.cl, @profesor.duoc.cl y @gmail.com.
                  </div>

                  <div id="correoError" className="invalid-feedback">
                    Ingresa un correo admitido.
                  </div>
              </div>

              <div className="mt-3">
                  <label htmlFor="comentario" className="form-label">Mensaje</label>
                  <textarea className="form-control" id="comentario" name="Comentario" required maxLength="500" rows="6"></textarea>
              </div>  

              {/*Boton para testing*/}
              <Boton texto="Enviar" onClick={handleSubmit} />

              <div id="EnvioExitoso" className={envioExitoso ? "alert alert-success mt-3" : "alert alert-danger mt-3 d-none"} role="alert">
                Mensaje Enviado. (Test)
              </div>
          </form>
        </section>
    </main>
    </div>
  )
}

export default Contacto;
