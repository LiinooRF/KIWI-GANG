import { Link, NavLink } from 'react-router-dom'
import { secciones } from '../../data/seccionesAdmin.js'

// Menú lateral del panel de administración
function AdminSidebar() {
    return (
    <aside className="admin-sidebar">
        <Link className="logo" to="/admin">🥝 KiwiExpress Admin</Link>

    <nav className="admin-nav">
        {/* .map recorre la lista y dibuja un link por cada sección */}
        {secciones.map((seccion) => (
          // NavLink es un Link que sabe si su ruta es la página abierta. Su className acepta
          // una función que recibe isActive: así solo el link actual lleva la clase "activo".
          // "end" hace que /admin cuente como activo solo en /admin exacto, y no en /admin/ordenes.
        <NavLink
            key={seccion.ruta}
            to={seccion.ruta}
            end={seccion.ruta === '/admin'}
            className={({ isActive }) => (isActive ? 'activo' : '')}
            >
            {seccion.icono} {seccion.texto}
            </NavLink>
        ))}
        <Link to="/" className="salir">↩ Salir al sitio</Link>
        </nav>
    </aside>
    )
}

export default AdminSidebar