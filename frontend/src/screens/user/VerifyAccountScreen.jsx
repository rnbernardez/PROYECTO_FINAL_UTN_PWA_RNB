import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyAccountScreen = () => {
  const { token } = useParams(); // Token de la URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        const response = await axios.get(`/api/user/verify/${token}`);
        console.log("Respuesta de verificación:", response.data); // Para debug
        
        if (response.data.ok) {
          setMessage('¡Cuenta verificada con éxito!');
          // Redirige después de mostrar mensaje
          setTimeout(() => navigate('/user/login'), 3000);
        } else {
          setMessage(response.data.message);
        }
      } catch (error) {
        setMessage(error.response?.data?.message || 'Error al verificar');
        console.error("Error completo:", error);
      } finally {
        setLoading(false);
      }
    };

    verifyAccount();
}, [token, navigate]);

  if (loading) {
    return <div>Verificando...</div>;
  }

  return (
    <div>
      <h2>{message}</h2>
      <p>{loading ? 'Cargando...' : 'Por favor espera...'}</p>
    </div>
  );
};

export default VerifyAccountScreen;