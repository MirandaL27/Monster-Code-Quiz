var quizContainerEl = document.querySelector(".game-container");
var highScoreLinkEl = document.querySelector(".high-score-link");
var settingsLinkEl = document.querySelector(".settings-link");
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
var highScores = [];

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
    scrollSpeed: 50,
    previousQuestionNumber: 0,
}

var resetContainerElement = function(){
    quizContainerEl.remove();
    quizContainerEl = document.createElement("section");
    quizContainerEl.className = "game-container has-text-left";
    mainEl.appendChild(quizContainerEl);
    document.getElementById("confetti").style.display="none";
    document.getElementById("thumbs-down").style.display="none";
    document.getElementById("monster-man").style.display="none";
    document.getElementById("smiley").style.display="none";
    document.getElementById("headstone").style.display="none";
    document.getElementById("medal").style.display="none";
    
}

var printText = function(str,index, obj){
    obj.textContent += str[index];
}

var scrollText = function(str, obj){
    var string = str;
    var index = 0;
    var interval = setInterval(function(){
        printText(str,index,obj);
        index++;
        if(index == string.length){
            clearInterval(interval);
        }
    },gameState.scrollSpeed);

}

var scrollSpeedValue = function(){
    if(gameState.scrollSpeed == 50){
        return "Slow";
    }
    else if(gameState.scrollSpeed == 30){
        return "Medium";
    }
    else{
        return "Fast";
    }
}


var buildSettingsScreen = function(){
    resetContainerElement();
    var scrollSpeed = scrollSpeedValue();
    var h2El = document.createElement("h2");
    //h2El.textContent = "Settings:"
    scrollText("Settings:",h2El);
    quizContainerEl.appendChild(h2El);
    var selectEl = document.createElement("select");
    selectEl.id = "scroll-speed";
    console.log(selectEl.value);
    var label = document.createElement("label");
    label.for = "scroll-speed";
    //label.textContent = "Scroll Speed ";
    scrollText("Scroll Speed ",label);
    quizContainerEl.appendChild(label);
    quizContainerEl.appendChild(selectEl);

    var optionEl = document.createElement("option");
    optionEl.textContent = "Slow";
    optionEl.value = "Slow";
    if(scrollSpeed == "Slow"){
        optionEl.setAttribute("selected","true");
    }
    selectEl.appendChild(optionEl);

    var optionEl = document.createElement("option");
    optionEl.textContent = "Medium";
    optionEl.value = "Medium";
    if(scrollSpeed == "Medium"){
        optionEl.setAttribute("selected","true");
    }
    selectEl.appendChild(optionEl);

    var optionEl = document.createElement("option");
    optionEl.textContent = "Fast";
    optionEl.value = "Fast";
    if(scrollSpeed == "Fast"){
        optionEl.setAttribute("selected","true");
    }
    selectEl.appendChild(optionEl);

    var buttonEl = document.createElement("button");
    buttonEl.textContent = "Go Back";
    buttonEl.className = "back-btn button is-rounded has-background-success p-2 mt-5";
    buttonEl.id = "back-btn";
    quizContainerEl.appendChild(buttonEl);
}

var buildStartScreen = function(){
    //start button
    //basic instructions
    resetGameState();
    resetContainerElement();
    hideMonsterImage();
    var h2El = document.createElement("h2");
    //h2El.textContent = "Monster Code Quiz"
    scrollText("Directions:",h2El);
    h2El.className = "mb-5"
    quizContainerEl.appendChild(h2El);
    var pEl = document.createElement("p");
    var text = "Answer the quiz questions to attack the monsters. Answering harder questions correctly will earn you extra attack. Be careful!  The monsters will attack you if you answer a question incorrectly! Complete all of the rounds to win the game!";
    scrollText(text,pEl);
    quizContainerEl.appendChild(pEl);
    var buttonEl = document.createElement("button");
    buttonEl.textContent = "Start Game";
    buttonEl.className = "start-btn button is-rounded has-background-success p-2 mt-5";
    buttonEl.id = "start-btn";
    var divEl = document.createElement("div");
    divEl.className = "has-text-centered";
    divEl.appendChild(buttonEl);
    quizContainerEl.appendChild(divEl);
}

var resetGameState = function(){
    gameState.questionCounter = 1;
    gameState.playerScore = 0;
    gameState.roundCounter = 1;
    gameState.playerHealth = health;
}

