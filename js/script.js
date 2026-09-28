"use strict";

/* ==========================================================
CRISTIANCURSOS - MINI QUIZZES
========================================================== */

const quizzes = {
sumar: {
preguntas: [
{
pregunta: "¿Cuánto es 3 + 2?",
opciones: ["4", "5", "6"],
correcta: 1
},
{
pregunta: "¿Cuánto es 4 + 2?",
opciones: ["5", "6", "7"],
correcta: 1
},
{
pregunta: "Si tienes 3 estrellas y recibes 2 más, ¿cuántas tienes?",
opciones: ["4", "5", "6"],
correcta: 1
}
]
},

dividir: {
preguntas: [
{
pregunta: "¿Qué significa dividir?",
opciones: [
"Juntar todas las cosas",
"Repartir una cantidad en partes iguales",
"Contar hasta diez"
],
correcta: 1
},
{
pregunta: "Si repartes 6 galletas entre 2 niños por igual, ¿cuántas recibe cada uno?",
opciones: ["2", "3", "4"],
correcta: 1
},
{
pregunta: "¿Cuánto es 10 dividido entre 2?",
opciones: ["4", "5", "6"],
correcta: 1
}
]
},

zapatos: {
preguntas: [
{
pregunta: "¿Qué debemos tomar para comenzar a amarrar los zapatos?",
opciones: [
"Un cordón con cada mano",
"Los calcetines",
"El zapato de otra persona"
],
correcta: 0
},
{
pregunta: "¿Qué hacemos después de cruzar los cordones?",
opciones: [
"Cortar los cordones",
"Pasar un cordón por debajo del otro",
"Quitarnos el zapato"
],
correcta: 1
},
{
pregunta: "En el método de las dos orejas de conejo, ¿qué formamos?",
opciones: [
"Dos lazos",
"Dos zapatos",
"Dos nudos diferentes"
],
correcta: 0
}
]
},

internet: {
preguntas: [
{
pregunta: "¿Qué debes hacer con tus contraseñas?",
opciones: [
"Compartirlas con desconocidos",
"Publicarlas en internet",
"Mantenerlas en secreto"
],
correcta: 2
},
{
pregunta: "¿Qué debes hacer si una persona desconocida te escribe en internet?",
opciones: [
"Dar tus datos personales",
"Seguir hablando con ella",
"Dejar de hablar y contárselo a un adulto"
],
correcta: 2
},
{
pregunta: "¿A quién puedes acudir si algo en internet te preocupa?",
opciones: [
"A un adulto de confianza",
"A una persona desconocida",
"A nadie"
],
correcta: 0
}
]
},

dientes: {
preguntas: [
{
pregunta: "¿Para qué sirve el cepillo de dientes?",
opciones: [
"Para limpiar los dientes",
"Para peinarse",
"Para dibujar"
],
correcta: 0
},
{
pregunta: "¿Cómo debemos cepillar los dientes?",
opciones: [
"Apretando muy fuerte",
"Con movimientos suaves",
"Sin mover el cepillo"
],
correcta: 1
},
{
pregunta: "¿Quién puede ayudarte a aprender una buena técnica para cepillarte?",
opciones: [
"Un adulto",
"Una persona desconocida",
"Nadie"
],
correcta: 0
}
]
}
};

/* ==========================================================
CREAR UNA PREGUNTA
========================================================== */

function crearPregunta(pregunta, numero, quizId) {
const fieldset = document.createElement("fieldset");
fieldset.className = "quiz-pregunta";

const legend = document.createElement("legend");

legend.textContent =
${numero + 1}. ${pregunta.pregunta};

fieldset.appendChild(legend);

pregunta.opciones.forEach((opcion, indice) => {
const contenedor = document.createElement("div");

contenedor.className = "quiz-opcion";

const input = document.createElement("input");

input.type = "radio";
input.name = `${quizId}-pregunta-${numero}`;
input.id = `${quizId}-pregunta-${numero}-opcion-${indice}`;
input.value = indice;

const label = document.createElement("label");

label.htmlFor = input.id;
label.textContent = opcion;

contenedor.appendChild(input);
contenedor.appendChild(label);

fieldset.appendChild(contenedor);


});

return fieldset;
}

/* ==========================================================
CREAR EL QUIZ
========================================================== */

function crearQuiz(contenedor, quizId) {
const quiz = quizzes[quizId];

if (!quiz) {
return;
}

const formulario = document.createElement("form");

formulario.className = "quiz-form";

quiz.preguntas.forEach((pregunta, numero) => {
const elementoPregunta =
crearPregunta(pregunta, numero, quizId);

formulario.appendChild(elementoPregunta);


});

/* Botón de comprobar */
const botonComprobar =
document.createElement("button");

botonComprobar.type = "submit";
botonComprobar.className = "quiz-boton";
botonComprobar.textContent = "Comprobar respuestas";

/* Resultado */
const resultado =
document.createElement("p");

resultado.className = "quiz-resultado";
resultado.setAttribute("aria-live", "polite");
resultado.setAttribute("role", "status");

/* Botón de reiniciar */
const botonReiniciar =
document.createElement("button");

botonReiniciar.type = "button";
botonReiniciar.className = "quiz-reiniciar";
botonReiniciar.textContent = "Reiniciar quiz";
botonReiniciar.hidden = true;

formulario.appendChild(botonComprobar);
formulario.appendChild(botonReiniciar);
formulario.appendChild(resultado);

contenedor.appendChild(formulario);

/* Comprobar respuestas */
formulario.addEventListener("submit", function(evento) {
evento.preventDefault();

comprobarQuiz(
  formulario,
  quiz,
  quizId,
  resultado,
  botonComprobar,
  botonReiniciar
);


});

/* Reiniciar quiz */
botonReiniciar.addEventListener("click", function() {
reiniciarQuiz(
formulario,
resultado,
botonComprobar,
botonReiniciar
);
});
}

