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
        setMessage(response.data.message);
        setLoading(false);
        setTimeout(() => {
          navigate('/user/login'); // Redirige al login después de 3 segundos
        }, 3000);
      } catch (error) {
        setMessage(error.response ? error.response.data.message : 'Error al verificar');
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