var setRoundState = function(){
    gameState.opponentHealth = Math.floor(Math.random()*11 + 30);//opponent health is between 30 and 40 points
    gameState.opponentAttack = Math.floor(Math.random()*11 + 10);//opponent attack is between 10 and 20 points
    gameState.pointsForKillingOpponent = Math.floor((gameState.opponentHealth + gameState.opponentAttack)/2);
    gameState.opponentHasDied = false;
    gameState.playerHasDied = false;
}

var displayGameState = function(){
    resetContainerElement();
    var h2El = document.createElement("h2");
    var text = "Round " + gameState.roundCounter + " Update:"
    scrollText(text,h2El);
    //h2El.textContent = "Round " + gameState.roundCounter + " Update:"
    quizContainerEl.appendChild(h2El);

    var pEl = document.createElement("p");
    if(gameState.answerWasCorrect){
        scrollText("You answered correctly! ",pEl);
        //pEl.textContent = "You answered correctly! ";
        //display confetti
       document.getElementById("confetti").style.display="block";
    }
    else{
        scrollText("You answered incorrectly! ",pEl);
        //pEl.textContent = "You answered incorrectly!";
        //display thumbs down
        document.getElementById("thumbs-down").style.display="block";
       
    }
    quizContainerEl.appendChild(pEl);

    var pEl = document.createElement("p");
    //pEl.textContent = "You have " + Math.max(gameState.playerHealth, 0) + " health points left.";
    var text = "You have " + Math.max(gameState.playerHealth, 0) + " health points left.";
    scrollText(text,pEl);
    quizContainerEl.appendChild(pEl);

    var pEl = document.createElement("p");
    if(gameState.answerWasCorrect){
        //pEl.textContent = "You attacked the monster doing " + gameState.thisQuestionPlayerAttack + " points in damage.";
        var text = "You attacked the monster doing " + gameState.thisQuestionPlayerAttack + " points in damage.";
        scrollText(text,pEl);
        document.getElementById("smiley").style.display="block";
    }
    else{
        //pEl.textContent = "The monster attacked you doing " + gameState.thisQuestionOpponentAttack + " points in damage.";
        var text = "The monster attacked you doing " + gameState.thisQuestionOpponentAttack + " points in damage.";
        scrollText(text,pEl);
        document.getElementById("monster-man").style.display="block";
    }
    quizContainerEl.appendChild(pEl);

    var continueBtn = document.createElement("button");
    continueBtn.textContent = "Continue";
    continueBtn.className = "continue-btn button is-rounded has-background-success p-2 mt-5";
    continueBtn.id ="continue-btn";
    var divEl = document.createElement("div");
    divEl.className = "has-text-centered";
    divEl.appendChild(continueBtn);
    quizContainerEl.appendChild(divEl);
    gameState.questionCounter++;
}

