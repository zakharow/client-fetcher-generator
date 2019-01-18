import * as ts from 'typescript';
import { generate } from '../generator';
import { extractDataFromRouteConfig } from './utils/extractors/extractDataFromRouteConfig';
import { extractTsModelImportName } from './utils/extractors/extractTsModelImportName';
import { extractTsModelImportPath } from './utils/extractors/extractTsModelImportPath';

export interface fetcherDataObject {
    name?: string,
    endpoint?: string,
    method?: string,
    parametres?: object
};

export interface imports {
    [key: string]: string
}

export const createFetchers = (asts: ts.SourceFile[]) => {
    let fetchers: fetcherDataObject[];
    let imports: imports;

    const visit = (node: ts.Node) => {
        // Собирает уникальные импорты ts-моделей используемых в hapi-плагине
        if (ts.isImportDeclaration(node)) {
            const name = extractTsModelImportName(node);
            const path = extractTsModelImportPath(node);

            if (name && path) {
                imports = {
                    ...imports,
                    [name]: path
                }
            }
        }
        // Собирает необходимые параметры из hapi-плагина для генерации фетчера
        if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === 'factoryApi') {
            let fetcherDataTransferObject: fetcherDataObject = {};

            const endpoint = node.arguments.find(ts.isStringLiteral);
            const hapiRouteConfig = node.arguments.find(ts.isObjectLiteralExpression);

            if (endpoint) {
                fetcherDataTransferObject = {
                    name: endpoint.text.split('/').pop(),
                    endpoint: endpoint.text
                };
            }

            if (hapiRouteConfig) {
                fetcherDataTransferObject = {
                    ...fetcherDataTransferObject,
                    ...extractDataFromRouteConfig(hapiRouteConfig)
                };
            }

            fetchers = [...fetchers, fetcherDataTransferObject];
        }

        ts.forEachChild(node, visit);
    }

    asts.forEach(visit);

    generate(fetchers, imports);
}
