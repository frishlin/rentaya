import React, { useEffect, useState } from 'react';
import './ProductoList.css';

const ProductoList = ({ terminoBusqueda }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('http://localhost:8080/productos');
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProductos();
  }, []);

  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
  );

  if (productos.length === 0) {
    return (
      <section className="productos-container">
        <h2 className="titulo-productos" style={{ color: '#ffc107' }}>
          Cargando vehículos...
        </h2>
      </section>
    );
  }

  if (productosFiltrados.length === 0) {
    return (
      <section className="productos-container">
        <h2 className="titulo-productos" style={{ color: '#ffc107' }}>
          No hay vehículos que coincidan con tu búsqueda.
        </h2>
      </section>
    );
  }

  return (
    <section className="productos-container">
      <h2 className="titulo-productos" style={{ color: '#ffc107' }}>
        Vehículos disponibles actualmente
      </h2>
      <div className="productos-grid">
        {productosFiltrados.map(producto => (
          <div className="producto-card" key={producto.id}>
            <img src={producto.imagenUrl} alt={producto.nombre} />
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductoList;
