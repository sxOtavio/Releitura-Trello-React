import DraggablePanel from "./Draggable";
import { Trash2Icon } from "lucide-react";

function Board({
  columns,
  tasks,
  onDropTask,
  onDeleteTask,
  onTaskClick,
}) {
  return (
    <div className="board">
      {columns.map((column) => {
        //  tasks pertencentes à coluna
        const columnTasks = tasks.filter(
          (task) => task.column_id == column.id
        );

        return (
          <div
            key={column.id}
            className="column"
            onDrop={(e) => {
              e.preventDefault();

              const taskId = parseInt(
                e.dataTransfer.getData("taskId")
              );

              console.log("Drop:", {
                taskId,
                targetColumnId: column.id,
              });

              // agora NÃO existe mais sourceColumnId
              
              onDropTask(taskId, column.id);
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            <h3>{column.title}</h3>

            <div
              className="column-tasks"
              onDragOver={(e) => e.preventDefault()}
            >
              {columnTasks.map((task) => (
                <DraggablePanel
                  key={task.id}
                  taskId={task.id}
                >
                  <div className="task-card">
                    <button
                      onClick={() => onTaskClick(task.id)}
                      onTouchStart={() => onTaskClick(task.id)}
                      className={
                        task.isCompleted ? "completed" : ""
                      }
                    >
                      {task.title}
                    </button>

                    <button
                      onClick={() =>
                        onDeleteTask(task.id)
                      }
                      onTouchStart={() =>
                        onDeleteTask(task.id)
                      }
                    >
                      <Trash2Icon />
                    </button>
                  </div>
                </DraggablePanel>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Board;