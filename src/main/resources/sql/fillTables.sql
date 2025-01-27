-- SQL script for inserting test data into the cinema database

-- Insert sample data into halls
INSERT INTO hall (name, totalSeats, totalRows, seatPlacement, specialSeats)
VALUES
    ('Hall A', 100, 10, 
     '{"rows":10,"columns":10}', 
     '{"wheelchair": ["10:01", "10:02"], "extraLegroom": ["05:01", "05:02", "05:03"], "couples": ["01:09", "01:10"]}'),
    
    ('Hall B', 200, 20, 
     '{"rows":20,"columns":10}', 
     '{"wheelchair": ["20:01", "20:02", "20:03"], "extraLegroom": ["10:01", "10:02", "10:03", "10:04"], "couples": ["15:09", "15:10"]}'),
    
    ('Hall C', 150, 15, 
     '{"rows":15,"columns":10}', 
     '{"wheelchair": ["15:01", "15:02"], "extraLegroom": ["08:01", "08:02", "08:03"], "couples": ["01:09", "01:10"]}');
     
-- Insert sample data into movies
INSERT INTO movie (name, cover, `desc`, playtime, releaseDate, topCast, trailerUrl, director, genre, rating, hallId, broadcastingTimes, short_desc, price)
VALUES
    ('Avengers: Endgame', 'https://www.movieposters.com/cdn/shop/products/e9ee9896b5f53928b73097566a48f4d0_b6e23fef-e1e3-47d4-9085-811b4481ebb0_480x.progressive.jpg', 'Nach Thanos vernichtender Niederlage müssen die verbliebenen Avengers alles riskieren, um ihre gefallenen Verbündeten zurückzuholen. In einem epischen Finale setzen sie alles daran, das Universum zu retten.', '03:02:00', '2019-04-26', '["Robert Downey Jr.", "Chris Evans"]', 'https://www.youtube.com/watch?v=TcMBFSGVi1c', 'Anthony Russo', '["Action", "Fantasy", "Superhelden Film", "Drama"]', 4.5, 1, '["10:00", "13:00", "18:30", "20:15"]', 'Die Avengers versuchen in einem letzten Versuch, die Auswirkungen von Thanos Handlungen rückgängig zu machen.', 12.99),
    ('Inception', 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg', 'Dom Cobb ist ein Meister der Traummanipulation, der in die Unterbewusstsein seiner Ziele eindringt, um Informationen zu stehlen. Bei seinem letzten Auftrag muss er jedoch keine Idee stehlen, sondern eine pflanzen.', '02:28:00', '2010-07-16', '["Leonardo DiCaprio", "Joseph Gordon-Levitt"]', 'https://www.youtube.com/watch?v=YoHD9XEInc0', 'Christopher Nolan', '["Action", "Abenteuer", "Drama", "Thriller"]', 5, 2, '["09:00", "15:30", "18:00", "20:15"]', 'Ein Traumdieb bekommt den Auftrag, eine Idee in das Unterbewusstsein eines Menschen zu pflanzen.', 11.99),
    ('The Dark Knight', 'https://www.movieposters.com/cdn/shop/files/darkknight.building.24x36_20e90057-f673-4cc3-9ce7-7b0d3eeb7d83_480x.progressive.jpg', 'Batman muss sich seinem bisher gefährlichsten Gegner stellen: dem Joker, der Gotham City ins Chaos stürzt. Ein packender Kampf zwischen Ordnung und Anarchie beginnt.', '02:32:00', '2008-07-18', '["Christian Bale", "Heath Ledger"]', 'https://www.youtube.com/watch?v=EXeTwQWrcwY', 'Christopher Nolan', '["Action", "Thriller", "Mysteryfilm", "Superhelden Film"]', 4.5, 3, '["10:00", "13:00", "18:30", "20:15"]', 'Batman kämpft gegen den chaotischen Joker um die Seele von Gotham City.', 11.99);

-- Insert sample data into tickets
INSERT INTO ticket (firstName, lastName, movieId, hallId, broadcastTime, seatNumber, price, purchaseDate)
VALUES
    -- Avengers: Endgame (10:00 showing)
    ('John', 'Doe', 1, 1, '10:00', '01:01', 12.99, NOW()),
    ('Bob', 'Brown', 1, 1, '10:00', '01:02', 12.99, NOW()),
    ('Sarah', 'Wilson', 1, 1, '10:00', '01:03', 12.99, NOW()),
    ('Mike', 'Johnson', 1, 1, '10:00', '01:04', 12.99, NOW()),
    ('Lisa', 'Anderson', 1, 1, '10:00', '02:01', 12.99, NOW()),
    ('Tom', 'Davis', 1, 1, '10:00', '02:02', 12.99, NOW()),
    ('Emma', 'White', 1, 1, '10:00', '02:03', 12.99, NOW()),
    
    -- Avengers: Endgame (18:30 showing)
    ('David', 'Miller', 1, 1, '18:30', '03:01', 12.99, NOW()),
    ('Anna', 'Taylor', 1, 1, '18:30', '03:02', 12.99, NOW()),
    ('James', 'Brown', 1, 1, '18:30', '03:03', 12.99, NOW()),
    ('Sophie', 'Clark', 1, 1, '18:30', '04:01', 12.99, NOW()),
    ('Oliver', 'Lee', 1, 1, '18:30', '04:02', 12.99, NOW()),
    
    -- Inception (15:30 showing)
    ('Jane', 'Smith', 2, 2, '15:30', '01:01', 11.99, NOW()),
    ('Charlie', 'Davis', 2, 2, '15:30', '01:02', 11.99, NOW()),
    ('Lucy', 'Martinez', 2, 2, '15:30', '01:03', 11.99, NOW()),
    ('Henry', 'Garcia', 2, 2, '15:30', '02:01', 11.99, NOW()),
    ('Grace', 'Rodriguez', 2, 2, '15:30', '02:02', 11.99, NOW()),
    ('William', 'Lopez', 2, 2, '15:30', '02:03', 11.99, NOW()),
    
    -- Inception (20:15 showing)
    ('Emily', 'Wilson', 2, 2, '20:15', '03:01', 11.99, NOW()),
    ('Daniel', 'Anderson', 2, 2, '20:15', '03:02', 11.99, NOW()),
    ('Sofia', 'Thomas', 2, 2, '20:15', '03:03', 11.99, NOW()),
    ('Lucas', 'Jackson', 2, 2, '20:15', '04:01', 11.99, NOW()),
    
    -- The Dark Knight (10:00 showing)
    ('Alice', 'Johnson', 3, 3, '10:00', '01:01', 11.99, NOW()),
    ('Peter', 'Williams', 3, 3, '10:00', '01:02', 11.99, NOW()),
    ('Mia', 'Brown', 3, 3, '10:00', '01:03', 11.99, NOW()),
    ('Jack', 'Taylor', 3, 3, '10:00', '02:01', 11.99, NOW()),
    ('Ava', 'Davis', 3, 3, '10:00', '02:02', 11.99, NOW()),
    
    -- The Dark Knight (20:15 showing)
    ('Noah', 'Martin', 3, 3, '20:15', '03:01', 11.99, NOW()),
    ('Isabella', 'Thompson', 3, 3, '20:15', '03:02', 11.99, NOW()),
    ('Ethan', 'Moore', 3, 3, '20:15', '03:03', 11.99, NOW()),
    ('Charlotte', 'Jackson', 3, 3, '20:15', '04:01', 11.99, NOW()),
    ('Alexander', 'White', 3, 3, '20:15', '04:02', 11.99, NOW());    

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
