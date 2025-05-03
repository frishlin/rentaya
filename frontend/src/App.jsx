import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import ProductoList from './components/ProductoList'
import RegistroUsuario from './components/RegistroUsuario';
import LoginUsuario from './components/LoginUsuario';
import Buscador from './components/Buscador';
import Footer from './components/Footer';
import Error404 from './components/Error404';

const App = () => {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  const handleBuscar = (ciudad) => {
    setTerminoBusqueda(ciudad);
  };

  return (
    <Router>
      <Header />
      <main className='app-container'>
        <Routes>
          <Route path="/" element={
            <>
              <h1>¡Te damos la más cordial bienvenida a RentaYa!</h1>
              <h2>¡Aquí podrás encontrar el vehículo que necesitas!</h2>
              <Buscador onBuscar={handleBuscar} />
              <ProductoList terminoBusqueda={terminoBusqueda} />
            </>
          } />

          <Route path="/registro" element={<RegistroUsuario />} />
          <Route path="/login" element={<LoginUsuario />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App
