import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistroUsuario.css';

const LoginUsuario = () => {
    const [datos, setDatos] = useState({ email: '', contrasenia: '' });
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setDatos({ ...datos, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await fetch('http://localhost:8080/usuarios/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });
            const resultado = await respuesta.json();
            if(respuesta.ok) {
                const usuario = resultado;
                const usuarioSinContrasenia = {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    email: usuario.email
                };
                localStorage.setItem('usuario', JSON.stringify(usuarioSinContrasenia));
                setMensaje("¡Hola!");
                setTimeout(() => {
                    window.dispatchEvent(new Event("usuario-actualizado"));
                    navigate('/');
                }, 500);
            } else {
                setMensaje(typeof resultado === 'string' ? resultado : 'Error al iniciar sesión.');
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