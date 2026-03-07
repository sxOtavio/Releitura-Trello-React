import { useEffect, useState } from "react";
import AddTasks from "./components/AddTasks";
import Tasks from "./components/Tasks";
import  Sidebar  from "./components/SideBar";
import  NavBar  from "./components/NavBar";
import Footer  from "./components/Footer";
import Board from "./components/Board";
import "./App.css";
function App() {
  //state variavel que atualiza a tela quando é alterado, ou seja
  //quando a funcao rodar ele vai atualizar a pagina e mostrar os
  //novos valores
  // components funcionam como literalmente como funcoes misturados
  // html se nao retornar nada ele nao aparece
  const [tasks, setTasks] = useState( JSON.parse(localStorage.getItem("tasks"))||[
        

    
  ]);
  //armazenando no local storage
  useEffect(()=>{
    console.log("task alterado")
    localStorage.setItem("tasks",JSON.stringify(tasks))
  ,[tasks]})

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
  function onTaskSubmit(titulo, description) {
   //Validação dos campos
    if(titulo.trim()==('')|| description.trim()==('')){return alert("Digite nos campos indicados")}
   
    //tratamento das informações
    const newTask = {
      id: tasks.length + 1,
      titulo: titulo,
      description: description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }
  return (
  <div>
    <NavBar/>
    <div className="container">
      <Sidebar/>
      <div className="main-conteiner"> {/* Classe adicionada */}
        <div className="main-board"> {/* Classe adicionada para limitar largura */}
          <h1>Gerenciador de tarefas</h1>
          <AddTasks onTaskSubmit={onTaskSubmit} />
          <Tasks
            tasks={tasks}
            onTaskClick={onTaskClick}
            deleteOnClick={deleteOnClick}
          />
        </div>
        <div className="main-content"><Board /></div>
      </div>
    </div>
    <Footer />
  </div>
);
}
export default App;
