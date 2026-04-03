import { useEffect, useState } from "react";
import AddTasks from "../components/AddTasks";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Board from "../components/LoggedBoard";
import DraggableTask from "../components/DraggableTask";
import GraphicContent from "../components/BeLateChart";
import MetricContent from "../components/MetricContent";
import ProductivityBarChart from "../components/ProductivityBarChart";
import { ChevronLeft } from "lucide-react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);

  //  parte que trata os getTasks api futuramente vou adicionar uma tecnologia que monitora as alteraçoes na
  //api e pede para atualizar sozinho assim todos os users atualizarao as
  //tasks em tempo real

  useEffect(() => {
    async function fechTasks() {
      try {
        const response = await axios.get("https://releitura-trello-react-api-node.onrender.com/tasks");
        console.log("Tasks recebidas:", response); // a api deve retornar uma lista de tasks
        setTasks(response.data.rows);
        console.log(response.data.rows);
      } catch (error) {
        console.error("Erro ao buscar API:", error);
        setTasks([]); // Define como array vazio em caso de erro
      }
    }
    fechTasks();
  }, []); // RODA SÓ UMA VEZ);

  const inboxTasks = tasks.filter(
  (task) => task.column_id == null
);

  const [token, setToken] = useState();
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);
    console.log("token salvo");
  }, []);

  const data = [
    { day: "Dom", tasks: 1 },
    { day: "Seg", tasks: 3 },
    { day: "Ter", tasks: 7 },
    { day: "Qua", tasks: 3 },
    { day: "Qui", tasks: 8 },
    { day: "Sex", tasks: 2 },
    { day: "Sab", tasks: 3 },
  ];
  const members = [
    { name: "Otávio", total: 5 },
    { name: "Ana", total: 8 },
    { name: "Woodson", total: 3 },
  ];
  // Colunas do quadro kanban
  const [columns, setColumns] = useState(
    JSON.parse(localStorage.getItem("columns")) || [
      { id: 1, title: "To Do" },
      { id: 2, title: "Doing"},
      { id: 3, title: "Done" },
    ],
  );
  // buscando as colunas na api -----------------------------

  //============================================================
  const [finalDate, setFinalDate] = useState("");
  const [isBoardCollapsed, setIsBoardCollapsed] = useState(false);

 
  useEffect(() => {
    localStorage.setItem("columns", JSON.stringify(columns));
    console.log("columns salvos no localStorage:", columns);
  }, [columns]);

 //=============== mudanca de coluna // armazenando na api storage ================

async function moveTask(taskId, targetColumnId) {
  // update visual imediato
  setTasks(prev =>
    prev.map(task =>
      task.id === taskId
        ? { ...task, column_id: targetColumnId }
        : task
    )
  );

  //============ mudanca de coluna // atualiza banco===============
  try {
    await axios.put(`https://releitura-trello-react-api-node.onrender.com/tasks/${taskId}`, {
      column_id: targetColumnId,
    });
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
    await axios.delete(
      `https://releitura-trello-react-api-node.onrender.com/tasks/${taskId}`
    );
 console.log("Task deletada com sucesso do backend");
    // remove do estado local
    setTasks(prev =>
      prev.filter(task => task.id !== taskId)
    );

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

    //mandando informações para o backend----------------------------
    try {
      const response = await axios.post("https://releitura-trello-react-api-node.onrender.com/tasks", {
        newTask,
        title: newTask.title,
        description: newTask.description,
        due_date: newTask.due_date,
        column_id: newTask.column_id,
        isCompleted: newTask.isCompleted,
      });
      const taskWithId = { ...newTask, id: response.data.taskId };
      setTasks(prev => [...prev, taskWithId]);
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
              <GraphicContent data={data} />
              <ProductivityBarChart data={members} />
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default App;