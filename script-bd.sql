CREATE DATABASE rentaya;
USE rentaya;
SHOW DATABASES;
SHOW TABLES;
USE rentaya;


CREATE TABLE producto (
    id BIGINT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(255),
    descripcion VARCHAR(255),
    imagen_url VARCHAR(255),
    primary key(id)
);

DROP TABLE producto;
SELECT * FROM producto;
TRUNCATE table producto;

CREATE TABLE usuario (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contrasenia VARCHAR(255) NOT NULL
);

SELECT * FROM usuario;
DESC usuario;
SHOW COLUMNS FROM usuario;

