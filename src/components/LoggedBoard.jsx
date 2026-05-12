import React, { useEffect, useRef } from "react";
import DraggablePanel from "./Draggable";
import { Trash2Icon, CirclePlus } from "lucide-react";
import { createNewColumn, deleteColumn } from "../services/boardServices";

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
    dragInitiatorRef,
  } = props;
  const touchDropHandledRef = useRef(false);

  const handleTouchDrop = (e) => {
    console.log(
      "LoggedBoard handleTouchDrop called, touchDragTaskId:",
      touchDragTaskId,
      "dragInitiator:",
      dragInitiatorRef?.current,
    );
    e.stopPropagation();

    // Validar se o drag foi realmente iniciado
    if (
      !touchDragTaskId ||
      touchDropHandledRef.current ||
      !dragInitiatorRef?.current
    ) {
      console.log(
        "Skipping: touchDragTaskId:",
        touchDragTaskId,
        "handled:",
        touchDropHandledRef.current,
        "dragInitiator:",
        dragInitiatorRef?.current,
      );
      return;
    }
    touchDropHandledRef.current = true;
    const touch = e.changedTouches?.[0] || e.touches?.[0];
    if (!touch) {
      console.log("No touch event");
      onTouchDragEnd();
      touchDropHandledRef.current = false;
      return;
    }

    console.log("Touch position:", touch.clientX, touch.clientY);
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    console.log("Element at point:", element?.className);
    const columnElement = element?.closest?.(".column");
    const columnId = columnElement?.dataset?.columnId;

    console.log(
      "Column element:",
      columnElement?.className,
      "columnId:",
      columnId,
    );
    if (columnId) {
      console.log("Moving task", touchDragTaskId, "to column", columnId);
      onDropTask(touchDragTaskId, Number(columnId));
    } else {
      console.log("No column found, checking if touch is on inbox");
      const inboxElement = element?.closest?.(".main-board");
      if (inboxElement) {
        console.log("Touch ended on inbox, moving to inbox");
        onDropTask(touchDragTaskId, null);
      }
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
