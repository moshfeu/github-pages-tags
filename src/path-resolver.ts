import * as path from 'path';
import * as fs from 'fs';

export const getPackageJSONPath = () => {
  const root = path.resolve(process.cwd(), '..', '..');
  const packageJsonPath = path.resolve(root, 'package.json');
  return packageJsonPath;
}