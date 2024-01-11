-- Kepler-452b Database Design

-- Tables list for database: kepler452b

-- 1. Users 
-- 2. Hero Module
-- 3. About SAC
-- 4. Glimpses of Activities
-- 5. Glimpses Stats
-- 6. Divisions within SAC (TEC, LCH, IIE, ESO)
-- 7. Group Photo
-- 8. News and latest updates
-- 9. Upcoming activities
-- 10. Leadership of SAC
-- 11. Frequently asked questions
-- 12. Clubs organography

-- --------------------------------------------------------

-- Tables 

-- Table structure for table `users`

CREATE TABLE users (
    id INT(11) NOT NULL AUTO_INCREMENT,
    username BIGINT(20) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(255) NOT NULL,  -- default admin for now 
    RefreshToken VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (id)
);


-- Table structure for table `hero`

CREATE TABLE hero (
    id INT(11) NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    video VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

-- Table structure for table `about`


-- Table structure for table `glimpses`

CREATE TABLE glimpses (
    id INT(11) NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

-- Table structure for table `Glimpses Stats`

CREATE TABLE glimpses_stats (
    id INT(11) NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    count INT(11) NOT NULL,
    PRIMARY KEY (id)
);



-- Table structure for table `division domains`

CREATE TABLE division_domains (
    id INT(11) NOT NULL AUTO_INCREMENT,
    image VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

-- Table structure for group photo 

CREATE TABLE group_photo (
    id INT(11) NOT NULL AUTO_INCREMENT,
    image VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

-- Table structure for table `news`

CREATE TABLE news (
    id INT(11) NOT NULL AUTO_INCREMENT,
    image VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

-- Table structure for table `upcoming activities`

CREATE TABLE upcoming_activities (
    id INT(11) NOT NULL AUTO_INCREMENT,
    image VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    date VARCHAR(255) NOT NULL,
    venue VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

-- Table structure for table `leadership`

CREATE TABLE leadership (
    id INT(11) NOT NULL AUTO_INCREMENT,
    image VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    designation VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

-- Table structure for table `faq`

CREATE TABLE faq (
    id INT(11) NOT NULL AUTO_INCREMENT,
    question VARCHAR(255) NOT NULL,
    answer VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

-- Table structure for table `clubs`

CREATE TABLE clubs (
    id INT(11) NOT NULL AUTO_INCREMENT,
    logo VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    domain VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);