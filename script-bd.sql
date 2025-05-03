CREATE DATABASE IF NOT EXISTS rentaya;
USE rentaya;

CREATE TABLE IF NOT EXISTS producto (
    id BIGINT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(255),
    descripcion VARCHAR(255),
    imagen_url VARCHAR(255),
    primary key(id)
);

CREATE TABLE IF NOT EXISTS usuario (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contrasenia VARCHAR(255) NOT NULL
);
