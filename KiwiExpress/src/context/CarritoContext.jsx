import { createContext, useContext, useState } from 'react'
import {
  listarCarrito,
  agregarAlCarrito as agregarAlCarritoDB,
  actualizarCantidadCarrito as actualizarCantidadCarritoDB,
  quitarDelCarrito as quitarDelCarritoDB,
  vaciarCarrito as vaciarCarritoDB
} from '../data/db.js'

const CarritoContext = createContext()

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(listarCarrito())

  function agregarAlCarrito(producto, cantidad) {
    const actualizado = agregarAlCarritoDB(producto, cantidad)
    setCarrito([...actualizado])
  }

  function actualizarCantidad(id, cantidad) {
    const actualizado = actualizarCantidadCarritoDB(id, cantidad)
    setCarrito([...actualizado])
  }

  function quitarDelCarrito(id) {
    const actualizado = quitarDelCarritoDB(id)
    setCarrito([...actualizado])
  }

  function vaciarCarrito() {
    const actualizado = vaciarCarritoDB()
    setCarrito([...actualizado])
  }

  const total = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0)
  const cantidadTotal = carrito.reduce((suma, item) => suma + item.cantidad, 0)

  const valor = {
    carrito,
    agregarAlCarrito,
    actualizarCantidad,
    quitarDelCarrito,
    vaciarCarrito,
    total,
    cantidadTotal
  }

  return (
    <CarritoContext.Provider value={valor}>
      {children}
    </CarritoContext.Provider>
  )
}

export function useCarrito() {
  return useContext(CarritoContext)
}