// Contains prepared queries to handle user entity

/**
 * Returns a prepared query to list users.
 * 
 * @param {*} filter Filter text to filter users by name
 * @returns 
 */
export function listUsersQuery(filter) {
    return {
        name: 'user-list',
        text: "SELECT id, username, name, email FROM users WHERE name LIKE $1 ORDER BY id ASC",
        values: ['%' + filter + '%']
    };
};

/**
 * Returns a prepared query to retrieve a user.
 * 
 * @param {*} id User id to retrieve
 * @returns A prepared query to retrieve a user
 */
export function getUserQuery(id) {
    return {
        name: 'user-get',
        text: "SELECT id, username, name, email FROM users WHERE id = $1",
        values: [id]
    };
};

/**
 * Returns a prepared query to insert a user.
 * 
 * @param {*} user User object to insert
 * @returns A repared query to insert a user
 */
export function insertUserQuery(user) {
    return {
        name: 'user-insert',
        text: "INSERT INTO users (username, name, email, salt, hash) VALUES ($1, $2, $3, $4, $5)",
        values: [user.username, user.name, user.email, user.salt, user.hash]
    };
}

/**
 * Returns a prepared query to update a user.
 * 
 * @param {*} user Update user object
 * @returns A prepared query to update a user
 */
export function updateUserQuery(user) {
    return {
        name: 'user-update',
        text: "UPDATE users SET username = $1, name = $2, email = $3 WHERE id = $4",
        values: [user.username, user.name, user.email, user.id]
    };
}

/**
 * Returns a prepared query to delete a user.
 * 
 * @param {*} id User id to delete
 * @returns A prepared query to delete a user
 */
export function deleteUserQuery(id) {
    return {
        name: 'user-delete',
        text: "DELETE from users WHERE id = $1",
        values: [id]
    };
}

/**
 * Returns a prepared query to retrieve a user by username.
 * 
 * @param {*} username The username of the user
 * @returns A prepared query to retrieve a user by username
 */
export function getUserByUsernameQuery(username) {
    return {
        name: 'user.username-get',
        text: "SELECT id, username, name, email, salt, hash FROM users WHERE username = $1",
        values: [username]
    };
}

/**
 * Returns a prepared query to retrieve a user including the password hash information.
 * 
 * @param {*} user_id User id of the user
 * @returns A prepared query to retrieve a user including the password hash information
 */
export function getUserWithHashQuery(user_id) {
    return {
        name: 'user.userhash-get',
        text: "SELECT id, username, name, email, salt, hash FROM users WHERE id = $1",
        values: [user_id]
    };
}