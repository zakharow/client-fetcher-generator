import * as fs from 'fs';
import * as ts from 'typescript';

export const parseToAst = (pathsToFiles: string[]): ts.SourceFile[]  => (
    pathsToFiles.map(path => (
        ts.createSourceFile(path, fs.readFileSync(path).toString(), ts.ScriptTarget.ES2015, false)
    ))
);
