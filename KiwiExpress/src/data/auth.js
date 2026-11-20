// Funciones para iniciar sesion contra el backend y mandar el token en cada llamada.
// El token es lo unico que se guarda: la contraseña se manda en el login y se olvida.

// La url del api sale de la variable VITE_API_URL (ver .env.example).
// Si no viene se usa la del backend corriendo en local.
const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:8080/api/v1'

const CLAVE_TOKEN = 'kiwiToken'

export function guardarToken(token) {
  localStorage.setItem(CLAVE_TOKEN, token)
}

export function obtenerToken() {
  return localStorage.getItem(CLAVE_TOKEN)
}

export function borrarToken() {
  localStorage.removeItem(CLAVE_TOKEN)
}

// Un token jwt tiene 3 partes separadas por puntos y la del medio es un json en base64.
// Aca se lee para saber si ya vencio (exp viene en segundos).
export function tokenVigente(token) {
  try {
    const parte = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    const datos = JSON.parse(atob(parte))
    return datos.exp * 1000 > Date.now()
  } catch {
    // si el token viene malo o no hay token
    return false
  }
}

// Manda correo y contraseña al api. Si estan bien guarda el token y devuelve
// los datos del usuario (nombre, correo y rol). Si no, devuelve null.
export async function iniciarSesionApi(correo, contrasena) {
  const respuesta = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo, contrasena })
  })
  if (!respuesta.ok) {
    return null
  }
  const datos = await respuesta.json()
  guardarToken(datos.token)
  return { nombre: datos.nombre, correo: datos.correo, rol: datos.rol }
}

// Igual que fetch pero agrega el header Authorization: Bearer con el token.
// Si el api responde 401 (token vencido o malo) se borra el token y se manda al login.
export async function pedirApi(ruta, opciones = {}) {
  const headers = { 'Content-Type': 'application/json', ...opciones.headers }
  const token = obtenerToken()
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  const respuesta = await fetch(`${API_URL}${ruta}`, { ...opciones, headers })
  if (respuesta.status === 401) {
    borrarToken()
    window.location.hash = '#/login'
  }
  return respuesta
}
