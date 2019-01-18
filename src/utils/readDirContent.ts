import * as fs from 'fs';
import * as path from 'path';

/**
 * Читает обходом в глубину содержимое корневой директории и возвращает массив путей к найденным файлам
 */
export const readDirContent = (rootDir: string): string[] => {
    const rootDirContent = fs.readdirSync(rootDir);
    const dirs = rootDirContent.filter(name => fs.statSync(path.join(rootDir, name)).isDirectory());
    const files = rootDirContent.filter(name => fs.statSync(path.join(rootDir, name)).isFile());
    const childDirsContent = dirs.map(dir => readDirContent(path.join(rootDir, dir)).map(file => path.join(dir, file)));
    return files.concat(...childDirsContent)
};
