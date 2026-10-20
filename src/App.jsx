
import { useState } from 'react';
import './App.css';

export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [texto, setTexto] = useState('');

  function adicionarTarefa(event) {
    event.preventDefault();

    if (texto.trim() === '') return;

    setTarefas([
      ...tarefas,
      {
        id: Date.now(),
        nome: texto.trim(),
        concluida: false
      }
    ]);

    setTexto('');
  }

  function alternarTarefa(id) {
    setTarefas(tarefas.map(tarefa =>
      tarefa.id === id
        ? { ...tarefa, concluida: !tarefa.concluida }
        : tarefa
    ));
  }

  function excluirTarefa(id) {
    setTarefas(tarefas.filter(tarefa =>
      tarefa.id !== id
    ));
  }

  return (
    <main className="app">
      <h1>Minha lista de tarefas</h1>

      <form onSubmit={adicionarTarefa}>
        <input
          value={texto}
          onChange={event => setTexto(event.target.value)}
          placeholder="Digite uma tarefa"
        />
        <button type="submit">Adicionar</button>
      </form>

      {tarefas.length === 0 && (
        <p>Nenhuma tarefa cadastrada.</p>
      )}

      <ul>
        {tarefas.map(tarefa => (
          <li key={tarefa.id}>
            <label>
              <input
                type="checkbox"
                checked={tarefa.concluida}
                onChange={() => alternarTarefa(tarefa.id)}
              />
              <span className={tarefa.concluida ? 'concluida' : ''}>
                {tarefa.nome}
              </span>
            </label>

            <button
              type="button"
              onClick={() => excluirTarefa(tarefa.id)}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>

      <p>Total de tarefas: {tarefas.length}</p>
    </main>
  );
}
