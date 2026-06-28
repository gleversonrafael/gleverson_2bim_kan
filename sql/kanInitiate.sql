-- DROPS
DROP TABLE IF EXISTS KAN_USER, USER_ROLE;

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
	CONSTRAINT emailValido CHECK (email ILIKE '%@%.%')
);

-- INSERTIONS
INSERT INTO USER_ROLE(roleName, hasAdminPermissions)
VALUES 
('Role000', FALSE),      -- ID 1
('Seller', FALSE),       -- ID 2
('Buyer', FALSE),        -- ID 3
('DB Manager', TRUE),    -- ID 4
('Sales Manager', TRUE), -- ID 5
-- 15 New Roles added below:
('Administrator', TRUE), -- ID 6
('Moderator', TRUE),     -- ID 7
('Support Specialist', FALSE), -- ID 8
('Guest Analyst', FALSE),-- ID 9
('HR Specialist', TRUE), -- ID 10
('Financial Auditor', TRUE), -- ID 11
('Marketing Coordinator', FALSE), -- ID 12
('Content Creator', FALSE), -- ID 13
('Security Officer', TRUE), -- ID 14
('Developer', TRUE),     -- ID 15
('QA Engineer', FALSE),  -- ID 16
('Product Owner', TRUE), -- ID 17
('Project Manager', TRUE), -- ID 18
('Data Scientist', FALSE), -- ID 19
('DevOps Engineer', TRUE); -- ID 20


INSERT INTO KAN_USER (user_role_roleId, username, email)
VALUES 
(2, 'Betinho', 'Betinho@hotmail.com'),
(3, 'Lully', 'Lully@outlook.com'),
(1, 'Cristiano', 'cristiano_ronaldo@gmail.com'),
-- 17 New Users added below mapping to the updated roles:
(6, 'Ana Silva', 'ana.silva@gmail.com'),
(7, 'Carlos Souza', 'carlos_souza@outlook.com'),
(8, 'Mariana Costa', 'mari.costa@hotmail.com'),
(9, 'Pedro Santos', 'pedrosantos@gmail.com'),
(10, 'Julia Lima', 'julia.lima@live.com'),
(11, 'Lucas Rocha', 'lucas_rocha@yahoo.com'),
(12, 'Beatriz Alves', 'alves.bia@outlook.com'),
(13, 'Thiago Melo', 'thiago.melo@gmail.com'),
(14, 'Fernanda Dias', 'fer.dias@security.com'),
(15, 'Gabriel Cruz', 'gabriel.cruz@dev.com'),
(16, 'Amanda Ribeiro', 'amanda.rib@qa.com'),
(17, 'Ricardo Gomes', 'ricardo.gomes@powner.com'),
(18, 'Sofia Martins', 'sofia.martins@pm.com'),
(19, 'Bruno Carvalho', 'bruno.carvalho@data.com'),
(20, 'Larissa Ferreira', 'larissa.f@devops.com'),
(2, 'Roberto Nunes', 'roberto.nunes@seller.com'),
(3, 'Camila Pinheiro', 'camila.pinheiro@buyer.com');