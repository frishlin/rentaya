import React, {useState} from "react";
import './RegistroUsuario.css'

const RegistroUsuario = () => {
    const[usuario, setUsuario] = useState({
        nombre: '',
        email: '',
        contrasenia: ''
    });

    const[mensaje, setMensaje] = useState('');
    const handleChange = (e) => {
        setUsuario({...usuario, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const respuesta = await fetch('http://localhost:8080/usuarios', {                              
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(usuario)
            });

            const data = await respuesta.text();

            if(respuesta.ok) {
                setMensaje('El usuario ha sido registrado exitosamente.');
                setUsuario({nombre: '', email: '', contrasenia: ''});
            } else {
                setMensaje(`Error: ${data}`);
            }
        } catch(error) {
            setMensaje('Error de red: No se pudo conectar con el servidor');
        }
    };

    return(
        <section className="registro-container">
            <h2>Registro de Usuario</h2>
            <form className="registro-form" onSubmit={handleSubmit}>
                <input type="text" name="nombre" value={usuario.nombre} onChange={handleChange} placeholder="Nombre completo" required />
                <input type="email" name="email" value={usuario.email} onChange={handleChange} placeholder="Correo electrónico" required />
                <input type="password" name="contrasenia" value={usuario.contrasenia} onChange={handleChange} placeholder="Contraseña" required />
                <button type="submit">Registrar</button>
            </form>
            {mensaje && <p className="mensaje">{mensaje}</p>}
        </section>
    );
};

export default RegistroUsuario;