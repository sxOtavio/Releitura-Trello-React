import { ChevronRightIcon, Trash2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DraggablePanel from "./Draggable";

function Tasks(props) {
  const navigate = useNavigate();
  const query = new URLSearchParams();

  function onSeeDetailsClick(tasks) {
    query.set("titulo", tasks.titulo);
    query.set("description", tasks.description);
    navigate(`/tasks?${query.toString()}`);
  }

  return (
    <section className="task-card">
      {props.tasks.map((tasks) => (
        <DraggablePanel key={tasks.id} taskId={tasks.id} sourceColumnId={null}>
          <section>
            <button
              onClick={() => props.onTaskClick(tasks.id)}
              className={tasks.isCompleted ? "completed" : ""}
            >
              {tasks.titulo}
            </button>

            <button onClick={() => onSeeDetailsClick(tasks)}>
              <ChevronRightIcon />
            </button>

            <button onClick={() => props.deleteOnClick(tasks.id)}>
              <Trash2Icon />
            </button>
          </section>
        </DraggablePanel>
      ))}
    </section>
  );
}

export default Tasks;