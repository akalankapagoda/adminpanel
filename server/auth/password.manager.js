import crypto from 'crypto';

export function generateUserHash(user, password) {
    // Creating a unique salt for a particular user 
    var salt = crypto.randomBytes(16).toString('hex');

    // Hashing user's salt and password with 1000 iterations, 

    var hash = crypto.pbkdf2Sync(password, salt,
        1000, 64, `sha512`).toString(`hex`);

    user.salt = salt;
    user.hash = hash;
}

// Method to check the entered password is correct or not 
export function validatePassword(salt, hash, password) {
    var generatedHash = crypto.pbkdf2Sync(password,
        salt, 1000, 64, `sha512`).toString(`hex`);
    return generatedHash === hash;
};