var buildGameOverScreen = function(isGameOver){
    //start over button
    //enter initials
    resetContainerElement();
    if(isGameOver){
        var h2El = document.createElement("h2");
        scrollText("Game Over",h2El);
        //h2El.textContent = "Game Over";
        quizContainerEl.appendChild(h2El);

        var pEl = document.createElement("p");
        //pEl.textContent = "You were defeated!"
        scrollText("You were defeated!",pEl);
        quizContainerEl.appendChild(pEl);
        document.getElementById("headstone").style.display="block";
        

        pEl = document.createElement("p");
        //pEl.textContent = "Your current score is " + gameState.playerScore + " points."
        var text = "Your current score is " + gameState.playerScore + " points.";
        scrollText(text,pEl);
        quizContainerEl.appendChild(pEl);

        var labelEl = document.createElement("label");
        labelEl.for = "initials-input";
        //labelEl.textContent = "Enter Initials";
        scrollText("Enter Initials",labelEl);
        var inputEl = document.createElement("input");
        inputEl.type = "text";
        inputEl.className = "initials-input";
        inputEl.id = "initials-input";
        quizContainerEl.appendChild(labelEl);
        quizContainerEl.appendChild(inputEl);

        var highScoreButtonEl = document.createElement("button");
        highScoreButtonEl.textContent = "Submit Score";
        highScoreButtonEl.className = "high-score-btn button is-rounded has-background-success p-2 mt-5";
        highScoreButtonEl.id = "high-score-btn";
        // quizContainerEl.appendChild(highScoreButtonEl);

        var viewHighScoreButtonEl = document.createElement("button");
        viewHighScoreButtonEl.textContent = "View High Scores";
        viewHighScoreButtonEl.className = "view-high-score-btn button is-rounded has-background-success p-2 mt-5";
        viewHighScoreButtonEl.id = "view-high-score-btn";
        // quizContainerEl.appendChild(viewHighScoreButtonEl);

        var buttonEl = document.createElement("button");
        buttonEl.textContent = "Try Again";
        buttonEl.className = "restart-btn button is-rounded has-background-success p-2 mt-5";
        buttonEl.id = "restart-btn";
        var divEl = document.createElement("div");
        divEl.className = "has-text-centered";
        divEl.appendChild(highScoreButtonEl);
        divEl.appendChild(viewHighScoreButtonEl);
        divEl.appendChild(buttonEl);
        quizContainerEl.appendChild(divEl);
    }
    else{

        var h2El = document.createElement("h2");
        //h2El.textContent = "The game has ended";
        scrollText("The game has ended",h2El);
        quizContainerEl.appendChild(h2El);

        var pEl = document.createElement("p");
        //pEl.textContent = "You defeated the enemies!"
        scrollText("You defeated the enemies!",pEl);
        quizContainerEl.appendChild(pEl);

        pEl = document.createElement("p");
        //pEl.textContent = "Your current score is " + gameState.playerScore + " points."
        var text = "Your current score is " + gameState.playerScore + " points.";
        scrollText(text,pEl);
        quizContainerEl.appendChild(pEl);

        var labelEl = document.createElement("label");
        labelEl.for = "initials-input";
        //labelEl.textContent = "Enter Initials";
        scrollText("Enter Initials",labelEl);
        var inputEl = document.createElement("input");
        inputEl.type = "text";
        inputEl.className = "initials-input";
        inputEl.id = "initials-input";
        quizContainerEl.appendChild(labelEl);
        quizContainerEl.appendChild(inputEl);

        var highScoreButtonEl = document.createElement("button");
        highScoreButtonEl.textContent = "Submit Score";
        highScoreButtonEl.className = "high-score-btn button is-rounded has-background-success p-2 mt-5";
        highScoreButtonEl.id ="high-score-btn";
        // quizContainerEl.appendChild(highScoreButtonEl);

        var viewHighScoreButtonEl = document.createElement("button");
        viewHighScoreButtonEl.textContent = "View High Scores";
        viewHighScoreButtonEl.className = "view-high-score-btn button is-rounded has-background-success p-2 mt-5";
        viewHighScoreButtonEl.id ="view-high-score-btn";
        // quizContainerEl.appendChild(viewHighScoreButtonEl);

        var buttonEl = document.createElement("button");
        buttonEl.textContent = "Play Again";
        buttonEl.className = "restart-btn button is-rounded has-background-success p-2 mt-5";
        buttonEl.id ="restart-btn";
        var divEl = document.createElement("div");
        divEl.className = "has-text-centered";
        divEl.appendChild(highScoreButtonEl);
        divEl.appendChild(viewHighScoreButtonEl);
        divEl.appendChild(buttonEl);
        quizContainerEl.appendChild(divEl);
    }
}

var clearHighScores = function(){
    resetContainerElement();
    highScores.length = 0;
    localStorage.removeItem("monster-high-scores");

    var buttonEl = document.createElement("button");
    buttonEl.textContent = "Go Back";
    buttonEl.className = "back-btn button is-rounded has-background-success p-2 mt-5";
    buttonEl.id = "back-btn";
    quizContainerEl.appendChild(buttonEl);

    var buttonEl = document.createElement("button");
    buttonEl.textContent = "Clear High Scores";
    buttonEl.className = "clear-btn button is-rounded has-background-success p-2 mt-5";
    buttonEl.id ="clear-btn";
    quizContainerEl.appendChild(buttonEl);

}

var buildHighScoreScreen  = function(){
    //high score list from localstorage
    resetContainerElement();
    hideMonsterImage();
    displayHighScores();

    var buttonEl = document.createElement("button");
    buttonEl.textContent = "Go Back";
    buttonEl.className = "back-btn button is-rounded has-background-success p-2 mt-5";
    buttonEl.id ="back-btn";
    quizContainerEl.appendChild(buttonEl);

    var buttonEl = document.createElement("button");
    buttonEl.textContent = "Clear High Scores";
    buttonEl.className = "clear-btn button is-rounded has-background-success p-2 mt-5";
    buttonEl.id = "clear-btn";
    quizContainerEl.appendChild(buttonEl);
}

