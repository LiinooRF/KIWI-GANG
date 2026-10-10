import { Fragment, useState } from 'react'
import { listarOrdenes } from '../data/db.js'

// Formatea un número como pesos chilenos con separador de miles: 65350 -> $65.350
const pesos = (n) => '$' + n.toLocaleString('es-CL')

function AdminOrdenes() {
  // db.js guarda las órdenes de la más antigua a la más nueva. Se copia el arreglo con [...]
  // antes de darlo vuelta, porque reverse() modifica el arreglo original.
  const ordenes = [...listarOrdenes()].reverse()

  // Número de la orden que tiene la boleta abierta, o null si ninguna.
  // Solo hay una abierta a la vez: abrir otra cierra la anterior.
  const [abierta, setAbierta] = useState(null)

  function alternarBoleta(numero) {
    // Si ya estaba abierta la cierra; si no, abre esa
    setAbierta(abierta === numero ? null : numero)
  }

  return (
    <>
      <div className="admin-topbar">
        <h1>Órdenes</h1>
      </div>

      <section className="admin-panel">
        {ordenes.length === 0 ? (
          <p>Todavía no hay órdenes. Aparecen aquí cuando un cliente completa una compra.</p>
        ) : (
          <div className="tabla-scroll">
            <table className="tabla-paquetes">
              <thead>
                <tr>
                  <th>N° orden</th>
                  <th>Fecha</th>
                  <th>Cliente</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {ordenes.map((orden) => (
                  // Cada orden dibuja DOS filas: la de datos y, si está abierta, la boleta.
                  // El <Fragment> agrupa las dos filas sin agregar una etiqueta extra,
                  // y es él quien lleva la key.
                  <Fragment key={orden.id}>
                    <tr>
                      <td>{orden.numero}</td>
                      <td>{new Date(orden.fecha).toLocaleString('es-CL')}</td>
                      <td>{orden.cliente.nombre} {orden.cliente.apellidos}</td>
                      <td>{pesos(orden.total)}</td>
                      <td>
                        <button className="btn btn-sm btn-success" onClick={() => alternarBoleta(orden.numero)}>
                          {abierta === orden.numero ? 'Ocultar boleta' : 'Ver boleta'}
                        </button>
                      </td>
                    </tr>

                    {abierta === orden.numero && (
                      <tr>
                        {/* colSpan="5": la celda ocupa el ancho de las 5 columnas */}
                        <td colSpan="5">
                          <Boleta orden={orden} />
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  )
}

// Detalle de una orden. Está en este mismo archivo porque solo se usa aquí.
function Boleta({ orden }) {
  const dir = orden.direccion
  // El depto es opcional, por eso solo se agrega si trae algo
  const direccion = dir.calle + (dir.depto ? ', depto ' + dir.depto : '') + ', ' + dir.comuna + ', ' + dir.region

  return (
    <div className="p-2">
      <h2>Boleta {orden.numero}</h2>
      <p>
        <strong>Cliente:</strong> {orden.cliente.nombre} {orden.cliente.apellidos} · {orden.cliente.correo}
        {orden.cliente.telefono && ' · ' + orden.cliente.telefono}
      </p>
      <p><strong>Entrega:</strong> {direccion}</p>
      {dir.indicaciones && <p><strong>Indicaciones:</strong> {dir.indicaciones}</p>}

      <table className="tabla-paquetes">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {orden.items.map((item) => (
            <tr key={item.id}>
              <td>{item.nombre}</td>
              <td>{pesos(item.precio)}</td>
              <td>{item.cantidad}</td>
              <td>{pesos(item.precio * item.cantidad)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-2"><strong>Total: {pesos(orden.total)}</strong></p>
    </div>
  )
}

export default AdminOrdenes