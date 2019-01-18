import * as ts from 'typescript';

export const extractPropTypeFromJoi = (prop: ts.Node) => {
    let type = '';

    const visitPropType = (node: ts.Node) => {
        if (ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === 'Joi') {
            return type = node.name.text
        }

        if (ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.expression) && node.expression.text !== 'Joi') {
            return type = node.expression.text
        }

        if (ts.isPropertyAssignment(node) && ts.isIdentifier(node.initializer) && node.initializer) {
            return type = node.initializer.text
        }

        ts.forEachChild(node, visitPropType)
    }

    visitPropType(prop);

    return type;
};
