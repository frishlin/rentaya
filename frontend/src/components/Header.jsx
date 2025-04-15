import React from "react";
import './Header.css'
import logo from '../assets/logo-rentaya-amarillo.png'

const Header = () => {
    return(
        <header className="main-header">
            <img src={logo} alt="Logo RentaYa" className="logo-header" />
            <nav className="nav">
                <ul>
                    <li><a href="#">Inicio</a></li>
                    <li><a href="#">Vehículos</a></li>
                    <li><a href="#">Contacto</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header