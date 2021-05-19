import crypto from 'crypto';

/**
 * Crate a random salt and generates a Hash using SHA512 using the generated sald and provided password.
 * 
 * Updates the User object with salt and hash once generated.
 * 
 * @param {*} user The user object to update
 * @param {*} password The plaintext password to hash
 */
export function generateUserHash(user, password) {
    // Creating a unique salt for a particular user 
    var salt = crypto.randomBytes(16).toString('hex');

    // Hashing user's salt and password with 1000 iterations, 

    var hash = crypto.pbkdf2Sync(password, salt,
        1000, 64, `sha512`).toString(`hex`);

    user.salt = salt;
    user.hash = hash;
}

/**
 * Recalculate the hash and validate a provided password.
 * 
 * @param {*} salt The initial salt used to generate the password hash
 * @param {*} hash The initial hashed password
 * @param {*} password The password to validate
 * 
 * @returns True if the password hash generated using the provided password is the same as the initial hash
 */
export function validatePassword(salt, hash, password) {
    var generatedHash = crypto.pbkdf2Sync(password,
        salt, 1000, 64, `sha512`).toString(`hex`);
    return generatedHash === hash;
};