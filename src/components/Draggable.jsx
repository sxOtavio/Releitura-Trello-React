import React, { useRef, useCallback } from "react";

function DraggablePanel({
  children,
  taskId,
  sourceColumnId,
  onTouchDragStart,
}) {
  const touchTimeout = useRef(null);
  const touchStartPos = useRef({ x: 0, y: 0 });
  const isTouchDragging = useRef(false);
  const suppressClick = useRef(false);

  const clearTouchTimeout = useCallback(() => {
    if (touchTimeout.current) {
      window.clearTimeout(touchTimeout.current);
      touchTimeout.current = null;
    }
  }, []);

  const handleTouchStart = useCallback(
    (e) => {
      console.log("Touch start detected for taskId:", taskId);
      if (e.touches.length !== 1) return;
      const { clientX, clientY } = e.touches[0];
      touchStartPos.current = { x: clientX, y: clientY };

      touchTimeout.current = window.setTimeout(() => {
        isTouchDragging.current = true;
        suppressClick.current = true;
        console.log(
          "onTouchDragStart being called with taskId:",
          taskId,
          "sourceColumnId:",
          sourceColumnId,
        );
        if (onTouchDragStart) onTouchDragStart(taskId, sourceColumnId);
      }, 220);
    },
    [taskId, sourceColumnId, onTouchDragStart],
  );

  const handleTouchMove = useCallback(
    (e) => {
      console.log("Touch move detected for taskId:", taskId);
      if (!touchTimeout.current) return;
      const { clientX, clientY } = e.touches[0];
      const dx = Math.abs(clientX - touchStartPos.current.x);
      const dy = Math.abs(clientY - touchStartPos.current.y);

      if (dx + dy > 10) {
        clearTouchTimeout();
      }
    },
    [clearTouchTimeout],
  );

  const handleTouchEnd = useCallback(() => {
    console.log("Touch end detected for taskId:", taskId);
    clearTouchTimeout();
    isTouchDragging.current = false;
  }, [clearTouchTimeout]);

  const handleClickCapture = useCallback((e) => {
    console.log("Click capture detected for taskId:", taskId);
    if (suppressClick.current) {
      e.stopPropagation();
      e.preventDefault();
      suppressClick.current = false;
    }
  }, []);

  const handleDragStart = useCallback(
    (e) => {
      // Bloqueia drag desktop durante touch
      if (isTouchDragging.current) {
        e.preventDefault();
        return;
      }
      console.log("Drag start detected for taskId:", taskId);
      e.dataTransfer.setData("taskId", taskId);
      e.dataTransfer.setData("sourceColumnId", sourceColumnId || "");
      console.log(
        "DataTransfer set for taskId:",
        taskId,
        "sourceColumnId:",
        sourceColumnId,
      );
    },
    [taskId, sourceColumnId],
  );

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onClickCapture={handleClickCapture}
      style={{
        cursor: "grab",
        userSelect: "none",
        touchAction: "none",
      }}
    >
      {children}
    </div>
  );
}

export default DraggablePanel;
