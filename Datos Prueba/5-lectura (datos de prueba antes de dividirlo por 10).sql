-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 25-04-2019 a las 10:52:04
-- Versión del servidor: 5.7.24
-- Versión de PHP: 7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bdsistemamce`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lectura`
--

DROP TABLE IF EXISTS `lectura`;
CREATE TABLE IF NOT EXISTS `lectura` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Irms` decimal(18,10) NOT NULL,
  `FechaHora` datetime NOT NULL,
  `Nodo_ID` int(11) DEFAULT NULL,
  `Watt` decimal(18,10) NOT NULL,
  `Kwh` decimal(18,10) NOT NULL,
  `Precio` decimal(18,10) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `IX_Nodo_ID` (`Nodo_ID`) USING HASH
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `lectura`
--

INSERT INTO `lectura` (`ID`, `Irms`, `FechaHora`, `Nodo_ID`, `Watt`, `Kwh`, `Precio`) VALUES
(46, '8.6594000000', '2019-03-18 01:03:30', 3, '8229893.7600000000', '45.7216272000', '3427.9793568000'),
(47, '11.4542000000', '2019-03-18 15:20:10', 3, '10886071.6800000000', '60.4781856000', '4534.3512280000'),
(48, '7.6544000000', '2019-03-19 01:03:50', 3, '7274741.7600000000', '40.4152416000', '3030.1327152000'),
(49, '8.6594000000', '2019-03-19 14:20:50', 3, '8229893.7600000000', '45.7216272000', '3427.9793568000'),
(50, '11.4542000000', '2019-03-20 01:04:10', 3, '10886071.6800000000', '60.4781856000', '4534.3512280000'),
(51, '6.6896000000', '2019-03-20 22:10:10', 3, '6357795.8400000000', '35.3210976000', '2648.1992688000'),
(52, '7.6544000000', '2019-03-21 01:03:50', 3, '7274741.7600000000', '40.4152416000', '3030.1327152000'),
(53, '8.6594000000', '2019-03-21 17:23:30', 3, '8229893.7600000000', '45.7216272000', '3427.9793568000'),
(54, '6.6896000000', '2019-03-22 01:03:10', 3, '6357795.8400000000', '35.3210976000', '2648.1992688000'),
(55, '11.4542000000', '2019-03-22 21:04:10', 3, '10886071.6800000000', '60.4781856000', '4534.3512280000'),
(56, '8.6594000000', '2019-03-23 01:03:30', 3, '8229893.7600000000', '45.7216272000', '3427.9793568000'),
(57, '11.4542000000', '2019-03-23 18:03:30', 3, '10886071.6800000000', '60.4781856000', '4534.3512280000'),
(58, '11.4542000000', '2019-03-24 01:04:10', 3, '10886071.6800000000', '60.4781856000', '4534.3512280000'),
(59, '6.6896000000', '2019-03-24 11:03:10', 3, '6357795.8400000000', '35.3210976000', '2648.1992688000'),
(60, '8.6594000000', '2019-03-25 01:03:30', 3, '8229893.7600000000', '45.7216272000', '3427.9793568000'),
(61, '7.6544000000', '2019-03-25 22:03:50', 3, '7274741.7600000000', '40.4152416000', '3030.1327152000'),
(62, '6.6896000000', '2019-03-26 01:03:10', 3, '6357795.8400000000', '35.3210976000', '2648.1992688000'),
(63, '11.4542000000', '2019-03-26 23:04:10', 3, '10886071.6800000000', '60.4781856000', '4534.3512280000'),
(64, '7.6544000000', '2019-03-27 01:03:50', 3, '7274741.7600000000', '40.4152416000', '3030.1327152000'),
(65, '6.6896000000', '2019-03-27 20:03:50', 3, '6357795.8400000000', '35.3210976000', '2648.1992688000'),
(66, '11.4542000000', '2019-03-28 01:04:10', 3, '10886071.6800000000', '60.4781856000', '4534.3512280000'),
(67, '6.6896000000', '2019-03-28 17:03:10', 3, '6357795.8400000000', '35.3210976000', '2648.1992688000'),
(68, '7.6544000000', '2019-03-29 01:03:50', 3, '7274741.7600000000', '40.4152416000', '3030.1327152000'),
(69, '11.4542000000', '2019-03-29 14:04:10', 3, '10886071.6800000000', '60.4781856000', '4534.3512280000'),
(70, '6.6896000000', '2019-03-30 01:03:10', 3, '6357795.8400000000', '35.3210976000', '2648.1992688000'),
(71, '8.6594000000', '2019-03-30 11:03:10', 3, '8229893.7600000000', '45.7216272000', '3427.9793568000'),
(72, '11.4542000000', '2019-03-31 01:04:10', 3, '10886071.6800000000', '60.4781856000', '4534.3512280000'),
(73, '8.6594000000', '2019-03-31 13:03:30', 3, '8229893.7600000000', '45.7216272000', '3427.9793568000'),
(74, '6.6896000000', '2019-04-01 00:01:10', 3, '6357795.8400000000', '35.3210976000', '2648.1992688000'),
(75, '7.6544000000', '2019-04-01 23:59:50', 3, '7274741.7600000000', '40.4152416000', '3030.1327152000'),
(76, '8.6594000000', '2019-04-02 01:03:30', 3, '8229893.7600000000', '45.7216272000', '3427.9793568000'),
(77, '11.4542000000', '2019-04-02 11:04:10', 3, '10886071.6800000000', '60.4781856000', '4534.3512280000'),
(78, '7.6544000000', '2019-04-03 01:03:50', 3, '7274741.7600000000', '40.4152416000', '3030.1327152000'),
(79, '6.6896000000', '2019-04-03 21:03:10', 3, '6357795.8400000000', '35.3210976000', '2648.1992688000'),
(80, '11.4542000000', '2019-04-04 01:04:10', 4, '10886071.6800000000', '60.4781856000', '4534.3512280000'),
(81, '6.6896000000', '2019-04-04 15:04:10', 3, '6357795.8400000000', '35.3210976000', '2648.1992688000'),
(82, '6.6896000000', '2019-04-05 01:03:10', 5, '6357795.8400000000', '35.3210976000', '2648.1992688000'),
(83, '11.4542000000', '2019-04-05 19:04:10', 5, '10886071.6800000000', '60.4781856000', '4534.3512280000'),
(84, '11.4542000000', '2019-04-06 01:04:10', 7, '10886071.6800000000', '60.4781856000', '4534.3512280000'),
(85, '6.6896000000', '2019-04-06 21:03:10', 7, '6357795.8400000000', '35.3210976000', '2648.1992688000'),
(86, '6.6896000000', '2019-04-07 01:03:10', 4, '6357795.8400000000', '35.3210976000', '2648.1992688000'),
(87, '11.4542000000', '2019-04-07 15:20:10', 4, '10886071.6800000000', '60.4781856000', '4534.3512280000'),
(88, '6.6896000000', '2019-04-08 00:00:01', 3, '6357795.8400000000', '35.3210976000', '2648.1992688000'),
(89, '8.6594000000', '2019-04-08 23:59:59', 3, '8229893.7600000000', '45.7216272000', '3427.9793568000'),
(90, '8.6594000000', '2019-04-08 23:59:59', 4, '8229893.7600000000', '65.7216272000', '3427.9793568000');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `lectura`
--
ALTER TABLE `lectura`
  ADD CONSTRAINT `FK_Lectura_Nodo_Nodo_ID` FOREIGN KEY (`Nodo_ID`) REFERENCES `nodo` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
