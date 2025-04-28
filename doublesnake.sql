-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 22. Mrz 2025 um 20:49
-- Server-Version: 10.4.32-MariaDB
-- PHP-Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `doublesnake`
--
CREATE DATABASE IF NOT EXISTS `doublesnake` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `doublesnake`;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `fullName`, `createdAt`) VALUES
(1, 'test', 'test@gmail.com', '$2b$10$lAwMUGqw45KAzY1xv2x1vutNLwQTelz7UaPkPEJq9lST6GChJODHq', 'Test Person', '2025-03-22 19:48:37'),
(2, 'test2', 'test2@gmail.com', '$2b$10$fRrqNkFVA4TIyy61ovgPae83drW6oZOCND94BErwthKmt1MxzgTci', 'Test Person 2', '2025-03-22 19:48:45'),
(3, 'test3', NULL, '$2b$10$5QEkQuI/HxnaNovp8XPbnOnkuPpfSLdjwyqXMXKCB5oHZQR3ILTkq', NULL, '2025-03-22 19:48:51');

-- --------------------------------------------------------
--
-- Tabellenstruktur für Tabelle `scores`
--

CREATE TABLE `scores` (
  `id` int(11) NOT NULL,
  `user1` int(11) NOT NULL,
  `user2` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
--
-- Daten für Tabelle `scores`
--

INSERT INTO `scores` (`id`, `user1`, `user2`, `score`, `time`) VALUES
(1, 1, 2, 100, '2025-03-22 20:00:00'),
(2, 2, 3, 150, '2025-03-22 20:15:00'),
(3, 1, 3, 200, '2025-03-22 20:30:00');
--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indizes für die Tabelle `scores`
--
ALTER TABLE `scores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user1` (`user1`),
  ADD KEY `user2` (`user2`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `scores`
--
ALTER TABLE `scores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints der Tabelle `scores`
--
ALTER TABLE `scores`
  ADD CONSTRAINT `scores_ibfk_1` FOREIGN KEY (`user1`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `scores_ibfk_2` FOREIGN KEY (`user2`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
