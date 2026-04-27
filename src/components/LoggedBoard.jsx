import DraggablePanel from "./Draggable";
import { Trash2Icon, CirclePlus } from "lucide-react";

const API_URL = "https://releitura-trello-react-api-node.onrender.com";
function Board(props) {
  const {
    columns,
    tasks,
    onDropTask,
    onDeleteTask,
    onTaskClick,
    boardId,
    refreshBoard, 
  } = props;

  // ========================
  // CRIAR COLUMN
  async function createNewColumn() {
    const title = window.prompt("Digite o nome da nova column:");
    if (!title) return;

    try {
      const response = await fetch(`${API_URL}/columns`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, board_id: boardId }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Column "${data.column.title}" criada!`);
        refreshBoard(); 
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  }

  // ========================
  // DELETAR COLUMN
  async function deleteColumn(columnId) {
    try {
      const response = await fetch(
        `${API_URL}/columns/${columnId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Column deletada!");
        refreshBoard(); 
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="board">
      <button onClick={createNewColumn}>
        <CirclePlus />
      </button>

      {columns.map((column) => {
        const columnTasks = tasks.filter(
          (task) => task.column_id == column.id
        );

        return (
          <div
            key={column.id}
            className="column"
            onDrop={(e) => {
              e.preventDefault();
              const taskId = parseInt(e.dataTransfer.getData("taskId"));
              onDropTask(taskId, column.id);
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            <h3>{column.title}</h3>

            <div className="column-tasks">
              {columnTasks.map((task) => (
                <DraggablePanel key={task.id} taskId={task.id}>
                  <div className="task-card">
                    <button
                      onClick={() => onTaskClick(task.id)}
                      className={task.isCompleted ? "completed" : ""}
                    >
                      {task.title}
                    </button>

                    <button onClick={() => onDeleteTask(task.id)}>
                      <Trash2Icon />
                    </button>
                  </div>
                </DraggablePanel>
              ))}

              {/* BOTÃO DE DELETAR COLUMN */}
              <button onClick={() => deleteColumn(column.id)}>
                <Trash2Icon />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Board;