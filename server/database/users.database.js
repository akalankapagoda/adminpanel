import pool from './postgre.pool.js';
import User from '../model/user.js';
import {  listUsersQuery, 
          getUserQuery,
          insertUserQuery,
          updateUserQuery,
          deleteUserQuery,
          getUserByUsernameQuery,
          getUserWithHashQuery } from './queries/users.queries.js';

/**
 * Handles DB operations related to User entity.
 */
class UsersDatabaseHandler {

  /**
   * Retrieve a User from DB.
   * 
   * @param {*} id The Id of the user to retrieve data of
   * @param {*} callback Function to call on success
   * @param {*} errorCallback Function to call on Failure
   */
  getUser = (id, callback, errorCallback) => {

    pool.query(getUserQuery(id), (error, results) => {
      if (error) {
        errorCallback(error);
        return;
      }

      if (results) {
        callback(createUserObjectFromRow(results.rows[0]));
      } else {
        callback({ error: 'notFound' });
      }

    })
  };

  /**
   * Retrieve a list of users filtered by the name using the filter value provided.
   * 
   * @param {*} filter The filter value to filter the names
   * @param {*} callback Function to call on success
   * @param {*} errorCallback Function to call on Failure
   */
  getUsers = (filter, callback, errorCallback) => {

    pool.query(listUsersQuery(filter), (error, results) => {
      if (error) {
        errorCallback(error);
        return;
      }

      if (results) {
        callback(results.rows.map(createUserObjectFromRow));
      } else {
        callback();
      }

    })
  };

  /**
   * Insert a User record into the Db.
   * 
   * @param {*} user The User object to insert
   * @param {*} callback Function to call on success
   * @param {*} errorCallback Function to call on Failure
   */
  insertUser = (user, callback, errorCallback) => {

    pool.query(insertUserQuery(user), (error, results) => {
      if (error) {
        errorCallback(error);
        return;
      }

      callback();
    })

  };

  /**
   * Update a User record in the DB.
   * 
   * @param {*} user The updated user object
   * @param {*} callback Function to call on success
   * @param {*} errorCallback Function to call on Failure
   */
  updateUser = (user, callback, errorCallback) => {

    pool.query(updateUserQuery(user), (error, results) => {
      if (error) {
        errorCallback(error);
        return;
      }

      callback();
    })

  };

  /**
   * Delete a user record from DB.
   * 
   * @param {*} id The id of the record to delete
   * @param {*} callback Function to call on success
   * @param {*} errorCallback Function to call on Failure
   */
  deleteUser = (id, callback, errorCallback) => {

    pool.query(deleteUserQuery(id), (error, results) => {
      if (error) {
        errorCallback(error);
        return;
      }

      callback();
    })

  };

  /**
   * Retrieve a User object from the DB using the username.
   * 
   * @param {*} username The username of the user to retieve
   * @param {*} callback Function to call on success
   * @param {*} errorCallback Function to call on Failure
   */
  getUserByUsername = (username, callback, errorCallback) => {

    pool.query(getUserByUsernameQuery(username), (error, results) => {
      if (error) {
        errorCallback(error);
        return;
      }

      if (results) {
        const row = results.rows[0];

        var user = createUserObjectFromRow(row);
        user.salt = row.salt;
        user.hash = row.hash;

        callback(user);
      } else {
        callback({ error: 'notFound' });
      }

    })
  };

  /**
   * Retrieve a User object from with additional password information.
   * 
   * @param {*} user_id The Id of the User to reteive details of
   * @param {*} callback Function to call on success
   * @param {*} errorCallback Function to call on Failure
   */
  getUserWithHash = (user_id, callback, errorCallback) => {

    pool.query(getUserWithHashQuery(user_id), (error, results) => {
      if (error) {
        errorCallback(error);
        return;
      }

      if (results) {
        const row = results.rows[0];

        var user = createUserObjectFromRow(row);
        user.salt = row.salt;
        user.hash = row.hash;

        callback(user);
      } else {
        callback({ error: 'notFound' });
      }

    })
  };

}

/**
 * Convert a JSON object to a User object.
 * 
 * @param {*} row The JSON object to convert
 * @returns A User object populated using the information provided in the JSON
 */
const createUserObjectFromRow = (row) => {
  return new User(row.id, row.username, row.name, row.email);
}

export default new UsersDatabaseHandler();