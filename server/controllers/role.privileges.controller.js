import rolePrivilegesDatabaseHandler from '../database/roles.privileges.database.js';
import {handleDatabaseError, handleGenericError} from '../error/error.handler.js';

/**
 * Handles CRUD operations for Role_Privilege mappings.
 */
class RolePrivilegesController {


    /**
     * Create and Save a new Role_Privilege
     * 
     * @param {*} req 
     * @param {*} res 
     */
    create = (req, res) => {

        try {
            rolePrivilegesDatabaseHandler.insertRolePrivilege(req.body.role_id, req.body.privilege_id, () => {
                res.send({success: 'true'});
            }, (error) => handleDatabaseError(error, res));
        } catch (e) {
            handleGenericError(e, res);
        }


    }
    
    /**
     * Retrieve and return all Role_Privileges from the database filtered by the role_id if provided in the request.
     * 
     * @param {*} req 
     * @param {*} res 
     */
    findAll =  (req, res) => {

        var role_id = req.query.role_id;
        
        try {
            rolePrivilegesDatabaseHandler.getRolePrivileges(role_id, (rows) => {
                res.send(rows);
            }, (error) => handleDatabaseError(error, res));
        } catch (e) {
            handleGenericError(e, res);
        }


    }

    /**
     * Delete a role_pririlege with the specified role id and a privilege Id in the request
     * 
     * @param {*} req 
     * @param {*} res 
     */
    remove =  (req, res) => {

        try {
            rolePrivilegesDatabaseHandler.deleteRolePrivilege(req.body.role_id, req.body.privilege_id, () => {
                res.send({success: 'true'});
            }, (error) => handleDatabaseError(error, res));
        } catch (e) {
            handleGenericError(e, res);
        }


    }
}


export default new RolePrivilegesController();