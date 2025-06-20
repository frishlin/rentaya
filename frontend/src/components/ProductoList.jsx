import React, { useEffect, useState } from 'react';
import './ProductoList.css';
import { Link } from 'react-router-dom';

const ProductoList = ({ filtrosBusqueda }) => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resProductos, resCategorias] = await Promise.all([
          fetch('http://localhost:8080/productos'),
          fetch('http://localhost:8080/categorias')

        ]);
        const dataProductos = await resProductos.json();
        const dataCategorias = await resCategorias.json();
        setCategorias(dataCategorias);

        if(!filtrosBusqueda.ciudad) {
          const productosUnicos = Array.from(new Map(dataProductos.map(p => [p.id, p])).values());
          const aleatorios = productosUnicos.sort(() => 0.5 - Math.random()).slice(0, 10);
          setProductos(aleatorios);
          
        } else {
          setProductos(dataProductos);
        }
      } catch (error) {
        console.error('Error al obtener los productos o categorías:', error);
      }
    };

    fetchData();
  }, [filtrosBusqueda.ciudad]);

  const ciudadBuscada = filtrosBusqueda?.ciudad.toLowerCase() || '';
  
  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(ciudadBuscada) &&
    (categoriaSeleccionada === '' || producto.categoria?.id === parseInt(categoriaSeleccionada))
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

      <div className='filtro-categorias'>
        <label htmlFor="categoria">Selecciona una categoría: </label>
        <select id="categoria" value={categoriaSeleccionada} onChange={(e) => setCategoriaSeleccionada(e.target.value)}>
          <option value="">Todas</option>
          {categorias.map(categoria => (
            <option key={categoria.id} value={categoria.id}>{categoria.titulo}
            </option>
          ))}
        </select>
      </div>


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
