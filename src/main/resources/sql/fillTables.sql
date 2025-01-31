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
    ('Inception', 'https://www.movieposters.com/cdn/shop/files/inception.mpw.123395_9e0000d1-bc7f-400a-b488-15fa9e60a10c_480x.progressive.jpg', 'Dom Cobb ist ein Meister der Traummanipulation, der in die Unterbewusstsein seiner Ziele eindringt, um Informationen zu stehlen. Bei seinem letzten Auftrag muss er jedoch keine Idee stehlen, sondern eine pflanzen.', '02:28:00', '2010-07-16', '["Leonardo DiCaprio", "Joseph Gordon-Levitt"]', 'https://www.youtube.com/watch?v=YoHD9XEInc0', 'Christopher Nolan', '["Action", "Abenteuer", "Drama", "Thriller"]', 5, 2, '["09:00", "15:30", "18:00", "20:15"]', 'Ein Traumdieb bekommt den Auftrag, eine Idee in das Unterbewusstsein eines Menschen zu pflanzen.', 11.99),
    ('The Dark Knight', 'https://www.movieposters.com/cdn/shop/files/darkknight.building.24x36_20e90057-f673-4cc3-9ce7-7b0d3eeb7d83_480x.progressive.jpg', 'Batman muss sich seinem bisher gefährlichsten Gegner stellen: dem Joker, der Gotham City ins Chaos stürzt. Ein packender Kampf zwischen Ordnung und Anarchie beginnt.', '02:32:00', '2008-07-18', '["Christian Bale", "Heath Ledger"]', 'https://www.youtube.com/watch?v=EXeTwQWrcwY', 'Christopher Nolan', '["Action", "Thriller", "Mysteryfilm", "Superhelden Film"]', 4.5, 3, '["10:00", "13:00", "18:30", "20:15"]', 'Batman kämpft gegen den chaotischen Joker um die Seele von Gotham City.', 11.99);

