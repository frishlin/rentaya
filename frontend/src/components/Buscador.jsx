import React, {useState} from 'react';
import './Buscador.css';

const Buscador = ({onBuscar}) => {
    const [ciudad, setCiudad] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onBuscar(ciudad);
    };

    return(
        <section className='buscador-container'>
            <form onSubmit={handleSubmit} className='buscador-form'>
                <input type="text" placeholder='Busca por nombre de vehículo' value={ciudad} onChange={(e) => setCiudad(e.target.value)} required />
                <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
                <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)}/>
                <button type='submit'>Busar</button>
            </form>
        </section>
    );
};

export default Buscador;