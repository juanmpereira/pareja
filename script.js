const questions = [
  {
    title: "1. Que fue lo primero que te cocine?",
    subtitle: "Elegi una opcion para seguir avanzando.",
    options: ["Picada", "Pastas", "Pizza", "Carne al horno"],
    correct: "Pizza",
    photo: "assets/momento-1.jpg",
    momentTitle: "Nuestro primer plato juntos",
    momentCaption: "Un poquito quemadas pero se intentaron.",
  },
  {
    title: "2. Cual fue nuestro primer viaje juntos?",
    subtitle: "Pista: fue una escapada hermosa.",
    options: ["Cordoba", "San clemente", "Costa del este", "Mar del tuyu"],
    correct: "San clemente",
    photo: "assets/momento-2.jpg",
    momentTitle: "Nuestro primer viaje",
    momentCaption: "A conocer a toda mi familia.",
  },
  {
    title: "3. Cual fue la primer pelicula que vimos en el cine?",
    subtitle: "Seguro te acordas de esta.",
    options: ["Tornados", "El cuervo", "La trampa", "Sonrie"],
    correct: "Tornados",
    photo: "assets/momento-3.jpg",
    momentTitle: "Nuestra primera pelicula",
    momentCaption: "Peliculon ya la primera que vimos.",
  },
  {
    title: "4. En que restaurant festejamos nuestro primer mes de novios?",
    subtitle: "A ver si coincidimos...",
    options: ["Aire libre", "Nu fuegos", "Vico", "Invernadero"],
    correct: "Nu fuegos",
    photo: "assets/momento-4.jpg",
    momentTitle: "Nuestro primer mes",
    momentCaption: "Hay que volver por favor lo bien que comimos.",
  },
  {
    title: "5. Cual es el mejor dia del año?",
    subtitle: "Ultima para desbloquear la gran pregunta.",
    options: ["26/11", "30/11", "09/06", "18/08"],
    correct: "18/08",
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
const specialDateCard = document.getElementById("special-date-card");
const proposalCard = document.getElementById("proposal-card");
const finalCard = document.getElementById("final-card");
const continueToProposalBtn = document.getElementById("continue-to-proposal");
const proposalYesBtn = document.getElementById("proposal-yes-btn");
const proposalNoBtn = document.getElementById("proposal-no-btn");
const proposalFeedback = document.getElementById("proposal-feedback");

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
    answerFeedback.textContent = "Casi... puedes volver a intentarlo.";
    answerFeedback.className = "answer-feedback error";
    return;
  }

  if (currentQuestion === questions.length - 1) {
    quizCard.classList.add("hidden");
    specialDateCard.classList.remove("hidden");
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
  renderQuestion();
}

nextBtn.addEventListener("click", nextQuestion);

continueToProposalBtn.addEventListener("click", () => {
  specialDateCard.classList.add("hidden");
  proposalCard.classList.remove("hidden");
});

proposalNoBtn.addEventListener("click", () => {
  proposalFeedback.textContent = "Esa no era la respuesta correcta... intenta otra vez mi amor.";
});

proposalYesBtn.addEventListener("click", () => {
  proposalCard.classList.add("hidden");
  finalCard.classList.remove("hidden");
});

renderQuestion();
