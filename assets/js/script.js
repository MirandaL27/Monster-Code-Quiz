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
var health = 50;

//object that keeps track of game's state
var gameState  = {
    playerHealth : health,
    playerAttack : 20,
    opponentHealth : 0,
    opponentAttack : 0,
    questionCounter : 1,
    roundCounter : 1,
    answerWasCorrect : true,
    thisQuestionPlayerAttack: 0,
    thisQuestionOpponentAttack:0,
    opponentHasDied : false,
    playerHasDied : false,
    numberOfRounds : 3,
    pointsForKillingOpponent: 0,
    playerScore: 0,
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
    resetContainerElement();
    var h2El = document.createElement("h2");
    h2El.textContent = "Monster Code Quiz"
    quizContainerEl.appendChild(h2El);
    var pEl = document.createElement("p");
    pEl.textContent = "Answer the quiz questions to attack the monsters. Answering harder questions correctly will earn you extra attack. Be careful!  The monsters will attack you if you answer a question incorrectly! Complete all of the rounds to win the game!";
    quizContainerEl.appendChild(pEl);
    var buttonEl = document.createElement("button");
    buttonEl.textContent = "Start Game";
    buttonEl.className = "start-btn";
    quizContainerEl.appendChild(buttonEl);
}

var setRoundState = function(){
    gameState.opponentHealth = Math.floor(Math.random()*11 + 30);//opponent health is between 30 and 40 points
    gameState.opponentAttack = Math.floor(Math.random()*11 + 10);//opponent attack is between 10 and 20 points
    gameState.pointsForKillingOpponent = Math.floor((gameState.opponentHealth + gameState.opponentAttack)/2);
    gameState.opponentHasDied = false;
    //gameState.playerHealth = health;
    gameState.playerHasDied = false;
}

var displayGameState = function(){
    resetContainerElement();
    var h2El = document.createElement("h2");
    h2El.textContent = "Round " + gameState.roundCounter + " Update:"
    quizContainerEl.appendChild(h2El);

    var pEl = document.createElement("p");
    if(gameState.answerWasCorrect){
        pEl.textContent = "You answered correctly! ";
        //display confetti
       document.getElementById("confetti").style.display="block";
    }
    else{
        pEl.textContent = "You answered incorrectly!";
        //display thumbs down
        document.getElementById("thumbs-down").style.display="block";
       
    }
    quizContainerEl.appendChild(pEl);

    var pEl = document.createElement("p");
    pEl.textContent = "You have " + Math.max(gameState.playerHealth, 0) + " health points left.";
    quizContainerEl.appendChild(pEl);

    var pEl = document.createElement("p");
    if(gameState.answerWasCorrect){
        pEl.textContent = "You attacked the monster doing " + gameState.thisQuestionPlayerAttack + " points in damage.";
    }
    else{
        pEl.textContent = "The monster attacked you doing " + gameState.thisQuestionOpponentAttack + " points in damage.";
        document.getElementById("monster-man").style.display="block";
    }
    quizContainerEl.appendChild(pEl);

    var continueBtn = document.createElement("button");
    continueBtn.textContent = "Continue";
    continueBtn.className = "continue-btn";
    quizContainerEl.appendChild(continueBtn);
    gameState.questionCounter++;
}


var buildGameOverScreen = function(isGameOver){
    //start over button
    //enter initials
    resetContainerElement();
    console.log(isGameOver);
    if(isGameOver){
        var h2El = document.createElement("h2");
        h2El.textContent = "Game Over";
        quizContainerEl.appendChild(h2El);

        var pEl = document.createElement("p");
        pEl.textContent = "You were defeated!"
        quizContainerEl.appendChild(pEl);
        

        pEl = document.createElement("p");
        pEl.textContent = "Your current score is " + gameState.playerScore + " points."
        quizContainerEl.appendChild(pEl);

        var buttonEl = document.createElement("button");
        buttonEl.textContent = "Try Again";
        buttonEl.className = "restart-btn";
        quizContainerEl.appendChild(buttonEl);
    }
    else{

        var h2El = document.createElement("h2");
        h2El.textContent = "The game has ended";
        quizContainerEl.appendChild(h2El);

        var pEl = document.createElement("p");
        pEl.textContent = "You defeated the enemies!"
        quizContainerEl.appendChild(pEl);

        pEl = document.createElement("p");
        pEl.textContent = "Your current score is " + gameState.playerScore + " points."
        quizContainerEl.appendChild(pEl);

        var buttonEl = document.createElement("button");
        buttonEl.textContent = "Play Again";
        buttonEl.className = "restart-btn";
        quizContainerEl.appendChild(buttonEl);
    }
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
        answerPEl.setAttribute("data-correctness", quizQuestions[questionIndex].answers[i].isCorrect);
        quizContainerEl.appendChild(answerPEl);
    }
    //gameState.questionCounter++;

}

