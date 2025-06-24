package com.rentaya.backend.service;

import com.rentaya.backend.model.Producto;
import com.rentaya.backend.repository.ProductoRepository;
import com.rentaya.backend.repository.ReservaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
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
}
