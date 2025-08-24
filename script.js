const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearCompletedBtn = document.getElementById("clearCompleted");
const clearAllBtn = document.getElementById("clearAll");
const progressText = document.getElementById("progressText");

function updateProgress() {
    const tasks = document.querySelectorAll("li");
    const completed = document.querySelectorAll("li.completed");
    progressText.textContent = `Progresso: ${completed.length}/${tasks.length}`;
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.querySelector(".task-text").textContent,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    saved.forEach(task => addTask(task.text, task.completed));
    updateProgress();
}

function addTask(text, completed = false) {
    if (text.trim() === "") return;

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = text;
    span.classList.add("task-text");
    li.appendChild(span);

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.style.marginLeft = "10px";

    removeBtn.addEventListener("click", function() {
        li.remove();
        saveTasks();
        updateProgress();
    });

    li.appendChild(removeBtn);

    li.addEventListener("click", function(e) {
        if (e.target.tagName !== "BUTTON") {
            li.classList.toggle("completed");
            saveTasks();
            updateProgress();
        }
    });

    if (completed) li.classList.add("completed");

    taskList.appendChild(li);
    taskInput.value = "";
    saveTasks();
    updateProgress();
}

addTaskBtn.addEventListener("click", () => addTask(taskInput.value));
taskInput.addEventListener("keypress", e => {
    if (e.key === "Enter") addTask(taskInput.value);
});

clearCompletedBtn.addEventListener("click", () => {
    document.querySelectorAll("li.completed").forEach(li => li.remove());
    saveTasks();
    updateProgress();
});

clearAllBtn.addEventListener("click", () => {
    taskList.innerHTML = "";
    saveTasks();
    updateProgress();
});

loadTasks();
