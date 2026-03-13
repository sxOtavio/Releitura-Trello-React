import { useEffect, useState } from "react";
import AddTasks from "./components/AddTasks";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Board from "./components/Board";
import DraggableTask from "./components/DraggableTask";
import GraphicContent from "./components/BeLateChart";
import MetricContent from "./components/MetricContent";
import ProductivityBarChart from "./components/ProductivityBarChart";
import "./App.css";
function App() {
  const data = [
    { day: "Seg", tasks: 2 },
    { day: "Ter", tasks: 7 },
    { day: "Qua", tasks: 3 },
    { day: "Qui", tasks: 8 },
    { day: "Sex", tasks: 5 },
  ];
  const members = [
    { name: "Otávio", total: 5 },
    { name: "Ana", total: 8 },
    { name: "Woodson", total: 3 },
  ];
  //state variavel que atualiza a tela quando é alterado, ou seja
  //quando a funcao rodar ele vai atualizar a pagina e mostrar os
  //novos valores
  // components funcionam como literalmente como funcoes misturados
  // html se nao retornar nada ele nao aparece
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || [],
  );
  const [columns, setColumns] = useState(
    JSON.parse(localStorage.getItem("columns")) || [
      { id: 1, title: "To Do", tasks: [] },
      { id: 2, title: "Doing", tasks: [] },
      { id: 3, title: "Done", tasks: [] },
    ],
  );
  const [finalDate, setFinalDate] = useState("");
  //armazenando no local storage
  useEffect(() => {
    console.log("task alterado");
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("columns", JSON.stringify(columns));
  }, [columns]);

  function moveTask(taskId, targetColumnId, sourceColumnId = null) {
    console.log("moveTask called:", { taskId, targetColumnId, sourceColumnId });
    if (sourceColumnId === null) {
      // From tasks to column
      const task = tasks.find((t) => t.id === taskId);
      if (!task) {
        console.log("Task not found in tasks:", taskId);
        return;
      }
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
      setColumns((prev) =>
        prev.map((col) =>
          col.id === targetColumnId
            ? { ...col, tasks: [...col.tasks, task] }
            : col,
        ),
      );
    } else {
      // From column to column
      setColumns((prev) => {
        const sourceCol = prev.find((col) => col.id === sourceColumnId);
        const task = sourceCol?.tasks.find((t) => t.id === taskId);
        if (!task) {
          console.log(
            "Task not found in source column:",
            taskId,
            sourceColumnId,
          );
          return prev;
        }
        return prev.map((col) => {
          if (col.id === sourceColumnId) {
            return { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) };
          }
          if (col.id === targetColumnId) {
            return { ...col, tasks: [...col.tasks, task] };
          }
          return col;
        });
      });
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

  function onTaskClick(tasksId) {
    const newTask = tasks.map((tasks) => {
      if (tasks.id == tasksId) {
        return { ...tasks, isCompleted: !tasks.isCompleted };
      }
      return tasks;
    });
    setTasks(newTask);
  }

  function deleteOnClick(tasksId) {
    const newTask = tasks.filter((tasks) => tasks.id !== tasksId);
    setTasks(newTask);
  }
  function onTaskSubmit(titulo, date, description) {
    //Validação dos campos
    if (titulo.trim() == "" || description.trim() == "") {
      return alert("Digite nos campos indicados");
    }

    //tratamento das informações
    // lembrar de criar uma aba de comentarios
    const newTask = {
      id: tasks.length + 1,
      titulo: titulo,
      description: description,
      date: date,

      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }
  function onFinalDateSubmit(date) {
    if (!date) return; // Se não há data, não faz nada
    const parsedDate = new Date(date);
    const dataBR = parsedDate.toLocaleDateString('pt-BR');
    setFinalDate(dataBR);
  }

  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="main-conteiner">
          {" "}
          {/* Classe adicionada */}
          <div className="main-board">
            {" "}
            {/* Classe adicionada para limitar largura */}
            <h1>Inbox</h1>
            <AddTasks
              onTaskSubmit={onTaskSubmit}
              onFinalDateSubmit={onFinalDateSubmit}
            />
            <DraggableTask
              tasks={tasks}
              onTaskClick={onTaskClick}
              deleteOnClick={deleteOnClick}
            />
          </div>
          <div className="main-content">
            <MetricContent finalDate={finalDate} />
            <Board
              columns={columns}
              onDropTask={moveTask}
              onDeleteTask={deleteTaskFromColumn}
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
