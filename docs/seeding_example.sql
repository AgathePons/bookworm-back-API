-- Script to create example seeding for example tables
BEGIN;

TRUNCATE object1, object2 RESTART IDENTITY;

INSERT INTO "object2" (label, text_content) VALUES
('Object2 n°1', 'This object2 is number 1'),
('Object2 n°2', 'This object2 is number 2'),
('Object2 n°3', 'This object2 is number 3');

INSERT INTO "object1" (title, content, object2_id) VALUES
('1st object1', 'This is the first object1 of the database', 2),
('2nd object1', 'This is the second object1 of the database', 2),
('3rd object1', 'This is the third object1 of the database', 3),
('4th object1', 'This is the fourth object1 of the database', 1),
('5th object1', 'This is the fifth object1 of the database', 1);

COMMIT;
