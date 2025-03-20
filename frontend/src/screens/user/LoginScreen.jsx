import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

const LoginScreen = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/auth/login", formData);
      localStorage.setItem("token", response.data.token);
      alert("Login exitoso");
      navigate("/user/successful-login");
    } catch (error) {
      setError(error.response?.data?.message || "Error en el login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
};

export default LoginScreen;