import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { Bold } from "lucide-react";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const fetchToken = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://releitura-trello-react-api-node.onrender.com/login",
        {
          user,
          password,
        },
      );
      console.log("Dados enviados:", response.data);
      const token = response.data.token; // Supondo que a API retorne um token
      sessionStorage.setItem("token", token);
      navigate("/logged");
    } catch (error) {
      console.error("Erro ao buscar API:", error);
    }
  };

  return (
    <section className="page">
      <div className="LoginContainer">
        <h1>KanBunny</h1>
        <h3>Login</h3>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Usuário"
          value={user}
          onChange={(event) => setUser(event.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Senha"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button onClick={fetchToken} onTouchStart={fetchToken}>
          Entrar
        </button>
        <p>Não tem uma conta? <a href="/register">Registrar</a></p>
        <p>Esqueceu a senha? <a href="/reset-password">Redefinir senha</a></p>
        <p>Acessar <a href="/local-app">trial do App</a></p>
      </div>
    </section>
  );
}
export default LoginPage;
