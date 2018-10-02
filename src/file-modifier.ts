import {IPackageJSON} from './types';
import * as fs from 'fs';
import {getPackageJSONPath} from './path-resolver';

const packageJsonPath = getPackageJSONPath();

export const read = (): IPackageJSON => {
  return JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
}

export const addProps = (packageJson: IPackageJSON): void => {
  packageJson['pre-commit'] = [
    'generate-tags'
  ];

  if (!packageJson.scripts) {
    packageJson.scripts = {};
  }

  packageJson.scripts['generate-tags'] = `sh node_modules/github-pages-tags/precommit.sh`;
}

export const save = (packageJson: IPackageJSON): void => {
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}