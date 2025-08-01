package com.rentaya.backend.controller;

import com.rentaya.backend.model.Producto;
import com.rentaya.backend.model.Reserva;
import com.rentaya.backend.repository.ReservaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/reservas")
public class ReservaController {
    private final ReservaRepository reservaRepository;

    public ReservaController(ReservaRepository reservaRepository) {
        this.reservaRepository = reservaRepository;
    }

    @GetMapping
    public List<Reserva> listaReservas() {
        return reservaRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> crearReserva(@RequestBody Reserva reserva) {

        if(reserva.getFechaInicio() == null || reserva.getFechaFin() == null) {
            return ResponseEntity.badRequest().body("Debes ingresar ambas fechas");
        }
        if(!reserva.getFechaInicio().isBefore(reserva.getFechaFin())) {
            return ResponseEntity.badRequest().body("La fecha de inicio debe ser anterior a la fecha de fin");
        }
        if(reserva.getFechaInicio().isBefore(java.time.LocalDate.now())) {
            return ResponseEntity.badRequest().body("La fecha de inicio no puede ser en el pasado");
        }

        if (reserva.getUsuario() == null || reserva.getUsuario().getId() == null) {
            return ResponseEntity.badRequest().body("El usuario debe estar autenticado para realizar una reserva");
        }

        Reserva nuevaReserva = reservaRepository.save(reserva);
        return ResponseEntity.ok(nuevaReserva);
    }

    @GetMapping("/usuario/{email}")
    public List<Reserva> obtenerReservasPorUsuario(@PathVariable String email) {
        return reservaRepository.findByUsuarioEmail(email);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancelarReserva(@PathVariable Long id) {
        if (!reservaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        reservaRepository.deleteById(id);
        return ResponseEntity.ok("Reserva cancelada correctamente");
    }

    @GetMapping("/producto/{id}")
    public List<Reserva> obtenerReservasPorProducto(@PathVariable Long id) {
        return reservaRepository.findByProductoId(id);
    }
}
