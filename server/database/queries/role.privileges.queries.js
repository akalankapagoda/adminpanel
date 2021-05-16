/**
 * List role_privileges.
 * 
 * @param {*} roleId RoleId to filter by
 * 
 * @returns Role_privleges filter by the role Id or unfiltered if the roleId provided is empty
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

export function insertRolePrivilegesQuery(role_id, privilege_id) {
    return {
        name: 'role.privileges-insert',
        text: "INSERT INTO role_privileges (role_id, privilege_id) VALUES ($1, $2)",
        values: [role_id, privilege_id]
    };
}

export function deleteRolePrivilegeQuery(role_id, privilege_id) {
    return {
        name: 'role.privileges-delete',
        text: "DELETE from role_privileges WHERE role_id = $1 AND privilege_id = $2",
        values: [role_id, privilege_id]
    };
}
