// Pruebas de db.js, la "base de datos falsa" del proyecto (guarda todo en localStorage).
// Son funciones simples que reciben datos y devuelven un resultado, sin React de por medio.
import {
  listarProductos, buscarProductoPorId, buscarProductosPorCategoria, listarOfertas,
  listarProductosCriticos, agregarProducto, editarProducto, eliminarProducto, descontarStock,
  listarCategorias, agregarCategoria, eliminarCategoria,
  listarUsuarios, buscarUsuarioPorCorreo, agregarUsuario, editarUsuario, eliminarUsuario,
  listarCarrito, agregarAlCarrito, actualizarCantidadCarrito, quitarDelCarrito, vaciarCarrito,
  guardarSesion, obtenerSesion, cerrarSesion,
  listarOrdenes, buscarOrdenPorNumero, agregarOrden
} from '../src/data/db.js'

// IMPORTANTE: Jasmine corre las pruebas en orden aleatorio y todas comparten los mismos datos
// (db.js carga las listas una sola vez). Por eso cada prueba que modifica algo lo deja como estaba:
// lo que agrega lo elimina y lo que edita lo restaura. Y cuando se necesita el original para
// restaurar, se guarda una copia con { ...objeto }, porque guardar el objeto directo seguiría
// apuntando al mismo y cambiaría junto con él.

// Un producto válido para las pruebas que necesitan crear uno
function productoNuevo() {
  return {
    codigo: 'KX-TEST-01',
    nombre: 'Producto de prueba',
    descripcion: 'Solo para pruebas',
    precio: 1000,
    stock: 10,
    stockCritico: 2,
    categoria: 'No Frágil',
    imagen: '',
    enOferta: false,
    precioOferta: 0
  }
}

describe('db.js - productos', () => {
  it('buscarProductoPorId encuentra el producto, incluso si el id llega como texto', () => {
    const primero = listarProductos()[0]

    expect(buscarProductoPorId(primero.id)).toBe(primero)
    // El id viaja como texto en la URL (/productos/1), por eso la función usa Number()
    expect(buscarProductoPorId(String(primero.id))).toBe(primero)
  })

  it('buscarProductoPorId devuelve null si el id no existe', () => {
    expect(buscarProductoPorId(99999)).toBeNull()
  })

  it('buscarProductosPorCategoria devuelve solo los productos de esa categoría', () => {
    const categoria = listarProductos()[0].categoria
    const resultado = buscarProductosPorCategoria(categoria)

    expect(resultado.length).toBeGreaterThan(0)
    expect(resultado.every((p) => p.categoria === categoria)).toBe(true)
  })

  it('listarOfertas devuelve solo los productos en oferta', () => {
    const ofertas = listarOfertas()

    expect(ofertas.every((p) => p.enOferta === true)).toBe(true)
    expect(ofertas.length).toBe(listarProductos().filter((p) => p.enOferta).length)
  })

  it('listarProductosCriticos incluye los productos con stock igual o menor al crítico', () => {
    // Se crea uno con poco stock a propósito, para no depender de los datos iniciales
    const creado = agregarProducto({ ...productoNuevo(), stock: 1, stockCritico: 5 })
    const criticos = listarProductosCriticos()

    expect(criticos.some((p) => p.id === creado.id)).toBe(true)
    expect(criticos.every((p) => p.stock <= p.stockCritico)).toBe(true)

    eliminarProducto(creado.id) // limpieza
  })

  it('agregarProducto le asigna un id y lo deja en la lista', () => {
    const antes = listarProductos().length
    const creado = agregarProducto(productoNuevo())

    expect(creado.id).toBeGreaterThan(0)
    expect(listarProductos().length).toBe(antes + 1)
    expect(buscarProductoPorId(creado.id).nombre).toBe('Producto de prueba')

    eliminarProducto(creado.id) // limpieza
  })

  it('editarProducto cambia los datos y devuelve el producto editado', () => {
    const original = { ...listarProductos()[0] } // copia para poder restaurar
    const editado = editarProducto(original.id, { ...original, nombre: 'Nombre editado', precio: 12345 })

    expect(editado.nombre).toBe('Nombre editado')
    expect(buscarProductoPorId(original.id).precio).toBe(12345)

    editarProducto(original.id, original) // limpieza: vuelve a los valores originales
    expect(buscarProductoPorId(original.id).nombre).toBe(original.nombre)
  })

  it('editarProducto devuelve null si el producto no existe', () => {
    expect(editarProducto(99999, {})).toBeNull()
  })

  it('eliminarProducto saca el producto de la lista', () => {
    // Se elimina uno recién creado, para no perder un producto de los datos iniciales
    const creado = agregarProducto(productoNuevo())
    eliminarProducto(creado.id)

    expect(buscarProductoPorId(creado.id)).toBeNull()
  })

  it('descontarStock resta unidades y nunca deja el stock negativo', () => {
    const original = { ...listarProductos()[0] }

    descontarStock(original.id, 1)
    expect(buscarProductoPorId(original.id).stock).toBe(original.stock - 1)

    // Si se piden más unidades de las que hay, queda en 0 (la función usa Math.max)
    descontarStock(original.id, original.stock + 100)
    expect(buscarProductoPorId(original.id).stock).toBe(0)

    // Un id que no existe no debe romper nada
    expect(() => descontarStock(99999, 1)).not.toThrow()

    editarProducto(original.id, original) // limpieza: devuelve el stock original
    expect(buscarProductoPorId(original.id).stock).toBe(original.stock)
  })
})

