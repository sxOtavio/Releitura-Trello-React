import { useNavigate } from "react-router-dom";
function NavBar() {
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
    <div className="navbar">
      <button onClick={onHomeClick}>Home</button>
      <div className="menu-item">
        <button type="button">Quadros</button>
        <div className="tables">
          <button type="button">Quadro 1</button>
          <button type="button">Quadro 2</button>
        </div>
      </div>
                    <div className="menu-item">
      <button>Membros</button>
        <div className="tables">
          <button type="button">Membro 1</button>
          <button type="button">Membro 2</button>
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
