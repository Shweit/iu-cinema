/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/SQLTemplate.sql to edit this template
 */
/**
 * Author:  dennis
 * Created: 26.01.2025
 */


CREATE DATABASE cinema;

CREATE USER 'cinema'@'localhost' IDENTIFIED BY 'iu-cinema';
GRANT ALL PRIVILEGES ON cinema.* TO 'cinema'@'localhost';
FLUSH PRIVILEGES;