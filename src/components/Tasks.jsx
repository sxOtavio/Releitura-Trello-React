import { ChevronRightIcon, Trash2Icon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Tasks(props) {
  //Lembrar que toda funcao em jsx tem quando inserida no "HTML"  tem que estar em  {}
const navigate =useNavigate();
//bom habito para nao truncar parametros pois sao passados pela url
const query =new URLSearchParams();
function onSeeDetailsClick(tasks){
   query.set("titulo",tasks.titulo);
   query.set("description",tasks.description);
   navigate(`/tasks?${query.toString()}`);
}
  //aqui a gente criou uma funcao no componente pai e passa ela como prop parar o componente filho
  //para conseguir alterar a partir do filho o pai
  
  return (
    <ul className="tasks">
      {props.tasks.map((tasks) => (
        <div  className="task-card">
        <li key={tasks.id}>
          <button
            onClick={() => props.onTaskClick(tasks.id)}
            className={tasks.isCompleted ? "completed" : ""}
          >
            {tasks.titulo}
          </button>
          <button onClick={()=>onSeeDetailsClick(tasks)}>
            <ChevronRightIcon />
          </button>
          <button onClick={() => props.deleteOnClick (tasks.id)}>
            <Trash2Icon />
          </button>
        </li>
        </div>
      ))}
    </ul>
  );
}
export default Tasks;
