import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductoList.css';

const Favoritos = () => {
    const [productos, setProductos] = useState([]);
    const [favoritos, setFavoritos] = useState([]);

    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const claveFavoritos = usuario ? `favoritos_${usuario.email}` : null;

    useEffect(() => {
        if (!claveFavoritos) return;

        const favoritosGuardados = JSON.parse(localStorage.getItem(claveFavoritos)) || [];
        setFavoritos(favoritosGuardados);

        const obtenerProductos = async () => {
            try {
                const respuestas = await Promise.all(
                    favoritosGuardados.map(id =>
                        fetch(`http://localhost:8080/productos/${id}`).then(res => res.json())
                    )
                );
                setProductos(respuestas);
            } catch (error) {
                console.log("Hubo un error al cargar los productos a favoritos: ", error);
            }
        };

        if (favoritosGuardados.length > 0) {
            obtenerProductos();
        }
    }, [claveFavoritos]);

    const eliminarFavorito = (idEliminar) => {
        const nuevos = favoritos.filter(id => id !== idEliminar);
        localStorage.setItem(claveFavoritos, JSON.stringify(nuevos));
        setFavoritos(nuevos);
        setProductos(productos.filter(p => p.id !== idEliminar));
    };

    return (
        <section className="lista-productos">
            <h2>Mis Productos Favoritos</h2>
            {productos.length === 0 ? (
                <p>Aún no tienes productos favoritos.</p>
            ) : (
                <div className="productos-grid">
                    {productos.map(producto => (
                        <div className="producto-card" key={producto.id}>
                            <img src={producto.imagenUrl} alt={producto.nombre} />
                            <h3>{producto.nombre}</h3>
                            <p>{producto.descripcion}</p>

                            <div className="acciones-favorito">
                                <Link to={`/detalle/${producto.id}`} className="boton-detalle">
                                    Ver detalle
                                </Link>
                                <button
                                    onClick={() => eliminarFavorito(producto.id)}
                                    style={{
                                        background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', color: 'red',
                                        marginLeft: '10px'
                                    }} title="Eliminar de favoritos"
                                >
                                    ❤️
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Favoritos;
