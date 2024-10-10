import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from 'lucide-react';

function TaskPage(){
    const [searchParams] = useSearchParams();
    const title = searchParams.get("title");
    const description = searchParams.get("description");
    const navigate = useNavigate();

    function backToMain(){
        navigate(`/inicio`);
    }

    return (
        <div className="break-words font-mono w-screen min-h-screen bg-blue-950 flex justify-center p-8">
            <div className="space-y-4 p-6 bg-slate-400 rounded-xl shadow flex flex-col max-w-[35%]">
                <div className="flex items-center justify-between">
                    <button 
                      onClick={() => backToMain()}
                      className="text-white flex items-center justify-center">
                      <ChevronLeftIcon className="w-8 h-8" />
                    </button>
                    <h1 className="text-3xl text-black font-bold text-center flex-1">
                        Detalhes da Tarefa
                    </h1>
                    <div className="w-8"></div> {/* Espaço vazio para balancear o layout */}
                </div>
                <div className="space-y-4 p-6 bg-slate-100 rounded-md shadow flex flex-col">
                    <strong>{title}</strong>
                    <p className="">{description}</p>
                </div>
            </div>
        </div>
    );
}

export default TaskPage;
