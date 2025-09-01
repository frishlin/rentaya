
CREATE TABLE IF NOT EXISTS categoria (
  id BIGINT NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(255) NOT NULL,
  descripcion VARCHAR(255),
  imagen_url VARCHAR(255),
  PRIMARY KEY (id),
  UNIQUE KEY uq_categoria_titulo (titulo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS producto (
  id BIGINT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  descripcion VARCHAR(255),
  imagen_url VARCHAR(255),
  categoria_id BIGINT,
  PRIMARY KEY (id),
  UNIQUE KEY uq_producto_nombre (nombre),
  KEY idx_producto_categoria (categoria_id),
  CONSTRAINT fk_producto_categoria
    FOREIGN KEY (categoria_id) REFERENCES categoria (id)
      ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS usuario (
  id BIGINT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  contrasenia VARCHAR(255) NOT NULL,
  rol VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_usuario_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS reserva (
  id BIGINT NOT NULL AUTO_INCREMENT,
  fecha_inicio DATE,
  fecha_fin DATE,
  producto_id BIGINT,
  usuario_id BIGINT,
  PRIMARY KEY (id),
  KEY idx_reserva_producto (producto_id),
  KEY idx_reserva_usuario (usuario_id),
  CONSTRAINT fk_reserva_producto
    FOREIGN KEY (producto_id) REFERENCES producto (id)
      ON UPDATE CASCADE ON DELETE SET NULL,
  CONSTRAINT fk_reserva_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuario (id)
      ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;