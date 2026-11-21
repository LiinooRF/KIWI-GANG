import { useState, useEffect } from "react";
import TarjetaProducto from "../components/TarjetaProducto";
import { pedirApi } from "../data/auth.js";
import { useCarrito } from "../context/CarritoContext";

function Productos() {
  // los productos ahora vienen del api, parten vacios hasta que llegue la respuesta
  const [productos, setProductos] = useState([]);
  // true mientras se espera al api, para mostrar un mensaje de carga
  const [cargando, setCargando] = useState(true);
  // si el api no responde se guarda el mensaje para mostrarlo
  const [error, setError] = useState("");

  //Se agrega el Carrito
  const { agregarAlCarrito } = useCarrito();
  //Para la barra de busqueda, es la var que se va a actualizar.
  const [busqueda, setBusqueda] = useState("");

  // useEffect con [] se ejecuta una sola vez cuando se abre la pagina
  useEffect(() => {
    async function cargarProductos() {
      try {
        const respuesta = await pedirApi("/productos");
        // ok es false si el api responde con error, por ejemplo 500
        if (!respuesta.ok) {
          throw new Error("el api respondio con error");
        }
        const datos = await respuesta.json();
        setProductos(datos);
      } catch {
        // entra aca si el backend esta caido o respondio con error
        setError("No se pudieron cargar los productos. Intenta más tarde.");
      } finally {
        // finally se ejecuta siempre, haya salido bien o mal
        setCargando(false);
      }
    }
    cargarProductos();
  }, []);

  //Filtra productos sin importar caps ni tildes, aqui se define que e slo que entra en el map para el muestreo de tarjetas.
  const productosFiltrados = productos.filter((producto) => {
    const limpiar = (texto) => texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    return limpiar(producto.nombre).includes(limpiar(busqueda));
  });

  return (
    <main>
      <section className="hero">
        <h1>Productos</h1>
        <p>Solicita envios, servicios, o herramientas.</p>

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
        {/* mientras carga o si hubo error se muestra un mensaje en vez de dejar la pagina en blanco */}
        {cargando && <p className="text-muted mt-4">Cargando productos...</p>}
        {error && <p className="error mt-4">{error}</p>}

        {!cargando && !error && (
          productosFiltrados.length > 0 ? (
            productosFiltrados.map((producto) => (
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
            <p className="text-muted mt-4">No se encontraron productos que coincidan.</p>
          )
        )}
      </div>
    </main>
  );
}

export default Productos;