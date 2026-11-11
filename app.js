const CONFIG = {
  nombre: "Moralashes",
  whatsapp: "526612333334",
  instagram: "moraless_1111",
  ubicacion: "Terrazas del Valle, Tijuana, B.C.",
  horario: [
    "Viernes: 10:00 AM - 6:00 PM",
    "Sábado: 10:00 AM - 6:00 PM",
    "Domingo: 10:00 AM - 6:00 PM"
  ]
};

const SERVICIOS = [
  {
    nombre: "Uñas",
    texto: "Manicure y diseños para llevar en tus manos un estilo muy tuyo.",
    mensajeCita: "Me gustaría platicar sobre el diseño que tengo en mente y consultar disponibilidad.",
    placeholder: "Cuéntame el color, diseño o idea que tienes en mente..."
  },
  {
    nombre: "Keratina",
    texto: "Un tratamiento para ayudar a que tu cabello se sienta más suave y manejable.",
    mensajeCita: "Me gustaría conocer el precio y los detalles del tratamiento de keratina.",
    placeholder: "Si quieres, cuéntame qué te gustaría saber sobre el tratamiento..."
  },
  {
    nombre: "Rizado de pestañas",
    texto: "Realza tu mirada con un rizado natural para tus pestañas.",
    mensajeCita: "Me gustaría conocer el precio y los detalles del rizado de pestañas.",
    placeholder: "Cuéntame si tienes alguna duda o el efecto que te gustaría..."
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

  document.querySelectorAll(".esmalte").forEach((opcion) => {
    const seleccionado = opcion === boton;
    opcion.setAttribute("aria-checked", String(seleccionado));
    opcion.tabIndex = seleccionado ? 0 : -1;
  });

  $("#nombre-esmalte").textContent = esmalte.nombre;
}

function pintarEsmaltes() {
  ESMALTES.forEach((esmalte, indice) => {
    const boton = document.createElement("button");

    boton.type = "button";
    boton.className = "esmalte";
    boton.setAttribute("role", "radio");
    boton.setAttribute("aria-label", esmalte.nombre);
    boton.setAttribute("aria-checked", "false");
    boton.tabIndex = -1;
    boton.style.background = esmalte.color;
    boton.addEventListener("click", () => elegirEsmalte(esmalte, boton));
    boton.addEventListener("keydown", (evento) => {
      if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(evento.key)) {
        return;
      }

      evento.preventDefault();
      const avance = evento.key === "ArrowRight" || evento.key === "ArrowDown" ? 1 : -1;
      const siguienteIndice = (indice + avance + ESMALTES.length) % ESMALTES.length;
      const siguienteBoton = $("#esmaltes").children[siguienteIndice];
      siguienteBoton.focus();
      siguienteBoton.click();
    });

    $("#esmaltes").appendChild(boton);

    if (indice === 1) {
      elegirEsmalte(esmalte, boton);
    }
  });
}

function pintarServicios() {
  $("#lista-servicios").innerHTML = SERVICIOS.map(
    (servicio, indice) => `
      <article class="servicio">
        <div><span class="servicio-numero">0${indice + 1}</span><h3>${servicio.nombre}</h3></div>
        <p>${servicio.texto}</p>
        <a href="#reservar" data-servicio="${servicio.nombre}">Pedir cita</a>
      </article>
    `
  ).join("");

  $("#servicio").innerHTML = SERVICIOS.map(
    (servicio) => `<option value="${servicio.nombre}">${servicio.nombre}</option>`
  ).join("");

  const actualizarPlaceholder = () => {
    const servicio = SERVICIOS.find((opcion) => opcion.nombre === $("#servicio").value);
    $("#notas").placeholder = servicio.placeholder;
  };

  $("#servicio").addEventListener("change", actualizarPlaceholder);
  actualizarPlaceholder();

  $("#lista-servicios").addEventListener("click", (evento) => {
    const enlace = evento.target.closest("a[data-servicio]");

    if (enlace) {
      $("#servicio").value = enlace.dataset.servicio;
      actualizarPlaceholder();
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
  const fecha = fechaInput ? fechaInput.split("-").reverse().join("/") : "";
  const datosServicio = SERVICIOS.find((opcion) => opcion.nombre === servicio);

  const partesMensaje = [
    `Hola, soy ${nombre}. Me gustaría agendar una cita para ${servicio}.`,
    datosServicio.mensajeCita
  ];

  if (fecha || hora) {
    const fechaYHora = [
      fecha ? `el ${fecha}` : "",
      hora ? `alrededor de las ${hora}` : ""
    ].filter(Boolean).join(" ");
    partesMensaje.push(`La fecha y hora que prefiero son ${fechaYHora}.`);
  }

  if (notas) {
    partesMensaje.push(`Como referencia: ${notas}.`);
  }

  const mensaje = partesMensaje.join(" ");
  const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function pintarDatosDelNegocio() {
  $("#logo").textContent = CONFIG.nombre;
  $("#ubicacion-preview").textContent = CONFIG.ubicacion;
  $("#instagram-link").href = `https://instagram.com/${CONFIG.instagram}`;
  $("#instagram-link").textContent = `@${CONFIG.instagram}`;

  const mensajeResena = "Hola, ya tuve una cita en Moralashes y me gustaría compartir mi experiencia. Mi reseña es:";
  $("#resena-link").href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensajeResena)}`;

  $("#contacto").innerHTML = `
    <div class="footer-contenido">
      <div>
        <h3>${CONFIG.nombre}</h3>
        <p>${CONFIG.ubicacion}</p>
      </div>
      <div>
        <h3>Contacto</h3>
        <p><a href="https://instagram.com/${CONFIG.instagram}" target="_blank" rel="noopener noreferrer">Instagram: @${CONFIG.instagram}</a></p>
        <p><a href="https://wa.me/${CONFIG.whatsapp}" target="_blank" rel="noopener noreferrer">Escríbeme por WhatsApp</a></p>
      </div>
      <div>
        <h3>Horario de atención</h3>
        <ul class="horarios">
          ${CONFIG.horario.map((dia) => `<li>${dia}</li>`).join("")}
        </ul>
      </div>
    </div>
    <div class="footer-final">
      © ${new Date().getFullYear()} ${CONFIG.nombre}. Con cariño, para que brilles a tu manera.
      <span class="firma-creador">Página creada por Imer Oliveros.</span>
    </div>
  `;

  const hoy = new Date();
  const fechaLocal = [
    hoy.getFullYear(),
    String(hoy.getMonth() + 1).padStart(2, "0"),
    String(hoy.getDate()).padStart(2, "0")
  ].join("-");
  $("#fecha").min = fechaLocal;
}

function crearWhatsAppFlotante() {
  const boton = document.createElement("a");

  boton.href = `https://wa.me/${CONFIG.whatsapp}`;
  boton.target = "_blank";
  boton.rel = "noopener noreferrer";
  boton.className = "whatsapp-flotante";
  boton.setAttribute("aria-label", "Contactar por WhatsApp");
  boton.innerHTML = `<span aria-hidden="true">💬</span><strong>WhatsApp</strong>`;
  document.body.appendChild(boton);
}

pintarDatosDelNegocio();
pintarEsmaltes();
pintarServicios();
crearWhatsAppFlotante();
$("#form-cita").addEventListener("submit", enviarPorWhatsApp);
