import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="mt-auto">
      <p>KiwiExpress - Transporte y distribución de paquetes</p>
      <p>📞 +56 9 1234 5678 | ✉️ contacto@kiwiexpress.cl</p>
      <p><Link to="/nosotros">Conócenos</Link> | <Link to="/contacto">Contáctanos</Link></p>
      <p><Link to="/admin">Administración</Link></p>
    </footer>
  )
}

export default Footer;
