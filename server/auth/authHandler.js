import jwt from 'jsonwebtoken';
import usersDatabaseHandler from '../database/users.database.js';
import { validatePassword } from './password.manager.js';
import { handleDatabaseError, handleGenericError } from '../error/error.handler.js';
import { base64ToString, stringToBase64 } from '../utils/base64utils.js';


export function login(req, res) {

    var authParams = validateAndGetAuthParams(req, res);

    if (!authParams) {
        return; // Already responded to client
    }

    if ('Basic' === authParams[0]) {
        validateBasicAuth(req, res, authParams[1], (user) => { res.send(createJWT(user.id, user.name, user.hash)) });

    } else {
        return res.sendStatus(401);
    }
}

function validateAndGetAuthParams(req, res) {
    const authHeader = req.headers['authorization']

    if (!authHeader) {
        res.sendStatus(401);
        return;
    }

    const authParams = authHeader.split(' ');

    if (authParams.length != 2) {
        res.sendStatus(401);
        return;
    }

    return authParams;
}

function validateBasicAuth(req, res, authParamValue, callback) {
    const authValue = base64ToString(authParamValue);

    const userDetails = authValue.split(':');

    if (userDetails.length != 2) {
        return res.sendStatus(401);
    }

    const username = userDetails[0];
    const password = userDetails[1];

    try {
        usersDatabaseHandler.getUserByUsername(username, (user) => {

            if (!validatePassword(user.salt, user.hash, password)) {
                return res.sendStatus(401);
            }

            callback(user);

        }, (error) => handleDatabaseError(error, res));
    } catch (e) {
        handleGenericError(e, res);
    }
}

/**
 * Create a JWT using the user_id and user's name as payload.
 * 
 * @param {*} user_id 
 * @param {*} name 
 * @param {*} secret 
 * 
 * @returns A JWT
 */
function createJWT(user_id, name, secret) {
    return jwt.sign({ user_id: user_id, name: name }, secret, { expiresIn: '1800s' });
}

export function authenticate(req, res, next) {

    var authParams = validateAndGetAuthParams(req, res);

    if (!authParams) {
        return; // Already responded to client
    }

    if ('Basic' === authParams[0]) {

        validateBasicAuth(req, res, authParams[1], (user) => {
            req.user = user;
            next();
            });

    } else if ('Bearer' === authParams[0]) {

        const token = authParams[1];

        if (token == null) {
            return res.sendStatus(401);
        }

        var tokenParts = token.split('.');

        if (tokenParts.length != 3) {
            return res.sendStatus(401);
        }

        // Decode the payload which is the middle part of the JWT and convert into a JSON
        var payload = JSON. parse(base64ToString(tokenParts[1]));

        usersDatabaseHandler.getUserWithHash(payload.user_id, (user) => {

            jwt.verify(token, user.hash, (err, decoded) => {

                if (err) {
                    return res.sendStatus(403)
                } else {
                    req.user = user;
                    next();
                }
            })

        }, (error) => handleDatabaseError(error, res));



    } else {
        return res.sendStatus(401);
    }


}