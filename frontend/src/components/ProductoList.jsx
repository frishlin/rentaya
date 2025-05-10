import React, { useEffect, useState } from 'react';
import './ProductoList.css';
import { Link } from 'react-router-dom';

const ProductoList = ({ filtrosBusqueda }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('http://localhost:8080/productos');
        const data = await response.json();
        if(!filtrosBusqueda.ciudad) {
          const aleatorios = [...data].sort(() => 0.5 - Math.random()).slice(0, 10);
          setProductos(aleatorios);
        } else {
          setProductos(data);
        }
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProductos();
  }, [filtrosBusqueda.ciudad]);

  const ciudadBuscada = filtrosBusqueda?.ciudad.toLowerCase() || '';
  
  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(ciudadBuscada)
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
          <Link to={`/producto/${producto.id}`} key={producto.id} className='producto-card'>
            <img src={producto.imagenUrl} alt={producto.nombre} />
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductoList;
