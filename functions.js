import fs from 'fs/promises';

async function listFiles(path) {
    const dirents = await fs.readdir(path, { withFileTypes: true });
    const tabFiles = await Promise.all(dirents.map(dirent => transformDirent(dirent, path)));
    return tabFiles;
}

async function transformDirent(dirent, path) {
    const file = {
        name: dirent.name,
        isFolder: dirent.isDirectory(),
    }
    if (dirent.isFile()) {
        const statsFile = await getStatsFile(dirent, path);
        file.size = statsFile.size;
    }
    return file;
}

function getStatsFile(dirent, path) {
    return fs.stat(path + dirent.name)
}
/*
async function printFileOrFolder(req, res, path) {
    
    const fileName = req.params.name;
    const regexFolderName = new RegExp ("^[a-zA-Z0-9_\-]+$","gm");
    const isFolder = regexFolderName.test(fileName);

    if(isFolder){
        const tabFiles = await listFiles(path+fileName+"/").catch(err=>console.log(err.message));
        return res.status(200).type('application/json').send(tabFiles);
    } else {
        return res.status(200).type('application/octet-stream').sendFile(path+fileName);
    }   
}
*/

async function createDirectory(path){

}


async function isFolder(path){
    const statsFile = await fs.stat(path);
    return statsFile.isDirectory();
}



export {listFiles, isFolder, createDirectory}