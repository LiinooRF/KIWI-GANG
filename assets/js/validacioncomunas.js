//Para el Registro:
//Encuentra el select especifico del HTML por el id de comuna. se guarda como selectComuna.
const selectComuna = document.getElementById("comuna");

//Por cada comuna, crea un elemento "option"
comunas.forEach(comuna => {
    const option = document.createElement("option");

    //Se le da un valor que representa la opcion.
    option.value = comuna.id_comuna; 

    //Se asigna lo visible para el usuario.
    option.textContent = comuna.nombre_comuna;

    //Inserta las opciones en selectComuna, que representa el select del HTML.
    selectComuna.appendChild(option);
});