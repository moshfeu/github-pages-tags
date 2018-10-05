import * as path from 'path';

export const getPackageJSONPath = () => {
  const root = path.resolve(process.cwd(), '..', '..');
  const packageJsonPath = path.resolve(root, 'package.json');
  return packageJsonPath;
}