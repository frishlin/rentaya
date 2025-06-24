package com.rentaya.backend.service;

import com.rentaya.backend.model.Producto;

import java.time.LocalDate;
import java.util.List;

public interface ProductoService {
    List<Producto> obtenerProductosDisponibles(LocalDate inicio, LocalDate fin);
}
