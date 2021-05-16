CREATE TABLE users (
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	username VARCHAR(50) NOT NULL UNIQUE,
	name VARCHAR(200) NOT NULL,
	email VARCHAR(200),
	salt VARCHAR(50),
	hash VARCHAR(200) 
);

CREATE TABLE courses (
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name VARCHAR (50) NOT NULL UNIQUE,
	description VARCHAR (200),
	credits INT NOT NULL,
	created_by INT,
	questions JSONB,
	
	CONSTRAINT fk_course_created_by_user
      FOREIGN KEY(created_by) 
	  REFERENCES users(id)
);

CREATE TABLE roles (
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name VARCHAR(50) NOT NULL UNIQUE,
	description VARCHAR(200)
);

CREATE TABLE privileges (
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name VARCHAR(50) NOT NULL UNIQUE,
	description VARCHAR(200)
);

CREATE TABLE role_privileges (
	role_id INT NOT NULL,
	privilege_id INT NOT NULL,
	
	CONSTRAINT fk_roleprivilege_role_id
      FOREIGN KEY(role_id) 
	  REFERENCES roles(id),
	  
	CONSTRAINT fk_roleprivilege_privilege_id
      FOREIGN KEY(privilege_id) 
	  REFERENCES privileges(id),
	  
	UNIQUE(role_id, privilege_id)
);

CREATE TABLE user_roles (
	user_id INT NOT NULL,
	role_id INT NOT NULL,
	
	CONSTRAINT fk_userrole_role_id
      FOREIGN KEY(role_id) 
	  REFERENCES roles(id),
	  
	CONSTRAINT fk_userrole_user_id
      FOREIGN KEY(user_id) 
	  REFERENCES users(id)
);

-- Default data inserts

INSERT INTO users (username, name, email, salt, hash)
	VALUES ('admin', 'Admin User', 'admin@admin.com', '48cc015c6c757379a01fad39815840be', '1ee1cbf5a4d33bbfa39f6842879441b6f2ba79dd5e3060d092fef2798b0c6bd859dcab9f30fc9e3aaafef7cf024c7135b32f373cf8f0d18874a39e44ed7b577f');
	
INSERT INTO privileges (name, description)
		VALUES 
	('MANAGE_USERS', 'Allows adding/updating/deleting users'),
	('MANAGE_COURSES', 'Allows adding/updating/deleting courses'),
	('MANAGE_ROLES', 'Allows adding/updating/deleting roles'),
	('MANAGE_PRIVILEGES', 'Allows adding/updating/deleting privileges'),
	('MANAGE_ROLE_PRIVILEGES', 'Allows adding/updating/deleting role_privileges'),
	('MANAGE_USER_ROLES', 'Allows adding/updating/deleting user_roles'),
	('LIST_USERS', 'Allows viewing users'),
	('LIST_COURSES', 'Allows viewing courses'),
	('LIST_ROLES', 'Allows viewing roles'),
	('LIST_PRIVILEGES', 'Allows viewing privileges'),
	('LIST_ROLE_PRIVILEGES', 'Allows viewing role_privileges'),
	('LIST_USER_ROLES', 'Allows viewing user_roles');
	
INSERT INTO roles (name, description)
		VALUES
	('MANAGER', 'Allows managing the system, create/update/delete entities'),
	('VIEWER', 'Allows monitoring/viewing the current status and entities of the system');
	
INSERT INTO role_privileges (role_id, privilege_id)
		VALUES
	(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9), (1, 10), (1, 11), (1, 12),
	(2, 7), (2, 8), (2, 9), (2, 10), (2, 11), (2, 12);

