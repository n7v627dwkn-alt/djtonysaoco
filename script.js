"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       PARTÍCULAS NEÓN
    ========================================== */

    const contenedorParticulas = document.querySelector(".particulas");

    if (contenedorParticulas) {
        contenedorParticulas.innerHTML = "";

        const cantidadParticulas = 60;

        for (let i = 0; i < cantidadParticulas; i++) {
            const particula = document.createElement("span");

            const posicionHorizontal = Math.random() * 100;
            const duracion = 6 + Math.random() * 8;
            const retraso = Math.random() * 8;
            const escala = 0.4 + Math.random() * 1.8;

            particula.style.left = `${posicionHorizontal}%`;
            particula.style.animationDuration = `${duracion}s`;
            particula.style.animationDelay = `${retraso}s`;
            particula.style.setProperty(
                "--escala-particula",
                escala.toString()
            );

            contenedorParticulas.appendChild(particula);
        }
    }


    /* ==========================================
       MODAL DE PETICIONES
    ========================================== */

    const abrirPeticiones = document.querySelector("#abrir-peticiones");
    const cerrarPeticiones = document.querySelector("#cerrar-peticiones");
    const modalPeticiones = document.querySelector("#modal-peticiones");

    const formularioPeticiones = document.querySelector(
        "#formulario-peticiones"
    );

    const campoNombre = document.querySelector("#nombre-cliente");
    const campoCancion = document.querySelector("#nombre-cancion");
    const campoArtista = document.querySelector("#nombre-artista");

    let elementoConFocoAnterior = null;


    const abrirModal = () => {
        if (!modalPeticiones) {
            return;
        }

        elementoConFocoAnterior = document.activeElement;

        modalPeticiones.classList.add("abierto");
        modalPeticiones.setAttribute("aria-hidden", "false");

        document.body.classList.add("modal-abierto");

        window.setTimeout(() => {
            campoNombre?.focus();
        }, 300);
    };


    const cerrarModal = () => {
        if (!modalPeticiones) {
            return;
        }

        modalPeticiones.classList.remove("abierto");
        modalPeticiones.setAttribute("aria-hidden", "true");

        document.body.classList.remove("modal-abierto");

        if (elementoConFocoAnterior instanceof HTMLElement) {
            elementoConFocoAnterior.focus();
        } else {
            abrirPeticiones?.focus();
        }
    };


    abrirPeticiones?.addEventListener("click", abrirModal);

    cerrarPeticiones?.addEventListener("click", cerrarModal);


    modalPeticiones?.addEventListener("click", (evento) => {
        if (evento.target === modalPeticiones) {
            cerrarModal();
        }
    });


    document.addEventListener("keydown", (evento) => {
        const modalEstaAbierto =
            modalPeticiones?.classList.contains("abierto");

        if (
            evento.key === "Escape" &&
            modalEstaAbierto
        ) {
            cerrarModal();
        }
    });


    /* ==========================================
       ENVÍO DE PETICIONES POR WHATSAPP
    ========================================== */

    formularioPeticiones?.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const nombre = campoNombre?.value.trim() ?? "";
        const cancion = campoCancion?.value.trim() ?? "";
        const artista = campoArtista?.value.trim() ?? "";

        if (!nombre || !cancion) {
            return;
        }

        const mensaje = [
            "Hola Tony 🎧",
            "",
            `Soy ${nombre} y quiero pedir esta canción:`,
            `🎵 ${cancion}`,
            artista ? `🎤 Artista: ${artista}` : "",
            "",
            "¡Gracias!"
        ]
            .filter(Boolean)
            .join("\n");

        const telefono = "34637365397";

        const enlaceWhatsApp =
            `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

        const ventanaWhatsApp = window.open(
            enlaceWhatsApp,
            "_blank",
            "noopener,noreferrer"
        );

        if (ventanaWhatsApp) {
            ventanaWhatsApp.opener = null;
        }

        formularioPeticiones.reset();
        cerrarModal();
    });


    /* ==========================================
       ANIMACIONES AL HACER SCROLL
    ========================================== */
const elementosAnimados = document.querySelectorAll(
    ".red-social-destacada, .cerveza-dj, .peticiones, .evento, .menu-grid a, .contrataciones"
);
    if ("IntersectionObserver" in window) {
        const observador = new IntersectionObserver(
            (entradas) => {
                entradas.forEach((entrada) => {
                    if (entrada.isIntersecting) {
                        entrada.target.classList.add("visible");
                        observador.unobserve(entrada.target);
                    }
                });
            },
            {
                threshold: 0.15
            }
        );

        elementosAnimados.forEach((elemento) => {
            observador.observe(elemento);
        });
    } else {
        elementosAnimados.forEach((elemento) => {
            elemento.classList.add("visible");
        });
    }
/* ==================================================
   MODAL BIZUM
================================================== */

const botonAbrirBizum =
    document.getElementById("abrir-bizum");

const botonCerrarBizum =
    document.getElementById("cerrar-bizum");

const modalBizum =
    document.getElementById("modal-bizum");

const botonCopiarBizum =
    document.getElementById("copiar-bizum");

const mensajeCopiado =
    document.getElementById("mensaje-copiado");

const numeroBizum = "637365397";


function abrirModalBizum() {

    if (!modalBizum) {
        return;
    }

    modalBizum.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "bizum-abierto"
    );

    botonCerrarBizum?.focus();
}


function cerrarModalBizum() {

    if (!modalBizum) {
        return;
    }

    modalBizum.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "bizum-abierto"
    );

    if (mensajeCopiado) {
        mensajeCopiado.textContent = "";
    }

    if (botonCopiarBizum) {
        botonCopiarBizum.innerHTML = `
            <i
                class="fas fa-copy"
                aria-hidden="true"
            ></i>
            Copiar número
        `;
    }

    botonAbrirBizum?.focus();
}


botonAbrirBizum?.addEventListener(
    "click",
    abrirModalBizum
);


botonCerrarBizum?.addEventListener(
    "click",
    cerrarModalBizum
);


modalBizum?.addEventListener(
    "click",
    (evento) => {

        if (evento.target === modalBizum) {
            cerrarModalBizum();
        }

    }
);


document.addEventListener(
    "keydown",
    (evento) => {

        const modalEstaAbierto =
            modalBizum?.getAttribute(
                "aria-hidden"
            ) === "false";

        if (
            evento.key === "Escape" &&
            modalEstaAbierto
        ) {
            cerrarModalBizum();
        }

    }
);


botonCopiarBizum?.addEventListener(
    "click",
    async () => {

        try {

            await navigator.clipboard.writeText(
                numeroBizum
            );

            if (mensajeCopiado) {
                mensajeCopiado.textContent =
                    "Número copiado correctamente.";
            }

            botonCopiarBizum.innerHTML = `
                <i
                    class="fas fa-check"
                    aria-hidden="true"
                ></i>
                ¡Número copiado!
            `;

        } catch (error) {

            if (mensajeCopiado) {
                mensajeCopiado.textContent =
                    "Mantén pulsado el número para copiarlo.";
            }

        }

    }
);
/* ==================================================
   EVENTOS AUTOMÁTICOS DESDE GOOGLE CALENDAR
================================================== */

const GOOGLE_CALENDAR_ID =
    "675efd36ab0db84ff8cf3e6f4972872dbb333b6d4276f2c928d28fd308b028df@group.calendar.google.com";

/*
    Sustituye únicamente el texto entre comillas
    por tu clave de API de Google.
*/

const GOOGLE_CALENDAR_API_KEY =
    "AIzaSyCSGhKfvOvmmVTAq5T46YpeYpg0sNV28Q4";


const tarjetaEvento =
    document.querySelector(".evento");

const tituloEvento =
    tarjetaEvento?.querySelector(".evento-info h2");

const datosEvento =
    tarjetaEvento?.querySelectorAll(".evento-info p");

const fechaEvento =
    datosEvento?.[0];

const ubicacionEvento =
    datosEvento?.[1];

const entradaEvento =
    datosEvento?.[2];

const etiquetaEvento =
    tarjetaEvento?.querySelector(".etiqueta");


function formatearFechaEvento(evento) {

    const fechaInicial =
        evento.start?.dateTime ||
        evento.start?.date;

    if (!fechaInicial) {
        return "Fecha pendiente";
    }

    const esEventoTodoElDia =
        Boolean(evento.start?.date);

    const fecha = new Date(fechaInicial);

    if (
        Number.isNaN(fecha.getTime())
    ) {
        return "Fecha pendiente";
    }

    const opcionesFecha = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    let textoFecha =
        new Intl.DateTimeFormat(
            "es-ES",
            opcionesFecha
        ).format(fecha);

    textoFecha =
        textoFecha.charAt(0).toUpperCase() +
        textoFecha.slice(1);

    if (!esEventoTodoElDia) {

        const hora =
            new Intl.DateTimeFormat(
                "es-ES",
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            ).format(fecha);

        textoFecha += ` · ${hora}`;
    }

    return textoFecha;
}


function obtenerTextoEntrada(descripcion) {

    if (!descripcion) {
        return "Consulta información";
    }

    /*
        Utiliza la primera línea de la descripción
        como información de entrada.
    */

    const primeraLinea =
        descripcion
            .split("\n")
            .map((linea) => linea.trim())
            .find(Boolean);

    return primeraLinea || "Consulta información";
}


function mostrarEventoEnLaWeb(evento) {

    if (!tarjetaEvento || !evento) {
        return;
    }

    const nombre =
        evento.summary ||
        "Próxima sesión";

    const ubicacion =
        evento.location ||
        "Ubicación por confirmar";

    const entrada =
        obtenerTextoEntrada(
            evento.description
        );

    const fecha =
        formatearFechaEvento(evento);


    if (etiquetaEvento) {
        etiquetaEvento.textContent =
            "Próxima sesión";
    }

    if (tituloEvento) {
        tituloEvento.textContent =
            nombre;
    }

    if (fechaEvento) {
        fechaEvento.innerHTML = `
            <i
                class="fa-solid fa-calendar-days"
                aria-hidden="true"
            ></i>
            ${fecha}
        `;
    }

    if (ubicacionEvento) {
        ubicacionEvento.innerHTML = `
            <i
                class="fa-solid fa-location-dot"
                aria-hidden="true"
            ></i>
            ${ubicacion}
        `;
    }

    if (entradaEvento) {
        entradaEvento.innerHTML = `
            <i
                class="fa-solid fa-ticket"
                aria-hidden="true"
            ></i>
            ${entrada}
        `;
    }

    tarjetaEvento.hidden = false;
}


function mostrarEstadoSinEventos() {

    if (!tarjetaEvento) {
        return;
    }

    if (etiquetaEvento) {
        etiquetaEvento.textContent =
            "Agenda";
    }

    if (tituloEvento) {
        tituloEvento.textContent =
            "Próximamente";
    }

    if (fechaEvento) {
        fechaEvento.innerHTML = `
            <i
                class="fa-solid fa-calendar-days"
                aria-hidden="true"
            ></i>
            No hay nuevas fechas anunciadas
        `;
    }

    if (ubicacionEvento) {
        ubicacionEvento.innerHTML = `
            <i
                class="fa-solid fa-location-dot"
                aria-hidden="true"
            ></i>
            Sigue mis redes para novedades
        `;
    }

    if (entradaEvento) {
        entradaEvento.innerHTML = `
            <i
                class="fa-solid fa-ticket"
                aria-hidden="true"
            ></i>
            Nuevas sesiones próximamente
        `;
    }
}


async function cargarProximoEvento() {

    if (
        GOOGLE_CALENDAR_API_KEY ===
        "PEGA_AQUI_TU_CLAVE_DE_API"
    ) {
        console.error(
            "Falta configurar la clave de Google Calendar."
        );

        return;
    }

    const parametros =
        new URLSearchParams({
            key: GOOGLE_CALENDAR_API_KEY,
            timeMin: new Date().toISOString(),
            singleEvents: "true",
            orderBy: "startTime",
            maxResults: "1",
            showDeleted: "false"
        });

    const calendarioCodificado =
        encodeURIComponent(
            GOOGLE_CALENDAR_ID
        );

    const url =
        `https://www.googleapis.com/calendar/v3/calendars/${calendarioCodificado}/events?${parametros.toString()}`;

    try {

        const respuesta =
            await fetch(url);

        if (!respuesta.ok) {

            const errorGoogle =
                await respuesta
                    .json()
                    .catch(() => null);

            console.error(
                "Error de Google Calendar:",
                respuesta.status,
                errorGoogle
            );

            return;
        }

        const datos =
            await respuesta.json();

        const proximoEvento =
            datos.items?.[0];

        if (!proximoEvento) {
            mostrarEstadoSinEventos();
            return;
        }

        mostrarEventoEnLaWeb(
            proximoEvento
        );

    } catch (error) {

        console.error(
            "No se pudo cargar Google Calendar:",
            error
        );
    }
}


