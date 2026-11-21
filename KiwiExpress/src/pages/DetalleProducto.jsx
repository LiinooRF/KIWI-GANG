import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { pedirApi } from '../data/auth.js'
import { useCarrito } from '../context/CarritoContext.jsx'

function DetalleProducto() {
  const { id } = useParams()
  // el producto llega del api, parte en null hasta tener respuesta
  const [producto, setProducto] = useState(null)
  const [cargando, setCargando] = useState(true)
  // error de conexion con el api, es distinto a que el producto no exista
  const [errorCarga, setErrorCarga] = useState('')
  const { carrito, agregarAlCarrito } = useCarrito()
  const [cantidad, setCantidad] = useState(1)
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')

  // el [id] hace que se vuelva a pedir si cambia el id de la url
  useEffect(() => {
    async function cargarProducto() {
      try {
        const respuesta = await pedirApi('/productos/' + id)
        // 404 quiere decir que no existe, queda en null y se muestra producto no encontrado
        if (respuesta.status === 404) {
          setProducto(null)
          return
        }
        if (!respuesta.ok) {
          throw new Error('el api respondio con error')
        }
        const datos = await respuesta.json()
        setProducto(datos)
      } catch {
        setErrorCarga('No se pudo cargar el producto. Intenta más tarde.')
      } finally {
        setCargando(false)
      }
    }
    cargarProducto()
  }, [id])

  if (cargando) {
    return (
      <div className="formulario">
        <p>Cargando producto...</p>
      </div>
    )
  }

  if (errorCarga) {
    return (
      <div className="formulario">
        <p className="error">{errorCarga}</p>
        <Link to="/productos" className="boton">Volver a Productos</Link>
      </div>
    )
  }

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