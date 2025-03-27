import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api.js';
import Navbar from '../../components/Navbar'; 

const RegisterScreen = () => {
  const navigate = useNavigate();

  const formInitialState = {
    username: '',
    email: '',
    password: '',
    address: ''  
  };

  const [formState, setFormState] = useState(formInitialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const response = await api.post('/api/user/register', formState);

      if (response.status === 201) {
        setSuccess('¡Registro exitoso! Por favor verifica tu correo electrónico para activar tu cuenta.');
        setFormState(formInitialState);
        setLoading(false);

        // Mostrar alert
        alert('¡Registro exitoso!\n\nPor favor revisa tu correo electrónico y haz clic en el enlace de verificación para activar tu cuenta.');

        // Redireccionar después de 3 segundos
        setTimeout(() => {
          navigate('/user/login');
        }, 3000);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || 'Error en el registro');
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
          <h2 className="text-center">Regístrate</h2>
          <p className="text-center text-muted">Crea tu cuenta para comenzar</p>

          {success && <div className="alert alert-success">{success}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Nombre de usuario</label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                value={formState.username}
                onChange={handleChange}
                required
                placeholder="Escribe tu usuario"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Dirección</label>
              <input
                type="text"
                id="address"
                name="address"
                className="form-control"
                value={formState.address}
                onChange={handleChange}
                required
                placeholder="Ingresa tu dirección"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formState.email}
                onChange={handleChange}
                required
                placeholder="tuEmail@correo.com"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={formState.password}
                onChange={handleChange}
                required
                placeholder="Ingresa tu contraseña"
              />
            </div>

            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'Registrando...' : 'Registrar'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterScreen;