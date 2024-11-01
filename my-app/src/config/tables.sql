-- Create database
CREATE DATABASE sac;
USE sac;

-- Users table
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE, 
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role ENUM('Admin', 'club_lead') NOT NULL, 
    active BOOLEAN DEFAULT 1, 
    upload_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    RefreshToken VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (id)
);

-- Clubs table for leads
CREATE TABLE clubs ( 
    id INT NOT NULL AUTO_INCREMENT,
    club_name VARCHAR(100) NOT NULL UNIQUE,
    lead_id INT UNIQUE, 
    club_domain ENUM('TEC', 'LCH', 'ESO', 'TIE', 'HWB') NOT NULL,
    club_description TEXT DEFAULT NULL,   
    club_about TEXT DEFAULT NULL,        
    club_logo VARCHAR(255) DEFAULT NULL,
    active BOOLEAN DEFAULT 1,  
    upload_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lead_id) REFERENCES users(id) ON DELETE SET NULL, 
    PRIMARY KEY (id)
);

CREATE TABLE glimpse (
    id INT NOT NULL AUTO_INCREMENT,
    club_id INT,
    glimpse_image VARCHAR(255),
    glimpse_desc TEXT,                     
    upload_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE,
    PRIMARY KEY (id)
);

CREATE TABLE upcoming_events (
    id INT NOT NULL AUTO_INCREMENT,
    club_id INT,
    event_name VARCHAR(255) NOT NULL,
    event_image VARCHAR(255),
    event_date DATE NOT NULL,
    event_venue VARCHAR(255) NOT NULL,
    upload_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE,
    PRIMARY KEY (id)
);

CREATE TABLE activities (
    id INT NOT NULL AUTO_INCREMENT,
    club_id INT,
    activity_name VARCHAR(255) NOT NULL,
    activity_image VARCHAR(255),
    activity_date DATE NOT NULL,
    activity_venue VARCHAR(255) NOT NULL,
    upload_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE,
    PRIMARY KEY (id)
);

CREATE TABLE club_images (
    id INT NOT NULL AUTO_INCREMENT,
    club_id INT,
    hero_img VARCHAR(255),
    team_img VARCHAR(255),
    upload_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE,
    PRIMARY KEY (id)
);

CREATE TABLE faq (
    id INT NOT NULL AUTO_INCREMENT,
    club_id INT,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    upload_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE,
    PRIMARY KEY (id)
);

CREATE TABLE stats (
    id INT NOT NULL AUTO_INCREMENT,
    club_id INT,
    total_members INT DEFAULT 0,
    total_activities INT DEFAULT 0,
    total_projects INT DEFAULT 0,
    upload_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE,
    PRIMARY KEY (id)
);

CREATE TABLE socials (
    id INT NOT NULL AUTO_INCREMENT,
    club_id INT,
    social_name VARCHAR(255) NOT NULL,
    social_link VARCHAR(255) NOT NULL,
    upload_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE,
    PRIMARY KEY (id)
);

DELIMITER //

