CREATE TABLE shoes(
id SERIAL PRIMARY KEY,
name VARCHAR(80),
cost INT
);

INSERT INTO shoes (name, cost)
VALUES ('pumps', 100),
('sneakers', 50),
('boots', 45);