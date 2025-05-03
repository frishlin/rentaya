const API_URL = 'http://localhost:8080/productos';

export const obtenerProductos = async () => {
  try {
    const respuesta = await fetch(API_URL);
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};