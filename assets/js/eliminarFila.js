// elimina la fila de una tabla admin, con confirmación (sin backend, solo visual)

function confirmarEliminar(event, elemento, nombre) {
  event.preventDefault();

  const confirmado = confirm("¿Seguro que quieres eliminar a " + nombre + "?");

  if (confirmado) {
    const fila = elemento.closest("tr");
    fila.remove();
  }
}