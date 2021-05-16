import pool from './postgre.pool.js';
import User from '../model/user.js';
import {listUsersQuery, getUserQuery, insertUserQuery, updateUserQuery, deleteUserQuery} from './queries/users.queries.js';

const createUserObjectFromRow = (row) => {
  return new User(row.id, row.username, row.name, row.email);
}

class UsersDatabaseHandler {

  getUser = (id, callback, errorCallback) => {

    pool.query(getUserQuery(id) , (error, results) => {
      if (error) {
        errorCallback(error);
      }

      if (results.rowCount > 0) {

        callback(createUserObjectFromRow(results.rows[0]));

      } else {
        callback({error: 'notFound'});
      }
      
    })
  };

  getUsers = (filter, callback, errorCallback) => {

    pool.query(listUsersQuery(filter), (error, results) => {
      if (error) {
        errorCallback(error);
      }

      callback(results.rows.map(createUserObjectFromRow));
    })
  };

  insertUser = (user, callback, errorCallback) => {

    pool.query(insertUserQuery(user), (error, results) => {
      if (error) {
        errorCallback(error);
      }

      callback();
    })

  };

  updateUser = (user, callback, errorCallback) => {

    pool.query(updateUserQuery(user), (error, results) => {
      if (error) {
        errorCallback(error);
      }

      callback();
    })

  };

  deleteUser = (id, callback, errorCallback) => {

    pool.query(deleteUserQuery(id), (error, results) => {
      if (error) {
        errorCallback(error);
      }

      callback();
    })

  };

}

export default new UsersDatabaseHandler();