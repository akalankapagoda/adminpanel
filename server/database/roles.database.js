import pool from './postgre.pool.js';
import Role from '../model/role.js';
import {listRolesQuery, getRoleQuery, updateRoleQuery, insertRoleQuery, deleteRoleQuery} from './queries/roles.queries.js';

const createRoleObjectFromRow = (row) => {
  return new Role(row.id, row.name, row.description);
}

class RolesDatabaseHandler {

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

  insertRole = (role, callback, errorCallback) => {

    pool.query(insertRoleQuery(role), (error, results) => {
      if (error) {
        errorCallback(error);
        return;
      }

      callback();
    })

  };

  updateRole = (role, callback, errorCallback) => {

    pool.query(updateRoleQuery(role), (error, results) => {
      if (error) {
        errorCallback(error);
        return;
      }

      callback();
    })

  };

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

export default new RolesDatabaseHandler();