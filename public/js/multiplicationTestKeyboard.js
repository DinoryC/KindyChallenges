console.log("test.js");

var element1RangeFrom;
var element1RangeTo;
var element2RangeFrom;
var element2RangeTo;
var operator;
var totalQuestionsCount;

var currentQuestion;
var question1stNum;
var question2ndNum;
var questionOperator;

var allQuestions = [];
var allAnswers = [];
var currentQuestion;
var passedQuestions;
var passedQuestionsHtml = "";

var currentUserInputAnswer = "";
var intervalInputUpdater;

pageLoadingPreparation();
startTest();

function pageLoadingPreparation() {
    getParameters();
    consoleLogParamenter();
    PrepareAllQuestions(element1RangeFrom, element1RangeTo, element2RangeFrom, element2RangeTo);
    PrepareAllAnswers();
    console.log(allAnswers);
    currentQuestion = -1;
    $('#passedQuestions').html(passedQuestionsHtml);

    $('#showAnswerBtn').on('mousedown', function(event) {
        $(this).text("Answer is: " + allAnswers[currentQuestion]);
    });

    $('#showAnswerBtn').on('mouseup', function(event) {
        $(this).text("Show Answer");
    });
}

function startTest() {
    nextQuestion();
    addKeyboardEventListener();
    inputValueUpdater(150);
}

function addKeyboardEventListener() {
    document.addEventListener('keydown', function(event) {
        if (event.key >= "0" && event.key <= "9" || event.key === "Backspace") {
            console.log("event handler keydown " + event.key);
            inputHandler(event.key);
        } else {
            event.preventDefault(); // Prevent any other keys
        }
    });
}

function inputHandler(input) {
    if (input === "Backspace") {
        currentUserInputAnswer = currentUserInputAnswer.slice(0, -1);
        $('#userInputValue').val(currentUserInputAnswer);
    } else {
        currentUserInputAnswer += input;
        // $('#userInputValue').val(currentUserInputAnswer);

        console.log("currentUserInputAnswer.length = " + currentUserInputAnswer.length);
        console.log("allAnswers[currentQuestion].toString() = " + allAnswers[currentQuestion].toString());
        console.log("allAnswers[currentQuestion].toString().length = " + allAnswers[currentQuestion].toString().length);

        if (currentUserInputAnswer.length === allAnswers[currentQuestion].toString().length) {
            if(!checkAnswer()) {
                WrongAnswer();
            } else {
                CorrectAnswer();
                if (currentQuestion === totalQuestionsCount - 1) {
                    ChallengeSuccess();
                    return;
                }
                nextQuestion();
            }
        }
    }
}

function getParameters() {
    element1RangeFrom = parseInt($("#para_element1RangeFrom").text());
    element1RangeTo = parseInt($("#para_element1RangeTo").text());
    element2RangeFrom = parseInt($("#para_element2RangeFrom").text());
    element2RangeTo = parseInt($("#para_element2RangeTo").text());
    questionOperator = $("#para_operator").text().trim();
    totalQuestionsCount = parseInt($("#para_numberOfQuestions").text());
}

function consoleLogParamenter() {
    console.log("element1RangeFrom = " + element1RangeFrom);
    console.log("element1RangeTo = " + element1RangeTo);
    console.log("element2RangeFrom = " + element2RangeFrom);
    console.log("element2RangeTo = " + element2RangeTo);
    console.log("operator = " + questionOperator);
    console.log("numberOfQuestions = " + totalQuestionsCount);
}

function PrepareAllQuestions(firstNumfrom, firstNumTo, SecondNumFrom, SecondNumTo) {
    if (firstNumfrom === firstNumTo) {
        generateATimesTableWithAHeroNum(firstNumfrom, SecondNumFrom, SecondNumTo);
    } else {
        generateRandomTimesTable(firstNumfrom, firstNumTo, SecondNumFrom, SecondNumTo);
    }
}

function PrepareAllAnswers() {
    for (var i = 0; i < allQuestions.length; i++) {
        allAnswers.push(calculate(allQuestions[i][0], allQuestions[i][1], questionOperator));
    }
}