var getOpponentImage = function(){
         // set image src to api response here!
          var monsterImage = document.createElement("img");
          var imageContainer = document.querySelector("#monster-image");
          monsterImage.src = "https://robohash.org/jhgcihgtcikhg?set=set2";
          console.log(imageContainer);
          imageContainer.appendChild(monsterImage)
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

    var q = new question();
    q.text = "Which of the following answers is shorthand for i = i + 1?"
    q.pointValueForCorrectAnswer = 15;
    q.pointValueForIncorrectAnswer  = 15;
    q.answers = [new answer("i--","incorrect"), new answer("i++","correct"), new answer("i+=1","correct"), new answer("i-=1","incorrect")];
    quizQuestions.push(q);

    var q = new question();
    q.text = "Which of the following is a primitive type?"
    q.pointValueForCorrectAnswer = 15;
    q.pointValueForIncorrectAnswer  = 15;
    q.answers = [new answer("String","correct"), new answer("Array","incorrect"), new answer("Function","incorrect"), new answer("Object","incorrect")];
    quizQuestions.push(q);

    var q = new question();
    q.text = "Which property can be used to change the background color of an HTML element?"
    q.pointValueForCorrectAnswer = 15;
    q.pointValueForIncorrectAnswer  = 15;
    q.answers = [new answer("background-color","correct"), new answer("color","incorrect"), new answer("background-image","incorrect"), new answer("background-size","incorrect")];
    quizQuestions.push(q);

    var q = new question();
    q.text = "Which flexbox property changes the html elements so that they line up vertically instead of horizontally?"
    q.pointValueForCorrectAnswer = 15;
    q.pointValueForIncorrectAnswer  = 15;
    q.answers = [new answer("flex-direction","correct"), new answer("align-items","incorrect"), new answer("display: flex","incorrect"), new answer("justify-content","incorrect")];
    quizQuestions.push(q);

    console.log(quizQuestions);
}

var endGame = function(isGameOver){
    buildGameOverScreen(isGameOver);
}

var endRound = function(){
    resetContainerElement();

    var h2El = document.createElement("h2");
    h2El.textContent = "Round " + gameState.roundCounter + " has ended: "
    quizContainerEl.appendChild(h2El);

    var pEl = document.createElement("p");
    pEl.textContent = "You have " + Math.max(gameState.playerHealth, 0) + " hit points left.";
    quizContainerEl.appendChild(pEl);

    var pEl = document.createElement("p");
    pEl.textContent = "Your current score is: " + gameState.playerScore + " points.";
    quizContainerEl.appendChild(pEl);    

    var buttonEl = document.createElement("button");
    buttonEl.textContent = "Start Next Round";
    buttonEl.className = "continue-btn";
    quizContainerEl.appendChild(buttonEl);
    gameState.roundCounter++;
    
}

var updateGameState = function(isCorrect){
    gameState.answerWasCorrect  = isCorrect;
    if(isCorrect){
        var attackBonus = quizQuestions[gameState.questionCounter-1].pointValueForCorrectAnswer;
        gameState.thisQuestionPlayerAttack = gameState.playerAttack + attackBonus;
        gameState.opponentHealth -= gameState.thisQuestionPlayerAttack;
        if(gameState.opponentHealth <= 0){
            gameState.opponentHasDied = true;
            gameState.playerScore += gameState.pointsForKillingOpponent;
        }
    }
    else{
        var attackBonus = quizQuestions[gameState.questionCounter-1].pointValueForIncorrectAnswer;
        gameState.thisQuestionOpponentAttack = gameState.opponentAttack + attackBonus;
        gameState.playerHealth -= gameState.thisQuestionOpponentAttack;
        if(gameState.playerHealth <= 0){
            gameState.playerHasDied = true;
        }
    }
}


listQuizQuestions();
buildStartScreen();

//add event listener to quiz answers on click

mainEl.addEventListener("click",function(event){
    if(event.target.className == "quiz-answer"){
        if(event.target.getAttribute("data-correctness") === "correct"){
            //correct answer
            updateGameState(true);
        }
        else{
            //incorrect answer
            updateGameState(false);
        }
        displayGameState();
    } 
    else if(event.target.className == "start-btn"){
        setRoundState();
        buildQuizQuestion(gameState.questionCounter-1);
    }
    else if(event.target.className == "restart-btn"){
        gameState.questionCounter = 1;
        gameState.playerScore = 0;
        gameState.roundCounter = 1;
        gameState.playerHealth = health;
        buildStartScreen();
    }
    else if(event.target.className == "continue-btn"){
        if(gameState.opponentHasDied){
            endRound(false);
            console.log(gameState.roundCounter, gameState.numberOfRounds);
            if(gameState.roundCounter > gameState.numberOfRounds){
                endGame(false);
            }
            setRoundState();
        }
        else if(gameState.playerHasDied){
            endGame(true);
        }
        else{
            buildQuizQuestion(gameState.questionCounter-1);
        }
    }
});


