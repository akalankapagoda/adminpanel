import pool from './postgre.pool.js';
import Privilege from '../model/privilege.js';
import {listPrivilegesQuery, getPrivilegeQuery, updatePrivilegeQuery, insertPrivilegeQuery, deletePrivilegeQuery} from './queries/privileges.queries.js'

class PrivilegesDatabaseHandler {

  /**
   * Retrieve a privilege from DB.
   * 
   * @param {*} id The id of the privilege to retrieve
   * @param {*} callback Function to call on success
   * @param {*} errorCallback Function to call on Failure
   */
  getPrivilege = (id, callback, errorCallback) => {

    pool.query(getPrivilegeQuery(id) , (error, results) => {
      if (error) {
        errorCallback(error);
        return;
      }

      if (results) {
        callback(createPrivilegeObjectFromRow(results.rows[0]));
      } else {
        callback({error: 'notFound'});
      }
      
    })
  };

  /**
   * Retrieve a list of privilege objects from the DB filter by the privilege name using the provided filter text.
   * 
   * @param {*} filter The filter text to filter the name by
   * @param {*} callback Function to call on success
   * @param {*} errorCallback Function to call on Failure
   */
  getPrivileges = (filter, callback, errorCallback) => {

    pool.query(listPrivilegesQuery(filter), (error, results) => {
      if (error) {
        errorCallback(error);
        return;
      }

      if (results) {
        callback(results.rows.map(createPrivilegeObjectFromRow));
      } else {
        callback();
      }
    })
  };

  /**
   * Insert a privilege object to the DB.
   * 
   * @param {*} privilege The privilege object to insert
   * @param {*} callback Function to call on success
   * @param {*} errorCallback Function to call on Failure
   */
  insertPrivilege = (privilege, callback, errorCallback) => {

    pool.query(insertPrivilegeQuery(privilege), (error, results) => {
      if (error) {
        errorCallback(error);
        return;
      }

      callback();
    })

  };

  /**
   * Update a privilege object in DB>
   * 
   * @param {*} privilege The updated privilege object
   * @param {*} callback Function to call on success
   * @param {*} errorCallback Function to call on Failure
   */
  updatePrivilege = (privilege, callback, errorCallback) => {

    pool.query(updatePrivilegeQuery(privilege), (error, results) => {
      if (error) {
        errorCallback(error);
        return;
      }

      callback();
    })

  };

  /**
   * Delete a pririlege entry from DB.
   * 
   * @param {*} id The privilege Id to delete
   * @param {*} callback Function to call on success
   * @param {*} errorCallback Function to call on Failure
   */
  deletePrivilege = (id, callback, errorCallback) => {

    pool.query(deletePrivilegeQuery(id), (error, results) => {
      if (error) {
        errorCallback(error);
        return;
      }

      callback();
    })

  };

}

/**
 * Converts a JSON object to a Privilege entity.
 * 
 * @param {*} row The JSON object to convert to
 * @returns A Privilege object created from the provided JSON
 */
const createPrivilegeObjectFromRow = (row) => {
  return new Privilege(row.id, row.name, row.description);
}

export default new PrivilegesDatabaseHandler();