import { useParams, Link } from 'react-router-dom'
import { Row, Col, Card, Button, Badge } from 'react-bootstrap'
import { buscarProductoPorId } from '../data/db.js'

function DetalleProducto() {
  //el id viene en la url, por ejemplo /productos/3
  const { id } = useParams()
  const producto = buscarProductoPorId(id)

  //si alguien escribe un id que no existe le avisamos
  if (producto === null) {
    return (
      <div className="hero text-center">
        <h1>Servicio no encontrado</h1>
        <p>El servicio que buscas no existe o fue dado de baja.</p>
        <Link to="/productos" className="btn btn-success">Volver a los servicios</Link>
      </div>
    )
  }

  const precioFinal = producto.enOferta ? producto.precioOferta : producto.precio

  return (
    <Row>
      <Col md={5} className="mb-3">
        <Card>
          <Card.Body className="text-center py-5">
            <span style={{ fontSize: '4rem' }}>📦</span>
            <p className="text-muted mt-2">{producto.codigo}</p>
          </Card.Body>
        </Card>
      </Col>

      <Col md={7}>
        <h1>{producto.nombre}</h1>
        <p>
          <Badge bg="secondary">{producto.categoria}</Badge>
          {producto.enOferta && <Badge bg="danger" className="ms-2">En oferta</Badge>}
        </p>

        <p>{producto.descripcion}</p>

        <h2 className="text-success">
          ${precioFinal}
          {producto.enOferta && (
            <small className="text-muted ms-2">
              <s>${producto.precio}</s>
            </small>
          )}
        </h2>

        <p>
          {producto.stock > 0
            ? <span>Disponible ({producto.stock} unidades)</span>
            : <span className="text-danger">Sin stock por ahora</span>}
        </p>

        <Button variant="success" disabled={producto.stock === 0}>
          Añadir al carrito
        </Button>
        <Link to="/productos" className="btn btn-outline-secondary ms-2">Volver</Link>
      </Col>
    </Row>
  )
}

export default DetalleProducto;
