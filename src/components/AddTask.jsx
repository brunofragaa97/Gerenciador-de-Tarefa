import { DessertIcon } from "lucide-react";
import { useState } from "react"; 

function AddTask({ onAddTaskSubmit }){
  const[title, setTitle] = useState(""); 
  const[description, setDescription] = useState("");
  return (
        <div className="space-y-4 p-6 bg-slate-100 rounded-md shadow flex flex-col">
            <input  
                type="text" 
                placeholder="Digite o titulo da tarefa: "
                className="border border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
                value={title}
                onChange={(event) => setTitle(event.target.value)}> 
            </input>
            <input 
                type="text" 
                placeholder="Digite a descrição da terfa: "
                className="border border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
                value={description}
                onChange={(event) => setDescription(event.target.value)}>
            </input>
            <button 
                onClick={() => onAddTaskSubmit(title, description)}
                className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium">
                  Adcionar
            </button>
        </div>
   );
}

export default AddTask;