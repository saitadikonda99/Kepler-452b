-- source /Users/saitadikonda/Dev/Kepler-452b/my-app/src/config/tables.sql;


INSERT INTO users (username, name, password, email, role, RefreshToken) VALUES
('2200030805', 'random', '123', 'sai@gmail.com', 'Admin', NULL);


-- Event table
CREATE TABLE events (
    id INT NOT NULL AUTO_INCREMENT,
    eventLink VARCHAR(255) NOT NULL,
    eventName VARCHAR(255) NOT NULL,
    eventDescription VARCHAR(255) DEFAULT NULL, -- Optional description field
    eventDate DATE NOT NULL,
    eventStartTime TIME NOT NULL, -- Start time for the event
    eventEndTime TIME DEFAULT NULL, -- End time for the event (optional)
    eventVenue VARCHAR(255) NOT NULL,
    uploadAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- Unified news table for both landscape and portrait news
CREATE TABLE news (
    id INT NOT NULL AUTO_INCREMENT,
    newsLink VARCHAR(255) NOT NULL,
    club_id INT NOT NULL, -- Link to club
    newsContent TEXT NOT NULL, -- Changed to TEXT for more content space
    news_type ENUM('landscape', 'portrait') NOT NULL, -- Type of news
    uploadAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (club_id) REFERENCES club(club_id) ON DELETE CASCADE, -- If a club is deleted, cascade delete the news
    PRIMARY KEY (id)
);