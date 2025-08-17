// Seleciona os elementos
const addTaskButton = document.getElementById("add-task");
const taskInput = document.getElementById("new-task");
const taskList = document.getElementById("task-list");

// Função para adicionar tarefa
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Digite uma tarefa antes de adicionar!");
        return;
    }

    // Criar item de lista
    const li = document.createElement("li");
    li.textContent = taskText;

    // Adiciona ao UL
    taskList.appendChild(li);

    // Limpa o campo
    taskInput.value = "";
}

// Evento do botão
addTaskButton.addEventListener("click", addTask);

// Permitir Enter no input
taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});