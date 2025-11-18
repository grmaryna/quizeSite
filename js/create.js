let currentOptions = [];
let allQuestions = [];

const optionsBox = document.getElementById("options-box");

// Додавання нової опції
document.getElementById("add-option-btn").onclick = () => {
  const option = { text: "", isCorrect: false };
  currentOptions.push(option);

  const row = document.createElement("div");
  row.className = "option-row";

  // Поле вводу тексту опції
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Option text";
  input.oninput = () => option.text = input.value;

  // Контейнер для checkbox і кнопки Delete
  const controls = document.createElement("div");
  controls.className = "option-controls";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.onchange = () => option.isCorrect = checkbox.checked;

  const label = document.createElement("label");
  label.appendChild(checkbox);
  label.appendChild(document.createTextNode(" Mark as correct"));

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.className = "del-btn";
  delBtn.onclick = () => {
    optionsBox.removeChild(row);
    const index = currentOptions.indexOf(option);
    if (index > -1) currentOptions.splice(index, 1);
  };

  controls.appendChild(label);
  controls.appendChild(delBtn);

  row.appendChild(input);
  row.appendChild(controls);

  optionsBox.appendChild(row);
};

// Збереження питання
document.getElementById("save-question-btn").onclick = () => {
  const questionText = document.getElementById("q-text").value.trim();
  if (!questionText) { alert("Please enter a question"); return; }

  const options = currentOptions.filter(opt => opt.text.trim() !== "");
  if (options.length < 2) { alert("Add at least 2 options"); return; }
  if (!options.some(opt => opt.isCorrect)) { alert("Mark at least one correct answer"); return; }

  allQuestions.push({ text: questionText, options });

  document.getElementById("q-text").value = "";
  optionsBox.innerHTML = "";
  currentOptions = [];
  updateQuestionList();
};

// Оновлення списку питань
function updateQuestionList() {
  const list = document.getElementById("questions-list");
  list.innerHTML = "";
  allQuestions.forEach((q, i) => {
    const div = document.createElement("div");
    div.textContent = `${i + 1}. ${q.text}`;
    list.appendChild(div);
  });
}

// Збереження квізу
document.getElementById("save-quiz-btn").onclick = () => {
  const name = document.getElementById("quiz-name").value.trim();
  const desc = document.getElementById("quiz-desc").value.trim();
  if (!name || !desc || allQuestions.length === 0) {
    alert("Fill in quiz name, description, and add at least one question"); 
    return; 
  }

  const quiz = { name, description: desc, questions: allQuestions };
  const saved = JSON.parse(localStorage.getItem("userQuizzes") || "[]");
  saved.push(quiz);
  localStorage.setItem("userQuizzes", JSON.stringify(saved));
  alert("Quiz saved!");
};