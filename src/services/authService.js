const API_BASE = "https://releitura-trello-react-api-node.onrender.com";

export async function registerUser(userData) {
  const response = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Erro ao cadastrar usuário");
  }
  return data; // pode retornar { user, token }
}

export async function loginUser(credentials) {
  const response = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Erro no login");
  }
  return data; // { token, user }
}