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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'Ideal para familias grandes','https://loremcars.ltn.net/i/s/929574189177-7c257cc13920d4bb36383f72bf2da632/big/img.jpg','Auto Todoterreno'),(2,'Auto Deportivo','https://loremcars.ltn.net/i/s/929574189177-046a39b172e15815b9922881719ff161/big/img.jpg','Auto Deportivo'),(3,'Ideal para parejas','https://loremcars.ltn.net/i/s/929574189177-9eca1560293c6f97c616ada11376028b/big/img.jpg','Auto Clásico'),(4,'De época','https://loremcars.ltn.net/i/s/929574189177-0ef997c0d84c398efcee75e6eeb1dce3/big/img.jpg','Muy clásico descapotable'),(5,'Para viajar solo o en pareja','https://loremcars.ltn.net/i/s/929574189177-9756d56157dd890c7c7585c3d92fa5bb/big/img.jpg','Super clásico'),(6,'Estilo barbie','https://loremcars.ltn.net/i/s/929574189177-88994705ba633e99c0130687c5659039/big/img.jpg','Auto Deportivo largo'),(7,'Clásico y familiar','https://loremcars.ltn.net/i/s/929574189177-044dc5ee0e9eb2fe1bebec036ae942fd/big/img.jpg','Jeep'),(8,'Auto veloz','https://loremcars.ltn.net/i/s/929574189177-046a39b172e15815b9922881719ff161/big/img.jpg','Auto Deportivo'),(9,'Para parejas','https://loremcars.ltn.net/i/s/929574189177-63dc5270de55940c7de6e9eb5da046e4/big/img.jpg','Camioneta para dos');
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Sofía García','sofia.garcia@email.com','123456'),(2,'Golda López','golda.lopez@email.com','654321'),(4,'Golda Juárez','golda.juarez@email.com','654321'),(8,NULL,'correo@ejemplo.com','123456'),(11,'sofía','sofi@gmail.com','11'),(12,'sf','sdf@d.com','22');
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

-- Dump completed on 2025-05-03  7:40:31
