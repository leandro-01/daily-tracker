document.getElementById("addTaskBtn").addEventListener("click", function() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const li = document.createElement("li");
        li.textContent = taskText;

        // Alternar concluído ao clicar
        li.addEventListener("click", function() {
            li.classList.toggle("completed");
        });

        // Botão de deletar tarefa
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.addEventListener("click", function(e) {
            e.stopPropagation(); // evita marcar como concluído ao excluir
            li.remove();
        });

        li.appendChild(deleteBtn);
        document.getElementById("taskList").appendChild(li);
        taskInput.value = "";
    }
});