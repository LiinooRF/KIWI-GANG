import { createContext, useContext, useState, useEffect } from 'react';
import { cerrarSesion, guardarSesion, obtenerSesion } from '../data/db';

//Crea el context, el contenedor global donde vive la info de la sesion.
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
 //constantes para manejar el estado del usuario.
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    //se le asigna el usuario de localstorage a usuarioGuardado, al tener algo guardado es verdadero, y esto se guarda en el set.
    //Esto es para cuando se recarga la pagina, rescata al usuairo en sesion de no haberla cerrado.
    const usuarioGuardado = obtenerSesion()
    if (usuarioGuardado) {
      setUsuario(usuarioGuardado);
    }
    setCargando(false);
  }, []); //Los corchetes vacios detienen la ejecucion de esto tras la primera vez. asi solo lo hace al cargar la pagina.

  //Al logearse, hace que los datos ingresados se ordenen en un JSON "usuario_sesion" y lo guarda en localstorage.
  const login = (datosUsuario) => {
    guardarSesion(datosUsuario)
    setUsuario(obtenerSesion());
  };

  //Al cerrar sesion, localstorage quita el item y vuelve el usuario actual a null.
  const logout = () => {
    cerrarSesion();
    setUsuario(null);
  };

  return (
    //Reparte esta informacion a las vistas que la utilizen.
    <AuthContext.Provider value={{ usuario, cargando, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

//useAuth toma el valor del context de autenticacion a utilizar para poder llamarlo directamente.
export const useAuth = () => useContext(AuthContext);