package com.rentaya.backend.repository;

import com.rentaya.backend.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductoRepository extends JpaRepository<Producto, Long> {

    List<Producto> findByNombreContainingIgnoreCase(String nombre);
    boolean existsByCategoriaId(Long categoriaId);
    List<Producto> findByCategoriaId(Long categoriaId);
    long countByCategoriaId(Long categoriaId);
    void deleteByCategoriaId(Long categoriaId);
}
