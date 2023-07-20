 const isValidId = (Id) => {

    // Modify this function based on your user ID validation logic for example, you can user regular expression to check for valid MongoDB ObjectID format
    const validObjectRegex = /^[0-9a-fA-F]$/;
    return validObjectRegex.test(Id)
}

module.exports = isValidId