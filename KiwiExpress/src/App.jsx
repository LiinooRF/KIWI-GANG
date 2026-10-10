import { HashRouter, Routes, Route, Outlet } from 'react-router-dom'
import { CarritoProvider } from './context/CarritoContext.jsx'
import Layout from './components/layout/Layout.jsx'
import AdminLayout from './components/admin/AdminLayout.jsx'

import Home from './pages/Home.jsx'
import Productos from './pages/Productos.jsx'
import DetalleProducto from './pages/DetalleProducto.jsx'
import Categorias from './pages/Categorias.jsx'
import Ofertas from './pages/Ofertas.jsx'
import Seguimiento from './pages/Seguimiento.jsx'
import Carrito from './pages/Carrito.jsx'
import Checkout from './pages/Checkout.jsx'
import Nosotros from './pages/Nosotros.jsx'
import Blogs from './pages/Blogs.jsx'
import Contacto from './pages/Contacto.jsx'
import Login from './pages/Login.jsx'
import Registro from './pages/Registro.jsx'
import NoEncontrada from './pages/NoEncontrada.jsx'
import PagoCorrecto from './pages/PagoCorrecto.jsx'
import PagoError from './pages/PagoError.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import AdminOrdenes from './pages/AdminOrdenes.jsx'
import AdminCategorias from './pages/AdminCategorias.jsx'
import AdminReportes from './pages/AdminReportes.jsx'

// Envuelve las páginas públicas con el Header y el Footer. <Outlet /> es el hueco
// donde se dibuja la página que corresponde a la URL. Layout no se modificó:
// sigue recibiendo la página como "children".
function LayoutPublico() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

function App() {
  return (
    <CarritoProvider>
      <HashRouter>
        <Routes>
          {/* Ruta sin path: no agrega nada a la URL, solo le pone el LayoutPublico
              a todas las rutas que tiene adentro */}
          <Route element={<LayoutPublico />}>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/productos/:id" element={<DetalleProducto />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/ofertas" element={<Ofertas />} />
            <Route path="/seguimiento" element={<Seguimiento />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/pago-correcto/:numero" element={<PagoCorrecto />} />
            <Route path="/pago-error" element={<PagoError />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="ordenes" element={<AdminOrdenes />} />
              <Route path="categorias" element={<AdminCategorias />} />
              <Route path="reportes" element={<AdminReportes />} />
            </Route>
            <Route path="*" element={<NoEncontrada />} />
          </Route>

          {/* Panel de administración: tiene su propio menú lateral y no lleva
              el Header ni el Footer públicos */}
          <Route path="/admin" element={<AdminLayout />}>
            {/* index = la página que se muestra en /admin exacto */}
            <Route index element={<AdminDashboard />} />
            {/* La #80 y la #81 agregan aquí sus rutas: ordenes, productos, categorias, reportes... */}
          </Route>
        </Routes>
      </HashRouter>
    </CarritoProvider>
  )
}

export default App