import React, { useState } from 'react';
import './RegistroUsuario.css';

const LoginUsuario = () => {
    const [datos, setDatos] = useState({email: '', contrasenia: '' });
    const [mensaje, setMensaje] = useState('');

    const handleChange = (e) => {
        setDatos({...datos, [e.target.name]: e.target.value});
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await fetch('http://localhost:8080/usuarios/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(datos)
            });
            const resultado = await respuesta.text();
            if(respuesta.ok) {
                localStorage.setItem('usuario', JSON.stringify({email: datos.email}));
                setMensaje(`${resultado}`);
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                setMensaje(`${resultado}`);
            }
        } catch(error) {
            setMensaje("Error de red: no se pudo conectar con el servidor.");
        }
    };

    return (
        <section className="registro-container">
            <h2>Iniciar sesión</h2>
            <form className="registro-form" onSubmit={handleSubmit}>
                <input type="email" name="email" value={datos.email} onChange={handleChange} placeholder="Correo electrónico" required />
                <input type="password" name="contrasenia" value={datos.contrasenia} onChange={handleChange} placeholder="Contraseña" required />
                <button type="submit">Iniciar sesión</button>
            </form>
            {mensaje && <p className="mensaje">{mensaje} </p>}
        </section>
    );
};

export default LoginUsuario;