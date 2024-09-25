INSERT INTO users (username, name, password, email, role, RefreshToken) VALUES
('2200030805', 'random', '123', 'sai@gmail.com', 'Admin', NULL),
('2200030806', 'random', 'securepassword1', 'amarnadh@example.com', 'Club Lead', NULL),
('2200030807', 'random', 'securepassword2', 'harshitha@example.com', 'Club Lead', NULL),
('2200030808', 'random', 'securepassword3', 'vidya@example.com', 'Club Lead', NULL),
('2200030809', 'random', 'securepassword4', 'chaitanya@example.com', 'Club Lead', NULL),
('2200030810', 'random', 'securepassword5', 'design@example.com', 'Club Lead', NULL),
('2200030811', 'random', 'securepassword6', 'sri.lasya@example.com', 'Club Lead', NULL),
('2200030812', 'random', 'securepassword7', 'gopi@example.com', 'Club Lead', NULL),
('2200030813', 'random', 'securepassword8', 'manish@example.com', 'Club Lead', NULL),
('2200030814', 'random', 'securepassword9', 'vineel@example.com', 'Club Lead', NULL);

-- Insert into club table
INSERT INTO club (club_name, lead_id)
VALUES
('Agriculture Culture Club', 3),
('Crypto Club', 4),
('Cybersecurity Club', 5),
('Design Shpere', 6),
('Luminary Digital Club', 7),
('Mobile E-Sports Club', 8),
('Prompt-o-ventures', 9),
('Respawn(Game Development)', 10);

-- Insert into club_data table
INSERT INTO club_data (club_id, club_name, club_lead_id, club_description, club_logo)
VALUES
(10, 'Agriculture Culture', 3, 'Cultivating innovation in farming practices and sustainability for a greener future.', 'https://firebasestorage.googleapis.com/.../Agriculture.jpg'),
(11, 'Crypto Club', 4, 'Delve into the world of cryptocurrencies, blockchain technology, and investment strategies.', 'https://firebasestorage.googleapis.com/.../Crypto.png'),
(12, 'Cybersecurity Club', 5, 'Learn about cybersecurity threats and defenses while developing skills to protect digital assets.', 'https://firebasestorage.googleapis.com/.../CyberSecurity.jpg'),
(13, 'Design Sphere', 6, 'Explore the realms of graphic design, UX/UI principles, and innovative creative projects.', 'https://firebasestorage.googleapis.com/.../Luminary%20Digital.jpg'),
(14, 'Luminary Digital Club', 7, 'Engage in digital marketing strategies, social media trends, and the future of online content.', 'https://firebasestorage.googleapis.com/.../Luminary%20Digital.jpg'),
(15, 'Mobile E-Sports Club', 8, 'Compete in mobile gaming tournaments and improve your skills in various e-sports titles.', 'https://firebasestorage.googleapis.com/.../Luminary%20Digital.jpg'),
(16, 'Prompt-o-ventures', 9, 'Embark on entrepreneurial adventures with projects aimed at real-world problem solving.', 'https://firebasestorage.googleapis.com/.../promt.png'),
(17, 'Respawn (Game Development)', 10, 'Collaborate on creating games from concept to execution and learn game design principles.', 'https://firebasestorage.googleapis.com/.../respawn.jpg');