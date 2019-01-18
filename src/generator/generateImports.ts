import { formatImports } from '../utils/formatImports';

export const generateImports = (imports: any) => {
    imports = formatImports(imports);
    return imports;
}