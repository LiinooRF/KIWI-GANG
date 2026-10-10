import { useState } from 'react'
import { listarCategorias, agregarCategoria, eliminarCategoria, listarProductos } from '../data/db.js'

function AdminCategorias() {
  // En el estado se guarda una COPIA de la lista ([...]). db.js modifica su propio arreglo
  // con push, y si el estado apuntara a ese mismo arreglo, React no notaría el cambio
  // y la pantalla no se actualizaría.
  const [categorias, setCategorias] = useState(() => [...listarCategorias()])
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')

  // Vuelve a leer la lista desde db.js y actualiza la pantalla
  function refrescar() {
    setCategorias([...listarCategorias()])
  }

  function handleAgregar(e) {
    e.preventDefault()
    setError('')
    setMensaje('')

    const nombreLimpio = nombre.trim()

    if (nombreLimpio === '') {
      setError('El nombre de la categoría es obligatorio.')
      return
    }

    // Se compara en minúsculas para que "frágil" y "Frágil" cuenten como la misma
    const repetida = categorias.some((c) => c.nombre.toLowerCase() === nombreLimpio.toLowerCase())
    if (repetida) {
      setError('Ya existe una categoría con ese nombre.')
      return
    }

    agregarCategoria({ nombre: nombreLimpio, descripcion: descripcion.trim() })
    refrescar()
    setNombre('')
    setDescripcion('')
    setMensaje('Categoría "' + nombreLimpio + '" agregada.')
  }

  function handleEliminar(categoria) {
    setError('')
    setMensaje('')

    // Cada producto guarda el NOMBRE de su categoría. Si se borrara una que está en uso,
    // esos productos quedarían con una categoría que ya no existe.
    const enUso = listarProductos().filter((p) => p.categoria === categoria.nombre).length
    if (enUso > 0) {
      setError('No se puede eliminar "' + categoria.nombre + '": tiene ' + enUso + ' producto(s) asignado(s).')
      return
    }

    if (!window.confirm('¿Eliminar la categoría "' + categoria.nombre + '"?')) {
      return
    }

    eliminarCategoria(categoria.id)
    refrescar()
    setMensaje('Categoría "' + categoria.nombre + '" eliminada.')
  }

  return (
    <>
      <div className="admin-topbar">
        <h1>Categorías</h1>
      </div>

      <section className="admin-panel">
        <h2>Nueva categoría</h2>
        <form onSubmit={handleAgregar}>
          <div className="row g-3">
            <div className="col-md-4">
              <label htmlFor="nombreCategoria" className="form-label">Nombre</label>
              <input type="text" className="form-control" id="nombreCategoria"
                maxLength="50" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>
            <div className="col-md-8">
              <label htmlFor="descripcionCategoria" className="form-label">Descripción (opcional)</label>
              <input type="text" className="form-control" id="descripcionCategoria"
                maxLength="150" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            </div>
          </div>
          <button className="btn btn-success mt-3" type="submit">Agregar categoría</button>
        </form>

        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {mensaje && <div className="alert alert-success mt-3">{mensaje}</div>}
      </section>

      <section className="admin-panel mt-3">
        <h2>Categorías existentes</h2>
        {categorias.length === 0 ? (
          <p>No hay categorías.</p>
        ) : (
          <div className="tabla-scroll">
            <table className="tabla-paquetes">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {categorias.map((categoria) => (
                  <tr key={categoria.id}>
                    <td>{categoria.nombre}</td>
                    <td>{categoria.descripcion}</td>
                    <td>
                      <button className="btn btn-sm btn-danger" onClick={() => handleEliminar(categoria)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  )
}

export default AdminCategorias