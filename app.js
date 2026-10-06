// ====== CAMBIA ESTOS DATOS ======
const CONFIG = {
  nombre: "Moralashes",
  whatsapp: "526612333334",
  instagram: "mirtzz_111",
  ciudad: "Tijuana, B.C.",

  // Cuando tengas la información real, cambia estos datos
  direccion: "Dirección próximamente",
  horario: [
    "Viernes: 10:00 AM - 6:00 PM",
    "Sábado: 10:00 AM - 6:00 PM",
    "Domingo: 10:00 AM - 6:00 PM"
  ],

  // Si después tienes la ubicación exacta de Google Maps,
  // puedes poner aquí el enlace.
  maps: "#"
};

// ================================

const SERVICIOS = [
  {
    nombre: "Uñas",
    texto: "Acrílico, gel, manicure y diseños a tu gusto."
  },
  {
    nombre: "Pestañas",
    texto: "Extensiones para una mirada más marcada."
  },
  {
    nombre: "Manicure de cejas",
    texto: "Limpieza y forma para enmarcar tu cara."
  },
  {
    nombre: "Queratina",
    texto: "Tratamiento para un cabello más suave y manejable."
  },
  {
    nombre: "Y más",
    texto: "¿No ves lo que buscas? Escríbenos y lo platicamos."
  }
];

const ESMALTES = [
  { nombre: "Cereza", color: "#b3122f", texto: "#ffffff" },
  { nombre: "Chicle", color: "#f58fbd", texto: "#2b1631" },
  { nombre: "Nude", color: "#e6bfa8", texto: "#2b1631" },
  { nombre: "Lila", color: "#8e6bd1", texto: "#ffffff" },
  { nombre: "Menta", color: "#7fd1b0", texto: "#102a22" }
];

const $ = (selector) => document.querySelector(selector);

function elegirEsmalte(esmalte, boton) {
  const raiz = document.documentElement.style;

  raiz.setProperty("--accent", esmalte.color);
  raiz.setProperty("--on-accent", esmalte.texto);

  document.querySelectorAll(".esmalte").forEach((b) => {
    b.setAttribute("aria-checked", b === boton);
  });

  $("#nombre-esmalte").textContent = esmalte.nombre;
}

function pintarEsmaltes() {
  ESMALTES.forEach((esmalte, i) => {
    const boton = document.createElement("button");

    boton.type = "button";
    boton.className = "esmalte";
    boton.setAttribute("role", "radio");
    boton.setAttribute("aria-label", esmalte.nombre);
    boton.style.background = esmalte.color;

    boton.addEventListener("click", () => {
      elegirEsmalte(esmalte, boton);
    });

    $("#esmaltes").appendChild(boton);

    if (i === 1) {
      elegirEsmalte(esmalte, boton);
    }
  });
}

function pintarServicios() {
  $("#lista-servicios").innerHTML = SERVICIOS.map(
    (s) => `
      <article class="servicio">
        <div>
          <h3>${s.nombre}</h3>
        </div>

        <p>${s.texto}</p>

        <a href="#reservar" data-servicio="${s.nombre}">
          Pedir cita
        </a>
      </article>
    `
  ).join("");

  $("#servicio").innerHTML = SERVICIOS.map(
    (s) => `<option>${s.nombre}</option>`
  ).join("");

  $("#lista-servicios").addEventListener("click", (e) => {
    const enlace = e.target.closest("a[data-servicio]");

    if (enlace) {
      $("#servicio").value = enlace.dataset.servicio;
    }
  });
}

function enviarPorWhatsApp(evento) {
  evento.preventDefault();

  const nombre = $("#nombre").value.trim();
  const servicio = $("#servicio").value;
  const fechaInput = $("#fecha").value;
  const hora = $("#hora").value;
  const notas = $("#notas").value.trim();

  const fecha = fechaInput
    ? fechaInput.split("-").reverse().join("/")
    : "";

  let mensaje =
    `Hola, soy ${nombre}. Quiero agendar una cita para ${servicio}.`;

  if (fecha) {
    mensaje += ` Me gustaría el día ${fecha}`;
  }

  if (hora) {
    mensaje += ` a las ${hora}`;
  }

  mensaje += ".";

  if (notas) {
    mensaje += ` ${notas}`;
  }

  window.open(
    `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensaje)}`,
    "_blank",
    "noopener"
  );
}

function pintarDatosDelNegocio() {
  $("#logo").textContent = CONFIG.nombre;

  $("#contacto").innerHTML = `
    <div class="footer-contenido">

      <div>
        <h3>${CONFIG.nombre}</h3>
        <p>${CONFIG.ciudad}</p>
      </div>

      <div>
        <h3>Contacto</h3>
        <p>
          <a
            href="https://instagram.com/${CONFIG.instagram}"
            target="_blank"
            rel="noopener"
          >
            Instagram: @${CONFIG.instagram}
          </a>
        </p>
      </div>

      <div>
        <h3>Ubicación</h3>
        <p>${CONFIG.direccion}</p>

        ${
          CONFIG.maps !== "#"
            ? `<a href="${CONFIG.maps}" target="_blank" rel="noopener">
                Ver en Google Maps
              </a>`
            : ""
        }
      </div>

      <div>
        <h3>Horario</h3>
        <ul class="horarios">
          ${CONFIG.horario.map((dia) => `<li>${dia}</li>`).join("")}
        </ul>
      </div>

    </div>

    <div class="footer-final">
      © ${new Date().getFullYear()} ${CONFIG.nombre}. Todos los derechos reservados.
    </div>
  `;

  $("#fecha").min = new Date().toISOString().split("T")[0];
}

function crearWhatsAppFlotante() {
  const boton = document.createElement("a");

  boton.href = `https://wa.me/${CONFIG.whatsapp}`;
  boton.target = "_blank";
  boton.rel = "noopener";
  boton.className = "whatsapp-flotante";
  boton.setAttribute("aria-label", "Contactar por WhatsApp");

  boton.innerHTML = `
    <span>💬</span>
    <strong>WhatsApp</strong>
  `;

  document.body.appendChild(boton);
}

// ====== INICIO ======

pintarDatosDelNegocio();
pintarEsmaltes();
pintarServicios();
crearWhatsAppFlotante();

$("#form-cita").addEventListener("submit", enviarPorWhatsApp);