// formulario de solicitar envio

let paquetes = [];

// llena el select con las comunas del arreglo de comunas.js
function cargarComunas() {
  const select = document.getElementById("comuna");
  for (let i = 0; i < comunas.length; i++) {
    const opcion = document.createElement("option");
    opcion.value = comunas[i].id_comuna;
    opcion.textContent = comunas[i].nombre_comuna;
    select.appendChild(opcion);
  }
}

function mostrarError(id, texto) {
  document.getElementById(id).textContent = texto;
}

function limpiarErrores() {
  const errores = document.getElementsByClassName("mensaje-error");
  for (let i = 0; i < errores.length; i++) {
    errores[i].textContent = "";
  }
}

function agregarPaquete() {
  limpiarErrores();
  const peso = document.getElementById("peso").value;
  const alto = document.getElementById("alto").value;
  const ancho = document.getElementById("ancho").value;
  const largo = document.getElementById("largo").value;
  const descripcion = document.getElementById("descripcion").value.trim();
  const valor = document.getElementById("valorDeclarado").value;
  const categoria = document.getElementById("categoria").value;

  let valido = true;

  if (peso === "" || isNaN(peso) || Number(peso) <= 0) {
    mostrarError("errorPeso", "El peso debe ser un número mayor a 0");
    valido = false;
  }
  if (alto === "" || isNaN(alto) || Number(alto) <= 0) {
    mostrarError("errorAlto", "El alto debe ser un número mayor a 0");
    valido = false;
  }
  if (ancho === "" || isNaN(ancho) || Number(ancho) <= 0) {
    mostrarError("errorAncho", "El ancho debe ser un número mayor a 0");
    valido = false;
  }
  if (largo === "" || isNaN(largo) || Number(largo) <= 0) {
    mostrarError("errorLargo", "El largo debe ser un número mayor a 0");
    valido = false;
  }
  if (descripcion === "") {
    mostrarError("errorDescripcion", "Describe el contenido del paquete");
    valido = false;
  }
  if (valor === "" || isNaN(valor) || Number(valor) < 0) {
    mostrarError("errorValor", "El valor declarado debe ser un número (puede ser 0)");
    valido = false;
  }
  if (categoria === "") {
    mostrarError("errorCategoria", "Selecciona una categoría");
    valido = false;
  }

  if (!valido) {
    return;
  }

  const paquete = {
    peso: Number(peso),
    alto: Number(alto),
    ancho: Number(ancho),
    largo: Number(largo),
    descripcion: descripcion,
    valor: Number(valor),
    categoria: categoria
  };

  paquetes.push(paquete);
  mostrarPaquetes();
  document.getElementById("formPaquete").reset();
}

function mostrarPaquetes() {
  const lista = document.getElementById("listaPaquetes");

  if (paquetes.length === 0) {
    lista.innerHTML = "<p>Todavía no agregas paquetes</p>";
    return;
  }

  let html = '<table class="tabla-paquetes"><tr><th>Descripción</th><th>Peso</th><th>Medidas</th><th>Valor</th><th>Categoría</th></tr>';
  for (let i = 0; i < paquetes.length; i++) {
    const p = paquetes[i];
    html += "<tr><td>" + p.descripcion + "</td><td>" + p.peso + " kg</td><td>" +
      p.alto + "x" + p.ancho + "x" + p.largo + " cm</td><td>$" + p.valor + "</td><td>" + p.categoria + "</td></tr>";
  }
  html += "</table>";
  lista.innerHTML = html;
}

cargarComunas();
