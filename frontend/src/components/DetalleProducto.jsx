import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './DetalleProducto.css'

const DetalleProducto = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [confirmacion, setConfirmacion] = useState('');

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await fetch(`http://localhost:8080/productos/${id}`);
                if (!response.ok) {
                    setMensaje("El producto no existe");
                    return;
                }
                const data = await response.json();
                setProducto(data);
            }
            catch (error) {
                setMensaje('Error al cargar los datos del producto');
            }
        };

        fetchProducto();
    }, [id]);


    const reservarProducto = async () => {
        if(!fechaInicio || !fechaFin) {
            setConfirmacion("Debes seleccionar tanto fecha de inicio, como fecha de fin");
            return;
        }

        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        if(inicio >= fin) {
            setConfirmacion("La fecha de inicio debe ser anterior a la fecha de fin");
            return;
        }
        
        if(inicio < hoy) {
            setConfirmacion("La fecha de inicio debe ser anterior a la fecha de hoy");
            return;
        }

        const reserva = {
            fechaInicio, fechaFin, producto: {id: producto.id}
        };

        try {
            const response = await fetch("http://localhost:8080/reservas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reserva)
            });
            if(!response.ok) {
                throw new Error("No se pudo guardar la reserva");
            }
            setConfirmacion("Reserva realizada exitosamente.");
            setFechaInicio('');
            setFechaFin('');
        }
        catch (error) {
            setConfirmacion("Ha ocurrido un error al hacer la reserva");
        }
    };

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
                <div className="formulario-reserva">
                    <label>Fecha de Inicio:</label>
                    <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
                    <label >Fecha de fin:</label>
                    <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
                    <button onClick={reservarProducto}>Reservar</button>
                    {confirmacion && <p className= "mensaje">{confirmacion}</p> }
                    
                </div>

            </section>
        </>

    );
};

export default DetalleProducto;