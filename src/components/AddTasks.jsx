import { useState } from "react";
function AddTasks({ onTaskSubmit }) {
  const [titulo, setTitulo] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  return (
    <>
      <input
        value={titulo}
        type="text"
        className="add-tasks"
        placeholder="Digite o titulo da tarefa"
        onChange={(event) => setTitulo(event.target.value)}
      />
      <input
        value={description}
        type="text"
        className="add-tasks"
        placeholder="Digite a descrição da tarefa"
        onChange={(event) => setDescription(event.target.value)}
      />
      <input
        value={date}
        type="date"
        className="add-tasks"
        onChange={(event) => setDate(event.target.value)}
      />
      <button onClick={() => onTaskSubmit(titulo, date, description)}>
        Adicionar
      </button>
    
    </>
  );
}
export default AddTasks;
