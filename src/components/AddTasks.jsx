import { useEffect, useState } from "react";

function AddTasks({ onTaskSubmit, onFinalDateSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const [showFinalDateTask, setShowFinalDateTask] = useState(true);

  useEffect(() => {
    console.log("showFinalDateTask agora é:", showFinalDateTask);
  }, [showFinalDateTask]);
  return (
    <>
      <input
        value={title}
        type="text"
        className="add-tasks"
        placeholder="Digite o titulo da tarefa"
        onChange={(event) => setTitle(event.target.value)}
      />
      <input
        value={description}
        type="text"
        className="add-tasks"
        placeholder="Digite a descrição da tarefa"
        onChange={(event) => setDescription(event.target.value)}
      />

      {//Parte de validação para mostrar o campo de data final da sprint apenas quando a tarefa for adicionada      
       }

      <h3>Data de Conclusão da tarefa</h3>
      <input
        value={date}
        type="date"
        className="add-tasks"
        onChange={(event) => setDate(event.target.value)}
      />
      <button
        className="add-tasks"
        onClick={() => onTaskSubmit(title, date, description)}
      >
        Adicionar
      </button>
      <div className={showFinalDateTask ? "add-tasks" : "final-date disabled"}>
        <h3>Data final da sprint</h3>
        <input
          value={finalDate}
          type="date"
          className="add-tasks"
          onChange={(event) => setFinalDate(event.target.value)}
        />
        <button
          className="add-tasks"
          onClick={() => {
            onFinalDateSubmit(finalDate);
            setShowFinalDateTask(false);
            console.log(showFinalDateTask);
          }}
        >
          Adicionar
        </button>
      </div>
    </>
  );
}
export default AddTasks;
