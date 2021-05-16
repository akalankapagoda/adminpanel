export function listPrivilegesQuery(filter) {
    return {
        name: 'privilege-list',
        text: "SELECT id, name, description FROM privileges WHERE name LIKE $1 ORDER BY id ASC",
        values: ['%' + filter + '%']
    };
};

export function getPrivilegeQuery(id) {
    return {
        name: 'privilege-get',
        text: "SELECT id, name, description FROM privileges WHERE id = $1",
        values: [id]
    };
};

export function insertPrivilegeQuery(role) {
    return {
        name: 'privilege-insert',
        text: "INSERT INTO privileges (name, description) VALUES ($1, $2)",
        values: [role.name, role.description]
    };
}

export function updatePrivilegeQuery(role) {
    return {
        name: 'privilege-update',
        text: "UPDATE privileges SET name = $1, description = $2 WHERE id = $3",
        values: [role.name, role.description, role.id]
    };
}

export function deletePrivilegeQuery(id) {
    return {
        name: 'privilege-delete',
        text: "DELETE from privileges WHERE id = $1",
        values: [id]
    };
}