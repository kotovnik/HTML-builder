const fs = require('fs');
const path = require('path');
const myPath = __dirname;
console.log(myPath);
const styles = 'styles';
const resultFile = 'bundle.css';
const resultFolder = 'project-dist';
const pathToStylesFolder = path.join(myPath, styles);
const pathToResultFolder = path.join(myPath, resultFolder);
const pathToResultFile = path.join(pathToResultFolder, resultFile);
console.log(pathToResultFolder);
console.log(pathToResultFile);

async function addStyles() {
    try {
        await fs.promises.mkdir(pathToResultFolder, { recursive: true });
        const allFiles = await fs.promises.readdir(pathToStylesFolder);
        const arrStyles = [];
        for (const file of allFiles) {
            const filePath = path.join(pathToStylesFolder, file);
            const fileExtension = path.extname(file);
            if (fileExtension === '.css' && fs.statSync(filePath).isFile()) {
                const content = await fs.promises.readFile(filePath, 'utf-8');
                arrStyles.push(content);
            }
        }
        await fs.promises.writeFile(pathToResultFile, arrStyles.join('\n'), 'utf-8');
    } catch (error) {
        console.error('error', error);
    }
}
addStyles();