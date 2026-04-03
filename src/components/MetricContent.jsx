import imgWarning from "../img/warning.png";
import imgCalendar from "../img/calendar.png";
import imgWifi from "../img/wifi.png";
function MetricContent(props) {
  const tasksFromState = props.tasks || [];
  const tasksFromColumns = (props.columns || []).flatMap(
    (col) => col.tasks || [],
  );
  const allTasks = [...tasksFromState, ...tasksFromColumns];

  function getLateTasksCount() {
    const hoje = new Date();

    return allTasks.reduce((count, task) => {
      if (!task.due_date) return count;

      const taskDate = new Date(task.due_date);
      if (task.column_id === 3) return count; // Ignora tarefas na coluna "Concluído"
      const isLate = taskDate < hoje && !task.isCompleted;
      return isLate ? count + 1 : count;
    }, 0);
  }

  const lateTasksCount = getLateTasksCount();

  return (
    <>
      <div className="board">
        <div className="metricContent">
          <img
            className=""
            src={imgWarning}
            alt="Tarefas atrasadas"
            srcset=""
          />
          <h3>Tarefas atrasadas</h3>
          <h1>{lateTasksCount}</h1>
        </div>
        <div className="metricContent">
          <img
            className="imgSmall"
            src={imgCalendar}
            alt="Tarefas agendadas"
            srcset=""
          />
          <h3>Conclusão Prevista</h3>
          <h3>{props.finalDate || "Data não definida"}</h3>
        </div>
        <div className="metricContent">
          <img
            className="imgSmall"
            src={imgWifi}
            alt="Produtividade"
            srcset=""
          />
          <h3>Indice de produtividade</h3>
        </div>
      </div>
    </>
  );
}

export default MetricContent;
