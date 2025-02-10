class Question {  // 1 Construcción
    constructor(text, choices, answer, difficulty) {
        this.text = text;
        this.choices = choices
        this.answer = answer
        this.difficulty = difficulty
    }

    shuffleChoices() {

        let indiceActual = this.choices.length, temporal, indiceAleatorio;

        while (indiceActual !== 0) {

            indiceAleatorio = Math.floor(Math.random() * indiceActual);
            indiceActual--;
        
            temporal = this.choices[indiceActual];
            this.choices[indiceActual] = this.choices[indiceAleatorio];
            this.choices[indiceAleatorio] = temporal;
          }
          console.log(this.choices);
        }
    }