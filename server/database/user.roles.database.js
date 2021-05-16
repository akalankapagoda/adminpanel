import pool from './postgre.pool.js';
import {listUserRolesQuery, insertUserRolesQuery, deleteUserRolesQuery} from './queries/user.roles.queries.js';

class UserRolesDatabaseHandler {

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

  insertUserRoles = (user_id, role_id, callback, errorCallback) => {

    pool.query(insertUserRolesQuery(user_id, role_id), (error, results) => {
      if (error) {
        errorCallback(error);
        return;
      }

      callback();
    })

  };

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