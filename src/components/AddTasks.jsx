import { useState } from "react";
function AddTasks({onTaskSubmit}){
    const [titulo,setTitulo]=useState("");
    const [description,setDescription]=useState("");
    return(
<div className="main-content">
        <input value={titulo} type="text" className="add-tasks" placeholder="Digite o titulo da tarefa" onChange={(event)=>setTitulo(event.target.value)}/>
        <input value={description} type="text"className="add-tasks"placeholder="Digite a descrição da tarefa" onChange={(event)=>setDescription(event.target.value)}/>
        <button onClick={() =>
           
            onTaskSubmit (titulo,description)
            

            }>Adicionar</button>

</div>

    );
}
export default AddTasks;