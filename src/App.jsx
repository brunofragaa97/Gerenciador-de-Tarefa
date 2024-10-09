import { useState } from "react"; // Importa o hook useState do React para gerenciar estados
import AddTask from "./components/AddTask"; // Importa o componente para adicionar tarefas
import Tasks from "./components/Tasks"; // Importa o componente que renderiza a lista de tarefas
import { Recycle } from "lucide-react";

function App() {


  // Declara um estado para armazenar o histórico das tarefas (para desfazer alterações)
  const [taskHistory, setTaskHistory] = useState([]);
  
  // Declara um estado para armazenar a lista atual de tarefas
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Estudar programação",
      description: "Estudar programação para ser um desenvolvedor Full Stack.",
      isCompleted: false, // Indica se a tarefa foi concluída
    }
  ]);

  // Função para alternar o estado de conclusão de uma tarefa
  function onTaskClick(taskId) {
    // Mapeia as tarefas, alternando a propriedade isCompleted da tarefa correspondente
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted }; // Alterna o estado de conclusão
      }
      return task; // Retorna a tarefa inalterada
    });

    // Atualiza o estado das tarefas com a nova lista
    setTasks(newTasks);
  }

  // Função para deletar uma tarefa
  function onDeleteTaskClick(taskId) {
    // Adiciona o estado atual das tarefas ao histórico antes de alterá-lo
    setTaskHistory([...taskHistory, tasks]);

    // Filtra as tarefas para remover a tarefa com o ID correspondente
    const newTasks = tasks.filter((task) => task.id !== taskId);

    // Atualiza o estado das tarefas com a nova lista filtrada
    setTasks(newTasks);
  }

  // Função para desfazer a última alteração
  function undoLastChange() {
    // Verifica se há histórico de tarefas para desfazer
    if (taskHistory.length > 0) {
      const lastTasks = taskHistory[taskHistory.length - 1]; // Obtém a última versão da lista de tarefas
      setTasks(lastTasks); // Restaura as tarefas para a versão anterior
      setTaskHistory(taskHistory.slice(0, -1)); // Remove a última versão do histórico
    }
  }

  function onAddTaskSubmit (title, description)  {
      const newTask = {
        id: tasks.length +1,
        title,
        description,
        isCompleted: false,
      }
      setTasks([...tasks, newTask])

  }
  
  function contadorDeTarefasPendentes(){
   const contador = tasks.length;
   const inCompleteTasks = tasks.filter(task => task.isCompleted).length;
   return contador - inCompleteTasks;
  }
  function contadorDeTarefasConcluidas(){
    const inCompleteTasks = tasks.filter(task => task.isCompleted).length;
    if(inCompleteTasks === 1 || inCompleteTasks === 0){
    return "| "+ inCompleteTasks + " CONCLUIDA";
   }
    return "| "+ inCompleteTasks +" CONCLUIDAS";
   }

  return (
    <div className="w-screen min-h-screen bg-blue-950 flex justify-center p-8">
      <div className="w-[500px] space-y-4 ">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Gerenciador de Tarefas
        </h1>

        {/* Renderiza o componente de tarefas, passando as tarefas e as funções como props */}
        <AddTask onAddTaskSubmit={onAddTaskSubmit}/>
        <h2 className="text-2xl text-white font-bold text-center">
          TAREFAS 
        </h2>
        <div className="text-xl text-center text-red-400">
          {contadorDeTarefasPendentes()} PENDENTES | 
          <span className="text-green-500 ">  {contadorDeTarefasConcluidas()}</span>
        </div>

        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />

        {/* Condicional para mostrar o botão de desfazer apenas se houver histórico */}
        {taskHistory.length > 0 && (
          <button
            onClick={undoLastChange} // Função chamada ao clicar no botão
            className="fixed bottom-10 right-10 bg-red-500 text-white p-3 rounded-full shadow-lg text-center"
          >
          <Recycle />
            
          </button>
        )}
      </div>
    </div>
  );
}

export default App; // Exporta o componente App para ser utilizado em outros lugares
