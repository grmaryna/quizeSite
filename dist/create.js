"use strict";

var currentOptions = [];
var allQuestions = [];
var optionsBox = document.getElementById("options-box");

// Додавання нової опції
document.getElementById("add-option-btn").onclick = function () {
  var option = {
    text: "",
    isCorrect: false
  };
  currentOptions.push(option);
  var row = document.createElement("div");
  row.className = "option-row";

  // Поле вводу тексту опції
  var input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Option text";
  input.oninput = function () {
    return option.text = input.value;
  };

  // Контейнер для checkbox і кнопки Delete
  var controls = document.createElement("div");
  controls.className = "option-controls";
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.onchange = function () {
    return option.isCorrect = checkbox.checked;
  };
  var label = document.createElement("label");
  label.appendChild(checkbox);
  label.appendChild(document.createTextNode(" Mark as correct"));
  var delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.className = "del-btn";
  delBtn.onclick = function () {
    optionsBox.removeChild(row);
    var index = currentOptions.indexOf(option);
    if (index > -1) currentOptions.splice(index, 1);
  };
  controls.appendChild(label);
  controls.appendChild(delBtn);
  row.appendChild(input);
  row.appendChild(controls);
  optionsBox.appendChild(row);
};

// Збереження питання
document.getElementById("save-question-btn").onclick = function () {
  var questionText = document.getElementById("q-text").value.trim();
  if (!questionText) {
    alert("Please enter a question");
    return;
  }
  var options = currentOptions.filter(function (opt) {
    return opt.text.trim() !== "";
  });
  if (options.length < 2) {
    alert("Add at least 2 options");
    return;
  }
  if (!options.some(function (opt) {
    return opt.isCorrect;
  })) {
    alert("Mark at least one correct answer");
    return;
  }
  allQuestions.push({
    text: questionText,
    options: options
  });
  document.getElementById("q-text").value = "";
  optionsBox.innerHTML = "";
  currentOptions = [];
  updateQuestionList();
};

// Оновлення списку питань
function updateQuestionList() {
  var list = document.getElementById("questions-list");
  list.innerHTML = "";
  allQuestions.forEach(function (q, i) {
    var div = document.createElement("div");
    div.textContent = "".concat(i + 1, ". ").concat(q.text);
    list.appendChild(div);
  });
}

// Збереження квізу
document.getElementById("save-quiz-btn").onclick = function () {
  var name = document.getElementById("quiz-name").value.trim();
  var desc = document.getElementById("quiz-desc").value.trim();
  if (!name || !desc || allQuestions.length === 0) {
    alert("Fill in quiz name, description, and add at least one question");
    return;
  }
  var quiz = {
    name: name,
    description: desc,
    questions: allQuestions
  };
  var saved = JSON.parse(localStorage.getItem("userQuizzes") || "[]");
  saved.push(quiz);
  localStorage.setItem("userQuizzes", JSON.stringify(saved));
  alert("Quiz saved!");
};