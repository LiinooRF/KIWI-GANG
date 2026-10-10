import { listarOrdenes } from '../data/db.js'

const pesos = (n) => '$' + n.toLocaleString('es-CL')

function AdminReportes() {
  const ordenes = listarOrdenes()

  let totalVendido = 0
  let unidadesVendidas = 0
  // Objeto donde cada clave es el id de un producto y el valor es su resumen de ventas
  const ventasPorProducto = {}

  // Se recorren todas las órdenes y, dentro de cada una, todos sus productos
  for (const orden of ordenes) {
    totalVendido += orden.total

    for (const item of orden.items) {
      unidadesVendidas += item.cantidad

      // La primera vez que aparece un producto se crea su fila con todo en 0
      if (!ventasPorProducto[item.id]) {
        ventasPorProducto[item.id] = { id: item.id, nombre: item.nombre, unidades: 0, ingresos: 0 }
      }
      ventasPorProducto[item.id].unidades += item.cantidad
      ventasPorProducto[item.id].ingresos += item.precio * item.cantidad
    }
  }

  // Si no hay órdenes se evita dividir por 0. Math.round quita los decimales.
  const ticketPromedio = ordenes.length > 0 ? Math.round(totalVendido / ordenes.length) : 0

  // Object.values convierte el objeto en arreglo; sort deja primero el que más ingresos dio
  const filas = Object.values(ventasPorProducto).sort((a, b) => b.ingresos - a.ingresos)

  return (
    <>
      <div className="admin-topbar">
        <h1>Reportes</h1>
      </div>

      <section className="admin-resumen">
        <div className="admin-tarjeta">
          <span className="numero">{pesos(totalVendido)}</span>
          <span className="etiqueta">Total vendido</span>
        </div>
        <div className="admin-tarjeta">
          <span className="numero">{ordenes.length}</span>
          <span className="etiqueta">Órdenes</span>
        </div>
        <div className="admin-tarjeta">
          <span className="numero">{pesos(ticketPromedio)}</span>
          <span className="etiqueta">Ticket promedio</span>
        </div>
        <div className="admin-tarjeta">
          <span className="numero">{unidadesVendidas}</span>
          <span className="etiqueta">Unidades vendidas</span>
        </div>
      </section>

      <section className="admin-panel">
        <h2>Ventas por producto</h2>
        {filas.length === 0 ? (
          <p>Todavía no hay ventas registradas.</p>
        ) : (
          <div className="tabla-scroll">
            <table className="tabla-paquetes">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Unidades vendidas</th>
                  <th>Ingresos</th>
                </tr>
              </thead>
              <tbody>
                {filas.map((fila) => (
                  <tr key={fila.id}>
                    <td>{fila.nombre}</td>
                    <td>{fila.unidades}</td>
                    <td>{pesos(fila.ingresos)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  )
}

export default AdminReportes