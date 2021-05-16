import assert from 'assert';
import usersDatabaseHandler from '../database/users.database.js';
import User from '../model/user.js';

const testUserName = 'test_user';

describe('Users Test', function () {

    describe('insert', function () {
        it('should return successfully when insert is called', function () {

            var user = new User(null, 'test_username', testUserName, 'test@test.com');

            usersDatabaseHandler.insertUser(user, () => {
                assert.ok("Insert successful");
            }, (error) => {
                assert.fail("Insert failed : " + error);
            });
        });

    });

    describe('listAll', function () {

        it('should return the created users', function () {

            usersDatabaseHandler.getUsers(testUserName, (rows) => {
                assert.strictEqual(rows[0].name, testUserName, "User name mismatch");
            }, (error) => {
                assert.fail("GetAll failed : " + error);
            });
        });
    });

    describe('delete', function () {
        it('should delete the created user', function () {

            usersDatabaseHandler.getUsers(testUserName, (rows) => {

                var user_id = rows[0].id;

                usersDatabaseHandler.deleteUser(user_id, () => {
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