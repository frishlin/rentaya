package com.rentaya.backend.service;

import com.rentaya.backend.model.Reserva;
import com.rentaya.backend.repository.ReservaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class ReservaServiceImpl implements ReservaService{
    private final ReservaRepository reservaRepository;

    public ReservaServiceImpl(ReservaRepository reservaRepository) {
        this.reservaRepository = reservaRepository;
    }

    @Override
    public ResponseEntity<?> crearReserva(Reserva reserva) {
        if (reserva.getFechaInicio() == null || reserva.getFechaFin() == null) {
            return ResponseEntity.badRequest().body("Debes ingresar ambas fechas");
        }
        if (!reserva.getFechaInicio().isBefore(reserva.getFechaFin())) {
            return ResponseEntity.badRequest().body("La fecha de inicio debe ser anterior a la fecha de fin");
        }
        if (reserva.getFechaInicio().isBefore(LocalDate.now())) {
            return ResponseEntity.badRequest().body("La fecha de inicio no puede ser en el pasado");
        }
        if (reserva.getUsuario() == null || reserva.getUsuario().getId() == null) {
            return ResponseEntity.badRequest().body("El usuario debe estar autenticado para realizar una reserva");
        }

        Long productoId = (reserva.getProducto() != null) ? reserva.getProducto().getId() : null;
        if (productoId == null) {
            return ResponseEntity.badRequest().body("Debes indicar el producto a reservar");
        }
        boolean haySolape = reservaRepository.existsSolapada(
                productoId,
                reserva.getFechaInicio(),
                reserva.getFechaFin()
        );
        if (haySolape) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("El vehículo ya tiene una reserva en esas fechas. Por favor elige otro rango.");
        }


        Reserva nuevaReserva = reservaRepository.save(reserva);
        return ResponseEntity.ok(nuevaReserva);
    }

    @Override
    public ResponseEntity<?> cancelarReserva(Long id) {
        if (!reservaRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        reservaRepository.deleteById(id);
        return ResponseEntity.ok("Reserva cancelada correctamente");
    }
}
