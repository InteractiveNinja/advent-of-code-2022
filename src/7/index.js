const fs = require('fs')
const path = require('path')
let file = fs.readFileSync(path.join(`${__dirname}/input.txt`), {encoding: 'utf8'});

const lines = file.split("\n")


const filesAndFoldersMap = new Map()

lines.reduce((folderName, currentLine) => {
    let currentFolderName = folderName;

    if (currentLine.startsWith("$")) {
        // CMD Line

        if (currentLine.includes("cd") && !currentLine.includes("..")) {
            currentFolderName = currentLine.split(" ").pop()
        }

    } else {
        let fileOrFolder;
        if (currentLine.includes("dir")) {
            // is Folder
            fileOrFolder = currentLine.split(" ").pop();
        } else {
            fileOrFolder = currentLine.split(" ")[0];
        }
        filesAndFoldersMap.set(currentFolderName, [...filesAndFoldersMap.get(currentFolderName), fileOrFolder])

    }
    if (currentFolderName !== "") {
        if (!filesAndFoldersMap.get(currentFolderName)) filesAndFoldersMap.set(currentFolderName, [])
    }

    return currentFolderName;

}, "")

// Calculates sum from Folder where only Folders exists
let folderSum = new Map(Array.from(filesAndFoldersMap.entries()).map((mapEntry) => {
    const [folder, fileAndFolder] = mapEntry;

    let onlyFiles = fileAndFolder.every(entry => !isNaN(entry));

    if (onlyFiles) {
        let sum = fileAndFolder.reduce((prev, cur) => prev + parseInt(cur), 0);
        return [folder, sum]
    } else {

        return mapEntry;
    }

}));

function getFolderSizeRec(folderName) {
    let folderValueOrSize = folderSum.get(folderName);
    if(!folderValueOrSize) {
        return parseInt(folderName)
    }
    if (isNaN(folderValueOrSize)) {

        return folderValueOrSize.reduce((prev, cur) => prev + isNaN(cur) ? parseInt(getFolderSizeRec(cur)) : parseInt(cur), 0)

    }
    return parseInt(folderValueOrSize)
}


const totalSum = Array.from(folderSum.entries()).map(mapEntry => {
    const [folder, fileAndFolder] = mapEntry;
    if (!isNaN(fileAndFolder)) {
        return mapEntry;
    }

    let fileSum = fileAndFolder.filter(file => !isNaN(file)).reduce((prev, cur) => prev + parseInt(cur), 0);
    let folders = fileAndFolder.filter(folder => isNaN(folder));
    return [folder, [fileSum, folders]]
}).map(mapEntry => {
    if (!isNaN(mapEntry[1])) {
        return mapEntry;
    }
    const [folder, [fileSize, folders]] = mapEntry;

    const folderSum = folders.reduce((prev, cur) => prev + getFolderSizeRec(cur), 0)
    return [folder, fileSize + folderSum]

})
console.log(totalSum)

