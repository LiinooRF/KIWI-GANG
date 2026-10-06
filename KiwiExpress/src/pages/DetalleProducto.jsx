import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { buscarProductoPorId } from '../data/db.js'
import { useCarrito } from '../context/CarritoContext.jsx'

function DetalleProducto() {
  const { id } = useParams()
  const producto = buscarProductoPorId(id)
  const { agregarAlCarrito } = useCarrito()
  const [cantidad, setCantidad] = useState(1)
  const [mensaje, setMensaje] = useState('')

  if (!producto) {
    return (
      <div className="formulario">
        <h1>Servicio no encontrado</h1>
        <Link to="/productos" className="boton">Volver a servicios</Link>
      </div>
    )
  }

  function handleAgregar() {
    if (cantidad < 1) {
      return
    }
    agregarAlCarrito(producto, cantidad)
    setMensaje('Se agregó "' + producto.nombre + '" al carrito.')
  }

  return (
    <div className="formulario">
      <h1>{producto.nombre}</h1>
      <p>{producto.descripcion}</p>

      {producto.enOferta ? (
        <p>
          <span style={{ textDecoration: 'line-through', marginRight: '8px' }}>${producto.precio}</span>
          <strong>${producto.precioOferta}</strong>
        </p>
      ) : (
        <p><strong>${producto.precio}</strong></p>
      )}

      <p>Stock disponible: {producto.stock}</p>

      <div className="campo">
        <label htmlFor="cantidad">Cantidad</label>
        <input
          type="number"
          id="cantidad"
          min="1"
          max={producto.stock}
          value={cantidad}
          onChange={(e) => setCantidad(Number(e.target.value))}
        />
      </div>

      <button className="boton" onClick={handleAgregar}>Agregar al carrito</button>

      {mensaje && <p className="ficha-envio">{mensaje}</p>}
    </div>
  )
}

export default DetalleProducto