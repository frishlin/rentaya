package com.rentaya.backend.controller;

import com.rentaya.backend.model.Categoria;
import com.rentaya.backend.repository.CategoriaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.rentaya.backend.repository.ProductoRepository;

import java.util.List;

@RestController
@RequestMapping("/categorias")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoriaController {
    private final CategoriaRepository categoriaRepository;
    private final ProductoRepository productoRepository;

    public CategoriaController(CategoriaRepository categoriaRepository, ProductoRepository productoRepository) {
        this.categoriaRepository = categoriaRepository;
        this.productoRepository = productoRepository;
    }

    @GetMapping
    public List<Categoria> listarCategorias() {
        return categoriaRepository.findAll();
    }

    @PostMapping
    public Categoria crearCategoria(@RequestBody Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarCategoria(@PathVariable Long id,
                                               @RequestParam(defaultValue = "false") boolean forzar) {
        long productosAsociados = productoRepository.countByCategoriaId(id);
        if (productosAsociados > 0 && !forzar) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("La categoría tiene productos asociados. ¿Deseas eliminarla de todos modos?");
        }

        if (forzar || productosAsociados == 0) {
            categoriaRepository.deleteById(id);
            return ResponseEntity.ok("La categoría ha sido eliminada");
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("No se pudo eliminar la categoría");
    }
}
