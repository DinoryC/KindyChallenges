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
// testSheetPreparation();
startTest();

function testSheetPreparation() {
    getParameters();
    consoleLogParamenter();
    prepareAllQuestions(element1RangeFrom, element1RangeTo, element2RangeFrom, element2RangeTo);
    PrepareAllAnswers();
    currentQuestion = -1;

}


function pageLoadingPreparation() {
    getParameters();
    consoleLogParamenter();
    prepareAllQuestions();
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
        console.log(event.key);
        if (event.key >= "0" && event.key <= "9" || event.key === "Backspace" || event.key === "-") {
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

function prepareAllQuestions() {
    switch (questionOperator) {
        case '+':
            prepareAsAdditionChallenges();
            break;
        case '-':
            prepareAsSubtractionChallenges();
            break;
        case '×':
            prepareAsMultiplicationChallenges();
            break;
        case '/':
            prepareAsDivisionChallenges();
            break;
        default:
            throw new Error('Invalid operator for test sheet generator');
    }

    console.log("Print all questions: ");
    console.log(allQuestions);
}

function PrepareAllAnswers() {
    for (var i = 0; i < allQuestions.length; i++) {
        allAnswers.push(calculate(allQuestions[i][0], allQuestions[i][1], questionOperator));
    }
}

function prepareAsAdditionChallenges() {
    generateRandomTestSheetQuestions(element1RangeFrom, element1RangeTo, element2RangeFrom, element2RangeTo);
}

function prepareAsSubtractionChallenges() {
    var subtractionPossibleCombinationCount = generatePossibleCombinationCountForPositiveAnsForSubtractionQs();

    if (subtractionPossibleCombinationCount >= totalQuestionsCount) {
        while (allQuestions.length < totalQuestionsCount) {
            var subtrahend = getRandomInt(element2RangeFrom, element2RangeTo);
            var minuend = getRandomInt(subtrahend, element1RangeTo)
    
            if (!isExistingPair(allQuestions, [minuend, subtrahend])) {
                allQuestions.push([minuend, subtrahend]);
            }
        }
    } else {
        while (allQuestions.length < subtractionPossibleCombinationCount) {
            var i = getRandomNumInc(firstNumfrom, firstNumTo);
            var j = getRandomNumInc(SecondNumFrom, SecondNumTo);
    
            if (!isExistingPair(allQuestions, [i, j])) {
                allQuestions.push([i, j]);
            }
        }

        while (allQuestions.length < totalQuestionsCount) {
            allQuestions.push(allQuestions[getRandomNumInc(0, subtractionPossibleCombinationCount -1)]);
        }
    }
}

function generatePossibleCombinationCountForPositiveAnsForSubtractionQs(){
    return 10;

}

function factorial(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

function prepareAsMultiplicationChallenges() {
    if (element1RangeFrom === element1RangeTo) {
        generateATimesTableWithAHeroNum(element1RangeFrom, element2RangeFrom, element2RangeTo);
    } else {
        generateRandomTestSheetQuestions(element1RangeFrom, element1RangeTo, element2RangeFrom, element2RangeTo);
    }
}

function generateATimesTableWithAHeroNum(firstNumfrom, SecondNumFrom, SecondNumTo) {
    var randomNumArray = generateANonRepeatedRandomNumArray(SecondNumFrom, SecondNumTo);
    for (var i = 0; i < randomNumArray.length; i++) {
        allQuestions.push([firstNumfrom, randomNumArray[i]]);
    }
    console.log(allQuestions);
}

function generateANonRepeatedRandomNumArray(fromNumInc, toNumInc) {
    orderedArray = [];
    for (var i = fromNumInc; i < toNumInc + 1; i++) {
        orderedArray.push(i);
    }

    for (let i = orderedArray.length - 1; i > 0; i--) {
        // Generate a random index
        let j = Math.floor(Math.random() * (i + 1));
        // Swap elements at i and j
        [orderedArray[i], orderedArray[j]] = [orderedArray[j], orderedArray[i]];
    }

    return orderedArray;
}

function generateRandomTestSheetQuestions(firstNumfrom, firstNumTo, SecondNumFrom, SecondNumTo) {
    var possibleCombinationCount = getPossibleCombinationCount(firstNumfrom, firstNumTo, SecondNumFrom, SecondNumTo);
    
    if (possibleCombinationCount >= totalQuestionsCount) {
        while (allQuestions.length < totalQuestionsCount) {
            var i = getRandomNumInc(firstNumfrom, firstNumTo);
            var j = getRandomNumInc(SecondNumFrom, SecondNumTo);
    
            if (!isExistingPair(allQuestions, [i, j])) {
                allQuestions.push([i, j]);
            }
        }
    } else {
        while (allQuestions.length < possibleCombinationCount) {
            var i = getRandomNumInc(firstNumfrom, firstNumTo);
            var j = getRandomNumInc(SecondNumFrom, SecondNumTo);
    
            if (!isExistingPair(allQuestions, [i, j])) {
                allQuestions.push([i, j]);
            }
        }

        while (allQuestions.length < totalQuestionsCount) {
            allQuestions.push(allQuestions[getRandomNumInc(0, possibleCombinationCount -1)]);
        }
    }
}

function getPossibleCombinationCount(multiplicantFromInc, multiplicantToInc, multiplierFromInc, multiplierToInc) {
    return ((multiplicantToInc - multiplicantFromInc + 1) * (multiplierToInc - multiplierFromInc + 1));

}

function getRandomNumInc(fromInc, toInc) {
    return fromInc + (Math.floor(Math.random() * (toInc - fromInc + 1)));
}

function isExistingPair(arr, pair) {
    return arr.some(subArr => subArr[0] === pair[0] && subArr[1] === pair[1]);
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
        case '-':
            return a - b;
        case '×':
            return a * b;
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

    $('#showAnswerBtn').text("Try again");
    $('#showAnswerBtn').off('mousedown');
    $('#showAnswerBtn').off('mouseup');
    $('#showAnswerBtn').on('click', function() {
        location.reload();
    });
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