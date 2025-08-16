// Captura elementos
const addTaskBtn = document.getElementById("add-task-btn");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Função para adicionar tarefa
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Digite uma tarefa antes de adicionar!");
        return;
    }

    // Cria o item da lista
    const li = document.createElement("li");
    li.textContent = taskText;

    // Adiciona na lista
    taskList.appendChild(li);

    // Limpa o input
    taskInput.value = "";
}

// Evento de clique no botão
addTaskBtn.addEventListener("click", addTask);

// Evento de "Enter" no input
taskInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});