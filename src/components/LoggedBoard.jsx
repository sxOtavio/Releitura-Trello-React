import React, { useEffect, useRef } from "react";
import DraggablePanel from "./Draggable";
import { Trash2Icon, CirclePlus } from "lucide-react";
import { createNewColumn, deleteColumn } from "../services/boardServices";

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
    onTouchDragStart,
    onTouchDragEnd,
    touchDragTaskId,
  } = props;
  const touchDropHandledRef = useRef(false);

  const handleTouchDrop = (e) => {
    if (!touchDragTaskId || touchDropHandledRef.current) return;
    touchDropHandledRef.current = true;
    const touch = e.changedTouches?.[0] || e.touches?.[0];
    if (!touch) return;

    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    const columnElement = element?.closest?.(".column");
    const columnId = columnElement?.dataset?.columnId;

    if (columnId) {
      onDropTask(touchDragTaskId, Number(columnId));
    }
    onTouchDragEnd();
    touchDropHandledRef.current = false;
  };

  const handleTouchCancel = () => {
    touchDropHandledRef.current = false;
    onTouchDragEnd();
  };

  return (
    <div
      className="board"
      onTouchEnd={handleTouchDrop}
      onTouchCancel={handleTouchCancel}
    >
      
      <div>
          
          <button onClick={() => createNewColumn(props)}>
            <CirclePlus />
          </button>
      </div>
      

      {columns.map((column) => {
        const columnTasks = tasks.filter((task) => task.column_id == column.id);

        return (
          <div
            key={column.id}
            className="column"
            data-column-id={column.id}
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
                <DraggablePanel
                  key={task.id}
                  taskId={task.id}
                  sourceColumnId={column.id}
                  onTouchDragStart={onTouchDragStart}
                >
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
              <button onClick={() => deleteColumn(column.id, refreshBoard)}>
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
