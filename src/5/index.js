const fs = require('fs')
const path = require('path')
let file = fs.readFileSync(path.join(`${__dirname}/input.txt`), {encoding: 'utf8'});

let operations = file.split("\n").filter(f => f.startsWith("move"));

// Filter everything expect creates
let crates = file.split("\n").filter(f => !f.startsWith("move") && f != "").slice(0,-1).map(line => line.split( "    "))

let createsMap = new Map()
for (let i = 0; i < crates.length; i++) {
    for (let j = 0; j < crates[i].length; j++) {
        let crateElement = crates[i][j];
        createsMap.set(i, [createsMap.get(i), crateElement])
    }
}

console.log(createsMap)
