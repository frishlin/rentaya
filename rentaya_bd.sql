CREATE DATABASE  IF NOT EXISTS `rentaya` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `rentaya`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: rentaya
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) DEFAULT NULL,
  `imagen_url` varchar(255) DEFAULT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Para quienes buscan velocidad y estilo.','https://cdn.buttercms.com/Uceu8voTSLSZqWIJNynC','Deportivos'),(2,'Autos pequeños y de bajo consumo de gasolina.','https://cdn.prod.website-files.com/5ec85520c4dfff034b036be2/66bd240eca737a507fefcc68_6352dfcb46e90a64f1b72816_WF52295_LITGRE_October2022Content_best%2520selling%2520fuel%2520efficient_body1.webp','Económicos'),(3,'Autos un poco más grandes que los económicos.','https://siempreauto.com/wp-content/uploads/sites/9/2021/09/17229_2021_Rio_5-Door.jpg?resize=1316,740&quality=80','Compactos'),(4,'Para ocasiones especiales o viajes ejecutivos.','https://cdn-images.motor.es/image/m/800w/fotos-noticias/2021/10/comparativa-audi-a4-bmw-serie-3-mercedes-clase-c-202181583-1634207018_10.jpg','De lujo'),(5,'Amigables con el medio ambiente.','https://images.milenio.com/dVt8LkBNHVUpMB96D8Y_waW9lNE=/942x532/uploads/media/2021/04/11/este-fenomeno-esta-relacionado-con.jpeg','Eléctricos / Híbridos'),(6,'Para rutas difíciles o aventuras fuera de carretera.','https://api.carwyapar.com/uploads/Bright_White_81af56b4a8.jpg','Todo Terreno / 4x4'),(7,'De 25 años o más que ha resistido la prueba del tiempo y se considera un ícono de la historia automotriz','https://blog.autochilango.com/wp-content/uploads/2017/04/a18f8-autoantiguo-1.jpg','Clásico');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) DEFAULT NULL,
  `imagen_url` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `categoria_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKodqr7965ok9rwquj1utiamt0m` (`categoria_id`),
  CONSTRAINT `FKodqr7965ok9rwquj1utiamt0m` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (2,'Auto Deportivo.','https://loremcars.ltn.net/i/s/929574189177-046a39b172e15815b9922881719ff161/big/img.jpg','Auto Deportivo',1),(3,'Ideal para parejas','https://loremcars.ltn.net/i/s/929574189177-9eca1560293c6f97c616ada11376028b/big/img.jpg','Auto Clásico',7),(5,'Para viajar solo o en pareja','https://loremcars.ltn.net/i/s/929574189177-9756d56157dd890c7c7585c3d92fa5bb/big/img.jpg','Super clásico',7),(6,'Estilo barbie','https://loremcars.ltn.net/i/s/929574189177-88994705ba633e99c0130687c5659039/big/img.jpg','Auto Deportivo largo',1),(7,'Clásico y familiar','https://loremcars.ltn.net/i/s/929574189177-044dc5ee0e9eb2fe1bebec036ae942fd/big/img.jpg','Jeep',6),(8,'Auto veloz','https://cdn.forbes.com.mx/2020/04/b_image_2_front_track_jpg-768x433.jpg','Auto Deportivo',1),(9,'Para parejas','https://loremcars.ltn.net/i/s/929574189177-63dc5270de55940c7de6e9eb5da046e4/big/img.jpg','Camioneta para dos personas y un perro.',6),(11,'Versión eléctrica','https://img.remediosdigitales.com/d0d53e/bmw-x2/1366_2000.jpeg','BMW X2 / iX2',5),(13,'Pequeño y eléctrico','https://img.remediosdigitales.com/359966/byd-seagull/1366_2000.jpg','BYD Seagull',5),(14,'Eléctrico de enorme batería','https://img.remediosdigitales.com/d16023/cadillac-escalade-iq/1366_2000.jpeg','Cadillac Escalade iQ',5),(16,'Potencia, rapidez y lujo','https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/6B34/production/_94244472_9.jpg.webp','Bugatti',4),(17,'El mejor equipamiento','https://img.remediosdigitales.com/b3b2af/buick-envision/1366_2000.jpg','Buick Envision',1),(18,'De época','https://loremcars.ltn.net/i/s/929574189177-0ef997c0d84c398efcee75e6eeb1dce3/big/img.jpg','Clásico descapotable',7),(19,'Con una conducción totalmente eléctrica hasta 25km.','https://images0.autocasion.com/unsafe/820x/filters:watermark(watermark.png,-30,-30,0):format(jpeg):quality(80)/ad/13/1288/5f287da7e883d8a8cc37abc84f4f5f6d2368210b.jpeg','Ferrari 296 GTB',5),(20,'Para quienes no paran de desafiarse, Chevrolet Aveo Hatchback se muestra más moderno, único y listo para adueñarse de la atención.','https://www.chevrolet.com.mx/content/dam/chevrolet/na/mx/es/index/cars/2025-aveo-hb/colorizer/jellies/rojo-metalico.jpg?imwidth=3000','Chevrolet Aveo Hatchback.',3);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reserva`
--

DROP TABLE IF EXISTS `reserva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reserva` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_fin` date DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `producto_id` bigint(20) DEFAULT NULL,
  `usuario_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKnh6tntdsfc76618c8sxxrxn7t` (`producto_id`),
  KEY `FKiad9w96t12u3ms2ul93l97mel` (`usuario_id`),
  CONSTRAINT `FKiad9w96t12u3ms2ul93l97mel` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`),
  CONSTRAINT `FKnh6tntdsfc76618c8sxxrxn7t` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserva`
--

LOCK TABLES `reserva` WRITE;
/*!40000 ALTER TABLE `reserva` DISABLE KEYS */;
INSERT INTO `reserva` VALUES (2,'2025-06-23','2025-06-21',2,1),(10,'2025-06-26','2025-06-21',6,1),(11,'2025-06-28','2025-06-25',11,4),(14,'2025-06-28','2025-06-24',11,2),(15,'2025-06-25','2025-06-24',2,16),(16,'2025-07-04','2025-07-01',17,16),(18,'2025-07-12','2025-07-08',3,14),(20,'2025-07-10','2025-07-01',18,12);
/*!40000 ALTER TABLE `reserva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `contrasenia` varchar(255) NOT NULL,
  `rol` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Sofía García','sofia.garcia@email.com','123456','USER'),(2,'Golda López','golda.lopez@email.com','654321','USER'),(4,'Golda Juárez','golda.juarez@email.com','654321','USER'),(11,'sofía','sofi@gmail.com','11','USER'),(12,'sf','sdf@d.com','22','USER'),(13,'Carmen Salinas','carmensita@email.com','123','USER'),(14,'Daniel','daniel@email.com','123','USER'),(15,'Golda','goldita@email.com','1234','USER'),(16,'Jorge','jorge@jorgito.com','456','ADMIN'),(17,'Otsin','otsin@email.com','123','USER'),(19,'ot2','ot2@gmail.com','123','USER'),(20,'hola','hola@email.com','123','USER'),(22,'Síkis','sikis@miau.com','miau','USER');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-22 13:23:31
