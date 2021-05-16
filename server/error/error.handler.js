export function handleGenericError(error, res) {
    console.log(error);
    res.send({success: "false", message : e});
}

export function handleDatabaseError(error, res) {
    console.log(error);
    res.send({success: "false", message : error.detail})
}