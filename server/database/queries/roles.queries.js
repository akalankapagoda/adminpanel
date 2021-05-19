// Contains prepared queries to handle role entity

/**
 * Returns a prepared query to list roles.
 * 
 * @param {*} filter Filter text to filter the roles by name
 * @returns 
 */
export function listRolesQuery(filter) {
    return {
        name: 'role-list',
        text: "SELECT id, name, description FROM roles WHERE name LIKE $1 ORDER BY id ASC",
        values: ['%' + filter + '%']
    };
};

/**
 * Returns a prepared query to retrieve a role.
 * 
 * @param {*} id Role id to retrieve
 * @returns A prepared query to retrieve a role
 */
export function getRoleQuery(id) {
    return {
        name: 'role-get',
        text: "SELECT id, name, description FROM roles WHERE id = $1",
        values: [id]
    };
};

/**
 * Returns a prepared query to insert a role.
 * 
 * @param {*} role Role object o insert
 * @returns A prepared query to insert a role
 */
export function insertRoleQuery(role) {
    return {
        name: 'role-insert',
        text: "INSERT INTO roles (name, description) VALUES ($1, $2)",
        values: [role.name, role.description]
    };
}

/**
 * Returns a prepared query to update a role.
 * 
 * @param {*} role Updated role object
 * @returns A prepared query to update a role
 */
export function updateRoleQuery(role) {
    return {
        name: 'role-update',
        text: "UPDATE roles SET name = $1, description = $2 WHERE id = $3",
        values: [role.name, role.description, role.id]
    };
}

/**
 * Returns a prepared query to delete a role.
 * 
 * @param {*} id The role id to delete
 * @returns A prepared query to delete a role
 */
export function deleteRoleQuery(id) {
    return {
        name: 'role-delete',
        text: "DELETE from roles WHERE id = $1",
        values: [id]
    };
}