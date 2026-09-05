let paquetes = [];

// si viene ?id= en la url, es modo edición (solo cambia textos, sin precarga)
const params = new URLSearchParams(window.location.search);
const idEnvio = params.get("id");

if (idEnvio) {
  document.getElementById("tituloFormEnvio").textContent = "Editar envío";
  document.getElementById("btnGuardarEnvio").textContent = "Guardar cambios";
}

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

  paquetes.push({
    peso: Number(peso),
    alto: Number(alto),
    ancho: Number(ancho),
    largo: Number(largo),
    descripcion: descripcion,
    valor: Number(valor),
    categoria: categoria === "fragil" ? "Frágil" : "No frágil"
  });

  mostrarPaquetes();
  document.getElementById("formPaquete").reset();
}

function quitarPaquete(indice) {
  paquetes.splice(indice, 1);
  mostrarPaquetes();
}

function mostrarPaquetes() {
  const lista = document.getElementById("listaPaquetes");

  if (paquetes.length === 0) {
    lista.innerHTML = "<p>Todavía no se agregan paquetes</p>";
    document.getElementById("totalDeclarado").innerHTML = "";
    return;
  }

  let html = '<table class="tabla-paquetes"><tr><th>Descripción</th><th>Peso</th><th>Medidas</th><th>Valor</th><th>Categoría</th><th></th></tr>';
  let total = 0;
  for (let i = 0; i < paquetes.length; i++) {
    const p = paquetes[i];
    total = total + p.valor;
    html += "<tr><td>" + p.descripcion + "</td><td>" + p.peso + " kg</td><td>" +
      p.alto + "x" + p.ancho + "x" + p.largo + " cm</td><td>$" + p.valor + "</td><td>" + p.categoria +
      '</td><td><a href="#" onclick="quitarPaquete(' + i + ')">quitar</a></td></tr>';
  }
  html += "</table>";
  lista.innerHTML = html;
  document.getElementById("totalDeclarado").innerHTML = "<strong>Total valor declarado: $" + total + "</strong>";
}

function guardarEnvioAdmin() {
  limpiarErrores();
  document.getElementById("mensajeExito").innerHTML = "";

  const nombres = document.getElementById("nombres").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const comuna = document.getElementById("comuna").value;
  const estado = document.getElementById("estado").value;

  let valido = true;

  if (nombres === "") {
    mostrarError("errorNombres", "Ingresa el nombre del destinatario");
    valido = false;
  }
  if (apellido === "") {
    mostrarError("errorApellido", "Ingresa el apellido del destinatario");
    valido = false;
  }
  if (comuna === "") {
    mostrarError("errorComuna", "Selecciona la comuna de destino");
    valido = false;
  }
  if (estado === "") {
    mostrarError("errorEstado", "Selecciona un estado");
    valido = false;
  }
  if (paquetes.length === 0) {
    mostrarError("errorEnvio", "Agrega al menos un paquete antes de guardar");
    valido = false;
  }

  if (!valido) {
    return;
  }

  const numero = Math.floor(Math.random() * 900000) + 100000;
  const codigo = "KX-2026-" + numero;

  document.getElementById("mensajeExito").innerHTML =
    '<div class="ficha-envio"><h3>Envío guardado ✅</h3><p>N° de envío: <strong>' + codigo + '</strong> (simulado, sin backend)</p></div>';

  paquetes = [];
  mostrarPaquetes();
  document.getElementById("formDestinatario").reset();
}

cargarComunas();
mostrarPaquetes();