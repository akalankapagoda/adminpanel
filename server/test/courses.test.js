import assert from 'assert';
import coursesDatabaseHandler from '../database/courses.database.js';
import Course from '../model/course.js';

const testCourseName = 'test_course';

describe('Courses Test', function () {

    describe('insert', function () {
        it('should return successfully when insert is called', function () {

            var course = new Course(null, testCourseName, 'Created by unit tests', 1, 1, {});

            coursesDatabaseHandler.insertCourse(course, () => {
                assert.ok("Insert successful");
            }, (error) => {
                assert.fail("Insert failed : " + error);
            });
        });

    });

    describe('listAll', function () {

        it('should return the created courses', function () {

            coursesDatabaseHandler.getCourses(testCourseName, (rows) => {

                assert.strictEqual(rows[0].name, testCourseName, "Course name mismatch");

            }, (error) => {
                assert.fail("GetAll failed : " + error);
            });
        });
    });

    describe('delete', function () {

        it('should delete the created courses', function () {

            coursesDatabaseHandler.getCourses(testCourseName, (rows) => {
                
                var course_id = rows[0].id;

                coursesDatabaseHandler.deleteCourse(course_id, () => {
                    assert.ok("Delete successful");
                }, (error) => {
                    assert.fail("Delete failed : " + error);
                });
            }, (error) => {
                assert.fail("Delete failed. Failed to identify the row to delete : " + error);
            });
        });
    });

})