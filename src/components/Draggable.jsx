import React, { useState, useRef, useEffect } from "react";

function DraggablePanel({ children, taskId, sourceColumnId }) {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("taskId", taskId);
        if (sourceColumnId !== null && sourceColumnId !== undefined) {
          e.dataTransfer.setData("sourceColumnId", sourceColumnId);
        }
      }}
      style={{
        cursor: "grab",
        userSelect: "none",
      }}
    >
      {children}
    </div>
  );
}

export default DraggablePanel;