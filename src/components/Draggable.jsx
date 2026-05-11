import React, { useRef } from "react";

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

  const clearTouchTimeout = () => {
    if (touchTimeout.current) {
      window.clearTimeout(touchTimeout.current);
      touchTimeout.current = null;
    }
  };

  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    const { clientX, clientY } = e.touches[0];
    touchStartPos.current = { x: clientX, y: clientY };

    touchTimeout.current = window.setTimeout(() => {
      isTouchDragging.current = true;
      suppressClick.current = true;
      if (onTouchDragStart) onTouchDragStart(taskId, sourceColumnId);
    }, 250);
  };

  const handleTouchMove = (e) => {
    if (!touchTimeout.current && !isTouchDragging.current) return;
    const { clientX, clientY } = e.touches[0];
    const dx = Math.abs(clientX - touchStartPos.current.x);
    const dy = Math.abs(clientY - touchStartPos.current.y);

    if (!isTouchDragging.current && dx + dy > 10) {
      clearTouchTimeout();
      isTouchDragging.current = true;
      suppressClick.current = true;
      if (onTouchDragStart) onTouchDragStart(taskId, sourceColumnId);
    }
  };

  const handleTouchEnd = () => {
    clearTouchTimeout();
    isTouchDragging.current = false;
  };

  const handleClickCapture = (e) => {
    if (suppressClick.current) {
      e.stopPropagation();
      e.preventDefault();
      suppressClick.current = false;
    }
  };

  return (
    <div
      draggable
      onDragStart={(e) => {
        console.log("onDragStart:", { taskId, sourceColumnId });
        e.dataTransfer.setData("taskId", taskId);
        e.dataTransfer.setData("sourceColumnId", sourceColumnId || "");
      }}
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
