CREATE DATABASE  IF NOT EXISTS `arguments` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `arguments`;
-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: arguments
-- ------------------------------------------------------
-- Server version	5.7.26

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
-- Table structure for table `argument_premises`
--

DROP TABLE IF EXISTS `argument_premises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `argument_premises` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `argument_id` int(11) NOT NULL,
  `type` enum('PREMISE','CONCLUSION') NOT NULL DEFAULT 'PREMISE',
  `description` text NOT NULL,
  `form` varchar(50) NOT NULL,
  `sentential_letters` varchar(45) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_argument_premise_Argument1_idx` (`argument_id`),
  CONSTRAINT `fk_argument_premise_Argument1` FOREIGN KEY (`argument_id`) REFERENCES `arguments` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `argument_premises`
--

LOCK TABLES `argument_premises` WRITE;
/*!40000 ALTER TABLE `argument_premises` DISABLE KEYS */;
INSERT INTO `argument_premises` VALUES (28,12,'PREMISE','Se o avião não tivesse caído, nós teríamos feito contato pelo rádio.','¬C->R','C, R','2019-11-14 17:23:45','2019-11-14 17:23:45'),(30,12,'CONCLUSION','Portanto, o avião caiu.','C','C','2019-11-14 17:24:18','2019-11-14 17:24:18'),(31,13,'PREMISE','Ela não está em casa ou não está atendendo ao telefone.','¬Cv¬T','C, T','2019-11-14 17:49:26','2019-11-14 17:49:26'),(32,13,'PREMISE',' Mas, se ela não está em casa, então ela foi seqüestrada. ','¬C->S','C, S','2019-11-14 17:49:41','2019-11-14 17:49:41'),(33,13,'PREMISE','E se ela não está atendendo ao telefone, ela está correndo algum outro perigo. ','¬T->P','T, P','2019-11-14 17:49:55','2019-11-14 17:49:55'),(34,13,'CONCLUSION',' Portanto, ou ela foi seqüestrada ou ela está correndo um outro perigo.','SvP','S, P','2019-11-14 17:50:12','2019-11-14 17:50:12'),(35,14,'PREMISE','Hoje é um fim de semana somente se hoje é sábado ou domingo.','F<->(SvD)','F, S, D','2019-11-14 17:50:52','2019-11-14 17:50:52'),(36,14,'PREMISE',' Hoje não é sábado. ','¬S','S','2019-11-14 17:51:06','2019-11-14 17:51:06'),(37,14,'PREMISE','Hoje não é domingo. ','¬D','D','2019-11-14 17:51:20','2019-11-14 17:51:20'),(38,14,'CONCLUSION','Portanto, hoje não é um fim de semana.','¬F','F','2019-11-14 17:51:35','2019-11-14 17:51:35');
/*!40000 ALTER TABLE `argument_premises` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `arguments`
--

DROP TABLE IF EXISTS `arguments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `arguments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `description` text NOT NULL,
  `form` varchar(50) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Arguments_Users_idx` (`user_id`),
  CONSTRAINT `fk_Arguments_Users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arguments`
--

LOCK TABLES `arguments` WRITE;
/*!40000 ALTER TABLE `arguments` DISABLE KEYS */;
INSERT INTO `arguments` VALUES (12,1,'Se o avião não tivesse caído, nós teríamos feito contato pelo rádio. Não fizemos contato pelo rádio. Portanto, o avião caiu.',' ¬C -> R,¬R |-  C','2019-11-14 17:23:27','2019-11-14 17:23:27'),(13,1,'Ela não está em casa ou não está atendendo ao telefone. Mas, se ela não está em casa, então ela foi seqüestrada. E se ela não está atendendo ao telefone, ela está correndo algum outro perigo. Portanto, ou ela foi seqüestrada ou ela está correndo um outro perigo.',' ¬C v ¬T, ¬C -> S, ¬T ->P |- S v P','2019-11-14 17:38:42','2019-11-14 17:38:42'),(14,1,'Hoje é um fim de semana somente se hoje é sábado ou domingo. Hoje não é sábado. Hoje não é domingo. Portanto, hoje não é um fim de semana.',' F<->(S v D), ¬S, ¬D ⊢  ¬F','2019-11-14 17:49:00','2019-11-14 17:49:00');
/*!40000 ALTER TABLE `arguments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `responses`
--

DROP TABLE IF EXISTS `responses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `responses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `argument_id` int(11) NOT NULL,
  `time_spent` int(11) NOT NULL DEFAULT '0',
  `exe_hash` varchar(255) NOT NULL,
  `token` text NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Responses_Arguments1_idx` (`argument_id`),
  CONSTRAINT `fk_Responses_Arguments1` FOREIGN KEY (`argument_id`) REFERENCES `arguments` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `responses`
--

LOCK TABLES `responses` WRITE;
/*!40000 ALTER TABLE `responses` DISABLE KEYS */;
INSERT INTO `responses` VALUES (39,12,10,'fdiusdfhgsdufghlsidufghsdfug','akjfsdhaslivhaçosdifaosihgçaoshgçaosi','2019-11-17 05:38:08','2019-11-17 05:38:08'),(40,13,94,'58e9bebd-78bd-492c-a18a-59b18558dc61','28ba30e766ce141ac23e14c1e7ddc199k/otbBkKFgmMi0MlJGLym8U6eJVF79Jw57YetVQPmlaxeQaLmrxyJ6sk31Xx32aU','2019-11-18 13:24:56','2019-11-18 13:24:56'),(41,13,123,'58e9bebd-78bd-492c-a18a-59b18558dc61','28ba30e766ce141ac23e14c1e7ddc199k/otbBkKFgmMi0MlJGLym8U6eJVF79Jw57YetVQPmlaxeQaLmrxyJ6sk31Xx32aU','2019-11-18 13:28:52','2019-11-18 13:28:52'),(42,13,84,'58e9bebd-78bd-492c-a18a-59b18558dc61','28ba30e766ce141ac23e14c1e7ddc199k/otbBkKFgmMi0MlJGLym8U6eJVF79Jw57YetVQPmlaxeQaLmrxyJ6sk31Xx32aU','2019-11-18 13:36:25','2019-11-18 13:36:25'),(43,13,45,'58e9bebd-78bd-492c-a18a-59b18558dc61','28ba30e766ce141ac23e14c1e7ddc199k/otbBkKFgmMi0MlJGLym8U6eJVF79Jw57YetVQPmlaxeQaLmrxyJ6sk31Xx32aU','2019-11-18 17:11:05','2019-11-18 17:11:05'),(44,13,61,'58e9bebd-78bd-492c-a18a-59b18558dc61','28ba30e766ce141ac23e14c1e7ddc199k/otbBkKFgmMi0MlJGLym8U6eJVF79Jw57YetVQPmlaxeQaLmrxyJ6sk31Xx32aU','2019-11-18 17:13:19','2019-11-18 17:13:19'),(45,13,57,'58e9bebd-78bd-492c-a18a-59b18558dc61','28ba30e766ce141ac23e14c1e7ddc199k/otbBkKFgmMi0MlJGLym8U6eJVF79Jw57YetVQPmlaxeQaLmrxyJ6sk31Xx32aU','2019-11-18 17:14:54','2019-11-18 17:14:54'),(46,13,28,'58e9bebd-78bd-492c-a18a-59b18558dc61','28ba30e766ce141ac23e14c1e7ddc199k/otbBkKFgmMi0MlJGLym8U6eJVF79Jw57YetVQPmlaxeQaLmrxyJ6sk31Xx32aU','2019-11-18 17:16:34','2019-11-18 17:16:34'),(47,13,40,'58e9bebd-78bd-492c-a18a-59b18558dc61','28ba30e766ce141ac23e14c1e7ddc199k/otbBkKFgmMi0MlJGLym8U6eJVF79Jw57YetVQPmlaxeQaLmrxyJ6sk31Xx32aU','2019-11-18 22:16:01','2019-11-18 22:16:01'),(48,13,42,'58e9bebd-78bd-492c-a18a-59b18558dc61','28ba30e766ce141ac23e14c1e7ddc199k/otbBkKFgmMi0MlJGLym8U6eJVF79Jw57YetVQPmlaxeQaLmrxyJ6sk31Xx32aU','2019-11-18 22:16:03','2019-11-18 22:16:03'),(49,13,42,'58e9bebd-78bd-492c-a18a-59b18558dc61','28ba30e766ce141ac23e14c1e7ddc199k/otbBkKFgmMi0MlJGLym8U6eJVF79Jw57YetVQPmlaxeQaLmrxyJ6sk31Xx32aU','2019-11-18 22:16:03','2019-11-18 22:16:03'),(50,13,42,'58e9bebd-78bd-492c-a18a-59b18558dc61','28ba30e766ce141ac23e14c1e7ddc199k/otbBkKFgmMi0MlJGLym8U6eJVF79Jw57YetVQPmlaxeQaLmrxyJ6sk31Xx32aU','2019-11-18 22:16:03','2019-11-18 22:16:03'),(51,12,19,'e6103860-47f8-43ed-aae1-b55dc8232c36','86daa8034b6de5637aa75f8dbeecd629cZXpmjnGpTHjCumW5HQreuOgiJgrx2shX3fLiDduiXJlKXXKFbN/CTBavhCH/z3C','2019-11-29 01:36:39','2019-11-29 01:36:39'),(52,12,14,'d6b3a4c5-f3d8-4d1d-b68e-22b3811e1c8a','581fc2b36d43a4c6be866e1e663abaa13n2C3ZF2T/Sz11o/hFbmX8Sh0cTaZsnCycN2t17/uUYOOfSKe5ULn+VyZIxbSVer','2019-11-29 02:17:06','2019-11-29 02:17:06'),(53,13,46,'e751e0cb-8e98-4378-8d20-84e08b8e5d08','581fc2b36d43a4c6be866e1e663abaa13n2C3ZF2T/Sz11o/hFbmX8Sh0cTaZsnCycN2t17/uUYOOfSKe5ULn+VyZIxbSVer','2019-11-29 02:19:07','2019-11-29 02:19:07'),(54,14,37,'eec90402-6060-4650-b8f7-26a01320df06','581fc2b36d43a4c6be866e1e663abaa13n2C3ZF2T/Sz11o/hFbmX8Sh0cTaZsnCycN2t17/uUYOOfSKe5ULn+VyZIxbSVer','2019-11-29 02:21:45','2019-11-29 02:21:45'),(55,12,16,'d6b3a4c5-f3d8-4d1d-b68e-22b3811e1c8a','320c531858104dafbe754ce5c890d6927JAR0d962KioRfAp5wOvqxzmUaHldCOdDWcRjdyx7YnmMFUB1VofGA8LRcj5+jgw','2019-11-29 02:24:49','2019-11-29 02:24:49');
/*!40000 ALTER TABLE `responses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(32) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'erick','erick@gmail.com','123456','2019-11-12 17:32:33',NULL),(2,'admin','admin@admin.com','123456','2019-11-13 01:01:17',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-30 18:40:42
