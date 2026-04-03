import React from "react";

function DraggablePanel({ children, taskId, sourceColumnId }) {
  return (
    <div
      draggable
    
      onDragStart={(e) => {
        console.log("onDragStart:", { taskId, sourceColumnId });
        e.dataTransfer.setData("taskId", taskId);
        e.dataTransfer.setData("sourceColumnId", sourceColumnId || "");
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