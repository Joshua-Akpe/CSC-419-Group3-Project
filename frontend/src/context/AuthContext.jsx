import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/client";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // Save user data after registration
  function saveUserAfterRegistration(userData) {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }

  // Login function
  async function login(email, password) {
    try {
      const response = await api.post("/auth/login", { email, password });
      
      const { access_token, token_type } = response.data;
      
      // Save token
      setToken(access_token);
      localStorage.setItem("token", access_token);
      
      // Fetch user data using the token
      const userResponse = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      
      setUser(userResponse.data);
      localStorage.setItem("user", JSON.stringify(userResponse.data));
      
      return { success: true, user: userResponse.data };
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  // Logout function
  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, saveUserAfterRegistration, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}