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
    columns,
    inboxTasks,
    loading,
    riskChartData,
    burndownData,
    addTask,
    moveTask,
    removeTask,
    reload,
  } = useBoard();

  const [showAddTask, setShowAddTask] = useState(false);
  const [finalDate, setFinalDate] = useState("");
  const [isBoardCollapsed, setIsBoardCollapsed] = useState(false);

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

  const onFinalDateSubmit = (date) => {
    if (!date) return;
    setFinalDate(new Date(date).toLocaleDateString("pt-BR"));
    setShowAddTask(false);
  };

  const onTaskClick = (taskId) => {
    // Marcar/desmarcar completed – você pode mover essa lógica para o hook se quiser
    // Por enquanto, farei localmente (ou pode criar um método toggleTask no hook)
    // Mas como a task tem isCompleted, vamos atualizar localmente?
    // Idealmente, isso seria uma chamada à API (updateTask). Vou deixar como exemplo simples.
    // Na prática, crie um método updateTask no hook.
    console.log("Toggle complete não implementado via API ainda");
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
        onBoardCreated={reload}   // após criar board, recarrega a lista
        refreshBoard={reload}
      />

      <div className="container">
        <div className="main-conteiner">
          <div className={`main-board ${isBoardCollapsed ? "collapsed" : ""}`}>
            <button
              type="button"
              onClick={() => setIsBoardCollapsed((prev) => !prev)}
              className="collapse-button"
            >
              <ChevronLeft
                style={{
                  transform: isBoardCollapsed ? "rotate(180deg)" : "rotate(0deg)",
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
              onTaskClick={onTaskClick}
              deleteOnClick={removeTask}
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
              onTaskClick={onTaskClick}
              boardId={selectedBoardId}
              refreshBoard={reload}
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