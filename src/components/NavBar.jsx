import { useNavigate } from "react-router-dom";
function NavBar() {

  const navigate = useNavigate();
  
  function onLoginClick() {
    navigate(`/login`);
  }
  return (
    <div className="navbar">
      <button>Home</button>
      <button>Quadros</button>
      <button>Membros</button>
      <button>Configurações</button>

      <div className="loginButton">       
      </div>
      <button
        className="loginButton"
        onClick={() => {onLoginClick();}}
      >
        Login
      </button>
    </div>
  );
}
export default NavBar;
