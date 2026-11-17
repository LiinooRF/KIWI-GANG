// Pruebas de auth.js. No hay backend corriendo, asi que fetch se reemplaza con un espia
// (spyOn) que devuelve la respuesta que queremos probar.
import {
  iniciarSesionApi, pedirApi, tokenVigente, obtenerToken, guardarToken, borrarToken
} from '../src/data/auth.js'

// Arma un token falso con la forma de un jwt (la firma no importa en el frontend)
function tokenFalso(segundosQueDura) {
  const datos = { sub: 'admin@kiwi.cl', rol: 'administrador', exp: Math.floor(Date.now() / 1000) + segundosQueDura }
  return 'xxx.' + btoa(JSON.stringify(datos)) + '.firma'
}

function respuesta(status, cuerpo) {
  return Promise.resolve(new Response(JSON.stringify(cuerpo), { status }))
}

describe('auth.js', () => {
  // cada prueba parte sin token guardado
  beforeEach(() => borrarToken())
  afterEach(() => borrarToken())

  it('guarda el token cuando el login esta bien', async () => {
    const token = tokenFalso(3600)
    spyOn(window, 'fetch').and.returnValue(
      respuesta(200, { token, nombre: 'Rodrigo', correo: 'admin@kiwi.cl', rol: 'administrador' })
    )
    const usuario = await iniciarSesionApi('admin@kiwi.cl', 'admin123')

    expect(obtenerToken()).toBe(token)
    expect(usuario.rol).toBe('administrador')
    // la contraseña no queda guardada en ninguna parte
    expect(JSON.stringify(localStorage)).not.toContain('admin123')
  })

  it('devuelve null y no guarda nada si la clave esta mal', async () => {
    spyOn(window, 'fetch').and.returnValue(respuesta(401, {}))
    const usuario = await iniciarSesionApi('admin@kiwi.cl', 'mala')

    expect(usuario).toBeNull()
    expect(obtenerToken()).toBeNull()
  })

  it('manda el header Authorization con el token', async () => {
    guardarToken('abc123')
    const espia = spyOn(window, 'fetch').and.returnValue(respuesta(200, []))
    await pedirApi('/ordenes')

    const opciones = espia.calls.mostRecent().args[1]
    expect(opciones.headers.Authorization).toBe('Bearer abc123')
  })

  it('borra el token si el api responde 401', async () => {
    guardarToken('vencido')
    spyOn(window, 'fetch').and.returnValue(respuesta(401, {}))
    await pedirApi('/ordenes')

    expect(obtenerToken()).toBeNull()
  })

  it('sabe si el token esta vigente o vencido', () => {
    expect(tokenVigente(tokenFalso(3600))).toBeTrue()
    expect(tokenVigente(tokenFalso(-10))).toBeFalse()
    expect(tokenVigente('cualquier-cosa')).toBeFalse()
    expect(tokenVigente(null)).toBeFalse()
  })
})
