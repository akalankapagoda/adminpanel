
export function stringToBase64(string) {
    return Buffer.from(string).toString('base64');
};

export function base64ToString(base64String) {
    return Buffer.from(base64String, 'base64').toString();
}