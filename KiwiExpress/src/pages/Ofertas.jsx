import { useState, useEffect } from "react";
import TarjetaProducto from "../components/TarjetaProducto";
import { pedirApi } from "../data/auth.js";
import { useCarrito } from "../context/CarritoContext";

function Ofertas() {
  //Se agrega el Carrito
  const { agregarAlCarrito } = useCarrito();
  // mismo patron que productos, datos, cargando y error
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarProductos() {
      try {
        const respuesta = await pedirApi("/productos");
        if (!respuesta.ok) {
          throw new Error("el api respondio con error");
        }
        const datos = await respuesta.json();
        setProductos(datos);
      } catch {
        setError("No se pudieron cargar las ofertas. Intenta más tarde.");
      } finally {
        setCargando(false);
      }
    }
    cargarProductos();
  }, []);

  // el api no tiene una ruta de ofertas, asi que se piden todos y se dejan solo los que estan en oferta
  const soloOfertas = productos.filter((producto) => producto.enOferta);

  return (
    <main>
      <section className="hero">
        <h1>Productos en Oferta</h1>
        <p>Aqui puedes encontrar productos y servicios que se encuentran en oferta.</p>
      </section>

      <div className="d-flex flex-wrap gap-4 justify-content-center">
        {cargando && <p className="text-muted mt-4">Cargando ofertas...</p>}
        {error && <p className="error mt-4">{error}</p>}

        {!cargando && !error && (
          soloOfertas.length > 0 ? (
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
          )
        )}
      </div>
    </main>
  );
}

export default Ofertas;