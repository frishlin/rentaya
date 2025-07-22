package com.rentaya.backend.controller;

import com.rentaya.backend.model.Usuario;
import com.rentaya.backend.repository.UsuarioRepository;
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

    private final UsuarioRepository usuarioRepository;

    public UsuarioController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping
        public ResponseEntity<?> registrarUsuario(@RequestBody Usuario usuario) {
        try{
            Usuario nuevoUsuario = usuarioRepository.save(usuario);
            return ResponseEntity.ok(nuevoUsuario);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Ya existe un usuario registrado con este email.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUsuario(@RequestBody Usuario datosLogin) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findByEmail(datosLogin.getEmail());
        if(usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();
            if(usuario.getContrasenia().equals(datosLogin.getContrasenia())) {
                return ResponseEntity.ok(usuario);
            } else {

                Map<String, String> respuesta = new HashMap<>();
                respuesta.put("mensaje", "La contraseña es incorrecta");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(respuesta);
            }
        } else {
            Map<String, String> respuesta = new HashMap<>();
            respuesta.put("mensaje", "El usuario no se encuentra registrado");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("El usuario no está registrado.");
        }
    }
}
