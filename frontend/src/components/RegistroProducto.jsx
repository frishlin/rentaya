import React, {useState} from "react";
import './RegistroProducto.css';

const RegistroProducto = () => {
    const[producto, setProducto] = useState({
        nombre: '', descripcion: '', imagenUrl: ''
    });

    const[mensaje, setMensaje] = useState('');

    const handleChange = (e) => {
        setProducto({...producto, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await fetch('http://localhost:8080/productos', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(producto)
            });
            if(respuesta.ok) {
                setMensaje('El producto ha sido registrado con éxito.');
                setProducto({nombre: '', descripcion: '', imagenUrl: ''})
            } else {
                setMensaje('Ocurrió un error al reigstrar el producto.');
            }
        } catch(error) {
            console.error(error);
            setMensaje('Error de conexión.');
        } 
    };

    return(
        <section className="registro-container">
            <h2>Registrar nuevo vehículo</h2> 
            <form className="registro-form" onSubmit={handleSubmit}>
                <input type="text" name="nombre" value={producto.nombre} onChange={handleChange} placeholder="Nombre del vehículo" required />
                <textarea type="text" name="descripcion" value={producto.descripcion} onChange={handleChange} placeholder="Descripción" required></textarea>
                <input type="text" name="imagenUrl" value={producto.imagenUrl} onChange={handleChange} placeholder="URL de la imagen" required />
                <button type="submit">Registrar</button>
            </form>
            {mensaje && <p className="mensaje">{mensaje}</p> }
        </section>
    );
};

export default RegistroProducto;

