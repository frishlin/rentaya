package com.rentaya.backend.controller;

import com.rentaya.backend.model.Usuario;
import com.rentaya.backend.repository.UsuarioRepository;
import com.rentaya.backend.service.UsuarioService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioRepository usuarioRepository, UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping
        public ResponseEntity<?> registrarUsuario(@RequestBody Usuario usuario) {
            return usuarioService.registrarUsuario(usuario);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUsuario(@RequestBody Usuario datosLogin) {
        return usuarioService.loginUsuario(datosLogin);
    }
}
