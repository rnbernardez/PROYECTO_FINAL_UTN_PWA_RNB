import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Para redirigir después del registro
import api from '../api/api.js';  // Importamos la configuración de la API

const RegisterScreen = () => {
    const navigate = useNavigate();  // Usamos navigate para redirigir después de un registro exitoso

    const formInitialState = {
        username: '',
        email: '',
        password: ''
    };

    const [formState, setFormState] = useState(formInitialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    // Manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir recarga de página
        setError(null);  // Limpiar errores previos
        setSuccess(null);  // Limpiar mensaje de éxito

        setLoading(true);  // Activar loading mientras se hace la solicitud

        try {
            const response = await api.post('/user/register', formState);

            if (response.status === 201) {
                setSuccess('Registro exitoso');  // Mostrar mensaje de éxito
                setFormState(formInitialState);  // Limpiar el formulario
                setLoading(false);

                // Redirigir al usuario al login o home
                navigate('/user/login');
            }
        } catch (error) {
            setLoading(false);  // Desactivar loading

            // Manejo de errores desde la respuesta de la API
            if (error.response && error.response.data) {
                setError(error.response.data.message || 'Error en el registro');
            } else {
                setError('Error en la conexión');
            }
        }
    };

    return (
        <div>
            <h1>Regístrate en nuestra Tienda</h1>

            {/* Mostrar mensaje de éxito o error */}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        placeholder="Escribe tu usuario"
                        id="username"
                        name="username"
                        value={formState.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        placeholder="tuEmail@anymail.com"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        id="password"
                        name="password"
                        value={formState.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Registrando...' : 'Registrar'}
                </button>
            </form>
        </div>
    );
};

export default RegisterScreen;
