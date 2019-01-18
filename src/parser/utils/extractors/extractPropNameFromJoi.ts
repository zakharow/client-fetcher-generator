import * as ts from 'typescript';

export const extractPropNameFromJoi = (prop: ts.Node) => {
    if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
        return prop.name.text
    }
};
