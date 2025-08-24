let escalaMapa = 1;
let mapa = document.getElementById("mapa");

// Variables para arrastrar
let arrastrando = false;
let inicioX, inicioY;
let desplazamientoX = 0;
let desplazamientoY = 0;

// Variables touch pinch
let pinchDist = 0;
let escalaInicial = 1;

// --- Función de actualizar transform ---
function actualizarTransform() {
  mapa.style.transform = `scale(${escalaMapa}) translate(${desplazamientoX}px, ${desplazamientoY}px)`;
}

// --- Arrastrar con mouse ---
mapa.addEventListener("mousedown", e => {
  arrastrando = true;
  inicioX = e.clientX - desplazamientoX;
  inicioY = e.clientY - desplazamientoY;
  mapa.style.cursor = "grabbing";
});

document.addEventListener("mousemove", e => {
  if (!arrastrando) return;
  desplazamientoX = e.clientX - inicioX;
  desplazamientoY = e.clientY - inicioY;
  actualizarTransform();
});

document.addEventListener("mouseup", e => {
  if (arrastrando) {
    arrastrando = false;
    mapa.style.cursor = "grab";
  }
});

// --- Arrastrar con touch ---
mapa.addEventListener("touchstart", e => {
  if (e.touches.length === 1) {
    inicioX = e.touches[0].clientX - desplazamientoX;
    inicioY = e.touches[0].clientY - desplazamientoY;
  } else if (e.touches.length === 2) {
    pinchDist = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );
    escalaInicial = escalaMapa;
  }
});

mapa.addEventListener("touchmove", e => {
  e.preventDefault();
  if (e.touches.length === 1) {
    desplazamientoX = e.touches[0].clientX - inicioX;
    desplazamientoY = e.touches[0].clientY - inicioY;
    actualizarTransform();
  } else if (e.touches.length === 2) {
    let nuevaDist = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );
    escalaMapa = escalaInicial * (nuevaDist / pinchDist);
    actualizarTransform();
  }
}, { passive: false });

// --- Buscar equipo, popup y zoom botones ---
function buscarEquipo() {
  const texto = document.getElementById("busqueda").value.toLowerCase().trim();
  const equipos = document.querySelectorAll(".equipo");
  const popup = document.getElementById("popup");
  const contenido = document.getElementById("contenidoPopup");

  let encontrado = false;
  popup.style.display = "none";

  equipos.forEach(equipo => {
    equipo.classList.remove("parpadeo");

    if (equipo.id.toLowerCase() === texto) {
      equipo.classList.add("parpadeo");
      encontrado = true;

      const rect = equipo.getBoundingClientRect();
      const mapaRect = mapa.getBoundingClientRect();

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

// Ver más
function verMas(equipoId) {
  window.location.href = equipoId + ".html";
}

// Zoom con botones
function zoomMapa(factor) {
  escalaMapa *= factor;
  actualizarTransform();
}

// Cursor inicial
mapa.style.cursor = "grab";
