import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './RegistroProducto.css';

const EditarProducto = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [producto, setProducto] = useState({
      nombre: "", descripcion: "", imagenUrl: ""
    });
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const res = await fetch(`http://localhost:8080/productos`);
        const data = await res.json();
        const productoEncontrado = data.find(p => p.id === parseInt(id));
        if (productoEncontrado) {
          setProducto(productoEncontrado);
        }
      } catch (error) {
        setMensaje("Error al cargar el producto.");
      }
    };
    obtenerProducto();
    }, [id]);

    const handleChange = (e) => {
        setProducto({...producto, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/productos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto)
      });
      if (res.ok) {
        setMensaje("Producto actualizado correctamente.");
        setTimeout(() => navigate("/admin/lista"), 800);
      } else {
        setMensaje("Error al actualizar.");
      }
    } catch (err) {
      setMensaje("Error de red.");
    }
  };


    return (
    <section className="registro-container">
      <h2>Editar producto</h2>
      <form className="registro-form" onSubmit={handleSubmit}>
        <input type="text" name="nombre" value={producto.nombre} onChange={handleChange} placeholder="Nombre" required />
        <textarea name="descripcion" value={producto.descripcion} onChange={handleChange} placeholder="Descripción" required />
        <input type="text" name="imagenUrl" value={producto.imagenUrl} onChange={handleChange} placeholder="URL de imagen" required />
        <button type="submit">Guardar cambios</button>
      </form>
      {mensaje && <p className="mensaje">{mensaje}</p>}
    </section>
    );
};

export default EditarProducto;
