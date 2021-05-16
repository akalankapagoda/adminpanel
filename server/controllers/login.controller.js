/**
 * Handles CRUD operations for Courses.
 */
import {login} from '../auth/authHandler.js';

class LoginController {

    // Create and Save a new Course
    login = (req, res) => {
        login(req, res);
    };


}

export default new LoginController();