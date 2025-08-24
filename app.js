function buscarEquipo() {
  const texto = document.getElementById("busqueda").value.toLowerCase();
  const equipos = document.querySelectorAll(".equipo");

  let encontrado = false;

  equipos.forEach(equipo => {
    equipo.classList.remove("parpadeo"); // resetear

    if (equipo.id.toLowerCase() === texto) {
      equipo.classList.add("parpadeo");
      encontrado = true;
    }
  });

  if (!encontrado) {
    alert("Equipo no encontrado");
  }
}
