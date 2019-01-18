/**
 * 'Letter as LetterSchema' => 'Letter'
 */
export const formatImports = (imports: any) => {
    return Object.keys(imports).reduce((res, key) => {
        if (key.includes(' as ')) {
            const newImportName = key.split(' ').shift();
            if (newImportName) {
                return {
                    ...res,
                    [newImportName]: imports[key]
                };
            }
        }

        return {
            ...res,
            [key]: imports[key]
        };
    }, {});
}
