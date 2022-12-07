const fs = require('fs')
const path = require('path')
let file = fs.readFileSync(path.join(`${__dirname}/input.txt`), {encoding: 'utf8'});

let chars = file.split("");

const signalIndex = []
chars.reduce((previousValue, currentValue, index) => {
    let chars = previousValue;
    chars.push(currentValue)

    if (chars.length === 4) {
        const charsToCheck = []
        const allUnique = chars.every(char => {
            let includes = !charsToCheck.includes(char);
            charsToCheck.push(char)
            return includes
        })
        if (allUnique) {
            if (signalIndex.length === 0) signalIndex.push(index + 1);
        }
        chars = chars.slice(1)

    }

    return chars;

}, [])
const messageIndex = []

chars.reduce((previousValue, currentValue, index) => {
    let chars = previousValue;
    chars.push(currentValue)

    if (chars.length === 14) {
        const charsToCheck = []
        const allUnique = chars.every(char => {
            let includes = !charsToCheck.includes(char);
            charsToCheck.push(char)
            return includes
        })
        if (allUnique) {
            if (messageIndex.length === 0) messageIndex.push(index + 1);
        }
        chars = chars.slice(1)

    }

    return chars;

}, [])

console.log(`First:  ${signalIndex}, Second: ${messageIndex}`)
