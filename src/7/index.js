const fs = require('fs')
const path = require('path')
let file = fs.readFileSync(path.join(`${__dirname}/input.txt`), {encoding: 'utf8'});

const lines = file.split("\n")

const folderMap = new Map()
lines.reduce((folder, currentValue) => {

    if(folder != "" && !folderMap.get(folder)) folderMap.set(folder, [])
    const line = currentValue;
    let currentFolder = folder;

    // add Folders
    if(line.includes("$") && line.includes("cd") && !line.includes("..")) {
        currentFolder = line.split(" ").slice(-1).pop();
    }

    if(!line.includes("$")) {
        let value;
        if(!line.includes("dir")) {
            // Filesize
            value = line.split(" ").slice(0, 1)
        } else {
            // Foldername
            value = line.split(" ").slice(1)
        }
        folderMap.set(folder, [...folderMap.get(folder), ...value])
    }


    return currentFolder;
}, "")

const folderSum = new Map()

Array.from(folderMap.entries()).forEach(([key,value]) => {
    let sum = value.reduce((prev, currentValue) => prev += isNaN(currentValue) ? 0 : parseInt(currentValue), 0);

    folderSum.set(key, sum)
})

console.log(folderSum)

const totalSum = new Map()


Array.from(folderMap.entries()).forEach(([key,value]) => {
    let innerFolders = value.filter(val => isNaN(val));
    let innerFolderSum = innerFolders.reduce((prev, current) => prev += folderSum.get(current), 0);
    totalSum.set(key, folderSum.get(key) + innerFolderSum)

});

let sum = Array.from(totalSum.values()).filter(value => value <= 100000).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
console.log(sum)
