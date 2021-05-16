export function listUsersQuery(filter) {
    return {
        name: 'user-list',
        text: "SELECT id, username, name, email FROM users WHERE name LIKE $1 ORDER BY id ASC",
        values: ['%' + filter + '%']
    };
};

export function getUserQuery(id) {
    return {
        name: 'user-get',
        text: "SELECT id, username, name, email FROM users WHERE id = $1",
        values: [id]
    };
};

export function insertUserQuery(user) {
    return {
        name: 'user-insert',
        text: "INSERT INTO users (username, name, email, salt, hash) VALUES ($1, $2, $3, $4, $5)",
        values: [user.username, user.name, user.email, user.salt, user.hash]
    };
}

export function updateUserQuery(user) {
    return {
        name: 'user-update',
        text: "UPDATE users SET username = $1, name = $2, email = $3, salt = $4, hash = $5 WHERE id = $6",
        values: [user.username, user.name, user.email, user.salt, user.hash, user.id]
    };
}

export function deleteUserQuery(id) {
    return {
        name: 'user-delete',
        text: "DELETE from users WHERE id = $1",
        values: [id]
    };
}