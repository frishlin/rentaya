package com.rentaya.backend.repository;

import com.rentaya.backend.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ReservaRepository extends JpaRepository<Reserva, Long> {
}
