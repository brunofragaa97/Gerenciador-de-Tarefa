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
    },
    {
      id: 2,
      title: "Estudar Banco de dados",
      description: "Estudar banco de dados para ganhar habilidades.",
      isCompleted: false,
    },
    {
      id: 3,
      title: "Estudar inglês",
      description: "Estudar inglês para se comunicar globalmente.",
      isCompleted: false,
    },
  ]);

  // Função para alternar o estado de conclusão de uma tarefa
  function onTaskClick(taskId) {
    // Adiciona o estado atual das tarefas ao histórico antes de alterá-lo
    setTaskHistory([...taskHistory, tasks]);

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

  return (
    <div className="w-screen h-screen bg-blue-950 flex justify-center p-8">
      <div className="space-y-4 w-[500px]">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Gerenciador de Tarefas
        </h1>

        {/* Renderiza o componente de tarefas, passando as tarefas e as funções como props */}
        <AddTask />
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
