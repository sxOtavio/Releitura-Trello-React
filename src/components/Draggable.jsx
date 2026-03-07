import React, { useState, useRef, useEffect } from 'react';

function DraggablePanel({ children }) {
  const [position, setPosition] = useState({ x: 500, y:100 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, panelX: 0, panelY: 0 });
  const panelRef = useRef(null);

  const handleMouseDown = (e) => {
    // Evita arrastar se clicar em elementos interativos (opcional)
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;

    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      panelX: position.x,
      panelY: position.y,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    setPosition({
      x: dragStartRef.current.panelX + dx,
      y: dragStartRef.current.panelY + dy,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    // Cleanup na desmontagem
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={panelRef}
      onMouseDown={handleMouseDown}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none', // evita selecionar texto enquanto arrasta
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc',
        padding: '1rem',
        borderRadius: '4px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      }}
    >
      {children}
    </div>
  );
}

export default DraggablePanel;