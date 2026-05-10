import { ChevronRightIcon, Trash2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DraggablePanel from "./Draggable";

function draggableTasks({ tasks, onTaskClick, deleteOnClick, onTouchDragStart }) {
  const navigate = useNavigate();
  const query = new URLSearchParams();

  function onSeeDetailsClick(tasks) {
    query.set("title", tasks.title);
    query.set("description", tasks.description);
    navigate(`/tasks?${query.toString()}`);
  }

  return (
    <section className="task-card">
      {tasks.map((task) => (
        <DraggablePanel
          key={task.id}
          taskId={task.id}
          sourceColumnId={task.column_id}
          onTouchDragStart={onTouchDragStart}
        >
          <section>
            <button
              onClick={() => onTaskClick(task.id)}
              className={task.isCompleted ? "completed" : ""}
            >
              {task.title}
            </button>

            <button onClick={() => onSeeDetailsClick(task)}>
              <ChevronRightIcon />
            </button>

            <button onClick={() => deleteOnClick(task.id)}>
              <Trash2Icon />
            </button>
          </section>
        </DraggablePanel>
      ))}
    </section>
  );
}

export default draggableTasks;