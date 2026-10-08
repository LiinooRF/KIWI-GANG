
import TarjetaProducto from "../components/layout/TarjetaProducto";
function Productos() {
  return (
    <main>
      <section className="hero">
        <h1>Productos</h1>
        <p>Solicita envios especiales, o herramientas para los mismos.</p>
      </section>
      <div className="d-flex flex-wrap gap-3">
        {/* Producto Normal */}
        <TarjetaProducto 
          nombre="Envío estándar"
          precio={40000}
          stock={10}
          imagen="https://ejemplo.com"
          //Como placeholder deje la funcion como una alerta de nav de un añadido exitoso.
          onAgregarCarrito={() => alert("Añadido al carrito")}
        />

        {/* Producto en Oferta */}
        <TarjetaProducto 
          nombre="Envío express"
          precio={60000}
          stock={9}
          descuento={20}
          imagen="https://ejemplo.com"
          precioFinal={30000}
          onAgregarCarrito={() => alert("Añadido al carrito")}
        />

        {/* Producto sin stock */}
        <TarjetaProducto 
          nombre="Kit de embalaje fragil"
          precio={60000}
          stock={0}
          descuento={50}
          imagen="https://ejemplo.com"
          precioFinal={15000}
          onAgregarCarrito={() => alert("Añadido al carrito")}
        />
      </div>
    </main>
  )
}

export default Productos;
