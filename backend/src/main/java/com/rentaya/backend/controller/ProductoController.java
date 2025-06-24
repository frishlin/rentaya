package com.rentaya.backend.controller;

import com.rentaya.backend.model.Producto;
import com.rentaya.backend.repository.ProductoRepository;
import com.rentaya.backend.service.ProductoService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/productos")
public class ProductoController {

    private final ProductoRepository productoRepository;
    private final ProductoService productoService;

    public ProductoController(ProductoRepository productoRepository, ProductoService productoService) {
        this.productoRepository = productoRepository;
        this.productoService = productoService;
    }

    @GetMapping
    public List<Producto> obtenerProductos() {
        return productoRepository.findAll();
    }

    @PostMapping
    public Producto crearProducto(@RequestBody Producto producto) {
        return productoRepository.save(producto);
    }

    @DeleteMapping("/{id}")
    public void eliminarProducto(@PathVariable Long id) {
        productoRepository.deleteById(id);
    }

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

    @GetMapping("/disponibles")
    public ResponseEntity<List<Producto>>obtenerProductosDisponibles(
            @RequestParam("inicio") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate inicio,
            @RequestParam("fin") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fin) {
        List<Producto> disponibles = productoService.obtenerProductosDisponibles(inicio, fin);
        return ResponseEntity.ok(disponibles);
    }

}
