package com.rentaya.backend.service;

import com.rentaya.backend.model.Usuario;
import com.rentaya.backend.repository.UsuarioRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UsuarioServiceImpl implements UsuarioService {
    private final UsuarioRepository usuarioRepository;

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public ResponseEntity<?> registrarUsuario(Usuario usuario) {
        try {
            Usuario nuevoUsuario = usuarioRepository.save(usuario);
            Usuario respuesta = new Usuario();
            respuesta.setId(nuevoUsuario.getId());
            respuesta.setNombre(nuevoUsuario.getNombre());
            respuesta.setEmail(nuevoUsuario.getEmail());
            respuesta.setRol(nuevoUsuario.getRol());

            return ResponseEntity.ok(respuesta);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Ya existe un usuario registrado con este email.");
        }
    }

    @Override
    public ResponseEntity<?> loginUsuario(Usuario datosLogin) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findByEmail(datosLogin.getEmail());
        if (usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();
            if (usuario.getContrasenia().equals(datosLogin.getContrasenia())) {
                // Sanitizar respuesta (no enviar contraseña)
                Usuario respuesta = new Usuario();
                respuesta.setId(usuario.getId());
                respuesta.setNombre(usuario.getNombre());
                respuesta.setEmail(usuario.getEmail());
                respuesta.setRol(usuario.getRol());
                return ResponseEntity.ok(respuesta);
            } else {
                Map<String, String> resp = new HashMap<>();
                resp.put("mensaje", "La contraseña es incorrecta");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(resp);
            }
        } else {
            Map<String, String> resp = new HashMap<>();
            resp.put("mensaje", "El usuario no se encuentra registrado");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(resp);
        }
    }
}