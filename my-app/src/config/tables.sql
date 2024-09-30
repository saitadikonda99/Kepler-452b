-- Create database
CREATE DATABASE sac;
USE sac;

-- Users table
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE, -- Changed from BIGINT to VARCHAR for consistency
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role ENUM('Admin', 'club_lead') NOT NULL, 
    RefreshToken VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (id)
);

-- Clubs table for leads
CREATE TABLE clubs ( 
    id INT NOT NULL AUTO_INCREMENT,
    club_id INT,
    club_name VARCHAR(100) NOT NULL UNIQUE,
    lead_id INT UNIQUE, 
    FOREIGN KEY (lead_id) REFERENCES users(id) ON DELETE SET NULL, 
    PRIMARY KEY (id)
);

-- Club data table (linked to club_id)
CREATE TABLE club_data (
    id INT NOT NULL AUTO_INCREMENT,
    club_id INT,
    club_domain ENUM('TEC', 'LCH', 'ESO', 'TIE', 'HWB') NOT NULL,
    club_description VARCHAR(255) NOT NULL,
    club_logo VARCHAR(255) NOT NULL,
    upload_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE,
    PRIMARY KEY (id)
);

-- Events table
CREATE TABLE events (
    id INT NOT NULL AUTO_INCREMENT,
    event_link VARCHAR(255) NOT NULL,
    event_name VARCHAR(255) NOT NULL,
    event_date DATE NOT NULL,
    event_venue VARCHAR(255) NOT NULL,
    upload_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- News tables 

-- News table for landscapes
CREATE TABLE news_landscape (
    id INT NOT NULL AUTO_INCREMENT,
    news_link VARCHAR(255) NOT NULL, -- Changed to lowercase for consistency
    club_name VARCHAR(255) NOT NULL,
    news_content VARCHAR(255) NOT NULL,
    upload_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- News table for portraits
CREATE TABLE news_portrait (
    id INT NOT NULL AUTO_INCREMENT,
    news_link VARCHAR(255) NOT NULL, -- Changed to lowercase for consistency
    club_name VARCHAR(255) NOT NULL,
    news_content VARCHAR(255) NOT NULL,
    upload_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
