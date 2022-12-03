const fs = require('fs')
const path = require('path')
let file = fs.readFileSync(path.join(`${__dirname}/input.txt`), {encoding: 'utf8'});

let first = file.split("\n").map(rucksacks => {
    // Prepare Data
    let chars = rucksacks.split("");
    return [chars.slice(0, rucksacks.length / 2), chars.slice(rucksacks.length / 2)];
}).reduce((previousValue, currentValue) => {
    // Get Duplicates
    let duplicates = previousValue;
    let currentDuplicates = []
    const [firstRucksack, secondRucksack] = currentValue;
    secondRucksack.forEach(entry => {
        if(firstRucksack.includes(entry)) {
            // Prevents for multiple same values per rucksack
            if(!currentDuplicates.includes(entry)) {
                currentDuplicates.push(entry)
            }
        }
    })
    return [...duplicates,...currentDuplicates];

}, []).reduce(calcPriority, 0);

function sliceIntoGroups(array, size) {
    const slices = [];
    for (let i = 0; i < array.length; i+=size) {
        slices.push(array.slice(i, i+size).map(entry => entry.trim())) // trim to remove \r lmao
    }
    return slices;
}

function calcPriority(previousValue, currentValue) {
    // Get Priorities
    let totalPriority = previousValue;
    const alpha = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    let foundIndex = alpha.findIndex(value => value === currentValue) + 1;
    totalPriority += foundIndex;
    return totalPriority;
}

let second = sliceIntoGroups(file.split("\n"), 3).reduce((previousValue, currentValue) => {
    // Get Duplicates
    let duplicates = previousValue;
    let currentDuplicates = []
    const [firstRucksack, secondRucksack, thirdRucksack] = currentValue;
    firstRucksack.split("").forEach(entry => {
        if(secondRucksack.split("").includes(entry) && thirdRucksack.split("").includes(entry)) {
            // Prevents for multiple same values per rucksack
            if(!currentDuplicates.includes(entry)) {
                currentDuplicates.push(entry)
            }
        }
    })
    return [...duplicates,...currentDuplicates];

}, []).reduce(calcPriority, 0);

console.log(first, second)