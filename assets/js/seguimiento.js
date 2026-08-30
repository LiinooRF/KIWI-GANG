// busqueda de envios por codigo

function buscarEnvio() {
  const codigo = document.getElementById("codigoEnvio").value.trim().toUpperCase();
  const resultado = document.getElementById("resultado");

  if (codigo === "") {
    resultado.innerHTML = '<p class="error">Ingresa un código de seguimiento, ej: KX-2026-000001</p>';
    return;
  }

  let encontrado = null;
  for (let i = 0; i < listaEnvios.length; i++) {
    if (listaEnvios[i].codigo === codigo) {
      encontrado = listaEnvios[i];
    }
  }

  if (encontrado === null) {
    resultado.innerHTML = '<p class="error">No encontramos el envío ' + codigo + ', revisa que el código esté bien escrito</p>';
    return;
  }

  resultado.innerHTML =
    '<div class="ficha-envio">' +
    '<h3>' + encontrado.codigo + '</h3>' +
    '<p><strong>Cliente:</strong> ' + encontrado.cliente + '</p>' +
    '<p><strong>Comuna destino:</strong> ' + encontrado.comuna + '</p>' +
    '<p><strong>Fecha solicitud:</strong> ' + encontrado.fecha + '</p>' +
    '<p class="estado">Estado: ' + encontrado.estado + '</p>' +
    '</div>';
}
