import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "lucide-react";
import { useState, useEffect } from "react";

function TaskPage() {
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const isCompleted = searchParams.get("isCompleted");
  const taskId = searchParams.get("taskId"); // Captura o taskId da URL
  const navigate = useNavigate();

  const [descricao2, setDescription] = useState("");

  // Função para atualizar a tarefa no localStorage
  const handleAddDescription = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Atualizar a tarefa com a nova descrição
    const updatedTasks = tasks.map((task) => {
      if (String(task.id) === taskId) {
        // Compara taskId como string
        return { ...task, description: descricao2 }; // Atualiza a descrição
      }
      return task; // Mantém as outras tarefas inalteradas
    });

    // Salvar as tarefas atualizadas no localStorage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    // Atualiza o estado local para refletir a nova descrição
    const taskUpdated = updatedTasks.find((task) => String(task.id) === taskId);
    if (taskUpdated) {
      setDescription(taskUpdated.description); // Atualiza a descrição localmente
    }

    // Redirecionar para a mesma página para forçar a atualização
    navigate(
      `/task?title=${title}&description=${descricao2}&isCompleted=${isCompleted}&taskId=${taskId}`
    );
  };

  // Função para verificar o status da tarefa
  function verificarStatus() {
    if (isCompleted === "true") {
      return "PARABÉNS, VOCÊ JÁ CONCLUIU ESTA TAREFA :)";
    } else {
      return "EI, ESTA TAREFA AINDA ESTÁ PENDENTE :(";
    }
  }

  return (
    <div className="break-words font-mono w-screen min-h-screen bg-blue-950 flex justify-center p-8">
      <div className="space-y-4 p-6 bg-slate-400 rounded-xl shadow flex flex-col max-w-[35%]">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(`/inicio`)}
            className="text-white flex items-center justify-center"
          >
            <ChevronLeftIcon className="w-8 h-8" />
          </button>
          <h1 className="text-3xl text-black font-bold text-center flex-1">
            Detalhes da Tarefa
          </h1>
          <div className="w-8"></div>
        </div>
        <div className="space-y-3 p-1 bg-slate-100 rounded-md shadow flex flex-col">
          <strong>{title}</strong>
          <div>
            {description === "" ? (
              <div className="text-center flex flex-col rounded-md p-3 m-2 bg-slate-300">
                <input
                  type="text"
                  placeholder="Digite a descrição da tarefa:"
                  className="border border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
                  value={descricao2}
                  onChange={(event) => setDescription(event.target.value)}
                />
                <button
                  className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium"
                  onClick={handleAddDescription} // Adicionando a lógica de clique
                >
                  ADICIONAR
                </button>
              </div>
            ) : null}
          </div>

          <p>{description}</p>

          <p
            className={`rounded-md text-center ${
              isCompleted === "true" ? "bg-green-400" : "bg-red-400"
            }`}
          >
            {verificarStatus()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
