import React, { useEffect, useState } from 'react';
import './ProductoList.css';
import { Link } from 'react-router-dom';

const ProductoList = ({ filtrosBusqueda }) => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setCargando(true); // ← Para mostrar “Cargando...”
      try {
        let urlProductos = 'http://localhost:8080/productos';

        const { ciudad, fechaInicio, fechaFin } = filtrosBusqueda;

        if (fechaInicio && fechaFin) {
          // Si hay fechas, usar endpoint de productos disponibles
          urlProductos = `http://localhost:8080/productos/disponibles?inicio=${fechaInicio}&fin=${fechaFin}`;
        } else if (ciudad && ciudad.trim() !== '') {
          // Si no hay fechas pero sí ciudad
          urlProductos = `http://localhost:8080/productos/buscar?nombre=${encodeURIComponent(ciudad)}`;
        }

        const [resProductos, resCategorias] = await Promise.all([
          fetch(urlProductos),
          fetch('http://localhost:8080/categorias')
        ]);

        const dataProductos = await resProductos.json();
        const dataCategorias = await resCategorias.json();
        setCategorias(dataCategorias);

        if (!fechaInicio && !fechaFin && !ciudad) {
          // Mostrar aleatorios solo si no hay filtros
          const productosUnicos = Array.from(new Map(dataProductos.map(p => [p.id, p])).values());
          const aleatorios = productosUnicos.sort(() => 0.5 - Math.random()).slice(0, 10);
          setProductos(aleatorios);
        } else {
          setProductos(dataProductos);
        }
      } catch (error) {
        console.error('Error al obtener los productos o categorías:', error);
      } finally {
        setCargando(false);
      }
    };

    fetchData();
  }, [filtrosBusqueda]);

  // Reiniciar categoría cuando cambian los filtros
  useEffect(() => {
    setCategoriaSeleccionada('');
  }, [filtrosBusqueda]);

  const productosFiltrados = productos.filter(producto =>
    categoriaSeleccionada === '' || producto.categoria?.id === parseInt(categoriaSeleccionada)
  );

  return (
    <section className="productos-container">
      <h2 className="titulo-productos" style={{ color: '#ffc107' }}>
        Vehículos disponibles actualmente
      </h2>

      <div className='filtro-categorias'>
        <label htmlFor="categoria">Selecciona una categoría: </label>
        <select
          id="categoria"
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
        >
          <option value="">Todas</option>
          {categorias.map(categoria => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.titulo}
            </option>
          ))}
        </select>
      </div>

      {cargando ? (
        <h3 style={{ color: '#ffc107' }}>Cargando vehículos...</h3>
      ) : productosFiltrados.length === 0 ? (
        <h3 style={{ color: '#ffc107' }}>No hay vehículos que coincidan con tu búsqueda.</h3>
      ) : (
        <div className="productos-grid">
          {productosFiltrados.map(producto => (
            <Link to={`/producto/${producto.id}`} key={producto.id} className='producto-card'>
              <img src={producto.imagenUrl} alt={producto.nombre} />
              <h3>{producto.nombre}</h3>
              <p>{producto.descripcion}</p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductoList;
