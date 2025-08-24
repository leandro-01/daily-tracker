const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');
const clearAllBtn = document.getElementById('clearAllBtn');

// Função para criar tarefa
function createTask(taskText, completed = false) {
    const li = document.createElement('li');
    li.textContent = taskText;
    if (completed) li.classList.add('completed');

    li.addEventListener('click', () => {
        li.classList.toggle('completed');
        saveTasks();
    });

    taskList.appendChild(li);
}

// Adicionar tarefa
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        createTask(taskText);
        taskInput.value = '';
        saveTasks();
    }
});

// Limpar tarefas concluídas
clearCompletedBtn.addEventListener('click', () => {
    const completedTasks = document.querySelectorAll('li.completed');
    completedTasks.forEach(task => task.remove());
    saveTasks();
});

// Limpar todas as tarefas
clearAllBtn.addEventListener('click', () => {
    taskList.innerHTML = '';
    saveTasks();
});

// Salvar tarefas no localStorage
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(task => {
        tasks.push({ text: task.textContent, completed: task.classList.contains('completed') });
    });
    localStorage.setItem('dailyTasks', JSON.stringify(tasks));
}

// Carregar tarefas salvas
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('dailyTasks')) || [];
    savedTasks.forEach(task => createTask(task.text, task.completed));
}

// Inicialização
loadTasks();