import { useNavigate } from "react-router-dom";
function NavBar(props) {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  function onLoginClick() {
    navigate(`/login`);
  }

  function onLogoutClick() {
    sessionStorage.removeItem("token");
    navigate(`/login`);
  }

  function onHomeClick() {
    navigate(`/`);
  }


  return (
    <div className="navbar" >
      <button onClick={onHomeClick}>Home </button>
      <div className="menu-item">
        <button type="button">Quadros</button>
        <div className="tables">
          <button type="button">+ Adicionar Quadro +</button>
       {window.location.pathname === "/logged" &&
  props.boardsData.map((board) => (
    <button type="button" key={board.id} onClick={() => props.onBoardClick(board.id)}>
      {board.title}
    </button>
  ))
}
        </div>
      </div>
                    <div className="menu-item">
      <button>Membros</button>
        <div className="tables">
          <button type="button">+ Adicionar membro +</button>
          <button type="button">Otávio</button>
          <button type="button">Ana</button>
          <button type="button">Woodson</button>
        </div>
      </div>
      <button>Configurações</button>

      <div className="loginButton"></div>
      <button
        className="loginButton"
        onClick={token ? onLogoutClick : onLoginClick}
        onTouchStart={token ? onLogoutClick : onLoginClick}
      >
        {token ? "Logout" : "Login"}
      </button>
    </div>
  );
}
export default NavBar;
