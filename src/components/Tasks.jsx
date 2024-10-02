import { ChevronRight } from "lucide-react"; // Corrigi a importação
import { Trash2 } from 'lucide-react';

function Tasks(props) {
   return (
    <ul className="space-y-3">
        {props.tasks.map((task) => (
            <li key={task.id} className="flex gap-2">
                <button 
                    onClick={() => props.onTaskClick(task.id)} // Corrigi a sintaxe do onClick
                    className={`bg-slate-400 text-left w-full text-white p-2 rounded-md ${task.isCompleted && 'line-through'}`}
                >
                    {task.title}
                   
                </button>
                <button className="bg-slate-400 text-white p-4 rounded-md">
                    <ChevronRight /> {/* Corrigi o uso do ícone */}
                </button>
                <button onClick={() => props.onDeleteTaskClick(task.id)}
                className="bg-slate-400 text-white p-4 rounded-md"
                >
                     <Trash2 /> {/* Corrigi o uso do ícone */}
                </button>
                
            </li>
        ))}
    </ul>
   );
}

export default Tasks;
