
console.log("test.js");


var element1RangeFrom;
var element1RangeTo;
var element2RangeFrom;
var element2RangeTo;
var operator;
var numberOfQuestions;

var currentQuestion;
var question1stNum;
var question2ndNum;
var questionOperator = "";

getParameters();
consoleLogParamenter();


nextQuestion();


function getParameters() {
    element1RangeFrom = parseInt($("#para_element1RangeFrom").text());
    element1RangeTo = parseInt($("#para_element1RangeTo").text());
    element2RangeFrom = parseInt($("#para_element2RangeFrom").text());
    element2RangeTo = parseInt($("#para_element2RangeTo").text());
    questionOperator = $("#para_operator").text();
    numberOfQuestions = parseInt($("#para_numberOfQuestions").text());
}

function consoleLogParamenter() {
    console.log("element1RangeFrom = " + element1RangeFrom);
    console.log("element1RangeTo = " + element1RangeTo);
    console.log("element2RangeFrom = " + element2RangeFrom);
    console.log("element2RangeTo = " + element2RangeTo);
    console.log("operator = " + questionOperator);
    console.log("numberOfQuestions = " + numberOfQuestions);
}

function startTest() {
    
}

function nextQuestion() {
    question1stNum = get1stNum();
    question2ndNum = get2ndNum();
    questionOperator = getOperator();

    currentQuestion++;
    $("#currentQuestion").text(question1stNum + " " + questionOperator + " " + question2ndNum + " = ?");
}

function updateQuestion() {

}

function get1stNum() {
    return getRandomInt(element1RangeFrom, element1RangeTo);
}

function get2ndNum() {
    return getRandomInt(element2RangeFrom, element2RangeTo);
}

function getOperator() {
    console.log("passed in operator = " + questionOperator);
    console.log("type of passed in operator = " + typeof(questionOperator));
    var operatorText = "";
    switch(questionOperator) {
        case "addition":
            operatorText =  "+";
            break;
        case "subtraction":
            operatorText =  "-";
            break;
        case "multiplication":
            console.log("pass multiplication");
            operatorText = "×";
            break;
        case "devision":
            operatorText =  "÷";
            break;
    }
    console.log("operator text = " + operatorText);
    return "×";
}

function getRandomInt(fromInc, toInc) {
    if (toInc === fromInc)
        {
            console.log("randomInt = " + fromInc);
            return fromInc;
        }
    // var ramNum = (fromInc + (Math.floor(Math.random() * (toInc + 1 - fromInc))));
    var ramNum = Math.floor(Math.random() * (toInc - fromInc + 1)) + fromInc;
    console.log("randomInt = " + ramNum);
    return ramNum;
  }