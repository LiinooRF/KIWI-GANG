// Secciones del panel de administración. Se define en un solo lugar para que el menú
// lateral y los accesos rápidos del dashboard usen la misma lista: si se agrega una

//Se suman los roles para gestionar la vista de admin con seccionesVisibles en Sidebar, apuntando al nuevo atributo.
import { ROLES } from "../js/permisos";

// sección nueva, basta con sumarla aquí.
export const secciones = [
    { ruta: '/admin', texto: 'Inicio', icono: '🏠', roles: [ROLES.ADMIN] },
    { ruta: '/admin/ordenes', texto: 'Órdenes', icono: '🧾', roles: [ROLES.ADMIN, ROLES.OPERARIO] },
    { ruta: '/admin/productos', texto: 'Productos', icono: '📦', roles: [ROLES.ADMIN, ROLES.OPERARIO] },
    { ruta: '/admin/categorias', texto: 'Categorías', icono: '🏷️', roles: [ROLES.ADMIN] },
    { ruta: '/admin/reportes', texto: 'Reportes', icono: '📊', roles: [ROLES.ADMIN] },
    { ruta: '/admin/usuarios', texto: 'Usuarios', icono: '👤', roles: [ROLES.ADMIN] }
]