var loadHighScores = function(){
    var hs = localStorage.getItem("monster-high-scores");
    if(hs){
        highScores = JSON.parse(hs);
    }
}
var saveHighScore = function(){
    var input = document.querySelector(".initials-input").value;
    var obj = {
        score : gameState.playerScore,
        initials : input,
    }
    highScores.push(obj);
    localStorage.setItem("monster-high-scores",JSON.stringify(highScores));
    document.getElementById("high-score-btn").style.display="none";
    
}

var displayHighScores = function(){
    document.getElementById("medal").style.display="block";
    //sort high scores
    highScores = highScores.sort((x, y) => {
        if(x.score > y.score){
            return -1;
        }
        if(x.score < y.score){
            return 1;
        }
        return 0;
    } );

    for(var i = 0; i < highScores.length; i++){
        var pEl = document.createElement("p");
        //pEl.textContent = highScores[i].initials + "    " + highScores[i].score;
        var text = highScores[i].initials + "    " + highScores[i].score;
        scrollText(text,pEl);
        quizContainerEl.appendChild(pEl);
    }
}



var buildQuizQuestion = function(questionIndex){
    //generates HTML elements for quiz questions
    resetContainerElement();
    var h2El = document.createElement("h2");
    var text = "Question " + gameState.questionCounter + ": ";
    //h2El.textContent = 
    scrollText(text,h2El);
    quizContainerEl.appendChild(h2El);

    var questionPEl = document.createElement("p");
    //questionPEl.textContent = quizQuestions[questionIndex].text;
    scrollText(quizQuestions[questionIndex].text,questionPEl);
    questionPEl.className = "quiz-question";
    quizContainerEl.appendChild(questionPEl);

    for(var i =0; i<quizQuestions[questionIndex].answers.length; i++){
        var answerPEl = document.createElement("p");
        //answerPEl.textContent = (i+1)+". " +quizQuestions[questionIndex].answers[i].text;
        var text = (i+1)+". " +quizQuestions[questionIndex].answers[i].text;
        scrollText(text,answerPEl);
        answerPEl.className = "quiz-answer";
        answerPEl.setAttribute("data-correctness", quizQuestions[questionIndex].answers[i].isCorrect);
        quizContainerEl.appendChild(answerPEl);
    }
}
var resetOpponentImage = function(){
    var imageContainer = document.querySelector("#monster-image");
    imageContainer.remove();
    var imageContainer = document.createElement("div");
    imageContainer.className="has-text-centered";
    imageContainer.id = "monster-image";
    mainEl.appendChild(imageContainer);
}

var hideMonsterImage = function(){
    var imageContainer = document.querySelector("#monster-image");
    imageContainer.style.display = "none";
}

var showMonsterImage = function(){
    var imageContainer = document.querySelector("#monster-image");
    imageContainer.style.display = "block";
}

var generateUrlString = function(){
    var randomString = "";
    var length = Math.floor(Math.random()*21) + 10; // random string is between 10 and 20 characters long
    var charset = "abcdefghijklmnopqrstuvwxyz";
    for(var i=0; i< length; i++){
        var index = Math.floor(Math.random()*charset.length);
        randomString += charset[index];
    }

    var url = "https://robohash.org/" + randomString + "?set=set2";
    return url;
}

var getOpponentImage = function(){
    // set image src to api response here!
    resetOpponentImage();
    var monsterImage = document.createElement("img");
    var imageContainer = document.querySelector("#monster-image");
    monsterImage.src = generateUrlString();
    imageContainer.appendChild(monsterImage)
}

