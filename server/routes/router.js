/**
 * Configures services routes for this application.
 */

import coursesController from '../controllers/courses.controller.js';
import usersController from '../controllers/users.controller.js';
import rolesController from '../controllers/roles.controller.js';
import privilegesController from '../controllers/privileges.controller.js';
import rolePrivilegesController from '../controllers/role.privileges.controller.js';
import userRolesController from '../controllers/user.roles.controller.js';
import loginController from '../controllers/login.controller.js';
import {authenticate} from '../auth/authHandler.js';

const coursesPath = '/courses';
const usersPath = '/users';
const rolesPath = '/roles';
const privilegesPath = '/privileges';
const rolePrivilegesPath = '/rolePrivileges';
const userRolesPath = '/userRoles';
const loginPath = '/login';

const listPath = '/list';

export function initRoutes(app) {

    // Courses
    app.get(coursesPath, authenticate, coursesController.findOne);

    app.get(coursesPath + listPath, authenticate, coursesController.findAll);

    app.post(coursesPath, authenticate, coursesController.create);

    app.put(coursesPath, authenticate, coursesController.update);

    app.delete(coursesPath, authenticate, coursesController.remove);

    // Users
    app.get(usersPath, authenticate, usersController.findOne);

    app.get(usersPath + listPath, authenticate, usersController.findAll);

    app.post(usersPath, authenticate, usersController.create);

    app.put(usersPath, authenticate, usersController.update);

    app.delete(usersPath, authenticate, usersController.remove);

    // Roles
    app.get(rolesPath, authenticate, rolesController.findOne);

    app.get(rolesPath + listPath, authenticate, rolesController.findAll);

    app.post(rolesPath, authenticate, rolesController.create);

    app.put(rolesPath, authenticate, rolesController.update);

    app.delete(rolesPath, authenticate, rolesController.remove);

    // Privileges
    app.get(privilegesPath, authenticate, privilegesController.findOne);

    app.get(privilegesPath + listPath, authenticate, privilegesController.findAll);

    app.post(privilegesPath, authenticate, privilegesController.create);

    app.put(privilegesPath, authenticate, privilegesController.update);

    app.delete(privilegesPath, authenticate, privilegesController.remove);

    // Role_Privileges (Only list, create and delete is provided since get and update are useless)
    app.get(rolePrivilegesPath + listPath,authenticate,  rolePrivilegesController.findAll);

    app.post(rolePrivilegesPath, authenticate, rolePrivilegesController.create);

    app.delete(rolePrivilegesPath, authenticate, rolePrivilegesController.remove);

    // User_Roles (Only list, create and delete is provided since get and update are useless)
    app.get(userRolesPath + listPath, authenticate, userRolesController.findAll);

    app.post(userRolesPath, authenticate, userRolesController.create);

    app.delete(userRolesPath, authenticate, userRolesController.remove);

    // Login
    app.post(loginPath, loginController.login);
}
