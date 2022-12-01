const fs = require('fs')
const path = require('path')
let file = fs.readFileSync(path.join(`${__dirname}/input.txt`), {encoding: 'utf8'});

const numbers = file.split("\n\n")
    .map(string => string.split("\n")
        .reduce((previousValue, currentValue) => parseInt(previousValue) + parseInt(currentValue), 0)).sort()

console.log("First:", [...numbers].pop())
console.log("Second:", [...numbers].slice(-3).reduce((previousValue, currentValue) => previousValue + currentValue) )
