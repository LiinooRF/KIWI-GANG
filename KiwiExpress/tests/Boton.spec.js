import { render, fireEvent, cleanup } from '@testing-library/react';
import Boton from '../src/components/layout/Boton'; 
//Karma [describe, it, expect] guia.
describe("Pruebas componente Boton", () => {
//despues de cada prueba, se hace una limpieza
    afterEach(() => {
    cleanup()
    });
//Prueba 1, recibe el texto como prop.
    it("Debe mostrar el texto recibido mediante la propiedad 'texto'", () => {
        //Busca en el documento el boton que tenga escrito enviar y lo renderiza.
        const { getByRole } = render(<Boton texto="Enviar"/>)
        const botonElemento = getByRole('button', {name: /Enviar/i})
        //Espera que el renderizado y identificado del boton sea true.
        expect(botonElemento).toBeTruthy();
    });

    it("Ejecuta el callback cuando el usuario hace click", () => {
    //jasmine se fija de que la accion se haya ejecutado.
    const funcionEspia = jasmine.createSpy('onClick'); 
    const { getByRole } = render(<Boton texto="Enviar" onClick={funcionEspia} />);
    const botonElemento = getByRole('button', { name: /enviar/i });

    //monitorea que el click haya ocurrido.
    fireEvent.click(botonElemento)
    expect(funcionEspia).toHaveBeenCalled();
    })


});