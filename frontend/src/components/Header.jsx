import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'
import logo from '../assets/logo-rentaya-amarillo.png'

const Header = ({onReset}) => {
    const [usuario, setUsuario] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const cargarUsuario = () => {
            const usuarioGuardado = localStorage.getItem('usuario');
            setUsuario(usuarioGuardado ? JSON.parse(usuarioGuardado) : null);
        };
        cargarUsuario();
        
        window.addEventListener("usuario-actualizado", cargarUsuario);
        return() => {
            window.removeEventListener("usuario-actualizado", cargarUsuario);
        };
        
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
                    <li><Link to="/admin/lista">Panel Administrador</Link></li>
                    <li><Link to="/" onClick={onReset}>Inicio</Link></li>
                    <li><Link to="/" onClick={onReset}>Vehículos</Link></li>
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