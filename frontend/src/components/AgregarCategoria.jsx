import React, { useEffect, useState } from "react";
import './RegistroProducto.css';

const AgregarCategoria = () => {
    const [categoria, setCategoria] = useState({
        titulo: '',
        descripcion: '',
        imagenUrl: ''
    });
    const [mensaje, setMensaje] = useState('');
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/categorias')
            .then(res => res.json())
            .then(data => setCategorias(data))
            .catch(() => setMensaje('Hubo un error al cargar las categorías'));
    }, []);

    const handleChange = (e) => {
        setCategoria({ ...categoria, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:8080/categorias', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(categoria)
            });
            if (res.ok) {
                setMensaje('La categoría ha sido agregada correctamente');
                setCategoria({ titulo: '', descripcion: '', imagenUrl: '' });
                const nuevasCategorias = await fetch('http://localhost:8080/categorias').then(r => r.json());
                setCategorias(nuevasCategorias);
            } else {
                setMensaje('Ha ocurrido un error al registrar la categoría');
            }

        } catch (error) {
            setMensaje('Error de conexión');

        }
    };

    const eliminarCategoria = async (id) => {
        const confirmar = window.confirm("¿Deseas eliminar esta categoría");
        if (!confirmar) return;
        try {
            const res = await fetch(`http://localhost:8080/categorias/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                setCategorias(categorias.filter(cat => cat.id !== id));
                setMensaje('La categoría ha sido eliminada exitosamente');
            } else {
                setMensaje('Error al eliminar la categoría');
            }
        } catch (error) {
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

            <h3 className="titulo-categorias">Lista de categorías</h3>
            <div className="lista-categorias">
                {categorias.map(cat => (
                    <div className="categoria-card" key={cat.id}>
                        <img src={cat.imagenUrl} alt={cat.titulo} className="categoria-imagen" />
                        <div className="categoria-info">
                            <h4>{cat.titulo}</h4>
                            <p>{cat.descripcion}</p>
                            <button onClick={() => eliminarCategoria(cat.id)} className="btn-eliminar">
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AgregarCategoria;