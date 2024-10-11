import { useEffect, useState } from "react"; // Importa os hooks useEffect e useState do React para gerenciar estados e efeitos colaterais.
import AddTask from "./components/AddTask"; // Importa o componente para adicionar novas tarefas.
import Tasks from "./components/Tasks"; // Importa o componente que renderiza a lista de tarefas existentes.
import { Recycle } from "lucide-react"; // Importa o ícone de reciclagem do pacote lucide-react.
import Rodope from "./components/Rodope"; // Importa o componente de rodapé.

function App() {
  // Declara um estado para armazenar o histórico das tarefas (usado para desfazer alterações).
  const [taskHistory, setTaskHistory] = useState([]);

  // Declara um estado para armazenar a lista atual de tarefas, buscando no localStorage ou iniciando com um array vazio.
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  // Função para alternar o estado de conclusão de uma tarefa.
  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      // Itera sobre a lista de tarefas.
      if (task.id === taskId) {
        // Se a tarefa for a que foi clicada, alterna seu estado de conclusão.
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task; // Retorna a tarefa inalterada.
    });
    setTasks(newTasks); // Atualiza o estado das tarefas com a nova lista.
  }

  // Função para deletar uma tarefa.
  function onDeleteTaskClick(taskId) {
    setTaskHistory([...taskHistory, tasks]);
    const newTasks = tasks.filter((task) => task.id !== taskId); 
    setTasks(newTasks); 
  }

  // Função para desfazer a última alteração na lista de tarefas.
  function undoLastChange() {
    if (taskHistory.length > 0) {
      const lastTasks = taskHistory[taskHistory.length - 1]; 
      setTasks(lastTasks); 
      setTaskHistory(taskHistory.slice(0, -1)); 
    }
  }

  // Função para adicionar uma nova tarefa.
  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: tasks.length + 1, 
      title, 
      description,
      isCompleted: false, 
    };
    setTasks([...tasks, newTask]); 
  }

  // Função para contar o número de tarefas pendentes.
  function contadorDeTarefasPendentes() {
    const contador = tasks.length;
    const inCompleteTasks = tasks.filter((task) => task.isCompleted).length; 
    return contador - inCompleteTasks; 
  }

  // Função para contar o número de tarefas concluídas e formatar a mensagem.
  function contadorDeTarefasConcluidas() {
    const inCompleteTasks = tasks.filter((task) => task.isCompleted).length; 
    return `| ${inCompleteTasks} ${
      inCompleteTasks === 1 ? "CONCLUIDA" : "CONCLUIDAS"
    }`; 
  }

  // useEffect para sincronizar o estado das tarefas com o localStorage sempre que a lista de tarefas mudar.
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="flex flex-col min-h-screen">
      {" "}
      {/* Contêiner flexível para ocupar toda a altura da tela */}
      <div className="font-mono bg-blue-950 flex justify-center p-1 flex-grow">
        {" "}
        {/* Contêiner para o conteúdo principal */}
        <div className="w-[40%] ">
          {" "}
          {/* Define a largura do contêiner de tarefas */}
          <h1 className="text-3xl text-slate-100 font-bold text-center p-5">
            Gerenciador de Tarefas
          </h1>
          {/* Renderiza o componente para adicionar novas tarefas */}
          <AddTask onAddTaskSubmit={onAddTaskSubmit} />
          <h2 className="text-2xl text-white font-bold text-center mt-5">
            TAREFAS
          </h2>
          <div className="text-xl text-center text-red-400 m-3">
            {contadorDeTarefasPendentes()} PENDENTES |
            <span className="text-green-500">
              {contadorDeTarefasConcluidas()}
            </span>
          </div>
          {/* Renderiza a lista de tarefas */}
          <Tasks
            tasks={tasks}
            onTaskClick={onTaskClick}
            onDeleteTaskClick={onDeleteTaskClick}
          />
          {/* Botão para desfazer a última alteração, aparece somente se houver alterações no histórico */}
          {taskHistory.length > 0 && (
            <button
              onClick={undoLastChange} // Chama a função para desfazer a última alteração
              className="fixed bottom-10 right-10 bg-red-500 text-white p-3 rounded-full shadow-lg text-center"
            >
              <Recycle /> {/* Ícone de reciclagem */}
            </button>
          )}
        </div>
      </div>
      {/* Componente de rodapé */}
      <Rodope />
    </div>
  );
}

export default App;
