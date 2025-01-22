const fs = require('fs');
const path = require('path');
const readLine = require('readline');
const myPath = __dirname;
const file = 'text.txt'
const pathToText = path.join(__dirname, file);
const writeStream = fs.createWriteStream(pathToText, { flags: 'a' });
const read = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
});
console.log("Enter the text to write it to a file. To exit, enter 'q'");
function writeText() {
    read.question("Enter the text (or something): ", (text) =>{
        if((text === 'q') || (text === 'й')){
            console.log("You're out of the input");
            read.close();
            writeStream.end();
        } else {
            writeStream.write(text);
            writeText();
        }
    });
};
writeText();