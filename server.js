const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());

//connect to db
mongoose.connect(
  "mongodb+srv://hope:sxekojje321@cluster0-5cn3a.mongodb.net/quiz?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const quizSchema = mongoose.Schema({
  question: String,
  answer: [String],
});

const Quiz = mongoose.model("Quiz", quizSchema);

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/getQuestions", async (req, res) => {
  const dbQuestions = await Quiz.find({}).select("-_id question answer");
  res.json(dbQuestions);
});

app.post("/getInfo", async (req, res) => {
  const reqQuestions = req.body;

  console.log(reqQuestions);

  const dbQuestions = await Quiz.find();

  for (const q of reqQuestions) {
    var index = dbQuestions.findIndex((x) => x.question == q.question);

    if (index == -1) {
      const quizInstance = new Quiz();
      quizInstance.question = q.question;
      quizInstance.answer = [q.answer];
      console.log(quizInstance);
      await quizInstance.save();
    } else {
      const answerIndex = dbQuestions[index].answer.findIndex(
        (x) => x.answer == q.answer
      );
      if (answerIndex == -1) {
        const aQuiz = await Quiz.findById(dbQuestions[index].id);
        aQuiz.answer.push(q.answer);
        aQuiz.markModified("answer");
        await aQuiz.save();
      }
    }
  }
  const dbQuestions2 = await Quiz.find();

  res.json(dbQuestions2);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("server started"));
