import Header from './Header.jsx'
import Footer from './Footer.jsx'

//envuelve todas las paginas asi el header y el footer no se repiten en cada vista
function Layout({ children }) {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="container py-4">
        {children}
      </main>
      <Footer />
      </div>
    </>
  )
}

export default Layout;
