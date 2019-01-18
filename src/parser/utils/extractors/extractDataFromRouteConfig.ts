import * as ts from 'typescript';
import { extractDataFromValidate } from './extractDataFromValidate';

interface dataFromRouteConfig {
    method?: string,
    parametres?: object
};

export const extractDataFromRouteConfig = (node: ts.ObjectLiteralExpression): dataFromRouteConfig => {
    return node.properties.filter(ts.isPropertyAssignment).reduce((res: dataFromRouteConfig, node) => {
        // Выдергивает метод запроса из hapi-плагина
        if (ts.isIdentifier(node.name) && ts.isStringLiteral(node.initializer) && node.name.text === 'method') {
            res = {
                ...res,
                method: node.initializer.text
            };
        };
        // Выдергивает параметры из Joi-валидаторов hapi-плагина
        if (ts.isIdentifier(node.name) && node.name.text === 'validate') {
            res = {
                ...res,
                parametres: extractDataFromValidate(node)
            };
        };

        return res;
    }, {})
};
