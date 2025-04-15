import React from 'react'
import Header from './components/Header'
import ProductoList from './components/ProductoList'


const App = () => {
  return (
    <>
      <Header />
      <main className='app-container'>
        <h1>¡Te damos la más cordial bienvenida a RentaYa!</h1>
        <h2>¡Aquí podrás encontrar el vehículo que necesitas!</h2>
        <ProductoList />
      </main>
    </>
  )
}

export default App
