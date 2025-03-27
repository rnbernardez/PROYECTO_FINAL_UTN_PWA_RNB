import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api.js'; // Usa tu cliente API configurado

const VerifyAccountScreen = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        console.log("Verificando cuenta con token:", token); // Debug
        
        const response = await api.get(`/api/user/verify/${token}`);
        console.log("Respuesta del servidor:", response.data); // Debug

        if (response.data.ok) {
          setMessage('¡Cuenta verificada con éxito! Redirigiendo...');
          setTimeout(() => navigate('/user/login'), 3000);
        } else {
          setMessage(response.data.message || 'Error al verificar la cuenta');
        }
      } catch (error) {
        console.error("Error completo:", error.response?.data || error);
        setMessage(error.response?.data?.message || 'Error al conectar con el servidor');
      } finally {
        setLoading(false);
      }
    };

    verifyAccount();
  }, [token, navigate]);

  return (
    <div className="container text-center mt-5">
      <h2>Verificando tu cuenta</h2>
      {loading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      ) : (
        <div className={`alert ${message.includes('éxito') ? 'alert-success' : 'alert-danger'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default VerifyAccountScreen;