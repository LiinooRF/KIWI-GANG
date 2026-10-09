//Se utiliza para trackear el stock que queda.
import { useCarrito } from "../context/CarritoContext";
export default function TarjetaProducto({ 
  nombre, 
  precio, 
  stock, 
  imagen,
  descripcion,   
  enOferta = false, //Por defecto
  precioOferta = 0,
  onAgregarCarrito 
}) {

      const { carrito } = useCarrito();
      //se utiliza carrito para encontrar la cantidad de items en el carrito para restarlos al stock y definir su dispoinibilidad.
      const cantidadEnCarrito = carrito.find((item) => item.nombre === nombre)?.cantidad || 0;
      const stockRestante = stock - cantidadEnCarrito;

      //Se toman los valores del dataset.
      const tieneDescuento = enOferta;
      const precioFinal = precioOferta;


    return (
        //frame del componente, es un container para que compartan estilo y no hayan variaciones.
        <div className="card h-100 position-relative border-0 p-3 container my-5" style={{ maxWidth: "20rem" }}>
            {/*if true, then */}
            { tieneDescuento && (
                <span className="badge bg-danger position-absolute bottom-0 end-0 m-10 fs-9 ps-2">
                    En Oferta!
                </span>
            )}
        
        {/*NombreProp, h5 para "titulo" */} 
         <h5 className="card-title fw-bold text-dark mb-1">{nombre}</h5>
        
        {/*ImagenProp */}
        <img 
        src={imagen || "https://placeholder.com"}
        className="card-img-top"
        alt={nombre}
        style={{ height: "200px", objectFit: "contain"}}
        />

        <div className="mb-4 mt-auto d-flex flex-column gap-1">
            {/*Tiene descuento? true : false */}
            {tieneDescuento ? (
                <>
                {/*Hace un line through para tachar el precio antiguo y dejar el nuevo.*/}
                  <span className="text-muted text-decoration-line-through fs-6">
                    Precio original: ${precio}
                  </span>
                  <div className="d-flex align-items-center">
                    <span className="fs-2 fw-bold text-danger">
                      ${precioFinal}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <span className="text-muted small">
                    Precio:
                  </span>
                  <div className="d-flex align-items-center">
                    <span className="fs-2 fw-bold text-success">
                      ${precio}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/*DescProp */}
            <p className="card-title fw-bold text-dark mb-1" style={{ height: "5rem"}}>{descripcion}</p>

        <button 
            type="button" 
            className="btn btn-success mt-4"
            onClick={onAgregarCarrito}
            //Filtra por el stock que queda del que se lleva al carrito.
            disabled={stockRestante === 0} // Si no se ofrece, bloquea boton
          >
            {/*Cambia el texto para el boton desactivado.*/}
            {stockRestante === 0 ? "No disponible" : "Añadir al carrito"}
          </button>
        </div>
    )
}