/* ==========================================================
COMPROBAR QUIZ
========================================================== */

function comprobarQuiz(
formulario,
quiz,
quizId,
resultado,
botonComprobar,
botonReiniciar
) {
let puntuacion = 0;
let todasRespondidas = true;

quiz.preguntas.forEach(function(pregunta, numero) {

const selector =
  `input[name="${quizId}-pregunta-${numero}"]`;

const opciones =
  formulario.querySelectorAll(selector);

const seleccionada =
  formulario.querySelector(
    `${selector}:checked`
  );


/* Validar respuesta */
if (!seleccionada) {
  todasRespondidas = false;
  return;
}


const respuesta =
  Number(seleccionada.value);

const contenedorSeleccionado =
  seleccionada.closest(".quiz-opcion");


/* Limpiar resultados anteriores */
opciones.forEach(function(opcion) {

  const contenedor =
    opcion.closest(".quiz-opcion");

  contenedor.classList.remove(
    "respuesta-correcta",
    "respuesta-incorrecta"
  );

  const mensaje =
    contenedor.querySelector(
      ".respuesta-mensaje"
    );

  if (mensaje) {
    mensaje.remove();
  }
});


/* Comprobar respuesta */
if (respuesta === pregunta.correcta) {

  puntuacion++;

  marcarRespuesta(
    contenedorSeleccionado,
    true
  );

} else {

  marcarRespuesta(
    contenedorSeleccionado,
    false
  );


  const respuestaCorrecta =
    opciones[pregunta.correcta];

  if (respuestaCorrecta) {

    marcarRespuesta(
      respuestaCorrecta.closest(".quiz-opcion"),
      true
    );
  }
}


});

/* Faltan respuestas */
if (!todasRespondidas) {

resultado.textContent =
  "Debes seleccionar una respuesta en cada pregunta antes de continuar.";

resultado.className =
  "quiz-resultado quiz-aviso";

return;


}

/* Mostrar puntuación */
mostrarResultado(
resultado,
puntuacion,
quiz.preguntas.length
);

/* Desactivar opciones */
formulario
.querySelectorAll('input[type="radio"]')
.forEach(function(input) {
input.disabled = true;
});

botonComprobar.disabled = true;

botonReiniciar.hidden = false;
}

/* ==========================================================
MARCAR RESPUESTA
========================================================== */

function marcarRespuesta(contenedor, correcta) {

if (!contenedor) {
return;
}

if (correcta) {

contenedor.classList.add(
  "respuesta-correcta"
);


} else {

contenedor.classList.add(
  "respuesta-incorrecta"
);


}

const mensaje =
document.createElement("span");

mensaje.className =
"respuesta-mensaje";

mensaje.textContent = correcta
? " ✓ Respuesta correcta"
: " ✗ Respuesta incorrecta";

contenedor.appendChild(mensaje);
}

/* ==========================================================
MOSTRAR RESULTADO
========================================================== */

function mostrarResultado(
resultado,
puntuacion,
total
) {
const porcentaje =
(puntuacion / total) * 100;

let mensaje;

if (porcentaje === 100) {

mensaje =
  "¡Excelente! Has respondido todas correctamente.";


} else if (porcentaje >= 66) {

mensaje =
  "¡Muy bien! Has aprendido mucho.";


} else if (porcentaje >= 33) {

mensaje =
  "¡Buen intento! Repasa las lecciones y vuelve a intentarlo.";


} else {

mensaje =
  "Sigue practicando. Repasa las lecciones y vuelve a intentarlo.";


}

resultado.textContent =
Tu puntuación es ${puntuacion} de ${total}. ${mensaje};

resultado.className =
"quiz-resultado quiz-final";
}

/* ==========================================================
REINICIAR QUIZ
========================================================== */

function reiniciarQuiz(
formulario,
resultado,
botonComprobar,
botonReiniciar
) {
formulario.reset();

/* Activar nuevamente los radios */
formulario
.querySelectorAll('input[type="radio"]')
.forEach(function(input) {
input.disabled = false;
});

/* Eliminar colores y mensajes */
formulario
.querySelectorAll(".quiz-opcion")
.forEach(function(opcion) {

  opcion.classList.remove(
    "respuesta-correcta",
    "respuesta-incorrecta"
  );

  const mensaje =
    opcion.querySelector(
      ".respuesta-mensaje"
    );

  if (mensaje) {
    mensaje.remove();
  }
});


resultado.textContent =
"El quiz se ha reiniciado. Selecciona una respuesta para cada pregunta.";

resultado.className =
"quiz-resultado quiz-aviso";

botonComprobar.disabled = false;

botonReiniciar.hidden = true;

/* Foco en la primera opción */
const primeraOpcion =
formulario.querySelector(
'input[type="radio"]'
);

if (primeraOpcion) {
primeraOpcion.focus();
}
}

/* ==========================================================
INICIAR QUIZZES
========================================================== */

function iniciarQuizzes() {

const contenedores =
document.querySelectorAll("[data-quiz]");

contenedores.forEach(function(contenedor) {

const quizId =
  contenedor.dataset.quiz;

crearQuiz(
  contenedor,
  quizId
);


});
}

/* ==========================================================
INICIO
========================================================== */

if (document.readyState === "loading") {

document.addEventListener(
"DOMContentLoaded",
iniciarQuizzes
);

} else {

iniciarQuizzes();
}