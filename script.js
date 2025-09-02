// Seleção de elementos principais
const input = document.getElementById("nova-tarefa");
const botaoAdicionar = document.getElementById("adicionar");
const lista = document.getElementById("lista-tarefas");
const botaoTema = document.getElementById("alternar-tema");

// Carregar tarefas do LocalStorage ao iniciar
document.addEventListener("DOMContentLoaded", carregarTarefas);

// Adicionar nova tarefa ao clicar no botão
botaoAdicionar.addEventListener("click", adicionarTarefa);

// Também adicionar ao pressionar Enter
input.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    adicionarTarefa();
  }
});

// Alternar tema claro/escuro
botaoTema.addEventListener("click", () => {
  document.body.classList.toggle("escuro");
});

// Função para adicionar tarefa
function adicionarTarefa() {
  const texto = input.value.trim();
  if (texto === "") return;

  criarElementoTarefa(texto);
  salvarTarefas();
  input.value = "";
}

// Função para criar um item da lista de tarefas
function criarElementoTarefa(texto) {
  const li = document.createElement("li");

  // Texto da tarefa (clicável para editar)
  const span = document.createElement("span");
  span.textContent = texto;

  // Ao clicar no texto, habilita edição
  span.addEventListener("click", () => editarTarefa(span));

  // Botão remover
  const botaoRemover = document.createElement("button");
  botaoRemover.textContent = "Remover";
  botaoRemover.classList.add("remover");
  botaoRemover.addEventListener("click", () => {
    li.remove();
    salvarTarefas();
  });

  li.appendChild(span);
  li.appendChild(botaoRemover);
  lista.appendChild(li);
}

// Função para editar uma tarefa
function editarTarefa(span) {
  const textoAtual = span.textContent;
  const inputEdicao = document.createElement("input");
  inputEdicao.type = "text";
  inputEdicao.value = textoAtual;
  inputEdicao.classList.add("input-edicao");

  // Substitui o span pelo input
  span.replaceWith(inputEdicao);
  inputEdicao.focus();

  // Salvar edição ao pressionar Enter ou sair do foco
  inputEdicao.addEventListener("keypress", (e) => {
    if (e.key === "Enter") finalizarEdicao(inputEdicao);
  });
  inputEdicao.addEventListener("blur", () => finalizarEdicao(inputEdicao));
}

// Finalizar edição e voltar ao span
function finalizarEdicao(inputEdicao) {
  const novoTexto = inputEdicao.value.trim();
  const span = document.createElement("span");
  span.textContent = novoTexto !== "" ? novoTexto : "Tarefa sem nome";

  // Reaplicar evento de edição
  span.addEventListener("click", () => editarTarefa(span));

  inputEdicao.replaceWith(span);
  salvarTarefas();
}

// Função para salvar tarefas no LocalStorage
function salvarTarefas() {
  const tarefas = [];
  document.querySelectorAll("#lista-tarefas li span").forEach(span => {
    tarefas.push(span.textContent);
  });
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Função para carregar tarefas salvas
function carregarTarefas() {
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  tarefas.forEach(tarefa => criarElementoTarefa(tarefa));
}