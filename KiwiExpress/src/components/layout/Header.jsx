import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useCarrito } from '../../context/CarritoContext.jsx'

//el navbar ahora usa react-bootstrap asi la hamburguesa funciona sin el js de bootstrap
function Header() {
  const { cantidadTotal, total } = useCarrito()

  return (
    <header>
      <Navbar expand="lg" variant="dark" className="navbar-kiwi">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">🥝 KiwiExpress</Navbar.Brand>
          <Navbar.Toggle aria-controls="menuNavbar" />
          <Navbar.Collapse id="menuNavbar">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Inicio</Nav.Link>
              <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
              <Nav.Link as={Link} to="/categorias">Categorías</Nav.Link>
              <Nav.Link as={Link} to="/ofertas">Ofertas</Nav.Link>
              <Nav.Link as={Link} to="/seguimiento">Seguimiento</Nav.Link>
              <Nav.Link as={Link} to="/nosotros">Nosotros</Nav.Link>
              <Nav.Link as={Link} to="/blogs">Blogs</Nav.Link>
              <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
              <Nav.Link as={Link} to="/login">Iniciar sesión</Nav.Link>
              <Nav.Link as={Link} to="/registro">Registro</Nav.Link>
              <Nav.Link as={Link} to="/carrito">
                🛒 Carrito ({cantidadTotal}) · ${total}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header;