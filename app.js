let escalaMapa = 1;

// Buscar equipo
function buscarEquipo() {
  const texto = document.getElementById("busqueda").value.toLowerCase().trim();
  const equipos = document.querySelectorAll(".equipo");
  const popup = document.getElementById("popup");
  const contenido = document.getElementById("contenidoPopup");

  let encontrado = false;
  popup.style.display = "none"; // Ocultar popup anterior

  equipos.forEach(equipo => {
    equipo.classList.remove("parpadeo");

    if (equipo.id.toLowerCase() === texto) {
      equipo.classList.add("parpadeo");
      encontrado = true;

      const rect = equipo.getBoundingClientRect();
      const mapaRect = document.getElementById("mapa").getBoundingClientRect();

      contenido.innerHTML = `
        <strong>${equipo.getAttribute("data-nombre")}</strong><br>
        <button onclick="verMas('${equipo.id}')">Ver más</button>
      `;
      popup.style.display = "block";
      popup.style.left = (rect.left - mapaRect.left + rect.width/2) + "px";
      popup.style.top = (rect.top - mapaRect.top - 40) + "px";

      equipo.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    }
  });

  if (!encontrado && texto !== "") {
    alert("Equipo no encontrado");
  }
}

// Cerrar popup
document.getElementById("cerrarPopup").addEventListener("click", () => {
  document.getElementById("popup").style.display = "none";
});

// Redirigir a página aparte
function verMas(equipoId) {
  window.location.href = equipoId + ".html";
}

// Zoom del mapa
function zoomMapa(factor) {
  escalaMapa *= factor;
  document.getElementById("mapa").style.transform = `scale(${escalaMapa})`;
}
