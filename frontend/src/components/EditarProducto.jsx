import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './RegistroProducto.css';

const EditarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    imagenUrl: "",
    categoriaId: ""
  });
  const [mensaje, setMensaje] = useState("");
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const res = await fetch(`http://localhost:8080/productos`);
        const data = await res.json();
        const productoEncontrado = data.find(p => p.id === parseInt(id));
        if (productoEncontrado) {
          setProducto({
            ...productoEncontrado,
            categoriaId: productoEncontrado.categoria?.id || ""
          });
        }
      } catch (error) {
        setMensaje("Error al cargar el producto.");
      }
    };

    const obtenerCategorias = async () => {
      try {
        const res = await fetch('http://localhost:8080/categorias');
        const data = await res.json();
        setCategorias(data);
      } catch (err) {
        console.error('Error al cargar categorías', err);
      }
    };

    obtenerProducto();
    obtenerCategorias();
  }, [id]);

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productoParaEnviar = {
      ...producto,
      categoria: { id: parseInt(producto.categoriaId) }
    };

    try {
      const res = await fetch(`http://localhost:8080/productos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productoParaEnviar)
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

        <select name="categoriaId" value={producto.categoriaId} onChange={handleChange} required>
          <option value="">Selecciona una categoría</option>
          {categorias.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.titulo}</option>
          ))}
        </select>

        <button type="submit">Guardar cambios</button>
      </form>
      {mensaje && <p className="mensaje">{mensaje}</p>}
    </section>
  );
};

export default EditarProducto;
