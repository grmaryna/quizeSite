"use strict";

function loadResults() {
  var tableBody = document.querySelector("#resultsTable tbody");
  tableBody.innerHTML = "";
  var results = JSON.parse(localStorage.getItem("quizResults") || "[]");
  if (results.length === 0) {
    var row = document.createElement("tr");
    var cell = document.createElement("td");
    cell.colSpan = 3;
    cell.textContent = "No results yet";
    row.appendChild(cell);
    tableBody.appendChild(row);
    return;
  }
  results.forEach(function (result) {
    var row = document.createElement("tr");
    var quizCell = document.createElement("td");
    quizCell.textContent = result.quiz;
    row.appendChild(quizCell);
    var scoreCell = document.createElement("td");
    scoreCell.textContent = result.score;
    row.appendChild(scoreCell);
    var dateCell = document.createElement("td");
    dateCell.textContent = result.date;
    row.appendChild(dateCell);
    tableBody.appendChild(row);
  });
}
function clearResults() {
  localStorage.removeItem("quizResults");
  loadResults();
}
loadResults();