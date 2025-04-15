import React, { useEffect, useState} from 'react'
import './ProductoList.css'
import productos from './ProductosFake'

 const ProductoList = () => {
//     const [productos, setProductos] = useState([])

//     useEffect(() => {
//         fetch('http://localhost:8080/productos')
//         .then(res => res.json())
//         .then(data => setProductos(data))
//         .catch(err => console.error('Hubo un error al cargar la lista de productos', err))
//     }, [])

    if(productos.length === 0) {
        return(
            <section className='productos-container'>
                <h2 className='titulo-productos' style={{color: '#ffc107'}}>
                Lo setimos, no hay vehículos disponibles por el momento.
                </h2>
            </section>
        )
    }
    return(
        <section className='productos-container'>
            <h2 className='titulo-productos' style={{ color: '#ffc107' }}
            >Vehículos disponibles actualente
            </h2>
            <div className='productos-grid'>
                {productos.map(producto => (
                    <div className='producto-card' key={producto.id}>
                    <img src={producto.imagenUrl} alt={producto.nombre} />
                    <h3>{producto.nombre}</h3>
                    <p>{producto.descripcion}</p>
                </div>
                ))}
            </div>
        </section>
    )
}

export default ProductoList