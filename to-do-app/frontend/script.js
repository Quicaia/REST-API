const API_URL = 'http://localhost:3000/tarefas';

async function carregarTarefas() {
  const res = await fetch(API_URL);
  const tarefas = await res.json();

  const lista = document.getElementById('listaTarefas');
  lista.innerHTML = '';
  tarefas.forEach(t => {
    const li = document.createElement('li');
    li.textContent = t.texto;
    const btn = document.createElement('button');
    btn.textContent = '🗑️';
    btn.onclick = () => deletarTarefa(t.id);
    li.appendChild(btn);
    lista.appendChild(li);
  });
}

async function adicionarTarefa() {
  const input = document.getElementById('novaTarefa');
  const texto = input.value.trim();
  if (!texto) return;

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ texto })
  });

  input.value = '';
  carregarTarefas();
}

async function deletarTarefa(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  carregarTarefas();
}

carregarTarefas();