var listQuizQuestions = function(){
    //add questions to the quiz here!
        //Q-1
    var q = new question();
    q.text = "What does HTML stand for?"
    q.pointValueForCorrectAnswer = 12;
    q.pointValueForIncorrectAnswer = 15;
    q.answers = [new answer("Hypertext Markup Language","correct"), new answer("Hypertext Mark Language","incorrect"), new answer("Hyphentext Markdown Language","incorrect"), new answer("Hypertext Markdown Language","incorrect")];
    quizQuestions.push(q);
        //Q-2
    var q = new question();
    q.text = "What does || stand for?"
    q.pointValueForCorrectAnswer = 12;
    q.pointValueForIncorrectAnswer  = 15;
    q.answers = [new answer("And","incorrect"), new answer("Not","incorrect"), new answer("Or","correct"), new answer("Is Less Than","incorrect")];
    quizQuestions.push(q);
        //Q-3
    var q = new question();
    q.text = "Which of the following answers is shorthand for i = i + 1?"
    q.pointValueForCorrectAnswer = 12;
    q.pointValueForIncorrectAnswer  = 15;
    q.answers = [new answer("i--","incorrect"), new answer("i++","correct"), new answer("i+=1","correct"), new answer("i-=1","incorrect")];
    quizQuestions.push(q);
        //Q-4
    var q = new question();
    q.text = "Which of the following is a primitive type?"
    q.pointValueForCorrectAnswer = 12;
    q.pointValueForIncorrectAnswer  = 15;
    q.answers = [new answer("String","correct"), new answer("Array","incorrect"), new answer("Function","incorrect"), new answer("Object","incorrect")];
    quizQuestions.push(q);
        //Q-5
    var q = new question();
    q.text = "Which property can be used to change the background color of an HTML element?"
    q.pointValueForCorrectAnswer = 12;
    q.pointValueForIncorrectAnswer  = 15;
    q.answers = [new answer("background-color","correct"), new answer("color","incorrect"), new answer("background-image","incorrect"), new answer("background-size","incorrect")];
    quizQuestions.push(q);
        //Q=6
    var q = new question();
    q.text = "Which flexbox property changes the html elements so that they line up vertically instead of horizontally?"
    q.pointValueForCorrectAnswer = 12;
    q.pointValueForIncorrectAnswer  = 15;
    q.answers = [new answer("flex-direction","correct"), new answer("align-items","incorrect"), new answer("display: flex","incorrect"), new answer("justify-content","incorrect")];
    quizQuestions.push(q);
        //Q-7
    var q = new question();
    q.text = "The syntax of a blur method in a button object is ______?"
    q.pointValueForCorrectAnswer = 12;
    q.pointValueForIncorrectAnswer  = 15;
    q.answers = [new answer("Blur(depth)","incorrect"), new answer("Blur(contrast)","incorrect"), new answer("Blur(value)","incorrect"), new answer("Blur()","correct")];
    quizQuestions.push(q);
        //Q-8
    var q = new question();
    q.text = "Which best explains getSelection()?"
    q.pointValueForCorrectAnswer = 12;
    q.pointValueForIncorrectAnswer  = 15;
    q.answers = [new answer("Returns the VALUE of a selected OPTION.","incorrect"), new answer("Returns the value of cursor-selected text","correct"), new answer("Returns document.URL of the window in focus.","incorrect"), new answer("Returns the VALUE of a checked radio input.","incorrect")];
    quizQuestions.push(q);
        //Q-9
    var q = new question();
    q.text = "How to create a Date object in JavaScript?"
    q.pointValueForCorrectAnswer = 12;
    q.pointValueForIncorrectAnswer  = 15;
    q.answers = [new answer("dateObjectName Date([parameters])","incorrect"), new answer("dateObjectName.new Date([parameters])","incorrect"), new answer("dateObjectName = new Date([parameters])","correct"), new answer("dateObjectName := new Date([parameters])","incorrect")];
    quizQuestions.push(q);
        //Q-10
    var q = new question();
    q.text = "What are variables used for in JavaScript Programs?"
    q.pointValueForCorrectAnswer = 12;
    q.pointValueForIncorrectAnswer  = 15;
    q.answers = [new answer("Storing numbers, dates, or other values","correct"), new answer("Varying randomly","incorrect"), new answer("Causing high-school algebra flashbacks","incorrect"), new answer("None of the above","incorrect")];
    quizQuestions.push(q);
        //Q-11
    var q = new question();
    q.text = "Which of the following are capabilities of functions in JavaScript?"
    q.pointValueForCorrectAnswer = 12;
    q.pointValueForIncorrectAnswer  = 15;
    q.answers = [new answer("Return a value","incorrect"), new answer("Accept parameters and Return a value","incorrect"), new answer("Accept parameters","correct"), new answer("None of the above","incorrect")];
    quizQuestions.push(q);
}

