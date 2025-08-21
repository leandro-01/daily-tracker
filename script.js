document.addEventListener("DOMContentLoaded", loadTasks);

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearTasksBtn = document.getElementById("clearTasksBtn");

const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const pendingCount = document.getElementById("pendingCount");

addTaskBtn.addEventListener("click", addTask);
clearTasksBtn.addEventListener("click", clearTasks);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const li = createTaskElement(taskText);
    taskList.appendChild(li);

    saveTasks();
    updateStats();
    taskInput.value = "";
}

function createTaskElement(taskText, completed = false) {
    const li = document.createElement("li");
    if (completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = taskText;
    span.addEventListener("click", function () {
        li.classList.toggle("completed");
        saveTasks();
        updateStats();
    });

    const editBtn = document.createElement("button");
    editBtn.textContent = "Editar";
    editBtn.style.backgroundColor = "#28a745";
    editBtn.addEventListener("click", function () {
        const newText = prompt("Edite a tarefa:", span.textContent);
        if (newText !== null && newText.trim() !== "") {
            span.textContent = newText.trim();
            saveTasks();
            updateStats();
        }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Excluir";
    deleteBtn.style.backgroundColor = "#dc3545";
    deleteBtn.addEventListener("click", function () {
        li.remove();
        saveTasks();
        updateStats();
    });

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    return li;
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const li = createTaskElement(task.text, task.completed);
        taskList.appendChild(li);
    });
    updateStats();
}

function clearTasks() {
    taskList.innerHTML = "";
    saveTasks();
    updateStats();
}

function updateStats() {
    const tasks = document.querySelectorAll("#taskList li");
    const total = tasks.length;
    const completed = document.querySelectorAll("#taskList li.completed").length;
    const pending = total - completed;

    totalCount.textContent = total;
    completedCount.textContent = completed;
    pendingCount.textContent = pending;
}