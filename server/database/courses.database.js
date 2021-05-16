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
        return;
      }

      if (results) {
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
        return;
      }

      if (results) {
        callback(results.rows.map(createCourseObjectFromRow));
      } else {
        callback();
      }
      
    })
  };

  insertCourse = (course, callback, errorCallback) => {

    pool.query(insertCourseQuery(course), (error, results) => {
      if (error) {
        errorCallback(error);
        return;
      }
      
      callback();
      
    })

  };

  updateCourse = (course, callback, errorCallback) => {

    pool.query(updateCourseQuery(course), (error, results) => {
      if (error) {
        errorCallback(error);
        return;
      }

      callback();
    })

  };

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

export default new CoursesDatabaseHandler();