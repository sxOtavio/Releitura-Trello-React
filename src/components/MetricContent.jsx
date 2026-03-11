function MetricContent() {
  return (
    <>
      <div className="board">
        <div className="metricContent">
           <img className="" src="/image/warning.png" alt="Tarefas atrasadas" srcset="" />
          <h3>Tarefas atrasadas</h3>
        </div>
        <div className="metricContent">
            <img className="imgSmall" src="/image/calendar.png" alt="Tarefas agendadas" srcset="" />
          <h3>Conclusão Prevista</h3>
        </div>
        <div className="metricContent">
            <img className="imgSmall" src="/image/wifi.png" alt="Produtividade" srcset="" />
          <h3>Indice de produtividade</h3>
        </div>
      </div>
    </>
  );
}

export default MetricContent;
