import userRolesDatabaseHandler from '../database/user.roles.database.js';
import {handleDatabaseError, handleGenericError} from '../error/error.handler.js';

/**
 * Handles CRUD operations for User_Roles mappings.
 */
class UserRolesController {


    /**
     * Create and Save a new User_Roles
     * 
     * @param {*} req 
     * @param {*} res 
     */
    create = (req, res) => {

        try {
            userRolesDatabaseHandler.insertUserRoles(req.body.user_id, req.body.role_id, () => {
                res.send({success: 'true'});
            }, (error) => handleDatabaseError(error, res));
        } catch (e) {
            handleGenericError(e, res);
        }


    }

    // 
    /**
     * Retrieve and return all User_Roles from the database filtered by the user_id if provided in the request.
     * 
     * @param {*} req 
     * @param {*} res 
     */
    findAll =  (req, res) => {

        var user_id = req.query.user_id;
        
        try {
            userRolesDatabaseHandler.getUserRoles(user_id, (rows) => {
                res.send(rows);
            }, (error) => handleDatabaseError(error, res));
        } catch (e) {
            handleGenericError(e, res);
        }


    }

    /**
     * Delete a user_role with the specified user id and a role Id in the request
     * 
     * @param {*} req 
     * @param {*} res 
     */
    remove =  (req, res) => {

        try {
            userRolesDatabaseHandler.deleteUserRoles(req.body.user_id, req.body.role_id, () => {
                res.send({success: 'true'});
            }, (error) => handleDatabaseError(error, res));
        } catch (e) {
            handleGenericError(e, res);
        }

    }
}

export default new UserRolesController();