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

console.log(filesAndFoldersMap)

// Calculates sum from Folder where only Folders exists
let folderSum = new Map(Array.from(filesAndFoldersMap.entries()).reverse().map((mapEntry) => {
    const [folder, fileAndFolder] = mapEntry;

    let onlyFiles = fileAndFolder.every(entry => !isNaN(entry));

    if (onlyFiles) {
        let sum = fileAndFolder.reduce((prev, cur) => prev + parseInt(cur), 0);
        return [folder, sum]
    } else {

        return mapEntry;
    }

}));


const folderSizeCache = new Map()
function getFolderSize(folderName)  {
    if(folderSizeCache.has(folderName)) {
        return folderSizeCache.get(folderName)
    }
    let size = folderSum.get(folderName);
    if(isNaN(size)) {
        let innerFolderSize = size.filter(folders => isNaN(folders)).reduce((prev, cur) => {
            let folderSize = getFolderSize(cur);
            folderSizeCache.set(cur, folderSize)
            return prev + folderSize;
        },0);
        const fileSize = size.filter(folders => !isNaN(folders)).reduce((prev, cur) => { return prev + parseInt(cur)},0)
        let folderSize = innerFolderSize + fileSize;
        folderSizeCache.set(folderName, folderSize)
        return folderSize
    }

    return parseInt(size);
}



const totalSum = Array.from(folderSum.entries()).map(mapEntry => {
    const [folder, fileAndFolder] = mapEntry;
    if (!isNaN(fileAndFolder)) {
        return mapEntry;
    }


    let fileSum = fileAndFolder.filter(file => !isNaN(file)).reduce((prev, cur) => prev + parseInt(cur), 0);

    let folderSum = fileAndFolder.filter(folder => isNaN(folder)).reduce((prev, cur) => {

        let folderSize = getFolderSize(cur);
        return prev + folderSize;
    }, 0);



    return [folder, fileSum + folderSum]
})
console.log(totalSum)

