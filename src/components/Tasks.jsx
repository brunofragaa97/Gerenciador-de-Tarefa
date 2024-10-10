import { ChevronRight } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Check } from 'lucide-react';
import { useNavigate } from "react-router-dom";

function Tasks({ tasks, onTaskClick, onDeleteTaskClick }) {
  const navigate = useNavigate() 

  function onSeeDetailsClick(task){
    const query = new URLSearchParams();
    query.set("title" , task.title);
    query.set("description" , task.description);
    navigate (`/task?${query.toString()}`);
  
  }

  return (
    <ul className="space-y-4 p-6 bg-slate-100 rounded-md shadow max-h-[400px] overflow-y-auto">
      {tasks.map((task) => ( // Usa 'tasks' diretamente
        <li key={task.id} className="flex gap-2">
          <button
            onClick={() => onTaskClick(task.id)} // Usa 'onTaskClick' diretamente
            className={`text-left w-full text-white p-2 rounded-md ${
              task.isCompleted ? "line-through bg-green-400" : "bg-red-400"
            }`}
          >
            {task.title}
          </button>

          {/* Botão de ação (ícone ChevronRight) */}
          <button 
            onClick={() => onSeeDetailsClick(task)} 
            className="bg-slate-500 text-white p-4 rounded-md">
            <ChevronRight />
          </button>

          {/* Botão de deletar (ícone Trash2) */}
          <button
            onClick={() => onDeleteTaskClick(task.id)} // Usa 'onDeleteTaskClick' diretamente
            className="bg-slate-500 text-white p-4 rounded-md"
          >
            <Trash2 />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Tasks;
