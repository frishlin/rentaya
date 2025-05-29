import React, {useState} from "react";
import './RegistroProducto.css';

const AgregarCategoria = () => {
    const [categoria, setCategoria] = useState({
        titulo: '',
        descripcion: '',
        imagenUrl: ''
    });
    const [mensaje, setMensaje] = useState('');

    const handleChange = (e) => {
        setCategoria({...categoria, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:8080/categorias', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(categoria)
            });
            if(res.ok) {
                setMensaje('La categoría ha sido agregada correctamente');
                setCategoria({titulo: '', descripcion: '', imagenUrl: ''});
            } else {
                setMensaje('Ha ocurrido un error al registrar la categoría');
            }
            
            } catch(error) {
                setMensaje('Error de conexión');

        }
    };

    return (
        <section className="registro-container"> 
            <h2>Agregar nueva categoría</h2>
            <form className="registro-form" onSubmit={handleSubmit}>
                <input type="text" name="titulo" placeholder="titulo" value={categoria.titulo} onChange={handleChange} />
                <textarea name="descripcion" placeholder="Descripción" value={categoria.descripcion} onChange={handleChange} />
                <input type="text" name="imagenUrl" placeholder="URL de la imagen" value={categoria.imagenUrl} onChange={handleChange} />
                <button type="submit">Registrar</button>
            </form>
            {mensaje && <p className="mensaje">{mensaje}</p>}
        </section>
    );
};

export default AgregarCategoria;