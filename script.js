// Seleciona elementos do DOM
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const toggleThemeBtn = document.getElementById("toggleTheme");

// --------------------
// Gerenciamento do tema
// --------------------

// Carrega tema salvo no LocalStorage
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

// Alterna entre modo claro e escuro
toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  // Salva a preferência no LocalStorage
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

// --------------------
// Funções de tarefas
// --------------------

// Carrega tarefas do LocalStorage e renderiza na tela
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => renderTask(task));
}

// Salva todas as tarefas atuais no LocalStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li span").forEach(span => {
    tasks.push(span.textContent);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Renderiza uma tarefa na lista
function renderTask(text) {
  const li = document.createElement("li");

  // Span para o texto da tarefa
  const span = document.createElement("span");
  span.textContent = text;

  // Botão de remover tarefa
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remover";
  removeBtn.addEventListener("click", () => {
    li.remove();  // Remove do DOM
    saveTasks();  // Atualiza LocalStorage
  });

  li.appendChild(span);
  li.appendChild(removeBtn);
  taskList.appendChild(li);
}

// Adiciona tarefa ao clicar no botão
addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text !== "") {
    renderTask(text);
    saveTasks(); // Salva no LocalStorage
    taskInput.value = ""; // Limpa input
  }
});

// Permite adicionar tarefa pressionando Enter
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTaskBtn.click();
  }
});

// Inicializa carregando as tarefas
loadTasks();