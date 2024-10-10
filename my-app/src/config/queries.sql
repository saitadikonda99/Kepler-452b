-- source /Users/saitadikonda/Dev/Kepler-452b/my-app/src/config/tables.sql;


INSERT INTO users (username, name, password, email, role, RefreshToken) VALUES
('2200030805', 'random', '123', 'sai@gmail.com', 'Admin', NULL);


ALTER TABLE users ADD COLUMN active BOOLEAN DEFAULT 1;
ALTER TABLE clubs ADD COLUMN active BOOLEAN DEFAULT 1;