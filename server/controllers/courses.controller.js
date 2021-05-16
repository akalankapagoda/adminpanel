/**
 * Handles CRUD operations for Courses.
 */
 import coursesDatabaseHandler from '../database/courses.database.js';
 import Course from '../model/course.js';
 import {handleDatabaseError, handleGenericError} from '../error/error.handler.js';

class CoursesController {

        // Create and Save a new Course
    create = (req, res) => {

        var userId = '1'; // TODO: Parse userId from middleware

        var course = new Course(null, req.body.name, req.body.description, req.body.credits, userId, req.body.questions);

        try {
            coursesDatabaseHandler.insertCourse(course, () => {
                res.send({success: 'true'});
            }, (error) => handleDatabaseError(error, res));
        } catch (e) {
            handleGenericError(e, res);
        }

    };

    // Retrieve and return all Courses from the database.
    findAll = (req, res) => {
        var filter = req.query.filter;

        if (!filter) {
            filter = '';
        }
        
        try {
            coursesDatabaseHandler.getCourses(filter, (rows) => {
                res.send(rows);
            }, (error) => handleDatabaseError(error, res));
        } catch (e) {
            handleGenericError(e, res);
        }

    };

    // Find a single course with a courseId
    findOne = (req, res) => {
        var id = req.query.id;

        if (!id) {
            res.send({error: 'id not provided'});
        } else {

            try {
                coursesDatabaseHandler.getCourse(id, (course) => {
                    res.send(course);
                }, (error) => handleDatabaseError(error, res));
            } catch (e) {
                handleGenericError(e, res);
            }


        }
    };

    // Update a course identified by the courseId in the request
    update = (req, res) => {

        var userId = '1';   // TODO: Parse userId from middleware

        var course = new Course(req.body.id, req.body.name, req.body.description, req.body.credits, userId, req.body.questions);

        try {
            coursesDatabaseHandler.updateCourse(course, () => {
                res.send({success: 'true'});
            }, (error) => handleDatabaseError(error, res));
        } catch (e) {
            handleGenericError(e, res);
        }

    };

    // Delete a course with the specified courseId in the request
    remove = (req, res) => {

        try {
            coursesDatabaseHandler.deleteCourse(req.body.id, () => {
                res.send({success: 'true'});
            }, (error) => handleDatabaseError(error, res));
        } catch (e) {
            handleGenericError(e, res);
        }
    };

}

export default new CoursesController();