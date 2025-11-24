"use strict";

var quizzes = JSON.parse(localStorage.getItem("userQuizzes") || "[]");
var currentQuiz = null;
var currentQuestionIndex = 0;
var score = 0;
var quizSelect = document.getElementById("quiz-select");
var quizBox = document.getElementById("quiz-box");
var resultBox = document.getElementById("result-box");
var questionText = document.getElementById("question-text");
var answersBox = document.getElementById("answers-box");
var resultText = document.getElementById("result-text");
quizzes.forEach(function (quiz, index) {
  var option = document.createElement("option");
  option.value = index;
  option.textContent = quiz.name;
  quizSelect.appendChild(option);
});
document.getElementById("start-quiz-btn").onclick = function () {
  if (quizSelect.value === "") {
    alert("Please select a quiz");
    return;
  }
  currentQuiz = quizzes[quizSelect.value];
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById("select-quiz-box").style.display = "none";
  quizBox.style.display = "block";
  showQuestion();
};
function showQuestion() {
  var q = currentQuiz.questions[currentQuestionIndex];
  questionText.textContent = q.text;
  answersBox.innerHTML = "";
  q.options.forEach(function (opt, index) {
    var row = document.createElement("div");
    row.className = "answer-row";
    var cb = document.createElement("input");
    cb.type = "checkbox";
    cb.id = "opt-" + index;
    var label = document.createElement("label");
    label.htmlFor = "opt-" + index;
    label.textContent = opt.text;
    row.appendChild(cb);
    row.appendChild(label);
    answersBox.appendChild(row);
  });
}
document.getElementById("next-btn").onclick = function () {
  var q = currentQuiz.questions[currentQuestionIndex];
  var correct = true;
  var anyChecked = false;
  q.options.forEach(function (opt, index) {
    var cb = document.getElementById("opt-" + index);
    if (cb.checked) anyChecked = true;
    if (cb.checked !== opt.isCorrect) correct = false;
  });
  if (!anyChecked) {
    alert("Please select at least one answer!");
    return;
  }
  if (correct) score++;
  currentQuestionIndex++;
  if (currentQuestionIndex < currentQuiz.questions.length) showQuestion();else {
    saveResult();
    showResult();
  }
};
function saveResult() {
  var results = JSON.parse(localStorage.getItem("quizResults") || "[]");
  results.push({
    quiz: currentQuiz.name,
    score: "".concat(score, "/").concat(currentQuiz.questions.length),
    date: new Date().toLocaleDateString()
  });
  localStorage.setItem("quizResults", JSON.stringify(results));
}
function showResult() {
  quizBox.style.display = "none";
  resultBox.style.display = "block";
  resultText.textContent = "You scored ".concat(score, " out of ").concat(currentQuiz.questions.length);
}
document.getElementById("exit-btn").onclick = document.getElementById("back-btn").onclick = document.getElementById("home-btn").onclick = function () {
  window.location.href = "index.html";
};