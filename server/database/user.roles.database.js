import pool from './postgre.pool.js';
import {listUserRolesQuery, insertUserRolesQuery, deleteUserRolesQuery} from './queries/user.roles.queries.js';

/**
 * Handles DB operations related to user_role table.
 */
class UserRolesDatabaseHandler {

  /**
   * Retrieve a list of rroles assigned to a user.
   * 
   * @param {*} user_id The user Id to retrive the roles of
   * @param {*} callback Function to call on success
   * @param {*} errorCallback Function to call on Failure
   */
  getUserRoles = (user_id, callback, errorCallback) => {

    pool.query(listUserRolesQuery(user_id), (error, results) => {
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
   * Insert a user role into the DB.
   * 
   * @param {*} user_id The User Id of the record to insert
   * @param {*} role_id The Role Id of the record to insert
   * @param {*} callback Function to call on success
   * @param {*} errorCallback Function to call on Failure
   */
  insertUserRoles = (user_id, role_id, callback, errorCallback) => {

    pool.query(insertUserRolesQuery(user_id, role_id), (error, results) => {
      if (error) {
        errorCallback(error);
        return;
      }

      callback();
    })

  };

  /**
   * Delete a User_Role record from the DB.
   * 
   * @param {*} user_id The User Id of the record to delete
   * @param {*} role_id The Role Id of the record to delete
   * @param {*} callback Function to call on success
   * @param {*} errorCallback Function to call on Failure
   */
  deleteUserRoles = (user_id, role_id, callback, errorCallback) => {

    pool.query(deleteUserRolesQuery(user_id, role_id), (error, results) => {
      if (error) {
        errorCallback(error);
        return;
      }

      callback();
    })

  };

}

export default new UserRolesDatabaseHandler();