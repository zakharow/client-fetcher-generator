import * as ts from 'typescript';
import { extractPropNameFromJoi } from './extractPropNameFromJoi';
import { extractPropTypeFromJoi } from './extractPropTypeFromJoi';

export const extractDataFromValidate = (node: ts.Node) => {
    let data = {};

    const visitValidate = (node: ts.Node) => {
        if (ts.isPropertyAssignment(node) &&
            ts.isIdentifier(node.name) &&
            (node.name.text === 'query' || node.name.text === 'payload')
        ) {
            return (<ts.ObjectLiteralExpression>node.initializer).properties.forEach((prop) => {
                const name = extractPropNameFromJoi(prop);
                const type = extractPropTypeFromJoi(prop);

                if (name && type) {
                    data = {
                        ...data,
                        [name]: type
                    }
                };
            })
        }

        ts.forEachChild(node, visitValidate)
    }

    visitValidate(node);

    return data;
};
