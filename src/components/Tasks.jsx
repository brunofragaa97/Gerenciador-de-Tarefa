import { ChevronRight } from "lucide-react";
import { Trash2 } from "lucide-react";

function Tasks(props) {
  return (
    // No componente Tasks
    <ul className="space-y-4 p-6 bg-slate-100 rounded-md shadow max-h-[400px] overflow-y-auto">
      {props.tasks.map((task) => (
        <li key={task.id} className="flex gap-2">
          <button
            onClick={() => props.onTaskClick(task.id)} // Alterna o status de conclusão
            className={`bg-slate-400 text-left w-full text-white p-2 rounded-md ${
              task.isCompleted && "line-through"
            }`}
          >
            {task.title}
          </button>

          {/* Botão de ação (ícone ChevronRight) */}
          <button className="bg-slate-400 text-white p-4 rounded-md">
            <ChevronRight />
          </button>

          {/* Botão de deletar (ícone Trash2) */}
          <button
            onClick={() => props.onDeleteTaskClick(task.id)}
            className="bg-slate-400 text-white p-4 rounded-md"
          >
            <Trash2 />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Tasks;
