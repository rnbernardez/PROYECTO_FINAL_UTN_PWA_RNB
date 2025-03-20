import React, { useState } from 'react';

const RegisterScreen = () => {
    const formInitialState = {
        username: '',
        email: '',
        password: ''
    };

    const [formState, setFormState] = useState(formInitialState);

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

        try {
            const response = await fetch('http://localhost:5000/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formState)
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Registro exitoso:', data);
                alert('Registro exitoso');
                setFormState(formInitialState); // Limpiar el formulario
            } else {
                console.error('Error en el registro:', data.message);
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error en la conexión:', error);
            alert('Error en la conexión');
        }
    };

    return (
        <div>
            <h1>Registrate en nuestra App</h1>
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
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default RegisterScreen;