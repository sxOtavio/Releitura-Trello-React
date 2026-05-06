const API_BASE_URL = "https://otaviosx.cheetah-bull.ts.net/api";

export async function registerUser(userData) {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  console.log("User data sent:", userData);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Erro ao cadastrar usuário");
  }
  return data; // pode retornar { user, token }
}

export async function loginUser(credentials) {
  const response = await fetch(`${API_BASE_URL}/login`, {
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
