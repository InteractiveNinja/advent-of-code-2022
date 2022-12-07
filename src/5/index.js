const fs = require('fs')
const path = require('path')
let file = fs.readFileSync(path.join(`${__dirname}/input.txt`), {encoding: 'utf8'});

let operations = file.split("\n").filter(f => f.startsWith("move"));

// Filter everything expect creates
let crates = file.split("\n").filter(f => !f.startsWith("move") && f != "").slice(0, -1).map(line => line.split("    ").map(line => line.split(" ")).flat())
let operationsIndexes = operations.map(line => line.split(" ").filter(f => !isNaN(f)));

const firstMap = new Map()
// Fills Map with Crates
crates.forEach(line => {
    line.forEach((value, index) => {
        if (!firstMap.get(index)) firstMap.set(index, [])
        if (value !== '') {
            firstMap.set(index, [value, ...firstMap.get(index)])
        }
    })
})

// Moves Creates one bye one
operationsIndexes.forEach(([amount, from, to]) => {
    for (let i = 0; i < amount; i++) {
        const crate = firstMap.get(from - 1).pop()

        firstMap.set(to - 1, [...firstMap.get(to - 1), crate])
    }
})

// Cleans Result
let firstResult = Array.from(firstMap.values()).map(entry => entry.pop()).join("").replaceAll("[", '').replaceAll("]", '');
console.log(firstResult)

const secondMap = new Map()
// Fills Map with Crates
crates.forEach(line => {
    line.forEach((value, index) => {
        if (!secondMap.get(index)) secondMap.set(index, [])
        if (value !== '') {
            secondMap.set(index, [value, ...secondMap.get(index)])
        }
    })
})


operationsIndexes.forEach(([amount, from, to]) => {
    const crates = secondMap.get(from-1)
    secondMap.set(from -1, crates.slice(0, -amount))
    secondMap.set(to - 1, [...secondMap.get(to - 1), ...crates.slice(-amount)])

})
let secondResult = Array.from(secondMap.values()).map(entry => entry.pop()).join("").replaceAll("[", '').replaceAll("]", '');
console.log(secondResult)
