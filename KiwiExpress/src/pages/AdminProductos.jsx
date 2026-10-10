import { useState } from 'react'
import { listarProductos, listarCategorias, editarProducto, eliminarProducto } from '../data/db.js'

// Formatea un número como pesos chilenos: 3990 -> $3.990
const pesos = (n) => '$' + n.toLocaleString('es-CL')

function AdminProductos() {
  // Se guarda una COPIA de la lista ([...]). db.js modifica su propio arreglo, y si el estado
  // apuntara a ese mismo arreglo, React no notaría el cambio y la pantalla no se actualizaría.
  const [productos, setProductos] = useState(() => [...listarProductos()])
  const categorias = listarCategorias()

  // id del producto que se está editando, o null si no se edita ninguno
  const [editandoId, setEditandoId] = useState(null)
  const [form, setForm] = useState({ nombre: '', descripcion: '', precio: '', categoria: '' })
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')

  // Vuelve a leer la lista desde db.js y actualiza la pantalla
  function refrescar() {
    setProductos([...listarProductos()])
  }

  function handleEditar(producto) {
    setError('')
    setMensaje('')
    setEditandoId(producto.id)
    // Se cargan en el formulario los valores actuales del producto
    setForm({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      categoria: producto.categoria
    })
  }

  // Un solo handler para todos los campos: usa el atributo "name" del input para saber
  // cuál propiedad de "form" actualizar (propiedad calculada [name])
  function handleChange(e) {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  function handleCancelar() {
    setEditandoId(null)
    setError('')
  }

  function handleGuardar(e) {
    e.preventDefault()
    setError('')
    setMensaje('')

    const nombre = form.nombre.trim()
    const descripcion = form.descripcion.trim()
    const precio = Number(form.precio)

    if (nombre === '') {
      setError('El nombre es obligatorio.')
      return
    }
    if (descripcion === '') {
      setError('La descripción es obligatoria.')
      return
    }
    // El precio debe ser un número entero (pesos chilenos) y mayor a 0
    if (form.precio === '' || !Number.isInteger(precio) || precio < 1) {
      setError('El precio debe ser un número entero mayor a 0.')
      return
    }
    if (form.categoria === '') {
      setError('Selecciona una categoría.')
      return
    }

    // IMPORTANTE: editarProducto de db.js reemplaza TODOS los campos del producto con lo que
    // reciba (stock, oferta, etc.). Por eso se parte de una copia del producto original con {...}
    // y solo se pisan los cuatro campos que se editan aquí: así los demás no se pierden.
    const original = productos.find((p) => p.id === editandoId)
    editarProducto(editandoId, { ...original, nombre, descripcion, precio, categoria: form.categoria })

    refrescar()
    setEditandoId(null)
    setMensaje('Producto "' + nombre + '" actualizado.')
  }

  function handleEliminar(producto) {
    setError('')
    setMensaje('')

    if (!window.confirm('¿Eliminar el producto "' + producto.nombre + '"?')) {
      return
    }

    eliminarProducto(producto.id)
    // Si justo se estaba editando este producto, se cierra el formulario
    if (editandoId === producto.id) {
      setEditandoId(null)
    }
    refrescar()
    setMensaje('Producto "' + producto.nombre + '" eliminado.')
  }

  return (
    <>
      <div className="admin-topbar">
        <h1>Productos</h1>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {mensaje && <div className="alert alert-success">{mensaje}</div>}

      {/* El formulario solo se dibuja mientras hay un producto en edición */}
      {editandoId !== null && (
        <section className="admin-panel mb-3">
          <h2>Editar producto</h2>
          <form onSubmit={handleGuardar}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="nombre" name="nombre"
                  maxLength="100" value={form.nombre} onChange={handleChange} />
              </div>

              <div className="col-md-3">
                <label htmlFor="precio" className="form-label">Precio</label>
                <input type="number" className="form-control" id="precio" name="precio"
                  min="1" value={form.precio} onChange={handleChange} />
              </div>

              <div className="col-md-3">
                <label htmlFor="categoria" className="form-label">Categoría</label>
                {/* El value es el NOMBRE de la categoría, porque cada producto guarda el nombre */}
                <select className="form-select" id="categoria" name="categoria"
                  value={form.categoria} onChange={handleChange}>
                  <option value="">Selecciona una categoría</option>
                  {categorias.map((c) => (
                    <option key={c.id} value={c.nombre}>{c.nombre}</option>
                  ))}
                </select>
              </div>

              <div className="col-12">
                <label htmlFor="descripcion" className="form-label">Descripción</label>
                <textarea className="form-control" id="descripcion" name="descripcion"
                  rows="3" maxLength="200" value={form.descripcion} onChange={handleChange}></textarea>
              </div>
            </div>

            <button type="submit" className="btn btn-success mt-3">Guardar cambios</button>
            <button type="button" className="btn btn-outline-secondary mt-3 ms-2" onClick={handleCancelar}>
              Cancelar
            </button>
          </form>
        </section>
      )}

      <section className="admin-panel">
        <h2>Productos de la tienda</h2>
        <div className="tabla-scroll">
          <table className="tabla-paquetes">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.nombre}</td>
                  <td>{producto.categoria}</td>
                  <td>
                    {pesos(producto.precio)}
                    {/* Si está en oferta se muestra su precio de oferta, que no se edita aquí */}
                    {producto.enOferta && <div><small>Oferta: {pesos(producto.precioOferta)}</small></div>}
                  </td>
                  {/* El stock es solo para consultar, no se edita desde esta vista */}
                  <td>{producto.stock}</td>
                  <td>
                    <button className="btn btn-sm btn-success" onClick={() => handleEditar(producto)}>
                      Editar
                    </button>
                    <button className="btn btn-sm btn-danger ms-1" onClick={() => handleEliminar(producto)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

export default AdminProductos