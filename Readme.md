# RentaYa

RentaYa es un sistema web de renta de autos. 

Este sistema pemite a usuarios explorar vehículos disponibles para renta. Permite el registro de usuarios para realizar reservas y, cuando existe, permite acceder al historial de reservas y favoritos. Además, incluye un panel de Administrador, que solo es visible para los usuarios con el este rol (ADMIN), que permite gestionar productos y categorías. 

RentaYa se desarrolló en 4 sprints, los cuales se describen brevemente:
* Sprint 1: Estructura inicial y gestión de productos. Se diseñó la interfaz base que incluyó encabezado, cuerpo y pie de página; se creó el panel de Administración y se implementó el registro, visualización y eliminación de productos.
* Sprint 2: Registro, login y categorías. Se creó el registro e inicio de sesión de usuarios, la gestión de categorías desde el panel de administración y la asignación de categorías a los productos.
* Sprint 3: Búsqueda y favoritos. Se desarrolló el buscador por fechas y nombre, la validación de disponibilidad, y la funcionalidad para marcar y listar favoritos, así como eliminar categorías.
* Sprint 4: Reservas y funcionalidades finales. Se implementó el sistema de reservas con selección de fechas y el historial de reservas del usuario autentificado. 


## Tecnologías utilizadas
* Backend: Java + Spring Boot
* Fronted: React + Vite
* Base de datos: MySQL

## Variables de entorno
Antes de ejecutar el backend, se debe asegurar de configurar las siguientes propiedades en el archivo `application.properties`:

`spring.datasource.url=jdbc:mysql://localhost:3306/rentaya`

`spring.datasource.username=TU_USUARIO`

`spring.datasource.password=TU_PASSWORD`

`spring.jpa.hibernate.ddl-auto=update`

Se debe reemplazar `TU_USUARIO` y `TU_PASSWORD` por el usuario y contraseña real en MySQL

## Conexión entre Frontend y Backend
El sistema ya se encuentra configurado para conectarse al Backend a través de la siguiente URL: http://localhost:8080


## Para levantar el proyecto

Se debe asegurar de que el backend esté corriendo antes de iniciar el frontend.

### Backend
1. Verificar que el servicio MySQL, se encuentra corriendo.
2. Abrir el proyecto backend en el IDE (por ejemplo IntelliJ).
3. Configurar las propiedades de conexión a la base de datos.
4. Ejecutar la clase principal `BackendApplication`

### Frontend
1. Abrir una terminal y posicionarse en la carpeta `frontend`.
2. Instalar las dependencias ejecutando el comando `npm install`.
3. Iniciar el servidor con el comando `npm run dev`.

Esto último debe abrir el frontend en la URL: http://localhost:5173

** Nota: Solo los usuarios con rol ADMIN pueden visualizar y acceder al panel de administración **
