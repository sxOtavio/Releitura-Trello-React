import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import "./LoginPage.css"; // mesmo CSS do login (ou crie um específico)

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setLoading(true);
    try {
      const { name, email, password } = formData;
      const result = await registerUser({ name, email, password });
      
      // Se o backend retornar token automaticamente, já salva e redireciona
      if (result.token) {
        sessionStorage.setItem("token", result.token);
        navigate("/app");
      } else {
        // Se não retornar token, redireciona para login
        navigate("/login");
      }
    } catch (err) {
      setError(err.message || "Erro ao criar conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="LoginContainer" style={{ maxWidth: "400px" }}>
        <h1>Criar Conta</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nome completo"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirme a senha"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {error && <div className="error-message">{error}</div>}
          <button type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <Link to="/login" style={{ color: "var(--primary-dark)" }}>
            Já tem uma conta? Faça login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;