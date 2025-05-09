import React, {useEffect, useState} from 'react';
import './ListaProductosAdmin.css'
import { Link } from 'react-router-dom';

const ListaProductosAdmin = () => {
    const [productos, setProductos] = useState([]);
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch('http://localhost:8080/productos');
                const data = await response.json();
                setProductos(data)
            }
            catch (error) {
                console.error('Error al obtener la lista de productos', error);
            }
        };
        fetchProductos();
    }, []);
    const eliminarProducto = async (id) => {
        if(!window.confirm('¿Realmente quieres eliminar este producto?')) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:8080/productos/${id}`, {
                method: 'DELETE'
            });
            if(response.ok) {
                setProductos(productos.filter(p => p.id !== id));
                setMensaje('El producto ha sido eliminado exitosamente')
            }
            else {
                setMensaje('Ocurrió un error al eliminar el producto');
            }
        }
        catch (error) {
            console.error('Ocurrió un error al eliminar el producto', error);
            setMensaje('Ocurrió un error de conexión al eliminar el producto');
        }            
    };

    return(
        <section className='admin-container'>
            <h2>Listado de productos</h2>
            {mensaje && <p className='mensaje'>{mensaje}</p> }
            <Link to='/admin/registro'>
                <button className='boton-volver'>Registrar nuevo vehículo</button>
            </Link>
            <table className='admin-table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOMBRE</th>
                        <th>DESCRIPCIÓN</th>
                        <th>IMAGEN</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(producto => (
                        <tr key={producto.id}>
                            <td>{producto.id}</td>
                            <td>{producto.nombre}</td>
                            <td>{producto.descripcion}</td>
                            <td><img src={producto.imagenUrl} alt={producto.nombre} width="100"/></td>
                            <td><button onClick={() => eliminarProducto(producto.id)}>Eliminar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default ListaProductosAdmin;