import React from "react";

function DraggablePanel({ children, taskId, sourceColumnId }) {
  return (
    <div
      draggable
    
      onDragStart={(e) => {
        console.log("onDragStart:", { taskId, sourceColumnId });
        e.dataTransfer.setData("taskId", taskId);
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