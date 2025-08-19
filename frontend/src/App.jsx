import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import ProductoList from './components/ProductoList'
import RegistroUsuario from './components/RegistroUsuario';
import LoginUsuario from './components/LoginUsuario';
import Buscador from './components/Buscador';
import Footer from './components/Footer';
import Error404 from './components/Error404';
import RegistroProducto from './components/RegistroProducto';
import ListaProductosAdmin from './components/ListaProductosAdmin';
import EditarProducto from './components/EditarProducto';
import DetalleProducto from './components/DetalleProducto';
import AgregarCategoria from './components/AgregarCategoria';
import MisReservas from './components/MisReservas';
import Favoritos from './components/Favoritos';
import AdminRoute from './guards/AdminRoute';

const App = () => {
  const [filtrosBusqueda, setFiltrosBusqueda] = useState({
    ciudad: '',
    fechaInicio: '',
    fechaFin: ''
  });

  const reinicarBusqueda = () => {
    setFiltrosBusqueda({ciudad: '', fechaInicio: '', fechaFin: ''});
  }

  const handleBuscar = (filtros) => {
    setFiltrosBusqueda(filtros);
  };

  return (
    <Router>
      <Header onReset = {reinicarBusqueda} />
      <main className='app-container'>
        <Routes>
          <Route path="/" element={
            <>
              <h1>¡Te damos la más cordial bienvenida a RentaYa!</h1>
              <h2>¡Aquí podrás encontrar el vehículo que necesitas!</h2>
              <Buscador onBuscar={handleBuscar} filtros={filtrosBusqueda} />
              <ProductoList filtrosBusqueda={filtrosBusqueda} />
            </>
          } />

          <Route path='/registro' element={<RegistroUsuario />} />
          <Route path='/login' element={<LoginUsuario />} />
          <Route path='/producto/:id' element={<DetalleProducto />} />
          <Route path="/mis-reservas" element={<MisReservas />} />
          <Route path="/detalle/:id" element={<DetalleProducto />} />
          <Route path="/favoritos" element={<Favoritos />} />

          <Route element={<AdminRoute />}>
            <Route path="/admin/lista" element={<ListaProductosAdmin />} />
            <Route path="/admin/registro" element={<RegistroProducto />} />
            <Route path="/admin/categoria" element={<AgregarCategoria />} />
            <Route path="/editar/:id" element={<EditarProducto />} />
          </Route>
          
          <Route path="*" element={<Error404 />} />

        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App
