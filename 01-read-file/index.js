const fs = require('fs');
const path = require('path');
const myPath = 'C:/Users/qq/Development/HTML-builder/01-read-file/text.txt';
const pathInfo = {
    fileName: path.basename(myPath),
    folderName: path.dirname(myPath),
    fileExtension: path.extname(myPath),
    absoluteOrNot: path.isAbsolute(myPath),
    detailInfo: path.parse(myPath),
}
const pathToText = [pathInfo.folderName, pathInfo.fileName,].join('/');
// console.log(pathToText);
const read = fs.createReadStream(pathToText, 'utf8');
read.on('data', (text) => {
    console.log(text);
});