package com.rentaya.backend.service;

import com.rentaya.backend.repository.CategoriaRepository;
import com.rentaya.backend.repository.ProductoRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CategoriaServiceImpl implements CategoriaService{
    private final CategoriaRepository categoriaRepository;
    private final ProductoRepository productoRepository;

    public CategoriaServiceImpl(CategoriaRepository categoriaRepository, ProductoRepository productoRepository) {
        this.categoriaRepository = categoriaRepository;
        this.productoRepository = productoRepository;
    }

    @Override
    @Transactional
    public ResponseEntity<?>eliminarCategoria(Long id, boolean forzar) {
        if (!categoriaRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("La categoría no existe");
        }

        long productosAsociados = productoRepository.countByCategoriaId(id);

        if (productosAsociados > 0 && !forzar) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("La categoría tiene productos asociados. ¿Deseas eliminarla de todos modos?");
        }

        categoriaRepository.deleteById(id);
        return ResponseEntity.ok("La categoría ha sido eliminada");
    }
}
