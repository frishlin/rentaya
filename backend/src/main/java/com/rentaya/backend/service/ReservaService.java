package com.rentaya.backend.service;

import com.rentaya.backend.model.Reserva;
import org.springframework.http.ResponseEntity;

public interface ReservaService {
    ResponseEntity<?>crearReserva(Reserva reserva);
    ResponseEntity<?>cancelarReserva(Long id);
}
