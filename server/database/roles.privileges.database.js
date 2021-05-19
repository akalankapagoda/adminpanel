import pool from './postgre.pool.js';
import {listRolePrivilegesQuery, insertRolePrivilegesQuery, deleteRolePrivilegeQuery} from './queries/role.privileges.queries.js';

/**
 * Handles DB operations related to role_privilege table.
 */
class RolePrivilegesDatabaseHandler {

  /**
   * Retrieve a list of Role_Privilege for a given Role Id.
   * 
   * @param {*} role_id The role Id to list the privileges of
   * @param {*} callback Function to call on success
   * @param {*} errorCallback Function to call on Failure
   */
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

  /**
   * Insert a role_privilege record into the DB.
   * 
   * @param {*} role_id The role Id to insert
   * @param {*} privilegeId The privilege Id to insert
   * @param {*} callback Function to call on success
   * @param {*} errorCallback Function to call on Failure
   */
  insertRolePrivilege = (role_id, privilegeId, callback, errorCallback) => {

    pool.query(insertRolePrivilegesQuery(role_id, privilegeId), (error, results) => {
      if (error) {
        errorCallback(error);
        return;
      }

      callback();
    })

  };

  /**
   * Delete a Role_Privilege from DB.
   * 
   * @param {*} role_id The role Id of the record to delete
   * @param {*} privilegeId The privilege Id of the record to delete
   * @param {*} callback Function to call on success
   * @param {*} errorCallback Function to call on Failure
   */
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