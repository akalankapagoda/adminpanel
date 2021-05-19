/**
 * Handles login request.
 */
import {login} from '../auth/authHandler.js';

class LoginController {

    /**
     * Handles login request.
     * 
     * @param {*} req 
     * @param {*} res 
     */
    login = (req, res) => {
        login(req, res);
    };


}

export default new LoginController();