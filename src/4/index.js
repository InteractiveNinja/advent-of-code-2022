const fs = require('fs')
const path = require('path')
let file = fs.readFileSync(path.join(`${__dirname}/input.txt`), {encoding: 'utf8'});

let sectors = file.split("\n").map(line => line.trim().split(","))


let filledSectors = sectors.map(sectorPair => {
    return sectorPair.map(sector => {
        let filledSector = []
        let [start,end] = sector.split("-");
        for (let i = parseInt(start); i <= end; i++) {
            filledSector.push(i)
        }
        return filledSector
    })
});

let firstDoubles = filledSectors.reduce((previousValue, currentValue) => {
    let doubles = previousValue;
    const [firstSector, secondSector ] = currentValue

    if(firstSector.every(entry => secondSector.includes(entry))) {
        doubles+=1;
    } else if (secondSector.every(entry => firstSector.includes(entry))) {
        doubles+=1;
    }

    return doubles;

}, 0);

let secondDoubles = filledSectors.reduce((previousValue, currentValue) => {
    let doubles = previousValue;
    const [firstSector, secondSector ] = currentValue

    if(firstSector.some(entry => secondSector.includes(entry))) {
        doubles+=1;
    } else if (secondSector.some(entry => firstSector.includes(entry))) {
        doubles+=1;
    }

    return doubles;

}, 0);



console.log(firstDoubles, secondDoubles)