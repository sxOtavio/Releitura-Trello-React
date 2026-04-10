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
import {
  fetchTasks,
  createTask,
  updateTaskColumn,
  deleteTask,
  loadColumnsFromStorage,
  saveColumnsToStorage,
} from "../services/taskServices";
import { getRiskChartData, getBurndownData } from "../services/chartServices";

function LoggedPage() {
  const [tasks, setTasks] = useState([]);

  //  parte que trata os getTasks api futuramente vou adicionar uma tecnologia que monitora as alteraçoes na
  //api e pede para atualizar sozinho assim todos os users atualizarao as
  //tasks em tempo real

  useEffect(() => {
    async function loadData() {
      try {
        const rows = await fetchTasks();
        setTasks(rows);
      } catch (error) {
        console.error("Erro ao buscar API:", error);
        setTasks([]);
      }
    }
    loadData();
  }, []); // RODA SÓ UMA VEZ);

  const inboxTasks = tasks.filter((task) => task.column_id == null);

  const [token, setToken] = useState();
  const [showAddTask, setShowAddTask] = useState(false);
  useEffect(() => {
    const savedToken = sessionStorage.getItem("token");
    setToken(savedToken);
    console.log("token salvo");
  }, []);

  const riskChartData = useMemo(() => getRiskChartData(tasks), [tasks]);
  const burndownData = useMemo(() => getBurndownData(tasks), [tasks]);

  // Colunas do quadro kanban
  const [columns, setColumns] = useState(loadColumnsFromStorage());
  // buscando as colunas na api -----------------------------

  //============================================================
  const [finalDate, setFinalDate] = useState("");
  const [isBoardCollapsed, setIsBoardCollapsed] = useState(false);

  useEffect(() => {
    saveColumnsToStorage(columns);
    console.log("columns salvos no localStorage:", columns);
  }, [columns]);

  //=============== mudanca de coluna // armazenando na api storage ================

  async function moveTask(taskId, targetColumnId) {
    // update visual imediato
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, column_id: targetColumnId } : task,
      ),
    );

    //============ mudanca de coluna // atualiza banco===============
    try {
      await updateTaskColumn(taskId, targetColumnId);
    } catch (err) {
      console.error("Erro ao mover task", err);
    }
  }
  function deleteTaskFromColumn(taskId, columnId) {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) }
          : col,
      ),
    );
  }

  // Marcar tarefa como concluída ou não concluída----------------------------

  function onTaskClick(tasksId) {
    const newTask = tasks.map((tasks) => {
      if (tasks.id == tasksId) {
        return { ...tasks, isCompleted: !tasks.isCompleted };
      }
      return tasks;
    });
    setTasks(newTask);
  }

  // ============== Deletar tarefa =========================

  async function deleteOnClick(taskId) {
    console.log("Id da task deletada", taskId);
    try {
      await deleteTask(taskId);
      console.log("Task deletada com sucesso do backend");
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (err) {
      console.error("Erro ao deletar task", err);
    }
  }

  //Criando a nova tarefa ----------------------------
  async function onTaskSubmit(title, date, description, columnId) {
    //Validação dos campos

    if (title.trim() == "" || description.trim() == "") {
      return alert("Digite nos campos indicados");
    }

    //tratamento das informações

    // lembrar de criar uma aba de comentarios

    const newTask = {
      title: title,
      description: description,
      due_date: date,
      column_id: columnId, //parte que define de qual coluna a tarefa pertence e null ela é uma task card ainda
      isCompleted: false,
    };

    console.log("enviando para backend", newTask);

    try {
      const taskWithId = await createTask(newTask);
      setTasks((prev) => [...prev, taskWithId]);
    } catch (error) {
      alert("Falha ao enviar tarefa. Verifique o log");
      console.error("Erro ao buscar API:", error);
    }
  }

  function onFinalDateSubmit(date) {
    if (!date) return; // Se não há data, não faz nada
    const parsedDate = new Date(date);

    const dataBR = parsedDate.toLocaleDateString("pt-BR");
    setFinalDate(dataBR);
    setShowAddTask(false); // Esconde o formulário após a submissão
  }

  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="main-conteiner">
          {" "}
          {/* Classe adicionada */}
          <div className={`main-board ${isBoardCollapsed ? "collapsed" : ""}`}>
            {" "}
            {/* Classe adicionada para limitar largura */}
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
              onTaskClick={onTaskClick}
              deleteOnClick={deleteOnClick}
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
              onDeleteTask={deleteOnClick}
              onTaskClick={onTaskClick}
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
