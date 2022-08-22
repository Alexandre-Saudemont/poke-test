BEGIN;
DROP TABLE IF EXISTS 
"user",
"pokemon",
"types",
"pokemon_type",
"deck"
CASCADE
;

CREATE TABLE IF NOT EXISTS "user" (
    "id" int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "username" varchar(255) NOT NULL,
    "firstname" varchar(255) NOT NULL,
    "lastname" varchar(255) NOT NULL,
    "email" varchar(255) NOT NULL,
    "password" varchar(255) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "pokemon"(
    "id" serial PRIMARY KEY NOT NULL,
    "nom" VARCHAR(255) NOT NULL,
    "pv" integer NOT NULL,
    "attaque" integer NOT NULL,
    "defense" integer NOT NULL,
    "attaque_spe" integer NOT NULL,
    "defense_spe" integer NOT NULL,
    "vitesse" integer NOT NULL,
    "url" VARCHAR(255),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);


CREATE TABLE IF NOT EXISTS "types"(
    "id" serial PRIMARY KEY NOT NULL,
    "nom" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ    
);


CREATE TABLE IF NOT EXISTS "pokemon_type"(
    "pokemon_id" integer NOT NULL REFERENCES "pokemon"("id") ON DELETE CASCADE,
    "type_id" integer NOT NULL REFERENCES "types"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ    
);


CREATE TABLE IF NOT EXISTS "deck"(
    "id" int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "user_id" integer NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "pokemon_id" integer REFERENCES "pokemon"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ    
);

COMMIT;

