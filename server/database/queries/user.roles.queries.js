/**
 * List user_roles.
 * 
 * @param {*} roleId UserId to filter by
 * 
 * @returns User_Roles filter by the role Id or unfiltered if the roleId provided is empty
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

export function insertUserRolesQuery(role_id, privilege_id) {
    return {
        name: 'user.roles-insert',
        text: "INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)",
        values: [role_id, privilege_id]
    };
}

export function deleteUserRolesQuery(role_id, privilege_id) {
    return {
        name: 'user.roles-delete',
        text: "DELETE from user_roles WHERE user_id = $1 AND role_id = $2",
        values: [role_id, privilege_id]
    };
}
