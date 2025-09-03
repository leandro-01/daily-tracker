// Seleção de elementos
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const themeToggle = document.getElementById("theme-toggle");

// Carregar tarefas salvas
document.addEventListener("DOMContentLoaded", loadTasks);

// Adicionar tarefa pelo botão
addTaskBtn.addEventListener("click", addTask);

// Adicionar tarefa com Enter
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// Alternar tema
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  saveTheme();
});

// Função para adicionar tarefa
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  createTaskElement(taskText);
  saveTask(taskText);

  taskInput.value = "";
}

// Criar elemento de tarefa
function createTaskElement(text) {
  const li = document.createElement("li");
  li.className = "task-item";

  const span = document.createElement("span");
  span.textContent = text;

  const btnContainer = document.createElement("div");
  btnContainer.className = "task-buttons";

  // Botão editar
  const editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M3 17.25V21h3.75l11-11.04-3.75-3.75L3 17.25zM20.71 
               7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 
               1.003 0 0 0-1.42 0l-1.83 1.83 3.75 
               3.75 1.84-1.82z"/>
    </svg>
  `;

  editBtn.addEventListener("click", () => editTask(span));

  // Botão excluir
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 
               1H5v2h14V4h-4.5l-1-1z"/>
    </svg>
  `;

  deleteBtn.addEventListener("click", () => {
    taskList.removeChild(li);
    removeTask(span.textContent);
  });

  btnContainer.appendChild(editBtn);
  btnContainer.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(btnContainer);
  taskList.appendChild(li);
}

// Editar tarefa
function editTask(span) {
  const novoTexto = prompt("Edite a tarefa:", span.textContent);
  if (novoTexto && novoTexto.trim() !== "") {
    updateTask(span.textContent, novoTexto.trim());
    span.textContent = novoTexto.trim();
  }
}

// Salvar tarefa no localStorage
function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Atualizar tarefa no localStorage
function updateTask(oldText, newText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const index = tasks.indexOf(oldText);
  if (index !== -1) {
    tasks[index] = newText;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

// Remover tarefa
function removeTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(t => t !== task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Carregar tarefas do localStorage
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTaskElement(task));

  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
  }
}

// Salvar tema no localStorage
function saveTheme() {
  const theme = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", theme);
}