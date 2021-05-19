// Contains prepared queries to handle role_privilege entity

/**
 * Returns a prepared query to list role_privileges.
 * 
 * @param {*} roleId RoleId to filter by
 * 
 * @returns A prepared query to list role_privileges with the filter if provided or without the where close if it's not provided
 */
export function listRolePrivilegesQuery(role_id) {

    if (role_id) { // Filter by role
        return {
            name: 'role.privileges-list',
            text: "SELECT role_id, privilege_id FROM role_privileges where role_id = $1",
            values: [role_id]
        };
    } else { // No filter
        return {
            name: 'role.privileges-list-filtered',
            text: "SELECT role_id, privilege_id FROM role_privileges"
        };
    }

};

/**
 * Returns a prepared query to insert role_privileges.
 * 
 * @param {*} role_id 
 * @param {*} privilege_id 
 * @returns A prepared query to insert role_privileges
 */
export function insertRolePrivilegesQuery(role_id, privilege_id) {
    return {
        name: 'role.privileges-insert',
        text: "INSERT INTO role_privileges (role_id, privilege_id) VALUES ($1, $2)",
        values: [role_id, privilege_id]
    };
}

/**
 * Returns a prepared query to delete role_privileges.
 * 
 * @param {*} role_id Role id of the role_privilege to delete
 * @param {*} privilege_id Privilege id of the role_privilege to delete
 * 
 * @returns A
 *  prepared query to delete role_privileges
 */
export function deleteRolePrivilegeQuery(role_id, privilege_id) {
    return {
        name: 'role.privileges-delete',
        text: "DELETE from role_privileges WHERE role_id = $1 AND privilege_id = $2",
        values: [role_id, privilege_id]
    };
}
