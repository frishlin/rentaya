import React, { useEffect, useState } from "react";
import './RegistroProducto.css';

const RegistroProducto = () => {
    const [producto, setProducto] = useState({
        nombre: '',
        descripcion: '',
        imagenUrl: '',
        categoriaId: ''
    });

    const [mensaje, setMensaje] = useState('');
    const [categorias, setCategorias] = useState([]);

    const handleChange = (e) => {
        setProducto({ ...producto, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Aquí se crea el objeto que el backend espera
            const productoParaEnviar = {
                nombre: producto.nombre,
                descripcion: producto.descripcion,
                imagenUrl: producto.imagenUrl,
                categoria: {
                    id: parseInt(producto.categoriaId)
                }
            };

            const respuesta = await fetch('http://localhost:8080/productos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productoParaEnviar)
            });

            if (respuesta.ok) {
                setMensaje('El producto ha sido registrado con éxito.');
                setProducto({
                    nombre: '',
                    descripcion: '',
                    imagenUrl: '',
                    categoriaId: ''
                });
            } else {
                setMensaje('Ocurrió un error al registrar el producto.');
            }
        } catch (error) {
            console.error(error);
            setMensaje('Error de conexión.');
        }
    };

    useEffect(() => {
        const obtenerCategorias = async () => {
            try {
                const respuesta = await fetch('http://localhost:8080/categorias');
                const data = await respuesta.json();
                setCategorias(data);
            } catch (error) {
                console.error('Error al obtener categorías', error);
            }
        };
        obtenerCategorias();
    }, []);

    return (
        <section className="registro-container">
            <h2>Registrar nuevo vehículo</h2>
            <form className="registro-form" onSubmit={handleSubmit}>
                <input type="text" name="nombre" value={producto.nombre} onChange={handleChange} placeholder="Nombre del vehículo" />
                <textarea name="descripcion" value={producto.descripcion} onChange={handleChange} placeholder="Descripción" />
                <input type="text" name="imagenUrl" value={producto.imagenUrl} onChange={handleChange} placeholder="URL de la imagen" />
                <select name="categoriaId" value={producto.categoriaId} onChange={handleChange} >
                    <option value="">Selecciona una categoría</option>
                    {categorias.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.titulo}</option>
                    ))}
                </select>

                <button type="submit">Registrar</button>
            </form>
            {mensaje && <p className="mensaje">{mensaje}</p>}
        </section>
    );
};

export default RegistroProducto;
