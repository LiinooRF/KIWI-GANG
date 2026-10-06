//funciones para trabajar con los datos, hacen de base de datos falsa
//el guardado en localstorage se agrega en el issue de persistencia

import { productos, categorias, usuarios } from './productos.js'

let listaProductos = productos
let listaCategorias = categorias
let listaUsuarios = usuarios

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
  return producto
}

export function eliminarProducto(id) {
  listaProductos = listaProductos.filter(p => p.id !== Number(id))
}

// ---------- categorias ----------

export function listarCategorias() {
  return listaCategorias
}

export function agregarCategoria(categoria) {
  categoria.id = nuevoId(listaCategorias)
  listaCategorias.push(categoria)
  return categoria
}

export function eliminarCategoria(id) {
  listaCategorias = listaCategorias.filter(c => c.id !== Number(id))
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
  return usuario
}

export function editarUsuario(id, datos) {
  for (let i = 0; i < listaUsuarios.length; i++) {
    if (listaUsuarios[i].id === Number(id)) {
      listaUsuarios[i] = { ...listaUsuarios[i], ...datos }
      return listaUsuarios[i]
    }
  }
  return null
}

export function eliminarUsuario(id) {
  listaUsuarios = listaUsuarios.filter(u => u.id !== Number(id))
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
