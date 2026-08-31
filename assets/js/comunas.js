//Region Metropolitana - Provincia de Santiago 
// 10 Comunas disponibles para envío.
const comunas = [
    {
    "id_comuna": 1,
    "nombre_comuna": "Santiago"
    },
    {
    "id_comuna": 2,
    "nombre_comuna": "Providencia"
    },
    {
    "id_comuna": 3,
    "nombre_comuna": "Las Condes"
    },
    {
    "id_comuna": 4,
    "nombre_comuna": "Ñuñoa"
    },
    {
    "id_comuna": 5,
    "nombre_comuna": "La Florida"
    },
    {
    "id_comuna": 6,
    "nombre_comuna": "Maipú"
    },
    {
    "id_comuna": 7,
    "nombre_comuna": "Puente Alto"
    },
    {
    "id_comuna": 8,
    "nombre_comuna": "San Miguel"
    },
    {
    "id_comuna": 9,
    "nombre_comuna": "Recoleta"
    },
    {
    "id_comuna": 10,
    "nombre_comuna": "La Reina"
    }
]

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