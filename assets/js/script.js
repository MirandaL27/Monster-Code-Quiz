//start screen -start button
//opponent - image of the monster
//quiz questions
//high score screen
//health (player and opponent)
//game over screen
//screen to enter initials for the high score
var quizContainerEl = document.querySelector(".game-container");
var mainEl = document.querySelector("main");
class answer {
    text;
    isCorrect;
    constructor(answerText,correctness){
        this.text= answerText;
        this.isCorrect = correctness;
    }
}

class question{
    text;
    answers = [];
    pointValueForCorrectAnswer;
    pointValueForIncorrectAnswer;
}

var quizQuestions = [];
//var playerHealth = 50;


//object that keeps track of game's state
var gameState  = {
    playerHealth : 50,
    opponentHealth : 0,
    opponentAttack : 0,
    questionCounter : 1,
}

var resetContainerElement = function(){
    quizContainerEl.remove();
    quizContainerEl = document.createElement("section");
    quizContainerEl.className = "game-container";
    mainEl.appendChild(quizContainerEl);
}

var buildStartScreen = function(){
    //start button
    //basic instructions
}

var buildGameOverScreen = function(){
    //start over button
    //enter initials
}

var buildHighScoreScreen  = function(){
    //high score list from localstorage
}

var buildInitialsScreen = function(){
    //Input for initials 
    //save button - save initials and score to localStorage
}

var buildQuizQuestion = function(questionIndex){
    //generates HTML elements for quiz questions
    console.log("build question", questionIndex);
    resetContainerElement();
    var h2El = document.createElement("h2");
    h2El.textContent = "Question " + gameState.questionCounter + ": ";
    quizContainerEl.appendChild(h2El);

    var questionPEl = document.createElement("p");
    questionPEl.textContent = quizQuestions[questionIndex].text;
    questionPEl.className = "quiz-question"
    quizContainerEl.appendChild(questionPEl);

    for(var i =0; i<quizQuestions[questionIndex].answers.length; i++){
        var answerPEl = document.createElement("p");
        answerPEl.textContent = (i+1)+". " +quizQuestions[questionIndex].answers[i].text;
        answerPEl.className = "quiz-answer";
        quizContainerEl.appendChild(answerPEl);
    }
    gameState.questionCounter++;

}

var getOpponentImage = function(){
    //fetch request to API goes here!
    var monsterUrl = "https://app.pixelencounter.com/api/basic/monsters/random/" + "png";
    fetch(monsterUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          //set image src to api response here!
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to Monster API');
    });
}

var listQuizQuestions = function(){
    //add questions to the quiz here!
    var q = new question();
    q.text = "What does HTML stand for?"
    q.pointValueForCorrectAnswer = 10;
    q.pointValueForIncorrectAnswer = 20;
    q.answers = [new answer("Hypertext Markup Language","correct"), new answer("Hypertext Mark Language","incorrect"), new answer("Hyphentext Markdown Language","incorrect"), new answer("Hypertext Markdown Language","incorrect")];
    quizQuestions.push(q);

    var q = new question();
    q.text = "What does || stand for?"
    q.pointValueForCorrectAnswer = 15;
    q.pointValueForIncorrectAnswer  = 15;
    q.answers = [new answer("And","incorrect"), new answer("Not","incorrect"), new answer("Or","correct"), new answer("Is Less Than","incorrect")];
    quizQuestions.push(q);
    console.log(quizQuestions);
}



listQuizQuestions();
buildQuizQuestion(gameState.questionCounter-1);

//add event listener to quiz answers on click

mainEl.addEventListener("click",function(event){
    if(event.target.className == "quiz-answer"){
        console.log("answer clicked");
        buildQuizQuestion(gameState.questionCounter-1);
    } 
});
