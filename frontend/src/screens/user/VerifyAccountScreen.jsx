import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api.js'; 

const VerifyAccountScreen = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        console.log("🔍 Iniciando verificación con token:", token);
        
        const response = await api.get(`/api/user/verify/${token}`);
        console.log("📩 Respuesta del servidor:", response.data);

        if (response.data.ok) {
          setMessage('✅ ¡Cuenta verificada con éxito! Redirigiendo...');
          setTimeout(() => navigate('/user/login'), 3000);
        } else {
          setMessage(`⚠️ ${response.data.message}`);
        }
      } catch (error) {
        console.error("🔥 Error completo:", {
          message: error.message,
          response: error.response?.data
        });
        
        const errorMessage = error.response?.data?.message || 
                            error.message || 
                            'Error al conectar con el servidor';
        
        setMessage(`❌ ${errorMessage}`);
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