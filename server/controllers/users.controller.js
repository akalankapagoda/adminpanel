/**
 * Handles CRUD operations for Users.
 */

import usersDatabaseHandler from '../database/users.database.js';
import User from '../model/user.js';
import {generateUserHash} from '../auth/password.manager.js';
import {handleDatabaseError, handleGenericError} from '../error/error.handler.js';

class UsersController {
    // Create and Save a new Users
    create = (req, res) => {

        var user = new User(null, req.body.username, req.body.name, req.body.email);

        try {

            generateUserHash(user, req.body.password);

            usersDatabaseHandler.insertUser(user, () => {
                res.send({success: 'true'});
            }, (error) => handleDatabaseError(error, res));
        } catch (e) {
            handleGenericError(e, res);
        }

    }

    // Retrieve and return all Users from the database.
    findAll =  (req, res) => {

        var filter = req.query.filter;

        if (!filter) {
            filter = '';
        }
        
        try {
            usersDatabaseHandler.getUsers(filter, (rows) => {
                res.send(rows);
            }, (error) => handleDatabaseError(error, res));
        } catch (e) {
            handleGenericError(e, res);
        }


    }

    // Find a single User with a Id
    findOne =  (req, res) => {
        var id = req.query.id;

        if (!id) {
            res.send({error: 'id not provided'});
        } else {

            try {
                usersDatabaseHandler.getUser(id, (user) => {
                    res.send(user);
                }, (error) => handleDatabaseError(error, res));
            } catch (e) {
                handleGenericError(e, res);
            }


        }

    }

    // Update a user identified by the user Id in the request
    update = (req, res) => {

        var user = new User(req.body.id, req.body.username, req.body.name, req.body.email);

        try {
            usersDatabaseHandler.updateUser(user, () => {
                res.send({success: 'true'});
            }, (error) => handleDatabaseError(error, res));
        } catch (e) {
            handleGenericError(e, res);
        }


    }

    // Delete a user with the specified user id in the request
    remove =  (req, res) => {

        try {
            usersDatabaseHandler.deleteUser(req.body.id, () => {
                res.send({success: 'true'});
            }, (error) => handleDatabaseError(error, res));
        } catch (e) {
            handleGenericError(e, res);
        }


    }
}


export default new UsersController();