const tarefaInput = document.getElementById("tarefaInput");
const addBtn = document.getElementById("addBtn");
const listaTarefas = document.getElementById("listaTarefas");
const limparBtn = document.getElementById("limparBtn");
const toggleTema = document.getElementById("toggleTema");

// Carregar tema salvo
document.addEventListener("DOMContentLoaded", () => {
  const temaSalvo = localStorage.getItem("tema");
  if (temaSalvo === "escuro") {
    document.body.classList.add("tema-escuro");
    toggleTema.textContent = "☀️";
  }
  carregarTarefas();
});

addBtn.addEventListener("click", adicionarTarefa);
tarefaInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    adicionarTarefa();
  }
});
limparBtn.addEventListener("click", limparTarefas);
toggleTema.addEventListener("click", mudarTema);

function adicionarTarefa() {
  const texto = tarefaInput.value.trim();
  if (texto === "") return;

  const tarefa = { texto: texto, concluida: false };
  salvarTarefa(tarefa);
  renderizarTarefas();

  tarefaInput.value = "";
}

function salvarTarefa(tarefa) {
  const tarefas = obterTarefas();
  tarefas.push(tarefa);
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function obterTarefas() {
  return JSON.parse(localStorage.getItem("tarefas")) || [];
}

function carregarTarefas() {
  renderizarTarefas();
}

function renderizarTarefas() {
  listaTarefas.innerHTML = "";
  const tarefas = obterTarefas();

  tarefas.forEach((tarefa, index) => {
    const li = document.createElement("li");
    li.textContent = tarefa.texto;

    if (tarefa.concluida) {
      li.classList.add("concluida");
    }

    li.addEventListener("click", () => {
      tarefas[index].concluida = !tarefas[index].concluida;
      localStorage.setItem("tarefas", JSON.stringify(tarefas));
      renderizarTarefas();
    });

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    btnRemover.classList.add("remove");
    btnRemover.addEventListener("click", (e) => {
      e.stopPropagation();
      tarefas.splice(index, 1);
      localStorage.setItem("tarefas", JSON.stringify(tarefas));
      renderizarTarefas();
    });

    li.appendChild(btnRemover);
    listaTarefas.appendChild(li);
  });
}

function limparTarefas() {
  localStorage.removeItem("tarefas");
  renderizarTarefas();
}

function mudarTema() {
  document.body.classList.toggle("tema-escuro");
  const escuroAtivo = document.body.classList.contains("tema-escuro");

  if (escuroAtivo) {
    toggleTema.textContent = "☀️";
    localStorage.setItem("tema", "escuro");
  } else {
    toggleTema.textContent = "🌙";
    localStorage.setItem("tema", "claro");
  }
}