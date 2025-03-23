import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/apiService';  // Servicio para manejar la autenticación
import '../styles/LoginScreen.css';  // Puedes agregar los estilos que prefieras

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Para redirigir al usuario después de un login exitoso

  // Maneja el envío del formulario de login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ email, password });

      // Si el login es exitoso, guardamos el token en el localStorage
      localStorage.setItem('token', response.data.token);

      // Redirigimos al usuario al perfil o a una página específica
      navigate('/user/profile');
    } catch (err) {
      // Si ocurre un error, mostramos el mensaje
      setError(err.response?.data?.message || 'Error al iniciar sesión. Intenta nuevamente.');
    }
  };

  return (
    <div className="login-screen">
      <header>
        <h1>Iniciar Sesión</h1>
        <p>Accede a tu cuenta para continuar</p>
      </header>

      <section>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Ingresa tu correo"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Ingresa tu contraseña"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit">Iniciar sesión</button>
        </form>

        <p className="register-link">
          ¿No tienes cuenta? <Link to="/user/register">Regístrate aquí</Link>
        </p>
      </section>

      <footer>
        <p>&copy; 2025 Tienda Online. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default LoginScreen;