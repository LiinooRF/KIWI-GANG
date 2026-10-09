import { useState, useEffect } from 'react';
import TarjetaProducto from "../components/TarjetaProducto";
import { useCarrito } from "../context/CarritoContext";
import { listarProductos, listarCategorias, buscarProductosPorCategoria} from '../data/db.js';

function Categorias() {

  //listas vacias para productos y categorias.
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  //Todas las categorias se muestran en principio.
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');

  //Carrito
  const { agregarAlCarrito } = useCarrito();
  //Ejecuta el pull de informacíon para las const al inciar.
  useEffect(() => {
    setCategorias(listarCategorias());
    setProductos(listarProductos());
  }, []);

  //Logica de filtro que empieza en todos, siendo true muestra sin filtrar. y false busca los productos por funcion.
    const productosFiltrados = categoriaActiva === 'Todos' ? 
    productos : buscarProductosPorCategoria(categoriaActiva);

  return (
  <main>
    <section className="hero">
        <h1>Productos por Categoria</h1>
        <p>Aqui puedes explorar los productos, filtrando por una categoria seleccionada.</p>
    
      {/*Botones de filtro */}
      {/*Logica para boton custom Todos, de ser true cambia su color para indicarlo y le da el valor a la const categoriaActiva*/}
      <div className="d-flex justify-content-center gap-2">
        <button
        type="button"
        className={`btn ${categoriaActiva ==='Todos' ? 'btn-success' : 'btn-outline-success'}`}
        onClick={() => setCategoriaActiva('Todos')}
        >
          Todos
        </button>

        {/*Logica para los botones de las categorias en la db.js, indica de la misma forma su seleccion y al clickear, le da el nombre de la categoria.*/}
        {categorias.map((cat) => (
          <div key={cat.id}>
            <button
              type="button"
              className={`btn ${categoriaActiva === cat.nombre ? 'btn-success' : 'btn-outline-success'}`}
              onClick={() => setCategoriaActiva(cat.nombre)}
              >
              {cat.nombre}
            </button>
          </div>
        ))}
      </div>
    </section>
        {/*El resultado de la funcion, al no ser Todos la respuesta, define el const productosFiltrados*/}
        <div className="d-flex flex-wrap gap-4 justify-content-center">
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
              descripcion={producto.descripcion}
              onAgregarCarrito={() => agregarAlCarrito(producto, 1)} 
            />
        ))
        ):( 
          <p className="text-muted fs-5">No hay productos disponibles en esta categoría.</p>
        )}
      </div> 
  </main>
  );
}

export default Categorias;
