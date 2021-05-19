// Defines methods to handle generic errors

/**
 * Handles a generic service layer error and returns an error message to the service client.
 * 
 * @param {*} error The error details
 * @param {*} res The service response to write the error details to
 */
export function handleGenericError(error, res) {
    console.log(error);
    res.send({success: "false", message : error});
}

/**
 * Handles a DB layer error and returns additional information to the service client.
 * 
 * @param {*} error The error details
 * @param {*} res The service response to write the error details to
 */
export function handleDatabaseError(error, res) {
    console.log(error);
    res.send({success: "false", message : error.detail})
}