CREATE PROCEDURE AddClubData(IN clubId INT)
BEGIN
    -- Insert into glimpse table
    INSERT INTO glimpse (club_id, glimpse_image, glimpse_desc)
    VALUES (clubId, 'https://i.imghippo.com/files/pgd9685f.png', 'Dummy description for glimpse 1'),
           (clubId, 'https://i.imghippo.com/files/pgd9685f.png', 'Dummy description for glimpse 2');
    
    -- Insert into upcoming_events table
    INSERT INTO upcoming_events (club_id, event_name, event_image, event_date, event_venue)
    VALUES (clubId, 'Dummy Event 1', 'https://i.imghippo.com/files/iVT1864Oic.png', '2024-10-15', 'Dummy Venue 1'),
           (clubId, 'Dummy Event 2', 'https://i.imghippo.com/files/iVT1864Oic.png', '2024-10-20', 'Dummy Venue 2'),
           (clubId, 'Dummy Event 2', 'https://i.imghippo.com/files/iVT1864Oic.png', '2024-10-20', 'Dummy Venue 3'),
           (clubId, 'Dummy Event 2', 'https://i.imghippo.com/files/iVT1864Oic.png', '2024-10-20', 'Dummy Venue 4');
    
    -- Insert into activities table
    INSERT INTO activities (club_id, activity_name, activity_image, activity_date, activity_venue)
    VALUES (clubId, 'Dummy Activity 1', 'https://i.imghippo.com/files/iVT1864Oic.png', '2024-11-01', 'Dummy Venue A'),
           (clubId, 'Dummy Activity 2', 'https://i.imghippo.com/files/iVT1864Oic.png', '2024-11-05', 'Dummy Venue B'),
           (clubId, 'Dummy Activity 2', 'https://i.imghippo.com/files/iVT1864Oic.png', '2024-11-05', 'Dummy Venue C'),
           (clubId, 'Dummy Activity 2', 'https://i.imghippo.com/files/iVT1864Oic.png', '2024-11-05', 'Dummy Venue D');
    
    -- Insert into club_images table
    INSERT INTO club_images (club_id, hero_img, team_img)
    VALUES (clubId, 'https://i.imghippo.com/files/bEgS8115zCg.png', 'https://i.imghippo.com/files/bEgS8115zCg.png');

    -- Insert into socials table
    INSERT INTO socials (club_id, social_name, social_link)
    VALUES (clubId, 'Facebook', 'https://facebook.com'),
           (clubId, 'Instagram', 'https://instagram.com'),
           (clubId, 'Twitter', 'https://twitter.com'),
           (clubId, 'LinkedIn', 'https://linkedin.com');
    
    
    -- Insert into faq table
    INSERT INTO faq (club_id, question, answer)
    VALUES (clubId, "What is this club about?", "This is a dummy answer for the club."),
           (clubId, "How can I join?", "To join, please contact the club lead."),
           (clubId, "What events do you have?", "We have various events planned throughout the year."),
           (clubId, "Who can be a member?", "Anyone with an interest can join."),
           (clubId, "How often do you meet?", "We meet bi-weekly");
END //

DELIMITER ;

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
    news_link VARCHAR(255) NOT NULL,  
    club_name VARCHAR(255) NOT NULL,
    news_content VARCHAR(255) NOT NULL,
    upload_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- News table for portraits
CREATE TABLE news_portrait (
    id INT NOT NULL AUTO_INCREMENT,
    news_link VARCHAR(255) NOT NULL,  
    club_name VARCHAR(255) NOT NULL,
    news_content VARCHAR(255) NOT NULL,
    upload_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);


CREATE TABLE student_registration (
    id INT NOT NULL AUTO_INCREMENT,
    student_id VARCHAR(256) NOT NULL,         
    student_name VARCHAR(256) NOT NULL,      
    batch VARCHAR(256) NOT NULL,              
    department VARCHAR(50) NOT NULL,        
    gender ENUM('Male', 'Female', 'Other') NOT NULL,  
    residence VARCHAR(256) NOT NULL,        
    club_id INT NOT NULL,         
    active BOOLEAN DEFAULT 1,  -- Added active status
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   
    PRIMARY KEY (id),
    UNIQUE KEY unique_registration (student_id, club_id),  
    FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE 
);


CREATE TABLE club_activities (
    id INT NOT NULL AUTO_INCREMENT,
    club_id INT NOT NULL,   
    activity_name VARCHAR(100) NOT NULL,
    activity_type ENUM('workshop', 'activity') NOT NULL,
    club_name VARCHAR(100) NOT NULL,   
    activity_date DATE NOT NULL,
    venue VARCHAR(255) DEFAULT NULL,
    report_link VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE
);

CREATE TABLE club_projects (
    id INT NOT NULL AUTO_INCREMENT,
    club_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT DEFAULT NULL,
    club_name VARCHAR(100) NOT NULL,   
    PRIMARY KEY (id),
    FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE
);