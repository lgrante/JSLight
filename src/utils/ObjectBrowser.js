module.exports = function ObjectBrowser(object, path) {
    let objectRef = object
    const fields = path.split('.'), fieldsNumber = fields.length, lastField = fields[fieldsNumber - 1]
    const regexBracketsArray = /\[[0-9]+\]?/, regexBracketsObject = /\[[a-zA-Z0-9_]+\]?/, regexField = /^[a-zA-Z0-9_]+/

    const readBracket = field => {
        const brackets = field.match(regexBracketsObject)[0]
        const content = brackets.substring(1, brackets.length - 1)

        return regexBracketsArray.test(field) ? parseInt(content) : content
    }

    const readField = (objectRef, field) => {
        if (regexBracketsObject.test(field)) {
            objectRef = objectRef[field.match(regexField)]
            objectRef = objectRef[readBracket(field)]
        } else
            objectRef = objectRef[field]
        return objectRef
    }

    for (let i = 0; i < fieldsNumber - 1; i++)
        objectRef = readField(objectRef, fields[i])
    return {
        get: () => readField(objectRef, lastField),
        set: value => {
            if (regexBracketsObject.test(lastField)) {
                objectRef = objectRef[lastField.match(regexField)]
                objectRef[readBracket(lastField)] = value
            } else
                objectRef[lastField] = value
            return object
        }
    }
}