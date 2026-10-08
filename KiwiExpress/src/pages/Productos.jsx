
import {useState} from "react";
import TarjetaProducto from "../components/TarjetaProducto";
import { listarProductos } from '../data/db.js';
function Productos() {
  const productos = listarProductos();

  //Para la barra de busqueda, es la var que se va a actualizar.
  const [busqueda, setBusqueda] = useState("");

  //Filtra productos sin importar caps ni tildes.
  const productosFiltrados = productos.filter((producto) => {
  const limpiar = (texto) => texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  return limpiar(producto.nombre).includes(limpiar(busqueda));
  })

  return (
    <main>
      <section className="hero">
        <h1>Productos</h1>
        <p>Solicita envios especiales, o herramientas para los mismos.</p>

        {/*Buscador*/}
        <div className="mx-auto" style={{ maxWidth: "400px" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar producto..."
            value={busqueda} //cambia el estado segun lo escrito
            onChange={(e) => setBusqueda(e.target.value)} // cada que cambie, se actualiza el estado.
          />
        </div>

      </section>
      <div className="d-flex flex-wrap gap-4 justify-content-center my-4">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((producto) => (
      
          <TarjetaProducto 
            key={producto.id} 
            nombre={producto.nombre} 
            precio={producto.precio} 
            stock={producto.stock} 
            imagen={producto.imagen}
            enOferta={producto.enOferta}         
            precioOferta={producto.precioOferta}
            onAgregarCarrito={() => console.log(`Agregado: ${producto.nombre}`)}
          />
          ))
        ) : (
          <p className="text-muted mt-4">No se encontraron productos que coincidan.</p>
        )}
      </div>
    </main>
  );
}

export default Productos;
