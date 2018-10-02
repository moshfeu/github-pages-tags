export interface IPackageJSON {
  ['pre-commit']: string[];
  scripts: {[key: string]: string}
}