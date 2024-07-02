CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    UNIQUE(username),
    UNIQUE(email)
);

CREATE TABLE Restaurants (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone_no VARCHAR(255) NOT NULL,
    website VARCHAR(255),
    open_time TIME NOT NULL,
    close_time TIME NOT NULL,
    UNIQUE(phone_no)
);

CREATE TABLE Slots (
    id INT PRIMARY KEY AUTO_INCREMENT,
    restaurant_id INT NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(id)
);

ALTER TABLE Slots
    MODIFY COLUMN start_time DATETIME NOT NULL,
    MODIFY COLUMN end_time DATETIME NOT NULL;

-- SELECT * FROM Slots;

-- TRUNCATE TABLE Slots;
-- DELETE FROM Restaurants;

-- INSERT INTO Slots (restaurant_id, start_time, end_time) VALUES 
-- (16, "2023-01-01 12:00:00", "2023-01-01 14:00:00"),
-- (16, "2023-01-01 15:00:00", "2023-01-01 16:00:00");

-- INSERT INTO Slots (restaurant_id, start_time, end_time) VALUES (17, "2023-01-01 12:00:00", "2023-01-01 14:00:00"),
-- (17, "2023-01-01 15:00:00", "2023-01-01 16:00:00");


SELECT * FROM 
Restaurants as r
JOIN Slots as s
ON r.id = s.restaurant_id
WHERE r.name LIKE '%Gat%'; 

-- "place_id": "12345",
-- 7 "start_time": 2023-01-01T16:00:00Z,
-- 8 "end_time": 2023-01-01T18:00:00Z

SELECT * FROM
Slots
WHERE restaurant_id = 21
AND 
-- start_time AND end_time BETWEEN "2023-01-01 16:00:00" AND "2023-01-01 18:00:00" 
start_time < "2023-01-01 15:00:00" AND end_time > "2023-01-01 14:00:00"
ORDER BY start_time
LIMIT 1;

SELECT * from Slots;