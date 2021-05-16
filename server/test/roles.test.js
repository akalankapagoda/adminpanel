import assert from 'assert';
import rolesDatabaseHandler from '../database/roles.database.js';
import Role from '../model/role.js';

const testRoleName = 'test_role';

describe('Roles Test', function () {

    describe('insert', function () {
        it('should return successfully when insert is called', function () {

            var role = new Role(null, testRoleName, 'Created by unit tests');

            rolesDatabaseHandler.insertRole(role, () => {
                assert.ok("Insert successful");
            }, (error) => {
                assert.fail("Insert failed : " + error);
            });
        });

    });

    describe('listAll', function () {

        it('should return the created role', function () {

            rolesDatabaseHandler.getRoles(testRoleName, (rows) => {
                assert.strictEqual(rows[0].name, testRoleName, "Role name mismatch");
            }, (error) => {
                assert.fail("GetAll failed : " + error);
            });
        });
    });

    describe('delete', function () {
        it('should delete the created role', function () {

            rolesDatabaseHandler.getRoles(testRoleName, (rows) => {

                var role_id = rows[0].id;

                rolesDatabaseHandler.deleteRole(role_id, () => {
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