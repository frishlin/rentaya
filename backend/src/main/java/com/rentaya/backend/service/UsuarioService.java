package com.rentaya.backend.service;

import com.rentaya.backend.model.Usuario;
import org.springframework.http.ResponseEntity;

public interface UsuarioService {
    ResponseEntity<?>registrarUsuario(Usuario usuario);
    ResponseEntity<?>loginUsuario(Usuario datosLogin);
}
