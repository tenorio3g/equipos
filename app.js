function buscarEquipo() {
  const texto = document.getElementById("busqueda").value.toLowerCase().trim();
  const equipos = document.querySelectorAll(".equipo");
  const popup = document.getElementById("popup");

  let encontrado = false;
  popup.style.display = "none"; // Ocultar popup anterior

  equipos.forEach(equipo => {
    equipo.classList.remove("parpadeo"); // Quitar parpadeo previo

    if (equipo.id.toLowerCase() === texto) {
      equipo.classList.add("parpadeo");
      encontrado = true;

      // Mostrar popup arriba del equipo
      const rect = equipo.getBoundingClientRect();
      const mapaRect = document.getElementById("mapa").getBoundingClientRect();

      popup.innerHTML = `
        <strong>${equipo.getAttribute("data-nombre")}</strong><br>
        <button onclick="verMas('${equipo.id}')">Ver más</button>
      `;
      popup.style.display = "block";
      popup.style.left = (rect.left - mapaRect.left + rect.width/2) + "px";
      popup.style.top = (rect.top - mapaRect.top - 40) + "px";

      // Centrar el equipo en pantalla
      equipo.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    }
  });

  if (!encontrado && texto !== "") {
    alert("Equipo no encontrado");
  }
}

// Redirigir a página aparte
function verMas(equipoId) {
  window.location.href = equipoId + ".html";
}
