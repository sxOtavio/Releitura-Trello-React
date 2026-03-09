import DraggablePanel from "./Draggable";
import { Trash2Icon } from "lucide-react";

function Board({ columns, onDropTask, onDeleteTask, onTaskClick }) {
  return (
    <div className="board">
      {columns.map((column) => (
        <div
          key={column.id}
          className="column"
          onDrop={(e) => {
            e.preventDefault();
            const taskId = parseInt(e.dataTransfer.getData("taskId"));
            const sourceColumnIdStr = e.dataTransfer.getData("sourceColumnId");
            const sourceColumnId = sourceColumnIdStr ? parseInt(sourceColumnIdStr) : null;
            onDropTask(taskId, column.id, sourceColumnId);
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          <h3>{column.title}</h3>
          <div className="column-tasks" onDragOver={(e) => e.preventDefault()}>
            {column.tasks.map((task) => (
              <DraggablePanel
                key={task.id}
                taskId={task.id}
                sourceColumnId={column.id}
              >
                <div className="task-card">
                  <button
                    onClick={() => onTaskClick(task.id)}
                    className={task.isCompleted ? "completed" : ""}
                  >
                    {task.titulo}
                  </button>
                  <button onClick={() => onDeleteTask(task.id, column.id)}>
                    <Trash2Icon />
                  </button>
                </div>
              </DraggablePanel>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Board;
