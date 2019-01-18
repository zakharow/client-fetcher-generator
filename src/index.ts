import * as path from 'path';
import { readDirContent } from './utils/readDirContent';
import { parseToAst } from './parser/utils/parseToAst';
import { createFetchers } from './parser';

if (process.argv.length < 3) {
    console.log('Usage: client-fetcher-generator hapiPluginsSourcePath');
    process.exit(1);
}

const hapiPluginsSourcePath = path.resolve(process.cwd(), process.argv[2]);

export default function run(hapiPluginsPath: string) {
    const content = readDirContent(hapiPluginsPath);
    const contentArray = [[content[38], content[39], content[40], content[41], content[42]], [content[43], content[44], content[45]], [content[46], content[47], content[48], content[49], content[50]]];
    contentArray.forEach(plugins => {
        const asts = parseToAst(plugins.map(name => path.join(hapiPluginsPath, name)));
        createFetchers(asts);
    })
}

console.log(run('../services/src/server/api'));
