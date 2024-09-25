-- create database

CREATE DATABASE sac;

use sac;

-- users database

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    username BIGINT NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(255) NOT NULL,
    RefreshToken VARCHAR(255) Default NULL,
    PRIMARY KEY (id)    
);

-- clubs table for leads
CREATE TABLE club (
    id INT NOT NULL AUTO_INCREMENT,
    club_name VARCHAR(255) NOT NULL UNIQUE,
    lead_id INT NOT NULL UNIQUE,   
    FOREIGN KEY (lead_id) REFERENCES users(id),
    PRIMARY KEY (id)
);

-- club Data
CREATE TABLE club_data (
    id INT NOT NULL AUTO_INCREMENT,
    club_id INT NOT NULL,
    club_name VARCHAR(255) NOT NULL,
    club_lead_id INT NOT NULL,
    club_description VARCHAR(255) NOT NULL,
    club_logo VARCHAR(255) NOT NULL,
    uploadAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (club_id) REFERENCES club(id),
    FOREIGN KEY (club_lead_id) REFERENCES users(id),
    PRIMARY KEY (id)
);

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

CREATE TABLE news_portrait (
    id INT NOT NULL AUTO_INCREMENT,
    newsLink VARCHAR(255) NOT NULL,
    clubName VARCHAR(255) NOT NULL,
    newsContent VARCHAR(255) NOT NULL,
    uploadAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);