//funciones para trabajar con los datos, hacen de base de datos falsa
//todo se guarda en localstorage asi no se pierde al recargar la pagina

import { productos, categorias, usuarios } from './productos.js'

//las claves con las que guardamos en el navegador
const CLAVE_PRODUCTOS = "kiwiProductos"
const CLAVE_CATEGORIAS = "kiwiCategorias"
const CLAVE_USUARIOS = "kiwiUsuarios"

//lee lo guardado, y si es la primera vez que se abre deja los datos iniciales
function cargar(clave, datosIniciales) {
  const guardado = localStorage.getItem(clave)
  if (guardado === null) {
    localStorage.setItem(clave, JSON.stringify(datosIniciales))
    return datosIniciales
  }
  return JSON.parse(guardado)
}

function guardar(clave, lista) {
  localStorage.setItem(clave, JSON.stringify(lista))
}

let listaProductos = cargar(CLAVE_PRODUCTOS, productos)
let listaCategorias = cargar(CLAVE_CATEGORIAS, categorias)
let listaUsuarios = cargar(CLAVE_USUARIOS, usuarios)

// ---------- productos ----------

export function listarProductos() {
  return listaProductos
}

export function buscarProductoPorId(id) {
  for (let i = 0; i < listaProductos.length; i++) {
    if (listaProductos[i].id === Number(id)) {
      return listaProductos[i]
    }
  }
  return null
}

export function buscarProductosPorCategoria(categoria) {
  return listaProductos.filter(p => p.categoria === categoria)
}

export function listarOfertas() {
  return listaProductos.filter(p => p.enOferta === true)
}

export function listarProductosCriticos() {
  return listaProductos.filter(p => p.stock <= p.stockCritico)
}

export function agregarProducto(producto) {
  producto.id = nuevoId(listaProductos)
  listaProductos.push(producto)
  guardar(CLAVE_PRODUCTOS, listaProductos)
  return producto
}

export function editarProducto(id, datos) {
  const producto = buscarProductoPorId(id)
  if (producto === null) {
    return null
  }
  producto.nombre = datos.nombre
  producto.descripcion = datos.descripcion
  producto.precio = datos.precio
  producto.stock = datos.stock
  producto.stockCritico = datos.stockCritico
  producto.categoria = datos.categoria
  producto.enOferta = datos.enOferta
  producto.precioOferta = datos.precioOferta
  guardar(CLAVE_PRODUCTOS, listaProductos)
  return producto
}

export function eliminarProducto(id) {
  listaProductos = listaProductos.filter(p => p.id !== Number(id))
  guardar(CLAVE_PRODUCTOS, listaProductos)
}

// ---------- categorias ----------

export function listarCategorias() {
  return listaCategorias
}

export function agregarCategoria(categoria) {
  categoria.id = nuevoId(listaCategorias)
  listaCategorias.push(categoria)
  guardar(CLAVE_CATEGORIAS, listaCategorias)
  return categoria
}

export function eliminarCategoria(id) {
  listaCategorias = listaCategorias.filter(c => c.id !== Number(id))
  guardar(CLAVE_CATEGORIAS, listaCategorias)
}

// ---------- usuarios ----------

export function listarUsuarios() {
  return listaUsuarios
}

export function buscarUsuarioPorCorreo(correo) {
  for (let i = 0; i < listaUsuarios.length; i++) {
    if (listaUsuarios[i].correo === correo) {
      return listaUsuarios[i]
    }
  }
  return null
}

export function agregarUsuario(usuario) {
  usuario.id = nuevoId(listaUsuarios)
  listaUsuarios.push(usuario)
  guardar(CLAVE_USUARIOS, listaUsuarios)
  return usuario
}

export function editarUsuario(id, datos) {
  for (let i = 0; i < listaUsuarios.length; i++) {
    if (listaUsuarios[i].id === Number(id)) {
      listaUsuarios[i] = { ...listaUsuarios[i], ...datos }
      guardar(CLAVE_USUARIOS, listaUsuarios)
      return listaUsuarios[i]
    }
  }
  return null
}

export function eliminarUsuario(id) {
  listaUsuarios = listaUsuarios.filter(u => u.id !== Number(id))
  guardar(CLAVE_USUARIOS, listaUsuarios)
}

// ---------- carrito ----------

const CLAVE_CARRITO = "kiwiCarrito"
let listaCarrito = cargar(CLAVE_CARRITO, [])

export function listarCarrito() {
  return listaCarrito
}

export function agregarAlCarrito(producto, cantidad) {
  const existente = listaCarrito.find(item => item.id === producto.id)

  if (existente) {
    existente.cantidad = existente.cantidad + cantidad
  } else {
    listaCarrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.enOferta ? producto.precioOferta : producto.precio,
      imagen: producto.imagen,
      cantidad: cantidad
    })
  }

  guardar(CLAVE_CARRITO, listaCarrito)
  return listaCarrito
}

export function actualizarCantidadCarrito(id, cantidad) {
  const item = listaCarrito.find(item => item.id === Number(id))
  if (item) {
    item.cantidad = cantidad
    guardar(CLAVE_CARRITO, listaCarrito)
  }
  return listaCarrito
}

export function quitarDelCarrito(id) {
  listaCarrito = listaCarrito.filter(item => item.id !== Number(id))
  guardar(CLAVE_CARRITO, listaCarrito)
  return listaCarrito
}

export function vaciarCarrito() {
  listaCarrito = []
  guardar(CLAVE_CARRITO, listaCarrito)
  return listaCarrito
}

// ---------- utilidad ----------

//para no repetir ids, buscamos el mayor y le sumamos uno
function nuevoId(lista) {
  let mayor = 0
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].id > mayor) {
      mayor = lista[i].id
    }
  }
  return mayor + 1
}

//por si queremos volver a los datos de ejemplo
export function reiniciarDatos() {
  localStorage.removeItem(CLAVE_PRODUCTOS)
  localStorage.removeItem(CLAVE_CATEGORIAS)
  localStorage.removeItem(CLAVE_USUARIOS)
  listaProductos = cargar(CLAVE_PRODUCTOS, productos)
  listaCategorias = cargar(CLAVE_CATEGORIAS, categorias)
  listaUsuarios = cargar(CLAVE_USUARIOS, usuarios)
}
