SELECT 'CREATE DATABASE db_exam' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'db_exam');

DROP TABLE IF EXISTS logs;
CREATE TABLE logs (
  method VARCHAR(45),
  date Date DEFAULT Date(),
  body TEXT
);