package com.rentaya.backend.service;

import com.rentaya.backend.model.Producto;
import com.rentaya.backend.repository.ProductoRepository;
import com.rentaya.backend.repository.ReservaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository productoRepository;
    private final ReservaRepository reservaRepository;

    public ProductoServiceImpl(ProductoRepository productoRepository, ReservaRepository reservaRepository) {
        this.productoRepository = productoRepository;
        this.reservaRepository = reservaRepository;
    }

    @Override
    public List<Producto> obtenerProductosDisponibles(LocalDate inicio, LocalDate fin) {
        List<Producto> todos = productoRepository.findAll();

        return todos.stream()
                .filter(producto ->
                        reservaRepository.findByProductoId(producto.getId()).stream()
                                .noneMatch(reserva ->
                                        (inicio.isBefore(reserva.getFechaFin()) && fin.isAfter(reserva.getFechaInicio()))
                                )
                )
                .collect(Collectors.toList());
    }

    @Override
    public List<Producto> listarProductos() {
        return productoRepository.findAll();
    }

    @Override
    public Producto crearProducto(Producto producto) {
        return productoRepository.save(producto);
    }

    @Override
    public void eliminarProducto(Long id) {
        productoRepository.deleteById(id);
    }

    @Override
    public ResponseEntity<Producto> actualizarProducto(Long id, Producto productoNuevo) {
        return productoRepository.findById(id)
                .map(p -> {
                    p.setNombre(productoNuevo.getNombre());
                    p.setDescripcion(productoNuevo.getDescripcion());
                    p.setImagenUrl(productoNuevo.getImagenUrl());
                    p.setCategoria(productoNuevo.getCategoria());
                    return ResponseEntity.ok(productoRepository.save(p));
                })
                .orElse(ResponseEntity.notFound().build());
    }
    @Override
    public Optional<Producto> obtenerProductoPorId(Long id) {
        return productoRepository.findById(id);
    }
    @Override
    public List<Producto> buscarPorNombre(String nombre) {
        if (nombre != null && !nombre.isBlank()) {
            return productoRepository.findByNombreContainingIgnoreCase(nombre);
        }
        return productoRepository.findAll();
    }
}
