import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api.js";  
import Navbar from "../../components/Navbar.jsx";
import ProfileSidebar from "../../components/ProfileSidebar.jsx";

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({ name: "", email: "" });
  const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "" });

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

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
      setPasswordData({ currentPassword: "", newPassword: "" });
    } catch (error) {
      setError(error.response?.data?.message || "Error al cambiar la contraseña");
    }
  };

  if (loading) return <p className="text-center mt-5">Cargando...</p>;
  if (error) return <p className="text-danger text-center mt-5">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="d-flex">
        <ProfileSidebar />

        {/* Contenido principal */}
        <div className="container p-4">
          <h1 className="mb-3">Perfil</h1>
          <p><strong>Registrado desde:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>

          {/* Formulario de datos del usuario */}
          <form onSubmit={handleSubmit} className="mb-4 p-3 border rounded shadow-sm bg-white">
            <h3>Datos Personales</h3>
            <div className="mb-3">
              <label className="form-label">Nombre:</label>
              <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary w-100">Actualizar Perfil</button>
          </form>

          {/* Formulario de cambio de contraseña */}
          <form onSubmit={handlePasswordSubmit} className="p-3 border rounded shadow-sm bg-white">
            <h3>Cambiar Contraseña</h3>
            <div className="mb-3">
              <label className="form-label">Contraseña Actual:</label>
              <input type="password" className="form-control" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Nueva Contraseña:</label>
              <input type="password" className="form-control" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} required />
            </div>
            <button type="submit" className="btn btn-warning w-100">Actualizar Contraseña</button>
          </form>

          {/* Mensajes de éxito o error */}
          {success && <p className="alert alert-success mt-3">{success}</p>}
          {error && <p className="alert alert-danger mt-3">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;