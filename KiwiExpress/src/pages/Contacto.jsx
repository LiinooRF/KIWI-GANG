function Contacto() {
  return (
    <div>
      <main>
        <section className="hero">
          <h1>Contacto</h1>
          <p>Envíanos tus mensajes, dudas o sugerencias.</p>
        </section>

        <section className="formulario">
          <form novalidate className="contact-form">
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

              <button className="btn btn-success mt-4" type="submit">Enviar</button>

              <div id="EnvioExitoso" className="alert alert-success d-none mt-3 text-center" role="alert">
                Mensaje Enviado. (Test)
              </div>
          </form>
        </section>
    </main>
    </div>
  )
}

export default Contacto;
