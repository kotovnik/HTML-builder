const fs = require('fs');
const path = require('path');
const myPath = __dirname;
console.log(myPath);
const folder = 'secret-folder';
const pathToFolder = path.join(myPath, folder);
console.log(pathToFolder);
// fs.readdir(путь, параметры, обратный вызов)
// <file name>-<file extension>-<file size>
async function getInfoOfFiles() {
    try {
        const allFiles = await fs.promises.readdir(pathToFolder, { withFileTypes: true });
        for (const file of allFiles) {
            const fileName = file.name;
            // console.log(`fileName: ${fileName}`);
            const pathToFile = path.join(pathToFolder, fileName);
            if (file.isFile()) {
                const fileExtension = path.extname(fileName);
                const fileExtensionSliced = fileExtension.slice(1);
                const fileNamed = path.basename(fileName, fileExtensionSliced).slice(0, -1);
                const info = await fs.promises.stat(pathToFile);
                console.log(`${fileNamed} - ${fileExtensionSliced} - ${info.size}`);
            }
        }
    } catch (error) {
        console.error('error', error);
    }
}
getInfoOfFiles();