import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { buscarProductoPorId } from '../data/db.js'
import { useCarrito } from '../context/CarritoContext.jsx'

function DetalleProducto() {
  const { id } = useParams()
  const producto = buscarProductoPorId(id)
  const { carrito, agregarAlCarrito } = useCarrito()
  const [cantidad, setCantidad] = useState(1)
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')

  if (!producto) {
    return (
      <div className="formulario">
        <h1>Producto no encontrado</h1>
        <Link to="/productos" className="boton">Volver a Productos</Link>
      </div>
    )
  }

  // cuantas unidades de este servicio ya hay en el carrito
  const itemEnCarrito = carrito.find(item => item.id === producto.id)
  const enCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0
  const disponibles = producto.stock - enCarrito

  function handleAgregar() {
    setMensaje('')
    setError('')

    if (!Number.isInteger(cantidad) || cantidad < 1) {
      setError('La cantidad debe ser un número entero mayor o igual a 1.')
      return
    }

    if (cantidad > disponibles) {
      if (disponibles === 0) {
        setError('Ya tienes en el carrito todo el stock disponible de este servicio.')
      } else {
        setError('Solo puedes agregar ' + disponibles + ' unidad(es) más de este servicio.')
      }
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
      {enCarrito > 0 && <p>Ya tienes {enCarrito} en el carrito.</p>}

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

      {error && <p className="error">{error}</p>}
      {mensaje && <p className="ficha-envio">{mensaje}</p>}
    </div>
  )
}

export default DetalleProducto