-- source /Users/saitadikonda/Dev/Kepler-452b/my-app/src/config/tables.sql;


INSERT INTO users (username, name, password, email, role, RefreshToken) VALUES
('2200030805', 'random', '$2b$10$QtfYSsQ/Y71udwuJJGeo6e/t5H5y6U5FvxpTOtG.6zM2XMdVRE14S', 'sai@gmail.com', 'Admin', NULL);

INSERT INTO users (username, name, password, email, role, RefreshToken) VALUES
('2300033327', 'reycaa', '123', 'rekha@gmail.com', 'Admin', NULL);

ALTER TABLE users ADD COLUMN active BOOLEAN DEFAULT 1;
ALTER TABLE clubs ADD COLUMN active BOOLEAN DEFAULT 1;
ALTER TABLE users ADD COLUMN upload_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

CREATE INDEX idx_username_password ON users(username, password);

DROP PROCEDURE IF EXISTS AddClubData;

UPDATE socials 
SET social_name = 'Telegram', social_link = 'https://telegram.com'
WHERE social_name = 'Facebook';


ALTER TABLE clubs MODIFY club_domain ENUM('TEC', 'LCH', 'ESO', 'HWB', 'IIE') NOT NULL;


INSERT INTO events (event_link, event_name, event_date, event_venue)
VALUES 
('https://i.imghippo.com/files/iVT1864Oic.png', 'Tech Conference 2024', '2024-11-15', 'Main Hall A'),
('https://i.imghippo.com/files/iVT1864Oic.png', 'AI Workshop', '2024-12-01', 'Lab 2, Building C'),
('https://i.imghippo.com/files/iVT1864Oic.png', 'Coding Hackathon', '2024-12-10', 'Auditorium B'),
('https://i.imghippo.com/files/iVT1864Oic.png', 'Startup Summit', '2025-01-05', 'Expo Center D');


INSERT INTO news_portrait (news_link, club_name, news_content)
VALUES 
('https://i.imghippo.com/files/iVT1864Oic.png', 'Tech Club', 'Hosted a successful hackathon for freshmen.'),
('https://i.imghippo.com/files/iVT1864Oic.png', 'AI Society', 'Conducted a workshop on machine learning basics.'),
('https://i.imghippo.com/files/iVT1864Oic.png', 'Coding Club', 'Launched a new coding challenge platform.'),
('https://i.imghippo.com/files/iVT1864Oic.png', 'Robotics Club', 'Built and demonstrated a humanoid robot.');

INSERT INTO news_landscape (news_link, club_name, news_content)
VALUES 
('https://i.imghippo.com/files/bEgS8115zCg.png', 'Art Club', 'Organized an exhibition showcasing student artwork.'),
('https://i.imghippo.com/files/bEgS8115zCg.png', 'Music Club', 'Performed a live concert to raise funds for charity.');



ALTER TABLE users
MODIFY COLUMN role ENUM('Admin', 'club_lead', 'student') NOT NULL;


INSERT INTO academic_years (year_range, semester)
VALUES
    ('2024-25', 'Even'),
    ('2025-26', 'Odd'),
    ('2025-26', 'Even'),
    ('2026-27', 'Odd'),
    ('2026-27', 'Even'),
    ('2027-28', 'Odd'),
    ('2027-28', 'Even'),
    ('2028-29', 'Odd'),
    ('2028-29', 'Even'),
    ('2029-30', 'Odd');


ALTER TABLE courses
MODIFY course_handout TEXT;


 ALTER TABLE sessions ADD COLUMN session_for ENUM('all', 'Hosteler', 'Day Scholar') NOT NULL DEFAULT 'all';