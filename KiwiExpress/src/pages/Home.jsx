import { Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

//los servicios los dejamos en un arreglo asi no repetimos la misma tarjeta tres veces
const servicios = [
  {
    titulo: '📦 Envío de paquetes',
    texto: 'Enviamos tus paquetes frágiles y no frágiles a cualquier comuna de la Región Metropolitana.'
  },
  {
    titulo: '🔍 Seguimiento en línea',
    texto: 'Con tu código de seguimiento puedes ver en qué etapa va tu paquete: creado, recibido, en tránsito, en reparto o entregado.',
    link: '/seguimiento',
    textoLink: 'Seguir mi paquete'
  },
  {
    titulo: '🚚 Reparto a domicilio',
    texto: 'Nuestros operarios entregan directo en la dirección del destinatario, con registro de cada entrega.'
  }
]

const pasos = [
  'Regístrate como cliente',
  'Solicita tu envío con los datos del destinatario',
  'Entrega tu paquete en la sucursal',
  'Sigue tu envío con el código KX hasta la entrega'
]

function Home() {
  return (
    <>
      <section className="hero text-center">
        <h1>Tus envíos rápidos y seguros</h1>
        <p>
          KiwiExpress es una empresa de transporte y distribución de paquetes en la
          Región Metropolitana. Solicita tu envío y sigue tu paquete en todo momento.
        </p>
        <Button as={Link} to="/productos" variant="success">Ver nuestros servicios</Button>
      </section>

      <section className="servicios mt-4">
        <h2>Nuestros servicios</h2>
        <Row>
          {servicios.map((servicio, i) => (
            <Col md={4} className="mb-3" key={i}>
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>{servicio.titulo}</Card.Title>
                  <Card.Text>{servicio.texto}</Card.Text>
                  {servicio.link && (
                    <Link to={servicio.link} className="btn btn-success">{servicio.textoLink}</Link>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <section className="pasos">
        <h2>¿Cómo funciona?</h2>
        <ol>
          {pasos.map((paso, i) => (
            <li key={i}>{paso}</li>
          ))}
        </ol>
      </section>
    </>
  )
}

export default Home;