cargarProximoEvento();
});
/* ==========================================
   SOBRE MÍ
========================================== */

const botonAbrirSobreMi =
    document.getElementById("abrir-sobre-mi");

const botonCerrarSobreMi =
    document.getElementById("cerrar-sobre-mi");

const seccionSobreMi =
    document.getElementById("sobre-mi");

if (
    botonAbrirSobreMi &&
    botonCerrarSobreMi &&
    seccionSobreMi
) {

    botonAbrirSobreMi.addEventListener(
        "click",
        (evento) => {

            evento.preventDefault();

            const estaAbierto =
                seccionSobreMi.getAttribute(
                    "aria-hidden"
                ) === "false";

            seccionSobreMi.setAttribute(
                "aria-hidden",
                estaAbierto ? "true" : "false"
            );

            botonAbrirSobreMi.setAttribute(
                "aria-expanded",
                estaAbierto ? "false" : "true"
            );

            if (!estaAbierto) {

                window.setTimeout(() => {

                    seccionSobreMi.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }, 50);

            }

        }
    );


    botonCerrarSobreMi.addEventListener(
        "click",
        () => {

            seccionSobreMi.setAttribute(
                "aria-hidden",
                "true"
            );

            botonAbrirSobreMi.setAttribute(
                "aria-expanded",
                "false"
            );

            botonAbrirSobreMi.focus();

        }
    );

}