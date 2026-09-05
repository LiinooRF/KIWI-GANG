//Blog 1
const botones = document.querySelectorAll("#btnSi, #btnNo");
const respuesta = document.getElementById("respuesta");

botones.forEach(function (boton) { //Cuando se usa el boton se ejecuta la funcion de respuesta en ambos casos pero diferentes accordions.
    boton.addEventListener("click", function () {
        respuesta.textContent = "¡Gracias por tu respuesta!";
    });
});

//Blog 2
const botones2 = document.querySelectorAll("#btnSi2, #btnNo2");
const respuesta2 = document.getElementById("respuesta2");

botones2.forEach(function (boton) {
    boton.addEventListener("click", function () {
        respuesta2.textContent = "¡Gracias por tu respuesta!";
    });
});