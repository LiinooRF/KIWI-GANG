import { Link } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../js/permisos';

function Footer() {
  //se edita el footer para filtrar la aparicion del link de admin por user.
  const { usuario } = useAuth();
  return (
    <footer className="mt-auto">
      <p>KiwiExpress - Transporte y distribución de paquetes</p>
      <p>📞 +56 9 1234 5678 | ✉️ contacto@kiwiexpress.cl</p>
      <p><Link to="/nosotros">Conócenos</Link> | <Link to="/contacto">Contáctanos</Link></p>
      {(usuario?.rol?.toLowerCase() === ROLES.ADMIN || usuario?.rol?.toLowerCase() === ROLES.OPERARIO) && (
        <p> <Link to={usuario.rol.toLowerCase() === ROLES.OPERARIO ? "/admin/productos" : "/admin"}> Administración</Link></p>
      )}
    </footer>
  )
}

export default Footer;
