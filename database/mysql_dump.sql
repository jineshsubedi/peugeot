-- MySQL dump 10.13  Distrib 8.0.46, for Linux (x86_64)
--
-- Host: localhost    Database: laravel
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_locks_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dealer_applications`
--

DROP TABLE IF EXISTS `dealer_applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dealer_applications` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `business_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_person` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `showroom_space` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dealer_applications`
--

LOCK TABLES `dealer_applications` WRITE;
/*!40000 ALTER TABLE `dealer_applications` DISABLE KEYS */;
/*!40000 ALTER TABLE `dealer_applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2026_09_11_181326_create_dealer_applications_table',1),(5,'2026_09_11_181326_create_test_rides_table',1),(6,'2026_09_12_000001_create_products_tables',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_colors`
--

DROP TABLE IF EXISTS `product_colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_colors` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `color_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hex_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `accent_hex` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_colors_product_id_foreign` (`product_id`),
  CONSTRAINT `product_colors_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_colors`
--

LOCK TABLES `product_colors` WRITE;
/*!40000 ALTER TABLE `product_colors` DISABLE KEYS */;
INSERT INTO `product_colors` VALUES (1,1,'Matte Adventure Green & Bronze','#2E3B2B','#D4AF37','https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1000&q=80','2026-09-12 13:35:48','2026-09-12 13:35:48'),(2,1,'Satin Shadow Black & Gold','#111111','#EAB308','https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80','2026-09-12 13:35:48','2026-09-12 13:35:48'),(3,1,'Polar White & Cream','#F8FAFC','#D4AF37','https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=80','2026-09-12 13:35:48','2026-09-12 13:35:48'),(4,2,'Ocean Blue & Milky White','#00205B','#F8FAFC','https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80','2026-09-12 13:35:48','2026-09-12 13:35:48'),(5,2,'Bordeaux Cherry Red','#8B0000','#FFFFFF','https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80','2026-09-12 13:35:48','2026-09-12 13:35:48'),(6,2,'Matte Onyx Black','#1C1C1C','#D4AF37','https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80','2026-09-12 13:35:48','2026-09-12 13:35:48'),(7,3,'Dark Emerald Green & Gold','#064E3B','#D4AF37','https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=80','2026-09-12 13:35:48','2026-09-12 13:35:48'),(8,3,'Acid Gold & Mad Black','#EAB308','#090B10','https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=80','2026-09-12 13:35:48','2026-09-12 13:35:48'),(9,3,'Icy White & Racing Red','#DC2626','#FFFFFF','https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=80','2026-09-12 13:35:48','2026-09-12 13:35:48'),(10,3,'Satin Midnight Black','#0F172A','#00A3FF','https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=80','2026-09-12 13:35:48','2026-09-12 13:35:48'),(11,4,'Shark Grey & Acid Cyan','#475569','#00A3FF','https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1000&q=80','2026-09-12 13:35:48','2026-09-12 13:35:48'),(12,4,'Satin Titanium Black','#1F2937','#94A3B8','https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1000&q=80','2026-09-12 13:35:48','2026-09-12 13:35:48'),(13,5,'Antarctica Polar White','#F8FAFC','#00205B','https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80','2026-09-12 13:35:48','2026-09-12 13:35:48'),(14,5,'Onyx Midnight Black','#0F172A','#00A3FF','https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80','2026-09-12 13:35:48','2026-09-12 13:35:48');
/*!40000 ALTER TABLE `product_colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_features`
--

DROP TABLE IF EXISTS `product_features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_features` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_features_product_id_foreign` (`product_id`),
  CONSTRAINT `product_features_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_features`
--

LOCK TABLES `product_features` WRITE;
/*!40000 ALTER TABLE `product_features` DISABLE KEYS */;
INSERT INTO `product_features` VALUES (1,1,'Under-Seat Storage','The Django 125cc features generous under-seat storage that easily fits a jet helmet, combined with a lockable dual glove box and integrated 12V socket for ultimate daily convenience.','https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80','2026-09-12 13:35:48','2026-09-12 13:35:48'),(2,1,'Comfort & Practicality','The Peugeot Django 125cc is designed with optimal rider ergonomics, featuring a plush dual-tone ribbed saddle, spacious legroom, and effortless maneuvering through busy Kathmandu traffic.','https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80','2026-09-12 13:35:48','2026-09-12 13:35:48'),(3,1,'Iconic Neo-Retro Design','Tribute to the legendary 1955 S55 scooter. Featuring polished chrome mirrors, lion signature headlights, vintage motorsports numbers, and French luxury styling.','https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80','2026-09-12 13:35:48','2026-09-12 13:35:48'),(4,3,'Twin LED Projector Headlights','Instantly recognizable on the road, the Speedfight features twin ultra-bright LED projector headlights with 508-inspired lion fang DRL daytime running lights.','https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80','2026-09-12 13:35:48','2026-09-12 13:35:48'),(5,3,'Full Digital LCD Cockpit Display','Comprehensive digital instrument panel displaying speed, trip distance, fuel range, battery level, maintenance alerts, and integrated RAM smartphone holder support.','https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80','2026-09-12 13:35:48','2026-09-12 13:35:48'),(6,3,'A Legacy Of Sport DNA & Handling','Engineered with lightweight sport lattice chassis and Showa gas rear suspension for unmatched precision cornering and high-speed stability.','https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80','2026-09-12 13:35:48','2026-09-12 13:35:48');
/*!40000 ALTER TABLE `product_features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_specifications`
--

DROP TABLE IF EXISTS `product_specifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_specifications` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `spec_group` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `spec_key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `spec_value` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_specifications_product_id_foreign` (`product_id`),
  CONSTRAINT `product_specifications_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_specifications`
--

LOCK TABLES `product_specifications` WRITE;
/*!40000 ALTER TABLE `product_specifications` DISABLE KEYS */;
INSERT INTO `product_specifications` VALUES (1,1,'Engine Type','Engine Type','Air-Cooled 4-Stroke 2-Valve Single Cylinder','2026-09-12 13:35:48','2026-09-12 13:35:48'),(2,1,'Engine Type','Displacement','124.8 cc','2026-09-12 13:35:48','2026-09-12 13:35:48'),(3,1,'Engine Type','Emission Standard','EURO-5','2026-09-12 13:35:48','2026-09-12 13:35:48'),(4,1,'Engine Type','Max. Power (kW/HP)','7.8 kW / 10.6 HP @ 8000 RPM','2026-09-12 13:35:48','2026-09-12 13:35:48'),(5,1,'Engine Type','Max. Torque (N.M/RPM)','9.3 Nm @ 6500 RPM','2026-09-12 13:35:48','2026-09-12 13:35:48'),(6,1,'Engine Type','Fuel Supply','Electronic Injection (EFI)','2026-09-12 13:35:48','2026-09-12 13:35:48'),(7,1,'Engine Type','Fuel Consumption','2.3 L / 100 km','2026-09-12 13:35:48','2026-09-12 13:35:48'),(8,1,'Engine Type','Max. Speed','95 km/h','2026-09-12 13:35:48','2026-09-12 13:35:48'),(9,1,'Trim And Rear Chassis','Front Suspension','Hydraulic Telescopic Fork 32mm','2026-09-12 13:35:48','2026-09-12 13:35:48'),(10,1,'Trim And Rear Chassis','Rear Suspension','Combined Adjustable Hydraulic Shock Absorber','2026-09-12 13:35:48','2026-09-12 13:35:48'),(11,1,'Trim And Rear Chassis','Front Brake','Single ABS Disc 200 mm','2026-09-12 13:35:48','2026-09-12 13:35:48'),(12,1,'Trim And Rear Chassis','Rear Brake','SBC Synchro Disc 190 mm','2026-09-12 13:35:48','2026-09-12 13:35:48'),(13,1,'Trim And Rear Chassis','Front Tyre','120/70-12 Tubeless','2026-09-12 13:35:48','2026-09-12 13:35:48'),(14,1,'Trim And Rear Chassis','Rear Tyre','120/70-12 Tubeless','2026-09-12 13:35:48','2026-09-12 13:35:48'),(15,1,'Dimensions','Length x Width x Height','1925 x 710 x 1190 mm','2026-09-12 13:35:48','2026-09-12 13:35:48'),(16,1,'Dimensions','Wheelbase','1350 mm','2026-09-12 13:35:48','2026-09-12 13:35:48'),(17,1,'Dimensions','Seat Height','770 mm','2026-09-12 13:35:48','2026-09-12 13:35:48'),(18,1,'Dimensions','Dry Weight','129 kg','2026-09-12 13:35:48','2026-09-12 13:35:48'),(19,1,'Dimensions','Fuel Tank Capacity','8.5 Litres','2026-09-12 13:35:48','2026-09-12 13:35:48'),(20,1,'Others','Lighting','Full LED Lion Signature DRL','2026-09-12 13:35:48','2026-09-12 13:35:48'),(21,1,'Others','Instrument Cluster','Analog-Digital Neo-Retro Display','2026-09-12 13:35:48','2026-09-12 13:35:48'),(22,1,'Others','Glove Box','Lockable Dual Compartment with 12V USB Charger','2026-09-12 13:35:48','2026-09-12 13:35:48'),(23,3,'Engine Type','Engine Type','SmartMotion Liquid Cooled 4-Stroke EFI','2026-09-12 13:35:48','2026-09-12 13:35:48'),(24,3,'Engine Type','Displacement','124.8 cc / 149.6 cc','2026-09-12 13:35:48','2026-09-12 13:35:48'),(25,3,'Engine Type','Max. Power (kW/HP)','9.3 kW / 11.0 HP @ 8000 RPM','2026-09-12 13:35:48','2026-09-12 13:35:48'),(26,3,'Engine Type','Max. Torque (N.M)','13.2 N.m @ 6500 RPM','2026-09-12 13:35:48','2026-09-12 13:35:48'),(27,3,'Engine Type','Fuel System','Electronic Injection','2026-09-12 13:35:48','2026-09-12 13:35:48'),(28,3,'Engine Type','Max Speed','100 km/h','2026-09-12 13:35:48','2026-09-12 13:35:48'),(29,3,'Trim And Rear Chassis','Front Suspension','Inverted Telescopic Hydraulic Fork','2026-09-12 13:35:48','2026-09-12 13:35:48'),(30,3,'Trim And Rear Chassis','Rear Shock','Showa Rear Gas-Charged Mono-Shock','2026-09-12 13:35:48','2026-09-12 13:35:48'),(31,3,'Trim And Rear Chassis','Front Brake','Shuricane Radial Wave Disc 215 mm','2026-09-12 13:35:48','2026-09-12 13:35:48'),(32,3,'Trim And Rear Chassis','Rear Brake','Wave Disc 190 mm with SBC Safety','2026-09-12 13:35:48','2026-09-12 13:35:48'),(33,3,'Dimensions','Length x Width x Height','1895 x 700 x 1150 mm','2026-09-12 13:35:48','2026-09-12 13:35:48'),(34,3,'Dimensions','Seat Height','800 mm','2026-09-12 13:35:48','2026-09-12 13:35:48'),(35,3,'Dimensions','Dry Weight','116 kg','2026-09-12 13:35:48','2026-09-12 13:35:48'),(36,3,'Dimensions','Fuel Tank Capacity','8.0 Litres','2026-09-12 13:35:48','2026-09-12 13:35:48'),(37,3,'Others','Display Cockpit','Full Digital LCD Screen with RAM Mount','2026-09-12 13:35:48','2026-09-12 13:35:48'),(38,3,'Others','Headlights','Twin LED Projector Headlights (508 Fang DRL)','2026-09-12 13:35:48','2026-09-12 13:35:48');
/*!40000 ALTER TABLE `product_specifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tagline` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_npr` bigint unsigned NOT NULL,
  `engine` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `power` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `torque` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `top_speed` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fuel_system` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `braking` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `warranty` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mileage` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `badge` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `products_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'django-125-caferacer','Django 125cc Caferacer','Born from 1898 Motorsports Heritage','Neo-Retro (Django)','django',395000,'125 cc EasyMotion EURO-5 EFI','10.6 HP @ 8,000 RPM','9.3 Nm @ 6,500 RPM','95 km/h','EFI (Electronic Fuel Injection)','ABS Front Disc & Rear SBC','3 Years / 30,000 KM','43 km/L','The Peugeot Django 125cc Caferacer is a neo-retro scooter that combines vintage motorsports elegance with modern performance, ideal for riders seeking style, comfort, and everyday practical agility.','https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1000&q=80','Special Motorsports Edition','2026-09-12 13:35:48','2026-09-12 13:35:48'),(2,'django-125-classic','Django 125cc Classic','The Neo-Retro Icon of French Elegance','Neo-Retro (Django)','django',370000,'125 cc 4-Stroke Air-Cooled EURO-5','10.6 HP @ 8,000 RPM','9.3 Nm @ 6,500 RPM','95 km/h','EFI (Electronic Fuel Injection)','SBC Synchro Disc Brakes','3 Years / 30,000 KM','45 km/L','Inspired by the legendary 1955 Peugeot S55, the Django 125 Classic combines vintage French retro aesthetics with EURO-5 EasyMotion EFI technology.','https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80','Most Popular in Kathmandu','2026-09-12 13:35:48','2026-09-12 13:35:48'),(3,'speedfight-4-sport','Speedfight 4+ Sport 125/150','Pure Racing DNA for Urban Conquerors','Sport / Street (Speedfight)','speedfight',345000,'125 cc / 150 cc SmartMotion Liquid Cooled','11.0 HP / 14.5 HP','10.8 Nm / 13.2 Nm','100 km/h','EFI (Electronic Fuel Injection)','Dual SBC Wave Discs','3 Years / 30,000 KM','42 km/L','The 4th generation of Europe\'s iconic sport scooter line. Equipped with twin LED projector headlamps inspired by Peugeot 508 lion fangs, LCD digital instrument cluster, RAM smartphone mount, and Showa gas suspension.','https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=80','Best Sport Scooter','2026-09-12 13:35:48','2026-09-12 13:35:48'),(4,'xp400-gt-maxi','XP400 GT Maxi Adventure','The Ultimate Premium Adventure Crossover','Maxi / Adventure (XP400 / Tweet)','xp400',1450000,'400 cc PowerMotion EURO-5 Liquid Cooled','36.7 HP @ 8,150 RPM','38.1 Nm @ 5,400 RPM','140 km/h','EFI (Electronic Fuel Injection)','Dual Channel ABS + 295mm Twin Wave Discs','3 Years / 50,000 KM','26 km/L','Made in France at Mandeure. The XP400 GT combines high-end GT luxury with adventure capability. Features spoked wheels with Pirelli tires, keyless smart ignition, twin 295mm front wave disc brakes, and full i-Connect navigation.','https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1000&q=80','Flagship Luxury Crossover','2026-09-12 13:35:48','2026-09-12 13:35:48'),(5,'tweet-125-gt','Tweet 125 GT Urban','Agile High-Wheel Comfort for Kathmandu City','Maxi / Adventure (XP400 / Tweet)','xp400',315000,'125 cc EasyMotion EURO-5 EFI','11.5 HP @ 8,500 RPM','10.2 Nm @ 6,500 RPM','96 km/h','EFI (Electronic Fuel Injection)','SBC Front & Rear Disc','3 Years / 30,000 KM','46 km/L','Specifically engineered for cobblestone and uneven city surfaces. Large 16-inch alloy wheels deliver superior stability, while its compact turning radius and flat deck make daily commuting effortlessly smooth.','https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80','Urban Commuter Choice','2026-09-12 13:35:48','2026-09-12 13:35:48');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('0Y0cloWdZAfKkpRpMnXw5THFgsbRZatGlQbWZMTo',1,'172.28.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36','YTo0OntzOjY6Il90b2tlbiI7czo0MDoiQ1BUNzdrMTZib25aaEFBSnpva29DazNWbmJrOTRsUXJDaTVNNUxXYiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMiI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTt9',1789220965),('KS8e33BCf6qA77FTPOkuDROLDa7Bo9KfIIF4bBv8',NULL,'172.28.0.1','curl/8.5.0','YToyOntzOjY6Il90b2tlbiI7czo0MDoiT05NZkt2RlhUY2RDSkhyVHlDRGVFaTA5enhRTmJMTnFNNVQwT25VNyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1789273417),('tdArMFA3YRfivCascxnUlsZwnF2SOXiUu77POQrf',NULL,'172.28.0.1','curl/8.5.0','YTozOntzOjY6Il90b2tlbiI7czo0MDoibXlWU2drU09PdzBGTHlWUlV4RVNDYk5aZUpmeGpWV1p1V0IxMWptaiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMiI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1789220279);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_rides`
--

DROP TABLE IF EXISTS `test_rides`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test_rides` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ride_date` date NOT NULL,
  `need_finance` tinyint(1) NOT NULL DEFAULT '0',
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_rides`
--

LOCK TABLES `test_rides` WRITE;
/*!40000 ALTER TABLE `test_rides` DISABLE KEYS */;
/*!40000 ALTER TABLE `test_rides` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin User','admin@peugeot.com',NULL,'$2y$12$yTPiv5Uh1GbMqi5ApuXNVuMZKzxhQFf5JOwxHmHDbrsH4J7KAQ.GG',NULL,'2026-09-12 13:35:48','2026-09-12 13:35:48');
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

-- Dump completed on 2026-09-13  4:34:19
