import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function TaskPage(){
    
    const [searchParams] = useSearchParams()
    const title = searchParams.get("title");
    const description = searchParams.get("description");
    
    const navigate = useNavigate() 
    function backToMain(){
        navigate(`/inicio`);
    }

    return (
        <div className="w-screen min-h-screen bg-blue-950 flex justify-center p-8">
            <div className="space-y-4 p-6 bg-slate-400 rounded-md shadow flex flex-col">
                <h1 className="text-3xl text-slate-100 font-bold text-center">
                  TAREFA
                </h1>
                <div className="space-y-4 p-6 bg-slate-100 rounded-md shadow flex flex-col">
                    {title}
                </div>
                <h2 className="text-3xl text-slate-100 font-bold text-center">
                    Descrição da tarefa
                </h2>
                <div className="space-y-4 p-6 bg-slate-100 rounded-md shadow flex flex-col">
                    {description}
                </div>
                <button 
                    onClick={() => backToMain()}
                    className="text-center bg-slate-500 text-white px-4 py-2 rounded-md font-medium">
                    voltar
                </button>
            </div>
        </div>
    )
}

export default TaskPage;