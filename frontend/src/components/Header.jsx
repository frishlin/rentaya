import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'
import logo from '../assets/logo-rentaya-amarillo.png'

const Header = () => {
    const [usuario, setUsuario] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const usuarioGuardado = localStorage.getItem('usuario');
        if (usuarioGuardado) {
            setUsuario(JSON.parse(usuarioGuardado));
        }
    }, []);

    const cerrarSesion = () => {
        localStorage.removeItem('usuario');
        setUsuario(null);
        window.location.reload();
        //navigate('/');
    };

    return (
        <header className="main-header">
            <img src={logo} alt="Logo RentaYa" className="logo-header" />
            <nav className="nav">
                <ul>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/">Vehículos</Link></li>
                    <li><Link to="/">Contacto</Link></li>

                    {!usuario && (
                        <>
                            <li><Link to="/registro">Regístrate</Link></li>
                            <li><Link to="/login">Inicia sesión</Link></li>
                        </>
                    )}

                    {usuario && (
                        <>
                            <li>Hola, {usuario.email}</li>
                            <li><button className='boton-cerrar' onClick={cerrarSesion}>Cerrar sesión</button></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header