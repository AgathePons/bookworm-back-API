/* eslint-disable max-len */

// requête sur la table player
/*
SELECT * FROM player WHERE id=1;
*/
let player = {
  id: 145,
  name: 'blabla',
  username: 'blabla',
  mail: 'blabla',
  idle_value: 0,
  clic_value: 1,
  clic_counter: 2000,
  prestige_level: 1,
  logout_time: 'date',
  login_time: 'date',
};

// requête qui envoie tous les generators que le player a
/*
SELECT player.username, json_agg(generator.*) as generators
FROM player_owns_generator
JOIN player ON player_owns_generator.player_id=player.id
JOIN generator ON player_owns_generator.generator_id=generator.id
WHERE player_owns_generator.player_id=5
GROUP BY player.username;
*/
let playerGeneratorOwned = [{
  id: 2,
  type: 1,
  name: 'Silk Touch',
  text: "With you'r pretty pretty soft hand, your turn the page with manner, and give you 10 more KPC",
  clic_flat_value: 10,
  clic_percent_value: 0,
  idle_flat_value: 0,
  idle_percent_value: 0,
  starting_cost: 150,
  cost_factor: 1.07,
  order: 2,
},
{
  id: 3,
  type: 1,
  name: 'Bionic Scope',
  text: 'This Scope, give you 50 KPC... AWESOME RIGHT ?',
  clic_flat_value: 20,
  clic_percent_value: 0,
  idle_flat_value: 0,
  idle_percent_value: 0,
  starting_cost: 500,
  cost_factor: 1.07,
  order: 3,
},
];

// requête qui envoie tous les generators que le player n'a pas
/*

*/
const playerGeneratorNotOwned = [{
  id: 1,
  type: 1,
  name: 'Bio Cheese',
  text: 'Eat the Bio Cheese and add 5 more KPC',
  clic_flat_value: 5,
  clic_percent_value: 0,
  idle_flat_value: 0,
  idle_percent_value: 0,
  starting_cost: 75,
  cost_factor: 1.07,
  order: 1,
},
{
  id: 4,
  type: 1,
  name: 'Silk Touch',
  text: "With you'r pretty pretty soft hand, your turn the page with manner, and give you 10 more KPC",
  clic_flat_value: 10,
  clic_percent_value: 0,
  idle_flat_value: 0,
  idle_percent_value: 0,
  starting_cost: 150,
  cost_factor: 1.07,
  order: 2,
},
];

// requête qui envoie les informations de table d'association du player

const playerOwnsGenerator = [{
  generator_id: 2,
  number_owned: 5,
  next_cost: 3000,
  multiplier_bonus: 1,
},
{
  generator_id: 3,
  number_owned: 1,
  next_cost: 3000,
  multiplier_bonus: 1,
}];

// Ecrire une fonction qui passe dans playerGeneratorOwned
// et pour chaque generator dans playerGeneratorOwned qui regarde
// dans playerOwnsGenerator quel object correspond au niveau de l'id :
// playerGeneratorNotOwned.id = playerOwnsGenerator.generator_id
// et qui ajoute a l'object une clé / valeur number_owned
// on aurait notre variable playerGeneratorOwned qui se présenterait ainsi:

playerGeneratorOwned = [{
  id: 2,
  type: 1,
  name: 'Silk Touch',
  text: "With you'r pretty pretty soft hand, your turn the page with manner, and give you 10 more KPC",
  clic_flat_value: 10,
  clic_percent_value: 0,
  idle_flat_value: 0,
  idle_percent_value: 0,
  starting_cost: 150,
  cost_factor: 1.07,
  order: 2,
  number_owned: 5,
},
{
  id: 3,
  type: 1,
  name: 'Bionic Scope',
  text: 'This Scope, give you 50 KPC... AWESOME RIGHT ?',
  clic_flat_value: 20,
  clic_percent_value: 0,
  idle_flat_value: 0,
  idle_percent_value: 0,
  starting_cost: 500,
  cost_factor: 1.07,
  order: 3,
  number_owned: 1,
},
];

// Ecrire une fonction qui passe dans playerGeneratorOwned
// et pour chaque generator dans playerGeneratorOwned qui applique le calcul du next_cost
// next_cost = starting_cost * cost_factor ^ number_owned
// on aurait notre variable playerGeneratorOwned qui se présenterait ainsi:

playerGeneratorOwned = [{
  id: 2,
  type: 1,
  name: 'Silk Touch',
  text: "With you'r pretty pretty soft hand, your turn the page with manner, and give you 10 more KPC",
  clic_flat_value: 10,
  clic_percent_value: 0,
  idle_flat_value: 0,
  idle_percent_value: 0,
  starting_cost: 150,
  cost_factor: 1.07,
  order: 2,
  number_owned: 5,
  next_cost: 210,
},
{
  id: 3,
  type: 1,
  name: 'Bionic Scope',
  text: 'This Scope, give you 50 KPC... AWESOME RIGHT ?',
  clic_flat_value: 20,
  clic_percent_value: 0,
  idle_flat_value: 0,
  idle_percent_value: 0,
  starting_cost: 500,
  cost_factor: 1.07,
  order: 3,
  number_owned: 1,
  next_cost: 535,
},
];

// Maintenant que playerGeneratorOwned est complet, on peut assembler

player.generatorsOwned = playerGeneratorOwned;
player.generatorsNotOwned = playerGeneratorNotOwned;

// On a toutes les infos pour calculer les bonus
// on init les bonus à 0

let playerBonus = {
  clickFlat: 0,
  clickPercent: 0,
  idleFlat: 0,
  idlePercent: 0,
};

// On map sur le tableau player.generatorsOwned et pour chaque bonus,
// on ajoute la value * le number_owned
// playerBonus.clickFlat += player.generatorsOwned.clic_flat_value * player.generatorsOwned.number_owned
// playerBonus.clickPercent += player.generatorsOwned.clic_percent_value * player.generatorsOwned.number_owned
// playerBonus.idleFlat += player.generatorsOwned.idle_flat_value * player.generatorsOwned.number_owned
// playerBonus.idlePercent += player.generatorsOwned.idle_percent_value * player.generatorsOwned.number_owned
// playerBonus est maintenant à jour

playerBonus = {
  clickFlat: 70,
  clickPercent: 0,
  idleFlat: 0,
  idlePercent: 0,
};

// On peut maintenant ajouter ces bonus aux valeur de base de clic et idle du player

player.idle_value += (player.idle_value + playerBonus.clickFlat) * (playerBonus.clickPercent / 100);
player.clic_value += (player.clic_value + playerBonus.idleFlat) * (playerBonus.idlePercent / 100);
