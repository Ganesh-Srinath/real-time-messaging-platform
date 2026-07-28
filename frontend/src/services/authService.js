import api from "./api";

export async function login(identifier, password) {
  const response = await api.post("/auth/login", {
    identifier,
    password,
  });

  return response.data;
}

export async function register(username, email, password) {
  const response = await api.post("/auth/register", {
    username,
    email,
    password,
  });

  return response.data;
}

export async function logout() {
  const response = await api.post("/auth/logout");

  return response.data;
}