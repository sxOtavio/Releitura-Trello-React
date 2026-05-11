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

    console.log("handleTouchDrop:", { touchDragTaskId, touch });

    let columnElement = null;
    
    // Tenta o ponto exato
    let element = document.elementFromPoint(touch.clientX, touch.clientY);
    console.log("elementFromPoint (exato):", element);
    columnElement = element?.closest?.(".column");
    
    // Se não encontrou, tenta pontos vizinhos
    if (!columnElement) {
      const offsets = [
        { x: -20, y: 0 },
        { x: 20, y: 0 },
        { x: 0, y: -20 },
        { x: 0, y: 20 },
        { x: -20, y: -20 },
        { x: 20, y: 20 },
      ];
      
      for (let offset of offsets) {
        element = document.elementFromPoint(
          touch.clientX + offset.x,
          touch.clientY + offset.y
        );
        columnElement = element?.closest?.(".column");
        if (columnElement) {
          console.log("elementFromPoint (offset):", element, offset);
          break;
        }
      }
    }
    
    const columnId = columnElement?.dataset?.columnId;
    console.log("columnId:", columnId);

    if (columnId) {
      console.log("Movendo task", touchDragTaskId, "para coluna", columnId);
      onDropTask(touchDragTaskId, Number(columnId));
    } else {
      console.log("Nenhuma coluna encontrada");
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
