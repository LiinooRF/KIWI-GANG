import { Link, useParams } from 'react-router-dom'
import { buscarOrdenPorNumero } from '../data/db.js'

function PagoCorrecto() {
  // El número de orden viaja en la URL: /pago-correcto/KX-ORD-1001
  const { numero } = useParams()
  const orden = buscarOrdenPorNumero(numero)

  // Si alguien entra con un número que no existe, no hay nada que mostrar
  if (orden === null) {
    return (
      <main>
        <section className="formulario">
          <h1>No encontramos esa orden</h1>
          <p>Revisa el número de orden o vuelve a la tienda.</p>
          <Link to="/productos" className="boton">Ver Productos</Link>
        </section>
      </main>
    )
  }

  // 'es-CL' muestra la fecha en formato chileno
  const fecha = new Date(orden.fecha).toLocaleString('es-CL')

  // El depto es opcional, por eso solo se agrega si viene con algo
  const dir = orden.direccion
  const lineaDireccion = dir.calle + (dir.depto ? ', depto ' + dir.depto : '') + ', ' + dir.comuna + ', ' + dir.region

  return (
    <main>
      <section className="hero">
        <h1>¡Compra exitosa!</h1>
        <p>Tu pago fue aprobado. Este es tu número de orden:</p>
        <p><strong>{orden.numero}</strong></p>
      </section>

      <section className="formulario">
        <h2>Resumen de la compra</h2>
        <p>Fecha: {fecha}</p>
        <table className="tabla-paquetes">
          <thead>
            <tr>
              <th>Servicio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {orden.items.map((item) => (
              <tr key={item.id}>
                <td>{item.nombre}</td>
                <td>{item.cantidad}</td>
                <td>${item.precio * item.cantidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3"><strong>Total pagado: ${orden.total}</strong></p>
      </section>

      <section className="formulario mt-3">
        <h2>Datos de entrega</h2>
        <p>{orden.cliente.nombre} {orden.cliente.apellidos} · {orden.cliente.correo}</p>
        <p>{lineaDireccion}</p>
        {orden.direccion.indicaciones && <p>Indicaciones: {orden.direccion.indicaciones}</p>}
        <Link to="/productos" className="boton">Seguir comprando</Link>
      </section>
    </main>
  )
}

export default PagoCorrecto