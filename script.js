const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterTasks = document.getElementById("filterTasks");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");
const clearAll = document.getElementById("clearAll");
const prioritySelect = document.getElementById("prioritySelect");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  let filteredTasks = tasks;

  if (filterTasks.value === "completed") {
    filteredTasks = tasks.filter(task => task.completed);
  } else if (filterTasks.value === "pending") {
    filteredTasks = tasks.filter(task => !task.completed);
  }

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    li.classList.add(`priority-${task.priority}`);
    if (task.completed) li.classList.add("completed");

    li.addEventListener("click", () => toggleTask(index));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteTask(index);
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  updateStats();
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const text = taskInput.value.trim();
  const priority = prioritySelect.value;
  if (text === "") return;
  tasks.push({ text, completed: false, priority });
  taskInput.value = "";
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function updateStats() {
  totalTasks.textContent = tasks.length;
  completedTasks.textContent = tasks.filter(t => t.completed).length;
  pendingTasks.textContent = tasks.filter(t => !t.completed).length;
}

function clearAllTasks() {
  tasks = [];
  renderTasks();
}

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});
filterTasks.addEventListener("change", renderTasks);
clearAll.addEventListener("click", clearAllTasks);

renderTasks();