import { useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";


function App(){
const [tasks, setTasks] = useState([{
  id: 1, 
  title: "Estudar progamação",
  description: "Estudar progamação para ser um desenvolvedor Full Stack.",
  isCompleted: false
},
{
  id: 2, 
  title: "Estudar Banco de dados",
  description: "Estudar banco de dados para ganhas skills como desenvolvedor.",
  isCompleted: false
},
{
  id: 3, 
  title: "Estudar ingles",
  description: "Estudar ingles para me comunicar com o mundo.",
  isCompleted: false
},
])

function onTaskClick (taskId) {
  const newTasks = tasks.map(task => {
    if(task.id === taskId) {
      return {...task, isCompleted: !task.isCompleted}
    }
    return task;

  });
  setTasks(newTasks);

}
function onDeleteTaskClick(taskId) {
  const newTasks = tasks.filter(task => task.id !== taskId)
  setTasks(newTasks);

}

  return (
      <div className="w-screen h-screen bg-blue-950 flex justify-center p-8">
        <div className="w-[500px]">
          <h1 className="text-3xl text-slate-100 font-bold text-center">
            Gerenciador de Tarefas
          </h1>
          <Tasks 
          tasks={tasks} 
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
          />
        
        </div>
      </div>
  );
}

export default App;