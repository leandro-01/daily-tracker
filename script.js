const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const li = document.createElement("li");
        li.textContent = taskText;

        // Marca a tarefa como concluída ao clicar
        li.addEventListener("click", function() {
            li.classList.toggle("completed");
        });

        taskList.appendChild(li);
        taskInput.value = "";
    }
});