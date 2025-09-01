import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './DetalleProducto.css'

const DetalleProducto = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [producto, setProducto] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [usuario, setUsuario] = useState(null);
    const [confirmacion, setConfirmacion] = useState('');
    const [reservasOcupadas, setReservasocupadas] = useState([]);
    const [esFavorito, setEsFavorito] = useState(false);


    useEffect(() => {
        const usuarioGuardado = localStorage.getItem('usuario');
        if (usuarioGuardado) {
            const usuarioObj = JSON.parse(usuarioGuardado);
            setUsuario(usuarioObj);

            const claveFavoritos = `favoritos_${usuarioObj.email}`;
            const favoritosGuardados = JSON.parse(localStorage.getItem(claveFavoritos)) || [];
            setEsFavorito(favoritosGuardados.includes(parseInt(id)));
        }



    }, [id]);

    const alternarFavoritos = () => {
        const usuarioGuardado = localStorage.getItem('usuario');
        if (!usuarioGuardado) {
            localStorage.setItem('mensaje-login', 'Inicia sesión para agregar a tu lista de favoritos')
            localStorage.setItem('ruta-reserva', `/detalle/${id}`);
            navigate('/login');
            return;
        }

        const usuarioObj = JSON.parse(usuarioGuardado);
        const claveFavoritos = `favoritos_${usuarioObj.email}`;
        const favoritosGuardados = JSON.parse(localStorage.getItem(claveFavoritos)) || [];
        let nuevosFavoritos;

        if (favoritosGuardados.includes(parseInt(id))) {
            nuevosFavoritos = favoritosGuardados.filter(favId => favId !== parseInt(id));
            setEsFavorito(false);
        } else {
            nuevosFavoritos = [...favoritosGuardados, parseInt(id)];
            setEsFavorito(true);
        }

        localStorage.setItem(claveFavoritos, JSON.stringify(nuevosFavoritos));
    };

    useEffect(() => {
        const mensajeAlerta = localStorage.getItem('mensajeReserva');
        if (mensajeAlerta) {
            setMensaje(mensajeAlerta);
            localStorage.removeItem('mensajeReserva');
        }

        const usuarioGuardado = localStorage.getItem('usuario');
        if (usuarioGuardado) {
            setUsuario(JSON.parse(usuarioGuardado));
        }

    }, []);

    useEffect(() => {
        const fechaInicioGuardada = localStorage.getItem('fecha-inicio-reserva');
        const fechaFinGuardada = localStorage.getItem('fecha-fin-reserva');

        if (fechaInicioGuardada) {
            setFechaInicio(fechaInicioGuardada);
            localStorage.removeItem('fecha-inicio-reserva');
        }

        if (fechaFinGuardada) {
            setFechaFin(fechaFinGuardada);
            localStorage.removeItem('fecha-fin-reserva');
        }

        console.log("Fecha recuperada del localStorage:", fechaInicioGuardada, fechaFinGuardada);

    }, []);

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
            } catch (error) {
                setMensaje('Error al cargar los datos del producto');
            }
        };

        const fetchReservas = async () => {
            try {
                const res = await fetch(`http://localhost:8080/reservas/producto/${id}`);
                if (!res.ok) throw new Error("Error al cargar las reservas");
                const data = await res.json();
                setReservasocupadas(data);
            } catch (error) {
                console.log("No fue posible cargar las fechas ocupadas");
            }
        };

        fetchProducto();
        fetchReservas();
    }, [id]);

    const reservarProducto = async () => {
        setConfirmacion("");

        if (!usuario) {
            setConfirmacion("Debes iniciar sesión para hacer una reserva.");
            return;
        }
        if (!fechaInicio || !fechaFin) {
            setConfirmacion("Debes seleccionar tanto fecha de inicio, como fecha de fin");
            return;
        }

        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        if (inicio >= fin) {
            setConfirmacion("La fecha de inicio debe ser anterior a la fecha de fin");
            return;
        }
        if (inicio < hoy) {
            setConfirmacion("La fecha de inicio no puede ser anterior a hoy");
            return;
        }

        const reserva = {
            fechaInicio,
            fechaFin,
            producto: { id: producto.id },
            usuario: { id: usuario.id },
        };

        try {
            const resp = await fetch("http://localhost:8080/reservas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reserva),
            });

            const text = await resp.text();
            const payload = (() => { try { return JSON.parse(text); } catch { return text; } })();

            if (resp.ok) {
                setConfirmacion("Reserva realizada exitosamente.");
                setFechaInicio("");
                setFechaFin("");

                try {
                    const res = await fetch(`http://localhost:8080/reservas/producto/${id}`);
                    if (res.ok) {
                        const data = await res.json();
                        setReservasocupadas(data);
                    }
                } catch (_) { }
            } else {
                const mensaje =
                    typeof payload === "string"
                        ? payload
                        : payload?.mensaje || "No se pudo guardar la reserva";
                setConfirmacion(mensaje);
            }
        } catch (e) {
            setConfirmacion("Error de conexión con el servidor");
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
            <h2 className="titulo-productos" style={{ textAlign: 'center', marginTop: '2rem', color: '#ffffff' }}>
                Detalle de Producto
            </h2>
            <section className="detalle-container">
                <h2>{producto.nombre}</h2>
                <img src={producto.imagenUrl} alt={producto.nombre} className="detalle-img" />
                <p>{producto.descripcion}</p>

                <div style={{ marginTop: '2rem' }}>
                    <h3>Fechas ya reservadas:</h3>
                    {reservasOcupadas.length === 0 ? (
                        <p>Este vehículo aún no tiene reservas.</p>
                    ) : (
                        <ul>
                            {reservasOcupadas.map(res => (
                                <li key={res.id}>
                                    Del <strong>{res.fechaInicio}</strong> al <strong>{res.fechaFin}</strong>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="formulario-reserva">
                    <label>Fecha de Inicio:</label>
                    <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
                    <label>Fecha de Fin:</label>
                    <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
                    <button onClick={() => {
                        if (!usuario) {
                            localStorage.setItem('mensaje-login', 'Para reservar, necesitas iniciar sesión.');
                            localStorage.setItem('ruta-reserva', `/detalle/${id}`);
                            if (fechaInicio) localStorage.setItem('fecha-inicio-reserva', fechaInicio);
                            if (fechaFin) localStorage.setItem('fecha-fin-reserva', fechaFin);
                            navigate('/login');
                        } else {
                            reservarProducto();
                        }
                    }}>Reservar</button>

                    <button className="favorito-btn" style={{ marginTop: '1rem' }} onClick={alternarFavoritos}>
                        {esFavorito ? 'Eliminar de favoritos ♥️' : 'Agregar a favoritos 🤍'}
                    </button>
                    {confirmacion && <p className="mensaje">{confirmacion}</p>}
                </div>
            </section>
        </>
    );
};

export default DetalleProducto;
