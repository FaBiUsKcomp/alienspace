const passEquals = (value1, value2, msg) => {
    if(value1 !== value2) throw msg
}

function existsOrError (value, msg){
    if(!value) throw msg
    if(Array.isArray(value) && value.length === 0) throw msg
    if(typeof value === 'string' && !value.trim()) throw msg
}

function notExists(value, msg) {
    try {
        existsOrError(value, msg)
    } catch (e) {
        return
    }

    throw msg
}

module.exports = { passEquals, existsOrError, notExists }