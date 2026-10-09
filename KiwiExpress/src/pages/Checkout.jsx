import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext.jsx'
import { obtenerSesion } from '../data/db.js'
import comunas from "../js/comunas";

function Checkout() {
  const { carrito, total } = useCarrito()
  const navigate = useNavigate()
  const [validated, setValidated] = useState(false)

  // Si hay un usuario con sesión iniciada, sus datos llenan el formulario.
  // La función dentro de useState (se llama "inicializador perezoso") se ejecuta
  // una sola vez, al montar la página, en vez de leer localStorage en cada render.
  const [datos, setDatos] = useState(() => {
    const sesion = obtenerSesion()
    return {
      nombre: sesion ? sesion.nombre : '',
      apellidos: sesion ? sesion.apellidos : '',
      correo: sesion ? sesion.correo : '',
      telefono: '',
      calle: '',
      depto: '',
      region: 'Región Metropolitana',
      comuna: sesion ? sesion.comuna : '',
      indicaciones: ''
    }
  })

  // Un solo handler para todos los campos: usa el atributo "name" del input
  // para saber qué propiedad de "datos" actualizar.
  // { ...datos } copia el objeto y [name]: value sobreescribe solo la propiedad
  // cuyo nombre viene en la variable name (se llama "propiedad calculada").
  function handleChange(e) {
    const { name, value } = e.target
    setDatos({ ...datos, [name]: value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    // Activa la clase was-validated de Bootstrap: desde ahora marca los campos en rojo o verde
    setValidated(true)

    // checkValidity() revisa de una vez todos los required, pattern y maxLength del formulario
    if (!e.currentTarget.checkValidity()) {
      return
    }

    navigate('/pago-correcto')
  }

  // Los hooks (useState, useCarrito...) siempre van ANTES de cualquier return.
  // Por eso este return anticipado está después de todos ellos.
  if (carrito.length === 0) {
    return (
      <main>
        <section className="formulario">
          <h1>Checkout</h1>
          <p>Tu carrito está vacío, no hay nada que pagar.</p>
          <Link to="/productos" className="boton">Ver servicios</Link>
        </section>
      </main>
    )
  }

  return (
    <main>
      <section className="hero">
        <h1>Checkout</h1>
        <p>Revisa tu compra y completa tus datos de entrega.</p>
      </section>

      <section className="formulario">
        <h2>Resumen de tu compra</h2>
        <table className="tabla-paquetes">
          <thead>
            <tr>
              <th>Servicio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {carrito.map((item) => (
              <tr key={item.id}>
                <td>{item.nombre}</td>
                <td>{item.cantidad}</td>
                <td>${item.precio * item.cantidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3"><strong>Total: ${total}</strong></p>
      </section>

      <section className="formulario mt-3">
        {/* noValidate desactiva los mensajes nativos del navegador: los mostramos nosotros con Bootstrap */}
        <form noValidate onSubmit={handleSubmit} className={validated ? 'was-validated' : ''}>
          <h2>Datos del cliente</h2>
          {/* row y col-md-6: dos columnas en pantallas medianas y grandes, una sola en celular */}
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input type="text" className="form-control" id="nombre" name="nombre"
                required maxLength="100" value={datos.nombre} onChange={handleChange} />
              <div className="invalid-feedback">Ingresa tu nombre.</div>
            </div>

            <div className="col-md-6">
              <label htmlFor="apellidos" className="form-label">Apellidos</label>
              <input type="text" className="form-control" id="apellidos" name="apellidos"
                required maxLength="100" value={datos.apellidos} onChange={handleChange} />
              <div className="invalid-feedback">Ingresa tus apellidos.</div>
            </div>

            <div className="col-md-6">
              <label htmlFor="correo" className="form-label">Correo electrónico</label>
              {/* Mismo pattern de dominios que usan Registro y Contacto */}
              <input type="email" className="form-control" id="correo" name="correo"
                pattern=".+@(duoc.cl|profesor.duoc.cl|gmail.com)"
                required maxLength="100" value={datos.correo} onChange={handleChange} />
              <div className="invalid-feedback">Ingresa un correo admitido (@duoc.cl, @profesor.duoc.cl o @gmail.com).</div>
            </div>

            <div className="col-md-6">
              <label htmlFor="telefono" className="form-label">Teléfono (opcional)</label>
              <input type="tel" className="form-control" id="telefono" name="telefono"
                maxLength="15" value={datos.telefono} onChange={handleChange} />
            </div>
          </div>

          <h2>Dirección de entrega</h2>
          <div className="row g-3">
            <div className="col-md-8">
              <label htmlFor="calle" className="form-label">Calle y número</label>
              <input type="text" className="form-control" id="calle" name="calle"
                required maxLength="150" value={datos.calle} onChange={handleChange} />
              <div className="invalid-feedback">Ingresa la calle y el número.</div>
            </div>

            <div className="col-md-4">
              <label htmlFor="depto" className="form-label">Depto (opcional)</label>
              <input type="text" className="form-control" id="depto" name="depto"
                maxLength="20" value={datos.depto} onChange={handleChange} />
            </div>

            <div className="col-md-6">
              <label htmlFor="region" className="form-label">Región</label>
              {/* Solo hay una región porque comunas.js solo tiene comunas de la Región Metropolitana */}
              <select className="form-select" id="region" name="region"
                required value={datos.region} onChange={handleChange}>
                <option value="Región Metropolitana">Región Metropolitana</option>
              </select>
              <div className="invalid-feedback">Selecciona una región.</div>
            </div>

            <div className="col-md-6">
              <label htmlFor="comuna" className="form-label">Comuna</label>
              {/* El value de cada opción es el NOMBRE de la comuna (no su id), para que coincida
                  con el campo comuna que guarda cada usuario en db.js y se pueda preseleccionar */}
              <select className="form-select" id="comuna" name="comuna"
                required value={datos.comuna} onChange={handleChange}>
                <option value="">Selecciona una comuna</option>
                {comunas.map((c) => (
                  <option key={c.id_comuna} value={c.nombre_comuna}>{c.nombre_comuna}</option>
                ))}
              </select>
              <div className="invalid-feedback">Selecciona una comuna.</div>
            </div>

            <div className="col-12">
              <label htmlFor="indicaciones" className="form-label">Indicaciones (opcional)</label>
              <textarea className="form-control" id="indicaciones" name="indicaciones"
                rows="3" maxLength="300" value={datos.indicaciones} onChange={handleChange}></textarea>
            </div>
          </div>

          <button className="btn btn-success mt-4" type="submit">Continuar al pago</button>
          <Link to="/carrito" className="btn btn-outline-secondary mt-4 ms-2">Volver al carrito</Link>
        </form>
      </section>
    </main>
  )
}

export default Checkout