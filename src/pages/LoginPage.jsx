import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { Bold } from "lucide-react";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [userToken, setUserToken] = useState(
    JSON.parse(localStorage.getItem("userToken")) || [],
  );

  // Buscando token

  const fetchToken = async (e) => {
    e.preventDefault();

    // Chamada post com Axios

    try {
      const response = await axios.post("http://localhost:3000/login", {
        user: user,
        password: password,
      });
      console.log("Dados enviados:", response.data);
      const token = response.data.token; // Supondo que a API retorne um token
      localStorage.setUserToken("token", token);
    } catch (error) {
      console.error("Erro ao buscar API:", error);
    }
  };

  return (
    <section className="page">
      <div className="LoginContainer">
        <h1>R-Trello</h1>
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
        <button onClick={fetchToken}>Entrar</button>
        <h5>
          Pagina sem fins de uso publico <br /> Os usuarios foram adicionados
          direto no banco de dados <br />
          ## NÃO POSSUIMOS ROTA DE CADASTRO ##
          <br />
          Login:admin
          <br /> Senha:admin
        </h5>
      </div>
    </section>
  );
}
export default LoginPage;
