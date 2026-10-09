import { Link } from 'react-router-dom'
import { listarOrdenes, listarProductos, listarUsuarios, obtenerSesion } from '../data/db.js'
import { secciones } from '../data/seccionesAdmin.js'

function AdminDashboard() {
  // Los totales son la cantidad de elementos de cada lista guardada en db.js
  const totalOrdenes = listarOrdenes().length
  const totalProductos = listarProductos().length
  const totalUsuarios = listarUsuarios().length

  // Si alguien inició sesión se muestra su nombre; si no, "Admin"
  const sesion = obtenerSesion()
  const nombre = sesion ? sesion.nombre : 'Admin'

  // Los accesos rápidos son todas las secciones menos "Inicio", porque ya estamos en ella
  const accesos = secciones.filter((seccion) => seccion.ruta !== '/admin')

  return (
    <>
      <div className="admin-topbar">
        <h1>Panel de administración</h1>
        <div className="admin-usuario">
          {/* charAt(0) toma la primera letra del nombre para el círculo */}
          <span className="avatar">{nombre.charAt(0)}</span>
          <span>{nombre}</span>
        </div>
      </div>

      <section className="admin-resumen">
        <div className="admin-tarjeta">
          <span className="numero">{totalOrdenes}</span>
          <span className="etiqueta">Órdenes</span>
        </div>
        <div className="admin-tarjeta">
          <span className="numero">{totalProductos}</span>
          <span className="etiqueta">Productos</span>
        </div>
        <div className="admin-tarjeta">
          <span className="numero">{totalUsuarios}</span>
          <span className="etiqueta">Usuarios</span>
        </div>
      </section>

      <section className="admin-panel">
        <h2>Accesos rápidos</h2>
        <div className="d-flex flex-wrap gap-2">
          {accesos.map((acceso) => (
            <Link key={acceso.ruta} to={acceso.ruta} className="boton text-decoration-none">
              {acceso.icono} {acceso.texto}
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

export default AdminDashboard