import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api.js";  
import Navbar from "../../components/Navbar.jsx";
import ProfileSidebar from "../../components/ProfileSidebar.jsx";
import { updateUserField, updatePassword } from '../../services/profileService.js';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({ username: "", email: "" });

  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.user);
        setFormData({ 
          username: response.data.user.username, 
          email: response.data.user.email 
        });
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

  const handleFieldUpdate = async (field, value) => {
    try {
      await updateUserField(field, value);
      
      setFormData(prev => ({ ...prev, [field]: value }));
      setSuccess(`¡${fieldToLabel(field)} actualizado correctamente!`);
      setEditingField(null);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(''), 3000);
    }
  };

  const handlePasswordUpdate = async (newPassword, confirmPassword) => {
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    try {
      await updatePassword(newPassword);
      setSuccess('¡Contraseña actualizada correctamente!');
      setEditingField(null);
      setTempValue('');
      setConfirmPassword('');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(''), 3000);
    }
  };

  const fieldToLabel = (field) => {
    const labels = {
      username: 'Nombre de usuario',
      email: 'Email',
      address: 'Dirección',
      password: 'Contraseña'
    };
    return labels[field] || field;
  };

  if (loading) return <p className="text-center mt-5">Cargando...</p>;
  if (error) return <p className="text-danger text-center mt-5">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="d-flex">
        <ProfileSidebar />

        <div className="container p-4">
          <h1 className="mb-4">Mi Perfil</h1>
          
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center mb-4">
                <img 
                  src={user.profilePicture || '/default-profile.png'} 
                  alt="Foto de perfil" 
                  className="rounded-circle me-3"
                  style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                />
                <div>
                  <h4 className="mb-0">{user.username}</h4>
                  <small className="text-muted">Miembro desde: {new Date(user.createdAt).toLocaleDateString()}</small>
                </div>
              </div>

              <div className="mb-3 border-bottom pb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">Nombre de usuario</h6>
                    <p className="mb-0">{formData.username}</p>
                  </div>
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => {
                      setTempValue(formData.username);
                      setEditingField('username');
                    }}
                  >
                    Editar
                  </button>
                </div>
                {editingField === 'username' && (
                  <div className="mt-2">
                    <input
                      type="text"
                      className="form-control"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                    />
                    <div className="mt-2">
                      <button 
                        className="btn btn-sm btn-success me-2"
                        onClick={() => handleFieldUpdate('username', tempValue)}
                      >
                        Guardar
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => setEditingField(null)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-3 border-bottom pb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">Email</h6>
                    <p className="mb-0">{formData.email}</p>
                  </div>
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => {
                      setTempValue(formData.email);
                      setEditingField('email');
                    }}
                  >
                    Editar
                  </button>
                </div>
                {editingField === 'email' && (
                  <div className="mt-2">
                    <input
                      type="email"
                      className="form-control"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                    />
                    <div className="mt-2">
                      <button 
                        className="btn btn-sm btn-success me-2"
                        onClick={() => handleFieldUpdate('email', tempValue)}
                      >
                        Guardar
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => setEditingField(null)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-3 border-bottom pb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">Dirección</h6>
                    <p className="mb-0">{user.address || 'No especificada'}</p>
                  </div>
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => {
                      setTempValue(user.address || '');
                      setEditingField('address');
                    }}
                  >
                    Editar
                  </button>
                </div>
                {editingField === 'address' && (
                  <div className="mt-2">
                    <input
                      type="text"
                      className="form-control"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      placeholder="Ingresa tu dirección"
                    />
                    <div className="mt-2">
                      <button 
                        className="btn btn-sm btn-success me-2"
                        onClick={() => handleFieldUpdate('address', tempValue)}
                      >
                        Guardar
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => setEditingField(null)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">Contraseña</h6>
                    <p className="mb-0">••••••••</p>
                  </div>
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => setEditingField('password')}
                  >
                    Cambiar
                  </button>
                </div>
                {editingField === 'password' && (
                  <div className="mt-2">
                    <input
                      type="password"
                      className="form-control mb-2"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      placeholder="Nueva contraseña"
                    />
                    <input
                      type="password"
                      className="form-control"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirmar contraseña"
                    />
                    <div className="mt-2">
                      <button 
                        className="btn btn-sm btn-success me-2"
                        onClick={() => handlePasswordUpdate(tempValue, confirmPassword)}
                      >
                        Guardar
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => setEditingField(null)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {success && <div className="alert alert-success mt-3">{success}</div>}
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;