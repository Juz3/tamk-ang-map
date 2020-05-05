-- create.sql -- database for angular map application
--
-- Description
--
--    PostgreSQL database
--
-- Copyright (C) Jussi Koivumäki 2020
--
----------------------------------------------------------------------
--
--
----------------------------------------------------------------------
--
--                    Create tables
--
----------------------------------------------------------------------

DROP TABLE IF EXISTS LOCATIONS;
DROP TABLE IF EXISTS locations;

CREATE TABLE locations
(
    id         SERIAL,
    latitude   NUMERIC (5,3)       NOT NULL,
    longitude  NUMERIC (5,3)       NOT NULL,
    PRIMARY KEY (id)
);

----------------------------------------------------------------------
--
--                    Insert initial data
--
----------------------------------------------------------------------

-- LOCATIONS

INSERT INTO locations (id, latitude, longitude)
VALUES (DEFAULT, 61.504, 23.829);
INSERT INTO locations (id, latitude, longitude)
VALUES (DEFAULT, 21.504, 13.829);
INSERT INTO locations (id, latitude, longitude)
VALUES (DEFAULT, 65.504, 27.829);

-- End
