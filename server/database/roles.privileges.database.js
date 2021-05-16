import pool from './postgre.pool.js';
import {listRolePrivilegesQuery, insertRolePrivilegesQuery, deleteRolePrivilegeQuery} from './queries/role.privileges.queries.js';

class RolePrivilegesDatabaseHandler {

  getRolePrivileges = (role_id, callback, errorCallback) => {

    pool.query(listRolePrivilegesQuery(role_id), (error, results) => {
      if (error) {
        errorCallback(error);
        return;
      }

      if (results) {
        callback(results.rows);
      } else {
        callback();
      }
      
    })
  };

  insertRolePrivilege = (role_id, privilegeId, callback, errorCallback) => {

    pool.query(insertRolePrivilegesQuery(role_id, privilegeId), (error, results) => {
      if (error) {
        errorCallback(error);
        return;
      }

      callback();
    })

  };

  deleteRolePrivilege = (role_id, privilegeId, callback, errorCallback) => {

    pool.query(deleteRolePrivilegeQuery(role_id, privilegeId), (error, results) => {
      if (error) {
        errorCallback(error);
        return;
      }

      callback();
    })

  };

}

export default new RolePrivilegesDatabaseHandler();