const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const historyList = document.getElementById("historyList");
const clearAllBtn = document.getElementById("clearAllBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let history = JSON.parse(localStorage.getItem("history")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button onclick="toggleTask(${index})">✔</button>
        <button onclick="deleteTask(${index})">🗑</button>
      </div>
    `;

    taskList.appendChild(li);
  });
  updateProgress();
}

function renderHistory() {
  historyList.innerHTML = "";
  history.forEach((h) => {
    const li = document.createElement("li");
    li.textContent = h;
    historyList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;
  tasks.push({ text, completed: false });
  taskInput.value = "";
  saveAndRender();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  if (tasks[index].completed) {
    const date = new Date().toLocaleDateString();
    history.push(`✔ "${tasks[index].text}" concluída em ${date}`);
  }
  saveAndRender();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveAndRender();
}

function updateProgress() {
  if (tasks.length === 0) {
    progressFill.style.width = "0%";
    progressText.textContent = "0% concluído";
    return;
  }
  const completed = tasks.filter(t => t.completed).length;
  const percent = Math.round((completed / tasks.length) * 100);
  progressFill.style.width = percent + "%";
  progressText.textContent = `${percent}% concluído`;
}

function clearAll() {
  tasks = [];
  history = [];
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("history", JSON.stringify(history));
  renderTasks();
  renderHistory();
}

addTaskBtn.addEventListener("click", addTask);
clearAllBtn.addEventListener("click", clearAll);

renderTasks();
renderHistory();