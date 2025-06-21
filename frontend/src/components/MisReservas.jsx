import React, { useEffect, useState } from 'react';

const MisReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuarioObj = JSON.parse(usuarioGuardado);
      setUsuario(usuarioObj);

      fetch(`http://localhost:8080/reservas/usuario/${usuarioObj.email}`)
        .then(response => {
          if (!response.ok) throw new Error('No se pudieron cargar las reservas');
          return response.json();
        })
        .then(data => setReservas(data))
        .catch(error => console.error(error));
    }
  }, []);

  if (!usuario) {
    return <p>Debes iniciar sesión para ver tus reservas.</p>;
  }

  if (reservas.length === 0) {
    return <p>No tienes reservas registradas aún.</p>;
  }

  return (
    <section className='mis-reservas'>
      <h2>Mis Reservas</h2>
      <ul>
        {reservas.map(reserva => (
          <li key={reserva.id}>
            <strong>Vehículo:</strong> {reserva.producto.nombre} <br />
            <strong>Del:</strong> {reserva.fechaInicio} <br />
            <strong>Al:</strong> {reserva.fechaFin}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MisReservas;
