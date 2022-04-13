-- Deploy bookworm:init to pg

BEGIN;

CREATE TABLE "player" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "username" TEXT NOT NULL UNIQUE,
  "mail" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL UNIQUE,
  "idle_value" INTEGER NOT NULL DEFAULT 1,
  "click_value" INTEGER NOT NULL DEFAULT 0,
  "click_counter" INTEGER NOT NULL DEFAULT 0,
  "prestige_level" INTEGER NOT NULL DEFAULT 1,
  "logout_time" TIMESTAMPTZ,
  "login_time" TIMESTAMPTZ
);

CREATE TABLE "generator" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "type" INT NOT NULL,
  "name" TEXT NOT NULL,
  "text" TEXT,
  "clic_flat_value" INT NOT NULL,
  "clic_percent_value" INT NOT NULL,
  "idle_flat_value" INT NOT NULL,
  "idle_percent_value" INT NOT NULL,
  "starting_cost" INT NOT NULL,
  "cost_factor" INT NOT NULL,
  "order" INT NOT NULL
);

CREATE TABLE "sentences" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title" TEXT NOT NULL,
  "text" TEXT NOT NULL
);

CREATE TABLE "player_owns_generator" (
  "player_id" INTEGER NOT NULL REFERENCES "player"("id"),
  "generator_id" INTEGER NOT NULL REFERENCES "generator"("id"),
  "number_owned" INTEGER NOT NULL DEFAULT 1,
  "next_cost" BIGINT NOT NULL,
  "multiplier_bonus" INTEGER NOT NULL DEFAULT 1
);

COMMIT;
