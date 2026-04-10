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
      <button>Quadros</button>
      <button>Membros</button>
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
