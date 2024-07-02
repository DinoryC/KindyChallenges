let tableToTest;
addEventListenerToTableChoiceButtons();
addEventListenerToOrderChoiceButtons();
enableChooseOrder(false);
enableStartButton(false);

function addEventListenerToTableChoiceButtons() {
    $(".tableChoice").on("click touchstart", function() {
        onTableChosenHandler(this.id);
    })
}

function addEventListenerToOrderChoiceButtons() {
    $(".orderChoice").on("click touchstart", function() {
        onOrderChosenHandler(this.id);
    })
}

function onTableChosenHandler(id) {
    var chosenTableInText = "";
    switch (id) {
        case "2times":
            chosenTableInText = "2 Times Table";
            tableToTest = twoTimesTable;
            enableChooseOrder(true);
            break;
        case "3times":
            chosenTableInText = "3 Times Table";
            tableToTest = threeTimesTable;
            enableChooseOrder(true);
            break;
        case "4times":
            chosenTableInText = "4 Times Table";
            tableToTest = fourTimesTable;
            enableChooseOrder(true);
            break;
        case "5times":
            chosenTableInText = "5 Times Table";
            tableToTest = fiveTimesTable;
            enableChooseOrder(true);
            break;
        case "6times":
            console.log("enter 6times");
            chosenTableInText = "6 Times Table";
            tableToTest = sixTimesTable;
            enableChooseOrder(true);
            break;
        case "7times":
            chosenTableInText = "7 Times Table";
            tableToTest = sevenTimesTable;
            enableChooseOrder(true);
            break;
        case "8times":
            chosenTableInText = "8 Times Table";
            tableToTest = eightTimesTable;
            enableChooseOrder(true);
            break;
        case "9times":
            chosenTableInText = "9 Times Table";
            tableToTest = nineTimesTable;
            enableChooseOrder(true);
            break;
        case "99times":
            chosenTableInText = "9 x 9 Table";
            tableToTest = timesTable9x9;
            break;
        case "1212times":
            chosenTableInText = "12 x 12 Times Table";
            tableToTest = timesTable12x12;
            break;
        case "customise":
            chosenTableInText = "6 Times Table";
            tableToTest = sixTimesTable;
            break;
        default:
            chosenTableInText = "6 Times Table";
            tableToTest = sixTimesTable;
            break;
    }

    $("#multiplicationTableChoice").text(chosenTableInText);
    $("#hrefForTouchpad").attr("href", "/Numeracy_multiplyTestTouchpad/" + id);
    $("#hrefForKeyboard").attr("href", "/numeracyHome/multiplication/keyboard/" + id);
}

function onOrderChosenHandler(id) {
    var chosenTableInText = "";
    switch (id) {
        case "inOrder":
            chosenTableInText = "In Order";
            enableStartButton(true);
            break;
        case "randomOrder":
            chosenTableInText = "Random Order";
            enableStartButton(true);
            break;
        
        default:
            chosenTableInText = "Random Order";
            enableChooseOrder(true);
            break;
    }

    $("#testOrderChoice").text(chosenTableInText);
}

function enableChooseOrder(isEnable) {
    if (isEnable) {
        if ($("#testOrderChoice").hasClass("hideOptions")) {
            console.log("enable choice of order");
            $("#testOrderChoice").removeClass("hideOptions");
        }
    } else {
        if (!$("#testOrderChoice").hasClass("hideOptions")) {
            console.log("Disable choice of order");
            $("#testOrderChoice").addClass("hideOptions");
        }
    }
}

function enableStartButton(isEnable) {
    if (isEnable) {
        if ($("#startChoiceButton").hasClass("hideOptions")) {
            console.log("enable start button");
            $("#startChoiceButton").removeClass("hideOptions");
        }
    } else {
        if (!$("#startChoiceButton").hasClass("hideOptions")) {
            console.log("Disable start button");
            $("#startChoiceButton").addClass("hideOptions");
        }
    }

    $("#hrefForTouchpad").attr("href", "/Numeracy_multiplyTestTouchpad/" + id);
    $("#hrefForKeyboard").attr("href", "/numeracyHome/multiplication/keyboard/" + id);
}

function animatePress(color) {
    $("#" + color).addClass("pressed");

    setTimeout(function() {
        $("#" + color).removeClass("pressed");
      }, 100);
}

const twoTimesTable = {
    element1RangeFrom: 2,
    element1RangeTo: 2,
    element2RangeFrom: 1,
    element2RangeTo: 9,
    operator: "multiplication",
    numberOfQuestions: 9
}

const threeTimesTable = {
    element1RangeFrom: 3,
    element1RangeTo: 3,
    element2RangeFrom: 1,
    element2RangeTo: 9,
    operator: "multiplication",
    numberOfQuestions: 9
}

const fourTimesTable = {
    element1RangeFrom: 4,
    element1RangeTo: 4,
    element2RangeFrom: 1,
    element2RangeTo: 9,
    operator: "multiplication",
    numberOfQuestions: 9
}

const fiveTimesTable = {
    element1RangeFrom: 5,
    element1RangeTo:5,
    element2RangeFrom: 1,
    element2RangeTo: 9,
    operator: "multiplication",
    numberOfQuestions: 9
}

const sixTimesTable = {
    element1RangeFrom: 6,
    element1RangeTo: 6,
    element2RangeFrom: 1,
    element2RangeTo: 9,
    operator: "multiplication",
    numberOfQuestions: 9
}

const sevenTimesTable = {
    element1RangeFrom: 7,
    element1RangeTo: 7,
    element2RangeFrom: 1,
    element2RangeTo: 9,
    operator: "multiplication",
    numberOfQuestions: 9
}

const eightTimesTable = {
    element1RangeFrom: 8,
    element1RangeTo: 8,
    element2RangeFrom: 1,
    element2RangeTo: 9,
    operator: "multiplication",
    numberOfQuestions: 9
}

const nineTimesTable = {
    element1RangeFrom: 9,
    element1RangeTo:9,
    element2RangeFrom: 1,
    element2RangeTo: 9,
    operator: "multiplication",
    numberOfQuestions: 9
}

const timesTable9x9 = {
    element1RangeFrom: 1,
    element1RangeTo:9,
    element2RangeFrom: 1,
    element2RangeTo: 9,
    operator: "multiplication",
    numberOfQuestions: 12
}

const timesTable12x12 = {
    element1RangeFrom: 1,
    element1RangeTo:12,
    element2RangeFrom: 1,
    element2RangeTo: 12,
    operator: "multiplication",
    numberOfQuestions: 12
}