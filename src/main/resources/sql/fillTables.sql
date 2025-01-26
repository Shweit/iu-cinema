-- SQL script for inserting test data into the cinema database

-- Insert sample data into halls
INSERT INTO hall (name, totalSeats, totalRows, seatPlacement, bookedSeats)
VALUES
    ('Hall A', 100, 10, '{"rows":10,"columns":10}', '{"1:1":true,"1:2":true,"1:3":true,"1:4":true,"1:5":true,"1:6":true,"1:7":true,"1:8":true,"1:9":true,"1:10":true}'),
    ('Hall B', 200, 20, '{"rows":20,"columns":10}', '{"5:1":true,"5:2":true,"5:3":true,"5:4":true,"5:5":true,"5:6":true,"5:7":true,"5:8":true,"5:9":true,"5:10":true}'),
    ('Hall C', 150, 15, '{"rows":15,"columns":10}', '{"10:1":true,"10:2":true,"10:3":true,"10:4":true,"10:5":true,"10:6":true,"10:7":true,"10:8":true,"10:9":true,"10:10":true}');

-- Insert sample data into movies
INSERT INTO movie (name, `desc`, playtime, releaseDate, topCast, trailerUrl, director, genre, rating, hallId, broadcastingTimes)
VALUES
    ('Avengers: Endgame', 'Superhero movie', '03:02:00', '2019-04-26', '["Robert Downey Jr.", "Chris Evans"]', 'https://trailer.url', 'Anthony Russo', '["Action", "Fantasy", "Superhelden Film", "Drama"]', 4.5, 1, '["10:00", "13:00", "18:30", "20:15"]'),
    ('Inception', 'Mind-bending thriller', '02:28:00', '2010-07-16', '["Leonardo DiCaprio", "Joseph Gordon-Levitt"]', 'https://trailer.url', 'Christopher Nolan', '["Action", "Abenteuer", "Drama", "Thriller"]', 5, 2, '["09:00", "15:30", "18:00", "20:15"]'),
    ('The Dark Knight', 'Action-packed superhero film', '02:32:00', '2008-07-18', '["Christian Bale", "Heath Ledger"]', 'https://trailer.url', 'Christopher Nolan', '["Action", "Thriller", "Mysteryfilm", "Superhelden Film"]', 4.5, 3, '["10:00", "13:00", "18:30", "20:15"]');

-- Insert sample data into tickets
INSERT INTO ticket (firstName, lastName, movieId, hallId, broadcastTime)
VALUES
    ('John', 'Doe', 1, 1, '10:00'),
    ('Jane', 'Smith', 2, 2, '15:30'),
    ('Alice', 'Johnson', 3, 3, '10:00'),
    ('Bob', 'Brown', 1, 1, '10:00'),
    ('Charlie', 'Davis', 2, 2, '15:30'),
    ('Emma', 'Taylor', 1, 1, '13:00'),
    ('Liam', 'Wilson', 2, 2, '09:00'),
    ('Sophia', 'Anderson', 3, 3, '18:30'),
    ('Mason', 'Thomas', 1, 1, '20:15'),
    ('Olivia', 'Moore', 3, 3, '13:00'),
    ('Lucas', 'Jackson', 2, 2, '20:15'),
    ('Mia', 'White', 1, 1, '18:30'),
    ('James', 'Harris', 3, 3, '10:00'),
    ('Amelia', 'Martin', 2, 2, '18:00'),
    ('Ethan', 'Thompson', 1, 1, '20:15'),
    ('Lily', 'Clark', 1, 1, '10:00'),
    ('Benjamin', 'Walker', 1, 1, '13:00'),
    ('Harper', 'Hall', 1, 1, '18:30'),
    ('Alexander', 'Allen', 1, 1, '20:15'),
    ('Ella', 'Young', 2, 2, '09:00'),
    ('Henry', 'King', 2, 2, '15:30'),
    ('Charlotte', 'Scott', 2, 2, '18:00'),
    ('Sebastian', 'Green', 2, 2, '20:15'),
    ('Ava', 'Adams', 3, 3, '10:00'),
    ('William', 'Baker', 3, 3, '13:00'),
    ('Emily', 'Carter', 3, 3, '18:30'),
    ('Michael', 'Robinson', 3, 3, '20:15'),
    ('Isabella', 'Mitchell', 1, 1, '10:00'),
    ('Daniel', 'Perez', 1, 1, '13:00'),
    ('Grace', 'Morris', 1, 1, '18:30'),
    ('Samuel', 'Murphy', 1, 1, '20:15'),
    ('Victoria', 'Bell', 2, 2, '09:00'),
    ('Matthew', 'Reed', 2, 2, '15:30'),
    ('Zoe', 'Cook', 2, 2, '18:00'),
    ('Nathan', 'Sanders', 2, 2, '20:15'),
    ('Scarlett', 'Price', 3, 3, '10:00'),
    ('Elijah', 'Brooks', 3, 3, '13:00'),
    ('Chloe', 'Gray', 3, 3, '18:30'),
    ('Ryan', 'Foster', 3, 3, '20:15');

-- Insert sample data into billing
INSERT INTO billing (firstName, lastName, street, zip, houseNumber, city, paymentInfo, transactionDetails)
VALUES
    ('John', 'Doe', 'Main Street', '12345', '10', 'Metropolis', 'PayPal', '{"transactionId":"TXN123"}'),
    ('Jane', 'Smith', 'Elm Street', '54321', '5', 'Gotham', 'SEPA', '{"transactionId":"TXN456"}'),
    ('Alice', 'Johnson', 'Oak Avenue', '67890', '15', 'Star City', 'Credit Card', '{"transactionId":"TXN789"}'),
    ('Bob', 'Brown', 'Pine Street', '11111', '20', 'Central City', 'PayPal', '{"transactionId":"TXN101"}');

-- Insert sample data into billing_ticket
INSERT INTO billing_ticket (billingId, ticketId)
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4);

-- Insert sample data into movie_hall
INSERT INTO movie_hall (movieId, hallId)
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (1, 2),
    (3, 1);
