import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api.js"; // Suponiendo que el servicio API está importado correctamente

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({ name: "", email: "" });
  const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "" });

  // Obtener datos del perfil
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.user);
        setFormData({ name: response.data.user.name, email: response.data.user.email });
      } catch (error) {
        setError(error.response?.data?.message || "Error al obtener perfil");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserProfile();
    } else {
      setError("No estás autenticado");
      setLoading(false);
    }
  }, [token]);

  // Manejar cambios en el formulario de datos generales
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Manejar cambios en el formulario de cambio de contraseña
  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  // Enviar datos actualizados
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    try {
      const response = await api.put(
        "/user/profile",
        { name: formData.name, email: formData.email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(response.data.user);
      setSuccess("Perfil actualizado correctamente");
    } catch (error) {
      setError(error.response?.data?.message || "Error al actualizar perfil");
    }
  };

  // Cambiar contraseña
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    try {
      await api.put(
        "/user/change-password",
        { currentPassword: passwordData.currentPassword, newPassword: passwordData.newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("Contraseña actualizada correctamente");
      setPasswordData({ currentPassword: "", newPassword: "" }); // Limpiar campos
    } catch (error) {
      setError(error.response?.data?.message || "Error al cambiar la contraseña");
    }
  };

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/home");
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Perfil</h1>
      <p><strong>Registrado desde:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>

      {/* Formulario de datos del usuario */}
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <button type="submit">Actualizar Perfil</button>
      </form>

      {/* Formulario de cambio de contraseña */}
      <h2>Cambiar Contraseña</h2>
      <form onSubmit={handlePasswordSubmit}>
        <label>
          Contraseña Actual:
          <input type="password" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} required />
        </label>
        <label>
          Nueva Contraseña:
          <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} required />
        </label>
        <button type="submit">Actualizar Contraseña</button>
      </form>

      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default ProfileScreen;