describe('db.js - categorías', () => {
  it('agregarCategoria la deja en la lista y eliminarCategoria la saca', () => {
    const antes = listarCategorias().length
    const creada = agregarCategoria({ nombre: 'Categoría de prueba', descripcion: 'Solo para pruebas' })

    expect(creada.id).toBeGreaterThan(0)
    expect(listarCategorias().length).toBe(antes + 1)

    eliminarCategoria(creada.id)
    expect(listarCategorias().length).toBe(antes)
  })
})

describe('db.js - usuarios', () => {
  it('buscarUsuarioPorCorreo encuentra al usuario, o devuelve null si no existe', () => {
    const usuario = listarUsuarios()[0]

    expect(buscarUsuarioPorCorreo(usuario.correo)).toBe(usuario)
    expect(buscarUsuarioPorCorreo('no-existe@gmail.com')).toBeNull()
  })

  it('agregarUsuario lo deja en la lista y eliminarUsuario lo saca', () => {
    const creado = agregarUsuario({
      run: '111111111', nombre: 'Prueba', apellidos: 'Unitaria',
      correo: 'prueba.unitaria@gmail.com', contrasena: 'abc123', comuna: 'Santiago', rol: 'cliente'
    })

    expect(buscarUsuarioPorCorreo('prueba.unitaria@gmail.com')).not.toBeNull()

    eliminarUsuario(creado.id)
    expect(buscarUsuarioPorCorreo('prueba.unitaria@gmail.com')).toBeNull()
  })

  it('editarUsuario cambia solo los datos enviados y conserva el resto', () => {
    const original = { ...listarUsuarios()[0] }
    const editado = editarUsuario(original.id, { nombre: 'Nombre editado' })

    expect(editado.nombre).toBe('Nombre editado')
    expect(editado.correo).toBe(original.correo) // lo que no se envía queda igual

    editarUsuario(original.id, { nombre: original.nombre }) // limpieza
  })

  it('editarUsuario devuelve null si el usuario no existe', () => {
    expect(editarUsuario(99999, { nombre: 'x' })).toBeNull()
  })
})

