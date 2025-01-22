const fs = require('fs');
const path = require('path');
const myPath = __dirname;
const pathInfo = {
    fileName: path.basename(myPath),
    folderName: path.dirname(myPath),
    fileExtension: path.extname(myPath),
    absoluteOrNot: path.isAbsolute(myPath),
    detailInfo: path.parse(myPath),
}
const file = 'text.txt'
const pathToText = path.join(pathInfo.folderName, pathInfo.fileName, file);
const read = fs.createReadStream(pathToText, 'utf8');
read.on('data', (text) => {
    console.log(text);
});