function generateATimesTableWithAHeroNum(firstNumfrom, SecondNumFrom, SecondNumTo) {
    var randomNumArray = generateANonRepeatedRandomNumArray(SecondNumFrom, SecondNumTo);
    for (var i = 0; i < randomNumArray.length; i++) {
        allQuestions.push([firstNumfrom, randomNumArray[i]]);
    }
    console.log(allQuestions);

}

function generateRandomTimesTable(firstNumfrom, firstNumTo, SecondNumFrom, SecondNumTo) {

}

function generateANonRepeatedRandomNumArray(fromNumInc, toNumInc) {
    orderedArray = [];
    for (var i = fromNumInc; i < toNumInc + 1; i++) {
        orderedArray.push(i);
    }

    return shuffleArray(orderedArray);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // Generate a random index
        let j = Math.floor(Math.random() * (i + 1));
        // Swap elements at i and j
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function nextQuestion() {
    currentQuestion++;
    question1stNum = allQuestions[currentQuestion][0];
    question2ndNum = allQuestions[currentQuestion][1];

    $("#currentQuestion").text(question1stNum + " " + questionOperator + " " + question2ndNum + " = ?");
    $("#passedQuestions").text(passedQuestions);
    $("#currentQuetionNum").text("Question " + (currentQuestion + 1).toString() + ":");
    $("#QuetionsToGo").text(totalQuestionsCount - currentQuestion - 1 + " more to go.");

    currentUserInputAnswer = "";
    $('#userInputValue').val(currentUserInputAnswer);
}

function calculate(a, b, operator) {
    switch (operator) {
        case '+':
            return a + b;
        case '×':
            return a * b;
        case '-':
            return a - b;
        case '/':
            return a / b;
        default:
            throw new Error('Invalid operator');
    }
}

function getRandomInt(fromInc, toInc) {
    if (toInc === fromInc) {
        return fromInc;
    }

    var ramNum = Math.floor(Math.random() * (toInc - fromInc + 1)) + fromInc;
    return ramNum;
  }

function checkAnswer() {
    return currentUserInputAnswer === allAnswers[currentQuestion].toString();
}

function WrongAnswer () {
    console.log("Wrong Answer");
    wrongAnswerFx();
    currentUserInputAnswer = "";
    $('#userInputValue').val(currentUserInputAnswer);
}

function CorrectAnswer() {
    console.log("Correct Answer");

    correctAnswerEffect();

    passedQuestionsHtml += 
    allQuestions[currentQuestion][0] + " " 
    + questionOperator + " " 
    + allQuestions[currentQuestion][1] + " = " 
    + allAnswers[currentQuestion] + "<br>";
    $('#passedQuestions').html(passedQuestionsHtml);

    currentUserInputAnswer = "";
    $('#userInputValue').val(currentUserInputAnswer);
}

function ChallengeSuccess() {
    console.log("Challenge Success");
    challengeSuccessFx();
    $('#currentQuestion').text("Challenge Success! Congratulations!");
    setTimeout(stopInputValueUpdater, 200);
}

function inputValueUpdater(updateInterval) {
    intervalInputUpdater = setInterval(function() {
        console.log("Input updater log => input = " + currentUserInputAnswer);
      $('#userInputValue').val(currentUserInputAnswer);
    }, updateInterval);
}

function stopInputValueUpdater() {
    clearInterval(intervalInputUpdater);
}

function correctAnswerEffect() {
    triggerConfetti(700, 50);

    // potential add sound effect?
}

function wrongAnswerFx() {
    triggerShake();
}

function challengeSuccessFx() {
    triggerConfetti(5000, 150);
    
}

function triggerConfetti(effectDuration, particalCount) {
    var animationEnd = Date.now() + effectDuration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = particalCount * (timeLeft / effectDuration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

function triggerShake() {
    $('#testSheetCard').addClass('shake');
    
    setTimeout(() => {
        $('#testSheetCard').removeClass('shake');
    }, 700);
  }