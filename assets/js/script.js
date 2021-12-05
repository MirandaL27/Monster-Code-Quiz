//start screen -start button
//opponent - image of the monster
//quiz questions
//high score screen
//health (player and opponent)
//game over screen
//screen to enter initials for the high score

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
}

var quizQuestions = [];
//var playerHealth = 50;


//object that keeps track of game's state
class gameState{
    playerHealth;
    opponentHealth;
    opponentAttack;
    questionCounter;
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

var buildQuizQuestion = function(){
    //generates HTML elements for quiz questions
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

var quizQuestions = function(){
    //add questions to the quiz here!
}

