import * as ts from 'typescript';
import { generateImports } from './generateImports';
import { generateFetchers } from './generateFetchers';
import { fetcherDataObject } from '../parser/index';

export const generate = (fetchers: fetcherDataObject[], imports: {}) => {
    imports = generateImports(imports);
    const fetcher = generateFetchers(fetchers);
    console.log(fetchers)
    console.log(imports)

    const resultFile = ts.createSourceFile("someFileName.ts", "", ts.ScriptTarget.Latest, /*setParentNodes*/ false, ts.ScriptKind.TS);
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
    const result = printer.printNode(ts.EmitHint.Unspecified, fetcher, resultFile);
    console.log(result);
};
