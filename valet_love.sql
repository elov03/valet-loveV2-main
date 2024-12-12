SET FOREIGN_KEY_CHECKS = 0; -- Disables foreign key checking

-- Deleting existing tables
DROP TABLE IF EXISTS Bar_Drink;
DROP TABLE IF EXISTS Bar_Games;
DROP TABLE IF EXISTS Employee;
DROP TABLE IF EXISTS Drink;
DROP TABLE IF EXISTS Games;
DROP TABLE IF EXISTS Bar;
DROP TABLE IF EXISTS Users;

SET FOREIGN_KEY_CHECKS = 1; -- Reactivates foreign key checks

-- Table of users
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_created DATETIME,
    user_name VARCHAR(100) UNIQUE,
    user_email VARCHAR(100) UNIQUE,
    user_role VARCHAR(50),
    user_pass VARCHAR(255) -- Note : remplacer par bcrypt/pbkdf2Note: replace with bcrypt/pbkdf2 for production pour production
);

-- Bar table
CREATE TABLE Bar (
    id_bar INT AUTO_INCREMENT PRIMARY KEY,
    name_bar VARCHAR(30),
    address_bar VARCHAR(255),
    hours_bar TIME,
    size_bar INT
);

-- Drinks table
CREATE TABLE Drink (
    id_drink INT AUTO_INCREMENT PRIMARY KEY,
    name_drink VARCHAR(30),
    price_production_drink INT,
    price_selling_drink INT,
    ingredient_drink VARCHAR(255),
    quantity_drink INT
);

-- Games table
CREATE TABLE Games (
    id_game INT AUTO_INCREMENT PRIMARY KEY
    name_game VARCHAR(30),
    price_game INT,
    time_game TIME,
    nb_people_min_game INT, 
    nb_people_max_game INT, 
    state_game VARCHAR(30),
);

-- Employee table
CREATE TABLE Employee (
    id_employee INT AUTO_INCREMENT PRIMARY KEY,
    name_employee VARCHAR(30),
    age_employee INT,
    gender_employee VARCHAR(6),
    post_employee VARCHAR(30),
    salary_employee INT,
    id_bar INT,
    FOREIGN KEY (id_bar) REFERENCES Bar(id_bar)
);

-- Bar_Drink table
CREATE TABLE Bar_Drink (
    id_bar INT,
    id_drink INT,
    PRIMARY KEY (id_bar, id_drink),
    FOREIGN KEY (id_bar) REFERENCES Bar(id_bar),
    FOREIGN KEY (id_drink) REFERENCES Drink(id_drink)
);

-- Bar_Games table
CREATE TABLE Bar_Games (
    id_bar INT,
    id_game INT,
    PRIMARY KEY (id_bar, id_game),
    FOREIGN KEY (id_bar) REFERENCES Bar(id_bar),
    FOREIGN KEY (id_game) REFERENCES Games(id_game)
);

-- Inserting users
INSERT INTO Users (user_id,user_created, user_name, user_email, user_role, user_pass)
VALUES
    (NULL, NOW(), 'admin', 'admin@example.com', 'ADMIN', SHA2(CONCAT(now(),'adminpass'), 224)),
    (NULL, NOW(), 'john_doe', 'john@example.com', 'USER', SHA2(CONCAT(now(),'johnpass'), 224)),
    (NULL, NOW(), 'jane_doe', 'jane@example.com', 'USER', SHA2(CONCAT(now(),'janepass'), 224));

-- Inserting bars
INSERT INTO Bar (id_bar, name_bar, address_bar, hours_bar, size_bar) VALUES
(1, 'The Cozy Pub', '123 Main St', '12:00:00', 100),
(2, 'The Night Owl', '456 Elm St', '18:00:00', 150),
(3, 'Sunny’s Tavern', '789 Oak St', '15:00:00', 120);

-- Inserting drinks
INSERT INTO Drink (id_drink, name_drink, price_production_drink, price_selling_drink, ingredient_drink, quantity_drink) VALUES
(1, 'Beer', 50, 100, 'Hops, Water, Yeast', 200),
(2, 'Wine', 100, 200, 'Grapes, Yeast', 150),
(3, 'Whiskey', 150, 300, 'Grain, Water', 100),
(4, 'Soda', 20, 50, 'Carbonated Water, Sugar', 300);

-- Inserting games
INSERT INTO Games (id_game, name_game, price_game, time_game, nb_people_min_game, nb_people_max_game, state_game, id_bar) VALUES
(1,'Pool', 500, '00:30:00', 2, 4, 'Available', 1),
(2,'Darts', 300, '00:15:00', 2, 8, 'Available', 1),
(3,'Foosball', 400, '00:20:00', 2, 4, 'Available', 2),
(4,'Poker', 600, '01:00:00', 4, 10, 'Available', 2),
(5,'Chess', 100, '01:00:00', 2, 2, 'Available', 3);

-- Employee integration
INSERT INTO Employee (id_employee, name_employee, age_employee, gender_employee, post_employee, salary_employee, id_bar) VALUES
(1, 'John Doe', 30, 'Male', 'Bartender', 2500, 1),
(2,'Bob Johnson', 35, 'Male', 'Manager', 3000, 1),
(3,'Jane Smith', 28, 'Female', 'Waitress', 2200, 1),
(4,'Alice Brown', 27, 'Female', 'Bartender', 2400, 2),
(5,'Evelyn White', 29, 'Female', 'Manager', 3200, 2),
(6,'Diana Black', 26, 'Female', 'Hostess', 2000, 2),
(7,'Charlie Davis', 32, 'Male', 'Waiter', 2100, 3),
(8,'George Harris', 33, 'Male', 'Chef', 2800, 3);

-- Linking bars to drinks
INSERT INTO Bar_Drink (id_bar, id_drink) VALUES
(1, 1), 
(1, 2), 
(2, 3),
(2, 4),
(3, 1), 
(3, 4); 

-- Linking bars to gaming
INSERT INTO Bar_Games (id_bar, id_game) VALUES
(1, 1),
(1, 2),
(1, 5),
(2, 3), 
(2, 4),
(3, 1), 
(3, 2),
(3, 5);
