package com.rentaya.backend.controller;

import com.rentaya.backend.model.Reserva;
import com.rentaya.backend.repository.ReservaRepository;
import com.rentaya.backend.service.ReservaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/reservas")
public class ReservaController {
    private final ReservaRepository reservaRepository;
    private final ReservaService reservaService;

    public ReservaController(ReservaRepository reservaRepository, ReservaService reservaService) {
        this.reservaRepository = reservaRepository;
        this.reservaService = reservaService;
    }

    @GetMapping
    public List<Reserva> listaReservas() {
        return reservaRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> crearReserva(@RequestBody Reserva reserva) {
        return reservaService.crearReserva(reserva);
    }

    @GetMapping("/usuario/{email}")
    public List<Reserva> obtenerReservasPorUsuario(@PathVariable String email) {
        return reservaRepository.findByUsuarioEmail(email);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancelarReserva(@PathVariable Long id) {
        return reservaService.cancelarReserva(id);
    }

    @GetMapping("/producto/{id}")
    public List<Reserva> obtenerReservasPorProducto(@PathVariable Long id) {
        return reservaRepository.findByProductoId(id);
    }
}
