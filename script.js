const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Carregar tarefas salvas
document.addEventListener("DOMContentLoaded", loadTasks);

addTaskBtn.addEventListener("click", addTask);
taskList.addEventListener("click", handleTaskActions);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const task = {
    text: taskText,
    completed: false
  };

  saveTask(task);
  renderTask(task);
  taskInput.value = "";
}

function renderTask(task) {
  const li = document.createElement("li");
  li.textContent = task.text;
  if (task.completed) li.classList.add("completed");

  // clique para marcar/desmarcar
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateTaskStatus(task.text, li.classList.contains("completed"));
  });

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remover";
  removeBtn.classList.add("remove-btn");
  removeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    removeTask(task.text);
  });

  li.appendChild(removeBtn);
  taskList.appendChild(li);
}

function saveTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function loadTasks() {
  const tasks = getTasks();
  tasks.forEach(renderTask);
}

function removeTask(taskText) {
  let tasks = getTasks();
  tasks = tasks.filter(t => t.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskStatus(taskText, completed) {
  const tasks = getTasks();
  const task = tasks.find(t => t.text === taskText);
  if (task) {
    task.completed = completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}