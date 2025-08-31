package com.rentaya.backend.service;

import com.rentaya.backend.model.Producto;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ProductoService {
    List<Producto> obtenerProductosDisponibles(LocalDate inicio, LocalDate fin);
    List<Producto> listarProductos();
    Producto crearProducto(Producto producto);
    void eliminarProducto(Long id);
    ResponseEntity<Producto> actualizarProducto(Long id, Producto productoNuevo);
    Optional<Producto> obtenerProductoPorId(Long id);
    List<Producto> buscarPorNombre(String nombre);
}
