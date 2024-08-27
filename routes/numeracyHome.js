import express from 'express';
import bodyParser from "body-parser";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();

router.get('/', (req, res) => {
    res.render('numeracy/numeracyHome.ejs');
});

router.get("/addition", (req, res) => {
    res.render('numeracy/additionTestChoices.ejs');
});

router.get("/subtraction", (req, res) => {
    res.render('numeracy/subtractionTestChoices.ejs');
});

router.get("/multiplication", (req, res) => {
    res.render('numeracy/multiplicationTestChoices.ejs', {challengeOptions: multiplicationTestOptions});
});

router.post("/submitMiltiplication", (req, res) => {
    const chosenTableIndex = multiplicationTestOptions.findIndex((t) => t.displayName === req.body.chosenTimesTable);
    var parameters = multiplicationTestOptions[chosenTableIndex];
    res.render('numeracy/multiplcationTestKeyboard.ejs', {testParameters: parameters});
})

router.get("/division", (req, res) => {
    res.render('numeracy/divisionTestChoices.ejs');
});

export default router;

function numeracyTestObjects(displayName, htmlId, element1RangeFrom, element1RangeTo, element2RangeFrom, element2RangeTo, operator, numberOfQuestions) {
    this.displayName = displayName;
    this.htmlId = htmlId;
    this.element1RangeFrom = element1RangeFrom;
    this.element1RangeTo = element1RangeTo,
    this.element2RangeFrom = element2RangeFrom,
    this.element2RangeTo = element2RangeTo;
    this.operator = operator;
    this.numberOfQuestions = numberOfQuestions;
}

const multiplicationTestOptions = [
    new numeracyTestObjects("2 Times Table", "2times", 2, 2, 1, 9, "×", 9),
    new numeracyTestObjects("3 Times Table", "3times", 3, 3, 1, 9, "×", 9),
    new numeracyTestObjects("4 Times Table", "4times", 4, 4, 1, 9, "×", 9),
    new numeracyTestObjects("5 Times Table", "5times", 5, 5, 1, 9, "×", 9),
    new numeracyTestObjects("6 Times Table", "6times", 6, 6, 1, 9, "×", 9),
    new numeracyTestObjects("7 Times Table", "7times", 7, 7, 1, 9, "×", 9),
    new numeracyTestObjects("8 Times Table", "8times", 8, 8, 1, 9, "×", 9),
    new numeracyTestObjects("9 Times Table", "9times", 9, 9, 1, 9, "×", 9),
    new numeracyTestObjects("Table 9 x 9", "99times", 2, 9, 1, 9, "×", 12),
    new numeracyTestObjects("Table 12 x 12", "1212times", 2, 12, 1, 12, "×", 12),
];
