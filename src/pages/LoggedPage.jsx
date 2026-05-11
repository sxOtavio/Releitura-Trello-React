import { useEffect, useMemo, useState } from "react";
import AddTasks from "../components/AddTasks";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Board from "../components/LoggedBoard";
import DraggableTask from "../components/DraggableTask";
import GraphicContent from "../components/BeLateChart";
import MetricContent from "../components/MetricContent";
import BurndownChart from "../components/ProductivityBarChart";
import { ChevronLeft } from "lucide-react";

// =============== Services ======================
import {fetchTasks,  createTask,  updateTaskColumn,  deleteTask,  loadColumnsFromStorage,
    saveColumnsToStorage,  loadColumnsFromApi,} from "../services/taskServices";
import { getRiskChartData, getBurndownData } from "../services/chartServices";


function LoggedPage() {

  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [columns, setColumns] = useState(loadColumnsFromStorage(true));

  //  FUNÇÃO DE REFRESH 
  async function loadBoardData() {
    if (!selectedBoardId) return;

    try {
      const rows = await fetchTasks(selectedBoardId);
      const columnsFromApi = await loadColumnsFromApi(selectedBoardId);

      setTasks(rows);
      setColumns(columnsFromApi);
      saveColumnsToStorage(columnsFromApi, true);

    } catch (error) {
      console.error("Erro ao atualizar board:", error);
    }
  }

  const [boardsData, setBoardsData] = useState([]);

  const getUserIdFromToken = () => {
    const token = sessionStorage.getItem("token");
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id;
    } catch {
      return null;
    }
  };

  const fetchBoards = async () => {
    try {
      const userId = getUserIdFromToken();
      const url = userId
        ? `https://releitura-trello-react-api-node.onrender.com/boards?userId=${userId}`
        : "https://releitura-trello-react-api-node.onrender.com/boards";

      const response = await fetch(url);
      const boardsdata = await response.json();

      setBoardsData(boardsdata.rows);

      if (boardsdata.rows && boardsdata.rows.length > 0) {
        setSelectedBoardId(boardsdata.rows[0].id);
      }
    } catch (error) {
      console.error("Erro ao buscar boards:", error);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  function onBoardClick(boardId) {
    setSelectedBoardId(boardId);
  }

  //  useEffect responsável por atualizar dados
  useEffect(() => {
    loadBoardData();
  }, [selectedBoardId]);

  const inboxTasks = tasks.filter((task) => task.column_id == null);

  const [token, setToken] = useState();
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    const savedToken = sessionStorage.getItem("token");
    setToken(savedToken);
  }, []);

  // ❌ REMOVIDO useEffect duplicado de colunas (ESSA ERA A TRETA)

  const filteredColumns = selectedBoardId
    ? columns.filter((col) => col.board_id === selectedBoardId)
    : columns;

  const boardTaskIds = new Set(
    filteredColumns.flatMap((col) =>
      tasks.filter((t) => t.column_id === col.id).map((t) => t.id),
    ),
  );

  const boardTasks = selectedBoardId
    ? tasks.filter(
        (task) => boardTaskIds.has(task.id) || task.column_id === null,
      )
    : tasks;

  const boardInboxTasks = boardTasks.filter((task) => task.column_id == null);

  const riskChartData = useMemo(
    () => getRiskChartData(boardTasks),
    [boardTasks],
  );

  const burndownData = useMemo(
    () => getBurndownData(boardTasks),
    [boardTasks],
  );

  const [finalDate, setFinalDate] = useState("");
  const [isBoardCollapsed, setIsBoardCollapsed] = useState(false);

  useEffect(() => {
    saveColumnsToStorage(columns, true);
  }, [columns]);

  async function moveTask(taskId, targetColumnId) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, column_id: targetColumnId } : task,
      ),
    );

    try {
      await updateTaskColumn(taskId, targetColumnId);
    } catch (err) {
      console.error("Erro ao mover task", err);
    }
  }

  function onTaskClick(tasksId) {
    const newTask = tasks.map((tasks) => {
      if (tasks.id == tasksId) {
        return { ...tasks, isCompleted: !tasks.isCompleted };
      }
      return tasks;
    });
    setTasks(newTask);
  }

  async function deleteOnClick(taskId) {
    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (err) {
      console.error("Erro ao deletar task", err);
    }
  }

  async function onTaskSubmit(title, date, description, columnId) {
    if (title.trim() == "" || description.trim() == "") {
      return alert("Digite nos campos indicados");
    }

    const newTask = {
      title,
      description,
      due_date: date,
      column_id: columnId,
      isCompleted: false,
    };

    try {
      const taskWithId = await createTask(newTask);
      setTasks((prev) => [...prev, taskWithId]);
    } catch (error) {
      console.error(error);
    }
  }

  function onFinalDateSubmit(date) {
    if (!date) return;

    
    const parsedDate = new Date(date);
    setFinalDate(parsedDate.toLocaleDateString("pt-BR"));
    setShowAddTask(false);
  }

  return (
    <div>
      <NavBar
        boardsData={boardsData}
        onBoardClick={onBoardClick}
        selectedBoardId={selectedBoardId}
        onBoardCreated={fetchBoards}
        refreshBoard={loadBoardData} 
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
              tasks={boardInboxTasks}
              onTaskClick={onTaskClick}
              deleteOnClick={deleteOnClick}
            />
          </div>

          <div className="main-content">
            <MetricContent
              finalDate={finalDate}
              tasks={boardTasks}
              columns={filteredColumns}
            />

            <Board
              columns={filteredColumns}
              tasks={boardTasks}
              onDropTask={moveTask}
              onDeleteTask={deleteOnClick}
              onTaskClick={onTaskClick}
              boardId={selectedBoardId}
              refreshBoard={loadBoardData} 
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
