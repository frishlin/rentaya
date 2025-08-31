package com.rentaya.backend.controller;

import com.rentaya.backend.model.Categoria;
import com.rentaya.backend.repository.CategoriaRepository;
import com.rentaya.backend.service.CategoriaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorias")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoriaController {
    private final CategoriaRepository categoriaRepository;
    private final CategoriaService categoriaService;

    public CategoriaController(CategoriaRepository categoriaRepository, CategoriaService categoriaService) {
        this.categoriaRepository = categoriaRepository;
        this.categoriaService = categoriaService;
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
    public ResponseEntity<?>eliminarCategoria(@PathVariable Long id, @RequestParam(defaultValue = "false") boolean forzar) {
        return categoriaService.eliminarCategoria(id, forzar);
    }
}
