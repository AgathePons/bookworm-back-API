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
  "generator" ("type", "name", "text", "clic_flat_value", "clic_percent_value", "idle_flat_value", "idle_percent_value", "starting_cost","cost_factor", "order", "icon")
VALUES
  (1, 'Bio Cheese', 'Eat the Bio Cheese and add 5 more KPC ', 5, 0, 0, 0, 75, 1.1, 1, 'bio-cheese' ),
  (1, 'Silk Touch', 'With your pretty little soft hand your turn the page with manner, and five you 10 more KPC', 75, 0, 0, 0, 150, 1.1, 2, 'silk-touch' ),
  (1, 'High-tech Mouse', 'High ergonomic mouse perfect for long hours of clicking.', 250, 0, 0, 0, 500, 2.3, 3, 'high-tech-mouse' ),
  (1, 'I-cucumber', 'The latest smartphone for better performance', 1000, 0, 0, 0, 2500, 3, 4, 'i-cucumber' ),
  (1, 'Smart Screen', 'Screen with finger detection for a better touch speed',2000, 0, 0, 0, 10000, 3.3, 5, 'smart-screen' ),
  (1, 'Driver''s Stylus', 'A revolutionary stylus that sends touch information to the millisecond!', 5000, 0, 0, 0, 60000, 3.9, 6, 'driver-stylus' ),
  (1, 'Touch Glove', 'The best of the touch, in the best of the textiles.', 12000, 0, 0, 0, 250000, 5.5, 7, 'touch-glove' ),
  (1, 'Thought Sensor', 'You put it on your temple and think, “Touch, touch, touch” and it works !', 100000, 0, 0, 0, 500000, 5.5, 8, 'thought-sensor' ),
  (1, 'Smart Wifi', 'Faster, smarter and more expensive this wifi will save you precious seconds',350000, 0, 0, 0, 10000000, 6, 9, 'smart-wifi' ),
  (1, 'Optical Fiber', 'A thousand times faster than your imagination', 1000000, 0, 0, 0, 100000000, 9.3, 10, 'optical-fiber'),
  (2, 'Bionic Finger', 'Bionic finger that helps you click twice as fast !', 0, 1, 0, 0, 1000, 5.9, 1, 'bionic-finger' ),
  (2, 'Bionic Scope', 'This Scope gives you 1.1% more.', 0, 1.1, 0, 0, 7000, 6.5, 2, 'bionic-scope' ),
  (2, 'External Battery', 'An external battery, to never miss our appointment', 0, 1.3, 0, 0, 35000, 6.9, 3, 'external-battery' ),
  (2, 'Ultra Fast Charger', 'Faster, I reload you and you click.', 0, 1.8, 0, 0, 75000, 7, 4, 'ultra-fast-charger' ),
  (2, 'Bio Boosting Pill', 'It''s good, it''s organic and it makes you better!',0, 2, 0, 0, 100000, 7.1, 5, 'bio-boosting-pill' ),
  (2, 'Red Pill', 'You never had a choice, Neo. But you''ll click harder!', 0, 2.5, 0, 0, 200000, 7.5, 6, 'red-pill' ),
  (2, 'Blue Pill', 'Now you have a choice. BE STRONG!', 0, 2.5, 0, 0, 200000, 7.5, 7, 'blue-pill' ),
  (2, 'Finger Training', 'Every practice will make you better with your fingers', 0, 3, 0, 0, 500000, 7.9, 8, 'finger-training' ),
  (2, 'Finger Implant', 'With this implant, you will be 5% more powerful and since you are already very good, you will be really good!', 0, 5, 0, 0, 1000000, 8, 9, 'finger-implant' ),
  (2, 'Neural Implant', 'Boosting your fingers is good, but boosting your brain is even better. Be fast, be precise!', 0, 10, 0, 0, 100000000, 8.5, 10, 'neural-implant'),
  (3, 'Intravenous Coffee', 'To maintain a good coffee rate in blood', 0, 0, 100, 0, 4000, 2.2, 1, 'intravenous-coffee' ),
  (3, 'Ergonomic Chair', 'To be comfortable, with technologic lumbar cylinder', 0, 0, 500, 0, 10000, 2.2, 2, 'ergonomic-chair' ),
  (3, 'Audible', 'Listen, “Le temps des tempêtes” by Grumpy to win 1k more IFV', 0, 0, 1000, 0, 10000, 2, 3, 'audible' ),
  (3, '4k Lens', 'The bookworm puts on its best lenses to read faster !', 0, 0, 5000, 0, 250000, 1.1, 4, '4k-lens' ),
  (3, 'Bluetooth Magnifier', 'A beautiful technological magnifying glass that helps the bookworm to read the small print !',0, 0, 8000, 0, 500000, 1.8, 5, 'bluetooth-magnifier' ),
  (3, 'DeepLingo', 'A great application that helps translate different languages to better understand your reading!', 0, 0, 25000, 0, 2000000, 1.1, 6, 'deeplingo' ),
  (3, 'Binch Reading', 'The bookworm goes into binch-reading mode and starts devouring books more actively!', 0, 0, 50000, 0, 4000000, 1.8, 7, 'binch-reading' ),
  (3, 'Absolute Concentration', 'The Bookworm enters a state of transcendence and starts reading much faster!', 0, 0, 100000, 0, 5000000, 2, 8, 'absolute-concentration' ),
  (3, 'The Quiet Room', 'The Bookworm settles into its reading room. Perfect visibility, ideal atmospheric condition, not a sound around!', 0, 0, 500000, 0, 10000000, 2.2, 9, 'the-quiet-room' ),
  (3, 'Sensory Isolation', 'It''s no longer a joke, the bookworm enters its sensory isolation chamber, and the lines are inscribed directly into its soul!', 0, 0, 1000000, 0, 1000000000, 5, 10, 'sensory-isolation'),
  (4, 'Dictionary', 'Well, you know what a dictionary is, don’t you ?', 0, 0, 0, 1.02, 50000, 3, 1, 'dictionary' ),
  (4, 'Wikipedia', 'A wonderful place on the web, where you can find answers to everything, and read about it.', 0, 0, 0, 1.5, 100000, 3, 2, 'wikipedia' ),
  (4, 'Front Lamp', 'The front lamp to read even at night !', 0, 0, 0, 1, 750000, 2.3, 3, 'front-lamp' ),
  (4, 'Reading Overlay', 'The next step... Two books next to each other and the bookworm devours them at the same time, its knowledge progression is crazy!', 0, 0, 0, 2, 3000000, 6, 4, 'reading-overlay' ),
  (4, 'Prescience', 'The Bookworm reads from the future three seconds ahead.',0, 0, 0, 2.4, 10000000, 7, 5, 'prescience' ),
  (4, 'The Authors'' Headset', 'The Bookworm puts on these earpieces that allow him to hear the authors dictate their creations in progress.', 0, 0, 0, 2.5, 1000000000, 7.5, 6, 'the-authors-Headset' ),
  (4, 'Unfinished Books', 'The Bookworm is conscientious and will even read books that have never been finished, the forgotten ones. No knowledge will escape him!', 0, 0, 0, 3, 500000000000, 7.9, 7, 'unfinished-books' ),
  (4, 'The Twin', 'The Bookworm''s twin joins him to help him do this monstrous job and boy is he fast!', 0, 0, 0, 4, 10000000000000, 8, 8, 'the-twin' ),
  (4, 'Third Eye', 'To see beyond the limit of the physic world', 0, 0, 0, 5, 500000000000000, 9, 9, 'third-eye' ),
  (4, 'Universalis Encyclopedia', 'Remember, this old Encyclopedia, before Wikipedia.', 0, 0, 0, 10, 900000000000000, 10, 10, 'universalis-encyclopedia');

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
