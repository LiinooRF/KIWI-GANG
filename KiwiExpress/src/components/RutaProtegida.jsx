import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const RutaProtegida = ({ rolesPermitidos }) => {
  const { usuario, cargando } = useAuth();

  // Espera a que termine de leer el localStorage antes de tomar una decisión
  if (cargando) {
    return <div className="container mt-5 text-center">Cargando...</div>;
  }

  // Si no hay usuario logeado o su rol no está en la lista permitida, lo manda al inicio (no permite buscar las direcciones bloqueadas por user desde la barra.)
  if (!usuario || (rolesPermitidos && !rolesPermitidos.includes(usuario.rol?.toLowerCase()))) {
    return <Navigate to="/" replace />;
  }

  // Si tiene permiso, deja pasar y renderiza las rutas.
  return <Outlet />;
};