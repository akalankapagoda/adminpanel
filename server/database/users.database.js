import pool from './postgre.pool.js';
import User from '../model/user.js';
import {  listUsersQuery, 
          getUserQuery,
          insertUserQuery,
          updateUserQuery,
          deleteUserQuery,
          getUserByUsernameQuery,
          getUserWithHashQuery } from './queries/users.queries.js';

const createUserObjectFromRow = (row) => {
  return new User(row.id, row.username, row.name, row.email);
}

class UsersDatabaseHandler {

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

  insertUser = (user, callback, errorCallback) => {

    pool.query(insertUserQuery(user), (error, results) => {
      if (error) {
        errorCallback(error);
        return;
      }

      callback();
    })

  };

  updateUser = (user, callback, errorCallback) => {

    pool.query(updateUserQuery(user), (error, results) => {
      if (error) {
        errorCallback(error);
        return;
      }

      callback();
    })

  };

  deleteUser = (id, callback, errorCallback) => {

    pool.query(deleteUserQuery(id), (error, results) => {
      if (error) {
        errorCallback(error);
        return;
      }

      callback();
    })

  };

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

export default new UsersDatabaseHandler();