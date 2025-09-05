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
    role ENUM('Admin', 'club_lead', 'student') NOT NULL, 
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
    VALUES (clubId, 'Telegram', 'https://telegram.com'),
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


CREATE TABLE club_projects (
    id INT NOT NULL AUTO_INCREMENT,
    club_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT DEFAULT NULL,
    club_name VARCHAR(100) NOT NULL,   
    PRIMARY KEY (id),
    FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE
);


-- Student registration for clubs

CREATE TABLE user_details (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    id_number VARCHAR(100) UNIQUE NOT NULL,
    branch VARCHAR(100) NOT NULL,
    email_id VARCHAR(100) UNIQUE NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    country_code VARCHAR(5) DEFAULT NULL,
    phone_number VARCHAR(15) DEFAULT NULL,
    residency ENUM('Day Scholar', 'Hosteler') NOT NULL,
    hostel_name VARCHAR(100) DEFAULT NULL,
    bus_route VARCHAR(100) DEFAULT NULL,
    country VARCHAR(100) NOT NULL,
    state VARCHAR(100) DEFAULT NULL,
    district VARCHAR(100) DEFAULT NULL,
    pincode VARCHAR(10) DEFAULT NULL,
    club_id INT DEFAULT NULL,
    domain ENUM('TEC', 'LCH', 'ESO', 'HWB', 'IIE') NOT NULL,
    erp_reference_number VARCHAR(255) DEFAULT NULL,
    payment_status ENUM('Paid', 'Unpaid') NOT NULL DEFAULT 'Unpaid',
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE SET NULL
);

CREATE TABLE academic_years (
    id INT NOT NULL AUTO_INCREMENT,
    year_range VARCHAR(20) NOT NULL, 
    semester ENUM('Odd', 'Even') NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (year_range, semester)  
);

CREATE TABLE courses (
    id INT NOT NULL AUTO_INCREMENT,
    course_code VARCHAR(20) NOT NULL UNIQUE,
    course_name VARCHAR(255) NOT NULL UNIQUE,
    course_handout VARCHAR(255) DEFAULT NULL,
    course_level ENUM('Beginner', 'Intermediate', 'Advanced') NOT NULL DEFAULT 'Beginner',
    register_students INT NOT NULL DEFAULT 0,
    course_slots INT NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT 1,
    club_id INT NOT NULL,
    academic_year_id INT NOT NULL,  
    PRIMARY KEY (id),
    FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE,
    FOREIGN KEY (academic_year_id) REFERENCES academic_years(id) ON DELETE CASCADE  
);

CREATE TABLE course_registrations (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    academic_year_id INT NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (academic_year_id) REFERENCES academic_years(id) ON DELETE CASCADE
);

CREATE TABLE registration_status (
    id INT NOT NULL AUTO_INCREMENT,
    academic_year_id INT NOT NULL,
    status BOOLEAN DEFAULT 1,
    PRIMARY KEY (id),
    UNIQUE (academic_year_id),  
    FOREIGN KEY (academic_year_id) REFERENCES academic_years(id) ON DELETE CASCADE
);

CREATE TABLE sessions (
    id INT NOT NULL AUTO_INCREMENT,
    academic_year_id INT NOT NULL,
    session_name VARCHAR(255) NOT NULL,
    session_type ENUM('Lecture', 'Workshop', 'Seminar', 'Webinar', 'Practice', 'Project Review', 'Hackathon', 'Learnathon', 'Other') NOT NULL,
    session_date DATE NOT NULL,
    session_sTime TIME NOT NULL,
    session_eTime TIME NOT NULL,
    session_venue VARCHAR(255) NOT NULL,
    session_course_id INT NOT NULL,
    session_club_id INT NOT NULL,
    session_lead_id INT NOT NULL,
    session_points INT NOT NULL DEFAULT 0,
    session_for ENUM('all', 'Hosteler', 'Day Scholar') NOT NULL DEFAULT 'all',
    session_neg_points INT NOT NULL DEFAULT 0,
    session_resource_person INT NOT NULL,
    is_active BOOLEAN DEFAULT 0,
    session_report TEXT DEFAULT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (academic_year_id) REFERENCES academic_years(id) ON DELETE CASCADE,
    FOREIGN KEY (session_course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (session_club_id) REFERENCES clubs(id) ON DELETE CASCADE,
    FOREIGN KEY (session_lead_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE session_inCharges (
    id INT NOT NULL AUTO_INCREMENT,
    session_id INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE session_attendance (
    id INT NOT NULL AUTO_INCREMENT,
    session_id INT NOT NULL,
    user_id INT NOT NULL,
    attendance_status ENUM('Present', 'Absent') NOT NULL DEFAULT 'Absent',
    attendance_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    attendance_points INT NOT NULL DEFAULT 0,
    resource_person_points INT NOT NULL DEFAULT 0,
    inCharge_points INT NOT NULL DEFAULT 0,
    extra_points INT NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Team members table
CREATE TABLE team_members (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    linkedin_url VARCHAR(500) DEFAULT NULL,
    email VARCHAR(255) NOT NULL,
    category ENUM('leadership', 'coordinators', 'club_leaders', 'core_team', 'staff', 'trainers', 'mentors', 'previous_council') NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);