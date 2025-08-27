document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");
  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");

  const noteInput = document.getElementById("noteInput");
  const addNoteBtn = document.getElementById("addNoteBtn");
  const noteList = document.getElementById("noteList");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.textContent = task.text;
      if (task.completed) li.classList.add("completed");

      li.addEventListener("click", () => toggleTask(index));

      const delBtn = document.createElement("button");
      delBtn.textContent = "X";
      delBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        deleteTask(index);
      });

      li.appendChild(delBtn);
      taskList.appendChild(li);
    });
    updateProgress();
  }

  function renderNotes() {
    noteList.innerHTML = "";
    notes.forEach((note, index) => {
      const li = document.createElement("li");
      li.textContent = note;

      const delBtn = document.createElement("button");
      delBtn.textContent = "X";
      delBtn.addEventListener("click", () => deleteNote(index));

      li.appendChild(delBtn);
      noteList.appendChild(li);
    });
  }

  function addTask() {
    const text = taskInput.value.trim();
    if (text !== "") {
      tasks.push({ text, completed: false });
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
      taskInput.value = "";
    }
  }

  function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }

  function updateProgress() {
    if (tasks.length === 0) {
      progressBar.value = 0;
      progressText.textContent = "0% concluído";
      return;
    }
    const completedTasks = tasks.filter(t => t.completed).length;
    const percent = Math.round((completedTasks / tasks.length) * 100);
    progressBar.value = percent;
    progressText.textContent = `${percent}% concluído`;
  }

  function addNote() {
    const text = noteInput.value.trim();
    if (text !== "") {
      notes.push(text);
      localStorage.setItem("notes", JSON.stringify(notes));
      renderNotes();
      noteInput.value = "";
    }
  }

  function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();
  }

  addTaskBtn.addEventListener("click", addTask);
  addNoteBtn.addEventListener("click", addNote);

  renderTasks();
  renderNotes();
});