BEGIN;

TRUNCATE
  player_owns_generator,
  generator,
  player,
  sentences
RESTART IDENTITY;


INSERT INTO
  "generator" ("type", "name", "text", "clic_flat_value", "clic_percent_value", "idle_flat_value", "idle_percent_value", "starting_cost","cost_factor", "order", "icon")
VALUES
  (1, 'Bio Cheese', 'Eat the Bio Cheese and add 5 more KPC ', 2, 0, 0, 0, 20, 1.2, 1, 'biocheese' ),
  (1, 'Silk Touch', 'With your pretty little soft hand your turn the page with manner, and five you 10 more KPC', 5, 0, 0, 0, 100, 1.2, 2, 'silktouch' ),
  (1, 'High-tech Mouse', 'High ergonomic mouse perfect for long hours of clicking.', 7, 0, 0, 0, 250, 1.2, 3, 'hightechmouse' ),
  (1, 'I-cucumber', 'The latest smartphone for better performance', 11, 0, 0, 0, 2500, 1.3, 4, 'icucumber' ),
  (1, 'Smart Screen', 'Screen with finger detection for a better touch speed',15, 0, 0, 0, 10000, 1.3, 5, 'smartscreen' ),
  (1, 'Driver''s Stylus', 'A revolutionary stylus that sends touch information to the millisecond!', 25, 0, 0, 0, 50000, 1.3, 6, 'driverstylus' ),
  (1, 'Touch Glove', 'The best of the touch, in the best of the textiles.', 21, 0, 0, 0, 250000, 5.5, 7, 'touchglove' ),
  (1, 'Thought Sensor', 'You put it on your temple and think, “Touch, touch, touch” and it works !', 23, 0, 0, 0, 500000, 5.5, 8, 'thoughtsensor' ),
  (1, 'Smart Wifi', 'Faster, smarter and more expensive this wifi will save you precious seconds',50, 0, 0, 0, 10000000, 6, 9, 'smartwifi' ),
  (1, 'Optical Fiber', 'A thousand times faster than your imagination', 100, 0, 0, 0, 1000000000, 9.3, 10, 'opticalfiber'),

  (2, 'Bionic Finger', 'Bionic finger that helps you click twice as fast !', 0, 1.05, 0, 0, 1000, 1.5, 1, 'bionicfinger' ),
  (2, 'Bionic Scope', 'This Scope gives you 1.1% more.', 0, 1.05, 0, 0, 5000, 1.5, 2, 'bionicscope' ),
  (2, 'External Battery', 'An external battery, to never miss our appointment', 0, 1.1, 0, 0, 35000, 1.5, 3, 'externalbattery' ),
  (2, 'Ultra Fast Charger', 'Faster, I reload you and you click.', 0, 1.15, 0, 0, 75000, 1.5, 4, 'ultrafastcharger' ),
  (2, 'Bio Boosting Pill', 'It''s good, it''s organic and it makes you better!',0, 1.2, 0, 0, 100000, 1.5, 5, 'bioboostingpill' ),
  (2, 'Red Pill', 'You never had a choice, Neo. But you''ll click harder!', 0, 1.5, 0, 0, 200000, 1.5, 6, 'redpill' ),
  (2, 'Blue Pill', 'Now you have a choice. BE STRONG!', 0, 1.75, 0, 0, 200000, 1.5, 7, 'bluepill' ),
  (2, 'Finger Training', 'Every practice will make you better with your fingers', 0, 2, 0, 0, 500000, 1.6, 8, 'fingertraining' ),
  (2, 'Finger Implant', 'With this implant, you will be 5% more powerful and since you are already very good, you will be really good!', 0, 5, 0, 0, 1000000, 1.6, 9, 'fingerimplant' ),
  (2, 'Neural Implant', 'Boosting your fingers is good, but boosting your brain is even better. Be fast, be precise!', 0, 10, 0, 0, 100000000, 1.6, 10, 'neuralimplant'),

  (3, 'Bookworm', 'Let''s go little bookworm!', 0, 0, 2, 0, 200, 1.2, 1, 'bookworm' ),
  (3, 'Ergonomic Chair', 'To be comfortable, with technologic lumbar cylinder', 0, 0, 5, 0, 1000, 1.2, 2, 'ergonomicchair' ),
  (3, 'Audible', 'Listen, “Le temps des tempêtes” by Grumpy to win 1k more IFV', 0, 0, 7, 0, 2500, 1.2, 3, 'audible' ),
  (3, '4k Lens', 'The bookworm puts on its best lenses to read faster !', 0, 0, 11, 0, 25000, 1.3, 4, 'fourlens' ),
  (3, 'Bluetooth Magnifier', 'A beautiful technological magnifying glass that helps the bookworm to read the small print !',0, 0, 15, 0, 100000, 1.3, 5, 'bluetoothmagnifier' ),
  (3, 'DeepLingo', 'A great application that helps translate different languages to better understand your reading!', 0, 0, 175, 0, 2000000, 5.1, 6, 'deeplingo' ),
  (3, 'Binch Reading', 'The bookworm goes into binch-reading mode and starts devouring books more actively!', 0, 0, 210, 0, 4000000, 5.8, 7, 'binchreading' ),
  (3, 'Absolute Concentration', 'The Bookworm enters a state of transcendence and starts reading much faster!', 0, 0, 250, 0, 5000000, 5, 8, 'absoluteconcentration' ),
  (3, 'The Quiet Room', 'The Bookworm settles into its reading room. Perfect visibility, ideal atmospheric condition, not a sound around!', 0, 0,300, 0, 10000000, 5.2, 9, 'thequietroom' ),
  (3, 'Sensory Isolation', 'It''s no longer a joke, the bookworm enters its sensory isolation chamber, and the lines are inscribed directly into its soul!', 0, 0, 1000, 0, 1000000000, 5, 10, 'sensoryisolation'),

  (4, 'Dictionary', 'Well, you know what a dictionary is, don’t you ?', 0, 0, 0, 1.05, 5000, 1.5, 1, 'dictionary' ),
  (4, 'Wikipedia', 'A wonderful place on the web, where you can find answers to everything, and read about it.', 0, 0, 0, 1.05, 25000, 1.5, 2, 'wikipedia' ),
  (4, 'Front Lamp', 'The front lamp to read even at night !', 0, 0, 0, 1.1, 750000, 5.3, 3, 'frontlamp' ),
  (4, 'Reading Overlay', 'The next step... Two books next to each other and the bookworm devours them at the same time, its knowledge progression is crazy!', 0, 0, 0, 1.15, 3000000, 6, 4, 'readingoverlay' ),
  (4, 'Prescience', 'The Bookworm reads from the future three seconds ahead.',0, 0, 0, 1.2, 10000000, 7, 5, 'prescience' ),
  (4, 'The Authors'' Headset', 'The Bookworm puts on these earpieces that allow him to hear the authors dictate their creations in progress.', 0, 0, 0, 1.5, 1000000000, 7.5, 6, 'theauthorsheadset' ),
  (4, 'Unfinished Books', 'The Bookworm is conscientious and will even read books that have never been finished, the forgotten ones. No knowledge will escape him!', 0, 0, 0, 1.75, 500000000000, 7.9, 7, 'unfinishedbooks' ),
  (4, 'The Twin', 'The Bookworm''s twin joins him to help him do this monstrous job and boy is he fast!', 0, 0, 0, 2, 10000000000000, 1.6, 8, 'thetwin' ),
  (4, 'Third Eye', 'To see beyond the limit of the physic world', 0, 0, 0, 5, 500000000000000, 1.6, 9, 'thirdeye' ),
  (4, 'Universalis Encyclopedia', 'Remember, this old Encyclopedia, before Wikipedia.', 0, 0, 0, 10, 900000000000000, 1.6, 10, 'universalisencyclopedia');

INSERT INTO
  "sentences" ("title", "text")
VALUES
  ('Welcome!', 'Hey, you! If you want to get the full game, and keep your game saved, you should register!'),
  ('Go read a book', 'Still here? Why don''t you get some good reading while I''m working here?'),
  ('Stop Watching Me', 'Do you know that I can''t be fully concentrated if you''re just here, watching me...'),
  ('Harry Potter', 'Have you ever heard about Harry Potter? It''s a little story about wizards, doing some magic...'),
  ('Bookbuster', 'Looking for a good book? www.bookbuster.com. Enjoy your reading!');

COMMIT;
