import * as ts from 'typescript';

export const extractTsModelImportName = (node: ts.ImportDeclaration) => {
    if (node.importClause && node.importClause.name) {
        return node.importClause.name.text
    }

    if (node.importClause && node.importClause.namedBindings && ts.isNamespaceImport(node.importClause.namedBindings)) {
        if (node.importClause.namedBindings.name.text !== 'Joi') {
            return node.importClause.namedBindings.name.text
        }
    }

    if (node.importClause && node.importClause.namedBindings && ts.isNamedImports(node.importClause.namedBindings)) {
        return node.importClause.namedBindings.elements.map((el) => {
            if (ts.isImportSpecifier(el) && el.name.text !== 'factoryApi' && el.name.text !== 'factoryError') {
                return el.propertyName ? `${el.propertyName.text} as ${el.name.text}` : el.name.text
            }
        }).join(', ')
    }
};
