import privilegesDatabaseHandler from '../database/privileges.database.js';
import Privilege from '../model/privilege.js';
import {handleDatabaseError, handleGenericError} from '../error/error.handler.js';

/**
 * Handles CRUD operations for Privileges.
 */
class PrivilegesController {

    /**
     * Create and Save a new Privileges
     * @param {*} req 
     * @param {*} res 
     */
    create = (req, res) => {

        var privilege = new Privilege(null, req.body.name, req.body.description);

        try {
            privilegesDatabaseHandler.insertPrivilege(privilege, () => {
                res.send({success: 'true'});
            }, (error) => handleDatabaseError(error, res));
        } catch (e) {
            handleGenericError(e, res);
        }


    }

    /**
     * Retrieve and return all Privileges from the database.
     * @param {*} req 
     * @param {*} res 
     */
    findAll =  (req, res) => {

        var filter = req.query.filter;

        if (!filter) {
            filter = '';
        }
        
        try {
            privilegesDatabaseHandler.getPrivileges(filter, (rows) => {
                res.send(rows);
            }, (error) => handleDatabaseError(error, res));
        } catch (e) {
            handleGenericError(e, res);
        }


    }

    /**
     * Find a single Privilege with a Id
     * 
     * @param {*} req 
     * @param {*} res 
     */
    findOne =  (req, res) => {
        var id = req.query.id;

        if (!id) {
            res.send({error: 'id not provided'});
        } else {

            try {
                privilegesDatabaseHandler.getPrivilege(id, (privilege) => {
                    res.send(privilege);
                }, (error) => handleDatabaseError(error, res));
            } catch (e) {
                handleGenericError(e, res);
            }


        }

    }

    /**
     * Update a pririlege identified by the privilege Id in the request
     * 
     * @param {*} req 
     * @param {*} res 
     */
    update = (req, res) => {

        var privilege = new Privilege(req.body.id, req.body.name, req.body.description);

        try {
            privilegesDatabaseHandler.updatePrivilege(privilege, () => {
                res.send({success: 'true'});
            }, (error) => handleDatabaseError(error, res));
        } catch (e) {
            handleGenericError(e, res);
        }


    }

    /**
     * Delete a pririlege with the specified privilege id in the request
     * 
     * @param {*} req 
     * @param {*} res 
     */
    remove =  (req, res) => {

        try {
            privilegesDatabaseHandler.deletePrivilege(req.body.id, () => {
                res.send({success: 'true'});
            }, (error) => handleDatabaseError(error, res));
        } catch (e) {
            handleGenericError(e, res);
        }


    }
}


export default new PrivilegesController();