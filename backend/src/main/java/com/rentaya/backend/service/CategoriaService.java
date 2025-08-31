package com.rentaya.backend.service;

import org.apache.catalina.connector.Response;
import org.springframework.http.ResponseEntity;

public interface CategoriaService {
    ResponseEntity<?> eliminarCategoria(Long id, boolean forzar);
}
