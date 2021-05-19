// Contains prepared queries to handle user_role entity

/**
 * Returns a prepared query to list user_roles.
 * 
 * @param {*} roleId UserId to filter by
 * 
 * @returns A prepared query to list User_Roles filter by the role Id or unfiltered if the roleId provided is empty
 */
export function listUserRolesQuery(user_id) {

    if (user_id) { // Filter by user
        return {
            name: 'user.roles-list',
            text: "SELECT user_id, role_id FROM user_roles where user_id = $1",
            values: [user_id]
        };
    } else { // No filter
        return {
            name: 'user.roles-list-filtered',
            text: "SELECT user_id, role_id FROM user_roles"
        };
    }

};

/**
 * Returns a prepared query to insert a user_role.
 * 
 * @param {*} role_id Role Id to insert
 * @param {*} privilege_id Privilege Id to insert
 * @returns A prepared query to insert a user_role
 */
export function insertUserRolesQuery(role_id, privilege_id) {
    return {
        name: 'user.roles-insert',
        text: "INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)",
        values: [role_id, privilege_id]
    };
}

/**
 * Returns a prepared query to delete a user_role.
 * 
 * @param {*} role_id Role Id of the entry to delete
 * @param {*} privilege_id Privilege Id of the entry to delete
 * @returns A prepared query to delete a user_role
 */
export function deleteUserRolesQuery(role_id, privilege_id) {
    return {
        name: 'user.roles-delete',
        text: "DELETE from user_roles WHERE user_id = $1 AND role_id = $2",
        values: [role_id, privilege_id]
    };
}
