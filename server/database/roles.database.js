import pool from './postgre.pool.js';
import Role from '../model/role.js';
import {listRolesQuery, getRoleQuery, updateRoleQuery, insertRoleQuery, deleteRoleQuery} from './queries/roles.queries.js';

/**
 * Handles DB operations related to Role entity.
 */
class RolesDatabaseHandler {

  /**
   * Retrieve a role from DB.
   * 
   * @param {*} id  The role Id to retrieve
   * @param {*} callback Function to call on success
   * @param {*} errorCallback Function to call on Failure
   */
  getRole = (id, callback, errorCallback) => {

    pool.query(getRoleQuery(id) , (error, results) => {
      if (error) {
        errorCallback(error);
        return;
      }

      if (results) {

        callback(createRoleObjectFromRow(results.rows[0]));

      } else {
        callback({error: 'notFound'});
      }
      
    })
  };

  /**
   * Retrieve a list of roles from the DB filtered by the name using the filter text provided.
   * 
   * @param {*} filter The filter value to filter the name
   * @param {*} callback Function to call on success
   * @param {*} errorCallback Function to call on Failure
   */
  getRoles = (filter, callback, errorCallback) => {

    pool.query(listRolesQuery(filter), (error, results) => {
      if (error) {
        errorCallback(error);
        return;
      }

      if (results) {
        callback(results.rows.map(createRoleObjectFromRow));
      } else {
        callback();
      }
      
    })
  };

  /**
   * Insert a Role record into the DB.
   * 
   * @param {*} role The role object to insert
   * @param {*} callback Function to call on success
   * @param {*} errorCallback Function to call on Failure
   */
  insertRole = (role, callback, errorCallback) => {

    pool.query(insertRoleQuery(role), (error, results) => {
      if (error) {
        errorCallback(error);
        return;
      }

      callback();
    })

  };

  /**
   * Update a role record in the DB.
   * 
   * @param {*} role The updated role record
   * @param {*} callback Function to call on success
   * @param {*} errorCallback Function to call on Failure
   */
  updateRole = (role, callback, errorCallback) => {

    pool.query(updateRoleQuery(role), (error, results) => {
      if (error) {
        errorCallback(error);
        return;
      }

      callback();
    })

  };

  /**
   * Delete a Role record from the DB.
   * 
   * @param {*} id The id of the role record to delete
   * @param {*} callback Function to call on success
   * @param {*} errorCallback Function to call on Failure
   */
  deleteRole = (id, callback, errorCallback) => {

    pool.query(deleteRoleQuery(id), (error, results) => {
      if (error) {
        errorCallback(error);
        return;
      }

      callback();
    })

  };

}

/**
 * Converts a json object to a Role object.
 * 
 * @param {*} row The json object to convert
 * @returns A role object created using the provided json
 */
const createRoleObjectFromRow = (row) => {
  return new Role(row.id, row.name, row.description);
}

export default new RolesDatabaseHandler();