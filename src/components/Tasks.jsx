import { ChevronRightIcon, Trash2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Tasks(props) {
  const navigate = useNavigate();
  const query = new URLSearchParams();

  function onSeeDetailsClick(task) {
    query.set("title", task.title);
    query.set("description", task.description);
    navigate(`/tasks?${query.toString()}`);
  }

  return (
    <section className="tasks">
      {props.tasks.map((task) => (
        <div key={task.id} className="task-card">

          <button
            onClick={() => props.onTaskClick(task.id)}
            className={task.isCompleted ? "completed" : ""}
          >
            {task.title}
          </button>

          <button onClick={() => onSeeDetailsClick(task)}>
            <ChevronRightIcon />
          </button>

          <button onClick={() => props.deleteOnClick(task.id)}>
            <Trash2Icon />
          </button>

        </div>
      ))}
    </section>
  );
}

export default Tasks;