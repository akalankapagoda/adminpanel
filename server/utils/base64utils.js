// Base64 Utilities

/**
 * Convert a string to a Base 64 encoded string.
 * 
 * @param {*} string The string to encode
 * @returns The base64 encoed string
 */
export function stringToBase64(string) {
    return Buffer.from(string).toString('base64');
};

/**
 * Convert a Base 64 encoded string to a it's String form.
 * 
 * @param {*} base64String The Base 64 encoded string
 * @returns Actual un-encoded string
 */
export function base64ToString(base64String) {
    return Buffer.from(base64String, 'base64').toString();
}