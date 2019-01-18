import * as ts from 'typescript';

export const extractTsModelImportPath = (node: ts.ImportDeclaration) => {
    if (node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
        if (node.moduleSpecifier.text.includes('thrift-services/joi/')) {
            return node.moduleSpecifier.text.split('/').filter(x => x !== 'joi').join('/');
        }
    }
};
