import { useEffect, useState } from "react";
import AddTasks from "./components/AddTasks";
import Tasks from "./components/Tasks";
import Sidebar from "./components/SideBar";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Board from "./components/Board";
import DraggablePanel from "./components/Draggable";
import DraggableTask from "./components/DraggableTask";

import "./App.css";
function App() {
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
  <> </>;
  //armazenando no local storage
  useEffect(() => {
    console.log("task alterado");
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("columns", JSON.stringify(columns));
  }, [columns]);

  function moveTask(taskId, targetColumnId, sourceColumnId = null) {
    if (sourceColumnId === null) {
      // From tasks to column
      const task = tasks.find((t) => t.id === taskId);
      if (!task) return;
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
      setColumns((prev) =>
        prev.map((col) =>
          col.id === targetColumnId
            ? { ...col, tasks: [...col.tasks, task] }
            : col
        )
      );
    } else {
      // From column to column
      setColumns((prev) => {
        const sourceCol = prev.find((col) => col.id === sourceColumnId);
        const task = sourceCol?.tasks.find((t) => t.id === taskId);
        if (!task) return prev;
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
        col.id === columnId ? { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) } : col
      )
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
  return (
    <div>
      <NavBar />
      <div className="container">
        <Sidebar />
        <div className="main-conteiner">
          {" "}
          {/* Classe adicionada */}
          <div className="main-board">
            {" "}
            {/* Classe adicionada para limitar largura */}
            <h1>Inbox</h1>
            <AddTasks onTaskSubmit={onTaskSubmit} />
        
            <DraggableTask
              tasks={tasks}
              onTaskClick={onTaskClick}
              deleteOnClick={deleteOnClick}
            />
          </div>
          <div className="main-content">
            <Board columns={columns} onDropTask={moveTask} onDeleteTask={deleteTaskFromColumn} onTaskClick={onTaskClick} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default App;
