import * as ts from 'typescript';
import { fetcherDataObject } from '../parser/index';

export const generateFetchers = (fetchers: fetcherDataObject[]) => {
    const functionName = ts.createIdentifier('create');
    const paramName = ts.createIdentifier('contextRoot');
    const paramType = ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
    const parameter = ts.createParameter(
        /*decorators*/ undefined,
        /*modifiers*/ undefined,
        /*dotDotDotToken*/ undefined,
        paramName,
        /*questionToken*/ undefined,
        paramType
    );

    const statements = [
        ts.createVariableStatement(
            undefined,
            ts.createVariableDeclarationList(
                [ts.createVariableDeclaration(
                    ts.createIdentifier('csrfCookieName'),
                    /*type*/ undefined,
                    ts.createCall(ts.createIdentifier('generateCSRFName'), /*typeArgs*/ undefined, [paramName])
                )],
                /*flags*/ 2
            ),
        ),
        ts.createVariableStatement(
            undefined,
            ts.createVariableDeclarationList(
                [ts.createVariableDeclaration(
                    ts.createIdentifier('fetch'),
                    /*type*/ undefined,
                    ts.createObjectLiteral(
                        fetchers.map((f: fetcherDataObject) => {
                            const arg1 = ts.createTemplateExpression(
                                ts.createTemplateHead(''),
                                [ts.createTemplateSpan(
                                    paramName,
                                    ts.createTemplateTail(f.endpoint ? f.endpoint : '')
                                )]
                            );

                            if (f.method === 'POST') {
                                const arg2 = ts.createIdentifier('POST');
                                const arg3 = ts.createObjectLiteral(
                                    [ts.createShorthandPropertyAssignment(
                                        ts.createIdentifier('csrfCookieName')
                                    )],
                                    /*multiline*/ false
                                )

                                return ts.createPropertyAssignment(
                                    f.name ? f.name : '',
                                    ts.createCall(
                                        ts.createIdentifier('factoryFetch'),
                                        /*typeArgs*/ undefined,
                                        [arg1, arg2, arg3]
                                    )
                                )
                            }

                            return ts.createPropertyAssignment(
                                f.name ? f.name : '',
                                ts.createCall(
                                    ts.createIdentifier('factoryFetch'),
                                    /*typeArgs*/ undefined,
                                    [arg1]
                                )
                            )
                        }),
                        /*multiline*/ true
                    )
                )],
            /*flags*/ 2
            ),
        ),
        ts.createReturn(
            ts.createObjectLiteral(
                fetchers.map((f: fetcherDataObject) => {
                    return ts.createMethod(
                        /*decorators*/ undefined,
                        /*modifiers*/ undefined,
                        /*asteriskToken*/ undefined,
                        /*name*/ f.name ? f.name : '',
                        /*questionToken*/ undefined,
                        /*typeParameters*/ undefined,
                        /*parameters*/ f.parametres ? Object.keys(f.parametres).map((param) => {
                            return ts.createParameter(
                                /*decorators*/ undefined,
                                /*modifiers*/ undefined,
                                /*dotDotDotToken*/ undefined,
                                param,
                                /*questionToken*/ undefined,
                                (f.parametres as any)[param]
                            )
                        }) : [],
                        /*type*/ undefined,
                        /*body*/ undefined
                    )
                }),
                /*multiline*/ true
            )
        ),
    ];

    const fetcher = ts.createFunctionDeclaration(
        /*decorators*/ undefined,
        /*modifiers*/[ts.createToken(ts.SyntaxKind.ExportKeyword), ts.createToken(ts.SyntaxKind.DefaultKeyword)],
        /*asteriskToken*/ undefined,
        functionName,
        /*typeParameters*/ undefined,
        [parameter],
        /*returnType*/ undefined,
        ts.createBlock(statements, /*multiline*/ true),
    )

    return fetcher;
}