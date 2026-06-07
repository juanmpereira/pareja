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
    subtitle: "Pista: En ese viaje me depilaste las axilas.",
    options: ["Cordoba", "San clemente", "Costa del este", "Mar del tuyu"],
    correct: "San clemente",
    photo: "assets/momento-2.jpg",
    momentTitle: "Nuestro primer viaje",
    momentCaption: "A conocer a toda mi familia.",
  },
  {
    title: "3. Cual fue la primer pelicula que vimos en el cine?",
    subtitle: "Muy buena pelicula .",
    options: ["Tornados", "El cuervo", "La trampa", "Sonrie"],
    correct: "Tornados",
    photo: "assets/momento-3.jpg",
    momentTitle: "Nuestra primera pelicula",
    momentCaption: "Siempre con un balde de pochoclos.",
  },
  {
    title: "4. En que restaurant festejamos nuestro primer mes de novios?",
    subtitle: "Y brindamos con champagne",
    options: ["Aire libre", "Nu fuegos", "Vico", "Invernadero"],
    correct: "Nu fuegos",
    photo: "assets/momento-4.jpg",
    momentTitle: "Nuestro primer mes",
    momentCaption: "Hay que volver por favor lo bien que comimos.",
  },
  {
    title: "5. Cual es el mejor dia del año?",
    subtitle: "Ya casi llegamos al final.",
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
const videoUploadInput = document.getElementById("video-upload");
const favoriteVideo = document.getElementById("favorite-video");
const videoHint = document.getElementById("video-hint");
const datePhoto1 = document.getElementById("date-photo-1");
const datePhoto2 = document.getElementById("date-photo-2");
const ourPhoto = document.getElementById("our-photo");

let activeVideoObjectUrl = null;
const defaultVideoCandidates = ["assets/video.mp4", "assets/favorito.mp4", "assets/video-favorito.mp4", "assets/favorito.mov"];

function setVideoHint(message) {
  if (!videoHint) {
    return;
  }

  videoHint.textContent = message;
}

function runCinematicIntro(photoElement) {
  if (!photoElement) {
    return;
  }

  photoElement.classList.remove("cinematic-enter");
  void photoElement.offsetWidth;
  photoElement.classList.add("cinematic-enter");
}

async function loadDefaultFavoriteVideo() {
  for (const candidate of defaultVideoCandidates) {
    try {
      const response = await fetch(candidate, { method: "HEAD" });

      if (!response.ok) {
        continue;
      }

      favoriteVideo.src = candidate;
      favoriteVideo.load();
      setVideoHint(`Video por defecto cargado: ${candidate}. Si queres, podes reemplazarlo desde el celu.`);
      return;
    } catch {
      // Si falla la verificacion, probamos con el siguiente archivo posible.
    }
  }
}

function transitionCards(fromCard, toCard, onEntered) {
  fromCard.classList.add("card-exit");

  fromCard.addEventListener(
    "animationend",
    () => {
      fromCard.classList.add("hidden");
      fromCard.classList.remove("card-exit");

      toCard.classList.remove("hidden");
      toCard.classList.add("card-enter");

      toCard.addEventListener(
        "animationend",
        () => {
          toCard.classList.remove("card-enter");

          if (typeof onEntered === "function") {
            onEntered();
          }
        },
        { once: true }
      );
    },
    { once: true }
  );
}

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
    transitionCards(quizCard, specialDateCard);
    return;
  }

  answerFeedback.textContent = "Bien! Acertaste.";
  answerFeedback.className = "answer-feedback success";
  questionActions.innerHTML = "";
  momentTitle.textContent = q.momentTitle;
  momentPhoto.src = q.photo;
  momentCaption.textContent = q.momentCaption;
  momentCard.classList.remove("hidden");
  runCinematicIntro(momentPhoto);
}

function nextQuestion() {
  currentQuestion += 1;
  renderQuestion();
}

nextBtn.addEventListener("click", nextQuestion);

continueToProposalBtn.addEventListener("click", () => {
  transitionCards(specialDateCard, proposalCard);
});

proposalNoBtn.addEventListener("click", () => {
  proposalFeedback.textContent = "Esa no era la respuesta correcta... intenta otra vez mi amor.";
});

proposalYesBtn.addEventListener("click", () => {
  transitionCards(proposalCard, finalCard, () => {
    runCinematicIntro(ourPhoto);
  });
});

if (videoUploadInput) {
  videoUploadInput.addEventListener("change", (event) => {
    const file = event.target.files && event.target.files[0];

    if (!file) {
      return;
    }

    if (activeVideoObjectUrl) {
      URL.revokeObjectURL(activeVideoObjectUrl);
    }

    activeVideoObjectUrl = URL.createObjectURL(file);
    favoriteVideo.src = activeVideoObjectUrl;
    favoriteVideo.load();
    setVideoHint(`Video cargado: ${file.name}`);
  });
}

runCinematicIntro(datePhoto1);
runCinematicIntro(datePhoto2);
loadDefaultFavoriteVideo();
renderQuestion();
