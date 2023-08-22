-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-05-2023 a las 23:55:44
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `isdm_paginacion_datatables`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `barrios`
--

CREATE TABLE `barrios` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `zona_id` int(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `barrios`
--

INSERT INTO `barrios` (`id`, `nombre`, `zona_id`) VALUES
(1, 'Castañares', 1),
(2, '17 de Octubre', 1),
(3, 'Huaico II', 1),
(4, 'Santa Ana I', 2),
(5, 'Santa Ana II', 2),
(6, 'Intersindical', 2),
(7, 'Autodromo', 3),
(8, 'V° Mitre', 3),
(9, 'Constitucion', 3),
(10, 'B° 20 de Febrero', 4),
(11, 'Grand Bourg', 4),
(12, 'V° Luján', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `barrio_id` int(10) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `user_name`, `user_email`, `barrio_id`) VALUES
(1, 'usuario 1', 'usuario1@gmail.com', 1),
(2, 'usuario 2', 'usuario2@gmail.com', 1),
(3, 'usuario 3', 'usuario3@gmail.com', 1),
(4, 'usuario 4', 'usuario4@gmail.com', 1),
(5, 'usuario 5', 'usuario5@gmail.com', 1),
(6, 'usuario 6', 'usuario6@gmail.com', 2),
(7, 'usuario 7', 'usuario7@gmail.com', 2),
(8, 'usuario 8', 'usuario8@gmail.com', 2),
(9, 'usuario 9', 'usuario9@gmail.com', 2),
(10, 'usuario 10', 'usuario10@gmail.com', 3),
(11, 'usuario 11', 'usuario11@gmail.com', 3),
(12, 'usuario 12', 'usuario12@gmail.com', 4),
(13, 'usuario 13', 'usuario13@gmail.com', 3),
(14, 'usuario 14', 'usuario14@gmail.com', 3),
(15, 'usuario 15', 'usuario15@gmail.com', 1),
(16, 'usuario 16', 'usuario16@gmail.com', 3),
(17, 'usuario 17', 'usuario17@gmail.com', 4),
(18, 'usuario 18', 'usuario18@gmail.com', 1),
(19, 'usuario 19', 'usuario19@gmail.com', 4),
(20, 'usuario 20', 'usuario20@gmail.com', 4),
(21, 'usuario 21', 'usuario21@gmail.com', 1),
(22, 'usuario 22', 'usuario22@gmail.com', 1),
(23, 'usuario 23', 'usuario23@gmail.com', 2),
(24, 'usuario 24', 'usuario24@gmail.com', 1),
(25, 'usuario 25', 'usuario25@gmail.com', 2),
(26, 'usuario 26', 'usuario26@gmail.com', 1),
(27, 'usuario 27', 'usuario27@gmail.com', 1),
(28, 'usuario 28', 'usuario28@gmail.com', 1),
(29, 'usuario 29', 'usuario29@gmail.com', 1),
(30, 'usuario 30', 'usuario30@gmail.com', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zonas`
--

CREATE TABLE `zonas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `zonas`
--

INSERT INTO `zonas` (`id`, `nombre`) VALUES
(1, 'Norte'),
(2, 'Sur'),
(3, 'Este'),
(4, 'Oeste');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `barrios`
--
ALTER TABLE `barrios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `zona_id` (`zona_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `zonas`
--
ALTER TABLE `zonas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `barrios`
--
ALTER TABLE `barrios`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de la tabla `zonas`
--
ALTER TABLE `zonas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `barrios`
--
ALTER TABLE `barrios`
  ADD CONSTRAINT `barrios_ibfk_1` FOREIGN KEY (`zona_id`) REFERENCES `zonas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
