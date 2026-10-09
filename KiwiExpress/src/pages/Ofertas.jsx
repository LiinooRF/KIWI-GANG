import TarjetaProducto from "../components/TarjetaProducto";
import { listarProductos } from '../data/db.js';
import { useCarrito } from "../context/CarritoContext";
function Ofertas() {
  const productos = listarProductos();

  //Se agrega el Carrito
  const { agregarAlCarrito } = useCarrito();
  //Solo productos en oferta. (Existe funcion en db.js)
  const soloOfertas = productos.filter((producto) => producto.enOferta === true);

  return (
  <main>
    <section className="hero">
        <h1>Productos en Oferta</h1>
        <p>Aqui puedes encontrar productos y servicios que se encuentran en oferta.</p>
    </section>

    <div className="d-flex flex-wrap gap-4 justify-content-center">
        {soloOfertas.length > 0 ? (
          soloOfertas.map((producto) => (
            <TarjetaProducto 
              key={producto.id} 
              nombre={producto.nombre} 
              precio={producto.precio} 
              stock={producto.stock} 
              imagen={producto.imagen}
              enOferta={producto.enOferta}         
              precioOferta={producto.precioOferta}
              descripcion={producto.descripcion}
              onAgregarCarrito={() => agregarAlCarrito(producto, 1)} 
            />
          ))
        ) : (
          <p className="text-muted mt-4 fs-5">Actualmente, no hay ofertas disponibles.</p>
        )}
      </div>
  </main>
  )
}

export default Ofertas;
