const set = []
let questionCounts = [0,1,2,3]
let wrongButton1 = document.createElement("button")
let wrongButton2 = document.createElement("button")
let wrongButton3 = document.createElement("button")
let rightButton = document.createElement("button")
let buttonGroup = [wrongButton1 , wrongButton2 , wrongButton3 , rightButton]
let count = 0
let questionCount = 0
const textDisplay = document.getElementById('question')
const score =  document.getElementById('score')
const reload = document.getElementById('reload')
let response = document.getElementById("response")

const load = async (callback) => {
    const request = await fetch('https://the-trivia-api.com/api/questions')
    const data = await request.json()
    callback(data)
}

const game = (questions) => {
    score.innerHTML = count
    question = questions[questionCount]
    textDisplay.innerHTML = question.question
    let wrong = question.wrongAnswers
    let right = question.correctAnswer
    rightButton.innerHTML = right
    wrongButton1.innerHTML = wrong[0] 
    wrongButton2.innerHTML = wrong[1]
    wrongButton3.innerHTML = wrong[2]
    shuffle(buttonGroup)
    buttonGroup.forEach(button => {
        document.body.appendChild(button)
    })
    rightButton.onclick = () => {
        response.innerHTML = "correct"
        nextQuestion()
        count++
    }
    wrongButton1.onclick = () => {
        response.innerHTML = "wrong"
        nextQuestion()
    }
    wrongButton2.onclick = () => {
        response.innerHTML = "wrong"
        nextQuestion()
    }
    wrongButton3.onclick = () => {
        response.innerHTML = "wrong"
        nextQuestion()
    }
}

function gameSet(questions){
    questions.forEach(element => {
        set.push({
            question: element.question,
            wrongAnswers: element.incorrectAnswers,
            correctAnswer: element.correctAnswer
        }) 
    });
    game(set)
}

function nextQuestion(){
    buttonGroup.forEach(button => {
        button.remove()
    })
    questionCount++
    if (typeof(questionCount/10) == typeof(1)){
        load(gameSet)
    }
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}


load(gameSet)








