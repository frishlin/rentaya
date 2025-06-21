import React, { useEffect, useState } from 'react';

const MisReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuarioObj = JSON.parse(usuarioGuardado);
      setUsuario(usuarioObj);

      fetch(`http://localhost:8080/reservas/usuario/${usuarioObj.email}`)
        .then(response => {
          if (!response.ok) throw new Error('No fue posible cargar las reservas');
          return response.json();
        })
        .then(data => setReservas(data))
        .catch(error => {
            setError("Error al cargar las reservas");
        });
    }
  }, []);

  const cancelarReserva = (id) => {
    if(!window.confirm("¿Realmente deseas cancelar la reserva?")) {
        return;
    }
    fetch(`http://localhost:8080/reservas/${id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al cancelar');
        setReservas(reservas.filter(r => r.id !== id));
        setMensaje('Reserva cancelada correctamente.');
      })
      .catch(() => {
        setError('No se pudo cancelar la reserva.');
      });
  };
  

  if (!usuario) {
    return <p>Debes iniciar sesión para ver tus reservas.</p>;
  }

  if (reservas.length === 0) {
    return <p>No tienes reservas registradas aún.</p>;
  }

  return (
    <section className='mis-reservas' style={{ padding: '1.5rem' }} >
      <h2>Mis Reservas</h2>
      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {reservas.map(reserva => (
          <li key={reserva.id} style={{ marginBottom: '1rem' }}>
            <strong>Vehículo:</strong> {reserva.producto.nombre} <br />
            <strong>Del:</strong> {reserva.fechaInicio} <br />
            <strong>Al:</strong> {reserva.fechaFin} <br />
            <button
              onClick={() => cancelarReserva(reserva.id)}
              style={{
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '4px',
                marginTop: '5px',
                cursor: 'pointer'
              }}
            >
              Cancelar reserva
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MisReservas;