function loadResults() {
  const tableBody = document.querySelector("#resultsTable tbody");
  tableBody.innerHTML = "";

  const results = JSON.parse(localStorage.getItem("quizResults") || "[]");
  if (results.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 3;
    cell.textContent = "No results yet";
    row.appendChild(cell);
    tableBody.appendChild(row);
    return;
  }

  results.forEach(result => {
    const row = document.createElement("tr");

    const quizCell = document.createElement("td");
    quizCell.textContent = result.quiz;
    row.appendChild(quizCell);

    const scoreCell = document.createElement("td");
    scoreCell.textContent = result.score;
    row.appendChild(scoreCell);

    const dateCell = document.createElement("td");
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