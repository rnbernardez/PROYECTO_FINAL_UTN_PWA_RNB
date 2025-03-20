import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginScreen = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/user/login", credentials);
      
      localStorage.setItem("token", data.token); // Guardamos el token en el navegador

      navigate("/user/profile"); // Redirigimos al perfil
    } catch (error) {
      console.error("Error en el login", error);
    }
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <input type="email" placeholder="Email" onChange={e => setCredentials({ ...credentials, email: e.target.value })} />
      <input type="password" placeholder="Contraseña" onChange={e => setCredentials({ ...credentials, password: e.target.value })} />
      <button onClick={handleLogin}>Ingresar</button>
    </div>
  );
};

export default LoginScreen;