export function listRolesQuery(filter) {
    return {
        name: 'role-list',
        text: "SELECT id, name, description FROM roles WHERE name LIKE $1 ORDER BY id ASC",
        values: ['%' + filter + '%']
    };
};

export function getRoleQuery(id) {
    return {
        name: 'role-get',
        text: "SELECT id, name, description FROM roles WHERE id = $1",
        values: [id]
    };
};

export function insertRoleQuery(role) {
    return {
        name: 'role-insert',
        text: "INSERT INTO roles (name, description) VALUES ($1, $2)",
        values: [role.name, role.description]
    };
}

export function updateRoleQuery(role) {
    return {
        name: 'role-update',
        text: "UPDATE roles SET name = $1, description = $2 WHERE id = $3",
        values: [role.name, role.description, role.id]
    };
}

export function deleteRoleQuery(id) {
    return {
        name: 'role-delete',
        text: "DELETE from roles WHERE id = $1",
        values: [id]
    };
}