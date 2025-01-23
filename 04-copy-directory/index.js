const fs = require('fs');
const path = require('path');
const myPath = __dirname;
const copyFolder = 'files-copy';
const folder = 'files';
const pathToCopyFolder = path.join(myPath, copyFolder);
const pathToFolder = path.join(myPath, folder);

async function copyDir() {
    try {
        await fs.promises.mkdir(pathToCopyFolder, { recursive: true });
        const allFiles = await fs.promises.readdir(pathToFolder);
        for (const file of allFiles) {
            const originalPath = path.join(pathToFolder, file);
            const twinPath = path.join(pathToCopyFolder, file);
            const info = await fs.promises.stat(originalPath);
            if (info.isDirectory()) {
                await copyDirRecursive(originalPath, twinPath);
            } else {
                await fs.promises.copyFile(originalPath, twinPath);
            }
        }
    } catch (error) {
        console.error('error', error);
    }
}
async function copyDirRecursive(origDir, twinDir) {
    try {
        await fs.promises.mkdir(twinDir, { recursive: true });
        const allFiles = await fs.promises.readdir(origDir);
        for (const file of allFiles) {
            const origPath = path.join(origDir, file);
            const twinPath = path.join(twinDir, file);
            const info = await fs.promises.stat(origPath);
            if (info.isDirectory()) {
                await copyDirRecursive(origDir, twinDir);
            } else {
                await fs.promises.copyFile(origPath, twinPath);
            }
        }
    } catch (error) {
        console.error('error', error);
    }
}
copyDir();