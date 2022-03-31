-- Script to create example tables used in base code
BEGIN;

CREATE TABLE "object2" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "label" TEXT NOT NULL UNIQUE,
  "text_content" TEXT NOT NULL UNIQUE
);

CREATE TABLE "object1" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title" TEXT NOT NULL UNIQUE,
  "content" TEXT,
  "object2_id" INT NOT NULL REFERENCES "object2"("id")
);

COMMIT;