describe('db.js - carrito', () => {
  // El carrito vive en localStorage, así que cada prueba parte con uno vacío
  beforeEach(() => {
    vaciarCarrito()
  })

  it('agregarAlCarrito agrega el producto con su precio normal', () => {
    const normal = listarProductos().find((p) => !p.enOferta)
    agregarAlCarrito(normal, 2)
    const item = listarCarrito()[0]

    expect(item.id).toBe(normal.id)
    expect(item.cantidad).toBe(2)
    expect(item.precio).toBe(normal.precio)
  })

  it('agregarAlCarrito usa el precio de oferta si el producto está en oferta', () => {
    const enOferta = listarProductos().find((p) => p.enOferta)
    agregarAlCarrito(enOferta, 1)

    expect(listarCarrito()[0].precio).toBe(enOferta.precioOferta)
  })

  it('si el producto ya estaba en el carrito, suma las cantidades en vez de repetirlo', () => {
    const producto = listarProductos()[0]
    agregarAlCarrito(producto, 1)
    agregarAlCarrito(producto, 2)

    expect(listarCarrito().length).toBe(1)
    expect(listarCarrito()[0].cantidad).toBe(3)
  })

  it('el carrito se guarda en localStorage', () => {
    agregarAlCarrito(listarProductos()[0], 1)

    // localStorage solo guarda texto, por eso se convierte de vuelta con JSON.parse
    const guardado = JSON.parse(localStorage.getItem('kiwiCarrito'))
    expect(guardado.length).toBe(1)
  })

  it('actualizarCantidadCarrito cambia la cantidad y no falla si el id no existe', () => {
    const producto = listarProductos()[0]
    agregarAlCarrito(producto, 1)

    actualizarCantidadCarrito(producto.id, 5)
    expect(listarCarrito()[0].cantidad).toBe(5)

    expect(() => actualizarCantidadCarrito(99999, 3)).not.toThrow()
  })

  it('quitarDelCarrito saca solo el producto indicado', () => {
    const [a, b] = listarProductos()
    agregarAlCarrito(a, 1)
    agregarAlCarrito(b, 1)

    quitarDelCarrito(a.id)

    expect(listarCarrito().length).toBe(1)
    expect(listarCarrito()[0].id).toBe(b.id)
  })

  it('vaciarCarrito deja el carrito sin productos', () => {
    agregarAlCarrito(listarProductos()[0], 1)
    vaciarCarrito()

    expect(listarCarrito().length).toBe(0)
  })
})

describe('db.js - sesión', () => {
  beforeEach(() => {
    cerrarSesion()
  })

  it('obtenerSesion devuelve null si nadie inició sesión', () => {
    expect(obtenerSesion()).toBeNull()
  })

  it('guardarSesion guarda al usuario sin su contraseña', () => {
    const usuario = listarUsuarios()[0]
    guardarSesion(usuario)
    const sesion = obtenerSesion()

    expect(sesion.correo).toBe(usuario.correo)
    // La contraseña nunca debe quedar guardada en la sesión
    expect(sesion.contrasena).toBeUndefined()
  })

  it('cerrarSesion borra la sesión guardada', () => {
    guardarSesion(listarUsuarios()[0])
    cerrarSesion()

    expect(obtenerSesion()).toBeNull()
  })
})

describe('db.js - órdenes', () => {
  it('agregarOrden guarda la orden con su número y fecha, y se puede buscar', () => {
    const antes = listarOrdenes().length
    const orden = agregarOrden({
      cliente: { nombre: 'Ana', apellidos: 'Prueba', correo: 'ana@gmail.com', telefono: '' },
      direccion: { calle: 'Calle 1', depto: '', region: 'Región Metropolitana', comuna: 'Santiago', indicaciones: '' },
      items: [{ id: 1, nombre: 'Producto', precio: 1000, cantidad: 2 }],
      total: 2000
    })

    expect(listarOrdenes().length).toBe(antes + 1)
    expect(orden.numero.startsWith('KX-ORD-')).toBe(true)
    expect(orden.fecha).toBeTruthy()
    expect(buscarOrdenPorNumero(orden.numero)).toBe(orden)
  })

  it('buscarOrdenPorNumero devuelve null si el número no existe', () => {
    expect(buscarOrdenPorNumero('KX-ORD-0')).toBeNull()
  })
})