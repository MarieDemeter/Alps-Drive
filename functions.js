import fs from 'fs/promises';

async function listFiles(path) {
    const dirents = await fs.readdir(path, { withFileTypes: true });
    const tabFiles = await Promise.all(dirents.map(dirent => transformDirent(dirent, path)));
    console.log(tabFiles);
    return tabFiles;
}

async function transformDirent(dirent, path) {
    const file = {
        name: dirent.name,
        isFolder: dirent.isDirectory(),
    }
    if (dirent.isFile()) {
        const statsFile = await getStatsFile(dirent, path);
        console.log(statsFile);
        file.size = statsFile.size;
    }
    return file;
}

function getStatsFile(dirent, path) {
    return fs.stat(path + dirent.name)
}





export {listFiles}