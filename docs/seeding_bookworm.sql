BEGIN;

TRUNCATE
  player_owns_generator,
  generator,
  player,
  sentences
RESTART IDENTITY;

INSERT INTO
  "player" ("username", "mail", "password")
VALUES
  ('Yoan', 'yoan_animateur_scrum@wanadoudou.fr', 'm@84E%M8+nk72`8K'),
  ('Agathe', 'agathe_cheffe_supreme@wanadoudou.fr', 'udix9RNG1sqt1QDE'),
  ('Philémon', 'philou_lead_tech@wanadoudou.fr', 'r4V8yLUE6gS495GM'),
  ('Bilal', 'bilal_r0xx0r_dev_front@wanadoudou.fr', 'ju746XUpD1tBKBsQ'),
  ('Thibaud', 'un_thibaud_deux_thibaud_referent_tech@wanadoudou.fr', 'Tq6H66iJFGn3r5TL'),
  ('John Doe', 'johndoe@mail.com', 'azerty');

INSERT INTO
  "generator" ("type", "name", "text", "clic_flat_value", "clic_percent_value", "idle_flat_value", "idle_percent_value", "starting_cost","cost_factor", "order")
VALUES
  (1, 'Bio Cheese', 'Eat the Bio Cheese and add 5 more KPC', 5, 0, 0, 0, 75, 1.1, 1 ),
  (1, 'Silk Touch', 'With you''r pretty pretty soft hand, your turn the page with manner, and give you 10 more KPC', 10, 0, 0, 0, 150, 1.1, 2 ),
  (1, 'Bionic Scope', 'This Scope, give you 50 KPC... AWESOME RIGHT ?', 20, 0, 0, 0, 500, 1.05, 3 ),
  (2, 'Dictionnary', 'Well.. You know what is a dictionnary don''t you ?', 0, 1.02, 0, 0, 70, 2, 1 ),
  (2, 'Wikipedia', 'A wonderful place in the web, where you can find answer to everything, and read about it.',0, 1.1, 0, 0, 150, 2, 2 ),
  (3, 'Ergonomic chair', 'To be comfortable, with technologic lumbar cylinder', 0, 0, 5, 0, 75, 1.1, 1 ),
  (3, 'Third Eye', 'To see beyond the limit of the physic world...', 0, 0, 10, 0, 150, 1.1, 2 ),
  (4, 'Intraveinous coffee', 'To maintain a good coffee rate in blood.', 0, 0, 0, 1.05, 75, 2, 1 ),
  (4, 'Universalis Encyclopepia', 'Remember, this old thing, before Wikipedia.', 0, 0, 0, 1.1, 150, 2, 2 ),
  (4, 'Audible', 'Listen, "Le temps des tempêtes" by Nicolas Sarkozy to win 9% more currency.', 0, 0, 0, 9, 10, 2, 3);

INSERT INTO
  "player_owns_generator" ("player_id", "generator_id","number_owned")
  VALUES
  (1, 1, 10),
  (1, 2, 7),
  (1, 3, 1),
  (1, 4, 2),
  (1, 6, 1),
  (1, 8, 2),
  (2, 1, 3),
  (2, 4, 2),
  (2, 5, 1),
  (3, 6, 1),
  (3, 8, 25),
  (3, 9, 2),
  (4, 1, 10),
  (4, 4, 11),
  (4, 5, 1),
  (4, 6, 2),
  (4, 8, 5),
  (5, 1, 50),
  (5, 2, 10),
  (5, 3, 1);

INSERT INTO
  "sentences" ("title", "text")
VALUES
  ('Welcome!', 'Hey, you! If you want to get the full game, and keep your game saved, you should register!'),
  ('Go read a book', 'Still here? Why don''t you get some good reading while I''m working here?'),
  ('Stop Watching Me', 'Do you know that I can''t be fully concentrated if you''re just here, watching me...'),
  ('Harry Potter', 'Have you ever heard about Harry Potter? It''s a little story about wizards, doing some magic...');

COMMIT;
