import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import './RegistroProducto.css';

const EditarProducto = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [producto, setProducto] = useState({
        nombre: "", descripcion: "", imagenUrl: ""
    });
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        const obtenerProducto = async () => {
            try {
                const res = await fetch('http://localhost:8080/productos');
                const data = await res.json();
                const productoEncontrado = data.find(p => p.id === parseInt(id));
                if(productoEncontrado) {
                    setProducto(productoEncontrado);
                }
            }
            catch (error) {
                setMensaje("Error al cargar el producto");
            }
        };
        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const res = await fetch(`http://localhost:8080/productos/${id}`, {
                    method: 'PUT',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(producto)
                });
                if(res.ok) {
                    setMensaje("El producto ha sido actualizado exitosamente");
                    setTimeout(() => navigate("/lista-productos"), 1500);
                } else {
                    setMensaje("Ocurrió un error al actualizar");
                }
            }
            catch (error) {
                setMensaje("Ocurrió un error con la conexión");
            }
        };

        return(
            <section className="registro-container">
                <h2>Editar producto</h2>
                <form className="registro-form" onSubmit={handleSubmit}>
                    <input type="text" name="nombre" value={producto.nombre} onChange={handleChange} placeholder="Nombre" />
                    <textarea name="descripcion" value={producto.descripcion} onChange={handleChange} placeholder="Descripción"></textarea>
                    <input type="text" name="imagenUrl" value={producto.imagenUrl} onChange={handleChange} placeholder="Imagen" />
                    <button type="submit">Actualizar</button>
                </form>       
                {mensaje & <p className="mensaje">{mensaje}</p>}
            </section>
        );
    })
};

export default EditarProducto;
