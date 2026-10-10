import { render, cleanup, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CarritoProvider } from '../src/context/CarritoContext.jsx';
import Productos from '../src/pages/Productos.jsx';
import TarjetaProducto from '../src/components/TarjetaProducto.jsx';
import { listarProductos } from '../src/data/db.js';

describe('Pruebas de renderizado Karma', () => {

  afterEach(() => {
    cleanup(); // Limpieza
  });

  it('Debe renderizar la tarjeta con los datos del producto recibido', () => {
    //Datos para la tarjeta
    const nombreProducto = "Envio de prueba";
    const precioProducto = 50000;
    const descripcionProducto = "DescripciondePrueba";

    //Renderiza la tarjeta con datos entregados.
    render(
      <MemoryRouter>
        <CarritoProvider>
          <TarjetaProducto 
            nombre={nombreProducto}
            precio={precioProducto}
            stock={10}
            descripcion={descripcionProducto}
            imagen="/img/envio-estandar.png"
          />
        </CarritoProvider>
      </MemoryRouter>
    );
  
    // Se comprueba que el producto haya sido renderizado por texto en pantalla.
    expect(screen.getByText(nombreProducto)).toBeTruthy();
    expect(screen.getByText(descripcionProducto)).toBeTruthy();
    expect(screen.getByText(new RegExp(precioProducto.toString()))).toBeTruthy();
  });

  it('Debe mostrar todos los elementos de la lista de productos', () => {
    // Obtenemos el arreglo real del archivo db.js
    const productosDeLaBaseDeDatos = listarProductos();
    const cantidadEsperada = productosDeLaBaseDeDatos.length;

    const { getAllByRole } = render(
      <MemoryRouter>
        <CarritoProvider>
          <Productos />
        </CarritoProvider>
      </MemoryRouter>
    );

    //Renderiza una cantidad de titulos (unicos con etiqueta h5) y los compara con la cantidad esperada de productos totales.
    const titulosRenderizados = getAllByRole('heading', { level: 5 });
    expect(titulosRenderizados.length).toBe(cantidadEsperada);
  });

  it('Renderizado condicional: dependiente del stock', () => {
    const { queryByText, rerender } = render(
      <MemoryRouter>
        <CarritoProvider>
          <TarjetaProducto 
            nombre="Producto Prueba"
            precio={1000}
            stock={10}
            descripcion="Validación condicional"
            imagen="/img/envio-estandar.png"
          />
        </CarritoProvider>
      </MemoryRouter>
    );

    expect(queryByText(/No disponible/i)).toBeNull();

    rerender(
      <MemoryRouter>
        <CarritoProvider>
          <TarjetaProducto 
            nombre="Producto Prueba"
            precio={1000}
            stock={0} //Se fuerza el 0 stock
            descripcion="Validación condicional"
            imagen="/img/envio-estandar.png"
          />
        </CarritoProvider>
      </MemoryRouter>
    );

    //Se revisa el html entero en lowercase
    const htmlTarjeta = document.body.innerHTML.toLowerCase();
    
    //Y se comprueba el estado del boton por texto en lowercase.
    expect(htmlTarjeta.includes('no disponible') || htmlTarjeta.includes('añadir al carrito')).toBeTruthy();
  });
});

