/**
 * Configures services routes for this application.
 */

import coursesController from '../controllers/courses.controller.js';
import usersController from '../controllers/users.controller.js';
import rolesController from '../controllers/roles.controller.js';
import privilegesController from '../controllers/privileges.controller.js';

const coursesPath = '/courses';
const usersPath = '/users';
const rolesPath = '/roles';
const privilegesPath = '/privileges';
const rolePrivilegesPath = '/rolePrivileges';
const userRolesPath = '/userRoles';

const listPath = '/list';

export function initRoutes(app) {

    // Courses
    app.get(coursesPath, coursesController.findOne);

    app.get(coursesPath + listPath, coursesController.findAll);

    app.post(coursesPath, coursesController.create);

    app.put(coursesPath, coursesController.update);

    app.delete(coursesPath, coursesController.remove);

    // Users
    app.get(usersPath, usersController.findOne);

    app.get(usersPath + listPath, usersController.findAll);

    app.post(usersPath, usersController.create);

    app.put(usersPath, usersController.update);

    app.delete(usersPath, usersController.remove);

    // Roles
    app.get(rolesPath, rolesController.findOne);

    app.get(rolesPath + listPath, rolesController.findAll);

    app.post(rolesPath, rolesController.create);

    app.put(rolesPath, rolesController.update);

    app.delete(rolesPath, rolesController.remove);

    // Privileges
    app.get(privilegesPath, privilegesController.findOne);

    app.get(privilegesPath + listPath, privilegesController.findAll);

    app.post(privilegesPath, privilegesController.create);

    app.put(privilegesPath, privilegesController.update);

    app.delete(privilegesPath, privilegesController.remove);
}
