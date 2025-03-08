-- SQL script for cinema database schema with drop statements

-- Drop existing tables if they exist
SET FOREIGN_KEY_CHECKS = 0; -- Temporarily disable foreign key checks to avoid dependency issues
DROP TABLE IF EXISTS billing_ticket;
DROP TABLE IF EXISTS movie_hall;
DROP TABLE IF EXISTS ticket;
DROP TABLE IF EXISTS billing;
DROP TABLE IF EXISTS movie;
DROP TABLE IF EXISTS hall;
SET FOREIGN_KEY_CHECKS = 1; -- Re-enable foreign key checks

-- Create table for halls
CREATE TABLE hall (
    hallId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    totalSeats INT NOT NULL,
    totalRows INT NOT NULL,
    seatPlacement JSON,
    specialSeats JSON
);

-- Create table for movies
CREATE TABLE movie (
    movieId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cover TEXT,
    short_desc TEXT,
    `desc` TEXT,
    playtime TIME,
    releaseDate DATE,
    broadcastingTimes JSON,
    topCast JSON,
    price FLOAT,
    trailerUrl VARCHAR(255),
    director VARCHAR(255),
    genre JSON,
    rating FLOAT,
    hallId INT NOT NULL,
    FOREIGN KEY (hallId) REFERENCES hall(hallId) ON DELETE CASCADE
);

-- Create table for billing
CREATE TABLE billing (
    billingId INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    street VARCHAR(255) NOT NULL,
    zip VARCHAR(10) NOT NULL,
    houseNumber VARCHAR(10) NOT NULL,
    city VARCHAR(100) NOT NULL,
    paymentInfo VARCHAR(50) NOT NULL,
    transactionDetails JSON
);


-- Create table for tickets
CREATE TABLE ticket (
    ticketId INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    showtime VARCHAR(5),
    seatNumber VARCHAR(10) NOT NULL,
    price FLOAT NOT NULL,
    purchaseDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ticketNumber VARCHAR(100) NOT NULL,
    movieId INT NOT NULL,
    hallId INT NOT NULL,
    billingId INT NOT NULL,
    FOREIGN KEY (movieId) REFERENCES movie(movieId) ON DELETE CASCADE,
    FOREIGN KEY (hallId) REFERENCES hall(hallId) ON DELETE CASCADE,
    FOREIGN KEY (billingId) REFERENCES billing(billingId) ON DELETE CASCADE
);
-- Create junction table for movies and halls (many-to-many relationship)
CREATE TABLE movie_hall (
    movieId INT NOT NULL,
    hallId INT NOT NULL,
    PRIMARY KEY (movieId, hallId),
    FOREIGN KEY (movieId) REFERENCES movie(movieId) ON DELETE CASCADE,
    FOREIGN KEY (hallId) REFERENCES hall(hallId) ON DELETE CASCADE
);
