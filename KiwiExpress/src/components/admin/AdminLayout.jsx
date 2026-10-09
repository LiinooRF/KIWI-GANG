import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar.jsx'

// Estructura de todas las páginas del panel: menú lateral a la izquierda y el contenido
// de cada sección a la derecha. <Outlet /> es el hueco donde React Router dibuja la página
// que corresponde a la URL (el dashboard en /admin, las órdenes en /admin/ordenes, etc.).
// Así el menú se escribe una sola vez y lo reutilizan todas las vistas del admin.
function AdminLayout() {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout