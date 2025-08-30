const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const resetBtn = document.getElementById("resetBtn");

// Adicionar tarefa
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");
  li.textContent = taskText;

  // Clicar na tarefa = completar
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
  });

  // Botão de remover tarefa
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "X";
  removeBtn.style.background = "#ef4444";
  removeBtn.style.marginLeft = "10px";
  removeBtn.style.borderRadius = "6px";
  removeBtn.style.padding = "5px 8px";
  removeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
  });

  li.appendChild(removeBtn);
  taskList.appendChild(li);

  taskInput.value = "";
});

// Resetar lista
resetBtn.addEventListener("click", () => {
  taskList.innerHTML = "";
});