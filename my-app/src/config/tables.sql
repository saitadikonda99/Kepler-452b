CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    username BIGINT NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(255) NOT NULL,
    RefreshToken VARCHAR(255) Default NULL,
    PRIMARY KEY (id)    
);

INSERT INTO users (username, password, email, role) 
VALUES 
(2200030805, 'sai@1234', '220030805@kluniversity.in', 'Admin'),
(2100031817, 'deepak@1234', '2100031817@kluniversity.in', 'Admin'),
(2200031219, 'pavan@1234', '2200031219@kluniversity.in', 'Admin')


-- event table

CREATE TABLE events (
    id INT NOT NULL AUTO_INCREMENT,
    eventLink VARCHAR(255) NOT NULL,
    eventName VARCHAR(255) NOT NULL,
    eventDate DATE NOT NULL,
    eventVenue VARCHAR(255) NOT NULL,
    uploadAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

INSERT INTO events (eventLink, eventName, eventDate, eventTime, eventCardNum) VALUES (?, ?, ?, ?, ?)


-- news tables 

-- news table for landscapes

CREATE TABLE news_landscape (
    id INT NOT NULL AUTO_INCREMENT,
    newsLink VARCHAR(255) NOT NULL,
    clubName VARCHAR(255) NOT NULL,
    newsContent VARCHAR(255) NOT NULL,
    uploadAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

INSERT INTO news_landscape (clubName, newsContent)
            VALUES (?, ?, ?, ?)

-- news table for portraits

CREATE TABLE news_portrait (
    id INT NOT NULL AUTO_INCREMENT,
    newsLink VARCHAR(255) NOT NULL,
    clubName VARCHAR(255) NOT NULL,
    newsContent VARCHAR(255) NOT NULL,
    uploadAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);