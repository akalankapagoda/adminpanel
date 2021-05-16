import pool from './postgre.pool.js';
import Privilege from '../model/privilege.js';
import {listPrivilegesQuery, getPrivilegeQuery, updatePrivilegeQuery, insertPrivilegeQuery, deletePrivilegeQuery} from './queries/privileges.queries.js'

const createPrivilegeObjectFromRow = (row) => {
  return new Privilege(row.id, row.name, row.description);
}

class PrivilegesDatabaseHandler {

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

  insertPrivilege = (privilege, callback, errorCallback) => {

    pool.query(insertPrivilegeQuery(privilege), (error, results) => {
      if (error) {
        errorCallback(error);
        return;
      }

      callback();
    })

  };

  updatePrivilege = (privilege, callback, errorCallback) => {

    pool.query(updatePrivilegeQuery(privilege), (error, results) => {
      if (error) {
        errorCallback(error);
        return;
      }

      callback();
    })

  };

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

export default new PrivilegesDatabaseHandler();