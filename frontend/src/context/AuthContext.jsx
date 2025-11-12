import { createContext, useState, useEffect } from "react";
import API from "../services/api";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setLoading(false);
      return;
    }

    API.get("/api/auth/me")
      .then(res => {
        setUser(res.data);
      })
      .catch(() => {
        localStorage.removeItem("authToken");
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const { data } = await API.post("/api/auth/login", { email, password });
    localStorage.setItem("authToken", data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

import { useContext } from "react";

export function useAuth() {
  return useContext(AuthContext);
}
