import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import "./LoginPage.css";
import { Bold } from "lucide-react";
function LoginPage(){
    const navigate = useNavigate();
    const [userToken, setUserToken] = useState(
        JSON.parse(localStorage.getItem("userToken")) || [],
      );
 

return <section className="page">
    
    <div className="LoginContainer">
        <h1>R-Trello</h1>
        <h3>Login</h3>
    <input type="text" name="username" id="username" placeholder="Usuário" />
    <input type="password" name="password" id="password" placeholder="Senha" />
    <button>Login</button>
    <h5>Pagina sem fins de uso publico <br/> Os usuarios foram adicionados direto no banco de dados <br/>## NÃO POSSUIMOS ROTA DE CADASTRO ##<br/>Login:admin<br/> Senha:admin</h5>
    </div>
</section>

}
export default LoginPage;