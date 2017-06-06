function deepCopy(str) {
    let copy = JSON.parse(JSON.stringify(str))
    return copy
}
export default deepCopy