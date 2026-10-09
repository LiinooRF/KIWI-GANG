// Secciones del panel de administración. Se define en un solo lugar para que el menú
// lateral y los accesos rápidos del dashboard usen la misma lista: si se agrega una
// sección nueva, basta con sumarla aquí.
export const secciones = [
    { ruta: '/admin', texto: 'Inicio', icono: '🏠' },
    { ruta: '/admin/ordenes', texto: 'Órdenes', icono: '🧾' },
    { ruta: '/admin/productos', texto: 'Productos', icono: '📦' },
    { ruta: '/admin/categorias', texto: 'Categorías', icono: '🏷️' },
    { ruta: '/admin/reportes', texto: 'Reportes', icono: '📊' },
    { ruta: '/admin/usuarios', texto: 'Usuarios', icono: '👤' }
]