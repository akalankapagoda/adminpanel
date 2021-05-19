import pool from './postgre.pool.js';
import Course from '../model/course.js';
import {listCoursesQuery, getCourseQuery, insertCourseQuery, updateCourseQuery, deleteCourseQuery} from './queries/courses.queries.js';

/**
 * Handles database operations related to courses.
 */
class CoursesDatabaseHandler {

  /**
   * Retrieve a course from DB.
   * 
   * @param {*} id Course id to retrieve
   * @param {*} callback Function to call on success
   * @param {*} errorCallback Function to call on Failure
   */
  getCourse = (id, callback, errorCallback) => {

    pool.query(getCourseQuery(id) , (error, results) => {
      if (error) {
        errorCallback(error);
        return;
      }

      if (results) {
        callback(createCourseObjectFromRow(results.rows[0]));
      } else {
        callback({error: 'notFound'});
      }
      
    })
  };

  /**
   * Retrieve a list of courses filtered by the name using the provided filter text.
   * 
   * @param {*} filter 
   * @param {*} callback Function to call on success
   * @param {*} errorCallback Function to call on Failure
   */
  getCourses = (filter, callback, errorCallback) => {

    pool.query(listCoursesQuery(filter), (error, results) => {
      if (error) {
        errorCallback(error);
        return;
      }

      if (results) {
        callback(results.rows.map(createCourseObjectFromRow));
      } else {
        callback();
      }
      
    })
  };

  /**
   * Insert a course to the DB.
   * 
   * @param {*} course The course object to insert
   * @param {*} callback Function to call on success
   * @param {*} errorCallback Function to call on Failure
   */
  insertCourse = (course, callback, errorCallback) => {

    pool.query(insertCourseQuery(course), (error, results) => {
      if (error) {
        errorCallback(error);
        return;
      }
      
      callback();
      
    })

  };

  /**
   * Update a course in the DB.
   * 
   * @param {*} course The updated course object to update in the DB
   * @param {*} callback Function to call on success
   * @param {*} errorCallback Function to call on Failure
   */
  updateCourse = (course, callback, errorCallback) => {

    pool.query(updateCourseQuery(course), (error, results) => {
      if (error) {
        errorCallback(error);
        return;
      }

      callback();
    })

  };

  /**
   * Delete a course from DB.
   * 
   * @param {*} id The course id to delete
   * @param {*} callback Function to call on success
   * @param {*} errorCallback Function to call on Failure
   */
  deleteCourse = (id, callback, errorCallback) => {

    pool.query(deleteCourseQuery(id), (error, results) => {
      if (error) {
        errorCallback(error);
        return;
      }

      callback();
    })

  };

}

/**
 * Create a course object from a json.
 * 
 * @param {*} row The json object with course details.
 * 
 * @returns A course object populated with data from the JSON
 */
const createCourseObjectFromRow = (row) => {
  return new Course(row.id, row.name, row.description, row.credits, row.created_by, row.questions);
}

export default new CoursesDatabaseHandler();