-- Insert sample data into tickets
INSERT INTO ticket (firstName, lastName, movieId, hallId, showtime, seatNumber, price, purchaseDate, ticketNumber, billingId)
VALUES
    -- Avengers: Endgame (10:00 showing)
    ('John', 'Doe', 1, 1, '10:00', '01:01', 12.99, NOW(), 'TKT-20240124-R01S01-1', 1),
    ('Bob', 'Brown', 1, 1, '10:00', '01:02', 12.99, NOW(), 'TKT-20240124-R01S02-1', 1),
    ('Sarah', 'Wilson', 1, 1, '10:00', '01:03', 12.99, NOW(), 'TKT-20240124-R01S03-1', 1),
    ('Mike', 'Johnson', 1, 1, '10:00', '01:04', 12.99, NOW(), 'TKT-20240124-R01S04-1', 2),
    ('Lisa', 'Anderson', 1, 1, '10:00', '02:01', 12.99, NOW(), 'TKT-20240124-R02S01-1', 2),
    ('Tom', 'Davis', 1, 1, '10:00', '02:02', 12.99, NOW(), 'TKT-20240124-R02S02-1', 2),
    ('Emma', 'White', 1, 1, '10:00', '02:03', 12.99, NOW(), 'TKT-20240124-R02S03-1', 2),
    ('Frank', 'Miller', 1, 1, '10:00', '04:05', 12.99, NOW(), 'TKT-20240124-R04S05-1', 2),
    ('Grace', 'Lee', 1, 1, '10:00', '04:06', 12.99, NOW(), 'TKT-20240124-R04S06-1', 1),
    ('Henry', 'Wilson', 1, 1, '10:00', '06:08', 12.99, NOW(), 'TKT-20240124-R06S08-1', 3),
    ('Ivy', 'Chen', 1, 1, '10:00', '07:03', 12.99, NOW(), 'TKT-20240124-R07S03-1', 4),
    ('Jack', 'Brown', 1, 1, '10:00', '08:07', 12.99, NOW(), 'TKT-20240124-R08S07-1', 3),
    
    -- Avengers: Endgame (13:00 showing)
    ('Karen', 'Taylor', 1, 1, '13:00', '02:04', 12.99, NOW(), 'TKT-20240124-R02S04-1', 1),
    ('Leo', 'Martin', 1, 1, '13:00', '02:05', 12.99, NOW(), 'TKT-20240124-R02S05-1', 3),
    ('Mary', 'Johnson', 1, 1, '13:00', '03:07', 12.99, NOW(), 'TKT-20240124-R03S07-1', 3),
    ('Nick', 'Davis', 1, 1, '13:00', '04:08', 12.99, NOW(), 'TKT-20240124-R04S08-1', 2),
    ('Olivia', 'Smith', 1, 1, '13:00', '05:05', 12.99, NOW(), 'TKT-20240124-R05S05-1', 4),
    ('Paul', 'Wilson', 1, 1, '13:00', '06:02', 12.99, NOW(), 'TKT-20240124-R06S02-1', 4),
    ('Quinn', 'Brown', 1, 1, '13:00', '07:06', 12.99, NOW(), 'TKT-20240124-R07S06-1', 2),
    ('Rachel', 'Lee', 1, 1, '13:00', '08:04', 12.99, NOW(), 'TKT-20240124-R08S04-1', 2),
    
    -- Avengers: Endgame (18:30 showing)
    ('David', 'Miller', 1, 1, '18:30', '03:01', 12.99, NOW(), 'TKT-20240124-R03S01-1', 1),
    ('Anna', 'Taylor', 1, 1, '18:30', '03:02', 12.99, NOW(), 'TKT-20240124-R03S02-1', 1),
    ('James', 'Brown', 1, 1, '18:30', '03:03', 12.99, NOW(), 'TKT-20240124-R03S03-1', 2),
    ('Sophie', 'Clark', 1, 1, '18:30', '04:01', 12.99, NOW(), 'TKT-20240124-R04S01-1', 3),
    ('Oliver', 'Lee', 1, 1, '18:30', '04:02', 12.99, NOW(), 'TKT-20240124-R04S02-1', 2),
    ('Sam', 'Wilson', 1, 1, '18:30', '05:07', 12.99, NOW(), 'TKT-20240124-R05S07-1', 4),
    ('Tina', 'Davis', 1, 1, '18:30', '06:04', 12.99, NOW(), 'TKT-20240124-R06S04-1', 1),
    ('Uma', 'Patel', 1, 1, '18:30', '07:08', 12.99, NOW(), 'TKT-20240124-R07S08-1', 1),
    ('Victor', 'Chen', 1, 1, '18:30', '08:03', 12.99, NOW(), 'TKT-20240124-R08S03-1', 2),
    ('Wendy', 'Taylor', 1, 1, '18:30', '09:05', 12.99, NOW(), 'TKT-20240124-R09S05-1', 3),
    
    -- Avengers: Endgame (20:15 showing)
    ('Xavier', 'Brown', 1, 1, '20:15', '02:06', 12.99, NOW(), 'TKT-20240124-R02S06-1', 4),
    ('Yuki', 'Tanaka', 1, 1, '20:15', '03:04', 12.99, NOW(), 'TKT-20240124-R03S04-1', 1),
    ('Zoe', 'Martin', 1, 1, '20:15', '04:07', 12.99, NOW(), 'TKT-20240124-R04S07-1', 1),
    ('Adam', 'Smith', 1, 1, '20:15', '05:03', 12.99, NOW(), 'TKT-20240124-R05S03-1', 1),
    ('Beth', 'Johnson', 1, 1, '20:15', '06:05', 12.99, NOW(), 'TKT-20240124-R06S05-1', 4),
    ('Carl', 'Davis', 1, 1, '20:15', '07:02', 12.99, NOW(), 'TKT-20240124-R07S02-1', 3),
    ('Diana', 'Wilson', 1, 1, '20:15', '08:06', 12.99, NOW(), 'TKT-20240124-R08S06-1', 3),
    
    -- Inception (09:00 showing)
    ('Eric', 'Taylor', 2, 2, '09:00', '03:05', 11.99, NOW(), 'TKT-20240124-R03S05-2', 4),
    ('Fiona', 'Brown', 2, 2, '09:00', '04:03', 11.99, NOW(), 'TKT-20240124-R04S03-2', 4),
    ('George', 'Lee', 2, 2, '09:00', '05:06', 11.99, NOW(), 'TKT-20240124-R05S06-2', 4),
    ('Helen', 'Chen', 2, 2, '09:00', '06:07', 11.99, NOW(), 'TKT-20240124-R06S07-2', 2),
    ('Ian', 'Wilson', 2, 2, '09:00', '07:04', 11.99, NOW(), 'TKT-20240124-R07S04-2', 4),
    ('Julia', 'Martin', 2, 2, '09:00', '08:02', 11.99, NOW(), 'TKT-20240124-R08S02-2', 4),
    
    -- Inception (15:30 showing)
    ('Jane', 'Smith', 2, 2, '15:30', '01:01', 11.99, NOW(), 'TKT-20240124-R01S01-2',1),
    ('Charlie', 'Davis', 2, 2, '15:30', '01:02', 11.99, NOW(), 'TKT-20240124-R01S02-2',1),
    ('Lucy', 'Martinez', 2, 2, '15:30', '01:03', 11.99, NOW(), 'TKT-20240124-R01S03-2',1),
    ('Henry', 'Garcia', 2, 2, '15:30', '02:01', 11.99, NOW(), 'TKT-20240124-R02S01-2',2),
    ('Grace', 'Rodriguez', 2, 2, '15:30', '02:02', 11.99, NOW(), 'TKT-20240124-R02S02-2',3),
    ('William', 'Lopez', 2, 2, '15:30', '02:03', 11.99, NOW(), 'TKT-20240124-R02S03-2',4),
    ('Kevin', 'Taylor', 2, 2, '15:30', '04:06', 11.99, NOW(), 'TKT-20240124-R04S06-2',4),
    ('Laura', 'Brown', 2, 2, '15:30', '05:04', 11.99, NOW(), 'TKT-20240124-R05S04-2',4),
    ('Mark', 'Wilson', 2, 2, '15:30', '06:03', 11.99, NOW(), 'TKT-20240124-R06S03-2',3),
    ('Nina', 'Chen', 2, 2, '15:30', '07:07', 11.99, NOW(), 'TKT-20240124-R07S07-2',2),
    
    -- Inception (18:00 showing)
    ('Oscar', 'Martin', 2, 2, '18:00', '02:07', 11.99, NOW(), 'TKT-20240124-R02S07-2',1),
    ('Penny', 'Davis', 2, 2, '18:00', '03:06', 11.99, NOW(), 'TKT-20240124-R03S06-2',1),
    ('Quinn', 'Taylor', 2, 2, '18:00', '04:04', 11.99, NOW(), 'TKT-20240124-R04S04-2',1),
    ('Ryan', 'Brown', 2, 2, '18:00', '05:02', 11.99, NOW(), 'TKT-20240124-R05S02-2',2),
    ('Sara', 'Wilson', 2, 2, '18:00', '06:06', 11.99, NOW(), 'TKT-20240124-R06S06-2',2),
    ('Tom', 'Lee', 2, 2, '18:00', '07:05', 11.99, NOW(), 'TKT-20240124-R07S05-2',2),
    
    -- Inception (20:15 showing)
    ('Emily', 'Wilson', 2, 2, '20:15', '03:01', 11.99, NOW(), 'TKT-20240124-R03S01-2',2),
    ('Daniel', 'Anderson', 2, 2, '20:15', '03:02', 11.99, NOW(), 'TKT-20240124-R03S02-2',2),
    ('Sofia', 'Thomas', 2, 2, '20:15', '03:03', 11.99, NOW(), 'TKT-20240124-R03S03-2',3),
    ('Lucas', 'Jackson', 2, 2, '20:15', '04:01', 11.99, NOW(), 'TKT-20240124-R04S01-2',3),
    ('Victor', 'Martin', 2, 2, '20:15', '05:08', 11.99, NOW(), 'TKT-20240124-R05S08-2',3),
    ('Wendy', 'Davis', 2, 2, '20:15', '06:01', 11.99, NOW(), 'TKT-20240124-R06S01-2',4),
    ('Xavier', 'Taylor', 2, 2, '20:15', '07:01', 11.99, NOW(), 'TKT-20240124-R07S01-2',4),
    ('Yuki', 'Brown', 2, 2, '20:15', '08:05', 11.99, NOW(), 'TKT-20240124-R08S05-2',4),
    
    -- The Dark Knight (10:00 showing)
    ('Alice', 'Johnson', 3, 3, '10:00', '01:01', 11.99, NOW(), 'TKT-20240124-R01S01-3',3),
    ('Peter', 'Williams', 3, 3, '10:00', '01:02', 11.99, NOW(), 'TKT-20240124-R01S02-3',3),
    ('Mia', 'Brown', 3, 3, '10:00', '01:03', 11.99, NOW(), 'TKT-20240124-R01S03-3',3),
    ('Jack', 'Taylor', 3, 3, '10:00', '02:01', 11.99, NOW(), 'TKT-20240124-R02S01-3',4),
    ('Ava', 'Davis', 3, 3, '10:00', '02:02', 11.99, NOW(), 'TKT-20240124-R02S02-3',4),
    ('Emma', 'White', 3, 3, '10:00', '02:03', 11.99, NOW(), 'TKT-20240124-R02S03-3',4),
    ('Frank', 'Miller', 3, 3, '10:00', '04:05', 11.99, NOW(), 'TKT-20240124-R04S05-3',4),
    ('Grace', 'Lee', 3, 3, '10:00', '04:06', 11.99, NOW(), 'TKT-20240124-R04S06-3',2),
    ('Henry', 'Wilson', 3, 3, '10:00', '06:08', 11.99, NOW(), 'TKT-20240124-R06S08-3',2),
    ('Ivy', 'Chen', 3, 3, '10:00', '07:03', 11.99, NOW(), 'TKT-20240124-R07S03-3',2),
    ('Jack', 'Brown', 3, 3, '10:00', '08:07', 11.99, NOW(), 'TKT-20240124-R08S07-3',2),
    
    -- The Dark Knight (13:00 showing)
    ('Diana', 'Taylor', 3, 3, '13:00', '02:08', 11.99, NOW(), 'TKT-20240124-R02S08-3',1),
    ('Eric', 'Brown', 3, 3, '13:00', '03:07', 11.99, NOW(), 'TKT-20240124-R03S07-3',1),
    ('Fiona', 'Wilson', 3, 3, '13:00', '04:05', 11.99, NOW(), 'TKT-20240124-R04S05-3',1),
    ('George', 'Davis', 3, 3, '13:00', '05:04', 11.99, NOW(), 'TKT-20240124-R05S04-3',2),
    ('Helen', 'Martin', 3, 3, '13:00', '06:02', 11.99, NOW(), 'TKT-20240124-R06S02-3',1),
    ('Ian', 'Chen', 3, 3, '13:00', '07:06', 11.99, NOW(), 'TKT-20240124-R07S06-3',1),
    ('Julia', 'Lee', 3, 3, '13:00', '08:01', 11.99, NOW(), 'TKT-20240124-R08S01-3',1),
    
    -- The Dark Knight (18:30 showing)
    ('Kevin', 'Brown', 3, 3, '18:30', '02:05', 11.99, NOW(), 'TKT-20240124-R02S05-3',1),
    ('Laura', 'Wilson', 3, 3, '18:30', '03:04', 11.99, NOW(), 'TKT-20240124-R03S04-3',1),
    ('Mark', 'Taylor', 3, 3, '18:30', '04:06', 11.99, NOW(), 'TKT-20240124-R04S06-3',1),
    ('Nina', 'Davis', 3, 3, '18:30', '05:03', 11.99, NOW(), 'TKT-20240124-R05S03-3',2),
    ('Oscar', 'Martin', 3, 3, '18:30', '06:07', 11.99, NOW(), 'TKT-20240124-R06S07-3',3),
    ('Penny', 'Chen', 3, 3, '18:30', '07:02', 11.99, NOW(), 'TKT-20240124-R07S02-3',3),
    ('Quinn', 'Lee', 3, 3, '18:30', '08:04', 11.99, NOW(), 'TKT-20240124-R08S04-3',4),
    
    -- The Dark Knight (20:15 showing)
    ('Noah', 'Martin', 3, 3, '20:15', '03:01', 11.99, NOW(), 'TKT-20240124-R03S01-3',4),
    ('Isabella', 'Thompson', 3, 3, '20:15', '03:02', 11.99, NOW(), 'TKT-20240124-R03S02-3',4),
    ('Ethan', 'Moore', 3, 3, '20:15', '03:03', 11.99, NOW(), 'TKT-20240124-R03S03-3',4),
    ('Charlotte', 'Jackson', 3, 3, '20:15', '04:01', 11.99, NOW(), 'TKT-20240124-R04S01-3',4),
    ('Alexander', 'White', 3, 3, '20:15', '04:02', 11.99, NOW(), 'TKT-20240124-R04S02-3',4),
    ('Ryan', 'Wilson', 3, 3, '20:15', '05:07', 11.99, NOW(), 'TKT-20240124-R05S07-3',4),
    ('Sara', 'Davis', 3, 3, '20:15', '06:04', 11.99, NOW(), 'TKT-20240124-R06S04-3',4),
    ('Tom', 'Taylor', 3, 3, '20:15', '07:08', 11.99, NOW(), 'TKT-20240124-R07S08-3',4),
    ('Uma', 'Brown', 3, 3, '20:15', '08:05', 11.99, NOW(), 'TKT-20240124-R08S05-3',4);

-- Insert sample data into billing
INSERT INTO billing (firstName, lastName, street, zip, houseNumber, city, paymentInfo, transactionDetails)
VALUES
    ('John', 'Doe', 'Main Street', '12345', '10', 'Metropolis', 'paypal', '{}'),
    ('Jane', 'Smith', 'Elm Street', '54321', '5', 'Gotham', 'sepa', '{"bic": "MALADE51SWP", "iban": "DE43542500100475296166"}'),
    ('Alice', 'Johnson', 'Oak Avenue', '67890', '15', 'Star City', 'creditCard', '{"cvv": "988", "cardNumber": "5579428851851314", "expiryDate": "11/27"}'),
    ('Bob', 'Brown', 'Pine Street', '11111', '20', 'Central City', 'paypal', '{}');

-- Insert sample data into movie_hall
INSERT INTO movie_hall (movieId, hallId)
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (1, 2),
    (3, 1);
