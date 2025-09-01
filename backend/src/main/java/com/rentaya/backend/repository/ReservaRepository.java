package com.rentaya.backend.repository;

import com.rentaya.backend.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;


public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    List<Reserva> findByUsuarioEmail(String email);
    List<Reserva> findByProductoId(Long id);

    @Query("""
        SELECT CASE WHEN COUNT(r) > 0 THEN TRUE ELSE FALSE END
        FROM Reserva r
        WHERE r.producto.id = :productoId
          AND :inicio < r.fechaFin
          AND :fin > r.fechaInicio
    """)
    boolean existsSolapada(Long productoId, LocalDate inicio, LocalDate fin);
}
