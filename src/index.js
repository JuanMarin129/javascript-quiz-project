document.addEventListener("DOMContentLoaded", () => {
  /************  HTML ELEMENTS  ************/
  // View divs
  const quizView = document.querySelector("#quizView"); // Selecciona la Vista Inicial
  const endView = document.querySelector("#endView"); // Selecciona la Vista Final

  // Quiz view elements
  const progressBar = document.querySelector("#progressBar");
  const questionCount = document.querySelector("#questionCount");
  const questionContainer = document.querySelector("#question");
  const choiceContainer = document.querySelector("#choices");
  const nextButton = document.querySelector("#nextButton");
  const restartButton = document.querySelector("#restartButton");

  // End view elements
  const resultContainer = document.querySelector("#result");

  /************  SET VISIBILITY OF VIEWS  ************/

  // Show the quiz view (div#quizView) and hide the end view (div#endView)
  quizView.style.display = "block";
  endView.style.display = "none";

  /************  QUIZ DATA  ************/

  // Array with the quiz questions
  const questions = [
    new Question("Samuel se parece al Xocas", ["Bastante", "Son idénticos", "Son hermanos", "Son gallegos"], "Son gallegos", 1),
    new Question(
      "¿El Poro matará algún día a Juan?",
      ["Es posible", "No, es un Poro pacífico", "El LoL arruina tu vida", "No, fue el regalo de un amigo"],
      "No, fue el regalo de un amigo",
      1
    ),
    new Question(
      "A Kurt lo que menos le gusta es...",
      ["Madrugar", "Ducharse", "Otras mujeres", "Afeitarse"],
      "Madrugar",
      2
    ),
    new Question(
      "¿Qué edad tiene Jorge?",
      ["32 (pero no es su edad)", "37 (pero no es su edad)", "38 (pero no es su edad)", "Ninguna de las anteriores"],
      "Ninguna de las anteriores",
      1
    ),
    new Question(
      "¿Con qué tiene pesadillas Alejandro por las noches?",
      ["Con strings", "Con arrays", "Con objetos", "Todas las anteriores"],
      "Todas las anteriores",
      1
    ), 
    new Question(
      "¿Quién manda en casa de Samuel?",
      ["El propio Samuel", "Sus funkos (no tiene)", "Sus peluches", "El perro"],
      "El perro",
      1
    ), 
    new Question(
      "¿Qué cosas ha visto el Pikachu de Kurt?",
      ["A otros Pokemon", "Nuestras caras por Zoom", "Cosas turbias", "A Kurt durmiendo"],
      "Cosas turbias",
      1
    ), 
    new Question(
      "¿En qué ciudad viven los personajes de 'Friends'?",
      ["Murcia", "California", "Nueva York", "Texas"],
      "Nueva York",
      1
    ), 
    new Question(
      "¿En cuál serie sale el personaje de Walter White?",
      ["CSI", "Breaking Bad", "Sexo en Nueva York", "Embrujadas"],
      "Breaking Bad",
      1
    ), 
    new Question(
      "¿Cómo se llama el personaje de Hackerman en 'Kung Fury'",
      ["Mitch Buchannon", "Neo", "Hackerman", "Cipher"],
      "Hackerman",
      1
    )
    // Add more questions here
  ];
  const quizDuration = 300; // 300 seconds (5 minutes)

  /************  QUIZ INSTANCE  ************/

  // Create a new Quiz instance object
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  // Shuffle the quiz questions
  quiz.shuffleQuestions();

  /************  SHOW INITIAL CONTENT  ************/

  // Convert the time remaining in seconds to minutes and seconds, and pad the numbers with zeros if needed
  const minutes = Math.floor(quiz.timeRemaining / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

  // Display the time remaining in the time remaining container
  const timeRemainingContainer = document.getElementById("timeRemaining");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;

  // Show first question
  showQuestion();

  /************  TIMER  ************/

  let timer;

  timer = setInterval ( () => {
    // Decrecentamos el timeRemaining en 1 por cada segundo que pasa
    quiz.timeRemaining -= 1;
    //console.log(quiz.timeRemaining + " esto es el timeRemaining");

    // Mostramos el timeRemaining en minutos y segundos para ponerlo en el innerText de timeRemainingContainer
    let minutos = Math.floor(quiz.timeRemaining / 60)
    .toString()
    .padStart(2, "0");
    let segundos = (quiz.timeRemaining % 60).toString().padStart(2, "0");
    timeRemainingContainer.innerText = `${minutos}:${segundos}`;
    
    // Cuando el tiempo llegue a cero, clear del Interval y llamamos a showResult.
    if(quiz.timeRemaining === 0) {
      clearInterval(timer);
      showResults();
    }
    
  },1000) // 1 segundo









/*
  let timer;

  function startTimer() {
    let totalSeconds = quiz.timeRemaining; // total de secs y mins

    function updateTimer() {
      let minuts = Math.floor(totalSeconds / 60);
      let seconds = totalSeconds % 60; // calculo los mins y secs

      if (seconds < 10) {
        seconds = "0" + seconds;
        function startTimer() {
          let totalSeconds = quiz.timeRemaining; // total de secs y mins

          function updateTimer() {

            let minuts = Math.floor(totalSeconds / 60);
            let seconds = totalSeconds % 60; // calculo los mins y secs

            
            if (seconds < 10) { // añado un 0 si es menor que 10
              seconds = "0" + seconds;
            }
          }
        }
      }
  }*/



  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);
  restartButton.addEventListener("click", reiniciarQuiz);


  /************  FUNCTIONS  ************/

  // showQuestion() - Displays the current question and its choices
  // nextButtonHandler() - Handles the click on the next button
  // showResults() - Displays the end view and the quiz results

  function showQuestion() {
    // If the quiz has ended, show the results
    if (quiz.hasEnded()) {
      showResults();
      return;
    }

    // Clear the previous question text and question choices
    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    // Get the current question from the quiz by calling the Quiz class method `getQuestion()`
    const question = quiz.getQuestion();
    // Shuffle the choices of the current question by calling the method 'shuffleChoices()' on the question object
    question.shuffleChoices();

    // YOUR CODE HERE:
    //
    // 1. Show the question
    // Update the inner text of the question container element and show the question text

    // El texto de la pregunta
    questionContainer.innerText = question.text;

    // Las respuestas disponibles que tendrá el usuario

    for (let i = 0; i < question.choices.length; i++) {
       // Creamos el elemento "li" junto con el elemento "input type radio"
      const crearRespuesta = document.createElement("li");
      crearRespuesta.innerHTML = `<input type="radio" name="choice" value="${question.choices[i]}" />
      <label for=""> ${question.choices[i]}</label>`; 

      // Añadimos el HTML a la parte de choice del index para mostrar todas las respuestas disponibles
      choiceContainer.append(crearRespuesta);
    }

    /*
    console.log(question.choices);
    console.log(question.choices[0]);
    console.log(question.choices[1]);

    console.log(quiz);
    console.log("Esto es el quiz");
    console.log(question);
    console.log("Esto es el question");
    */

    // 2. Update the green progress bar
    // Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered

    // Sacamos el índice actual de Quiz y lo dividimos entre su longitud. Multiplicamos por 100 porque necesitamos un porcentaje.
    let indicePreguntas = quiz.currentQuestionIndex;
    let progreso = (indicePreguntas / quiz.questions.length) * 100;

    // Pruebas realizadas
    // 0.5 * 100
    // 0.75 * 100
    // 0.25 * 100

    // Progreso de la barra
    progressBar.style.width = `${progreso}%`; // This value is hardcoded as a placeholder

    // 3. Update the question count text
    // Update the question count (div#questionCount) show the current question out of total questions


    // Para saber en qué pregunta estamos. Debemos añadir un +1 porque currenQuestionIndex empieza en 0
    const preguntaActual = quiz.currentQuestionIndex + 1;

    questionCount.innerText = `Question ${preguntaActual}  of ${quiz.questions.length}`; //  This value is hardcoded as a placeholder

    // 4. Create and display new radio input element with a label for each choice.
    // Loop through the current question `choices`.
    // For each choice create a new radio input with a label, and append it to the choice container.
    // Each choice should be displayed as a radio input element with a label:
    /* 
          <input type="radio" name="choice" value="CHOICE TEXT HERE">
          <label>CHOICE TEXT HERE</label>
        <br>
      */
    // Hint 1: You can use the `document.createElement()` method to create a new element.
    // Hint 2: You can use the `element.type`, `element.name`, and `element.value` properties to set the type, name, and value of an element.
    // Hint 3: You can use the `element.appendChild()` method to append an element to the choices container.
    // Hint 4: You can use the `element.innerText` property to set the inner text of an element.
  }

  function nextButtonHandler() {
    let selectedAnswer; // A variable to store the selected answer value

    // YOUR CODE HERE:

    // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.

    // Seleccinamos toda la parte de los "input" y los metemos en un NodeList
    const choicesNodeList = document.querySelectorAll("input");
    //console.log(choicesNodeList);


    // 2. Loop through all the choice elements and check which one is selected
    // Hint: Radio input elements have a property `.checked` (e.g., `element.checked`).
    //  When a radio input gets selected the `.checked` property will be set to true.
    //  You can use check which choice was selected by checking if the `.checked` property is true.

    // Recorremos el choicesNodeList y vemos cuál ha sido seleccionado por el usuario. 
    for (let i = 0; i < choicesNodeList.length; i++) {
      if (choicesNodeList[i].checked) {
        //console.log(`esta es la respuesta seleccionada ${choicesNodeList[i].value}`);
        selectedAnswer = choicesNodeList[i].value;
      }
    }

    // Comprobamos si la respuesta del usuario es la correcta o no. Si lo es, hacemos +1 a correcAnswer (ver función checkAnswer)
    quiz.checkAnswer(selectedAnswer);

    // Avanzamos a la siguiente posición del array de Questions, "limpiamos" pantalla y mostramos nueva pregunta
    quiz.moveToNextQuestion();
    showQuestion();



    
    // 3. If an answer is selected (`selectedAnswer`), check if it is correct and move to the next question
    // Check if selected answer is correct by calling the quiz method `checkAnswer()` with the selected answer.
    // Move to the next question by calling the quiz method `moveToNextQuestion()`.
    // Show the next question by calling the function `showQuestion()`.
  }

  function reiniciarQuiz() {

      quizView.style.display = "block";
      endView.style.display = "none";
      quiz.correctAnswers = 0;
      quiz.currentQuestionIndex = 0;

      quiz.timeRemaining = quizDuration;
      clearInterval(timer);

      quiz.shuffleQuestions();
      showQuestion();



    timer = setInterval ( () => {
    // Decrecentamos el timeRemaining en 1 por cada segundo que pasa
    quiz.timeRemaining -= 1;

    // Mostramos el timeRemaining en minutos y segundos para ponerlo en el innerText de timeRemainingContainer
    let minutos = Math.floor(quiz.timeRemaining / 60)
    .toString()
    .padStart(2, "0");
    let segundos = (quiz.timeRemaining % 60).toString().padStart(2, "0");
    timeRemainingContainer.innerText = `${minutos}:${segundos}`;
    
    // Cuando el tiempo llegue a cero, clear del Interval y llamamos a showResult.
    if(quiz.timeRemaining === 0) {
      clearInterval(timer);
      showResults();
    }
    
  },1000) // 1 segundo

  }

  function showResults() {
    // YOUR CODE HERE:
    //
    // 1. Hide the quiz view (div#quizView)
    quizView.style.display = "none";

    // 2. Show the end view (div#endView)
    endView.style.display = "flex";

    // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions

    // quiz.correctAnwser => cantidad de respuestas acertadas. | quiz.questions.length => cantidad total de preguntas que tiene el array questions
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`; // This value is hardcoded as a placeholder
  }
});
