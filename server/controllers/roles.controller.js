/**
 * Handles CRUD operations for Roles.
 */

import rolesDatabaseHandler from '../database/roles.database.js';
import Role from '../model/role.js';
import {handleDatabaseError, handleGenericError} from '../error/error.handler.js';

class UsersController {

    /**
     * Create and Save a new Users
     * 
     * @param {*} req 
     * @param {*} res 
     */
    create = (req, res) => {

        var role = new Role(null, req.body.name, req.body.description);

        try {
            rolesDatabaseHandler.insertRole(role, () => {
                res.send({success: 'true'});
            }, (error) => handleDatabaseError(error, res));
        } catch (e) {
            handleGenericError(e, res);
        }


    }

    /**
     * Retrieve and return all Roles from the database.
     * 
     * @param {*} req 
     * @param {*} res 
     */
    findAll =  (req, res) => {

        var filter = req.query.filter;

        if (!filter) {
            filter = '';
        }
        
        try {
            rolesDatabaseHandler.getRoles(filter, (rows) => {
                res.send(rows);
            }, (error) => handleDatabaseError(error, res));
        } catch (e) {
            handleGenericError(e, res);
        }


    }

    /**
     * Find a single Role with a Id
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
                rolesDatabaseHandler.getRole(id, (role) => {
                    res.send(role);
                }, (error) => handleDatabaseError(error, res));
            } catch (e) {
                handleGenericError(e, res);
            }


        }

    }

    // Update a pririlege identified by the role Id in the request
    update = (req, res) => {

        var role = new Role(req.body.id, req.body.name, req.body.description);

        try {
            rolesDatabaseHandler.updateRole(role, () => {
                res.send({success: 'true'});
            }, (error) => handleDatabaseError(error, res));
        } catch (e) {
            handleGenericError(e, res);
        }


    }

    // Delete a pririlege with the specified role id in the request
    remove =  (req, res) => {

        try {
            rolesDatabaseHandler.deleteRole(req.body.id, () => {
                res.send({success: 'true'});
            }, (error) => handleDatabaseError(error, res));
        } catch (e) {
            handleGenericError(e, res);
        }


    }
}


export default new UsersController();