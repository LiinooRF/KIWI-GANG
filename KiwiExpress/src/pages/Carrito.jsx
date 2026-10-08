import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext.jsx'
import { buscarProductoPorId } from '../data/db.js'

function Carrito() {
  const { carrito, actualizarCantidad, quitarDelCarrito, vaciarCarrito, total } = useCarrito()
  const [error, setError] = useState('')

  if (carrito.length === 0) {
    return (
      <div className="formulario">
        <h1>Carrito</h1>
        <p>Tu carrito está vacío.</p>
        <Link to="/productos" className="boton">Ver servicios</Link>
      </div>
    )
  }

  return (
    <div className="formulario">
      <h1>Carrito</h1>

      {error && <p className="error">{error}</p>}

      <table className="tabla-paquetes">
        <thead>
          <tr>
            <th>Servicio</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {carrito.map((item) => {
            // el stock se consulta al producto original, no se guarda en el carrito
            const producto = buscarProductoPorId(item.id)
            const stock = producto ? producto.stock : item.cantidad

            return (
              <tr key={item.id}>
                <td>{item.nombre}</td>
                <td>${item.precio}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    max={stock}
                    value={item.cantidad}
                    onChange={(e) => {
                      const nuevaCantidad = Number(e.target.value)

                      if (nuevaCantidad < 1) {
                        return
                      }
                      if (nuevaCantidad > stock) {
                        setError('Solo hay ' + stock + ' unidades disponibles de "' + item.nombre + '".')
                        return
                      }

                      setError('')
                      actualizarCantidad(item.id, nuevaCantidad)
                    }}
                    style={{ width: '60px' }}
                  />
                </td>
                <td>${item.precio * item.cantidad}</td>
                <td>
                  <a href="#" onClick={(e) => { e.preventDefault(); setError(''); quitarDelCarrito(item.id) }}>
                    Quitar
                  </a>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <p><strong>Total: ${total}</strong></p>

      <div className="mt-3">
        <button className="boton" onClick={() => { setError(''); vaciarCarrito() }}>Vaciar carrito</button>
        <Link to="/checkout" className="boton" style={{ marginLeft: '10px' }}>Ir a pagar</Link>
      </div>
    </div>
  )
}

export default Carrito