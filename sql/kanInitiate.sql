-- DROPS
DROP TABLE IF EXISTS USER_ROLE, KAN_USER;

-- TABLES
CREATE TABLE IF NOT EXISTS USER_ROLE 
(
	roleId SERIAL PRIMARY KEY,
	roleName VARCHAR(100),
	hasAdminPermissions BOOL NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS KAN_USER
(
    userid SERIAL,
	PRIMARY KEY(userid),
	user_role_roleId INTEGER NOT NULL,
	FOREIGN KEY (user_role_roleId) REFERENCES USER_ROLE(roleId),
	
	username TEXT NOT NULL,
	email TEXT,
	CONSTRAINT emailValido CHECK (email ILIKE '%%@%.%')
);

-- INSERTIONS
INSERT INTO USER_ROLE(roleName, hasAdminPermissions)
VALUES 
('Role000', FALSE),
('Seller', FALSE),
('Buyer', FALSE),
('DB Manager', TRUE),
('Sales Manager', TRUE);


INSERT INTO KAN_USER (user_role_roleId, username, email)
VALUES 
(2, 'Betinho', 'Betinho@hotmail.com'),
(3, 'Lully', 'Lully@outlook.com'),
(1, 'Cristiano', 'cristiano_ronaldo@gmail.com');
