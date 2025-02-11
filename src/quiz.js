class Quiz {
  constructor(questions, timeLimit, timeRemaining) {
    this.questions = questions;
    this.timeLimit = timeLimit;
    this.timeRemaining = timeRemaining;
    this.correctAnswers = 0;
    this.currentQuestionIndex = 0;
  }

  getQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  moveToNextQuestion() {
    this.currentQuestionIndex += 1;
  }

  shuffleQuestions() {
    let indiceActual = this.questions.length,
      temporal,
      indiceAleatorio;

    while (indiceActual !== 0) {
      indiceAleatorio = Math.floor(Math.random() * indiceActual);
      indiceActual--;

      temporal = this.questions[indiceActual];
      this.questions[indiceActual] = this.questions[indiceAleatorio];
      this.questions[indiceAleatorio] = temporal;
    }
  }

  checkAnswer(answer) {
    if (this.questions[this.currentQuestionIndex].answer === answer)
      this.correctAnswers += 1;
  }
  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    } else if (this.currentQuestionIndex === this.questions.length) {
      return true;
    }
  }

  filterQuestionsByDifficulty(dificultad) {
    let listaQuestions = this.questions.filter((cadaQuestion) => {
      return cadaQuestion.difficulty === dificultad;
    });
    if (dificultad >= 1 && dificultad <= 3) this.questions = listaQuestions;
  }

  averageDifficulty() {
    let averageResult = this.questions.reduce((acum, cadaQuestion) => {
      return acum + cadaQuestion.difficulty;
    }, 0);

    return averageResult / this.questions.length;
  }
}