var endGame = function(isGameOver){
    buildGameOverScreen(isGameOver);
}

var endRound = function(){
    resetContainerElement();

    var h2El = document.createElement("h2");
    var text = "Round " + gameState.roundCounter + " has ended: ";
    scrollText(text,h2El);
    //h2El.textContent = "Round " + gameState.roundCounter + " has ended: "
    quizContainerEl.appendChild(h2El);

    var pEl = document.createElement("p");
    var text = "You have " + Math.max(gameState.playerHealth, 0) + " hit points left.";
    //pEl.textContent = "You have " + Math.max(gameState.playerHealth, 0) + " hit points left.";
    scrollText(text,pEl);
    quizContainerEl.appendChild(pEl);

    var pEl = document.createElement("p");
    //pEl.textContent = "Your current score is: " + gameState.playerScore + " points.";
    var text = "Your current score is: " + gameState.playerScore + " points.";
    scrollText(text,pEl)
    quizContainerEl.appendChild(pEl);    

    var buttonEl = document.createElement("button");
    buttonEl.textContent = "Start Next Round";
    buttonEl.id = "start-next-round";
    buttonEl.className = "continue-btn button is-rounded has-background-success p-2 mt-5";
    quizContainerEl.appendChild(buttonEl);
    gameState.roundCounter++;
    
}


var updateGameState = function(isCorrect){
    gameState.answerWasCorrect  = isCorrect;
    var index = gameState.previousQuestionNumber;
    if(isCorrect){
        var attackBonus = quizQuestions[index].pointValueForCorrectAnswer;
        gameState.thisQuestionPlayerAttack = gameState.playerAttack + attackBonus;
        gameState.opponentHealth -= gameState.thisQuestionPlayerAttack;
        if(gameState.opponentHealth <= 0){
            gameState.opponentHasDied = true;
            gameState.playerScore += gameState.pointsForKillingOpponent;
        }
    }
    else{
        var attackBonus = quizQuestions[index].pointValueForIncorrectAnswer;
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
            console.log(event.target.textContent);
            updateGameState(true);
        }
        else{
            //incorrect answer
            updateGameState(false);
        }
        displayGameState();
    } 
    else if(event.target.id == "start-btn"){
        setRoundState();
        getOpponentImage();
        var index = Math.floor(Math.random()*quizQuestions.length);
        gameState.previousQuestionNumber = index;
        buildQuizQuestion(index);
    }
    else if (event.target.id == "high-score-btn"){
        saveHighScore();
    }
    else if (event.target.id == "view-high-score-btn"){
        buildHighScoreScreen();
    }
    else if (event.target.id == "clear-btn"){
        clearHighScores();
    }
    else if(event.target.id == "back-btn"){
        buildStartScreen();
    }
    else if(event.target.id == "restart-btn"){
        buildStartScreen();
    }
    else if(event.target.id == "continue-btn" || event.target.id == "start-next-round"){
        if(gameState.opponentHasDied){
            endRound(false);
            hideMonsterImage();
            if(gameState.roundCounter > gameState.numberOfRounds){
                endGame(false);
            }
            setRoundState();
        }
        else if(gameState.playerHasDied){
            endGame(true);
        }
        else{
            if(event.target.matches("#start-next-round")){
                getOpponentImage();
                showMonsterImage();
            }
            var index = Math.floor(Math.random()*quizQuestions.length);
            while(index == gameState.previousQuestionNumber){
                index = Math.floor(Math.random()*quizQuestions.length);
                console.log(index);
            }
            gameState.previousQuestionNumber = index;
            buildQuizQuestion(index); 
        }
    }
});
var changeScrollSpeed = function(value){
    if(value == "Slow"){
        gameState.scrollSpeed = 50;
    }
    else if(value == "Medium"){
        gameState.scrollSpeed = 30;
    }
    else{
        gameState.scrollSpeed = 10;
    }
}

mainEl.addEventListener("change",function(event){
    if(event.target.id == "scroll-speed"){
        changeScrollSpeed(event.target.value);
    }
});


highScoreLinkEl.addEventListener("click", function(){
    buildHighScoreScreen();
});

settingsLinkEl.addEventListener("click", function(){
    buildSettingsScreen();
});

loadHighScores();
