package com.rentaya.backend.repository;

import com.rentaya.backend.model.Producto;
import com.rentaya.backend.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    List<Reserva> findByUsuarioEmail(String email);

}
