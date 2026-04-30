import { Link } from "react-router-dom";
import "./HomePage.css"; 
import { ClipboardList, Handshake, BarChart } from "lucide-react";
import logo from "/public/logo.png";
function HomePage() {
  return (
    <div className="home-container">
      <header className="hero">
        <img src={logo} alt="KamBunny Logo" className="logo" className="logo"/> 
        <p>Organize seus projetos de forma simples, rápida e colaborativa.</p>
        <div className="cta-buttons">
          <Link to="/login" className="btn btn-primary">Entrar</Link>
          <Link to="/register" className="btn btn-secondary">Criar conta</Link>
          <Link to="/local-app" className="btn btn-secondary">Acessar trial do App</Link>        </div>
      </header>

      <section className="features">
        <div className="feature-card">
          <h3><ClipboardList /> Quadros</h3>
          <p>Gerencie tarefas com quadros personalizáveis.</p>
        </div>
        <div className="feature-card">
          <h3><Handshake /> Colaboração</h3>
          <p>Convide sua equipe e trabalhem juntos.</p>
        </div>
        <div className="feature-card">
          <h3><BarChart /> Gráficos</h3>
          <p>Acompanhe métricas e burndown charts.</p>
        </div>
      </section>

      <footer className="home-footer">
        <p>© 2026 - KamBunny </p>
        <p>Otávio de Siqueira Ximenes<br />
 ximenes.otavio@gmail.com | LinkedIn | GitHub<br />
   Brasília – DF</p>
      </footer>
    </div>
  );
}

export default HomePage;