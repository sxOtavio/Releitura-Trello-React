import { useState } from "react";
import AddTasks from "../components/AddTasks";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Board from "../components/LoggedBoard";
import DraggableTask from "../components/DraggableTask";
import GraphicContent from "../components/BeLateChart";
import MetricContent from "../components/MetricContent";
import BurndownChart from "../components/ProductivityBarChart";
import { ChevronLeft } from "lucide-react";
import { useBoard } from "../hooks/useBoard";

function LoggedPage() {
  const {
    boards,
    selectedBoardId,
    setSelectedBoardId,
    tasks,
    toggleTask,
    columns,
    inboxTasks,
    loading,
    riskChartData,
    burndownData,
    finalDate,
    onFinalDateSubmit,
    addTask,
    moveTask,
    removeTask,
    reload,
  } = useBoard();

  const [touchDragTaskId, setTouchDragTaskId] = useState(null);
  const [isBoardCollapsed, setIsBoardCollapsed] = useState(false);

  const handleTouchDragStart = (taskId) => {
    setTouchDragTaskId(taskId);
  };

  const handleTouchDragEnd = () => {
    setTouchDragTaskId(null);
  };

  const handleInboxDrop = (e) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData("taskId"));
    if (taskId) {
      moveTask(taskId, null); // null para mover para inbox
    }
  };

  const handleInboxTouchDrop = () => {
    if (touchDragTaskId) {
      moveTask(touchDragTaskId, null); // null para mover para inbox
      handleTouchDragEnd();
    }
  };

  // Callbacks específicos do componente (que dependem de UI)
  const onTaskSubmit = async (title, date, description, columnId) => {
    if (!title.trim() || !description.trim()) {
      alert("Digite nos campos indicados");
      return;
    }
    const newTask = {
      title,
      description,
      due_date: date,
      column_id: columnId,
      isCompleted: false,
    };
    await addTask(newTask);
  };

  if (loading && !boards.length) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <NavBar
        boardsData={boards}
        onBoardClick={setSelectedBoardId}
        selectedBoardId={selectedBoardId}
        onBoardCreated={reload} // após criar board, recarrega a lista
        refreshBoard={reload}
      />

      <div className="container">
        <div className="main-conteiner">
          <div
            className={`main-board ${isBoardCollapsed ? "collapsed" : ""}`}
            onDrop={handleInboxDrop}
            onDragOver={(e) => e.preventDefault()}
            onTouchMove={(e) => {
              if (e.cancelable) e.preventDefault();
            }}
            onTouchEnd={handleInboxTouchDrop}
            style={{ touchAction: "none" }}
          >
            <button
              type="button"
              onClick={() => setIsBoardCollapsed((prev) => !prev)}
              className="collapse-button"
            >
              <ChevronLeft
                style={{
                  transform: isBoardCollapsed
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                }}
              />
            </button>
            <h1>Inbox</h1>
            <AddTasks
              onTaskSubmit={onTaskSubmit}
              onFinalDateSubmit={onFinalDateSubmit}
            />
            <DraggableTask
              tasks={inboxTasks}
              onTaskClick={toggleTask}
              deleteOnClick={removeTask}
              onTouchDragStart={handleTouchDragStart}
            />
          </div>

          <div className="main-content">
            <MetricContent
              finalDate={finalDate}
              tasks={tasks}
              columns={columns}
            />
            <Board
              columns={columns}
              tasks={tasks}
              onDropTask={moveTask}
              onDeleteTask={removeTask}
              onTaskClick={toggleTask}
              boardId={selectedBoardId}
              refreshBoard={reload}
              onTouchDragStart={handleTouchDragStart}
              onTouchDragEnd={handleTouchDragEnd}
              touchDragTaskId={touchDragTaskId}
            />
            <section className="board">
              <GraphicContent data={riskChartData} />
              <BurndownChart data={burndownData} />
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LoggedPage;
