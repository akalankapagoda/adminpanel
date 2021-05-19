// Contains prepared queries to handle privilege entity

/**
 * Returns a prepared query to retrieve a list of privileges filtered by the name.
 * 
 * @param {*} filter The filter text to filter by privilege name
 * @returns A prepared query to retrieve a list of privileges filtered by the name
 */
export function listPrivilegesQuery(filter) {
    return {
        name: 'privilege-list',
        text: "SELECT id, name, description FROM privileges WHERE name LIKE $1 ORDER BY id ASC",
        values: ['%' + filter + '%']
    };
};

/**
 * Returns a prepared query to  get a specif privilge.
 * 
 * @param {*} id The id of the privilege to retrieve
 * @returns A prepared query to  get a specif privilge
 */
export function getPrivilegeQuery(id) {
    return {
        name: 'privilege-get',
        text: "SELECT id, name, description FROM privileges WHERE id = $1",
        values: [id]
    };
};

/**
 * Returns a prepared query to insert a privilege to the DB.
 * 
 * @param {*} privilege 
 * @returns A prepared query to insert a privilege to the DB
 */
export function insertPrivilegeQuery(privilege) {
    return {
        name: 'privilege-insert',
        text: "INSERT INTO privileges (name, description) VALUES ($1, $2)",
        values: [privilege.name, privilege.description]
    };
}

/**
 * Returns a prepared query to update a privilege.
 * 
 * @param {*} privilege The updated pririlege object to save in the DB
 * @returns A prepared query to update a privilege
 */
export function updatePrivilegeQuery(privilege) {
    return {
        name: 'privilege-update',
        text: "UPDATE privileges SET name = $1, description = $2 WHERE id = $3",
        values: [privilege.name, privilege.description, privilege.id]
    };
}

/**
 * Returns a prepared query to delete a pririlege from DB.
 * 
 * @param {*} id The Id of the privilege to delete
 * @returns A prepared query to delete a pririlege from DB
 */
export function deletePrivilegeQuery(id) {
    return {
        name: 'privilege-delete',
        text: "DELETE from privileges WHERE id = $1",
        values: [id]
    };
}