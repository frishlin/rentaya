import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './DetalleProducto.css'

const DetalleProducto = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch('http://localhost:8080/productos');
                const data = await response.json();
                const encontrado = data.find(p => p.id === parseInt(id));
                if (encontrado) {
                    setProducto(encontrado);
                } else {
                    setMensaje("El producto no existe");
                }
            }
            catch (error) {
                setMensaje('Error al cargar los datos del producto');
            }
        };

        fetchProductos();
    }, [id]);

    if (mensaje) {
        return <p className="mensaje">{mensaje}</p>;
    }

    if (!producto) {
        return <p className="mensaje">Cargando producto...</p>;
    }

    return (
        <>
            <h2 className="titulo-productos" style={{textAlign:'center', marginTop:'2rem', color:'#ffffff'}}>
                Detalle de Producto
            </h2>
            <section className="detalle-container">
                <h2>{producto.nombre}</h2>
                <img src={producto.imagenUrl} alt={producto.nombre} className="detalle-img" />
                <p>{producto.descripcion}</p>
            </section>
        </>

    );
};

export default DetalleProducto;