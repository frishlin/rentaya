package com.rentaya.backend.controller;

import com.rentaya.backend.model.Producto;
import com.rentaya.backend.repository.ProductoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/productos")
public class ProductoController {

    private final ProductoRepository productoRepository;

    public ProductoController(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    // Para listar productos
    @GetMapping
    public List<Producto> obtenerProductos() {
        return productoRepository.findAll();
    }

    // Para agregar productos
    @PostMapping
    public Producto crearProducto(@RequestBody Producto producto) {
        return productoRepository.save(producto);
    }

    // Para eliminar por ID
    @DeleteMapping("/{id}")
    public void eliminarProducto(@PathVariable Long id) {
        productoRepository.deleteById(id);
    }

    //Para modificar
    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizarProducto(@PathVariable Long id, @RequestBody Producto productoNuevo) {
        return productoRepository.findById(id)
                .map(producto -> {
                    producto.setNombre(productoNuevo.getNombre());
                    producto.setDescripcion(productoNuevo.getDescripcion());
                    producto.setImagenUrl(productoNuevo.getImagenUrl());
                    producto.setCategoria(productoNuevo.getCategoria());
                    return ResponseEntity.ok(productoRepository.save(producto));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/buscar")
    public  List<Producto> buscarProductos(@RequestParam(required = false) String nombre) {
        if(nombre != null && !nombre.isEmpty()) {
            return productoRepository.findByNombreContainingIgnoreCase(nombre);
        } else {
            return productoRepository.findAll();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerProductoPorId(@PathVariable Long id) {
        return productoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}
