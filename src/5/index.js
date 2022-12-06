const fs = require('fs')
const path = require('path')
let file = fs.readFileSync(path.join(`${__dirname}/input.txt`), {encoding: 'utf8'});

let operations = file.split("\n").filter(f => f.startsWith("move"));

// Filter everything expect creates
let crates = file.split("\n").filter(f => !f.startsWith("move") && f != "").slice(0,-1).map(line => line.split( " "))

