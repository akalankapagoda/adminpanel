import pool from './postgre.pool.js';
import Course from '../model/course.js';
import {listCoursesQuery, getCourseQuery, insertCourseQuery, updateCourseQuery, deleteCourseQuery} from './queries/courses.queries.js';

const createCourseObjectFromRow = (row) => {
  return new Course(row.id, row.name, row.description, row.credits, row.created_by, row.questions);
}

class CoursesDatabaseHandler {

  getCourse = (id, callback, errorCallback) => {

    pool.query(getCourseQuery(id) , (error, results) => {
      if (error) {
        errorCallback(error);
      }

      if (results.rowCount > 0) {

        callback(createCourseObjectFromRow(results.rows[0]));

      } else {
        callback({error: 'notFound'});
      }
      
    })
  };

  getCourses = (filter, callback, errorCallback) => {

    pool.query(listCoursesQuery(filter), (error, results) => {
      if (error) {
        errorCallback(error);
      }

      callback(results.rows.map(createCourseObjectFromRow));
    })
  };

  insertCourse = (course, callback, errorCallback) => {

    pool.query(insertCourseQuery(course), (error, results) => {
      if (error) {
        errorCallback(error);
      } else {
        callback();
      }
    })

  };

  updateCourse = (course, callback, errorCallback) => {

    pool.query(updateCourseQuery(course), (error, results) => {
      if (error) {
        errorCallback(error);
      }

      callback();
    })

  };

  deleteCourse = (id, callback, errorCallback) => {

    pool.query(deleteCourseQuery(id), (error, results) => {
      if (error) {
        errorCallback(error);
      }

      callback();
    })

  };

}

export default new CoursesDatabaseHandler();