const questions = [
  {
    title: "1. Que fue lo primero que te cocine?",
    subtitle: "Elegi una opcion para seguir avanzando.",
    options: ["Picada", "Pastas", "Pizza", "Carne al horno"],
    correct: "Pizza",
    photo: "assets/momento-1.svg",
    momentTitle: "Nuestro primer plato juntos",
    momentCaption: "Reemplaza esta imagen por la foto de ese dia.",
  },
  {
    title: "2. Cual fue nuestro primer viaje juntos?",
    subtitle: "Pista: fue una escapada hermosa.",
    options: ["Cordoba", "San clemente", "Costa del este", "Mar del tuyu"],
    correct: "San clemente",
    photo: "assets/momento-2.svg",
    momentTitle: "Nuestro primer viaje",
    momentCaption: "Agrega aqui una foto de San Clemente.",
  },
  {
    title: "3. Cual fue la primer pelicula que vimos en el cine?",
    subtitle: "Seguro te acordas de esta.",
    options: ["Tornados", "El cuervo", "La trampa", "Sonrie"],
    correct: "Tornados",
    photo: "assets/momento-3.svg",
    momentTitle: "Nuestra primera pelicula",
    momentCaption: "Pon una foto de esa salida al cine.",
  },
  {
    title: "4. En que restaurant festejamos nuestro primer mes de novios?",
    subtitle: "A ver si coincidimos...",
    options: ["Aire libre", "Nu fuegos", "Vico", "Invernadero"],
    correct: "Nu fuegos",
    photo: "assets/momento-4.svg",
    momentTitle: "Nuestro primer mes",
    momentCaption: "Suma una foto de ese festejo.",
  },
  {
    title: "5. Cual es el mejor dia del anio?",
    subtitle: "Ultima para desbloquear la gran pregunta.",
    options: ["26/11", "30/11", "09/06", "18/08"],
    correct: "18/08",
    photo: "assets/momento-5.svg",
    momentTitle: "El mejor dia del anio",
    momentCaption: "Puedes poner una foto especial de esa fecha.",
  },
];

let currentQuestion = 0;

const stepIndicator = document.getElementById("step-indicator");
const questionTitle = document.getElementById("question-title");
const questionSubtitle = document.getElementById("question-subtitle");
const questionActions = document.getElementById("question-actions");
const answerFeedback = document.getElementById("answer-feedback");
const momentCard = document.getElementById("moment-card");
const momentTitle = document.getElementById("moment-title");
const momentPhoto = document.getElementById("moment-photo");
const momentCaption = document.getElementById("moment-caption");
const nextBtn = document.getElementById("next-btn");

const quizCard = document.getElementById("quiz-card");
const finalCard = document.getElementById("final-card");

const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const resultMessage = document.getElementById("result-message");

const generateQrBtn = document.getElementById("generate-qr");
const qrWrapper = document.getElementById("qr-wrapper");
const qrImage = document.getElementById("qr-image");
const qrLink = document.getElementById("qr-link");
const urlInput = document.getElementById("url-input");

function renderQuestion() {
  const q = questions[currentQuestion];

  stepIndicator.textContent = `Pregunta ${currentQuestion + 1} de ${questions.length}`;
  questionTitle.textContent = q.title;
  questionSubtitle.textContent = q.subtitle;
  answerFeedback.textContent = "";
  answerFeedback.className = "answer-feedback";
  momentCard.classList.add("hidden");

  questionActions.innerHTML = "";

  q.options.forEach((label) => {
    const btn = document.createElement("button");
    btn.className = "btn btn-primary";
    btn.textContent = label;
    btn.addEventListener("click", () => evaluateAnswer(label));
    questionActions.appendChild(btn);
  });
}

function evaluateAnswer(selectedOption) {
  const q = questions[currentQuestion];

  if (selectedOption !== q.correct) {
    answerFeedback.textContent = "Casi... puedes volver a intentarlo todas las veces que quieras.";
    answerFeedback.className = "answer-feedback error";
    return;
  }

  answerFeedback.textContent = "Bien! Acertaste.";
  answerFeedback.className = "answer-feedback success";
  questionActions.innerHTML = "";
  momentTitle.textContent = q.momentTitle;
  momentPhoto.src = q.photo;
  momentCaption.textContent = q.momentCaption;
  momentCard.classList.remove("hidden");
}

function nextQuestion() {
  currentQuestion += 1;

  if (currentQuestion < questions.length) {
    renderQuestion();
    return;
  }

  quizCard.classList.add("hidden");
  finalCard.classList.remove("hidden");
}

function encodeUrl(value) {
  return encodeURIComponent(value.trim());
}

function isValidUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

yesBtn.addEventListener("click", () => {
  resultMessage.classList.remove("hidden");
  resultMessage.textContent = "Sabia que dirias que si. Te prometo hacerte feliz cada dia. Te amo.";
  noBtn.classList.add("hidden");
});

noBtn.addEventListener("mouseenter", () => {
  // Hace que el boton esquive el cursor para jugar.
  const maxX = 140;
  const maxY = 80;
  const offsetX = Math.round(Math.random() * maxX - maxX / 2);
  const offsetY = Math.round(Math.random() * maxY - maxY / 2);
  noBtn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
});

nextBtn.addEventListener("click", nextQuestion);

generateQrBtn.addEventListener("click", () => {
  const url = urlInput.value;

  if (!isValidUrl(url)) {
    alert("Pon un enlace valido que empiece con http:// o https://");
    return;
  }

  const qrApi = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeUrl(url)}`;
  qrImage.src = qrApi;
  qrLink.href = url;
  qrLink.textContent = url;
  qrWrapper.classList.remove("hidden");
});

renderQuestion();
